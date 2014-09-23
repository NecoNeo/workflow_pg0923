define(["jquery", "raphael", "config"],
    function($, Raphael, Config) {
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
            return this;
        };
    }
);