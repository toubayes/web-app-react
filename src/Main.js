import { useEffect } from "react";
import { useState } from "react"
import {  useReducer} from "react"

function Main(){
    const [newtask,setNewTask] =useState();
    function addtask(){
        settasks({type:"add task",value:{task:newtask,done:false}})

    }
    function updatetasks(tasks,action){
        switch (action.type) {
            case "add task":
                return [...tasks,action.value]
            case "remove task":
                return tasks.filter((task)=> task!== action.value)
            case "update task":
               console.log("loll")
                return tasks.map(task =>task ===action.value?{...task,done : !task.done} : task)
                default:
                
        }
       return tasks
    }


    const [tasks,settasks]=useReducer(updatetasks,GetTasksFromStorage())

    
  function GetTasksFromStorage (){
    return localStorage.getItem("tasks") != undefined? JSON.parse(localStorage.getItem("tasks")): []
}

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }, [tasks]);
    return <main>
       <div className="input">
        <input type="text" value={newtask} onChange={(event)=>setNewTask(event.target.value)}/>
        <button onClick={addtask}> add task</button>
    </div>
        <div className="content">
            <table>
                <tbody>
                    {tasks.map(task=> {
                    return <tr>
                    <td className="tdtask" style={{ textDecoration: task.done ? 'line-through' : 'none' ,"opacity" : "0,5"}}>{task.task}</td>
                    <td><button onClick={()=>{settasks({type:"update task", value:task})}}>{task.done ? "complete" :  "uncomplete"}</button></td>
                    <td><button className="remove" onClick={()=>{settasks({type:"remove task", value:task})}}> Remove</button></td>
                    </tr>
                    })
                    }
                </tbody>
            </table>
        </div>
 
    </main>
}
export default Main