// 扇形图

define(function(require,exports,module) {
	var Angle = Class.extend({
		init: function(box) {
			this.load(box);
		},
		load: function(box) {
			var arr = [ 40 , 60 , 30 , 35  ];
			var arr1 = [ '数据可视化' , '前端开发' , 'h5方向' , 'web游戏'  ];
			var pie = d3.layout.pie();
			var piedata = pie(arr);
			var outerRadius = 100;
			var innerRadius = 0;
			var title = '感兴趣'
			var arc = d3.svg.arc()
				.innerRadius(innerRadius)
				.outerRadius(outerRadius);
			var svg = d3.select(box).append('svg').attr('width',300).attr('height',300);
			var color = d3.scale.category10(); 
			var arcs = svg.selectAll('g')
				.data(piedata)
				.enter()
				.append('g')
				.attr("transform","translate(150,150)");

			arcs.append("path")
			    .attr("d",function(d){
			        return arc(d);   //调用弧生成器，得到路径值
			    })

			    .attr("opacity",function(d){
			        return 0.8;   //调用弧生成器，得到路径值
			    })
			    // 鼠标滑过扇区变色
			    .on('mouseover',function(d,i) {
			    	d3.select(this)
			    		.transition()
		                .duration(500)
		                .attr("fill",color(i))
		                .attr("transform",function(d){
	                        return "translate(" + arc.centroid(d)[0]*0.2 +','+ arc.centroid(d)[1]*0.2 +  ") scale(1.1)";
	                    })
	                     .attr("opacity",function(d){
					        return 1;   //调用弧生成器，得到路径值
					    });
	                d3.select('text')
	                	.transition(i)
		                .duration(500)
		                .attr("transform",function(d,i){
	                        return "translate(" + arc.centroid(d)[0]*1.2 +','+ arc.centroid(d)[1]*1.2 +  ") scale(1.1)";
	                    })
			    })
			    .on('mouseout',function(d,i) {
			    	d3.select(this)
			    		.transition()
		                .duration(500)
		                .attr("fill",color(i))
		                .attr("transform",function(d){
	                       return "translate(" + [0,0] + ")";
	                    })
	                     .attr("opacity",function(d){
					        return 0.8;   //调用弧生成器，得到路径值
					    });
			    })
			     .attr("fill",function(d,i){
			        return '#fff';
			    })
			    .transition()
			   	.delay(function(d,i){
				    return i * 500;
				})
				.ease("bounce")
				.duration(6000)
				
			    .attr("fill",function(d,i){
			        return color(i);
			    });
			
				arcs.append("text")
					
				    .attr("transform",function(d){
				    	// arc.centroid(d) 能算出弧线的中心s
				        return "translate(" + arc.centroid(d) + ")";
				    })
				    .attr("text-anchor","middle")
				    .data(arr1)
				    .text(function(d,i){
				    	//  d.data 才是转换前的整数的值
				        return d;
				    });
				 arcs.append("text")
					.datum(title)
				  	.attr("transform",function(d){
				    	// arc.centroid(d) 能算出弧线的中心s
				        return "translate(-20,-110)";
				    })
				    .text(function(d,i){
				    	//  d.data 才是转换前的整数的值
				        return d;
				    });
		}
	});
	module.exports = Angle;
})