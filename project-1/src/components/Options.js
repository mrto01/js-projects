

export default function Options(props){
    const options = props.options;
    const onChangeOption = props.onChangeOption;
    const optionsClone = {
        total:false,
        uncompleted:false,
        completed:false,
        selected:false,
    }
    return(
        <div className="todo-option">
            <div className={`todo-total ${options.total ? 'active' : ''}`}
            onClick={()=>onChangeOption(Object.assign(optionsClone,{total:true}))}
            >Items: {props.total}</div>
            <div className={`todo-uncompleted ${options.uncompleted ? 'active' : ''}`}
            onClick={()=>onChangeOption(Object.assign(optionsClone,{uncompleted:true}))}
            >Uncompleted: {props.unCompleted}</div>
            <div className={`todo-completed ${options.completed ? 'active' : ''}`}
            onClick={()=>onChangeOption(Object.assign(optionsClone,{completed:true}))}
            >Completed: {props.completed}</div>
            <div className={`todo-selection ${options.selected ? 'active' : ''}`}
            onClick={()=>onChangeOption(Object.assign(optionsClone,{selected:true}))}
            >Select </div>
        </div>
    )
}