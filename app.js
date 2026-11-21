function checkConsistency(){
  if(!state.consistency)state.consistency={days:0,rewarded:{}};
  var pk=daysAgoKey(1);
  var t=state.tasks[pk];
  if(!t||!Array.isArray(t.items)||t.items.length<3)return;
  var done=t.items.filter(function(x){return x.done;}).length;
  var pct=done/t.items.length;
  if(pct>=0.7&&!state.consistency.rewarded[pk]){
    state.consistency.rewarded[pk]=true;
    state.consistency.days=(state.consistency.days||0)+1;
    save();
    var bonus=pct>=1?60:(pct>=0.85?40:25);
    setTimeout(function(){
      addXP(bonus,'Hari konsisten: '+Math.round(pct*100)+'% tugas beres! 🔥');
    },1200);
  }
}
