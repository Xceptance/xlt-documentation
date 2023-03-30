---
title: "Audit Log"

weight: 70
type: docs

draft: true

description: >
    Information about which user did what in a project.
---

{{< TODO / >}} Permissions needed to view system/org/project audit log?

XTC comes with an Audit Log. Use this feature to learn which activity has been performed by which user at which time. 

The _Audit Log_ page in your **organization** shows just organization-related activities while the _Audit Log_ page in a **project** lists activities for that project only. 

{{< TODO / >}} Which activities are currently logged? Are we documenting this here or are these too many?
```
        // System Audit Log
        // User-specific codes
        USER_CREATE,
        USER_UPDATE,
        USER_SIGNUP_COMPLETE,
        USER_REMOVE,
        USER_PASSWORD_CHANGE,
        USER_PASSWORD_RESET,
        USER_2FA_ENABLE,
        USER_2FA_DISABLE,
        USER_2FA_REGENERATE,
        USER_2FA_RECOVERY_USE,
        USER_AUTO_LOCK,
        USER_MANUAL_LOCK,
        USER_MANUAL_UNLOCK,
        USER_SSO_ENABLE,
        USER_SSO_DISABLE,
        // Organization-specific codes
        ORG_CREATE,
        ORG_DELETE,

        // Organization Audit Log
        ORG_UPDATE,
        ORG_MEMBER_ADD,
        ORG_MEMBER_REMOVE,
        ORG_MEMBER_LOCK,
        ORG_MEMBER_UNLOCK,
        ORG_MEMBER_INVITE,
        ORG_ROLE_CHANGE,
        PROJECT_CREATE,
        PROJECT_DELETE,

        // Project Audit Log
        PROJECT_UPDATE,
        PROJECT_MEMBER_ADD,
        PROJECT_MEMBER_REMOVE,
        PROJECT_MEMBER_INVITE,
        PROJECT_ROLE_CHANGE,
        // Load-test-specific codes
        LOADTEST_CREATE,
        LOADTEST_UPDATE,
        LOADTEST_START_MANUAL,
        LOADTEST_ABORT,
        LOADTEST_DELETE,
        // Result-specific codes
        RESULT_DELETE,
        RESULT_SHARE,
        RESULT_SHARE_UPDATE,
        RESULT_UNSHARE,
        // Report-specific codes
        REPORT_CREATE_MANUAL,
        REPORT_DELETE,
        REPORT_SHARE,
        REPORT_SHARE_UPDATE,
        REPORT_UNSHARE
```

{{< TODO / >}} Build screenshot with neutral usernames etc.

Use the search/filter controls available at the audit log tables to narrow down the list of activities. Entries in the audit log expire automatically after 180 days.

{{% note notitle %}}
Note that the audit log feature is not complete yet. The activity names and details will be fine-tuned over the next weeks and more activity types will be added.
{{% /note %}}



