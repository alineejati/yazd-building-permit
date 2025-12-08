const express = require('express');
const app = express();
const requestRoutes = require('./routes/requestRoutes');

// Middleware
app.use(express.json());

// Main route
app.use('/api', requestRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
