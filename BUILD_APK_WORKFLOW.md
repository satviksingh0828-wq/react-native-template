# GitHub Actions Workflow: Build Android APK

This workflow automates the process of building a debug APK for the React Native application and uploads it as a GitHub artifact.

## Workflow File

Create a file at `.github/workflows/build-apk.yml` with the following content:

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
          ./gradlew assembleDebug --no-daemon

      - name: Upload APK Artifact
        uses: actions/upload-artifact@v4
        with:
          name: app-debug
          path: android/app/build/outputs/apk/debug/app-debug.apk
          retention-days: 7
```

## How it works

1.  **Trigger**: The workflow runs on every push to `main`, every pull request targeting `main`, or manually via the "Actions" tab.
2.  **Environment**: It uses `ubuntu-latest`.
3.  **Setup**:
    *   Clones the code.
    *   Sets up Node.js based on the `.nvmrc` file.
    *   Installs dependencies using `yarn`.
    *   Sets up JDK 17 (standard for modern React Native Android builds).
4.  **Build**: Runs `./gradlew assembleDebug` to generate the debug APK.
5.  **Artifact**: Uploads the generated `.apk` file to the GitHub Actions run. You can download it from the "Actions" tab under the specific workflow run.

## Notes
*   This builds a **debug** APK. For a release APK, you would need to set up signing keys and use `assembleRelease`.
*   The artifact is kept for 7 days.
