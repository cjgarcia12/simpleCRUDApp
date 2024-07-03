const express = require('express');
const morgan = require('morgan');
const app = express();

const users = [
    {
        id: 1,
        name: 'Chris'
    },
    {
        id: 2,
        name: 'Nathan'
    }
]

app.use(express.json());
app.use(morgan('dev'));

// GET routes
app.get('/users', (req, res) => {
    res.status(200).send(users);
});

app.get('/users/:id', (req, res) => {
    const findUser = users.find(user => user.id === parseInt(req.params.id));
    if (!findUser) {
        return res.status(404).send('User Not Found');
    }
    res.status(200).json(findUser);
});

// POST Routes
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT Routes
app.put('/users/:id', (req, res) => {
    const findUser = users.find(user => user.id === parseInt(req.params.id));
    if (!findUser) {
        return res.status(404).send('User Not Found');
    }
    findUser.name = req.body.name
    res.status(200).json(findUser);
});

// DELETE Routes
app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send('User Not Found');
    }
    users.splice(index, 1);
    res.status(204).send();
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

