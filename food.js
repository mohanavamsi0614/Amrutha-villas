let food=document.getElementById("horz1")
let foodimg=document.getElementById("foodimg")
let foodname=document.getElementById("foodname")
const youtube=document.getElementById("youtube")
const ing=document.getElementById("Ingredents")
async function onemeal(id){
    try{
      let r= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      let data= await r.json()
      data=data.meals[0]
      foodimg.src=data.strMealThumb
      foodname.innerHTML=data.strMeal
      ing.innerHTML=data.strInstructions
      youtube.href=data.strYoutube
      console.log(data)
      return data.meals[0]
    }
    catch{
        return "no results found 404"
    }
}
onemeal(localStorage.getItem("id"))
let id=localStorage.getItem("id")
console.log(localStorage.getItem("id"))
