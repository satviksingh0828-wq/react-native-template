# GitHub Actions Workflow: Build Android APK

This workflow automates the process of building Android APKs for the React Native application and uploads them as GitHub artifacts.

## Workflow File

Create a file at `.github/workflows/build-apk.yml` with the following content. This version is updated to **force JavaScript bundling** into the debug APK, which fixes the "Unable to load script" error when running the app on a device without a local Metro server.

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
          # -PBUNDLE_IN_DEBUG=true ensures the JS bundle is packaged inside the APK
          ./gradlew assemblePreviewDebug assembleProductionDebug -PBUNDLE_IN_DEBUG=true --no-daemon

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

## Why you saw "Unable to load script"
By default, React Native **Debug** builds do not include the JavaScript bundle inside the APK. Instead, they try to fetch it from a Metro server running on your computer. Since the APK built in GitHub Actions is running on your phone without a connection to a Metro server, it fails to load the script.

Adding `-PBUNDLE_IN_DEBUG=true` tells the build system to package the JavaScript bundle directly into the APK, making it "standalone" even in debug mode.

## How it works

1.  **Trigger**: Runs on push/PR to `main` or manual trigger.
2.  **Environment**: Uses `ubuntu-latest`.
3.  **Build**: Runs the Gradle command with the `BUNDLE_IN_DEBUG` property set to true.
4.  **Artifacts**: Uploads both standalone APKs as separate artifacts.

## Notes
*   These are still **debug** builds.
*   If you want to build a true **Release** APK (which is always standalone), you would use `./gradlew assembleRelease`, but that requires setting up signing keys.
