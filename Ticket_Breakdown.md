# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Feature: Generate Report for Agent by custom Agent ID.

### Task 1: Ability to add custom Agent ID

- **Description**:
  Facilities want to save their own custom Agent ID for agents they work with for easy access to an Agent.

- **Acceptance Criteria**:
  Facilities should be able to add their own custom ID for any Agent.

- Implementation Details:
  1. Add a table `FacilityAgents` with one to many relationship between Facility and Agents. It can have three columns similar to the following: facilityId, agentId, customId
  2. Create an API endpoint to add entry to this table. The endpoint should make sure that facilities are only able to modify custom ids of their own agents.
- **Estimations**: 16 hours (2 story point)
  1. Implentation: 10 hours
  2. Testing: 6 hours

### Task 2: Modify getShiftsByFacility to use custom Agent ID if present

- **Description**:
  Modify `getShiftsByFacility` to return custom Agent ID in Agent metadata, if one is present, for each shift.

- **Acceptance Criteria**:
  The list of shifts returned by `getShiftsByFacility` includes the custom Agent ID, when present.

- **Implementation Details**:

  1. Modify the SQL query that fetches information about shifts to include the `FacilityAgents` table
  2. Use internal agent ID if a custom ID has not been specified for that agent by that facility

- **Estimations**: 10hrs (2 story point)

  1. Implentation: 6hrs
  2. Testing: 4hrs

- **Dedendency**: Task1
