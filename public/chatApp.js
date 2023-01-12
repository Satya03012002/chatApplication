const output_msg = document.getElementById('output__msg')
const feedback_msg = document.getElementById('feedback__msg')
const  send_msg = document.getElementById('send')
const message = document.getElementById('message')

const text_msg = document.querySelector('.text__message');
const users= document.querySelector('.users');

const socket = io.connect('http://localhost:8000');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username');
const companyname = urlParams.get('companyname');

text_msg.innerHTML = `${companyname} is now connected`;

socket.emit('joined-user',{ // 
    username :username,
    companyname:companyname
})

send_msg.addEventListener('click',()=>{ //sending data
    socket.emit('chat',{
        username:username,
        message :message.value,
        companyname:companyname
    })
    message.value =''
})

message.addEventListener('keypress',()=>{ //sending username if user is typing
    socket.emit('typing',{username:username,companyname:companyname })
})
socket.on('typing',(user) =>{
    feedback_msg.innerHTML = user +' is typing...'
})

socket.on('joined-newuser',(data)=>{
    output_msg.innerHTML += data.username +'has joined this chat'
})

socket.on('chat_msg',(data)=>{ // display the message
    output_msg.innerHTML += data.username;
    feedback_msg.innerHTML = '';
    document.querySelector('.chat-message').scrollTop = document.querySelector('.chat-message').scrollHeight
})

socket.on('current_online_user',(data)=>{
    users.innerHTML = ''
    data.array.forEach(element => {

        users.innerHTML += `<p>${element}</p>`
    });

})