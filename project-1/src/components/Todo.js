import {useState} from 'react';

export default function Todo(props){
    const [isHovering,setIsHovering] = useState(false);
    const [isEditing,setIsEditing] = useState(false);
    function handleChangeSelect(){
        
    }
    const isSelected = props.todo.isSelected;
    return(
        <li className="todo-item"
            onMouseOver={()=>setIsHovering(true)}
            onMouseLeave={()=>setIsHovering(false)}
            >
                {props.isSelected && <input className="item-selection" type="checkbox" checked={isSelected}
                onChange={handleChangeSelect}
                onClick={() => props.handleSelectTodo(props.todo.id,!isSelected)}
                />}
                <p className={props.todo.isCompleted ? 'completed' : ''} suppressContentEditableWarning={true} contentEditable={isEditing} 
                onDoubleClick={()=>setIsEditing(true)}
                onBlur={(e)=>{
                    props.updateTodo(props.todo.id,e.target.innerText);
                    setIsEditing(false);
                }}
                >{props.todo.title}</p>
                {isHovering===true &&
                    <div className="btn-control-todo-item">
                        {isEditing ?
                            <button className="edit-btn" onClick={()=>setIsEditing(false)}>OK</button>:
                           <>
                            <button className="complete-btn"
                            onClick={()=>{props.handleCompleteTodo(props.todo.id,!props.todo.isCompleted)}}
                            >{props.todo.isCompleted ? 'Uncomplete' : 'Complete'}</button>
                            <button className="delete-btn" onClick={()=>props.delete([props.todo.id])}>Delete</button>
                           </>
                        }
                    </div>
                }
                
            </li>
       )
}