
// Shared site JS: sticky bar -> reservation, cookie banner, room filters, booking steps, concierge mock
(function(){
  var y=document.querySelectorAll('.year'); y.forEach(function(e){e.textContent='2026'});
  // Cookie banner
  var banner=document.getElementById('cookie-banner');
  try{ if(!localStorage.getItem('amc-cookies') && banner){ banner.classList.add('show'); } }catch(e){ if(banner) banner.classList.add('show'); }
  document.querySelectorAll('[data-cookie]').forEach(function(b){ b.addEventListener('click',function(){ try{localStorage.setItem('amc-cookies',b.getAttribute('data-cookie'));}catch(e){} if(banner) banner.classList.remove('show'); }); });
  // Sticky bar
  var sb=document.getElementById('sticky-form');
  if(sb){ sb.addEventListener('submit',function(ev){ ev.preventDefault(); var a=document.getElementById('sb-arr'), d=document.getElementById('sb-dep'), g=document.getElementById('sb-guests'); var q='?arrivee='+(a?a.value:'')+'&depart='+(d?d.value:'')+'&voyageurs='+(g?g.value:'2'); window.location.href='reservation.html'+q; }); }
  // Room filters (chambres page)
  var fbtns=document.querySelectorAll('[data-filter]');
  fbtns.forEach(function(b){ b.addEventListener('click',function(){ fbtns.forEach(function(x){x.setAttribute('aria-pressed','false')}); b.setAttribute('aria-pressed','true'); var f=b.getAttribute('data-filter'); document.querySelectorAll('.room').forEach(function(r){ var show=(f==='all'||r.getAttribute('data-cat')===f||r.getAttribute('data-cap')===f); r.style.display=show?'':'none'; }); var empty=document.getElementById('no-rooms'); if(empty){ var any=[...document.querySelectorAll('.room')].some(function(r){return r.style.display!=='none'}); empty.style.display=any?'none':'block'; } }); });
  // Booking flow
  var params=new URLSearchParams(location.search);
  var arr=document.getElementById('bk-arr'), dep=document.getElementById('bk-dep'), gv=document.getElementById('bk-guests');
  if(arr && params.get('arrivee')) arr.value=params.get('arrivee');
  if(dep && params.get('depart')) dep.value=params.get('depart');
  if(gv && params.get('voyageurs')) gv.value=params.get('voyageurs');
  if(params.get('chambre')){ var sel=document.querySelector('input[name="chambre"][value="'+params.get('chambre')+'"]'); if(sel) sel.checked=true; }
  if(params.get('offre')){ var o=document.getElementById('bk-offre'); if(o) o.textContent=params.get('offre'); }
  function nights(){ if(!arr||!dep||!arr.value||!dep.value) return null; var ms=(new Date(dep.value)-new Date(arr.value))/86400000; return ms>0?ms:null; }
  function goStep(n){ document.querySelectorAll('.step').forEach(function(s){s.classList.toggle('on',s.dataset.step==String(n))}); document.querySelectorAll('.steps span').forEach(function(s){s.classList.toggle('on',Number(s.dataset.step)===n)}); window.scrollTo({top:0,behavior:'smooth'}); }
  window.amcStep=function(n){ if(n===2){ if(!arr.value||!dep.value){ alert('Choisissez vos dates d\u2019arriv\u00e9e et de d\u00e9part.'); return; } if(nights()===null){ alert('La date de d\u00e9part doit \u00eatre apr\u00e8s la date d\u2019arriv\u00e9e.'); return; } } if(n===3){ var r=document.querySelector('input[name="chambre"]:checked'); if(!r){ alert('Choisissez une chambre pour continuer.'); return; } var sum=document.getElementById('bk-summary'); if(sum){ var room=r.value; sum.innerHTML='<dl><dt>Arriv\u00e9e</dt><dd>'+(arr.value||'—')+'</dd><dt>D\u00e9part</dt><dd>'+(dep.value||'—')+'</dd><dt>Dur\u00e9e</dt><dd>'+(nights()?nights()+' nuit(s)':'—')+'</dd><dt>Chambre</dt><dd>'+room+'</dd><dt>Voyageurs</dt><dd>'+(gv?gv.value:'—')+'</dd><dt>Tarif</dt><dd><strong>Tarif \u00e0 confirmer par la r\u00e9ception</strong> — aucun tarif de nuit n\u2019est affich\u00e9 sur cette d\u00e9mo.</dd></dl>'; } } goStep(n); };
  window.amcSubmit=function(ev){ ev.preventDefault(); var c=document.getElementById('bk-consent'); if(c && !c.checked){ alert('Cochez la case de consentement pour envoyer votre demande.'); return false; } goStep(4); var ref='AMC-2026-'+Math.floor(1000+Math.random()*9000); var el=document.getElementById('bk-ref'); if(el) el.textContent=ref; return false; };
  // Concierge mock
  var replies={
    table:"Bien s\u00fbr. Pour ce soir au Pop Art, indiquez-nous l\u2019heure et le nombre de convives, et la r\u00e9ception vous confirme la table. Souhaitez-vous aussi le petit-d\u00e9jeuner demain matin ?",
    casino:"Depuis l\u2019h\u00f4tel, rejoignez la place du Casino \u00e0 pied par l\u2019avenue Prince Pierre puis l\u2019avenue d\u2019Ostende. La distance exacte n\u2019est pas indiqu\u00e9e ici — la r\u00e9ception vous donne l\u2019itin\u00e9raire le plus simple \u00e0 votre arriv\u00e9e.",
    nice:"Nous pouvons organiser une voiture pour Nice, avec chauffeur, \u00e0 l\u2019heure de votre choix. Indiquez-nous l\u2019heure de d\u00e9part et le nombre de passagers, et la r\u00e9ception vous confirme la disponibilit\u00e9 et le tarif."
  };
  document.querySelectorAll('[data-exchange]').forEach(function(b){ b.addEventListener('click',function(){ var k=b.getAttribute('data-exchange'); var log=document.getElementById('chat-log'); if(!log) return; var q=document.createElement('div'); q.className='bubble me'; q.textContent=b.textContent.trim(); var a=document.createElement('div'); a.className='bubble them'; a.textContent=replies[k]||'La r\u00e9ception vous r\u00e9pond ici.'; log.appendChild(q); log.appendChild(a); log.scrollTop=log.scrollHeight; }); });
})();
