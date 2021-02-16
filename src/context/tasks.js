import React, {createContext, useReducer, useContext} from 'react';

const TasksStateContext = createContext();
const TasksDispatchContext = createContext();

export const initialState = {
    todos: [],
    archive: [],
    edit: {
        id: null,
        value: {}
    }
}

const tasksReducer = (initialState, action) => {
    switch (action.type) {
        case 'CREATE':
            if(!action.payload.title || /^\s*$/.test(action.payload.title)){
                return;
            }
            
    
            return {
                ...initialState,
                todos: [action.payload,...initialState.todos]
            }
        case 'UPDATE': 
            initialState.todos.forEach(task => {
                if(task.id === action.payload.id){
                    task.title = action.payload.value.title;
                    task.description = action.payload.value.description;
                    task.date = action.payload.value.date;
                    task.tags = [...action.payload.value.tags];
                    task.priority = action.payload.value.priority;
                }
            });
            
            return {
                ...initialState,
            }
        case 'DELETE':
           const removedArr=[...initialState.todos].filter(todo => todo.id !== action.payload)
            return {
                ...initialState,
                todos: [...removedArr]
            }
        case 'DELETE_ARCHIVED':
            const removedArchived=[...initialState.archive].filter(task => task.id !== action.payload.id)
            return {
                ...initialState,
                archive: [...removedArchived]
            }

        case 'ARCHIVE_TODO':
            let archivedTodo = {};
            initialState.todos.forEach(todo => {
                if(todo.id === action.payload.id){
                    archivedTodo = {
                        id:todo.id,
                        title: todo.title,
                        description: todo.description,
                        date: todo.date,
                        tags: todo.tags.size !== 0 ? todo.tags : [],
                        priority: todo.priority
                    };
                }
            });
            const newTodos = [...initialState.todos].filter(todo => todo.id !== archivedTodo.id)
            return {
                ...initialState,
                todos: [...newTodos],
                archive: [archivedTodo, ...initialState.archive]
            }
        

        default : 
        throw new Error (`Unknown action type: ${action.type}` )
    }
}

export const TasksProvider = ({children}) => {
    const [state, dispatch] = useReducer(tasksReducer, initialState)

    return (
        <TasksDispatchContext.Provider value={dispatch}>
                    <TasksStateContext.Provider value={state}>
                        {children}
                    </TasksStateContext.Provider>
        </TasksDispatchContext.Provider>

    )
    
}

export const useTasksState = () => useContext(TasksStateContext);
export const useTasksDispatch = () => useContext(TasksDispatchContext)

