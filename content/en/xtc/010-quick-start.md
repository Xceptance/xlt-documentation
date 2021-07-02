---
title: "Quick Start"

weight: 10
type: docs

description: >
  What you need to set up and run a load test in XTC.
---

* sign up on https://xtc.xceptance.com/ (how are roles assigned? can I be my own admin? what is default customer role?)

---------------

* structure: my organizations > my projects > load tests
* project: 
    * configuration (basic/repository with branch, test suite path, auth/memberships)
    * load tests: 
        * table shows name, date (if already started), state, summary, rating (if available)
        * load test details: status (steps in test run and their state), settings (editable while test is not started), scenario status (like report status in MC), results (final and intermediate), reports (final and intermediate), evaluation (if available, with rating, can be added after test finished) 
        * add new or copy existing

---------------

* new load test: 
    * set name and description > status = New
    * click test name: enter configuration (settings): 
        * load profile: overrides load profile in test suite (if set)
        * repository: overrides project repository
        * master/agent controller password (default: random string)
        * MANDATORY: machines to be used (Google machines: specify region(s), instance template, instance count, agents per instance/or Custom Machines: specify host name(s) and agents per instance)
    * start load test by start symbol top right
    * see status in status tab
    * generate intermediate report by report symbol top right (automatically downloads intermediate results), report and results will be available in results/reports tab
    * after test run: add evaluation in evaluation tab, summary and rating will be shown on load test overview

