Feature: Show an existing <%= name %>'s details
	Server should respond with the designated <%= name %>'s details in JSON-API format
	When provided:
		A valid and authorized "Client-Access-Token" header
		A valid <%= name %> identifier via url parameters

	Scenario: client access token is valid, authorized, and <%= name %> identifier is valid
		Given client access token is valid
			#And client access token is authorized
			And <%= name %> is found
		When a valid show <%= name %> details request is received
		Then respond with the specified <%= name %>'s details
			And http status code "ok"
			And the "select" query was executed

	Scenario: client access token is valid and authorized, but the <%= name %> is not found
		Given client access token is valid
			#And client access token is authorized
			And <%= name %> is not found
		When a valid show <%= name %> details request is received
		Then respond with error message, "There is no <%= Name %> for the given (id)."
			And http status code "not found"

	# Scenario: client access token is valid, but unauthorized

	Scenario: client access token is invalid
		Given client access token is invalid
		When a valid show <%= name %> details request is received
		Then respond with error message, "The client access token provided is invalid."
			And http status code "unauthorized"

	Scenario: client access token is valid but expired, return error
		Given client access token is expired
		When a valid show <%= name %> details request is received
		Then respond with error message, "The client access token provided is expired."
			And http status code "unauthorized"

	Scenario: request malformed, return error
		When an invalid show <%= name %> details request is received
		Then respond with error message, "Malformed request."
			And http status code "bad request"
