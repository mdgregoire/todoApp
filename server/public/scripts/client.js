
$(document).ready(function(){
  onReady()
  $('#taskSubmitButton').on('click', function(){
    collectTask();
  })//end taskSubmitButton onclick
  $('#viewTasks').on('click', '.complete', function(){
    clickComplete($(this).attr('id'))
  })//end complete onclick
  $('#viewTasks').on('click', '.delete', function(){
    confirmDelete($(this).attr('id'));
  })//end delete onclick
  $('#sortBySelect').change(function(){
    runSort($('#sortBySelect').val());
    console.log($('#sortBySelect').val());
  })
})//end document ready


function onReady(){
  sortTaskList();
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
    sortTaskList();
    },
    error: function(error){
      console.log('failure on post');
    }
  });
}//end addTaskToTaskCatergoryTable

function checkDueDate(date){
  let nowDate = new Date();
  let compareDate = new Date(date);
  let string;
  if (nowDate > compareDate){
    string = `<td style="background-color:red">${date}</td>`;
  }//end if
  else{
    string = `<td>${date}</td>`
  }//end else
  return (string);
}//end checkDueDate

function checkforComplete(id, completed){
  let string;
  if(completed == 'N'){
    string += `<tr><td><input type="radio" class = "complete" id = ${id}></td>`;
  }//end if
  else {
    string += `<tr class ="completed"><td></td>`
    //completed class adds red strikethrough to every cell in the row, and moves the task to the bottom of the list
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
    sortTaskList()
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

function confirmDelete(id){
  if(confirm("Select OK to delete this task.")){
    clickDeleteTaskCatergory(id)
  }//end if
  else{
    sortTaskList()
  }
}//end confirmDelete

function deleteTask(id){
  $.ajax({
    type: 'DELETE',
    url: 'toDo/deleteTask',
    data: {data:id}
  })
  .done(function(response){
    console.log('deletetask was success', response);
    sortTaskList(id);
  })
  .fail(function(error){
    console.log(error, 'delete task');
  })
}//end deleteTask

function runSort(sort){
  console.log('in runSort', sort);
  if(sort){
    sortTaskList(sort);
  }//end if
  else{
    console.error('error, please select a sort by');
  }//end else
}//end runSort

function sortTaskList(sort){
  console.log('in sortTaskList', sort);
  $.ajax({
    type: 'POST',
    url: '/toDo/taskSort',
    data: {data:sort}
  })
    .done(function( data ){
      console.log( 'got getTaskList: ', data );
    writeList(data);
    })
    .fail(function(error){
      console.log('failure on get getTaskList');
    })
}//end sortTaskList

function writeList(taskTable){
  console.log(taskTable, 'in write');
  $('#viewTasks').empty();
  for(i=0; i<taskTable.length; i++){
    let name = taskTable[i].task_name;
    let catergory = taskTable[i].catergory_name;
    let dateAssigned = taskTable[i].task_date_assigned.substring(0, 10);
    let dueDate = taskTable[i].task_due_date.substring(0, 10);
    let id = taskTable[i].task_id;
    let completed = taskTable[i].task_completed;

    //this function will check the due date vs the current date and change the cell background to red if it is past due
    let dateString = checkDueDate(dueDate);

    //this function checks to see if the task has been completed and if so changes the class of the entire row.
    let stringToAppend = checkforComplete(id, completed);

    stringToAppend +=`<td>${name}</td><td>${catergory}</td><td>${dateAssigned}</td>
                      ${dateString}<td><input type="radio" class = "delete" id = ${id}></td></tr>`;
    $('#viewTasks').append(stringToAppend);
  }//end for loop
  clearInputs();
}//end writeList
