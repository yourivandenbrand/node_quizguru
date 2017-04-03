window.$ = window.jQuery || function(e,t,l){var n={"#":"getElementById",".":"getElementsByClassName","@":"getElementsByName","=":"getElementsByTagName","*":"querySelectorAll"}[e[0]],m=(t===l?document:t)[n](e.slice(1));return m.length<2?m[0]:m};
function shuffle(o){for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);return o;}

function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        if(catIsTv == true){
            xobj.open('GET', 'json/tv_show_intro.json', true);
        }
        else if(catIsSport == true){
            xobj.open('GET', 'json/sport.json', true);
        }
        else{
            xobj.open('GET', 'json/sport.json', true);
        }
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
}

document.body.onload = onReady();

function onReady() {
    setVars();
    setEventlisteners();
}

function getJSON(){
    questionsAnswersArray = [];
    
    loadJSON(function(response) {
        var QandA = JSON.parse(response);
        for (var i = 1; i <= Object.keys(QandA).length ; i++) {
            questionsAnswersArray.push({type:QandA["Q"+i].Type, question:QandA["Q"+i].Question, source:QandA["Q"+i].Source, answer:QandA["Q"+i].Answer});
            if(i == Object.keys(QandA).length){
                questionsAnswersArray = shuffle(questionsAnswersArray);
                setNewQuestion();
            }
        }
     });
}

function loadTV(){
    catIsTv = true;
    catIsSport = false;
    getJSON();
}

function loadSportJson(){
    catIsSport = true;
    catIsTv = false;
    getJSON();
}

function setVars(){
    
    
    activePhones = 0;

    phone1Active = false;
    phone2Active = false;
    phone3Active = false;
    phone4Active = false;

    player1Score = 0;
    player2Score = 0;
    player3Score = 0;
    player4Score = 0;

    answerPhone1Var = "";
    answerPhone2Var = "";
    answerPhone3Var = "";
    answerPhone4Var = "";

    answersGiven = 0;

    phoneArray = [phone1, phone2. phone3, phone4]

    
    currentNumber = 0;
    
}


function setEventlisteners(){
    sendPhone1.addEventListener("click", function(){setName(event ,namePhone1.value)});
    sendPhone2.addEventListener("click", function(){setName(event ,namePhone2.value)});
    sendPhone3.addEventListener("click", function(){setName(event ,namePhone3.value)});
    sendPhone4.addEventListener("click", function(){setName(event ,namePhone4.value)});
    startGameBtn.addEventListener("click", showCat);
    
    sendAnswerPhone1.addEventListener("click", function(){setAnswer(event ,answerPhone1.value)});
    sendAnswerPhone2.addEventListener("click", function(){setAnswer(event ,answerPhone2.value)});
    sendAnswerPhone3.addEventListener("click", function(){setAnswer(event ,answerPhone3.value)});
    sendAnswerPhone4.addEventListener("click", function(){setAnswer(event ,answerPhone4.value)});

    nextQuestion.addEventListener("click", setNewQuestion);
    
    loadTvShows.addEventListener("click", loadTV);
    loadSport.addEventListener("click", loadSportJson);
}

function setName(e, value){
    switch(e.target) {
    case sendPhone1:
        name1.innerHTML = value;
        phone1Active = true;
        $(".phoneIntro")[0].style.display = "none";               
        break;
    case sendPhone2:
        name2.innerHTML = value;
        phone2Active = true;
        $(".phoneIntro")[1].style.display = "none";                
        break;
    case sendPhone3:
        name3.innerHTML = value;
        phone3Active = true;
        $(".phoneIntro")[2].style.display = "none";               
        break;
    case sendPhone4:
        name4.innerHTML = value;
        phone4Active = true;
        $(".phoneIntro")[3].style.display = "none";              
        break;
    }

    activePhones+=1;

    totalPlayers.innerHTML = "Total players = " + activePhones;
}

function showCat(){
    startScreen.style.display = "none";
    chooseCat.style.display = "block";

    this.masterTimeline = new TimelineMax({ paused: false, repeat:-1 });
        this.masterTimeline.add("start")
            .fromTo($(".lightWrapper"), 7.5,{rotation:'+=40'},{rotation:'-=40', ease:Power2.easeInOut}, "start")
            .to($(".blue"), 3,{opacity:0, ease:Power2.easeInOut}, "3")
            .to($(".yellow"), 3,{opacity:0.5, ease:Power2.easeInOut}, "3")
            .to($(".yellow"), 3,{opacity:0, ease:Power2.easeInOut}, "6")
            .to($(".red"), 3,{opacity:0.5, ease:Power2.easeInOut}, "6")
            .to($(".lightWrapper"), 7.5, {rotation:"+=40", ease:Power2.easeInOut}, "7.5")
            .to($(".red"), 3,{opacity:0, ease:Power2.easeInOut}, "9")
            .to($(".green"), 3,{opacity:0.5, ease:Power2.easeInOut}, "9")
            .to($(".green"), 3,{opacity:0, ease:Power2.easeInOut}, "12")
            .to($(".blue"), 3,{opacity:0.5, ease:Power2.easeInOut}, "12");
}

