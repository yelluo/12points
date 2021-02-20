function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
//   if (t=='hms'){
//       return [hour, minute, second].map(formatNumber).join(':');
//   }else{
     return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
 // }
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


//遍历数组顺序；
function arrayList(str) {
    var mathStr = [];
    for(var i=0;i<str.length;i++){
        var num1 = str[i];
        var numid1  = i;
        //console.log("i1:"+i);
        for(var i2=0;i2<str.length;i2++){
            if(i2 != numid1){
                //console.log("i2:"+i2);
                var num2 = str[i2];
                var numid2  = i2;
                for(var i3=0;i3<str.length;i3++){
                    if(i3 != numid1 && i3 != numid2){
                        //console.log("i3:"+i3);
                        var num3 = str[i3];
                        var numid3  = i3;
                        for(var i4=0;i4<str.length;i4++){
                            if(i4 != numid1 && i4 != numid2 && i4 != numid3){
                                //console.log("i4:"+i4);
                                var num4 = str[i4];
                                var aMathStr = {
                                    a:num1,
                                    b:num2,
                                    c:num3,
                                    d:num4};
                                if(isInAry(mathStr,aMathStr)){
                                    mathStr.push(aMathStr);
                                }
                            }
                        }
                    }
                }
            }
        }


    }
    return mathStr;
}

//老黄增加：3个数字
//遍历数组顺序；
function arrayList3(str) {
  var mathStr = [];
  for (var i = 0; i < str.length; i++) {
    var num1 = str[i];
    var numid1 = i;
    //console.log("i1:"+i);
    for (var i2 = 0; i2 < str.length; i2++) {
      if (i2 != numid1) {
        //console.log("i2:"+i2);
        var num2 = str[i2];
        var numid2 = i2;
        for (var i3 = 0; i3 < str.length; i3++) {
          if (i3 != numid1 && i3 != numid2) {
            //console.log("i3:"+i3);
            var num3 = str[i3];
            var numid3 = i3;            
            var aMathStr = {
              a: num1,
              b: num2,
              c: num3
            };
            if (isInAry(mathStr, aMathStr)) {
              mathStr.push(aMathStr);
            }              
          }
        }
      }
    }
  }
  return mathStr;
}

//检测重复；
function isInAry(arr,content){
    var w = '';
    for(var i; i<=arr.length;i++){
        if(content==arr[i]){
            w = i;
        }
    }
    return (w=='')? true:false;
}
//检测空值
function empty(a){
    if( a || String(a)=='0'){
        return true;
    }else{
        return false;
    }
}
//数组去重
function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}
//生成随机数字
var appInstance = getApp();
function createRandomNum(){
    return Math.ceil(Math.random()*appInstance.globalData.maxNum);    
}
let easyNumArr = [1,2,3,4,6,8];
function easyNums(arr){
    let easyNum = 0;
    for (let k in arr){
        for (let i in easyNumArr){
            if (easyNumArr[i] == arr[k]){
                easyNum ++;
            }
        }
    }
    return easyNum;
}

//初级：至少一种解法不含乘除；中级：每种解法都含有乘法；高级：每种解法都含有除法
function gameLevel(arr) {
  for (let k in arr) {    
    if (arr[k].indexOf("/") == -1 && arr[k].indexOf("*") == -1) {
      return 1;
    }
  }
  for (let k in arr) {
    if (arr[k].indexOf("/") == -1) {
      return 2;
    }
  }  
  return 3;
}

//防止无法生成合适的题目
//初级：不含乘除；中级：至少一种解法含有乘法；高级：至少一种解法含有除法
function gameLevel2(arr) {
  for (let k in arr) {
    if (arr[k].indexOf("/") != -1) {
      return 3;
    }
  }
  for (let k in arr) {
    if (arr[k].indexOf("*") != -1) {
      return 2;
    }
  }
  return 1;
}

