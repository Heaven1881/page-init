
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
};

/**
 * Page的渲染模块
 */
Page.Render = {};

/**
 * 保存Rander的数据
 */
Page.Render._data = {};

/**
 * Render的默认数据
 */
Page.Render._defaultData = {
    // 渲染的handlebars模板id
    template: null,

    // 是否在页面初始化时自动载入
    autoload: true,

    // 使用的数据，可以是ajax对象或者一个函数对象
    data: null,
};

/**
 * 添加Render
 * Render的描述参考Rage.Render._defaultData
 * Render中没有指定的字段会使用默认值代替
 * 如果对应name的Render已经存在，那么覆盖原来的Render
 * @param {string} name
 * @param {object} render
 */
Page.Render.setRender = function(name, render) {
    // 添加默认值
    for (var key in Page.Render._defaultData) {
        if (!(key in render)) {
            render[key] = Page.Render._defaultData[key];
        }
    }

    // TODO 内容有效性检查

    Page.Render._data[name] = render;
};

/**
 * 运行名字为name的Render对象
 * 如果对应名字的Rander不存在，则什么也不做
 * @param {string} name Rander 的名字
 */
Page.Render._runRender = function(name) {
    var renderObj = Page.Render._data[name];
    if (renderObj == null) {
        return;
    }

    // 获取数据
    var templateId = renderObj.template;
    var obj = renderObj.data;
    if (typeof obj === 'function') {
        Page.Render._functionRender(obj, templateId);
    } else if (typeof obj === 'object') {
        Page.Render._ajaxRender(obj, templateId);
    }
};

/**
 * 渲染函数对象
 * @param {function} funcObj
 * @param {string} templateId
 */
Page.Render._functionRender = function(funcObj, templateId) {
    // 获取数据
    var data = funcObj();

    // 渲染
    var $sourceElement = $('#' + templateId);
    var source = $sourceElement.html();
    var template = Handlebars.compile(source);
    var html = template(data);

    // 创建并填充HTML
    $sourceElement.after('<div id="page-' + templateId + '"></div>');
    $('#page-' + templateId).html(html);
};

/**
 * 渲染ajax对象
 * @param {object} ajaxObj
 * @param {string} templateId
 */
Page.Render._ajaxRender = function(ajaxObj, templateId) {
    $.ajax(ajaxObj).done(function(data) {
        // 渲染
        var $sourceElement = $('#' + templateId);
        var source = $sourceElement.html();
        var template = Handlebars.compile(source);
        var html = template(data);

        // 创建并填充HTML
        $sourceElement.after('<div id="page-' + templateId + '"></div>');
        $('#page-' + templateId).html(html);

    });
};

/**
 * 运行渲染初始化
 * 渲染所有autoload == true
 */
Page.Render._init = function() {
    for (var name in Page.Render._data) {
        var renderObj = Page.Render._data[name];
        if (renderObj.autoload == true) {
            Page.Render._runRender(name);
        }
    }
};
