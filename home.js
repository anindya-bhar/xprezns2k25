function countdown()
{
    let time = Math.floor((new Date(2024,6,28,15,22,0,0) - new Date())/1000);
    let dt = Math.floor(time/60/60/24);
    console.log(time);
    if (time<0)
    {
        document.getElementById("countdown").innerHTML="Chakratan";
    }
    else
    {
        if (dt<10)
            dt='0'+dt;
        let hr = Math.floor(time/60/60);
        time-=hr*60*60;
        if (hr<10)
            hr='0'+hr;
        let min = Math.floor(time/60);
        time-=min*60;
        if (min<10)
            min='0'+min;
        if (time<10)
            time='0'+time;
        time=`${dt}:${hr}:${min}:${time}`
        document.getElementById("time").innerHTML=time;
    }
    // console.log(time);
}
function loaded()
{
    var preloader = document.querySelector('.loader');
    preloader.style.display = 'none';
    welcome();
}
function welcome()
{
    document.getElementById("main").style.display="none";
    document.getElementById("wel-content").style.animation="welcome 4s ease-in-out"
    setTimeout(gotoHome,4000)
}
function gotoHome()
{
    document.getElementById("main").style.display="flex";
    document.getElementById("image").style.display="none";
    document.getElementById("welcome").style.display="none";
    document.getElementById("events").style.display="none";
    document.getElementById("gallery").style.display="none";
    document.getElementById("close").style.display="none";
    document.getElementById("rules").style.display="none";
    document.getElementById("contact").style.display="none";
    document.getElementById("credit").style.display="none";
    document.getElementById("schedule").style.display="none";
    document.getElementById("school").style.display="none";
    img=false;
    events=false;
    rules=false;
    contact=false;
    gallery=false;
    organizer=false;
    schedule=false;
}
function toggleImage()
{
    img=!img;
    if (img)
    {
        document.getElementById("main").style.display="none";
        document.getElementById("image").style.display="flex";
        document.getElementById("close").style.display="inline-block";
    }
}
function toggleEvents()
{
    events=!events;
    if (events)
    {
        document.getElementById("main").style.display="none";
        document.getElementById("events").style.display="flex";
        document.getElementById("close").style.display="inline-block";
    }
}
function toggleRules()
{
    rules=!rules;
    if (rules)
    {
        document.getElementById("main").style.display="none";
        document.getElementById("rules").style.display="flex";
        document.getElementById("close").style.display="inline-block";
    }
}
function toggleSchedule()
{
    schedule=!schedule;
    if (schedule)
    {
        document.getElementById("main").style.display="none";
        document.getElementById("schedule").style.display="block";
        document.getElementById("close").style.display="inline-block";
    }
}
function toggleOrganizers()
{
    organizer=!organizer;
    if (organizer)
    {
        document.getElementById("main").style.display="none";
        document.getElementById("credit").style.display="flex";
        document.getElementById("close").style.display="inline-block";
    }
}
function toggleSchool()
{
    school=!school;
    if (school)
    {
        document.getElementById("main").style.display="none";
        document.getElementById("school").style.display="flex";
        document.getElementById("close").style.display="inline-block";
    }
}
function toggleContact()
{
    contact=!contact;
    if (contact)
    {
        document.getElementById("main").style.display="none";
        document.getElementById("contact").style.display="flex";
        document.getElementById("close").style.display="inline-block";
    }
}
function toggleGallery()
{
    gallery=!gallery;
    if (gallery)
    {
        document.getElementById("main").style.display="none";
        co=1;
        interval=setInterval(changePic,1000);
        setTimeout(showGallery,1000*8+3000);
        document.getElementById("gallery").style.display="flex";
        document.getElementById("close").style.display="inline-block";
    }
}
function showGallery()
{
    document.getElementById("gallery-main").style.display="grid";
}
function changePic()
{
    if (co==8)
    {
        document.getElementById("pre-logo-div").innerHTML=`<img src="images/xprezns_rohit_2.jpg" alt="pre-logo" class="pre-logo-img" id="pre-logo-img">`;
        document.getElementById("pre-logo-img").style.animation="zoomGallery 3s linear both";
    }
    else if (co==11)
    {
        clearInterval(interval);
        document.getElementById("pre-logo-div").style.display="none";
    }
    else if (co<8)
    {
        document.getElementById("pre-logo-div").innerHTML=`<img src="./images/preLogo/preLogo${co}.jpg" alt="pre-logo" class="pre-logo-img" id="pre-logo-img">`;
        document.getElementById("pre-logo-img").style.animationName=`preLogo`;
    }
    co++;
}
let img=false;
let events=false;
let rules=false;
let contact=false;
let organizer=false;
let school=false;
let gallery=false;
let schedule=false;
let co=1;
let interval;
countdown();
setInterval(countdown,1000);