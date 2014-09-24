requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        'jquery': 'jquery-1.11.1.min',
        'css': 'css.min',
        'raphael': 'raphael-min',
        'paper': '../designer/paper',
        'toolBox': '../designer/toolBox',
        'config': '../designer/config',
        'node': '../designer/node',
        'line':'../designer/line',
        'propertyBox':'../designer/propertyBox'
    },

    shim: {
        'raphael': {
            exports: 'Raphael'
        }
    }
});

requirejs(['paper', 'raphael', 'jquery', 'css!../../css/style.css'], function(Paper) {
    $(function() {
        var p = new Paper();
    });
});