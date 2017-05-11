var socket = io();

//SERVER
$(".screen").hide();
$("#host").hide();
$("#player").hide();
$("#roomError").hide();
$("#btnStartGame").hide();


//Listeners
$("#btnJoinGame").click(joinGame);
$("#btnTitleCreateGame").click(createGame);
$("#btnTitleStartGame").click(startGame);
$("#btnTitleJoinGame").click(titleJoinGame);
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

