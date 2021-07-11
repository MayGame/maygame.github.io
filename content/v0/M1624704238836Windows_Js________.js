var M1624612037420SpawnEventGeneric_=window.dispatchEvent;//might be swapped for gun or something

function M1624447274929windowsBarElClick_(M16244472854070J3066446992501546){
    console.log(window[M16244472854070J3066446992501546.id].parent.getComputedStyle("zIndex"));
}
var M1624614839264windows_panel_____;
var M1624610691534windows___________=[];
var M1624615815153updtWindwPanel____=()=>{
    let text="";
    M1624610691534windows___________.forEach(e=>{
        text+=M1624439116498ArrayToButtonNFA__([e[2],"M1624441963184panelIdToTheTop___",`{id:'${e[0]}'}`])+"<br>"
    })
    document.getElementById(M1624614839264windows_panel_____).innerHTML=text;
}
var M1624615216720windw_addedEreact_=e=>{//console.log(e.detail);
    M1624615815153updtWindwPanel____();
    M1624717503680MakeResizable_____(e.detail[0]);
    M1624718952893make_movable______(e.detail[0])
}
    var M1624610691534windows___________=[];
    var M1624610193562UISpawnGeneric____=M1624612265185SpawnWindowWrappe_;//todo: arg for generic
    function M1624612265185SpawnWindowWrappe_(M16246102759600J7030733333836279){
        let result=M1624262716713UISpawnNewWindow__(M16246102759600J7030733333836279);
        M1624610691534windows___________.push(result);
        result[2]=document.getElementById(result[0]).lastChild.innerText;
        M1624612037420SpawnEventGeneric_(new CustomEvent("M1624609653866windowAddedEvent__",{detail:result}));
    }
    function M1624262716713UISpawnNewWindow__(M16242627750700J7017439316036245){
        M1624262971875UITopLevelZindex__+=1;
    console.log(M1624262971875UITopLevelZindex__)
        var div = document.createElement('div');
        div.setAttribute("class","M1624268064555window_style_clas_");
        div.style.height="70%";
        div.style.zIndex=M1624262971875UITopLevelZindex__;
        var closeX = document.createElement("a");
        let divid=M1624265066524rand_id___________();
        closeX.innerHTML="x";
        closeX.setAttribute("onclick",`M1624612680771GenericOnClose____({id:'${divid}'})`);
        closeX.className="M1624269672137w_style_controls__";
        div.appendChild(closeX)
        div.setAttribute("id",divid);
        var innerContent=M16242627750700J7017439316036245.content||divid.toString();
        var idiv = document.createElement('div');
        var idivid=M1624265066524rand_id___________();
        // idiv.style.backgroundColor="hotpink";
        idiv.style.height="100%";
        idiv.innerHTML=innerContent;
        idiv.setAttribute("id",idivid);
        idiv.className="M1624270899914w_style_innercont_";
        div.appendChild(idiv);
        let win_title=M16242627750700J7017439316036245.title||idivid.substr(29);
        let titleEl = document.createElement("p");
        titleEl.className="M1624269596707w_style_bar_______"
        titleEl.innerHTML=win_title;
        div.appendChild(titleEl);
        document.body.appendChild(div);
    
        
        return [divid,idivid];
    }
    function M1624717503680MakeResizable_____(M16247174399910J0993983045590771){
        let el = document.getElementById(M16247174399910J0993983045590771)//divid
        // let text = `<div style="grid-area: d; height: 100%; background: blue; width: 100%; resize: both;"
        // ></div>`
        // el.insertAdjacentHTML("beforeend",text)
        el.style.resize="both";
        el.style.overflow="scroll";
        el.style.height="auto";
    }
    function M1624718952893make_movable______(M16247189675310J4989023412765374){
        let el = document.getElementById(M16247189675310J4989023412765374).children[2];//title
        // el.addEventListener('mousedown')//todo
    }