window.$ = window.jQuery || function(e,t,l){var n={"#":"getElementById",".":"getElementsByClassName","@":"getElementsByName","=":"getElementsByTagName","*":"querySelectorAll"}[e[0]],m=(t===l?document:t)[n](e.slice(1));return m.length<2?m[0]:m};
function shuffle(o){for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);return o;}



document.body.onload = onReady();

function onReady() {

    logoSetup();
    logoAnimation();

    playerCount = 1;

    setupEmptyDesks();

    // newPlayer("Mime", "Wessel")
    // newPlayer("Mime", "Dave")
    // newPlayer("indian", "Youri")
    // newPlayer("Sumo", "Bart")
    // newPlayer("Sumo", "Danilo")
    // newPlayer("Sumo", "Danilo")
    // newPlayer("Sumo", "Danilo")
    // newPlayer("Sumo", "Danilo")

    positionDesks();

    phoneScanAnimation();
}


// ██╗      ██████╗  ██████╗  ██████╗  //
// ██║     ██╔═══██╗██╔════╝ ██╔═══██╗ //
// ██║     ██║   ██║██║  ███╗██║   ██║ //
// ██║     ██║   ██║██║   ██║██║   ██║ //
// ███████╗╚██████╔╝╚██████╔╝╚██████╔╝ //
// ╚══════╝ ╚═════╝  ╚═════╝  ╚═════╝  //


function logoSetup(){
    TweenMax.set($('#logoWrapper'), {scale:0.75} )
    createLights();
}

function logoAnimation(){
    this.callLightBulbs = new TimelineMax({repeat: -1, repeatDelay: 0.15, repeatDelay: 0.00015})
    this.callLightBulbs.call(this.animateLights,null, this);
}

function animateLights(){

    this.colorArray = ["#fff9cf" , "#fffce9"]
    
    var randomN = Math.floor(Math.random() * $('.lightBulb').length);
    TweenMax.set($('.lightBulb')[randomN], {background:this.colorArray[Math.floor(Math.random() * this.colorArray.length)]} )
    TweenMax.set($('.lightBulb')[randomN], {clearProps:'background', delay: 0.1} )

    var randomN = Math.floor(Math.random() * $('.lightBulb').length);
    TweenMax.set($('.lightBulb')[randomN], {background:this.colorArray[Math.floor(Math.random() * this.colorArray.length)]} )
    TweenMax.set($('.lightBulb')[randomN], {clearProps:'background', delay: 0.1} )

    var randomN = Math.floor(Math.random() * $('.lightBulb').length);
    TweenMax.set($('.lightBulb')[randomN], {background:this.colorArray[Math.floor(Math.random() * this.colorArray.length)]} )
    TweenMax.set($('.lightBulb')[randomN], {clearProps:'background', delay: 0.1} )

    var randomN = Math.floor(Math.random() * $('.lightBulb').length);
    TweenMax.set($('.lightBulb')[randomN], {background:this.colorArray[Math.floor(Math.random() * this.colorArray.length)]} )
    TweenMax.set($('.lightBulb')[randomN], {clearProps:'background', delay: 0.1} )

}

function createLights(){
        for (var i = 0; i < 88; i++) {
                this.lightBulb = document.createElement("div");
                this.lightBulb.setAttribute('class', 'lightBulb');
                $('.lightsWrapper').appendChild(this.lightBulb);
                TweenMax.set(this.lightBulb, {x: 15*i, y: 8.1*i} )
                if( i > 21 ){    
                    TweenMax.set(this.lightBulb, {x: (15*43)-15*i, y: (21)+8.1*i} )
                }
                if( i > 43 ){
                    TweenMax.set(this.lightBulb, {x: (15*42)-15*i, y: 728 + (-8.2*i)} )
                }    
                if( i > 65 ){
                    TweenMax.set(this.lightBulb, {x: (-15*24)+(15.2*(i-65)  ), y: 714 + (-8.22*i)} )
                }
        }
}


// ██████╗ ███████╗███████╗██╗  ██╗███████╗ //
// ██╔══██╗██╔════╝██╔════╝██║ ██╔╝██╔════╝ //
// ██║  ██║█████╗  ███████╗█████╔╝ ███████╗ // 
// ██║  ██║██╔══╝  ╚════██║██╔═██╗ ╚════██║ //
// ██████╔╝███████╗███████║██║  ██╗███████║ //
// ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝ //
      
function newPlayer(playerName, playerCount){
    createDesk(playerCount);
    createName(playerName, playerCount);
}

