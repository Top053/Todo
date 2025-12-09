import { useLocalStorage } from "usehooks-ts";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";


function AddTodo(){
    const[state, setState]=useLocalStorage('tasks',{
        ulTasks:[],
        newTask:"",
        newDate:""
    });

    function shownewTask(event){
        setState({
            ...state,
            newTask:event.target.value
        });
    };
    function addnewTask(){
        if(state.newTask.trim()!=="" && state.newDate!==""){
            setState({
                ...state,
                ulTasks:[...state.ulTasks,
                    {task:state.newTask, date:state.newDate, completed:false}],
                newTask:"",
                newDate:""
            });
        };
        navigate('/')
    };
    function handleDatechange(event){
        setState({
            ...state,
            newDate:event.target.value
        });
    };
    function submitEnter(e){
        if(e.key==="Enter"){
            addnewTask()
        }
    }
    const navigate=useNavigate();
   
    return(
        <div>
            <div className="container">
                <button
                    onClick={()=>navigate('/')} 
                    type="button"
                    style={{borderRadius:"50px", border:"none"}}
                >
                    <FaArrowLeft/>
                </button>
                
                <div className="task-input">
                    <h1>Add New Task</h1>
                    <label style={{marginBottom:"20px"}}>
                        Date
                        <input className="input" 
                            onChange={handleDatechange} 
                            type="date" 
                            value={state.newDate} 
                        />
                    </label>
                    <label>
                        Task
                        <input className="input" 
                            onKeyDown={submitEnter}
                            onChange={shownewTask} 
                            type="text" 
                            value={state.newTask} 
                        />
                    </label>
                    <button className={"addButton"} onClick={addnewTask} type="button">Add</button>
                </div>
            </div>
        </div>
    );
};

export default AddTodo;