Feature: delete a <%= name %>

	Scenario: valid user delete a valid <%= name %>; return no content
		Given a valid token
		When <%= name %> delete request is received
			And all the business logic has completed
		Then respond with no content
			And http status code "no content"

	Scenario: valid admin delete a <%= name %>; return no content
		Given a valid admin token
		When <%= name %> delete request is received
			And all the business logic has completed
		Then respond with no content
			And http status code "no content"

	Scenario: access token is valid, but there is no <%= name %> found
		Given a valid token
		When an invalid <%= name %> delete request is received
		Then respond with error message title, "Not Found"
			And http status code "not found"

	Scenario: access token is valid admin, but there is no <%= name %> found
		Given a valid admin token
		When an invalid <%= name %> delete request is received
		Then respond with error message title, "Not Found"
			And http status code "not found"

	Scenario: request malformed, return error
		When <%= name %> delete request is received
		Then respond with error message "Malformed request."
			And http status code "bad request"
