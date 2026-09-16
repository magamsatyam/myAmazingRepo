const KEY='gridiron-reborn-career-v1';
const POSITIONS=['QB','RB','WR','WR','TE','OL','OL','DL','LB','CB','S','K'];
const FIRST=['Jalen','Marcus','Devin','Theo','Andre','Mason','Noah','Caleb','Isaiah','Darius','Jordan','Eli','Malik','Troy'];
const LAST=['Cole','Hayes','Brooks','Grant','Reed','Stone','Price','Ward','Bennett','Cross','King','Miles','Young','Ford'];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function seeded(i){return ((Math.sin(i*999.23)*43758.5453)%1+1)%1}
function makePlayer(pos,i){const base=45+Math.round(seeded(i+7)*35);return {id:`p${Date.now().toString(36)}${i}`,name:`${FIRST[i%FIRST.length]} ${LAST[(i*3)%LAST.length]}`,pos,level:1,xp:0,rebirths:0,morale:75,condition:100,speed:clamp(base+(pos==='WR'||pos==='RB'||pos==='CB'?12:0),35,95),strength:clamp(base+(pos==='OL'||pos==='DL'?16:0),35,95),skill:clamp(base+(pos==='QB'||pos==='WR'||pos==='K'?10:0),35,95),stamina:clamp(base+8,35,95)}}
export class Career{
  constructor(){this.data=this.load()}
  fresh(){return {team:'Metro Comets',season:1,week:1,wins:0,losses:0,credits:10,rebirthStars:0,facilities:{stadium:1,training:1,rehab:1},roster:POSITIONS.map(makePlayer)}}
  load(){try{const x=JSON.parse(localStorage.getItem(KEY));if(x&&Array.isArray(x.roster))return x}catch{}return this.fresh()}
  save(){localStorage.setItem(KEY,JSON.stringify(this.data))}
  overall(p){return Math.round((p.speed+p.strength+p.skill+p.stamina)/4)}
  playerStars(p){return clamp(Math.ceil(this.overall(p)/20),1,5)}
  teamStars(){const avg=this.data.roster.reduce((s,p)=>s+this.overall(p),0)/this.data.roster.length;return clamp(Math.ceil(avg/20)+this.data.rebirthStars,1,10)}
  addXp(id,amount){const p=this.data.roster.find(x=>x.id===id);if(!p||p.level>=100)return;p.xp+=amount;while(p.level<100&&p.xp>=100+p.level*12){p.xp-=100+p.level*12;p.level++;p.speed=clamp(p.speed+1,0,99);p.stamina=clamp(p.stamina+1,0,99)}if(p.level>=100)p.xp=0;this.save()}
  trainAll(){if(this.data.credits<2)return false;this.data.credits-=2;for(const p of this.data.roster)this.addXp(p.id,35+this.data.facilities.training*5);this.save();return true}
  healAll(){if(this.data.credits<2)return false;this.data.credits-=2;for(const p of this.data.roster)p.condition=clamp(p.condition+25+this.data.facilities.rehab*5,0,100);this.save();return true}
  rebirth(id){const p=this.data.roster.find(x=>x.id===id);if(!p||p.level<100)return false;p.level=1;p.xp=0;p.rebirths++;if(this.data.rebirthStars<5)this.data.rebirthStars++;p.speed=clamp(p.speed+2,0,99);p.strength=clamp(p.strength+2,0,99);p.skill=clamp(p.skill+2,0,99);p.stamina=clamp(p.stamina+2,0,99);this.save();return true}
  upgradeFacility(name){const f=this.data.facilities;if(!(name in f)||f[name]>=10)return false;const cost=f[name]+1;if(this.data.credits<cost)return false;this.data.credits-=cost;f[name]++;this.save();return true}
  recordGame(win){win?this.data.wins++:this.data.losses++;this.data.credits+=win?3:1;this.data.week++;for(const p of this.data.roster){this.addXp(p.id,win?40:25);p.condition=clamp(p.condition-(4+Math.random()*7),20,100)}if(this.data.week>17)this.advanceSeason();this.save()}
  advanceSeason(){this.data.season++;this.data.week=1;this.data.wins=0;this.data.losses=0;for(const p of this.data.roster){p.condition=100;p.morale=clamp(p.morale+10,0,100)}this.save()}
}
