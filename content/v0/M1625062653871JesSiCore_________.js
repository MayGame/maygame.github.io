var M1622519980405clairdlwlrMayJesCA = true;

var M1625068079944JesSWindowProxXxy_=window;
var M1625063417462CoreToLoad________;
function M1625063654235InitVarrssksks____(){
    // M1625068079944JesSWindowProxXxy_=window;
    // M1625063417462CoreToLoad________=
    // M1625068079944JesSWindowProxXxy_[M1625063417462CoreToLoad________]
    //()=>console.log("V-1");

}
function M1625220622470NoCoreFallback____(){
    console.log("No core");
    let store = M1623941499181idb_Mayn_db_______.transaction('M1623945792684idb_thesaurus_____',"readwrite").objectStore("M1623945792684idb_thesaurus_____");
    store.put("M1625294924126SubCorr___________",'M1625063417462CoreToLoad________')

}
function M1625282527470OnCorrLoaddeed____(M16252825647730J5031440897863075){
    let ex = M1625068079944JesSWindowProxXxy_[M16252825647730J5031440897863075.detail.core];
    console.log(ex);
    ex();

}

function M1625284003422LodCorr___________(){
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
    // M1625063654235InitVarrssksks____();
    M1625284003422LodCorr___________()
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
var M1623774638130idb_transaction___ = M1625068079944JesSWindowProxXxy_.IDBTransaction || M1625068079944JesSWindowProxXxy_.webkitIDBTransaction || M1625068079944JesSWindowProxXxy_.msIDBTransaction || { READ_WRITE: "readwrite" };
var M1623820653095indexedb__________ = M1625068079944JesSWindowProxXxy_.indexedDB || M1625068079944JesSWindowProxXxy_.mozIndexedDB || M1625068079944JesSWindowProxXxy_.webkitIndexedDB || M1625068079944JesSWindowProxXxy_.msIndexedDB;
var M1623820745971idb_keyrange______ = M1625068079944JesSWindowProxXxy_.IDBKeyRange || M1625068079944JesSWindowProxXxy_.webkitIDBKeyRange || M1625068079944JesSWindowProxXxy_.msIDBKeyRange;

async function M1623821216754indexeddb_opendb__(M16238212857720J4238014379729269){
    M1625068079944JesSWindowProxXxy_[M16238212857720J4238014379729269[0]] = M1623820653095indexedb__________
    .open(M16238212857720J4238014379729269[1],M16238212857720J4238014379729269[2])
}
async function M1623941545551idb_Mayn_db_init__(){
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
function M1625300496229IDBThesaurusGetCB_(M16253001282300J6024000346344986){
    let key = M16253001282300J6024000346344986.key;
    let callback = M16253001282300J6024000346344986.cb;
    let store = M1623941499181idb_Mayn_db_______.transaction('M1623945792684idb_thesaurus_____',"readonly").objectStore("M1623945792684idb_thesaurus_____")
    let req = store.get(key);
    req.onsuccess=callback;
}
//#endregion
//#region core
function M1625294924126SubCorr___________(){
    console.log("Hi, Mistress")
}
var M1625297347110Deserial_function_=function(M16252973756790J2619777814455608){
    let key = M16252973756790J2619777814455608.key;
    M1625300496229IDBThesaurusGetCB_({key:key,cb:function(M16253008862770J8563612302758874){console.log(M16253008862770J8563612302758874)}})
//    window[M16252973756790J2619777814455608.key]//from idb:=new Function()('return ' + foo.toString())()
}
var M1625310367858ID_RegExp_________ =new RegExp(/M\d{13}\w{18}/,'g')
var M1625320414108Func_Get_Arg_Name_=function(M16253205254550J1305364840200156){
    let result = M16253205254550J1305364840200156.match(/function*?\(\W*(\w*)/);
    if(result)
    return result[1];
    else return "";
}
function M1625306744551funcStrGetRelated_(M16253067937360J4115575867813261){
    const result = [...M16253067937360J4115575867813261.matchAll(M1625310367858ID_RegExp_________)];
    let flet = [];
    result.forEach(e=>{flet.push(e[0])})
    return [...new Set(flet)];
}
var M1625301090123Srialize_function_ = function(M16253011146210J9441376555473651){//arg - string(id)
    let key = M16253011146210J9441376555473651;
    let transaction=M1623941499181idb_Mayn_db_______.transaction(['M1623945792684idb_thesaurus_____',
    'M1623940897095idb_func_arg_stor_','M1623945927273idb_related_vars__','M1625105007943IDBStoreMeta______'],"readwrite")
    let thes = transaction.objectStore("M1623945792684idb_thesaurus_____");
    let text = window[key].toString();
    thes.put(text,key);
    let meta={source:"",modified:Date.now()};
    transaction.objectStore("M1625105007943IDBStoreMeta______").put(meta,key);
    transaction.objectStore("M1623945927273idb_related_vars__").put(M1625306744551funcStrGetRelated_(text),key);
    transaction.objectStore("M1623940897095idb_func_arg_stor_").put(key,M1625320414108Func_Get_Arg_Name_(text));
}
//#endregion
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


M1625063458700JessyNeat_________()
