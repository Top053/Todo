import AddTodo from "./addTaskspage";
import Todolist from "./Taskspage"
import { Routes,Route } from "react-router-dom";

function App(){
  return(
    <Routes>
      <Route path="/" element={<Todolist/>}/>
      <Route path="/addTaskspage" element={<AddTodo/>}/>
    </Routes>
  );
}

export default App;