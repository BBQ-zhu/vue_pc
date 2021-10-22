//深克隆
const clone = (obj) => {
    let newObj = Array.isArray(obj) ? [] : {}
    if (obj && typeof obj === "object") {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = (obj && typeof obj[key] === 'object') ? clone(obj[key]) : obj[key];
            }
        }
    }
    return newObj
}

//冒泡排序：arr为数组对象，name为对象中需要排序的属性
function bubbleSort (arr, name) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (parseInt(arr[j][name]) > parseInt(arr[j + 1][name])) { // 相邻元素两两对比
                var temp = arr[j + 1]; // 元素交换
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

const gottkefu = () => { //客服系统跳转
    var a = document.createElement("a");
    a.setAttribute("href", "https://w101.ttkefu.com/k/linkurl/?t=3B1IJD5");
    // a.setAttribute("target", "_blank");
    a.click();
}

const toPhone = () => {
    var a = document.createElement('a');
    a.setAttribute('href', 'tel:4001109939');
    document.body.appendChild(a);
    a.click();
}

const toUserPhone = (phone) => {
    var a = document.createElement('a');
    a.setAttribute('href', 'tel:'+phone);
    document.body.appendChild(a);
    a.click();
}

//下载文件
const download = (src, filName) => {
    let x = new XMLHttpRequest();
    x.open("GET", src, true);
    x.responseType = "blob";
    x.onload = function (e) {
        let url = window.URL.createObjectURL(x.response)
        let a = document.createElement('a')
        a.href = url
        a.download = filName
        a.click()
    }
    x.send()
}

//随机数
const random = (num) => {
    let number = Math.random() * num
    return moneyFormat(number)
}

// 千位分隔符
const moneyFormat = (val, none = '') => {
    if (val === undefined || val === null || val === '') {
        return none
    } else {
        // val = (val * 1).toFixed(2).toString()
        val = (val * 1).toFixed(0).toString()
        const reg = /(?=(\B\d{3})+$)/g
        if (val.indexOf('.') > -1) {
            const index = val.indexOf('.')
            const xiaoshu = val.slice(index, val.length)
            const zhengshu = val.slice(0, index)
            return zhengshu.replace(reg, ',') + xiaoshu
        } else {
            return val.replace(reg, ',')
        }
    }
}

module.exports = {
    clone,
    download,
    bubbleSort,
    gottkefu,
    moneyFormat,
    random,
    toPhone,
    toUserPhone
}
