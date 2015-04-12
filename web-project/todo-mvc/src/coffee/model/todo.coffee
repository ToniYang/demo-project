define ['backbone'] ,(Backbone)->
	'use strict'
	TodoModel = Backbone.Model.extend({
	    default : {
	      title : ''
	      completed : false
	    }

	    changeStatus : ()->
	      @.save({
	        completed : not@.get('completed')
	      })
	      @
	})
	TodoModel