function setAnswer(e, value){
    var value = value.toUpperCase();

    if(value.indexOf(questionsAnswersArray[currentNumber].answer) >-1){
        alert("Your answer is the right answer... Choose a new answer!!!")
        return;
    }

    switch(e.target) {
    case sendAnswerPhone1:
        answerPhone1Var = value;
        $(".phoneQuestionScreen")[0].style.display = "none";        
        scorePlayer1.style.display = "block";        
        break;
    case sendAnswerPhone2:
        answerPhone2Var = value;
        $(".phoneQuestionScreen")[1].style.display = "none";        
        scorePlayer2.style.display = "block";        
        break;
    case sendAnswerPhone3:
        answerPhone3Var = value;
        $(".phoneQuestionScreen")[2].style.display = "none";        
        scorePlayer3.style.display = "block";        
        break;
    case sendAnswerPhone4:
        answerPhone4Var = value;
        $(".phoneQuestionScreen")[3].style.display = "none";        
        scorePlayer4.style.display = "block";        
        break;
    }

    answersGiven += 1;

    if(answersGiven == activePhones){
        showAnswers();
        answersGiven = 0;
    }


}

function showAnswers(){
    if(questionsAnswersArray[currentNumber].type == "audio"|| questionsAnswersArray[currentNumber].type == "image" || questionsAnswersArray[currentNumber].type == "video"){
        questionSource.remove();
    }
    questionSourceText.remove();
    questionScreen.style.display = "none";
    answerScreen.style.display = "block";

    showHide('.phoneAnswerScreen','block');

    answer5.innerHTML = questionsAnswersArray[currentNumber].answer;
    
    for (var i = 0; i <= phoneArray.length; i++) {

        if(window["answerPhone" + (i+1) + "Var"].length > 0){
            window["answer" + (i+1)].innerHTML = window["answerPhone" + (i+1) + "Var"];
        }
        else{
            window["answer" + (i+1)].style.display = "none";
            showHide('.answer'+(i+1)+'Phone','none');
        }
        
        for (var d =0; d <= getRandom(0, (i+1)); d++) {
            window["answer" + (i+1)].parentNode.insertBefore(window["answer" + (i+1)], window["answer" + (i+1)].previousElementSibling);
            
            var answerMobile = document.querySelectorAll(".answer" + (i+1)+ "Phone");
            for (var q =0; q < answerMobile.length; q++) {
                answerMobile[q].addEventListener("click", checkAnswer);
                answerMobile[q].parentNode.insertBefore(answerMobile[q], answerMobile[q].previousElementSibling);
                answerMobile[q].innerHTML = window["answerPhone" + (i+1) + "Var"];
            }
        }
    }

    for (var i =0; i <= getRandom(0, 5); i++) {
        answer5.parentNode.insertBefore(answer5, answer5.previousElementSibling);
        var answerMobile = document.querySelectorAll(".answer5Phone");

        for (var s =0; s < answerMobile.length; s++) {
            answerMobile[s].parentNode.insertBefore(answerMobile[s], answerMobile[s].previousElementSibling);
            answerMobile[s].innerHTML = questionsAnswersArray[currentNumber].answer;
            answerMobile[s].addEventListener("click", checkAnswer);
        }
    }

    currentNumber ++;
}

