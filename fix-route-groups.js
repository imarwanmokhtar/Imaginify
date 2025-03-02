// Script to fix route groups for Vercel deployment
const fs = require('fs');
const path = require('path');

console.log('Starting route group fix for Vercel deployment...');

// Function to create directory if it doesn't exist
function ensureDirectoryExistence(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Function to recursively copy directory contents
function copyDirectory(source, destination) {
  ensureDirectoryExistence(destination);
  
  const entries = fs.readdirSync(source, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(source, entry.name);
    const destPath = path.join(destination, entry.name);
    
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Main function to fix route groups
function fixRouteGroups() {
  const appDir = path.join(process.cwd(), 'app');
  
  if (!fs.existsSync(appDir)) {
    console.error('App directory not found!');
    return;
  }
  
  // Get all immediate subdirectories
  const entries = fs.readdirSync(appDir, { withFileTypes: true });
  
  // Process route groups with parentheses
  for (const entry of entries) {
    if (entry.isDirectory() && entry.name.startsWith('(') && entry.name.endsWith(')')) {
      const srcDir = path.join(appDir, entry.name);
      const newName = entry.name.replace(/[()]/g, ''); // Remove parentheses
      const destDir = path.join(appDir, newName);
      
      console.log(`Converting route group: ${entry.name} → ${newName}`);
      
      // Create new directory and copy contents
      copyDirectory(srcDir, destDir);
      
      // We're keeping the original directories to avoid breaking the app structure
      console.log(`Created duplicate directory without parentheses: ${newName}`);
    }
  }
  
  console.log('Route group fix completed successfully!');
}

// Run the fix
fixRouteGroups(); 