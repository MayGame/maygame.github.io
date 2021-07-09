const M1622519980405clairdlwlrMayJesCA = true;
var M1625535370183handler_apply_____ =  function(target, thisArg, argumentsList){
    console.log("Yeye")
    if(argumentsList[0])
    return target(argumentsList[0])
    else return target;
}

var M1625535165819handler_basicProxy = {
    // apply:M1625535370183handler_apply_____,
    apply:function(target, thisArg, argumentsList){
        console.log("Yeye")
        if(argumentsList[0])
        return target(argumentsList[0])
        else return target;
    }
}
var M1625068079944JesSWindowProxXxy_=new Proxy(window,M1625535165819handler_basicProxy);
var testfunc = function(){console.log(2)};
M1625068079944JesSWindowProxXxy_["testfunc"]();
// var M1625068079944JesSWindowProxXxy_=window;
var M1625063417462CoreToLoad________;
// var 
// var M1625463760212LstOfImportntThngs = []
// var M1625463700198FetchImportntThngs = function(){
// // let store = M1623941499181idb_Mayn_db_______.transaction('M1623945792684idb_thesaurus_____',"readwrite").objectStore("M1623945792684idb_thesaurus_____");
// // M1625463760212LstOfImportntThngs
// M1625300496229IDBThesaurusGetCB_({key:"M1625463760212LstOfImportntThngs",cb:function(M16254784050120J0553455690855821){
//     let tmp = M16254784050120J0553455690855821.target.result;
//     if(tmp){
        
//         M1625068079944JesSWindowProxXxy_["M1625463760212LstOfImportntThngs"]=tmp;
//         M1625068079944JesSWindowProxXxy_["M1625463760212LstOfImportntThngs"].forEach(el=>{
//             // if(el.body&&el.arg&&el.key)
//             M1625297347110Deserial_function_(el)
//         })
//     }
// }})
// }

var M1625063654235InitVarrssksks____=function(){
    let store = M1623941499181idb_Mayn_db_______.transaction('M1623940897095idb_func_arg_stor_',"readwrite").objectStore("M1623945792684idb_thesaurus_____");
    store.openCursor().onsuccess=function(e){
        var cursor = e.target.result;
        if (cursor) {
            M1625297347110Deserial_function_({key:cursor.key})
          cursor.continue();
        }
        else {
          console.log("Func init finished");
          window.dispatchEvent(new CustomEvent(""))        
            
        }
    }
    // M1625068079944JesSWindowProxXxy_=window;
    // M1625063417462CoreToLoad________=
    // M1625068079944JesSWindowProxXxy_[M1625063417462CoreToLoad________]
    //()=>console.log("V-1");

}
var M1625220622470NoCoreFallback____=function(){
    alert("No core");
    // let store = M1623941499181idb_Mayn_db_______.transaction('M1623945792684idb_thesaurus_____',"readwrite").objectStore("M1623945792684idb_thesaurus_____");
    // store.put("M1625294924126SubCorr___________",'M1625063417462CoreToLoad________')
//     M1625301090123Srialize_function_({
// key: "M1625294924126SubCorr___________",text:`function(){
//             console.log("Hi, Mistress");
//         }`
//     })
//     M1625284003422LodCorr___________();
}
var M1625282527470OnCorrLoaddeed____=function(M16252825647730J5031440897863075){
    let ex = M1625068079944JesSWindowProxXxy_[M16252825647730J5031440897863075.detail.core];
    // console.log(ex);
    ex();
}
var M1625496980098OnCorrKnown_______=function(M16254970028490J3228711664140349){
    M1625300496229IDBThesaurusGetCB_({key:key,cb:function(M16254979038500J5527428907636049)
        {M16254979038500J5527428907636049
        
        }})
}
var M1625284003422LodCorr___________=function(){
    if(!M1623941499181idb_Mayn_db_______){setTimeout(M1625284003422LodCorr___________,100); return;}
    let store = M1623941499181idb_Mayn_db_______.transaction('M1623945792684idb_thesaurus_____',"readonly").objectStore("M1623945792684idb_thesaurus_____")
    let req = store.get('M1625063417462CoreToLoad________');
    req.onsuccess=function(){
        M1625068079944JesSWindowProxXxy_[M1625063417462CoreToLoad________]=req.result;
        console.log("loddin", req.result);
        if(req.result)
        window.dispatchEvent(new CustomEvent("M1625282460482CorrLoaddeed______", {detail:{core:req.result}})) ;
        else {
            console.log(req.error, req.result,"falling back to NoCore")
            window.dispatchEvent(new CustomEvent("M1625282460482CorrLoaddeed______", {detail:{core:"M1625220622470NoCoreFallback____"}}))        
        }
    }
    req.onerror=function(){
        console.log(req.error, req.result,"falling back to NoCore")
        window.dispatchEvent(new CustomEvent("M1625282460482CorrLoaddeed______", {detail:{core:"M1625220622470NoCoreFallback____"}}))        
    }
}
var M1625283856579CorrLddEvListener_;
async function M1625063458700JessyNeat_________(){
    M1625283856579CorrLddEvListener_=window.addEventListener("M1625282460482CorrLoaddeed______",M1625282527470OnCorrLoaddeed____)
    await M1623941545551idb_Mayn_db_init__();
    // M1625119163931GetCore___________();
    M1625284003422LodCorr___________();
    // M1625220622470NoCoreFallback____();
}
//#region 
var M1623941001884idb_stores_list___=[
    'M1623945792684idb_thesaurus_____',//all vars go here
    'M1623940897095idb_func_arg_stor_',//map arg name tofunc name. arg - key, func - value
    'M1623831451834idb_descript_stor_',//description for key
    'M1623940635385idb_type_map______',//type of given variable
    'M1623945927273idb_related_vars__',
    'M1623948002128idb_dom_typeof_st_',//grabbed data from dom
    'M1625105007943IDBStoreMeta______',//source, additional values, timestamp...
    ]
