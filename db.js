import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
function getHome()
{
  const dbref=ref(db,"display");
  onValue(dbref,(key)=>
  {
    h=(key.val()==1)?false:true;
    if (h)
      document.getElementById("container1").innerHTML=`<div style="height:100vh;"></div>`;
  });
}
function getRules()
{
  r=``;
  const dbref=ref(db,"rules");
  onValue(dbref, (snapshot)=>{
    snapshot.forEach(key=>{
      r+=`<div class="indi-rules" id="${key.key}">`;
      r+=`<div class="rule-left"><img src="./images/event-logo/${key.key}.jpg" alt="event logo" class="rule-logo"></div>`;
      r+=`<div class="rule-right">`;
      addRules(key.key);
    });
    document.getElementById("rules").innerHTML=r;
  });
  r=``;
}
function getEvents()
{
  e=``;
  const dbref=ref(db,"rules");
  onValue(dbref, (snapshot)=>{
    e+=`<div class="event-content">`;
    snapshot.forEach(key=>{
      addEvents(key.key);
    });
    document.getElementById("events").innerHTML=e;
  });
  e=``;
}
function getCred()
{
  const dbref=ref(db,"credit");
  let s="";
  onValue(dbref, (data)=>
  {
    data.forEach(key=>
    {
      s+=getCredFolder(key.key);
    });
    document.getElementById("credit").innerHTML=s;
  });
}
function getCredFolder(dbkey)
{
  const dbref=ref(db,"credit/"+dbkey);
  let s="";
  onValue(dbref, (data)=>
  {
    s+=`<div class="cred-folder" id="${dbkey}">`;
    s+=`<div class="indi-cred" style="background-color: #0000;">`;
    s+=`<p class="cred-single" style="font-weight: bold; font-size: 3rem;" id="no-hover">${data.key}</p>`;
    s+=`</div>`;
    data.forEach(key=>
    {
      s+=getIndiCred(dbkey+"/"+key.key);
    });
    s+=`</div>`;
  });
  return s;
}
function getIndiCred(dbkey)
{
  const dbref1=ref(db,"credit/"+dbkey+"/name");
  const dbref2=ref(db,"credit/"+dbkey+"/tel");
  let s="",a,b;
  onValue(dbref1, (data)=>
  {
    a=data.val();
  });
  onValue(dbref2, (data)=>
  {
    b=data.val();
  });
  s+=`<div class="indi-cred">`;
  s+=`<img src="./images/call_logo.png" alt="facebook logo" class="contact-icon">`;
  s+=`<a href="tel:${b}" class="cred-single">${a}</a>`;
  s+=`</div>`;
  return s;
}
function addEvents(i) 
{
  const dbref=ref(db,"rules/"+i);
  let c=i.slice(4);
  c=Math.floor(c%2)+1;
  onValue(dbref, (snapshot)=>
  {
    let name="", des="", time="", nop="", timelim="", venue="";
    snapshot.forEach(key => {
      if (key.key=="name")
        name=key.val();
      else if (key.key=="des")
        des=key.val();
      else if (key.key=="time")
        time=key.val();
      else if (key.key=="nop")
        nop=key.val();
      else if (key.key=="timelim")
        timelim=key.val();
      else if (key.key=="venue")
        venue=key.val();
    });
    if (name!="General Rules")
    {
      e+=`<div class="indi-event${c}">`;
      if (c==1)
      {
        e+=`<img src="./images/event-logo/${i}.jpg" alt="event logo" class="event-logo-${c}">`;
        e+=`<div class="event-det-${c}">`
        e+=`<p class="event-name">${name}</p>`;
        e+=`<p class="event-des"><br>${des}<br>Time: ${time}<br>Venue: ${venue}<br>Number of Participants: ${nop}`;
        e+=`<br><br>Updates: <span class="updates" id="updates${i.slice(4)}"></span></p>`;
        e+=`</div></div>`;
      }
      else
      {
        e+=`<div class="event-det-${c}">`
        e+=`<p class="event-name">${name}</p>`;
        e+=`<p class="event-des"><br>${des}<br>Time: ${time}<br>Venue: ${venue}<br>Number of Participants: ${nop}`;
        e+=`<br><br>Updates: <span class="updates" id="updates${i.slice(4)}"></span></p>`;
        e+=`</div>`;
        e+=`<img src="./images/event-logo/${i}.jpg" alt="event logo" class="event-logo-${c}">`;
        e+=`</div>`;
      }
      
    }
  });
}
function addRules(i) 
{
  const dbref=ref(db,"rules/"+i);
  let z="",y="";
  onValue(dbref, (snapshot)=>
  {
    z+=`<div class="rule-right">`+`<ul class="rule-ul">`;
    let name="", des="", time="", nop="", timelim="", venue="";
    snapshot.forEach(key => {
      if (Number(key.key)>=0)
        z+=`<li class="rule-list">`+key.val()+"</li>";
      else if (key.key=="name")
        name=key.val();
      else if (key.key=="des")
        des=key.val();
      else if (key.key=="time")
        time=key.val();
      else if (key.key=="nop")
        nop=key.val();
      else if (key.key=="timelim")
        timelim=key.val();
      else if (key.key=="venue")
        venue=key.val();
    });
    z+="</ul>";
    y+=name==""?"":`<p class="rule-event">`+name+`</p>`;
    y+=`<p class="rule-event-des">`;
    y+=des==""?"":"<br>"+des;
    y+=time==""?"":"<br>"+time;
    y+=venue==""?"":"<br>"+venue;
    y+=nop==""?"":"<br>"+nop;
    y+=timelim==""?"":"<br>"+timelim;
    y+=`</p>`;
    r+=y+z;
    r+=`</div></div></div>`;
  });
}
function addGallery()
{
  g='';
  const dbref=ref(db,"gallery");
  onValue(dbref, (snapshot)=>
  {
    snapshot.forEach(key => {
      g+=`<img src="${key.val()}" alt="previous year logo" class="gallery-card">`;
    });
    document.getElementById("gallery-main").innerHTML=g;
  });
}
function addSchools()
{
  let s="";
  const dbref=ref(db,"school");
  onValue(dbref, (snapshot)=>
  {
    s+=`<div class="school-main">`
    snapshot.forEach(key => {
      s+=addIndiSchool(key.key);
    });
    s+=`</div>`
    document.getElementById('school').innerHTML=s;
  });
}
function addIndiSchool(i) 
{
  let a,b,s="";
  const dbref1=ref(db,"school/"+i+"/name");
  const dbref2=ref(db,"school/"+i+"/img");
  onValue (dbref1, (key)=>
  {
    a=key.val();
  });
  onValue (dbref2, (key)=>
  {
    b=key.val();
  });
  s+=`<div class="school-card">`;
  s+=`<img src="./images/school/${b}" alt="school logo" class="school-card-img">`;
  s+=`<p class="school-name">${a}</p>`;
  s+=`</div>`;
  return s;
}
function getUpdates() {
  const dbref = ref(db,"updates");
  onValue(dbref, (snapshot)=>
  {
    snapshot.forEach(key =>
    {
        addUpdates(key.key);
    });
  });
}
function addUpdates(i)
{
  const dbref = ref(db,"updates/"+i+"/live");
  onValue(dbref, (key)=>
  {
    document.getElementById(`updates${i}`).innerHTML=key.val();
    // document.getElementById(`updates${i}`).innerHTML='yo wassup';
    // console.log(key.val());
  });
}
function getContact() 
{
  const dbref=ref(db,"me");
  let s="";
  onValue(dbref, (key)=>
  {
    if (key.val()==0)
      s+=`Website by <a href="#makers" class="cont-single">Anindya Bhar</a> & <a href="#makers" class="cont-single">Aman Bhagat</a>`;
    else
      s+=`Website by <a href="https://www.instagram.com/anindya_bhar/" class="cont-single" target="_blank">Anindya Bhar</a> & <a href="https://www.instagram.com/aman_bolte18/" target="_blank" class="cont-single">Aman Bhagat</a>`;
    document.getElementById('myself').innerHTML=s;
  });
}
const firebaseConfig = 
{
  apiKey: "AIzaSyDsCeBvmfgmcYNG6SVk1x-hITlyYtzRByc",
  authDomain: "xprezns24anindya.firebaseapp.com",
  databaseURL: "https://xprezns24anindya-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "xprezns24anindya",
  storageBucket: "xprezns24anindya.appspot.com",
  messagingSenderId: "514677655027",
  appId: "1:514677655027:web:d9ca9280bc2cdd16ecbe86",
  measurementId: "G-ENWY61N060"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let r="";
let e="";
let g=``;
let h=true;
// getHome();
getRules();
getEvents();
addGallery();
addSchools();
getUpdates();
getCred();
getContact();
setInterval(getUpdates,1000)