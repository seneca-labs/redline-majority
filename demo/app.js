/* Redline demo · slide model + editor + feedback engine */
"use strict";

const FOOTER_TEXT = "US-UNBC-001&nbsp;&nbsp;01/26.";
const W = 960, H = 540;
let uid = 100;
const nid = () => "e" + (uid++);

/* ---------------- slide data ---------------- */

function textEl(p){ return Object.assign({id:nid(),type:"text",size:12,weight:400,color:"#1a1a1a",align:"left",lh:1.4,ls:"0"},p); }
function shapeEl(p){ return Object.assign({id:nid(),type:"shape",bg:"#1a1a1a",radius:0},p); }
function imageEl(p){ return Object.assign({id:nid(),type:"image"},p); }

function makeSlides(){
  const slides = [];

  /* --- slide 1: storyboard --- */
  slides.push({label:"STORYBOARD", elements:[
    textEl({x:40,y:24,w:760,h:14,size:9,color:"#1a1a1a",content:"PART NUMBER: HIV Prevention_Care for the Culture_15 Second Storyboard_June 2026"}),
    textEl({x:40,y:44,w:700,h:30,size:22,weight:800,ls:"0.005em",content:'VIDEO STORYBOARD <span style="font-size:12px;font-weight:500;color:#6b6b6b">[15-second cut]</span>'}),
    shapeEl({x:40,y:80,w:520,h:3,bg:"#2b2b2b"}),
    imageEl({x:40,y:98,w:690,h:324,src:"assets/storyboard-creative.png"}),
    shapeEl({x:40,y:428,w:222,h:2,bg:"#2b2b2b"}),
    shapeEl({x:274,y:428,w:222,h:2,bg:"#2b2b2b"}),
    shapeEl({x:508,y:428,w:222,h:2,bg:"#2b2b2b"}),
    textEl({x:40,y:434,w:222,h:14,size:10,align:"center",content:"00:00 to 00:05"}),
    textEl({x:274,y:434,w:222,h:14,size:10,align:"center",content:"00:05 to 00:10"}),
    textEl({x:508,y:434,w:222,h:14,size:10,align:"center",content:"00:10 to 00:15"}),
    textEl({id:"sb_footer_el",x:660,y:512,w:260,h:14,size:9,align:"right",content:FOOTER_TEXT}),
  ]});

  /* --- slide 2: social post --- */
  slides.push({label:"SOCIAL", elements:[
    textEl({x:40,y:24,w:760,h:14,size:9,content:"PART NUMBER: HIV Prevention_Care for the Culture_Social In-Feed_June 2026"}),
    textEl({x:40,y:44,w:700,h:30,size:22,weight:800,content:'SOCIAL POST <span style="font-size:12px;font-weight:500;color:#6b6b6b">[instagram in-feed]</span>'}),
    shapeEl({x:40,y:80,w:520,h:3,bg:"#2b2b2b"}),
    shapeEl({x:600,y:92,w:300,h:412,bg:"#ffffff",radius:12,border:"1px solid #e5e3df"}),
    shapeEl({x:614,y:104,w:26,h:26,bg:"#1a1a1a",radius:999}),
    textEl({x:650,y:105,w:160,h:14,size:11,weight:700,content:"carefortheculture"}),
    textEl({x:650,y:119,w:160,h:12,size:9,color:"#6b6b6b",content:"Sponsored"}),
    imageEl({id:"so_photo",x:600,y:140,w:300,h:240,src:"assets/social-creative.png"}),
    shapeEl({id:"so_ctabar",x:600,y:380,w:300,h:34,bg:"#f5f4f2"}),
    textEl({id:"so_ctatext",x:616,y:389,w:140,h:16,size:11,weight:600,content:"Learn more"}),
    textEl({x:872,y:386,w:16,h:20,size:13,color:"#6b6b6b",content:"&rsaquo;"}),
    textEl({id:"so_caption",x:614,y:422,w:272,h:66,size:10.5,lh:1.5,content:"<b>carefortheculture</b> one night. real talk. superior protection starts here. pull up."}),
    textEl({x:660,y:512,w:260,h:14,size:9,align:"right",content:FOOTER_TEXT}),
  ]});

  /* --- slide 3: flyer / banner --- */
  slides.push({label:"FLYER", elements:[
    textEl({x:40,y:24,w:760,h:14,size:9,content:"PART NUMBER: HIV Prevention_Care for the Culture_Event Flyer_June 2026"}),
    textEl({x:40,y:44,w:700,h:30,size:22,weight:800,content:'EVENT FLYER <span style="font-size:12px;font-weight:500;color:#6b6b6b">[print + digital banner]</span>'}),
    shapeEl({x:40,y:80,w:520,h:3,bg:"#2b2b2b"}),
    imageEl({x:300,y:98,w:620,h:291,src:"assets/flyer-creative.png"}),
    textEl({x:324,y:126,w:270,h:70,size:25,weight:800,lh:1.15,content:"the feed.<br>tonight only."}),
    textEl({x:324,y:206,w:230,h:36,size:11.5,lh:1.5,content:"music. community. free HIV prevention info."}),
    shapeEl({id:"fl_ctabtn",x:324,y:256,w:126,h:36,bg:"#1a1a1a",radius:999}),
    textEl({id:"fl_ctatext",x:324,y:266,w:126,h:16,size:12,weight:600,color:"#ffffff",align:"center",content:"rsvp now"}),
    textEl({id:"fl_fine",x:300,y:400,w:620,h:26,size:8.5,color:"#6b6b6b",lh:1.5,content:"all talent compensated by gilead. for US audiences only."}),
  ]});

  return slides;
}

/* ---------------- per-slide rail config ---------------- */

