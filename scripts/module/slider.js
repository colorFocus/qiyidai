/**
 * 项目名称: [图片轮播组件]
 * 项目描述: [图片可以自动轮播，或者是通过前后翻页，或者是点击dot翻页]
 * 创建人: [tianshu]
 * 创建时间: [2016-02-18]
 * 修改人: [${user}]
 * 修改时间: [${date} ${time}]
 * 修改备注: [说明本次修改内容]
 */
/**
 * @param  {node} node 外层节点
 * @param  {object} opt
 * @param  {object} opt.interval 图片轮播的间隔时间，ms为单位
 * @param  {object} opt.duration 一张图片滚动的时长
 * @param  {object} opt.auto 是否自动轮播 默认值为true
 */
function Slider(node, opt) {
    this.$node = $(node);
    this.opt = $.extend({
        interval: 3000,
        duration: 600,
        auto: true
    }, opt || {});
    this.index = 0; //图片轮播的指针
    this.interval = null;
    this.sliding = false; //是否处于slider状态
    this.init();
}
Slider.prototype = {
    init: function() {
        this.$list = this.$node.find('.js-list');
        this.$item = this.$list.children();
        this.$first = this.$item.eq(0);
        this.$dots = this.$node.find('.js-dots');
        this.$dotItem = this.$dots.children();
        this.$next = this.$node.find('.js-next');
        this.$prev = this.$node.find('.js-prev');
        this.num = this.$item.size();
        this.$item.css({
            left: '-100%'
        });
        this.$first.css({
            left: 0,
            zIndex: 10
        });
        this.$first.nextAll().css({
            left: '100%'
        });
        this.opt.auto && this.cycle();
        this.bind();
    },
    bind: function() {
        this.$next.on('click', $.proxy(this.next, this));
        this.$prev.on('click', $.proxy(this.prev, this));
        this.$dots.delegate('li', 'click', $.proxy(this.dot, this));
        this.$list.on('mouseenter', $.proxy(this.pause, this)).on('mouseleave', $.proxy(this.cycle, this));
    },
    //轮播
    cycle: function() {
        clearInterval(this.interval);
        this.interval = setInterval($.proxy(this.next, this), this.opt.interval);
    },
    //暂停
    pause: function() {
        clearInterval(this.interval);
    },
    //下一张
    next: function() {
        if (this.sliding) return;
        this.index++;
        if (this.index >= this.num) {
            this.index = 0;
        }
        this.scroll();
    },
    //前一张
    prev: function() {
        if (this.index == 0) {
            this.index = this.num;
        }
        this.index--;
        this.scroll();
    },
    //点击dot
    dot: function(e) {
        if (this.sliding) return;
        var $target = $(e.currentTarget);
        var index = $target.index();
        if (index != this.index) {
            this.index = index;
        }
        this.scroll();
    },
    //滚动
    scroll: function() {
        this.sliding = true;
        this.$item.css('zIndex', 0);
        this.$item.eq(this.index).css({
            zIndex: 10
        }).animate({
            left: 0
        }, this.opt.duration, $.proxy(function() {
            this.$item.eq(this.index).prevAll().css({
                left: '-100%'
            });
            this.$item.eq(this.index).nextAll().css({
                left: '100%'
            });
            this.sliding = false;
        }, this));
        this.$dotItem.removeClass('active');
        this.$dotItem.eq(this.index).addClass('active');
    }
};
module.exports = function(node, opt) {
    return new Slider(node, opt);
};;