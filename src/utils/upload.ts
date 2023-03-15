import { NS } from '@ns'

const SCRIPTS = ['/cmds/hack.js', '/cmds/grow.js', '/cmds/weaken.js']

export async function upload(ns: NS, hosts: string[]): Promise<void> {
    hosts.forEach(async (host) => {
        ns.print(`Uploading host: ${host}`)
        ns.print(`Uploading scripts: ${SCRIPTS.join(', ')}`)

        await ns.scp(SCRIPTS, host)
    })
}