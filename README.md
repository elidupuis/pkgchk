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

```
pkgchk --help
pkgchk ember-source -o showbie
DEBUG=* pkgchk ember-cli -o showbie
DEBUG=* pkgchk ember-cli -o aota
```
