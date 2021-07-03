var M1622519980405clairdlwlrMayJesCA = true;

var M1625068079944JesSWindowProxXxy=window;
var M1625063417462CoreToLoad_______;
function M1625063654235InitVarrssksks___(){
    // M1625068079944JesSWindowProxXxy=window;
    // M1625063417462CoreToLoad_______=
    // M1625068079944JesSWindowProxXxy[M1625063417462CoreToLoad_______]
    //()=>console.log("V-1");

}
function M1625220622470NoCoreFallback___(){
    console.log("No core");
    let store = M1623941499181idb_Mayn_db______.transaction('M1623945792684idb_thesaurus____',"readwrite").objectStore("M1623945792684idb_thesaurus____");
    store.put("M1625294924126SubCorr__________",'M1625063417462CoreToLoad_______')

}
function M1625282527470OnCorrLoaddeed___(M16252825647730J5031440897863075){
    let ex = M1625068079944JesSWindowProxXxy[M16252825647730J5031440897863075.detail.core];
    console.log(ex);
    ex();

}

function M1625284003422LodCorr__________(){
    if(!M1623941499181idb_Mayn_db______){setTimeout(M1625284003422LodCorr__________,100); return;}
    let store = M1623941499181idb_Mayn_db______.transaction('M1623945792684idb_thesaurus____',"readonly").objectStore("M1623945792684idb_thesaurus____")
    let req = store.get('M1625063417462CoreToLoad_______');
    req.onsuccess=function(){
        M1625068079944JesSWindowProxXxy[M1625063417462CoreToLoad_______]=req.result;
        console.log("loddin", req.result);
        if(req.result)
        window.dispatchEvent(new CustomEvent("M1625282460482CorrLoaddeed_____", {detail:{core:req.result}})) ;
        else {
            console.log(req.error, req.result,"falling back to NoCore")
            window.dispatchEvent(new CustomEvent("M1625282460482CorrLoaddeed_____", {detail:{core:"M1625220622470NoCoreFallback___"}}))        
        }
    }
    req.onerror=function(){
        console.log(req.error, req.result,"falling back to NoCore")
        window.dispatchEvent(new CustomEvent("M1625282460482CorrLoaddeed_____", {detail:{core:"M1625220622470NoCoreFallback___"}}))        
    }
}
var M1625283856579CorrLddEvListener;
async function M1625063458700JessyNeat________(){
    M1625283856579CorrLddEvListener=window.addEventListener("M1625282460482CorrLoaddeed_____",M1625282527470OnCorrLoaddeed___)
    await M1623941545551idb_Mayn_db_init_();
    // M1625119163931GetCore__________();
    // M1625063654235InitVarrssksks___();
    M1625284003422LodCorr__________()
    // M1625220622470NoCoreFallback___();
}
//#region 
var M1623941001884idb_stores_list__=[
    'M1623945792684idb_thesaurus____',//all vars go here
    'M1623940897095idb_func_arg_stor',//map arg name tofunc name. arg - key, func - value
    'M1623831451834idb_descript_stor',//description for key
    'M1623940635385idb_type_map_____',//type of given variable
    'M1623945927273idb_related_vars_',
    'M1623948002128idb_dom_typeof_st',//grabbed data from dom
    'M1625105007943IDBStoreMeta_____',//source, additional values, timestamp...
    ]
var M1624881345841IDB_store_index__={   
    // storage: db_name
'M1623945792684idb_thesaurus____':"memoires_eternels",
'M1623940897095idb_func_arg_stor':"memoires_eternels",
'M1623831451834idb_descript_stor':"memoires_eternels",
'M1623940635385idb_type_map_____':"memoires_eternels",
'M1623945927273idb_related_vars_':"memoires_eternels",
'M1623948002128idb_dom_typeof_st':"memoires_eternels",                                              
'M1625105007943IDBStoreMeta_____':"memoires_eternels",
}
var M1623941499181idb_Mayn_db______;
var M1623943250216idb_Mayn_db_cnct_;
var M1623942055880idb_Mayn_db_name_="memoires_eternels";
var M1623774638130idb_transaction__ = M1625068079944JesSWindowProxXxy.IDBTransaction || M1625068079944JesSWindowProxXxy.webkitIDBTransaction || M1625068079944JesSWindowProxXxy.msIDBTransaction || { READ_WRITE: "readwrite" };
var M1623820653095indexedb_________ = M1625068079944JesSWindowProxXxy.indexedDB || M1625068079944JesSWindowProxXxy.mozIndexedDB || M1625068079944JesSWindowProxXxy.webkitIndexedDB || M1625068079944JesSWindowProxXxy.msIndexedDB;
var M1623820745971idb_keyrange_____ = M1625068079944JesSWindowProxXxy.IDBKeyRange || M1625068079944JesSWindowProxXxy.webkitIDBKeyRange || M1625068079944JesSWindowProxXxy.msIDBKeyRange;

