const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const bodyParser = require('body-parser');

router.post('/taskTablePost', function(request, response){
  const taskToAdd = request.body;
  const sqlText = `INSERT INTO task
                    (task_name, task_due_date, task_completed)
                    VALUES ($1, $2, $3)`;
  pool.query(sqlText, [taskToAdd.description, taskToAdd.dueDate, taskToAdd.completed])
  .then(function(result){
    console.log('added task to DB', result);
    response.sendStatus(200)
  })
  .catch(function(error){
    console.log('error adding task to DB', error);
  })
})//end task table post

router.post('/taskCatergoryTablePost', function(request, response){
  const taskToAdd = request.body;
  console.log(taskToAdd.catergory, 'in taskcatergory table post');
  const sqlText = `INSERT INTO task_catergory
                  (task_id, catergory_id)
                  VALUES ((SELECT task_id FROM task WHERE task_name = $1),
                  (SELECT catergory_id FROM catergory WHERE catergory_name = $2))`;
  pool.query(sqlText, [taskToAdd.description, taskToAdd.catergory])
  .then(function(result){
    console.log('added task to task_catergory', result);
    response.sendStatus(200)
  })
  .catch(function(error){
    console.log('error adding task to task_catergory', error);
  })
})//end task_catergory table post






module.exports = router;
