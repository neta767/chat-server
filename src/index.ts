import cors from 'cors';
import express from 'express';
import messages from "./messages";

const app = express();
app.use(cors());

app.use('/mockMessages', messages);

app.listen(3003, '0.0.0.0', () => {
    console.log('Server is running');
});