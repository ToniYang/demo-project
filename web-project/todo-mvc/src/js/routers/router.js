(function() {
  define(['backbone', 'TodoList', 'static'], function(Backbone, TodoList, global) {
    'use strict';
    var router;
    router = Backbone.Router.extend({
      routes: {
        '*filter': 'filter'
      },
      filter: function(path) {
        global.filter = path || '';
        return Backbone.trigger('filter');
      }
    });
    return router;
  });

}).call(this);
