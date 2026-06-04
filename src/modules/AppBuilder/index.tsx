import { useState, useRef, useCallback } from 'react'
import { Play, RotateCcw, Copy, Download, Code, Eye, Sparkles } from 'lucide-react'

const STARTER_TEMPLATES = [
  { label: 'Landing Page', prompt: 'Build a modern SaaS landing page with a hero section, features grid, pricing cards (Free, Pro, Team), and a CTA button' },
  { label: 'Invoice Generator', prompt: 'Build an invoice generator with editable line items, tax calculation, client info fields, and a print button' },
  { label: 'Habit Tracker', prompt: 'Build a weekly habit tracker with checkboxes for each day, the ability to add/remove habits, and a streak counter' },
  { label: 'Waitlist Form', prompt: 'Build a waitlist landing page with email capture, a countdown timer, and a share referral link feature' },
]

const DEFAULT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', system-ui, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: #f8fafc;
      color: #334155;
    }
    .placeholder {
      text-align: center;
      padding: 40px;
    }
    .placeholder h2 {
      font-size: 20px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 8px;
    }
    .placeholder p {
      font-size: 14px;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="placeholder">
    <h2>Your app will appear here</h2>
    <p>Describe what you want to build and hit Generate</p>
  </div>
</body>
</html>`

export default function AppBuilder() {
  const [prompt, setPrompt] = useState('')
  const [code, setCode] = useState(DEFAULT_HTML)
  const [view, setView] = useState<'preview' | 'code'>('preview')
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const generateApp = useCallback((inputPrompt: string) => {
    if (!inputPrompt.trim()) return
    setIsGenerating(true)

    setTimeout(() => {
      const generated = buildHTMLFromPrompt(inputPrompt)
      setCode(generated)
      setHasGenerated(true)
      setIsGenerating(false)
      setView('preview')
    }, 1500)
  }, [])

  const handleGenerate = () => generateApp(prompt)

  const handleTemplate = (template: typeof STARTER_TEMPLATES[0]) => {
    setPrompt(template.prompt)
    generateApp(template.prompt)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
  }

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'app.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    setCode(DEFAULT_HTML)
    setPrompt('')
    setHasGenerated(false)
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              App Builder
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">Describe it. Build it. Ship it.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                view === 'preview' ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> Preview
            </button>
            <button
              onClick={() => setView('code')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                view === 'code' ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <Code className="w-3.5 h-3.5" /> Code
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-80 border-r border-slate-200 bg-white flex flex-col">
          <div className="p-4 flex-1 overflow-auto">
            <label className="text-sm font-medium text-slate-700 mb-2 block">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Build a pricing page with three tiers..."
              className="w-full h-32 p-3 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full mt-3 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" /> Generate
                </>
              )}
            </button>

            {hasGenerated && (
              <div className="flex gap-2 mt-3">
                <button onClick={handleCopy} className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-slate-200 rounded-lg text-xs text-slate-600 hover:bg-slate-50 transition-colors">
                  <Copy className="w-3 h-3" /> Copy
                </button>
                <button onClick={handleDownload} className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-slate-200 rounded-lg text-xs text-slate-600 hover:bg-slate-50 transition-colors">
                  <Download className="w-3 h-3" /> Download
                </button>
                <button onClick={handleReset} className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-slate-200 rounded-lg text-xs text-slate-600 hover:bg-slate-50 transition-colors">
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>
            )}

            <div className="mt-6">
              <p className="text-xs font-medium text-slate-500 mb-2">Quick Start</p>
              <div className="space-y-2">
                {STARTER_TEMPLATES.map((t) => (
                  <button
                    key={t.label}
                    onClick={() => handleTemplate(t)}
                    className="w-full text-left p-2.5 border border-slate-100 rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-colors"
                  >
                    <p className="text-sm font-medium text-slate-700">{t.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{t.prompt}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-slate-50 relative">
          {view === 'preview' ? (
            <iframe
              ref={iframeRef}
              srcDoc={code}
              title="App Preview"
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-forms"
            />
          ) : (
            <div className="h-full overflow-auto">
              <pre className="p-4 text-sm text-slate-700 font-mono whitespace-pre-wrap leading-relaxed">
                {code}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function buildHTMLFromPrompt(prompt: string): string {
  const lower = prompt.toLowerCase()

  if (lower.includes('landing') || lower.includes('hero') || lower.includes('pricing')) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SaaS Landing Page</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',system-ui,sans-serif;color:#1e293b;background:#fff}
.container{max-width:1100px;margin:0 auto;padding:0 24px}
.hero{text-align:center;padding:80px 0 60px}
.hero h1{font-size:48px;font-weight:700;letter-spacing:-1.5px;line-height:1.1;margin-bottom:16px}
.hero p{font-size:18px;color:#64748b;max-width:500px;margin:0 auto 32px}
.hero .cta{display:inline-flex;align-items:center;gap:8px;background:#6366f1;color:#fff;padding:14px 32px;border-radius:10px;font-size:16px;font-weight:600;border:none;cursor:pointer;transition:background .2s}
.hero .cta:hover{background:#4f46e5}
.features{padding:60px 0;border-top:1px solid #f1f5f9}
.features h2{text-align:center;font-size:28px;font-weight:700;margin-bottom:40px}
.features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.feature-card{padding:28px;border:1px solid #e2e8f0;border-radius:12px}
.feature-card h3{font-size:16px;font-weight:600;margin-bottom:8px}
.feature-card p{font-size:14px;color:#64748b;line-height:1.6}
.pricing{padding:60px 0;background:#f8fafc;border-top:1px solid #f1f5f9}
.pricing h2{text-align:center;font-size:28px;font-weight:700;margin-bottom:40px}
.pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;max-width:900px;margin:0 auto}
.price-card{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;text-align:center}
.price-card.popular{border-color:#6366f1;box-shadow:0 0 0 1px #6366f1}
.price-card h3{font-size:18px;font-weight:600;margin-bottom:8px}
.price-card .price{font-size:36px;font-weight:700;margin:16px 0}
.price-card .price span{font-size:14px;color:#64748b;font-weight:400}
.price-card ul{list-style:none;text-align:left;margin:20px 0}
.price-card li{font-size:14px;color:#475569;padding:6px 0;border-bottom:1px solid #f8fafc}
.price-card li::before{content:"\\2713 ";color:#6366f1;font-weight:700}
.price-card button{width:100%;padding:12px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;border:1px solid #e2e8f0;background:#fff;color:#1e293b;transition:all .2s}
.price-card.popular button{background:#6366f1;color:#fff;border-color:#6366f1}
.price-card button:hover{opacity:.9}
</style>
</head>
<body>
<div class="container">
<section class="hero">
<h1>Ship faster.<br>Grow smarter.</h1>
<p>The all-in-one platform for solopreneurs who want to build, launch, and scale — without the overhead.</p>
<button class="cta">Start free trial &rarr;</button>
</section>
<section class="features">
<h2>Everything you need</h2>
<div class="features-grid">
<div class="feature-card"><h3>AI App Builder</h3><p>Describe your app in plain English. Get a working prototype in seconds — no code required.</p></div>
<div class="feature-card"><h3>Revenue Dashboard</h3><p>Track MRR, active users, and growth across all your projects in one place.</p></div>
<div class="feature-card"><h3>Idea Research</h3><p>Find validated, buildable ideas with competition analysis and market signals.</p></div>
</div>
</section>
</div>
<section class="pricing">
<div class="container">
<h2>Simple pricing</h2>
<div class="pricing-grid">
<div class="price-card">
<h3>Free</h3>
<div class="price">$0<span>/mo</span></div>
<ul><li>1 project</li><li>Basic dashboard</li><li>Community access</li></ul>
<button>Get started</button>
</div>
<div class="price-card popular">
<h3>Pro</h3>
<div class="price">$19<span>/mo</span></div>
<ul><li>Unlimited projects</li><li>AI App Builder</li><li>Idea Researcher</li><li>Priority support</li></ul>
<button>Start free trial</button>
</div>
<div class="price-card">
<h3>Team</h3>
<div class="price">$49<span>/mo</span></div>
<ul><li>Everything in Pro</li><li>Team collaboration</li><li>Custom integrations</li><li>Dedicated support</li></ul>
<button>Contact us</button>
</div>
</div>
</div>
</section>
</body>
</html>`
  }

  if (lower.includes('invoice')) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Invoice Generator</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',system-ui,sans-serif;background:#f8fafc;padding:40px}
