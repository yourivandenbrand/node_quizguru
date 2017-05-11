window.$ = window.jQuery || function(e,t,l){var n={"#":"getElementById",".":"getElementsByClassName","@":"getElementsByName","=":"getElementsByTagName","*":"querySelectorAll"}[e[0]],m=(t===l?document:t)[n](e.slice(1));return m.length<2?m[0]:m};
function shuffle(o){for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);return o;}

var socket = io();

checkSize();

//SERVER
$(".screen").hide();
$("#host").hide();
$("#player").hide();
$("#roomError").hide();
$("#btnStartGame").hide();
$("#mobileCharacterScreen").hide();



//Listeners
$("#btnJoinGame").click(joinGame);
$("#btnTitleCreateGame").click(createGame);
$("#btnTitleStartGame").click(startGame);
$("#btnTitleJoinGame").click(titleJoinGame);
$("#btnCreateCharacter").click(createCharacter);
$("#btnCreateCharacter").click(createCharacter);

// $(".CCarrowRight").addEventListener("click", this.rightArrowClick.bind(this));
// $(".CCarrowLeft").addEventListener("click", this.leftArrowClick.bind(this));

//CREATE GAME
function createGame(){
    $("#hscreenTitle").hide();
    $("#host").show();
    $("#hscreenLogin").show();
    socket.emit('createGame');
}

//START GAME
function startGame(){
    
}

function checkSize(){

    var screenHeight = window.innerHeight;
    var screenWidth = window.innerWidth;
    var gameHeight = playerScreen.offsetHeight; 

    var totalScreen = screenHeight/gameHeight;

    TweenMax.set(playerScreen, {scale:totalScreen, transformOrigin: "0px 0px"})
    TweenMax.set(playerScreenWrapper, {height:playerScreen.offsetHeight*totalScreen, width:playerScreen.offsetWidth*totalScreen})
    TweenMax.set(blackOverlay, {display:"none"})
}

function joinGameAnimation(){
    $("#mobileIntroScreen").hide();
    $("#mobileCharacterScreen").show();
    characterSetup();
    characterAnimation();
}

function characterSetup(){
    arrowLeft.addEventListener("click", navLeftClick);
    arrowRight.addEventListener("click", navRigthClick);

    currentCharacter = ['Indian', "Sumo", "Mime"];
    mobileClickAllowed = true;
    currentCarNumber = 0;

    TweenMax.set([allChars, deskWrapper], {width: currentCharacter.length*900})
    TweenMax.set(arrowLeft, {display:"none"})

    for (var i= 0; i <currentCharacter.length; i++) {

        this["characterWrapper" + i] = document.createElement('div');
        this["leftArmWrapper"+ i] = document.createElement('div');
        this["leftUpperArm" +i] = document.createElement('img');
        this["leftLowerArm" +i] = document.createElement('img');
        this["rightArmWrapper" +i] = document.createElement('div');
        this["rightUpperArm" +i] = document.createElement('img');
        this["rightLowerArm" +i] = document.createElement('img');
        this["body" +i] = document.createElement('img');
        this["headWrapper" +i] = document.createElement('div');
        this["face" +i] = document.createElement('img');
        this["hair" +i] = document.createElement('img');
        this["desk" +i] = document.createElement('img');
        
        this["characterWrapper"+i].className = 'characterWrapper';
        this["leftArmWrapper"+i].className = 'leftArmWrapper';
        this["leftUpperArm"+i].className = 'leftUpperArm';
        this["leftLowerArm"+i].className = 'leftLowerArm';
        this["rightArmWrapper"+i].className = 'rightArmWrapper';
        this["rightUpperArm"+i].className = 'rightUpperArm';
        this["rightLowerArm"+i].className = 'rightLowerArm';
        this["body"+i].className = 'body';
        this["headWrapper"+i].className = 'headWrapper';
        this["face"+i].className = 'face';
        this["hair"+i].className = 'hair';
        this["desk"+i].className = 'desk';
        
        allChars.appendChild(this["characterWrapper"+i]);
        $(".characterWrapper")[i].appendChild(this["leftArmWrapper"+i]);
        $(".leftArmWrapper")[i].appendChild(this["leftUpperArm"+i]);
        $(".leftArmWrapper")[i].appendChild(this["leftLowerArm"+i]);
        $(".characterWrapper")[i].appendChild(this["rightArmWrapper"+i]);
        $(".rightArmWrapper")[i].appendChild(this["rightUpperArm"+i]);
        $(".rightArmWrapper")[i].appendChild(this["rightLowerArm"+i]);
        $(".characterWrapper")[i].appendChild(this["body"+i]);
        $(".characterWrapper")[i].appendChild(this["headWrapper"+i]);
        $(".headWrapper")[i].appendChild(this["face"+i]);
        $(".headWrapper")[i].appendChild(this["hair"+i]);
        deskWrapper.appendChild(this["desk"+i]);

        $(".hair")[i].src="img/character"+currentCharacter[i]+"/hair.png"
        $(".face")[i].src="img/character"+currentCharacter[i]+"/face.png"
        $(".body")[i].src="img/character"+currentCharacter[i]+"/body.png"
        $(".rightUpperArm")[i].src="img/character"+currentCharacter[i]+"/rightUpperArm.png"
        $(".rightLowerArm")[i].src="img/character"+currentCharacter[i]+"/rightLowerArm.png"
        $(".leftUpperArm")[i].src="img/character"+currentCharacter[i]+"/leftUpperArm.png"
        $(".leftLowerArm")[i].src="img/character"+currentCharacter[i]+"/leftLowerArm.png"
        $(".desk")[i].src="img/mobile/desk.png";
    }

}
function navLeftClick(){
    if(mobileClickAllowed){
        mobileClickAllowed = false;
        stopCharacterAnimation();
        TweenMax.to([allChars, deskWrapper], 0.7,{x:"+=880", ease:Elastic.easeOut.config(0.65, 0.45), onComplete:function(){characterAnimation();}});
        currentCarNumber -=1;

        if (currentCarNumber == 0) {
            TweenMax.set(arrowLeft, {display:"none"})
        }
        else{
            TweenMax.set(arrowRight, {display:"block"})
        }
    }
}

