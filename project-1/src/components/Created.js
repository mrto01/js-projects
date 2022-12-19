import React,{useState} from 'react';

export default function Created(props){
    const [isfocused,setIsFocused] = useState(false);
    const [title,setTitle] = useState('');
    function handleFocused(){
        setIsFocused(true);
    }
    function handleBlur(){
        setIsFocused(false);
    }
    function handleCreateEvent(){
        props.createTodo(title);
        setTitle('');
    }
    return(
        <div className="todo-create">
            <div className="input-form">
                {
                    isfocused===true && 
                    <>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    </>
                }
                <input type="text" name="todo" placeholder="Add item here..." 
                onFocus={handleFocused} 
                onBlur={handleBlur}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                    e.keyCode === 13 && title!=='' && handleCreateEvent() }}
                value={title}
                />
            </div>
            <button className="add-btn" 
            onClick={() => {
                title !=='' && handleCreateEvent()}}
            >Create</button>
        </div>
    )
}