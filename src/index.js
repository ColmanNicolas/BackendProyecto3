const express = require("express");
const mongoose = require ("mongoose");
require("dotenv").config();

const userRouter = require('./routes/...');
const productRouter = require('./routes/...');

const app = express();

const PORT = process.env.PORT || 4000;

mongoose
    .connect(process.env.URI_MONGO)
    .catch((error) => console.log(error))
    .then(() => console.log("Conectado a MongoDB Atlas"));

app.use(express.json());

app.use('/api',    ); //nombre de la api);
app.use('/api',    );

app.listen(PORT, () => {
    console.log(`API Rest escuchando el puerto ${PORT}`);
})