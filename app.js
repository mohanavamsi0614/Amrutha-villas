const slide=document.querySelectorAll(".slide")
let cur=0
const randomit=document.querySelectorAll(".iteam")
const item=document.getElementById("item")
const space=document.getElementById("space")
const dialog=document.querySelector("dialog")
let srt=document.querySelector(".spacesort")

const sear=document.getElementById("search")

function show(l){
    cur=l
    if(l<0){
        cur=slide.length-1
    }
    else if(l>slide.length-1){
        cur=0
    }
    for (let i=0;i<slide.length;i++){
        if (i==cur){
            slide[i].style.display="block"
        }
        else{
            slide[i].style.display="none"
        }
           
    }
    
}
function next(){

    show(cur+1)
}
function prev(){
    show(cur-1)
}
// getting random dish
async function random(){
    
    // return  data.meals[0]
    for (let i=0;slide.length>i;i++){
        try{
            let r=await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
            let data=await r.json()
        data=data.meals[0]
        console.log(data)
        randomit[i].innerHTML=`<img src=${data.strMealThumb} alt="" class="randomimg">
        <h1 class="descrepsion">${data.strMeal}</h1>`
        randomit[i].onclick=()=>{
            onemeal(data.idMeal)
        }
    }
    catch{
      console.log("Error")
    }
}}
// getting dish by refrence of meal id given in api
async function onemeal(id){
    dialog.showModal()
    try{
      let r= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      let data= await r.json()
      let an=document.createElement("a")
      an.href="food.html"
      an.className="aa"
      an.style.color="blue"
      an.innerHTML="click to see full instrucsions"
      data=data.meals[0]
      dialog.innerHTML=`
      <div>
      <h2 align="right" id="close">X</h2>
      <h1 id="nam"></h1>
      <div class="intro">
          <img src= alt="" id="img">
          <hr>
          <div>
              <h3>Ingredents:</h3>
              <ul id="ingre"></ul>
              <a href="food.html" id="an">Read more..</a>
          </div>  
      </div>
  </div>`
  const cose=document.getElementById("close")
  const nam=document.getElementById("nam")
const img=document.getElementById("img")
const ol=document.getElementById("ingre")
cose.onclick=()=>{
    dialog.innerHTML=""
    dialog.close()
    
}
      nam.innerHTML=data.strMeal
      console.log(data.strMeal)
      img.src=data.strMealThumb
      console.log(data)
      an.style.color="white"
      an.onclick=()=>{
        localStorage.setItem("id",id);
      }
      ol.innerHTML=""
      for  (let i=1; i<21;i++){
        if (data[`strIngredient${i}`]!=""){
            const list=document.createElement("li")
            list.innerHTML=data[`strIngredient${i}`]+" "+data[`strMeasure${i}`]
            if(list.innerHTML=="null"){
                continue
            }
            else{
            ol.append(list)}
        }
      }
      ol.append(an)
      return data.meals[0]
    }
    catch{
        return "no results found 404"
    }
}
// getting dish realted to given value cartogry
async function search(g) {
    try{
    let r = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${g}`
    );
    let data = await r.json();
    data = data.meals;
    console.log(data)
    space.innerHTML=""
    for (let i = 0; i < data.length; i++) {
      const img=document.createElement("img")
      const div = document.createElement('div');
      div.className="food"
      const p=document.createElement("h3")
      p.innerHTML=data[i].strMeal;
      img.src=data[i].strMealThumb
      img.style.width="100%"
      div.append(img,p)
      space.append(div)
      
      div.onclick = () => {
        console.log("ewbjk")
        onemeal(data[i].idMeal);
      };
    }
    return data;
}
catch{
    space.innerHTML="<div><img src='./assets/error.png' width='100%' class='j'/><h1 align='center'>No Results found</h1></div>"
}
  }
  sear.onclick=()=>{
    search(item.value)
}
async function sort(alpha) {
    try{
   let data =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${alpha}`) 
   let dat= await data.json()
   dat=dat.meals
   console.log(dat)
   for (let i = 0; i < dat.length; i++) {
    const img=document.createElement("img")
    const div = document.createElement('div');
    div.className="food"
    const p=document.createElement("h3")
    p.innerHTML=dat[i].strMeal;
    img.src=dat[i].strMealThumb
    img.style.width="100%"
    div.append(img,p)
    srt.append(div)
    console.log(dat[i].strMeal)
    div.onclick = () => {
      console.log("ewbjk")
      onemeal(dat[i].idMeal);
    };
  }  
  
}
catch{
    console.log(Error)
    
} }
for (let i of document.querySelectorAll(".alpha")){
    i.onclick=()=>{
        console.log("dbhjbd")
        let val=i.innerHTML.toLowerCase()
        srt.innerHTML=""
        sort(val)
    }

}
random()
setInterval(next,5000)
setTimeout(next,600)

