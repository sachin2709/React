import { useEffect, useState } from "react";
import { TodoProvider } from "./context";
import { TodoForm, TodoItem } from "./components";

function App() {
  const [todos, setTodos] = useState([]);



  useEffect(()=>{

   const todosLocal=JSON.parse(localStorage.getItem("todos"))

   if(todosLocal && todosLocal.length>0){
      setTodos(todosLocal)
   }


  },[])


  useEffect(()=>{

 localStorage.setItem("todos",JSON.stringify(todos))

 
  },[todos])

  const addTodos = (todo) => {
    // In setTodos we have access to a callback function and inside that callback we have access to previous state of that variable
    // We used spread operator to spread the elements of objects as well as array

    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodos = (todo, id) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo)=>prevTodo.id!==id)
     
    );
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>prevTodo.id===id?{...prevTodo,completed:!prevTodo.completed}:prevTodo)
    );
  };

  return (
    <TodoProvider
      value={{ todos, deleteTodo, addTodos, updateTodos, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm/>
            </div>
          <div className="flex flex-wrap gap-y-3">

            {todos.map((todo)=>(

              <div  key={todo.id}
              
              className=" w-full"
              
              >

                  <TodoItem todo={todo}/>

              </div>
            ))}

            {/*Loop and Add TodoItem here */}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
