import { NS } from '@ns'

import { scanHost, scanHosts } from './utils/scan'
import { upload } from './utils/upload'
import { weaken } from './modules/weaken'
import { hack } from './modules/hack'
import { grow } from './modules/grow'
import { ScannedHost } from './utils/state'

const helpText = `
Usage:
  my_program command --option <argument>
  my_program [<optional-argument>]
  my_program --another-option=<with-argument>
  my_program (--either-that-option | <or-this-argument>)
  my_program <repeating-argument> <repeating-argument>...
`
const WHITE_LIST = ['darkweb', 'deathstar']
const SECURITY_THRESHOLD = 3
const WEAKEN_AMOUNT = 0.05
const HACK_AMOUNT = 0.002
const TARGET = 'hong-fang-tea'

function printHost(host: ScannedHost): string {
    return `
Name: ${host.host}
Security Lvl: ${host.secLvl}
Min Security Lvl: ${host.minSecLvl}
Max Money: ${host.maxMoney}
Money: ${host.money}
Ram: ${host.maxRam}
Used Ram: ${host.usedRam}
Hack Time: ${host.hackTime}
Grow Time: ${host.growTime}
Weaken Time: ${host.weakenTime}
    `;
}

export async function main(ns : NS) : Promise<void> {
    const flags = ns.flags([
        ['host', TARGET],
        ['refreshRate', 5000],
        ['help', false],
    ])

    if (flags.help) {
        ns.tprint(helpText)

        return
    }

    const hosts = ns.scan().filter((host) => !WHITE_LIST.includes(host))
    const date = new Date()
    const targetHost = flags.host as string
    const refreshRate = parseInt(flags.refreshRate as string)

    ns.clearLog()
    ns.disableLog('ALL')
    ns.tail()

    await upload(ns, hosts)

    while (true) {
        ns.print('-------------------------------')
        ns.print(`Targeting: ${targetHost}`)
        ns.print(`Time: ${date}`)
        ns.print(`Machines: ${hosts.join(', ')}`)
        ns.print(`Refresh Rate: ${refreshRate}`)

        const scannedTarget = scanHost(ns, targetHost);

        ns.print(printHost(scannedTarget))

        const securityDiff = scannedTarget.secLvl - scannedTarget.minSecLvl
        const moneyThreshold = scannedTarget.maxMoney * 0.75

        if (securityDiff > SECURITY_THRESHOLD) {
            const runCount = SECURITY_THRESHOLD / WEAKEN_AMOUNT;

            ns.print(`Running weaken cmd: ${runCount}`)

            await weaken(ns, targetHost, hosts, runCount)

        } else if (moneyThreshold > scannedTarget.money) {
            const runCount = 25;

            ns.print(`Running grow cmd: ${runCount}`)

            await grow(ns, targetHost, hosts, runCount)
        } else {
            const runCount = Math.floor(SECURITY_THRESHOLD / HACK_AMOUNT);

            ns.print(`Running hack cmd: ${runCount}`)

            await hack(ns, targetHost, hosts, runCount)
        }

        ns.print('-------------------------------')
        await ns.sleep(refreshRate)
    }
}


export function autocomplete(data: AutocompleteData): string[] {
    return [...data.servers]
}