function navRigthClick(){
    if(mobileClickAllowed){
        mobileClickAllowed = false;
        stopCharacterAnimation();
        TweenMax.to([allChars, deskWrapper], 0.7,{x:"-=880", ease:Elastic.easeOut.config(0.65, 0.45), onComplete:function(){characterAnimation();}});
        currentCarNumber +=1;

        if (currentCarNumber == currentCharacter.length-1) {
            TweenMax.set(arrowRight, {display:"none"})
        }
        else{
            TweenMax.set(arrowLeft, {display:"block"})
        } 
    }
}

function characterAnimation(){
    mobileClickAllowed = true;
    var animationNumber = getRandom(1, 4);
    this.characterAnimationCelebrationTL = this["createCelebration"+ animationNumber + "Tl"]();
}

function stopCharacterAnimation(){
    this.characterAnimationCelebrationTL.progress(0).pause();
    TweenMax.set([$(".characterWrapper"), $(".headWrapper"), $(".rightArmWrapper"), $(".rightLowerArm"), $(".leftArmWrapper"), $(".leftLowerArm")], {clearProps: "all"});
}

function createCelebration1Tl(char){
    var tl = new TimelineMax({repeat:1, yoyo:true});
        tl.add("start")

        .to($(".characterWrapper"), 0.52,{y:-20, ease:Power1.easeInOut, repeat:4, yoyo:true}, "start")
        .fromTo($(".characterWrapper"),0.9,{x:10},{x:-10, ease:Power1.easeInOut, repeat:2, yoyo:true}, "start")
        .to($(".headWrapper"), 0.4,{y:-3, x:-3, ease:Power1.easeInOut, repeat:4, yoyo:true}, "start")
    
        .to($(".rightArmWrapper"), 1,{rotation:-100, ease:Power1.easeInOut}, "start")
        .to($(".rightLowerArm"), 1,{rotation:-120, y:0, x: 0, ease:Power1.easeInOut}, "start+=0.5")
        .to($(".rightLowerArm"), 1,{rotation:-70, y:0, x: 0, ease:Power1.easeInOut}, "start+=1.7")

        .to($(".leftArmWrapper"), 1,{rotation:100, ease:Power1.easeInOut}, "start")
        .to($(".leftLowerArm"), 1,{rotation:120, y:0, x: 0, ease:Power1.easeInOut}, "start+=0.5")
        .to($(".leftLowerArm"), 1,{rotation:70, y:0, x: 0, ease:Power1.easeInOut}, "start+=1.7")
        return tl;
}

