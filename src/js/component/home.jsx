import React, { useEffect, useState } from "react";

const Todolist = () => {
    const [tareas , setTareas] = useState([]); 
    const [nuevaTarea , setNuevaTarea] = useState(""); 
    const [tareaEditando , setTareaEditando] = useState(""); 

// Función que crea el usuario (POST)
async function crearUsuario() {

    const response = await fetch("https://playground.4geeks.com/todo/users/ADavid" , {
        method: "POST"
    } )

    if(!response.ok) {
        console.log("Hubo un error" , response.status , response.statusText);
    };

};



// Función que trae las tareas del usuario (GET)
async function traerTareas() {

    const response = await fetch("https://playground.4geeks.com/todo/users/ADavid" , {
        method: "GET"
    } )

    if(!response.ok) {
        console.log("Hubo un error" , response.status , response.statusText);
    };

    const data = await response.json();
    setTareas(data.todos);
};

// Función que nos elimina tareas del usuario (DELETE)
async function borrarTareas(item) {

    const response = await fetch(`https://playground.4geeks.com/todo/todos/${item.id}` , {
        method: "DELETE"
    } )

    if(!response.ok) {
        console.log("Hubo un error" , response.status , response.statusText);
    };
    traerTareas();
};


// Función que nos crea tareas del usuario (POST)
async function crearTareas() {

    const todo = {label: nuevaTarea,is_done: false};    

    const response = await fetch("https://playground.4geeks.com/todo/todos/ADavid" , {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(todo)
        
    } )

    if(!response.ok) {
        console.log("Hubo un error" , response.status , response.statusText);
    };

    traerTareas();
    setNuevaTarea("");
};


// Función que nos edita las tareas del usuario (PUT)
async function actualizarTareas(item) {

    const updateTodo = {... item , label: nuevaTarea};    

    const response = await fetch(`https://playground.4geeks.com/todo/todos/${item.id}` , {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(updateTodo)
        
    } )

    if(!response.ok) {
        console.log("Hubo un error" , response.status , response.statusText);
    };

    traerTareas();
    setNuevaTarea("");
    window.location.reload();
};

// Función para actualizar tarea
async function editarTarea(item) {
    setTareaEditando(item);
    setNuevaTarea(item.label);
};




console.log(tareas);

useEffect ( () => {
crearUsuario();
traerTareas();
} ,[]);



    return (
        <>
    
            <h1>TodoList de david</h1>

            <input 
                type="text" 
                placeholder="Escribe tu tarea aquí"
                onChange={(e)=>setNuevaTarea(e.target.value)}
                value={nuevaTarea}
            />
            <button className="btn btn-success" onClick={() => tareaEditando ? actualizarTareas(tareaEditando) : crearTareas()}>
                {tareaEditando ? "Actualizar tarea" : "Crear tarea"}
                </button>

            {tareas.map((item) => 
                <>
                    <h4 key={item.id}>{item.label}</h4>
                    <button className="btn btn-primary" onClick={()=>borrarTareas(item)}>Eliminar</button>
                    <button className="btn btn-danger" onClick={()=>editarTarea(item)}>Editar</button>
                </>
            )}
            
        </>
        
    );
};

export default Todolist;