let alphabet = document.querySelector(".allcharacter");
let placeQuestion = document.querySelector(".question h3");
let image = document.querySelector(".img img");
let answer = document.querySelector(".answer");
let catg = document.getElementById("category");
let scorePlace = document.getElementById("score");
let chancePlace = document.getElementById("chance");
let score = 0;
let chance = 6;


let xml = new XMLHttpRequest();


xml.onload = function(){
    let data = JSON.parse(this.responseText);
    // console.log(data.alphabets.length);
    for(let i=0;i<data.alphabets.length; i++){
        let divAlphabet = document.createElement("div");
        let titelAlphabet = document.createElement("h3");
        let textAlphabet = document.createTextNode(data.alphabets[i]);
        titelAlphabet.appendChild(textAlphabet);
        divAlphabet.appendChild(titelAlphabet);
        alphabet.appendChild(divAlphabet);
        divAlphabet.id = "lettre";
    }


    // Récupérer les paramètres de l'URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // Récupérer la valeur du paramètre "type"
    const categoryChoice = urlParams.get('type');
    catg.innerHTML = categoryChoice;

    
    if (categoryChoice == "foot") {
        document.body.style.backgroundImage = "url(img/stade.png)";
    } else if (categoryChoice == "basketball") {
        document.body.style.backgroundImage = "url(img/stadBassket.png)";
    } else if (categoryChoice == "tennis") {
        document.body.style.backgroundImage = "url(img/stadeTennis.png)";
    }


    let question = data.category[categoryChoice][0].question;
    placeQuestion.innerHTML = question;

    image.src = data.category[categoryChoice][0].image;

    let reponse =Array.from(data.category[categoryChoice][0].reponse);
    console.log(reponse)

 

    for(let i=0; i<reponse.length;i++){
        let tiri = document.createElement("h3");
        let tiriText = document.createTextNode("-");
        tiri.appendChild(tiriText);
        answer.appendChild(tiri);
        tiri.id ="tiri";
    }


let lettres = document.querySelectorAll("#lettre");
let tiriPlace = document.querySelectorAll("#tiri");

lettres.forEach((lettre) => {
    lettre.addEventListener("click", function () {
        verifierLettre(lettre);
    });
});

function verifierLettre(lettre) {
    if (!lettre.classList.contains("clicked")) {
        lettre.classList.add("clicked"); 
        
        if (reponse.includes(lettre.querySelector("h3").innerHTML.toLowerCase())) {
            lettre.style.background = "green";
            score++;
            scorePlace.innerHTML = score;
            let allIndexLettre = [];
            for (let i = 0; i < reponse.length; i++) {
                if (reponse[i] == lettre.querySelector("h3").innerHTML.toLowerCase()) {
                    allIndexLettre.push(i);
                }
            }

            for (let i = 0; i < allIndexLettre.length; i++) {
                for (let j = 0; j < tiriPlace.length; j++) {
                    if (allIndexLettre[i] == j) {
                        tiriPlace[j].innerHTML = reponse[j].toUpperCase();
                    }
                }
            }
        } else {
            chance--;
            if(chance <= 0){
                console.log("gameover")
                document.querySelector(".box").style.display = "none";
                let end = document.createElement("div");
                end.classList.add("boxEnd");

                //ajouter game over
                let gameOver = document.createElement("h1");
                let gameOverTxt = document.createTextNode("Game Over");
                gameOver.appendChild(gameOverTxt);
                gameOver.classList.add("gameover");
                end.appendChild(gameOver);

                //ajouter score
                let endScore = document.createElement("h4");
                let endScoreTxt = document.createTextNode(`votre score : ${score}`);
                endScore.appendChild(endScoreTxt);
                endScore.classList.add("endScore");
                end.appendChild(endScore);

                //button collecter tous les buttons
                let allButton = document.createElement("div");
                allButton.classList.add("allButton");

                //ajouter buttom play again
                let playAgain = document.createElement("a");
                let playAgainTxt = document.createTextNode(`Play again`);
                playAgain.href = `categorySport.html?type=${categoryChoice}`;
                playAgain.appendChild(playAgainTxt);
                playAgain.classList.add("button");
                allButton.appendChild(playAgain);

                //ajouter buttom home
                let home = document.createElement("a");
                let homeTxt = document.createTextNode(`Home`);
                home.href = `../index.html`;
                home.appendChild(homeTxt);
                home.classList.add("button");
                allButton.appendChild(home);

                end.appendChild(allButton)

                document.body.appendChild(end);
            }else{
                chancePlace.innerHTML =chance;
                lettre.style.background = "red";
            }

        }
    }
}


    
}


xml.open("GET", "categorySport.json");
xml.send();