const RAIL = [
  {
    title:"Storyboard sequence checks",
    scope:"Saved for C4TC · Storyboard",
    author:"D'Andra Gill",
    feedback:"Confirm the three frames read left to right. Keep the timing visible and use one short sequence note. Confirm the case and date footer is on the page.",
    toggles:[{tl:"Functionality",td:"Buttons and screen behavior",on:true}],
    checks:[
      {cl:"Three frames read left to right",pass:true},
      {cl:"Each frame has a timing label",pass:true},
      {cl:"One playback note is present",pass:false,key:"sb_note"},
      {cl:"Case and date footer is present",pass:true},
    ],
    rules:[
      {re:/left to right|sequence|order|read/i,label:"Add one playback note under the frames",chip:"Annotation",cc:"chip-purple",action:"sb_note"},
      {re:/timing|hold|seconds/i,label:"Verify each frame keeps its timing label",chip:"Format",cc:"chip-yellow",action:"sb_timing"},
      {re:/footer|case|date/i,label:"Confirm the case and date footer",chip:"Format",cc:"chip-yellow",action:"sb_footer"},
    ],
    comments:[
      {n:1,st:"accept",tx:"Please confirm the frames read left to right and add one sequence note.",sp:"D'Andra Gill",
        replies:[{st:"accept",tx:"Added the playback note under frame two.",sp:"Chris Keel"}]},
      {n:2,st:"leave",tx:"Timing supers stay as five second holds.",sp:"Nikki Crump"},
      {n:3,st:"accept",tx:"Case and date footer required on every page.",sp:"Cassandra Nunez"},
    ],
  },
  {
    title:"Social claim and variable checks",
    scope:"Saved for C4TC · Social",
    author:"Beth McCann",
    feedback:"Soften superior protection in the caption, we cannot rank claims. Outline the community photo as variable content since it rotates by market. Add the functionality note for the Learn more button directly on the button.",
    toggles:[
      {tl:"Functionality",td:"Buttons and screen behavior",on:true},
      {tl:"Variable content",td:"Magenta outline on rotating assets",on:true},
    ],
    checks:[
      {cl:"Caption avoids ranking claims",pass:false,key:"so_soften"},
      {cl:"Variable content is outlined in magenta",pass:false,key:"so_magenta"},
      {cl:"CTA has a functionality note",pass:false,key:"so_cta"},
      {cl:"Case and date footer is present",pass:true},
    ],
    rules:[
      {re:/superior|claim|soften|rank/i,label:"Soften the ranking claim in the caption",chip:"Copy",cc:"chip-blue",action:"so_soften"},
      {re:/variable|rotate|outline|photo/i,label:"Outline the community photo as variable content",chip:"Annotation",cc:"chip-purple",action:"so_magenta"},
      {re:/learn more|button|functionality|cta/i,label:"Add the Learn more functionality note on the button",chip:"Annotation",cc:"chip-purple",action:"so_cta"},
    ],
    comments:[
      {n:1,st:"accept",tx:"Superior reads as a ranking claim. Please soften.",sp:"Beth McCann",
        replies:[{st:"accept",tx:"Updated to prevention info that fits your life.",sp:"Chris Keel"}]},
      {n:2,st:"accept",tx:"Outline the community photo as variable content.",sp:"Mandy Maiden on behalf of Lesley Andrews"},
      {n:3,st:"discuss",tx:"Confirm the Learn more destination stays in the in-app browser.",sp:"D'Andra Gill"},
    ],
  },
  {
    title:"Flyer functionality and footer checks",
    scope:"Saved for C4TC · Flyer",
    author:"Cassandra Nunez",
    feedback:"Put the functionality note for the rsvp button directly on the button. Add the healthcare provider line to the fine print. The case and date footer is missing on this page.",
    toggles:[
      {tl:"Functionality",td:"Buttons and screen behavior",on:true},
      {tl:"Claims and references",td:"Footnotes and fine print",on:true},
    ],
    checks:[
      {cl:"CTA has a functionality note",pass:false,key:"fl_cta"},
      {cl:"Fine print includes the HCP line",pass:false,key:"fl_hcp"},
      {cl:"Case and date footer is present",pass:false,key:"fl_footer"},
      {cl:"Part number header is present",pass:true},
    ],
    rules:[
      {re:/rsvp|button|functionality/i,label:"Add the rsvp functionality note on the button",chip:"Annotation",cc:"chip-purple",action:"fl_cta"},
      {re:/healthcare|provider|hcp|fine print/i,label:"Add the healthcare provider line to the fine print",chip:"Copy",cc:"chip-blue",action:"fl_hcp"},
      {re:/footer|case|date|missing/i,label:"Add the case and date footer to this page",chip:"Format",cc:"chip-yellow",action:"fl_footer"},
    ],
    comments:[
      {n:1,st:"accept",tx:"Insert: talk to a healthcare provider and visit carefortheculture.com.",sp:"D'Andra Gill"},
      {n:2,st:"accept",tx:"Functionality note belongs directly on the rsvp button.",sp:"Nikki Crump"},
      {n:3,st:"accept",tx:"This page is missing the case and date footer.",sp:"Cassandra Nunez"},
    ],
  },
];

/* ---------------- actions applied by checklist items ---------------- */

const ACTIONS = {
  sb_note(){
    addElement(0,{id:nid(),type:"annotation",x:64,y:460,w:474,h:44,
      content:'<span><i class="rl">NOTE TO REVIEWER:</i> Sequence plays left to right. Each frame holds for five seconds.</span>',
      anchor:{x:385,y:430}});
  },
  sb_timing(){ flashElements(0, el => (el.content||"").includes("00:0")); },
  sb_footer(){ flashElements(0, el => el.id==="sb_footer_el"); },

  so_soften(){
    setContent(1,"so_caption","<b>carefortheculture</b> one night. real talk. prevention info that fits your life. pull up.",true);
  },
  so_magenta(){
    addElement(1,{id:nid(),type:"magenta",x:595,y:135,w:310,h:250});
    addElement(1,{id:nid(),type:"annotation",x:64,y:212,w:440,h:56,
      content:'<span><i class="rlb">GLOBAL:</i> Content outlined in magenta is variable content. Community photos rotate by market.</span>',
      anchor:{x:595,y:250}});
  },
  so_cta(){
    addElement(1,{id:nid(),type:"annotation",x:236,y:374,w:352,h:46,
      content:"<span><i class=\"rl\">'Learn more':</i> opens carefortheculture.com in the in-app browser.</span>",
      anchor:{x:606,y:397}});
  },

  fl_cta(){
    addElement(2,{id:nid(),type:"annotation",x:36,y:252,w:254,h:44,
      content:"<span><i class=\"rl\">'rsvp now':</i> opens the event RSVP form (page 2).</span>",
      anchor:{x:330,y:274}});
  },
  fl_hcp(){
    setContent(2,"fl_fine","all talent compensated by gilead. for US audiences only. talk to a healthcare provider and visit carefortheculture.com.",true);
  },
  fl_footer(){
    addElement(2,{id:nid(),type:"text",x:660,y:512,w:260,h:14,size:9,weight:400,color:"#1a1a1a",align:"right",lh:1.4,ls:"0",content:FOOTER_TEXT});
  },
};

