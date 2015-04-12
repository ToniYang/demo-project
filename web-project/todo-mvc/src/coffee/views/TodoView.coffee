define ['backbone','jquery','static','underscore','text!templates/todo.html'] , (Backbone,$,global,_,todoTem)->
	TodoView = Backbone.View.extend({
		tagName : 'li'
		template : _.template(todoTem)
		events :
			'click .checked' : 'changeStatus'
			'dblclick label' :'edit'
			'click .remove' : 'removeModel'
			'keypress .edit' : 'saveModelByEntry'
			'blur .edit' : 'saveModel'

		initialize : ()->
			@listenTo(@model,'visible',@visible)
			@listenTo(@model,'change',@render)
			@listenTo(@model,'destroy',@remove)
			@
		changeStatus : ()->
			@model.changeStatus()
			@
		edit : ()->
			@$el.addClass 'editing'
			@$input.focus()
			@
		removeModel : ()->
			@model.destroy()
			@
		saveModelByEntry : (event)->
			if event.which is global.ENTER_KEY
				@saveModel()
			@
		saveModel : ()->
			value = @$input.val().trim()
			@ if @$el.hasClass('editing') is no
			if value
				@model.save({
					title : value
				})
			else
				@removeModel()
			@$el.removeClass 'editing'
			@
		visible : ()->
			@$el.toggleClass('hidden',@isHidden())
			@
		isHidden : ()->
			if @model.get('completed') is true
				global.filter is 'active'
			else
				global.filter is 'completed'
		render : ()->
			if @model.changed.id isnt undefined
				@
			@$el.html(@template(@model.toJSON()))
			@$el.toggleClass('completed',@model.get('completed'))
			@$input = @$ '.edit'
			@visible();
			@
	})
	TodoView
