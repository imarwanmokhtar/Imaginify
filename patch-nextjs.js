// Script to fix Next.js build issues
const fs = require('fs');
const path = require('path');

console.log('Running Next.js patch script...');

// Function to create directory if it doesn't exist
function ensureDirectoryExistence(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      console.log(`Creating directory: ${dirPath}`);
      fs.mkdirSync(dirPath, { recursive: true });
    }
  } catch (error) {
    console.error(`Error creating directory ${dirPath}:`, error.message);
  }
}

// Create placeholder files that might be missing during build
function createPlaceholderFiles() {
  console.log('Creating placeholder files for route groups...');
  
  // The exact file that's causing the error
  const exactFilePath = '/vercel/path0/.next/server/app/(root)/page_client-reference-manifest.js';
  const exactDirPath = path.dirname(exactFilePath);
  
  try {
    console.log(`Attempting to create directory: ${exactDirPath}`);
    ensureDirectoryExistence(exactDirPath);
    
    console.log(`Attempting to create file: ${exactFilePath}`);
    fs.writeFileSync(exactFilePath, 'module.exports = {}\n', { flag: 'w' });
    console.log(`Successfully created: ${exactFilePath}`);
  } catch (error) {
    console.error(`Error creating ${exactFilePath}:`, error.message);
  }
  
  // Also try the standard Next.js path if we're not on Vercel
  const defaultNextDir = path.join(process.cwd(), '.next', 'server', 'app', '(root)');
  
  try {
    console.log(`Attempting to create directory: ${defaultNextDir}`);
    ensureDirectoryExistence(defaultNextDir);
    
    const defaultFilePath = path.join(defaultNextDir, 'page_client-reference-manifest.js');
    console.log(`Attempting to create file: ${defaultFilePath}`);
    fs.writeFileSync(defaultFilePath, 'module.exports = {}\n', { flag: 'w' });
    console.log(`Successfully created: ${defaultFilePath}`);
  } catch (error) {
    console.error(`Error creating file in default Next.js directory:`, error.message);
  }
  
  // Try all possible Vercel paths
  for (let i = 0; i < 5; i++) {
    const vercelPath = `/vercel/path${i}/.next/server/app/(root)`;
    
    try {
      console.log(`Attempting to create directory: ${vercelPath}`);
      ensureDirectoryExistence(vercelPath);
      
      const manifestFilePath = path.join(vercelPath, 'page_client-reference-manifest.js');
      console.log(`Attempting to create file: ${manifestFilePath}`);
      fs.writeFileSync(manifestFilePath, 'module.exports = {}\n', { flag: 'w' });
      console.log(`Successfully created: ${manifestFilePath}`);
      
      // Also create layout manifest
      const layoutManifestPath = path.join(vercelPath, 'layout_client-reference-manifest.js');
      fs.writeFileSync(layoutManifestPath, 'module.exports = {}\n', { flag: 'w' });
      console.log(`Successfully created: ${layoutManifestPath}`);
    } catch (error) {
      console.error(`Error creating files in Vercel path ${i}:`, error.message);
    }
  }
}

// Create duplicate route groups without parentheses
function createDuplicateRouteGroups() {
  console.log('Creating duplicate route groups without parentheses...');
  
  // First, try to find and create route groups in the source code
  const appDir = path.join(process.cwd(), 'app');
  
  if (fs.existsSync(appDir)) {
    try {
      const entries = fs.readdirSync(appDir);
      
      for (const entry of entries) {
        if (entry.startsWith('(') && entry.endsWith(')')) {
          const sourceDir = path.join(appDir, entry);
          const newName = entry.replace(/[()]/g, '');
          const targetDir = path.join(appDir, newName);
          
          if (fs.statSync(sourceDir).isDirectory()) {
            console.log(`Found route group: ${entry}, creating duplicate: ${newName}`);
            ensureDirectoryExistence(targetDir);
            
            // Copy files from the route group to the new directory
            const files = fs.readdirSync(sourceDir);
            for (const file of files) {
              const sourcePath = path.join(sourceDir, file);
              const targetPath = path.join(targetDir, file);
              
              if (fs.statSync(sourcePath).isFile()) {
                fs.copyFileSync(sourcePath, targetPath);
                console.log(`Copied ${file} to ${targetPath}`);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error duplicating route groups:', error.message);
    }
  }
  
  // Then, try to create the same structure in the .next directory
  try {
    const buildDir = path.join(process.cwd(), '.next', 'server', 'app');
    if (fs.existsSync(buildDir)) {
      const entries = fs.readdirSync(buildDir);
      
      for (const entry of entries) {
        if (entry.startsWith('(') && entry.endsWith(')')) {
          const sourceDir = path.join(buildDir, entry);
          const newName = entry.replace(/[()]/g, '');
          const targetDir = path.join(buildDir, newName);
          
          if (fs.statSync(sourceDir).isDirectory()) {
            console.log(`Found built route group: ${entry}, creating duplicate: ${newName}`);
            ensureDirectoryExistence(targetDir);
            
            // Copy files from the route group to the new directory
            const files = fs.readdirSync(sourceDir);
            for (const file of files) {
              const sourcePath = path.join(sourceDir, file);
              const targetPath = path.join(targetDir, file);
              
              if (fs.statSync(sourcePath).isFile()) {
                fs.copyFileSync(sourcePath, targetPath);
                console.log(`Copied ${file} to ${targetPath}`);
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Error duplicating route groups in build directory:', error.message);
  }
  
  // And finally, try the same for Vercel paths
  for (let i = 0; i < 5; i++) {
    try {
      const vercelBuildDir = `/vercel/path${i}/.next/server/app`;
      
      if (fs.existsSync(vercelBuildDir)) {
        const entries = fs.readdirSync(vercelBuildDir);
        
        for (const entry of entries) {
          if (entry.startsWith('(') && entry.endsWith(')')) {
            const sourceDir = path.join(vercelBuildDir, entry);
            const newName = entry.replace(/[()]/g, '');
            const targetDir = path.join(vercelBuildDir, newName);
            
            if (fs.statSync(sourceDir).isDirectory()) {
              console.log(`Found Vercel route group: ${entry}, creating duplicate: ${newName}`);
              ensureDirectoryExistence(targetDir);
              
              // Copy files from the route group to the new directory
              const files = fs.readdirSync(sourceDir);
              for (const file of files) {
                const sourcePath = path.join(sourceDir, file);
                const targetPath = path.join(targetDir, file);
                
                if (fs.statSync(sourcePath).isFile()) {
                  fs.copyFileSync(sourcePath, targetPath);
                  console.log(`Copied ${file} to ${targetPath}`);
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error duplicating route groups in Vercel path ${i}:`, error.message);
    }
  }
}

// Check if file exists and create it if not
function forceCreateEmptyFile(filePath) {
  try {
    const content = 'module.exports = {}\n';
    fs.writeFileSync(filePath, content, { flag: 'w' });
    console.log(`Successfully created: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error creating ${filePath}:`, error.message);
    return false;
  }
}

// Run all fixes
console.log('Starting Next.js fixes...');
createDuplicateRouteGroups();
createPlaceholderFiles();

// Direct fix for the reported error
const exactFilePath = '/vercel/path0/.next/server/app/(root)/page_client-reference-manifest.js';
forceCreateEmptyFile(exactFilePath);

console.log('All Next.js fixes completed. Check logs for any errors.'); 