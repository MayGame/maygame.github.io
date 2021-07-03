
var M1623830819132first_idb_connect;
var M1623832698492idb_sample_store_;
var M1623831893386db_______________;
async function M1623830709556indexeddb_init___(){//deprecated, inactive. NEat example
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
    M1625068079944JesSWindowProxXxy[M16238346618430J0161460206740422.where_put]=event.target.result;
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
var M1623900223190idb_list_to_init_=[M1623941545551idb_Mayn_db_init_]
// var M1623900223190idb_list_to_init_=[M1623830709556indexeddb_init___,M1623941545551idb_Mayn_db_init_]
async function M1623900180431idb_init_batch___(){
    M1623900223190idb_list_to_init_.forEach(e=>e());
}

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
    M16239472551580J1795597627150527;//fixme
}
function M1624036276382wndw_to_idb_thesa(){
    Object.keys(M1625068079944JesSWindowProxXxy).forEach(key=>{if(key.length>30&key.startsWith('M')){
    //{key:el,value:M1625068079944JesSWindowProxXxy[key].toString()},type: typeof M1625068079944JesSWindowProxXxy[key]}})
    let type=typeof M1625068079944JesSWindowProxXxy[key];
    let word;
    if(type=="function")word=M1625068079944JesSWindowProxXxy[key].toString();
    else word=M1625068079944JesSWindowProxXxy[key];
    let transaction=M1623941499181idb_Mayn_db______.transaction(["M1623945792684idb_thesaurus____","M1623948002128idb_dom_typeof_st"],"readwrite");
    try {
    transaction.objectStore('M1623945792684idb_thesaurus____').put(word,key);
    transaction.objectStore('M1623948002128idb_dom_typeof_st').put(type,key);   
    } catch (error) {
e=error.toString().split(" ");
if(e[0]=='DataCloneError:'){
    type="not_clonable";
    word=e[6];
    transaction.objectStore('M1623945792684idb_thesaurus____').add(word,key);
    transaction.objectStore('M1623948002128idb_dom_typeof_st').add(type,key);   
}
else console.log("M1624036276382wndw_to_idb_thesa err: ",error);
}
    }})

}
var M1624078206159idb_export_result={}
function M1624077010981export_idb_json__(M16240767058400J8182149514192616){
    let db=M1625068079944JesSWindowProxXxy[M16240767058400J8182149514192616.db];
    var res_obj={};
    Array.from(new Set( db.objectStoreNames)).forEach(store=>{
        res_obj[store]={}
        var objectStore = db.transaction(store).objectStore(store);
        objectStore.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;
            let result_json=`{"${store}":{`;
            if (cursor) {
                let value=JSON.stringify(cursor.value);
                res_obj[store][cursor.key]=value;
                let cursor_it=`"${cursor.key}":"${value}",`
                
                result_json+=cursor_it;
            //   console.log("Key" + cursor.key + "JSON" + value,"whole thing:", cursor_it);
              cursor.continue();
            }
            else {
              result_json+=`}},`;
              console.log(result_json);
              console.log(res_obj);
              console.log("res obj json",JSON.stringify(res_obj));
            }
            
          };
    })
}
function M1624081527326idbExportFileJSON(M16240815455540J2087249504105126){
    let db=M1625068079944JesSWindowProxXxy[M16240815455540J2087249504105126.db];
    var res_obj={};
    Array.from(new Set( db.objectStoreNames)).forEach(store=>{
        res_obj[store]={}
        var objectStore = db.transaction(store).objectStore(store);
        objectStore.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;
            if (cursor) {
                let value=JSON.stringify(cursor.value);
                res_obj[store][cursor.key]=value;
              cursor.continue();
            }
            else {
                let res_json=JSON.stringify(res_obj[store])
            //   console.log("res obj json",res_json);
                M1624083195642downloadAsJSON___({name:store+".json",text:res_json})
            }
            
          };
    })
}
function M1624081967865downloadAsFile___(M16240819877260J8877865110371159){
    let filename = M16240819877260J8877865110371159.name;
    let text= M16240819877260J8877865110371159.text;
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
function M1624083195642downloadAsJSON___(M16240832038540J3959681631336438){
    let filename = M16240832038540J3959681631336438.name;
    let text = M16240832038540J3959681631336438.text;
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
function M1624168337430IDB_bulk_import__(M16241683595790J9098192767985931){
    let obj = M16241683595790J9098192767985931.obj;//put values to keys
    let entries=Object.entries(obj)
    let db = M16241683595790J9098192767985931.db||'M1623941499181idb_Mayn_db______';
    let transaction=M1623941499181idb_Mayn_db______.transaction([M16241683595790J9098192767985931.store],"readwrite");
    entries.forEach(e=>{
        try {
            transaction.objectStore(M16241683595790J9098192767985931.store).put(e[1],e[0]);
            } catch (error) {
                console.log('M1624168337430IDB_bulk_import__',error);
            }
    })
}
M1624168337430IDB_bulk_import__({obj:{M1624168337430IDB_bulk_import__:"Imports obj's top level entries to the selected store. db object can be provided as an optional argument"},"store":"M1623831451834idb_descript_stor"})
function M1624168178171IDB_import_json__(M16241681915240J8055564501035015)
{
    let obj = JSON.parse(M16241681915240J8055564501035015.text);
    M1624168337430IDB_bulk_import__({obj:obj,store:M16241681915240J8055564501035015.store})
}
function M1624207300224idbBulkImportMerg(M16242073427760J6184140110879794)
{
    let obj = M16241683595790J9098192767985931.obj;//put values to keys
    let entries=Object.entries(obj)
    let db = M16241683595790J9098192767985931.db||'M1623941499181idb_Mayn_db______';
    let transaction=M1623941499181idb_Mayn_db______.transaction([M16241683595790J9098192767985931.store],"readwrite");
    entries.forEach(e=>{
        try {
            transaction.objectStore(M16241683595790J9098192767985931.store).put(e[1],e[0]);
            } catch (error) {
                console.log('M1624168337430IDB_bulk_import__',error);
            }
    })
}

function M1624880970437IDB_put__________(M16248810024230J3544808568008901){
    let storage = M16248810024230J3544808568008901[0];
    let key = M16248810024230J3544808568008901[1];
    let value = M16248810024230J3544808568008901[2];
    let db = M1624881345841IDB_store_index__[storage].db
    if(!db){console.log("no entry for ",storage, "in M1624881345841IDB_store_index__"); return}
    let transaction = db.transaction(storage,"readwrite");
    transaction.objectStore(storage).put(value,key);
}
function M1624880981184IDB_add__________(M16248809879510J2760662569410157){
    let storage = M16248809879510J2760662569410157[0];
    let key = M16248809879510J2760662569410157[1];
    let value = M16248809879510J2760662569410157[2];
    let db = M1624881345841IDB_store_index__[storage].db
    if(!db){console.log("no entry for ",storage, "in M1624881345841IDB_store_index__"); return}
    let transaction = db.transaction(storage,"readwrite");
    transaction.objectStore(storage).add(value,key);
}

var M1624956383058generic_put______ = M1624956113501Write_var________;



var M1625022724571idbNameToConnObj_={
// db_name:connection_object_id
}
   
function M1625022318769idbIdxErrPrmptAdd(M16250223541600J7474095390848625){
    //fixme
    console.log("IDB: There's no entry for ",M16250223541600J7474095390848625," store")
}
var M1625022877330IDBConnIDFor_____=(store)=>{
    let db_name = M1624881345841IDB_store_index__[store];
    let connection_object = M1625022724571idbNameToConnObj_[db_name];//id
    if(!connection_object){
        M1625022318769idbIdxErrPrmptAdd(store);
        return 
    }
    else return connection_object;
}
function M1624947905870IDB_map_store____(M16249479597410J5924147242460605){
    let store = M16249479597410J5924147242460605.store;
    let db_name = M16249479597410J5924147242460605.db_name;
    M1624881345841IDB_store_index__[store]=db_name;
}
function M1625026869835IDBMergeUpdatePro(M16250268798680J8351418844886263){
    //should be used for updating indices (never?)
    // M16250268798680J8351418844886263 : {store: store, M.....: {field3:new_value}, M...:value}
    let store = M16250268798680J8351418844886263.store;
    let keys = Object.keys(M16250268798680J8351418844886263);
    let dbc = M1625068079944JesSWindowProxXxy[M1625022877330IDBConnIDFor_____(store)];
    let rwtstor = dbc.transaction(store, "readwrite").objectStore(store);
    // let req = rwtstor.get(obj);
    // let 
    keys.forEach(key=>{
        //foreach object merge it
        if(key!="store"){
            let req = rwtstor.get(key);
            req.onsuccess=()=>{
            const data = req.result;
            Object.assign(data, M16250268798680J8351418844886263[key]) ;
            const updReq = rwtstor.put(data,key);
        }
        }
    })
}
function M1624861960052add_var__________(M16248624352900J3616530429038678){
    let id = M16248624352900J3616530429038678.id;
    let source = M16248624352900J3616530429038678.source||"M1624864048559Source_undefined_";
    let value = M16248624352900J3616530429038678.value;
    M1624861880949source___________[id]=source;
    M1625068079944JesSWindowProxXxy[id]=value;
    M1624864687777StateLastUpdated_[id]=Date.now();
}
function M1624956113501Write_var________(M16249480424750J4388463756040546){
    var key = M16249480424750J4388463756040546.key;
    var value = M16249480424750J4388463756040546.value;
    M1625068079944JesSWindowProxXxy[key]=value;
    M1624880970437IDB_put__________(["storage",key,value])
}
/**
 * store -> db name -> conn for -> 
 * 
 */
var M1625045274944windowProxyHadler={
    get(target, name, receiver) {
        let rv = Reflect.get(target, name, receiver);
        console.log(target,name,receiver)
        // if (typeof rv === "string") {
        //     rv = rv.toUpperCase();
        // }
        return rv;
    }
}
// var
 M1625068079944JesSWindowProxXxy = M1625045240464window_Proxy_idb_;
// var M1625068079944JesSWindowProxXxy = window;
var M1625045240464window_Proxy_idb_=new Proxy(window, M1625045274944windowProxyHadler)
// playground

// M1625026869835IDBMergeUpdatePro({store:"",});
