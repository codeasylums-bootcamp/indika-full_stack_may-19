const express  = require('express');
const morgan =require('morgan');
const port=3020;
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

const app=express();

app.set('view engine','ejs');
app.set('views','./views');
var mongoose=require('mongoose');
const parser =require('body-parser');
const user=require('./routes/users'); 
const guitar=require('./routes/guitar');
const drum=require('./routes/drum');
const keyboard=require('./routes/keyboard');
const vocals=require('./routes/vocals');
const bass=require('./routes/bass');
const event=require('./routes/event');  
var db = mongoose.connection;




app.use('*',function(req,res,next){
      res.set('Access-Control-Allow-Origin','*');
      res.set('Access-Control-Allow-Headers','content-type');
       next();
     });


mongoose.connect("mongodb+srv://moiz66:moiz66@mycluster-jbqhd.mongodb.net/test?retryWrites=true",function(err){
    if(err){
        console.log(err);
    
      }
      else{
        console.log("Atlas conected");
      }
    
    });


    app.get('/',function(req,res){
    
      res.send('hello world').status(200);
  });


    app.use(session({
      secret: 'work hard',
      resave: true,
      saveUninitialized: false,
      store: new MongoStore({
        mongooseConnection: db
      })
    }));


    app.use(morgan('dev'));
    app.use(parser.json());
    app.use(parser.urlencoded({extende:true})); 
    app.use('/users',user);

app.use('/guitar',guitar);
app.use('/drum',drum);
app.use('/keyboard',keyboard);
app.use('/vocals',vocals);
app.use('/bass',bass);
app.use('/event',event)


    app.listen(port,function(){
        console.log(`Server listening on ${port}`);
    });