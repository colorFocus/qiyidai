/**
 * 项目名称: [${project_name}]
 * 项目描述: [${description}]
 * 创建人: [${user}]
 * 创建时间: [${date} ${time}]
 * 修改人: [${user}]
 * 修改时间: [${date} ${time}]
 * 修改备注: [说明本次修改内容]
 */
var login = require('../../module/login');
var boxTmpl = require('./tmpl/box.js');

//组件等页面初始化
var build = function() {
    var $title = $('.js-title');
    console.log('home title:  ', !!jQuery, !!$, $title.html());
    login();
    var data = {
        name: 'box tmpl ~~~',
        state: 1,
        list: ['tsdong', 'yizhou', 'guojun'],
        object: {
            name: 'tsdong',
            age: '26',
            hobby: 'sing'
        }
    };
    var boxHtml = doT.template(boxTmpl).apply(null, [data]);
    //var id = document.getElementById('template_home').innerHTML;
    //var boxHtml = doT.template(id).apply(null, [data]);
    $title.html(boxHtml);
};

//事件代理和绑定
var bind = function() {

};

//初始化入口函数
var init = function() {
    build();
    bind();
};

init();