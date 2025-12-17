const express = require('express');
const app = express();
const { readdirSync } = require('fs')
const morgan = require('morgan')
const connectDB = require('./config/mongodb');
const cors = require('cors');

require("dotenv").config();
app.use(morgan('dev'))
app.use(express.json())
app.use(cors({
  origin: true,
  credentials: true
}));
readdirSync('./routes')
    .map((file) => app.use('/api', require(`./routes/${file}`)));

async function startServer() {
    try {
        await connectDB();
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}
startServer();