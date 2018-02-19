const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const bodyParser = require('body-parser');

router.post('/createTables', function(request, response){
  let sqlText = `CREATE TABLE task (task_id serial primary key,
    task_name VARCHAR (280),
    task_due_date date,
    task_date_assigned date default now(),
    task_completed VARCHAR(1));
  CREATE TABLE catergory (
  	catergory_id serial primary key,
  	catergory_name VARCHAR (240));
  CREATE TABLE task_catergory (
  	task_catergory_id serial primary key,
  	task_id INT REFERENCES task,
  	catergory_id INT REFERENCES catergory);
  INSERT INTO catergory (catergory_name)
  VALUES ('Kitchen'),
   ('Bathroom'),
   ('Laundry'),
   ('Bills'),
   ('Personal'),
   ('Work'),
   ('School'),
   ('Misc')	;`;
  console.log(sqlText, 'in createTables');
  pool.query(sqlText)
  .then(function(result){
    console.log('created Tables', result);
    response.sendStatus(200);
  })
  .catch(function(error){
    console.log('error in createTables', error);
    response.sendStatus(500);
  })
})//end createTables post

router.get('/taskSort/:sortType', function(request, response){
  let sortType = request.params.sortType;
  let sort_text = '';
  console.log('in taskSort', sortType);

  switch (sortType){

    case 'catergory_name':
    sort_text = 'catergory_name';
    break;

    case 'task_due_date':
    sort_text = 'task_due_date';
    break;

    case 'task_date_assigned':
    sort_text = 'task_date_assigned';
    break;

    case 'task_completed':
    sort_text = 'task_completed';
    break;

    default:
    break;
  }
  console.log(sort_text, 'sort in sortType');
  let sqlText = `SELECT task.task_name, catergory.catergory_name, task.task_date_assigned,
                    task.task_due_date, task.task_id, task.task_completed FROM task
                    JOIN task_catergory on task.task_id = task_catergory.task_id
                    JOIN catergory on task_catergory.catergory_id = catergory.catergory_id
                    ORDER by task_completed, ${sort_text};`;

  console.log(sqlText, 'in taskSort sqlTExt');
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
