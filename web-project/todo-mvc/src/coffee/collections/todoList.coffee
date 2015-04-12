define ['todoModel','backbone','localStorage'] ,(todoModel,Backbone,localStorage) ->
	'use strict'
	TodoList = Backbone.Collection.extend({

	    model : todoModel

	    localStorage : new localStorage('todos-backbone')

	    initialize : ()->
	      Backbone.on('filter',@triggerVisible,@)
	      @

	    triggerVisible :()->
	      @each((todo)->
	        todo.trigger('visible');
	      )
	      @

	    completed : () ->
	      @where({completed : true})

	    remaining : () ->
	      @where({completed : false})

	    nextOrder : () ->
	      if @length then @last().get('order') else 1

		changeAllStatus : (completed) ->
			@each((todo)->
				todo.save({completed : completed})
			)
			@
		comparator : 'order'
	})
	TodoList;