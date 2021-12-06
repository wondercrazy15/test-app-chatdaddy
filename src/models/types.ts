export interface IFiltersTypes {
    IncludeTag: string[],
    ExcludeTag: string[],
    Message: IMessageTypes | any,
    status: boolean,
    cleared: boolean,
}

export interface IQueryFiltersTypes {
    tags: string | undefined,
    notTags: string | undefined,
    minMessagesSent: number | string,
    minMessagesRecv: number | string,
    maxMessagesSent: number | string,
    maxMessagesRecv: number | string,
}

export interface ITagsTypes {
    name: string
}

export interface IMessageTypes {
    "sent.min"?: number | string,
    'sent.max'?: number | string,
    'received.min'?: number | string,
    'received.mxn'?: number | string,
}

export interface IContactType {
    assignee?: string | null
    chats?: unknown[]
    id: string | undefined
    messagesReceived: number
    messagesSent: number
    name: string
    phoneNumber: number | string
    platformNames?: unknown[]
    tags?: unknown[]
    type?: string
}