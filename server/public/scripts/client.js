
$(document).ready(function(){
  onReady()
  $('#taskSubmitButton').on('click', function(){
    collectTask();
  })//end taskSubmitButton onclick
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
    },
    error: function(error){
      console.log('failure on post');
    }
  });
}//end addTaskToTaskCatergoryTable

function collectTask(){
  let taskDescription = {
    description: $('#taskInput').val(),
    catergory: $('#catergorySelector').val(),
    dueDate: $('#dueDate').val(),
    completed: 'N'
  };
  addTaskToTaskTable(taskDescription);
}//end collectTask



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
    let stringToAppend = `<tr><td>${name}</td><td>${catergory}</td>
                          <td>${dateAssigned}</td><td>${dueDate}</td>
                          <td><input type="radio" class = "complete" id = ${id}></td>
                          <td><input type="radio" class = "delete" id = ${id}></td></tr>`;
    $('#viewTasks').append(stringToAppend);
  }//end for loop

}//end writeList
