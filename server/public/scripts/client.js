
$(document).ready(function(){
  onReady()
  $('#taskSubmitButton').on('click', function(){
    collectTask();
  })//end taskSubmitButton onclick
})//end document ready


function onReady(){
  writeList();
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

function writeList(){

}//end writeList
