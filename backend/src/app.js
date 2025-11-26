import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
// Import the routes ======================================
import { recipesRoutes } from './routes/recipes.js'
import { userRoutes } from './routes/users.js'

// Socket.io imports ======================================
import { createServer } from 'node:http'
import { Server as SocketIOServer } from 'socket.io'

const app = express()

// Creates a new node server ==============================
const server = createServer(app)

// Create a new Socket.io server =========================
const io = new SocketIOServer(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
})

// Use the socket to listen to the connections from the
// clients
io.on('connection', (socket) => {
  console.log('User connected: ', socket.id)

  // Listen for the event 'create-recipe' from the client
  socket.on('created_recipe', (data) => {
    // To emit to all users/clients except the original sender =======
    /*
    socket.broadcast.emit('receive_notification', {
      message: data.message,
      title: data.title,
    }) // io. 
    */
    // To emit to all the users including the sender ==============
    io.emit('receive_notification', {
      message: data.message,
      title: data.title,
    }) // io.
  })

  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id)
  })
})

// Use the body parser ====================================
app.use(bodyParser.json())

// Use the CORS ===========================================
app.use(cors())

// Call the routes functions ==============================
recipesRoutes(app)
userRoutes(app)

// Configure the server simply ============================
app.get('/', (req, res) => {
  res.send('Express is currently running!')
})

// Export the app
export { server as app }
