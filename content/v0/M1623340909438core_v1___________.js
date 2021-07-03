var M1622905854863friend_list_______ =['M1622519980405clairdlwlrMayJesCA']
var M1623149096904type_description__={
M1623381806015js_date_timestamp_:"Date in js Date millis",
M1623381963144js_func_no_param__:"Javascript function, you can call it. No args.",
M1623382525520arg_context_______:"context object, used as the only argument for M1623382606037func_ctxt_param___",
M1623382606037func_ctxt_param___:"js function, executes with M1623382525520arg_context_______ context: func(context) ",
M1623382742815optional_argument_:"Optional argument",
M1623382859501func_or_funcNctxt_:"Expects either M1623381963144js_func_no_param_or 2 elements array [M1623382606037func_ctxt_param___,M1623382525520arg_context_______] ",
M1623380953987sched_entry_type__:"Schedule entry, callback + date. Cb is M1623382859501func_or_funcNctxt_",
M1623419285987func_uniq_context_:"Context, that the only one function could use. Same as M1623382525520arg_context_______, usage differs",
M1623419427526func_or_context___:"If typeof arg is func - it gets executed. Else, if it's a context object, their specifi fun is executed under it. (Type is Json key)",
M1623420084638json_single_pair__:"Json object, containing one top level kv pair. arg:value",
M1623423150372json_func_or_ctxt_:"Json object, containing one top level kv pair. arg:value. Interpreted as no arg function or ctxt for arg one, depending on the key",
M1623422752434String_ID_________:"ID, as a string",
M1623423915182sched_entry_type__:"Schedule entry. timestamp + json pair for callback ",
M1624862040598MayJessty_Word____:"MayJessty Language word, abstract, non executable, for building relations. Undefined.",
}
var M1623423218810same_as___________={"M1623423150372json_func_or_ctxt_":"M1623420084638json_single_pair__"}
var M1623420626142func_context_map__={}
var M1623419185461type_of___________=
{M16234191167340J6334325866259611:"M1623380953987sched_entry_type__",
M16234200453790J4972251000136489:"M1623423150372json_func_or_ctxt_",
M16234207655590J5522166381218481:"M1623420084638json_single_pair__",
M16234210663170J5278273137365788:"M1623381963144js_func_no_param__",
M16234223160830J3479410797937039:"M1623422752434String_ID_________",
M16234674993740J5765598061142514:"M1623423150372json_func_or_ctxt_",
M16234678188040J7800315232518074:"M1623423150372json_func_or_ctxt_",
}
var M1623340965445init_dos__________=['M1623341103805console_log_init__',
'M1623341045041load_schedule_____',
]
var M1623380596005schedule_loading__='M1623380659339load_schedule_____';
var M1623380765152schedule__________ = [];
var M1623380953987sched_entry_type__={M1623381855010when______________:"M1623381806015js_date_timestamp_",
M1623382413456what______________:"M1623382859501func_or_funcNctxt_",
}
var M1623423915182sched_entry_type__={
    M1623423961150when______________:"M1623381806015js_date_timestamp_",
    M1623424042413what______________:"M1623423150372json_func_or_ctxt_"
}
function M1623420750564add_func_ctxt_ent_(M16234207655590J5522166381218481) {
let a= JSON.parse(M16234207655590J5522166381218481);
let key=Object.keys(a)[0];
M1623420626142func_context_map__[key]=a[key];
}
function M1623341103805console_log_init__() {
    console.log(M1623340965445init_dos__________)
}
function M1623380659339load_schedule_____() {
    //opt1
    M1623380765152schedule__________=[{M1623381855010when______________:1623399944620,
    M1623382413456what______________:"M1623338942454notify4h__________"},{M1623381855010when______________:1623310044620,
        M1623382413456what______________:"M1623338942454notify4h__________"}]
}
var M1623396558409closest_scheduled_;
function M1623399091869schedule_pop_wrap_(M16234210663170J5278273137365788) {
    var M1623399210374sched_wrapper_ret_ = function(){
        M1623380765152schedule__________.shift();
        M16234210663170J5278273137365788();
        M1623396558409closest_scheduled_=undefined;
        M1623396757211cron_loop_iterati_();
    }
    return M1623399210374sched_wrapper_ret_;}
