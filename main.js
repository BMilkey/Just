import './style.css'
import {setUser} from "./counter.js";


const btn =  document.getElementById('add-btn');
btn.onclick = addTask;

const priority =  document.getElementById('priority');
priority.ondrop = dropHandler;
priority.ondragover = dragoverHandler;
priority.ondragstart = dragstartHandler;

const other =  document.getElementById('other');
other.ondrop = dropHandler;
other.ondragover = dragoverHandler;
other.ondragstart = dragstartHandler;

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

        let li = document.createElement("LI");
        let oneObject = arrayOfObjects[element];
        let nameTask = "⠀" + oneObject.title[0].toUpperCase() +
            oneObject.title.slice(1);
        let task = document.createTextNode(nameTask);

        li.className = oneObject.userId;

        let input = document.createElement("INPUT");
        input.type = "checkbox";
        input.checked = oneObject.completed;

        li.appendChild(input);
        li.appendChild(task);

        li.id = oneObject.id;

        li.draggable = true;

        document.getElementById("mainSpace").appendChild(li);

        createDeleteButton(li);
        createDialogButton(li, nameTask);

    }

}

function addTask() {

    let li = document.createElement("LI");
    let inputValue = document.getElementById("inputNameTask").value;
    let nameTask = document.createTextNode("⠀" + inputValue[0].toUpperCase() +
        inputValue.slice(1));

    let input = document.createElement("INPUT");
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

    let deleteButton = document.createElement("BUTTON");
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

    let dialogButton = document.createElement("BUTTON");
    let symbolOfDialog = document.createTextNode("\u270E");
    dialogButton.className = "dialogButton";
    dialogButton.id = "dialogButton" + parent.id;
    dialogButton.appendChild(symbolOfDialog);
    parent.appendChild(dialogButton);

    setUser(parent, dialogButton, nameParent);
    //createDialogWindow(parent, dialogButton, nameParent);
}

function dragstartHandler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.effectAllowed = "move";
    console.log(1)
}

function dragoverHandler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
}

function dropHandler(ev) {
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const data = ev.dataTransfer.getData("text");
    const transferingElement =  document.getElementById(data);

    if (ev.target.id === "prioritySpace" || ev.target.id === "mainSpace") {

        ev.target.appendChild(transferingElement);

    } else if (ev.target.tagName === "H3") {

        ev.target.parentElement.getElementsByTagName("UL")[0].appendChild(transferingElement);

    } else if (!isNaN(ev.target.id) && (typeof +ev.target.id === "number") && (ev.target.type !== "checkbox") &&
        (ev.target.className !== "delete")) {

        ev.target.parentElement.appendChild(transferingElement);

    }
}