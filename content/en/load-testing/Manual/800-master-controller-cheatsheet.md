---
title: "Master Controller Cheat-Sheet"
linkTitle: "Cheat-Sheet MasterController"

weight: 800
type: docs

description: >
  You can find a list of available commands below.
---
## Usage

- `mastercontroller [<other options>]` runs in [interactive mode](../310-test-execution/#interactive-mode). Any command can be chosen to be executed next.
- `mastercontroller --c` or `mastercontroller --commands` displays all the available options and a brief guide about their usage.
- `mastercontroller -auto [<other options>]` runs a load test in [non-interactive mode](../310-test-execution/#non-interactive-mode-scripted-commands). by executing all commands automatically.

### Example(Windows PowerShell)

- This would display all the available command options
```powershell 
C:\xlt-5.7.1\bin> ./mastercontroller.cmd --c 
```
- This would make a load test run in [non-interactive mode](../310-test-execution/#non-interactive-mode-scripted-commands), executing commands automatically in combination with [embedded mode](../310-test-execution/#embedded-mode).
```powershell 
C:\xlt-5.7.1\bin> ./mastercontroller.cmd -auto -embedded -comment "Test Run" 
```

## List of Command Options
- `-auto` is to be [used](../310-test-execution/#auto-mode) for running a load test in [non-interactive mode](../310-test-execution/#non-interactive-mode-scripted-commands).
- `-c` or `--commands` 
- `-comment`
- `-D`
- `-embedded`
- `-faf`
- `-noDownload`
- `-o`
- `--only-download`
- `-pf`
- `report`
- `sequential`
- `testPropertiesFile`
- `timezone`
