// Script to fix Edge Runtime warnings for Node.js APIs used by Clerk
const fs = require('fs');
const path = require('path');

console.log('Creating polyfills for Edge Runtime...');

// Create a simple polyfill file for the MessageEvent
const createPolyfill = () => {
  const polyfillPath = path.join(process.cwd(), 'app', 'polyfills.js');
  const polyfillContent = `
// Polyfills for Edge Runtime
if (typeof globalThis.MessageEvent === 'undefined') {
  globalThis.MessageEvent = class MessageEvent {
    constructor(type, init = {}) {
      this.type = type;
      this.data = init.data || null;
      this.origin = init.origin || '';
      this.lastEventId = init.lastEventId || '';
      this.source = init.source || null;
      this.ports = init.ports || [];
    }
  };
}

if (typeof globalThis.MessageChannel === 'undefined') {
  globalThis.MessageChannel = class MessageChannel {
    constructor() {
      this.port1 = {};
      this.port2 = {};
    }
  };
}

if (typeof globalThis.setImmediate === 'undefined') {
  globalThis.setImmediate = (callback, ...args) => {
    return setTimeout(() => callback(...args), 0);
  };
}

// Add more polyfills as needed
`;

  try {
    fs.writeFileSync(polyfillPath, polyfillContent);
    console.log(`Created polyfill file at: ${polyfillPath}`);
  } catch (error) {
    console.error(`Error creating polyfill file:`, error.message);
  }
  
  // Now update the middleware to import the polyfills
  try {
    const middlewarePath = path.join(process.cwd(), 'middleware.ts');
    if (fs.existsSync(middlewarePath)) {
      let middlewareContent = fs.readFileSync(middlewarePath, 'utf8');
      
      // Only add the import if it doesn't already exist
      if (!middlewareContent.includes("import './app/polyfills'")) {
        middlewareContent = "import './app/polyfills';\n" + middlewareContent;
        fs.writeFileSync(middlewarePath, middlewareContent);
        console.log('Updated middleware.ts to import polyfills');
      } else {
        console.log('Middleware already imports polyfills');
      }
    }
  } catch (error) {
    console.error(`Error updating middleware:`, error.message);
  }
};

// Run the polyfill creation
createPolyfill();
console.log('Edge Runtime polyfills created successfully!'); 