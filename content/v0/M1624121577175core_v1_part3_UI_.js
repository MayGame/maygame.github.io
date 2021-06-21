

var M1624262971875UITopLevelZindex_=0;
var M1624122218197UI_panels________={}
function M1624262183697Render_UI_Panel__(M16242622099630J9366237639899546)
{}
function M1624265066524rand_id__________(){
        let rnd = Math.random().toString();//.length varies. 16-21. doesn't really matter
        let id=('M'+Date.now()+rnd.replace('.','J')+"BB00BB").substr(0,32);
        //starts with a number, contains dot -> not a valid ID for C-like languages
        //31-35 symbols. 
        return id;}
function M1624264785245value_to_id______(M16242647363800J5140259437325456){
    let a=('M'+Date.now()+M16242647363800J5140259437325456.value+'_________________________').slice(0,31);
    return a.replaceAll(' ','_');
}
function M1624262716713UISpawnNewWindow_(M16242627750700J7017439316036245){
    M1624262971875UITopLevelZindex_+=1;
console.log(M1624262971875UITopLevelZindex_)
    var div = document.createElement('div');
    div.setAttribute("class","M1624268064555window_style_clas");
    div.style.height="100%";
    div.style.zIndex=M1624262971875UITopLevelZindex_;
    var closeX = document.createElement("a");
    let divid=M1624265066524rand_id__________();
    closeX.innerHTML="x";
    closeX.setAttribute("onclick",`let a=document.getElementById('${divid}'); document.body.removeChild(a);`);
    closeX.className="M1624269672137w_style_controls_";
    div.appendChild(closeX)
    div.setAttribute("id",divid);
    var innerContent=M16242627750700J7017439316036245.content||divid.toString();
    var idiv = document.createElement('div');
    var idivid=M1624265066524rand_id__________();
    // idiv.style.backgroundColor="hotpink";
    idiv.style.height="100%";
    idiv.innerHTML=innerContent;
    idiv.setAttribute("id",divid);
    idiv.className="M1624270899914w_style_innercont";
    div.appendChild(idiv);
    let win_title=M16242627750700J7017439316036245.title||idivid;
    let titleEl = document.createElement("p");
    titleEl.className="M1624269596707w_style_bar______"
    titleEl.innerHTML=win_title;
    div.appendChild(titleEl);
    document.body.appendChild(div);

    
    return [divid,idivid];
}

