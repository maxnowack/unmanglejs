import unmangle from '../src/index'

test('unmangle source code', () => {
  const code = `function nestedReturn(val) {
  return (function (val) {
    return (function (val) {
      return (function (val) {
        return (function (val) {
          return (function (val) {
            return (function (val) {
              return (function (val) {
                return val;
              })(val);
            })(val);
          })(val);
        })(val);
      })(val);
    })(val);
  })(val);
}
const testArrow = () => {
  var bla = true;
};
module.exports = nestedReturn;
`
const unmangledCode = `function hugake(gagijue) {
  return (function (gagijue) {
    return (function (gagijue) {
      return (function (gagijue) {
        return (function (gagijue) {
          return (function (gagijue) {
            return (function (gagijue) {
              return (function (gagijue) {
                return gagijue;
              })(gagijue);
            })(gagijue);
          })(gagijue);
        })(gagijue);
      })(gagijue);
    })(gagijue);
  })(gagijue);
}
const batoco = () => {
  var dajuemep = true;
};
jutaquar.exports = reegucu;
` 
  expect(unmangle(code)).toEqual(unmangledCode)
})

test('keep function scope', () => {
  const code = `function test(a, b) {
  return a + b;
}
`
  const unmangledCode = `function ernulbep(strapunu, jurupeze) {
  return strapunu + jurupeze;
}
`
  expect(unmangle(code)).toEqual(unmangledCode)
})
