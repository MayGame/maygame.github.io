

var M1624262971875UITopLevelZindex_=0;
var M1624122218197UI_panels________={}
function M1624262183697Render_UI_Panel__(M16242622099630J9366237639899546)
{}
function M1624265066524rand_id__________(){
        let rnd = Math.random().toString();//.length varies. 16-21. doesn't really matter
        let id=('M'+Date.now()+rnd.replace('.','J')+"BB00BB").substr(0,32);
        //starts with a number, contains dot -> not a valid ID for C-like languages
        //31-35 symbols. 
        return id;}
function M1624264785245value_to_id______(M16242647363800J5140259437325456){
    let a=('M'+Date.now()+M16242647363800J5140259437325456.value+'_________________________').slice(0,31);
    return a.replaceAll(' ','_');
}
function M1624612701171window_onclose___(M16246127127370J8951023459840319)
{
    let a = document.getElementById(M16246127127370J8951023459840319.id);
    document.body.removeChild(a);
}
function M1624613138853W_OnClose2_______(M16246131519800J3148049621619713){
    M1624612701171window_onclose___(M16246131519800J3148049621619713);
    let id = M16246131519800J3148049621619713.id;
    M1624610691534windows__________.forEach((e,index)=>{
        if(e[0]==id)M1624610691534windows__________.splice(index,1)
    })
    M1624615815153updtWindwPanel___();
}
var M1624612680771GenericOnClose___=M1624613138853W_OnClose2_______;
function M1624262716713UISpawnNewWindow_(M16242627750700J7017439316036245){
    M1624262971875UITopLevelZindex_+=1;
console.log(M1624262971875UITopLevelZindex_)
    var div = document.createElement('div');
    div.setAttribute("class","M1624268064555window_style_clas");
    div.style.height="100%";
    div.style.zIndex=M1624262971875UITopLevelZindex_;
    var closeX = document.createElement("a");
    let divid=M1624265066524rand_id__________();
    closeX.innerHTML="x";
    closeX.setAttribute("onclick",`M1624612680771GenericOnClose___({id:'${divid}'})`);
    closeX.className="M1624269672137w_style_controls_";
    div.appendChild(closeX)
    div.setAttribute("id",divid);
    var innerContent=M16242627750700J7017439316036245.content||divid.toString();
    var idiv = document.createElement('div');
    var idivid=M1624265066524rand_id__________();
    // idiv.style.backgroundColor="hotpink";
    idiv.style.height="100%";
    idiv.innerHTML=innerContent;
    idiv.setAttribute("id",idivid);
    idiv.className="M1624270899914w_style_innercont";
    div.appendChild(idiv);
    let win_title=M16242627750700J7017439316036245.title||idivid.substr(29);
    let titleEl = document.createElement("p");
    titleEl.className="M1624269596707w_style_bar______"
    titleEl.innerHTML=win_title;
    div.appendChild(titleEl);
    document.body.appendChild(div);

    
    return [divid,idivid];
}

/**
 * ask question (tuple) - window, acepts two
 * reply. 
 * msg source 
 */
function M1624332799887spawn_var_inner__(){
    let id=M1624265066524rand_id__________();

return `
<input type="text" placeholder="name to IDfy:" onchange="
let a=('M'+Date.now()+this.value+'_________________________').slice(0,31);
${id}.value=a.replaceAll(' ','_');" ><br>
<textarea id="${id}" placeholder="Result goes here" style="height: 70px;"></textarea><br>
<button onclick="${id}.value=M1624265066524rand_id__________();">Rand</button>
`;}
function M1624334890220descr_inner_conte(){
    return ``
}
function M1624332231472spawn_var_window_(){
    M1624610193562UISpawnGeneric___({content:M1624332799887spawn_var_inner__(),title:"Gen vars"});
}
function M1624334170131see_descr_window_(){
    M1624610193562UISpawnGeneric___({content:"", title:"lf description"})
}
function M1624334963037add_var_window___(){
    M1624610193562UISpawnGeneric___({content:"", title:"add var"})

}

