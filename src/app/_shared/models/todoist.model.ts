export interface ITodoist {
    id?: number;
    name: string;
    createdDate: Date;
    modifiedDate: Date;
    scheduleDate: Date;
    isFinished: boolean;
    boardType: 'todo' | 'progress' | 'done';
}

export interface ITodoChangeName {
    id: number;
    modifiedDate: Date;
    name: string;
}

export interface ITodoFinished {
    id: number;
    modifiedDate: Date;
    isFinished: boolean;
}

export interface ITodoChangeBoardType {
    id: number;
    modifiedDate: Date;
    boardType: 'todo' | 'progress' | 'done';
}

export interface ITodoChangeScheduleDate {
    id: number;
    modifiedDate: Date;
    scheduleDate: Date;
}