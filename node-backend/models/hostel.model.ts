import { RoomModel } from './room.model';

export interface HostelModel {
    uid?: string;
    name: string;
    pool: boolean;
    roomNumbers: number;
    rooms: RoomModel[]
}