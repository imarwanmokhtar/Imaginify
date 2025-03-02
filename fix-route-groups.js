// Script to fix route groups by RENAMING them, not duplicating
const fs = require('fs');
const path = require('path');

console.log('Starting route group FIX - RENAMING route groups...');

// Function to create directory if it doesn't exist
function ensureDirectoryExistence(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`Creating directory: ${dirPath}`);
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

// Function to update imports in a file
function updateImports(filePath, oldName, newName) {
  try {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      const oldImport = `from '@/app/${oldName}`;
      const newImport = `from '@/app/${newName}`;
      
      if (content.includes(oldImport)) {
        content = content.replace(new RegExp(oldImport, 'g'), newImport);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated imports in ${filePath}`);
      }
    }
  } catch (error) {
    console.error(`Error updating imports in ${filePath}:`, error.message);
  }
}

// Function to recursively scan directory for imports to update
function scanAndUpdateImports(dirPath, oldName, newName) {
  try {
    if (fs.existsSync(dirPath)) {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const entryPath = path.join(dirPath, entry.name);
        
        if (entry.isDirectory()) {
          scanAndUpdateImports(entryPath, oldName, newName);
        } else if (entry.name.endsWith('.js') || entry.name.endsWith('.jsx') || 
                  entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
          updateImports(entryPath, oldName, newName);
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error.message);
  }
}

// Main function to fix route groups by renaming them
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
      
      console.log(`RENAMING route group: ${entry.name} → ${newName}`);
      
      // Copy contents to new directory
      copyDirectory(srcDir, destDir);
      
      // Update imports across the codebase
      scanAndUpdateImports(process.cwd(), entry.name, newName);
      
      // Remove the original directory
      try {
        // First try with recursive deletion - this might not work on Windows
        if (fs.rmSync) {
          fs.rmSync(srcDir, { recursive: true, force: true });
        } else {
          // For older Node.js versions or Windows
          const rimraf = (dir) => {
            if (fs.existsSync(dir)) {
              fs.readdirSync(dir).forEach((file) => {
                const curPath = path.join(dir, file);
                if (fs.lstatSync(curPath).isDirectory()) {
                  rimraf(curPath);
                } else {
                  fs.unlinkSync(curPath);
                }
              });
              fs.rmdirSync(dir);
            }
          };
          rimraf(srcDir);
        }
        console.log(`Removed original directory: ${srcDir}`);
      } catch (error) {
        console.error(`Failed to remove original directory ${srcDir}:`, error.message);
        console.log('Continuing without removing original directory...');
      }
    }
  }
  
  console.log('Route group fix completed successfully!');
}

// Run the fix
fixRouteGroups(); 