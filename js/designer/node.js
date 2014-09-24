define(["config", "line"],
	function(Config, Line) {
		return function(paper, propertyBox, nodeType, opt) {
			var options = $.extend(true, {}, Config.node[nodeType], opt),
				node = this,
				rect, text, border, resizePoint = {},
				group = paper.set(),
				init = function() {
					if (options.type == "image") {
						rect = paper.image().attr(options.attr);
					} else if (options.type == "text") {
						rect = paper.rect().attr(options.attr);
						text = paper.text(options.attr.x + options.attr.width / 2, options.attr.y + options.attr.height / 2, options.text.text).attr(options.text.attr);
						group.push(text);
					}
					group.push(rect);
					group.drag(function(dx, dy) {
						moveResize(dx, dy);
					}, function() {
						beforeMove();
					}, function() {
						group.attr({
							opacity: 1
						});
					}).click(function() {
						node.focus();
					});

					drawBorder();
					//drawDefaultLine();
					node.focus();
				},

				//画边框
				drawBorder = function() {
					border = paper.path(getBorderPath(options.attr.x, options.attr.y, options.attr.width, options.attr.height, Config.border.margin)).attr(Config.border.attr);

					var rPoint = getResizePoint(options.attr.x, options.attr.y, options.attr.width, options.attr.height, Config.border.margin);
					for (var r in rPoint) {
						resizePoint[r] = paper.rect().attr(rPoint[r]).attr(Config.resizePoint.attr);
					}
				},
				//根据原图形的x,y,width,height以及边距返回边框路径字符串
				getBorderPath = function(x, y, width, height, margin) {
					var leftTop = {
							"x": x - margin,
							"y": y - margin
						},
						rightTop = {
							"x": x + width + margin,
							"y": y - margin
						},
						rightBottom = {
							"x": x + width + margin,
							"y": y + height + margin
						},
						leftBottom = {
							"x": x - margin,
							"y": y + height + margin
						}
					var result = [];
					result.push("M" + leftTop.x + " " + leftTop.y);
					result.push("L" + rightTop.x + " " + rightTop.y);
					result.push("L" + rightBottom.x + " " + rightBottom.y);
					result.push("L" + leftBottom.x + " " + leftBottom.y + "Z");
					return result.join("");
				},
				//根据原图形的x,y,width,height以及边距返回 resizePoint坐标集合
				getResizePoint = function(x, y, width, height, margin) {
					var result = {
						"leftTop": {
							"x": x - margin - Config.resizePoint.attr.width / 2,
							"y": y - margin - Config.resizePoint.attr.height / 2
						},
						"rightTop": {
							"x": x + width + margin - Config.resizePoint.attr.width / 2,
							"y": y - margin - Config.resizePoint.attr.height / 2
						},
						"rightBottom": {
							"x": x + width + margin - Config.resizePoint.attr.width / 2,
							"y": y + height + margin - Config.resizePoint.attr.height / 2
						},
						"leftBottom": {
							"x": x - margin - Config.resizePoint.attr.width / 2,
							"y": y + height + margin - Config.resizePoint.attr.height / 2
						},
						"middleTop": {
							"x": x + width / 2 - Config.resizePoint.attr.width / 2,
							"y": y - margin - Config.resizePoint.attr.height / 2
						},
						"middleBottom": {
							"x": x + width / 2 - Config.resizePoint.attr.width / 2,
							"y": y + height + margin - Config.resizePoint.attr.height / 2
						},
						"leftMiddle": {
							"x": x - margin - Config.resizePoint.attr.width / 2,
							"y": y + height / 2 - Config.resizePoint.attr.height / 2
						},
						"rightMiddle": {
							"x": x + width + margin - Config.resizePoint.attr.width / 2,
							"y": y + height / 2 - Config.resizePoint.attr.height / 2
						}
					}
					return result;
				},
				//拖动node;
				moveResize = function(dx, dy) {
					var attr = {
						"x": $(rect).data("startX") + dx,
						"y": $(rect).data("startY") + dy,
						"width": rect.attr("width"),
						"height": rect.attr("height")
					}

					border.attr({
						path: getBorderPath(attr.x, attr.y, attr.width, attr.height, Config.border.margin)
					});

					rect.attr(attr);
					if (text) {
						text.attr({
							"x": attr.x + attr.width / 2,
							"y": attr.y + attr.height / 2
						});
					}

					var rPoint = getResizePoint(attr.x, attr.y, attr.width, attr.height, Config.border.margin);
					for (var r in rPoint) {
						resizePoint[r].attr(rPoint[r]);
					}

					$($(node).data("lines")).map(function() {
						this.move();
					});
				},
				//拖动开始前
				beforeMove = function() {
					group.attr({
						opacity: 0.5
					});

					$(rect).data({
						"startX": rect.attr("x"),
						"startY": rect.attr("y")
					});
				},
				//绘制默认的线
				drawDefaultLine = function() {
					$(node).data("lines", []);
					$(options.lines).map(function() {
						var line = new Line(paper, node, this);
						$(node).data("lines").push(line);
					});
				};

			

			this.getX = function() {
				return (options.attr.x + options.attr.width / 2);
			};

			this.getY = function() {
				return (options.attr.y + options.attr.height / 2);
			};

			this.focus = function() {
				$($(paper).data("nodes")).map(function() {
					this.blur();
				});
				border.show();
				for (var r in resizePoint) {
					resizePoint[r].show();
				}

				$(paper).data("currentObject", node);

				propertyBox.click();
			};

			this.blur = function() {
				border.hide();
				for (var r in resizePoint) {
					resizePoint[r].hide();
				}
				$(paper).data("currentObject", null);

				propertyBox.click();
			};

			this.remove = function() {
				var result = $($(paper).data("nodes")).map(function() {
					if (this.id != node.id) {
						return this;
					}
				});
				$(paper).data("nodes", result);

				group.remove();
				border.remove();
				for (var r in resizePoint) {
					resizePoint[r].remove();
				}
			};

			this.isLine = false;
			this.id = options.id || Config.getId("node");
			this.subline = {
				"right2": {
					"state": "",
					path: function() {
						var attr = resizePoint.rightMiddle.attr();
						return "M" + (attr.x + attr.width / 2) + " " + (attr.y + attr.height / 2) + "h100";
					}
				},
				"bottom2": {
					"state": "",
					path: function() {
						var attr = resizePoint.middleBottom.attr();
						return "M" + (attr.x + attr.width / 2) + " " + (attr.y + attr.height / 2) + "v100";
					}
				},
				"top2": {
					"state": "",
					path: function() {
						var attr = resizePoint.middleTop.attr();
						return "M" + (attr.x + attr.width / 2) + " " + (attr.y + attr.height / 2) + "v-100";
					}
				},
				"left2": {
					"state": "",
					path: function() {
						var attr = resizePoint.leftMiddle.attr();
						return "M" + (attr.x + attr.width / 2) + " " + (attr.y + attr.height / 2) + "h-100";
					}
				},
				"right1": {
					"state": "",
					path: function() {
						var attr = resizePoint.rightTop.attr();
						return "M" + (attr.x + attr.width / 2) + " " + (attr.y + attr.height / 2 - attr.height) + "h100";
					}
				},
				"right3": {
					"state": "",
					path: function() {
						var attr = resizePoint.rightBottom.attr();
						return "M" + (attr.x + attr.width / 2) + " " + (attr.y + attr.height / 2 + attr.height) + "h100";
					}
				},
				"bottom3": {
					"state": "",
					path: function() {
						var attr = resizePoint.rightBottom.attr();
						return "M" + (attr.x + attr.width / 2 - attr.width) + " " + (attr.y + attr.height / 2) + "v100";
					}
				},
				"bottom1": {
					"state": "",
					path: function() {
						var attr = resizePoint.leftBottom.attr();
						return "M" + (attr.x + attr.width / 2 + attr.width) + " " + (attr.y + attr.height / 2) + "v100";
					}
				},
				"top3": {
					"state": "",
					path: function() {
						var attr = resizePoint.rightTop.attr();
						return "M" + (attr.x + attr.width / 2 - attr.width) + " " + (attr.y + attr.height / 2) + "v-100";
					}
				},
				"top1": {	
					"state": "",
					path: function() {
						var attr = resizePoint.leftTop.attr();
						return "M" + (attr.x + attr.width / 2 + attr.width) + " " + (attr.y + attr.height / 2) + "v-100";
					}
				},
				"left1": {
					"state": "",
					path: function() {
						var attr = resizePoint.leftTop.attr();
						return "M" + (attr.x + attr.width / 2) + " " + (attr.y + attr.height / 2 - attr.height) + "h-100";
					}
				},
				"left3": {
					"state": "",
					path: function() {
						var attr = resizePoint.leftBottom.attr();
						return "M" + (attr.x + attr.width / 2) + " " + (attr.y + attr.height / 2 + attr.height) + "h-100";
					}
				}
			}

			init();
		};
	}
);