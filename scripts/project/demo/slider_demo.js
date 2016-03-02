/**
 * 项目名称: [${project_name}]
 * 项目描述: [${description}]
 * 创建人: [${user}]
 * 创建时间: [${date} ${time}]
 * 修改人: [${user}]
 * 修改时间: [${date} ${time}]
 * 修改备注: [说明本次修改内容]
 */
var slider = require('../../module/slider');
/**
 * [funcName：description]
 * @param  {String} str description
 * @return {[type]} descrition
 */
//组件等页面初始化
var build = function() {
    var $slider = $('.js-slider');
    slider($slider, {
        auto: true
    });
};
//事件代理和绑定
var bind = function() {};
//初始化入口函数
var init = function() {
    build();
    bind();
};
init();