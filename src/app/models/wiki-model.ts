export interface WikiResponse {
    batchcomplete: string
    query: Query
}

export interface Query {
    normalized: { from: string, to: string }[]
    pages: Record<string, Page>
}

export interface Page {
    pageid: number
    ns: number
    title: string
    thumbnail?: Thumbnail
    pageimage?: string
    extract?: string
}

export interface Thumbnail {
    source: string
    width: number
    height: number
}