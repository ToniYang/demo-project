(function() {
  require(['router', 'AppView', 'backbone'], function(router, AppView, Backbone) {
    'use strict';
    new router;
    Backbone.history.start();
    return new AppView;
  });

}).call(this);
