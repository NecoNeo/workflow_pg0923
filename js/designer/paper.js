define(["config", "toolBox", "node", "line", "propertyBox"],
	function(Config, ToolBox, Node, Line, PropertyBox) {
		return function(opt) {
			var options = $.extend(true, {}, Config.paper, opt),
				that = this,
				$obj = $("#" + options.objId),
				paper = Raphael(options.objId, options.width, options.height),
				toolBox = new ToolBox(),
				propertyBox = new PropertyBox(paper),
				init = function() {
					$obj.addClass(options.cssClass)
						.css({
							"width": options.width,
							"height": options.height
						})
						.click(function(e) {
							if (e.target.tagName == "svg") {
								clickPaper(e.clientX, e.clientY);
							}
						});

					$(document).keydown(function(e){
						if (e.keyCode == 46) {
							var currentObject = $(paper).data("currentObject");
							if (currentObject != null) {
								$(paper).data("currentObject").remove();
								$(paper).data("currentObject",null);
							}
						}
					});

					$(paper).data("nodes",[]);
				}
				clickPaper = function(x,y){
					if(toolBox.state){
						if (toolBox.state.type == "node") {
							var attr = {
								"x": x,
								"y": y
							};
							var node = new Node(paper, propertyBox, toolBox.state.nodeType, {"attr":attr});
							$(paper).data("nodes").push(node);
							toolBox.changeState("");
						} else if (toolBox.state.type == "next" && $(paper).data("currentObject")) {
							var attr = {
								"x": x,
								"y": y
							};
							var line = new Line(paper, propertyBox, toolBox.state.lineType, {"attr":attr}, $(paper).data("currentObject"));
							$(paper).data("nodes").push(line);
							toolBox.changeState("");
						}
					} else {
						$($(paper).data("nodes")).map(function(){
							this.blur();
						});
					}
				};

			init();
		};
	}
);