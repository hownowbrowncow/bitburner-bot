import { NS } from '@ns'

export async function main(ns: NS): Promise<void> {
    const host = ns.args[0] as string

    await ns.grow(host)
}