# Localization (i18n) in Vue Portfolio

This project uses [vue-i18n](https://vue-i18n.intlify.dev/) for localization. The following languages are supported:

- English (en)
- Spanish (es)
- French (fr)
- Polish (pl)
- German (de)

## How to Use Translations in Components

### In Templates

Use the `$t` function to translate text in templates:

```vue
<template>
  <div>
    <h1>{{ $t('navigation.home') }}</h1>
    <p>{{ $t('common.language') }}</p>
  </div>
</template>
```

### In Script Setup

Import and use the `useI18n` composable:

```vue
<script setup>
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

// Use t function for translations
const pageTitle = t('navigation.home');

// Access or change current locale
console.log(locale.value); // Current language code
</script>
```

## Changing the Language

You can use the `setLanguage` helper function to change the language:

```vue
<script setup>
import { setLanguage } from '@/i18n';

// Change to Spanish
const switchToSpanish = () => {
  setLanguage('es');
};
</script>
```

## Adding New Translations

1. Add new translation keys to all language files in the `src/locales` directory.
2. Follow the existing JSON structure.

Example:

```json
{
  "section": {
    "newKey": "Translation text"
  }
}
```

## Adding a New Language

1. Create a new JSON file in the `src/locales` directory (e.g., `it.json` for Italian).
2. Copy the structure from an existing language file and translate all values.
3. Update the `src/i18n/index.ts` file to include the new language:
   - Import the new language file
   - Add it to the messages object
   - Add the language code to the array of supported languages in the `getBrowserLanguage` and `setLanguage` functions

## Best Practices

1. Use nested keys to organize translations (e.g., `navigation.home` instead of just `home`).
2. Keep translation keys consistent across all language files.
3. Use variables for dynamic content:
   ```vue
   {{ $t('greeting', { name: userName }) }}
   ```
   With a translation like: `"greeting": "Hello, {name}!"`
4. For pluralization, use vue-i18n's plural features.