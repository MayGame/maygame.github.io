

var M1624262971875UITopLevelZindex__=0;
var M1624122218197UI_panels_________={}
function M1624262183697Render_UI_Panel___(M16242622099630J9366237639899546)
{}
function M1624265066524rand_id___________(){
        let rnd = Math.random().toString();//.length varies. 16-21. doesn't really matter
        let id=('M'+Date.now()+rnd.replace('.','J')+"BB00BB").substr(0,32);
        //starts with a number, contains dot -> not a valid ID for C-like languages
        //31-35 symbols. 
        return id;}
function M1624264785245value_to_id_______(M16242647363800J5140259437325456){
    let a=('M'+Date.now()+M16242647363800J5140259437325456.value+'_________________________').slice(0,32);
    return a.replaceAll(' ','_');
}
function M1624612701171window_onclose____(M16246127127370J8951023459840319)
{
    let a = document.getElementById(M16246127127370J8951023459840319.id);
    document.body.removeChild(a);
}
function M1624613138853W_OnClose2________(M16246131519800J3148049621619713){
    M1624612701171window_onclose____(M16246131519800J3148049621619713);
    let id = M16246131519800J3148049621619713.id;
    M1624610691534windows___________.forEach((e,index)=>{
        if(e[0]==id)M1624610691534windows___________.splice(index,1)
    })
    M1624615815153updtWindwPanel____();
}
var M1624612680771GenericOnClose____=M1624613138853W_OnClose2________;


/**
 * ask question (tuple) - window, acepts two
 * reply. 
 * msg source 
 */
function M1624332799887spawn_var_inner___(){
    let id=M1624265066524rand_id___________();

return `
<input type="text" placeholder="name to IDfy:" onchange="
let a=('M'+Date.now()+this.value+'_________________________').slice(0,32);
${id}.value=a.replaceAll(' ','_');" ><br>
<textarea id="${id}" placeholder="Result goes here" style="height: 70px;"></textarea><br>
<button onclick="${id}.value=M1624265066524rand_id___________();">Rand</button>
`;}
function M1624334890220descr_inner_conte_(){
    return ``
}
function M1624332231472spawn_var_window__(){
    M1624610193562UISpawnGeneric____({content:M1624332799887spawn_var_inner___(),title:"Gen vars"});
}
function M1624334170131see_descr_window__(){
    M1624610193562UISpawnGeneric____({content:"", title:"lf description"})
}
function M1624334963037add_var_window____(){
    M1624610193562UISpawnGeneric____({content:"", title:"add var"})

}

function M1624441963184panelIdToTheTop___(M16244420098710J3601299825064457){
    M1624262971875UITopLevelZindex__+=1;
    document.getElementById(M16244420098710J3601299825064457.id).style.zIndex=M1624262971875UITopLevelZindex__;
}
var M1624444193816active_panels_____=[]
var M1624440710074panels_array______=[
    ["new empty","M1624640880981generic_rend_pane_","{}"],
    // ["W"]
];
var M1624607619220friends_panel_arr_=[["List","",""]]
function M1624447274929windowsBarElClick_(M16244472854070J3066446992501546){
    console.log(window[M16244472854070J3066446992501546.id].parent.getComputedStyle("zIndex"));
}
var M1624607435991panel_friends_____=M1624439266812ArrayToButtonNFA2_(M1624607619220friends_panel_arr_)
var M1624437076316UI_Panel_Panels___=M1624439266812ArrayToButtonNFA2_(M1624440710074panels_array______);
function M1624439116498ArrayToButtonNFA__(M16244390103150J5131402796215945){
    let name = M16244390103150J5131402796215945[0];
    let func = M16244390103150J5131402796215945[1];
    let arg = M16244390103150J5131402796215945[2]||"";
    return `<button onclick="${func}(${arg});">${name}</button>`
}
function  M1624439266812ArrayToButtonNFA2_(M16244393230020J5704897383919565){
    //name func arg 2d
    let result="";
    M16244393230020J5704897383919565.forEach(entry=>result+=M1624439116498ArrayToButtonNFA__(entry))
    return result;
}
function M1624711410720arrToBtnNFA2Verti_(M16247114334750J0315409890228195){
    let result="";
    M16247114334750J0315409890228195.forEach(entry=>result+=M1624439116498ArrayToButtonNFA__(entry)+"</br>")
    return result;
}

