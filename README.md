# Sveltepuzzle

![](https://github.com/sveltepuzzle/sveltehack-trailer1.gif)

## Getting set up for development

```
nvm use 16
npm ci
cd client && npm ci && cd ..
npm start
npm run convert
```

## Android

Creating an android app with capacitor is dead easy. Here are the steps you need to do:

```
cd client
npx cap add android
```

- Open android studio on the created `android` folder
- Set up a testing device to test your release locally
- Run `build` > `Generate Signed Bundle / APK`
- Create or choose a signing key. Make sure to store all credentials somewhere in a safe place, including the used alias.
- Click on `locate` in the notifications to open in finder, should be under `app > release > app-release.aab`
- Create an account or sign in at `Google Play Console`: https://play.google.com/console
- Pay 25 bucks 🙄
- In side nav go to `Release` > `Testing` > `Internal testing` and then click the `Create new release` button
- Upload the `app-release.abb`
- You can now install the app on your phone throw play store
-

## TODO

- remove nesting and two package jsons?
- Add icons to android release
- Do from scratch
