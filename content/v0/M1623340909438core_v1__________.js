var M1622905854863friend_list______ =['M1622519980405clairdlwlrMayJesCA']
var M1623149096904type_description_={
M1623381806015js_date_timestamp:"Date in js Date millis",
M1623381963144js_func_no_param_:"Javascript function, you can call it. No args.",
M1623382525520arg_context______:"context object, used as the only argument for M1623382606037func_ctxt_param__",
M1623382606037func_ctxt_param__:"js function, executes with M1623382525520arg_context______ context: func(context) ",
M1623382742815optional_argument:"Optional argument",
M1623382859501func_or_funcNctxt:"Expects either M1623381963144js_func_no_param_or 2 elements array [M1623382606037func_ctxt_param__,M1623382525520arg_context______] ",
M1623380953987sched_entry_type_:"Schedule entry, callback + date. Cb is M1623382859501func_or_funcNctxt",
M1623419285987func_uniq_context:"Context, that the only one function could use. Same as M1623382525520arg_context______, usage differs",
M1623419427526func_or_context__:"If typeof arg is func - it gets executed. Else, if it's a context object, their specifi fun is executed under it. (Type is Json key)",
M1623420084638json_single_pair_:"Json object, containing one top level kv pair. arg:value",
M1623423150372json_func_or_ctxt:"Json object, containing one top level kv pair. arg:value. Interpreted as no arg function or ctxt for arg one, depending on the key",
M1623422752434String_ID________:"ID, as a string",
M1623423915182sched_entry_type_:"Schedule entry. timestamp + json pair for callback ",
M1624862040598MayJessty_Word___:"MayJessty Language word, abstract, non executable, for building relations. Undefined.",
}
var M1623423218810same_as__________={"M1623423150372json_func_or_ctxt":"M1623420084638json_single_pair_"}
var M1623420626142func_context_map_={}
var M1623419185461type_of__________=
{M16234191167340J6334325866259611:"M1623380953987sched_entry_type_",
M16234200453790J4972251000136489:"M1623423150372json_func_or_ctxt",
M16234207655590J5522166381218481:"M1623420084638json_single_pair_",
M16234210663170J5278273137365788:"M1623381963144js_func_no_param_",
M16234223160830J3479410797937039:"M1623422752434String_ID________",
M16234674993740J5765598061142514:"M1623423150372json_func_or_ctxt",
M16234678188040J7800315232518074:"M1623423150372json_func_or_ctxt",
}
var M1623340965445init_dos_________=['M1623341103805console_log_init_',
'M1623341045041load_schedule____',
]
var M1623380596005schedule_loading_='M1623380659339load_schedule____';
var M1623380765152schedule_________ = [];
var M1623380953987sched_entry_type_={M1623381855010when_____________:"M1623381806015js_date_timestamp",
M1623382413456what_____________:"M1623382859501func_or_funcNctxt",
}
var M1623423915182sched_entry_type_={
    M1623423961150when_____________:"M1623381806015js_date_timestamp",
    M1623424042413what_____________:"M1623423150372json_func_or_ctxt"
}
function M1623420750564add_func_ctxt_ent(M16234207655590J5522166381218481) {
let a= JSON.parse(M16234207655590J5522166381218481);
let key=Object.keys(a)[0];
M1623420626142func_context_map_[key]=a[key];
}
function M1623341103805console_log_init_() {
    console.log(M1623340965445init_dos_________)
}
function M1623380659339load_schedule____() {
    //opt1
    M1623380765152schedule_________=[{M1623381855010when_____________:1623399944620,
    M1623382413456what_____________:"M1623338942454notify4h_________"},{M1623381855010when_____________:1623310044620,
        M1623382413456what_____________:"M1623338942454notify4h_________"}]
}
var M1623396558409closest_scheduled;
function M1623399091869schedule_pop_wrap(M16234210663170J5278273137365788) {
    var M1623399210374sched_wrapper_ret = function(){
        M1623380765152schedule_________.shift();
        M16234210663170J5278273137365788();
        M1623396558409closest_scheduled=undefined;
        M1623396757211cron_loop_iterati();
    }
    return M1623399210374sched_wrapper_ret;}
