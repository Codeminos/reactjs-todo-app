import React,{useState} from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import {BiArchiveIn} from 'react-icons/bi';
import {useTasksState,useTasksDispatch} from '../context/tasks';
import {TodoForm} from '../components/TodoForm';

export const Todo = ({filteredArray}) => {
    
    const tasksState = useTasksState();
    const todos = tasksState.todos ? tasksState.todos : [];
    const dispatch = useTasksDispatch();

    const [edit, setEdit] = useState({
        id: null,
        value: {}
    });

    

    const submitUpdate = value => {
        dispatch({type: 'UPDATE', payload: {id:edit.id, value: value}})
        setEdit({
            id: null,
            value: {}
        });
    };

    if (edit.id) {
        return <div className="min-w-1/4 max-w-full flex flex-col justify-center">
            <TodoForm edit={edit} onSubmit={submitUpdate} btnText="Update"/>
            
        </div> 
    }

    return <>
            { filteredArray.length !== 0 && <div className="min-w-3/4 min-h-64 max-h-80 bg-gray-200 bg-opacity-30 border-2 border-gray-200 ">
           
           <div className="mt-2 overscroll-auto">
               {
                   filteredArray.map((todo, index) => (
                       <div className="min-w-3/4 flex flex-row bg-white justify-between mx-1 border-2 px-3 py-2 rounded-lg" key={index}>
                           <div className="flex flex-row flex-1 justify-between  space-x-10" key={todo.id} >
                               <p>{todo.title}</p>
                           </div>
                           <div className="flex-1">
                           <p>{todo.description}</p>
                           </div>
                           <div className="flex-1">
                           <p>{todo.priority}</p>
                           </div>
                           <div className="flex-1">
                           <p>{todo.date}</p>
                           </div>
                           <div className="flex-1">
                               <div className="flex justify-start">
                                   {
                                       todo.tags.size !== 0 && todo.tags.map((tag, index) => (
                                           <div className="border-2 rounded-lg border-gray-400 mr-2" key={index}>
                                               <p className="px-1 py-1 text-sm">{tag}</p>
                                           </div>
                                       ))
                                   }
                               </div>
                           </div>
                           <div>
                               <div className="flex flex-row justify-between pl-5 space-x-5">
                                   
                                   <RiCloseCircleLine size={25} color="red" onClick={() => dispatch({type: 'DELETE', payload:todo.id})} />
                                   <TiEdit size={25} color="green" onClick={() => setEdit({id:todo.id, value: todo})} />
                                   <BiArchiveIn size={25} color="blue" onClick={() => dispatch({type: 'ARCHIVE_TODO', payload: {id: todo.id }})}/>
                               </div>
                           </div>
                       </div>
                   ))
               }
           </div>
           
       
   </div>
}
</>
    
            
    
}
