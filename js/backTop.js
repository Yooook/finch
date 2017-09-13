// 返回顶部

define(function(require,exports,module) {
	var Back = Class.extend({
		init: function() {

		},
		backTop: function() {
			var backTop = document.getElementById('backtop');
			var scroll = document.getElementById('scroll');
			var contentbox = document.getElementById('contentbox');
			var innerbox = document.getElementById('innerbox');

			var that = this;
			function onMouseWheel() {
				scroll.offsetTop >= 10 ? that.show(backTop) : that.hide(backTop);

			}
		
			var leader = 0 , target = 0, timer = null;
			backTop.onclick = function() {
				target = 0;
				leader = scroll.offsetTop;
				timer = setInterval(function() {
					leader = leader + (target - leader)/10;
					scroll.style.top = leader  + 'px';
					console.log(scroll.offsetTop)
					contentbox.style.top = -leader + 'px';

					if (scroll.offsetTop <= target) {
						that.hide(backTop);
						clearInterval(timer);
					}
				},50);
			}


			addEvent(contentbox,'mousewheel',onMouseWheel);
	        addEvent(contentbox,'DOMMouseScroll',onMouseWheel);
	        function addEvent(obj,xEvent,fn) {
		        if(obj.attachEvent){
		            obj.attachEvent('on'+xEvent,fn);
		        }else{
		            obj.addEventListener(xEvent,fn,false);
		        }
		    }
		},
		show: function(obj) {
			obj.style.display = 'block'
		},
		hide: function(obj) {
			obj.style.display = 'none'
		},
		scroll: function() {
			if (window.pageYOffset != null) {
				return {
					left:pageXOffset,
					topL:pageYOffset
				}
			}else if (document.compatMode == "CSS1Compat") {
				return {
					left:document.documentElement.scrollLeft,
					top:document.documentElement.scrollTop,
				}
			}
			return {
				left:document.body.scrollLeft,
				top:document.body.scrollTop

			}
		}
	});
	module.exports = Back;
})