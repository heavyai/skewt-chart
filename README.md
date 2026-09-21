# skewt-chart
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/heavyai/skewt-chart/blob/main/LICENSE)
[![Security](https://img.shields.io/badge/Security-Report%20a%20Vulnerability-red.svg)](https://github.com/heavyai/skewt-chart/blob/main/SECURITY.md)
[![GitHub Discussions](https://img.shields.io/badge/GitHub-Discussions-blue?logo=github)](https://github.com/orgs/heavyai/discussions)


Try it out at https://heavyai.github.io/skewt-chart

This is a port of https://github.com/dfelix/skewt-js, which is technically unlicensed.

IANAL. I don't know if this is a problem. The React code is all new, but it's clearly inspired.

The css is exact.

You too can learn more about skew-t charts: https://medium.com/@WeatherDecTech/part-1-have-you-heard-of-a-skew-t-diagram-and-do-you-know-what-they-are-used-for-5e4033b70681

And even more! https://medium.com/p/c58e91319222

To build:

```
npm run build
npm run rollup
(commit everything and push)
update the git hash in Immerse's package.json
``
```

## Third-party vendor licenses

A full list of third-party npm packages and their licenses is maintained in [`third_party_licenses/THIRD_PARTY_LICENSES.md`](third_party_licenses/THIRD_PARTY_LICENSES.md). To regenerate it after dependency changes, run:

```sh
npx github:heavyai/js-license-list
```

This requires `node_modules` to be installed (`npm install`). The script is maintained in the [heavyai/js-license-list](https://github.com/heavyai/js-license-list) repo.

Every third-party module from npm that gets includes in the final, distributed bundle has its license verified and license text (if provided) or license type shipped in licenses.txt with the bundle. Licenses must be in the pre-approved list of permissive open-source licenses. If it's necessary to override a license for a module because it's missing or improperly tagged in its package.json, add an entry in license-overrides.json.

License descriptions and public license URLs are maintained in licenses.json as well, but they are not verified and might not be up to date.
