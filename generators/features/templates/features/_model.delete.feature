Feature: Delete an existing <%= Name %>

	Scenario: client access token is valid, authorized, and <%= name %> exists
		Given client access token is valid
			#And client access token is authorized
			And <%= name %> is found
		When a valid delete <%= name %> request is received
		Then respond with http status code "no content"
			And the "delete" query was executed

	Scenario: client access token is valid, authorized, but <%= name %> does not exist
		Given client access token is valid
			#And client access token is authorized
			And <%= name %> is not found
		When a valid delete <%= name %> request is received
		Then respond with error message, "There is no <%= Name %> for the given (id)."
			And http status code "not found"

	# Scenario: client access token is valid and unauthorized, return error

	Scenario: client access token is invalid
		Given client access token is invalid
		When a valid delete <%= name %> request is received
		Then respond with error message, "The client access token provided is invalid."
			And http status code "unauthorized"

	Scenario: client access token is valid but expired, return error
		Given client access token is expired
		When a valid delete <%= name %> request is received
		Then respond with error message, "The client access token provided is expired."
			And http status code "unauthorized"

	Scenario: request malformed, return error
		When an invalid delete <%= name %> request is received
		Then respond with error message, "Malformed request."
			And http status code "bad request"
