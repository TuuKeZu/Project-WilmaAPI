const express = require('express');
const cors = require('cors');
const responseTime = require('response-time');

const login = require('./routers/login');
const gradebook = require('./routers/gradebook');
const news = require('./routers/news');
const schedule = require('./routers/schedule');
const message = require('./routers/messages')
const courseTray = require('./routers/course-tray');
const lops = require('./routers/lops');
const teachers = require('./routers/teachers')

const limiter = require('./routers/rate-limit');


const { port } = require('./config.json')

const app = express();
const PORT = process.env.PORT || port;

app.use(express.json());
app.use(responseTime());

app.use(cors());
app.use('/api/', login, limiter.standard);
app.use('/api/', gradebook, limiter.standard);
app.use('/api/', news, limiter.standard);
app.use('/api/', schedule, limiter.standard);
app.use('/api/', message, limiter.standard);
app.use('/api/', courseTray, limiter.standard);
app.use('/api/', lops, limiter.standard);
app.use('/api/', teachers, limiter.standard);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
});

