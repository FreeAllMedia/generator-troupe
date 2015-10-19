Feature: List <%= name %>s

  Scenario: when a user want's to see his <%= name %>s
    Given a valid token
    When <%= name %> list request is received
      And all the business logic has completed
    Then respond with the appropiate envelope
      And with all of them
      And http status code "ok"

  Scenario: when a admin want's to see <%= name %>s under a particular account
    Given a valid admin token
    When <%= name %> list request is received
      And all the business logic has completed
    Then respond with the appropiate envelope
      And with all of them
      And http status code "ok"

  Scenario: when a admin want's to see all the <%= name %>s
    Given a valid admin token
    When <%= name %> list all request is received
      And all the business logic has completed
    Then respond with the appropiate envelope
      And with all of them
      And http status code "ok"

  Scenario: when a user want's to see one of his <%= name %>s, but there is none
    Given a valid token
    When <%= name %> list request is received but there is no <%= name %> found
      And all the business logic has completed
    Then respond with the appropiate envelope
      And http status code "ok"

  Scenario: request malformed with no token hash, return error
    When <%= name %> list request is received
    Then respond with error message "Malformed request."
      And http status code "bad request"
