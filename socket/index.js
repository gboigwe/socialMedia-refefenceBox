const io = require("socket.io")(8800, {
  cors : {
    origin: "https://localhost:3000"
  }
})

let activeUsers = []

io.on("connection", (socket)=> {
  // add new user
  socket.on("new-user-add", (newUserId)=>{
    // if user is not added previously
    if(!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id
      })
      console.log("Users Connected", activeUsers);
    }
    io.emit("get-users", activeUsers)
  })

  // send message
  socket.on("send-message", (data) => {
    const {receiverId} = data;
    const user = activeUsers.find((user)=> user.Id === receiverId)
    console.log("Socket sending message: ", receiverId);
    console.log("Data", data);
    if(user) {
      io.to(user.socketId).emit("receive-message", data)
    }
    // io.emit('get-users', receiverId)
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user)=>user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    io.emit('get-users', activeUsers)
  });
});