function M1623467807037is_func_no_args__(M16234678188040J7800315232518074){
    if(Object.keys(M16234678188040J7800315232518074)[0]==='M1623381963144js_func_no_param_')
    return true;
    else return false;
}
M1623420750564add_func_ctxt_ent('{"M16234678188040J7800315232518074":"M1623467807037is_func_no_args__"}')
function M1623467473082schedule_pop_wrap(M16234674993740J5765598061142514){

}
M1623420750564add_func_ctxt_ent('{"M16234674993740J5765598061142514":"M1623467473082schedule_pop_wrap"}');
function M1623488007129handle_error_____(){}//fixme
function M1623399855321cron_sort________() {
    M1623380765152schedule_________.sort(function(first,second){
        let firstwhen=first?.M1623381855010when_____________||first?.M1623423961150when_____________
        let secondwhen=second?.M1623381855010when_____________||second?.M1623423961150when_____________
        if(!firstwhen||!secondwhen) M1623488007129handle_error_____("M1623399855321cron_sort________")
        if(firstwhen<secondwhen)return -1;
        else if(firstwhen>secondwhen)return 1;
        return 0;
    })
}
M1623420750564add_func_ctxt_ent('{"M16234210663170J5278273137365788":"M1623399091869schedule_pop_wrap"}')
function M1623396393847cron_loop________() {
}
function M1623338942454notify4h_________(){console.log("4h timer");}
function M1623339026997notify8h_________(){console.log("8h timer");}
function M1623422281903no_value_fallback(M16234223160830J3479410797937039){
    console.log("no value for",M16234223160830J3479410797937039);//todo,fixme +separate call from implementation
}
M1623420750564add_func_ctxt_ent('{"M16234223160830J3479410797937039":"M1623422281903no_value_fallback"}')
function M1623420024045json_execute_simp(M16234200453790J4972251000136489) {
    let a=JSON.parse(M16234200453790J4972251000136489);
    let key=Object.keys(a)[0];
    if(key==="M1623381963144js_func_no_param_")
    try {
        window[a[key]]();
    } catch (error) {
    }
    else if(M1623420626142func_context_map_[key]){
        window[M1623420626142func_context_map_[key]](a[key])
    }
    else M1623422281903no_value_fallback(key);//fixme: validate value, not just key
    /*
M1623420024045json_execute_simp('{"M1623381963144js_func_no_param_":"M1623339026997notify8h_________"}')
    */
}
M1623420750564add_func_ctxt_ent('{"M16234200453790J4972251000136489":"M1623420024045json_execute_simp"}')
function M1623402712813schedule_event___(M16234191167340J6334325866259611){//see type_of
    M1623380765152schedule_________.push(M16234191167340J6334325866259611);
    M1623399855321cron_sort________();//fixme
}
/**
 
 M1623402712813schedule_event___(
     {M1623382413456what_____________:"M1623339026997notify8h_________",
     M1623381855010when_____________:1623404540305})
     
     */
    function M1623424438709schedule_event___(M16234244551300J9734327975885515){
        //    M1623423915182sched_entry_type_
        M1623380765152schedule_________.push();
        M1623399855321cron_sort________();
        // M1623423961150when_____________:
        // M1623424042413what_____________:
    }
    M1623420750564add_func_ctxt_ent('{"M16234244551300J9734327975885515":"M1623424438709schedule_event___"}')


