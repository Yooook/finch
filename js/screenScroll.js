
// 屏幕滚动模块

define(function(require,exports,module) {
	var ScreenScroll  = Class.extend({
		init: function() {
			this.backgroundColor = ["#fff","rgb(237, 237, 237)","rgb(148, 196, 219)","#ffc761","#f99","pink"];
			this.bindEvent();
			this.Person = require('./flash.js');
			var s = new this.Person();
			s.foot();

			this.ContentScroll = require('./contentScroll.js');
			var c = new this.ContentScroll();
			c.scroll();

		
			// 技能数据
			var skills = ['html','css','h5','css3','javascript','canvas','ajax','angular','Ionic','react','react native','PHP','mysql','ps']
			var arr = [90,85,50,60,90,70,80,72,68,55,60,65,70,65];
			var svgW = 500;
			var svgH = 200;
			var box = '#skills'
			// 类库数据
			var skills1 = ['jquery','bootstrap','arttemplate.js','npm','bower','gulp','Simple.js','sea.js','swiper.js','jspm','babel','webpack','konva.js','d3.js']
			var arr1 = [70,85,40,65,65,35,65,60,50,40,45,30,20,60];
			var svgW1 = 500;
			var svgH1 = 200;
			var box1 = '#frames'
			var flat = 1;
			var fengge = document.getElementById('fengge');
			fengge.addEventListener('click',function() {
				if (flat) {
					var PmgressBar = require('./pmgressbar.js');
					var p = new PmgressBar(box,svgW,svgH,arr,skills);
					var p1 = new PmgressBar(box1,svgW1,svgH1,arr1,skills1);
					this.Angle = require('./angle.js');
					var a = new this.Angle('#angle');
					this.Power = require('./power.js');
					var a = new this.Power('#power');
					flat = 0;
				}else {
					return;
				}
				
			})
		},

		bindDOM: function() {
			
		},

		bindEvent: function() {
			var content = document.getElementById('content-box');
			var backtop = document.getElementById('backtop');
			var lis = document.getElementById('content-box').children;
			var ols = document.getElementById('content-btn').children;
			for (var i = 0; i < lis.length; i++) {
				lis[i].style.backgroundColor = this.backgroundColor[i];
				// ols[i].style.backgroundColor = this.backgroundColor[i];
				var leader = 0 , target = 0 ,timer = null;
				ols[i].addEventListener('click',showPage(i));
				function showPage(num){
					return function() {
						if (num !== 1) {
							backtop.style.display = 'none';
						}
						clearInterval(timer);
						target = lis[num].offsetLeft;
						console.log(lis.length)
						timer = setInterval(function() {
							leader = leader + (target - leader)/10;
							// 必须abs，否则上翻页无动画
							if (Math.abs(target-leader) <= 3) {
								leader = target;
							}
							window.scrollTo(leader,0);
						},40);
					}
				}
			}
		}
	});

	module.exports = ScreenScroll;
})

