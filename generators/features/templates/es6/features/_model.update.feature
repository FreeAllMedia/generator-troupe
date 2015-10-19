Feature: update a <%= name %>

  Scenario: valid user sends a valid <%= name %>; return new <%= name %> details
    Given a valid token
    When <%= name %> update request is received
      And all the business logic has completed
    Then respond with the appropiate envelope
      And with a class of type "<%= name %>"
      And http status code "ok"

  Scenario: valid admin sends a valid <%= name %>; return new <%= name %> details
    Given a valid admin token
    When <%= name %> update request is received
      And all the business logic has completed
    Then respond with the appropiate envelope
      And with a class of type "<%= name %>"
      And http status code "ok"

  Scenario: valid user sends a valid <%= name %> but for the wrong account; return new <%= name %> details
    Given an unauthorized token
    When <%= name %> update request is received
      And all the business logic has completed
    Then respond with error message "Your permissions does not allow you to manipulate the requested resource."
      And http status code "unauthorized"

  Scenario: access token is valid, authorized, and account parameters are invalid; return invalid parameter errors
    Given a valid token
    When an invalid <%= name %> update request is received
      And all the business logic has completed
    Then respond with error message title, "<%= Name %> is invalid"
      And http status code "conflict"

  Scenario: access token is valid, authorized, and account parameters are valid but the <%= name %> was not found; return not found
    Given a valid token
    When an unexisting <%= name %> update request is received
    Then respond with error message title, "Not Found"
      And http status code "not found"

  Scenario: access token is valid admin and account parameters are valid but the <%= name %> was not found; return not found
    Given a valid admin token
    When an unexisting <%= name %> update request is received
    Then respond with error message title, "Not Found"
      And http status code "not found"

  Scenario: request malformed, return error
    When <%= name %> update request is received
    Then respond with error message "Malformed request."
      And http status code "bad request"
