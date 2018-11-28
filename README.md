# sisav-cli

Um programa de linha de comando para automatizar o acesso ao sisav uem.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/sisav.svg)](https://npmjs.org/package/sisav)
[![CircleCI](https://circleci.com/gh/thefrontendwizard/sisav-cli/tree/master.svg?style=shield)](https://circleci.com/gh/thefrontendwizard/sisav-cli/tree/master)
[![Codecov](https://codecov.io/gh/thefrontendwizard/sisav-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/thefrontendwizard/sisav-cli)
[![Downloads/week](https://img.shields.io/npm/dw/sisav.svg)](https://npmjs.org/package/sisav)
[![License](https://img.shields.io/npm/l/sisav.svg)](https://github.com/thefrontendwizard/sisav-cli/blob/master/package.json)

<!-- toc -->
* [sisav-cli](#sisav-cli)
* [Uso](#uso)
* [Comandos](#comandos)
<!-- tocstop -->

# Uso

<!-- usage -->
```sh-session
$ npm install -g sisav-cli
$ sisav COMMAND
running command...
$ sisav (-v|--version|version)
sisav-cli/0.1.0 darwin-x64 node-v10.13.0
$ sisav --help [COMMAND]
USAGE
  $ sisav COMMAND
...
```
<!-- usagestop -->

# Comandos

<!-- commands -->
* [`sisav help [COMMAND]`](#sisav-help-command)
* [`sisav notas [FILE]`](#sisav-notas-file)

## `sisav help [COMMAND]`

display help for sisav

```
USAGE
  $ sisav help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src/commands/help.ts)_

## `sisav notas [FILE]`

mostra as notas de um ano

```
USAGE
  $ sisav notas [FILE]

OPTIONS
  -a, --ano=ano  ano
  -h, --help     show CLI help
  -r, --ra=ra    ra
```

_See code: [src/commands/notas.ts](https://github.com/thefrontendwizard/sisav-cli/blob/v0.1.0/src/commands/notas.ts)_
<!-- commandsstop -->
