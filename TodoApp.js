import React, { useState, useEffect } from "react";
import "./Todo.css";

function TodoApp(){

const [task,setTask] = useState("");
const [tasks,setTasks] = useState([]);
const [search,setSearch] = useState("");
const [filter,setFilter] = useState("all");
const [dark,setDark] = useState(false);

useEffect(()=>{
const saved = JSON.parse(localStorage.getItem("tasks"));
if(saved) setTasks(saved);
},[]);

useEffect(()=>{
localStorage.setItem("tasks",JSON.stringify(tasks));
},[tasks]);

const addTask=()=>{
if(task.trim()==="") return;

setTasks([...tasks,{text:task,completed:false}]);
setTask("");
};

const deleteTask=(index)=>{
setTasks(tasks.filter((_,i)=>i!==index));
};

const toggleTask=(index)=>{
const newTasks=[...tasks];
newTasks[index].completed=!newTasks[index].completed;
setTasks(newTasks);
};

const editTask=(index)=>{
const newText=prompt("Edit task:",tasks[index].text);

if(newText){
const newTasks=[...tasks];
newTasks[index].text=newText;
setTasks(newTasks);
}
};

const filteredTasks=tasks
.filter(t=>t.text.toLowerCase().includes(search.toLowerCase()))
.filter(t=>{
if(filter==="completed") return t.completed;
if(filter==="pending") return !t.completed;
return true;
});

return(

<div className={dark ? "container dark":"container"}>

<h1>Todo-List</h1>

<button className="darkBtn"
onClick={()=>setDark(!dark)}>
Dark Mode
</button>

<input
className="search"
type="text"
placeholder="Search task"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<div className="inputSection">

<input
type="text"
value={task}
onChange={(e)=>setTask(e.target.value)}
placeholder="Enter task"
/>

<button onClick={addTask}>Add</button>

</div>

<div className="filters">

<button onClick={()=>setFilter("all")}>All</button>
<button onClick={()=>setFilter("completed")}>Completed</button>
<button onClick={()=>setFilter("pending")}>Pending</button>

</div>

<ul>

{filteredTasks.map((t,index)=>(

<li key={index}
className={t.completed ? "completed":""}
>

<span onClick={()=>toggleTask(index)}>
{t.text}
</span>

<div>

<button onClick={()=>editTask(index)}>
Edit
</button>

<button onClick={()=>deleteTask(index)}>
Delete
</button>

</div>

</li>

))}

</ul>

</div>

);

}

export default TodoApp;