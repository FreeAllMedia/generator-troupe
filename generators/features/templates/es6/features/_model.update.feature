Feature: Update an existing <%= name %>
	Server should update an existing <%= name %> with new attributes
	Then respond with the updated <%= name %>'s details in JSON-API format
	When provided:
		A valid and authorized "Client-Access-Token" header
		A valid <%= name %> identifier via url parameters
		A valid set of <%= name %> attributes in JSON-API format

	Scenario: client access token is valid and authorized, <%= name %> identifier is valid, and <%= name %> attributes are valid
		Given client access token is valid
			#And client access token is authorized
			And <%= name %> parameters are valid
			And <%= name %> is found
		When a valid update <%= name %> request is received
		Then respond with the updated <%= name %>'s details
			And http status code "ok"
			And the "update" query was executed

	Scenario: client access token is valid and authorized, but <%= name %> identifier is not valid
		Given client access token is valid
			And <%= name %> parameters are valid
			And <%= name %> is not found
		When a valid update <%= name %> request is received
		Then respond with error message, "There is no <%= Name %> for the given (id)."
			And http status code "not found"

	Scenario: client access token is valid and authorized, <%= name %> identifier is valid, but <%= name %> attributes are not valid
		Given client access token is valid
			#And client access token is authorized
			And <%= name %> is found
			And <%= name %> parameters are invalid
		When a valid update <%= name %> request is received
		Then respond with error message title, "<%= Name %> is invalid"
			And http status code "conflict"

	# Scenario: client access token is valid, but unauthorized

	Scenario: client access token is invalid
		Given client access token is invalid
		When a valid update <%= name %> request is received
		Then respond with error message, "The client access token provided is invalid."
			And http status code "unauthorized"

	Scenario: client access token is valid but expired, return error
		Given client access token is expired
		When a valid update <%= name %> request is received
		Then respond with error message, "The client access token provided is expired."
			And http status code "unauthorized"

	Scenario: request id malformed
		When an invalid update <%= name %> request is received
		Then respond with error message, "Malformed request."
			And http status code "bad request"
