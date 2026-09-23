require('dotenv').config();

const path = require('path');
const createApp = require('./server/app');

const PORT = process.env.PORT || 5000;
const app = createApp();

app.listen(PORT, () => {
    console.log('==================================================');
    console.log(`  Wiki API Server is running on: http://localhost:${PORT}`);
    console.log(`  Database config target: ${process.env.DB_NAME}`);
    console.log(`  Upload folder local path: ${path.join(__dirname, 'uploads')}`);
    console.log('==================================================');
});
