define(["config"],
	function(Config) {
		var PropertyBox = function(paper, opt) {
			var options = $.extend(true, {}, Config.propertyBox, opt),
				that = this,
				$obj = $("#propertyBox"),
				init = function() {
					$obj.addClass("propertyBox");
				},
				render = function() {
				};

			this.click = function() {
				//$obj.html($(paper).data("currentObject") ? JSON.stringify($(paper).data("currentObject")) : "");
				$obj.html($(paper).data("currentObject") ? JSON.stringify($(paper).data("currentObject").isLine) : "");
			};
			init();
		};
		return PropertyBox;
});

//$(paper).data("currentObject")