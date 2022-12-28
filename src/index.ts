import cors from 'cors';
import express from 'express';
import messages from "./messages";
import users from "./users";

const app = express();
app.use(cors());

app.use('/mockMessages', messages);
app.use('/mockUsers', users);

app.listen(3003, '0.0.0.0', () => {
    console.log('Server is running');
});