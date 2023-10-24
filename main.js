const socket = io();

socket.on('user connected', function(username) {
    const li = document.createElement('li');
    li.innerHTML = `<em>${username} se ha unido al chat</em>`;
    document.querySelector('#messages').appendChild(li);
});

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.querySelector('#message');
    socket.emit('chat message', input.value);
    input.value = '';
    return false;
});

socket.on('chat message', function(msg) {
    const li = document.createElement('li');
    li.innerHTML = msg;
    document.querySelector('#messages').appendChild(li);
});
