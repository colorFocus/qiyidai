/**
 * 项目名称: [tab页签切换]
 * 项目描述: [当点击上面页签的时候，下面显示对应的内容块]
 * 创建人: [tianshu]
 * 创建时间: [2016-02-18]
 * 修改人: [${user}]
 * 修改时间: [${date} ${time}]
 * 修改备注: [说明本次修改内容]
 */
/**
 * @param  {node} node 外层节点
 * @param  {object} opt
 * @param  {object} opt.tabs tabs外层容器class
 * @param  {object} opt.conts conts外层容器class
 * @param  {object} opt.active 选中时候添加的class
 * @param  {object} opt.index 从第几个索引值开始，默认从0开始
 * @param  {object} opt.evt 切换tab签的事件类型，默认是click
 */
function Tab(node, opt) {
    this.$node = $(node);
    this.opt = $.extend({
        tabs: '.js-tabs',
        conts: '.js-conts',
        active: 'active',
        index: 0,
        evt: 'click'
    }, opt || {});
    this.init();
}
Tab.prototype = {
    init: function() {
        this.$tabs = this.$node.find('.js-tabs');
        this.$tabItem = this.$tabs.children();
        this.tabType = this.$tabItem.eq(0)[0].tagName.toLowerCase();
        this.$contItem = this.$node.find('.js-conts').children();
        this.active(this.opt.index);
        this.bind();
    },
    bind: function() {
        this.$tabs.delegate(this.tabType, this.opt.evt, $.proxy(this.switch, this));
    },
    //切换
    switch: function(e) {
        var $target = $(e.currentTarget);
        this.opt.index = $target.index();
        this.active(this.opt.index);
        this.$node.trigger('ui-tab-switch', [this.opt.index]);
    },
    //切换active当前选中样式
    active: function(index) {
        this.$tabItem.removeClass(this.opt.active);
        this.$contItem.removeClass(this.opt.active);
        this.$tabItem.eq(index).addClass(this.opt.active);
        this.$contItem.eq(index).addClass(this.opt.active);
    }
};
module.exports = function(node, opt) {
    return new Tab(node, opt);
};;