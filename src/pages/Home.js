import React from 'react';
import {useAuthDispatch} from '../context/auth';
import {TasksList} from '../components/TasksList';
import {Link} from 'react-router-dom'

export default function Home() {


    const dispatch = useAuthDispatch();

    const handleSignOut = () => {
        dispatch({type: 'LOGOUT'});
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token')
    }

    return (
      <div className="min-h-screen bg-wood">
        <div >
          <div className="flex flex-row absolute top-0 left-0 mt-3 justify-center w-32 text-center text-white font-semibold bg-indigo-600 rounded-lg px-2 py-2 ml-5">
                  <Link to="/archive">Archive</Link>  
          </div>
          <button onClick={handleSignOut} className="group absolute top-0 right-0 mt-3 mr-3  w-1/8 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Sign out
          </button>  
         
        </div>
        <div >
        <TasksList/>
        </div>
      </div>
    )
}
