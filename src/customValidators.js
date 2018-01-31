export const isName = (value) => {
  if(typeof(value) !== 'string') {
    return false;
  }
  return value.match(/^[a-zа-я]?[a-zа-я- —]?[a-zа-я]+$|^$/ig) !== null;
}

export const isPhone = (value) => {
  if(typeof(value) !== 'string') {
    return false;
  }
  return value.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/) !== null;
}
