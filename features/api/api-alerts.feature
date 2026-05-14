@api @FR-050
Feature: Alert API Endpoint Validation
  As a test engineer
  I want to validate the alert API responses
  So that alert lifecycle contracts are verified

  Background:
    Given the backend is running with Mockoon mocks

  Scenario: Alert list returns valid response
    When the client sends GET "/api/alerts"
    Then the response status MUST be 200
    And the response MUST contain "success" equal to true

  Scenario: Alert summary returns severity counts
    When the client sends GET "/api/alerts/summary"
    Then the response status MUST be 200
    And the response MUST contain "success" equal to true
