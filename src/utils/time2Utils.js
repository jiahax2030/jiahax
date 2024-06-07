// 时间转换工具类

const TimeUtils2 = {
  Jh_getTimeStamp,
  Jh_timeStampToTime,
  Jh_convertTimeStamp,
  Jh_timeStampToYMD,
  Jh_isToday,
  Jh_getYearMonth,
  Jh_getPrevYear,
  Jh_getNextYear,
  Jh_getPrevYearMonth,
  Jh_getNextYearMonth,
  Jh_compareTimes,
  Jh_isBetweenTimes,
  Jh_isBetweenTimesByCurrent,
  Jh_isBetweenTimesByCurrentAndEndTime,
  getEndTime,
  startOfDay,
  endOfDay
};

export default TimeUtils2;

/**
 * @description: 获取当前毫秒级时间戳（13位）
 * @return {*}
 */
export function Jh_getTimeStamp() {
  // let timestamp2 = Date.parse(new Date())
  // const timestamp = Date.now()
  const timestamp = new Date().getTime();
  return timestamp;
}

/**
 * 将某个时间戳转化成 指定格式时间
 * @param {date} time 时间  new Date().getTime()
 * @param {string} cFormat {y}-{m}-{d} {h}:{i}:{s} {w}
 */

export function Jh_timeStampToTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    console.log();
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    w: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|w)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'w') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

/**
 * 将某个时间转化成时间戳
 * 时间格式：2019-05-20 00:00:00 或 2019年5月1日 00:00:00
 * 返回值：1556640000000，13位时间戳
 */
export function Jh_convertTimeStamp(time) {
  // 用正则主要是把“2019-05-20 00:00:00”转换成“2019/05/20 00:00:00”兼容ios
  let newTime = time.replace(/-|\./g, '/');
  // console.log(newTime);
  // newTime = newTime.replace(/\./g, "-");
  newTime = newTime.replace(/年/g, '/');
  newTime = newTime.replace(/月/g, '/');
  newTime = newTime.replace(/日/g, '');
  if (newTime.length === 4) {
    newTime = newTime + '/01/01 00:00:00';
  }
  if (newTime.length === 7) {
    newTime = newTime + '/01 00:00:00';
  }
  if (newTime.length === 10) {
    newTime = newTime + ' 00:00:00';
  }
  if (newTime.length === 16) {
    newTime = newTime + ':00';
  }
  return Date.parse(newTime);
}

/**
 * 毫秒级时间戳（13位）转年月日，不传time默认当前时间戳
 * @param time 毫秒级时间戳（13位），不传time默认当前时间戳
 * @param format 指定format，不传format默认：'{y}/{m}/{d}'
 * @return 指定format时间，默认格式：2020/02/02
 */
export function Jh_timeStampToYMD(time, format) {
  time = time ? time : Jh_getTimeStamp();
  if (format) {
    return Jh_timeStampToTime(time, format);
  }
  return Jh_timeStampToTime(time, '{y}/{m}/{d}');
}

// 某个时间是否是今天 time格式：2020-07-19 20:33:00
export function Jh_isToday(time) {
  let newTime = time.replace(/-/g, '');
  newTime = newTime.substring(0, 8);
  var currentTime = new Date().getTime();
  currentTime = Jh_timeStampToTime(currentTime, '{y}{m}{d}');
  return newTime === currentTime;
}

// 获取当前年月  time格式：2020-07
export function Jh_getYearMonth() {
  const timestamp = Date.parse(new Date());
  return Jh_timeStampToTime(timestamp, '{y}-{m}');
}

// 获取 指定年的上一年 time格式：2020 | 2020年
export function Jh_getPrevYear(time) {
  let tempYear = time.substring(0, 4);
  tempYear = parseInt(tempYear);
  tempYear = tempYear - 1;
  const text = time.substring(4, 5);
  let prevTime = '';
  if (text === '年') {
    prevTime = tempYear + '年';
  } else {
    prevTime = tempYear + text;
  }
  return prevTime;
}

// 获取 指定年的下一年 time格式：2020 | 2020年
export function Jh_getNextYear(time) {
  let tempYear = time.substring(0, 4);
  tempYear = parseInt(tempYear);
  tempYear = tempYear + 1;
  const text = time.substring(4, 5);
  let nextTime = '';
  if (text === '年') {
    nextTime = tempYear + '年';
  } else {
    nextTime = tempYear + text;
  }
  return nextTime;
}

