const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const AuthenticationRoutes= require('./routers/AuthenticationRoutes');
const PostRoutes= require('./routers/PostRoutes');
const UserRoutes= require('./routers/UserRoutes');


require('dotenv').config();


// Middlewares calls
app.use(cors());
app.use(express.json());
app.use('/api/auth', AuthenticationRoutes);
app.use('/api/posts', PostRoutes);
app.use('/api/users', UserRoutes);







app.listen(8080, () => {
    connectDatabase();
    console.log('Server is running on port 8080');
});



function connectDatabase() {

    mongoose.connect(process.env.MONGO_URL || 'mongodb://0.0.0.0:27017/pramata_db', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('Database connected successfully'))
    .catch(err => console.log(err));
}