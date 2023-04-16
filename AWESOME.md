# Awesome Tips & Tricks 😎

- Capacitorjs is really great to go from webapp to mobile app in almost no time.
- The fastest way to test changes on mobile devices is with [ngrok](https://ngrok.com/). You can create a tunnel/link to your local machine and then test in the web browser of any device.
- Safari has a pretty neat sync between iOS devices and the safari browser on the local dev machine inspector over wifi. Just need to set it up with a couple of clicks. Instructions [here](https://www.youtube.com/watch?v=o4ZmD7asfpQ).
- Puppeteer is a great way to create thumbnail images of something. That way you can use your web & css skills to create things like icons and then convert to jpg format with puppeteer! See [icongenerator5000](./generators/icongenerator5000.ts).
- If you want to publish an app to iOS App Store / Google Play store, plan at least a weak in for the review process.
- If you upload apps to "App Store Connect" (apples platform for devs to release apps), and uploads fail without much information (just saying ERROR), reupload again with a tool called "Transporter". It gives more detailed error messages.
- I'm quite happy that I published "Svelte Puzzle" as my first apps for iOS and Android. It's much better to get some experience with the releasing rather than going for a release of a "big app" that's important to you right away!
- This is my code for handling touch [./src/routes/touch.ts](./src/routes/touch.ts) . It is an essential ingredient of making a web app compatible for a mobile release.
- Also check out [./src/app.html](./src/app.html) and [./src/styles/app.scss](./src/styles/app.scss). They also include some essential code for making it feel like an app on mobile.
- If you're coming from web development, learning that you cannot immediately redeploy when you have a bug, but first need to wait for approval from Apple or Google is something you have to get used to.
- On iOS, make sure that your app doesn't overlap with things like Battery Charging Status. You can achieve this with (https://developer.mozilla.org/en-US/docs/Web/CSS/env)
- The [./build-and-deploy.sh](./build-and-deploy.sh) is something I've used for years. It looks like many devs in the hackathon struggled to host their projects. I usually use AWS Cloudfront for hosting, if you have some experience with AWS, this is certainly a good solution to host static pages, like for example those built with Svelte Kit SSG!