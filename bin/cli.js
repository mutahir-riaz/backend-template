#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { Command } = require('commander');
const program = new Command();

program
  .command('init')
  .description('Initialize a new Node.js project, install packages, and create folder structure')
  .action(() => {
    // Create 'backend' folder
    const backendDir = path.join(process.cwd(), 'backendTemp');
    if (!fs.existsSync(backendDir)) {
      fs.mkdirSync(backendDir);
      console.log('Created folder: backend');
    }

    // Initialize a new Node.js project inside 'backend' folder
    execSync('npx npm init -y', { cwd: backendDir, stdio: 'inherit' });

    // Update package.json with author name
    const packageJsonPath = path.join(backendDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));
    packageJson.author = "Syed Mutahir";
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    // console.log('Added author name to package.json');

    // Install packages inside 'backend' folder
    const packages = [
      "bcrypt",
      "cloudinary",
      "connect-mongo",
      "cookie-parser",
      "cors",
      "dotenv",
      "ejs",
      "express",
      "express-ejs-layouts",
      "express-session",
      "jsonwebtoken",
      "method-override",
      "mongoose",
      "multer"
    ];
    execSync(`npm install ${packages.join(' ')}`, { cwd: backendDir, stdio: 'inherit' });

    // Create folders inside 'backend' folder
    const folders = ['config', 'middleware', 'models', 'routes', 'public', 'controller'];
    folders.forEach(folder => {
      const folderPath = path.join(backendDir, folder);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
        console.log(`Created folder: ${folder}`);
      }
    });

    // Create files inside 'backend' folder
    const files = ['.env', '.gitignore', 'app.js'];
    files.forEach(file => {
      const filePath = path.join(backendDir, file);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '');
        console.log(`Created file: ${file}`);
      }
    });

    console.log('Project initialized successfully!');
  });

program.parse(process.argv);
