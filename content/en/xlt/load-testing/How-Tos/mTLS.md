---
title: "Configuring mTLS for your XLT Test Suite"
linkTitle: "mTLS"

weight: 640
type: docs


description: >
    How to set up your XLT test suite for using mTLS.  
---

In a zero-trust environment, not only must the client verify the server's identity, but the server must also verify the client's identity. This is known as [Mutual Transport Layer Security (mTLS)](https://www.cloudflare.com/learning/access-management/what-is-mutual-tls/).

XLT has always supported mTLS, and starting with XLT 8.2.0, it provides configuration options to set this up more conveniently and especially independent of your scenarios.

To run tests with XLT in such environments, the underlying HtmlUnit WebClient must be configured with

* a key store containing the client's private key, and
* a trust store containing the certificate of the CA that signed the server key.

The trust store setup is only needed if the server key was not signed by one of the well-known CAs that the JVM trusts out of the box.

The key store containing the client key can be configured as follows:

```
com.xceptance.xlt.tls.keyStore.file = config/keystore.p12
com.xceptance.xlt.tls.keyStore.password = <store-pw>
```

Note that the path to the key store must be relative to the root directory of your test suite. Also, if you want to password-protect the store, make sure that the key in the store is protected with the same password.

The trust store with the CA certificate is set up this way:

```
com.xceptance.xlt.tls.trustStore.file = config/truststore.p12
com.xceptance.xlt.tls.trustStore.password = <store-pw>
```

Typically, trust stores don't need to be password-protected.

To create or modify the necessary keys, key store, and trust store, use Java's [keytool](https://docs.oracle.com/en/java/javase/11/tools/keytool.html) or [KeyStore Explorer](https://keystore-explorer.org/). Both provide ways to import existing keys and certificates in various formats, such as PEM. Make sure that the store format you choose matches the extension of the store file name (JKS -> `.jks`, PKCS#12 -> `.p12`, etc.).

The last step is to configure the server with the client certificate or the appropriate CA certificate. Refer to your server software documentation for more information on how to do this.