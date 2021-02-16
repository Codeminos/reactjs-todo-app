import React from 'react'
import { RiCloseCircleLine } from 'react-icons/ri';
import { useTasksDispatch,useTasksState} from '../context/tasks';

export default function Archive(){
    const state = useTasksState();
    const archive =state.archive;

    const dispatch = useTasksDispatch();

    return  archive.map((todo, index) => (
        <div className="flex flex-row justify-between mx-1 border-2 px-3 py-2 rounded-lg"  key={index}>
            <div className="flex flex-row justify-between  space-x-10" key={todo.id} >
                <p>{todo.title}</p>
            </div>
            <div>
            <p>{todo.description}</p>
            </div>
            <div>
            <p>{todo.date}</p>
            </div>
            <div className="flex flex-row justify-between pl-5 space-x-5">
                <RiCloseCircleLine size={25} color="red" onClick={() =>  dispatch({type: 'DELETE_ARCHIVED', payload:{id:todo.id}})} />
            </div>
        </div>
    ))
}
