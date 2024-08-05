import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import axios from "axios";

// import { Container } from './styles';
interface Todo {
  userId:number, 
  id:number, 
  title: string,
   complete:boolean
  }

const Todos: React.FC = () => {
  const { todoId } = useParams();
  const [todos, setTodos] = useState<Todo[]>([])
  console.log("🚀 ~ todos:", todos)

  useEffect(()=>{
    axios("https://jsonplaceholder.typicode.com/todos")
    .then(response => setTodos(response.data))
  },[])

  const alteraStatus = (id:number) =>{
    setTodos(prevTodos => prevTodos.map((todo:Todo) => 
      todo.id === id 
      ? ({...todo, complete: !todo.complete}) 
      : todo))
  }
  return (
    <div>
      <Header />
      <h2 className="mb-4">Lista de Todos{todoId && ` - ID: ${todoId}`}</h2>
      <div>
        {todos?.sort((a:Todo) => a.complete ? -1 : 1).map((todo: Todo) => 
          (<div key={todo.id} className={`border ${todo.complete ? "bg-green-200" : "bg-red-200"} p-3 flex flex-col`}>
          <h5>{todo.title}</h5>
          <span>ID:{todo.id}</span>
          <span>Usuario:{todo.userId}</span>
          <span onClick={()=>alteraStatus(todo.id)}>{todo.complete ? "concluido" : "pendente"}</span>
        </div>))}
      </div>
    </div>
  );
};

export default Todos;
