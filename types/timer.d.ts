declare interface Timer {
    id: number,
    title: string,
    hours: number,
    minutes: number,
    seconds: number,
    playing: boolean,
    tags?: string[],
}