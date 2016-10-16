`import Ember from 'ember';`

LoginRoute = Ember.Route.extend
	pageTitle: 'Login'

	beforeModel: ->
		sessionsController = this.controllerFor("sessions")
		if sessionsController.get("isUserRegistered")
			@transitionTo("marketplaces.index")

	setupController: (controller, model) ->
		@_super(controller, model)
		@controllerFor("notification-center").clearAlerts()
		controller.focus()

	model: ->
		@get("container").lookup("model:login")

`export default LoginRoute;`
