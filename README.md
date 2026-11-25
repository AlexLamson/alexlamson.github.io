# alexlamson.com
Code for alexlamson.com

Run `npm ci` and `npm run serve` to preview the site on `127.0.0.1`. The preview serves the working directory, so keep private files outside the checkout.

Run `npm test` for the source checks. Set `PAGES_OUTPUT` to a local GitHub Pages Jekyll build directory to also check the generated site. GitHub Pages publishes the root of `master`, applying the exclusions in `_config.yml`.

The local browser assets include jQuery 3.8.0, Bootstrap 4.6.2 and Popper 1.16.1 from their npm releases. When updating the CDN dependencies in `bus.html` or `vr.html`, compute the SHA-384 digests from the corresponding npm release files, including transitive Three.js modules.