// 获取 指定年月的上一年月 time格式：2020-07 | 2020年07月
export function Jh_getPrevYearMonth(time) {
  let tempYear = time.substring(0, 4);
  let tempMonth = time.substring(5, 7);
  tempYear = parseInt(tempYear);
  tempMonth = parseInt(tempMonth);
  tempMonth = tempMonth - 1;
  if (tempMonth === 0) {
    tempYear = tempYear - 1;
    tempMonth = 12;
  }
  if (tempMonth < 10) {
    tempMonth = '0' + tempMonth;
  }
  const text = time.substring(4, 5);
  let prevTime = '';
  if (text === '年') {
    prevTime = tempYear + '年' + tempMonth + '月';
  } else {
    prevTime = tempYear + text + tempMonth;
  }
  return prevTime;
}

// 获取 指定年月的下一年月 time格式：2020-07 | 2020年07月
export function Jh_getNextYearMonth(time) {
  let tempYear = time.substring(0, 4);
  let tempMonth = time.substring(5, 7);
  tempYear = parseInt(tempYear);
  tempMonth = parseInt(tempMonth);
  tempMonth = tempMonth + 1;
  if (tempMonth === 13) {
    tempYear = tempYear + 1;
    tempMonth = 1;
  }
  if (tempMonth < 10) {
    tempMonth = '0' + tempMonth;
  }
  const text = time.substring(4, 5);
  let nextTime = '';
  if (text === '年') {
    nextTime = tempYear + '年' + tempMonth + '月';
  } else {
    nextTime = tempYear + text + tempMonth;
  }
  return nextTime;
}

/**
 * @param time Date/String/Number
 * @description getEndTime('2021-02-12')
 * @returns '距离2021年2月12日还有118天0小时30分12秒'
 */
export function getEndTime(time) {
  var year = new Date(time).getFullYear();
  var month = new Date(time).getMonth() + 1;
  var date = new Date(time).getDate();
  var now = new Date();
  var endDate = new Date(new Date(time).toLocaleDateString());
  var leftTime = endDate.getTime() - now.getTime();
  var leftsecond = parseInt(leftTime / 1000);
  var day = Math.floor(leftsecond / (60 * 60 * 24));
  var hour = Math.floor((leftsecond - day * 24 * 60 * 60) / 3600);
  var minute = Math.floor((leftsecond - day * 24 * 60 * 60 - hour * 3600) / 60);
  var second = Math.floor(leftsecond - day * 60 * 60 * 24 - hour * 60 * 60 - minute * 60);
  return `距离${year}年${month}月${date}日还有${day}天${hour}小时${minute}分${second}秒`;
}

/**
 * 获取指定 ISO 日期字符串所在日期的开始时间字符串。
 *
 * @param isoDateStr ISO 日期字符串，格式为 'YYYY-MM-DDTHH:mm:ss.sssZ'。
 * @returns 返回指定 ISO 日期字符串所在日期的开始时间字符串，格式为 'YYYY-MM-DD 00:00:00'。
 * 如果参数为空，则返回空字符串。
 */
export function startOfDay(isoDateStr) {
  // 如果传入的 isoDateStr 为空，则返回空字符串
  if (!isoDateStr) return '';

  // 返回 isoDateStr 的前10个字符，并拼接上 ' 00:00:00'
  return isoDateStr.substr(0, 10) + ' 00:00:00';
}

/**
 * 将 ISO 日期字符串转换为当天 23:59:59 时刻的字符串。
 *
 * @param isoDateStr ISO 日期字符串，格式为 'YYYY-MM-DDTHH:mm:ss.sssZ'。
 * @returns 返回当天 23:59:59 时刻的字符串，格式为 'YYYY-MM-DD 23:59:59'。
 * 若参数为空，则返回空字符串。
 */
export function endOfDay(isoDateStr) {
  // 如果传入的 isoDateStr 为空，则返回空字符串
  if (!isoDateStr) return '';
  // 返回 isoDateStr 的前 10 个字符，并拼接上 ' 23:59:59'
  return isoDateStr.substr(0, 10) + ' 23:59:59';
}

/**
 * 判断给定时间是否在起始时间和结束时间之间
 *
 * @param time 给定时间，格式为"yyyy-MM-dd HH:mm:ss"
 * @param startTime 起始时间，格式为"yyyy-MM-dd HH:mm:ss"
 * @param endTime 结束时间，格式为"yyyy-MM-dd HH:mm:ss"
 * @returns 返回布尔值，表示给定时间是否在起始时间和结束时间之间
 */
