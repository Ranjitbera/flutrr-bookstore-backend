
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const db_connection = require('./db_Connection/db')
const UserRoutes = require('./router/user')
require('dotenv').config();



db_connection();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use('/user', UserRoutes)

app.listen(8080, ()=>{
    console.log(`Server is running on port...8080`)
})