var M1624881345841IDB_store_index___={   
    // storage: db_name
'M1623945792684idb_thesaurus_____':"memoires_eternels",
'M1623940897095idb_func_arg_stor_':"memoires_eternels",
'M1623831451834idb_descript_stor_':"memoires_eternels",
'M1623940635385idb_type_map______':"memoires_eternels",
'M1623945927273idb_related_vars__':"memoires_eternels",
'M1623948002128idb_dom_typeof_st_':"memoires_eternels",                                              
'M1625105007943IDBStoreMeta______':"memoires_eternels",
}
var M1623941499181idb_Mayn_db_______;
var M1623943250216idb_Mayn_db_cnct__;
var M1623942055880idb_Mayn_db_name__="memoires_eternels";
var M1623774638130idb_transaction___ = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || { READ_WRITE: "readwrite" };
var M1623820653095indexedb__________ = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var M1623820745971idb_keyrange______ = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

var M1623821216754indexeddb_opendb__=async function (M16238212857720J4238014379729269){
    M1625068079944JesSWindowProxXxy_[M16238212857720J4238014379729269[0]] = M1623820653095indexedb__________
    .open(M16238212857720J4238014379729269[1],M16238212857720J4238014379729269[2])
}
var M1623941545551idb_Mayn_db_init__=async function (){
    await M1623821216754indexeddb_opendb__(["M1623943250216idb_Mayn_db_cnct__",M1623942055880idb_Mayn_db_name__,2]);
    M1623943250216idb_Mayn_db_cnct__.onupgradeneeded = function(event) {
        M1623941499181idb_Mayn_db_______ = event.target.result;
        M1623941001884idb_stores_list___.forEach(e=>{
            if (!M1623941499181idb_Mayn_db_______.objectStoreNames.contains(e)) {
            M1623941499181idb_Mayn_db_______.createObjectStore(e);}
        })
    };
    M1623943250216idb_Mayn_db_cnct__.onsuccess = function() {
        M1623941499181idb_Mayn_db_______=M1623943250216idb_Mayn_db_cnct__.result;

        M1623941499181idb_Mayn_db_______.onversionchange = function() {
            M1623941499181idb_Mayn_db_______.close();
          alert("Database is outdated, please reload the page.")
}}}
var M1625300496229IDBThesaurusGetCB_ = function(M16253001282300J6024000346344986){
    let key = M16253001282300J6024000346344986.key;
    let callback = M16253001282300J6024000346344986.cb;
    let store = M1623941499181idb_Mayn_db_______.transaction('M1623945792684idb_thesaurus_____',"readonly").objectStore("M1623945792684idb_thesaurus_____")
    let req = store.get(key);
    req.onsuccess=callback;
}
//#endregion
//#region core
// var M1625294924126SubCorr___________ = function(){
//     console.log("Hi, Mistress");
//     let store = M1623941499181idb_Mayn_db_______.transaction('M1623945792684idb_thesaurus_____',"readwrite").objectStore("M1623945792684idb_thesaurus_____");
//     store.put("M1625294924126SubCorr___________",'M1625063417462CoreToLoad________');

