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

export interface IStatisticsWeek {
    monday: IStatisticItem[],
    tuesday: IStatisticItem[],
    wednesday: IStatisticItem[],
    thursday: IStatisticItem[],
    friday: IStatisticItem[],
    saturday: IStatisticItem[],
    sunday: IStatisticItem[],
};

export interface IStatisticItem {
    option: string,
    value: number,
    positivity?: 0 | 1 | 2 | 3 | 4 | 5 | 6,
};

export interface ICorrelationResponse {
    user: ICorrelation[],
    compare: ICorrelation[],
}

export interface ICorrelation {
    option: string,
    stress: ICoordinate[],
    mood: ICoordinate[],
    sleep: ICoordinate[],
};

export interface ICoordinate {
    name: string,
    x: number,
    y: number,
};


export interface IRequestPayload {
    compareWith: 'none' | 'all' | 'demographic',
    type: 'simple' | 'correlation',
    aggregation: 'total-by-weekday' | 'length' | 'by-time-frame' | 'total' | 'average-by-weekday' | 'total-option-value' | 'total & average',
}