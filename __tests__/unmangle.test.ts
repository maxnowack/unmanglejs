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
const unmangledCode = `function fn1(param1) {
  return (function (param2) {
    return (function (param3) {
      return (function (param4) {
        return (function (param5) {
          return (function (param6) {
            return (function (param7) {
              return (function (param8) {
                return param8;
              })(param7);
            })(param6);
          })(param5);
        })(param4);
      })(param3);
    })(param2);
  })(param1);
}
const const18 = () => {
  var var19 = true;
};
/* global */ module.exports = fn1;
` 
  expect(unmangle(code)).toEqual(unmangledCode)
})

test('keep function scope', () => {
  const code = `function test(a, b) {
  return a + b;
}
`
  const unmangledCode = `function fn1(param1, param1_2) {
  return param1 + param1_2;
}
`
  expect(unmangle(code)).toEqual(unmangledCode)
})

test('rename object keys', () => {
  const code = `const obj = {
  a: 1,
  b: 2,
  c: 3,
}
`
  const unmangledCode = `const const1 = {
  a: 1,
  b: 2,
  c: 3,
};
`
  expect(unmangle(code)).toEqual(unmangledCode)
})

test('reserved words', () => {
  const code = `const final = {
  a: 1,
  b: 2,
  c: 3
}
`
  const unmangledCode = `const final = {
  a: 1,
  b: 2,
  c: 3,
};
`
  expect(unmangle(code)).toEqual(unmangledCode)
})
