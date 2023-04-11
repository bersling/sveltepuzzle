# Svelte Puzzle

Svelte Puzzle is a simple puzzle game built with Svelte.

## Why Svelte Puzzle?

To show web devs how to leverage web skills for mobile apps, I've created svelte puzzle. It's based on games I've built for [toddler-games.com](https://toddler-games.com), so it's optimized for mobile and also available in Google Play Store and on iOS App Store.

## Demo 🚀

- **Web**: https://sveltepuzzle.toddler-games.com/
- **Android**: [Play Store](https://play.google.com/store/apps/details?id=com.toddlergames.sveltepuzzle)
- **iOS**: [App Store](https://testflight.apple.com/join/A13bnoZD)

![](https://github.com/bersling/sveltepuzzle/blob/master/sveltehack-trailer1.gif)

## Svelte + Capacitor = ❤️

I tried different `Web -> Mobile` solutions and found that Capacitor is best to get started. Unlike some other frameworks, it really works out of the box with a couple of simple commands. Like this you can build a mobile app with Svelte in no time!

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

To run and build the iOS version, you need Xcode and then run `npx cap open ios`.

## Local Development

All useful commands are encoded in the `package.json`, but here's how to get started:

```
npm ci
npm start
```

You need at least node v16.

To sync code changes into the iOS and Android projects do a `npm run capsync`.

## Awesome tips 😎

- The fastest way to test changes on mobile devices is with [ngrok](https://ngrok.com/). You can create a tunnel/link to your local machine and then test in the web browser of any device.
- Safari has a pretty neat sync between iOS devices and the safari browser on the local dev machine inspector over wifi. Just need to set it up with a couple of clicks. Instructions [here](https://www.youtube.com/watch?v=o4ZmD7asfpQ).
- Puppeteer is a great way to create thumbnail images of something. That way you can use your web & css skills to create things like icons and then convert to jpg format with puppeteer! See [icongenerator5000](./generators/icongenerator5000.ts).

## TODO

Before the Svelte Hack submission deadlines, here are some things I'd like to get done:

- Android and iOS release 🤞
- Improve readmes
- Cleanup
