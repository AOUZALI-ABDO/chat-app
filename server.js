/*const express = require("express");
const http = require("http");
const { Server } = require("socket.io"); // const Server = require("socket.io").Server;
const mongoose = require("mongoose");



const app = express();
const server = http.createServer(app);
const io = new Server(server);


mongoose.connect("mongodb://127.0.0.1:27017/chatapp")
.then(()=> console.log("MongoDB connected"));

app.use(express.static("public"));
const User = require("./models/User");

app.use(express.json());

io.on("connection", socket => {
    console.log("User connected");

    socket.on("sendMessage", data => {
        io.emit("receiveMessage", data);
    });
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////
/////////            test de code 2 est bien march  
/////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

mongoose.connect("mongodb://127.0.0.1:27017/chatapp")
.then(()=> console.log("MongoDB connected"));

app.use(express.json());
app.use(express.static("public"));

app.post("/register", async (req,res)=>{
    const {username,password,role} = req.body;
    await User.create({username,password,role});
    res.send("ok");
});

app.post("/login", async (req,res)=>{
    const {username,password} = req.body;
    const user = await User.findOne({username,password});
    if(!user) return res.send("error");
    res.json(user);
});

io.on("connection", socket => {
    socket.on("sendMessage", data => {
        io.emit("receiveMessage", data);
    });
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////
/////////            test de code 3
/////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const path = require("path");

const User = require("./models/User");
const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/chatapp")
.then(()=> console.log("MongoDB connected"))
.catch(err => console.log(err));

// Middlewares
app.use(express.json());
app.use(express.static("public"));

/* ---------- PAGES ---------- */

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"));
});

app.get("/login", (req,res)=>{
    res.sendFile(path.join(__dirname,"public","login.html"));
});

app.get("/register", (req,res)=>{
    res.sendFile(path.join(__dirname,"public","register.html"));
});

app.get("/chat", (req,res)=>{
    res.sendFile(path.join(__dirname,"public","chat.html"));
});

app.get("/admin", (req,res)=>{
    res.sendFile(path.join(__dirname,"public","admin.html"));
});

/* ---------- AUTH ---------- */

app.post("/register", async (req,res)=>{
    const { username, password, role } = req.body;
    try {
        await User.create({ username, password, role });
        res.send("ok");
    } catch(err){
        res.status(500).send("error");
    }
});

app.post("/login", async (req,res)=>{
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if(!user) return res.send("error");
    res.json(user);
});

/* ---------- CHAT ---------- */

io.on("connection", async socket => {
    console.log("User connected");

    const messages = await Message.find().sort({time:1});
    socket.emit("loadMessages", messages);

    socket.on("sendMessage", async data => {
        const msg = await Message.create(data);
        io.emit("receiveMessage", msg);
    });
});

/* ---------- START ---------- */

server.listen(3000, ()=>{
    console.log("Server running on http://localhost:3000");
});
