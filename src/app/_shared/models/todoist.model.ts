export interface ITodoist {
    id?: number;
    name: string;
    createdDate: Date;
    modifiedDate: Date;
    scheduleDate: Date;
    isFinished: boolean;
    isBoard: 'Todo' | 'Test' | 'Done';
}
