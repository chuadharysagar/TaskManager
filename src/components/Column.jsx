import React, { useMemo, useState } from 'react';
import './columns.css';
import Task from './Task';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import classNames from 'classnames';

const Column = ({ state }) => {
    const [text,setText] = useState("");
    const [open ,setOpen] = useState(false);
    const [drop , setDrop] = useState(false);

  // Memoize the filtered tasks to avoid recalculating them unnecessarily
  const tasks = useStore(
    (store) => store.tasks,
    shallow
  );

  // filter the task according to state to show it on respective columns
  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.state === state),
    [tasks, state]
  );

  const addTask = useStore((store)=>store.addTask);
  //  setting the drag and drop 
  const setDraggedTask = useStore((store)=>store.setDraggedTask);
  // what task is being draged 
  const draggedTask = useStore((store)=>store.draggedTask);
  const moveTask = useStore((store)=>store.moveTask);


  return (
    <div className={classNames("column",{drop:drop})}
    onDragOver={(e)=>{
      setDrop(true)
      e.preventDefault();}}
      
      onDragLeave={(e)=>{
        setDrop(false);
        e.preventDefault();
      }}
     
    onDrop={(e)=>{
      setDrop(false);
      moveTask(draggedTask,state)
      setDraggedTask(null);
    }}
    
    >
      <div className='titleWrapper'>
        <p>{state}</p>
        <button onClick={()=>setOpen(true)}>Add</button>
      </div>
      {filteredTasks.map((task, index) => (
        <Task title={task.title} key={index} />
      ))}
     {/* for the adding task  */}
     { open && (<div className='Modal'>
       <div className="modalContent">
        <input type="text" onChange={(e)=>setText(e.target.value)} value={text} />
        <button onClick={()=>{
          addTask(text,state);
          setText("");
          setOpen(false);
          }} 
          >Submit</button>
       </div>
     </div>)}
    
    </div>
  );
};

export default Column;
