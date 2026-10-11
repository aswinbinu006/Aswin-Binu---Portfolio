// Content Gate script per TRD.md and testing-and-quality.md
import fs from 'fs';
import path from 'path';

console.log('--- Running Content Integrity Gate ---');

const srcDataPath = path.resolve('src/data');
let hasBlockingErrors = false;

// Check files in src/data
const files = fs.readdirSync(srcDataPath);

for (const file of files) {
  if (file.endsWith('.ts')) {
    const content = fs.readFileSync(path.join(srcDataPath, file), 'utf-8');
    
    // Check for obvious placeholders like "lorem ipsum"
    if (/lorem ipsum/i.test(content)) {
      console.error(`[ERROR] Placeholder 'lorem ipsum' found in ${file}`);
      hasBlockingErrors = true;
    }
  }
}

if (hasBlockingErrors) {
  console.error('Content Gate FAILED: Blocking placeholders found.');
  process.exit(1);
} else {
  console.log('Content Gate PASSED: No forbidden placeholders detected.');
  process.exit(0);
}
