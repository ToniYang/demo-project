(function() {
  define(['todoModel', 'backbone', 'localStorage'], function(todoModel, Backbone, localStorage) {
    'use strict';
    var TodoList;
    TodoList = Backbone.Collection.extend({
      model: todoModel,
      localStorage: new localStorage('todos-backbone'),
      initialize: function() {
        Backbone.on('filter', this.triggerVisible, this);
        return this;
      },
      triggerVisible: function() {
        this.each(function(todo) {
          return todo.trigger('visible');
        });
        return this;
      },
      completed: function() {
        return this.where({
          completed: true
        });
      },
      remaining: function() {
        return this.where({
          completed: false
        });
      },
      nextOrder: function() {
        if (this.length) {
          return this.last().get('order');
        } else {
          return 1;
        }
      },
      changeAllStatus: function(completed) {
        this.each(function(todo) {
          return todo.save({
            completed: completed
          });
        });
        return this;
      },
      comparator: 'order'
    });
    return TodoList;
  });

}).call(this);
