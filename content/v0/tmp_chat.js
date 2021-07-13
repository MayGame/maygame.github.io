var common_message_queue=[];
// M1623941545551idb_Mayn_db_init__();
// var gun = new Gun({localStorage:false, peers:["https://gun-manhattan.herokuapp.com/gun"]});
var M1626125425225mg_gunHerokuGunIns = new Gun({localStorage:false, peers:["https://mg-gun.herokuapp.com/gun"]});
// var M1626131872934vmGlitchGunInstanc = new Gun({localStorage:false, peers:["https://vine-mature-morocco.glitch.me/gun"]});
var sea = Gun.SEA;
var user = M1626125425225mg_gunHerokuGunIns.user()
var me;
var chatWindow=`
<label for="choose_me">Me:</label>
<input type="text" id="choose_me" placeholder="I am" value="J">
<br>
<label for="choose_to">To:</label>
<input type="text" id="choose_to" placeholder="send to" value="O">
<textarea id="chat_area" placeholder="Spread your love here">
</textarea>
<br>
<button onclick="
let a = chat_area.value;
let me = choose_me.value;
let to = choose_to.value;
if(a&&me&&to){
    send(a,me,to);
    chat_area.value=null;
}
">Send</button>
<h3>History:</h3>
<div style="overflow-y: scroll; height: 70%;" id="chat_log">

</div>
`
var chatWindow2=`
<label for="choose_me2">Me:</label>
<input type="text" id="choose_me2" placeholder="I am" value="J">
<br>
<label for="choose_to2">To:</label>
<input type="text" id="choose_to2" placeholder="send to" value="O">
<textarea id="chat_area" placeholder="Spread your love here">
</textarea>
<br>
<label>Type</label><input type="text" placeholder="MJ word for type" value="M1625913370169MessageDBonher____">
<br>
<button onclick="
let a = chat_area.value;
let me = choose_me2.value;
let to = choose_to2.value;
if(a&&me&&to){
    send(a,me,to);
    chat_area.value=null;
}
">Send</button>
<h3>History:</h3>
<div style="overflow-y: scroll; height: 70%;" id="chat_log">

</div>
`
M1624262716713UISpawnNewWindow__({content:chatWindow, title:"chat"})
M1624262716713UISpawnNewWindow__({content:chatWindow2, title:"chat2"})
chat_area.value=null;

function oncmq(e){
let m = JSON.parse(e)
common_message_queue.push(JSON.parse(e));
// console.table(common_message_queue)
update_logs()
// M1624262716713UISpawnNewWindow__({content:"m", title:"p1"})
}
var word_for_type_message="M1625913370169MessageDBonher____";
var word_for_introduce_new_word="M1626131452199MJWordOffering____";
M1626125425225mg_gunHerokuGunIns.get("M1626125031687MGGunUnrPubPutChTp").get("cmq").on(oncmq)
// M1626125425225mg_gunHerokuGunIns.get("M1626125031687MGGunUnrPubPutChTp").get("cmq").on(e=>oncmq(e))
function test_send(){
let id = Date.now()
    M1626125425225mg_gunHerokuGunIns.get("M1626125031687MGGunUnrPubPutChTp").get("cmq").put(JSON.stringify({from:1,receiver:1,content:"hi",id:id}))
}
function nts_id(){
let Jrand = (Math.random()+"000000").replace('.','J').substr(0,18);
let res = "M"+Gun.state()+Jrand;
return res;
}
function send(content, from, to){
let id = Date.now()
    M1626125425225mg_gunHerokuGunIns.get("M1626125031687MGGunUnrPubPutChTp").get("cmq").put(JSON.stringify({from:from,receiver:to,content:content,id:id}))
}
function sendv2(content, from, to){
//M1626125425225mg_gunHerokuGunIns.get("M1626125031687MGGunUnrPubPutChTp").get(
}
function update_logs(){
    let el = common_message_queue.pop();
    let txt=`<br><p onclick="M1624635774325Toast_____________({text:'at ${new Date(el.id)}'})">${el.from}: ${el.content}</p> `
    document.getElementById('chat_log').insertAdjacentHTML("afterbegin",txt)   
}
var M1626125031687MGGunUnrPubPutChTp;
// function save_to_idb(msg){
//     let store = M1623941499181idb_Mayn_db_______.transaction(
//         ["M1623945792684idb_thesaurus_____","M1623940635385idb_type_map______",
//     "M1625105007943IDBStoreMeta______"],"readwrite").objectStore("M1623945792684idb_thesaurus_____");
// }
var tmpname4M1626125031687MGGunUnrPubPutChTpHandler = function(newCh2listen){
M1626125425225mg_gunHerokuGunIns.get("M1626125031687MGGunUnrPubPutChTp").get("newCh2listen").on(fixme)
}
const userMediaConstraints = {
    audio: true,
    video: false
};

const offerOptions = {
    offerToReceiveVideo: 0,
    offerToReceiveAudio: 1
};

var env;
		if(typeof window !== "undefined"){ env = window }
		if(typeof global !== "undefined"){ env = global }
var rtcpc = env.RTCPeerConnection || env.webkitRTCPeerConnection || env.mozRTCPeerConnection;
var rtcsd = env.RTCSessionDescription || env.webkitRTCSessionDescription || env.mozRTCSessionDescription;
var rtcic = env.RTCIceCandidate || env.webkitRTCIceCandidate || env.mozRTCIceCandidate;
var rtc = {'iceServers': [
    {urls: 'stun:stun.l.google.com:19302'},
    {urls: "stun:stun.sipgate.net:3478"}/*,
    {urls: "stun:stun.stunprotocol.org"},
    {urls: "stun:stun.sipgate.net:10000"},
    {urls: "stun:217.10.68.152:10000"},
    {urls: 'stun:stun.services.mozilla.com'}*/ 
  ]};		
var localStream = null;
var localrtcconn = new RTCPeerConnection(null);
var remPC = new RTCPeerConnection(rtc);
remPC.addStream(localStream);

///FUCK IT

// TODO: Flush messages
// var me_stun = RTC