#! /usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { program } = require('commander');



program
  .command('init')
  .description('Initialize a new Node.js project, install packages, and create folder structure')
  .action(() => {
    // Initialize a new Node.js project
    execSync('npx npm init -y', { stdio: 'inherit' });

    // Install packages
    const packages = [
      "bcrypt@^5.1.1",
      "cloudinary@^2.2.0",
      "connect-mongo@^5.1.0",
      "cookie-parser@^1.4.6",
      "cors@^2.8.5",
      "dotenv@^16.4.5",
      "ejs@^3.1.10",
      "express@^4.19.2",
      "express-ejs-layouts@^2.5.1",
      "express-session@^1.18.0",
      "jsonwebtoken@^9.0.2",
      "method-override@^3.0.0",
      "mongoose@^8.4.1",
      "multer@^1.4.5-lts.1"
    ];
    execSync(`npm install ${packages.join(' ')}`, { stdio: 'inherit' });

    // Create folders
    const folders = ['config', 'middleware', 'models', 'routes', 'public', 'controller'];
    folders.forEach(folder => {
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
        console.log(`Created folder: ${folder}`);
      }
    });

    // Create files
    const files = ['.env', '.gitignore','app.js'];
    files.forEach(file => {
      const filePath = path.join(process.cwd(), file);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '');
        console.log(`Created file: ${file}`);
      }
    });

    console.log('Project initialized successfully!');
  });


program.parse(process.argv);
