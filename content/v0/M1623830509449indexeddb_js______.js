
var M1623830819132first_idb_connect_;
var M1623832698492idb_sample_store__;
var M1623831893386db________________;
async function M1623830709556indexeddb_init____(){//deprecated, inactive. NEat example
   await M1623821216754indexeddb_opendb__(["M1623830819132first_idb_connect_","M16238307510080J7194791896383828",1]);
   M1623830819132first_idb_connect_.onupgradeneeded = function(event) {
    //      if (event.oldVersion < 1) {
    // Save the IDBDatabase interface
    M1623831893386db________________ = event.target.result;
  
    // Create an objectStore for this database
    // M1623832698492idb_sample_store__ = M1623831893386db________________.createObjectStore("name", { keyPath: "myKey" });
    M1623831893386db________________.createObjectStore("M1623831451834idb_descript_stor_");
    
};
//    M1623830819132first_idb_connect_.onerror = function(e){console.log(e)}
   M1623830819132first_idb_connect_.onsuccess = function() {
    M1623831893386db________________ = M1623830819132first_idb_connect_.result;
  
    M1623831893386db________________.onversionchange = function() {
      M1623831893386db________________.close();
      alert("Database is outdated, please reload the page.")
    };
}
}
function M1623834175347idb_add_descripti_(M16238341077200J4965506095461713){
    let key=M16238341077200J4965506095461713.id;
    let value = M16238341077200J4965506095461713.desc;
    M1623831893386db________________.transaction("M1623831451834idb_descript_stor_","readwrite").objectStore("M1623831451834idb_descript_stor_").add(value, key)
}
function M1623834654341get_desc_for______(M16238346618430J0161460206740422)
{
   M1623831893386db________________.transaction("M1623831451834idb_descript_stor_","readonly")
   .objectStore("M1623831451834idb_descript_stor_").get(M16238346618430J0161460206740422.id).onsuccess=function(event){
    M1625068079944JesSWindowProxXxy_[M16238346618430J0161460206740422.where_put]=event.target.result;
   }
}
var M1623836072764get_desc_result___;
async function M1623836116952get_desc_example__(){
   await M1623834175347idb_add_descripti_({"id":"M1623834654341get_desc_for______","desc":"Retrieves description for 'id', puts it into 'where_put'"})
    M1623834654341get_desc_for______({"id":"M1623834654341get_desc_for______","where_put":"M1623836072764get_desc_result___"})
    
}
var M1623896454990idb_requires_for__;
function M1623896476334learn_requires____(){}
function M1623899718317export_adata_json_(){}
var M1623900089097indxeddb_goals_db_;
var M1623900223190idb_list_to_init__=[M1623941545551idb_Mayn_db_init__]
// var M1623900223190idb_list_to_init__=[M1623830709556indexeddb_init____,M1623941545551idb_Mayn_db_init__]
async function M1623900180431idb_init_batch____(){
    M1623900223190idb_list_to_init__.forEach(e=>e());
}

