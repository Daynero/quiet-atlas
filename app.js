'use strict';
const data = window.KNOWLEDGE;
const main = document.querySelector('main');
const labels = {rules:'Аналіз запусків',tests:'Тести',geo:'Географія',offers:'Офери',control:'Правила контролю'};
const escapeHTML = value => String(value).replace(/[&<>"']/g, x => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
function renderTests() {
 if (!data.tests.length) return `<section class="test-empty"><div class="empty-orbit">◇</div><h2>Перший тест — попереду</h2><p>Порівнюватимемо різні геовиключення в Туреччині,<br>щоб оцінити якість лідів. Реальні запуски ще не додано.</p><span class="subtle">Без вигаданих кампаній і результатів.</span></section>`;
 return `<div class="test-records">${data.tests.map(test=>`<article class="test-record"><div class="record-head"><h2>${escapeHTML(test.sub2 || 'Sub 2 ще не вказано')}</h2><span class="pill">${escapeHTML(test.status || 'Без статусу')}</span></div><dl>${[['Дата старту',test.started],['Що тестуємо',test.hypothesis],['Геовиключення',Array.isArray(test.exclusions)?test.exclusions.join(', '):test.exclusions],['З чим порівнюємо',test.comparison],['Результат і висновок',test.result]].map(([label,value])=>`<div><dt>${label}</dt><dd>${escapeHTML(value || 'Ще не уточнено')}</dd></div>`).join('')}</dl></article>`).join('')}</div>`;
}
function renderRules(query='') {
 const filtered=data.rules.filter(r=>`${r.title} ${r.text} ${r.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase().trim()));
 document.querySelector('#rules-grid').innerHTML=filtered.map((r,i)=>`<article class="rule-card"><div class="card-top"><span class="rule-icon">${r.icon}</span><span class="card-label">${r.label}</span></div><h3>${r.title}</h3><p>${r.text}</p><div class="tags">${r.tags.map(t=>`<span>${t}</span>`).join('')}</div></article>`).join('');
 document.querySelector('#no-results').hidden=filtered.length>0;
}
function render() {
 const requested=location.hash.slice(1)||'rules';
 const page=Object.hasOwn(labels,requested)?requested:'rules';
 document.querySelector('#crumb').textContent=labels[page];
 document.title=`${labels[page]} · База баїнгу`;
 document.querySelectorAll('nav a').forEach(a=>{const on=a.dataset.page===page; a.classList.toggle('active',on); if(on)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 if(page==='rules') {
  main.replaceChildren(document.querySelector('#rules-template').content.cloneNode(true));
  renderRules(); document.querySelector('#search').addEventListener('input',e=>renderRules(e.target.value));
  document.querySelector('#pending-list').innerHTML=data.pending.map(t=>`<li>${t}</li>`).join('');
 } else if(page==='tests') {
  main.innerHTML=`<section class="page-heading compact"><div><div class="eyebrow">ЕКСПЕРИМЕНТИ</div><h1>Кожен тест.<br><span>У своєму контексті.</span></h1><p>Деталі запусків зберігаємо окремо від загальних правил.</p></div><span class="count-badge">${data.tests.length} тестів</span></section><section class="test-info"><span class="pill">ІДЕНТИФІКАТОР ЗАПУСКУ</span><h2>Sub 2, не назва оголошення</h2><p>Запуск прив’язуємо до значення Sub 2. Конкретний ідентифікатор, умови та геовиключення додаємо лише після уточнення.</p></section>${renderTests()}<section class="test-fields"><h2>Що буде в картці тесту</h2><div>${data.testFields.map((s,i)=>`<span><b>0${i+1}</b>${s}</span>`).join('')}</div></section>`;
 } else if(page==='control') {
  main.innerHTML=`<section class="page-heading compact"><div><div class="eyebrow">ОПЕРАЦІЙНІ ПРАВИЛА</div><h1>Спочатку перевірка.<br><span>Потім рекомендація.</span></h1><p>Перевірені обмеження роботи зі статусами.<br>Не готова стратегія автоматичного контролю.</p></div></section><div class="rules-grid">${data.operations.map((r,i)=>`<article class="rule-card"><span class="card-label">ПРАВИЛО 0${i+1}</span><h3>${r.title}</h3><p>${r.text}</p></article>`).join('')}</div><aside class="note"><b>Погодинний контроль ще не налаштований.</b><p>Потрібно погодити метрики, мінімальний обсяг даних і правила сповіщень. Ця сторінка сама не підключається до AIO.</p></aside>`;
 } else {
  const isGeo=page==='geo';
  main.innerHTML=`<section class="page-heading compact"><div><div class="eyebrow">${isGeo?'КРАЇНИ ТА РЕГІОНИ':'ПРОДУКТИ ТА ПІДХОДИ'}</div><h1>${labels[page]}<br><span>Місце для перевірених знань.</span></h1></div></section><section class="test-empty"><div class="empty-orbit">${isGeo?'◎':'▧'}</div><h2>Поки без окремих висновків</h2><p>${isGeo?'Результати геотестів з’являться тут після порівняння запусків.':'Окремі правила за оферами додамо, коли сформулюємо їх разом.'}</p><a class="text-link" href="${isGeo?'#tests':'#rules'}">${isGeo?'Перейти до тестів':'Правила ProCaps TR'} <span>↗</span></a></section>`;
 }
}
window.addEventListener('hashchange',render);
document.querySelectorAll('[data-export]').forEach(button=>button.addEventListener('click',()=>{
 const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json;charset=utf-8'});
 const url=URL.createObjectURL(blob), a=document.createElement('a');
 a.href=url;a.download=`buying-knowledge-v${data.version}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}));
render();