/* ---------------- state ---------------- */

const state = {
  slides: makeSlides(),
  cur: 0,
  sel: null,
  zoom: 1,
  tool: "select",
  undo: [], redo: [],
  manual: [],
  anchorCount: 0,
  per: RAIL.map(r => ({feedback:r.feedback, items:[], built:false,
    checks: r.checks.map(c => ({...c})),
    toggles: r.toggles.map(t => ({...t}))})),
};

/* ---------------- dom refs ---------------- */
const $ = s => document.querySelector(s);
const slideRoot = $("#slideRoot"), thumbsBox = $("#thumbs");
const menuLayer = $("#menuLayer"), modalLayer = $("#modalLayer");

/* ---------------- rendering ---------------- */

function renderElement(el){
  const d = document.createElement("div");
  d.className = "el el-" + el.type;
  d.dataset.id = el.id;
  d.style.left = el.x+"px"; d.style.top = el.y+"px";
  d.style.width = el.w+"px"; d.style.height = el.h+"px";
  if(el.type==="text"){
    const t = document.createElement("div");
    t.className = "txt";
    t.style.fontSize = el.size+"px";
    t.style.fontWeight = el.weight;
    t.style.color = el.color;
    t.style.textAlign = el.align;
    t.style.lineHeight = el.lh;
    t.style.letterSpacing = el.ls;
    t.innerHTML = el.content;
    d.appendChild(t);
  } else if(el.type==="image"){
    d.style.backgroundImage = `url('${el.src}')`;
  } else if(el.type==="shape"){
    d.style.background = el.bg;
    d.style.borderRadius = (el.radius||0)+"px";
    if(el.border) d.style.border = el.border;
  } else if(el.type==="annotation"){
    d.innerHTML = el.content;
    d.style.fontSize = "11px";
  } else if(el.type==="anchorbox"){
    d.innerHTML = `<span class="num">${el.num}</span>`;
  }
  return d;
}

function leaderFor(el){
  /* line from annotation box edge to its anchor point */
  const cx = el.x + el.w/2, cy = el.y + el.h/2;
  const ax = el.anchor.x, ay = el.anchor.y;
  const dx = ax-cx, dy = ay-cy;
  let sx, sy;
  if(Math.abs(dx)*el.h > Math.abs(dy)*el.w){
    sx = dx>0 ? el.x+el.w : el.x;
    sy = cy + dy*( (sx-cx)/dx );
  } else {
    sy = dy>0 ? el.y+el.h : el.y;
    sx = cx + dx*( (sy-cy)/dy );
  }
  return {sx,sy,ax,ay};
}

function renderSlide(slide, root, opts={}){
  root.innerHTML = "";
  const svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
  svg.setAttribute("class","leaders");
  svg.setAttribute("viewBox",`0 0 ${W} ${H}`);
  slide.elements.forEach(el => {
    const node = renderElement(el);
    if(opts.animateIds && opts.animateIds.includes(el.id)) node.classList.add("ann-in");
    if(opts.flashIds && opts.flashIds.includes(el.id)) node.classList.add("flash");
    root.appendChild(node);
    if(el.type==="annotation" && el.anchor){
      const {sx,sy,ax,ay} = leaderFor(el);
      const ln = document.createElementNS("http://www.w3.org/2000/svg","line");
      ln.setAttribute("x1",sx); ln.setAttribute("y1",sy);
      ln.setAttribute("x2",ax); ln.setAttribute("y2",ay);
      if(opts.animateIds && opts.animateIds.includes(el.id)) ln.setAttribute("class","leader-in");
      svg.appendChild(ln);
    }
  });
  root.appendChild(svg);
}

function renderThumbs(){
  thumbsBox.innerHTML = "";
  state.slides.forEach((s,i) => {
    const row = document.createElement("div");
    row.className = "thumbrow" + (i===state.cur?" active":"");
    row.innerHTML = `<span class="thumbnum">${i+1}</span>`;
    const box = document.createElement("div"); box.className="thumbbox";
    const t = document.createElement("div"); t.className="thumbslide";
    const inner = document.createElement("div"); inner.className="slideinner";
    renderSlide(s, inner);
    t.appendChild(inner);
    box.appendChild(t);
    const lab = document.createElement("span"); lab.className="thumblabel"; lab.textContent = s.label;
    box.appendChild(lab);
    row.appendChild(box);
    row.addEventListener("click",()=>gotoSlide(i));
    thumbsBox.appendChild(row);
  });
}

function rerender(opts={}){
  renderSlide(state.slides[state.cur], slideRoot, opts);
  renderThumbs();
  drawSelection();
}

/* ---------------- rail ---------------- */

function railFor(i){ return RAIL[Math.min(i, RAIL.length-1)]; }
function perFor(i){
  if(!state.per[i]) state.per[i] = {feedback:"", items:[], built:false, checks:[], toggles:[{tl:"Functionality",td:"Buttons and screen behavior",on:true}]};
  return state.per[i];
}

