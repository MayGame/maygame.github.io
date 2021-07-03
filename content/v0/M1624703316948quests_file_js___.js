var M1624710605850QWinButtonArray__=[
    ["Console state vars","M1624710809610console_state_var"],
    ["Console state outdated vars","M1624710938181consoleOutdatedSV"],
    ["Console state unknown vars","M1624717190003consoleUnknownVrs"],
    ["Update vars","M1624784042394upd_vars_________"],
]
var M1624862132021input_for________=(e)=>{
    return `<input id="${e.cid}" type="text">`//fixme
}
var M1624785360140ask_update_______=(ctxt)=>{
    console.log("please, update ",ctxt.id,ctxt.reason);
    let cid = M1624265066524rand_id__________();
    let text=`
    <p>id:${ctxt.id}. is ${ctxt.reason}</p>
    ${M1624862132021input_for________({cid:cid})}
    <button onclick="
    M1624861960052add_var__________({id:'${ctxt.id}',value: ${cid}.value, source:'M1624863618110srcNonSpfdUserInp'});
    document.body.removeChild(this.parentElement.parentElement);
    ">Submit</button>
    `
    M1624610193562UISpawnGeneric___({content:text,title:"pls update"})
}
var M1624863618110srcNonSpfdUserInp;//type:M1624862040598MayJessty_Word___
var M1624864048559Source_undefined_;
var M1624861880949source___________={}

var M1624864687777StateLastUpdated_={}



function M1624784857873check_vars_______(){
    M1624710841597state_vars_array_.forEach(
e=>{let a=M1624784680123get_value_of_____(window[e]);
    if(!a)M1624785360140ask_update_______({id:e,reason:"missing"});}
        )
}

function M1624784042394upd_vars_________(){
    M1624784857873check_vars_______()
    M1624783894053upd_unknown_vars_() 
    M1624784145046upd_outdated_vars()
}
function M1624784145046upd_outdated_vars(){
    M1624711126791outdatedStateVArr.forEach(
        (e,i)=>{
            console.log(e, "is outdated");
        })
}
function M1624783894053upd_unknown_vars_(){
    M1624713301510unknwnVarsArray__.forEach(
        (e,i)=>{
            console.log(e, "is unknown");
        })
}
function M1624717190003consoleUnknownVrs(){
    M1624713301510unknwnVarsArray__.forEach(e=>console.log(e))
}
function M1624710938181consoleOutdatedSV(){
    M1624711126791outdatedStateVArr.forEach(e=>console.log(e))
}
var M1624711126791outdatedStateVArr=["M1624710163221sleepiness_______"]
function M1624710809610console_state_var(){
    M1624710841597state_vars_array_.forEach(e=>console.log(e))
}
var M1624710508732QWindowContent___=M1624711410720arrToBtnNFA2Verti(M1624710605850QWinButtonArray__)
var M1624703189774QuestsPanelOnclic=()=>{
    M1624610193562UISpawnGeneric___({content:M1624710508732QWindowContent___, title:"Quests"})

}
var M1624710841597state_vars_array_=[
    "M1624710163221sleepiness_______",
    "M1624713327053state_focus______",
    "M1624713342802state_hydration__",
    "M1624713360127state_hunger_____",
    "M1624713381269state_healthiness",
    "M1624713404490state_fitness____"
]
// var types={}
var M1624804042294arr_known_types__=["M1624804074686type_dumb_float__"]
var M1624809690193input_for_type___={"M1624804074686type_dumb_float__":""
}

var M1624804125920is_type_known____ =(type)=>{
    if(M1624804042294arr_known_types__.includes(type))
    return true;
    else if (type in M1623149096904type_description_)
    return true;
    return false
}
var M1624713301510unknwnVarsArray__=[
    "M1624713404490state_fitness____"
]
var M1624710424636state_vars_______={
}
var M1624710437888state_categories_={}
var M1624710468067stateNeedUpdate__;
/*todo
ask state:
state - set of vars, changing

window: set state for (buttons, inputs)

state activates quests
*/
var M1624710163221sleepiness_______=0.1;
var M1624710262135my_hunger________//=rand id...
var M1624710207719hunger___________=M1624710262135my_hunger________;
var M1624783383996ask_update_status=(v)=>{
console.log("update",v)
}

var M1624784680123get_value_of_____=(v)=>{
    let ret = 0;
    if(1)
    ;
    else
    return undefined;
    return ret;
}
var M1624813965188skills_wish_list_=
[
"night vision"
]
function M1624853011968skillsWLtoWndwCon(){
    let text = "<ul>"
    M1624813965188skills_wish_list_.forEach(
        e=>{
            text+=`<li>${e}</li>`
        }
    )
    text+="</ul>"
    return text
}
var M1624814047237skills_menu_oncli=()=>{
    M1624635883699GenericToast_____({text:M1624853011968skillsWLtoWndwCon()})

}