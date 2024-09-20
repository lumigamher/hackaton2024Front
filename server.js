import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Simulamos una base de datos de usuarios
const users = [
    { username: 'user1', password: 'pass1', token: 'token123' },
    { username: 'user2', password: 'pass2', token: 'token456' },
];

app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        return res.json({ token: user.token });
    } else {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
