import React,{useState,useEffect, useMemo} from 'react';
import Todo from './Todo';

function getTodoList(options,todoList) {
    if(options.completed){
        return todoList.filter((todo)=>{
            return todo.isCompleted;
        })
    }
    if(options.uncompleted){
        return todoList.filter((todo) =>{
            return todo.isCompleted === false;
        })
    }
    return todoList
}

export default function TodoList(props){
    const [isSelectAll,setIsSelectAll] = useState(false);
    const [todoList,setTodoList] = useState(props.todoList);
    function onSelectAllChange(){
        props.handleSelectAll(!isSelectAll);
        setIsSelectAll(!isSelectAll);
    }
    useEffect(()=>{
        props.todoList.every((todo)=>{
            return todo.isSelected;
        }) === true ? setIsSelectAll(true)  : setIsSelectAll(false);
    },[props.todoList])
    useMemo(()=>{
        setTodoList(getTodoList(props.options,props.todoList));
    },[props.options,props.todoList])
    return(
        <div className="todo-list">
           {props.todoList.length>0 &&   
                <div className={`action-select ${props.options.selected ? 'select--active' : ''}`}>
                    <button className={`action-select-all ${isSelectAll ? 'action--on' : ''}`}
                    onClick={onSelectAllChange}
                    >All</button>
                    <button className="action-delete" 
                        onClick={props.handleDeleteMany}
                    >Delete</button>
                    <button className="action-complete" onClick={()=> props.handleCompleteMany(true)}>Complete</button>
                    <button className="action-complete" onClick={()=> props.handleCompleteMany(false)}>Uncomplete</button>
                </div>
           }
            <ul>
               {todoList.map((todo) => {
                   return <Todo todo={todo} key={todo.id} 
                   isSelected={props.options.selected} 
                   delete={props.deleteTodo}
                   updateTodo={props.updateTodo}
                   isSelectAll={isSelectAll}
                   handleSelectTodo={props.handleSelectTodo}
                   handleCompleteTodo={props.handleCompleteTodo}
                   />
               })}
            </ul>
        </div>
    )
}