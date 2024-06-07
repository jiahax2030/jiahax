import type { App } from 'vue';
import { hasPerm } from './permission/index';

// 全局注册 directive
export function setupDirective(app: App<Element>) {
  // 使v-hasPerm在所有组件中都可用
  app.directive('hasPerm', hasPerm);
}
