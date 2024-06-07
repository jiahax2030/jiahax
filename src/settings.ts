// 系统设置
interface DefaultSettings {
  /**
   * 是否固定头部
   */
  fixedHeader: boolean;

  /**
   * 语言
   */
  language: string;

  /**
   * 导航栏布局
   */
  layout: string;

  /**
   * 是否显示设置
   */
  showSettings: boolean;

  /**
   * 是否显示侧边栏Logo
   */
  sidebarLogo: boolean;

  /**
   * 布局大小
   */
  size: string;

  /**
   * 是否显示多标签导航
   */
  tagsView: boolean;

  /**
   * 主题模式
   */
  theme: string;

  /**
   * 主题色
   */
  themeColor: string;

  /**
   * 系统title
   */
  title: string;

  /**
   * topHeader显隐控制
   */
  topHeader: boolean;
}

const defaultSettings: DefaultSettings = {
  fixedHeader: false, // 固定头部
  language: 'cn', // cn|en
  layout: 'left', // 导航栏布局: { left: 左侧, right: 右侧 }
  showSettings: true, // 设置显隐控制
  sidebarLogo: true, // 侧边栏Logo
  size: 'default', // default|large|small
  tagsView: true, // tagsView显隐控制
  theme: 'light', // 主题模式: { dark: 暗黑模式, light: 明亮模式 }
  themeColor: '#409EFF', // 主题色
  title: 'Jiahax', // 系统title
  topHeader: false // topHeader显隐控制
};

export default defaultSettings;
