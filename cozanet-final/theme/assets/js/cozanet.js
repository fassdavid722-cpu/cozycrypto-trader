/**
 * Cozanet v2.1 — matches Kimi live screenshots exactly
 */
(function(){
'use strict';
var API=window.CZ||{restBase:'/wp-json/cozanet/v1',nonce:'',homeUrl:'/'};

/* ══ NAV SCROLL ══ */
var nav=document.getElementById('czNav');
if(nav){
  window.addEventListener('scroll',function(){
    nav.classList.toggle('scrolled',window.scrollY>80);
  },{passive:true});
}

/* ══ HAMBURGER — full overlay like screenshot ══ */
var hamburger=document.getElementById('czHamburger');
var mobileMenu=document.getElementById('czMobileMenu');
var mobileClose=document.getElementById('czMobileClose');
if(hamburger&&mobileMenu){
  hamburger.addEventListener('click',function(){
    mobileMenu.classList.add('open');
    document.body.style.overflow='hidden';
  });
}
if(mobileClose&&mobileMenu){
  mobileClose.addEventListener('click',function(){
    mobileMenu.classList.remove('open');
    document.body.style.overflow='';
  });
}

/* ══ NEON NETWORK CANVAS ══ */
(function initNeon(){
  var canvas=document.getElementById('czNeonCanvas');
  if(!canvas)return;
  var ctx=canvas.getContext('2d');
  var W,H;
  var nodes=[],ropes=[];
  var mouse={x:9999,y:9999};
  var N=20;
  var t=0;

  function resize(){
    W=canvas.width=window.innerWidth;
    H=canvas.height=window.innerHeight;
    // Reposition nodes on resize
    for(var i=0;i<nodes.length;i++){
      var nd=nodes[i];
      var frac=i/N;
      nd.baseX=(frac-.5)*W;
      nd.baseY=Math.sin(frac*Math.PI*2)*H*0.18+Math.sin(frac*Math.PI*4)*H*0.08;
    }
  }

  for(var i=0;i<N;i++){
    var frac=i/N;
    var bx=(frac-.5)*(window.innerWidth||1200);
    var by=Math.sin(frac*Math.PI*2)*180+Math.sin(frac*Math.PI*4)*80;
    nodes.push({
      x:bx,y:by,baseX:bx,baseY:by,
      vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,
      phase:Math.random()*Math.PI*2
    });
  }
  for(var j=0;j<N;j++){
    ropes.push({a:j,b:(j+1)%N,phase:Math.random()*Math.PI*2,sig:Math.random()});
  }

  resize();
  window.addEventListener('resize',resize,{passive:true});
  window.addEventListener('mousemove',function(e){mouse.x=e.clientX;mouse.y=e.clientY;},{passive:true});

  function raf(){
    requestAnimationFrame(raf);
    ctx.clearRect(0,0,W,H);
    t+=0.01;
    var cx=W/2,cy=H/2;

    // Update nodes
    for(var n=0;n<nodes.length;n++){
      var nd=nodes[n];
      nd.x+=nd.vx+Math.sin(t+nd.phase)*0.12;
      nd.y+=nd.vy+Math.cos(t*.7+nd.phase)*0.09;
      // Mouse repel
      var mx=nd.x+cx-mouse.x,my=nd.y+cy-mouse.y;
      var md=Math.sqrt(mx*mx+my*my);
      if(md<180&&md>0){nd.x+=mx/md*.5;nd.y+=my/md*.5;}
      // Soft spring back to base
      nd.x+=(nd.baseX-nd.x)*.003;
      nd.y+=(nd.baseY-nd.y)*.003;
      // Bounds
      if(nd.x+cx<-80)nd.x=W/2-cx+10;
      if(nd.x+cx>W+80)nd.x=-W/2-cx-10;
      if(nd.y+cy<-80)nd.y=H/2-cy+10;
      if(nd.y+cy>H+80)nd.y=-H/2-cy-10;
    }

    // Draw ropes
    for(var r=0;r<ropes.length;r++){
      var rope=ropes[r];
      rope.sig=(rope.sig+.003)%1;
      var na=nodes[rope.a],nb=nodes[rope.b];
      var ax=na.x+cx,ay=na.y+cy;
      var bx=nb.x+cx,by=nb.y+cy;
      var mx2=(ax+bx)/2+Math.sin(t+rope.phase)*18;
      var my2=(ay+by)/2+Math.cos(t*.8+rope.phase)*12;

      // Rope line
      var g=ctx.createLinearGradient(ax,ay,bx,by);
      g.addColorStop(0,'rgba(255,195,0,.08)');
      g.addColorStop(.5,'rgba(255,195,0,.32)');
      g.addColorStop(1,'rgba(204,255,0,.08)');
      ctx.beginPath();ctx.moveTo(ax,ay);
      ctx.quadraticCurveTo(mx2,my2,bx,by);
      ctx.strokeStyle=g;ctx.lineWidth=.9;ctx.stroke();

      // Travelling dot
      var s=rope.sig;
      var px=ax*(1-s)*(1-s)+mx2*2*(1-s)*s+bx*s*s;
      var py=ay*(1-s)*(1-s)+my2*2*(1-s)*s+by*s*s;
      ctx.beginPath();ctx.arc(px,py,2,0,Math.PI*2);
      ctx.fillStyle='rgba(204,255,0,.85)';ctx.fill();
    }

    // Draw node squares
    for(var m=0;m<nodes.length;m++){
      var nd2=nodes[m];
      var nx=nd2.x+cx,ny=nd2.y+cy;
      var glow=Math.sin(t*1.4+nd2.phase)*.5+.5;
      var sz=4+glow*2.5;
      ctx.save();ctx.translate(nx,ny);ctx.rotate(t*.45+nd2.phase);
      ctx.fillStyle='rgba(255,195,0,'+(0.55+glow*.45)+')';
      ctx.fillRect(-sz/2,-sz/2,sz,sz);
      ctx.restore();
    }
  }
  raf();
})();

/* ══ AMOUNT FORMATTING ══ */
document.querySelectorAll('.cz-amount-in').forEach(function(inp){
  inp.addEventListener('focus',function(){this.value=this.value.replace(/,/g,'')});
  inp.addEventListener('blur',function(){
    var v=parseFloat(this.value.replace(/,/g,''));
    if(!isNaN(v))this.value=v.toLocaleString('en-NG');
  });
});

/* ══ WALLET VALIDATION ══ */
document.querySelectorAll('.cz-addr-in').forEach(function(inp){
  var box=inp.closest('.cz-addr-box');
  var tag=box&&box.querySelector('.cz-addr-valid');
  inp.addEventListener('input',function(){
    if(!tag)return;
    var v=this.value.trim();
    var isValid=v.length>10&&(v.startsWith('0x')||/^[13][a-zA-Z0-9]{25,}$/.test(v)||v.length>20);
    tag.style.display=isValid?'block':'none';
  });
});

/* ══ PASTE BUTTON ══ */
document.querySelectorAll('[data-paste]').forEach(function(btn){
  btn.addEventListener('click',function(){
    var inp=this.closest('[data-route-form]').querySelector('.cz-addr-in');
    if(inp&&navigator.clipboard){
      navigator.clipboard.readText().then(function(t){inp.value=t;inp.dispatchEvent(new Event('input'));});
    }
  });
});

/* ══ FIND BEST ROUTE ══ */
document.querySelectorAll('.cz-find-btn').forEach(function(btn){
  btn.addEventListener('click',handleFindRoute);
});

function handleFindRoute(e){
  var form=e.currentTarget.closest('[data-route-form]');
  if(!form)return;

  var rawAmount=(form.querySelector('[data-field="amount"]')||{}).value||'100000';
  var amount=parseInt(rawAmount.replace(/,/g,''),10);
  var to_crypto=(form.querySelector('[data-field="to_crypto"]')||{}).textContent||'USDT';
  var network=(form.querySelector('[data-field="network"]')||{}).textContent||'BSC';
  var priority=(form.querySelector('[data-field="priority"]')||{}).textContent||'Cheapest';
  var wallet=(form.querySelector('[data-field="wallet"]')||{}).value||'';

  if(!amount||amount<100){alert('Please enter an amount of at least ₦100');return;}

  var btn=e.currentTarget;
  btn.disabled=true;
  btn.innerHTML='<div class="cz-spinner"></div> Scanning providers…';

  // Target result containers — home or dashboard
  var resultsEl=document.getElementById('czRouteResults')||document.getElementById('czDashResults');
  var aiEl=document.getElementById('czAIResults')||document.getElementById('czDashAI');

  if(resultsEl){
    resultsEl.innerHTML='<div class="cz-loading"><div class="cz-spinner"></div> Scanning 20+ providers…</div>';
    resultsEl.style.display='block';
  }
  if(aiEl)aiEl.style.display='none';

  fetch(API.restBase+'/route',{
    method:'POST',
    headers:{'Content-Type':'application/json','X-WP-Nonce':API.nonce},
    body:JSON.stringify({
      amount:amount,
      from_currency:'NGN',
      to_crypto:to_crypto.trim(),
      network:network.trim(),
      priority:priority.toLowerCase().trim(),
      wallet_address:wallet
    })
  })
  .then(function(r){return r.ok?r.json():r.json().then(function(d){throw new Error(d.message||'Error '+r.status)});})
  .then(function(data){
    btn.disabled=false;
    btn.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Find Best Route →';
    renderResults(data,resultsEl,aiEl);
    if(resultsEl){
      setTimeout(function(){resultsEl.scrollIntoView({behavior:'smooth',block:'start'});},120);
    }
  })
  .catch(function(err){
    btn.disabled=false;
    btn.innerHTML='Find Best Route →';
    if(resultsEl)resultsEl.innerHTML='<div class="cz-error-box">⚠ '+esc(err.message)+'</div>';
  });
}

/* ══ RENDER RESULTS — exact Kimi layout ══ */
function renderResults(data,resultsEl,aiEl){
  var best=data.best,others=data.others||[],ai=data.ai_insight;
  if(!best||!resultsEl)return;

  var fmt=function(n){return Number(n).toLocaleString('en-NG');};
  var riskColor=function(r){
    if(!r)return 'cz-dot-green';
    r=r.toLowerCase();
    return r==='low'?'cz-dot-green':r==='medium'?'cz-dot-orange':'cz-dot-red';
  };

  resultsEl.innerHTML=
    '<div class="liquid-glass cz-results-card">'+

    // ── Recommended route ──
    '<div class="cz-best-route">'+
      '<span class="cz-rec-tag">Recommended</span>'+
      '<div class="cz-route-head">'+
        '<div class="cz-route-avatar" style="background:'+(best.color||'#7c3aed')+'">'+esc(best.icon||best.name.charAt(0))+'</div>'+
        '<div>'+
          '<div class="cz-route-name">'+esc(best.name)+'</div>'+
          '<div class="cz-route-type">'+esc(best.type||'Direct Purchase')+'</div>'+
        '</div>'+
      '</div>'+
      '<div class="cz-route-metrics">'+
        '<div>'+
          '<div class="cz-metric-lbl">You pay (est.)</div>'+
          '<div class="cz-metric-big">₦'+fmt(best.you_pay)+'</div>'+
          (best.savings?'<div class="cz-metric-save">You save ₦'+fmt(best.savings)+'</div>':'')+
        '</div>'+
        '<div>'+
          '<div class="cz-metric-lbl">Time</div>'+
          '<div class="cz-metric-val">'+(best.time||best.speed_min+' min')+'</div>'+
          (best.speed_label==='Fast'?'<span class="cz-fast-tag">Fast</span>':'')+
        '</div>'+
        '<div>'+
          '<div class="cz-metric-lbl">Total Fees</div>'+
          '<div class="cz-metric-val">₦'+fmt(best.total_fees)+'</div>'+
          '<div style="font-size:11px;color:var(--off)">'+esc(best.fee_pct||best.fee_pct+'')+'%</div>'+
        '</div>'+
        '<div>'+
          '<div class="cz-metric-lbl">Risk</div>'+
          '<div class="cz-risk-dot" style="margin-top:4px">'+
            '<span class="cz-dot '+riskColor(best.risk)+'"></span>'+
            '<span style="color:#fff;font-size:13px">'+esc(best.risk)+'</span>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>'+

    // ── Other options ──
    (others.length?
      '<div class="cz-others-section">'+
        '<div class="cz-table-header">'+
          '<span>Route</span><span>You pay</span><span>Time</span>'+
          '<span>Fees</span><span>Risk</span><span></span>'+
        '</div>'+
        others.map(function(r){
          return '<div class="cz-table-row">'+
            '<div class="cz-table-name">'+
              '<div class="cz-mini-avatar" style="background:'+(r.color||'#333')+'">'+esc(r.icon||r.name.charAt(0))+'</div>'+
              esc(r.name)+
            '</div>'+
            '<span>₦'+fmt(r.you_pay)+'</span>'+
            '<span>'+(r.time||r.speed_min+' min')+'</span>'+
            '<span>₦'+fmt(r.total_fees)+'</span>'+
            '<span><span class="cz-dot '+riskColor(r.risk)+'"></span></span>'+
            '<span class="cz-chevron-right">›</span>'+
          '</div>';
        }).join('')+
      '</div>'
    :'')+

    '</div>';

  // ── AI Insight ──
  if(aiEl&&ai){
    aiEl.style.display='block';
    var isDash=aiEl.dataset.variant==='dashboard';
    aiEl.innerHTML=
      '<div class="'+(isDash?'cz-dash-form-card':'liquid-glass')+' cz-ai-panel">'+
        '<div class="cz-ai-header">'+
          '<div class="cz-ai-title">'+
            '<svg class="cz-ai-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'+
            (isDash?'Aegis AI Insight':'AI Insight')+
          '</div>'+
          '<span class="cz-rec-badge">RECOMMENDED</span>'+
        '</div>'+
        '<p class="cz-ai-body">'+esc(ai.summary||'')+'</p>'+

        (best.savings?
          '<div class="cz-savings-box">'+
            '<div class="cz-save-amount">You save ₦'+fmt(best.savings)+'</div>'+
            '<div class="cz-save-lbl">compared to the next best option</div>'+
            '<div class="cz-ai-badges">'+
              '<span class="cz-ai-badge">↗ Low Fees</span>'+
              '<span class="cz-ai-badge">⚡ Fastest</span>'+
              '<span class="cz-ai-badge">✓ Reliable</span>'+
            '</div>'+
          '</div>'
        :'')+

        '<div class="cz-guide-title">'+(isDash?'Step-by-step Guide':'What happens next?')+'</div>'+
        '<div class="cz-steps">'+
        (ai.steps||[]).map(function(s,i){
          return '<div class="cz-step">'+
              '<div class="cz-step-num">'+(i+1)+'</div>'+
              '<div>'+
                '<span class="cz-step-title">'+esc(s.title)+'</span>'+
                '<span class="cz-step-desc">'+esc(s.desc)+'</span>'+
              '</div>'+
            '</div>'+
            (i<(ai.steps.length-1)?'<div class="cz-step-line"></div>':'');
        }).join('')+
        '</div>'+
        '<button class="cz-view-guide">'+
          'View step-by-step guide '+
          '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>'+
        '</button>'+
      '</div>';
  }
}

/* ══ DASHBOARD SIDEBAR ══ */
var sbToggle=document.getElementById('czSidebarToggle');
var sidebar=document.getElementById('czSidebar');
var sbOverlay=document.getElementById('czSbOverlay');

if(sbToggle&&sidebar){
  sbToggle.addEventListener('click',function(){
    sidebar.classList.toggle('open');
    if(sbOverlay)sbOverlay.classList.toggle('show');
  });
}
if(sbOverlay){
  sbOverlay.addEventListener('click',function(){
    if(sidebar)sidebar.classList.remove('open');
    sbOverlay.classList.remove('show');
  });
}
document.querySelectorAll('.cz-sb-item').forEach(function(item){
  item.addEventListener('click',function(){
    document.querySelectorAll('.cz-sb-item').forEach(function(i){i.classList.remove('active');});
    this.classList.add('active');
  });
});

/* ══ SCROLL REVEAL ══ */
if('IntersectionObserver' in window){
  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
      }
    });
  },{threshold:.12});
  document.querySelectorAll('[data-reveal]').forEach(function(el){observer.observe(el);});
}else{
  document.querySelectorAll('[data-reveal]').forEach(function(el){el.classList.add('revealed');});
}

/* ══ UTILS ══ */
function esc(s){
  if(!s)return'';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

})();
