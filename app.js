// Including Files
const express= require('express'); // express server
const app =express();
const morgan=require('morgan'); // Check Api calls in console
const cors= require('cors'); // cross orgin
const mongoose=require('mongoose'); // mongoDB
const authJwt = require('./helpers/jwt'); // include jwt auth
const errorHandler = require('./helpers/error-handler');
require('dotenv/config'); //Include Env variables

// Use Cross orign for two server or multiple to get data
app.use(cors());
app.options('*',cors());
const secret=process.env.secret;
//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

// global error handler
app.use(errorHandler);

// Including routers
const brockerRoutes = require('./routers/brocker');
const adminRoutes = require('./routers/admin');
const usersRoutes = require('./routers/users');

const api=process.env.API_URL;

// Adding routes
//app.use(`${api}/brocker`, brockerRoutes);
//app.use(`${api}/admin`, adminRoutes);
///app.use(`${api}/users`, usersRoutes);

/// Database Connection
mongoose.connect(process.env.CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName:'myfirstapp',
    })
.then(()=>{
    console.log('Database Connected now.');
})
.catch((err)=>{
    console.log(err);
})

//Check Server running or not
app.listen(3000, ()=>{
    console.log('server is running now http://localhost:3000');
})

app.get('/protected',
  function(req, res) {
    if (!req.user) return res.sendStatus(401);
    res.sendStatus(200);
  });