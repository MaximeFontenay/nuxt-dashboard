declare interface Day {
    id: number,
    slug: string | number,
    contentType: string,
    content?: string,
    isToday?: boolean,
    events?: Array[{
        id: number,
        content: string,
    }]
}