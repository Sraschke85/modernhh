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

MISSION: To improve access to care by integrating all aspects of healthcare and ensure quality patient experiences.

SERVICES OFFERED:
- Nursing: Highly skilled nurses capable of handling complex medical problems, recovery care, wound management, and chronic conditions
- Health Home Aide: Assistance with daily tasks, basic routine care, and personal care assistance to maintain comfort and dignity at home
- Therapy Services: Physical therapy, speech therapy, occupational therapy, and infusion therapy to restore strength and independence
- Oncology Support: Specialized in-home support for patients undergoing cancer treatment, including physical examinations and health evaluations
- Diabetic Care: Insulin injection instruction, blood sugar management support, and monitoring
- Medication Management: Medication scheduling, monitoring, and patient education

CONTACT INFORMATION:
- Main Phone: (281) 501-0350
- After-Hours Phone: (888) 510-1879
- Email: intake@modernhh.com
- Fax: (888) 891-6316
- Address: 9800 Richmond Ave, Suite 427, Houston, TX 77042

HOURS OF OPERATION:
- Monday-Friday: 10:00 AM - 3:00 PM
- Saturday-Sunday: Closed
- 24/7 support line available for emergencies

SERVICE AREAS:
Modern Homecare serves 13 Texas counties: Austin, Brazoria, Chambers, Colorado, Fort Bend, Galveston, Harris, Liberty, Matagorda, Montgomery, Walker, Waller, and Wharton.

ELIGIBILITY & INSURANCE:
- Requires a physician order to begin services
- Medicare beneficiaries must be "homebound" to qualify
- Services are covered under medical insurance benefits when requirements are met
- Works with multiple insurance carriers
- Physician-focused disease management

KEY FEATURES:
- 24/7 support available for patients and families
- Customized care plans for each patient's needs
- Licensed professionals dedicated to compassionate care
- Comprehensive disease management and patient education

Be friendly, professional, and compassionate. Help answer questions about services, eligibility, coverage, how to get started, service areas, and general home healthcare information. If someone asks about a service area, refer to the 13 counties listed above. For urgent matters, direct them to call the main phone number or after-hours line.`
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
