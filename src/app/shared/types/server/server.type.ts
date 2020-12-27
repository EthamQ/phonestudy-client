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
    compareWith: string,
    type: string,
    aggregation: string,
}

export interface IRequestPayloadPie {
    compareWith: 'none' | 'all' | 'demographic',
    type: 'simple',
    aggregation: 'total-option-value' | 'by-time-frame' | 'total',
}

export interface IRequestPayloadBar {
    compareWith: 'none' | 'all' | 'demographic',
    type: 'simple',
    aggregation: 'average-by-weekday' | 'total-by-weekday',
}

export interface IRequestPayloadScatter {
    compareWith: 'none' | 'all' | 'demographic',
    type: 'simple' | 'correlation',
    aggregation: 'total & average',
}