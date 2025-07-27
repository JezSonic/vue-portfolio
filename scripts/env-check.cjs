const path = require('path');
const fs = require('fs');
const envExamplePath = path.resolve(__dirname, '../config.example.ts');
const envPath = path.resolve(__dirname, '../config.ts');

if (!fs.existsSync(envPath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('config.ts file created from config.example.ts');
} else {
    console.log('config.ts file already exists.');
}