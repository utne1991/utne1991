const { JSDOM } = require('jsdom');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const path=require('node:path');
const root=path.resolve(__dirname,'../design')+path.sep;
const html=fs.readFileSync(root+'pms-wireframes.html','utf8');
const js=fs.readFileSync(root+'pms-wireframes.js','utf8');
const dom=new JSDOM(html,{url:'https://design.example.test/pms-wireframes.html',runScripts:'outside-only'});
const w=dom.window,d=w.document;
w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','');};
w.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open');};
w.eval(js+'\nwindow.designCheck={render,openForm,forms,pageInfo};');
const app=w.designCheck;
const page=(id)=>{w.location.hash=id;d.getElementById('page-state').value='ready';app.render();};
assert.equal(d.querySelectorAll('#navigation a').length,9);
assert.equal(d.querySelectorAll('#mobile-navigation a').length,4);
assert.equal(d.querySelectorAll('[data-room]').length,100);
for(const [cls,n] of [['occupied',74],['ready',10],['dirty',6],['cleaning',4],['maintenance',6]])assert.equal(d.querySelectorAll('.room.'+cls).length,n);
let cases=0;
for(const id of Object.keys(app.pageInfo)){
 page(id);assert.equal(d.getElementById('screen-id').textContent,id);
 if(id.startsWith('mobile-'))assert(d.querySelector('.phone'));
 for(const state of ['loading','empty','error','stale','denied']){
  d.getElementById('page-state').value=state;app.render();assert(d.querySelector('#state-message .'+state));
  if(state==='stale')assert([...d.querySelectorAll('#content button')].every(b=>b.disabled));
  else assert.equal(d.getElementById('content').children.length,0);
  cases++;
 }
}
page('UI02');const picker=d.getElementById('calendar-days');
for(const days of [7,30,90]){picker.value=String(days);picker.dispatchEvent(new w.Event('change'));assert.equal(d.querySelectorAll('#calendar thead th').length,days+1);}
assert(d.querySelector('#calendar thead').textContent.includes('1/11'));
let saved=0;
for(const key of Object.keys(app.forms)){
 page('UI01');app.openForm(key);assert(d.getElementById('form-dialog').open);
 let dates=0;
 for(const input of d.querySelectorAll('#fields input,#fields select')){
  if(input.tagName==='SELECT')continue;
  input.value=input.type==='date'?(++dates===1?'2026-10-26':'2026-10-28'):input.type==='datetime-local'?'2026-10-26T12:00':input.type==='number'?'100000':'<img src=x> Mẫu';
 }
 const before=[...d.querySelectorAll('#fields input,#fields select')].map(x=>x.value);
 d.getElementById('simulate-conflict').checked=true;
 d.getElementById('sample-form').dispatchEvent(new w.Event('submit',{cancelable:true,bubbles:true}));
 assert(d.getElementById('form-error').textContent.includes('Xung đột'));
 assert.equal(Number(d.getElementById('draft-count').textContent),saved);
 assert.deepEqual([...d.querySelectorAll('#fields input,#fields select')].map(x=>x.value),before);
 d.getElementById('simulate-conflict').checked=false;
 d.getElementById('sample-form').dispatchEvent(new w.Event('submit',{cancelable:true,bubbles:true}));
 assert.equal(Number(d.getElementById('draft-count').textContent),++saved);
 assert.equal(d.getElementById('form-dialog').open,false);
 assert.equal(d.querySelectorAll('#draft-list img').length,0);
}
app.openForm('booking');const dateInputs=d.querySelectorAll('#fields input[type=date]');dateInputs[0].value='2026-10-28';dateInputs[1].value='2026-10-26';
d.getElementById('sample-form').dispatchEvent(new w.Event('submit',{cancelable:true,bubbles:true}));assert(d.getElementById('form-error').textContent.includes('Ngày trả'));assert.equal(Number(d.getElementById('draft-count').textContent),saved);
d.getElementById('cancel-dialog').click();assert.equal(d.getElementById('form-dialog').open,false);assert.equal(Number(d.getElementById('draft-count').textContent),saved);
console.log(JSON.stringify({result:'PASS',desktopViews:9,mobileViews:4,stateCases:cases,calendarRanges:[7,30,90],forms:Object.keys(app.forms).length,conflictPreservesInput:true,invalidDatesBlocked:true,cancelDoesNotSave:true,submittedTextNotHTML:true,scope:'DOM-only; native dialog APIs stubbed. No real browser, CSS layout, backend, PMS, money or authorization tested.'},null,2));
dom.window.close();