function renderRail(){
  const i = state.cur, r = railFor(i), p = perFor(i);
  $("#slideChip").textContent = "Slide " + (i+1);
  $("#railTitle").textContent = r.title;
  $("#annScope").textContent = r.scope;
  $("#fbAuthor").textContent = r.author;
  $("#feedbackInput").value = p.feedback;

  /* checklist items */
  const box = $("#checklistItems"); box.innerHTML = "";
  p.items.forEach((it,idx) => {
    const d = document.createElement("div");
    d.className = "item" + (it.done?" done":"");
    d.style.animationDelay = it.fresh ? (idx*0.12)+"s" : "0s";
    d.innerHTML = `
      <span class="stat">${it.done?"✓":""}</span>
      <div class="body">
        <div class="lbl">${it.label}</div>
        <div class="meta"><span class="chip ${it.cc}">${it.chip}</span><span class="src">from "${it.src}"</span></div>
      </div>
      <button class="applybtn" ${it.done?"disabled":""}>${it.done?"Applied":"Apply"}</button>`;
    d.querySelector(".applybtn").addEventListener("click",()=>applyItem(i,idx));
    box.appendChild(d);
  });
  p.items.forEach(it=>it.fresh=false);

  const aw = $("#applyAllWrap"); aw.innerHTML = "";
  if(p.items.some(it=>!it.done)){
    const b = document.createElement("button");
    b.className="applyall"; b.textContent="Apply all remaining";
    b.addEventListener("click",()=>applyAll(i));
    aw.appendChild(b);
  }

  /* count chip = unapplied items, or rule count preview before build */
  const pending = p.built ? p.items.filter(it=>!it.done).length : (r.rules?r.rules.length:0);
  $("#chkCount").textContent = pending;
  $("#chkCount").style.display = pending? "inline-flex":"none";

  /* toggles */
  const tg = $("#annToggles"); tg.innerHTML = "";
  p.toggles.forEach(t => {
    const row = document.createElement("div"); row.className="togglerow";
    row.innerHTML = `<div><div class="tl">${t.tl}</div><div class="td">${t.td}</div></div><div class="switch ${t.on?"on":""}"></div>`;
    row.querySelector(".switch").addEventListener("click",e=>{t.on=!t.on;e.currentTarget.classList.toggle("on");});
    tg.appendChild(row);
  });

  renderChecks();
  renderComments();
}

function renderChecks(justKey){
  const p = perFor(state.cur);
  const fc = $("#formatChecks"); fc.innerHTML = "";
  let passed = 0;
  p.checks.forEach(c => {
    if(c.pass) passed++;
    const row = document.createElement("div");
    row.className = "checkrow " + (c.pass?"pass":"fail") + (justKey && c.key===justKey ? " justpassed":"");
    row.innerHTML = `<span class="ic">${c.pass?"✓":""}</span><span class="cl">${c.cl}</span>`;
    fc.appendChild(row);
  });
  $("#checksCount").textContent = passed + " of " + p.checks.length + " passed";
}

function renderComments(){
  const r = railFor(state.cur);
  const box = $("#railComments"); box.innerHTML = "";
  const stHtml = st => st==="accept" ? '<span class="status-accept">Accept</span>'
    : st==="discuss" ? '<span class="status-discuss">Discuss</span>'
    : '<span class="status-leave">Leave As-Is</span>';
  (r.comments||[]).forEach(c => {
    const d = document.createElement("div"); d.className="cthread";
    let html = `<div class="cmt"><span class="num">${c.n}.</span> ${stHtml(c.st)} ${c.tx} <span class="spk">[${c.sp}]</span></div>`;
    (c.replies||[]).forEach(rp => {
      html += `<div class="creply">${stHtml(rp.st)} ${rp.tx} <span class="spk">[${rp.sp}]</span></div>`;
    });
    d.innerHTML = html;
    box.appendChild(d);
  });
  $("#cmtCount").textContent = (r.comments||[]).length;
}

/* ---------------- feedback engine ---------------- */

function buildChecklist(){
  const i = state.cur, r = railFor(i), p = perFor(i);
  p.feedback = $("#feedbackInput").value;
  const btn = $("#buildBtn");
  btn.disabled = true; btn.textContent = "Reading feedback…";
  setTimeout(()=>{
    const sentences = p.feedback.split(/(?<=[.!?])\s+|\n+/).map(s=>s.trim()).filter(Boolean);
    const used = new Set(p.items.map(it=>it.action));
    sentences.forEach(s => {
      const rule = (r.rules||[]).find(ru => ru.re.test(s) && !used.has(ru.action));
      if(rule){
        used.add(rule.action);
        p.items.push({label:rule.label, chip:rule.chip, cc:rule.cc, action:rule.action,
          src: s.length>46 ? s.slice(0,44)+"…" : s, done:false, fresh:true});
      } else if(s.length > 12){
        p.items.push({label:"Route to the creative team for review", chip:"Manual", cc:"chip-orange",
          action:null, src: s.length>46 ? s.slice(0,44)+"…" : s, done:false, fresh:true});
      }
    });
    p.built = true;
    btn.disabled = false; btn.textContent = "Build update checklist";
    renderRail();
    toast(p.items.length + " updates mapped to this slide");
    flickSave();
  }, 650);
}

function applyItem(slideIdx, itemIdx, cb){
  const p = perFor(slideIdx);
  const it = p.items[itemIdx];
  if(!it || it.done) { cb && cb(); return; }
  it.done = true;
  pushUndo();
  if(it.action && ACTIONS[it.action]) ACTIONS[it.action]();
  const check = p.checks.find(c => c.key === it.action);
  if(check) check.pass = true;
  renderRail();
  if(check) renderChecks(it.action);
  flickSave();
  cb && cb();
}

function applyAll(slideIdx){
  const p = perFor(slideIdx);
  const queue = p.items.map((it,idx)=>({it,idx})).filter(o=>!o.it.done);
  let k = 0;
  const step = () => {
    if(k >= queue.length){ toast("All feedback applied. Format checks pass."); return; }
    applyItem(slideIdx, queue[k].idx);
    k++;
    setTimeout(step, 750);
  };
  step();
}

/* slide mutations used by actions */
function addElement(slideIdx, el){
  state.slides[slideIdx].elements.push(el);
  if(slideIdx === state.cur) rerender({animateIds:[el.id]});
  else renderThumbs();
}
function setContent(slideIdx, elId, content, flash){
  const el = state.slides[slideIdx].elements.find(e=>e.id===elId);
  if(!el) return;
  el.content = content;
  if(slideIdx === state.cur) rerender(flash?{flashIds:[elId]}:{ });
  else renderThumbs();
}
function flashElements(slideIdx, pred){
  const ids = state.slides[slideIdx].elements.filter(pred).map(e=>e.id);
  if(slideIdx === state.cur) rerender({flashIds:ids});
}

/* ---------------- undo / redo / save ---------------- */

function pushUndo(){
  state.undo.push(JSON.stringify(state.slides));
  if(state.undo.length>100) state.undo.shift();
  state.redo = [];
}
function doUndo(){
  if(!state.undo.length) return;
  state.redo.push(JSON.stringify(state.slides));
  state.slides = JSON.parse(state.undo.pop());
  state.sel = null; rerender(); flickSave();
}
function doRedo(){
  if(!state.redo.length) return;
  state.undo.push(JSON.stringify(state.slides));
  state.slides = JSON.parse(state.redo.pop());
  state.sel = null; rerender(); flickSave();
}
let saveT;
function flickSave(){
  const s = $("#saveState");
  s.classList.add("saving"); s.querySelector("em").textContent = "Saving…";
  clearTimeout(saveT);
  saveT = setTimeout(()=>{ s.classList.remove("saving"); s.querySelector("em").textContent="Saved"; }, 800);
}
function logManual(desc){
  state.manual.push({desc, at:new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})});
}

