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
async function M1623830709556indexeddb_init___(){
   await M1623821216754indexeddb_opendb_(["M1623830819132first_idb_connect","M16238307510080J7194791896383828",1]);
   M1623830819132first_idb_connect.onupgradeneeded = function(event) {
    //      if (event.oldVersion < 1) {
    // Save the IDBDatabase interface
    M1623831893386db_______________ = event.target.result;
  
    // Create an objectStore for this database
    M1623832698492idb_sample_store_ = M1623831893386db_______________.createObjectStore("name", { keyPath: "myKey" });
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
