import './style.css'
import {setUser, createDialogWindow} from "./counter.js";


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
        createDialogButton(li, nameTask, 1);

    }

}

function addTask() {

    let li = document.createElement("LI");
    let inputValue = document.getElementById("inputNameTask").value;
    let name = "⠀" + inputValue[0].toUpperCase() + inputValue.slice(1);
    let nameTask = document.createTextNode(name);

    let input = document.createElement("INPUT");
    input.type = "checkbox";

    li.draggable = true;
    li.id = name;

    li.appendChild(input);
    li.appendChild(nameTask);

    if (inputValue === "") {
        alert("Need to enter something!");
    } else if (inputValue.length > 45) {
        alert("Too many symbols! Try again");
    } else {
        document.getElementById("mainSpace").appendChild(li);
    }

    document.getElementById("inputNameTask").value = "";

    li.className = "addedTask";

    createDeleteButton(li);
    createDialogButton(li, name, 0);
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

function createDialogButton(parent, nameParent, check) {

    let dialogButton = document.createElement("BUTTON");
    let symbolOfDialog = document.createTextNode("\u270E");
    dialogButton.className = "dialogButton";

    dialogButton.appendChild(symbolOfDialog);
    parent.appendChild(dialogButton);

    if (check) {

        dialogButton.id = "dialogButton" + parent.id;
        setUser(parent, dialogButton, nameParent);

    } else {

        createDialogWindow(parent, dialogButton, nameParent, 1);

    }

}

function dragstartHandler(ev) {

    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.effectAllowed = "move";

}

function dragoverHandler(ev) {

    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";

}

function dropHandler(ev) {

    ev.preventDefault();

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