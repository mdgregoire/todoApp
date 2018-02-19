const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));  //jQuery line
app.use(express.static('server/public'));

const toDoRouter = require('./routers/toDoRouter');
app.use('/toDo', toDoRouter);

app.listen(PORT, function(){
  console.log(`server listening on port ${PORT}`);
});//end app listen
