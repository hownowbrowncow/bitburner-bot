export interface ScannedHost {
    hackLvl: number;
    host: string;
    maxMoney: number;
    maxRam: number;
    minSecLvl: number;
    money: number;
    ports: any;
    root: boolean;
    secLvl: number;
    usedRam: number;
    growTime: number;
    hackTime: number;
    weakenTime: number;
}

export interface State {
    hosts: string[];
    hackableHosts: string[];
    hackedHosts: string[];
    scannedHosts: ScannedHost[];
}

export function initState(): State {
    const state = {
        hackableHosts: [],
        hackedHosts: [],
        hosts: [],
        scannedHosts: [],
    }

    return state
}

export function getHackedHosts(hosts: ScannedHost[]): string[] {
    return hosts
        .filter((host) => host.root === true)
        .map((host) => host.host)
}

export function getHackableHosts(hosts: ScannedHost[]): string[] {
    return hosts
        .filter((host) => host.root !== true)
        .map((host) => host.host)
}

export function printState(state: State): string {
return `
Current State:
hosts: ${state.hosts.join(', ')}
hackable: ${state.hackableHosts.join(', ')}
hacked: ${state.hackedHosts.join(', ')}
Info:
${state.scannedHosts.map((host) => {
    return `
    name: ${host.host}
    money: ${host.money}
    maxMoney: ${host.maxMoney}
    secLvl: ${host.secLvl}
    minSecLvl: ${host.minSecLvl}
    `
})}
`
}