/* Visual editor. Opens only when the address ends with #edit  (e.g. yoursite.netlify.app/#edit).
   Click any text to change it. Click any photo to replace it. Duplicate / delete cards with the small buttons.
   When finished, click "Save changes": it downloads content.js. Upload that file to your site (replace the old one). */
(function(){
  "use strict";
  if(!/[#?&]edit\b/.test(location.hash+location.search))return;
  var CFG=window.__CFG||window.SITE_CONFIG||{};
  var $=function(s,r){return (r||document).querySelector(s)};
  var IDS=["siteBar","siteMain","siteFooter","siteFloat"];
  var TEXT="h1,h2,h3,h4,p,li,blockquote,summary,figcaption,.btn,.eyebrow,.pill,.fine,.hi,.hindi,.quote,.sig,.tag,.strip b,.strip span,.chips span,.courses span,.facts div,.brand,.av,.role,.sample-tag,.np-kick,.np-role,.np-meta,.nameplate b,.t footer b,.weeks b,.reveal-note,footer.site .wrap>div";
  var REPEAT="[data-repeat]";
  var dirty=false;

  document.body.classList.add("editing");
  document.querySelectorAll("#quizBox").forEach(function(q){q.setAttribute("data-noedit","")});

  function skip(el){return el.closest("[data-noedit],#quizBox,.ed-bar,.ed-modal")}
  function arm(root){
    root.querySelectorAll(TEXT).forEach(function(el){
      if(skip(el))return;
      if(el.querySelector(TEXT)&&el.tagName!=="LI"&&el.tagName!=="BLOCKQUOTE")return; // edit the innermost text blocks
      el.setAttribute("contenteditable","true");el.setAttribute("spellcheck","true");
    });
    root.querySelectorAll("img[data-img]").forEach(function(im){im.classList.add("ed-img");im.title="Click to replace this photo"});
    root.querySelectorAll(REPEAT).forEach(function(el){
      if(skip(el)||el.querySelector(":scope>.ed-tools"))return;
      el.classList.add("ed-rel");
      var t=document.createElement("div");t.className="ed-tools";t.setAttribute("contenteditable","false");
      t.innerHTML='<button type="button" data-act="dup" title="Duplicate this item">+ Copy</button><button type="button" data-act="del" title="Delete this item">Delete</button>';
      el.appendChild(t);
    });
    document.querySelectorAll("details").forEach(function(d){d.open=true});
  }

  /* toolbar */
  var bar=document.createElement("div");bar.className="ed-bar";
  bar.innerHTML='<b>Editing mode · click any text to edit, click any photo to replace it</b><button type="button" id="edSet">Settings (WhatsApp link, email)</button><button type="button" id="edReset">Discard draft</button><button type="button" class="pri" id="edSave">Save changes</button>';
  document.body.appendChild(bar);
  var file=document.createElement("input");file.type="file";file.accept="image/*";file.hidden=true;document.body.appendChild(file);

  arm(document);

  /* block navigation / toggles while editing */
  document.addEventListener("click",function(e){
    var a=e.target.closest("a[href]");
    if(a&&!a.closest(".ed-bar,.ed-modal")){e.preventDefault()}
    var s=e.target.closest("summary");if(s)e.preventDefault();
    var tool=e.target.closest(".ed-tools button");
    if(tool){e.preventDefault();e.stopPropagation();handleTool(tool);return}
    var im=e.target.closest("img[data-img]");
    if(im){e.preventDefault();pickImage(im)}
  },true);
  document.addEventListener("keydown",function(e){if(e.target.closest&&e.target.closest("summary")&&(e.key===" "||e.key==="Enter"))e.stopPropagation()},true);
  document.addEventListener("paste",function(e){
    var t=e.target.closest&&e.target.closest("[contenteditable=true]");if(!t)return;
    e.preventDefault();var txt=(e.clipboardData||window.clipboardData).getData("text/plain");document.execCommand("insertText",false,txt);
  });
  document.addEventListener("input",function(e){if(e.target.closest&&e.target.closest("[contenteditable=true]"))changed()});

  function handleTool(btn){
    var el=btn.closest(REPEAT);if(!el)return;
    if(btn.dataset.act==="dup"){
      var c=el.cloneNode(true);c.querySelectorAll(".ed-tools").forEach(function(x){x.remove()});
      el.after(c);arm(el.parentElement);changed();
    }else{
      if(btn.dataset.sure){el.remove();changed()}
      else{btn.dataset.sure="1";btn.textContent="Sure?";setTimeout(function(){btn.textContent="Delete";delete btn.dataset.sure},2500)}
    }
  }
  function pickImage(im){
    file.value="";
    file.onchange=function(){
      var f=file.files&&file.files[0];if(!f)return;
      var max=parseInt(im.getAttribute("data-max"),10)||1400,url=URL.createObjectURL(f),img=new Image();
      img.onload=function(){
        var s=Math.min(1,max/Math.max(img.width,img.height)),c=document.createElement("canvas");
        c.width=Math.round(img.width*s);c.height=Math.round(img.height*s);
        var g=c.getContext("2d");g.fillStyle="#fff";g.fillRect(0,0,c.width,c.height);g.drawImage(img,0,0,c.width,c.height);
        im.src=c.toDataURL("image/jpeg",.86);URL.revokeObjectURL(url);changed();
      };img.src=url;
    };file.click();
  }

  /* snapshot */
  function snapshot(){
    var out={};
    IDS.forEach(function(id){
      var el=document.getElementById(id);if(!el)return;
      var c=el.cloneNode(true);
      c.querySelectorAll(".ed-tools").forEach(function(x){x.remove()});
      c.querySelectorAll("[contenteditable]").forEach(function(x){x.removeAttribute("contenteditable");x.removeAttribute("spellcheck")});
      c.querySelectorAll(".ed-img").forEach(function(x){x.classList.remove("ed-img");x.removeAttribute("title")});
      c.querySelectorAll(".ed-rel").forEach(function(x){x.classList.remove("ed-rel");if(!x.getAttribute("class"))x.removeAttribute("class")});
      c.querySelectorAll("details").forEach(function(x){x.removeAttribute("open")});
      c.querySelectorAll("[data-wa]").forEach(function(x){x.setAttribute("href","#")});
      var qb=c.querySelector("#quizBox");if(qb)qb.innerHTML="";
      out[id]=c.innerHTML;
    });
    return out;
  }
  var t=null;
  function changed(){dirty=true;clearTimeout(t);t=setTimeout(function(){try{localStorage.setItem("kwtt_draft",JSON.stringify({html:snapshot(),cfg:CFG}))}catch(e){}},600)}
  window.addEventListener("beforeunload",function(e){if(dirty){e.preventDefault();e.returnValue=""}});

  $("#edSave").onclick=function(){
    var js="/* Saved from the visual editor on "+new Date().toISOString()+". Replace this file on your website. */\nwindow.SITE_CONFIG = "+JSON.stringify(CFG,null,2)+";\nwindow.SITE_HTML = "+JSON.stringify(snapshot())+";\n";
    var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([js],{type:"text/javascript"}));a.download="content.js";document.body.appendChild(a);a.click();a.remove();
    dirty=false;toast("content.js downloaded. Upload it to your website to publish these changes.");
  };
  $("#edReset").onclick=function(){try{localStorage.removeItem("kwtt_draft")}catch(e){}dirty=false;location.reload()};
  $("#edSet").onclick=settings;

  function settings(){
    var F=[["whatsapp","WhatsApp group link (used by every Join / Reserve button)","https://chat.whatsapp.com/..."],
      ["coachEmail","Coach email (gets a copy of every test result)","name@gmail.com"],
      ["emailjsService","EmailJS Service ID","service_xxxxx"],["emailjsTemplate","EmailJS Template ID","template_xxxxx"],["emailjsKey","EmailJS Public Key","xxxxxxxx"],
      ["leadWebhook","Google Sheet web-app URL (optional, stores every result)","https://script.google.com/..."],["pixelId","Meta Pixel ID (optional)","1234567890"]];
    var m=document.createElement("div");m.className="ed-modal";
    m.innerHTML='<div><h3>Settings</h3><small>The WhatsApp link changes for every new workshop. Paste the new one here.</small>'+
      F.map(function(f){return '<label for="s_'+f[0]+'">'+f[1]+'</label><input id="s_'+f[0]+'" type="text" placeholder="'+f[2]+'">'}).join("")+
      '<div class="row"><button type="button" id="sCancel">Cancel</button><button type="button" class="pri" id="sOk">Apply</button></div></div>';
    document.body.appendChild(m);
    F.forEach(function(f){$("#s_"+f[0],m).value=CFG[f[0]]||""});
    $("#sCancel",m).onclick=function(){m.remove()};
    $("#sOk",m).onclick=function(){F.forEach(function(f){CFG[f[0]]=$("#s_"+f[0],m).value.trim()});window.__bindWA&&window.__bindWA();changed();m.remove();toast("Settings applied. Click Save changes to download content.js.")};
  }
  function toast(msg){
    var d=document.createElement("div");d.className="ed-modal";d.style.background="transparent";d.style.pointerEvents="none";d.style.alignItems="end";
    d.innerHTML='<div style="width:auto;max-width:560px;background:#111;color:#fff;padding:14px 20px;border-radius:10px">'+msg+'</div>';document.body.appendChild(d);setTimeout(function(){d.remove()},3500);
  }
})();
