export interface ITimeBucket<T> {
    data: T,
    from: string,
    until: string,
    timeBucketKey: string,
}

export interface IServerResponse<T> {
    [key: string]: ITimeBucket<T>
}