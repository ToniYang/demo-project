require ['router','AppView','backbone'] ,(router,AppView,Backbone)->
	'use strict'
	new router
	Backbone.history.start()
	new AppView