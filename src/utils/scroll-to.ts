const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
  // 将t除以d/2，用于调整时间进度
  t /= d / 2;

  // 如果t小于1
  if (t < 1) {
    // 返回 (c/2) * t^2 + b，表示缓动函数前半段的计算结果
    return (c / 2) * t * t + b;
  }

  // 如果t大于等于1
  t--;

  // 返回 (-c/2) * (t * (t - 2) - 1) + b，表示缓动函数后半段的计算结果
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
const requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    (window as any).webkitRequestAnimationFrame ||
    (window as any).mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

/**
 * Because it's so fucking difficult to detect the scrolling element, just move them all
 * @param {number} amount
 */
const move = (amount: number) => {
  // 设置文档根元素的滚动位置为指定的滚动量
  document.documentElement.scrollTop = amount;

  // 设置文档body的父元素的滚动位置为指定的滚动量
  (document.body.parentNode as HTMLElement).scrollTop = amount;

  // 设置文档body的滚动位置为指定的滚动量
  document.body.scrollTop = amount;
};

const position = () => {
  return (
    // 尝试获取根元素的滚动位置
    document.documentElement.scrollTop ||
    // 如果根元素没有滚动位置，则尝试获取body元素的父元素的滚动位置
    (document.body.parentNode as HTMLElement).scrollTop ||
    // 如果body元素的父元素也没有滚动位置，则获取body元素的滚动位置
    document.body.scrollTop
  );
};

/**
 * @param {number} to
 * @param {number} duration
 * @param {Function} callback
 */
export const scrollTo = (to: number, duration: number, callback?: any) => {
  // 获取当前滚动位置
  const start = position();
  // 计算需要滚动的距离
  const change = to - start;
  // 每次增加的时间间隔
  const increment = 20;
  // 当前时间
  let currentTime = 0;
  // 如果未传入duration，则默认为500毫秒
  duration = typeof duration === 'undefined' ? 500 : duration;
  const animateScroll = function () {
    // 增加时间
    currentTime += increment;
    // 使用二次入出缓动函数计算当前值
    const val = easeInOutQuad(currentTime, start, change, duration);
    // 移动文档体
    move(val);
    // 如果当前时间小于duration，则继续动画
    if (currentTime < duration) {
      // 请求下一帧动画
      requestAnimFrame(animateScroll);
    } else {
      if (callback && typeof callback === 'function') {
        // 动画结束，执行回调函数
        callback();
      }
    }
  };
  // 开始动画
  animateScroll();
};
