const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const bodyParser = require('body-parser');

router.post('/taskSort', function(request, response){
  let sort = request.body.data;
  let sqlText = `SELECT task.task_name, catergory.catergory_name, task.task_date_assigned,
                          task.task_due_date, task.task_id, task.task_completed FROM task
                          JOIN task_catergory on task.task_id = task_catergory.task_id
                          JOIN catergory on task_catergory.catergory_id = catergory.catergory_id `;
  if(sort){
    sqlText += `ORDER by ${sort} asc;`;
    //I know that I should be using $1 here...could not get it to work.  Will keep trying.
  }
  else{
    sqlText += `ORDER by task_completed asc;`;
  }

  pool.query(sqlText)
  .then(function (result){
    console.log('got result', result.rows);
    response.send(result.rows);
  })
  .catch(function(error){
    console.log('error on get in router', error);
    response.sendStatus(500);
  })
})// end get task table sort router

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

router.put('/complete', function(request, response){
  const id = request.body.data;
  const sqlText = `UPDATE task SET task_completed = 'Y' WHERE task_id = $1`;
  pool.query(sqlText, [id])
  .then (function(result){
    console.log('updated', id);
    response.sendStatus(200);
  })
  .catch(function(error){
    console.log('error on update', error);
    response.sendStatus(500);
  })
})//end put for completed, todo table

router.delete('/deleteTask', function(request, response){
  const id = request.body.data;
  const sqlText = `DELETE FROM task WHERE task_id = $1`;
  pool.query(sqlText, [id])
  .then(function(result){
    console.log('deleted task', id);
    response.sendStatus(200);
  })
  .catch(function(error){
    console.log('error on delete task', error);
    response.sendStatus(500)
  })
})//end deleteTaskCatergory

router.delete('/deleteTaskCatergory', function(request, response){
  const id = request.body.data;
  const sqlText = `DELETE FROM task_catergory WHERE task_id = $1`;
  pool.query(sqlText, [id])
  .then(function(result){
    console.log('deleted task_catergory', id);
    response.sendStatus(200);
  })
  .catch(function(error){
    console.log('error on delete task_catergory', error);
    response.sendStatus(500)
  })
})//end deleteTaskCatergory


module.exports = router;
