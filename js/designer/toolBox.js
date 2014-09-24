define(["config"],
	function(Config) {
		return function(opt) {
			var options = $.extend(true, {}, Config.toolBox, opt),
				that = this,
				$obj = $("#"+options.objId),
				init = function() {
					$obj.addClass(options.cssClass);
					renderTools();
				},
				renderTools = function(){
					var lastType = options.tools[0].type;
					$(options.tools).map(function(){
						if(lastType != this.type){
							$obj.append("<hr />")
						}
						$("<div></div>")
						.data(this)
						.click(function(){
							if($(this).hasClass("active")){
								that.changeState("");
							}else{
								$(this).addClass("active").siblings().removeClass("active");
								that.changeState($(this).data());
							}
						})
						.append("<img src='"+this.image+"' />")
						.append("<span>"+this.text+"</span>")
						.appendTo($obj);
						lastType = this.type;
					});
				};

			this.changeState = function(data){
				that.state = data;
				if(data == ""){
					$obj.find(".active").removeClass("active");
				}
			};


			init();
		};
	}
);