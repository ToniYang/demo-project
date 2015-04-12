define ['backbone','TodoList','jquery','underscore','static','TodoView'] , (Backbone,TodoList,$,_,global,TodoView)->
	'use strict'
	AppView = Backbone.View.extend(

		el :'#app'

		footerTemplate : _.template($('#footer-template').html())

		events :{
	        'keypress #input-todo' :'createTodo' ##回车创建一个新的任务
	        'click #trigger-all' :'triggerAll',  ##全选或全不选
	        'click #clear-complated' : 'clearComplated' ##删除掉所有完成的任务
	    }

		initialize : ()->
	        @$input = @$ '#input-todo'
	        @$checkBox = @$('#trigger-all')[0]
	        @$list = @$ '#todo-lists'
	        @$footer = @$ '#footer'
	        @todos = new TodoList
	        @listenTo(@todos,'reset',@addTodos)  ##reset 展示所有todo
	        @listenTo(@todos,'all',@render)    ##all  任何事件都会触发试图渲染
	        @listenTo(@todos,'add',@addTodo)    ##add 添加一个新的todo触发事件
	        @todos.fetch({reset : true})
	        @

		render : ()->
	        left = @todos.remaining().length
	        completed = @todos.completed().length

	        @$checkBox.checked = not left

	        if @todos.length
	            @$footer.html(@footerTemplate({
	                left : left
	                completed : completed
	            }))
	            @$filter = @$ '#filter li a'
	            @$footer.show();
	            @$filter.removeClass 'selected'          ##根据url判断那个链接被选中
	            .filter "[href='#/#{global.filter or ''}']"
	            .addClass 'selected'
	            @
	        else
	            @$footer.hide()
	            @

		createTodo : (event)->
	        if event.which is global.ENTER_KEY and @$input.val().trim()
	            @todos.create @newModel()
	            @$input.val ''
	            @

		newModel :()->
	        {
	          title : @$input.val().trim()
	          order : @todos.nextOrder()
	          completed : false
	        }

		triggerAll : () ->
		    completed = @$checkBox.checked
		    @todos.changeAllStatus(completed)
		    @

		clearComplated : ()->
			_.invoke(@todos.completed(),'destroy')
			@

		addTodos : ()->
			@$list.html ''
			@todos.each((todo)->
				@addTodo(todo)
			,@)
			@
		addTodo : (todo)->
			view = new TodoView(
				model : todo
			)
			@$list.append view.render().el
			@

	)
	AppView