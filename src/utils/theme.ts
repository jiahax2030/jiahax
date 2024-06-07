import { ElMessage } from 'element-plus';

/**
 * 颜色值转换工具函数集合
 *
 * @returns 返回一个包含颜色值转换相关方法的对象
 */
export function useChangeColor() {
  /**
   * 将十六进制颜色值转换为RGB值数组
   *
   * @param str 十六进制颜色值，格式为#RRGGBB或RRGGBB
   * @returns 返回转换后的RGB值数组，格式为[R, G, B]
   * @throws 如果输入的字符串不符合十六进制颜色值的格式，则弹出警告信息并返回空字符串
   */
  const hexToRgb = (str: string): any => {
    // 存储转换后的RGB值
    let hexs: any = '';

    // 定义正则表达式，用于匹配合法的十六进制颜色值
    let reg = /^\#?[0-9A-Fa-f]{6}$/;

    // 如果输入的字符串不符合正则表达式的要求
    if (!reg.test(str)) {
      // 弹出警告信息
      ElMessage.warning('输入错误的hex');
      // 返回空字符串
      return '';
    }

    // 去除字符串开头的'#'字符
    str = str.replace('#', '');

    // 使用正则表达式匹配每两个字符作为一个分组，得到一个包含三个分组的数组
    hexs = str.match(/../g);

    // 遍历数组中的每个分组，将十六进制字符串转换为十进制整数
    for (let i = 0; i < 3; i++) {
      hexs[i] = parseInt(hexs[i], 16);
    }

    // 返回转换后的RGB值数组
    return hexs;
  };

  /**
   * 将RGB颜色值转换为十六进制颜色值
   *
   * @param r 红色分量，取值范围为0-255
   * @param g 绿色分量，取值范围为0-255
   * @param b 蓝色分量，取值范围为0-255
   * @returns 返回转换后的十六进制颜色值，格式为#RRGGBB
   * @warning 如果r、g、b中有任意一个不满足正则表达式，则弹出警告并返回空字符串
   */
  const rgbToHex = (r: any, g: any, b: any): string => {
    // 定义正则表达式，用于匹配1到3位的数字
    let reg = /^\d{1,3}$/;
    // 如果r、g、b中有任意一个不满足正则表达式，则弹出警告并返回空字符串
    if (!reg.test(r) || !reg.test(g) || !reg.test(b)) {
      ElMessage.warning('输入错误的rgb颜色值');
      return '';
    }
    // 将r、g、b转换为十六进制字符串，并放入数组中
    let hexs = [r.toString(16), g.toString(16), b.toString(16)];
    // 遍历数组，如果某个元素的长度为1，则在前面补0
    for (let i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = `0${hexs[i]}`;
    // 将数组中的元素拼接起来，并在前面加上'#'，返回最终的十六进制颜色值
    return `#${hexs.join('')}`;
  };

  /**
   * 根据给定的颜色值和等级获取深色颜色值
   *
   * @param color 颜色值，格式为合法的hex颜色值
   * @param level 颜色等级，取值范围为0~1，0表示原始颜色，1表示最深颜色
   * @returns 返回计算后的深色颜色值，格式为hex颜色值
   */
  const getDarkColor = (color: string, level: number): string => {
    // 定义一个正则表达式，用于验证输入的颜色值是否为合法的hex颜色值
    let reg = /^\#?[0-9A-Fa-f]{6}$/;
    // 判断输入的颜色值是否符合正则表达式的规则
    if (!reg.test(color)) {
      // 如果不符合，则弹出警告信息并返回空字符串
      ElMessage.warning('输入错误的hex颜色值');
      return '';
    }
    // 调用useChangeColor()函数中的hexToRgb方法，将hex颜色值转换为rgb颜色值
    let rgb = useChangeColor().hexToRgb(color);
    // 遍历rgb颜色值的三个分量，根据level参数计算新的分量值
    for (let i = 0; i < 3; i++) rgb[i] = Math.floor(rgb[i] * (1 - level));
    // 调用useChangeColor()函数中的rgbToHex方法，将新的rgb颜色值转换回hex颜色值
    return useChangeColor().rgbToHex(rgb[0], rgb[1], rgb[2]);
  };

  /**
   * 获取亮度调整后的颜色值
   *
   * @param color 16进制颜色值
   * @param level 亮度级别，取值范围[0, 1]，0表示最暗，1表示最亮
   * @returns 返回调整后的16进制颜色值
   */
  const getLightColor = (color: string, level: number): string => {
    // 定义一个正则表达式，用于匹配16进制颜色值
    let reg = /^\#?[0-9A-Fa-f]{6}$/;

    // 判断输入的颜色值是否符合正则表达式
    if (!reg.test(color)) {
      // 如果不符合，则显示警告信息并返回空字符串
      ElMessage.warning('输入错误的hex颜色值');
      return '';
    }

    // 将16进制颜色值转换为RGB颜色值
    let rgb = useChangeColor().hexToRgb(color);

    // 根据亮度级别调整RGB颜色值
    for (let i = 0; i < 3; i++) {
      // 对RGB中的每个颜色分量进行计算
      rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i]);
    }

    // 将调整后的RGB颜色值转换回16进制颜色值
    return useChangeColor().rgbToHex(rgb[0], rgb[1], rgb[2]);
  };

  return {
    hexToRgb,
    rgbToHex,
    getDarkColor,
    getLightColor
  };
}
