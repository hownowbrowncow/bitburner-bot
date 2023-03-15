import { NS } from '@ns'
import { ScannedHost } from './state'

export function scanHost(ns: NS, host: string): ScannedHost {
    const root = ns.hasRootAccess(host)
    const money = ns.getServerMaxMoney(host)
    const maxMoney = ns.getServerMaxMoney(host)
    const secLvl = ns.getServerSecurityLevel(host)
    const minSecLvl = ns.getServerMinSecurityLevel(host)
    const hackLvl = ns.getServerRequiredHackingLevel(host)
    const ports = ns.getServerNumPortsRequired(host)
    const maxRam = ns.getServerMaxRam(host)
    const usedRam = ns.getServerUsedRam(host)
    const hackTime = ns.getHackTime(host)
    const weakenTime = ns.getWeakenTime(host)
    const growTime = ns.getGrowTime(host)

    return {
        growTime,
        hackLvl,
        hackTime,
        host,
        maxMoney,
        maxRam,
        minSecLvl,
        money,
        ports,
        root,
        secLvl,
        usedRam,
        weakenTime,
    }
}

export function scanHosts(ns: NS, hosts: string[]): ScannedHost[] {
    return hosts.map((host) => scanHost(ns, host));
}