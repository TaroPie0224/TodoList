import React, {useState} from 'react';
import './App.css';

let i = 0;

function Todo({todo, index, completeTodo, removeTodo}){
  return <div class = "todo-item" style = {{textDecoration:todo.isCompleted?'line-through':''}}>
    {todo.text}
    {/* 为什么这里要使用箭头函数？ */}
    <button onClick={()=>{completeTodo(index)}}>完成</button>  
    <button onClick={()=>{removeTodo(index)}}>X</button>
    </div> 
}

//解构addTodo属性
function TodoForm({addTodo}){
  const[value, setValue] = useState('') //定义一个value用来存储用户输入的内容
  //表单提交的时候调用Todo清空value
  const handleSubmit = e => {
    e.preventDefault(); //阻止页面刷新？
    if(!value) return; //？
    addTodo(value); //调用addTodo，添加新的任务
    setValue('') //清空value
  }
  return <form onSubmit={handleSubmit}>
    <input type = "text" placeholder='add todo ...' value = {value} onChange = {e=>setValue(e.target.value)}/>
  </form>
  //绑定value
}
 
function App() {
  const [todos, setTodos] = useState([
    {text:'sleep', isCompleted:true},
    {text:'eat', isCompleted:false}
  ])
  const addTodo = text => {
    const newTodos = [...todos, {text}]
    setTodos(newTodos)
  }
  //定义完成任务和删除任务的方法
  const completeTodo = index => {
    const newTodos = [...todos]
    newTodos[index].isCompleted = true;
    setTodos(newTodos)
  }
  const removeTodo = index => {
    const newTodos = [...todos]
    newTodos.splice(index, 1) //从索引开始删除第一个元素
    setTodos(newTodos)
  }

  return (
    <div className="App">
      <h1>todos</h1>
      <div class="todo-list"> 
      {
        todos.map((todo, index)=>{
          console.log(todo);
          console.log(index);
          /* 为什么这里只渲染了两个元素，却调用了四次？ */
          console.log("times:" + i++);
          return <Todo key = {index} todo = {todo} index = {index} completeTodo = {completeTodo} removeTodo = {removeTodo}></Todo>
        })
      }
      </div>
      {/* 定义TodoForm组建用来添加todo项，addTodo属性用来添加todo */}
      <TodoForm addTodo = {addTodo}></TodoForm>
    </div>
  );
}

export default App;
