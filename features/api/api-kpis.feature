@api @FR-001
Feature: KPI API Endpoint Validation
  As a test engineer
  I want to validate the KPI API responses
  So that the backend contract is verified independently of the UI

  Background:
    Given the backend is running with Mockoon mocks

  Scenario: KPI endpoint returns correct envelope
    When the client sends GET "/api/kpis"
    Then the response status MUST be 200
    And the response MUST contain "success" equal to true
    And the response MUST contain a "data" object
    And the response MUST contain a "timestamp" string
    And the response MUST contain a "request_id" string

  Scenario: KPI data includes required fields
    When the client sends GET "/api/kpis"
    Then the response data MUST contain "total_agents"
    And the response data MUST contain "active_agents"
    And the response data MUST contain "failed_agents"
    And the response data MUST contain "attestation_success_rate"

  Scenario: Agent list endpoint returns paginated response
    When the client sends GET "/api/agents"
    Then the response status MUST be 200
    And the response data MUST contain "items" as an array
    And the response data MUST contain "total_items"
    And the response data MUST contain "page"
    And the response data MUST contain "page_size"
