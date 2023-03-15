import { NS } from '@ns'

const CMD = '/cmds/hack.js'
const BUFFER = 5000

export async function hack(ns: NS, targetHost: string, hosts: string[], runCount: number): Promise<void> {
    let localRunCount = 0
    const hackTime = ns.getHackTime(targetHost)

    ns.print(`<<<<<<<<<<<<<<<<<<<<<<<<<`)
    ns.print('Execute hack')
    ns.print(`Target: ${targetHost}`)
    ns.print(`Run Count: ${runCount}`)
    ns.print(`Local Run Count: ${localRunCount}`)

    while (localRunCount < runCount) {
        ns.print('>>>>>>>>>>>>>>>>>>>>>>>>>>')
        let hasThreads = true

        for (const host of hosts) {
            const runDiff = runCount - localRunCount
            const maxMem = ns.getServerMaxRam(host)
            const usedMem = ns.getServerUsedRam(host)
            const availableRam = maxMem - usedMem
            const ramCost = ns.getScriptRam(CMD)

            if (ramCost > availableRam) {
                continue
            }
            const maxThreads = Math.floor(availableRam / ramCost)
            const runThreads = maxThreads > runDiff ? runDiff : maxThreads

            if (runThreads < 1) {
                hasThreads = false
                break
            }

            ns.print(`Harvest Target: ${host}`)
            ns.print(`Available Ram: ${availableRam}`)
            ns.print(`Ram Cost: ${ramCost}`)
            ns.print(`Max Threads: ${maxThreads}`)

            ns.exec(CMD, host, runThreads, targetHost)

            localRunCount += runThreads

            if (localRunCount >= runCount) break
        }

        const sleepTime = hasThreads ? hackTime + BUFFER : BUFFER

        ns.print('!!!!!!')
        ns.print(`Hack Sleep: ${sleepTime}`)
        ns.print(`Count: ${localRunCount}`)
        ns.print(`Run Count: ${runCount}`)
        ns.print(`Has Threads: ${hasThreads}`)
        ns.print('!!!!!!')
        ns.print('>>>>>>>>>>>>>>>>>>>>>>>>>>')

        await ns.sleep(sleepTime)

        if (localRunCount >= runCount) break
    }

    ns.print(`<<<<<<<<<<<<<<<<<<<<<<<<<`)
}