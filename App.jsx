import { useState, useEffect } from 'react';
import './App.css';
import TaskItem from './components/TaskItem';

function App() {
  const [newTask, setNewTask] = useState("");
  const [myTasks, setMyTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [deletedTasks, setdeletedTasks] = useState([]);

  const backendURL = "http://localhost:5000/api/tasks";

  useEffect(() => {
    refreshTasks();
  }, []);

  function refreshTasks() {
    fetch(backendURL)
      .then(res => res.json())
      .then(data => {
        const completed = data.filter(task => task.is_completed);
        const pending = data.filter(task => !task.is_completed);
        setCompletedTasks(completed);
        setMyTasks(pending);
      });
  }

  function handleInput(e) {
    setNewTask(e.target.value);
  }

  function addTask()
  {
    setMyTasks(prev=>[...prev, newTask])
    console.log(myTasks);
    setNewTask("")
  }
function deleteTask(taskName) {
  let afterDeletionTasks = myTasks.filter(x => x !== taskName);
  setMyTasks(afterDeletionTasks);
  setdeletedTasks(prev => [...prev, taskName]); 
  console.log("deleted Tasks: ", deletedTasks);
}


    function completeTask(taskName){
    let completedTask= myTasks.filter(x=>x==taskName)
    let afterFiltering=myTasks.filter(x=>x!=taskName)
    setMyTasks(afterFiltering)
    setCompletedTasks(prev=>[...prev,completedTask[0]]);
    console.log("Completed Tasks: ",completedTasks)
  }
 return (
    <div className='main-body d-flex justify-content-center align-items-center'>
      <div className='todo-list-mainDiv'>
        <h3>My To do List</h3>

        <div>
          <div className='todo-task-input-div'>
             <div className="form-floating w-75">
              <input type="text" className="form-control" id="floatingInput"  placeholder="Todo task" onChange={(e)=>{
                handleInput(e)
              }} value={newTask}/>
              <label htmlFor="floatingInput">Todo-task</label>
           </div>
             <button className='btn btn-primary' id='add-button' onClick={() => {addTask()}}>+</button>
          </div>
          <h5>To be completed</h5>
          <u1 className='tasks-list'>
            {
              myTasks.map((task,index)=>
              <TaskItem taskName={task} key={index} deleteTask={deleteTask} completeTask={completeTask}/>
              )
            }
          </u1>
          <hr/>
          <br/>
         <h5>completed Tasks</h5>
          <u1 className='tasks-list'>
            {
              completedTasks.map((task,index)=>
              <TaskItem taskName={task} key={index} deleteTask={deleteTask} completeTask={completeTask}/>
              )
            }
          </u1>
        </div>
        </div>
        </div>
  )
}

export default App;

