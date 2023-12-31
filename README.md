# ng-flutter

__Important:__
This project is cloned from the [code sample of ng-flutter][] from Flutter's team with some modifications 

This Angular project is a simple example of how Angular and Flutter
web apps could be integrated, and have them interop.

## Points of Interest

### Angular

__Important Change:__ I take out the `/flutter` app folder to the root, after run prebuild will copy the `flutter/build/web` to `angular/flutter`, you can build using 
```console
sh build.sh
```

This repository is a quite standard Angular app. The following changes were made
to be able to use (and interop) with a Flutter web application:

- `package.json` has a custom `prebuild` script that builds the
  Flutter web app, so Angular can find it later.
- `flutter.js` is added as a `"scripts"` entry in `angular.json`.
  Angular takes care of minimizing and injecting it as any other script.
- The rest of the flutter app `flutter/build/web/` is registered
  as an `"assets"` entry in `angular.json`, and moved to `/flutter`.
- The `ng-flutter` component takes care of embedding Flutter web, and yielding
  control to Angular through an `appLoaded` `EventEmitter`. The object yielded
  by this emitter is a state controller exposed by flutter via a JS custom
  event!

### Flutter

The embedded Flutter application lives in the `flutter` directory of this repo.
That application is a standard web app, that doesn't need to be aware that it's
going to be embedded in another framework.

- Flutter uses new `@staticInterop` methods to allow certain Dart functions to
  be called from JavaScript.
- Look at how `createDartExport` and `broadcastAppEvent` work together to make
  the `_state` controller of the Flutter app available to Angular!

### Firebase
I use Firebase to test Angular 17 SSR and host the demo here https://mibi-ng-flutter.web.app/

## How to build the app

### Requirements

If you want to build and run this demo on your machine, you'll need
a moderately recent version of Angular:

```console
$ ng version

Angular CLI: 17.0.0
Node: 20.9.0
Package Manager: npm 10.1.0
OS: linux x64
```

And Flutter:

```
$ flutter --version

Flutter 3.16.2 • channel stable •
https://github.com/flutter/flutter.git
Framework • revision 9e1c857886 (5 days ago) •
2023-11-30 11:51:18 -0600
Engine • revision cf7a9d0800
Tools • Dart 3.2.2 • DevTools 2.28.3
```

**Ensure `npm`, `ng` and `flutter` are present in your `$PATH`.**

### Building the app

This repository is a moderately standard Angular app. It integrates
Flutter web by making it part of the Angular `assets`.

In order to build this app, first fetch its `npm` dependencies:

```console
$ npm install

added 963 packages, and audited 964 packages in 17s

93 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

Then run the `build` script. It'll take care of building Flutter
automatically:

```console
$ npm run build

> ng-flutter@0.0.0 prebuild

... Flutter web build output ...

Compiling lib/main.dart for the Web...

> ng-flutter@0.0.0 build
> ng build

... Angular build output ...

✔ Browser application bundle generation complete.
✔ Copying assets complete.
✔ Index html generation complete.
```

### Local Angular development

Once you've reached this point, you should be able to work with
your Angular application normally, for example to run a local web
server:

```console
$ npm run start

> ng-flutter@0.0.0 start
> ng serve

✔ Browser application bundle generation complete.

Initial Chunk Files   | Names         |  Raw Size
vendor.js             | vendor        |   4.38 MB |

... Angular build output...

** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **


✔ Compiled successfully.
```

Navigate to `http://localhost:4200/`. The application will automatically reload
if you change any of its Angular source files.

### Local Flutter web development

The Flutter app lives inside the `flutter` directory, and can be
developed independently. Just do any changes on Flutter web as you'd
normally do. It even includes a small `web/index.html` so you can see
changes to your app without running the whole Angular setup.

> **Note**
> For now, Angular does _not_ auto-detect changes to your Flutter web
> app, so once you're happy with your Flutter web app, make sure to
> call `npm run build` so everything rebuilds and gets placed into its
> correct location.

### Deploying the app

After `npm run build`, you should have a deployable Angular + Flutter
web app in the `dist` directory of this Angular project.

Your built app can can be deployed anywhere, but do check
[Firebase hosting](https://firebase.google.com/docs/hosting) for a
super-easy deployment experience!

## Troubleshooting

### Flutter

Ensure your flutter app is properly rebuilt after any changes.

- Run `npm run build` to re-build the Flutter app.

If you encounter error messages like:

```
Error: Can't resolve 'flutter/build/web/flutter.js' in '/my/checkout/of/ng-flutter'
```

You definitely need to run `npm run build`!

## Reach out to the team(s)!

Have you had any problem not covered in this README? Do you want
to see other embedding examples?

Let us know by [creating an issue](https://github.com/flutter/samples/issues/new) or opening a new pull request.

Thanks!

[code sample of ng-flutter]: https://github.com/flutter/samples/blob/main/web_embedding/ng-flutter
