import './style.css'

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
        let nameTask = document.createTextNode("⠀" + oneObject.title[0].toUpperCase() +
            oneObject.title.slice(1));

        let input = document.createElement("INPUT");
        input.type = "checkbox";
        input.checked = oneObject.completed;

        li.appendChild(input);
        li.appendChild(nameTask);

        li.id = oneObject.id;
        li.draggable = true;

        document.getElementById("mainSpace").appendChild(li);

        createDeleteButton(li);
    }

}

function addTask() {

    let li = document.createElement("li");
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
}

function createDeleteButton (parent) {

    let deleteButton = document.createElement("BUTTON");
    let symbolOfDelete = document.createTextNode("\u00D7");
    deleteButton.className = "delete";
    deleteButton.appendChild(symbolOfDelete);
    parent.appendChild(deleteButton);

    deleteButton.onclick = deleteTask;
}

function deleteTask() {
    let div = this.parentElement;
    div.style.display = "none";
}