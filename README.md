# Due Diligence - TestCafé

To run the UI tests: `yarn start` in one session and `yarn yarn e2e:local` in another one.

## Features

- Extensive browser support
- Super simple Browserstack integration with just 1 package to install + an NPM script to add (and 2 env variables for the credentials). Test code doesn’t need changing at all!
- Typescript support
- CSS _and_ programmatic selectors, i.e.

```
Selector(‘ul’)
  .nth(-1)
  .withText(/a[b-e]/)
  .filter((node, idx) => {});
```

- React-specific selectors, i.e. `ReactSelector('TodoApp div span');`
- File upload API
- Drag & drop API, I.e.

```
test('Drag an item from the toolbox', async t => {
    await t
        .dragToElement('.toolbox-item.text-input', '.design-surface')
        .expect(designSurfaceItems.count).gt(0);
});
```

- Screenshot API (viewport only, full page coming later)
- HTTP(S) Request Listener/Logger
- Role-based auth support, i.e. cached cookie jars, including “anonymous” role
- Client function execution, e.g. `const getWindowLocation = ClientFunction(() => window.location);`
- [Good documentation](https://devexpress.github.io/testcafe/documentation/test-api/a-z.html)
- [Public roadmap](https://devexpress.github.io/testcafe/roadmap/)

## Gotchas

- When using the React-specific selectors, make sure to set the `displayName` static property on the components to make them locatable when bundles are minified.
- The underlying Hammerhead lib sent to the browser at run time needs a polypill for `Object.assign` to run in IE11.
- Own runner/assertion library, i.e. no Karma, Protractor, Mocha or Jest
- Basic Unit reports (good for CCI integration)
- No config file (coming in next release)
- No Video Recording (coming in next release)
- No multi-window support (coming in next release)
