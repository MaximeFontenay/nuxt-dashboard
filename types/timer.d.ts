declare interface Timer {
    id: number,
    text: string,
    hours: number,
    minutes: number,
    seconds: number,
    playing: boolean,
    modify: boolean,
    tags?: string[],
}