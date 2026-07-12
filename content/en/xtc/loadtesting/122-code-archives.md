---
title: "Code Archives"
weight: 122
type: docs

description: >
  Using uploaded ZIP archives instead of Git repositories to provide load test suites.
---

As an alternative to Git-based source code repositories, load testing projects in XTC allow you to upload source code archives (ZIP files). Use this feature if:

* Your Git repository is not accessible from XTC.
* You use a source code repository other than Git.

Similar to Git repositories, a code archive contains the load test suite in source form. If a load test is configured to use a code archive, that archive serves as the source for the test suite instead of the Git repository. XTC remains responsible for compiling and building the test suite, and will still utilize features such as build and dependency caches in the process.

## Prerequisites

Please ensure that your code archive meets the following requirements:

* **Format**: The archive must be in ZIP format.
* **Structure**: The ZIP archive must contain a single top-level directory.
* **Sources**: The top-level directory must contain the source files of your test suite. This includes all files required to successfully build the test suite (e.g., Maven's `pom.xml` or Gradle's `build.gradle`). You can exclude version control metadata such as `.git` directories.

## Best Practices

When creating a code archive manually or using tools/scripts other than the official plugin, ensure you exclude temporary or generated directories to keep the archive size small. In particular, exclude the following before archiving:
* **Build Directories**: Exclude build output folders like `target/` (for Maven) or `build/` (for Gradle).
* **Test Results**: Exclude local load test results (typically the `results/` directory).
* **SCM Metadata**: Exclude version control folders such as `.git/` or `.svn/`.
* **IDE Settings**: Exclude IDE-specific folders (such as `.idea/`, `.vscode/`, or `.settings/`).

## UI Management

{{% permission type="project" least="true" role="tester" action="view code archives" %}}
{{% permission type="project" least="true" role="test manager" action="manage code archives" %}}

You can manage code archives directly through the XTC web UI:
1. Open your project and select **Configuration** in the left menu.
2. Click the **Code Archives** tab.

From here, you can:
* **Upload**: Drag and drop or browse to upload new ZIP archives.
* **Edit**: Modify the metadata (such as description) of existing archives.
* **Delete**: Manually delete archives that are no longer needed.

## Retention and Storage Limits

To prevent archives from accumulating indefinitely, XTC automatically cleans up old archives on a daily basis:
* **Size Limit**: The maximum size of a single uploaded code archive is **100 MB**. Uploads exceeding this limit will be rejected.
* **Maximum Limit**: A project may hold a maximum of **300** code archives. Once this limit is reached, further upload attempts will fail until some are deleted.
* **Auto-Deletion**: Archives older than **30 days** are eligible for automatic removal. However, XTC will always retain at least the **30 most recent** archives regardless of their age.
* **Storage Quota**: Code archives count toward your project's overall cloud storage usage (alongside load test results and reports).

## Integrity Checksums

To verify the integrity of your uploads and prevent corruption during transit, XTC maintains checksums for all code archives:
* **UI Uploads**: When uploading files through the web UI, XTC automatically calculates the SHA-512 checksum locally before transmission begins.
* **API Uploads**: When uploading via the REST API, you can optionally include a precalculated SHA-512 checksum in the `Content-Digest` HTTP header. If provided, XTC will validate the uploaded file against this digest. If not provided, the archive is stored as transmitted.
* **Verification**: Regardless of how the archive was uploaded, its checksum is stored and displayed in the UI's code archives list for easy verification and reference.

## REST API Automation

You can automate the management and upload of code archives using the XTC REST API (e.g., as part of a CI/CD pipeline).

### 1. Create API Credentials
Create API client credentials with at least the `CODEARCHIVE_UPLOAD` and `CODEARCHIVE_DELETE` scopes in your project configuration (under *Configuration > Integrations > API Client Credentials*).

### 2. Obtain an Access Token
Use your client credentials to request an OAuth access token:

```sh
curl -k -X POST \
     -d "client_id=<your-client-id>" \
     -d "client_secret=<your-client-secret>" \
     -d "grant_type=client_credentials" \
     -d "scope=CODEARCHIVE_UPLOAD CODEARCHIVE_DELETE" \
     https://xtc.xceptance.com/oauth/token
```

Extract the `access_token` field from the JSON response.

### 3. Upload a Code Archive
Perform the upload by sending the binary data of the ZIP archive. Replace `<access-token>`, `<path/to/archive.zip>`, `<org>`, and `<project>` with your values:

```sh
curl -k -X POST \
     -H "Authorization: Bearer <access-token>" \
     -H "Content-Type: application/zip" \
     --data-binary "@<path/to/archive.zip>" \
     https://xtc.xceptance.com/public/api/v2/orgs/<org>/projects/<project>/code-archives
```

*Optional*: To ensure file integrity, pass a precalculated SHA-512 checksum using the `Content-Digest` header:
```sh
curl -k -X POST \
     -H "Authorization: Bearer <access-token>" \
     -H "Content-Type: application/zip" \
     -H "Content-Digest: sha-512=:<your-precalculated-sha512-hash-in-base64>:" \
     --data-binary "@<path/to/archive.zip>" \
     https://xtc.xceptance.com/public/api/v2/orgs/<org>/projects/<project>/code-archives
```

### 4. Delete a Code Archive
To delete an archive programmatically, find its ID from the API Explorer or the UI, and send a `DELETE` request:

```sh
curl -k -X DELETE \
     -H "Authorization: Bearer <access-token>" \
     https://xtc.xceptance.com/public/api/v2/orgs/<org>/projects/<project>/code-archives/<code-archive-id>
```

For more endpoints and detailed payload definitions, refer to the [API Explorer](https://xtc.xceptance.com/exploreApi).