/* ---------------- selection + editing ---------------- */

function curSlide(){ return state.slides[state.cur]; }
function findEl(id){ return curSlide().elements.find(e=>e.id===id); }

function drawSelection(){
  document.querySelectorAll(".selbox").forEach(n=>n.remove());
  if(!state.sel) return;
  const el = findEl(state.sel);
  if(!el){ state.sel=null; return; }
  const box = document.createElement("div");
  box.className = "selbox";
  box.style.left = (el.x-1)+"px"; box.style.top = (el.y-1)+"px";
  box.style.width = (el.w+2)+"px"; box.style.height = (el.h+2)+"px";
  ["nw","n","ne","e","se","s","sw","w"].forEach(h=>{
    const hd = document.createElement("div");
    hd.className = "handle h-"+h; hd.dataset.h = h;
    box.appendChild(hd);
  });
  slideRoot.appendChild(box);
}

let drag = null;
slideRoot.addEventListener("mousedown", e => {
  const handle = e.target.closest(".handle");
  const node = e.target.closest(".el");
  if(handle && state.sel){
    const el = findEl(state.sel);
    drag = {mode:"resize", h:handle.dataset.h, el, sx:e.clientX, sy:e.clientY, ox:el.x, oy:el.y, ow:el.w, oh:el.h};
    pushUndo(); e.preventDefault(); return;
  }
  if(node){
    const el = findEl(node.dataset.id);
    if(!el) return;
    if(state.tool !== "select"){ return; }
    state.sel = el.id; drawSelection();
    drag = {mode:"move", el, sx:e.clientX, sy:e.clientY, ox:el.x, oy:el.y, moved:false};
    e.preventDefault();
  } else {
    /* empty canvas click: insert tools */
    const rect = slideRoot.getBoundingClientRect();
    const x = Math.round((e.clientX-rect.left)/state.zoom), y = Math.round((e.clientY-rect.top)/state.zoom);
    if(state.tool==="text"){ insertNew(textEl({x,y,w:220,h:28,size:14,content:"Text"})); }
    else if(state.tool==="shape"){ insertNew(shapeEl({x,y,w:160,h:100,bg:"#ece9fb",radius:8})); }
    else if(state.tool==="line"){ insertNew(shapeEl({x,y,w:180,h:2,bg:"#1a1a1a"})); }
    else if(state.tool==="annotation"){ insertNew({id:nid(),type:"annotation",x,y,w:280,h:40,content:'<span><i class="rl">NOTE TO REVIEWER:</i> new annotation.</span>'}); }
    else if(state.tool==="comment"){ state.anchorCount++; insertNew({id:nid(),type:"anchorbox",x,y,w:34,h:26,num:state.anchorCount}); }
    else if(state.tool==="image"){ openAssetPicker(x,y); }
    else { state.sel = null; drawSelection(); }
    if(state.tool!=="select" && state.tool!=="image") setTool("select");
  }
});
window.addEventListener("mousemove", e => {
  if(!drag) return;
  const dx = (e.clientX-drag.sx)/state.zoom, dy = (e.clientY-drag.sy)/state.zoom;
  if(drag.mode==="move"){
    if(!drag.moved && (Math.abs(dx)>2||Math.abs(dy)>2)){ drag.moved=true; pushUndo(); }
    if(drag.moved){
      drag.el.x = Math.round(drag.ox+dx); drag.el.y = Math.round(drag.oy+dy);
      rerender();
    }
  } else if(drag.mode==="resize"){
    const h = drag.h, el = drag.el;
    if(h.includes("e")) el.w = Math.max(14, Math.round(drag.ow+dx));
    if(h.includes("s")) el.h = Math.max(10, Math.round(drag.oh+dy));
    if(h.includes("w")){ el.w = Math.max(14, Math.round(drag.ow-dx)); el.x = Math.round(drag.ox + (drag.ow-el.w)); }
    if(h.includes("n")){ el.h = Math.max(10, Math.round(drag.oh-dy)); el.y = Math.round(drag.oy + (drag.oh-el.h)); }
    rerender();
  }
});
window.addEventListener("mouseup", () => {
  if(drag && drag.moved){ logManual("Moved an object on slide "+(state.cur+1)); flickSave(); }
  if(drag && drag.mode==="resize"){ logManual("Resized an object on slide "+(state.cur+1)); flickSave(); }
  drag = null;
});

slideRoot.addEventListener("dblclick", e => {
  const node = e.target.closest(".el");
  if(!node) return;
  const el = findEl(node.dataset.id);
  if(!el || (el.type!=="text" && el.type!=="annotation")) return;
  const t = el.type==="text" ? node.querySelector(".txt") : node;
  node.classList.add("editing");
  t.contentEditable = "true"; t.focus();
  document.execCommand("selectAll", false, null);
  pushUndo();
  const commit = () => {
    t.contentEditable = "false"; node.classList.remove("editing");
    el.content = t.innerHTML;
    logManual("Edited text on slide "+(state.cur+1));
    rerender(); flickSave();
    t.removeEventListener("blur", commit);
  };
  t.addEventListener("blur", commit);
});

function insertNew(el){
  pushUndo();
  curSlide().elements.push(el);
  state.sel = el.id;
  logManual("Inserted a "+el.type+" on slide "+(state.cur+1));
  rerender({animateIds:[el.id]}); flickSave();
}

