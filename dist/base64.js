;(function(root){

  var charMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  function enc(input) {
    var str = String(input);
    var map = charMap;
    var block = 0,
        output = '';
    var prx = [2, 4, 6, 8];
    for (var code, idx = 3 / 4, uarr;
    // 能取到字符时、block未处理完时、长度不足时
    !isNaN(code = str.charCodeAt(idx)) || 63 & block || (map = '=', (idx - 3 / 4) % 1); idx += 3 / 4) {
      if (code > 0x7F) {
        // utf8字符处理
        (uarr = encodeURI(str.charAt(idx)).split('%')).shift();
        for (var hex, idx2 = idx % 1; hex = uarr[idx2 | 0]; idx2 += 3 / 4) {
          block = block << 8 | parseInt(hex, 16);
          output += map.charAt(63 & block >> 8 - idx2 % 1 * 8);
        }
        idx = idx === 3 / 4 ? 0 : idx; // 修复首字符为utf8字符时出错的BUG
        idx += 3 / 4 * uarr.length % 1; // idx补偿
      } else {
        block = block << 8 | code;
        output += map.charAt(63 & block >> 8 - idx % 1 * 8);
      }
    }
    return output;
  }

  function dec(input) {
    var str = String(input),
        map = charMap.slice(0, -1),
        prx = [6, 4, 2, 0],
        output = '',
        block = 0,
        code,
        buffer = 0,
        hex = '';
    try {
      for (var i = 0; (code = map.indexOf(str[i])) > -1; i++) {
        block = block << 6 | code;
        if (i % 4) {
          buffer = 255 & block >> prx[i % 4];
          if (buffer < 128) {
            output += hex ? decodeURI(hex) : '';
            output += String.fromCharCode(buffer);
            hex = '';
          } else {
            hex += '%' + ('0' + buffer.toString(16)).slice(-2);
          }
        }
      }
      output += hex ? decodeURI(hex) : '';
      return output;
    } catch (err) {
      // console.log(err);
      throw new Error('base64 malformed!');
    }
  }

  var base64 = {
    encode: enc,
    decode: dec
  };

  if (typeof define === 'function' && define.amd) {
    define(function() {
      return base64;
    });
  } else if (typeof exports === 'object') {
    for (var key in base64) {
      base64.hasOwnProperty(key) && (exports[key] = base64[key]);
    }
  } else {
    root.base64 = base64;
  }

})(typeof global === 'object' && global || this);
