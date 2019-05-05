import _ from 'lodash';
import * as jwt_decode from 'jwt-decode';

function getNodeReference(sourceObject, property, delimiter) {
  const pathArray = _.split(property, delimiter);
  let sourceObjectRef = sourceObject;
  _.each(_.take(pathArray, (pathArray.length - 1)), (segment) => {
    sourceObjectRef = sourceObjectRef[segment];
  });
  return sourceObjectRef;
}

export function setFieldValue(sourceObject, property, value, pushArray, resetValuesArray, delimiter = '.') {
  const sourceObjectRef = getNodeReference(sourceObject, property, delimiter);
  let finalProperty = _.last(_.split(property, delimiter));
  if (pushArray) {
    sourceObjectRef[finalProperty] = sourceObjectRef[finalProperty] || [];
    sourceObjectRef[finalProperty].push(value);
  } else {
    sourceObjectRef[finalProperty] = value;
  }
  if (resetValuesArray) {
    resetValuesArray.forEach((clearItem) => {
      const clearItemRef = getNodeReference(sourceObject, clearItem, delimiter);
      finalProperty = _.last(_.split(clearItem, delimiter));
      clearItemRef[finalProperty] = null;
    });
  }
}

export function removeValueFromNestedArray(sourceObject, property, idx, delimiter = '.') {
  const sourceObjectRef = getNodeReference(sourceObject, property, delimiter);
  const finalProperty = _.last(_.split(property, delimiter));
  sourceObjectRef[finalProperty].splice(idx, 1);
}

export function removeItemFromNestedObject(sourceObject, path, delimiter = '.') {
  const sourceObjectRef = getNodeReference(sourceObject, path, delimiter);
  const finalProperty = _.last(_.split(path, delimiter));
  delete sourceObjectRef[finalProperty];
}

export function handleInputChange(Obj, item, callback, e) {
  const ObjReference = Object.assign({}, Obj);
  _.indexOf(item, '.') > -1
    ? setFieldValue(ObjReference, item, e.currentTarget.value)
    : ObjReference[item] = e.currentTarget.value;
  this.callback(ObjReference, item);
}

export function getNumericSelectOptions(max) {
  const selectOptions = [];
  for (let i = 0; i < max; i++) {
    selectOptions.push({ label: i, value: i });
  }
  return selectOptions;
}

export function convertFlatArrayToSelectOptions(flatArray) {
  const options = [];
  if (!flatArray) return options;
  for (let i = 0; i < flatArray.length; i++) {
    options.push({ label: flatArray[i], value: flatArray[i] });
  }
  return options;
}

export function decodeToken(token) {
  return jwt_decode(token);
}