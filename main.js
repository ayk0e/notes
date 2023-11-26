getData();
loadNotes();
loadPage();

document.getElementById("home").addEventListener("click", (e) => {
    d = e.target.id;
    //console.log(d);
});
document.getElementById("home").addEventListener("contextmenu", (e) => {
    e.preventDefault();
    toggleFilesMenu(e);
});

let keys = "";
let pressed = false;
let page = document.getElementById("page");

document.addEventListener("keydown", (e) => {
    let key = e.key;

    keys = keys + "+" + key;
    keys = keys.replace(" ", "");

    if(keys === "+Shift+P") {
        keys = "";
        newTextarea();
    }
    if(keys === "+Shift+S") {
        keys = "";
        savePage();
    }
    if(keys === "+Shift+D") {
        keys = "";
        deleteBlock();
    }
    if(keys === "+Shift+A") {
        keys = "";
        newNote();
    }
    if(keys === "+Shift+R") {
        keys = "";
        deleteNote();
    }
    if(keys === "+Shift+U") {
        keys = "";
        addPasswordPage();
    }
    if(keys === "+Shift+Y") {
        keys = "";
        addPasswordSubnotes();
    }
    if(keys === "+Shift+T") {
        keys = "";
        removePasswordPage();
    }
    if(keys === "+Shift+J") {
        keys = "";
        removePasswordSubnotes();
    }

    if(!pressed) {
        setTimeout(e => {
            keys = "";
            pressed = false;
        }, 2000);
        pressed = true;
    }
});

function toggleFilesMenu(e) {
    //console.log(e);
    let menu = document.getElementById("options-file");

    menu.style.top = e.y + 5 + "px";
    menu.style.left = e.x + 5 + "px";

    if (menu.style.display === "" || menu.style.display === "none") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
}

function deleteBlock() {
    document.getElementById(d).remove();
}

function newNote() {
    let name = prompt("name");

    data[d].notes.push(getN());
    data[getN()] = {
        name: name,
        page: [],
        notes: [],
        parent: d,
        password_page: undefined,
        password_subnotes: undefined
    }

    increaseN();
    loadNotes();
    saveData();
}

function deleteNote() {
    let e = data[d].parent;

    //console.log(data[d].parent);

    delete data[d];

    for(let i in data[e].notes) {
        //console.log(data[e].notes[i], d);
        if(data[e].notes[i] == d) {
            data[e].notes.splice(i, 1);
            saveData();
            loadNotes();
            return;
        }
    }
}

function addPasswordPage() {
    let password = prompt("password");

    data[d].password_page = password;

    saveData();
}

function addPasswordSubnotes() {
    let password = prompt("password");

    data[d].password_subnotes = password;

    saveData();
}

function removePasswordPage() {
    let password = prompt("password");

    if(password === data[d].password_page) {
        data[d].password_page = undefined;
    }

    saveData();
}

function removePasswordSubnotes() {
    let password = prompt("password");

    if(password === data[d].password_subnotes) {
        data[d].password_subnotes = undefined;
    }

    saveData();
}