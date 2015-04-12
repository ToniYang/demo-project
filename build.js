({
    appDir: './web-project/todo-mvc/src',
    baseUrl: './js',
    dir: './web-project/todo-mvc/dist',
    modules: [
        {
            name: 'app'
        }
    ],
    fileExclusionRegExp: /^(coffee)/,
    optimizeCss: 'standard',
    removeCombined: true,
    paths: {
        backbone : 'lib/backbone/backbone',
        underscore : 'lib/underscore/underscore',
        jquery : 'lib/jquery/jquery',
        todoModel : 'model/todo',
        AppView : 'views/appView',
        TodoList : 'collections/todoList',
        static : 'static/static',
        TodoView : 'views/TodoView',
        router : 'routers/router',
        localStorage : 'lib/localstorage/backbone.localStorage'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        backboneLocalstorage: {
            deps: ['backbone'],
            exports: 'Store'
        }
    }
})