@api @FR-010 @FR-014
Feature: Agent API Endpoint Validation
  As a test engineer
  I want to validate the agent API responses
  So that agent data contracts are verified

  Background:
    Given the backend is running with Mockoon mocks

  Scenario: Agent list returns all mock agents
    When the client sends GET "/api/agents"
    Then the response status MUST be 200
    And the response data "items" MUST have at least 1 entry

  Scenario: Agent detail returns valid agent
    When the client sends GET "/api/agents/d432fbb3-d2f1-4a97-9ef7-75bd81c00000"
    Then the response status MUST be 200
    And the response data MUST contain "id"
    And the response data MUST contain "state"

  Scenario: Agent search by UUID
    When the client sends GET "/api/agents/search?q=d432fbb3"
    Then the response status MUST be 200

  Scenario: Non-existent agent returns 404
    When the client sends GET "/api/agents/00000000-0000-0000-0000-000000000000"
    Then the response status MUST be 404
