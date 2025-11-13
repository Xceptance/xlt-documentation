---
title: "Test Execution Recording"

weight: 160
type: docs

description: >
  How to set up and configure test recording
---

A video or GIF recording of your test execution shows you how the test navigates the system under test and provides a
visual record of eventual errors. This allows you to review your tests in action and uncover areas that may need
improvement.

This feature can be enabled by setting `gif.enableFilming=true` or `video.enableFilming=true` in your configuration.

**Important Notes:**

* **File Output:** There is one recording per test case, saved as an `.mp4` (video) or `.gif` file.
* **Coverage:** Neodymium records the entire viewport of the browser executing your tests.
* **Disk Space:** Consider your disk space. Running hundreds of test cases on one machine requires sufficient space, as
  each recording is stored in the defined folder and, if enabled, within the Allure report as well.

In our example test suites, GIF recording is enabled by default.

## Configuration and Usage

To enable and configure recording, define the desired properties within the dedicated configuration files located in the
`config` directory:

* `config/video-recording.properties`
* `config/gif-recording.properties`

A complete list of available properties is provided in the overview below.

{{% warning notitle %}}
**Prerequisites:** To properly use **video recording (MP4)**, you must have [ffmpeg](https://ffmpeg.org/) installed on
the execution machine. **GIF recording** works out of the box without external tools.
{{% /warning %}}

### Integration in Allure Report

Recordings are added to the Allure report automatically. This can be disabled by setting the following properties to
`false`:

* `video.appendAllRecordingsToAllureReport=false`
* `gif.appendAllRecordingsToAllureReport=false`

With those settings only the recordings of failed tests will be added.

### Property Overview

All properties start with the `video.` or `gif.` prefix, depending on the format you are configuring.

| Property                                    | Applies To  | Format  | Description                                                                                                            |
|:--------------------------------------------|:------------|:--------|:-----------------------------------------------------------------------------------------------------------------------|
| `enableFilming`                             | GIF & Video | boolean | Enables recording. If `false`, all other recording properties are ignored.                                             |
| `filmAutomatically`                         | GIF & Video | boolean | Defines whether recording starts automatically when the browser opens, or if it must be started manually in the code.  |
| `deleteRecordingsAfterAddingToAllureReport` | GIF & Video | boolean | Deletes the recording file from the recording folder after successfully adding it to the Allure report to save space.  |
| `appendAllRecordingsToAllureReport`         | GIF & Video | boolean | Defines whether all recordings are added to the report. If `false`, only recordings for **failed** tests are included. |
| `oneImagePerMilliseconds`                   | GIF & Video | Integer | Defines the time interval in milliseconds between captured frames (must be greater than 0).                            |
| `tempFolderToStoreRecording`                | GIF & Video | String  | Defines the directory path where the temporary and final recordings are saved.                                         |
| `imageQuality`                              | GIF & Video | double  | Defines the desired image quality percentage (value range: $0 \le \text{imageQuality} \le 1.0$).                       |
| `imageScaleFactor`                          | GIF & Video | double  | Defines the scale factor of the image (value range: $0 < \text{imageScaleFactor} \le 1.0$).                            |
| `format`                                    | GIF & Video | String  | Defines the recording format: `mp4` or `gif`.                                                                          |
| `logInformationAboutRecording`              | GIF & Video | boolean | Adds additional debug data about the video processing to the Allure report.                                            |
| `video.ffmpegBinaryPath`                    | Video       | String  | Defines the path to the `ffmpeg` program executable.                                                                   |
| `video.ffmpegLogFile`                       | Video       | String  | Defines the path where the `ffmpeg` log file is saved.                                                                 |
| `gif.loop`                                  | GIF         | boolean | Defines whether the GIF recording should automatically repeat after finishing.                                         |

## Manual Recording Control

If only a specific segment of a test should be filmed (e.g., to exclude warm-up actions), you can disable automatic
filming by setting `video.filmAutomatically = false` or `gif.filmAutomatically = false`.

In this manual mode, recording must be started and finished explicitly in the test code using the following methods:

```java
FilmTestExecution.startVideoRecording(String<fileName>);
// ... test actions to record ...
FilmTestExecution.finishVideoFilming(String<fileName>, boolean <testFailed>); 
```

**Attachment Logic:**

* If `testFailed` is set to `true`, the recording will always be added to the Allure report.
* If `testFailed` is set to `false`, the recording will only be added if the property
  `appendAllRecordingsToAllureReport` is set to `true`.
