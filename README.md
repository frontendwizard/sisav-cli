# sisav-cli

Um programa de linha de comando para automatizar o acesso ao sisav uem.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/sisav.svg)](https://npmjs.org/package/sisav)
[![CircleCI](https://circleci.com/gh/thefrontendwizard/sisav-cli/tree/master.svg?style=shield)](https://circleci.com/gh/thefrontendwizard/sisav-cli/tree/master)
[![Codecov](https://codecov.io/gh/thefrontendwizard/sisav-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/thefrontendwizard/sisav-cli)
[![Downloads/week](https://img.shields.io/npm/dw/sisav.svg)](https://npmjs.org/package/sisav)
[![License](https://img.shields.io/npm/l/sisav.svg)](https://github.com/thefrontendwizard/sisav-cli/blob/master/package.json)

<!-- toc -->

- [Uso](#uso)
- [Comandos](#comandos)
  <!-- tocstop -->

# Uso

<!-- usage -->

```sh-session
$ npm install -g sisav-cli
$ sisav COMMAND
running command...
$ sisav (-v|--version|version)
sisav/0.1.0 darwin-x64 node-v10.13.0
$ sisav --help [COMMAND]
USO
  $ sisav COMMAND
...
```

<!-- usagestop -->

# Comandos

<!-- commands -->

- [sisav-cli](#sisav-cli)
- [Uso](#uso)
- [Comandos](#comandos)
  - [`sisav help [COMMAND]`](#sisav-help-command)
  - [`sisav notas`](#sisav-notas)

## `sisav help [COMMAND]`

mostra ajuda para um comando

```
USAGE
  $ sisav help [COMMAND]

ARGUMENTS
  COMMAND  comando para o qual você quer ajuda

OPTIONS
  --all  para ver todos os comandos possíveis
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src/commands/help.ts)_

## `sisav notas`

comando para mostrar as notas de um ano no console

```
USAGE
  $ sisav notas

OPTIONS
  -h, --help       show CLI help
  -r, --ra=ra1234  ra para o qual você quer ver as notas
  -a, --ano=2018   ano para que você quer ver as notas
```

_See code: [src/commands/notas.ts](https://github.com/thefrontendwizard/sisav-cli/blob/v0.0.0/src/commands/notas.ts)_

<!-- commandsstop -->
