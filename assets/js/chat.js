const toggle=document.getElementById('chat-toggle');
const panel=document.getElementById('chat-panel');
const closeB=document.getElementById('chat-close');
const form=document.getElementById('chat-form');
const input=document.getElementById('chat-input');
const log=document.getElementById('chat-log');

toggle.addEventListener('click',()=>panel.classList.toggle('hidden'));
closeB.addEventListener('click',()=>panel.classList.add('hidden'));

function addMsg(text,who='bot'){
  const div=document.createElement('div');
  div.className=`msg ${who}`;
  div.textContent=text;
  log.appendChild(div);
  log.scrollTop=log.scrollHeight;
}

form.addEventListener('submit',async e=>{
  e.preventDefault();
  const text=input.value.trim();
  if(!text)return;
  addMsg(text,'user');
  input.value='';
  addMsg('…','bot');
  try{
    const r=await fetch('/api/chat',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({message:text})
    });
    const data=await r.json();
    log.lastChild.textContent=data.reply||'Sorry, something went wrong.';
  }catch{
    log.lastChild.textContent='AI Assistant is currently unavailable.';
  }
});