function M1624441963184panelIdToTheTop__(M16244420098710J3601299825064457){
    M1624262971875UITopLevelZindex_+=1;
    document.getElementById(M16244420098710J3601299825064457.id).style.zIndex=M1624262971875UITopLevelZindex_;
}
var M1624444193816active_panels____=[]
var M1624440710074panels_array_____=[
    ["new empty","M1624640880981generic_rend_pane","{}"],
    // ["W"]
];
var M1624607619220friends_panel_arr=[["List","",""]]
function M1624447274929windowsBarElClick(M16244472854070J3066446992501546){
    console.log(window[M16244472854070J3066446992501546.id].parent.getComputedStyle("zIndex"));
}
var M1624607435991panel_friends____=M1624439266812ArrayToButtonNFA2(M1624607619220friends_panel_arr)
var M1624437076316UI_Panel_Panels__=M1624439266812ArrayToButtonNFA2(M1624440710074panels_array_____);
function M1624439116498ArrayToButtonNFA_(M16244390103150J5131402796215945){
    let name = M16244390103150J5131402796215945[0];
    let func = M16244390103150J5131402796215945[1];
    let arg = M16244390103150J5131402796215945[2]||"";
    return `<button onclick="${func}(${arg});">${name}</button>`
}
function  M1624439266812ArrayToButtonNFA2(M16244393230020J5704897383919565){
    //name func arg 2d
    let result="";
    M16244393230020J5704897383919565.forEach(entry=>result+=M1624439116498ArrayToButtonNFA_(entry))
    return result;
}
function M1624711410720arrToBtnNFA2Verti(M16247114334750J0315409890228195){
    let result="";
    M16247114334750J0315409890228195.forEach(entry=>result+=M1624439116498ArrayToButtonNFA_(entry)+"</br>")
    return result;
}

