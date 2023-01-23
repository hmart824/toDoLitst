const taskInput = document.getElementById('task-input');
let list = document.querySelector('.context ul');
let taskCounter = document.querySelector('.info span:nth-child(2)');
let completedTask = document.querySelector('.info span:last-child');
let title = '';
let task = {};
let completedTasks = [];


//handle events
const handleInputs = (e)=>{

    //Handle add icon click
    if(e.target.id === 'add-icon' || e.key === 'Enter'){
        title = taskInput.value;
        if(localStorage.getItem('tasks') === null){
            localStorage.setItem('tasks' , JSON.stringify([]));
            console.log('success')
        }  
        if(!title){
            showNotification('Enter something to add');
            return;
        }
        task = {
            title,
            id: Date.now().toString(),
            completed: false
        }
        addTask(task);
        taskInput.value = "";
    }

    let tasks = JSON.parse(localStorage.getItem('tasks'));
    //Handle delete icon click
    if(tasks?.length > 0){
        if(e.target.dataset.class === 'delete'){
            const taskId = e.target.dataset.id;
            deleteTask(taskId);
        }
    }

    //Handle checkbox click
    if(tasks?.length > 0){
        if(e.target.className === 'custom-checkbox'){
            const taskId = e.target.id;
            toggleList(taskId);
        }
    }
}


//Add the tasks
const addTask = (task)=>{
    if(task){
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks' , JSON.stringify(tasks));
        render();
        showNotification('Task added successfully');
        return;
    }
}

//Handle all the notifications
const showNotification = (text)=>{
    alert(text);
}


//Render the tasks in the DOM
const render = ()=>{
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    completedTasks = [];
    list.innerHTML = "";
    if(tasks?.length > 0){
        tasks.forEach((el)=>{
         let li = document.createElement('li');
        li.innerHTML = `
        <input type="checkbox" name="check" id="${el.id}" class="custom-checkbox" ${el.completed ? "checked" : ''}/>
        <label for="${el.id}">${el.title}</label>
        <i class="bi bi-x-circle" data-class="delete" data-id="${el.id}"></i>
    `
        list.append(li);
        if(el.completed === true){
            completedTasks.push(el);
        }
    });
    }
    taskCounter.innerText = tasks?.length;
    completedTask.innerText = completedTasks?.length ;
}
render();

//Delete the task 
const deleteTask = (taskId)=>{
    if(taskId){
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        let newTasks = tasks.filter((el)=>{
            return el.id != taskId;
        })
        localStorage.setItem('tasks' , JSON.stringify(newTasks));
        render();
        showNotification('Task deleted successfully.')
    }

}

//Handle completed and checked tasks
const toggleList = (taskId)=>{
    completedTasks = [];
    if(taskId){
        let updatedTasks = JSON.parse(localStorage.getItem('tasks'));
        updatedTasks.forEach((el)=>{
            if(el.id === taskId){
                el.completed = !el.completed;
                if(el.completed === true){
                    showNotification('Task completed sucessfully')
                }
            }
            if(el.completed === true){
                completedTasks.push(el);
            }
        })
        localStorage.setItem("tasks" , JSON.stringify(updatedTasks))
    }
    completedTask.innerText = completedTasks.length ;
}

document.addEventListener("click" , handleInputs);
document.addEventListener('keypress' ,handleInputs);
