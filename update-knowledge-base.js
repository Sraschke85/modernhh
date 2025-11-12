// Knowledge Base Updater
// Instructions: Place your knowledge base content in the knowledgeBase variable below
// Then run: node update-knowledge-base.js

const fs = require('fs');
const path = require('path');

// ADD YOUR KNOWLEDGE BASE CONTENT HERE
const knowledgeBase = `
Example knowledge base content:
- Add your policies here
- Add your procedures here
- Add your FAQs here
- Add any other relevant information
`;

// Read the current chat.js file
const chatJsPath = path.join(__dirname, 'assets', 'js', 'chat.js');
let chatContent = fs.readFileSync(chatJsPath, 'utf8');

// Replace the placeholder with the knowledge base
const updatedContent = chatContent.replace(
  'KNOWLEDGE_BASE_PLACEHOLDER',
  `\n\nAdditional Knowledge Base:\n${knowledgeBase}`
);

// Write the updated content back
fs.writeFileSync(chatJsPath, updatedContent, 'utf8');

console.log('Knowledge base updated successfully!');
console.log(`Updated: ${chatJsPath}`);