var M1624345617658UI_Panel_One_____=`
<button onclick="M1624036276382wndw_to_idb_thesa();">Dump state to idb</button>
<button onclick="M1624077010981export_idb_json__({'db':'M1623941499181idb_Mayn_db______'});">Export idb</button>
<button onclick="M1624081527326idbExportFileJSON({'db':'M1623941499181idb_Mayn_db______'});">Export file</button>
<button onclick="M1624610193562UISpawnGeneric___({'db':'M1623941499181idb_Mayn_db______'});">ui test</button>
<button onclick="M1624332231472spawn_var_window_();">Var name</button>
<button onclick="M1624334170131see_descr_window_();">seek  desc</button>
<button onclick="M1624640880981generic_rend_pane();">+ panel</button>
`
function M1624444239595panel_render_add_(M16244442971900J817811984106799B){
    let result=M1624640880981generic_rend_pane(M16244442971900J817811984106799B);
    M1624444193816active_panels____.push(result);
    M1624612037420SpawnEventGeneric(new CustomEvent("M1624445388750PanelAddedIDEvent",{detail:result}))
}
function M1624699275670PanelAddRight____(M16246992857040J1236780696971933){
    let result = M1624699365741GPanelAddRight___(M16246992857040J1236780696971933);
    M1624444193816active_panels____.push(result);
    M1624612037420SpawnEventGeneric(new CustomEvent("M1624445388750PanelAddedIDEvent",{detail:result}))
}
//#region panels
var M1624345499225UI_Active_Panels_=[
    "M1624437076316UI_Panel_Panels__",
    "M1624700656939utilities_panel__",
    "M1624345617658UI_Panel_One_____",
"M1624446909830windows_bar______",
"M1624607435991panel_friends____","M1624701918357content_panel____"
]
var M1624608519068title_for________={
    "M1624345617658UI_Panel_One_____":"one",
"M1624437076316UI_Panel_Panels__":"Panels","M1624446909830windows_bar______":"windows",
"M1624607435991panel_friends____":"friends",
"M1624700656939utilities_panel__":"utils",
"M1624701918357content_panel____":"main"
}
var M1624700685189utilsPanelArray__=[
    ["Utility stuff"],["raw tech"],["research"]
];
var M1624701959150content_panel_arr=[["quests","M1624703189774QuestsPanelOnclic"],["map"],["social"]]
var M1624701918357content_panel____=M1624439266812ArrayToButtonNFA2(M1624701959150content_panel_arr)
var M1624700656939utilities_panel__=M1624439266812ArrayToButtonNFA2(M1624700685189utilsPanelArray__);
var M1624699365741GPanelAddRight___=function(a){
    let ret = M1624640880981generic_rend_pane(a);
    el=document.getElementById(ret[0]).parentElement;
    el.style.right="10px";
    el.style.display="flex";
    el.style.background="blue";
    // el.style.float="right"
    el.style.position="absolute";
    return ret;
}
//#endregion
//#region toast
//////////////////////////
var M1624635883699GenericToast_____= M1624635774325Toast____________;
function M1624636345100Cook_toast_______(M16246363716160J5304635871646979){
    M1624636725133end_toast________()
    let a =document.createElement('div');
    a.innerHTML=M16246363716160J5304635871646979;
    a.style.position="absolute";
    a.style.backgroundColor="deeppink";
    a.style.fontSize="2em";
    a.style.display="block";
    a.style.opacity="0.6"
    let id=M1624265066524rand_id__________();
    a.id=id;
    document.body.appendChild(a);
    M1624636688748last_toast_______=id;
    return id;
}
function M1624636725133end_toast________(){
    if(M1624636688748last_toast_______)
    document.body.removeChild(document.getElementById(M1624636688748last_toast_______))
    M1624636688748last_toast_______=null;
}
var M1624636688748last_toast_______;
function M1624635774325Toast____________(M16246359166560J5750862477732466){
    let a =M16246359166560J5750862477732466.text||'Toast';
    M1624636345100Cook_toast_______(a)

    setTimeout(M1624636725133end_toast________,1500);
}
/////////////////////
function M1624639169845gen_rgb__________(){
var x = Math.floor(Math.random() * 256);
var y = Math.floor(Math.random() * 256);
var z = Math.floor(Math.random() * 256);
var bgColor = "rgb(" + x + "," + y + "," + z + ")";
return bgColor;}
var M1624640880981generic_rend_pane=M1624349547805render_panel_new_;
function M1624349547805render_panel_new_(M16243495667540J5321126795766193){
    let content = M16243495667540J5321126795766193.content||'';
    let title = M16243495667540J5321126795766193.title||'';
    let panel = document.createElement("div");
    panel.style.backgroundColor="hotpink";
    panel.style.width="fit-content";
    let panelI = document.createElement("span");
    let controls = document.createElement("span");
    let id=M1624265066524rand_id__________();
    let cinner=`
    <a onmouseover="M1624635883699GenericToast_____({text:'${title}'});">?</a>
    <a onclick="
    if (getComputedStyle(${id}).visibility=='hidden')
    ${id}.style.visibility='visible';
    else ${id}.style.visibility='hidden';
    ">_</a>
    <a onclick="document.body.removeChild(${id}.parentNode)">X</a>
    `;
    controls.innerHTML=cinner;
    panelI.innerHTML=content;
    panelI.id=id;
    panelI.setAttribute("title",title)
    panel.appendChild(panelI);
    panel.appendChild(controls);
    document.body.appendChild(panel);

    return [id,title];
}
function M1624437484575UIRenderAllPanels(){
    M1624345499225UI_Active_Panels_.forEach(
        p=>{
    // M1624640880981generic_rend_pane({content:window[p]})
    // M1624699275670PanelAddRight____({content:window[p],title:M1624608519068title_for________[p]})
    M1624444239595panel_render_add_({content:window[p],title:M1624608519068title_for________[p]})
        }
    )
}
function M1624641521345toggle_panel_____(M16246415437510J8668532309943344){
    // console.log(M16246415437510J8668532309943344)
    let p = M16246415437510J8668532309943344.parentNode;
    if (getComputedStyle(p).visibility=='hidden')
    p.style.visibility="visible"
    else
    p.style.visibility="hidden"
}
function M1624609136938UPD_Panels_______(){
    let text=``
    M1624444193816active_panels____.forEach((e,i)=>{
        if(i!=0)
        text+=M1624439116498ArrayToButtonNFA_([e[1],"M1624641521345toggle_panel_____",e[0]])+"<br>"
        // else fixme
    })
    return text;
}
// var 
var M1624615486151PanelAddedEreact_=e=>{console.log(e.detail);
    if(e.detail[1]=="Panels"){
        M1624608952349Panels_panel_id__=e.detail[0];
        window[M1624608952349Panels_panel_id__].insertAdjacentHTML('beforebegin',"<p>panels</p>")
        let el = window[M1624608952349Panels_panel_id__].parentElement;
        el.style.position="absolute";
        el.style.right="200px";
        el.style.top="10px";
        el.style.display="flex";
    }
    else 
    if(e.detail[1]=="windows"){M1624614839264windows_panel____=e.detail[0];
        window[M1624614839264windows_panel____].insertAdjacentHTML('beforebegin',"<p>tabs</p>")
        let el = window[M1624614839264windows_panel____].parentElement;
        el.style.position="absolute";
        el.style.right="10px";
        el.style.top="10px";

    }
    document.getElementById(M1624608952349Panels_panel_id__).innerHTML=M1624609136938UPD_Panels_______();
    
}
function M1624444850349UI_Init__________(){
    window.addEventListener("M1624609653866windowAddedEvent_",M1624615216720windw_addedEreact)
    window.addEventListener("M1624445388750PanelAddedIDEvent",M1624615486151PanelAddedEreact_)
}
var M1624608952349Panels_panel_id__;

M1624444850349UI_Init__________();


