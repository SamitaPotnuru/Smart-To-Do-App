let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function save(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(){

let text=document.getElementById("taskInput").value;
let date=document.getElementById("dueDate").value;
let priority=document.getElementById("priority").value;

if(text==="") return;

tasks.push({
text,
date,
priority,
completed:false
});

save();
render();

document.getElementById("taskInput").value="";
}

function render(){

let list=document.getElementById("taskList");
let search=document.getElementById("searchTask").value.toLowerCase();

list.innerHTML="";

tasks.forEach((task,i)=>{

if(filter==="completed" && !task.completed) return;
if(filter==="pending" && task.completed) return;

if(!task.text.toLowerCase().includes(search)) return;

let li=document.createElement("li");

li.classList.add(`priority-${task.priority}`);

if(task.completed){
li.classList.add("completed");
}

li.innerHTML=`

<div class="task-info">
<b>${task.text}</b><br>
<small>Due: ${task.date || "No date"}</small>
</div>

<div class="task-buttons">

<button class="complete-btn" onclick="toggle(${i})">✔</button>

<button class="edit-btn" onclick="edit(${i})">✏</button>

<button class="delete-btn" onclick="removeTask(${i})">❌</button>

</div>

`;

list.appendChild(li);

});

}

function toggle(i){
tasks[i].completed=!tasks[i].completed;
save();
render();
}

function removeTask(i){
tasks.splice(i,1);
save();
render();
}

function edit(i){

let newTask=prompt("Edit task",tasks[i].text);

if(newTask){
tasks[i].text=newTask;
save();
render();
}

}

function setFilter(type){
filter=type;
render();
}

document.getElementById("searchTask").addEventListener("input",render);

render();
