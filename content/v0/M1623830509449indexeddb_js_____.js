var M1623774638130idb_transaction__ = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || { READ_WRITE: "readwrite" };
var M1623820653095indexedb_________ = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var M1623820745971idb_keyrange_____ = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
async function M1623821216754indexeddb_opendb_(M16238212857720J4238014379729269){
    // M16238212857720J4238014379729269
    window[M16238212857720J4238014379729269[0]] = M1623820653095indexedb_________.open(M16238212857720J4238014379729269[1],M16238212857720J4238014379729269[2])
}
var M1623830819132first_idb_connect;
var M1623831893386db_______________;
async function M1623830709556indexeddb_init___(){
   await M1623821216754indexeddb_opendb_(["M1623830819132first_idb_connect","M16238307510080J7194791896383828",1]);
//    M1623830819132first_idb_connect.onupgradeneeded =
//    M1623830819132first_idb_connect.onerror = function(e){console.log(e)}
   M1623830819132first_idb_connect.onsuccess = function() {
    M1623831893386db_______________ = M1623830819132first_idb_connect.result;
  
    M1623831893386db_______________.onversionchange = function() {
      M1623831893386db_______________.close();
      alert("Database is outdated, please reload the page.")
    };
}
M1623831893386db_______________.createObjectStore("M1623831451834idb_descript_stor")
}