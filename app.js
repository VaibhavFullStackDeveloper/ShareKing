// Including Files
const express= require('express'); // express server
const app =express();
const morgan=require('morgan'); // Check Api calls in console
const cors= require('cors'); // cross orgin
const mongoose=require('mongoose'); // mongoDB
const authJwt = require('./helpers/jwt'); // include jwt auth
const errorHandler = require('./helpers/error-handler');
require('dotenv/config'); //Include Env variables
const axios = require("axios"); // Get data from apis


var baseUrl= "https://nexus.doozycodsystems.com/API/";
// Use Cross orign for two server or multiple to get data
app.use(cors());
app.options('*',cors());
const secret=process.env.secret;
//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('tiny'));
// app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

// global error handler
app.use(errorHandler);

// Including routers
const brockerRoutes = require('./routers/broker/broker');
const adminRoutes = require('./routers/admin/admin');
const adminBrokerRoutes = require('./routers/admin/broker');
const adminUserRoutes = require('./routers/admin/user');
const usersRoutes = require('./routers/user/users');
const stocksRoutes= require('./trueData/web-socket');
const api=process.env.API_URL;

// const mySocket = require('./trueData/web-socket')

// Adding routes

app.use(`${api}/broker`, brockerRoutes);
app.use(`${api}/admin`, adminRoutes);
app.use(`${api}/admin`, adminBrokerRoutes);
app.use(`${api}/admin`, adminUserRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/stocks`, stocksRoutes);

/// Database Connection
mongoose.connect(process.env.CONNECTION_STRING,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName:'sharkingdb'
    })
.then(()=>{
    console.log('Database Connected now.');
})
.catch((err)=>{
   // console.log(err);
})

//Check Server running or not
app.listen(8000, ()=>{
    console.log('server is running now http://localhost:8000');
})

app.get('/protected',
  function(req, res) {
    if (!req.user) return res.sendStatus(401);
    res.sendStatus(200);
  });



//   app.get("/data", async (req, res) => {
//   try {
//     const response = await axios({
//       url: baseUrl+"test.php",
//       method: "get",
//     });
//       console.log(baseUrl+"test.php");
//     res.status(200).json(response.data);
//   } catch (err) {
//         //res.status(404).json({ message: 'crashed' }); 
//     res.status(500).json({ message: err });
//   }
// });
