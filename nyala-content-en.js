/* nyala-content-en.js — full English content for Dzikir & Duas (index-keyed, no regex mangling)
   + completes the Prophet's name with صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ in both languages. */
(function(){
'use strict';
if(window.__nyalaContentLoaded)return;window.__nyalaContentLoaded=true;
var SAW='صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ';
function lang(){try{return localStorage.getItem('nyala_lang')==='en'?'en':'id';}catch(e){return 'id';}}
function $(i){return document.getElementById(i);}

/* ---- DZIKIR: index order matches ADZKAR in dzikir.html ---- */
var DZ=[
{t:'Ayat al-Kursi',m:'Allah — there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth… His Kursi extends over the heavens and the earth, and He is the Most High, the Most Great.'},
{t:'Al-Ikhlas, Al-Falaq & An-Nas',m:'The three surahs of protection (Al-Ikhlas, Al-Falaq, An-Nas). Reciting them three times in the morning and evening suffices you against everything.'},
{t:'Opening: All Sovereignty Belongs to Allah',
 mp:'We enter the morning and all sovereignty belongs to Allah… My Lord, I ask You for the good of this day and the good that follows it, and I seek refuge in You from its evil.',
 me:'We enter the evening and all sovereignty belongs to Allah… My Lord, I ask You for the good of this night and the good that follows it, and I seek refuge in You from its evil.'},
{t:'Sayyidul Istighfar (The Master of Seeking Forgiveness)',m:'O Allah, You are my Lord; there is no deity but You. You created me and I am Your servant… I acknowledge Your favour upon me and I acknowledge my sin, so forgive me — for none forgives sins but You.'},
{t:'Surrendering Oneself to Allah',
 mp:'O Allah, by You we enter the morning and the evening; by You we live and by You we die, and to You is the resurrection.',
 me:'O Allah, by You we enter the evening and the morning; by You we live and by You we die, and to You is the final destination.'},
{t:'Testimony of Tawhid',
 mp:'O Allah, this morning I call You to witness — and the bearers of Your Throne, Your angels, and all of Your creation — that You are Allah; there is no deity but You alone, without partner, and that Muhammad {S} is Your servant and Your messenger.',
 me:'O Allah, this evening I call You to witness — and the bearers of Your Throne, Your angels, and all of Your creation — that You are Allah; there is no deity but You alone, without partner, and that Muhammad {S} is Your servant and Your messenger.'},
{t:'Seeking Wellbeing',m:'O Allah, grant wellbeing to my body; O Allah, grant wellbeing to my hearing; O Allah, grant wellbeing to my sight. There is no deity but You.'},
{t:'Allah Is Sufficient',m:'Allah is sufficient for me; there is no deity but Him. Upon Him I place my trust, and He is the Lord of the Mighty Throne.'},
{t:'Protection from Harm',m:'In the name of Allah, with whose name nothing on earth or in heaven can cause harm; and He is the All-Hearing, the All-Knowing.'},
{t:'Contentment with Allah',m:'I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad {S} as my Prophet.'},
{t:"Seeking Allah's Help",m:'O Ever-Living, O Sustainer of all, by Your mercy I seek help. Set all my affairs right, and do not leave me to myself even for the blink of an eye.'},
{t:'Salawat upon the Prophet {S}',m:'O Allah, send blessings and peace upon our Prophet Muhammad {S}. (10 times morning and evening = attaining his intercession)'},
{t:'Tasbih 100 Times',m:'Glory be to Allah and praise be to Him. (100 times erases faults and brings good)'},
{t:'Tawhid 10 Times',m:'There is no deity except Allah alone, without partner. His is the dominion and His is the praise, and He is over all things competent.'},
{t:'Tasbih by the Weight of the Throne (morning only)',m:'Glory be to Allah and praise be to Him — as many as His creation, as pleases Him, as heavy as His Throne, and as endless as the ink of His words.'},
{t:'Seeking Knowledge & Provision (morning only)',m:'O Allah, I ask You for beneficial knowledge, wholesome provision, and deeds that are accepted.'},
{t:'Istighfar 100 Times (daily)',m:"I seek Allah's forgiveness and turn to Him in repentance. (100 times a day wipes away sins even as numerous as the foam of the sea)"}
];
var DZ_EVENING=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,16];

/* ---- DUAS: index order matches DOA_HARIAN / DOA_NABI / DOA_KINI ---- */
var HARIAN=[
{t:'🍽️ Before Eating',m:'In the name of Allah. O Allah, bless our provision and protect us from the fire of Hell.',b:'Brings blessing to the food and keeps shaytan away from our provision.'},
{t:'🍽️ After Eating',m:'All praise is due to Allah who fed us and gave us drink and made us Muslims.',b:'A means for sins to be forgiven and for gratitude to grow.'},
{t:'🌙 Before Sleep',m:'In Your name, O Allah, I live and in Your name I die.',b:'Protection during sleep; if one passes away, it is upon the fitrah.'},
{t:'🌅 Waking Up',m:'All praise is due to Allah who gave us life after taking it from us, and to Him is the resurrection.',b:'Opens the day with gratitude and remembrance of the resurrection.'},
{t:'🚪 Entering the Bathroom',m:'O Allah, I seek refuge in You from the male and female devils.',b:'A barrier between the gaze of the jinn and our awrah.'},
{t:'🚪 Leaving the Bathroom',m:'O Allah, I seek Your forgiveness. All praise is due to Allah who has removed discomfort from me and restored my health.',b:'Teaches istighfar alongside gratitude for health after relieving oneself.'},
{t:'💧 After Wudu',m:'I bear witness that there is no deity but Allah alone, without partner, and that Muhammad {S} is His servant and messenger.',b:'Eight gates of Paradise are opened for him to choose from.'},
{t:'🏠 Entering the Home',m:'In the name of Allah we enter and in the name of Allah we leave, and upon Allah we place our trust.',b:'The home is blessed and the heart is anchored in reliance.'},
{t:'🚶 Leaving the Home',m:'In the name of Allah, I place my trust in Allah; there is no might and no power except with Allah.',b:'Guaranteed guidance, protection, and sufficiency from Allah.'},
{t:'🕌 Entering the Mosque',m:'O Allah, open for me the gates of Your mercy.',b:"Asking that the gates of mercy be opened upon entering Allah's house."},
{t:'🕌 Leaving the Mosque',m:'O Allah, I ask You of Your bounty.',b:"Seeking Allah's bounty when returning to worldly affairs."},
{t:'📢 Hearing the Adhan',m:'O Allah, Lord of this perfect call and the prayer to be established, grant Muhammad {S} al-Wasilah and excellence, and raise him to the praiseworthy station You have promised him.',b:"Whoever says this after the adhan earns the right to the Prophet's {S} intercession on the Day of Judgment."},
{t:'👨 For Both Parents',m:'My Lord, forgive me and my parents, and have mercy upon them as they raised me when I was small.',b:'A form of honoring parents; the prayer of a righteous child whose reward never ceases.'},
{t:'🌧️ When It Rains',m:'O Allah, send beneficial rain.',b:'Turns the rain into a beneficial mercy.'},
{t:'😤 When Angry',m:'I seek refuge in Allah from the accursed shaytan.',b:'Quells anger and drives away the whispers of shaytan.'},
{t:'🚗 While Traveling',m:'Glory to Him who has subjected this to us, for we could never have done it ourselves; and to our Lord we shall surely return.',b:'Protection in travel and a reminder of the return to Allah.'},
{t:'📚 Before Studying',m:'My Lord, increase me in knowledge and grant me understanding.',b:'Opens the heart and mind to receive knowledge; a form of reliance on Allah before studying.'}
];
var NABI=[
{t:'🌿 Prophet Adam (QS 7:23)',m:'Our Lord, we have wronged ourselves; and if You do not forgive us and have mercy upon us, we will surely be among the losers.',b:'The most complete opener of the gate of repentance; acknowledging sin while seeking forgiveness and mercy.'},
{t:'🐋 Prophet Yunus (QS 21:87)',m:'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',b:'A way out of distress.'},
{t:'🏔️ Prophet Musa (QS 20:25–28)',m:'My Lord, expand for me my chest, ease for me my task, and untie the knot from my tongue so that they may understand my speech.',b:"Expansion of the chest, ease of affairs, and fluency in speech — ideal before a presentation, interview, or da'wah."},
{t:'🕋 Prophet Ibrahim (QS 14:40)',m:'My Lord, make me an establisher of prayer, and from my descendants as well. Our Lord, and accept my supplication.',b:"Steadfastness in prayer for oneself and one's lineage."},
{t:'👑 Prophet Sulaiman (QS 27:19)',m:'My Lord, enable me to be grateful for Your favour which You have bestowed upon me and upon my parents, and to do righteous deeds that please You.',b:'Trains gratitude for personal and family blessings while seeking enablement for righteous deeds.'},
{t:'🤲 Prophet Zakariya (QS 21:89)',m:'My Lord, do not leave me alone, while You are the best of inheritors.',b:'A plea for righteous offspring.'},
{t:'💧 Prophet Musa (QS 28:24)',m:'My Lord, indeed I am in need of whatever good You would send down to me.',b:'An opener of the gate of provision.'},
{t:'🌹 The Messenger (QS 2:201)',m:'Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.',b:'Encompasses the good of this world and the Hereafter.'},
{t:'🌊 Prophet Nuh (QS 71:28)',m:'My Lord, forgive me and my parents and whoever enters my house as a believer, and the believing men and women.',b:'Expansive forgiveness.'},
{t:'🤒 Prophet Ayyub (QS 21:83)',m:'Indeed, adversity has touched me, and You are the Most Merciful of the merciful.',b:'The etiquette of complaining to Allah.'},
{t:'💞 The Messenger (QS 3:8)',m:'Our Lord, do not let our hearts deviate after You have guided us, and grant us mercy from Yourself.',b:'A steadier of the heart.'},
{t:'🕊️ The Messenger (QS 2:286)',m:'Our Lord, do not take us to task if we forget or err. Our Lord, do not place upon us a burden like that placed upon those before us. Our Lord, do not burden us with what we cannot bear. Pardon us, forgive us, and have mercy upon us. You are our Protector, so grant us victory over the disbelieving people.',b:'Whoever recites the last two verses of Al-Baqarah at night, they will suffice him.'}
];
var KINI=[
{t:'🌅 Opener of the Day',m:'O Allah, by You we enter the morning and by You we enter the evening; by You we live and by You we die, and to You is the resurrection.',b:'Beginning the day with total surrender to Allah.'},
{t:'🧠 Overthinking / Anxiety',m:'Allah is sufficient for us, and He is the best Disposer of affairs.',b:'Calms the heart and entrusts the outcome to Allah.'},
{t:'👨‍👩‍👧 Family in the Digital Age',m:'Our Lord, grant us from among our spouses and offspring comfort to our eyes, and make us an example for the righteous.',b:'Family becomes a delight to the eyes and an example of piety.'},
{t:'📱 Tempted to Compare Yourself',m:'O Allah, Turner of hearts, keep my heart firm upon Your religion.',b:'Guarding the heart from envy and unrest.'},
{t:'🌊 Knowledge of No Benefit',m:'O Allah, I seek refuge in You from knowledge that does not benefit, from a heart that is not humble, and from a soul that is never satisfied.',b:'An inner filter: beneficial knowledge, a humble heart, a content soul.'},
{t:'🥹 Gratitude in Joy',m:'All praise is due to Allah by whose favour good deeds are completed.',b:'Perfecting the blessing with gratitude.'},
{t:'💳 Tight Finances',m:'O Allah, suffice me with what is lawful so I need not the unlawful, and enrich me by Your bounty so I need none besides You.',b:'Sufficiency through the halal.'},
{t:'🎯 Provision, Knowledge & Deeds',m:'O Allah, I ask You for beneficial knowledge, wholesome provision, and deeds that are accepted.',b:'Encompasses the needs of this world and the Hereafter: knowledge, lawful provision, and accepted worship.'}
];

function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function render(el,txt){
  var html=esc(txt).replace(/\{S\}/g,'<span class="nyala-saw">'+SAW+'</span>').replace(/\uFDFA/g,'<span class="nyala-saw">'+SAW+'</span>');
  if(el.innerHTML!==html)el.innerHTML=html;
}
var orig=new WeakMap();
function snap(el){if(!orig.has(el))orig.set(el,el.innerHTML);}
function restore(el){var o=orig.get(el);if(o!=null&&el.innerHTML!==o)el.innerHTML=o;}

function period(){var b=$('btnPetang');return (b&&b.classList.contains('on'))?'e':'p';}
function tab(){
  var n=$('tabNabi'),k=$('tabKini');
  if(n&&n.classList.contains('on'))return NABI;
  if(k&&k.classList.contains('on'))return KINI;
  return HARIAN;
}
function paintDzikir(){
  var box=$('list');if(!box)return;
  var en=lang()==='en',per=period();
  var order=per==='e'?DZ_EVENING:DZ.map(function(_,i){return i;});
  var cards=box.querySelectorAll('.dz');
  for(var i=0;i<cards.length;i++){
    var d=DZ[order[i]];if(!d)continue;
    var ti=cards[i].querySelector('.dz-title'),ar=cards[i].querySelector('.arti');
    if(ti){snap(ti);if(en)render(ti,d.t);else restore(ti);}
    if(ar){snap(ar);if(en)render(ar,(per==='e'?(d.me||d.m):(d.mp||d.m)));else restore(ar);}
  }
}
function paintDoa(){
  var box=$('doaList');if(!box)return;
  var en=lang()==='en',arr=tab(),cards=box.querySelectorAll('.doa-card');
  for(var i=0;i<cards.length;i++){
    var d=arr[i];if(!d)continue;
    var t=cards[i].querySelector('.doa-t'),m=cards[i].querySelector('.doa-id'),b=cards[i].querySelector('.doa-m');
    if(t){snap(t);if(en)render(t,d.t);else restore(t);}
    if(m){snap(m);if(en)render(m,d.m);else restore(m);}
    if(b){snap(b);if(en)render(b,'✨ Benefit: '+d.b);else restore(b);}
  }
}
/* complete ﷺ everywhere it appears in Indonesian source too */
function fixSaw(){
  var sel=document.querySelectorAll('.dz-title,.arti,.doa-t,.doa-id,.doa-m');
  for(var i=0;i<sel.length;i++){var el=sel[i];
    if(el.querySelector('.nyala-saw'))continue;
    if(el.textContent.indexOf('\uFDFA')>-1){snap(el);render(el,el.textContent);}
  }
}
var pend=false;
function run(){pend=false;paintDzikir();paintDoa();fixSaw();
  try{window.dispatchEvent(new CustomEvent('nyala:content'));}catch(e){}}
function schedule(){if(pend)return;pend=true;requestAnimationFrame(run);}
function boot(){
  run();
  if('MutationObserver' in window){
    ['list','doaList'].forEach(function(id){var e=$(id);if(e)new MutationObserver(schedule).observe(e,{childList:true,subtree:true});});
    ['btnPagi','btnPetang','tabHarian','tabNabi','tabKini'].forEach(function(id){var e=$(id);if(e)e.addEventListener('click',function(){setTimeout(schedule,40);});});
  }
  window.addEventListener('nyala:lang',schedule);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
