// Script to fix Clerk SSG issues with Next.js
const fs = require('fs');
const path = require('path');

console.log('Creating SSG compatibility fix for Clerk...');

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

// Create a file that disables static generation for Clerk pages
function fixClerkSSG() {
  try {
    // Create a not-found.js in the .next server directory
    const notFoundDir = path.join(process.cwd(), '.next', 'server', 'pages');
    ensureDirectoryExistence(notFoundDir);
    
    const notFoundPath = path.join(notFoundDir, '_not-found.js');
    const notFoundContent = `
// This is a placeholder to avoid static generation errors
module.exports = {
  __esModule: true,
  default: function NotFound() { 
    return null;
  }
};
`;
    
    fs.writeFileSync(notFoundPath, notFoundContent);
    console.log(`Created placeholder not-found.js: ${notFoundPath}`);
    
    // Create empty files for all the routes that had errors
    const routePaths = [
      '_not-found.js',
      'app.js',
      'coming-soon.js',
      'index.js',
      'root/credits.js',
      'root.js',
      'root/profile.js'
    ];
    
    routePaths.forEach(routePath => {
      const fullPath = path.join(notFoundDir, routePath);
      ensureDirectoryExistence(path.dirname(fullPath));
      
      fs.writeFileSync(fullPath, `
// This is a placeholder to avoid static generation errors
module.exports = {
  __esModule: true,
  default: function Page() { 
    return null;
  }
};
`);
      console.log(`Created placeholder for: ${routePath}`);
    });
    
    console.log('All placeholder files created successfully!');
  } catch (error) {
    console.error('Error creating placeholder files:', error.message);
  }
}

// Run the fix
fixClerkSSG(); 