function M1623467807037is_func_no_args___(M16234678188040J7800315232518074){
    if(Object.keys(M16234678188040J7800315232518074)[0]==='M1623381963144js_func_no_param__')
    return true;
    else return false;
}
M1623420750564add_func_ctxt_ent_('{"M16234678188040J7800315232518074":"M1623467807037is_func_no_args___"}')
function M1623467473082schedule_pop_wrap_(M16234674993740J5765598061142514){

}
M1623420750564add_func_ctxt_ent_('{"M16234674993740J5765598061142514":"M1623467473082schedule_pop_wrap_"}');
function M1623488007129handle_error______(){}//fixme
function M1623399855321cron_sort_________() {
    M1623380765152schedule__________.sort(function(first,second){
        let firstwhen=first?.M1623381855010when______________||first?.M1623423961150when______________
        let secondwhen=second?.M1623381855010when______________||second?.M1623423961150when______________
        if(!firstwhen||!secondwhen) M1623488007129handle_error______("M1623399855321cron_sort_________")
        if(firstwhen<secondwhen)return -1;
        else if(firstwhen>secondwhen)return 1;
        return 0;
    })
}
M1623420750564add_func_ctxt_ent_('{"M16234210663170J5278273137365788":"M1623399091869schedule_pop_wrap_"}')
function M1623396393847cron_loop_________() {
}
function M1623338942454notify4h__________(){console.log("4h timer");}
function M1623339026997notify8h__________(){console.log("8h timer");}
function M1623422281903no_value_fallback_(M16234223160830J3479410797937039){
    console.log("no value for",M16234223160830J3479410797937039);//todo,fixme +separate call from implementation
}
M1623420750564add_func_ctxt_ent_('{"M16234223160830J3479410797937039":"M1623422281903no_value_fallback_"}')
function M1623420024045json_execute_simp_(M16234200453790J4972251000136489) {
    let a=JSON.parse(M16234200453790J4972251000136489);
    let key=Object.keys(a)[0];
    if(key==="M1623381963144js_func_no_param__")
    try {
        window[a[key]]();
    } catch (error) {
    }
    else if(M1623420626142func_context_map__[key]){
        window[M1623420626142func_context_map__[key]](a[key])
    }
    else M1623422281903no_value_fallback_(key);//fixme: validate value, not just key
    /*
M1623420024045json_execute_simp_('{"M1623381963144js_func_no_param__":"M1623339026997notify8h__________"}')
    */
}
M1623420750564add_func_ctxt_ent_('{"M16234200453790J4972251000136489":"M1623420024045json_execute_simp_"}')
function M1623402712813schedule_event____(M16234191167340J6334325866259611){//see type_of
    M1623380765152schedule__________.push(M16234191167340J6334325866259611);
    M1623399855321cron_sort_________();//fixme
}
/**
 
 M1623402712813schedule_event____(
     {M1623382413456what______________:"M1623339026997notify8h__________",
     M1623381855010when______________:1623404540305})
     
     */
    function M1623424438709schedule_event____(M16234244551300J9734327975885515){
        //    M1623423915182sched_entry_type__
        M1623380765152schedule__________.push();
        M1623399855321cron_sort_________();
        // M1623423961150when______________:
        // M1623424042413what______________:
    }
    M1623420750564add_func_ctxt_ent_('{"M16234244551300J9734327975885515":"M1623424438709schedule_event____"}')


