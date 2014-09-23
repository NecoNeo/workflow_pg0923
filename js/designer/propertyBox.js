define(["jquery", "config"],
	function($, Config) {
		var propertyBox = function(paper, opt) {
			var options = $.extend(true, {}, Config.propertyBox, opt),
				that = this,
				$obj = $("#propertyBox"),
				init = function() {
					$obj.addClass("propertyBox");
					render();
				},
				render = function() {
					$obj.click(function(){
						click();
					});
				},
				click = function() {
					$obj.html(JSON.stringify($(paper).data("currentObject")));
				};
			init();
		};
		return propertyBox;
});

//$(paper).data("currentObject")