/* keyboard */
window.addEventListener("keydown", e => {
  const tag = document.activeElement && document.activeElement.tagName;
  const editing = tag==="TEXTAREA" || tag==="INPUT" || (document.activeElement && document.activeElement.isContentEditable);
  if((e.metaKey||e.ctrlKey) && e.key.toLowerCase()==="z"){
    if(editing) return;
    e.preventDefault(); e.shiftKey ? doRedo() : doUndo(); return;
  }
  if(!$("#presentLayer").classList.contains("hidden")){
    if(e.key==="ArrowRight"||e.key===" ") presentGo(1);
    if(e.key==="ArrowLeft") presentGo(-1);
    if(e.key==="Escape") exitPresent();
    return;
  }
  if(editing) return;
  if((e.metaKey||e.ctrlKey) && e.key.toLowerCase()==="d" && state.sel){
    e.preventDefault(); duplicateSel(); return;
  }
  if(state.sel){
    const el = findEl(state.sel);
    if(!el) return;
    const step = e.shiftKey?10:1;
    if(e.key==="Backspace"||e.key==="Delete"){
      pushUndo();
      curSlide().elements = curSlide().elements.filter(x=>x.id!==state.sel);
      state.sel=null; logManual("Deleted an object on slide "+(state.cur+1));
      rerender(); flickSave(); e.preventDefault();
    }
    else if(e.key==="ArrowLeft"){ pushUndo(); el.x-=step; rerender(); e.preventDefault(); }
    else if(e.key==="ArrowRight"){ pushUndo(); el.x+=step; rerender(); e.preventDefault(); }
    else if(e.key==="ArrowUp"){ pushUndo(); el.y-=step; rerender(); e.preventDefault(); }
    else if(e.key==="ArrowDown"){ pushUndo(); el.y+=step; rerender(); e.preventDefault(); }
    else if(e.key==="Escape"){ state.sel=null; drawSelection(); }
  }
});

function duplicateSel(){
  const el = findEl(state.sel);
  if(!el) return;
  pushUndo();
  const copy = JSON.parse(JSON.stringify(el));
  copy.id = nid(); copy.x += 16; copy.y += 16;
  curSlide().elements.push(copy);
  state.sel = copy.id;
  rerender({animateIds:[copy.id]}); flickSave();
}

/* ---------------- tools / toolbar ---------------- */

function setTool(t){
  state.tool = t;
  document.querySelectorAll(".tbtn.tool").forEach(b=>b.classList.toggle("active", b.dataset.tool===t));
}
document.querySelectorAll(".tbtn.tool").forEach(b=>b.addEventListener("click",()=>setTool(b.dataset.tool)));

$("#undoBtn").addEventListener("click",doUndo);
$("#redoBtn").addEventListener("click",doRedo);
$("#printBtn").addEventListener("click",()=>window.print());

const ZOOMS=[0.5,0.75,1,1.25,1.5,2];
function setZoom(z){
  state.zoom = z;
  $("#slideWrap").style.transform = `scale(${z})`;
  $("#zoomBtn").childNodes[0].textContent = Math.round(z*100)+"% ";
}
$("#zoomBtn").addEventListener("click", e => {
  openMenu(e.currentTarget, ZOOMS.map(z=>({label:Math.round(z*100)+"%", act:()=>setZoom(z)})));
});

/* ---------------- slides nav ---------------- */

function gotoSlide(i){
  state.cur = Math.max(0, Math.min(state.slides.length-1, i));
  state.sel = null;
  rerender(); renderRail();
}

function newSlide(){
  pushUndo();
  state.slides.push({label:"NEW", elements:[
    textEl({x:40,y:24,w:760,h:14,size:9,content:"PART NUMBER: HIV Prevention_Care for the Culture_New Asset_June 2026"}),
    textEl({x:40,y:44,w:700,h:30,size:22,weight:800,content:'NEW PAGE <span style="font-size:12px;font-weight:500;color:#6b6b6b">[asset]</span>'}),
    shapeEl({x:40,y:80,w:520,h:3,bg:"#2b2b2b"}),
    textEl({x:660,y:512,w:260,h:14,size:9,align:"right",content:FOOTER_TEXT}),
  ]});
  gotoSlide(state.slides.length-1); flickSave();
}
function duplicateSlide(){
  pushUndo();
  const copy = JSON.parse(JSON.stringify(curSlide()));
  copy.elements.forEach(e=>e.id=nid());
  state.slides.splice(state.cur+1,0,copy);
  gotoSlide(state.cur+1); flickSave();
}
function deleteSlide(){
  if(state.slides.length<=1) return;
  pushUndo();
  state.slides.splice(state.cur,1);
  gotoSlide(Math.min(state.cur, state.slides.length-1)); flickSave();
}
function moveSlide(dir){
  const j = state.cur+dir;
  if(j<0||j>=state.slides.length) return;
  pushUndo();
  const [s] = state.slides.splice(state.cur,1);
  state.slides.splice(j,0,s);
  gotoSlide(j); flickSave();
}

$("#addSlideBtn").addEventListener("click",newSlide);
$("#addSlideCaret").addEventListener("click",e=>{
  openMenu(e.currentTarget,[
    {label:"New slide",act:newSlide},
    {label:"Duplicate current slide",act:duplicateSlide},
  ]);
});

/* ---------------- menus ---------------- */

function openMenu(anchor, items){
  menuLayer.innerHTML = "";
  menuLayer.classList.add("open");
  const m = document.createElement("div");
  m.className = "menu";
  items.forEach(it=>{
    if(it==="sep"){ const s=document.createElement("div"); s.className="msep"; m.appendChild(s); return; }
    const b = document.createElement("button");
    b.className = "mi";
    b.innerHTML = `<span>${it.label}</span>${it.kbd?`<span class="kbd">${it.kbd}</span>`:""}`;
    b.addEventListener("click",()=>{ closeMenu(); it.act && it.act(); });
    m.appendChild(b);
  });
  const r = anchor.getBoundingClientRect();
  m.style.left = Math.min(r.left, window.innerWidth-260)+"px";
  m.style.top = (r.bottom+6)+"px";
  menuLayer.appendChild(m);
}
function closeMenu(){
  menuLayer.classList.remove("open"); menuLayer.innerHTML="";
  document.querySelectorAll(".menubar button").forEach(b=>b.classList.remove("open"));
}
menuLayer.addEventListener("mousedown", e => { if(e.target===menuLayer) closeMenu(); });

