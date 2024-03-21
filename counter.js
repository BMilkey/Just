export function createDialogWindow(parent, dialogButton, nameParent, userInfo) {

    let dialog = document.createElement("DIALOG");

    if (userInfo === 1) {
        dialog.className = "dialogForAddedTask";
    } else {
        dialog.id = "dialog" + parent.id;
    }

    document.body.appendChild(dialog);

    let form = document.createElement("FORM");
    dialog.appendChild(form);

    let divTitle = document.createElement("DIV");
    divTitle.className = "divTitle";
    form.appendChild(divTitle);

    let h4 = document.createElement("H4");
    h4.innerHTML = nameParent;
    divTitle.appendChild(h4);

    let hr = document.createElement("HR");
    divTitle.appendChild(hr);

    let divInput = document.createElement("DIV");
    divInput.className = "divInput";
    form.appendChild(divInput);

    let label = document.createElement("LABEL");
    label.htmlFor = "changeNameTask";
    divInput.appendChild(label);

    let input = document.createElement("INPUT");
    input.className = "changeNameTask";
    input.type = "text";
    input.placeholder = "You can change a name of the task.";
    divInput.appendChild(input);

    let changeButton = document.createElement("BUTTON");
    changeButton.className = "changeButton";
    changeButton.innerHTML = "Change";
    changeButton.type = "button";

    changeButton.addEventListener("click", () => {

        if (input.value === "") {
            alert("Need to enter something!");
        } else if (input.value.length > 45) {
            alert("Too many symbols! Try again");
        } else {
            h4.innerHTML = input.value[0].toUpperCase() + input.value.slice(1);
        }

        input.value = "";
    })

    divInput.appendChild(changeButton);

    let divInformation = document.createElement("DIV");
    form.appendChild(divInformation);

    if (userInfo !== 1) {

        let allAttributes = ["name", "username", "email", "address", "phone", "website", "company"];
        getInformation(userInfo, allAttributes, divInformation);

    } else {

        let p = document.createElement("P");

        p.textContent = "⠀ " + "Information not found";
        p.className = "addedInformation";

        divInformation.appendChild(p);

    }

    let divButtons = document.createElement("DIV");
    divButtons.className = "divButtons";
    form.appendChild(divButtons);

    let backButton = document.createElement("BUTTON");
    backButton.className = "backButton";
    backButton.formMethod = "dialog";
    backButton.innerHTML = "Back";
    divButtons.appendChild(backButton);

    //let output = document.createElement("OUTPUT");

    dialogButton.addEventListener("click", () => {
        dialog.showModal();
    });

}

export function setUser(parent, dialogButton, nameParent) {

    let requestURL = "https://jsonplaceholder.typicode.com/users";
    let request = new XMLHttpRequest();
    request.open("GET", requestURL);

    request.responseType = "json";
    request.send();

    request.onload = () => {
        let listOfUsers = request.response;

        let order = +parent.className - 1;
        let user = listOfUsers[order];

        createDialogWindow(parent, dialogButton, nameParent, user);
    }

}

function getInformation(userInfo, allAttributes, parent) {

    for (let i = 0; i < 7; i++) {

        let userAttribute = document.createElement("P");
        let attribute = allAttributes[i];

        if (attribute === "address") {

            let addressAttributes = ["street", "suite", "city", "zipcode"];
            let addressInfo = "⠀ Address:";

            for (let j = 0; j < 4; j++) {
                addressInfo += " " + addressAttributes[j][0].toUpperCase() + addressAttributes[j].slice(1) + "(" +
                    userInfo["address"][addressAttributes[j]] + ");";
            }

            let p = document.createElement("P");
            p.textContent = addressInfo;

            parent.appendChild(p);

        } else if (attribute === "company") {

            let companyAttributes = ["name", "catchPhrase", "bs"];
            let companyInfo = "⠀ Company:";

            for (let j = 0; j < 3; j++) {
                companyInfo += " " + companyAttributes[j][0].toUpperCase() + companyAttributes[j].slice(1) + "(" +
                    userInfo["company"][companyAttributes[j]] + ");";
            }

            let p = document.createElement("P");
            p.textContent = companyInfo;

            parent.appendChild(p);

        } else {

            userAttribute.textContent = "⠀ " + attribute[0].toUpperCase() + attribute.slice(1) + ": " + userInfo[attribute];
            parent.appendChild(userAttribute);

        }
    }
}