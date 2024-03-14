import './style.css'

const btn =  document.getElementById('add-btn');
btn.onclick = addTask;
// btn.addEventListener('click', addTask);

function addTask() {

    let li = document.createElement("li");
    let inputValue = document.getElementById("inputNameTask").value;
    let nameTask = document.createTextNode(inputValue);

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

    let deleteButton = document.createElement("BUTTON");
    let symbolOfDelete = document.createTextNode("\u00D7");
    deleteButton.className = "delete";
    deleteButton.appendChild(symbolOfDelete);
    li.appendChild(deleteButton);

    deleteButton.onclick = deleteTask;
}

function deleteTask() {
    let div = this.parentElement;
    div.style.display = "none";
}