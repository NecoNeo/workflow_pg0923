define(["config"],
    function(Config) {
        var Line = function(paper, propertyBox, lineType, opt, startNode, endNode) {
            var line = this,
                path, arrow, group = paper.set();

            this.options = $.extend(true, {}, Config.line, opt);
            this.paper = paper;
            this.propertyBox = propertyBox;
            this.isLine = true;
            this.id = this.options.id || Config.getId("line");
            this.startNode = startNode;
            this.endNode = endNode;
            this.path = null;
            this.init();
        };

        Line.prototype.init = function() {
            var that = this;
            var startPoint = {
                x: this.startNode.getX(),
                y: this.startNode.getY()
            };
            var endPoint = {
                x: this.options.attr.x,
                y: this.options.attr.y
            };
            this.draw(startPoint, endPoint);
            this.focus();
            this.path.click(function() {
                that.focus();
            });
        };

        Line.prototype.draw = function(startPoint, endPoint) {
            var string = "M" + startPoint.x + " " + startPoint.y + "L" + endPoint.x + " " + endPoint.y + "z";
            this.path = this.paper.path(string);
            this.path.attr("stroke-width", 2);
        };

        Line.prototype.connect = function(startNode, endNode) {
            this.draw(startPoint, endPoint);
        };

        Line.prototype.drag = function(dx, dy) {
            var startPoint = {
                x: this.startNode.getX(),
                y: this.startNode.getY()
            };
            var endPoint = {
                x: dx,
                y: dy
            };
            this.draw(startPoint, endPoint);
            this.focus();
            this.path.click(function() {
                that.focus();
            });
            console.log("dragging!");
        };

        Line.prototype.focus = function() {
            $($(this.paper).data("nodes")).map(function() {
                this.blur();
            });

            $(this.paper).data("currentObject", this);
            this.path.attr("stroke-width", 5);

            this.propertyBox.click();
        };

        Line.prototype.blur = function() {
            $(this.paper).data("currentObject", null);
            this.path.attr("stroke-width", 2);

            this.propertyBox.click();
        };

        Line.prototype.remove = function() {
            var that = this;
            var result = $($(this.paper).data("nodes")).map(function() {
                if (this.id != that.id) {
                    return this;
                }
            });
            $(this.paper).data("nodes", result);

            this.path.remove();
        };

        return Line;
        /*
        return function(paper, node, opt) {
            var options = $.extend(true, {}, Config.line, opt),
                line = this,
                path, arrow, group = paper.set(),
                init = function() {
                    if (options.state == "break") {
                        drawBreakLine();
                    } else {

                    }
                },
                drawBreakLine = function() {
                    // if (node.subline.right2.state == "") {
                    //     path = paper.path(node.subline.right2.path()).attr(options.path).attr({
                    //         "stroke": options.lineType
                    //     });
                    //     node.subline.right2.state = "out";
                    //     line.startPoint = "right2";
                    // }
                    for(var i in  node.subline){
                        if(node.subline[i].state == ""){
                            path = paper.path(node.subline[i].path()).attr(options.path).attr({
                                "stroke": options.lineType
                            });
                            node.subline[i].state = "out";
                            line.startPoint = i;
                            break;
                        }
                    }

                    arrow = paper.path(getDrawArrowPath()).attr(Config.line.arrow).attr({
                        "stroke": options.lineType,
                        "fill": options.lineType,
                    });
                },
                getDrawArrowPath = function() {
                    var size = 5;
                    var startPoint = path.getPointAtLength(path.getTotalLength());
                    var endPoint = path.getPointAtLength(path.getTotalLength() - size);

                    var angle = paper.raphael.angle(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
                    var angle_45_one = paper.raphael.rad(angle - 45);
                    var angle_45_two = paper.raphael.rad(angle + 45);

                    var angle_x1 = startPoint.x - Math.cos(angle_45_one) * size;
                    var angle_y1 = startPoint.y - Math.sin(angle_45_one) * size;
                    var angle_x2 = startPoint.x - Math.cos(angle_45_two) * size;
                    var angle_y2 = startPoint.y - Math.sin(angle_45_two) * size;
                    return "M" + angle_x1 + " " + angle_y1 + "L" + startPoint.x + " " + startPoint.y + "L" + angle_x2 + " " + angle_y2 + "Z";
                };

            this.isLine = true;
            this.id = options.id || Config.getId("line");
            this.startPoint = "right2";
            this.startNode = node;

            this.move = function() {
                if (options.state == "break") {
                    path.attr({
                        "path": line.startNode.subline[line.startPoint].path()
                    });
                    arrow.attr({
                        "path": getDrawArrowPath()
                    });
                } else {

                }
            };

            this.remove = function(){
                
            };

            init();
        };*/
    }
);