//穷举计算 生成符合规则的新题
function count(g){
    let newArr = [],answer = [], str = [createRandomNum(),createRandomNum(),createRandomNum(),createRandomNum()], countStr = arrayList(str.sort()),resultArr = [];

    for(var i =0; i<countStr.length ; i++){
        var x=countStr[i].a;
        var y=countStr[i].b;
        var z=countStr[i].c;
        var w=countStr[i].d;
        if (x+y+z+w==24){ var aResult = x+"+"+y+"+"+z+"+"+w;resultArr.push(aResult);}
        else if (x+y+z-w==24){ var aResult = x+"+"+y+"+"+z+"-"+w;resultArr.push(aResult);}
        else if ((x+y)*(z+w)==24){ var aResult = "("+x+"+"+y+")*("+z+"+"+w+")";resultArr.push(aResult);}
        else if ((x-y)*(z+w)==24){ var aResult = "("+x+"-"+y+")*("+z+"+"+w+")";resultArr.push(aResult);}
        else if ((x-y)*(z-w)==24){ var aResult = "("+x+"-"+y+")*("+z+"-"+w+")";resultArr.push(aResult);}
        else if ((x+y+z)*w==24){ var aResult = "("+x+"+"+y+"+"+z+")*"+w;resultArr.push(aResult);}
        else if ((x-y-z)*w==24){ var aResult = "("+x+"-"+y+"-"+z+")*"+w;resultArr.push(aResult);}
        else if ((x+y-z)*w==24){ var aResult = "("+x+"+"+y+"-"+z+")*"+w;resultArr.push(aResult);}
        else if ((x*y*z)/w==24){ var aResult = "("+x+"*"+y+"*"+z+")/"+w;resultArr.push(aResult);}
        else if (x*y*(z+w)==24){ var aResult = "("+x+"*"+y+")*("+z+"+"+w+")";resultArr.push(aResult);}
        else if (x*y*(z-w)==24){ var aResult = "("+x+"*"+y+")*("+z+"-"+w+")";resultArr.push(aResult);}
        else if (x*y*z-w==24){ var aResult = "("+x+"*"+y+")*("+z+")-"+w;resultArr.push(aResult);}
        else if (x*y*z+w==24){ var aResult = "("+x+"*"+y+")*("+z+")+"+w;resultArr.push(aResult);}
        else if (x*y*z*w==24){ var aResult = x+"*"+y+"*"+z+"*"+w;resultArr.push(aResult);}
        else if ((x+y)+(z/w)==24){ var aResult = "("+x+"+"+y+")+("+z+"/"+w+")";resultArr.push(aResult);}
        else if ((x+y)*(z/w)==24){ var aResult = "("+x+"+"+y+")*("+z+"/"+w+")";resultArr.push(aResult);}
        else if (x*y+z+w==24){ var aResult = "("+x+"*"+y+")+"+z+"+"+w;resultArr.push(aResult);}
        else if (x*y+z-w==24){ var aResult = "("+x+"*"+y+")+"+z+"-"+w;resultArr.push(aResult);}
        else if (x*y-(z/w)==24){ var aResult = "("+x+"*"+y+")-("+z+"/"+w+")";resultArr.push(aResult);}
        else if (x*y+(z/w)==24){ var aResult = "("+x+"*"+y+")-("+z+"/"+w+")";resultArr.push(aResult);}
        else if (x*y-z-w==24){ var aResult = "("+x+"*"+y+")-"+z+"-"+w;resultArr.push(aResult);}
        else if (x*y+(z*w)==24){ var aResult = "("+x+"*"+y+")+("+z+"*"+w+")";resultArr.push(aResult);}
        else if (x*y-(z*w)==24){ var aResult = "("+x+"*"+y+")-("+z+"*"+w+")";resultArr.push(aResult);}
        else if (x*y/(z*w)==24){ var aResult = "("+x+"*"+y+")/("+z+"*"+w+")";resultArr.push(aResult);}
        else if (x*y/(z-w)==24){ var aResult = "("+x+"*"+y+")/("+z+"-"+w+")";resultArr.push(aResult);}
        else if (x*y/(z+w)==24){ var aResult = "("+x+"*"+y+")/("+z+"+"+w+")";resultArr.push(aResult);}        
    }
    answer = unique(resultArr);
    var level = gameLevel(answer), level4 = 0;
    if(g == '随机') {
      var rd = createRandomNum();
      if (level == 3 )
        level4 = 4;
      else if (rd > 7 && level == 2)
        level4 = 4;
      else if (rd == 1 && level == 1)
        level4 = 4;
    }
    //if ((g=='初级' && easyNums(str) >2  && answer.length>0) ||(g == '中级' && easyNums(str)==2 && answer.length>0) || (g == '高级' && easyNums(str)<=1 && answer.length>0) ){
    if ((g == '初级' && level == 1 && answer.length > 0) || (g == '中级' && level == 2 && answer.length > 0) || (g == '高级' && level == 3 && answer.length > 0) || (g == '随机' && level4 == 4 && answer.length > 0)) {
        str.map(function(kk){
            newArr.push(String(kk));
        })
        // console.log(answer);
        // console.log(level);
        return {answer:answer,nums:newArr}
    }     
}

