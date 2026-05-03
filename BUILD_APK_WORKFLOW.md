# GitHub Actions Workflow: Build Android APK

This workflow automates the process of building Android APKs for the React Native application and uploads them as GitHub artifacts.

## Workflow File

Create a file at `.github/workflows/build-apk.yml` with the following content. This version is updated to handle the **product flavors** (`production` and `preview`) defined in your project.

```yaml
name: Build Android APK

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
          cache: 'yarn'
          cache-dependency-path: 'yarn.lock'

      - name: Enable Corepack
        run: corepack enable

      - name: Install dependencies
        run: yarn install --immutable

      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'zulu'
          cache: 'gradle'

      - name: Build Android APK
        run: |
          cd android
          chmod +x gradlew
          # Building both flavors in debug mode
          ./gradlew assemblePreviewDebug assembleProductionDebug --no-daemon

      - name: Upload Preview APK
        uses: actions/upload-artifact@v4
        with:
          name: app-preview-debug
          path: android/app/build/outputs/apk/preview/debug/*.apk
          retention-days: 7

      - name: Upload Production APK
        uses: actions/upload-artifact@v4
        with:
          name: app-production-debug
          path: android/app/build/outputs/apk/production/debug/*.apk
          retention-days: 7
```

## Why the previous one failed
Your project uses **Product Flavors** (`production` and `preview`). In such cases, Gradle generates the APKs in flavor-specific subdirectories rather than the default `debug/` folder.
*   **Preview Path**: `android/app/build/outputs/apk/preview/debug/`
*   **Production Path**: `android/app/build/outputs/apk/production/debug/`

## How it works

1.  **Trigger**: Runs on push/PR to `main` or manual trigger.
2.  **Environment**: Uses `ubuntu-latest`.
3.  **Build**: Runs `./gradlew assemblePreviewDebug assembleProductionDebug` to generate APKs for both environments.
4.  **Artifacts**: Uploads both APKs as separate artifacts. You can download them from the "Actions" tab under the specific workflow run.

## Notes
*   These are **debug** builds. They use the default `debug.keystore`.
*   If you only want one, you can modify the `gradlew` command to just `./gradlew assemblePreviewDebug`.
