// contentScroll

define(function(require,exports,module) {
	var ContentScroll = Class.extend({
		init: function() {
			this.Back = require('./backTop.js');
			var b = new this.Back();
			b.backTop()
		},
		scroll: function() {
			var aboutBox = document.getElementById('about');
			var contentBox = document.getElementById('contentbox')
			var bar = document.getElementById('scroll');
			var backTop = document.getElementById('backtop');
			// 计算滚动条高度
			var barHeight = aboutBox.offsetHeight/contentBox.offsetHeight*aboutBox.offsetHeight;
			bar.style.height = barHeight+"px";

			bar.onmousedown = function(event) {
				var event = event || window.event;
				var t  = event.clientY - this.offsetTop;
				var that = this;
				document.onmousemove = function(event) {
					var event = event || window.event;
					var barTop = event.clientY - t;
					// 计算内容显示位置
					var contentTop = (contentBox.offsetHeight-aboutBox.offsetHeight) / (aboutBox.offsetHeight - that.offsetHeight) * barTop;
					if (barTop < 0) {
						barTop = 0;
						backTop.style.display='none';
					}else if (barTop > aboutBox.offsetHeight - that.offsetHeight) {
						barTop = aboutBox.offsetHeight - that.offsetHeight;
					}else {
						contentBox.style.top = -contentTop +"px";
						backTop.style.display='block';
					}
					that.style.top =  barTop + "px";
					window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();
				}
			}
			document.onmouseup = function() {
				document.onmousemove = null;
			}

  			// 滚轮事件
	        function onMouseWheel(ev) {
	            var ev = ev || window.event;
	            var down = true; // 定义一个标志，当滚轮向下滚时，执行一些操作
	            down = ev.wheelDelta?ev.wheelDelta<0:ev.detail>0;
	            if (aboutBox.offsetHeight >= contentBox.offsetHeight) {
	            	bar.style.top = 0;
	            }
	            var innerbox = document.getElementById('innerbox');
	            var contentTop = (contentBox.offsetHeight-aboutBox.offsetHeight) / (aboutBox.offsetHeight - bar.offsetHeight) * bar.offsetTop;
	            // console.log((contentBox.offsetHeight-aboutBox.offsetHeight) / (aboutBox.offsetHeight - bar.offsetHeight))
	            if(down){
	            	if ((bar.offsetTop+bar.offsetHeight) >= aboutBox.offsetHeight-10) {
	            		 bar.style.top = aboutBox.offsetHeight-bar.offsetHeight+'px';
	            	}else {
	            		 bar.style.top = bar.offsetTop+3+'px';
	            		 
	            	}
	            }else{
	                if (10 >= bar.offsetTop) {
	            		 bar.style.top = 0;
	            	}else {
	            		 bar.style.top = bar.offsetTop-3+'px';
	            		
	            	}
	            }
	            // console.log(-contentTop)
	            // innerbox.style.top = -contentTop +"px";
	            contentBox.style.top = -contentTop +"px";
	            console.log(-contentTop)
	            if(ev.preventDefault){/*FF 和 Chrome*/
	                ev.preventDefault();// 阻止默认事件
	            }
	            return false;
	        }
	        addEvent(aboutBox,'mousewheel',onMouseWheel);
	        addEvent(aboutBox,'DOMMouseScroll',onMouseWheel);
	        function addEvent(obj,xEvent,fn) {
		        if(obj.attachEvent){
		            obj.attachEvent('on'+xEvent,fn);
		        }else{
		            obj.addEventListener(xEvent,fn,false);
		        }
		    }
		}
	});

module.exports = ContentScroll;
})
