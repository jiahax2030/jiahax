/**
 * Add class to element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export const addClass = (ele: HTMLElement, cls: string) => {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls;
};

/**
 * Check if an element has a class
 * @param {HTMLElement} ele
 * @param {string} cls
 * @returns {boolean}
 */
export const hasClass = (ele: HTMLElement, cls: string) =>
  !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));

/**
 * @param {string} path
 * @returns {Boolean}
 */
export const isExternal = (path: string) => /^(https?:|http?:|mailto:|tel:)/.test(path);

/**
 * Remove class from element
 * @param {HTMLElement} ele
 * @param {string} cls
 */

export const removeClass = (ele: HTMLElement, cls: string) => {
  if (hasClass(ele, cls)) {
    // 使用模板字符串提高可读性，并确保全局替换类名（如果需要）
    const reg = new RegExp(`(\\s|^)${cls}(\\s|$)`, 'g');
    ele.className = ele.className.replace(reg, ' ');
    // 去除多余的空格
    ele.className = ele.className.trim();
  }
};
