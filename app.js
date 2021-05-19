const express = require('express');
const app = express();

app.listen(process.env.PORT || 5000, () => console.log("Server running..."));

app.use(express.json());
app.use(express.urlencoded());

// GET Method
app.get('/', (req, res) => res.send("Welcome GET POST PUT DELETE Method"))

let users = [
    {id: 1, username: "rady", password: '123'},
    {id: 2, username: "kanha", password: '123'},
    {id: 3, username: "thida", password: '123'},
];

app.get('/api/users', (req, res) => res.send(users));

// POST Method
app.post('/api/users', (req, res) => {
    if(!req.body.password) {
        res.status(400);
       return res.send({error: "Password Required"})
    }
    let user = {
        id: users.length + 1,
        username: req.body.username,
        password: req.body.password
    }
    users.push(user);
    res.send(users);
});

// PUT Method

app.put('/api/users/:id', (req, res) => {
    let id = req.params.id;
    let userName = req.body.username;
    let pass = req.body.password;
    let index = -1;
    for (let user of users) {
        if (user.id === parseInt(id)) {
            index = user.id - 1;
        }
    }

    if (index >= 0) {
        let user = users[index];
        user.username = userName;
        user.password = pass;
        res.send(user);
    }else {
        res.status(404)
        res.send({error: "User id not correct!"})
    }
})

// DELETE Method
app.delete('/api/users/:id', (req, res) => {
    let id = req.params.id;
    let index = -1;
    for (let user of users) {
        if (user.id === parseInt(id)) {
            index = user.id - 1;
        }
    }

    if (index >= 0) {
        let user = users[index];
        users.splice(index, 1);
        res.send(user);
    }else {
        res.status(404)
        res.send({error: "User id not correct!"})
    }
})