define(function() {
	var config = {
		"toolBox": {
			"objId": "toolBox",
			"cssClass": "toolBox",
			"tools": [{
				"image": "images/48/flow_sequence.png",
				"type": "next",
				"lineType": "#808080",
				"text": "黑色线"
			}, {
				"image": "images/48/flow_sequence.png",
				"type": "next",
				"lineType": "red",
				"text": "红色线"
			}, {
				"image": "images/48/flow_sequence.png",
				"type": "next",
				"lineType": "green",
				"text": "绿色线"
			}, {
				"image": "images/48/flow_sequence.png",
				"type": "reject",
				"lineType": "black",
				"text": "黑色线"
			}, {
				"image": "images/48/flow_sequence.png",
				"type": "reject",
				"lineType": "red",
				"text": "红色线"
			}, {
				"image": "images/48/flow_sequence.png",
				"type": "reject",
				"lineType": "green",
				"text": "绿色线"
			}, {
				"image": "images/48/start_event_empty.png",
				"type": "node",
				"nodeType": "start",
				"text": "开始节点"
			}, {
				"image": "images/48/end_event_terminate.png",
				"type": "node",
				"nodeType": "end",
				"text": "结束节点"
			}, {
				"image": "images/48/task_empty.png",
				"type": "node",
				"nodeType": "single",
				"text": "单路径节点"
			}, {
				"image": "images/48/task_empty_green.png",
				"type": "node",
				"nodeType": "couple",
				"text": "双路径节点"
			}, {
				"image": "images/48/task_empty_yellow.png",
				"type": "node",
				"nodeType": "many",
				"text": "多路径节点"
			}, {
				"image": "images/48/task_wait.png",
				"type": "node",
				"nodeType": "auto",
				"text": "自动判断节点"
			}]
		},
		"paper": {
			"objId": "paper",
			"cssClass": "paper",
			"width": 1600,
			"height": 500
		},
		"node": {
			"start": {
				"type": "image",
				"attr": {
					"src": 'images/48/start_event_empty.png',
					"width": 50,
					"height": 50,
					"cursor": 'move'
				},
				"lines":[{
					"state":"break"
				}]
			},
			"end": {
				"type": "image",
				"attr": {
					"src": 'images/48/end_event_terminate.png',
					"width": 50,
					"height": 50,
					"cursor": 'move'
				},
				"lines":[]
			},
			"single": {
				"type": "text",
				"attr": {
					"fill": '#6cc0c1',
					"stroke": 'white',
					'stroke-width': 2,
					"width": 100,
					"height": 50,
					"cursor": 'move',
					"r": 5
				},
				"text": {
					"text": "单路径节点",
					"attr": {
						"stroke": "white",
						"stroke-width": 1,
						"font-familly": "Microsoft YaHei",
					}
				},
				"lines":[{
					"state":"break"
				}]
			},
			"couple": {
				"type": "text",
				"attr": {
					"fill": '#037695',
					"stroke": 'white',
					'stroke-width': 2,
					"width": 100,
					"height": 50,
					"cursor": 'move',
					"r": 5
				},
				"text": {
					"text": "双路径节点",
					"attr": {
						"stroke": "white",
						"stroke-width": 1,
						"font-familly": "Microsoft YaHei",
					}
				},
				"lines":[{
					"state":"break"
				},{
					"state":"break"
				}]
			},
			"many": {
				"type": "text",
				"attr": {
					"fill": '#033e50',
					"stroke": 'white',
					'stroke-width': 2,
					"width": 100,
					"height": 50,
					"cursor": 'move',
					"r": 5
				},
				"text": {
					"text": "多路径节点",
					"attr": {
						"stroke": "white",
						"stroke-width": 1,
						"font-familly": "Microsoft YaHei",
					}
				},
				"lines":[{
					"state":"break"
				},{
					"state":"break"
				},{
					"state":"break"
				}]
			},
			"auto": {
				"type": "image",
				"attr": {
					"src": 'images/48/task_wait.png',
					"width": 50,
					"height": 50,
					"cursor": 'move'
				},
				"lines":[]
			}
		},
		"border": {
			"margin":2,
			"attr": {
				"stroke": "#808080",
				"fill": "none",
				"stroke-width": 1
			}
		},
		"resizePoint": {
			"attr": {
				"width": 5,
				"height": 5,
				"stroke": "#fff",
				"fill": "#000",
				"cursor": "move",
				"stroke-width": 1
			}//"cursor":"s-resize"
		},
		"line": {
			"state": "break",
			"lineType":"black",
			"path": {
				"fill": "none",
				"stroke-width": 2
			},
			"arrow": {
				"stroke-width": 2,
				"radius": 4
			}
		},
		"propertyBox": {
		},
		getId:function(type){
			return type + (new Date()).getTime();
		}
	};
	return config;
});