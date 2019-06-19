import * as functions from 'firebase-functions';
import {RoomModel} from "../../../node-backend/models/room.model";
import {HostelModel} from "../../../node-backend/models/hostel.model";

exports.on_room_created = functions.firestore
    .document('rooms/{roomId}')
    .onCreate((snap) => {
        const newRoom: RoomModel = snap.data() as RoomModel;
        newRoom.uid = snap.id;
        return snap.ref.set(newRoom)
    });

exports.on_hostel_created = functions.firestore
    .document('hostels/{hostelId}')
    .onCreate((snap) => {
        const newHostel: HostelModel = snap.data() as HostelModel;
        newHostel.uid = snap.id;
        return snap.ref.set(newHostel)
    });