### iOS App readme

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