function createName(playerName, playerCount){
    console.log("playercount === " + playerCount);
    $('#desk'+playerCount+'Name').html(playerName);
    $('#desk'+playerCount+'NameBg').html(playerName);
    $('#desk'+playerCount+'Score').html(0);
    TweenMax.set($('#desk'+playerCount+'NameBg'), {x:2, y:-2})

}

function createCharacter(character, playerCount){
//createCharacter
    
    console.log(character);
    console.log(playerCount);
    this["characterDesktopWrapper"+playerCount] = document.createElement('div');
    this["leftArmWrapper"+playerCount] = document.createElement('div');
    this["leftUpperArm"+playerCount] = document.createElement('img');
    this["leftLowerArm"+playerCount] = document.createElement('img');
    this["rightArmWrapper"+playerCount] = document.createElement('div');
    this["rightUpperArm"+playerCount] = document.createElement('img');
    this["rightLowerArm"+playerCount] = document.createElement('img');
    this["body"+playerCount] = document.createElement('img');
    this["headWrapper"+playerCount] = document.createElement('div');
    this["face"+playerCount] = document.createElement('img');
    this["hair"+playerCount] = document.createElement('img');
    
    this["characterDesktopWrapper"+playerCount].className = 'characterDesktopWrapper';
    this["leftArmWrapper"+playerCount].className = 'leftArmWrapper';
    this["leftUpperArm"+playerCount].className = 'leftUpperArm';
    this["leftLowerArm"+playerCount].className = 'leftLowerArm';
    this["rightArmWrapper"+playerCount].className = 'rightArmWrapper';
    this["rightUpperArm"+playerCount].className = 'rightUpperArm';
    this["rightLowerArm"+playerCount].className = 'rightLowerArm';
    this["body"+playerCount].className = 'body';
    this["headWrapper"+playerCount].className = 'headWrapper';
    this["face"+playerCount].className = 'face';
    this["hair"+playerCount].className = 'hair';

    $("#desk"+playerCount+"Wrapper").append(this["characterDesktopWrapper"+playerCount]);
    $(".characterDesktopWrapper")[playerCount-1].append(this["leftArmWrapper"+playerCount]);
    $(".leftArmWrapper")[playerCount-1].append(this["leftUpperArm"+playerCount]);
    $(".leftArmWrapper")[playerCount-1].append(this["leftLowerArm"+playerCount]);
    $(".characterDesktopWrapper")[playerCount-1].append(this["rightArmWrapper"+playerCount]);
    $(".rightArmWrapper")[playerCount-1].append(this["rightUpperArm"+playerCount]);
    $(".rightArmWrapper")[playerCount-1].append(this["rightLowerArm"+playerCount]);
    $(".characterDesktopWrapper")[playerCount-1].append(this["body"+playerCount]);
    $(".characterDesktopWrapper")[playerCount-1].append(this["headWrapper"+playerCount]);
    $(".headWrapper")[playerCount-1].append(this["face"+playerCount]);
    $(".headWrapper")[playerCount-1].append(this["hair"+playerCount]);

//fillCharacter
    $(".hair")[playerCount-1].src="img/character"+character+"/hair.png";
    $(".face")[playerCount-1].src="img/character"+character+"/face.png";
    $(".body")[playerCount-1].src="img/character"+character+"/body.png";
    $(".rightUpperArm")[playerCount-1].src="img/character"+character+"/rightUpperArm.png";
    $(".rightLowerArm")[playerCount-1].src="img/character"+character+"/rightLowerArm.png";
    $(".leftUpperArm")[playerCount-1].src="img/character"+character+"/leftUpperArm.png";
    $(".leftLowerArm")[playerCount-1].src="img/character"+character+"/leftLowerArm.png";

    TweenMax.set($('.characterDesktopWrapper'), {scale:0.6})

}

function setupEmptyDesks(){

for (var i = 1; i < 5; i++) {
    this["deskWrapper" + i] = document.createElement("div");
    this["deskWrapper" + i].setAttribute('id', 'desk'+i+'Wrapper');
    this["deskWrapper" + i].setAttribute('class', 'deskWrapper');
    $('#deskContainer').appendChild(this["deskWrapper" + i]);

//fillDeskWrapper
    this.silhouette = document.createElement("img");
    this.silhouette.setAttribute('class', 'silhouette');
    this.silhouette.setAttribute('id', 'silhouette'+i);
    this.silhouette.src="img/silhouette.png";
    this["deskWrapper" + i].appendChild(this.silhouette);

    this.desk = document.createElement("img");
    this.desk.setAttribute('class', 'deskIntro');
    this.desk.src="img/desk.png";
    this["deskWrapper" + i].appendChild(this.desk);

    this.deskScore = document.createElement("div");
    this.deskScore.setAttribute('class', 'deskScore');
    this.deskScore.setAttribute('id', 'desk'+i+'Score');
    this["deskWrapper" + i].appendChild(this.deskScore);
}


    
}

