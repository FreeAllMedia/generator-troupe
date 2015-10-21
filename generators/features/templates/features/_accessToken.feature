Feature: authorization filter

	Scenario: the access token is valid
		Given a valid token
		When the controller filter is executed
		Then http status code "ok"

	Scenario: the access token is an admin's one
		Given a valid admin token
		When the controller filter is executed
		Then http status code "ok"

	Scenario: the access token is an admin's one
		Given a valid admin token
		When the controller admin filter is executed
		Then http status code "ok"

	Scenario: the access token is valid but is trying to execute an admin operation
		Given a valid token
		When the controller admin filter is executed
		Then respond with error message "Your permissions does not allow you to manipulate the requested resource."
			And http status code "unauthorized"

	Scenario: the access token is unauthorized
		Given an unauthorized token
		When the controller filter is executed
			And all the business logic has completed
		Then respond with error message "Your permissions does not allow you to manipulate the requested resource."
			And http status code "unauthorized"

	Scenario: the access token is invalid
		Given an invalid token
		When the controller filter is executed
			And all the business logic has completed
		Then respond with error message "The access token provided is invalid."
			And http status code "unauthorized"

	Scenario: the access token is expired
		Given an expired token
		When the controller filter is executed
			And all the business logic has completed
		Then respond with error message "The access token provided is expired."
			And http status code "unauthorized"