const MENUS = {
  file: [
    {label:"Rename", act:renameDoc},
    {label:"Make a copy", act:()=>toast("Copy created in your Redline library")},
    "sep",
    {label:"Download as JSON", act:downloadJson},
    {label:"Print", kbd:"⌘P", act:()=>window.print()},
  ],
  edit: [
    {label:"Undo", kbd:"⌘Z", act:doUndo},
    {label:"Redo", kbd:"⇧⌘Z", act:doRedo},
    "sep",
    {label:"Duplicate", kbd:"⌘D", act:()=>state.sel&&duplicateSel()},
    {label:"Delete", kbd:"⌫", act:()=>{ if(state.sel){ pushUndo(); curSlide().elements=curSlide().elements.filter(x=>x.id!==state.sel); state.sel=null; rerender(); flickSave(); } }},
  ],
  view: [
    {label:"Zoom in", act:()=>setZoom(Math.min(2,state.zoom+0.25))},
    {label:"Zoom out", act:()=>setZoom(Math.max(0.5,state.zoom-0.25))},
    {label:"Zoom 100%", act:()=>setZoom(1)},
    "sep",
    {label:"Present", act:startPresent},
  ],
  insert: [
    {label:"Text box", act:()=>setTool("text")},
    {label:"Image", act:()=>openAssetPicker(330,200)},
    {label:"Shape", act:()=>setTool("shape")},
    {label:"Line", act:()=>setTool("line")},
    "sep",
    {label:"Annotation box", act:()=>setTool("annotation")},
    {label:"Comment anchor", act:()=>setTool("comment")},
  ],
  slide: [
    {label:"New slide", act:newSlide},
    {label:"Duplicate slide", act:duplicateSlide},
    {label:"Delete slide", act:deleteSlide},
    "sep",
    {label:"Move slide up", act:()=>moveSlide(-1)},
    {label:"Move slide down", act:()=>moveSlide(1)},
  ],
  arrange: [
    {label:"Bring to front", act:()=>zOrder(1)},
    {label:"Send to back", act:()=>zOrder(-1)},
    "sep",
    {label:"Align left", act:()=>alignSel("left")},
    {label:"Align center", act:()=>alignSel("center")},
    {label:"Align right", act:()=>alignSel("right")},
    {label:"Align top", act:()=>alignSel("top")},
    {label:"Align middle", act:()=>alignSel("middle")},
    {label:"Align bottom", act:()=>alignSel("bottom")},
  ],
  tools: [
    {label:"Run format checks", act:()=>{ renderChecks(); switchTab("checklist"); toast("Format checks refreshed"); }},
    {label:"Veeva checklist", act:openVeeva},
    {label:"Check manual changes", act:openDiff},
  ],
  help: [
    {label:"About Redline", act:openAbout},
    {label:"Keyboard shortcuts", act:openShortcuts},
  ],
};
document.querySelectorAll(".menubar button").forEach(b=>{
  b.addEventListener("click",()=>{
    b.classList.add("open");
    openMenu(b, MENUS[b.dataset.menu]);
  });
});

