---
title: "Result Data"

weight: 150
type: docs

description: >
  All about the XLT result data which is captured during a performance test and stored in CSV files
  for further processing.
---

## Collected Values

During a load test, the XLT framework automatically collects a lot of information about transactions, actions, and requests being executed as well as event information. Additional custom timers can be added programmatically using the XLT API. Last but not least, each agent process monitors its resource usage and logs these values.

These values are stored separately for each test case and each virtual user in files named `results/<TestCaseName>/<UserNo>/timers.csv`. Agent resource usage data is written to `results/Agent-JVM-Monitor/0/timers.csv`. As the name already suggests, the file format is CSV. See the following example:

```csv
R,Homepage.1,1537368092399,1506,false,767,6248,200,https://localhost:8443/posters/,text/html,0,145,0,670,215,885,,,,,4,,,
R,Homepage.1.4,1537368093962,66,false,900,1898,200,https://localhost:8443/posters/assets/ico/favicon.ico,image/x-icon,0,17,0,46,17,63,,,,,0,,,
R,Homepage.1.3,1537368093962,66,false,916,2922,200,https://localhost:8443/posters/assets/js/bootstrap-paginator.min.js,application/javascript,0,21,0,40,23,63,,,,,0,,,
R,Homepage.1.2,1537368093962,80,false,597,40649,200,https://localhost:8443/posters/assets/img/products/Flora_and_Fauna/Animals/Animals_1.jpg,image/jpeg,0,0,65,11,65,76,,,,,0,,,
R,Homepage.1.1,1537368093961,80,false,948,52307,200,https://localhost:8443/posters/assets/img/products/Means_of_Transportation/Railways/Railways_7.jpg,image/jpeg,0,13,0,61,16,77,,,,,0,,,
R,Homepage.1.5,1537368094049,8,false,565,1541,200,https://localhost:8443/posters/assets/js/posterMiniCart.js,application/javascript,0,0,6,0,6,6,,,,,0,,,
R,Homepage.1.8,1537368094055,16,false,549,1925,200,https://localhost:8443/posters/assets/js/poster.js,application/javascript,0,0,13,0,13,13,,,,,0,,,
R,Homepage.1.9,1537368094065,10,false,549,1525,200,https://localhost:8443/posters/assets/css/posters.css,text/css,0,0,8,0,8,8,,,,,0,,,
R,Homepage.1.6,1537368094049,32,false,565,20356,200,https://localhost:8443/posters/assets/css/bootstrap.min.css,text/css,0,0,11,20,11,31,,,,,0,,,
R,Homepage.1.10,1537368094079,10,false,565,10383,200,https://localhost:8443/posters/assets/js/bootstrap.min.js,application/javascript,0,0,8,1,8,9,,,,,0,,,
R,Homepage.1.7,1537368094052,46,false,565,339040,200,https://localhost:8443/posters/assets/img/products/XXL/XXL_3.jpg,image/jpeg,0,0,16,29,16,45,,,,,0,,,
R,Homepage.1.11,1537368094088,23,false,565,315350,200,https://localhost:8443/posters/assets/img/products/XXL/XXL_1.jpg,image/jpeg,0,0,8,13,8,21,,,,,0,,,
R,Homepage.1.13,1537368094119,10,false,565,6085,200,https://localhost:8443/posters/assets/img/xceptanceLogo.png,image/png,0,0,8,0,8,8,,,,,0,,,
R,Homepage.1.12,1537368094115,16,false,581,46905,200,https://localhost:8443/posters/assets/img/products/Food/Cold_Cuts/Cold_Cuts_1.jpg,image/jpeg,0,0,12,2,12,14,,,,,0,,,
R,Homepage.1.14,1537368094122,15,false,565,143846,200,https://localhost:8443/posters/assets/img/products/XXL/XXL_2.jpg,image/jpeg,0,0,8,6,8,14,,,,,0,,,
R,Homepage.1.15,1537368094123,15,false,565,30484,200,https://localhost:8443/posters/assets/js/jquery-2.2.4.min.js,application/javascript,0,0,9,4,9,13,,,,,0,,,
R,Homepage.1.17,1537368094138,10,false,565,917,200,https://localhost:8443/posters/assets/css/posterMiniCart.css,text/css,0,0,8,0,8,8,,,,,0,,,
R,Homepage.1.16,1537368094134,22,false,565,308545,200,https://localhost:8443/posters/assets/img/products/XXL/XXL_4.jpg,image/jpeg,0,0,8,13,8,21,,,,,0,,,
A,Homepage,1537368092381,2380,false
T,TVisit,1537368091385,3456,false,,
```

