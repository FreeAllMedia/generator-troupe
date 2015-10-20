Feature: create a <%= name %>

	Scenario: valid user sends a valid <%= name %>; return new <%= name %> details
		Given a valid token
		When <%= name %> create request is received
			And all the business logic has completed
		Then respond with the appropiate envelope
			And with a class of type "<%= name %>"
			And http status code "created"

	Scenario: valid user sends a valid <%= name %> but he does not own that account
		Given an unauthorized token
		When <%= name %> create request is received
			And all the business logic has completed
		Then respond with error message "Your permissions does not allow you to manipulate the requested resource."
			And http status code "unauthorized"

	Scenario: valid admin sends a valid <%= name %>; return new <%= name %> details
		Given a valid admin token
		When <%= name %> create request is received
			And all the business logic has completed
		Then respond with the appropiate envelope
			And with a class of type "<%= name %>"
			And http status code "created"

	Scenario: access token is valid, authorized, and account parameters are invalid; return invalid parameter errors
		Given a valid token
		When an invalid <%= name %> create request is received
			And all the business logic has completed
		Then respond with error message title, "<%= Name %> is invalid"
			And http status code "conflict"

	Scenario: request malformed, return error
		When <%= name %> create request is received
		Then respond with error message "Malformed request."
			And http status code "bad request"