function M1623396757211cron_loop_iterati(){
    if(!M1623396558409closest_scheduled){
        if(M1623380765152schedule_________.length>0){
        let M1623397472742delay____________=M1623380765152schedule_________[0].M1623381855010when_____________-Date.now();
        if(M1623397472742delay____________<0)M1623397472742delay____________=0;
        M1623396558409closest_scheduled=setTimeout(M1623399091869schedule_pop_wrap(window[M1623380765152schedule_________[0].M1623382413456what_____________]),M1623397472742delay____________)
    }}
}
function M1623425137088cron_iteration___(){//eats json versions too
    if(!M1623396558409closest_scheduled){
        if(M1623380765152schedule_________.length>0){
            let entry = M1623380765152schedule_________[0];
            if(entry["M1623381855010when_____________"])//type 1
            {
                let M1623425400697delay____________=entry.M1623381855010when_____________-Date.now();
                M1623396558409closest_scheduled=setTimeout(M1623399091869schedule_pop_wrap(window[entry.M1623382413456what_____________]),M1623425400697delay____________)
            }
            else if(entry["M1623423961150when_____________"])//fixme
            {
                let M1623467189937delay____________=M1623380765152schedule_________[0].M1623423961150when_____________-Date.now();
                M1623467807037is_func_no_args__()
                M1623396558409closest_scheduled=setTimeout(M1623478221484json_f_sched_wrap(entry["M1623424042413what_____________"]),M1623467189937delay____________)
            }
        }
}
}
function M1623486235477simpl_schedul_put(M16234862553850J3555863219345851){
    let jobj={};
    jobj.M1623381855010when_____________= M16234862553850J3555863219345851.when;
    jobj.M1623382413456what_____________= M16234862553850J3555863219345851.what;
    M1623402712813schedule_event___(jobj);
    M1623484637206clearing_cron_ite();
}

function M1623478221484json_f_sched_wrap(M16234782308300J8729407243961875){
    //arg is the type: value pair. if type is noarg func then value is a func to call
    //else if type is context for specific func then value is an arg forthat function
    //{"arg_for_func1":"context"}
    let obj=JSON.parse(M16234782308300J8729407243961875);
    let key=Object.keys(obj)[0];
    let ret;
        if(key==="M1623381963144js_func_no_param_"){
            ret = function(){
                M1623380765152schedule_________.shift();
                window[obj[key]]()
                M1623396558409closest_scheduled=undefined;
                M1623396757211cron_loop_iterati();
            }}
        else {
            let a = M1623420626142func_context_map_[window[key]] 
            ret = function(){
                M1623380765152schedule_________.shift();
                window[a](obj[key]);
                M1623396558409closest_scheduled=undefined;
                M1623396757211cron_loop_iterati();
            }
        }
        return ret;
}
M1623420750564add_func_ctxt_ent('{"M16234782308300J8729407243961875":"M1623478221484json_f_sched_wrap"}')
function M1623402968124clearing_cron_ite(){
    if(!M1623396558409closest_scheduled){
        if(M1623380765152schedule_________.length>0){
        let M1623397472742delay____________=M1623380765152schedule_________[0].M1623381855010when_____________-Date.now();
        if(M1623397472742delay____________<0)M1623397472742delay____________=0;
        M1623396558409closest_scheduled=setTimeout(M1623399091869schedule_pop_wrap(window[M1623380765152schedule_________[0].M1623382413456what_____________]),M1623397472742delay____________)
    }
} else {clearTimeout(M1623396558409closest_scheduled);
    M1623396558409closest_scheduled=undefined;
    M1623402968124clearing_cron_ite();
}}
function M1623484637206clearing_cron_ite(){//called once after insertion
    if(!M1623396558409closest_scheduled){
        M1623425137088cron_iteration___();
    }
    else{clearTimeout(M1623396558409closest_scheduled);
        M1623396558409closest_scheduled=undefined;
        M1623425137088cron_iteration___();
    }
}
function M1623341045041load_schedule____(){
window[M1623380596005schedule_loading_]();
}

function M1623340925602init_____________()
{
M1623340965445init_dos_________.forEach(el=>{try {window[el](); }catch (error){}})
}