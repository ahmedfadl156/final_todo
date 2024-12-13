class Node {
    constructor(todo) {
        this.todo = todo; 
        this.next = null; 
    }
}

class LinkedList {
    constructor() {
        this.head = null; 
        this.size = 0;  
    }

    add(todo){
        const newNode = new Node(todo);
        if(this.head == null)
        {
            this.head = newNode;
        }
        else{
            let current = this.head;
            while(current.next != null){
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }

    delete(index) {
        if (index < 0 || index >= this.size) {
            return; 
        }
        if (index === 0) { 
            this.head = this.head.next; 
        } else {
            let current = this.head;
            let prev = null;
            for (let i = 0; i < index; i++) {
                prev = current; 
                current = current.next; 
            }
                prev.next = current.next;
        }
        this.size--; 
    }

    completedTask(index){
        let current = this.head;
        for(let i = 0 ; i < index ; i++){
            current = current.next;
        }
        if(current){
            current.todo.completed = !current.todo.completed;
        }
        if (current.todo.completed) {
            current.todo.dueDate = null;
        }
        else {
            current.todo.dueDate = current.todo.originalDueDate;
        }
    }

    AllTasksArray() {
        const todos = [];
        let current = this.head;
        while (current) {
            todos.push(current.todo);
            current = current.next;
        }
        return todos;
    }
}


const todoListLinkedList = new LinkedList();

const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");
const dateInput = document.getElementById("date-input");



function createTodoItem(todo, index) {
    const todoId = "todo-" + index;
    const todoLI = document.createElement("li");
    todoLI.className = "todo-list";
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}" ${todo.completed ? "checked" : ""}>
        <label for="${todoId}" class="check-box">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
            </svg>
        </label>
        <input class="edit-input" type="text" value=" ${todo.text}" style="display: none;">
        <label for="${todoId}" class="list-tasks" style="${todo.completed ? 'text-decoration: line-through; color: var(--secondary-color);' : ''}">
            ${todo.text}
        </label>
        <span class="completed-label" style="${todo.completed ? 'color: rgb(0, 255, 21); margin-left: 10px; font-size: 12px;' : 'display: none;'}">
            Completed ✅
        </span>
        <span class="due-date ${getDueDateClass(todo.dueDate)}">
        ${todo.dueDate ? "Due: " + new Date(todo.dueDate).toLocaleDateString('en-EG', { timeZone: 'Africa/Cairo' }) : ""}
        </span>
        <button class="edit-button" data-index="${index}">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
            <path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg>
        </button>
        <button class="delete-button" data-index="${index}">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
        </button>
    `;

    const editButton = todoLI.querySelector(".edit-button");
    const editInput = todoLI.querySelector(".edit-input");
    const taskLabel = todoLI.querySelector(".list-tasks");

    editButton.addEventListener("click", () => {
        if (editInput.style.display === "none") {
            editInput.style.display = "inline";
            taskLabel.style.display = "none";
            editInput.focus();
            editButton.innerHTML = `<svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
            <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 
            85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/></svg>`;
        } else {
            editInput.style.display = "none";
            taskLabel.style.display = "inline";
            todo.text = editInput.value;
            taskLabel.textContent = editInput.value;
            editButton.innerHTML = ` <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
            <path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5
            22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg>`;
        }
    });

    return todoLI;
}

function updateTodoList() {
    todoList.innerHTML = "";
    const todosArray = todoListLinkedList.AllTasksArray();
    todosArray.forEach((todo, index) => {
        const todoItem = createTodoItem(todo, index);
        todoList.appendChild(todoItem);

        
        const deleteButton = todoItem.querySelector(".delete-button");
        deleteButton.addEventListener("click", () => {
            todoListLinkedList.delete(index);
            updateTodoList(); 
        });

        const checkbox = todoItem.querySelector("input[type='checkbox']");
        checkbox.addEventListener("change", () => {
            todoListLinkedList.completedTask(index);
            updateTodoList(); 
        });
    });
}

function getDueDateClass(dueDate) {
    if (!dueDate) return "";

    const now = new Date(); 
    const due = new Date(dueDate); 

    const diffHours = (due.getTime() - now.getTime()) / (1000 * 60 * 60); 

    return diffHours > 12 ? "green" : "red";
}


addButton.addEventListener("click", (e) => {
    e.preventDefault();
    const todoText = todoInput.value.trim();
    const dueDate = dateInput.value;

    if (todoText) {
        const todo = { text: todoText, completed: false, dueDate: dueDate , originalDueDate: dueDate };
        todoListLinkedList.add(todo);
        updateTodoList();
        todoInput.value = "";
        dateInput.value = "";
    }
});

updateTodoList();

    //function saveTodosToLocalStorage() {
    //     const todosArray = todoListLinkedList.AllTasksArray();
    //     localStorage.setItem("todos", JSON.stringify(todosArray));
    // }
    
    // function loadTodosFromLocalStorage() {
    //     const todos = JSON.parse(localStorage.getItem("todos"));
    //     if (todos) {
    //         todos.forEach(todo => todoListLinkedList.add(todo));
    //     }
    //     updateTodoList();
    // }
    
    // addButton.addEventListener("click", (e) => {
    //     e.preventDefault();
    //     const todoText = todoInput.value.trim();
    //     if (todoText) {
    //         const todo = { text: todoText, completed: false };
    //         todoListLinkedList.add(todo);
    //         saveTodosToLocalStorage();
    //         updateTodoList();
    //         todoInput.value = "";
    //     }
    // });
    
    // updateTodoList();
    // window.onload = loadTodosFromLocalStorage;
    
