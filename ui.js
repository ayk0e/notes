function loadNotes() {
    let notes = data["home"].notes;
    let home = document.getElementById("home");

    home.innerHTML = "";

    for(let i in notes) {
        let note = notes[i];
        let html = `
            <div id = "${notes[i]}" class = "note" onclick = "event.stopPropagation(); setD(event.target.id); setP(event.target.id); togglePage(event)" oncontextmenu = "event.stopPropagation();">
                <i id = "${notes[i]}" class = "fa-solid fa-angle-right note-arrowhead" onclick = "event.stopPropagation(); setD(event.target.id); toggleSubnotes(event)" oncontextmenu = "event.stopPropagation();"></i>
                <p id = "${notes[i]}" class = "note-name" onclick = "event.stopPropagation(); setD(event.target.id); setP(event.target.id); togglePage(event)" oncontextmenu = "event.stopPropagation();">${data[notes[i]].name}</p>
            </div>
        `;
        let new_note = document.createElement("div");

        new_note.innerHTML = html;

        //console.log(note, data[note]);

        home.appendChild(new_note);
        loadSubnotes(notes[i]);
    }
}

function loadSubnotes(id) {
    let notes = data[id].notes;
    let home = document.getElementById("home");
    let new_subnotes = document.createElement("ul");

    new_subnotes.id = id + "/subnotes";
    new_subnotes.className = "subnotes";

    for(let i in notes) {
        let new_subnote = document.createElement("li");

        new_subnote.id = notes[i];
        new_subnote.className = "subnote";
        new_subnote.innerText = data[notes[i]].name;

        new_subnote.addEventListener("click", e => {
            e.stopPropagation();

            setD(e.target.id);
            setP(e.target.id);
            togglePage();
        });

        new_subnote.addEventListener("contextmenu", e => {
            e.stopPropagation();
        });

        new_subnotes.appendChild(new_subnote);
    }

    home.appendChild(new_subnotes);
}

function setD(e) {
    d = e;
    //console.log(d);
}

function setP(e) {
    p = e;
}

function toggleSubnotes(e) {
    let subnotes = document.getElementById(e.target.id + "/subnotes");

    if(subnotes.style.display !== "block") {
        let password = undefined;

        if(data[d].password_subnotes !== undefined) password = prompt("password");

        if(password !== data[d].password_subnotes) return;
    }

    if(subnotes.style.display === "none" || subnotes.style.display === "") {
        subnotes.style.display = "block";
    } else {
        subnotes.style.display = "none";
    }
}

function togglePage() {
    let password = undefined;

    if(data[d].password_page !== undefined) password = prompt("password");

    if(password === data[d].password_page) loadPage();
}

function newTextarea() {
    let ta = document.createElement("textarea");

    ta.id = n + "i"; increaseN();
    ta.className = "textarea";

    ta.addEventListener("click", e => {
        setD(e.target.id);
    });
    ta.addEventListener("input", e => {
        let lines = e.target.value.split("\n").length;
        let height = lines * 16
        //console.log(lines);

        document.getElementById(e.target.id).style.height = height + "px";
    });

    page.appendChild(ta);
}

function increaseN() {
    n++;
}

function savePage() {
    let page = document.getElementById("page");
    let children = page.children;

    data[p].page = [];

    for(let i in children) {
        let child = children[i];

        if(child !== null && child !== undefined && child.id !== undefined) {
            //console.log("b", child.id);
            data[p].page.push(child.id);
            data[child.id] = {
                type: child.localName,
                text: child.textContent,
                value: child.value,
                width: child.style.width,
                height: child.style.height,
                id: child.id,
                class: child.className
            };
            //console.log(data);
        }
    }
    saveData();
}

function loadPage() {
    let page = document.getElementById("page");

    page.innerHTML = "";

    for(let i in data[p].page) {
        let da = data[data[p].page[i]];
        //console.log("b", data);
        let el = document.createElement(da.type);

        el.text = da.text;
        el.value = da.value;
        el.style.width = da.width;
        el.style.height = da.height;
        el.id = da.id;
        el.className = da.class;
        
        if(da.type === "textarea") {
            el.addEventListener("click", e => {
                setD(e.target.id);
            });
            el.addEventListener("input", e => {
                let lines = e.target.value.split("\n").length;
                let height = lines * 16
                //console.log(lines);
        
                document.getElementById(e.target.id).style.height = height + "px";
            });
        }

        page.appendChild(el);
    }
}

function getN() {
    return n + "i";
}