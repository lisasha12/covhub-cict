import { BehaviorSubject } from 'rxjs';

export interface ActiveTasksInfo {
    date?: Date;
    lab?: string;
    case: string;
    assignedTo: string;
    time: string;
    phone?: number;
    province?: string;
    district?: string;
    municipal?: string;
    ward?: number;
    tole?: string;
}

