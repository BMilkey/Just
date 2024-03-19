export function createDialogWindow(parent, dialogButton, nameParent) {

    let requestURL = "https://jsonplaceholder.typicode.com/users";
    let request = new XMLHttpRequest();
    request.open("GET", requestURL);

    request.responseType = "json";
    request.send();

    let listOfUsers;
    request.onload = () => {
        listOfUsers = request.response;
        console.log(listOfUsers);
        setUser(listOfUsers)
    }

    console.log(listOfUsers);

    let dialog = document.createElement("dialog");
    dialog.id = "dialog" + parent.id;
    document.body.appendChild(dialog);

    let form = document.createElement("form");
    dialog.appendChild(form);

    let divTitle = document.createElement("div");
    form.appendChild(divTitle);

    let h4 = document.createElement("h4");
    h4.innerHTML = nameParent;
    divTitle.appendChild(h4);

    let hr = document.createElement("hr");
    divTitle.appendChild(hr);

    let divInput = document.createElement("div");
    divInput.className = "divInput";
    form.appendChild(divInput);

    let label = document.createElement("label");
    label.htmlFor = "changeNameTask";
    divInput.appendChild(label);

    let input = document.createElement("input");
    input.id = "changeNameTask";
    input.type = "text";
    input.placeholder = "You can change name of the task.";
    divInput.appendChild(input);

    let changeButton = document.createElement("button");
    changeButton.className = "changeButton";
    changeButton.innerHTML = "Change";
    divInput.appendChild(changeButton);

    let divInformation = document.createElement("div");
    form.appendChild(divInformation);

    let p = document.createElement("p");

    divInformation.appendChild(p);

    let divButtons = document.createElement("div");
    form.appendChild(divButtons);

    let cancelButton = document.createElement("button");
    cancelButton.value = "cancel";
    cancelButton.formMethod = "dialog";
    cancelButton.innerHTML = "Cancel";
    divButtons.appendChild(cancelButton);

    let confirmButton = document.createElement("button");
    confirmButton.id = "confirmButton";
    confirmButton.value = "default";
    confirmButton.innerHTML = "Confirm";
    divButtons.appendChild(confirmButton);

    let output = document.createElement("output");

    dialogButton.addEventListener("click", () => {
        dialog.showModal();
    });

}

function setUser(users) {

}