.invoice{max-width:700px;margin:0 auto;background:#fff;border-radius:12px;border:1px solid #e2e8f0;padding:40px}
.header{display:flex;justify-content:space-between;align-items:start;margin-bottom:32px;padding-bottom:24px;border-bottom:1px solid #f1f5f9}
.header h1{font-size:24px;font-weight:700;color:#1e293b}
.header .inv-no{font-size:13px;color:#94a3b8}
input,select{border:1px solid #e2e8f0;border-radius:6px;padding:8px 12px;font-size:13px;font-family:inherit;width:100%}
input:focus{outline:none;border-color:#6366f1}
.row{display:grid;grid-template-columns:2fr 1fr 1fr 1fr auto;gap:8px;align-items:center;margin-bottom:8px}
.row-header{font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.5px;margin-bottom:12px}
.remove-btn{background:none;border:none;color:#ef4444;cursor:pointer;font-size:18px;padding:4px 8px}
.add-btn{background:none;border:1px dashed #cbd5e1;color:#64748b;padding:8px 16px;border-radius:6px;font-size:13px;cursor:pointer;margin-top:8px}
.add-btn:hover{border-color:#6366f1;color:#6366f1}
.totals{margin-top:24px;padding-top:16px;border-top:1px solid #f1f5f9;text-align:right}
.totals .line{display:flex;justify-content:flex-end;gap:40px;margin-bottom:8px;font-size:14px;color:#475569}
.totals .total{font-size:20px;font-weight:700;color:#1e293b}
.actions{display:flex;gap:12px;justify-content:flex-end;margin-top:24px}
.actions button{padding:10px 24px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;border:none}
.print-btn{background:#6366f1;color:#fff}
.print-btn:hover{background:#4f46e5}
.save-btn{background:#f1f5f9;color:#475569}
.section-title{font-size:13px;font-weight:600;color:#1e293b;margin-bottom:8px}
.client-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:24px}
@media print{body{padding:0;background:#fff}.actions{display:none}.invoice{border:none;box-shadow:none}}
</style>
</head>
<body>
<div class="invoice" id="invoice">
<div class="header">
<div><h1>Invoice</h1><p class="inv-no">INV-2026-001</p></div>
<div style="text-align:right"><p style="font-size:13px;color:#64748b">Date: <span id="date"></span></p></div>
</div>
<p class="section-title">Client Info</p>
<div class="client-grid">
<input type="text" placeholder="Client name" id="clientName">
<input type="email" placeholder="Client email" id="clientEmail">
</div>
<p class="section-title">Line Items</p>
<div class="row row-header"><span>Description</span><span>Qty</span><span>Rate</span><span>Amount</span><span></span></div>
<div id="items"></div>
<button class="add-btn" onclick="addItem()">+ Add item</button>
<div class="totals">
<div class="line"><span>Subtotal</span><span id="subtotal">$0.00</span></div>
<div class="line"><span>Tax (10%)</span><span id="tax">$0.00</span></div>
<div class="line total"><span>Total</span><span id="total">$0.00</span></div>
</div>
<div class="actions">
<button class="save-btn" onclick="alert('Saved!')">Save Draft</button>
<button class="print-btn" onclick="window.print()">Print / PDF</button>
</div>
</div>
<script>
document.getElementById('date').textContent=new Date().toLocaleDateString();
let items=[{desc:'',qty:1,rate:0}];
function render(){
const c=document.getElementById('items');c.innerHTML='';
items.forEach((item,i)=>{
const d=document.createElement('div');d.className='row';
d.innerHTML=\`<input type="text" placeholder="Item description" value="\${item.desc}" oninput="items[\${i}].desc=this.value">
<input type="number" min="1" value="\${item.qty}" oninput="items[\${i}].qty=+this.value;calc()">
<input type="number" min="0" step="0.01" value="\${item.rate}" oninput="items[\${i}].rate=+this.value;calc()">
<span style="font-size:14px;font-weight:500">$\${(item.qty*item.rate).toFixed(2)}</span>
<button class="remove-btn" onclick="items.splice(\${i},1);render();calc()">&times;</button>\`;
c.appendChild(d);});
}
function addItem(){items.push({desc:'',qty:1,rate:0});render();}
function calc(){
const sub=items.reduce((s,i)=>s+i.qty*i.rate,0);
const tax=sub*0.1;
document.getElementById('subtotal').textContent='$'+sub.toFixed(2);
document.getElementById('tax').textContent='$'+tax.toFixed(2);
document.getElementById('total').textContent='$'+(sub+tax).toFixed(2);
}
render();
</script>
</body>
</html>`
  }

  if (lower.includes('habit') || lower.includes('tracker')) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Habit Tracker</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',system-ui,sans-serif;background:#f8fafc;padding:40px;color:#1e293b}
.app{max-width:700px;margin:0 auto}
h1{font-size:24px;font-weight:700;margin-bottom:4px}
.sub{font-size:14px;color:#64748b;margin-bottom:24px}
.card{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:16px}
.add-row{display:flex;gap:8px;margin-bottom:24px}
.add-row input{flex:1;border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:14px}
.add-row input:focus{outline:none;border-color:#6366f1}
.add-row button{background:#6366f1;color:#fff;border:none;padding:10px 20px;border-radius:8px;font-weight:600;font-size:14px;cursor:pointer}
.add-row button:hover{background:#4f46e5}
.days-header{display:grid;grid-template-columns:180px repeat(7,1fr) 60px;gap:4px;margin-bottom:8px;font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;text-align:center}
.habit-row{display:grid;grid-template-columns:180px repeat(7,1fr) 60px;gap:4px;align-items:center;padding:8px 0;border-bottom:1px solid #f8fafc}
.habit-name{font-size:14px;font-weight:500;display:flex;align-items:center;gap:8px}
.remove{background:none;border:none;color:#ef4444;cursor:pointer;font-size:14px;opacity:.5}
.remove:hover{opacity:1}
.check-cell{display:flex;justify-content:center}
.check-cell input[type=checkbox]{width:20px;height:20px;accent-color:#6366f1;cursor:pointer}
.streak{font-size:13px;font-weight:600;color:#6366f1;text-align:center}
</style>
</head>
<body>
<div class="app">
<h1>Habit Tracker</h1>
<p class="sub">Build consistency, one day at a time.</p>
<div class="add-row">
<input type="text" id="newHabit" placeholder="Add a new habit..." onkeydown="if(event.key==='Enter')addHabit()">
<button onclick="addHabit()">Add</button>
</div>
<div class="card">
<div class="days-header"><span></span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span><span>Streak</span></div>
<div id="habits"></div>
</div>
</div>
<script>
let habits=JSON.parse(localStorage.getItem('habits')||'[{"name":"Exercise","days":[true,true,false,true,true,false,false]},{"name":"Read 30 min","days":[true,true,true,true,false,false,false]},{"name":"No social media","days":[false,true,true,false,true,false,false]}]');
function save(){localStorage.setItem('habits',JSON.stringify(habits))}
function streak(days){let s=0;for(let i=days.length-1;i>=0;i--){if(days[i])s++;else break}return s}
function render(){
const c=document.getElementById('habits');c.innerHTML='';
habits.forEach((h,i)=>{
const row=document.createElement('div');row.className='habit-row';
let cells='<div class="habit-name"><button class="remove" onclick="habits.splice('+i+',1);save();render()">&times;</button>'+h.name+'</div>';
h.days.forEach((d,j)=>{cells+='<div class="check-cell"><input type="checkbox" '+(d?'checked':'')+' onchange="habits['+i+'].days['+j+']=this.checked;save();render()"></div>'});
cells+='<div class="streak">'+streak(h.days)+'</div>';
row.innerHTML=cells;c.appendChild(row);});
}
function addHabit(){
const input=document.getElementById('newHabit');
if(!input.value.trim())return;
habits.push({name:input.value.trim(),days:[false,false,false,false,false,false,false]});
input.value='';save();render();
}
render();
</script>
</body>
</html>`
  }

  if (lower.includes('waitlist') || lower.includes('email') || lower.includes('countdown')) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Waitlist</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',system-ui,sans-serif;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);min-height:100vh;display:flex;align-items:center;justify-content:center;color:#fff}
.page{text-align:center;max-width:480px;padding:40px}
h1{font-size:40px;font-weight:700;letter-spacing:-1px;margin-bottom:12px}
p{font-size:16px;opacity:.85;margin-bottom:32px;line-height:1.6}
.countdown{display:flex;justify-content:center;gap:16px;margin-bottom:40px}
.count-box{background:rgba(255,255,255,.15);backdrop-filter:blur(10px);border-radius:12px;padding:16px 20px;min-width:70px}
.count-box .num{font-size:28px;font-weight:700}
.count-box .label{font-size:11px;text-transform:uppercase;opacity:.7;margin-top:4px}
.form{display:flex;gap:8px;max-width:400px;margin:0 auto 24px}
.form input{flex:1;padding:14px 16px;border:none;border-radius:10px;font-size:14px;background:rgba(255,255,255,.95);color:#1e293b}
.form input:focus{outline:none}
.form button{background:#1e293b;color:#fff;border:none;padding:14px 24px;border-radius:10px;font-weight:600;font-size:14px;cursor:pointer;white-space:nowrap}
.form button:hover{background:#0f172a}
.count-text{font-size:14px;opacity:.75}
.success{display:none;background:rgba(255,255,255,.15);backdrop-filter:blur(10px);border-radius:12px;padding:20px;margin-top:16px}
.success h3{font-size:16px;margin-bottom:4px}
.success p{font-size:13px;opacity:.8;margin:0}
</style>
</head>
<body>
<div class="page">
<h1>Something big is coming</h1>
<p>We're building the future of solo entrepreneurship. Be the first to know when we launch.</p>
<div class="countdown" id="countdown">
<div class="count-box"><div class="num" id="days">00</div><div class="label">Days</div></div>
<div class="count-box"><div class="num" id="hours">00</div><div class="label">Hours</div></div>
<div class="count-box"><div class="num" id="mins">00</div><div class="label">Minutes</div></div>
<div class="count-box"><div class="num" id="secs">00</div><div class="label">Seconds</div></div>
</div>
<div class="form" id="formArea">
<input type="email" id="email" placeholder="you@example.com">
<button onclick="joinWaitlist()">Join waitlist</button>
</div>
<p class="count-text"><span id="signupCount">2,847</span> solopreneurs already signed up</p>
<div class="success" id="success"><h3>You're in!</h3><p>We'll email you when we launch. Share with friends to move up the list.</p></div>
</div>
<script>
const launch=new Date();launch.setDate(launch.getDate()+30);
function tick(){const now=new Date(),diff=launch-now;
if(diff<=0)return;
document.getElementById('days').textContent=String(Math.floor(diff/864e5)).padStart(2,'0');
document.getElementById('hours').textContent=String(Math.floor(diff%864e5/36e5)).padStart(2,'0');
document.getElementById('mins').textContent=String(Math.floor(diff%36e5/6e4)).padStart(2,'0');
document.getElementById('secs').textContent=String(Math.floor(diff%6e4/1e3)).padStart(2,'0')}
tick();setInterval(tick,1000);
function joinWaitlist(){
const email=document.getElementById('email').value;
if(!email||!email.includes('@'))return;
document.getElementById('formArea').style.display='none';
document.getElementById('success').style.display='block';
const c=document.getElementById('signupCount');
c.textContent=(parseInt(c.textContent.replace(',',''))+1).toLocaleString();
}
</script>
</body>
</html>`
  }

  // Default: a clean dashboard
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Generated App</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',system-ui,sans-serif;background:#f8fafc;padding:40px;color:#1e293b}
.app{max-width:800px;margin:0 auto}
h1{font-size:24px;font-weight:700;margin-bottom:8px}
.desc{color:#64748b;font-size:14px;margin-bottom:24px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:24px}
.card{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:20px}
.card h3{font-size:14px;font-weight:600;margin-bottom:4px}
.card .val{font-size:24px;font-weight:700;color:#6366f1}
.card .sub{font-size:12px;color:#94a3b8;margin-top:4px}
.content{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:24px}
.content h2{font-size:18px;font-weight:600;margin-bottom:16px}
.content p{font-size:14px;color:#475569;line-height:1.7}
</style>
</head>
<body>
<div class="app">
<h1>Your App</h1>
<p class="desc">Generated from: "${prompt.substring(0, 80)}..."</p>
<div class="grid">
<div class="card"><h3>Status</h3><div class="val">Active</div><div class="sub">Running smoothly</div></div>
<div class="card"><h3>Users</h3><div class="val">247</div><div class="sub">+12% this week</div></div>
<div class="card"><h3>Revenue</h3><div class="val">$1,840</div><div class="sub">MRR</div></div>
</div>
<div class="content">
<h2>Getting Started</h2>
<p>This is your generated app scaffold. Iterate on the prompt to customize the layout, add interactions, and match your vision. Try adding specific features like forms, charts, or data tables to your prompt.</p>
</div>
</div>
</body>
</html>`
}
