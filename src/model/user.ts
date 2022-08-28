export interface Iuser {
    id: string
    name: string
    email: string,
    password: string
}

export interface IuserDTO {
    name: string
    email: string,
    password: string
}
export interface ILoginDTO {
    email: string,
    password: string
}

export interface IuserFeed {
    id: string,
    title: string,
    description: string,
    createdAt: Date,
    userId: string,
    userName: string
}
