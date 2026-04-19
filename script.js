const zoneData={dharavi:{f:1.25,l:'Dharavi — high flood risk'},andheri:{f:1.10,l:'Andheri — moderate risk'},bandra:{f:1.15,l:'Bandra — moderate-high risk'},thane:{f:1.05,l:'Thane — low-moderate risk'},kurla:{f:1.20,l:'Kurla — high risk'}};
let plan='pro', regStep=1;

function showPage(name,btn){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.pill').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  if(btn) btn.classList.add('active');
}
function toast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3000);
}
function calcPremium(){
  const z=document.getElementById('r-zone')?.value||'dharavi';
  const h=parseInt(document.getElementById('r-hours')?.value||8);
  const base=plan==='pro'?99:49;
  const zd=zoneData[z]; const act=h>=10?0.90:h>=8?0.95:1.0;
  const final=Math.round(base*zd.f*1.35*act);
  if(document.getElementById('c-base')){
    document.getElementById('c-base').textContent='₹'+base;
    document.getElementById('c-zone').textContent='× '+zd.f+' ('+zd.l+')';
    document.getElementById('c-act').textContent='× '+act;
    document.getElementById('c-final').textContent='₹'+final;
  }
  return {final,zd,act,base};
}
function setPlan(p){
  plan=p;
  document.getElementById('pc-basic').classList.toggle('selected',p==='basic');
  document.getElementById('pc-pro').classList.toggle('selected',p==='pro');
  calcPremium();
}
function goReg(n){
  document.getElementById('rs'+regStep).style.display='none';
  document.getElementById('s'+regStep).classList.remove('active');
  document.getElementById('s'+regStep).classList.add('done');
  regStep=n;
  document.getElementById('rs'+regStep).style.display='block';
  document.getElementById('s'+regStep).classList.add('active');
  if(n===3) buildSummary();
}
function buildSummary(){
  const {final}=calcPremium();
  const name=document.getElementById('r-name').value;
  const plat=document.getElementById('r-platform').value;
  const zoneEl=document.getElementById('r-zone');
  const zoneTxt=zoneEl.options[zoneEl.selectedIndex].text;
  const rows=[['Worker',name],['Platform',plat],['Zone',zoneTxt],['Plan',plan==='pro'?'Pro Shield':'Basic Shield'],['Weekly Premium','₹'+final],['Coverage Starts','Today, March 21'],['Max Weekly Payout',plan==='pro'?'₹2,100':'₹900'],['Auto-Renew','Every Monday']];
  document.getElementById('reg-summary').innerHTML=rows.map(([k,v])=>`<div style="display:flex;justify-content:space-between;padding:9px 12px;background:rgba(255,255,255,0.03);border-radius:8px;margin-bottom:6px"><span style="color:var(--grey);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">${k}</span><span style="font-weight:700;font-size:14px">${v}</span></div>`).join('');
}
function activatePlan(){
  toast('🎉 Coverage Activated! Razorpay payment processed.');
  setTimeout(()=>{
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.querySelectorAll('.pill').forEach(p=>p.classList.remove('active'));
    document.getElementById('page-dashboard').classList.add('active');
    document.querySelectorAll('.pill')[0].classList.add('active');
  },1500);
}
function simulate(){
  const type=document.getElementById('sim-type').value;
  const payouts={rainfall:900,aqi:675,flood:900,curfew:900,outage:450};
  const labels={rainfall:'🌧️ Heavy Rainfall (75mm)',aqi:'😷 Severe AQI (320)',flood:'🌊 Flood Alert Level 2',curfew:'🚫 Civic Curfew Detected',outage:'📵 Platform Outage (3hrs)'};
  const out=document.getElementById('sim-out');
  out.style.display='block';
  out.innerHTML='<div style="font-size:13px;color:var(--grey);padding:8px 0">⏳ Fetching data from external API...</div>';
  setTimeout(()=>{out.innerHTML='<div style="font-size:13px;color:var(--grey);padding:8px 0">🤖 Running Isolation Forest fraud detection model...</div>';},900);
  setTimeout(()=>{
    out.innerHTML=`<div class="success-box"><div class="success-title">✅ ${labels[type]} — Payout of ₹${payouts[type]} Triggered!</div><div class="success-body">📍 Zone: Dharavi, Mumbai<br/>🔍 Disruption verified via trusted API feed<br/>👤 Worker GPS: Confirmed in zone at time of event<br/>🤖 Fraud check: PASSED (Isolation Forest risk score: 0.07)<br/>💰 Payout: ₹${payouts[type]} → UPI transfer initiated<br/>⏱️ Total processing time: 42 seconds</div></div>`;
    toast('💰 Payout of ₹'+payouts[type]+' triggered!');
  },2200);
}
calcPremium();