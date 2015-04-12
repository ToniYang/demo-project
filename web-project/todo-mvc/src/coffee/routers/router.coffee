define ['backbone','TodoList','static'] , (Backbone,TodoList,global) ->
	'use strict'
	router = Backbone.Router.extend({
	  routes :{
	    '*filter' : 'filter'
	  }

	  filter : (path)->
	    global.filter = path or ''
	    Backbone.trigger('filter');
	})
	router