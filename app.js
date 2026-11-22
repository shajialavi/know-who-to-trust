/* Know Who To Trust: page logic (WhatsApp links, personality test, results, emails) */
(function(){
  "use strict";
  var isEdit=/[#?&]edit\b/.test(location.hash+location.search);
  var CFG=window.SITE_CONFIG||{};
  // In edit mode, reuse the unsaved draft from this browser, if any
  if(isEdit){try{var d=JSON.parse(localStorage.getItem("kwtt_draft")||"null");if(d){window.SITE_HTML=d.html;CFG=window.SITE_CONFIG=d.cfg}}catch(e){}}
  window.__CFG=CFG;
  var H=window.SITE_HTML;
  if(H){["siteBar","siteMain","siteFooter","siteFloat"].forEach(function(id){var el=document.getElementById(id);if(el&&H[id]!=null)el.innerHTML=H[id]})}

  var $=function(s,r){return (r||document).querySelector(s)};
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}

  /* ---------- WhatsApp links ---------- */
  function bindWA(){
    document.querySelectorAll("[data-wa]").forEach(function(a){a.setAttribute("href",CFG.whatsapp||"#");a.setAttribute("target","_blank");a.setAttribute("rel","noopener")});
  }
  window.__bindWA=bindWA;
  bindWA();
  document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("[data-wa]");if(a&&!isEdit)track("Lead")});

  /* ---------- Meta Pixel (optional) ---------- */
  if(CFG.pixelId){
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");
    fbq("init",CFG.pixelId);fbq("track","PageView");
  }
  function track(n){try{if(window.fbq)fbq("track",n)}catch(e){}}

  /* ---------- Personality test ---------- */
  var B=window.QUIZ_BANK,Q=B.questions,N=Q.length,keys=Object.keys(B.areas),TR=B.traits;
  var box=$("#quizBox");
  var S={name:"",email:"",phone:"",ans:[],i:0};
  var KEY="kwtt_quiz_v2";
  function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
  function load(){try{var s=JSON.parse(localStorage.getItem(KEY)||"null");if(s&&s.ans&&s.ans.length<N&&s.ans.length>0&&s.email)return s}catch(e){}return null}
  function clear(){try{localStorage.removeItem(KEY)}catch(e){}}

  function intro(){
    var mins=Math.max(1,Math.round(N*8/60)),saved=load();
    box.innerHTML='<div class="center"><h3>'+esc(B.testName)+'</h3><p class="lead" style="margin:12px auto 24px">'+N+' questions · about '+mins+' minutes. Answer <b>Yes</b>, <b>Maybe</b> or <b>No</b>, the way you actually are, not the way you wish to be. There are no right or wrong answers.</p>'+
      '<button class="btn gold-btn" id="qStart" type="button">Start the Free Test &nbsp;›</button>'+
      (saved?'<div><button class="linkbtn" id="qResume" type="button">Resume where I left off (question '+(saved.ans.length+1)+')</button></div>':'')+'</div>';
    $("#qStart").onclick=form;
    if(saved)$("#qResume").onclick=function(){S=saved;ask()};
  }
  function form(){
    box.innerHTML='<div class="center"><h3>Where should we send your report?</h3><p class="fine" style="margin-top:8px">Your personal result is emailed to you when you finish.</p></div>'+
      '<div class="field"><label for="fName">Your name</label><input id="fName" type="text" autocomplete="name" placeholder="e.g. Rohan Verma"></div>'+
      '<div class="field"><label for="fEmail">Email address</label><input id="fEmail" type="email" autocomplete="email" inputmode="email" placeholder="you@example.com"></div>'+
      '<div class="field"><label for="fPhone">WhatsApp number</label><input id="fPhone" type="tel" autocomplete="tel" inputmode="tel" placeholder="10-digit mobile number"></div>'+
      '<div class="err" id="fErr" role="alert"></div><div class="center" style="margin-top:12px"><button class="btn gold-btn" id="fGo" type="button">Begin the Test &nbsp;›</button></div>';
    $("#fGo").onclick=function(){
      var n=$("#fName").value.trim(),e=$("#fEmail").value.trim(),p=$("#fPhone").value.replace(/[\s\-+()]/g,"");
      if(p.indexOf("91")===0&&p.length===12)p=p.slice(2);
      var er=$("#fErr");
      if(n.length<2){er.textContent="Please enter your name.";return}
      if(!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(e)){er.textContent="Please enter a valid email address.";return}
      if(!/^[6-9]\d{9}$/.test(p)){er.textContent="Please enter a valid 10-digit Indian mobile number.";return}
      S={name:n,email:e,phone:p,ans:[],i:0};save();ask();
    };
  }
  function ask(){
    var i=S.ans.length;
    if(i>=N){return finish()}
    box.innerHTML='<div class="prog"><i style="width:'+(i/N*100)+'%"></i></div>'+
      '<div class="q-count"><span>Question '+(i+1)+' of '+N+'</span><span>'+Math.round(i/N*100)+'%</span></div>'+
      '<div class="q-text"></div>'+
      '<div class="tri"><button type="button" class="opt" data-a="y">Yes</button><button type="button" class="opt" data-a="m">Maybe</button><button type="button" class="opt" data-a="n">No</button></div>'+
      '<div class="q-nav"><button type="button" class="linkbtn" id="qBack"'+(i?'':' hidden')+'>‹ Previous</button><span></span></div>';
    $(".q-text",box).textContent=Q[i][2];
    box.querySelectorAll(".opt").forEach(function(b){b.onclick=function(){S.ans.push(b.getAttribute("data-a"));save();ask()}});
    $("#qBack").onclick=function(){S.ans.pop();save();ask()};
  }

  /* ----- scoring ----- */
  function compute(){
    var at={},ac={},tt={},tc={};
    Q.forEach(function(q,i){
      var a=S.ans[i],pts=a==="m"?1:(a===q[3]?2:0);
      at[q[0]]=(at[q[0]]||0)+pts;ac[q[0]]=(ac[q[0]]||0)+2;tt[q[1]]=(tt[q[1]]||0)+pts;tc[q[1]]=(tc[q[1]]||0)+2;
    });
    var areas=keys.map(function(k,idx){return {key:k,idx:idx,name:B.areas[k].name,advice:B.areas[k].advice,pct:Math.round(at[k]/ac[k]*100)}});
    var rank=areas.slice().sort(function(a,b){return a.pct-b.pct||a.idx-b.idx});
    rank.forEach(function(a,i){a.rank=i});
    var traits=TR.map(function(t,idx){return {key:t.key,area:t.area,name:t.name,short:t.short,dip:t.dip,idx:idx,pct:Math.round(tt[t.key]/tc[t.key]*100)}});
    var byLow=traits.slice().sort(function(a,b){return a.pct-b.pct||a.idx-b.idx}),byHigh=traits.slice().sort(function(a,b){return b.pct-a.pct||a.idx-b.idx});
    var dips=byLow.slice(0,3),rises=byHigh.slice(0,3);
    dips.forEach(function(t){t.kind="dip"});rises.forEach(function(t){if(!t.kind)t.kind="rise"});
    return {areas:areas,rank:rank,traits:traits,dips:dips,rises:rises};
  }
  function band(p){return p<50?B.labels.low:p<75?B.labels.mid:B.labels.high}
  function areaName(k){return B.areas[k].name}
  var AC={trust:"rgba(226,190,120,.07)",updown:"rgba(90,140,220,.08)",work:"rgba(120,200,160,.07)"};

  /* ----- charts ----- */
  function lineChart(R){
    var W=760,H=360,L=46,Rg=14,T=40,Bt=64,n=R.traits.length,sw=(W-L-Rg)/n,pw=H-T-Bt;
    function X(i){return L+sw*(i+.5)}function Y(p){return T+pw*(1-p/100)}
    var g="";
    // programme bands
    var cur=null,start=0;
    R.traits.forEach(function(t,i){
      if(t.area!==cur){if(cur!==null)g+=band_(cur,start,i);cur=t.area;start=i}
      if(i===n-1)g+=band_(cur,start,n);
    });
    function band_(a,s,e){return '<rect x="'+(L+sw*s).toFixed(1)+'" y="'+T+'" width="'+(sw*(e-s)).toFixed(1)+'" height="'+pw+'" fill="'+AC[a]+'"/><text x="'+(L+sw*(s+e)/2).toFixed(1)+'" y="'+(T-14)+'" text-anchor="middle" fill="#e2be78" font-size="12" font-weight="800" letter-spacing="1" font-family="Manrope,sans-serif">'+esc(areaName(a).toUpperCase().replace("HANDLING THE ","").replace("PROBLEMS OF WORK","WORK").replace("KNOW WHO TO TRUST","TRUST").replace("UPS AND DOWNS IN LIFE","UPS AND DOWNS"))+'</text>'}
    [0,25,50,75,100].forEach(function(v){g+='<line x1="'+L+'" x2="'+(W-Rg)+'" y1="'+Y(v)+'" y2="'+Y(v)+'" stroke="rgba(255,255,255,'+(v===50?.22:.09)+')"'+(v===50?' stroke-dasharray="5 5"':'')+'/><text x="'+(L-8)+'" y="'+(Y(v)+4)+'" text-anchor="end" fill="#a9b0c0" font-size="11" font-family="Manrope,sans-serif">'+v+'</text>'});
    var pts=R.traits.map(function(t,i){return X(i).toFixed(1)+","+Y(t.pct).toFixed(1)}).join(" ");
    g+='<polyline points="'+pts+'" fill="none" stroke="#e2be78" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>';
    R.traits.forEach(function(t,i){
      var x=X(i),y=Y(t.pct),col=t.kind==="dip"?"#ef6b73":t.kind==="rise"?"#6fcf97":"#e2be78",r=t.kind?8:4.5;
      g+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+r+'" fill="'+col+'" stroke="#0b101c" stroke-width="2"/>';
      if(t.kind){var up=t.kind==="rise";g+='<text x="'+x.toFixed(1)+'" y="'+(up?y-14:y+24).toFixed(1)+'" text-anchor="middle" fill="'+col+'" font-size="13" font-weight="800" font-family="Manrope,sans-serif">'+(up?"▲ ":"▼ ")+t.pct+'%</text>'}
      var words=t.short.split("|"),ly=H-Bt+22;
      words.slice(0,2).forEach(function(w,k){g+='<text x="'+x.toFixed(1)+'" y="'+(ly+k*14)+'" text-anchor="middle" fill="'+(t.kind==="dip"?"#ef6b73":"#d6d3ca")+'" font-size="10.5" font-weight="'+(t.kind?800:600)+'" font-family="Manrope,sans-serif">'+esc(w)+'</text>'});
    });
    return '<svg class="profile-line" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Profile of your 12 personality areas, with dipping points in red and rising points in green">'+g+'</svg>';
  }
  function rowsChart(R){
    var h="",cur=null;
    R.traits.forEach(function(t){
      if(t.area!==cur){cur=t.area;h+='<div class="pr-head">'+esc(areaName(cur))+'</div>'}
      var c=t.kind==="dip"?"var(--bad)":t.kind==="rise"?"var(--good)":"var(--gold)";
      h+='<div class="pr-row"><div class="pr-lab"><span>'+esc(t.name)+'</span><b style="color:'+c+'">'+(t.kind==="dip"?"▼ ":t.kind==="rise"?"▲ ":"")+t.pct+'%</b></div><div class="track"><span class="fill" data-w="'+Math.max(t.pct,3)+'" style="background:'+c+'"></span></div></div>';
    });
    return '<div class="profile-rows">'+h+'</div>';
  }

  /* ----- emails ----- */
  function textReport(R){
    var s="Hello "+S.name+",\n\nHere is your Know Who To Trust personality test report.\n\nYour biggest area of concern: "+R.rank[0].name+"\n\nYour three programme areas (weakest first):\n";
    R.rank.forEach(function(x,i){s+=(i+1)+". "+x.name+": "+x.pct+"% ("+band(x.pct)+")\n"});
    s+="\nDIPPING POINTS (your lowest areas):\n";R.dips.forEach(function(t){s+="- "+t.name+": "+t.pct+"%\n"});
    s+="\nRISING POINTS (your strongest areas):\n";R.rises.forEach(function(t){s+="- "+t.name+": "+t.pct+"%\n"});
    s+="\nRecommended coaching programme: "+R.rank[0].name+"\n"+R.rank[0].advice+"\n\nNext: "+R.rank[1].name+", then "+R.rank[2].name+".\n\nWarm regards,\nShaji Alavi\nKnow Who To Trust";
    return s;
  }
  function htmlReport(R,forCoach){
    var h='<div style="font-family:Arial,sans-serif;max-width:580px;margin:auto;color:#222">';
    h+='<h2 style="margin:0 0 6px">'+(forCoach?"New test result":"Your Know Who To Trust personal assessment")+'</h2>';
    h+='<p style="margin:0 0 16px">'+(forCoach?"<b>"+esc(S.name)+"</b><br>"+esc(S.email)+"<br>WhatsApp: "+esc(S.phone):"Hello "+esc(S.name)+", here are your results.")+'</p>';
    h+='<p style="margin:0">Biggest area of concern:</p><p style="margin:2px 0 14px;font-size:22px;font-weight:bold;color:#b07a10">'+esc(R.rank[0].name)+'</p>';
    function bar(label,p,c){return '<div style="margin:10px 0"><div style="font-weight:bold">'+esc(label)+' <span style="float:right">'+p+'%</span></div><div style="background:#eee;border-radius:8px;height:12px;margin-top:5px"><div style="background:'+c+';width:'+Math.max(p,3)+'%;height:12px;border-radius:8px"></div></div></div>'}
    R.areas.forEach(function(x){h+=bar(x.name,x.pct,x.rank===0?"#d89b3a":"#3f9b78")});
    h+='<h3 style="margin:22px 0 4px;color:#c0392b">Dipping points</h3>';R.dips.forEach(function(t){h+=bar("▼ "+t.name,t.pct,"#ef6b73")});
    h+='<h3 style="margin:22px 0 4px;color:#1e8449">Rising points</h3>';R.rises.forEach(function(t){h+=bar("▲ "+t.name,t.pct,"#6fcf97")});
    h+='<h3 style="margin:22px 0 4px">Your recommended coaching programme</h3><p style="font-weight:bold;margin:4px 0">'+esc(R.rank[0].name)+'</p><p style="margin:0;color:#444">'+esc(R.rank[0].advice)+'</p>';
    h+='<p style="color:#444">Then: <b>'+esc(R.rank[1].name)+'</b>, followed by <b>'+esc(R.rank[2].name)+'</b>.</p></div>';
    return h;
  }
  function sendMail(to,subject,text,html){
    return fetch("https://api.emailjs.com/api/v1.0/email/send",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({service_id:CFG.emailjsService,template_id:CFG.emailjsTemplate,user_id:CFG.emailjsKey,
        template_params:{to_email:to,to_name:S.name,subject:subject,message:text,message_html:html,reply_to:CFG.coachEmail||to,participant_name:S.name,participant_email:S.email,participant_phone:S.phone}})
    }).then(function(r){if(!r.ok)throw new Error("mail "+r.status)});
  }

  /* ----- results ----- */
  function finish(){
    var R=compute(),first=R.rank[0];
    var head='<div class="prog"><i style="width:100%"></i></div><div class="res-head center"><span class="sample-chip">Your personal assessment</span>'+
      '<p class="rh-small">'+esc(S.name.split(" ")[0])+', your biggest area of concern is:</p><div class="big">'+esc(first.name)+'</div><p class="rh-sub">Your lowest relative assessment score</p></div>';
    // programme bar meter (fixed order)
    var bars='<h4 class="blk">Your three programme areas</h4><div class="bars">';
    R.areas.forEach(function(x){var c=x.rank===0?"#d89b3a":"#3f9b78";bars+='<div class="bar-row"><div class="lab"><span>'+esc(x.name)+(x.rank===0?' <em class="tagc">Lowest</em>':'')+'</span><span>'+x.pct+'%</span></div><div class="track"><span class="fill" data-w="'+Math.max(x.pct,3)+'" style="background:'+c+'"></span></div></div>'});
    bars+='</div>';
    // dips & rises
    var prof='<h4 class="blk">Your dipping points and rising points</h4><p class="fine" style="margin:-6px 0 14px">Each point is one personality area. <b style="color:var(--bad)">▼ Dipping points</b> are your lowest. <b style="color:var(--good)">▲ Rising points</b> are your strongest.</p>'+lineChart(R)+rowsChart(R);
    var dl='<div class="dr-grid"><div class="dr dr-dip"><h5>▼ Your dipping points</h5>';
    R.dips.forEach(function(t){dl+='<div class="dr-item"><b>'+esc(t.name)+' <span>'+t.pct+'%</span></b><p>'+esc(t.dip)+'</p><small>'+esc(areaName(t.area))+'</small></div>'});
    dl+='</div><div class="dr dr-rise"><h5>▲ Your rising points</h5>';
    R.rises.forEach(function(t){dl+='<div class="dr-item"><b>'+esc(t.name)+' <span>'+t.pct+'%</span></b><p>A real strength. Keep building on it.</p><small>'+esc(areaName(t.area))+'</small></div>'});
    dl+='</div></div>';
    // recommendation
    var rec='<h4 class="blk">Your recommended coaching programme</h4><div class="rec-main"><div class="tagline">Start here</div><h4>'+esc(first.name)+'</h4><p>'+esc(first.advice)+'</p></div><div class="plan">';
    [1,2].forEach(function(i){var x=R.rank[i];rec+='<div class="plan-card"><div class="n">'+(i+1)+'</div><div><div class="tagline">'+(i===1?"Next":"Then")+'</div><h4>'+esc(x.name)+'</h4><p>'+esc(x.advice)+'</p></div></div>'});
    rec+='</div>';
    box.innerHTML=head+bars+prof+dl+rec+
      '<div class="center"><p class="mail-status" id="mailStatus"></p><div class="cta-row" style="justify-content:center"><a class="btn wa" href="#" data-wa>Join the Free Workshop on WhatsApp &nbsp;›</a></div><button class="linkbtn" id="qAgain" type="button">Retake the test</button></div>';
    setTimeout(function(){box.querySelectorAll(".fill").forEach(function(f){f.style.width=f.getAttribute("data-w")+"%"})},60);
    bindWA();
    $("#qAgain").onclick=function(){clear();S={name:"",email:"",phone:"",ans:[],i:0};intro()};
    var st=$("#mailStatus");
    track("CompleteRegistration");
    var payload={name:S.name,email:S.email,phone:S.phone,time:new Date().toISOString(),programmes:R.areas.map(function(x){return {area:x.name,percent:x.pct}}),dips:R.dips.map(function(t){return t.name+" "+t.pct}),rises:R.rises.map(function(t){return t.name+" "+t.pct}),answers:S.ans.join("")};
    if(CFG.leadWebhook){try{fetch(CFG.leadWebhook,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain"},body:JSON.stringify(payload)}).catch(function(){})}catch(e){}}
    clear();
    if(CFG.emailjsService&&CFG.emailjsTemplate&&CFG.emailjsKey){
      st.textContent="Sending your report by email…";
      var jobs=[sendMail(S.email,"Your Know Who To Trust personal assessment",textReport(R),htmlReport(R,false))];
      if(CFG.coachEmail)jobs.push(sendMail(CFG.coachEmail,"New test result: "+S.name+" ("+first.name+")","Name: "+S.name+"\nEmail: "+S.email+"\nWhatsApp: "+S.phone+"\n\n"+textReport(R),htmlReport(R,true)));
      Promise.all(jobs).then(function(){st.textContent="Your report has been emailed to "+S.email+". Please check your inbox and spam folder."})
        .catch(function(){st.textContent="We could not send the email just now. Please take a screenshot of this page to keep your report."});
    }else{
      st.textContent="";
      if(window.console)console.warn("Email is not set up yet: add your EmailJS details in content.js (see README).");
    }
  }
  intro();
})();
