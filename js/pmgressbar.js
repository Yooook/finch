// 柱形图

define(function(require,exports,module) {
	var PmgressBar = Class.extend({
		init: function(box,svgW, svgH,arr,skills) {
			this.skills = skills
			this.arr = arr;
			this.svgW = svgW;
			this.svgH = svgH;
			this.box = box;
			this.bar(this.box,this.svgW,this.svgH,this.arr,this.skills);
		},
		bar: function(box,svgW, svgH,arr,skills) {
			var barH = 5;
			var colors = ['#ddd','#f00','#6453c9','#000','#eee'];
			var padding = {left:80, right:30, top:20, bottom:20};
			var xlinear = d3.scale.linear()
				.domain([0,100])
				.range([0,svgW-padding.left-padding.right]);
			var yordinal = d3.scale.ordinal()
				.domain(skills)
				// 在序列比例尺下才可以用rangeRoundBands
				.rangeRoundBands([svgH-padding.top*2,0]);
			var ordinal = d3.scale.ordinal()
				.domain(colors.length)
				.range(colors);
			var axis = d3.svg.axis()
				.scale(xlinear)
				.orient('bottom')
				.ticks(10);
			var yaxis = d3.svg.axis()
				.scale(yordinal)
				.orient('left')
				// .ticks(7);
			var svg = d3.select(box)
				.append('svg')
				.attr('width',svgW)
				.attr('height',svgH);
				console.log(svg)
				// rect条
			svg.selectAll('rect')
				.data(arr)
				.enter()
				.append('rect')
				.attr('fill',function(d,i) {
					return ordinal(i)
				})
				.on("mouseover",function(d,i){
		            d3.select(this)
		                .attr("fill","yellow");
		           
		        })
		        .on("mouseout",function(d,i){
		            d3.select(this)
		                .transition()
		                .duration(500)
		                .attr("fill",ordinal(i));
		        })
				.attr('x',function(i) {
					return padding.left+1;
				})
				.attr('y',function(d,i) {
					console.log(skills[i])
					return yordinal(skills[i])+padding.top+barH/2;
				})
				.attr('width',function(d) {
					var min = xlinear.domain()[0];
	    			return xlinear(min);
					// return xlinear(d)-padding.right;
				})
				.transition()
				.delay(function(d,i){
				    return i * 200;
				})
				.duration(2000)
				.ease("bounce")
				.attr("width",function(d){
				    return  xlinear(d)-padding.right;
				})
				.attr('height',function(i) {
					return (svgH-padding.top*2-barH*arr.length+1)/arr.length;
				});
			// 文字
			svg.selectAll('.text')
				.data(arr)
				.enter()
				.append('text')
				.style('font-size','10px')
				.attr('class','text')
				.attr('x',function(d) {
					return padding.left;
				})
				.attr('y',function(d,i) {
					// 水平显示
					// return yordinal(i)+padding.top+barH/2;
					return 0;
				})
				.transition()
				.delay(function(d,i){
				    return i * 200;
				})
				.duration(2000)
				.attr('x',function(d) {
					return xlinear(d);
				})
				.attr('y',function(d,i) {
					return yordinal(skills[i])+padding.top+barH/2;
				})
				.attr('dx',function() {
					return 60;
				})
				.attr('dy',function() {
					// 文字居中
					return (yordinal.rangeBand() - barH/2)/2;;
				})
				.text(function(d) {
					return d;
				})
			
			svg.append("g")
				.attr("class","axis")
				.attr("transform","translate("+ padding.left +","+(svgH-padding.top)+")")
				.call(axis);
			svg.append("g")
				.attr("class","axis")
				.attr("transform","translate("+ padding.left +","+padding.top+")")
				.call(yaxis);
			}
	});
	module.exports = PmgressBar;
})