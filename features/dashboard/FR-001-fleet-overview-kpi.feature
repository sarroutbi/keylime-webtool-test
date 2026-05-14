@FR-001 @dashboard @smoke
Feature: Fleet Overview KPI Dashboard
  As a security operator
  I want to see computed KPIs on the fleet overview
  So that I can quickly assess the attestation health of my fleet

  Background:
    Given the user is authenticated as "operator"
    And the backend is running with Mockoon mocks

  @standalone @cockpit
  Scenario: Display fleet health KPIs
    Given the Verifier reports agents in mixed states
    When the user navigates to the "Dashboard"
    Then the dashboard MUST display the "Total Agents" KPI
    And the dashboard MUST display the "Attestation Success Rate" KPI
    And the dashboard MUST display the "Failed Attestations" KPI
    And the dashboard MUST display the "Timed-Out Attestations" KPI
    And the dashboard MUST display the "Urgent Alerts" KPI

  @standalone
  Scenario: Attestation Success Rate distinguishes Timeout from Fail
    Given the fleet contains agents in PASS, FAILED, and TIMEOUT states
    When the user navigates to the "Dashboard"
    Then failed agents MUST be rendered in red in the visualization
    And timed-out agents MUST be rendered in orange in the visualization

  @standalone
  Scenario: Dashboard links navigate to detail views
    Given the user is on the "Dashboard"
    When the user clicks the "Total Agents" KPI card
    Then the browser MUST navigate to "/agents"

  @standalone @wip
  Scenario: Verifier API unreachable shows staleness indicator
    Given the Verifier API is unreachable
    When the user navigates to the "Dashboard"
    Then the dashboard MUST display a staleness warning banner
