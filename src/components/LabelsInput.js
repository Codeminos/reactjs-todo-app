import React from "react";
const LabelsInput = (props) => {
    const [tags, setTags] = React.useState([]);
    const addTags = event => {
        if(event.key === " " && event.target.value !== ""){
            setTags([...tags, event.target.value]);
            props.selectedTags([...tags, event.target.value])
            event.target.value = "";
        }
    }
    const removeTags = index => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    }
    return (
        <div className="tags-input">
            
            <input
                type="text"
                onKeyUp={event => addTags(event)}
                placeholder="Press space to add tags"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
            />
        </div>
    );
};
export default LabelsInput;