// }
var M1625297347110Deserial_function_=function(M16252973756790J2619777814455608){
    let key = M16252973756790J2619777814455608.key;
    M1625300496229IDBThesaurusGetCB_({key:key,cb:function(M16253008862770J8563612302758874)
        {
            let text = M16253008862770J8563612302758874.target.result
            // console.log(text);
            let func = Function(text.arg, text.body);
            M1625068079944JesSWindowProxXxy_[text.key]=func;
            // console.log(func, func.toString(), text)
            return func;
            // key 

        }})
//    window[M16252973756790J2619777814455608.key]//from idb:=new Function()('return ' + foo.toString())()
}
// let fa = new Function()
var M1625310367858ID_RegExp_________ =new RegExp(/M\d{13}\w{18}/,'g')
var M1625320414108Func_Get_Arg_Name_=function(M16253205254550J1305364840200156){
    let text = M16253205254550J1305364840200156;
    // let result = M16253205254550J1305364840200156.match(/function*?\(\W*(\w*)/);
    let result = text.substring(text.indexOf("(")+1,text.indexOf(")"));
    // if(result)
    // return result[1];
    // else return "";
    return result||"";
}
var M1625306744551funcStrGetRelated_ = function(M16253067937360J4115575867813261){
    const result = [...M16253067937360J4115575867813261.matchAll(M1625310367858ID_RegExp_________)];
    let flet = [];
    result.forEach(e=>{flet.push(e[0])})
    return [...new Set(flet)];
}
//M1625406744808Type_JS_Function__
var M1625805527580MayJesstyTypeIndex = {
    // "MJword":"its type"
}
var M1625819920757MayJesstyIndices__={
    // "type":"its index"
}
var M1625828670593MayJessLearnNewTyp = function(typen){
    var ind = M1625819920757MayJesstyIndices__[typen];
    if(!ind){
        let newIndex = M1625828153481MJGenIndexNameFor_(typen);
        M1625819920757MayJesstyIndices__[typen]=newIndex;
        M1625829133478IDBUpdMayJesstyVar("M1625819920757MayJesstyIndices__");
        window[newIndex]={}
        M1625829133478IDBUpdMayJesstyVar(newIndex);
    }
}
var M1625829133478IDBUpdMayJesstyVar = function(M1625829174202ARGSerializableVar){
    let v = window[M1625829174202ARGSerializableVar];
    let store = M1623941499181idb_Mayn_db_______.transaction(
        ["M1623945792684idb_thesaurus_____"]).objectStore("M1623945792684idb_thesaurus_____")
    store.put(v,M1625829174202ARGSerializableVar)
}
var M1625828153481MJGenIndexNameFor_ = function(M1625828183717ARG_Name_to_be_ind){
    return "M"+Date.now()+"IND4"+ M1625828183717ARG_Name_to_be_ind.slice(14,28);}
var M1625819728564MayJesstyWordToIDB = function(M1625805395680ARG_WORD__________){
let w=M1625805395680ARG_WORD__________;
let typeof_w =  M1625805527580MayJesstyTypeIndex[w];
let typeInd =   M1625819920757MayJesstyIndices__[typeof_w];
let transaction = M1623941499181idb_Mayn_db_______.transaction(
["M1623945792684idb_thesaurus_____",
// "M1623940635385idb_type_map______",//no typemap, simple obj indices for now.
"M1625105007943IDBStoreMeta______"],"readwrite")
let thes = transaction.objectStore("M1623945792684idb_thesaurus_____");
let meta = transaction.objectStore("M1625105007943IDBStoreMeta______");
}
var M1625301090123Srialize_function_ = function(M16253011146210J9441376555473651){//arg - string(id) or obj
    let key;
    let text;
    let transaction=M1623941499181idb_Mayn_db_______.transaction(['M1623945792684idb_thesaurus_____',
    'M1623940897095idb_func_arg_stor_','M1623945927273idb_related_vars__','M1625105007943IDBStoreMeta______',/*'M1623940635385idb_type_map______'*/],"readwrite")
    let thes = transaction.objectStore("M1623945792684idb_thesaurus_____");
    if(typeof M16253011146210J9441376555473651=="object"){
        key=M16253011146210J9441376555473651.key;
        text=M16253011146210J9441376555473651.text;
    if(typeof M16253011146210J9441376555473651=="string"){
        key = M16253011146210J9441376555473651;
        text = window[key].toString();
}
    let fnbody = M1625368437043SerSimpl__________(text)
    let arg = M1625320414108Func_Get_Arg_Name_(text);
    thes.put({text:text,body:fnbody,arg:arg,key:key},key);
    let meta={source:"",modified:Date.now()};
    
    // transaction.objectStore("M1623940635385idb_type_map______").put('M1625406744808Type_JS_Function__',key);
    transaction.objectStore("M1625105007943IDBStoreMeta______").put(meta,key);
    transaction.objectStore("M1623945927273idb_related_vars__").put(M1625306744551funcStrGetRelated_(text),key);
    transaction.objectStore("M1623940897095idb_func_arg_stor_").put(key,arg);
}
}

