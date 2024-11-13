const express = require('express');
const path = require('path');
const urlRouter = require('./routes/url');
const connectdB = require('./connect');
const StaticRoute = require('./routes/Staticroute');
const userRoute = require('./routes/user');
const { chkAuthentication } = require('./middleware/auth');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 8000;

// Database Connection
const dbURL = 'mongodb://127.0.0.1:27017/url-shortner';
connectdB(dbURL);

// Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(chkAuthentication);

// View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));

// Routes

app.use('/user', userRoute);
app.use('/urls',urlRouter);
app.use('/', StaticRoute);

// Start Server
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
