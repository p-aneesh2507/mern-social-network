const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

require("dotenv").config();

const connectDB = require("./config/db");
connectDB();

const app = express();

// =====================
// Middleware
// =====================

app.use(cors());

app.use(express.json());

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

// =====================
// Routes
// =====================

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const userRoutes = require("./routes/userRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/messages", messageRoutes);

// =====================
// Test Route
// =====================

app.get("/", (req, res) => {
    res.send("MERN Social Media API Running");
});

// =====================
// Create HTTP Server
// =====================

const server = http.createServer(app);

// =====================
// Socket.io
// =====================

const {
    addUser,
    removeUser
} = require("./socket");

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "https://socialconnect-flax.vercel.app"
        ],
        methods: ["GET", "POST"],
        credentials: true
    }
});

global.io = io;

io.on("connection", (socket) => {

    console.log("User Connected:", socket.id);

    socket.on("addUser", (userId) => {

        addUser(userId, socket.id);

        console.log("User Added:", userId);

    });

    socket.on("disconnect", () => {

        removeUser(socket.id);

        console.log("User Disconnected:", socket.id);

    });

});

// =====================
// Start Server
// =====================

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

    console.log(`🚀 Server running on port ${PORT}`);

});
