/**
* zepto touchSlider - 移动端触摸滑动幻灯插件
* @version 1.0.0
* @author haibao <hhb219@163.com> <http://smwell.sinaapp.com/>
*/
;(function($) {	
	var a=0,b,n,s,s2;
	methods = {
        init: function (options) {
           	return this.each(function() {
				var $this = $(this), opt = $this.data('touchSlider');
                if(typeof(opt) == 'undefined') {
                	var defaults = {
                		box: '#slider-box',
                		arrows: true,
                		auto: false,
                		autoTime: 2000
                	};
					opt = $.extend({}, defaults, options);
					$this.data('touchSlider', opt);
                }
                opt = $.extend({}, opt, options);
                
                //生成按钮
                n = $(this).find('ul').eq(0).find('li').length;
                if(n > 1){
					b = '<ul id="arrow">';
					for (var i=0; i<n; i++){
						if(i == a){
							$(this).find('li').eq(0).addClass('active');
							b += '<li class="active"></li>';
						}else{
							b += '<li></li>';	
						}
					}
					b += '</ul>';
					if(opt.arrows == true){
						$(this).append(b);
					}else{
						$(this).append(b).find('#arrow').hide();
					}
				}
                
                //自动播放
				if(opt.auto == true){ 
					methods.a(opt);
				}
                
                //按钮点击事件
				$(this).find('#arrow li').click(function(){
					methods.c(opt);
					a = $(this).index();
					methods.r(opt);
				});
				
				//左右滑动事件，也可以换成上下滑动
				$(this).swipeLeft(function(){
					methods.c(opt);
					methods.n(opt);
				}).swipeRight(function(){
					methods.c(opt);
					methods.p(opt);
				});
			});
        },
        n: function (o) {
        	a = $('#arrow li.active').index() + 1;
			if(a >= $(o.box).find('ul').eq(0).find('li').length){ a = 0; }
			methods.r(o);
        },
        p: function (o) {
        	a = $('#arrow li.active').index() - 1;
			if(a < 0){ a = $(o.box).find('ul').eq(0).find('li').length - 1; }
			methods.r(o);
        },
        r: function (o) {
        	$(o.box).find('ul').eq(0).find('li').removeClass('active').eq(a).addClass('active');
			$(o.box).find('ul').eq(1).find('li').removeClass('active').eq(a).addClass('active');
        },
        a: function (o) {
        	s = setInterval(function(){ methods.n(o); },o.autoTime);
        },
        c: function (o) {
        	clearInterval(s);
			clearTimeout(s2);
			if(o.auto == true){
				s2 = setTimeout(function(){ methods.a(o); },o.autoTime);
			}
        }
    };
    
	$.fn.touchSlider = function (method) {
		if(methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }else if(typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }else {
            $.error('Error! Method' + method + 'does not exist on zepto.touchSlider！');
        }
	};
})(Zepto);
