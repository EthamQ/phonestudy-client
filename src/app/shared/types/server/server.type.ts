export interface IServerResponse<T> {
    [key: string]: ITimeBucket<T>
}

export interface ITimeBucket<T> {
    data: T,
    from: string,
    until: string,
    timeBucketKey: string,
}


export interface IBasicResponse<T> {
    user: T,
    compare: T,
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

export interface IRequestPayload {
    compareWith: 'none' | 'all' | 'demographic',
    type: 'simple' | 'correlation',
    aggregation: 'length' | 'category' | 'total' | 'weight',
}