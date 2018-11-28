import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
import cli from 'cli-ux'

interface IGrade {
  code: string
  title: string
  status: string
  notas: Array<{ type: string; value: string }>
}

export default class Notas extends Command {
  static description = 'mostra as notas de um ano'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-a, --ano=VALUE)
    ano: flags.string({char: 'a', description: 'ano'}),
    // flag with ra value (-r, --ra=VALUE)
    ra: flags.string({char: 'r', description: 'ra'})
  }

  static args = [{name: 'file'}]

  async run() {
    const puppeteer = require('puppeteer')
    const inquirer = require('inquirer')

    const {flags} = this.parse(Notas)

    let ano: string = flags.ano || ''
    let ra: string = flags.ra || ''

    if (!ra) ra = await cli.prompt('Qual o seu registro acadêmico (RA)?')
    const senha = await cli.prompt('Qual a sua senha?', {type: 'hide'})

    cli.action.start('Acessando o sisav')
    cli.action.status = 'Iniciando o browser'
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    cli.action.status = 'Navegando para o login'
    // tslint:disable-next-line:no-http-string
    await page.goto('http://sisav.uem.br/sav/auth/login')

    // login
    await page.focus('#username')
    await page.keyboard.type(ra)
    await page.focus('#password')
    await page.keyboard.type(senha)
    await page.click('#cmdEnviar')
    cli.action.status = 'Logando no sisav'
    await page.waitFor(
      () =>
        !!document.querySelector('form > .message-error') ||
        !!document.querySelector('#Consultas')
    )

    // check if login failed
    const errorNode = await page.$('form > .message-error')
    if (errorNode)
      this.error(
        chalk`{red Não foi possível acessar o sistema com o usuário ${ra}. Confira seu usuário e senha e tente novamente}.`
      )

    // navigate to Notas e Faltas
    cli.action.status = 'Navegando para Consultas e notas'
    if (ra.match(/ra/))
      // tslint:disable-next-line:no-http-string
      await page.goto('http://sisav.uem.br/sav/consultaNotas/showNotas')
    // tslint:disable-next-line:no-http-string
    else await page.goto('http://sisav.uem.br/sav/consultaNotasPos/show')
    const choices: Array<{ name: string }> = await page.evaluate(() =>
      (Array.from(
        document.querySelectorAll('[name^="ano"] > option:not(:first-child)')
      ) as Array<HTMLOptionElement>).map(node => ({name: node.value}))
    )
    cli.action.stop()
    if (!ano || !choices.find(choice => choice.name === ano)) {
      const answer = await inquirer.prompt([
        {
          name: 'ano',
          message: 'Selecione um ano',
          type: 'list',
          choices
        }
      ])
      ano = answer.ano
    }
    cli.action.start('Coletando as notas')
    await page.select('[name^="ano"]', ano)
    cli.action.status = 'Esperando a tabela de notas carregar'
    await page.waitFor(
      () => !!document.querySelector('#tabelaDeNotas > .masterDetail')
    )

    // grab data from table
    cli.action.status = 'Coletando dados da tabela'
    const grades: Array<IGrade> = await page.evaluate(() => {
      // extrai e fomata o texto de um nó
      const getText: (node: HTMLElement | null) => string = node =>
        (!!node && node.innerText.replace(/:?\t/, '')) || ''
      const subjectNodes = document.querySelectorAll('.masterDetail > tbody')
      const subjects: Array<IGrade> = Array.from(subjectNodes).map(node => ({
        code: getText(node.querySelector('.master > td:nth-child(1)')),
        title: getText(node.querySelector('.master > td:nth-child(2)')),
        status: getText(node.querySelector('.master > td:nth-child(3)')),
        notas: (Array.from(
          node.querySelectorAll('.detail table > tbody > tr')
        ) as Array<HTMLElement>).map(gradeNode => {
          const type = getText(gradeNode.children[0] as HTMLElement)
          const value = getText(gradeNode.children[1] as HTMLElement)
          return {type, value}
        })
      }))
      return subjects
    })

    // sort
    cli.action.status = 'Agrupando as disciplinas'
    const approved: Array<IGrade> = grades.filter(subject =>
      subject.status.match(/Aprovado/)
    )
    const enrolled: Array<IGrade> = grades.filter(subject =>
      subject.status.match(/Matriculado/)
    )
    const failed: Array<IGrade> = grades.filter(subject =>
      subject.status.match(/Reprovado/)
    )

    // print to the console
    const printSubject = (subject: IGrade) => {
      let row = `${subject.code} - ${subject.title}:`
      if (subject.notas.length) {
        subject.notas.map(nota => {
          if (nota.type.match(/Avaliação [0-9]-[0-9]/))
            row += ` ${chalk`{white ${nota.type.substring(
              nota.type.length - 3
            )}}`}: ${
              parseFloat(nota.value) >= 6
                ? chalk`{bgGreen.black ${nota.value}}`
                : chalk`{bgHex("#e74c3c").black ${nota.value}}`
            }`
          if (nota.type === 'Avaliação final' && nota.value !== '0.0')
            row += ` ${chalk`{bgYellow.black Exame: ${nota.value}}`}`
          if (nota.type === 'Média Final')
            row += ` ${chalk`{bgCyan.black ${nota.type}: ${nota.value}}`}`
        })
      }
      this.log(row)
      this.log('---------------------')
    }
    cli.action.stop()
    if (failed.length) {
      this.log()
      this.log('REPROVADO:')
      this.log()
      failed.map(printSubject)
    }
    if (approved.length) {
      this.log()
      this.log('APROVADO:')
      this.log()
      approved.map(printSubject)
    }
    if (enrolled.length) {
      this.log()
      this.log('MATRICULADO:')
      this.log()
      enrolled.map(printSubject)
    }

    this.exit()
  }
}
