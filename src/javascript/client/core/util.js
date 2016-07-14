export function toDashCase(string) {
  const head = string[0].toLowerCase();
  const tail = string.substr(1).replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  return head + tail;
}

export function prototypeObject(cls) {
  return Object.getOwnPropertyNames(cls.prototype)
    .reduce((h, k) => {
      h[k] = cls.prototype[k];
      return h;
    }, {});
}
