import { create } from "zustand"
import { devtools,persist } from "zustand/middleware";

//first create a store 
const store = (set) => ({
   //set of tasks to perform on the state 
   tasks: [],
   draggedTask: null,
   addTask: (title, state) => set((store) => ({ tasks: [...store.tasks, { title, state }] }),false,"addTask"),
   delteTask: (title) => set((store) => ({
      tasks: store.tasks.filter((task) => task.title !== title)
   })),
   setDraggedTask: (title) => set({ draggedTask: title }),
   moveTask: (title, state) => set(store => ({
      tasks: store.tasks.map(task => task.title === title ? { title, state } : task)
   })),
});

// warp it around the store to log the items each time 
const log = (config) => (set,get,api)=> config(
   (...args)=>{
      console.log(args);
      set(...args);
   },
   get,
   api,
)

export const useStore = create(persist(devtools(store),{name:"store"})); 