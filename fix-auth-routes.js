// Script to fix authentication routes
const fs = require('fs');
const path = require('path');

console.log('Fixing authentication routes...');

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

// Function to copy directory contents recursively
function copyDirectoryRecursive(source, destination) {
  try {
    ensureDirectoryExistence(destination);
    
    const entries = fs.readdirSync(source, { withFileTypes: true });
    
    for (const entry of entries) {
      const srcPath = path.join(source, entry.name);
      const destPath = path.join(destination, entry.name);
      
      if (entry.isDirectory()) {
        copyDirectoryRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${srcPath} -> ${destPath}`);
      }
    }
  } catch (error) {
    console.error(`Error copying directory: ${error.message}`);
  }
}

// Create direct sign-in and sign-up routes at the app root level
function createDirectAuthRoutes() {
  try {
    const appDir = path.join(process.cwd(), 'app');
    
    // Check if the (auth) directory exists
    const authSourceDir = path.join(appDir, '(auth)');
    if (!fs.existsSync(authSourceDir)) {
      console.error('(auth) directory not found!');
      return;
    }
    
    // Create sign-in and sign-up directories at the app root
    const signInDir = path.join(appDir, 'sign-in');
    const signUpDir = path.join(appDir, 'sign-up');
    
    // Source directories
    const authSignInDir = path.join(authSourceDir, 'sign-in');
    const authSignUpDir = path.join(authSourceDir, 'sign-up');
    
    if (fs.existsSync(authSignInDir)) {
      console.log('Copying sign-in directory to app root...');
      copyDirectoryRecursive(authSignInDir, signInDir);
    }
    
    if (fs.existsSync(authSignUpDir)) {
      console.log('Copying sign-up directory to app root...');
      copyDirectoryRecursive(authSignUpDir, signUpDir);
    }
    
    console.log('Direct authentication routes created successfully!');
  } catch (error) {
    console.error(`Error creating direct auth routes: ${error.message}`);
  }
}

// Create a simple page.js file for sign-in and sign-up routes
function createSimpleAuthPages() {
  try {
    const appDir = path.join(process.cwd(), 'app');
    
    // Create sign-in page.js
    const signInPagePath = path.join(appDir, 'sign-in', 'page.js');
    ensureDirectoryExistence(path.dirname(signInPagePath));
    
    const signInContent = `
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <SignIn />
    </div>
  );
}
`;
    
    fs.writeFileSync(signInPagePath, signInContent);
    console.log(`Created: ${signInPagePath}`);
    
    // Create sign-up page.js
    const signUpPagePath = path.join(appDir, 'sign-up', 'page.js');
    ensureDirectoryExistence(path.dirname(signUpPagePath));
    
    const signUpContent = `
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <SignUp />
    </div>
  );
}
`;
    
    fs.writeFileSync(signUpPagePath, signUpContent);
    console.log(`Created: ${signUpPagePath}`);
    
    console.log('Simple auth pages created successfully!');
  } catch (error) {
    console.error(`Error creating simple auth pages: ${error.message}`);
  }
}

// Run the fixes
console.log('Starting authentication route fixes...');
createDirectAuthRoutes();
createSimpleAuthPages();
console.log('Authentication route fixes completed!'); 