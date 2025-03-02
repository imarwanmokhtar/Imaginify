const fs = require('fs');
const path = require('path');

// Function to create directory if it doesn't exist
function ensureDirectoryExistence(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

// Function to check if a file exists
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    return false;
  }
}

// Function to create empty file
function createEmptyFile(filePath) {
  if (!fileExists(filePath)) {
    try {
      ensureDirectoryExistence(path.dirname(filePath));
      fs.writeFileSync(filePath, '// Placeholder file created by postbuild script');
      console.log(`Created placeholder file: ${filePath}`);
    } catch (err) {
      console.error(`Error creating file ${filePath}:`, err);
    }
  }
}

// Check for standalone directory
const standaloneDir = path.join(process.cwd(), '.next', 'standalone');
if (fs.existsSync(standaloneDir)) {
  console.log('Standalone directory exists, processing files...');
  
  // Create missing client reference manifests for route groups
  const routeGroups = ['(root)', '(auth)'];
  
  routeGroups.forEach(group => {
    const sourceDir = path.join(process.cwd(), '.next', 'server', 'app', group);
    const targetDir = path.join(standaloneDir, '.next', 'server', 'app', group);
    
    // Create manifests needed for each route group
    const files = [
      'page_client-reference-manifest.js',
      'layout_client-reference-manifest.js'
    ];
    
    files.forEach(file => {
      const sourceFile = path.join(sourceDir, file);
      const targetFile = path.join(targetDir, file);
      
      if (fileExists(sourceFile) && !fileExists(targetFile)) {
        // If source file exists but target doesn't, copy it
        ensureDirectoryExistence(path.dirname(targetFile));
        fs.copyFileSync(sourceFile, targetFile);
        console.log(`Copied ${sourceFile} to ${targetFile}`);
      } else if (!fileExists(sourceFile)) {
        // If source file doesn't exist, create placeholders in both locations
        createEmptyFile(sourceFile);
        createEmptyFile(targetFile);
      }
    });
  });
} else {
  console.log('No standalone directory found, skipping file processing.');
}

console.log('Postbuild script completed'); 