import React from 'react'
import './task.css'
import classNames from 'classnames';
import { useStore } from '../store';
import trash from '../assets/trash-icon.svg'


const Task = ({title}) => {

 const task = useStore((store)=> 
   store.tasks.find((task)=>task.title==title));

   const setDraggedTask = useStore((store)=>store.setDraggedTask);

 const deleteTask = useStore((store)=>store.delteTask);

  return (
    <div className='task' draggable
    onDragStart={()=>{setDraggedTask(task.title)}}
    >
      <div>{task.title}</div>
      <div className='bottomWrapper'>
         <div><img src={trash} alt="Delete button" 
         onClick={()=>deleteTask(task.title)}
         /></div>
         <div className={classNames('status',task.state)}>{task.state}</div>
      </div>
    </div>
  )
}

export default Task