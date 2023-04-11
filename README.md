# Svelte Puzzle

![](https://github.com/bersling/sveltepuzzle/blob/master/sveltehack-trailer1.gif)

## Demo 🚀

https://sveltepuzzle.toddler-games.com/

## Why Svelte Puzzle?

Svelte Puzzle is a simple game built with Svelte. It's based on games I've built for [toddler-games.com](https://toddler-games.com), so it's optimized for mobile and also available in Google Play Store and on iOS App Store. I thought the biggest impact would have to show fellow devs to show how easy it is to build a mobile app with `Svelte + Capacitor`.

## Svelte + Capacitor = ❤️

I played with different `Web -> Mobile` solutions and found that Capacitor is best to get started. Unlike some other frameworks, it really works out of the box with a couple of simple commands. Like this you can build a mobile app with Svelte in no time!

In this repo, the initial commands from capcitor have already been run, but if you want to get started in your own svelte project it's really as easy as:

```
npm i @capacitor/core @capacitor/android @capacitor/ios
npm i -D @capacitor/cli

npx cap init
npx cap add android
npx cap add ios
```

BOOM💥, you now have mobile apps. More info on initial setup here https://capacitorjs.com/docs/getting-started.

To run and build the android version, install Android Studio and open the `android` folder.

To run and build the ios version, you need Xcode and then run `npx cap open ios`.

## Local Development

All useful commands are encoded in the `package.json`, but here's how to get started:

```
npm ci
npm start
```

And to sync code changes into the ios and android projects do a `npm run capsync`.

================= TODO: improve below ==================

## Getting set up for development

```
nvm use 16
npm ci
cd client && npm ci && cd ..
npm start
npm run convert
```

### iOS

Done for you already:

```
npx cap add ios
```

BOOM! iOS app.

`Info.plist` was enhanced with

```
	<key>ITSAppUsesNonExemptEncryption</key>
	<false/>
```

, see https://stackoverflow.com/questions/45855629/export-compliance-in-ios-app-submission

Open in Xcode:

```
npx cap open ios
```

## Android

Creating an android app with capacitor is dead easy. Here are the steps you need to do.

### Step 1: Local Dev

```
cd client
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

- Answer ONE THOUSAND MILLION QUESTIONS AND QUESTIONNAIRES
- Add TEN THOUSAND SCREENSHOTS (best way to create them: to be researched)

## TODO

Before the Svelte Hack submission deadlines, here are some things I'd like to get done:

- Only one package.json instead of two
- Publish android release 😱
- Improve readme
- Start ios release?