var M1625368437043SerSimpl__________ = function(M16253684599980J0384719987037425){
//    let text = M1625068079944JesSWindowProxXxy_[M16253684599980J0384719987037425].toString();
   let text = M16253684599980J0384719987037425.toString();
    let fnbody = text.substring(text.indexOf("{")+1,text.lastIndexOf("}"))
   return fnbody;
}
//#endregion
var M1624265066524rand_id___________=function(){
    let rnd = Math.random().toString();//.length varies. 16-21. doesn't really matter
    let id=('M'+Date.now()+rnd.replace('.','J')+"BB00BB").substr(0,32);
    //starts with a number, contains dot -> not a valid ID for C-like languages
    //31-35 symbols. 
    return id;}
var M1624264785245value_to_id_______ = function(M16242647363800J5140259437325456){
let a=('M'+Date.now()+M16242647363800J5140259437325456.value+'_________________________').slice(0,32);
return a.replaceAll(' ','_');
}

var M1625630506754strToChunks_______ = function(obj){
    let str=obj.str;
    let size = obj.size;
     const numChunks = Math.ceil(str.length / size)
  const chunks = new Array(numChunks)

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size)
  }

  return chunks
}
var M1625638342457ProcessMessage____= function(M16256383712820J408501848601289B){
    let result={}
    let type = "text";
    if (type=="problem")
    ;// solution()

    result.in = M16256383712820J408501848601289B;
    result.type = "Text"

    console.log(result)
    // source.replywith()
}
var M1625725958898AgentsContacts____={}
var M1625742920799CommonMessageQueue=[]//not specified
var M1625743005851MockAgentSpecMessQ=[]

var M1625638680355message_queue_____=[
    // {src:"from",content:"", meta:{id:"M16256460466300J2640778711942904",type:"topic"}}
]
var M1625659227392MessageMockup_____ = function(M16256593476210J7448992652314737){
    M1625657964795on_message________([
    
    "M16256594561750J8837302399170879",//source
    M1624265066524rand_id___________(),//msg_id//if applicable
    "M1625741171424TopicTextMessage__",//topic
    M16256593476210J7448992652314737,//text content

])

}
// msg_sample: "M162300230..0IntroduceNewWordWordM16234...233TheWordItselfM1623737..4TypeOfThatWordContents...."

var M1625659570255SourceReplyMap____={M16256594561750J8837302399170879:""}
var M1625657964795on_message________ = function(M16256579825650J8184529398652303){
    let qmsg = {};
    qmsg.content=M16256579825650J8184529398652303.content;
    qmsg.src=M16256579825650J8184529398652303.src;
    M1625638680355message_queue_____.push(qmsg)
}
//optional: topic as a part of the source
// var M1625636964457ThesaurusLookup___ = function(M16256369998000J6708110342539335){
//     let word = M16256369998000J6708110342539335;
//     if(found)
//     let typeof_ = get_type()
//     do_action_for_typeof(word)

//     return true
// }
var M1625636720145ReactWord_________ = function(M16256369002450J1372852237634516){
    let b = M1625630506754strToChunks_______({str:M16256369002450J1372852237634516,size:32})
    
}
var M1625636474579ParseSentence_____ = function(M16256346793470J5024179214589444){
    let b = M1625630506754strToChunks_______({str:M16256346793470J5024179214589444,size:32})
    if (b.length==1)
    M1625636720145ReactWord_________()
}

// M1625063458700JessyNeat_________()
/**
 * init db
 * init basic vars:
 * 
 */
var NeedWordsFor=[
 "Introduce new word",
 "request the type of",
 "type: message"   
]