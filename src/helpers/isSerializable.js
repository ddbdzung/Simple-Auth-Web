import _ from 'lodash'

export function isSerialisable(obj) {

  const nestedSerialisable = ob => (_.isPlainObject(ob) || _.isArray(ob)) &&
    _.every(ob, isSerialisable);

  return _.overSome([
    _.isUndefined,
    _.isNull,
    _.isBoolean,
    _.isNumber,
    _.isString,
    nestedSerialisable
  ])(obj)
}