function createCelebration2Tl(char){
    var tl = new TimelineMax({repeat:0, yoyo:true});
        tl.add("start")
    
        .to($(".rightArmWrapper"), 1,{rotation:-80, ease:Power1.easeInOut}, "start")
        .to($(".rightArmWrapper"), 1,{zIndex:1, ease:Power1.easeInOut}, "start+=0.3")
        .to($(".rightLowerArm"), 1,{rotation:-120, ease:Power1.easeInOut}, "start+=0.5")
        .to($(".rightArmWrapper"), 0.5,{rotationX:180, ease:Power1.easeInOut}, "start+=1")
        .to($(".rightArmWrapper"), 0.5,{rotation:-70, ease:Power1.easeInOut}, "start+=1")
        .to($(".rightLowerArm"), 0.6,{rotation:-0, ease:Power1.easeInOut}, "start+=1.5")
        .to($(".leftArmWrapper"), 0.6,{rotation:120, ease:Power1.easeInOut}, "start+=1.5")
        .to($(".characterWrapper"), 0.6,{rotation:-10, ease:Power1.easeInOut}, "start+=1.5")

        .to($(".rightLowerArm"), 0.6,{rotation:-360, ease:Power1.easeInOut}, "start+=2.5")
        .to($(".leftLowerArm"), 0.6,{rotation:360, ease:Power1.easeInOut}, "start+=2.5")
        .to($(".rightArmWrapper"), 0.5,{rotationX:180, rotation: 70, zIndex:0, ease:Power1.easeInOut}, "start+=3.5")
        .to($(".characterWrapper"), 0.6,{rotation:10, ease:Power1.easeInOut}, "start+=2.5")
        
        .to([$(".characterWrapper"), $(".rightArmWrapper"), $(".leftArmWrapper")], 0.6,{rotation:0, ease:Power1.easeInOut}, "start+=4")
        .to($(".leftArmWrapper"), 0.6,{rotation:0, ease:Power1.easeInOut}, "start+=4")
        .to($(".rightArmWrapper"), 0.6,{rotation:180, ease:Power1.easeInOut}, "start+=4")
        .to($(".rightArmWrapper"), 0,{rotationY:180, ease:Power1.easeInOut},  "start+=3.5")

        return tl;
}

function createCelebration3Tl(char){
    var tl = new TimelineMax({repeat:0, yoyo:true});
        tl.add("start")
    
        .to($(".rightArmWrapper"), 1,{rotation:-90, ease:Power1.easeOut}, "start")
        .to($(".leftArmWrapper"), 1,{rotation:90, ease:Power1.easeOut}, "start")
        .to($(".leftArmWrapper"), 1,{rotation:100, ease:Power0.easeOut}, "start+=1")
        .to($(".rightArmWrapper"), 1,{rotation:-100, ease:Power0.easeOut}, "start+=1")
        .to($(".leftLowerArm"), 0.3,{rotation:-50, ease:Power0.easeOut}, "start+=1.0")
        .to($(".characterWrapper"), 0.3,{rotation:-10, ease:Power0.easeOut}, "start+=1.0")
        .to($(".headWrapper"), 0.3,{rotation:10, ease:Power0.easeOut}, "start+=1.0")
        .to($(".leftLowerArm"), 0.3,{rotation:50, ease:Power0.easeOut}, "start+=1.2")
        .to($(".leftArmWrapper"), 0.3,{rotation:80, ease:Power0.easeOut}, "start+=1.2")
        .to($(".leftLowerArm"), 0.3,{rotation:70, ease:Power0.easeOut}, "start+=1.5")
        .to($(".leftArmWrapper"), 0.3,{rotation:130, ease:Power0.easeOut}, "start+=1.6")
        .to($(".characterWrapper"), 0.3,{rotation:0, ease:Power0.easeOut}, "start+=1.6")
        .to($(".headWrapper"), 0.3,{rotation:0, ease:Power0.easeOut}, "start+=1.6")
        .to($(".leftArmWrapper"), 0.3,{rotation:90, ease:Power0.easeOut}, "start+=2.1")
        .to($(".leftLowerArm"), 0.3,{rotation:0, ease:Power0.easeOut}, "start+=1.9")
        .to($(".leftLowerArm"), 1,{rotation:-30, ease:Power0.easeOut}, "start+=2.2")
        .to($(".characterWrapper"), 0.3,{rotation:10, ease:Power0.easeOut}, "start+=1.9")
        .to($(".headWrapper"), 0.3,{rotation:-10, ease:Power0.easeOut}, "start+=2.0")

        .to($(".rightArmWrapper"), 1,{rotation:-120, ease:Power0.easeOut}, "start+=2.1")
        .to($(".rightLowerArm"), 0.3,{rotation:30, ease:Power0.easeOut}, "start+=2.1")
        .to($(".rightLowerArm"), 0.3,{rotation:-30, ease:Power0.easeOut}, "start+=2.3")
        .to($(".rightArmWrapper"), 1,{rotation:-90, ease:Power0.easeOut}, "start+=2.4")

        .to($(".rightLowerArm"), 0.3,{rotation:10, ease:Power0.easeOut}, "start+=2.8")
        .to($(".characterWrapper"), 0.3,{rotation:0, ease:Power0.easeOut}, "start+=3.3")
        .to($(".headWrapper"), 0.3,{rotation:0, ease:Power0.easeOut}, "start+=3.3")
        .to($(".leftArmWrapper"), 0.3,{rotation:0, ease:Power0.easeOut}, "start+=3.3")
        .to($(".rightArmWrapper"), 0.3,{rotation:0, ease:Power0.easeOut}, "start+=3.3")
        return tl;
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}







































