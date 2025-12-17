import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import Calendar from "react-calendar";
import { useNavigate } from 'react-router-dom';
import {FaPlus} from "react-icons/fa";
import { FaTrash } from "react-icons/fa";


function yyyymmddEAT(date){
    const year=date.getFullYear();
    const month=String(date.getMonth()+1).padStart(2,"0");
    const day=String(date.getDate()).padStart(2,"0");
    return(
        `${year}-${month}-${day}`
    )
}
function Todolist(){
    const[state, setState]=useLocalStorage('tasks',{
        ulTasks:[],
        newTask:"",
        newDate:""
    });
    const today=new Date()
    const[date, setDate]=useState(today)
    const navigate=useNavigate();

    /*NEW STATE TO TOGGLE BETWEEN TASKS AND INCOMPLETE TASKS*/
    const [displayedTasks, setDisplayedTasks]=useState('todo')

    const selectedDate=yyyymmddEAT(date);
    const presentDate=new Date().toISOString().split("T")[0];
    const selectedpastDate=selectedDate < presentDate;
    
    /*ALL TASKS FOR THE SELECTED DATE*/
    const tasksforDate=state.ulTasks.filter(myTask=>{
        const taskDate=yyyymmddEAT(new Date(myTask.date))

        if(taskDate !== selectedDate)return false;

        //Only show completed tasks if date selected is past
        if(selectedpastDate){
            return task.completed;
        }
        //Show all tasks if date selected is today or later
        return true;
    })

    /*ALL INCOMPLETE TASKS*/
    const incompleteTasks=state.ulTasks.filter(
        (task)=>!task.completed && yyyymmddEAT(new Date(task.date))<presentDate)


    function toggleCompleted(taskIndex){
       const newTasks=[...state.ulTasks]
       newTasks[taskIndex].completed=!newTasks[taskIndex].completed
       setState({
        ...state,
        ulTasks:newTasks
       })
    }
    
    function deleteTask(taskIndex){
        const remainingTasks=state.ulTasks.filter((_, i)=>i !== taskIndex)
        setState({
            ...state,
            ulTasks:remainingTasks
        })
    };

    //DECIDE WHAT TO DISPLAY BASED ON BUTTON
    const visibleTasks=displayedTasks==="todo"? tasksforDate:incompleteTasks;
    
    return(
        <div>
            <div className="container">
                <h2>
                    {date.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                    })}
                </h2>
                <Calendar 
                    defaultActiveStartDate={new Date()} 
                    onChange={setDate} 
                    value={date}
                    tileClassName={({date})=>{
                        //DATE WITH TASKS
                        const tasksdate= yyyymmddEAT(date); 
                        const taskexists=state.ulTasks.some(task=>task.date===tasksdate);
                        return(
                            taskexists ? "has-task" : ""
                        );
                    }}
                />
                <h3>Today's Task</h3>
                <div className="btn">
                    <button
                        type="button" 
                        className={`button todo ${displayedTasks === "todo"? "active" : ""}`}
                        onClick={()=>setDisplayedTasks("todo")}
                    >
                        To Do
                    </button>
                    <button 
                        type="button" 
                        className={`button incomplete ${displayedTasks === "incomplete" ? "active" : ""}`} 
                        onClick={()=>setDisplayedTasks("incomplete")}
                    >
                        Incomplete
                    </button>
                </div>

                {/*SELECTED DAY TASKS*/}
                <ol className="task-list">
                    {visibleTasks.map((myTask, index)=>{
                        const taskIndex=state.ulTasks.findIndex((t)=> t.task === myTask.task && t.date === myTask.date)
                        return(
                            <li key={index} className="task-item">
                            <input 
                                type="checkbox"
                                checked={myTask.completed}
                                onChange={()=>toggleCompleted(taskIndex)} 
                            />
                            <span style={{
                                    textDecoration:myTask.completed ? "line-through" : "none",
                                    marginLeft:"8px"
                                }}
                            >
                                {myTask.task}
                                {displayedTasks==="incomplete" && ` - ${myTask.date}`}
                            </span>
                            <button id="delete-btn" onClick={()=>deleteTask(taskIndex)} type="button"><FaTrash /></button>
                        </li>
                        )
                    })}
                </ol>
                <button 
                    id="FaPlus" 
                    onClick={()=>navigate('/addTaskspage')} 
                    type="button"
                >
                    <FaPlus/>
                </button>
            </div>
        </div>
    );
};

export default Todolist;