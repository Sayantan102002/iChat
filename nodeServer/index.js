const io = require("socket.io")(8000, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
const users={};
// app.use(cors);
io.on('connection',socket=>{
    socket.on('new-user-joined',name2=>{
        users[socket.id]=name2;
        console.log("User joined",name2);
        socket.broadcast.emit('user-joined',name2);
    });
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name2:users[socket.id]});
    });
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
});