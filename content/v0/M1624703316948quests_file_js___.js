var M1624710605850QWinButtonArray__=[
    ["Console state vars","M1624710809610console_state_var"],
    ["Console state outdated vars","M1624710938181consoleOutdatedSV"],
    ["Console state unknown vars","M1624717190003consoleUnknownVrs"],
]
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