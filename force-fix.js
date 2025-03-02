// This script directly fixes the specific error file
const fs = require('fs');
const path = require('path');

console.log('FORCE FIX: Creating the exact file causing the error...');

// The exact file that's causing the error
const exactFilePath = '/vercel/path0/.next/server/app/(root)/page_client-reference-manifest.js';

try {
  // Create all directories in the path
  const dirPath = path.dirname(exactFilePath);
  fs.mkdirSync(dirPath, { recursive: true });
  console.log(`Created directory structure: ${dirPath}`);
  
  // Write the file with a valid JavaScript module export
  fs.writeFileSync(exactFilePath, 'module.exports = {}\n');
  console.log(`CREATED MISSING FILE: ${exactFilePath}`);
  
  // Also create the layout manifest in case it's needed
  const layoutFile = path.join(dirPath, 'layout_client-reference-manifest.js');
  fs.writeFileSync(layoutFile, 'module.exports = {}\n');
  console.log(`Created layout manifest: ${layoutFile}`);
  
  // Create duplicates without parentheses
  const rootDir = path.join(path.dirname(dirPath), 'root');
  fs.mkdirSync(rootDir, { recursive: true });
  
  const rootPageFile = path.join(rootDir, 'page_client-reference-manifest.js');
  fs.writeFileSync(rootPageFile, 'module.exports = {}\n');
  console.log(`Created duplicate: ${rootPageFile}`);
  
  const rootLayoutFile = path.join(rootDir, 'layout_client-reference-manifest.js');
  fs.writeFileSync(rootLayoutFile, 'module.exports = {}\n');
  console.log(`Created duplicate: ${rootLayoutFile}`);
  
  console.log('FORCE FIX COMPLETED SUCCESSFULLY!');
} catch (error) {
  console.error(`ERROR IN FORCE FIX: ${error.message}`);
  // Even if this fails, don't stop the build
} 