var M1624612037420SpawnEventGeneric=window.dispatchEvent;//might be swapped for gun or something

function M1624447274929windowsBarElClick(M16244472854070J3066446992501546){
    console.log(window[M16244472854070J3066446992501546.id].parent.getComputedStyle("zIndex"));
}
var M1624614839264windows_panel____;
var M1624610691534windows__________=[];
var M1624615815153updtWindwPanel___=()=>{
    let text="";
    M1624610691534windows__________.forEach(e=>{
        text+=M1624439116498ArrayToButtonNFA_([e[2],"M1624441963184panelIdToTheTop__",`{id:'${e[0]}'}`])+"<br>"
    })
    document.getElementById(M1624614839264windows_panel____).innerHTML=text;
}
var M1624615216720windw_addedEreact=e=>{//console.log(e.detail);
    M1624615815153updtWindwPanel___();}
    var M1624610691534windows__________=[];
    var M1624610193562UISpawnGeneric___=M1624612265185SpawnWindowWrappe;//todo: arg for generic
    function M1624612265185SpawnWindowWrappe(M16246102759600J7030733333836279){
        let result=M1624262716713UISpawnNewWindow_(M16246102759600J7030733333836279);
        M1624610691534windows__________.push(result);
        result[2]=document.getElementById(result[0]).lastChild.innerText;
        M1624612037420SpawnEventGeneric(new CustomEvent("M1624609653866windowAddedEvent_",{detail:result}));
    }