async function M1623821216754indexeddb_opendb_(M16238212857720J4238014379729269){
    M1625068079944JesSWindowProxXxy[M16238212857720J4238014379729269[0]] = M1623820653095indexedb_________
    .open(M16238212857720J4238014379729269[1],M16238212857720J4238014379729269[2])
}
async function M1623941545551idb_Mayn_db_init_(){
    await M1623821216754indexeddb_opendb_(["M1623943250216idb_Mayn_db_cnct_",M1623942055880idb_Mayn_db_name_,2]);
    M1623943250216idb_Mayn_db_cnct_.onupgradeneeded = function(event) {
        M1623941499181idb_Mayn_db______ = event.target.result;
        M1623941001884idb_stores_list__.forEach(e=>{
            if (!M1623941499181idb_Mayn_db______.objectStoreNames.contains(e)) {
            M1623941499181idb_Mayn_db______.createObjectStore(e);}
        })
    };
    M1623943250216idb_Mayn_db_cnct_.onsuccess = function() {
        M1623941499181idb_Mayn_db______=M1623943250216idb_Mayn_db_cnct_.result;

        M1623941499181idb_Mayn_db______.onversionchange = function() {
            M1623941499181idb_Mayn_db______.close();
          alert("Database is outdated, please reload the page.")
}}}
function M1625300496229IDBThesaurusGetCB(M16253001282300J6024000346344986){
    let key = M16253001282300J6024000346344986.key;
    let callback = M16253001282300J6024000346344986.cb;
    let store = M1623941499181idb_Mayn_db______.transaction('M1623945792684idb_thesaurus____',"readonly").objectStore("M1623945792684idb_thesaurus____")
    let req = store.get(key);
    req.onsuccess=callback;
}
//#endregion
//#region core
function M1625294924126SubCorr__________(){
    console.log("Hi, Mistress")
}
var M1625297347110Deserial_function=function(M16252973756790J2619777814455608){
    let key = M16252973756790J2619777814455608.key;
    M1625300496229IDBThesaurusGetCB({key:key,cb:function(M16253008862770J8563612302758874){console.log(M16253008862770J8563612302758874)}})
//    window[M16252973756790J2619777814455608.key]//from idb:=new Function()('return ' + foo.toString())()
}
var M1625310367858ID_RegExp________ =new RegExp(/M\d{13}\w{18}/,'g')
function M1625306744551funcStrGetRelated(M16253067937360J4115575867813261){
    // const result = [...M16253067937360J4115575867813261.matchAll(M1625310367858ID_RegExp________])];
    const sresult = M16253067937360J4115575867813261.split(/\W/)
    let result=[];
    sresult.forEach(e=>{if(e.length==32)result.push(e)})
4// result =M1625310367858ID_RegExp________.exec(M16253067937360J4115575867813261);
    return sresult;
}
var M1625301090123Srialize_function = function(M16253011146210J9441376555473651){//arg - string(id)
    let key = M16253011146210J9441376555473651;
    let transaction=M1623941499181idb_Mayn_db______.transaction(['M1623945792684idb_thesaurus____',
    'M1623940897095idb_func_arg_stor','M1623945927273idb_related_vars_','M1625105007943IDBStoreMeta_____'],"readwrite")
    let thes = transaction.objectStore("M1623945792684idb_thesaurus____");
    let text = window[key].toString();
    thes.put(key,text);
    let meta={source:"",modified:Date.now()};
    transaction.objectStore("M1625105007943IDBStoreMeta_____").put(key,meta);
    let related = {}
    transaction.objectStore("M1623945927273idb_related_vars_").put(key,meta);
}
//#endregion
function M1624265066524rand_id__________(){
    let rnd = Math.random().toString();//.length varies. 16-21. doesn't really matter
    let id=('M'+Date.now()+rnd.replace('.','J')+"BB00BB").substr(0,32);
    //starts with a number, contains dot -> not a valid ID for C-like languages
    //31-35 symbols. 
    return id;}
function M1624264785245value_to_id______(M16242647363800J5140259437325456){
let a=('M'+Date.now()+M16242647363800J5140259437325456.value+'_________________________').slice(0,32);
return a.replaceAll(' ','_');
}


M1625063458700JessyNeat________()
