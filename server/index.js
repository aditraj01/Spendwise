const express = require("express");
const connectDb = require("./configDB/mongoDB");
const { login, signup, authenticateJWT, fetchTransactions, uploadTransactions, editTransaction, deleteTransactcion } = require("./controllers/userController");
const cors=require('cors');

// Connect to MongoDB
connectDb();

// Create an Express application
const app = express();

app.use(cors());
app.use(express.json());

// ------User controllers------
app.post('/api/users/login', login);
app.post('/api/users/signup', signup);
app.get('/api/user', authenticateJWT, (req, res) => {
    res.json({ message: 'Protected route accessed successfully!', user: req.user });
});
app.get('/api/users/fetchTransactions', fetchTransactions);
app.post('/api/users/uploadTransactions', uploadTransactions);
app.post('/api/users/editTransaction',editTransaction);
app.post('/api/users/deleteTransaction',deleteTransactcion);


// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
