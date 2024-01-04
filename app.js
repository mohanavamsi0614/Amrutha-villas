const slide=document.querySelectorAll(".slide")
let cur=0
const randomit=document.querySelectorAll(".iteam")
const item=document.getElementById("item")
const space=document.getElementById("space")
const dialog=document.querySelector("dialog")
const cose=document.getElementById("close")
const nam=document.getElementById("nam")
const img=document.getElementById("img")
const ingre=document.getElementById("ingre")
const ol=document.getElementById("ingre")
const sear=document.getElementById("search")
cose.onclick=()=>{
    dialog.close()
}
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
async function random(){
    try{
    let r=await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    let data=await r.json()
    return  data.meals[0]
    }
    catch{
      console.log("Error")
    }
}
async function onemeal(id){
    dialog.showModal()
    try{
      let r= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      let data= await r.json()
      data=data.meals[0]
      nam.innerHTML=data.strMeal
      console.log(data.strMeal)
      img.src=data.strMealThumb
      console.log(data)
      ol.innerHTML=""
      for  (let i=1; i<21;i++){
        if (data[`strIngredient${i}`]!=""){
            const list=document.createElement("li")
            list.innerHTML=data[`strIngredient${i}`]+" "+data[`strMeasure${i}`]
            ol.append(list)
        }
      }
      return data.meals[0]
    }
    catch{
        return "no results found 404"
    }
}
async function search(g) {
    try{
    let r = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${g}`
    );
    let data = await r.json();
    data = data.meals;
    space.innerHTML=""
    for (let i = 0; i < data.length; i++) {
      const img=document.createElement("img")
      const div = document.createElement('div');
      div.className="food"
      const p=document.createElement("h1")
      p.innerHTML =data[i].strMeal;
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
    space.innerHTML="<h1 align='center'>No Results found</h1><img src='./assets/error.png'/>"
}
  }

async function f(){
for (let i=0;slide.length>i;i++){
    let data= await random()
    console.log(data)
    randomit[i].innerHTML=`<img src=${data.strMealThumb} alt="" class="randomimg">
    <h1 class="descrepsion">${data.strMeal}</h1>`
    randomit[i].onclick=()=>{
        onemeal(data.idMeal)
    }
}
sear.onclick=()=>{
    search(item.value)
}
}
f()
setInterval(next,5000)

