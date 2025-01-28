import { create } from "zustand"

//first create a store 
const store = (set) => ({
   //set of tasks to perform on the state 
   tasks: [{ title: 'Test task', state: "ONGOING" }],
   draggedTask: null,
   addTask: (title, state) => set((store) => ({ tasks: [...store.tasks, { title, state }] })),
   delteTask: (title) => set((store) => ({
      tasks: store.tasks.filter((task) => task.title !== title)
   })),
   setDraggedTask: (title) => set({ draggedTask: title }),
   moveTask: (title, state) => set(store => ({
      tasks: store.tasks.map(task => task.title === title ? { title, state } : task)
   })),
});

export const useStore = create(store); 