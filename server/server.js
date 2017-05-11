
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const fs = require('fs');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


if(!players)var players = [];
if(!roomlist)var roomlist = [];
var characters = [];

server.listen(port, () => {
    console.log(`Server is up on ${port}`)
});

fs.readdir("./public/img/characters", function(err,files){
    if(err){
        return console.error(err);
    }
    files.forEach(function(file){
        characters.push(file);
    });

})

app.use(express.static(publicPath));

io.on('connection', function(socket){



    // HOST FUNCTIONS
    socket.on('createGame', function() { 

        //GENERATE UNIQUE GAME ID
    	var room = createGameId();

        checkRoomExists(room);

    	var obj = {
            host: socket.id,
            room: room
        };

        players.push(obj);

        //JOIN CREATED GAME
        socket.join(obj.room);

        //EMIT ROOM NUMBER + HOST ID TO HOST
        io.to(obj.host).emit("sendRoom", obj);

        console.log("Room " + obj.room + " created, with hostID " + obj.host)
    });



    // PLAYER FUNCTIONS
    socket.on('playerJoinGame', function(data) {
        io.to(socket.id).emit('fillCharacters', characters); 
        var roomExists = false;
        console.log(players.length);
        for(var i = 0; i < players.length; i++){
            console.log(data.room);
            console.log(players[i].room);
            if(data.room == players[i].room){
                roomExists = true;
            }
        }
        console.log(roomExists);
        if(roomExists){
            var player = {
                hostid: Object.keys(io.sockets.adapter.rooms[data.room].sockets)[0],
                name: data.name,
                room: data.room,
                socketid: socket.id,
                ready: false
            };
            
            //PLAYER JOIN ROOM
            socket.join(player.room);
            //PUT PLAYER IN PLAYERS LIST
            players.push(player);
            
            //EMIT PLAYER TO HOST
            io.to(player.hostid).emit('hostJoinPlayerUpdate', getPlayersInRoom(players, player.room)); 
            io.to(player.socketid).emit('playerUpdate', player); 
        }else{
            io.to(socket.id).emit('roomError', data);    
        }
    });

    socket.on('createCharacter', function(data) {
        var player = findPlayerById(socket);
        player.ready = true;
        var allPlayersInRoom = getPlayersInRoom(players, player.room);
       
        var playerNumberInRoom = allPlayersInRoom.indexOf(player.socketid);

        io.to(player.hostid).emit('setReadyPlayer', player.name);
        io.to(player.hostid).emit('hostPlayerReadyUpdate', getPlayersInRoom(players, player.room)); 

        
    });

    
    socket.on('disconnect', function(){
        if(players != ""){
            var player;
            for(var i = 0; i < players.length; i++){
                if(socket.id === players[i].socketid){
                    console.log("DISCONNECTED PLAYER " + socket.id + " FROM HOSTID " + players[i].hostid);
                    var tempPlayerHostId = players[i].hostid;
                    var tempPlayerName = players[i].name;
                    var tempPlayerRoom = players[i].room;
                    players.splice(i, 1);     
                    io.to(tempPlayerHostId).emit('hostDisconnectPlayerUpdate', tempPlayerName); 
                    io.to(tempPlayerHostId).emit('hostPlayerReadyUpdate', getPlayersInRoom(players, tempPlayerRoom)); 

                }
            }
        }
    })

})

function findPlayerById(socket){
    var player;
    for(var i = 0; i < players.length; i++){
        if(socket.id == players[i].socketid){
            player = players[i];
        }
    }
    console.log(player);
    return player;
}

function getPlayersInRoom(players, roomID){
    var playersInRoom = [];
    for(var i = 0; i < players.length; i++){
        if(players[i].room === roomID){
            console.log("PLAYERS IN PLAYER ROOM = " + players[i].name);
            playersInRoom.push(players[i])
        }
    }
    return playersInRoom;
}

function createGameId(){
    var roomID = Math.floor(1000 + Math.random() * 9000);
    var roomIDString = roomID.toString();
    return roomID;
};

function checkRoomExists(room){
    for(i = 0; i < roomlist.length; i++){
        if(room == roomlist[i]){
            room = createGameId();
            checkRoomExists(room);
        }else{
            roomlist.push(room); 
        }    
    }
}