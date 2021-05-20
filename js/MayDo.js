//Include after ejs

class Action{//simple action
    constructor(opts,meta){
        this.context_needed=opts?.context||{};
        this.meta=meta||{name:'undef'};
        this.eval=opts?.eval;
    }
    // static eval_patch(a,p){
    //     let result=a;
    //     Object.keys(p).forEach((key)=>{a=})
    //     return a;                                                                                     
    // }
    do_eval(context){//},patch){
        // Function(Action.eval_patch(this.eval,patch)).call(context);
        Function(this.eval).call(context);
    }
    // do_eval_with(context,patch){//},patch){
    //     with(patch){
    //     Function(this.eval).call(context);}
    // }
}
class ManagedAction{
    constructor(action,source){
        //implement trust policies here
        this.action=action;
        if(!source)
        this.policy={eval:false};
        else if(source=='user')
        this.policy={eval:true};
    }
    do(context){
        this.policy.eval==true?
        this.action.do_eval(context):
        console.log('not permited')
    }
    // do_with(context, patch){
    //     if(this.policy.eval==true){
    //     this.action.do_eval_with(context,patch);}
    //     else
    //     console.log('not permited')
    // }
    
}
class State{
    constructor(state){
    this.state = state;
}
    show_difference(another){
        // another.state...
        // this.state...
        // array.forEach(element => {
            
        // });
    }
}//context?
class StateDifference{}//problem?

class MayDo{
    static tolearn={}
    static logs={}
    static UI={panels:{'main': {controls:[{}]}},
    render_panel: function (name,div) {
        //todo: make it an action instead
        let panel= MayDo.UI.panels[name];
        let markup=`
        <button>PANEL test</button>
        <button onclick="MayDo.do('open_quest_window')">Quests</button>
        <button onclick="console.log(MayDo.actions);">actions</button>
        `
        document.getElementById(div).innerHTML=markup;
    }
}
    static memory={}
    static async analyze(){
        Object.keys(MayDo.logs).forEach(key => {
            console.log(MayDo.logs[key]);
            MayDo.tolearn[MayDo.logs[key]]=1;
            delete MayDo.logs[key];
        });
    }
    static actions={
        'open_quest_window':new ManagedAction(new Action
            ({eval:"toggle(quest_window)"}),'user')
        
        }
    
    static talk(arg){
        console.log(arg)
    }
    static log(
        entry
    ){
        MayDo.logs[Date.now()]=entry;
        if(typeof entry === 'string')
        MayDo.tolearn[entry]=Date.now();
        else console.log(typeof entry, entry)
    }
    static show_logs(){
        console.log(MayDo.logs)
    }
    static show_todo(){
        console.log(MayDo.tolearn)
    }
    static do(what){
        let context={};
 let act = MayDo.actions[what];
 if(act)
 {
    // console.log(act)
     //  act(context)
    //  console.log(act instanceof ManagedAction);
     act.do(context);
    }
else MayDo.log(what);
}
static save_local(){
    localStorage.setItem('MayDo.tolearn',JSON.stringify(MayDo.tolearn));
    localStorage.setItem('MayDo.memory',JSON.stringify(MayDo.memory));
    localStorage.setItem('MayDo.actions',JSON.stringify(MayDo.actions));
    // localStorage.setItem('MayDo.UI',JSON.stringify(MayDo.UI));
}
static load_local(){
    MayDo.tolearn=JSON.parse(localStorage.getItem('MayDo.tolearn'));
    MayDo.memory=JSON.parse(localStorage.getItem('MayDo.memory'))
    MayDo.actions=JSON.parse(localStorage.getItem('MayDo.actions'));
    // console.log(localStorage.getItem('MayDo.actions'));
    Object.keys(MayDo.actions).forEach(
        key=>{
            // console.log(key);
            var tmp = new ManagedAction();
            Object.assign(tmp,MayDo.actions[key])
            MayDo.actions[key]=tmp;
            tmp=new Action();
            Object.assign(tmp, MayDo.actions[key].action);
            MayDo.actions[key].action=tmp;
        });
    // MayDo.UI=JSON.parse(localStorage.getItem('MayDo.UI'),Function.deserialize);
}
}
// Function.deserialize= function(key, data) {
//     return (data instanceof Array && data[0] == 'window.Function')?
//     new (Function.bind.apply(Function, [Function].concat(data[1],data[2]))):
//     data;
// }
window.onerror=(a,b, line, col, e)=>{console.log(a);
    let name = a.split(' ');

if(e instanceof ReferenceError){
    name = name.slice(2,(name.length-3));
    MayDo.log(name);
    console.log(name);}
else if(e instanceof TypeError)
{
name = name.slice(2,(name.length-4));
    console.log(name);
    MayDo.log(name);
}}

var anal_loop_flag=true;
async function anal_loop(){//start analyze subroutine
setTimeout(async function(){
    if(anal_loop_flag){
        console.log('Analyzing logs');
        MayDo.analyze();
    }
        anal_loop();},12000);
}
// MayDo.load_local();
anal_loop();

var rav = new ManagedAction(new Action
    ({eval:"let context=this; console.log('eval'); console.log('context:', context);"}),'user');
var ravsum = new ManagedAction(new Action
    ({eval:"let context=this; context.c=context.a+context.b;"}),'user');
var inc_a = new ManagedAction(new Action
    ({eval:"let context=this; this.a+=1;"}),'user');
var inc_b=inc_a;//modify ctxt for specific call
var ctxt={a: 2,b: 3};
function a_seq(ctxt,arr) {
    arr.forEach(e=>e.do(ctxt))
}
a_seq(ctxt,[inc_a,inc_a,ravsum,rav]);