var M1624345617658UI_Panel_One______=`
<button onclick="M1624036276382wndw_to_idb_thesa_();">Dump state to idb</button>
<button onclick="M1624077010981export_idb_json___({'db':'M1623941499181idb_Mayn_db_______'});">Export idb</button>
<button onclick="M1624081527326idbExportFileJSON_({'db':'M1623941499181idb_Mayn_db_______'});">Export file</button>
<button onclick="M1624610193562UISpawnGeneric____({'db':'M1623941499181idb_Mayn_db_______'});">ui test</button>
<button onclick="M1624332231472spawn_var_window__();">Var name</button>
<button onclick="M1624334170131see_descr_window__();">seek  desc</button>
<button onclick="M1624640880981generic_rend_pane_();">+ panel</button>
`
function M1624444239595panel_render_add__(M16244442971900J817811984106799B){
    let result=M1624640880981generic_rend_pane_(M16244442971900J817811984106799B);
    M1624444193816active_panels_____.push(result);
    M1624612037420SpawnEventGeneric_(new CustomEvent("M1624445388750PanelAddedIDEvent_",{detail:result}))
}
function M1624699275670PanelAddRight_____(M16246992857040J1236780696971933){
    let result = M1624699365741GPanelAddRight____(M16246992857040J1236780696971933);
    M1624444193816active_panels_____.push(result);
    M1624612037420SpawnEventGeneric_(new CustomEvent("M1624445388750PanelAddedIDEvent_",{detail:result}))
}
//#region panels
var M1624345499225UI_Active_Panels__=[
    "M1624437076316UI_Panel_Panels___",
    "M1624700656939utilities_panel___",
    "M1624345617658UI_Panel_One______",
"M1624446909830windows_bar_______",
"M1624607435991panel_friends_____","M1624701918357content_panel_____"
]
var M1624608519068title_for_________={
    "M1624345617658UI_Panel_One______":"one",
"M1624437076316UI_Panel_Panels___":"Panels","M1624446909830windows_bar_______":"windows",
"M1624607435991panel_friends_____":"friends",
"M1624700656939utilities_panel___":"utils",
"M1624701918357content_panel_____":"main"
}
var M1624700685189utilsPanelArray___=[
    ["Utility stuff"],["raw tech"],["research"]
];
var M1624701959150content_panel_arr_=[["quests","M1624703189774QuestsPanelOnclic_"],["map"],["social"],["skills","M1624814047237skills_menu_oncli_"]]
var M1624701918357content_panel_____=M1624439266812ArrayToButtonNFA2_(M1624701959150content_panel_arr_)
var M1624700656939utilities_panel___=M1624439266812ArrayToButtonNFA2_(M1624700685189utilsPanelArray___);
var M1624699365741GPanelAddRight____=function(a){
    let ret = M1624640880981generic_rend_pane_(a);
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
var M1624635883699GenericToast______= M1624635774325Toast_____________;
function M1624636345100Cook_toast________(M16246363716160J5304635871646979){
    M1624636725133end_toast_________()
    let a =document.createElement('div');
    a.innerHTML=M16246363716160J5304635871646979;
    a.style.position="absolute";
    a.style.backgroundColor="deeppink";
    a.style.fontSize="2em";
    a.style.display="block";
    a.style.opacity="0.6"
    let id=M1624265066524rand_id___________();
    a.id=id;
    document.body.appendChild(a);
    M1624636688748last_toast________=id;
    return id;
}
function M1624636725133end_toast_________(){
    if(M1624636688748last_toast________)
    document.body.removeChild(document.getElementById(M1624636688748last_toast________))
    M1624636688748last_toast________=null;
}
var M1624636688748last_toast________;
function M1624635774325Toast_____________(M16246359166560J5750862477732466){
    let a =M16246359166560J5750862477732466.text||'Toast';
    M1624636345100Cook_toast________(a)

    setTimeout(M1624636725133end_toast_________,1500);
}
/////////////////////
function M1624639169845gen_rgb___________(){
var x = Math.floor(Math.random() * 256);
var y = Math.floor(Math.random() * 256);
var z = Math.floor(Math.random() * 256);
var bgColor = "rgb(" + x + "," + y + "," + z + ")";
return bgColor;}
var M1624640880981generic_rend_pane_=M1624349547805render_panel_new__;
function M1624349547805render_panel_new__(M16243495667540J5321126795766193){
    let content = M16243495667540J5321126795766193.content||'';
    let title = M16243495667540J5321126795766193.title||'';
    let panel = document.createElement("div");
    panel.style.backgroundColor="hotpink";
    panel.style.width="fit-content";
    let panelI = document.createElement("span");
    let controls = document.createElement("span");
    let id=M1624265066524rand_id___________();
    let cinner=`
    <a onmouseover="M1624635883699GenericToast______({text:'${title}'});">?</a>
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
function M1624437484575UIRenderAllPanels_(){
    M1624345499225UI_Active_Panels__.forEach(
        p=>{
    // M1624640880981generic_rend_pane_({content:window[p]})
    // M1624699275670PanelAddRight_____({content:window[p],title:M1624608519068title_for_________[p]})
    M1624444239595panel_render_add__({content:window[p],title:M1624608519068title_for_________[p]})
        }
    )
}
function M1624641521345toggle_panel______(M16246415437510J8668532309943344){
    // console.log(M16246415437510J8668532309943344)
    let p = M16246415437510J8668532309943344.parentNode;
    if (getComputedStyle(p).visibility=='hidden')
    p.style.visibility="visible"
    else
    p.style.visibility="hidden"
}
function M1624609136938UPD_Panels________(){
    let text=``
    M1624444193816active_panels_____.forEach((e,i)=>{
        if(i!=0)
        text+=M1624439116498ArrayToButtonNFA__([e[1],"M1624641521345toggle_panel______",e[0]])+"<br>"
        // else fixme
    })
    return text;
}
// var 
var M1624615486151PanelAddedEreact__=e=>{console.log(e.detail);
    if(e.detail[1]=="Panels"){
        M1624608952349Panels_panel_id___=e.detail[0];
        window[M1624608952349Panels_panel_id___].insertAdjacentHTML('beforebegin',"<p>panels</p>")
        let el = window[M1624608952349Panels_panel_id___].parentElement;
        el.style.position="absolute";
        el.style.right="200px";
        el.style.top="10px";
        el.style.display="flex";
    }
    else 
    if(e.detail[1]=="windows"){M1624614839264windows_panel_____=e.detail[0];
        window[M1624614839264windows_panel_____].insertAdjacentHTML('beforebegin',"<p>tabs</p>")
        let el = window[M1624614839264windows_panel_____].parentElement;
        el.style.position="absolute";
        el.style.right="10px";
        el.style.top="10px";

    }
    document.getElementById(M1624608952349Panels_panel_id___).innerHTML=M1624609136938UPD_Panels________();
    
}
function M1624444850349UI_Init___________(){
    window.addEventListener("M1624609653866windowAddedEvent__",M1624615216720windw_addedEreact_)
    window.addEventListener("M1624445388750PanelAddedIDEvent_",M1624615486151PanelAddedEreact__)
}
var M1624608952349Panels_panel_id___;

M1624444850349UI_Init___________();


