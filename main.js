import './style.css'
import {createDialogWindow} from "./counter.js";


const btn =  document.getElementById('add-btn');
btn.onclick = addTask;
// btn.addEventListener('click', addTask);

let requestURL = "https://jsonplaceholder.typicode.com/todos";
let request = new XMLHttpRequest();
request.open("GET", requestURL);

request.responseType = "json";
request.send();

request.onload = () => {
    let listOfTasks = request.response;
    createTasks(listOfTasks);
}

function createTasks(arrayOfObjects) {

    for (let element in arrayOfObjects) {

        let li = document.createElement("li");
        let oneObject = arrayOfObjects[element];
        let nameTask = "⠀" + oneObject.title[0].toUpperCase() +
            oneObject.title.slice(1);
        let task = document.createTextNode(nameTask);

        li.className = "user" + oneObject.userId;

        let input = document.createElement("input");
        input.type = "checkbox";
        input.checked = oneObject.completed;

        li.appendChild(input);
        li.appendChild(task);

        li.id = oneObject.id;

        li.draggable = true;
        //li.addEventListener("dragstart", (event) =>
        //dragstartHandler);

        document.getElementById("mainSpace").appendChild(li);

        createDeleteButton(li);
        createDialogButton(li, nameTask);

    }

}

function addTask() {

    let li = document.createElement("li");
    let inputValue = document.getElementById("inputNameTask").value;
    let nameTask = document.createTextNode("⠀" + inputValue[0].toUpperCase() +
        inputValue.slice(1));

    let input = document.createElement("input");
    input.type = "checkbox";

    li.appendChild(input);
    li.appendChild(nameTask);

    if (inputValue === "") {
        alert("Нужно что-то ввести!");
    } else if (inputValue.length > 45) {
        alert("Too many symbols! Try again");
    } else {
        document.getElementById("mainSpace").appendChild(li);
    }

    document.getElementById("inputNameTask").value = "";

    createDeleteButton(li);
    createDialogButton(li);
}

function createDeleteButton (parent) {

    let deleteButton = document.createElement("button");
    let symbolOfDelete = document.createTextNode("\u2716");
    deleteButton.className = "delete";
    deleteButton.appendChild(symbolOfDelete);
    parent.appendChild(deleteButton);

    deleteButton.onclick = deleteTask;
}

function deleteTask() {
    let div = this.parentElement;
    div.style.display = "none";
}

function createDialogButton(parent, nameParent) {

    let dialogButton = document.createElement("button");
    let symbolOfDialog = document.createTextNode("\u270E");
    dialogButton.className = "dialogButton";
    dialogButton.id = "dialogButton" + parent.id;
    dialogButton.appendChild(symbolOfDialog);
    parent.appendChild(dialogButton);

    createDialogWindow(parent, dialogButton, nameParent);
}

/*function dragstartHandler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("application/x-moz-node", ev.target.id);
    ev.dataTransfer.effectAllowed = "move";
    console.log(1)
}

function dragoverHandler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
    console.log(2)
}

function dropHandler(ev) {
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const data = ev.dataTransfer.getData("application/x-moz-node");
    ev.target.appendChild(document.getElementById(data));
    console.log(3)
}*/