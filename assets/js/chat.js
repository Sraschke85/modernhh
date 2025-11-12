const toggle=document.getElementById('chat-toggle');
const panel=document.getElementById('chat-panel');
const closeB=document.getElementById('chat-close');
const form=document.getElementById('chat-form');
const input=document.getElementById('chat-input');
const log=document.getElementById('chat-log');

// API Configuration - uses backend API that securely stores the key
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? '/api/chat'  // Local development
  : '/api/chat'; // Production (Vercel will handle this)

// Conversation history
let conversationHistory = [
  {
    role: 'system',
    content: `You are a helpful assistant for Modern Homecare, a home healthcare company in Houston, TX.
You provide information about their services including:
- Nursing Care: Professional medical care for recovery, wound management, and chronic conditions
- Therapy Services: Physical, speech, and occupational therapy to restore strength and independence
- Health Aide Support: Personal care assistance to maintain comfort and dignity at home
- Oncology Support: Specialized in-home support for patients undergoing cancer treatment

Company Details:
- Phone: (281) 501-0350
- Email: intake@modernhh.com
- Address: 9800 Richmond Ave, Suite 427, Houston, TX 77042
- Available 24/7 support line

Be friendly, professional, and compassionate. Help answer questions about services, how to get started, and general home healthcare information.

KNOWLEDGE_BASE_PLACEHOLDER`
  }
];

toggle.addEventListener('click',()=>panel.classList.toggle('hidden'));
closeB.addEventListener('click',()=>panel.classList.add('hidden'));

function addMsg(text,who='bot'){
  const div=document.createElement('div');
  div.className=`msg ${who}`;
  div.textContent=text;
  log.appendChild(div);
  log.scrollTop=log.scrollHeight;
  return div;
}

async function callOpenAI(userMessage) {
  conversationHistory.push({
    role: 'user',
    content: userMessage
  });

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messages: conversationHistory
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('API Response:', errorData);
    throw new Error(`API error ${response.status}: ${errorData.error || 'Unknown error'}`);
  }

  const data = await response.json();
  const assistantMessage = data.choices[0].message.content;

  conversationHistory.push({
    role: 'assistant',
    content: assistantMessage
  });

  // Keep conversation history manageable (last 10 messages + system)
  if (conversationHistory.length > 21) {
    conversationHistory = [
      conversationHistory[0],
      ...conversationHistory.slice(-20)
    ];
  }

  return assistantMessage;
}

form.addEventListener('submit',async e=>{
  e.preventDefault();
  const text=input.value.trim();
  if(!text)return;

  addMsg(text,'user');
  input.value='';
  const botMsg = addMsg('…','bot');

  try{
    const reply = await callOpenAI(text);
    botMsg.textContent = reply;
  }catch(err){
    console.error('Chat error:', err);
    console.error('Error details:', err.message);
    botMsg.textContent = `Error: ${err.message}. Please check the console for details.`;
  }
});
