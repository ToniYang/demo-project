(function() {
  define(['backbone'], function(Backbone) {
    'use strict';
    var TodoModel;
    TodoModel = Backbone.Model.extend({
      "default": {
        title: '',
        completed: false
      },
      changeStatus: function() {
        this.save({
          completed: !this.get('completed')
        });
        return this;
      }
    });
    return TodoModel;
  });

}).call(this);
