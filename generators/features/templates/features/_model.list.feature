Feature: List all <%= name %> details
	Server should respond with a full list of <%= name %> details in JSON-API format
	When provided:
		A valid and authorized "Client-Access-Token" header

	Scenario: client access token is valid and authorized
		Given client access token is valid
		When a valid list <%= name %> request is received
		Then respond with all the list of <%= name %>s
			And http status code "ok"
			And the "select all" query was executed

	# Scenario: client access token is valid, but unauthorized

	Scenario: client access token is invalid
		Given client access token is invalid
		When a valid list <%= name %> request is received
		Then respond with error message, "The client access token provided is invalid."
			And http status code "unauthorized"

	Scenario: client access token is valid but expired, return error
		Given client access token is expired
		When a valid list <%= name %> request is received
		Then respond with error message, "The client access token provided is expired."
			And http status code "unauthorized"
