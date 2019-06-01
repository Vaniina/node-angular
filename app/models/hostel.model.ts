import { RoomModel } from './room.model';

export interface HostelModel {
    id?: string;
    name: string;
    pool: boolean;
    roomNumbers: number;
    rooms: RoomModel[]
}