function zOrder(dir){
  if(!state.sel) return;
  pushUndo();
  const arr = curSlide().elements;
  const i = arr.findIndex(x=>x.id===state.sel);
  const [el] = arr.splice(i,1);
  dir>0 ? arr.push(el) : arr.unshift(el);
  rerender(); flickSave();
}
function alignSel(mode){
  if(!state.sel) return;
  const el = findEl(state.sel);
  pushUndo();
  if(mode==="left") el.x = 40;
  if(mode==="center") el.x = Math.round((W-el.w)/2);
  if(mode==="right") el.x = W-40-el.w;
  if(mode==="top") el.y = 24;
  if(mode==="middle") el.y = Math.round((H-el.h)/2);
  if(mode==="bottom") el.y = H-24-el.h;
  rerender(); flickSave();
}
function renameDoc(){
  const t = prompt("Rename presentation", $("#docTitle").textContent);
  if(t){ $("#docTitle").textContent = t; flickSave(); }
}
function downloadJson(){
  const blob = new Blob([JSON.stringify(state.slides,null,2)],{type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = "redline-deck.json"; a.click();
  toast("Deck exported as JSON");
}

/* ---------------- modals ---------------- */

function openModal(html){
  modalLayer.innerHTML = `<div class="modal">${html}</div>`;
  modalLayer.classList.add("open");
}
function closeModal(){ modalLayer.classList.remove("open"); modalLayer.innerHTML=""; }
modalLayer.addEventListener("mousedown", e=>{ if(e.target===modalLayer) closeModal(); });

function openVeeva(){
  const allPass = state.per.slice(0,3).every(p=>p.checks.every(c=>c.pass));
  openModal(`
    <h2>Veeva submission checklist</h2>
    <p class="msub">Part number US-UNBC-001 · PRC round 2 · review Thursday, submission the previous Tuesday.</p>
    <div class="mrow"><div><div class="rt">Part number opened</div><div class="rd">US-UNBC-001 · 01/26</div></div><span class="chip chip-green">Ready</span></div>
    <div class="mrow"><div><div class="rt">Slides match the submitted template</div><div class="rd">Storyboard, social, flyer</div></div><span class="chip chip-green">Ready</span></div>
    <div class="mrow"><div><div class="rt">Annotations flattened to the PDF rendition</div><div class="rd">Red boxes and magenta outlines on the page</div></div><span class="chip ${allPass?"chip-green":"chip-yellow"}">${allPass?"Ready":"Pending"}</span></div>
    <div class="mrow"><div><div class="rt">Sticky note drafts from this round</div><div class="rd">Responses drafted for 9 reviewer comments</div></div><span class="chip chip-yellow">3 drafts</span></div>
    <div class="mrow"><div><div class="rt">Related pieces linked</div><div class="rd">Kiosk master flow, ISI reference</div></div><span class="chip chip-green">Ready</span></div>
    <div class="mnote">Redline stages everything. Your team reviews the package and clicks submit inside Veeva. Redline never submits on its own.</div>
    <div class="mactions">
      <button class="btn ghost sm" id="mClose">Close</button>
      <button class="btn solid sm" id="mCopy">Copy staging summary</button>
    </div>`);
  $("#mClose").addEventListener("click",closeModal);
  $("#mCopy").addEventListener("click",()=>{
    navigator.clipboard && navigator.clipboard.writeText("US-UNBC-001 · PRC round 2 · 3 pages staged · annotations flattened · 3 sticky note drafts ready");
    closeModal(); toast("Staging summary copied");
  });
}

function openDiff(){
  const rows = state.manual.length
    ? state.manual.map(m=>`<div class="mrow"><div><div class="rt">${m.desc}</div><div class="rd">${m.at}</div></div><span class="chip chip-orange">Manual</span></div>`).join("")
    : `<div class="mrow"><div><div class="rt">No manual edits found</div><div class="rd">Everything on these pages came from tracked feedback</div></div><span class="chip chip-green">Clear</span></div>`;
  openModal(`
    <h2>Check manual changes</h2>
    <p class="msub">Redline compares the live deck against the last built checklist and lists anything a person changed by hand.</p>
    ${rows}
    <div class="mnote">Manual edits are fine. Redline flags them so the next Veeva rendition and the checklist stay honest.</div>
    <div class="mactions"><button class="btn solid sm" id="mClose">Done</button></div>`);
  $("#mClose").addEventListener("click",closeModal);
}

function openAssetPicker(x,y){
  openModal(`
    <h2>Insert image</h2>
    <p class="msub">Assets from this part number.</p>
    <div class="assetgrid">
      <img src="assets/storyboard-creative.png" data-src="assets/storyboard-creative.png">
      <img src="assets/social-creative.png" data-src="assets/social-creative.png">
      <img src="assets/flyer-creative.png" data-src="assets/flyer-creative.png">
    </div>
    <div class="mactions"><button class="btn ghost sm" id="mClose">Cancel</button></div>`);
  $("#mClose").addEventListener("click",closeModal);
  document.querySelectorAll(".assetgrid img").forEach(img=>{
    img.addEventListener("click",()=>{
      closeModal();
      insertNew(imageEl({x,y,w:300,h:180,src:img.dataset.src}));
      setTool("select");
    });
  });
}

function openAbout(){
  openModal(`
    <h2>Redline</h2>
    <p class="msub">PRC submissions without the rebuild. Redline reads your creative, annotates it the way your reviewers expect, turns their comments into a worklist, and stages the round in Veeva. Your team stays the submitter of record.</p>
    <div class="mnote">Built by Seneca Labs for the Majority team. Demo data only: US-UNBC-001 · 01/26.</div>
    <div class="mactions"><button class="btn solid sm" id="mClose">Close</button></div>`);
  $("#mClose").addEventListener("click",closeModal);
}
function openShortcuts(){
  openModal(`
    <h2>Keyboard shortcuts</h2>
    <div class="mrow"><span class="rt">Undo / Redo</span><span class="rd">⌘Z / ⇧⌘Z</span></div>
    <div class="mrow"><span class="rt">Duplicate object</span><span class="rd">⌘D</span></div>
    <div class="mrow"><span class="rt">Delete object</span><span class="rd">⌫</span></div>
    <div class="mrow"><span class="rt">Nudge / big nudge</span><span class="rd">Arrows / ⇧ Arrows</span></div>
    <div class="mrow"><span class="rt">Edit text</span><span class="rd">Double click</span></div>
    <div class="mrow"><span class="rt">Present navigation</span><span class="rd">← → · Esc</span></div>
    <div class="mactions"><button class="btn solid sm" id="mClose">Close</button></div>`);
  $("#mClose").addEventListener("click",closeModal);
}
function openShare(){
  openModal(`
    <h2>Share</h2>
    <p class="msub">Anyone at Majority with the link can comment. Client reviewers get view only.</p>
    <div class="mrow"><div><div class="rt">redline.senecalabs.ai/d/c4tc-prc-round-2</div><div class="rd">Link sharing on · comment access</div></div><span class="chip chip-purple">Team</span></div>
    <div class="mactions">
      <button class="btn ghost sm" id="mClose">Close</button>
      <button class="btn solid sm" id="mCopyLink">Copy link</button>
    </div>`);
  $("#mClose").addEventListener("click",closeModal);
  $("#mCopyLink").addEventListener("click",()=>{ closeModal(); toast("Link copied"); });
}

$("#veevaBtn").addEventListener("click",openVeeva);
$("#diffBtn").addEventListener("click",openDiff);
$("#shareBtn").addEventListener("click",openShare);
$("#aiBtn").addEventListener("click",()=>{
  switchTab("checklist");
  const card = document.querySelector(".feedbackcard");
  card.classList.remove("pulse"); void card.offsetWidth; card.classList.add("pulse");
  $("#feedbackInput").focus();
  toast("Paste PRC feedback, then build the checklist");
});
$("#bgBtn").addEventListener("click",()=>toast("Background locked to the submitted template"));
$("#layoutBtn").addEventListener("click",e=>{
  openMenu(e.currentTarget,[
    {label:"Title and creative", act:()=>toast("Layout applied")},
    {label:"Full bleed creative", act:()=>toast("Layout applied")},
    {label:"Two up comparison", act:()=>toast("Layout applied")},
  ]);
});
$("#themeBtn").addEventListener("click",()=>toast("Theme follows the client template"));

/* ---------------- tabs ---------------- */

function switchTab(t){
  document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active", b.dataset.tab===t));
  $("#railChecklist").classList.toggle("hidden", t!=="checklist");
  $("#railComments").classList.toggle("hidden", t!=="comments");
}
document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>switchTab(b.dataset.tab)));

$("#buildBtn").addEventListener("click",buildChecklist);
$("#feedbackInput").addEventListener("input",e=>{ perFor(state.cur).feedback = e.target.value; });

/* ---------------- present mode ---------------- */

let pIdx = 0;
function startPresent(){
  pIdx = state.cur;
  $("#presentLayer").classList.remove("hidden");
  fitPresent(); presentRender();
}
function presentRender(){
  renderSlide(state.slides[pIdx], $("#presentSlide"));
  $("#pCounter").textContent = (pIdx+1)+" / "+state.slides.length;
}
function presentGo(d){
  pIdx = Math.max(0, Math.min(state.slides.length-1, pIdx+d));
  presentRender();
}
function exitPresent(){ $("#presentLayer").classList.add("hidden"); }
function fitPresent(){
  const s = Math.min((window.innerWidth-80)/W, (window.innerHeight-120)/H);
  $("#presentSlide").style.transform = `scale(${s})`;
}
window.addEventListener("resize",fitPresent);
$("#presentBtn").addEventListener("click",startPresent);
$("#pPrev").addEventListener("click",()=>presentGo(-1));
$("#pNext").addEventListener("click",()=>presentGo(1));
$("#pExit").addEventListener("click",exitPresent);

/* ---------------- toast ---------------- */

let toastT;
function toast(msg){
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastT);
  toastT = setTimeout(()=>t.classList.remove("show"), 2600);
}

/* ---------------- boot ---------------- */
gotoSlide(0);
