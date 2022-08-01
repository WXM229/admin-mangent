export const formatDate = (date, fmt) => {
  if (isNaN(date)) {
    date = date.replace(/-/g, '/');
  }
  if (parseInt(date).toString().length > 9) {
    date = parseInt(date) * 1000;
  }
  date = new Date(date);
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
};
export const inArray = (str = '', array = [], key) => {
  let length = array.length;
  for (let i = 0; i < length; i++) {
    if (key) {
      if (str === array[i][key]) {
        return true;
      }
    } else {
      if (str === array[i]) {
        return true;
      }
    }
  }
  return false;
};
export const initTimeSearch = () => {
  const now = new Date();
  const time = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 0, 0);
  const sday = new Date();
  const eday = new Date();
  sday.setHours(21);
  sday.setMinutes(0);
  sday.setSeconds(0);

  eday.setHours(20);
  eday.setMinutes(59);
  eday.setSeconds(59);
  if (now - time < 0) {
    sday.setDate(now.getDate() - 1);
  } else {
    eday.setDate(now.getDate() + 1);
  }
  return [sday, eday];
};
// 正则验证格式是否为ip
export const isValidIP = (ip) => {
  let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  return reg.test(ip);
};
// 下载流文件
export const downLoadFile = (res) => {
  const fakeMouthEvent = (target, eventName) => {
    const event = document.createEvent('MouseEvents');
    event.initMouseEvent(eventName, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    target.dispatchEvent(event);
  };
  const downLoadFileRow = (data, fileName) => {
    let blob = new Blob([data]);
    let aDom = document.createElement('a');
    aDom.href = window.URL.createObjectURL(blob);
    aDom.download = fileName;
    fakeMouthEvent(aDom, 'click');
  };
  if (res.headers['content-disposition']) {
    let fileName = /filename="(.*)"/.exec(res.headers['content-disposition'])[1];
    if (Buffer) {
      let name = (Buffer.from(fileName, 'binary')).toString('utf8');
      let flag = navigator.userAgent.indexOf('Safari') > 0 && navigator.userAgent.indexOf('Chrome') < 0;
      if (flag) {
        name = fileName;
      }
      downLoadFileRow(res.data, name);
    } else {
      // alert('请使用高版本浏览器')
    }
  }
};
// 判断当前系统
export const systemName = (function() {
  if (navigator.userAgent.indexOf('Window') > 0) {
    return 'Window';
  } else if (navigator.userAgent.indexOf('Mac OS X') > 0) {
    return 'Mac';
  } else {
    return null;
  }
})();
// 下载图片
export const downloadImg = (url, name) => {
  const myCanvas = document.createElement('canvas');
  const myPainting = myCanvas.getContext('2d');
  const imgObj = new Image();
  imgObj.setAttribute('crossOrigin', 'anonymous');
  imgObj.onload = () => {
    myCanvas.width = imgObj.naturalWidth;
    myCanvas.height = imgObj.naturalHeight;
    myPainting.drawImage(imgObj, 0, 0);
    const url = myCanvas.toDataURL('image/png');
    const alink = document.createElement('a');
    alink.href = url;
    alink.download = name;
    alink.click();
  };
  imgObj.src = url;
};

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

