# Getting set up for development

When checking this out for the first time it's a bit of a pain to get going:

```
nvm use 16
npm ci
cd client && npm ci && cd ..
npm start
npm run convert
```

Iterate a bit between convert and start since they have some chicken-eggy dependencies...