function createDesk(playerCount){
//createDesk
    if(playerCount <5){
        // 'silhouette'+playerCount;
        // silhouette[playerCount].src="";
        $(".silhouette")[playerCount-1].src = "img/1x1.png";
    }
    else{
        this["deskWrapper" + playerCount] = document.createElement("div");
        this["deskWrapper" + playerCount].setAttribute('id', 'desk'+playerCount+'Wrapper');
        this["deskWrapper" + playerCount].setAttribute('class', 'deskWrapper');
        $('#deskContainer').appendChild(this["deskWrapper" + playerCount]);

        this.desk = document.createElement("img");
        this.desk.setAttribute('class', 'desk');
        this.desk.src="img/desk.png";
        this["deskWrapper" + playerCount].appendChild(this.desk);

        this.deskScore = document.createElement("div");
        this.deskScore.setAttribute('class', 'deskScore');
        this.deskScore.setAttribute('id', 'desk'+playerCount+'Score');
        this["deskWrapper" + playerCount].appendChild(this.deskScore);
    }




//fillDeskWrapper
    // this.silhouette = document.createElement("img");
    // this.silhouette.setAttribute('class', 'silhouette');
    // this.silhouette.setAttribute('id', 'silhouette'+playerCount);
    // this.silhouette.src="";
    // this["deskWrapper" + playerCount].appendChild(this.silhouette);


    this["deskNameWrapper" + playerCount] = document.createElement("div");
    this["deskNameWrapper" + playerCount].setAttribute('id', 'deskName'+playerCount+'Wrapper');
    this["deskNameWrapper" + playerCount].setAttribute('class', 'deskNameWrapper');
    this["deskWrapper" + playerCount].appendChild(this["deskNameWrapper"+playerCount]);

    this.deskNameBg = document.createElement("div");
    this.deskNameBg.setAttribute('id', 'desk'+playerCount+'NameBg');
    this.deskNameBg.setAttribute('class', 'deskNameBg');
    this["deskNameWrapper"+playerCount].appendChild(this.deskNameBg);    

    this.deskName = document.createElement("div");
    this.deskName.setAttribute('class', 'deskName');
    this.deskName.setAttribute('id', 'desk'+playerCount+'Name');
    this["deskNameWrapper"+playerCount].appendChild(this.deskName);    
}


function positionDesks(){
    var deskCount = playerCount;

    if(playerCount <= 4){
        deskCount = 4;
    }

    // deskCount = deskCount-1;
    charSpacing = window.innerWidth - (185*deskCount);
    charLeft = charSpacing/deskCount;
    charPadding = (charLeft/2)-1;

    for (var i = 0; i < deskCount; i++) {
        TweenMax.set($(".deskWrapper"), {marginLeft:charPadding, marginRight:charPadding})
    }


}



//  █████╗ ███╗   ██╗██╗███╗   ███╗ █████╗ ████████╗██╗ ██████╗ ███╗   ██╗███████╗ //
// ██╔══██╗████╗  ██║██║████╗ ████║██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝ //
// ███████║██╔██╗ ██║██║██╔████╔██║███████║   ██║   ██║██║   ██║██╔██╗ ██║███████╗ //
// ██╔══██║██║╚██╗██║██║██║╚██╔╝██║██╔══██║   ██║   ██║██║   ██║██║╚██╗██║╚════██║ //
// ██║  ██║██║ ╚████║██║██║ ╚═╝ ██║██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║███████║ //
// ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝ //
                                                                               


function phoneScanAnimation(){
    this.phoneScanTL = new TimelineMax({repeat:5, repeatDelay:3})
    this.phoneScanTL.add('phoneAnimation')
    .fromTo($('.phone'), 0.5, {opacity:0, ease: Power1.easeInOut}, {opacity:1, ease: Power1.easeInOut}, 'phoneAnimation')
    .to($('.phoneScan'), 1,{y:181, ease: Power1.easeInOut, repeat:4, yoyo:true}, 'phoneAnimation+=0.5')
    .fromTo($('.phone'), 0.5, {opacity:1, ease: Power1.easeInOut}, {opacity:0, ease: Power1.easeInOut}, 'phoneAnimation+=6')
}