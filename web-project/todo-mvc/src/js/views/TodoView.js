(function() {
  define(['backbone', 'jquery', 'static', 'underscore', 'text!templates/todo.html'], function(Backbone, $, global, _, todoTem) {
    var TodoView;
    TodoView = Backbone.View.extend({
      tagName: 'li',
      template: _.template(todoTem),
      events: {
        'click .checked': 'changeStatus',
        'dblclick label': 'edit',
        'click .remove': 'removeModel',
        'keypress .edit': 'saveModelByEntry',
        'blur .edit': 'saveModel'
      },
      initialize: function() {
        this.listenTo(this.model, 'visible', this.visible);
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
        return this;
      },
      changeStatus: function() {
        this.model.changeStatus();
        return this;
      },
      edit: function() {
        this.$el.addClass('editing');
        this.$input.focus();
        return this;
      },
      removeModel: function() {
        this.model.destroy();
        return this;
      },
      saveModelByEntry: function(event) {
        if (event.which === global.ENTER_KEY) {
          this.saveModel();
        }
        return this;
      },
      saveModel: function() {
        var value;
        value = this.$input.val().trim();
        if (this.$el.hasClass('editing') === false) {
          this;
        }
        if (value) {
          this.model.save({
            title: value
          });
        } else {
          this.removeModel();
        }
        this.$el.removeClass('editing');
        return this;
      },
      visible: function() {
        this.$el.toggleClass('hidden', this.isHidden());
        return this;
      },
      isHidden: function() {
        if (this.model.get('completed') === true) {
          return global.filter === 'active';
        } else {
          return global.filter === 'completed';
        }
      },
      render: function() {
        if (this.model.changed.id !== void 0) {
          this;
        }
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.toggleClass('completed', this.model.get('completed'));
        this.$input = this.$('.edit');
        this.visible();
        return this;
      }
    });
    return TodoView;
  });

}).call(this);
