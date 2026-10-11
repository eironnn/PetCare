// @ts-nocheck
// CarePaws staff prototype — ported from the static build.
// UI logic runs as the original vanilla script inside useEffect;
// refactor into React state/hooks progressively as features go live.
"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {

        (function () {
          var appointments = [
            {id:1,time:'9:00 AM',date:7,pet:'Milo',breed:'Golden Retriever',owner:'Ana Reyes',type:'Annual wellness exam',status:'completed',notes:'Routine annual wellness check.'},
            {id:2,time:'10:30 AM',date:7,pet:'Luna',breed:'Persian Cat',owner:'Paolo Cruz',type:'Vaccination',status:'confirmed',notes:'Scheduled booster vaccination.'},
            {id:3,time:'11:15 AM',date:7,pet:'Choco',breed:'Shih Tzu',owner:'Mia Santos',type:'Skin concern follow-up',status:'confirmed',notes:'Follow-up after seven days of treatment.'},
            {id:4,time:'1:30 PM',date:7,pet:'Oreo',breed:'Domestic Shorthair',owner:'Ben Flores',type:'General consultation',status:'pending',notes:'Owner reports reduced appetite.'},
            {id:5,time:'2:15 PM',date:7,pet:'Coco',breed:'Pomeranian',owner:'Ella Ramos',type:'Dental check',status:'confirmed',notes:'First dental assessment.'},
            {id:6,time:'3:00 PM',date:7,pet:'Bruno',breed:'Labrador',owner:'Noel Garcia',type:'Vaccination',status:'pending',notes:'Booking request from owner app.'},
            {id:7,time:'4:00 PM',date:7,pet:'Ming',breed:'Siamese Cat',owner:'Ivy Lim',type:'General consultation',status:'pending',notes:'Occasional sneezing.'},
            {id:8,time:'4:45 PM',date:7,pet:'Bubbles',breed:'Poodle',owner:'Kai Dizon',type:'Follow-up',status:'confirmed',notes:'Post-procedure follow-up.'},
            {id:9,time:'9:30 AM',date:5,pet:'Pepper',breed:'Aspin',owner:'Lia Tan',type:'Wellness exam',status:'completed',notes:''},
            {id:10,time:'1:00 PM',date:6,pet:'Kitkat',breed:'Domestic Shorthair',owner:'Sam Ong',type:'Vaccination',status:'completed',notes:''},
            {id:11,time:'10:00 AM',date:8,pet:'Pochi',breed:'Pug',owner:'Nina Valdez',type:'General consultation',status:'confirmed',notes:''},
            {id:12,time:'2:30 PM',date:9,pet:'Snow',breed:'Samoyed',owner:'Ria Bautista',type:'Dental check',status:'confirmed',notes:''},
            {id:13,time:'11:30 AM',date:10,pet:'Toby',breed:'Beagle',owner:'Ian Yu',type:'Vaccination',status:'confirmed',notes:''}
          ];
          var patients = [
            {id:'CP-10248',name:'Milo',species:'Dog',breed:'Golden Retriever',sex:'Male',age:'4 years',weight:'28.4 kg',owner:'Ana Reyes',contact:'0917 555 0142',updated:'Today',allergy:'No known allergies',careAlert:'Weight increased 1.8 kg since the previous wellness exam.',visits:[{date:'Oct 7, 2026',type:'Annual wellness exam',note:'Normal physical examination. Discussed portion control and daily activity.',vet:'Dr. Santos'},{date:'Apr 2, 2026',type:'Heartworm screening',note:'Antigen test negative. Continued monthly prevention.',vet:'Dr. Santos'},{date:'Oct 5, 2025',type:'Vaccination',note:'Rabies booster administered; no adverse reaction observed.',vet:'Dr. Lim'}],vaccines:[{name:'Rabies',given:'Oct 5, 2025',due:'Oct 5, 2026',state:'soon'},{name:'DHPP',given:'Jan 18, 2026',due:'Jan 18, 2027',state:'current'}],medications:[{name:'Heartgard Plus',instruction:'1 chew monthly',status:'Active'},{name:'Ear cleanser',instruction:'Use once weekly',status:'As needed'}]},
            {id:'CP-10247',name:'Luna',species:'Cat',breed:'Persian Cat',sex:'Female',age:'3 years',weight:'4.2 kg',owner:'Paolo Cruz',contact:'0918 555 0188',updated:'Today',allergy:'No known allergies',careAlert:'Booster vaccination is due today.',visits:[{date:'Oct 7, 2026',type:'Vaccination',note:'Pre-vaccination assessment completed; patient cleared for booster.',vet:'Dr. Santos'},{date:'Jun 21, 2026',type:'Skin assessment',note:'Mild chin irritation; hygiene plan discussed with owner.',vet:'Dr. Lim'}],vaccines:[{name:'FVRCP',given:'Oct 7, 2025',due:'Oct 7, 2026',state:'soon'},{name:'Rabies',given:'Mar 10, 2026',due:'Mar 10, 2027',state:'current'}],medications:[{name:'Omega-3 supplement',instruction:'1 capsule with food daily',status:'Active'}]},
            {id:'CP-10196',name:'Choco',species:'Dog',breed:'Shih Tzu',sex:'Male',age:'6 years',weight:'6.8 kg',owner:'Mia Santos',contact:'0920 555 0117',updated:'Today',allergy:'Chicken protein',careAlert:'Documented chicken protein allergy. Check flavored medications before dispensing.',visits:[{date:'Oct 7, 2026',type:'Skin concern follow-up',note:'Reduced redness and scratching after seven days of treatment.',vet:'Dr. Santos'},{date:'Sep 30, 2026',type:'Dermatology consultation',note:'Superficial dermatitis suspected; skin scraping was negative.',vet:'Dr. Santos'}],vaccines:[{name:'Rabies',given:'Feb 4, 2026',due:'Feb 4, 2027',state:'current'},{name:'DHPP',given:'Feb 4, 2026',due:'Feb 4, 2027',state:'current'}],medications:[{name:'Medicated shampoo',instruction:'Bathe twice weekly for 3 weeks',status:'Active'},{name:'Cetirizine',instruction:'As directed for 7 days',status:'Course ending'}]},
            {id:'CP-10211',name:'Oreo',species:'Cat',breed:'Domestic Shorthair',sex:'Male',age:'2 years',weight:'5.1 kg',owner:'Ben Flores',contact:'0919 555 0174',updated:'Yesterday',allergy:'No known allergies',careAlert:'Owner reported reduced appetite in the current appointment request.',visits:[{date:'Jul 16, 2026',type:'Wellness exam',note:'Bright and alert; body condition and dental health within expected range.',vet:'Dr. Lim'}],vaccines:[{name:'FVRCP',given:'Jul 16, 2026',due:'Jul 16, 2027',state:'current'},{name:'Rabies',given:'Jul 16, 2026',due:'Jul 16, 2027',state:'current'}],medications:[]},
            {id:'CP-10172',name:'Coco',species:'Dog',breed:'Pomeranian',sex:'Female',age:'5 years',weight:'4.9 kg',owner:'Ella Ramos',contact:'0917 555 0136',updated:'Sep 28',allergy:'No known allergies',careAlert:'Dental assessment is scheduled for this afternoon.',visits:[{date:'Sep 28, 2026',type:'General consultation',note:'Owner noted occasional difficulty chewing dry food.',vet:'Dr. Santos'}],vaccines:[{name:'Rabies',given:'May 12, 2026',due:'May 12, 2027',state:'current'},{name:'DHPP',given:'May 12, 2026',due:'May 12, 2027',state:'current'}],medications:[]},
            {id:'CP-10084',name:'Bruno',species:'Dog',breed:'Labrador',sex:'Male',age:'7 years',weight:'34.6 kg',owner:'Noel Garcia',contact:'0918 555 0196',updated:'Sep 17',allergy:'No known allergies',careAlert:'Senior wellness bloodwork recommended at the next examination.',visits:[{date:'Sep 17, 2026',type:'Mobility consultation',note:'Mild stiffness after rest; weight management and low-impact activity discussed.',vet:'Dr. Lim'},{date:'Mar 3, 2026',type:'Annual wellness exam',note:'Routine examination completed.',vet:'Dr. Santos'}],vaccines:[{name:'Rabies',given:'Mar 3, 2026',due:'Mar 3, 2027',state:'current'},{name:'DHPP',given:'Mar 3, 2026',due:'Mar 3, 2027',state:'current'}],medications:[{name:'Joint supplement',instruction:'2 chews with food daily',status:'Active'}]}
          ];
          var inventory = [
            {id:1,sku:'VAC-RAB-C',name:'Canine rabies vaccine',category:'Vaccine',stock:3,reorder:12,unit:'doses',expiry:'Dec 18, 2026',expirySoon:true,supplier:'VetBio Distribution'},
            {id:2,sku:'SUP-SYR-3',name:'Disposable syringes · 3 mL',category:'Supply',stock:18,reorder:50,unit:'pieces',expiry:'—',expirySoon:false,supplier:'MediSupply PH'},
            {id:3,sku:'MED-AMX-100',name:'Amoxicillin · 100 mg',category:'Medicine',stock:24,reorder:20,unit:'tablets',expiry:'Feb 14, 2027',expirySoon:false,supplier:'Animal Health Trading'},
            {id:4,sku:'SUP-GLV-M',name:'Examination gloves · Medium',category:'Supply',stock:85,reorder:60,unit:'pieces',expiry:'—',expirySoon:false,supplier:'MediSupply PH'},
            {id:5,sku:'VAC-FVRCP',name:'FVRCP vaccine',category:'Vaccine',stock:8,reorder:10,unit:'doses',expiry:'Jan 9, 2027',expirySoon:false,supplier:'VetBio Distribution'},
            {id:6,sku:'MED-ANT-500',name:'Antiseptic solution · 500 mL',category:'Medicine',stock:6,reorder:8,unit:'bottles',expiry:'Nov 22, 2026',expirySoon:true,supplier:'Animal Health Trading'},
            {id:7,sku:'PRE-DEW-10',name:'Deworming tablets · 10 kg',category:'Preventive',stock:42,reorder:15,unit:'tablets',expiry:'May 30, 2027',expirySoon:false,supplier:'PetMed Wholesale'},
            {id:8,sku:'SUP-MIC-01',name:'Microchip applicators',category:'Supply',stock:2,reorder:5,unit:'kits',expiry:'—',expirySoon:false,supplier:'MediSupply PH'}
          ];
          var triageCases = [
            {id:1,pet:'Bella',breed:'Beagle',owner:'Carla Mendoza',submitted:'18 min ago',priority:'high',status:'open',symptoms:['Low appetite','Lethargy','Drinking less'],duration:'Since yesterday',photo:'No photo attached',history:'No related concern recorded',summary:'The symptom combination may indicate dehydration, pain, gastrointestinal illness, infection, or another systemic concern. A same-day veterinary assessment is appropriate if symptoms persist or worsen.',signals:['Confirm water intake and urination.','Check temperature, hydration, and abdominal comfort.','Escalate urgently for collapse, repeated vomiting, breathing difficulty, or pale gums.']},
            {id:2,pet:'Max',breed:'Aspin',owner:'Jordan Lee',submitted:'1 hr ago',priority:'moderate',status:'open',symptoms:['Persistent scratching','Red skin','Hair thinning'],duration:'5 days',photo:'1 owner photo noted',history:'Flea preventive due this month',summary:'The pattern may be consistent with parasites, contact irritation, allergy, or superficial skin infection. Review the skin directly before recommending treatment.',signals:['Ask about flea exposure and recent grooming products.','Inspect ears, paws, abdomen, and affected skin.','Consider skin scraping or cytology if lesions are present.']},
            {id:3,pet:'Oreo',breed:'Domestic Shorthair',owner:'Ben Flores',submitted:'Yesterday',priority:'moderate',status:'reviewed',symptoms:['Reduced appetite'],duration:'2 days',photo:'No photo attached',history:'General consultation booked today',summary:'Reduced appetite is non-specific. The existing clinic appointment is the appropriate next step, with escalation if the patient stops eating completely or develops additional signs.',signals:['Confirm last full meal and water intake.','Ask about vomiting, stool changes, and hiding behavior.','Review oral comfort during examination.']},
            {id:4,pet:'Pochi',breed:'Pug',owner:'Nina Valdez',submitted:'Oct 6 · 3:42 PM',priority:'moderate',status:'reviewed',symptoms:['Intermittent cough','Restlessness'],duration:'3 days',photo:'No photo attached',history:'Consultation scheduled October 8',summary:'Intermittent coughing has several possible causes and requires a physical examination. Earlier assessment is warranted if breathing effort increases.',signals:['Ask for a short video if coughing recurs.','Assess breathing rate and effort.','Escalate for blue gums, collapse, or sustained distress.']}
          ];
          var reportSets = {
            week:{label:'October 5–11, 2026',appointments:31,completion:'87%',triage:16,breakdown:[['General consultations',11],['Vaccinations',8],['Wellness exams',6],['Follow-ups',4],['Dental checks',2]]},
            month:{label:'October 2026',appointments:96,completion:'84%',triage:43,breakdown:[['General consultations',34],['Vaccinations',25],['Wellness exams',18],['Follow-ups',12],['Dental checks',7]]},
            quarter:{label:'October 1–7, 2026',appointments:67,completion:'86%',triage:29,breakdown:[['General consultations',24],['Vaccinations',17],['Wellness exams',13],['Follow-ups',8],['Dental checks',5]]}
          };
          var invoices = [
            {id:'INV-2026-1004',appointmentId:2,patient:'Luna',owner:'Paolo Cruz',date:'Oct 7, 2026',due:'Oct 14, 2026',status:'paid',items:[{name:'Vaccination consultation',qty:1,price:450},{name:'FVRCP booster',qty:1,price:500}]},
            {id:'INV-2026-1003',appointmentId:1,patient:'Milo',owner:'Ana Reyes',date:'Oct 7, 2026',due:'Oct 7, 2026',status:'paid',items:[{name:'Annual wellness exam',qty:1,price:850},{name:'Complete blood count',qty:1,price:1000}]},
            {id:'INV-2026-1002',appointmentId:3,patient:'Choco',owner:'Mia Santos',date:'Oct 7, 2026',due:'Oct 14, 2026',status:'pending',items:[{name:'Follow-up consultation',qty:1,price:500},{name:'Skin cytology',qty:1,price:450},{name:'Medicated shampoo',qty:1,price:250}]},
            {id:'INV-2026-1001',appointmentId:null,patient:'Bella',owner:'Carla Mendoza',date:'Sep 29, 2026',due:'Oct 6, 2026',status:'overdue',items:[{name:'Emergency consultation',qty:1,price:900},{name:'Laboratory panel',qty:1,price:1350},{name:'Fluid therapy',qty:1,price:500}]}
          ];
          var notifications = [
            {id:1,type:'appointment',title:'Appointment reminder',message:'Luna’s vaccination is scheduled at 10:30 AM today.',time:'8 min ago',read:false,target:'appointments'},
            {id:2,type:'inventory',title:'Critical stock alert',message:'Canine rabies vaccine is below its reorder level.',time:'22 min ago',read:false,target:'inventory'},
            {id:3,type:'triage',title:'New AI triage submission',message:'Bella’s low appetite and lethargy report needs review.',time:'35 min ago',read:false,target:'triage'},
            {id:4,type:'billing',title:'Invoice overdue',message:'INV-2026-1001 for Bella is now overdue.',time:'Yesterday',read:true,target:'billing'},
            {id:5,type:'appointment',title:'Booking request confirmed',message:'Bruno’s vaccination request was added to the clinic queue.',time:'Yesterday',read:true,target:'appointments'}
          ];
          var staffAccounts = [
            {id:1,name:'Clinic Admin',role:'admin',email:'admin@carepaws.demo',phone:'',status:'active',lastActive:'Now'},
            {id:2,name:'Dr. Santos',role:'vet',email:'vet@carepaws.demo',phone:'',status:'active',lastActive:'12 min ago'},
            {id:3,name:'Front Desk',role:'receptionist',email:'reception@carepaws.demo',phone:'',status:'active',lastActive:'28 min ago'},
            {id:4,name:'Dr. Lim',role:'vet',email:'lim@carepaws.demo',phone:'',status:'active',lastActive:'Yesterday'},
            {id:5,name:'Mara Reyes',role:'receptionist',email:'mara@carepaws.demo',phone:'',status:'inactive',lastActive:'Sep 30'}
          ];
          var activeDateKey = '2026-10-07';
          var weekStart = new Date('2026-10-05T00:00:00');
          var activeView = 'list';
          var selectedId = null;
          var selectedPatientId = patients[0].id;
          var selectedTriageId = triageCases[0].id;
          var selectedInvoiceId = invoices[0].id;
          var selectedStaffId = null;
          var toastTimer;
          var currentUser = null;
          var failedLoginAttempts = 0;
          var loginLockedUntil = 0;
          var demoUsers = [
            {email:'admin@carepaws.demo',password:'CarePawsAdmin!',name:'Clinic Admin',phone:'',role:'admin',roleLabel:'Administrator'},
            {email:'vet@carepaws.demo',password:'CarePawsVet!',name:'Dr. Santos',phone:'',role:'vet',roleLabel:'Veterinarian'},
            {email:'reception@carepaws.demo',password:'CarePawsDesk!',name:'Front Desk',phone:'',role:'receptionist',roleLabel:'Receptionist'}
          ];
          var clinicProfile = {name:'Pet Care Veterinary Clinic',email:'',phone:'',address:'Single-branch clinic'};
          var notificationPreferences = {emailAppointments:true,smsAppointments:false,emailStock:true,smsStock:false};
          var appearance = 'system';

          function escapeHtml(text) {
            return String(text || '').replace(/[&<>'"]/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]; });
          }
          function initials(name) { return String(name).split(/\s+/).map(function(x){return x[0];}).join('').slice(0,2).toUpperCase(); }
          function statusLabel(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
          function roleLabel(role) { return role === 'admin' ? 'Administrator' : role === 'vet' ? 'Veterinarian' : 'Receptionist'; }
          function formatCurrency(value) { return '₱' + Number(value || 0).toLocaleString('en-PH',{minimumFractionDigits:2,maximumFractionDigits:2}); }
          function invoiceTotal(invoice) { return invoice.items.reduce(function(sum,item){ return sum + Number(item.qty) * Number(item.price); },0); }
          function dateKey(date) {
            var year = date.getFullYear();
            var month = String(date.getMonth() + 1).padStart(2, '0');
            var day = String(date.getDate()).padStart(2, '0');
            return year + '-' + month + '-' + day;
          }
          function appointmentDateKey(appointment) {
            return appointment.dateKey || '2026-10-' + String(appointment.date).padStart(2, '0');
          }
          function parseDateKey(key) {
            var parts = key.split('-').map(Number);
            return new Date(parts[0], parts[1] - 1, parts[2]);
          }
          function formatLongDate(key) {
            return parseDateKey(key).toLocaleDateString('en-US', {weekday:'long', month:'long', day:'numeric', year:'numeric'});
          }
          function renderDateStrip() {
            var chips = document.querySelectorAll('.date-chip');
            chips.forEach(function(chip, index){
              var date = new Date(weekStart);
              date.setDate(weekStart.getDate() + index);
              var key = dateKey(date);
              chip.dataset.dateKey = key;
              chip.querySelector('span').textContent = date.toLocaleDateString('en-US', {weekday:'short'});
              chip.querySelector('strong').textContent = date.getDate();
              chip.classList.toggle('active', key === activeDateKey);
              chip.setAttribute('aria-label', date.toLocaleDateString('en-US', {weekday:'long', month:'long', day:'numeric', year:'numeric'}));
            });
            var end = new Date(weekStart);
            end.setDate(weekStart.getDate() + 6);
            document.querySelector('.date-strip').setAttribute('aria-label', 'Week of ' + weekStart.toLocaleDateString('en-US', {month:'long', day:'numeric', year:'numeric'}) + ' through ' + end.toLocaleDateString('en-US', {month:'long', day:'numeric', year:'numeric'}));
          }
          function getSelectedPatient() { return patients.find(function(p){ return p.id === selectedPatientId; }) || patients[0]; }
          function renderPatients() {
            var q = document.getElementById('record-search').value.trim().toLowerCase();
            var species = document.getElementById('species-filter').value;
            var rows = patients.filter(function(p){
              var haystack = (p.name + ' ' + p.owner + ' ' + p.id + ' ' + p.breed).toLowerCase();
              return (species === 'all' || p.species === species) && (!q || haystack.indexOf(q) !== -1);
            });
            document.getElementById('record-count').textContent = rows.length + (rows.length === 1 ? ' patient record' : ' patient records');
            var list = document.getElementById('patient-list');
            if (!rows.length) {
              list.innerHTML = '<div class="record-empty"><strong>No patient records found</strong><span>Try a different patient, owner, ID, or species.</span></div>';
              return;
            }
            if (!rows.some(function(p){return p.id === selectedPatientId;})) selectedPatientId = rows[0].id;
            list.innerHTML = rows.map(function(p){ return '<button class="patient-item '+(p.id === selectedPatientId ? 'active':'')+'" type="button" data-patient-id="'+escapeHtml(p.id)+'">'+
              '<span class="pet-avatar">'+initials(p.name)+'</span><span><strong>'+escapeHtml(p.name)+'</strong><span class="patient-meta">'+escapeHtml(p.breed)+' · '+escapeHtml(p.owner)+'</span></span>'+
              '<span class="record-updated"><strong>'+escapeHtml(p.updated)+'</strong>Updated</span></button>'; }).join('');
            list.querySelectorAll('.patient-item').forEach(function(item){ item.addEventListener('click', function(){
              selectedPatientId = item.dataset.patientId; renderPatients(); renderRecord(); document.getElementById('records-layout').classList.add('show-record');
            });});
          }
          function renderRecord() {
            var p = getSelectedPatient();
            document.getElementById('record-avatar').textContent = initials(p.name);
            document.getElementById('record-name').textContent = p.name;
            document.getElementById('record-subtitle').textContent = p.breed + ' · ' + p.sex + ' · ' + p.age;
            document.getElementById('record-overview').innerHTML =
              '<div class="patient-facts"><div class="patient-fact"><span>Record ID</span><strong>'+escapeHtml(p.id)+'</strong></div><div class="patient-fact"><span>Weight</span><strong>'+escapeHtml(p.weight)+'</strong></div><div class="patient-fact"><span>Owner</span><strong>'+escapeHtml(p.owner)+'</strong></div><div class="patient-fact"><span>Contact</span><strong>'+escapeHtml(p.contact)+'</strong></div></div>'+
              '<div class="record-section"><div class="record-section-head"><h3>Care note</h3><span>For clinical review</span></div><div class="care-alert"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 9v4M12 17h.01"/><path d="M10.3 4.2 2.8 17.1a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0Z"/></svg><div><strong>'+escapeHtml(p.allergy)+'</strong><span>'+escapeHtml(p.careAlert)+'</span></div></div></div>'+
              '<div class="record-section"><div class="record-section-head"><h3>Recent clinical activity</h3><span>'+p.visits.length+' recorded visit'+(p.visits.length === 1 ? '':'s')+'</span></div>'+historyMarkup(p.visits.slice(0,2))+'</div>';
            document.getElementById('record-visits').innerHTML = '<div class="record-section"><div class="record-section-head"><h3>Visit history</h3><span>Newest first</span></div>'+historyMarkup(p.visits)+'</div>';
            document.getElementById('record-vaccines').innerHTML = '<div class="record-section"><div class="record-section-head"><h3>Vaccination record</h3><span>'+p.vaccines.length+' entries</span></div>'+p.vaccines.map(function(v){return '<div class="vaccine-row"><strong>'+escapeHtml(v.name)+'</strong><span>Given '+escapeHtml(v.given)+'</span><span>Due '+escapeHtml(v.due)+'</span><span class="due-label '+(v.state === 'soon'?'soon':'')+'">'+(v.state === 'soon'?'Due soon':'Current')+'</span></div>';}).join('')+'</div>';
            document.getElementById('record-medications').innerHTML = '<div class="record-section"><div class="record-section-head"><h3>Medication & care plan</h3><span>'+p.medications.length+' active</span></div>'+(p.medications.length ? p.medications.map(function(m){return '<div class="medication-row"><strong>'+escapeHtml(m.name)+'</strong><span>'+escapeHtml(m.instruction)+'</span><span class="due-label">'+escapeHtml(m.status)+'</span><span></span></div>';}).join('') : '<div class="record-empty"><strong>No active medications</strong><span>No medication or home-care plan is currently recorded.</span></div>')+'</div>';
          }
          function historyMarkup(visits) {
            return '<div class="history-list">'+visits.map(function(v){return '<div class="history-item"><div class="history-date"><strong>'+escapeHtml(v.date.split(',')[0])+'</strong><span>'+escapeHtml(v.date.split(',').slice(1).join(',').trim())+'</span></div><div class="history-copy"><strong>'+escapeHtml(v.type)+'</strong><p>'+escapeHtml(v.note)+'</p></div><span class="vet-label">'+escapeHtml(v.vet)+'</span></div>';}).join('')+'</div>';
          }
          function switchRecordTab(tab) {
            document.querySelectorAll('.record-tab').forEach(function(btn){ var active = btn.dataset.recordTab === tab; btn.classList.toggle('active', active); btn.setAttribute('aria-selected', active ? 'true':'false'); });
            document.querySelectorAll('.record-pane').forEach(function(pane){ pane.classList.toggle('active', pane.id === 'record-' + tab); });
          }
          function resetAppointmentForm() {
            document.getElementById('add-form').reset();
            document.getElementById('visit-date').value = '2026-10-07';
            document.getElementById('visit-time').value = '14:30';
          }
          function openBlankAppointment() {
            resetAppointmentForm(); openModal('add-modal');
            setTimeout(function(){document.getElementById('pet-name').focus();},50);
          }
          function openPatientBooking() {
            var p = getSelectedPatient(); resetAppointmentForm(); openModal('add-modal');
            document.getElementById('pet-name').value = p.name; document.getElementById('species').value = p.breed; document.getElementById('owner-name').value = p.owner;
            setTimeout(function(){document.getElementById('visit-type').focus();},50);
          }
          function inventoryIcon(category) {
            if (category === 'Vaccine') return '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m14 4 6 6M17 3l4 4M5 13l6 6M13 5l6 6-8 8-6-6 8-8Z"/><path d="m4 20 4-4M3 21l2-1"/></svg>';
            if (category === 'Medicine') return '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8.2 4.2a5 5 0 0 1 7.1 0l4.5 4.5a5 5 0 0 1-7.1 7.1l-4.5-4.5a5 5 0 0 1 0-7.1Z"/><path d="m10.5 13.5 6-6"/></svg>';
            if (category === 'Preventive') return '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3 5 6v5c0 4.6 2.9 8.2 7 10 4.1-1.8 7-5.4 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg>';
            return '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m4 7 8-4 8 4-8 4-8-4Z"/><path d="m4 7v10l8 4 8-4V7M12 11v10"/></svg>';
          }
          function inventoryLevel(item) {
            if (item.stock <= Math.max(3, Math.floor(item.reorder * .5))) return 'critical';
            if (item.stock <= item.reorder) return 'low';
            return 'healthy';
          }
          function inventoryStatusLabel(level) { return level === 'critical' ? 'Critical' : (level === 'low' ? 'Reorder' : 'In stock'); }
          function renderInventory() {
            var q = document.getElementById('inventory-search').value.trim().toLowerCase();
            var category = document.getElementById('inventory-category').value;
            var status = document.getElementById('inventory-status').value;
            var rows = inventory.filter(function(item){
              var level = inventoryLevel(item);
              var haystack = (item.name + ' ' + item.sku + ' ' + item.supplier).toLowerCase();
              var statusMatch = status === 'all' || (status === 'reorder' ? level !== 'healthy' : level === status);
              return (category === 'all' || item.category === category) && statusMatch && (!q || haystack.indexOf(q) !== -1);
            });
            document.getElementById('inventory-count').textContent = rows.length + (rows.length === 1 ? ' item' : ' items');
            var list = document.getElementById('inventory-list');
            if (!rows.length) {
              list.innerHTML = '<div class="inventory-empty"><strong>No inventory items found</strong><span>Try a different item, category, or stock level.</span></div>';
            } else {
              list.innerHTML = rows.map(function(item){
                var level = inventoryLevel(item);
                var meter = Math.min(100, Math.round((item.stock / Math.max(item.reorder * 2, 1)) * 100));
                return '<article class="inventory-row">'+
                  '<div class="inventory-item"><span class="inventory-item-icon">'+inventoryIcon(item.category)+'</span><div><strong>'+escapeHtml(item.name)+'</strong><span>'+escapeHtml(item.sku)+' · '+escapeHtml(item.supplier)+'</span></div></div>'+
                  '<div class="inventory-cell category-cell"><strong>'+escapeHtml(item.category)+'</strong><span>Clinic inventory</span></div>'+
                  '<div class="inventory-cell stock-cell"><strong class="stock-amount '+(level !== 'healthy' ? 'low':'')+'">'+item.stock+' '+escapeHtml(item.unit)+'</strong><div class="stock-meter '+(level !== 'healthy' ? 'low':'')+'"><span style="width:'+meter+'%"></span></div></div>'+
                  '<div class="inventory-cell reorder-cell"><strong>'+item.reorder+' '+escapeHtml(item.unit)+'</strong><span>Minimum level</span></div>'+
                  '<div class="inventory-cell expiry-cell"><strong>'+escapeHtml(item.expiry)+'</strong><span>'+(item.expirySoon ? 'Within 90 days':'Nearest batch')+'</span></div>'+
                  '<div class="status-cell"><span class="inventory-status '+level+'">'+inventoryStatusLabel(level)+'</span></div>'+
                  '<button class="more-btn" type="button" data-adjust-stock="'+item.id+'" aria-label="Adjust '+escapeHtml(item.name)+' stock"><svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg></button></article>';
              }).join('');
              list.querySelectorAll('[data-adjust-stock]').forEach(function(btn){btn.addEventListener('click',function(){openStockModal(Number(btn.dataset.adjustStock));});});
            }
            updateInventoryCounts();
          }
          function renderInventoryWatch() {
            var watch = inventory.filter(function(item){return inventoryLevel(item) !== 'healthy';}).sort(function(a,b){return (a.stock/a.reorder)-(b.stock/b.reorder);}).slice(0,2);
            document.getElementById('inventory-watch-list').innerHTML = watch.length ? watch.map(function(item){var level=inventoryLevel(item); return '<div class="compact-item"><span class="compact-icon">'+inventoryIcon(item.category)+'</span><div><strong>'+escapeHtml(item.name)+'</strong><span>'+(level === 'critical' ? 'Critical level':'Below reorder level')+' · '+item.stock+' '+escapeHtml(item.unit)+' left</span></div><span class="count">'+item.stock+'</span></div>';}).join('') : '<div class="record-empty"><strong>Stock levels are healthy</strong><span>No items currently need reorder.</span></div>';
          }
          function updateInventoryCounts() {
            var low = inventory.filter(function(item){return inventoryLevel(item) !== 'healthy';}).length;
            var critical = inventory.filter(function(item){return inventoryLevel(item) === 'critical';}).length;
            var expiring = inventory.filter(function(item){return item.expirySoon;}).length;
            document.getElementById('inventory-total').textContent = inventory.length;
            document.getElementById('inventory-low').textContent = low;
            document.getElementById('inventory-critical').textContent = critical;
            document.getElementById('inventory-expiring').textContent = expiring;
            document.getElementById('low-stock-count').textContent = low;
            document.getElementById('critical-stock-caption').textContent = critical + (critical === 1 ? ' critical':' critical');
            document.getElementById('inventory-nav-badge').textContent = low;
            renderInventoryWatch();
          }
          function populateStockItems() {
            document.getElementById('stock-item').innerHTML = inventory.map(function(item){return '<option value="'+item.id+'">'+escapeHtml(item.name)+' · '+item.stock+' '+escapeHtml(item.unit)+'</option>';}).join('');
          }
          function openStockModal(itemId) {
            document.getElementById('stock-form').reset();
            document.getElementById('stock-quantity').value = '1';
            populateStockItems();
            if (itemId) document.getElementById('stock-item').value = String(itemId);
            openModal('stock-modal');
            setTimeout(function(){document.getElementById('stock-direction').focus();},50);
          }
          function getSelectedTriage() { return triageCases.find(function(item){ return item.id === selectedTriageId; }) || triageCases[0]; }
          function updateTriageCounts() {
            var open = triageCases.filter(function(item){ return item.status === 'open'; });
            document.getElementById('triage-new-count').textContent = open.length;
            document.getElementById('triage-high-count').textContent = open.filter(function(item){ return item.priority === 'high'; }).length;
            document.getElementById('triage-reviewed-count').textContent = 14 + triageCases.filter(function(item){ return item.status === 'reviewed' && item.id < 3; }).length;
            document.getElementById('triage-nav-badge').textContent = open.length;
          }
          function renderTriage() {
            var q = document.getElementById('triage-search').value.trim().toLowerCase();
            var filter = document.getElementById('triage-filter').value;
            var rows = triageCases.filter(function(item){
              var filterMatch = filter === 'all' || (filter === 'open' ? item.status === 'open' : filter === 'high' ? item.priority === 'high' && item.status === 'open' : item.status === 'reviewed');
              var haystack = (item.pet + ' ' + item.breed + ' ' + item.owner + ' ' + item.symptoms.join(' ')).toLowerCase();
              return filterMatch && (!q || haystack.indexOf(q) !== -1);
            });
            var list = document.getElementById('triage-list');
            if (!rows.length) {
              list.innerHTML = '<div class="record-empty"><strong>No triage submissions found</strong><span>Try another search or queue filter.</span></div>';
              return;
            }
            if (!rows.some(function(item){ return item.id === selectedTriageId; })) selectedTriageId = rows[0].id;
            list.innerHTML = rows.map(function(item){ return '<button class="triage-item '+(item.id === selectedTriageId ? 'active':'')+'" type="button" data-triage-id="'+item.id+'"><span><strong>'+escapeHtml(item.pet)+' · '+escapeHtml(item.breed)+'</strong><small>'+escapeHtml(item.owner)+' · '+escapeHtml(item.submitted)+'</small></span><span class="priority '+(item.status === 'reviewed' ? 'reviewed':item.priority)+'">'+(item.status === 'reviewed' ? 'Reviewed':statusLabel(item.priority))+'</span><p>'+escapeHtml(item.symptoms.join(' · '))+'</p></button>'; }).join('');
            list.querySelectorAll('[data-triage-id]').forEach(function(btn){ btn.addEventListener('click',function(){ selectedTriageId = Number(btn.dataset.triageId); renderTriage(); renderTriageDetail(); }); });
            updateTriageCounts();
          }
          function renderTriageDetail() {
            var item = getSelectedTriage();
            document.getElementById('triage-case-name').textContent = item.pet + ' · ' + item.breed;
            document.getElementById('triage-case-subtitle').textContent = item.owner + ' · Submitted ' + item.submitted + ' from the owner app';
            document.querySelector('#mark-triage-reviewed span').textContent = item.status === 'reviewed' ? 'Reviewed' : 'Mark reviewed';
            document.getElementById('mark-triage-reviewed').disabled = item.status === 'reviewed';
            document.getElementById('triage-case-body').innerHTML =
              '<div class="case-facts"><div class="case-fact"><span>Priority</span><strong>'+(item.priority === 'high' ? 'High · review first':'Moderate')+'</strong></div><div class="case-fact"><span>Duration</span><strong>'+escapeHtml(item.duration)+'</strong></div><div class="case-fact"><span>Owner media</span><strong>'+escapeHtml(item.photo)+'</strong></div><div class="case-fact"><span>Related history</span><strong>'+escapeHtml(item.history)+'</strong></div></div>'+
              '<section class="case-section"><h3>Owner-reported signs</h3><div class="symptom-list">'+item.symptoms.map(function(symptom){return '<span class="symptom-tag">'+escapeHtml(symptom)+'</span>';}).join('')+'</div></section>'+
              '<section class="case-section"><h3>AI-assisted preliminary review</h3><div class="ai-summary"><div class="ai-summary-head"><strong>Suggested review path</strong><span class="priority '+item.priority+'">'+statusLabel(item.priority)+'</span></div><p>'+escapeHtml(item.summary)+'</p><ul>'+item.signals.map(function(signal){return '<li>'+escapeHtml(signal)+'</li>';}).join('')+'</ul></div><p class="clinical-note">This suggestion supports intake review only. A licensed veterinarian must assess the patient and make the diagnosis.</p></section>';
          }
          function switchModuleTab(tab) {
            document.querySelectorAll('.module-tab').forEach(function(btn){ var active = btn.dataset.moduleTab === tab; btn.classList.toggle('active', active); btn.setAttribute('aria-selected', active ? 'true':'false'); });
            document.getElementById('triage-queue-pane').classList.toggle('active', tab === 'queue');
            document.getElementById('triage-reports-pane').classList.toggle('active', tab === 'reports');
          }
          function renderInvoices() {
            var q = document.getElementById('invoice-search').value.trim().toLowerCase();
            var status = document.getElementById('invoice-status-filter').value;
            var rows = invoices.filter(function(invoice){
              var haystack = (invoice.id + ' ' + invoice.owner + ' ' + invoice.patient + ' ' + (invoice.appointmentId || '')).toLowerCase();
              return (status === 'all' || invoice.status === status) && (!q || haystack.indexOf(q) !== -1);
            });
            document.getElementById('invoice-count').textContent = rows.length + (rows.length === 1 ? ' invoice' : ' invoices');
            var list = document.getElementById('invoice-list');
            if (!rows.length) {
              selectedInvoiceId = null;
              list.innerHTML = '<div class="empty"><strong>No invoices found</strong><span>Try another invoice, patient, owner, or status.</span></div>';
            } else {
              if (!rows.some(function(invoice){ return invoice.id === selectedInvoiceId; })) selectedInvoiceId = rows[0].id;
              list.innerHTML = rows.map(function(invoice){ return '<button class="invoice-row '+(invoice.id === selectedInvoiceId ? 'active':'')+'" type="button" data-invoice-id="'+escapeHtml(invoice.id)+'">'+
                '<div class="invoice-cell invoice-number"><strong>'+escapeHtml(invoice.id)+'</strong><span>'+escapeHtml(invoice.date)+'</span></div>'+
                '<div class="invoice-cell invoice-party"><strong>'+escapeHtml(invoice.owner)+'</strong><span>'+escapeHtml(invoice.patient)+(invoice.appointmentId ? ' · Appointment #'+invoice.appointmentId:' · Walk-in')+'</span></div>'+
                '<div class="invoice-cell invoice-amount"><strong class="money">'+formatCurrency(invoiceTotal(invoice))+'</strong><span>Due '+escapeHtml(invoice.due)+'</span></div>'+
                '<span class="status '+invoice.status+'">'+statusLabel(invoice.status)+'</span>'+
                '<span class="more-btn" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg></span></button>'; }).join('');
              list.querySelectorAll('[data-invoice-id]').forEach(function(btn){ btn.addEventListener('click',function(){ selectedInvoiceId = btn.dataset.invoiceId; renderInvoices(); renderInvoiceDetail(); }); });
            }
            renderInvoiceDetail(); updateBillingCounts();
          }
          function renderInvoiceDetail() {
            var invoice = invoices.find(function(item){ return item.id === selectedInvoiceId; });
            var detail = document.getElementById('invoice-detail');
            if (!invoice) { detail.innerHTML = '<div class="empty"><strong>Select an invoice</strong><span>Invoice details will appear here.</span></div>'; return; }
            var lines = invoice.items.map(function(item){ return '<div class="line-item"><strong>'+escapeHtml(item.name)+'</strong><span>'+item.qty+'</span><span class="money">'+formatCurrency(item.price)+'</span><strong class="money line-subtotal">'+formatCurrency(item.qty*item.price)+'</strong></div>'; }).join('');
            detail.innerHTML = '<div class="invoice-detail-head"><div><h2>'+escapeHtml(invoice.id)+'</h2><p>'+escapeHtml(invoice.owner)+' · '+escapeHtml(invoice.patient)+'</p></div><span class="status '+invoice.status+'">'+statusLabel(invoice.status)+'</span></div>'+
              '<div class="invoice-detail-body"><div class="invoice-summary"><div class="invoice-summary-item"><span>Issued</span><strong>'+escapeHtml(invoice.date)+'</strong></div><div class="invoice-summary-item"><span>Due date</span><strong>'+escapeHtml(invoice.due)+'</strong></div><div class="invoice-summary-item"><span>Source</span><strong>'+(invoice.appointmentId ? 'Appointment #'+invoice.appointmentId:'Walk-in treatment')+'</strong></div><div class="invoice-summary-item"><span>Payment status</span><strong>'+statusLabel(invoice.status)+'</strong></div></div>'+
              '<div class="record-section-head"><h3>Line items</h3><span>Description · Qty · Unit · Subtotal</span></div><div class="line-items">'+lines+'</div><div class="invoice-total"><span>Total due</span><strong class="money">'+formatCurrency(invoiceTotal(invoice))+'</strong></div>'+
              '<div class="invoice-actions">'+(invoice.status !== 'paid' ? '<button class="primary-btn" type="button" data-invoice-status="paid">Mark paid</button>':'')+(invoice.status !== 'pending' ? '<button class="secondary-btn" type="button" data-invoice-status="pending">Mark pending</button>':'')+(invoice.status !== 'overdue' ? '<button class="secondary-btn" type="button" data-invoice-status="overdue">Mark overdue</button>':'')+'</div></div>';
            detail.querySelectorAll('[data-invoice-status]').forEach(function(btn){ btn.addEventListener('click',function(){ invoice.status = btn.dataset.invoiceStatus; renderInvoices(); showToast(invoice.id+' marked '+invoice.status); }); });
          }
          function updateBillingCounts() {
            var total = invoices.reduce(function(sum,item){return sum+invoiceTotal(item);},0);
            var paid = invoices.filter(function(item){return item.status==='paid';}).reduce(function(sum,item){return sum+invoiceTotal(item);},0);
            var outstanding = total-paid;
            var needsAttention = invoices.filter(function(item){return item.status!=='paid';}).length;
            document.getElementById('billing-total').textContent = formatCurrency(total);
            document.getElementById('billing-paid').textContent = formatCurrency(paid);
            document.getElementById('billing-outstanding').textContent = formatCurrency(outstanding);
            document.getElementById('billing-overdue').textContent = invoices.filter(function(item){return item.status==='overdue';}).length;
            document.getElementById('billing-nav-badge').textContent = needsAttention;
            document.getElementById('dashboard-outstanding').textContent = formatCurrency(outstanding);
            document.getElementById('dashboard-invoice-caption').textContent = needsAttention + (needsAttention === 1 ? ' invoice needs attention':' invoices need attention');
          }
          function populateInvoiceAppointments() {
            document.getElementById('invoice-appointment').innerHTML = appointments.map(function(a){
              var billed = invoices.some(function(invoice){return invoice.appointmentId === a.id;});
              return '<option value="'+a.id+'" '+(billed?'disabled':'')+'>'+escapeHtml(a.pet)+' · '+escapeHtml(a.owner)+' · '+escapeHtml(a.type)+(billed?' · invoiced':'')+'</option>';
            }).join('');
          }
          function openInvoiceModal(appointmentId) {
            document.getElementById('invoice-form').reset();
            document.getElementById('invoice-due').value='2026-10-14'; document.getElementById('line-one-qty').value='1'; document.getElementById('line-one-price').value='650'; document.getElementById('line-one-name').value='Consultation fee'; document.getElementById('line-two-qty').value='1'; document.getElementById('line-two-price').value='0';
            populateInvoiceAppointments();
            if (appointmentId && !invoices.some(function(invoice){return invoice.appointmentId === appointmentId;})) document.getElementById('invoice-appointment').value=String(appointmentId);
            updateInvoiceFormTotal(); openModal('invoice-modal');
            setTimeout(function(){ document.getElementById('invoice-appointment').focus(); },50);
          }
          function updateInvoiceFormTotal() {
            var one = Number(document.getElementById('line-one-qty').value||0)*Number(document.getElementById('line-one-price').value||0);
            var two = document.getElementById('line-two-name').value.trim() ? Number(document.getElementById('line-two-qty').value||0)*Number(document.getElementById('line-two-price').value||0) : 0;
            document.getElementById('invoice-form-total').textContent = formatCurrency(one+two);
          }
          function notificationIcon(type) {
            if (type === 'appointment') return '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>';
            if (type === 'inventory') return '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 9v4M12 17h.01"/><path d="M10.3 4.2 2.8 17.1a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0Z"/></svg>';
            if (type === 'triage') return '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3v3M5.6 5.6l2.1 2.1M3 12h3M18 12h3M16.3 7.7l2.1-2.1"/><path d="M8 15a4 4 0 1 1 8 0c0 1.6-1 2.5-2 3.5V21h-4v-2.5C9 17.5 8 16.6 8 15Z"/></svg>';
            return '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 8h6M9 12h6"/></svg>';
          }
          function renderNotifications() {
            var unread = notifications.filter(function(item){return !item.read;}).length;
            document.querySelector('#notification-btn .alert-dot').style.display = unread ? '' : 'none';
            document.getElementById('notification-btn').setAttribute('aria-label', unread ? 'Notifications, '+unread+' unread':'Notifications');
            document.getElementById('notification-list').innerHTML = notifications.map(function(item){return '<button class="notification-item '+(!item.read?'unread':'')+'" type="button" data-notification-id="'+item.id+'"><span class="notification-icon">'+notificationIcon(item.type)+'</span><span class="notification-copy"><strong>'+escapeHtml(item.title)+'</strong><span>'+escapeHtml(item.message)+'</span><small>'+escapeHtml(item.time)+'</small></span>'+(!item.read?'<span class="unread-dot" aria-label="Unread"></span>':'<span></span>')+'</button>';}).join('');
            document.querySelectorAll('[data-notification-id]').forEach(function(btn){btn.addEventListener('click',function(){
              var item=notifications.find(function(n){return n.id===Number(btn.dataset.notificationId);}); if(!item)return; item.read=true; renderNotifications(); closeNotificationPanel();
              if(roleCanAccess(item.target)) { navigate(item.target); if(item.target==='triage') switchModuleTab('queue'); } else { showToast('This alert belongs to a restricted section'); }
            });});
          }
          function closeNotificationPanel() { var panel=document.getElementById('notification-panel'); panel.classList.remove('open'); panel.setAttribute('aria-hidden','true'); document.getElementById('notification-btn').setAttribute('aria-expanded','false'); }
          function renderStaff() {
            var q=document.getElementById('staff-search').value.trim().toLowerCase(); var role=document.getElementById('staff-role-filter').value; var status=document.getElementById('staff-status-filter').value;
            var rows=staffAccounts.filter(function(item){var hay=(item.name+' '+item.email+' '+roleLabel(item.role)).toLowerCase(); return (role==='all'||item.role===role)&&(status==='all'||item.status===status)&&(!q||hay.indexOf(q)!==-1);});
            document.getElementById('staff-count').textContent=rows.length+(rows.length===1?' staff account':' staff accounts');
            document.getElementById('staff-list').innerHTML=rows.length?rows.map(function(item){return '<article class="staff-row"><div class="staff-identity"><span class="avatar">'+initials(item.name)+'</span><div><strong>'+escapeHtml(item.name)+'</strong><span>Last active '+escapeHtml(item.lastActive)+'</span></div></div><div class="staff-cell role-cell"><strong>'+roleLabel(item.role)+'</strong><span>'+item.role+' access</span></div><div class="staff-cell email-cell"><strong>'+escapeHtml(item.email)+'</strong><span>'+escapeHtml(item.phone||'No contact number')+'</span></div><span class="status staff-status '+item.status+'">'+statusLabel(item.status)+'</span><div class="staff-actions"><button class="small-btn" type="button" data-edit-staff="'+item.id+'">Edit</button><button class="small-btn deactivate" type="button" data-toggle-staff="'+item.id+'">'+(item.status==='active'?'Deactivate':'Reactivate')+'</button></div></article>';}).join(''):'<div class="empty"><strong>No staff accounts found</strong><span>Try another name, role, or account status.</span></div>';
            document.querySelectorAll('[data-edit-staff]').forEach(function(btn){btn.addEventListener('click',function(){openStaffModal(Number(btn.dataset.editStaff));});});
            document.querySelectorAll('[data-toggle-staff]').forEach(function(btn){btn.addEventListener('click',function(){var item=staffAccounts.find(function(x){return x.id===Number(btn.dataset.toggleStaff);}); if(!item)return; if(currentUser&&item.email===currentUser.email&&item.status==='active'){showToast('You cannot deactivate your signed-in account');return;} item.status=item.status==='active'?'inactive':'active'; renderStaff(); showToast(item.name+' account '+(item.status==='active'?'reactivated':'deactivated'));});});
          }
          function openStaffModal(id) {
            selectedStaffId=id||null; var form=document.getElementById('staff-form'); form.reset(); var item=staffAccounts.find(function(x){return x.id===selectedStaffId;});
            document.getElementById('staff-modal-title').textContent=item?'Edit staff account':'Add staff account'; document.getElementById('staff-edit-id').value=item?item.id:'';
            if(item){document.getElementById('staff-name').value=item.name;document.getElementById('staff-role').value=item.role;document.getElementById('staff-email').value=item.email;document.getElementById('staff-phone').value=item.phone||'';}
            openModal('staff-modal'); setTimeout(function(){document.getElementById('staff-name').focus();},50);
          }
          function renderReports() {
            var key = document.getElementById('report-period').value;
            var data = reportSets[key];
            document.getElementById('report-period-label').textContent = data.label;
            document.getElementById('report-summary').innerHTML = '<div class="report-card"><span>Total appointments</span><strong>'+data.appointments+'</strong><small>Booked in sample period</small></div><div class="report-card"><span>Completion rate</span><strong>'+data.completion+'</strong><small>Completed vs. scheduled</small></div><div class="report-card"><span>AI triage reviews</span><strong>'+data.triage+'</strong><small>Owner submissions assessed</small></div>';
            var max = Math.max.apply(null,data.breakdown.map(function(row){return row[1];}));
            document.getElementById('report-breakdown').innerHTML = data.breakdown.map(function(row){return '<div class="report-row"><strong>'+escapeHtml(row[0])+'</strong><div class="report-meter"><span style="width:'+Math.round((row[1]/max)*100)+'%"></span></div><span class="report-value">'+row[1]+' visits</span></div>';}).join('');
          }
          function downloadReport() {
            var data = reportSets[document.getElementById('report-period').value];
            var rows = [['CarePaws clinic activity summary'],['Period',data.label],['Total appointments',data.appointments],['Completion rate',data.completion],['AI triage reviews',data.triage],[],['Visit type','Visits']].concat(data.breakdown);
            var csv = rows.map(function(row){return row.map(function(cell){return '"'+String(cell == null ? '' : cell).replace(/"/g,'""')+'"';}).join(',');}).join('\n');
            var url = URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
            var link = document.createElement('a'); link.href = url; link.download = 'carepaws-clinic-report.csv'; document.body.appendChild(link); link.click(); link.remove(); setTimeout(function(){URL.revokeObjectURL(url);},0); showToast('Clinic report downloaded');
          }
          function showToast(message) {
            var el = document.getElementById('toast'); el.textContent = message; el.classList.add('show');
            clearTimeout(toastTimer); toastTimer = setTimeout(function(){ el.classList.remove('show'); }, 2600);
          }
          function roleCanAccess(page) {
            if (!currentUser) return false;
            var nav = document.querySelector('.nav-btn[data-page="' + page + '"]');
            if (!nav) return false;
            return String(nav.dataset.roles || '').split(',').indexOf(currentUser.role) !== -1;
          }
          function applyRoleAccess() {
            document.querySelectorAll('.nav-btn[data-roles]').forEach(function(btn){
              var allowed = String(btn.dataset.roles).split(',').indexOf(currentUser.role) !== -1;
              btn.dataset.roleHidden = allowed ? 'false' : 'true';
              btn.disabled = !allowed;
            });
            document.getElementById('sidebar-avatar').textContent = initials(currentUser.name);
            document.getElementById('sidebar-user-name').textContent = currentUser.name;
            document.getElementById('sidebar-user-role').textContent = currentUser.roleLabel + ' access';
            document.getElementById('topbar-avatar').textContent = initials(currentUser.name);
            document.getElementById('topbar-role').textContent = currentUser.roleLabel;
          }
          function renderSettings() {
            if (!currentUser) return;
            document.getElementById('settings-name').value = currentUser.name;
            document.getElementById('settings-role').value = currentUser.roleLabel;
            document.getElementById('settings-email').value = currentUser.email;
            document.getElementById('settings-phone').value = currentUser.phone || '';
            document.getElementById('settings-role-tag').textContent = currentUser.roleLabel;
            document.getElementById('clinic-name').value = clinicProfile.name;
            document.getElementById('clinic-email').value = clinicProfile.email;
            document.getElementById('clinic-phone').value = clinicProfile.phone;
            document.getElementById('clinic-address').value = clinicProfile.address;
            var canEditClinic = currentUser.role === 'admin';
            document.querySelectorAll('#clinic-form input').forEach(function(input){ input.disabled = !canEditClinic; });
            document.getElementById('save-clinic').disabled = !canEditClinic;
            document.getElementById('clinic-access-tag').textContent = canEditClinic ? 'Administrator access' : 'View only';
            document.querySelectorAll('[data-preference]').forEach(function(btn){
              var active = Boolean(notificationPreferences[btn.dataset.preference]);
              btn.classList.toggle('active', active);
              btn.setAttribute('aria-pressed', active ? 'true' : 'false');
            });
            document.querySelectorAll('[data-theme-choice]').forEach(function(btn){
              btn.classList.toggle('active', btn.dataset.themeChoice === appearance);
              btn.setAttribute('aria-pressed', btn.dataset.themeChoice === appearance ? 'true' : 'false');
            });
          }
          function completeSignIn(user) {
            currentUser = user;
            failedLoginAttempts = 0;
            document.getElementById('login-error').textContent = '';
            applyRoleAccess();
            renderSettings();
            document.getElementById('auth-screen').hidden = true;
            document.getElementById('workspace').hidden = false;
            document.getElementById('workspace').setAttribute('aria-hidden','false');
            navigate('dashboard');
            showToast('Signed in as ' + user.roleLabel);
          }
          function signOut() {
            currentUser = null;
            closeModals(); closeNotificationPanel();
            document.getElementById('workspace').hidden = true;
            document.getElementById('workspace').setAttribute('aria-hidden','true');
            document.getElementById('auth-screen').hidden = false;
            document.getElementById('login-form').reset();
            document.getElementById('login-error').textContent = '';
            document.querySelectorAll('.nav-btn').forEach(function(btn){ btn.dataset.roleHidden = 'false'; btn.disabled = false; });
            setTimeout(function(){ document.getElementById('login-email').focus(); }, 50);
          }
          function navigate(page) {
            if (!roleCanAccess(page)) { showToast('This section is not available for the signed-in role'); return; }
            document.querySelectorAll('.page').forEach(function(el){ el.classList.toggle('active', el.id === page + '-page'); });
            document.querySelectorAll('.nav-btn').forEach(function(btn){
              var current = btn.dataset.page === page; btn.classList.toggle('active', current);
              if (current) btn.setAttribute('aria-current','page'); else btn.removeAttribute('aria-current');
            });
            var pageTitles = {dashboard:'Clinic overview', appointments:'Appointment schedule', records:'Patient records', inventory:'Inventory management', billing:'Billing & invoicing', triage:'AI triage & reports', staff:'Staff management', settings:'Settings'};
            document.getElementById('topbar-title').textContent = pageTitles[page] || 'Clinic workspace';
            closeNotificationPanel();
            if (page === 'settings') renderSettings();
            if (page === 'billing') renderInvoices();
            if (page === 'staff') renderStaff();
            window.scrollTo(0,0);
          }
          function showTodayAppointments(status) {
            navigate('appointments');
            activeDateKey = '2026-10-07';
            weekStart = new Date('2026-10-05T00:00:00');
            document.getElementById('status-filter').value = status || 'all';
            renderDateStrip(); renderList(); renderCalendar();
          }
          function renderList() {
            var q = document.getElementById('appointment-search').value.trim().toLowerCase();
            var status = document.getElementById('status-filter').value;
            var rows = appointments.filter(function(a){
              var inDay = appointmentDateKey(a) === activeDateKey;
              var matchesStatus = status === 'all' || a.status === status;
              var haystack = (a.pet + ' ' + a.breed + ' ' + a.owner + ' ' + a.type).toLowerCase();
              return inDay && matchesStatus && (!q || haystack.indexOf(q) !== -1);
            });
            var list = document.getElementById('appointment-list');
            if (!rows.length) {
              list.innerHTML = '<div class="empty"><strong>No appointments found</strong><span>Try another date, status, or search.</span></div>';
              return;
            }
            list.innerHTML = rows.map(function(a){ return '<article class="appointment-row" tabindex="0" data-id="'+a.id+'">' +
              '<div class="appt-time"><strong>'+escapeHtml(a.time)+'</strong><span>30 min</span></div>'+
              '<div class="appt-pet pet-flex"><span class="pet-avatar">'+initials(a.pet)+'</span><div><strong>'+escapeHtml(a.pet)+'</strong><span>'+escapeHtml(a.breed)+'</span></div></div>'+
              '<div class="appt-owner"><strong>'+escapeHtml(a.owner)+'</strong><span>Pet owner</span></div>'+
              '<div class="appt-type"><strong>'+escapeHtml(a.type)+'</strong><span>Clinic visit</span></div>'+
              '<span class="status '+a.status+'">'+statusLabel(a.status)+'</span>'+
              '<button class="more-btn" type="button" aria-label="Open '+escapeHtml(a.pet)+' appointment"><svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg></button></article>'; }).join('');
            list.querySelectorAll('.appointment-row').forEach(function(row){
              row.addEventListener('click', function(){ openDetail(Number(row.dataset.id)); });
              row.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDetail(Number(row.dataset.id)); } });
            });
          }
          function renderCalendar() {
            var days = Array.from({length:7}, function(_, index){
              var date = new Date(weekStart);
              date.setDate(weekStart.getDate() + index);
              return {date:date, key:dateKey(date)};
            });
            document.getElementById('calendar-grid').innerHTML = days.map(function(day){
              var events = appointments.filter(function(a){return appointmentDateKey(a) === day.key;});
              var empty = events.length ? '' : '<span class="calendar-empty">No visits</span>';
              return '<section class="calendar-day '+(day.key === activeDateKey ? 'today':'')+'"><div class="calendar-day-head">'+day.date.toLocaleDateString('en-US',{weekday:'short'})+' <span>'+day.date.toLocaleDateString('en-US',{month:'short',day:'numeric'})+'</span></div>'+
                events.map(function(a){return '<button class="calendar-event" type="button" data-id="'+a.id+'"><time>'+escapeHtml(a.time)+'</time><strong>'+escapeHtml(a.pet)+'</strong><span>'+escapeHtml(a.type)+'</span></button>';}).join('')+empty+
                '</section>';
            }).join('');
            document.querySelectorAll('.calendar-event').forEach(function(el){ el.addEventListener('click', function(){openDetail(Number(el.dataset.id));}); });
          }
          function switchView(view) {
            activeView = view;
            document.querySelectorAll('.view-btn').forEach(function(b){ b.classList.toggle('active', b.dataset.view === view); });
            document.getElementById('list-view').classList.toggle('hidden', view !== 'list');
            document.getElementById('calendar-view').classList.toggle('active', view === 'calendar');
            if (view === 'calendar') renderCalendar(); else renderList();
          }
          function openModal(id) { document.getElementById(id).classList.add('open'); document.body.style.overflow='hidden'; }
          function closeModals() { document.querySelectorAll('.modal-backdrop').forEach(function(m){m.classList.remove('open');}); document.body.style.overflow=''; }
          function openDetail(id) {
            var a = appointments.find(function(x){return x.id === id;}); if(!a) return; selectedId = id;
            document.getElementById('detail-title').textContent = a.pet + ' · ' + a.type;
            document.getElementById('detail-subtitle').textContent = formatLongDate(appointmentDateKey(a)) + ' · ' + a.time;
            document.getElementById('detail-grid').innerHTML =
              '<div class="detail-item"><span>Patient</span><strong>'+escapeHtml(a.pet)+' · '+escapeHtml(a.breed)+'</strong></div>'+
              '<div class="detail-item"><span>Owner</span><strong>'+escapeHtml(a.owner)+'</strong></div>'+
              '<div class="detail-item"><span>Status</span><span class="status '+a.status+'">'+statusLabel(a.status)+'</span></div>'+
              '<div class="detail-item"><span>Duration</span><strong>30 minutes</strong></div>'+
              '<div class="detail-item full"><span>Notes</span><strong>'+escapeHtml(a.notes || 'No preparation notes added.')+'</strong></div>';
            var actions = document.getElementById('detail-actions');
            var appointmentInvoice = invoices.find(function(invoice){return invoice.appointmentId===a.id;});
            actions.innerHTML = '<button class="secondary-btn" type="button" data-close-modal>Close</button>' + (appointmentInvoice ? '<button class="secondary-btn" type="button" id="view-appt-invoice">View invoice</button>' : '<button class="secondary-btn" type="button" id="create-appt-invoice">Create invoice</button>') + (a.status === 'pending' ? '<button class="primary-btn" type="button" id="confirm-appt">Confirm appointment</button>' : '');
            actions.querySelector('[data-close-modal]').addEventListener('click', closeModals);
            var createInvoice=document.getElementById('create-appt-invoice'); if(createInvoice) createInvoice.addEventListener('click',function(){closeModals();openInvoiceModal(a.id);});
            var viewInvoice=document.getElementById('view-appt-invoice'); if(viewInvoice) viewInvoice.addEventListener('click',function(){selectedInvoiceId=appointmentInvoice.id;closeModals();navigate('billing');});
            var confirm = document.getElementById('confirm-appt');
            if(confirm) confirm.addEventListener('click', function(){ a.status='confirmed'; closeModals(); renderList(); renderCalendar(); updateCounts(); showToast('Appointment confirmed in this prototype'); });
            openModal('detail-modal');
          }
          function updateCounts() {
            var today = appointments.filter(function(a){return a.date === 7;});
            document.getElementById('visit-count').textContent = today.length;
            document.getElementById('pending-count').textContent = today.filter(function(a){return a.status === 'pending';}).length;
            document.getElementById('appointment-nav-badge').textContent = today.filter(function(a){return a.status === 'pending';}).length;
          }

          document.getElementById('login-form').addEventListener('submit', function(e){
            e.preventDefault();
            var now = Date.now();
            if (now < loginLockedUntil) {
              document.getElementById('login-error').textContent = 'Too many attempts. Please wait a few seconds and try again.';
              return;
            }
            var email = document.getElementById('login-email').value.trim().toLowerCase();
            var password = document.getElementById('login-password').value;
            var user = demoUsers.find(function(item){ return item.email === email && item.password === password; });
            if (!user) {
              failedLoginAttempts += 1;
              if (failedLoginAttempts >= 5) { loginLockedUntil = now + 15000; failedLoginAttempts = 0; }
              document.getElementById('login-error').textContent = 'Email or password is incorrect. Select a demo account below if needed.';
              document.getElementById('login-password').select();
              return;
            }
            completeSignIn(user);
          });
          document.querySelectorAll('.demo-account').forEach(function(btn){ btn.addEventListener('click', function(){
            document.getElementById('login-email').value = btn.dataset.demoEmail;
            document.getElementById('login-password').value = btn.dataset.demoPassword;
            document.getElementById('login-error').textContent = '';
            document.getElementById('login-password').focus();
          }); });
          document.getElementById('password-toggle').addEventListener('click', function(){
            var input = document.getElementById('login-password');
            var showing = input.type === 'text';
            input.type = showing ? 'password' : 'text';
            this.setAttribute('aria-pressed', showing ? 'false' : 'true');
            this.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
            input.focus();
          });
          document.querySelectorAll('[data-sign-out]').forEach(function(btn){ btn.addEventListener('click', signOut); });
          document.querySelectorAll('.nav-btn').forEach(function(btn){ btn.addEventListener('click', function(){navigate(btn.dataset.page);}); });
          document.querySelectorAll('[data-go-appointments]').forEach(function(btn){btn.addEventListener('click',function(){showTodayAppointments('all');});});
          document.querySelectorAll('[data-go-inventory]').forEach(function(btn){btn.addEventListener('click',function(){navigate('inventory');});});
          document.querySelectorAll('[data-go-billing]').forEach(function(btn){btn.addEventListener('click',function(){navigate('billing');});});
          document.querySelectorAll('[data-open-invoice]').forEach(function(btn){btn.addEventListener('click',function(){openInvoiceModal();});});
          document.querySelectorAll('[data-open-add]').forEach(function(btn){btn.addEventListener('click',openBlankAppointment);});
          document.querySelectorAll('[data-close-modal]').forEach(function(btn){btn.addEventListener('click', closeModals);});
          document.querySelectorAll('.modal-backdrop').forEach(function(m){m.addEventListener('click',function(e){if(e.target===m) closeModals();});});
          document.addEventListener('keydown',function(e){if(e.key==='Escape') closeModals();});
          document.getElementById('appointment-search').addEventListener('input', renderList);
          document.getElementById('status-filter').addEventListener('change', renderList);
          document.querySelectorAll('.view-btn').forEach(function(btn){btn.addEventListener('click',function(){switchView(btn.dataset.view);});});
          document.querySelectorAll('.date-chip').forEach(function(chip){chip.addEventListener('click',function(){
            activeDateKey = chip.dataset.dateKey; renderDateStrip(); renderList(); renderCalendar();
          });});
          document.querySelectorAll('[data-week-nav]').forEach(function(btn){btn.addEventListener('click',function(){
            var direction = btn.dataset.weekNav === 'next' ? 1 : -1;
            weekStart.setDate(weekStart.getDate() + (direction * 7));
            activeDateKey = dateKey(weekStart);
            renderDateStrip(); renderList(); renderCalendar();
            showToast('Showing week of ' + weekStart.toLocaleDateString('en-US',{month:'short',day:'numeric'}));
          });});
          document.getElementById('review-requests').addEventListener('click',function(){showTodayAppointments('pending');});
          document.getElementById('today-list').addEventListener('click',function(){showTodayAppointments('all');});
          document.getElementById('search-shortcut').addEventListener('click',function(){navigate('appointments'); setTimeout(function(){document.getElementById('appointment-search').focus();},50);});
          document.getElementById('notification-btn').addEventListener('click',function(e){
            e.stopPropagation(); var panel=document.getElementById('notification-panel'); var opening=!panel.classList.contains('open'); panel.classList.toggle('open',opening); panel.setAttribute('aria-hidden',opening?'false':'true'); this.setAttribute('aria-expanded',opening?'true':'false');
          });
          document.getElementById('notification-panel').addEventListener('click',function(e){e.stopPropagation();});
          document.addEventListener('click',closeNotificationPanel);
          document.getElementById('mark-all-read').addEventListener('click',function(){notifications.forEach(function(item){item.read=true;});renderNotifications();showToast('All notifications marked read');});
          document.getElementById('triage-info').addEventListener('click',function(){navigate('triage'); switchModuleTab('queue');});
          document.querySelectorAll('.module-tab').forEach(function(btn){btn.addEventListener('click',function(){switchModuleTab(btn.dataset.moduleTab);});});
          document.getElementById('triage-search').addEventListener('input',function(){renderTriage(); renderTriageDetail();});
          document.getElementById('triage-filter').addEventListener('change',function(){renderTriage(); renderTriageDetail();});
          document.getElementById('triage-book').addEventListener('click',function(){
            var item = getSelectedTriage(); resetAppointmentForm(); openModal('add-modal'); document.getElementById('pet-name').value=item.pet; document.getElementById('species').value=item.breed; document.getElementById('owner-name').value=item.owner; document.getElementById('visit-type').value='General consultation'; document.getElementById('visit-notes').value='Follow-up from AI triage: '+item.symptoms.join(', '); setTimeout(function(){document.getElementById('visit-date').focus();},50);
          });
          document.getElementById('mark-triage-reviewed').addEventListener('click',function(){ var item=getSelectedTriage(); if(item.status==='reviewed') return; item.status='reviewed'; renderTriage(); renderTriageDetail(); showToast(item.pet+' triage marked as reviewed'); });
          document.getElementById('report-period').addEventListener('change',renderReports);
          document.getElementById('download-report').addEventListener('click',downloadReport);
          document.getElementById('record-search').addEventListener('input',function(){renderPatients(); renderRecord();});
          document.getElementById('species-filter').addEventListener('change',function(){renderPatients(); renderRecord();});
          document.querySelectorAll('.record-tab').forEach(function(btn){btn.addEventListener('click',function(){switchRecordTab(btn.dataset.recordTab);});});
          document.getElementById('record-back').addEventListener('click',function(){document.getElementById('records-layout').classList.remove('show-record');});
          document.getElementById('records-book-visit').addEventListener('click',openPatientBooking);
          document.getElementById('patient-book-visit').addEventListener('click',openPatientBooking);
          document.getElementById('copy-record-id').addEventListener('click',function(){
            var id = getSelectedPatient().id;
            if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(id).then(function(){showToast('Record ID copied');},function(){showToast('Record ID: '+id);});
            else showToast('Record ID: '+id);
          });
          document.getElementById('inventory-search').addEventListener('input',renderInventory);
          document.getElementById('inventory-category').addEventListener('change',renderInventory);
          document.getElementById('inventory-status').addEventListener('change',renderInventory);
          document.getElementById('receive-stock').addEventListener('click',function(){openStockModal();});
          document.getElementById('stock-form').addEventListener('submit',function(e){
            e.preventDefault(); var f = new FormData(e.currentTarget); var item = inventory.find(function(x){return x.id === Number(f.get('item'));});
            if (!item) return;
            var quantity = Number(f.get('quantity')); var direction = f.get('direction');
            if (direction === 'use' && quantity > item.stock) { showToast('Usage exceeds the available stock'); return; }
            item.stock += direction === 'receive' ? quantity : -quantity;
            var rawExpiry = f.get('expiry');
            if (rawExpiry) { var expiryDate = new Date(String(rawExpiry) + 'T00:00:00'); item.expiry = expiryDate.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}); }
            closeModals(); e.currentTarget.reset(); document.getElementById('stock-quantity').value='1'; renderInventory(); showToast((direction === 'receive' ? 'Received ' : 'Recorded usage of ') + quantity + ' ' + item.unit);
          });
          document.getElementById('add-form').addEventListener('submit',function(e){
            e.preventDefault(); var f=new FormData(e.currentTarget); var raw=f.get('time'); var parts=raw.split(':'); var hour=Number(parts[0]); var suffix=hour>=12?'PM':'AM'; var display=((hour+11)%12+1)+':'+parts[1]+' '+suffix;
            var selectedDate = String(f.get('date'));
            appointments.push({id:Date.now(),time:display,dateKey:selectedDate,pet:f.get('pet'),breed:f.get('breed'),owner:f.get('owner'),type:f.get('type'),status:'confirmed',notes:f.get('notes')});
            e.currentTarget.reset(); document.getElementById('visit-date').value='2026-10-07'; document.getElementById('visit-time').value='14:30'; closeModals(); activeDateKey=selectedDate;
            var selectedDateObject = parseDateKey(selectedDate); var dayIndex = (selectedDateObject.getDay() + 6) % 7; weekStart = new Date(selectedDateObject); weekStart.setDate(selectedDateObject.getDate() - dayIndex);
            renderDateStrip(); renderList(); renderCalendar(); updateCounts(); navigate('appointments'); showToast('Appointment added to this prototype session');
          });
          document.getElementById('invoice-search').addEventListener('input',renderInvoices);
          document.getElementById('invoice-status-filter').addEventListener('change',renderInvoices);
          ['line-one-qty','line-one-price','line-two-name','line-two-qty','line-two-price'].forEach(function(id){document.getElementById(id).addEventListener('input',updateInvoiceFormTotal);});
          document.getElementById('invoice-form').addEventListener('submit',function(e){
            e.preventDefault(); var f=new FormData(e.currentTarget); var appointment=appointments.find(function(a){return a.id===Number(f.get('appointment'));}); if(!appointment){showToast('Choose an appointment without an invoice');return;}
            var items=[{name:String(f.get('lineOneName')).trim(),qty:Number(f.get('lineOneQty')),price:Number(f.get('lineOnePrice'))}]; var second=String(f.get('lineTwoName')).trim(); if(second)items.push({name:second,qty:Number(f.get('lineTwoQty')),price:Number(f.get('lineTwoPrice'))});
            var nextNumber=1000+invoices.length+1; var dueDate=parseDateKey(String(f.get('due')));
            var invoice={id:'INV-2026-'+nextNumber,appointmentId:appointment.id,patient:appointment.pet,owner:appointment.owner,date:'Oct 7, 2026',due:dueDate.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}),status:String(f.get('status')),items:items};
            invoices.unshift(invoice); selectedInvoiceId=invoice.id; closeModals(); renderInvoices(); navigate('billing'); showToast(invoice.id+' created from '+appointment.pet+' appointment');
          });
          document.getElementById('staff-search').addEventListener('input',renderStaff);
          document.getElementById('staff-role-filter').addEventListener('change',renderStaff);
          document.getElementById('staff-status-filter').addEventListener('change',renderStaff);
          document.getElementById('add-staff').addEventListener('click',function(){openStaffModal();});
          document.getElementById('staff-form').addEventListener('submit',function(e){
            e.preventDefault(); var f=new FormData(e.currentTarget); var id=Number(f.get('id')); var email=String(f.get('email')).trim().toLowerCase(); var duplicate=staffAccounts.some(function(item){return item.email===email&&item.id!==id;}); if(duplicate){showToast('A staff account already uses that email');return;}
            var item=staffAccounts.find(function(x){return x.id===id;}); if(item){item.name=String(f.get('name')).trim();item.role=String(f.get('role'));item.email=email;item.phone=String(f.get('phone')).trim();}else{item={id:Date.now(),name:String(f.get('name')).trim(),role:String(f.get('role')),email:email,phone:String(f.get('phone')).trim(),status:'active',lastActive:'Not yet signed in'};staffAccounts.push(item);}
            closeModals();renderStaff();showToast(item.name+(id?' account updated':' account added'));
          });
          document.getElementById('profile-form').addEventListener('submit', function(e){
            e.preventDefault();
            var f = new FormData(e.currentTarget);
            currentUser.name = String(f.get('name')).trim();
            currentUser.email = String(f.get('email')).trim().toLowerCase();
            currentUser.phone = String(f.get('phone')).trim();
            applyRoleAccess(); renderSettings(); showToast('Staff profile updated for this session');
          });
          document.getElementById('password-form').addEventListener('submit', function(e){
            e.preventDefault();
            var f = new FormData(e.currentTarget);
            var error = document.getElementById('password-error');
            var current = String(f.get('current')); var next = String(f.get('next')); var confirm = String(f.get('confirm'));
            if (current !== currentUser.password) { error.textContent = 'Current password is incorrect.'; document.getElementById('current-password').focus(); return; }
            if (next.length < 8) { error.textContent = 'New password must contain at least 8 characters.'; document.getElementById('new-password').focus(); return; }
            if (next !== confirm) { error.textContent = 'New passwords do not match.'; document.getElementById('confirm-password').focus(); return; }
            currentUser.password = next; error.textContent = ''; e.currentTarget.reset(); showToast('Password updated for this prototype session');
          });
          document.querySelectorAll('[data-preference]').forEach(function(btn){ btn.addEventListener('click', function(){
            var key = btn.dataset.preference; notificationPreferences[key] = !notificationPreferences[key]; renderSettings(); showToast(notificationPreferences[key] ? 'Notification enabled' : 'Notification disabled');
          }); });
          document.querySelectorAll('[data-theme-choice]').forEach(function(btn){ btn.addEventListener('click', function(){
            appearance = btn.dataset.themeChoice;
            if (appearance === 'system') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', appearance);
            renderSettings(); showToast((appearance === 'system' ? 'System' : statusLabel(appearance)) + ' appearance selected');
          }); });
          document.getElementById('clinic-form').addEventListener('submit', function(e){
            e.preventDefault();
            if (!currentUser || currentUser.role !== 'admin') { showToast('Only administrators can edit clinic details'); return; }
            var f = new FormData(e.currentTarget);
            clinicProfile.name = String(f.get('name')).trim(); clinicProfile.email = String(f.get('email')).trim(); clinicProfile.phone = String(f.get('phone')).trim(); clinicProfile.address = String(f.get('address')).trim();
            document.querySelector('.clinic-context strong').textContent = clinicProfile.name;
            showToast('Clinic profile updated for this session');
          });
          renderDateStrip(); renderList(); renderCalendar(); renderPatients(); renderRecord(); renderInventory(); renderInvoices(); renderTriage(); renderTriageDetail(); renderReports(); renderNotifications(); renderStaff(); updateCounts();
        })();

  }, []);

  return (
    <>
      <main className="auth-screen" id="auth-screen">
          <div className="auth-shell">
            <section className="auth-intro" aria-labelledby="auth-welcome">
              <div>
                <div className="auth-lock" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></svg>
                </div>
                <h1 id="auth-welcome">Welcome back</h1>
                <p>Sign in with a staff account to open the clinic workspace. Access is tailored to each staff role.</p>
              </div>
              <div className="auth-trust" aria-label="Access details">
                <div className="auth-trust-item"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 12 4 4L19 6"/><circle cx="12" cy="12" r="9"/></svg><span>Admin, veterinarian, and receptionist roles</span></div>
                <div className="auth-trust-item"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3 5 6v5c0 4.6 2.9 8.2 7 10 4.1-1.8 7-5.4 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg><span>Workspace stays locked until sign-in</span></div>
              </div>
            </section>
            <section className="auth-panel" aria-labelledby="login-title">
              <h2 id="login-title">Staff sign in</h2>
              <p>Enter your clinic email and password.</p>
              <form className="auth-form" id="login-form" novalidate>
                <div className="field">
                  <label htmlFor="login-email">Email address</label>
                  <input id="login-email" name="email" type="email" autocomplete="username" inputmode="email" required placeholder="name@carepaws.demo" />
                </div>
                <div className="field">
                  <label htmlFor="login-password">Password</label>
                  <div className="password-wrap">
                    <input id="login-password" name="password" type="password" autocomplete="current-password" required placeholder="Enter your password" />
                    <button className="password-toggle" id="password-toggle" type="button" aria-label="Show password" aria-pressed="false">
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.5"/></svg>
                    </button>
                  </div>
                </div>
                <p className="auth-error" id="login-error" role="alert" aria-live="polite"></p>
                <button className="primary-btn auth-submit" type="submit">Sign in</button>
              </form>
              <div className="demo-accounts">
                <h3>Demo accounts</h3>
                <p>Select an account to fill the credentials, then sign in.</p>
                <div className="demo-account-list">
                  <button className="demo-account" type="button" data-demo-email="admin@carepaws.demo" data-demo-password="CarePawsAdmin!"><strong>Administrator</strong><span>admin@carepaws.demo</span><small>Use account</small></button>
                  <button className="demo-account" type="button" data-demo-email="vet@carepaws.demo" data-demo-password="CarePawsVet!"><strong>Veterinarian</strong><span>vet@carepaws.demo</span><small>Use account</small></button>
                  <button className="demo-account" type="button" data-demo-email="reception@carepaws.demo" data-demo-password="CarePawsDesk!"><strong>Receptionist</strong><span>reception@carepaws.demo</span><small>Use account</small></button>
                </div>
              </div>
              <p className="auth-caveat">Prototype access only. Production protection requires the planned NestJS authentication service, secure password hashing, HTTPS, and server-side authorization. This demo session ends when the page is refreshed or the tab is closed.</p>
            </section>
          </div>
        </main>

        <div className="app" id="workspace" hidden aria-hidden="true">
          <aside className="sidebar" aria-label="Primary navigation">
            <div className="clinic-context">
              <strong>Pet Care Veterinary Clinic</strong>
              <span>Staff workspace · Single branch</span>
            </div>
            <nav className="nav">
              <button className="nav-btn active" data-page="dashboard" data-roles="admin,vet,receptionist" aria-current="page">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
                <span className="nav-label">Dashboard</span>
              </button>
              <button className="nav-btn" data-page="appointments" data-roles="admin,vet,receptionist">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>
                <span className="nav-label">Appointments</span><span className="nav-badge" id="appointment-nav-badge">3</span>
              </button>
              <button className="nav-btn" data-page="records" data-roles="admin,vet,receptionist">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 4h8M9 2h6v4H9z"/><rect x="4" y="4" width="16" height="18" rx="2"/><path d="M12 10v6M9 13h6"/></svg>
                <span className="nav-label">Records</span>
              </button>
              <button className="nav-btn" data-page="inventory" data-roles="admin,receptionist">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m4 7 8-4 8 4-8 4-8-4Z"/><path d="m4 7v10l8 4 8-4V7M12 11v10"/></svg>
                <span className="nav-label">Inventory</span><span className="nav-badge" id="inventory-nav-badge">5</span>
              </button>
              <button className="nav-btn" data-page="billing" data-roles="admin,vet,receptionist">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>
                <span className="nav-label">Billing</span><span className="nav-badge" id="billing-nav-badge">2</span>
              </button>
              <button className="nav-btn" data-page="triage" data-roles="admin,vet">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3v3M5.6 5.6l2.1 2.1M3 12h3M18 12h3M16.3 7.7l2.1-2.1"/><path d="M8 15a4 4 0 1 1 8 0c0 1.6-1 2.5-2 3.5V21h-4v-2.5C9 17.5 8 16.6 8 15Z"/></svg>
                <span className="nav-label">AI &amp; Reports</span><span className="nav-badge" id="triage-nav-badge">2</span>
              </button>
              <button className="nav-btn" data-page="staff" data-roles="admin">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M16 11h6"/></svg>
                <span className="nav-label">Staff</span>
              </button>
              <button className="nav-btn" data-page="settings" data-roles="admin,vet,receptionist">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></svg>
                <span className="nav-label">Settings</span>
              </button>
            </nav>
            <div className="sidebar-spacer"></div>
            <div className="role-card" aria-label="Signed-in staff account">
              <div className="avatar" id="sidebar-avatar">ST</div>
              <div><strong id="sidebar-user-name">Staff member</strong><span id="sidebar-user-role">Role access</span></div>
              <button className="signout-btn" type="button" data-sign-out aria-label="Sign out">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M10 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5M14 8l4 4-4 4M8 12h10"/></svg>
              </button>
            </div>
          </aside>

          <main className="main">
            <header className="topbar">
              <div className="topbar-title" id="topbar-title">Clinic overview</div>
              <div className="topbar-actions">
                <span className="sample-tag">Sample clinic data</span>
                <div className="session-chip" aria-label="Current staff session"><span className="session-avatar" id="topbar-avatar">ST</span><span id="topbar-role">Staff</span></div>
                <button className="icon-btn" type="button" aria-label="Search appointments" id="search-shortcut">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
                </button>
                <button className="icon-btn" type="button" aria-label="Notifications" id="notification-btn">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>
                  <span className="alert-dot"></span>
                </button>
                <button className="icon-btn topbar-signout" type="button" data-sign-out aria-label="Sign out">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M10 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5M14 8l4 4-4 4M8 12h10"/></svg>
                </button>
              </div>
              <aside className="notification-panel" id="notification-panel" aria-label="Notifications" aria-hidden="true">
                <div className="notification-head"><h2>Notifications</h2><button type="button" id="mark-all-read">Mark all read</button></div>
                <div className="notification-list" id="notification-list"></div>
              </aside>
            </header>

            <div className="content">
              <section className="page active" id="dashboard-page">
                <div className="page-heading">
                  <div>
                    <h1>Wednesday at a glance</h1>
                    <p>October 7 · A focused view of today’s clinic operations.</p>
                  </div>
                  <button className="primary-btn" type="button" data-open-add>
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                    New appointment
                  </button>
                </div>

                <div className="stats-grid">
                  <article className="stat-card">
                    <div className="stat-top"><span>Today’s visits</span><span className="stat-icon"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg></span></div>
                    <div className="stat-value"><strong id="visit-count">8</strong><span>2 completed</span></div>
                  </article>
                  <article className="stat-card">
                    <div className="stat-top"><span>Pending requests</span><span className="stat-icon amber"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span></div>
                    <div className="stat-value"><strong id="pending-count">3</strong><span>Needs review</span></div>
                  </article>
                  <article className="stat-card">
                    <div className="stat-top"><span>Patient records</span><span className="stat-icon blue"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 4h8M9 2h6v4H9z"/><rect x="4" y="4" width="16" height="18" rx="2"/><path d="M8 11h8M8 15h6"/></svg></span></div>
                    <div className="stat-value"><strong>248</strong><span>6 updated this week</span></div>
                  </article>
                  <article className="stat-card">
                    <div className="stat-top"><span>Low-stock items</span><span className="stat-icon amber"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 9v4M12 17h.01"/><path d="M10.3 4.2 2.8 17.1a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0Z"/></svg></span></div>
                    <div className="stat-value"><strong id="low-stock-count">5</strong><span id="critical-stock-caption">2 critical</span></div>
                  </article>
                </div>

                <div className="dashboard-grid">
                  <div className="stack">
                    <section className="panel">
                      <div className="panel-head">
                        <div><h2>Today’s schedule</h2><p>Next visit starts in 20 minutes</p></div>
                        <button className="text-btn" type="button" data-go-appointments>View all</button>
                      </div>
                      <div className="schedule-list">
                        <div className="schedule-row">
                          <div className="time"><strong>9:00 AM</strong><span>30 min</span></div><div className="timeline green"></div>
                          <div className="pet-line"><strong>Milo · Golden Retriever</strong><span>Annual wellness exam · Ana Reyes</span></div><span className="status completed">Completed</span>
                        </div>
                        <div className="schedule-row">
                          <div className="time"><strong>10:30 AM</strong><span>30 min</span></div><div className="timeline"></div>
                          <div className="pet-line"><strong>Luna · Persian Cat</strong><span>Vaccination · Paolo Cruz</span></div><span className="status confirmed">Confirmed</span>
                        </div>
                        <div className="schedule-row">
                          <div className="time"><strong>11:15 AM</strong><span>45 min</span></div><div className="timeline blue"></div>
                          <div className="pet-line"><strong>Choco · Shih Tzu</strong><span>Skin concern follow-up · Mia Santos</span></div><span className="status confirmed">Confirmed</span>
                        </div>
                        <div className="schedule-row">
                          <div className="time"><strong>1:30 PM</strong><span>30 min</span></div><div className="timeline"></div>
                          <div className="pet-line"><strong>Oreo · Domestic Shorthair</strong><span>General consultation · Ben Flores</span></div><span className="status pending">Pending</span>
                        </div>
                      </div>
                    </section>

                    <section className="panel">
                      <div className="panel-head"><div><h2>Quick actions</h2><p>Common front-desk tasks</p></div></div>
                      <div className="quick-grid">
                        <button className="quick-action" type="button" data-open-add><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M12 13v5M9.5 15.5h5"/></svg><strong>Book a visit</strong><span>Add to the schedule</span></button>
                        <button className="quick-action" type="button" id="review-requests"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 4h8M9 2h6v4H9z"/><rect x="4" y="4" width="16" height="18" rx="2"/><path d="M8 12h8M8 16h5"/></svg><strong>Review requests</strong><span>3 awaiting action</span></button>
                        <button className="quick-action" type="button" id="today-list"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg><strong>Today’s list</strong><span>See all 8 visits</span></button>
                        <button className="quick-action" type="button" data-open-invoice><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 8h6M9 12h6M9 16h3"/></svg><strong>Create invoice</strong><span>Bill a completed visit</span></button>
                      </div>
                    </section>
                  </div>

                  <div className="stack">
                    <section className="panel">
                      <div className="panel-head"><div><h2>Recent AI triage</h2><p>Owner submissions forwarded for review</p></div><button className="text-btn" type="button" id="triage-info">Review queue</button></div>
                      <div className="compact-list">
                        <div className="compact-item"><span className="compact-icon ai"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3v3M5.6 5.6l2.1 2.1M3 12h3M18 12h3M16.3 7.7l2.1-2.1"/><path d="M8 15a4 4 0 1 1 8 0c0 1.6-1 2.5-2 3.5V21h-4v-2.5C9 17.5 8 16.6 8 15Z"/></svg></span><div><strong>Bella · Beagle</strong><span>Low appetite and lethargy · 18 min ago</span></div><span className="risk">Review</span></div>
                        <div className="compact-item"><span className="compact-icon ai"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3v3M5.6 5.6l2.1 2.1M3 12h3M18 12h3M16.3 7.7l2.1-2.1"/><path d="M8 15a4 4 0 1 1 8 0c0 1.6-1 2.5-2 3.5V21h-4v-2.5C9 17.5 8 16.6 8 15Z"/></svg></span><div><strong>Max · Aspin</strong><span>Persistent scratching · 1 hr ago</span></div><span className="risk">New</span></div>
                      </div>
                      <p className="ai-note">AI suggestions are preliminary support only and do not replace a licensed veterinarian’s diagnosis.</p>
                    </section>

                    <section className="panel">
                      <div className="panel-head"><div><h2>Billing snapshot</h2><p>Outstanding clinic invoices</p></div><button className="text-btn" type="button" data-go-billing>View billing</button></div>
                      <div className="billing-snapshot"><div><strong className="money" id="dashboard-outstanding">₱3,950.00</strong><span id="dashboard-invoice-caption">2 invoices need attention</span></div><span className="status pending">Pending</span></div>
                    </section>

                    <section className="panel">
                      <div className="panel-head"><div><h2>Inventory watch</h2><p>Items at or below reorder level</p></div><button className="text-btn" type="button" data-go-inventory>Manage</button></div>
                      <div className="compact-list" id="inventory-watch-list"></div>
                    </section>
                  </div>
                </div>
                <p className="demo-footer">Prototype content uses sample clinic data for interface review.</p>
              </section>

              <section className="page" id="appointments-page">
                <div className="page-heading">
                  <div>
                    <h1>Appointments</h1>
                    <p>Review requests and coordinate the clinic schedule.</p>
                  </div>
                  <button className="primary-btn" type="button" data-open-add>
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                    New appointment
                  </button>
                </div>

                <div className="appointment-toolbar">
                  <label className="search-wrap" aria-label="Search appointments">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
                    <input id="appointment-search" type="search" placeholder="Search pet, owner, or service" />
                  </label>
                  <select className="select" id="status-filter" aria-label="Filter by status">
                    <option value="all">All statuses</option><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option>
                  </select>
                  <div className="view-toggle" aria-label="Choose appointment view">
                    <button className="view-btn active" type="button" data-view="list"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg>List</button>
                    <button className="view-btn" type="button" data-view="calendar"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>Calendar</button>
                  </div>
                </div>

                <section className="appointments-shell">
                  <div className="date-strip" aria-label="Week of October 5, 2026">
                    <button className="date-nav" type="button" aria-label="Previous week" data-week-nav="previous"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg></button>
                    <button className="date-chip" type="button"><span>Mon</span><strong>5</strong></button>
                    <button className="date-chip" type="button"><span>Tue</span><strong>6</strong></button>
                    <button className="date-chip active" type="button"><span>Wed</span><strong>7</strong></button>
                    <button className="date-chip" type="button"><span>Thu</span><strong>8</strong></button>
                    <button className="date-chip" type="button"><span>Fri</span><strong>9</strong></button>
                    <button className="date-chip" type="button"><span>Sat</span><strong>10</strong></button>
                    <button className="date-chip" type="button"><span>Sun</span><strong>11</strong></button>
                    <button className="date-nav" type="button" aria-label="Next week" data-week-nav="next"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg></button>
                  </div>

                  <div className="list-view" id="list-view">
                    <div className="list-head"><span>Time</span><span>Patient</span><span>Owner</span><span className="type-head">Visit type</span><span>Status</span><span></span></div>
                    <div className="appointment-list" id="appointment-list"></div>
                  </div>

                  <div className="calendar-view" id="calendar-view">
                    <div className="calendar-grid" id="calendar-grid"></div>
                  </div>
                </section>
                <p className="demo-footer">Changes made here last only for this prototype session.</p>
              </section>

              <section className="page" id="records-page">
                <div className="page-heading">
                  <div>
                    <h1>Patient medical records</h1>
                    <p>Review clinical history, vaccinations, and active treatments.</p>
                  </div>
                  <button className="primary-btn" type="button" id="records-book-visit">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                    Book follow-up
                  </button>
                </div>

                <div className="records-toolbar">
                  <label className="search-wrap" aria-label="Search patient records">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
                    <input id="record-search" type="search" placeholder="Search patient, owner, or record ID" />
                  </label>
                  <select className="select" id="species-filter" aria-label="Filter by species">
                    <option value="all">All species</option><option value="Dog">Dogs</option><option value="Cat">Cats</option>
                  </select>
                  <span className="record-count" id="record-count">6 patient records</span>
                </div>

                <div className="records-layout" id="records-layout">
                  <section className="patient-directory" aria-label="Patient directory">
                    <div className="directory-head"><h2>Patient directory</h2><p>Select a patient to view the complete record.</p></div>
                    <div className="patient-list" id="patient-list"></div>
                  </section>

                  <article className="record-sheet" id="record-sheet" aria-live="polite">
                    <div className="record-hero">
                      <div>
                        <button className="secondary-btn mobile-record-back" type="button" id="record-back">
                          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
                          All patients
                        </button>
                        <div className="record-identity">
                          <div className="patient-avatar-large" id="record-avatar">MR</div>
                          <div><h2 id="record-name">Milo Reyes</h2><p id="record-subtitle">Golden Retriever · Male · 4 years old</p></div>
                        </div>
                      </div>
                      <div className="record-actions">
                        <button className="secondary-btn" type="button" id="copy-record-id">
                          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>
                          Copy record ID
                        </button>
                        <button className="primary-btn" type="button" id="patient-book-visit"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18M12 13v5M9.5 15.5h5"/></svg>Book visit</button>
                      </div>
                    </div>
                    <div className="record-tabs" role="tablist" aria-label="Medical record sections">
                      <button className="record-tab active" type="button" role="tab" aria-selected="true" data-record-tab="overview">Overview</button>
                      <button className="record-tab" type="button" role="tab" aria-selected="false" data-record-tab="visits">Visit history</button>
                      <button className="record-tab" type="button" role="tab" aria-selected="false" data-record-tab="vaccines">Vaccinations</button>
                      <button className="record-tab" type="button" role="tab" aria-selected="false" data-record-tab="medications">Medications</button>
                    </div>
                    <div className="record-body">
                      <section className="record-pane active" id="record-overview" role="tabpanel"></section>
                      <section className="record-pane" id="record-visits" role="tabpanel"></section>
                      <section className="record-pane" id="record-vaccines" role="tabpanel"></section>
                      <section className="record-pane" id="record-medications" role="tabpanel"></section>
                    </div>
                  </article>
                </div>
                <p className="demo-footer">Prototype content uses sample patient records for interface review.</p>
              </section>

              <section className="page" id="inventory-page">
                <div className="page-heading">
                  <div>
                    <h1>Inventory management</h1>
                    <p>Track medicines, vaccines, and clinic supplies against reorder levels.</p>
                  </div>
                  <button className="primary-btn" type="button" id="receive-stock">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                    Record stock movement
                  </button>
                </div>

                <div className="stats-grid">
                  <article className="stat-card">
                    <div className="stat-top"><span>Tracked items</span><span className="stat-icon"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m4 7 8-4 8 4-8 4-8-4Z"/><path d="m4 7v10l8 4 8-4V7M12 11v10"/></svg></span></div>
                    <div className="stat-value"><strong id="inventory-total">8</strong><span>Across 4 categories</span></div>
                  </article>
                  <article className="stat-card">
                    <div className="stat-top"><span>Needs reorder</span><span className="stat-icon amber"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 9v4M12 17h.01"/><path d="M10.3 4.2 2.8 17.1a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0Z"/></svg></span></div>
                    <div className="stat-value"><strong id="inventory-low">5</strong><span>At or below level</span></div>
                  </article>
                  <article className="stat-card">
                    <div className="stat-top"><span>Critical stock</span><span className="stat-icon"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 9v4M12 17h.01"/><path d="M10.3 4.2 2.8 17.1a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0Z"/></svg></span></div>
                    <div className="stat-value"><strong id="inventory-critical">2</strong><span>Prioritize today</span></div>
                  </article>
                  <article className="stat-card">
                    <div className="stat-top"><span>Expiring soon</span><span className="stat-icon blue"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span></div>
                    <div className="stat-value"><strong id="inventory-expiring">2</strong><span>Within 90 days</span></div>
                  </article>
                </div>

                <div className="inventory-toolbar">
                  <label className="search-wrap" aria-label="Search inventory">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
                    <input id="inventory-search" type="search" placeholder="Search item, SKU, or supplier" />
                  </label>
                  <select className="select" id="inventory-category" aria-label="Filter by category">
                    <option value="all">All categories</option><option value="Medicine">Medicine</option><option value="Vaccine">Vaccines</option><option value="Supply">Supplies</option><option value="Preventive">Preventives</option>
                  </select>
                  <select className="select" id="inventory-status" aria-label="Filter by stock status">
                    <option value="all">All stock levels</option><option value="reorder">Needs reorder</option><option value="critical">Critical only</option><option value="healthy">In stock</option>
                  </select>
                  <span className="inventory-count" id="inventory-count">8 items</span>
                </div>

                <section className="inventory-shell" aria-label="Clinic inventory">
                  <div className="inventory-head"><span>Item</span><span>Category</span><span>On hand</span><span className="reorder-col">Reorder at</span><span className="expiry-col">Nearest expiry</span><span>Status</span><span></span></div>
                  <div className="inventory-list" id="inventory-list"></div>
                </section>
                <div className="stock-context"><span><strong>Stock rule:</strong> items at or below their reorder level appear in the watch list.</span><span>Last sample count: October 7, 2026</span></div>
                <p className="demo-footer">Changes made here last only for this prototype session.</p>
              </section>

              <section className="page" id="billing-page">
                <div className="page-heading">
                  <div><h1>Billing &amp; invoicing</h1><p>Create itemized invoices from clinic visits and track payment status.</p></div>
                  <button className="primary-btn" type="button" data-open-invoice><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>New invoice</button>
                </div>
                <div className="stats-grid">
                  <article className="stat-card"><div className="stat-top"><span>Total billed</span><span className="stat-icon"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 8h6M9 12h6"/></svg></span></div><div className="stat-value"><strong className="money" id="billing-total">₱8,550</strong><span>All sample invoices</span></div></article>
                  <article className="stat-card"><div className="stat-top"><span>Collected</span><span className="stat-icon green"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m5 12 4 4L19 6"/><circle cx="12" cy="12" r="9"/></svg></span></div><div className="stat-value"><strong className="money" id="billing-paid">₱4,600</strong><span>Marked paid</span></div></article>
                  <article className="stat-card"><div className="stat-top"><span>Outstanding</span><span className="stat-icon amber"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span></div><div className="stat-value"><strong className="money" id="billing-outstanding">₱3,950</strong><span>Pending and overdue</span></div></article>
                  <article className="stat-card"><div className="stat-top"><span>Overdue</span><span className="stat-icon amber"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 9v4M12 17h.01"/><path d="M10.3 4.2 2.8 17.1a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0Z"/></svg></span></div><div className="stat-value"><strong id="billing-overdue">1</strong><span>Needs follow-up</span></div></article>
                </div>
                <div className="billing-toolbar">
                  <label className="search-wrap" aria-label="Search invoices"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><input id="invoice-search" type="search" placeholder="Search invoice, owner, patient, or appointment" /></label>
                  <select className="select" id="invoice-status-filter" aria-label="Filter invoice status"><option value="all">All statuses</option><option value="paid">Paid</option><option value="pending">Pending</option><option value="overdue">Overdue</option></select>
                  <span className="billing-count" id="invoice-count">4 invoices</span>
                </div>
                <div className="billing-layout">
                  <section className="invoice-list-panel" aria-label="Invoices">
                    <div className="invoice-head"><span>Invoice</span><span>Owner &amp; patient</span><span>Amount</span><span>Status</span><span></span></div>
                    <div className="invoice-list" id="invoice-list"></div>
                  </section>
                  <article className="invoice-detail" id="invoice-detail" aria-live="polite"></article>
                </div>
                <p className="demo-footer">Invoice changes apply to this prototype session only.</p>
              </section>

              <section className="page" id="triage-page">
                <div className="page-heading">
                  <div>
                    <h1>AI triage &amp; reports</h1>
                    <p>Review owner-submitted concerns and monitor clinic activity.</p>
                  </div>
                </div>

                <div className="module-tabs" role="tablist" aria-label="AI triage and reports sections">
                  <button className="module-tab active" type="button" role="tab" aria-selected="true" data-module-tab="queue">Triage queue</button>
                  <button className="module-tab" type="button" role="tab" aria-selected="false" data-module-tab="reports">Clinic reports</button>
                </div>

                <section className="triage-pane active" id="triage-queue-pane" role="tabpanel">
                  <div className="stats-grid">
                    <article className="stat-card"><div className="stat-top"><span>Awaiting review</span><span className="stat-icon"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 4h8M9 2h6v4H9z"/><rect x="4" y="4" width="16" height="18" rx="2"/><path d="M8 12h8M8 16h5"/></svg></span></div><div className="stat-value"><strong id="triage-new-count">2</strong><span>Owner submissions</span></div></article>
                    <article className="stat-card"><div className="stat-top"><span>High priority</span><span className="stat-icon amber"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 9v4M12 17h.01"/><path d="M10.3 4.2 2.8 17.1a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0Z"/></svg></span></div><div className="stat-value"><strong id="triage-high-count">1</strong><span>Review first</span></div></article>
                    <article className="stat-card"><div className="stat-top"><span>Reviewed this week</span><span className="stat-icon blue"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m5 12 4 4L19 6"/><circle cx="12" cy="12" r="9"/></svg></span></div><div className="stat-value"><strong id="triage-reviewed-count">14</strong><span>Veterinarian reviewed</span></div></article>
                    <article className="stat-card"><div className="stat-top"><span>Median review time</span><span className="stat-icon green"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span></div><div className="stat-value"><strong>18m</strong><span>Sample workflow</span></div></article>
                  </div>

                  <div className="triage-layout">
                    <section className="triage-queue" aria-label="AI triage queue">
                      <div className="triage-toolbar">
                        <label className="search-wrap" aria-label="Search triage submissions"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><input id="triage-search" type="search" placeholder="Search patient or symptom" /></label>
                        <select className="select" id="triage-filter" aria-label="Filter triage submissions"><option value="open">Awaiting review</option><option value="all">All submissions</option><option value="high">High priority</option><option value="reviewed">Reviewed</option></select>
                      </div>
                      <div className="triage-queue-list" id="triage-list"></div>
                    </section>

                    <article className="triage-case" aria-live="polite">
                      <div className="case-head">
                        <div><h2 id="triage-case-name">Bella · Beagle</h2><p id="triage-case-subtitle">Submitted from the owner app</p></div>
                        <div className="case-actions"><button className="secondary-btn" type="button" id="triage-book"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18M12 13v5M9.5 15.5h5"/></svg>Book visit</button><button className="primary-btn" type="button" id="mark-triage-reviewed"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 12 4 4L19 6"/><circle cx="12" cy="12" r="9"/></svg><span>Mark reviewed</span></button></div>
                      </div>
                      <div className="case-body" id="triage-case-body"></div>
                    </article>
                  </div>
                  <p className="demo-footer">AI output is preliminary decision support and requires review by a licensed veterinarian.</p>
                </section>

                <section className="triage-pane" id="triage-reports-pane" role="tabpanel">
                  <div className="report-controls">
                    <select className="select" id="report-period" aria-label="Choose reporting period"><option value="week">This week · Oct 5–11</option><option value="month">October 2026</option><option value="quarter">Q4 2026 to date</option></select>
                    <button className="secondary-btn" type="button" id="download-report"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>Download CSV</button>
                  </div>
                  <article className="reports-panel">
                    <div className="report-heading"><div><h2>Clinic activity summary</h2><p>Appointments and triage workload for the selected sample period.</p></div><span className="report-period" id="report-period-label">October 5–11, 2026</span></div>
                    <div className="report-grid" id="report-summary"></div>
                    <div className="record-section-head"><h3>Visit mix</h3><span>Completed and scheduled visits</span></div>
                    <div className="report-breakdown" id="report-breakdown"></div>
                  </article>
                  <p className="demo-footer">Report figures use sample clinic data for interface review.</p>
                </section>
              </section>

              <section className="page" id="staff-page">
                <div className="page-heading">
                  <div><h1>Staff management</h1><p>Manage clinic accounts, roles, and workspace access.</p></div>
                  <button className="primary-btn" type="button" id="add-staff"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M16 11h6"/></svg>Add staff account</button>
                </div>
                <div className="staff-toolbar">
                  <label className="search-wrap" aria-label="Search staff"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><input id="staff-search" type="search" placeholder="Search name, email, or role" /></label>
                  <select className="select" id="staff-role-filter" aria-label="Filter staff role"><option value="all">All roles</option><option value="admin">Administrators</option><option value="vet">Veterinarians</option><option value="receptionist">Receptionists</option></select>
                  <select className="select" id="staff-status-filter" aria-label="Filter staff status"><option value="all">All accounts</option><option value="active">Active</option><option value="inactive">Deactivated</option></select>
                  <span className="staff-count" id="staff-count">5 staff accounts</span>
                </div>
                <section className="staff-shell" aria-label="Staff accounts">
                  <div className="staff-head"><span>Staff member</span><span>Role</span><span>Email</span><span>Status</span><span>Actions</span></div>
                  <div className="staff-list" id="staff-list"></div>
                </section>
                <p className="demo-footer">Staff account changes apply to this prototype session only. Production role enforcement belongs on the server.</p>
              </section>

              <section className="page" id="settings-page">
                <div className="page-heading">
                  <div>
                    <h1>Settings</h1>
                    <p>Manage your staff account, clinic preferences, and workspace access.</p>
                  </div>
                </div>

                <div className="settings-layout">
                  <div className="settings-column">
                    <section className="settings-panel">
                      <div className="settings-head"><div><h2>Staff profile</h2><p>Contact details shown across the staff workspace.</p></div><span className="access-tag" id="settings-role-tag">Staff</span></div>
                      <form className="settings-body settings-form" id="profile-form">
                        <div className="field"><label htmlFor="settings-name">Full name</label><input id="settings-name" name="name" required /></div>
                        <div className="field"><label htmlFor="settings-role">Role</label><input id="settings-role" name="role" disabled /></div>
                        <div className="field"><label htmlFor="settings-email">Email address</label><input id="settings-email" name="email" type="email" required /></div>
                        <div className="field"><label htmlFor="settings-phone">Contact number</label><input id="settings-phone" name="phone" inputmode="tel" placeholder="Add contact number" /></div>
                        <div className="settings-actions full"><button className="primary-btn" type="submit">Save profile</button></div>
                      </form>
                    </section>

                    <section className="settings-panel">
                      <div className="settings-head"><div><h2>Change password</h2><p>Use at least 8 characters for this prototype account.</p></div></div>
                      <form className="settings-body settings-form" id="password-form">
                        <div className="field full"><label htmlFor="current-password">Current password</label><input id="current-password" name="current" type="password" autocomplete="current-password" required /></div>
                        <div className="field"><label htmlFor="new-password">New password</label><input id="new-password" name="next" type="password" autocomplete="new-password" minlength="8" required /></div>
                        <div className="field"><label htmlFor="confirm-password">Confirm new password</label><input id="confirm-password" name="confirm" type="password" autocomplete="new-password" minlength="8" required /></div>
                        <p className="auth-error full" id="password-error" role="alert" aria-live="polite"></p>
                        <div className="settings-actions full"><button className="primary-btn" type="submit">Update password</button></div>
                      </form>
                    </section>

                    <section className="settings-panel">
                      <div className="settings-head"><div><h2>Clinic profile</h2><p>Single-branch details used in clinic-facing records.</p></div><span className="access-tag" id="clinic-access-tag">Admin only</span></div>
                      <form className="settings-body settings-form" id="clinic-form">
                        <div className="field full"><label htmlFor="clinic-name">Clinic name</label><input id="clinic-name" name="name" required /></div>
                        <div className="field"><label htmlFor="clinic-email">Clinic email</label><input id="clinic-email" name="email" type="email" /></div>
                        <div className="field"><label htmlFor="clinic-phone">Clinic contact</label><input id="clinic-phone" name="phone" inputmode="tel" /></div>
                        <div className="field full"><label htmlFor="clinic-address">Branch details</label><input id="clinic-address" name="address" /></div>
                        <div className="settings-actions full"><button className="primary-btn" id="save-clinic" type="submit">Save clinic profile</button></div>
                      </form>
                    </section>
                  </div>

                  <div className="settings-column">
                    <section className="settings-panel">
                      <div className="settings-head"><div><h2>Notifications</h2><p>Choose how operational alerts reach you.</p></div></div>
                      <div className="settings-body preference-list">
                        <div className="preference-row"><div><strong>Email appointment reminders</strong><span>Schedule changes and upcoming visits</span></div><button className="toggle active" type="button" data-preference="emailAppointments" aria-label="Email appointment reminders" aria-pressed="true"></button></div>
                        <div className="preference-row"><div><strong>SMS appointment reminders</strong><span>Urgent changes sent to your contact number</span></div><button className="toggle" type="button" data-preference="smsAppointments" aria-label="SMS appointment reminders" aria-pressed="false"></button></div>
                        <div className="preference-row"><div><strong>Email low-stock alerts</strong><span>Items that reach their reorder level</span></div><button className="toggle active" type="button" data-preference="emailStock" aria-label="Email low-stock alerts" aria-pressed="true"></button></div>
                        <div className="preference-row"><div><strong>SMS low-stock alerts</strong><span>Critical inventory warnings only</span></div><button className="toggle" type="button" data-preference="smsStock" aria-label="SMS low-stock alerts" aria-pressed="false"></button></div>
                      </div>
                    </section>

                    <section className="settings-panel">
                      <div className="settings-head"><div><h2>Appearance</h2><p>Choose how the workspace looks on this device.</p></div></div>
                      <div className="settings-body">
                        <div className="theme-options" role="group" aria-label="Appearance theme">
                          <button className="theme-choice active" type="button" data-theme-choice="system">System</button>
                          <button className="theme-choice" type="button" data-theme-choice="light">Light</button>
                          <button className="theme-choice" type="button" data-theme-choice="dark">Dark</button>
                        </div>
                        <p className="settings-note">Theme and notification changes last for this prototype session.</p>
                      </div>
                    </section>

                    <section className="settings-panel danger-panel">
                      <div className="settings-head"><div><h2>Session</h2><p>End access to the staff workspace on this device.</p></div></div>
                      <div className="settings-body logout-row"><p>You will return to the staff sign-in screen.</p><button className="secondary-btn logout-btn" type="button" data-sign-out><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M10 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5M14 8l4 4-4 4M8 12h10"/></svg>Log out</button></div>
                    </section>
                  </div>
                </div>
                <p className="demo-footer">Settings changes apply to this prototype session only.</p>
              </section>
            </div>
          </main>
        </div>

        <div className="modal-backdrop" id="add-modal" role="dialog" aria-modal="true" aria-labelledby="add-title">
          <div className="modal">
            <div className="modal-head"><div><h2 id="add-title">New appointment</h2><p>Add a visit to the prototype schedule.</p></div><button className="close-btn" type="button" data-close-modal aria-label="Close"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
            <form id="add-form">
              <div className="modal-body form-grid">
                <div className="field"><label htmlFor="pet-name">Pet name</label><input id="pet-name" name="pet" required placeholder="e.g. Coco" /></div>
                <div className="field"><label htmlFor="species">Species / breed</label><input id="species" name="breed" required placeholder="e.g. Pomeranian" /></div>
                <div className="field"><label htmlFor="owner-name">Owner name</label><input id="owner-name" name="owner" required placeholder="Full name" /></div>
                <div className="field"><label htmlFor="visit-type">Visit type</label><select id="visit-type" name="type"><option>General consultation</option><option>Vaccination</option><option>Wellness exam</option><option>Follow-up</option><option>Dental check</option></select></div>
                <div className="field"><label htmlFor="visit-date">Date</label><input id="visit-date" name="date" type="date" value="2026-10-07" required /></div>
                <div className="field"><label htmlFor="visit-time">Time</label><input id="visit-time" name="time" type="time" value="14:30" required /></div>
                <div className="field full"><label htmlFor="visit-notes">Notes</label><textarea id="visit-notes" name="notes" placeholder="Reason for visit or preparation notes"></textarea></div>
              </div>
              <div className="modal-actions"><button className="secondary-btn" type="button" data-close-modal>Cancel</button><button className="primary-btn" type="submit">Add to prototype</button></div>
            </form>
          </div>
        </div>

        <div className="modal-backdrop" id="detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title">
          <div className="modal">
            <div className="modal-head"><div><h2 id="detail-title">Appointment details</h2><p id="detail-subtitle"></p></div><button className="close-btn" type="button" data-close-modal aria-label="Close"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
            <div className="modal-body"><div className="detail-grid" id="detail-grid"></div></div>
            <div className="modal-actions" id="detail-actions"></div>
          </div>
        </div>
        <div className="modal-backdrop" id="stock-modal" role="dialog" aria-modal="true" aria-labelledby="stock-title">
          <div className="modal">
            <div className="modal-head"><div><h2 id="stock-title">Record stock movement</h2><p>Update an item after receiving or using clinic stock.</p></div><button className="close-btn" type="button" data-close-modal aria-label="Close"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
            <form id="stock-form">
              <div className="modal-body form-grid">
                <div className="field full"><label htmlFor="stock-item">Inventory item</label><select id="stock-item" name="item" required></select></div>
                <div className="field"><label htmlFor="stock-direction">Movement</label><select id="stock-direction" name="direction"><option value="receive">Receive stock</option><option value="use">Record usage</option></select></div>
                <div className="field"><label htmlFor="stock-quantity">Quantity</label><input id="stock-quantity" name="quantity" type="number" min="1" step="1" value="1" required /></div>
                <div className="field full"><label htmlFor="stock-reference">Reference note</label><input id="stock-reference" name="reference" placeholder="e.g. Delivery DR-1042 or treatment use" /></div>
                <div className="field full"><label htmlFor="stock-expiry">Expiry date, if applicable</label><input id="stock-expiry" name="expiry" type="date" min="2026-10-07" /></div>
              </div>
              <div className="modal-actions"><button className="secondary-btn" type="button" data-close-modal>Cancel</button><button className="primary-btn" type="submit">Update stock</button></div>
            </form>
          </div>
        </div>

        <div className="modal-backdrop" id="invoice-modal" role="dialog" aria-modal="true" aria-labelledby="invoice-modal-title">
          <div className="modal">
            <div className="modal-head"><div><h2 id="invoice-modal-title">Create invoice</h2><p>Start from an appointment and add treatment line items.</p></div><button className="close-btn" type="button" data-close-modal aria-label="Close"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
            <form id="invoice-form">
              <div className="modal-body">
                <div className="form-grid">
                  <div className="field full"><label htmlFor="invoice-appointment">Appointment</label><select id="invoice-appointment" name="appointment" required></select></div>
                  <div className="field"><label htmlFor="invoice-due">Due date</label><input id="invoice-due" name="due" type="date" value="2026-10-14" min="2026-10-07" required /></div>
                  <div className="field"><label htmlFor="invoice-initial-status">Initial status</label><select id="invoice-initial-status" name="status"><option value="pending">Pending</option><option value="paid">Paid</option></select></div>
                </div>
                <div className="record-section" style={{marginTop:"20px"}}><div className="record-section-head"><h3>Line items</h3><span>Quantity × unit price</span></div>
                  <div className="line-entry"><div className="field"><label htmlFor="line-one-name">Service or treatment</label><input id="line-one-name" name="lineOneName" value="Consultation fee" required /></div><div className="field"><label htmlFor="line-one-qty">Qty</label><input id="line-one-qty" name="lineOneQty" type="number" min="1" value="1" required /></div><div className="field"><label htmlFor="line-one-price">Unit price</label><input id="line-one-price" name="lineOnePrice" type="number" min="0" step="0.01" value="650" required /></div></div>
                  <div className="line-entry"><div className="field"><label htmlFor="line-two-name">Additional item</label><input id="line-two-name" name="lineTwoName" placeholder="Optional medicine or procedure" /></div><div className="field"><label htmlFor="line-two-qty">Qty</label><input id="line-two-qty" name="lineTwoQty" type="number" min="1" value="1" /></div><div className="field"><label htmlFor="line-two-price">Unit price</label><input id="line-two-price" name="lineTwoPrice" type="number" min="0" step="0.01" value="0" /></div></div>
                </div>
                <div className="create-invoice-total"><span>Invoice total</span><strong className="money" id="invoice-form-total">₱650.00</strong></div>
              </div>
              <div className="modal-actions"><button className="secondary-btn" type="button" data-close-modal>Cancel</button><button className="primary-btn" type="submit">Create invoice</button></div>
            </form>
          </div>
        </div>

        <div className="modal-backdrop" id="staff-modal" role="dialog" aria-modal="true" aria-labelledby="staff-modal-title">
          <div className="modal">
            <div className="modal-head"><div><h2 id="staff-modal-title">Add staff account</h2><p>Assign the minimum role needed for clinic duties.</p></div><button className="close-btn" type="button" data-close-modal aria-label="Close"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
            <form id="staff-form">
              <input id="staff-edit-id" name="id" type="hidden" />
              <div className="modal-body form-grid">
                <div className="field"><label htmlFor="staff-name">Full name</label><input id="staff-name" name="name" required /></div>
                <div className="field"><label htmlFor="staff-role">Role</label><select id="staff-role" name="role"><option value="admin">Administrator</option><option value="vet">Veterinarian</option><option value="receptionist">Receptionist</option></select></div>
                <div className="field full"><label htmlFor="staff-email">Clinic email</label><input id="staff-email" name="email" type="email" required /></div>
                <div className="field full"><label htmlFor="staff-phone">Contact number</label><input id="staff-phone" name="phone" inputmode="tel" placeholder="Optional" /></div>
              </div>
              <div className="modal-actions"><button className="secondary-btn" type="button" data-close-modal>Cancel</button><button className="primary-btn" type="submit">Save staff account</button></div>
            </form>
          </div>
        </div>

        <div className="toast" id="toast" role="status" aria-live="polite"></div>
    </>
  );
}
