pkgchk
======

> organization-wide package usage comparison


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/pkgchk.svg)](https://npmjs.org/package/pkgchk)
[![Downloads/week](https://img.shields.io/npm/dw/pkgchk.svg)](https://npmjs.org/package/pkgchk)
[![License](https://img.shields.io/npm/l/pkgchk.svg)](https://github.com/elidupuis/pkgchk/blob/master/package.json)

This is a command line tool that will search an entire Github organization for a certain npm dependency. Any repository within the organization that depends on the package in question will be listed along with the version it is currently using so it can be compared to the most recent version available.

<!-- toc -->

# Usage
<!-- usage -->

First, you'll need a Github access token. Any token that works with the [Github REST API](https://developer.github.com/v3/#authentication) will do. You can start with a simple [personal access token](https://github.com/settings/tokens/new).

```shell
npm install -g pkgchk
pkgchk --help
```

Pass this access token in via the `token` flag or the `GITHUB_TOKEN` environment variable.

```shell
pkgchk [PACKAGE_NAME] -o [ORG_NAME] -t [ACCESS_TOKEN]
GITHUB_TOKEN=[ACCESS_TOKEN] pkgchk [PACKAGE_NAME] -o [ORG_NAME]
PKGCHK_ORG=[ORG_NAME] pkgchk [PACKAGE_NAME] -t [ACCESS_TOKEN]
```

## Examples

```shell
pkgchk ember-source -o showbie
pkgchk ember-source -o emberjs
DEBUG=* pkgchk ember-source -o intercom
DEBUG=* pkgchk ember-data -o simplabs
```

# Future Development

- cache responses from Github API
- support for npm/yarn lockfiles
- support other tech stacks and package managers
