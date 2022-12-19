import Options from './components/Options';
import Created from './components/Created';
import TodoList from './components/TodoList';
import {useState,useEffect} from 'react';
import {v4 as id} from 'uuid';
import './App.css';
function App() {
  const [options,setOptions] = useState({
    total:true,
    uncompleted:false,
    completed:false,
    selected:false,
  })
  const [todoList,setTodoList] = useState(JSON.parse(localStorage.getItem('TODO-APP')) || []);
  useEffect(()=>{
    localStorage.setItem('TODO-APP',JSON.stringify(todoList));
  },[todoList])
  function handleCreateTodo(title){
    setTodoList([...todoList,{id:id(),title:title,isCompleted:false,isSelected:false}]);
  }
  function handleOptionActive(options){
    setOptions(options);
    handleSelectAll(false);
  }
  function handleDelete(list){
    const newTodoList = todoList.filter((todo)=>{
      return todo.id.includes(list) === false;
    })
    setTodoList(newTodoList);
  }
  function handleDeleteMany(){
    const newTodoList = todoList.filter((todo)=>{
      return todo.isSelected === false;
    })
    setTodoList(newTodoList);
  }
  function handleCompleteMany(isCompleted){
    const newTodoList = todoList.filter((todo)=>{
      if(todo.isSelected){
        todo.isCompleted = isCompleted;
        return todo;
      }
      return todo;
    })
    setTodoList(newTodoList);
  }
  function handleUpdateTodo(id,title){
     const todoListUpdate = todoList.map((todo)=>{
       if(todo.id === id){
         todo.title = title;
         return todo;
       }
       return todo;
     })
      setTodoList(todoListUpdate);
  }
  function handleSelectTodo(id, isChecked) {
    const todoListUpdate = todoList.map((todo)=>{
      if(todo.id === id){
        todo.isSelected = isChecked;
        return todo;
      }
      return todo;
    })
     setTodoList(todoListUpdate);
  }
  function handleCompleteTodo(id, isCompleted) {
    const todoListUpdate = todoList.map((todo)=>{
      if(todo.id === id){
        todo.isCompleted = isCompleted;
        return todo;
      }
      return todo;
    })
     setTodoList(todoListUpdate);
  }
  function handleSelectAll(isSelectAll){
    const newTodoList = todoList.map((todo)=>{
      todo.isSelected = isSelectAll;
      return todo;
    })
    setTodoList(newTodoList);
  }
  return (
    <div className="App">
      <Options options={options} onChangeOption={handleOptionActive} 
      total={todoList.length}
      completed={todoList.filter(todo => todo.isCompleted===true).length}
      unCompleted={todoList.filter(todo => todo.isCompleted===false).length}
      />
      <Created createTodo={handleCreateTodo}/>
      <TodoList 
      options={options} 
      todoList={todoList} 
      deleteTodo={handleDelete} 
      updateTodo={handleUpdateTodo}
      handleSelectAll={handleSelectAll}
      handleSelectTodo={handleSelectTodo}
      handleDeleteMany={handleDeleteMany}
      handleCompleteTodo={handleCompleteTodo}
      handleCompleteMany={handleCompleteMany}
      />
    </div>
  );
}

export default App;