socket.on('sendRoom', function(data){
    var host = data["host"];
    var room = data["room"];

    $("#roomID").html(room);  
    console.log(room);
});

socket.on('fillCharacters', function(data){
    console.log("FILL CHARACTERS " + data.length);
    for(var i = 0; i < data.length; i++){
        $("#character").append("<img class='characters' src='../img/characters/" + data[i] + "'>");
    }
})

//JOIN GAME
function titleJoinGame(){
    $("#hscreenTitle").hide();
    $("#player").show();
    $("#plscreenLogin").show();
}

function joinGame(){
    joinGameAnimation();

    var room = document.getElementById('inputRoomId').value;
    var name = document.getElementById('inputName').value;

    socket.emit('playerJoinGame', {
        room,
        name
    });
    
    $("#plscreenCharacterCreation").append("<div>"+name+"</div>");
}

socket.on('hostPlayerReadyUpdate', function(data){
    console.log("hostPlayerReadyUpdate");
    $("#btnStartGame").show(); 
    if(data.length < 2){
        $("#btnStartGame").hide();
    }
    for(i = 0; i < data.length; i++){
        if(data[i].ready == false){
            $("#btnStartGame").hide();
        }
    }
});

socket.on('hostJoinPlayerUpdate', function(data){
    $("#players").append("<div name='" + data[data.length - 1].name + "'>" + data[data.length - 1].name + "</div>");
});

socket.on('hostDisconnectPlayerUpdate', function(data){
    var childrenArray = $("#players").children().toArray();

    for(i = 0; i < childrenArray.length; i++){
        if(data == $(childrenArray[i]).attr("name")){
            childrenArray[i].remove();
        }
    }
});

socket.on('playerUpdate', function(data){
    $("#plscreenLogin").hide();
    $("#plscreenCharacterCreation").show();
});

socket.on('roomError', function(data) {
    $("#roomError").html("ERROR!! Room " + data.room + " doesn't exist!");
    $("#roomError").show();
    $("#plscreenLogin").show();
    $("#plscreenCharacterCreation").hide();
});

socket.on('connect', function() {
    console.log("CONNECTED")
});

socket.on('disconnect', function() {
    console.log("DISCONNECTED")
});

socket.on('setReadyPlayer', function(data){
    $("#players").children('div').each(function(){
        if(this.innerHTML == data){
            this.innerHTML = this.innerHTML + " READY!";
        }

    $("#plscreenWait").show();
    
    console.log($("#players").length);
    // for(var i = 0; i < $("#players").length; i++ ){

    // }

})})

socket.on('receiveHostID', function(data){
    console.log("RECEIVED HOST ID");
    console.log(data.hostID);
    hostID = data.hostID;
})


socket.on('enableStartGame', function(data){
    $("#btnStartGame").show();
})

function createCharacter(){    
    $("#plscreenCharacterCreation").hide();

    socket.emit('createCharacter', {
        headID: 0,
        bodyID: 0
    });
}

function rightArrowClick(){
    var current = "god" + this.slideShowing;

    if (this.slideShowing >= this.numberofCharacters) {
        this.slideShowing = 0;
    }

    var next = "god" + (this.slideShowing + 1);
    var currentDiv = document.getElementById(current);
    var nextDiv = document.getElementById(next);
    var character = nextDiv.getElementsByClassName("character");

    TweenMax.fromTo(currentDiv, this.bgTime, { x: 0 }, { x: -this.bannerWidth, ease: this.easeBg })
    TweenMax.fromTo(nextDiv, this.bgTime, { x: this.bannerWidth }, { x: 0, ease: this.easeBg })
    TweenMax.fromTo(character, this.charTime, { x: this.bannerWidth/4, opacity: 0}, { x: 0, opacity: 1, ease: Power4.easeOut, delay: 0.2 })

    this.slideShowing++;
}

function leftArrowClick(){
    var current = "god" + this.slideShowing;

    if (this.slideShowing <= 1) {
        this.slideShowing = 6;
    }

    var previous = "god" + (this.slideShowing - 1);
    var currentDiv = document.getElementById(current);
    var previousDiv = document.getElementById(previous);
    var character = previousDiv.getElementsByClassName("character");

    TweenMax.fromTo(currentDiv, this.bgTime, { x: 0 }, { x: this.bannerWidth, ease: this.easeBg })
    TweenMax.fromTo(previousDiv, this.bgTime, { x: -this.bannerWidth }, { x: 0, ease: this.easeBg })
    TweenMax.fromTo(character, this.charTime, { x: -this.bannerWidth/4, opacity: 0}, { x: 0, opacity: 1, ease: Power4.easeOut, delay: 0.2 })

    this.slideShowing--;
}

