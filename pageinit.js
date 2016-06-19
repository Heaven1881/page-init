
var Page = {};

/**
 * 页面URL信息类
 */
Page.Queries = {};

/**
 * 保存页面URL的参数
 */
Page.Queries._data = {};

/**
 * 获取URL参数key的第一个值
 * @param {string} key URL参数的key字段
 * @return {value} key对应的
 * - 如果key对应的value存在且只有一个，则返回这个value
 * - 如果key对应的value不存在，则返回undefined
 * - 如果key对应的value是一个列表，则返回这个列表的第一个值
 */
Page.Queries.getFirst = function(key) {
    if (key in Page.Queries._data) {
        var args = Page.Queries._data[key];
        if (args.length > 0) {
            return args[0];
        }
    }
    return undefined;
};

/**
 * 获取URL参数对应的列表
 * @param {string} key URL参数对应的key字段
 * @return {list} key 对应的value
 * 该函数无论如何都会返回list
 * - 如果key对应的value不存在，返回[]
 * - 如果key对应的value只有一个，返回[value]
 * - 如果key对应的value只有一个，返回对应长度的list
 */
Page.Queries.getList = function(key) {
    if (key in Page.Queries._data) {
        return Page.Queries._data[key];
    } else {
        return [];
    }
};

/**
 * 获取浏览器显示的URL并解析其参数
 * - 所有的参数都以列表的形式储存，这是为了兼容同一个key多个参数
 */
Page.Queries._init = function() {
    var args = location.search.substring(1).split('&');
    for (var i in args) {
        var argpair = args[i].split('=');
        var key = argpair[0];
        var value = argpair[1];
        if (key in Page.Queries._data) {
            Page.Queries._data[key].push(value);
        } else {
            Page.Queries._data[key] = [value];
        }
    }
}
