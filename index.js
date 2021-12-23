const express = require('express');
const firebase = require('./admin')
const app = express();
const db = firebase.firestore();

app.use(express.json());

const port = 3000;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send({
        message: "Hello, welcome to the first page!"
    })
});

app.get('/status', (req, res) => {
    if (res.status(200)){
        res.send({
            status: "OK"
        })
    } 
});

app.post('/dino', (req, res) => {
    const id = req.body.id;
    const dinoName = req.body.dinoName;
    const foodType = req.body.foodType;

    const data = {
        dino_id: id,
        dino_name: dinoName,
        food_type: foodType
    };

    const dbRef = db.collection('dino_list');

    dbRef.doc(id).set(data).then(() => {
        res.status(201).send({
            message: "Dino Added!"
        })    
    })
    
});

app.get('/dino', (req, res) => {
    let data = [];
    const dbRef = db.collection('dino_list');

    dbRef.orderBy("dino_id", "asc").get().then((snap) => {
        snap.forEach((doc) => {
            data.push(doc.data());
        })
        res.send(data);
    })
    
});

app.get('/dino/:id', (req, res) => {
    let data = [];

    const id = req.params.id;

    const dbRef = db.collection('dino_list');

    dbRef.where("dino_id", "==", id).get().then((snap) => {
        snap.forEach((doc) => {
            data.push(doc.data());
        })
        res.send(data);
    })
})

app.patch('/dino/:id', (req, res) => {
    const id = req.params.id;
    const dinoName = req.body.dinoName;
    const foodType = req.body.foodType;

    const dbRef = db.collection('dino_list');

    const data = {
        dino_id: id,
        dino_name: dinoName,
        food_type: foodType
    };

    dbRef.doc(id).set(data).then(() =>{
        res.send({
            message: "Data updated"
        })
    })
})