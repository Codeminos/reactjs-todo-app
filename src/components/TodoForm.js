import React,{useState,useRef} from 'react'
import LabelsInput from '../components/LabelsInput';

export const TodoForm = (props) => {

    const [title, setTitle] = useState(props.edit ? props.edit.value.title : '');
    const [description, setDescription] = useState(props.edit ? props.edit.value.description : '');
    const [date, setDate] = useState(props.edit ? props.edit.value.date : new Date());
    const [todoTags,setTodoTags] = useState([]);
    const [priority, setPriority] = useState('normal');
    const [dateError, setDateError] = useState(null);
    const [clearTags, setClearTags] = useState(false);

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const dateRef = useRef(null);


    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            title: title,
            description: description,
            date: date,
            tags: [...todoTags],
            priority: priority
        });

        setClearTags(true);
        setTitle('');
        setDescription('');
        setDate('');
        setTodoTags([]);
        setPriority('normal')

    }

    const selectedTags = newTags => {setTodoTags([...newTags])};

    return (
        <div className="min-w-1/4 max-w-full flex flex-col justify-center">
            <p className="text-white font-bold">Add a new TODO:</p>
            <form className=" space-y-2" action="#" method="POST" onSubmit={handleSubmit}>
                <input type="hidden" name="remember" value="true"/>
                <div className=" rounded-md shadow-sm space-y-px">
                    <div >
                        <label htmlFor="title" className="sr-only">Title</label>
                        <input id="title" value={title} ref={titleRef} onChange={event => setTitle(event.target.value)} name="title" type="text"  required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Task title..."/>
                    </div>
                    <div>
                        <label htmlFor="description" className="sr-only">Description</label>
                        <input id="description" value={description} ref={descriptionRef} onChange={event => setDescription(event.target.value)} name="description" type="text"  required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Task description..."/>
                    </div>
                    <div>
                        <label htmlFor="date" className="sr-only">Date</label>
                        <input 
                            id="date" 
                            value={date} 
                            ref={dateRef} 
                            onChange={event => {
                                const selectedDate = new Date(event.target.value);
                                const day1 = selectedDate.getDate()
                                const today = new Date();

                                if(day1 < today.getDate()){
                                    setDateError('Task date cannot be in past');
                                    return;
                                }
                                setDate(event.target.value)
                                setDateError(null)
                                console.log(day1)
                            }} 
                            name="date" 
                            type="date"  
                            required 
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                            placeholder="Email address"
                        />
                        {dateError && <p className="text-red-500 text-xs bg-white px-1 py-1 mb-1 rounded">{dateError}</p>}
                    </div>
                    <div >
                        <LabelsInput selectedTags={selectedTags} clearTags={clearTags}/>
                    </div>
                    <div>
                        <select value={priority} onChange={event => setPriority(event.target.value)}  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                            <option value="normal">Normal</option>
                            <option value="important">Important</option>
                            <option value="urgent">Urgent</option>
                        </select>
                    </div>
                    <div>
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                       {props.btnText}
                    </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
