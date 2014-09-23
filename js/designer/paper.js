define(["jquery", "raphael", "config", "toolBox", "node", "propertyBox"],
	function($, Raphael, Config, ToolBox, Node, PropertyBox) {
		return function(opt) {
			var options = $.extend(true, {}, Config.paper, opt),
				that = this,
				$obj = $("#" + options.objId),
				paper = new Raphael(options.objId, options.width, options.height),
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
						var attr = {
							"x": x,
							"y": y
						};
						var node = new Node(paper,toolBox.state.nodeType,{"attr":attr});
						$(paper).data("nodes").push(node);
						toolBox.changeState("");
					}else{
						$($(paper).data("nodes")).map(function(){
							this.blur();
						});
					}
				};

			init();
			return this;
		};
	}
);