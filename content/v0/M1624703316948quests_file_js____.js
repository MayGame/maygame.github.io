var M1624710605850QWinButtonArray___=[
    ["Console state vars","M1624710809610console_state_var_"],
    ["Console state outdated vars","M1624710938181consoleOutdatedSV_"],
    ["Console state unknown vars","M1624717190003consoleUnknownVrs_"],
    ["Update vars","M1624784042394upd_vars__________"],
]
var M1624862132021input_for_________=(e)=>{
    return `<input id="${e.cid}" type="text">`//fixme
}
var M1624785360140ask_update________=(ctxt)=>{
    console.log("please, update ",ctxt.id,ctxt.reason);
    let cid = M1624265066524rand_id___________();
    let text=`
    <p>id:${ctxt.id}. is ${ctxt.reason}</p>
    ${M1624862132021input_for_________({cid:cid})}
    <button onclick="
    M1624861960052add_var___________({id:'${ctxt.id}',value: ${cid}.value, source:'M1624863618110srcNonSpfdUserInp_'});
    document.body.removeChild(this.parentElement.parentElement);
    ">Submit</button>
    `
    M1624610193562UISpawnGeneric____({content:text,title:"pls update"})
}
var M1624863618110srcNonSpfdUserInp_;//type:M1624862040598MayJessty_Word____
var M1624864048559Source_undefined__;
var M1624861880949source____________={}

var M1624864687777StateLastUpdated__={}



function M1624784857873check_vars________(){
    M1624710841597state_vars_array__.forEach(
e=>{let a=M1624784680123get_value_of______(window[e]);
    if(!a)M1624785360140ask_update________({id:e,reason:"missing"});}
        )
}

function M1624784042394upd_vars__________(){
    M1624784857873check_vars________()
    M1624783894053upd_unknown_vars__() 
    M1624784145046upd_outdated_vars_()
}
function M1624784145046upd_outdated_vars_(){
    M1624711126791outdatedStateVArr_.forEach(
        (e,i)=>{
            console.log(e, "is outdated");
        })
}
function M1624783894053upd_unknown_vars__(){
    M1624713301510unknwnVarsArray___.forEach(
        (e,i)=>{
            console.log(e, "is unknown");
        })
}
function M1624717190003consoleUnknownVrs_(){
    M1624713301510unknwnVarsArray___.forEach(e=>console.log(e))
}
function M1624710938181consoleOutdatedSV_(){
    M1624711126791outdatedStateVArr_.forEach(e=>console.log(e))
}
var M1624711126791outdatedStateVArr_=["M1624710163221sleepiness________"]
function M1624710809610console_state_var_(){
    M1624710841597state_vars_array__.forEach(e=>console.log(e))
}
var M1624710508732QWindowContent____=M1624711410720arrToBtnNFA2Verti_(M1624710605850QWinButtonArray___)
var M1624703189774QuestsPanelOnclic_=()=>{
    M1624610193562UISpawnGeneric____({content:M1624710508732QWindowContent____, title:"Quests"})

}
var M1624710841597state_vars_array__=[
    "M1624710163221sleepiness________",
    "M1624713327053state_focus_______",
    "M1624713342802state_hydration___",
    "M1624713360127state_hunger______",
    "M1624713381269state_healthiness_",
    "M1624713404490state_fitness_____"
]
// var types={}
var M1624804042294arr_known_types___=["M1624804074686type_dumb_float___"]
var M1624809690193input_for_type____={"M1624804074686type_dumb_float___":""
}

var M1624804125920is_type_known_____ =(type)=>{
    if(M1624804042294arr_known_types___.includes(type))
    return true;
    else if (type in M1623149096904type_description__)
    return true;
    return false
}
var M1624713301510unknwnVarsArray___=[
    "M1624713404490state_fitness_____"
]
var M1624710424636state_vars________={
}
var M1624710437888state_categories__={}
var M1624710468067stateNeedUpdate___;
/*todo
ask state:
state - set of vars, changing

window: set state for (buttons, inputs)

state activates quests
*/
var M1624710163221sleepiness________=0.1;
var M1624710262135my_hunger_________//=rand id...
var M1624710207719hunger____________=M1624710262135my_hunger_________;
var M1624783383996ask_update_status_=(v)=>{
console.log("update",v)
}

var M1624784680123get_value_of______=(v)=>{
    let ret = 0;
    if(1)
    ;
    else
    return undefined;
    return ret;
}
var M1624813965188skills_wish_list__=
[
"night vision"
]
function M1624853011968skillsWLtoWndwCon_(){
    let text = "<ul>"
    M1624813965188skills_wish_list__.forEach(
        e=>{
            text+=`<li>${e}</li>`
        }
    )
    text+="</ul>"
    return text
}
var M1624814047237skills_menu_oncli_=()=>{
    M1624635883699GenericToast______({text:M1624853011968skillsWLtoWndwCon_()})

}