export interface IServerResponse<T> {
    [key: string]: ITimeBucket<T>
}

export interface ITimeBucket<T> {
    data: T,
    from: string,
    until: string,
    timeBucketKey: string,
}

export interface IBasicResponse {
    user: IStatisticItem[],
    compare: IStatisticItem[],
}

export interface IStatisticItem {
    option: string,
    value: number,
    weight: number,
};

export interface ICorrelationResponse {
    user: ICorrelation[],
    compare: ICorrelation[],
}

export interface ICorrelation {
    option: number,
    stress: number,
    mood: number,
    sleep: number,
};