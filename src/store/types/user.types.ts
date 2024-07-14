export type TUserData = {
    id: string,
    name: string,
    email: string,
    tokens: number,
    isFree: number,
}

export interface IUser {
    data: TUserData | null,
    loading: boolean,
}
