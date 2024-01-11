let category = document.querySelectorAll(".lien");

category.forEach(elm =>{
    elm.addEventListener("click", function(event){
        event.preventDefault();
        window.location.href =`category/categorySport.html?type=${elm.querySelector("img").alt}`;
        console.log(elm.querySelector("img").alt);
    })
})