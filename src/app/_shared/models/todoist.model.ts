export interface ITodoist {
    id?: number;
    name: string;
    createdDate?: Date;
    modifiedDate?: Date;
    scheduleDate: Date;
    isFinished?: boolean;
    boardType: 'todo' | 'progress' | 'done';
}

export interface ITodoChangeName {
    id: number;
    name: string;
}

export interface ITodoFinished {
    id: number;
    isFinished: boolean;
}

export interface ITodoChangeBoardType {
    id: number;
    boardType: 'todo' | 'progress' | 'done';
}

export interface ITodoChangeScheduleDate {
    id: number;
    scheduleDate: Date;
}
