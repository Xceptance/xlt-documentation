---
title: "Localization"

weight: 40
type: docs

description: >
  Everything about localization in Neodymium.
---

The [Neodymium](https://github.com/Xceptance/neodymium-library/blob/master/src/main/java/com/xceptance/neodymium/util/Neodymium.java)
context class provides a function to assist with localization. `localizedText(String key)` retrieves a string for the
key of the current locale. The mapping is stored within file `config/localization.yaml`.

{{% warning notitle %}}
Using the YAML format helps us to structure the localization file in an easy manner. Nevertheless, some YAML features
may introduce pitfalls. The YAML spec defines an auto-conversion for keys and values. We expect the keys to always be of
type `String`, so make sure to quote keys that would otherwise be converted to booleans or numbers. Using quotes also
allows to use YAML special characters in values name.
{{% /warning %}}

Consider having a site to test with different languages (English, Italian and French) and we need to check the
underlying text of the login/logout link. The following YAML file contains the expected values in a special hierarchy.

```YAML
default:
  usermenu:
    login: "Login"
    logout: "Logout"
  countryselector:
    text: NONE # This is not on US and that is right now our default
  general:
    Yes: "Yes"
    phone911: "911"

# Great Britain
en_GB:
  countryselector:
    text: "English (United Kingdom)"

# Italy
it_IT:
  usermenu:
    login: "Accedi"
    logout: "Esci"
  countryselector:
    text: "italiano (Italia)"
  general:
    Yes: "sì"
    phone911: "112"

# France
fr_FR:
  usermenu:
    login: "Connexion"
    logout: "Déconnexion"
  countryselector:
    text: "français (France)"
  general:
    Yes: "Oui"
    phone911: "112"
```

First there is the locale (default, en_GB, it_IT, fr_FR). Each locale section contains subsections that in turn may
contain other sections. The localization feature now reads that file and uses the configured locale to retrieve the
corresponding text.
The default locale is en_US. To configure a locale set the property `neodymium.locale = <target locale>` in any
`neodymium.properties` file or define it inside the test data and set it during runtime like in the following code.

{{% note notitle %}}
The current set locale will be read from file `config/neodymium.properties`. The property is named `neodymium.locale`
and defaults to `neodymium.locale=en_US` if not set.
{{% /note %}}

Here is the JSON defining the test data.

```json
[
  {
    "locale": "en_GB",
    "testId": "login test: GB"
  },
  {
    "locale": "it_IT",
    "testId": "login test: IT"
  },
  {
    "locale": "fr_FR",
    "testId": "login test: FR"
  }
]
```

And inside the test set the locale dynamically like this.

```java

@BeforeEach
public void setUpLocaleAndSite()
{
    // get the locale from the test data
    String locale = DataUtils.asString("locale", "en_GB");
    Neodymium.configuration().setProperty("neodymium.locale", locale);
}
```

To get the expected text for the login button of the current locale one would write:

```Java
String loginButtonText = Neodymium.localizedText("usermenu.login");
```

Depending on the set locale this would result in the different values that are provided inside the YAML file. For
instance the locale is `it_IT` the function would retrieve `Accedi`. There is also a fallback mechanism that allows you
to have some kind of global definitions. For instance the local `en_GB` does not have any value defined for the login
text. In that case the `localizedText` function would try to search for a value for the locales `en` which is also
undefined. Finally, the `default` locale would be used to find a value. If the key can't be found overall then the
function call will result in an assertion error.

{{% note notitle %}}
The special language fallback e.g. `en_US` or `en_GB` to the prefix `en` can be used to prevent duplication.
{{% /note %}}

If you need the localized text for a locale that differs from the configured one, you can add the locale as a parameter
to the function call.

```Java
String expected = Neodymium.localizedText("usermenu.login", "fr_FR");
```

This would retrieve `Connexion` even if `it_IT` was set as the configured locale.
