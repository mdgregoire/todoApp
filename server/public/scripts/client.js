
$(document).ready(function(){
  onReady()
  $('#taskSubmitButton').on('click', function(){
    collectTask();
  })//end taskSubmitButton onclick
  $('#viewTasks').on('click', '.complete', function(){
    clickComplete($(this).attr('id'))
  })//end complete onclick
  $('#viewTasks').on('click', '.delete', function(){
    clickDeleteTaskCatergory($(this).attr('id'))
  })//end delete onclick
})//end document ready


function onReady(){
  getTaskList();
}//end onReady function

function addTaskToTaskTable (objectToAdd){
  $.ajax({
    url: '/toDo/taskTablePost',
    type: 'POST',
    data: objectToAdd,
    success: function( data ){
      console.log( 'added task: ', data );
    addTaskToTaskCatergoryTable(objectToAdd);
    },
    error: function(error){
      console.log('failure on post');
    }
  });
}//end addTaskToTaskTable

function addTaskToTaskCatergoryTable(objectToAdd){
  $.ajax({
    url: '/toDo/taskCatergoryTablePost',
    type: 'POST',
    data: objectToAdd,
    success: function( data ){
      console.log( 'added task: ', data );
    getTaskList();
    },
    error: function(error){
      console.log('failure on post');
    }
  });
}//end addTaskToTaskCatergoryTable

function checkforComplete(id, completed){
  let string;
  if(completed == 'N'){
    string += `<tr><td><input type="radio" class = "complete" id = ${id}></td>`;
  }//end if
  else {
    string += `<tr class ="completed"><td></td>`
  }//end else
  return (string);
}//end checkforComplete

function clearInputs(){
  $('#taskInput').val('');
  $('#catergorySelector').val('');
  $('#dueDate').val('');
}//end clearInputs

function clickComplete(id){
  $.ajax({
    type: 'PUT',
    url: '/toDo/complete',
    data: {data:id}
  })
  .done(function(response){
    console.log(' UPDATE was success', response);
    getTaskList()
  })
  .fail(function(error){
    console.log(error, 'update');
  })
}//end clickComplete

function clickDeleteTaskCatergory(id){
  $.ajax({
    type: 'DELETE',
    url: 'toDo/deleteTaskCatergory',
    data: {data:id}
  })
  .done(function(response){
    console.log('delete was success', response);
    deleteTask(id);
  })
  .fail(function(error){
    console.log(error, 'delete');
  })
}//end clickDeleteTaskCatergory

function collectTask(){
  let taskDescription = {
    description: $('#taskInput').val(),
    catergory: $('#catergorySelector').val(),
    dueDate: $('#dueDate').val(),
    completed: 'N'
  };
  addTaskToTaskTable(taskDescription);
}//end collectTask

function deleteTask(id){
  $.ajax({
    type: 'DELETE',
    url: 'toDo/deleteTask',
    data: {data:id}
  })
  .done(function(response){
    console.log('deletetask was success', response);
    getTaskList(id);
  })
  .fail(function(error){
    console.log(error, 'delete task');
  })
}//end deleteTask

function getTaskList(){
  $.ajax({
    url: '/toDo/taskGet',
    type: 'GET',
    success: function( data ){
      console.log( 'got getTaskList: ', data );
    writeList(data);
    },
    error: function(error){
      console.log('failure on get getTaskList');
    }
  });
}//end getTaskList

function writeList(taskTable){
  console.log(taskTable, 'in write');
  $('#viewTasks').empty();
  for(i=0; i<taskTable.length; i++){
    let name = taskTable[i].task_name;
    let catergory = taskTable[i].catergory_name;
    let dateAssigned = taskTable[i].task_date_assigned.substring(0, 10);
    let dueDate = taskTable[i].task_due_date.substring(0, 10)
    let id = taskTable[i].task_id;
    let completed = taskTable[i].task_completed;
    let stringToAppend = checkforComplete(id, completed);
    stringToAppend +=`<td>${name}</td><td>${catergory}</td>
                      <td>${dateAssigned}</td><td>${dueDate}</td>
                      <td><input type="radio" class = "delete" id = ${id}></td></tr>`;
    $('#viewTasks').append(stringToAppend);
  }//end for loop
  clearInputs();
}//end writeList
