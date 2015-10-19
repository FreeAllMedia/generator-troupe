Feature: Show a <%= name %>

  Scenario: when a user want's to see one of his <%= name %>s
    Given a valid token
    When <%= name %> show request is received
      And all the business logic has completed
    Then respond with the appropiate envelope
      And http status code "ok"

  Scenario: when a user want's to see one of his <%= name %>s, but the id provided does not exist
    Given a valid token
    When <%= name %> show request is received but there is no <%= name %> found
    Then respond with error message "Entity not found."
      And http status code "not found"

  Scenario: when a admin want's to see one <%= name %>
    Given a valid admin token
    When <%= name %> show request is received
      And all the business logic has completed
    Then respond with the appropiate envelope
      And http status code "ok"

  Scenario: when a admin want's to see one <%= name %>, but the id provided does not exist
    Given a valid admin token
    When <%= name %> show request is received but there is no <%= name %> found
    Then respond with error message "Entity not found."
      And http status code "not found"

  Scenario: request malformed with no token hash, return error
    When <%= name %> show request is received
    Then respond with error message "Malformed request."
      And http status code "bad request"
