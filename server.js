const express = require('express');
const mongoose = require('mongoose');

const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// use this to log mongo queries being executed
mongoose.set('debug', true);

app.use(require('./routes'));

app.listen(PORT, () => console.log(`Connected to localhost:${PORT}`));