const inputElement = (type, name, label) => {
    let result = `<div>`;
    if ((type === "checkbox") || (type === "radio")) {
        result +=  `<input type="${type}" name="${name}" id="id_${name}">`;
        result +=  `<label class="one-line" for="id_${name}">${label}</label>`;
    } else {
        result +=  `<label for="${name}">${label}</label>`;
        result +=  `<input type="${type}" name="${name}">`;
    }
    result += `</div>`;
    return result;

}

const selectElement = (name, label, selectOptions) => {
    let optionElements = "";
    for (const option of selectOptions) {
        optionElements += `<option>${option}</option>`;
    }
    let result = `
        <div>
        <label for="${name}">${label}</label>
        <select id="${name}" name="${name}">
        ${optionElements}
        </select>
        </div>
    `;
    return result;
}

const formElement = `
    <form id="form">
        ${inputElement("text", "firstName", "Keresztnév")}
        ${inputElement("email", "personalEmail", "Email cím")}
        ${inputElement("file", "profilePicture", "Profilkép")}
        ${selectElement("where", "Honnan hallottál rólunk?", ["internetről", "ismerőstől", "egyéb"])}
        ${inputElement("checkbox", "newsLetter", "Szeretnék hírlevelet kapni")}
        ${inputElement("checkbox", "terms", "Elfogadom a felhasználási feltételeket")}
        <div class="center">
            <button>Küldés</button>
        </div>
    </form>
`
const formSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    const eventTarget = event.target.classList.add("submitted");
    const selectedValue = eventTarget.querySelector(`select[name="where"]`).value;
    console.log(selectedValue);
}

const inputEvent = (event) => {
    const firstName = document.querySelector(`input[name="firstName"]`);
    const tryForm = firstName.closest("#form");
    console.log(tryForm);
    if (event.target.name === "firstName") {
        document.getElementById("inputValueContent").innerHTML = event.target.value;
    }
}

function loadEvent() {
    const root = document.getElementById("root");
    root.insertAdjacentHTML("beforeend", formElement);
    root.insertAdjacentHTML("beforeend", `
        <div id="inputValueContent"></div>
    `);

    const form = document.getElementById("form");
    form.addEventListener("submit", formSubmit);

    const inputList = form.querySelectorAll("input");
    for (const input of inputList) {
        input.addEventListener("input", inputEvent);
    }
}

window.addEventListener("load", loadEvent);