export function Jh_isBetweenTimes(time, startTime, endTime) {
  // 将时间字符串中的"-"替换为"/"
  time = time.replace(/-/g, '/');
  // 将起始时间字符串中的"-"替换为"/"
  startTime = startTime.replace(/-/g, '/');
  // 将结束时间字符串中的"-"替换为"/"
  endTime = endTime.replace(/-/g, '/');
  // 将时间字符串转换为Date对象
  time = new Date(time);
  // 将起始时间字符串转换为Date对象
  startTime = new Date(startTime);
  // 将结束时间字符串转换为Date对象
  endTime = new Date(endTime);
  // 判断时间是否在起始时间和结束时间之间（包括起始时间和结束时间）
  if (startTime <= time && time <= endTime) {
    // 返回true，表示时间在指定范围内
    return true;
  }
  // 返回false，表示时间不在指定范围内
  return false;
}

/**
 * 判断当前时间是否在指定时间段内
 *
 * @param beginTime 起始时间，格式为 "yyyy-MM-dd HH:mm:ss"
 * @param endTime 结束时间，格式为 "yyyy-MM-dd HH:mm:ss"
 * @returns 返回布尔值，表示当前时间是否在指定时间段内
 */
export function Jh_isBetweenTimesByCurrent(beginTime, endTime) {
  // 将传入的开始时间字符串中的短横线替换为斜杠
  beginTime = beginTime.replace(/-/g, '/');
  // 将传入的结束时间字符串中的短横线替换为斜杠
  endTime = endTime.replace(/-/g, '/');
  // 将开始时间字符串转换为日期对象
  beginTime = new Date(beginTime);
  // 将结束时间字符串转换为日期对象
  endTime = new Date(endTime);
  // 获取当前时间
  const currentTime = new Date();
  // 判断当前时间是否在开始时间和结束时间之间（包括开始时间和结束时间）
  if (beginTime <= currentTime && currentTime <= endTime) {
    // 如果在范围内，则返回true
    return true;
  }
  // 如果不在范围内，则返回false
  return false;
}

/**
 * 判断当前时间是否在指定时间范围内（包括边界值）
 *
 * @param time 起始时间，格式为YYYY-MM-DD HH:mm:ss
 * @param endTime 结束时间，格式为YYYY-MM-DD HH:mm:ss
 * @returns 返回布尔值，表示当前时间是否在指定时间范围内
 */
export function Jh_isBetweenTimesByCurrentAndEndTime(time, endTime) {
  // 获取当前时间
  const currentTime = new Date();

  // 将传入的 time 中的 '-' 替换为 '/'
  time = time.replace(/-/g, '/');

  // 将传入的 endTime 中的 '-' 替换为 '/'
  endTime = endTime.replace(/-/g, '/');

  // 将替换后的 time 字符串转换为 Date 对象
  time = new Date(time);

  // 将替换后的 endTime 字符串转换为 Date 对象
  endTime = new Date(endTime);

  // 判断当前时间是否在 time 和 endTime 之间（包括 time 和 endTime）
  if (currentTime <= time && time <= endTime) {
    // 如果在范围内，则返回 true
    return true;
  }

  // 如果不在范围内，则返回 false
  return false;
}

/**
 * 比较两个时间戳大小
 *
 * @param time1 第一个时间戳
 * @param time2 第二个时间戳
 * @returns 如果第一个时间戳大于第二个时间戳则返回true，否则返回false
 */
export function Jh_compareTimes(time1, time2) {
  // 将传入的时间戳转换为统一格式的时间
  const newTime1 = Jh_convertTimeStamp(time1);
  const newTime2 = Jh_convertTimeStamp(time2);

  // 比较两个时间的大小
  if (newTime1 > newTime2) {
    // 如果第一个时间大于第二个时间，返回true
    return true; // 第一个大
  } else {
    // 否则返回false
    return false; // 第二个大
  }
}

/*
  使用方法：

  import TimeUtils from '@/utils/timeUtils'

  // 时间戳转指定格式时间
  TimeUtils.Jh_timeStampToTime(1554803832, '{y}年{m}月{d}日 {h}:{i}:{s} 星期{w}')                     1487065320000
  TimeUtils.Jh_timeStampToTime(new Date().getTime(), '{y}年{m}月{d}日 {h}:{i}:{s} 星期{w}')

  */