function M1623396757211cron_loop_iterati_(){
    if(!M1623396558409closest_scheduled_){
        if(M1623380765152schedule__________.length>0){
        let M1623397472742delay_____________=M1623380765152schedule__________[0].M1623381855010when______________-Date.now();
        if(M1623397472742delay_____________<0)M1623397472742delay_____________=0;
        M1623396558409closest_scheduled_=setTimeout(M1623399091869schedule_pop_wrap_(window[M1623380765152schedule__________[0].M1623382413456what______________]),M1623397472742delay_____________)
    }}
}
function M1623425137088cron_iteration____(){//eats json versions too
    if(!M1623396558409closest_scheduled_){
        if(M1623380765152schedule__________.length>0){
            let entry = M1623380765152schedule__________[0];
            if(entry["M1623381855010when______________"])//type 1
            {
                let M1623425400697delay_____________=entry.M1623381855010when______________-Date.now();
                M1623396558409closest_scheduled_=setTimeout(M1623399091869schedule_pop_wrap_(window[entry.M1623382413456what______________]),M1623425400697delay_____________)
            }
            else if(entry["M1623423961150when______________"])//fixme
            {
                let M1623467189937delay_____________=M1623380765152schedule__________[0].M1623423961150when______________-Date.now();
                M1623467807037is_func_no_args___()
                M1623396558409closest_scheduled_=setTimeout(M1623478221484json_f_sched_wrap_(entry["M1623424042413what______________"]),M1623467189937delay_____________)
            }
        }
}
}
function M1623486235477simpl_schedul_put_(M16234862553850J3555863219345851){
    let jobj={};
    jobj.M1623381855010when______________= M16234862553850J3555863219345851.when;
    jobj.M1623382413456what______________= M16234862553850J3555863219345851.what;
    M1623402712813schedule_event____(jobj);
    M1623484637206clearing_cron_ite_();
}

function M1623478221484json_f_sched_wrap_(M16234782308300J8729407243961875){
    //arg is the type: value pair. if type is noarg func then value is a func to call
    //else if type is context for specific func then value is an arg forthat function
    //{"arg_for_func1":"context"}
    let obj=JSON.parse(M16234782308300J8729407243961875);
    let key=Object.keys(obj)[0];
    let ret;
        if(key==="M1623381963144js_func_no_param__"){
            ret = function(){
                M1623380765152schedule__________.shift();
                window[obj[key]]()
                M1623396558409closest_scheduled_=undefined;
                M1623396757211cron_loop_iterati_();
            }}
        else {
            let a = M1623420626142func_context_map__[window[key]] 
            ret = function(){
                M1623380765152schedule__________.shift();
                window[a](obj[key]);
                M1623396558409closest_scheduled_=undefined;
                M1623396757211cron_loop_iterati_();
            }
        }
        return ret;
}
M1623420750564add_func_ctxt_ent_('{"M16234782308300J8729407243961875":"M1623478221484json_f_sched_wrap_"}')
function M1623402968124clearing_cron_ite_(){
    if(!M1623396558409closest_scheduled_){
        if(M1623380765152schedule__________.length>0){
        let M1623397472742delay_____________=M1623380765152schedule__________[0].M1623381855010when______________-Date.now();
        if(M1623397472742delay_____________<0)M1623397472742delay_____________=0;
        M1623396558409closest_scheduled_=setTimeout(M1623399091869schedule_pop_wrap_(window[M1623380765152schedule__________[0].M1623382413456what______________]),M1623397472742delay_____________)
    }
} else {clearTimeout(M1623396558409closest_scheduled_);
    M1623396558409closest_scheduled_=undefined;
    M1623402968124clearing_cron_ite_();
}}
function M1623484637206clearing_cron_ite_(){//called once after insertion
    if(!M1623396558409closest_scheduled_){
        M1623425137088cron_iteration____();
    }
    else{clearTimeout(M1623396558409closest_scheduled_);
        M1623396558409closest_scheduled_=undefined;
        M1623425137088cron_iteration____();
    }
}
function M1623341045041load_schedule_____(){
window[M1623380596005schedule_loading__]();
}

function M1623340925602init______________()
{
M1623340965445init_dos__________.forEach(el=>{try {window[el](); }catch (error){}})
}