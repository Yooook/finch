// 动画制作

define(function(require,exports,module) {
	var Person = Class.extend({
		init: function() {

		},

		foot: function(){
			var smallPerson = document.getElementById('small_person');
			var step = document.getElementById('step');
			var earth = document.getElementById('earth');
			var bg = document.getElementById('backg');
			var fly = document.getElementById('fly');
			var box1 = document.getElementById('box1');
			var box2 = document.getElementById('box2');
			var box3 = document.getElementById('box3');
			var media = document.getElementById('media');
			var aswer = document.getElementById('aswer');
			var one_title = document.getElementById('one_title');
			var num = 0;
			var n = 0;
			var s = 0;
			var leader = 0,target = parseInt(smallPerson.style.top);
			var timer = null;
			step.addEventListener('click',function(){
				// 打开音乐
				media.play();
				// 改变按钮颜色
				step.style.color = 'red';

				clearInterval(timer);
				timer = setInterval(function(){
					s+=4;
					num++;
					bg.style.left = -s+"px";
					console.log(box1.offsetLeft)
					
					// 提示框
					if (s > (box1.offsetLeft-150)) {
						box1.style.opacity= 1;
					}
					if (s > (box2.offsetLeft-150)) {
						box2.style.opacity= 1;
					}
					// 对话
					if (s > (box3.offsetLeft)) {
						aswer.style.display = 'block';
					}
					if (s > (box3.offsetLeft+100)) {
						aswer.style.display = 'none';
					}
					// 跨越障碍
					if (num > 24) {
						num = 1;
						n++;
					}else {
						smallPerson.style.backgroundPositionX = -num*80+'px';
					}
					// 一直行走
					if (n>7 && num > 7) {
						num = 1;
					}
					// 坠落
					if (s>(bg.offsetWidth-smallPerson.offsetLeft)) {
						s= s;
						target = 100;
						leader = leader+(target-leader)/10;
						smallPerson.style.top = leader+"px";
						if (s>(bg.offsetWidth-smallPerson.offsetLeft+200)) {
							smallPerson.style.visibility = 'hidden';
						}
					}
					// 显现
					if (s>4000 ) {
						aswer.innerHTML = '陷入困境又何妨，我依然坚信，每个程序员最初的梦想都是改变世界';
						aswer.style.top = "-60px";
						aswer.style.width = "140px"; 
						aswer.style.display = 'block';
						target = -370;
						fly.className = 'fly';
						fly.style.display = 'block';
						smallPerson.style.visibility = 'visible';
						earth.style.display = 'block';
						leader = leader+(target-leader)/10;
						smallPerson.style.top = leader+"px";
						if (s>4200) {
							one_title.className = 'one_title';
						}
					}
					// 关闭音乐
					if (s>5120) {
						media.pause();
					}
				},70)
			});
			
		}
 	})
	module.exports = Person;
})