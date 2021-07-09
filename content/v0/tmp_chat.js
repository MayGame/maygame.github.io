var common_message_queue=[];
var gun = new Gun("https://vine-mature-morocco.glitch.me/gun");
var sea = Gun.SEA
var user = gun.user()
var me;
var chatWindow=`
<label for="choose_me">Me:</label>
<input type="text" id="choose_me" placeholder="I am" value="J">
<br>
<label for="choose_to">To:</label>
<input type="text" id="choose_to" placeholder="send to" value="O">
<textarea id="chat_area" placeholder="Spread your love here">

</textarea>
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
M1624262716713UISpawnNewWindow__({content:chatWindow, title:"chat"})
chat_area.value=null;

function oncmq(e){
let m = JSON.parse(e)
common_message_queue.push(JSON.parse(e));
// console.table(common_message_queue)
update_logs()
// M1624262716713UISpawnNewWindow__({content:"m", title:"p1"})

}
gun.get("tmp").get("cmq").on(oncmq)
// gun.get("tmp").get("cmq").on(e=>oncmq(e))
function test_send(){
let id = Date.now()
    gun.get("tmp").get("cmq").put(JSON.stringify({from:1,receiver:1,content:"hi",id:id}))
}
function send(content, from, to){
let id = Date.now()
    gun.get("tmp").get("cmq").put(JSON.stringify({from:from,receiver:to,content:content,id:id}))
}
function update_logs(){
    let el = common_message_queue.pop();
    let txt=`<br><p onclick="M1624635774325Toast_____________({text:'at ${new Date(el.id)}'})">${el.from}: ${el.content}</p> `
    document.getElementById('chat_log').insertAdjacentHTML("afterbegin",txt)   
}

