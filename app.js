
//extraigo del documento el elemento con el id='formTask' y creo una escucha de evento
//en este caso el evento es un submit (cuando se hace click el botón del un formulario)
//cuando sucede ese evento se invoca a la función flecha
document.getElementById('formTask').addEventListener('submit',saveTask);
//función para guardar tareas
function saveTask(e){
  
    //el evento 'e' es capturado, es decir, la información que se coloco en el formulario y el envió
    
    //voy a capturar el titulo
    let title=document.getElementById('title').value;
    //capturo lo que se escribió en descripción
    let description=document.getElementById('description').value;
    
    //definimos un objeto, de forma abreviada, es lo mismos que escribir title:title y description:description
    const task = {
      title,
      description
    }
    
    //si no se ha almacenado una tarea nunca
    if(localStorage.getItem('tasks') === null) {
      let tasks = [];
      tasks.push(task);
      //guardamos las tareas en la memoria del navegador, si el navegador se cierra igual mantiene
      //en su memoria los elementos que se guardo, esto es posible por la API localStorage.
      //como argumento se le pasa dos datos: el nombre con el que vamos a almacenar y el nombre de lo que queremos que almacene
      localStorage.setItem('tasks',JSON.stringify(tasks));
      //JSON.stringify es un método para transformar un objeto en un string
  
    }else{
      //si ya tenemos guardada al menos una tarea, guardaremos una nueva pero antes transformamos la tarea en JSON
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      tasks.push(task);
      
      localStorage.setItem('tasks',JSON.stringify(tasks));
  
    }
    getTasks();
    document.getElementById('formTask').reset();
    //pero de forma predeterminada cuando hacemos click en guardar la aplicación se refresca, para evitarlo:
    e.preventDefault();

  
}
//función para mostrar tareas
function getTasks(){
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let tasksView = document.getElementById('tasks');
  tasksView.innerHTML="";
  for (let index = 0; index < tasks.length; index++) {
    let title=tasks[index].title;
    let description=tasks[index].description;
    tasksView.innerHTML+=`<div class='card mb-3'>
       <card class='card-body'><p>${title}  -  ${description}</p><a onclick="deleteTask('${title}')" class='btn btn-danger'>Eliminar</a></card>
    </div>`
    
  }

}

function deleteTask(title) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for (let index = 0; index < tasks.length; index++) {
    if(tasks[index].title===title){
      //este método elimina 1 elemento del indice index
      tasks.splice(index,1);
    }
    
  }
  //almacena todas las tareas nuevamente pero sin el item que se elimino
  localStorage.setItem('tasks',JSON.stringify(tasks));
  
  getTasks();
  
}

getTasks();
