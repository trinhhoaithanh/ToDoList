var arrTaskToDo=[];
var arrTaskComplete=[];
//Add Task
document.getElementById('addItem').onclick=function(){
    var task = new Task();
    task.id=Math.random();
    task.taskName = document.getElementById('newTask').value;
    task.status = 'todo';
    
    const arrTaskList = [...arrTaskToDo, ...arrTaskComplete];
    var valid =true;
    valid=validation.kiemTraRong(task.taskName,"err-task-required","Tên task");
    valid&=validation.trungTenTask(task.taskName,"notiInput","Task",arrTaskList);
    if(!valid){
        return;
    }
    arrTaskToDo.push(task);
    setLocalStorage();
    renderTaskToDo(arrTaskToDo);
    console.log(arrTaskToDo);
    // document.getElementById('newTask').value="";

}
//Delete Task
function DeleteTask(taskId,status){
    if(status==='todo'){
        var index=arrTaskToDo.findIndex((task)=>task.id===taskId);
        if(index!==-1){
            arrTaskToDo.splice(index,1);
            setLocalStorage();
            renderTaskToDo(arrTaskToDo);
        }
    }else if(status==='completed'){
        var index = arrTaskComplete.findIndex((task)=>task.id===taskId);
        if(index!==-1){
            arrTaskComplete.splice(index,1);
            setLocalStorage();
            renderTaskCompleted(arrTaskComplete);
        }
    }
}
//update task
function UpdateTask(taskId,status){
    if (status==='todo'){
        var index = arrTaskToDo.findIndex((task)=>task.id===taskId);
        if(index!==-1){
            var newTask= new Task();
            newTask.id=taskId;
            newTask.taskName = arrTaskToDo[index].taskName;
            newTask.status='completed';
            arrTaskToDo.splice(index,1);
            arrTaskComplete.push(newTask);
            setLocalStorage();
            renderTaskToDo(arrTaskToDo);
            renderTaskCompleted(arrTaskComplete);
        }
    }else if(status==='completed'){
        var index = arrTaskComplete.findIndex((task)=>task.id===taskId);
        if(index!==-1){
            var newTask= new Task();
            newTask.id=taskId;
            newTask.taskName = arrTaskComplete[index].taskName;
            newTask.status='todo';
            arrTaskComplete.splice(index,1);
            arrTaskToDo.push(newTask);
            setLocalStorage();
            renderTaskToDo(arrTaskToDo);
            renderTaskCompleted(arrTaskComplete);
        }
    }
}
//create Table
function renderTaskToDo(arrTaskToDo){
    var contentHTML='';
    for (var index=0;index<arrTaskToDo.length;index++){
        var arrTask = arrTaskToDo[index];
        contentHTML+=`
        <li>
            <span>${arrTask.taskName}</span>
            <div class='buttons'>
                <button class='delete'>
                    	<i class="fa fa-trash-alt" onclick="DeleteTask(${arrTask.id}, '${arrTask.status}')"></i>
                </button>
                <button class='update'  onclick="UpdateTask(${arrTask.id}, '${arrTask.status}')">
                    <i class="far fa-check-circle" ></i>
                    <i class="fas fa-check-circle"></i>
                </button>
            </div>
            </li>
        `;
    }
    document.getElementById("todo").innerHTML=contentHTML;
}
function renderTaskCompleted(arrTaskCompleted) {
    var contentHTML = "";
    for (var index = 0; index < arrTaskCompleted.length; index++) {
      var arrTask = arrTaskCompleted[index];
      contentHTML += `
          <li>
              <span>${arrTask.taskName}</span>
              <div class='buttons'>
                  <button class="delete" onclick="DeleteTask(${arrTask.id}, '${arrTask.status}')">
                      <i class="fa fa-trash-alt"></i>
                  </button>
                  <button class="update" onclick="UpdateTask(${arrTask.id}, '${arrTask.status}')">
                  <i class="far fa-check-circle"></i>
                  <i class="fas fa-check-circle"></i>
                  </button>
              </div>
          </li>
      `;
    }
    document.getElementById("completed").innerHTML = contentHTML;
  }
//setLocalStorage
function setLocalStorage(){
    var stringArrTaskToDo = JSON.stringify(arrTaskToDo);
    var stringArrTaskComplete = JSON.stringify(arrTaskComplete);
    localStorage.setItem('arrTaskToDo',stringArrTaskToDo);
    localStorage.setItem('arrTaskComplete',stringArrTaskComplete);
    
}
//getLocalStorage
function getLocalStorage(){
    if(localStorage.getItem('arrTaskToDo')){
        var stringArrTaskToDo=localStorage.getItem('arrTaskToDo');
        arrTaskToDo = JSON.parse(stringArrTaskToDo);
        renderTaskToDo();
    }
    if(localStorage.getItem('arrTaskComplete')){
        var stringArrTaskToDo=localStorage.getItem('arrTaskComplete');
        arrTaskComplete = JSON.parse(stringArrTaskToDo);
        renderTaskComplete();
    }
}