const express = require('express');
const PORT = process.env.PORT || 3001;
// const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();
// allow access to public folder
app.use(express.static('public'));

// parse incoming string or array data
// app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
// app.use(express.json());
// Setup Routes
// app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
