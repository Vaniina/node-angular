import express = require('express');
import admin = require('firebase-admin');
import bodyParser = require('body-parser');
import cors = require('cors');
import serviceAccount from './serviceAccount';
import {HostelModel} from './models/hostel.model';
import {RoomModel} from "./models/room.model";
import DocumentReference = admin.firestore.DocumentReference;
import {CollectionReference, DocumentSnapshot, Query, QuerySnapshot, WriteResult} from '@google-cloud/firestore';

admin.initializeApp({
    //@ts-ignore
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://testanna-13fc8.firebaseio.com'
});

const app = express();
const db = admin.firestore();
const ref = db.collection('hostels');
const refRooms = db.collection('rooms');

app.set('view engine', 'pug');
app.use(cors());
app.use(bodyParser.json());
app.use('/assets', express.static('/Users/vincent/Desktop/Anna/node/app/assets'));

app.get('/', (req, res) => {
    res.render('../views/index.pug', {
        firstName: "Anna",
        lastName: "Vessereau",
        image: "photo-anna.jpeg",
        job: "Développeuse JS FullStack",
        age: "27",
        address: "17 rue Ferdinand Buisson",
        zipCode: "92110",
        city: "Clichy",
        phone: "06 73 85 56 35",
        email: "anna.vessereau@gmail.com",
        about: "Je suis une grande aventurière dans l'âme, j'aime les challenges et les défis, ce qui me pousse à dépasser mes limites! A la recherche de renouveau et ayant une bonne capacité d'adaptation, j'aime découvrir et apprendre de nouvelles choses afin de maintenir mon cerveau en éveil et pouvoir ainsi partager mes connaissances si nécessaire!",
        experiences: [{
            date: "2015-2018",
            title: "Conseillère de vente en maroquinerie",
            location: "Michael Kors / BHV Marais, Galeries Lafayette"
        }, {
            date: "2015",
            title: "Conseillère de vente en parfumerie",
            location: "Sephora / Levallois-Perret"
        }, {
            date: "2015",
            title: "Ambassadrice de Givenchy, Lancôme, Guerlain",
            location: "Sephora, Marionnaud / Paris"
        }],
        formations: [{
            date: "2015",
            title: "Formation Anglais professionnel du Tourisme et TOEIC",
            location: "CFC, Arles"
        }, {
            date: "2014",
            title: "Formation Anglais professionnel et TOEIC BUSINESS",
            location: "Institut Greta, Avignon"
        }, {
            date: "2013",
            title: "Certificat de la réflexologie plantaire chinoise et massage Suédois",
            location: "Etablissement de massages professionnels, Slovaquie"
        }],
        hobbies: ["photos", "chats", "Netflix", "Disney", "Musique", "Chocolat"]
    });
});

app.get('/hostels', async (req, res) => {
    const hostels: HostelModel[] = [];
    const hostelsRef = await ref.get();

    hostelsRef.forEach(hostel => {
        const data = hostel.data() as HostelModel;
        hostels.push(data);
    });

    res.send(hostels);
});

app.get('/rooms', async (req, res) => {
    const rooms: RoomModel[] = [];
    const roomsRef = await refRooms.get();

    roomsRef.forEach(room => {
        const data = room.data() as RoomModel;
        rooms.push(data);
    });

    res.send(rooms);
});

app.get('/hostel/:id', async (req, res) => {
    const hostel: DocumentSnapshot = await ref.doc(req.params.id).get();

    res.send(hostel.data());

});

app.get('/hostels/:id/rooms', async (req, res) => {
    const reqRooms: Query = refRooms.where('parent', '==', req.params.id);
    const roomsRef: QuerySnapshot = await reqRooms.get();
    const rooms: RoomModel[] = [];
    roomsRef.forEach(room => rooms.push(room.data() as RoomModel));

    res.send(rooms);
});

app.post('/hostels', async (req, res) => {
    const newHostel = req.body;
    const refDoc = await ref.add(newHostel);
    const request = await ref.doc(refDoc.id).get();
    const data = request.data();
    data.id = refDoc.id;

    res.send(data);
});

app.post('/rooms', async (req, res) => {
    const room: RoomModel = req.body;
    const createdRoom: DocumentReference = await refRooms.add(room);
    const fullRoom: DocumentReference = refRooms.doc(createdRoom.id);
    await fullRoom.update({uid: createdRoom.id});
    const fullRoomData: DocumentSnapshot = await fullRoom.get();

    res.send(fullRoomData.data());

});

app.put('/hostel/:id', async (req, res) => {
    await ref.doc(req.params.id).update(req.body);
    res.send({
        status: 'success'
    });
});

app.put('/room/:id', async (req, res) => {
    await refRooms.doc(req.params.id).update(req.body);
    res.send({
        status: 'success'
    });
});

app.delete('/hostels/:id', async (req, res) => {
    await ref.doc(req.params.id).delete();
    res.send({
        status: "success"
    });
});

app.delete('/rooms/:id', async (req, res) => {
    await refRooms.doc(req.params.id).delete();

    res.send({
        status: "success"
    });
});

app.listen(4000, () => {
    console.log('Example app listening on port 4000!')
});
