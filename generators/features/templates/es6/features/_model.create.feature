Feature: Create a new <%= name %>
	Server should create a new <%= name %>
	Then respond with the newly created <%= name %>'s details in JSON-API format
	When provided:
		A valid and authorized "Client-Access-Token" header
		A valid set of <%= name %> attributes in JSON-API format

	Scenario: client access token is valid, authorized, and <%= name %> attributes are valid
		Given client access token is valid
			#And client access token is authorized
			And <%= name %> parameters are valid
		When a valid create <%= name %> request is received
		Then respond with the newly created <%= name %>'s details
			And http status code "created"
			And the "insert" query was executed

	Scenario: client access token is valid and authorized, but <%= name %> attributes are not valid
		Given client access token is valid
			#And client access token is authorized
			And <%= name %> parameters are invalid
		When a valid create <%= name %> request is received
		Then respond with error message title, "<%= Name %> is invalid"
			And http status code "conflict"

	# Scenario: client access token is valid, but unauthorized

	Scenario: client access token is invalid, return error
		Given client access token is invalid
		When a valid create <%= name %> request is received
		Then respond with error message, "The client access token provided is invalid."
			And http status code "unauthorized"

	Scenario: client access token is valid but expired, return error
		Given client access token is expired
		When a valid create <%= name %> request is received
		Then respond with error message, "The client access token provided is expired."
			And http status code "unauthorized"

	Scenario: request malformed, return error
		When an invalid create <%= name %> request is received
		Then respond with error message, "Malformed request."
			And http status code "bad request"
