import { format } from 'prettier/standalone'
import { util } from 'prettier'
import * as babel from 'prettier/parser-babel'
import traverse, { NodePath } from '@babel/traverse'
import { AST } from 'prettier'
import { forEach } from 'lodash'
import { Node, Comment } from '@babel/types'
import reservedWords from './reservedWords'

function parseAst(code: string, editAst: (ast: AST) => AST) {
  return format(code, {
    parser(code, { babel }) {
      return editAst(babel(code))
    },
    plugins: [babel],
    printWidth: Number.MAX_SAFE_INTEGER
  })
}

export default function unmangle(source: string) {
  return parseAst(source, (ast) => {
    traverse(ast, {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Scope(path: NodePath<Node>) {
        const kindCount: Record<string, number> = {}
        function getName(origKind: string, line: number) {
          const kind = {
            hoisted: "fn",
            local: "fn"
          }[origKind] || origKind
          const id = `${kind}${line}`
          if (!kindCount[id]) {
            kindCount[id] = 1
            return id
          }
          kindCount[id] += 1
          return `${id}_${kindCount[id]}`
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        forEach(path.scope.globals, (node) => {
          let tag = " global "
          if (
            !Array.isArray(node.leadingComments) ||
            !node.leadingComments.some((comment: Comment) => comment.value === tag)
          ) {
            util.addLeadingComment(node, {
              type: "CommentBlock",
              value: tag
            })
          }
        })
        forEach(path.scope.bindings, (node, name) => {
          if (reservedWords.includes(name)) return
          let line = node.identifier.loc?.start.line
          path.scope.rename(name, getName(node.kind, line || 0))
        })
      }
    })
    return ast
  })
}
