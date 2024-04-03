const express = require("express");
const mongoose = require ("mongoose");
const cors = require ("cors");

require("dotenv").config();

const menuRouter = require("./routes/menuRoute");
const userRouter = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');


const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

mongoose
    .connect(process.env.URI_MONGO)
    .catch((error) => console.log(error))
    .then(() => console.log("Conectado a MongoDB Atlas"));

app.use(express.json());

app.use('/api', menuRouter);
app.use('/api', userRouter );
app.use('/api', orderRouter );

app.listen(PORT, () => {
    console.log(`API Rest escuchando el puerto ${PORT}`);
})