//老黄增加：12点或6点
//穷举计算 生成符合规则的新题
function count2(g, sum, tryTimes) {
  let newArr = [], answer = [], str = [createRandomNum(), createRandomNum(), createRandomNum()], countStr = arrayList3(str.sort()), resultArr = [];

  for (var i = 0; i < countStr.length; i++) {
    var x = countStr[i].a;
    var y = countStr[i].b;
    var z = countStr[i].c;
    if (x + y + z == sum) { var aResult = x + "+" + y + "+" + z; resultArr.push(aResult); }
    else if ((x + y) * z == sum) { var aResult = "(" + x + "+" + y + ")*" + z; resultArr.push(aResult); }
    else if ((x - y) * z == sum) { var aResult = "(" + x + "-" + y + ")*" + z; resultArr.push(aResult); }
    else if (x - y - z == sum) { var aResult = x + "-" + y + "-" + z; resultArr.push(aResult); }
    else if (x + y - z == sum) { var aResult = x + "+" + y + "-" + z; resultArr.push(aResult); }
    else if (x * y * z == sum) { var aResult = x + "*" + y + "*" + z; resultArr.push(aResult); }
    else if (x * y + z == sum) { var aResult = x + "*" + y + "+" + z; resultArr.push(aResult); }
    else if (x * y - z == sum) { var aResult = x + "*" + y + "-" + z; resultArr.push(aResult); }
    else if (z - x * y == sum) { var aResult = z + "-" + x + "*" + y; resultArr.push(aResult); }
    else if (x * y / z == sum) { var aResult = x + "*" + y + "/" + z; resultArr.push(aResult); }
    else if ((x + y) / z == sum) { var aResult = "(" + x + "+" + y + ")/" + z; resultArr.push(aResult); }
    else if (x + y / z == sum) { var aResult = x + "+" + y + "/" + z; resultArr.push(aResult); }
    else if (x - y / z == sum) { var aResult = x + "-" + y + "/" + z; resultArr.push(aResult); }
    else if (y / z - x == sum) { var aResult = y + "/" + z + "-" + x; resultArr.push(aResult); }
    else if (x / y / z == sum) { var aResult = x + "/" + y + "/" + z; resultArr.push(aResult); }
  }
  answer = unique(resultArr);
  var level = 1;
  if (tryTimes < 10) {
    // console.log("gameLevel");
    level = gameLevel2(answer);
  }
  else {
    // console.log("gameLevel2");
    level = gameLevel2(answer);
  }
  var level = gameLevel(answer), level4 = 0;
  if (g == '随机') {
    var rd = createRandomNum();
    if (level == 3)
      level4 = 4;
    else if (rd > 8 && level == 2)
      level4 = 4;
    else if (rd == 1 && level == 1)
      level4 = 4;
  }
  // if ((g == '初级' && easyNums(str) > 2 && answer.length > 0) || (g == '中级' && easyNums(str) == 2 && answer.length > 0) || (g == '高级' && easyNums(str) <= 1 && answer.length > 0)) {
  if ((g == '初级' && level == 1 && answer.length > 0) || (g == '中级' && level == 2 && answer.length > 0) || (g == '高级' && level == 3 && answer.length > 0) || (g == '随机' && level4 == 4 &&answer.length > 0)) {
    str.map(function (kk) {
      newArr.push(String(kk));
    })
    // console.log(answer);
    // console.log(level);
    return { answer: answer, nums: newArr }
  }
}

module.exports = {
  formatTime: formatTime,
  count:count,
  count2:count2,
  empty:empty
}
