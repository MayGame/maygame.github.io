var M1623774638130idb_transaction__ = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || { READ_WRITE: "readwrite" };
var M1623820653095indexedb_________ = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var M1623820745971idb_keyrange_____ = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
async function M1623821216754indexeddb_opendb_(M16238212857720J4238014379729269){
    // M16238212857720J4238014379729269
    window[M16238212857720J4238014379729269[0]] = M1623820653095indexedb_________.open(M16238212857720J4238014379729269[1],M16238212857720J4238014379729269[2])
}
var M1623830819132first_idb_connect;
var M1623832698492idb_sample_store_;
var M1623831893386db_______________;
async function M1623830709556indexeddb_init___(){//M16238307510080J7194791896383828 - name for db
   await M1623821216754indexeddb_opendb_(["M1623830819132first_idb_connect","M16238307510080J7194791896383828",1]);
   M1623830819132first_idb_connect.onupgradeneeded = function(event) {
    //      if (event.oldVersion < 1) {
    // Save the IDBDatabase interface
    M1623831893386db_______________ = event.target.result;
  
    // Create an objectStore for this database
    // M1623832698492idb_sample_store_ = M1623831893386db_______________.createObjectStore("name", { keyPath: "myKey" });
    M1623831893386db_______________.createObjectStore("M1623831451834idb_descript_stor");
    
};
//    M1623830819132first_idb_connect.onerror = function(e){console.log(e)}
   M1623830819132first_idb_connect.onsuccess = function() {
    M1623831893386db_______________ = M1623830819132first_idb_connect.result;
  
    M1623831893386db_______________.onversionchange = function() {
      M1623831893386db_______________.close();
      alert("Database is outdated, please reload the page.")
    };
}
}
function M1623834175347idb_add_descripti(M16238341077200J4965506095461713){
    let key=M16238341077200J4965506095461713.id;
    let value = M16238341077200J4965506095461713.desc;
    M1623831893386db_______________.transaction("M1623831451834idb_descript_stor","readwrite").objectStore("M1623831451834idb_descript_stor").add(value, key)
}
function M1623834654341get_desc_for_____(M16238346618430J0161460206740422)
{
   M1623831893386db_______________.transaction("M1623831451834idb_descript_stor","readonly")
   .objectStore("M1623831451834idb_descript_stor").get(M16238346618430J0161460206740422.id).onsuccess=function(event){
    window[M16238346618430J0161460206740422.where_put]=event.target.result;
   }
}
var M1623836072764get_desc_result__;
async function M1623836116952get_desc_example_(){
   await M1623834175347idb_add_descripti({"id":"M1623834654341get_desc_for_____","desc":"Retrieves description for 'id', puts it into 'where_put'"})
    M1623834654341get_desc_for_____({"id":"M1623834654341get_desc_for_____","where_put":"M1623836072764get_desc_result__"})
    
}
var M1623896454990idb_requires_for_;
function M1623896476334learn_requires___(){}
function M1623899718317export_adata_json(){}
var M1623900089097indxeddb_goals_db;
var M1623900223190idb_list_to_init_=[M1623830709556indexeddb_init___,M1623941545551idb_Mayn_db_init_]
async function M1623900180431idb_init_batch___(){
    M1623900223190idb_list_to_init_.forEach(e=>e());
}
var M1623941001884idb_stores_list__=['M1623945792684idb_thesaurus____',//all vars go here
    'M1623940897095idb_func_arg_stor',//map arg name tofunc name. arg - key, func - value
'M1623831451834idb_descript_stor',//description for key
'M1623940635385idb_type_map_____',//type of given variable
'M1623945927273idb_related_vars_',
'M1623948002128idb_dom_typeof_st',//grabbed data from dom
]
var M1623941499181idb_Mayn_db______;
var M1623943250216idb_Mayn_db_cnct_;
var M1623942055880idb_Mayn_db_name_="J"
async function M1623941545551idb_Mayn_db_init_(){
    await M1623821216754indexeddb_opendb_(["M1623943250216idb_Mayn_db_cnct_",M1623942055880idb_Mayn_db_name_,2]);
    M1623943250216idb_Mayn_db_cnct_.onupgradeneeded = function(event) {
        M1623941499181idb_Mayn_db______ = event.target.result;
        M1623941001884idb_stores_list__.forEach(e=>{
            M1623941499181idb_Mayn_db______.createObjectStore(e);
        })

    };
    
    M1623943250216idb_Mayn_db_cnct_.onsuccess = function() {
        M1623941499181idb_Mayn_db______=M1623943250216idb_Mayn_db_cnct_.result;

        M1623941499181idb_Mayn_db______.onversionchange = function() {
            M1623941499181idb_Mayn_db______.close();
          alert("Database is outdated, please reload the page.")
}}}
function M1623947220823idb_thesaurus_put(M16239472551580J1795597627150527){
    M16239472551580J1795597627150527;
}
function M1623946933570wndw_to_idb_thesa(){
    Object.keys(window).forEach(key=>{if(key.length>30&key.startsWith('M')){
    //{key:el,value:window[key].toString()},type: typeof window[key]}})
    let transaction=M1623941499181idb_Mayn_db______.transaction(["M1623945792684idb_thesaurus____","M1623948002128idb_dom_typeof_st"]);
    transaction.objectStore('M1623945792684idb_thesaurus____').put(window[key].toString(),key);
    transaction.objectStore('M1623948002128idb_dom_typeof_st').put(typeof window[key],key);
    }})

}