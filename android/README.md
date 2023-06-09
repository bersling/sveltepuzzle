## Android

Creating an android app with capacitor is dead easy. Here are the steps you need to do.

### Step 1: Local Dev

```
npx cap add android
```

- Open android studio on the created `android` folder
- Set up a testing device to test your release locally

### Step 2: First build for internal testers

- Run `build` > `Generate Signed Bundle / APK`
- Create or choose a signing key. Make sure to store all credentials somewhere in a safe place, including the used alias.
- Click on `locate` in the notifications to open in finder, should be under `app > release > app-release.aab`
- Create an account or sign in at `Google Play Console`: https://play.google.com/console
- Let your ID be verified, can take around 24h
- Pay 25 bucks at some point
- In sidenav go to `Release` > `Testing` > `Internal testing` and then click the `Create new release` button
- Upload the `app-release.abb`
- You can now install the app on your phone throw play store!
- For new builds bump the `versionCode` and `versionName` variables in in the gradle file `sveltepuzzle/client/android/app/build.gradle`

### Step 3: Going public

- Answer questions in all questionnaires
- Provide required icons
