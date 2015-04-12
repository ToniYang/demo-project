(function() {
  define(['backbone', 'TodoList', 'jquery', 'underscore', 'static', 'TodoView'], function(Backbone, TodoList, $, _, global, TodoView) {
    'use strict';
    var AppView;
    AppView = Backbone.View.extend({
      el: '#app',
      footerTemplate: _.template($('#footer-template').html()),
      events: {
        'keypress #input-todo': 'createTodo',
        'click #trigger-all': 'triggerAll',
        'click #clear-complated': 'clearComplated'
      },
      initialize: function() {
        this.$input = this.$('#input-todo');
        this.$checkBox = this.$('#trigger-all')[0];
        this.$list = this.$('#todo-lists');
        this.$footer = this.$('#footer');
        this.todos = new TodoList;
        this.listenTo(this.todos, 'reset', this.addTodos);
        this.listenTo(this.todos, 'all', this.render);
        this.listenTo(this.todos, 'add', this.addTodo);
        this.todos.fetch({
          reset: true
        });
        return this;
      },
      render: function() {
        var completed, left;
        left = this.todos.remaining().length;
        completed = this.todos.completed().length;
        this.$checkBox.checked = !left;
        if (this.todos.length) {
          this.$footer.html(this.footerTemplate({
            left: left,
            completed: completed
          }));
          this.$filter = this.$('#filter li a');
          this.$footer.show();
          this.$filter.removeClass('selected').filter("[href='#/" + (global.filter || '') + "']").addClass('selected');
          return this;
        } else {
          this.$footer.hide();
          return this;
        }
      },
      createTodo: function(event) {
        if (event.which === global.ENTER_KEY && this.$input.val().trim()) {
          this.todos.create(this.newModel());
          this.$input.val('');
          return this;
        }
      },
      newModel: function() {
        return {
          title: this.$input.val().trim(),
          order: this.todos.nextOrder(),
          completed: false
        };
      },
      triggerAll: function() {
        var completed;
        completed = this.$checkBox.checked;
        this.todos.changeAllStatus(completed);
        return this;
      },
      clearComplated: function() {
        _.invoke(this.todos.completed(), 'destroy');
        return this;
      },
      addTodos: function() {
        this.$list.html('');
        this.todos.each(function(todo) {
          return this.addTodo(todo);
        }, this);
        return this;
      },
      addTodo: function(todo) {
        var view;
        view = new TodoView({
          model: todo
        });
        this.$list.append(view.render().el);
        return this;
      }
    });
    return AppView;
  });

}).call(this);