async function M1623941545551idb_Mayn_db_init__(){
    await M1623821216754indexeddb_opendb__(["M1623943250216idb_Mayn_db_cnct__",M1623942055880idb_Mayn_db_name__,2]);
    M1623943250216idb_Mayn_db_cnct__.onupgradeneeded = function(event) {
        M1623941499181idb_Mayn_db_______ = event.target.result;
        M1623941001884idb_stores_list___.forEach(e=>{
            M1623941499181idb_Mayn_db_______.createObjectStore(e);
        })

    };
    
    M1623943250216idb_Mayn_db_cnct__.onsuccess = function() {
        M1623941499181idb_Mayn_db_______=M1623943250216idb_Mayn_db_cnct__.result;

        M1623941499181idb_Mayn_db_______.onversionchange = function() {
            M1623941499181idb_Mayn_db_______.close();
          alert("Database is outdated, please reload the page.")
}}}
function M1623947220823idb_thesaurus_put_(M16239472551580J1795597627150527){
    M16239472551580J1795597627150527;//fixme
}
function M1624036276382wndw_to_idb_thesa_(){
    Object.keys(M1625068079944JesSWindowProxXxy_).forEach(key=>{if(key.length>30&key.startsWith('M')){
    //{key:el,value:M1625068079944JesSWindowProxXxy_[key].toString()},type: typeof M1625068079944JesSWindowProxXxy_[key]}})
    let type=typeof M1625068079944JesSWindowProxXxy_[key];
    let word;
    if(type=="function")word=M1625068079944JesSWindowProxXxy_[key].toString();
    else word=M1625068079944JesSWindowProxXxy_[key];
    let transaction=M1623941499181idb_Mayn_db_______.transaction(["M1623945792684idb_thesaurus_____","M1623948002128idb_dom_typeof_st_"],"readwrite");
    try {
    transaction.objectStore('M1623945792684idb_thesaurus_____').put(word,key);
    transaction.objectStore('M1623948002128idb_dom_typeof_st_').put(type,key);   
    } catch (error) {
e=error.toString().split(" ");
if(e[0]=='DataCloneError:'){
    type="not_clonable";
    word=e[6];
    transaction.objectStore('M1623945792684idb_thesaurus_____').add(word,key);
    transaction.objectStore('M1623948002128idb_dom_typeof_st_').add(type,key);   
}
else console.log("M1624036276382wndw_to_idb_thesa_ err: ",error);
}
    }})

}
var M1624078206159idb_export_result_={}
function M1624077010981export_idb_json___(M16240767058400J8182149514192616){
    let db=M1625068079944JesSWindowProxXxy_[M16240767058400J8182149514192616.db];
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
function M1624081527326idbExportFileJSON_(M16240815455540J2087249504105126){
    let db=M1625068079944JesSWindowProxXxy_[M16240815455540J2087249504105126.db];
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
                M1624083195642downloadAsJSON____({name:store+".json",text:res_json})
            }
            
          };
    })
}
function M1624081967865downloadAsFile____(M16240819877260J8877865110371159){
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
function M1624083195642downloadAsJSON____(M16240832038540J3959681631336438){
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
function M1624168337430IDB_bulk_import___(M16241683595790J9098192767985931){
    let obj = M16241683595790J9098192767985931.obj;//put values to keys
    let entries=Object.entries(obj)
    let db = M16241683595790J9098192767985931.db||'M1623941499181idb_Mayn_db_______';
    let transaction=M1623941499181idb_Mayn_db_______.transaction([M16241683595790J9098192767985931.store],"readwrite");
    entries.forEach(e=>{
        try {
            transaction.objectStore(M16241683595790J9098192767985931.store).put(e[1],e[0]);
            } catch (error) {
                console.log('M1624168337430IDB_bulk_import___',error);
            }
    })
}
M1624168337430IDB_bulk_import___({obj:{M1624168337430IDB_bulk_import___:"Imports obj's top level entries to the selected store. db object can be provided as an optional argument"},"store":"M1623831451834idb_descript_stor_"})
function M1624168178171IDB_import_json___(M16241681915240J8055564501035015)
{
    let obj = JSON.parse(M16241681915240J8055564501035015.text);
    M1624168337430IDB_bulk_import___({obj:obj,store:M16241681915240J8055564501035015.store})
}
function M1624207300224idbBulkImportMerg_(M16242073427760J6184140110879794)
{
    let obj = M16241683595790J9098192767985931.obj;//put values to keys
    let entries=Object.entries(obj)
    let db = M16241683595790J9098192767985931.db||'M1623941499181idb_Mayn_db_______';
    let transaction=M1623941499181idb_Mayn_db_______.transaction([M16241683595790J9098192767985931.store],"readwrite");
    entries.forEach(e=>{
        try {
            transaction.objectStore(M16241683595790J9098192767985931.store).put(e[1],e[0]);
            } catch (error) {
                console.log('M1624168337430IDB_bulk_import___',error);
            }
    })
}

function M1624880970437IDB_put___________(M16248810024230J3544808568008901){
    let storage = M16248810024230J3544808568008901[0];
    let key = M16248810024230J3544808568008901[1];
    let value = M16248810024230J3544808568008901[2];
    let db = M1624881345841IDB_store_index___[storage].db
    if(!db){console.log("no entry for ",storage, "in M1624881345841IDB_store_index___"); return}
    let transaction = db.transaction(storage,"readwrite");
    transaction.objectStore(storage).put(value,key);
}
function M1624880981184IDB_add___________(M16248809879510J2760662569410157){
    let storage = M16248809879510J2760662569410157[0];
    let key = M16248809879510J2760662569410157[1];
    let value = M16248809879510J2760662569410157[2];
    let db = M1624881345841IDB_store_index___[storage].db
    if(!db){console.log("no entry for ",storage, "in M1624881345841IDB_store_index___"); return}
    let transaction = db.transaction(storage,"readwrite");
    transaction.objectStore(storage).add(value,key);
}

var M1624956383058generic_put_______ = M1624956113501Write_var_________;



var M1625022724571idbNameToConnObj__={
// db_name:connection_object_id
}
   
function M1625022318769idbIdxErrPrmptAdd_(M16250223541600J7474095390848625){
    //fixme
    console.log("IDB: There's no entry for ",M16250223541600J7474095390848625," store")
}
var M1625022877330IDBConnIDFor______=(store)=>{
    let db_name = M1624881345841IDB_store_index___[store];
    let connection_object = M1625022724571idbNameToConnObj__[db_name];//id
    if(!connection_object){
        M1625022318769idbIdxErrPrmptAdd_(store);
        return 
    }
    else return connection_object;
}
function M1624947905870IDB_map_store_____(M16249479597410J5924147242460605){
    let store = M16249479597410J5924147242460605.store;
    let db_name = M16249479597410J5924147242460605.db_name;
    M1624881345841IDB_store_index___[store]=db_name;
}
function M1625026869835IDBMergeUpdatePro_(M16250268798680J8351418844886263){
    //should be used for updating indices (never?)
    // M16250268798680J8351418844886263 : {store: store, M.....: {field3:new_value}, M...:value}
    let store = M16250268798680J8351418844886263.store;
    let keys = Object.keys(M16250268798680J8351418844886263);
    let dbc = M1625068079944JesSWindowProxXxy_[M1625022877330IDBConnIDFor______(store)];
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
function M1624861960052add_var___________(M16248624352900J3616530429038678){
    let id = M16248624352900J3616530429038678.id;
    let source = M16248624352900J3616530429038678.source||"M1624864048559Source_undefined__";
    let value = M16248624352900J3616530429038678.value;
    M1624861880949source____________[id]=source;
    M1625068079944JesSWindowProxXxy_[id]=value;
    M1624864687777StateLastUpdated__[id]=Date.now();
}
function M1624956113501Write_var_________(M16249480424750J4388463756040546){
    var key = M16249480424750J4388463756040546.key;
    var value = M16249480424750J4388463756040546.value;
    M1625068079944JesSWindowProxXxy_[key]=value;
    M1624880970437IDB_put___________(["storage",key,value])
}
/**
 * store -> db name -> conn for -> 
 * 
 */
var M1625045274944windowProxyHadler_={
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
 M1625068079944JesSWindowProxXxy_ = M1625045240464window_Proxy_idb__;
// var M1625068079944JesSWindowProxXxy_ = window;
var M1625045240464window_Proxy_idb__=new Proxy(window, M1625045274944windowProxyHadler_)
// playground

// M1625026869835IDBMergeUpdatePro_({store:"",});
