# Cognite Glimpse

This repository is a showcase of how to build apps on top of [Cognite Data Fusion](https://cognite.com/cognite/cognite-data-fusion/developers/).This app is mainly useful for manufacturing operators, To perform the CNC machines as efficiently as possible and to understand when they are not performing at their best.

## Getting started

- Clone the app
  ```bash
  $ git clone https://github.com/cognitedata/glimpse.git
  ```
- This app use [Firebase Cloud Firestore](https://firebase.google.com/docs/firestore) for saving data. You must create a firebase project and complete .env templete inside the root folder with correct keys. In the firestore create empty collections

  - app-config
  - widget-config

- Install dependencies and start the app
  `bash $ yarn && yarn start:https`
  If you get an error about a certificate not being valid or trusted, then click "advanced" and "proceed" to skip.

## Unit testing

We are using [react-testing-library](https://testing-library.com/docs/react-testing-library/intro) with [jest](https://jestjs.io/) as the test runner. It is prefered to write tests that closely resemble how your web pages are used. For more info read [here](https://testing-library.com/docs/guiding-principles).

Run all tests

```bash
$ yarn test
```

## License

[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)