function checkAnswer(e){

     var combinedTargets = e.target.className + "_" +e.path[2].id;

     switch(combinedTargets) {
        case "answer1Phone_phone1":
            $(".phoneAnswerScreen")[0].style.display = "none";
        break;
        case "answer2Phone_phone1":
            player2Score += 10;
            $(".phoneAnswerScreen")[0].style.display = "none";
        break;
        case "answer3Phone_phone1":
            player3Score += 10;
            $(".phoneAnswerScreen")[0].style.display = "none";
        break;
        case "answer4Phone_phone1":
            player4Score += 10;
            $(".phoneAnswerScreen")[0].style.display = "none";
        break;
        case "answer5Phone_phone1":
            player1Score += 20;
            $(".phoneAnswerScreen")[0].style.display = "none";
        break;

        case "answer1Phone_phone2":
            player1Score += 10;
            $(".phoneAnswerScreen")[1].style.display = "none";
        break;
        case "answer2Phone_phone2":
            $(".phoneAnswerScreen")[1].style.display = "none";
        break;
        case "answer3Phone_phone2":
            player3Score += 10;
            $(".phoneAnswerScreen")[1].style.display = "none";
        break;
        case "answer4Phone_phone2":
            player4Score += 10;
            $(".phoneAnswerScreen")[1].style.display = "none";
        break;
        case "answer5Phone_phone2":
            player2Score += 20;
            $(".phoneAnswerScreen")[1].style.display = "none";
        break;

        case "answer1Phone_phone3":
            player1Score += 10;
            $(".phoneAnswerScreen")[2].style.display = "none";
        break;
        case "answer2Phone_phone3":
            player2Score += 10;
            $(".phoneAnswerScreen")[2].style.display = "none";
        break;
        case "answer3Phone_phone3":
            $(".phoneAnswerScreen")[2].style.display = "none";
        break;
        case "answer4Phone_phone3":
            player4Score += 10;
            $(".phoneAnswerScreen")[2].style.display = "none";
        break;
        case "answer5Phone_phone3":
            player3Score += 20;
            $(".phoneAnswerScreen")[2].style.display = "none";
        break;

        case "answer1Phone_phone4":
            player1Score += 10;
            $(".phoneAnswerScreen")[3].style.display = "none";
        break;
        case "answer2Phone_phone4":
            player2Score += 10;
            $(".phoneAnswerScreen")[3].style.display = "none";
        break;
        case "answer3Phone_phone4":
            player3Score += 10;
            $(".phoneAnswerScreen")[3].style.display = "none";
        break;
        case "answer4Phone_phone4":
            $(".phoneAnswerScreen")[3].style.display = "none";
        break;
        case "answer5Phone_phone4":
            player4Score += 20;
            $(".phoneAnswerScreen")[3].style.display = "none";
        break;
     }

     answersGiven += 1;

    if(answersGiven == activePhones){
        showResult();
        answersGiven = 0;
    }
    
    scorePlayer1.innerHTML = name1.innerHTML + " : " + player1Score;
    scorePlayer2.innerHTML = name2.innerHTML + " : " + player2Score;
    scorePlayer3.innerHTML = name3.innerHTML + " : " + player3Score;
    scorePlayer4.innerHTML = name4.innerHTML + " : " + player4Score;

}

function showResult(){
    answerScreen.style.display = "none";
    scoreScreen.style.display = "block";
}

function setNewQuestion(){
    chooseCat.style.display = "none"
    startScreen.style.display = "none"
    scoreScreen.style.display = "none"
    questionScreen.style.display = "block"

    if(currentNumber < 10){

        if(questionsAnswersArray[currentNumber].type == "audio"){
            var myAudio = document.createElement('audio');
            myAudio.id = 'questionSource';
            myAudio.controls = true;
            myAudio.autoplay = true;
            document.getElementById('questionScreen').appendChild(myAudio);

            var mySource = document.createElement('source');
            mySource.src = questionsAnswersArray[currentNumber].source;
            mySource.type = "audio/mpeg";
            document.getElementById('questionSource').appendChild(mySource);
            
            var myText = document.createElement('div');
            myText.id = 'questionSourceText';
            myText.innerHTML = questionsAnswersArray[currentNumber].question;
            document.getElementById('questionScreen').appendChild(myText);
        }
        else if(questionsAnswersArray[currentNumber].type == "video"){
            var myVideo = document.createElement('video');
            myVideo.id = 'questionSource';
            myVideo.controls = true;
            myVideo.autoplay = true;
            document.getElementById('questionScreen').appendChild(myVideo);

            var mySource = document.createElement('source');
            mySource.src = questionsAnswersArray[currentNumber].source;
            mySource.type = "video/mp4";
            document.getElementById('questionSource').appendChild(mySource);
            
            var myText = document.createElement('div');
            myText.id = 'questionSourceText';
            myText.innerHTML = questionsAnswersArray[currentNumber].question;
            document.getElementById('questionScreen').appendChild(myText);
        }
        else if(questionsAnswersArray[currentNumber].type == "image"){
            var myImage = document.createElement('img');
            myImage.id = 'questionSource';
            myImage.src = questionsAnswersArray[currentNumber].source;
            document.getElementById('questionScreen').appendChild(myImage);
            
            var myText = document.createElement('div');
            myText.id = 'questionSourceText';
            myText.innerHTML = questionsAnswersArray[currentNumber].question;
            document.getElementById('questionScreen').appendChild(myText);
        }
        else{
            var myText = document.createElement('div');
            myText.id = 'questionSourceText';
            myText.innerHTML = questionsAnswersArray[currentNumber].question;
            document.getElementById('questionScreen').appendChild(myText);
        }

        for (var i = 0; i <= phoneArray.length; i++) {
            if(window["phone" + (i+1) + "Active"] == false){
                $(".phoneIntro")[i].style.display = "none";
            }
            else{
                $(".phoneQuestionScreen")[i].style.display = "block";
            }
        }
    }
    else{
        alert("Game is done!!!!!!!!")
        questionScreen.style.display = "none";
        chooseCat.style.display = "none";
        startScreen.style.display = "block";
        setVars();
        for (var i = 0; i <= phoneArray.length; i++) {
            $(".phoneIntro")[i].style.display = "block";
        }
    }
}


function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function showHide(className ,displayState){
    var elements = document.querySelectorAll(className)

    for (var i = 0; i < elements.length; i++){
        if(window["phone" + (i+1) + "Active"] == true){
            elements[i].style.display = displayState;
        }
    }
}


