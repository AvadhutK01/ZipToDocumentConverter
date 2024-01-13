const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const zipRouter = require('./Routes/ZipRoute');
const userRouter = require('./Routes/userRoute');
require('./ConnectDb');
const pdfRouter = require('./Routes/pdfRoute');
const app = express();
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ["POST", "GET"]
}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter)
app.use('/zip', zipRouter)
app.use('/pdf', pdfRouter);
app.get('/', (req, res) => {
    res.send('Hello');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
