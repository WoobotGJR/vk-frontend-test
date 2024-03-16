function debounce(func: (...args: any[]) => void, timeout: number = 3000) {
  let timer: number;
  return function (this: any, ...args: any[]) {
    const self = this;
    clearTimeout(timer);
    timer = setTimeout(function () {
      func.apply(self, args);
    }, timeout);
  };
}

export default debounce;
