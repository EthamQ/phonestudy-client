import { IQuestionaireItem } from './questionaire.type';

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
    user: IQuestionaireItem[],
    compare: IQuestionaireItem[],
}