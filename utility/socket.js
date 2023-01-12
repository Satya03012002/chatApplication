import {getUsers, users} from "./getUser.js"


const socket = (io)=>{
    io.on('socket-connection', (socket) =>{
        socket.on('joined-user' , (data) =>{

            let user = {};
            user[socket.id] = data.username

            if(users[data.companyname]){
                users[data.companyname].push(user)
            }else{
                users[data.companyname] = [user];
            }

            // joining the company name
            socket.join(data.companyname);

            //emmitting new user to clint

            io.to(data.companyname).emit('joined-user', {username:data.username})

            // send online users array

            io.to(data.companyname).emit('online-users', getUsers(users[data.companyname]))
      })

      //emitting message to the client

      socket.on('chat',(data)=>{
        socket.broadcast.to(data.companyname).emit('typing', data.username)
      })
      
      // removing the memory of the user when it is disconnected

      socket.on('disconnected' , ()=>{
        let rooms = Object.keys(socket.rooms)

        let socketId = rooms[0];
        let companyname = rooms[1]

        users[companyname].array.forEach(user, inddex=> {

            if(user[socketId]){
                users[roomname].splice(index,1)
            }
            
        });

        // send array to users who are online

        io.to(companyname).emit('online-users',getUsers(users[companyname]))
      })

    })
    
}

export default socket;