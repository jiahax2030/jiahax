import Cookies from 'js-cookie'; // 引入cookie

const TokenKey = 'vue_admin_template_token'; // 定义token的key

/**
 * 获取token
 */
export function getToken() {
  return Cookies.get(TokenKey) ?? '';
}

/**
 * 设置token
 */
export function setToken(token: string) {
  return Cookies.set(TokenKey, token);
}

/**
 * 获取token
 */
export function removeToken() {
  return Cookies.remove(TokenKey);
}