The lines have a different number of columns as they represent different types of information. The following table describes the meaning of every column depending on the data record type:

| Column | Transaction | Action | Request | Page Load Timing | Web Vital | Custom Timer | Event | Agent Resource Usage | Custom Value |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
|**1**|T|A|R|P|W|C|E|J|V|
|**2**|name|name|name|name|name|name|name|agent name|name|
|**3**|start time|start time|start time|start time|start time|start time|time|time|time|
|**4**|run time [ms]|run time [ms]|run time [ms]|run time [ms]|run time [ms]|run time [ms]|transaction name|current CPU usage (agent only) [%]|value|
|**5**|failed flag|failed flag|failed flag|failed flag| - |failed flag|event message|used main memory (absolute)| - |
|**6**|exception stack trace[^fn1]| - |bytes sent| - | - | - | - |current main memory usage (relative) [%]| - |
|**7**|name of last action[^fn1]| - |bytes received| - | - | - | - |used heap memory (absolute)| - |
|**8**|user index[^fn1]| - |response code| - | - | - | - |total heap memory (absolute)| - |
|**9**|dump dir name[^fn1]| - |request URL| - | - | - | - |current heap memory usage (relative) [%]| - |
|**10**| - | - |response content type| - | - | - | - |threads in state "runnable"| - |
|**11**| - | - |connect time [ms]| - | - | - | - |threads in state "blocked"| - |
|**12**| - | - |send time [ms]| - | - | - | - |threads in state "waiting" or "timed waiting"| - |
|**13**| - | - |server busy time [ms]| - | - | - | - |minor GC cycles since start| - |
|**14**| - | - |receive time [ms]| - | - | - | - |minor GC time since start [ms]| - |
|**15**| - | - |time to first bytes [ms]| - | - | - | - |current minor GC CPU usage [%]| - |
|**16**| - | - |time to last bytes [ms]| - | - | - | - |full GC cycles since start| - |
|**17**| - | - |request ID| - | - | - | - |full GC time since start [ms]| - |
|**18**| - | - |HTTP method[^fn2]| - | - | - | - |current full GC CPU usage [%]| - |
|**19**| - | - |form data encoding[^fn2]| - | - | - | - |minor GC time since last update [ms]| - |
|**20**| - | - |form data[^fn2]| - | - | - | - |full GC time since last update [ms]| - |
|**21**| - | - |domain lookup time [ms]| - | - | - | - |minor GC cycles since last update| - |
|**22**| - | - |resolved IP address(es)[^fn3]| - | - | - | - |full GC cycles since last update| - |
|**23**| - | - |response ID| - | - | - | - |current CPU usage (total) [%]| - |
|**24**| - | - |IP address used for the request [^fn4]| - | - | - | - | - | - |

[^fn1]: These values are only present if the transaction has failed, otherwise they are blank.

[^fn2]: These values are only present if the property `com.xceptance.xlt.results.data.request.collect.formData` is enabled, otherwise they are blank.

[^fn3]: The list of IP addresses reported by DNS for the host name used when making the request. If there is more than one IP address, they will be stored separated by a '|' character. Will not be set if the request did not trigger a DNS address resolution, for example, in case of keep-alive connections. This value is only present if the property `xlt.dns.recordAddresses` is set to true, otherwise it is blank.

[^fn4]: The target IP address of the system under test that was used when making the request. This info is useful only if the target system has multiple IP addresses, e.g. if it is located behind a CDN. This value is only present if the property `com.xceptance.xlt.results.data.request.collectUsedIpAddress` is set to true, otherwise it is blank.

{{% note notitle %}}
Note that the file format might change or be extended in future XLT releases. We strive to keep the format compatible with older versions by only adding information, but cannot guarantee it.
{{% /note %}}

