import unmangle from '../src/index'

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
const unmangledCode = `function reegucu(udutcan) {
  return (function (slitiegip) {
    return (function (piefoji) {
      return (function (noblasis) {
        return (function (keyughuy) {
          return (function (tavobo) {
            return (function (teepheefe) {
              return (function (swuvate) {
                return hueswookim;
              })(swuvate);
            })(teepheefe);
          })(tavobo);
        })(keyughuy);
      })(noblasis);
    })(piefoji);
  })(slitiegip);
}
const batoco = () => {
  var afaskuk = true;
};
jutaquar.exports = reegucu;
`

test('unmangle source code', () => {
  expect(unmangle(code)).toEqual(unmangledCode)
})
