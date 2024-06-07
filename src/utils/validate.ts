/**
 * 判断给定路径是否为外部链接
 *
 * @param path 待判断的路径
 * @returns 如果路径以 "http://"、"https://"、"mailto:" 或 "tel:" 开头，则返回 true；否则返回 false
 */
export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path);

/**
 * 验证用户名是否合法
 *
 * @param str 待验证的用户名
 * @returns 如果用户名在合法用户名列表中则返回true，否则返回false
 */
export function validUsername(str: string) {
  // 定义一个数组，存储有效的用户名
  const valid_map = ['admin', 'editor', 'editor2'];

  // 判断去除空格后的字符串是否在有效用户名数组中
  // 如果在，则返回true，表示用户名有效；否则返回false，表示用户名无效
  return valid_map.indexOf(str.trim()) >= 0;
}
