
// 力导向图

define(function(require,exports,module) {
	var Power = Class.extend({
		init: function(box) {
			this.load(box);
		},
		load: function(box) {
			var nodes = [ { name: "关注国际局势" }, { name: "关注技术" },
              { name: "刷博客" }, { name: "运动" },
              { name: "学习" }, { name: "不看综艺" },
              { name: "IT兴趣高昂" }, { name: "Me" } ];
 
 			var edges = [ { source : 0 , target: 7 } , { source : 1 , target: 7 } ,
               { source : 2 , target: 7 } , { source : 3 , target: 7 } ,
               { source : 4 , target: 7 } , { source : 5 , target: 7 }, { source : 6 , target: 7 }];
	         var color = d3.scale.category20();       
	         var svg = d3.select(box)
				.append('svg')
				.attr('width',400)
				.attr('height',400);

	         var force = d3.layout.force()
	         	.nodes(nodes)
	         	.links(edges)
	         	.size([400,400])
	         	.linkDistance(100)
	         	.charge([-400]);
	         force.start();
	        
	         var svg_edges = svg.selectAll('line')
	         	.data(edges)
	         	.enter()
	         	.append('line')
	         	.style('stroke','#ccc')
	         	.style('stroke-width',1);
	         var svg_nodes = svg.selectAll('circle')
	         	.data(nodes)
	         	.enter()
	         	.append('circle')
	         	.attr('r',20)
	         	.style('fill',function(d,i) {
	         		return color(i);
	         	})
	         	.call(force.drag)
	         // 正方形
	         // var svg_nodes = svg.selectAll('rect')
	         // 	.data(nodes)
	         // 	.enter()
	         // 	.append('rect')
	         // 	.attr('width',30)
	         // 	.attr('height',30)
	         // 	.style('fill',function(d,i) {
	         // 		return color(i);
	         // 	})
	         // 	.call(force.drag)

	          //添加描述节点的文字
			 var svg_texts = svg.selectAll("text")
			     .data(nodes)
			     .enter()
			     .append("text")
			     .style("fill", "black")
			     .attr("dx", 20)
			     .attr("dy", 8)
			     .text(function(d){
			        return d.name;
			     });

			  force.on("tick", function(){ //对于每一个时间间隔
			    //更新连线坐标
			    svg_edges.attr("x1",function(d){ return d.source.x; })
			        .attr("y1",function(d){ return d.source.y; })
			        .attr("x2",function(d){ return d.target.x; })
			        .attr("y2",function(d){ return d.target.y; });
			 
			    //更新节点坐标
			    // 正方形
			    // svg_nodes.attr("x",function(d){ return d.x-10; })
			    //     .attr("y",function(d){ return d.y-10; });
			 	svg_nodes.attr("cx",function(d){ return d.x; })
			        .attr("cy",function(d){ return d.y; });
			    //更新文字坐标
			    svg_texts.attr("x", function(d){ return d.x; })
			       .attr("y", function(d){ return d.y; });
			 });
		}
	});
	module.exports = Power;
})