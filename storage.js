let data;

let n = 0;
let p = "home";
let d = "";

//localStorage.removeItem("notes");

function getData() {
    let datas = JSON.parse(localStorage.getItem("notes"));
    if(datas === null || datas === undefined) {
        localStorage.setItem("notes", JSON.stringify([0, {
            home: {
                page: [],
                notes: []
            }
        }]));
    } else {
        n = datas[0];
        data = datas[1];
    }
    //console.log(datas);
}

function saveData() {
    localStorage.setItem("notes", JSON.stringify([n, data]));
}
