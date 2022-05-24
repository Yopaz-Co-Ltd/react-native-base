export type BaseResponseModel<T> = {
    status?: string
    data?: T
    message?: string
}
