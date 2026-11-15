let F=[],P=[],M=[],E=[],ended=0,et=0,win=-1,mode='ffa';const R=Math.random,rn=(a,b)=>a+R()*(b-a),H=Math.hypot;
const EM=['🔫','🔫','🚀','🗡️','💣','🏹','🪄','🔱',''],COL=['#e5484d','#3e8bff','#f5a524','#a855f7'];
const W=[
{n:'리볼버',d:25,i:1.5,cd:20,s:'유도탄 50 (반드시 명중, 방어·반사·순간이동 무시)'},
{n:'미니건',d:3,i:.2,cd:35,s:'2초간 발사량 15% 증가'},
{n:'RPG',d:50,i:4,cd:30,s:'특수 미사일 70, 느린 탄속, 큰 폭발'},
{n:'카타나',d:35,i:1,cd:0,s:'패시브: 투사체 30% 반사 (피해 110%)'},
{n:'시한폭탄',d:80,i:2.5,cd:20,s:'지뢰 설치, 밟으면 현재 체력 50% 피해'},
{n:'활',d:25,i:1.5,cd:15,s:'화살 3발 부채꼴 발사'},
{n:'지팡이',d:20,i:2,cd:20,s:'순간이동 후 공격 (+30% 피해), 일반 공격은 4종 마법 무작위'},
{n:'창',d:25,i:1.8,cd:20,s:'창 투척 후 되돌아옴, 되돌아올 때 5초 출혈'},
{n:'없음',d:0,i:99,cd:0,s:'-'}];
const A=[
{n:'머슬',e:'체력 450, 공격 피해 +10%'},{n:'타이니',e:'크기·피격 판정 감소, 이동속도 +15%'},
{n:'리플렉터',e:'30% 확률로 받은 피해의 절반 반사'},{n:'힐러',e:'체력 50% 이하일 때 최대체력 25% 회복 (1회)'},
{n:'디펜더',e:'체력 350, 20초마다 공격 1회 방어'},{n:'리바이벌',e:'사망 시 1회 부활 (체력 50%), 이후 받는 피해 -20%'},
{n:'없음',e:'-'}];
function init(ch,m){mode=m;ended=0;et=0;win=-1;P=[];M=[];E=[];
F=ch.map((x,i)=>{const a=x.a,hp=a==0?450:a==4?350:300,ty=a==1;
 return{i,n:x.n,w:x.w,a,team:m=='team'?x.t:i,x:110+i*225,y:340,vx:0,vy:0,hp,mx:hp,face:i<2?1:-1,ac:rn(.5,1.2),sc:rn(4,9),mb:0,sh:a==4?1:0,st:0,rv:a==5?1:0,rd:0,hd:0,bn:0,fz:0,pl:0,ar:0,bl:0,dead:0,dm:a==0?1.1:1,s:ty?.7:1,sp:ty?1.15:1,r:ty?11:17,t:0,sw:0,hf:0,dt:0,jt:rn(1,3),mvx:0}});}
const txt=(x,y,s)=>E.push({x,y,t:.8,tx:s});
function raw(f,v){f.hp-=v;if(f.hp<=0)die(f)}
function die(f){if(f.rv){f.rv=0;f.rd=1;f.hp=f.mx*.5;txt(f.x,f.y-80,'부활!');return}f.dead=1;f.hp=0;f.dt=0}
function hurt(t,d,o,pr,nr){if(t.dead||d<=0)return;
 if(!pr){if(t.sh){t.sh=0;t.st=0;txt(t.x,t.y-70,'방어!');return}if(t.a==2&&!nr&&R()<.3){txt(t.x,t.y-80,'반사');hurt(o,d/2,t,0,1)}}
 d*=o.dm*(t.rd?.8:1);t.hp-=d;t.hf=.15;if(!pr)t.vx+=Math.sign(t.x-o.x)*130;txt(t.x+rn(-8,8),t.y-62,Math.round(d));
 if(t.a==3&&!t.hd&&t.hp>0&&t.hp<=t.mx/2){t.hd=1;t.hp=Math.min(t.mx,t.hp+t.mx*.25);txt(t.x,t.y-85,'+회복')}
 if(t.hp<=0)die(t)}
function hit(e,d,o,fx,pr,bl){hurt(e,d,o,pr);if(e.dead)return;if(bl)e.bl=5;else if(fx&&R()<.1)e[fx[0]]=fx[1]}
function boom(x,y,r,d,o,fx,ec,ring){E.push({x,y,r,t:ring?.5:.3,c:ec||'#fa3',ring});for(const e of F)if(!e.dead&&e.team!=o.team&&H(e.x-x,e.y-30*e.s-y)<r+e.r)hit(e,d,o,fx)}
function sh(f,T,o){const sx=f.x+f.face*14,sy=f.y-35*f.s,dx=T.x-sx,dy=T.y-30*T.s-sy+(o.sy||0),L=H(dx,dy)||1;
 const p={x:sx,y:sy,vx:dx/L*o.sp,vy:dy/L*o.sp-(o.up||0),g:o.g||0,d:o.d,o:f,k:o.k||'b',r:o.r||4,ex:o.ex,hm:o.hm,tg:T,pr:o.pr,fx:o.fx,sp:o.s2,ec:o.ec,life:o.life||3,c:o.c||'#333'};P.push(p);return p}
function attack(f,T){const dd=Math.abs(T.x-f.x);
 switch(f.w){
 case 0:sh(f,T,{sp:700,d:25,sy:rn(-8,8),c:'#555'});break;
 case 1:sh(f,T,{sp:800,d:3,sy:rn(-30,30),r:f.mb>0?3:2,c:f.mb>0?'#f33':'#fa0'});break;
 case 2:sh(f,T,{sp:250,d:50,ex:60,r:6,k:'rk',c:'#c33'});break;
 case 3:f.sw=.25;hurt(T,35,f);break;
 case 4:P.push({x:f.x,y:f.y-35,vx:(T.x-f.x)/1.05,vy:-310,g:600,d:80,o:f,k:'gr',r:5,ex:55,life:3,c:'#222'});break;
 case 5:sh(f,T,{sp:600,d:25,g:500,up:dd*.4,k:'ar',c:'#6b4'});break;
 case 6:{const m=Math.floor(R()*4),MD=[20,15,25,20],MC=['#f60','#6cf','#ee2','#964'];
  if(m==3){const x=T.x;E.push({x,y:340,r:50,t:.5,c:'#964',rock:1,fn:()=>boom(x,320,50,20,f,['ar',3])})}
  else sh(f,T,{sp:450,d:MD[m],r:6,c:MC[m],fx:[['bn',5],['fz',5],['pl',7]][m]});break}
 case 7:f.sw=.25;hurt(T,25,f)}}
function special(f,T){const dd=Math.abs(T.x-f.x);
 switch(f.w){
 case 0:sh(f,T,{sp:420,d:50,hm:1,pr:1,c:'#f0f',r:6,life:5,s2:1});break;
 case 1:f.mb=2;E.push({x:f.x,y:f.y-30,r:34,t:.5,c:'#f80',ring:1});txt(f.x,f.y-80,'발사 +15%');break;
 case 2:sh(f,T,{sp:200,d:70,ex:90,r:9,k:'rk',c:'#e0f',s2:1,ec:'#e0f'});break;
 case 4:if(!M.some(m=>m.o==f))M.push({x:f.x+f.face*25,o:f});break;
 case 5:for(const a of[-.18,0,.18])sh(f,T,{sp:600,d:25,g:500,up:dd*.4,sy:a*500,k:'ar',c:'#fd0',s2:1});break;
 case 6:E.push({x:f.x,y:f.y-30,r:34,t:.5,c:'#a6f',ring:1});f.x=Math.min(870,Math.max(30,T.x-f.face*55));E.push({x:f.x,y:f.y-30,r:34,t:.5,c:'#a6f',ring:1});f.sw=.25;hurt(T,26,f);break;
 case 7:{const p=sh(f,T,{sp:520,d:25,g:300,up:dd*.3,k:'sp',r:7,life:5,c:'#4cf',s2:1});p.hit=new Set;p.ret=0}}}
function near(f){let b=null,bd=1e9;for(const e of F)if(!e.dead&&e.team!=f.team){const d=Math.abs(e.x-f.x);if(d<bd){bd=d;b=e}}return b}
function step(dt){
 for(const f of F){f.t+=dt;f.hf-=dt;f.sw-=dt;if(f.dead){f.dt+=dt;continue}
  for(const k of['bn','fz','pl','ar','bl'])if(f[k]>0)f[k]-=dt;
  if(f.bn>0)raw(f,f.mx*.005*dt);if(f.bl>0&&!f.dead)raw(f,f.mx*.01*dt);if(f.dead)continue;
  if(f.a==4&&!f.sh){f.st+=dt;if(f.st>=20)f.sh=1}
  const T=near(f),stun=f.fz>0||f.ar>0;
  if(f.ar>0){f.y+=(260-f.y)*dt*3;f.vy=0}else{f.vy+=900*dt;f.y+=f.vy*dt;if(f.y>=340){f.y=340;f.vy=0}}
  let mv=0;
  if(T&&!stun){const dx=T.x-f.x,d=Math.abs(dx),want=[220,180,260,40,200,230,220,40,200][f.w];f.face=dx>0?1:-1;
   if(d>want+25)mv=f.face;else if(d<want-60&&f.w!=3&&f.w!=7)mv=-f.face;
   mv*=90*f.sp*(f.pl>0?.8:1)*(d>300?1.6:1);
   f.jt-=dt;if(f.jt<=0&&f.y>=340){f.vy=-380*(f.pl>0?.7:1);f.jt=rn(1.5,4)}
   for(const p of P)if(p.o.team!=f.team&&f.y>=340&&Math.abs(p.x-f.x)<90&&Math.sign(f.x-p.x)==Math.sign(p.vx)&&Math.abs(p.y-(f.y-30))<35&&R()<.06){f.vy=-380;break}
   f.ac-=dt;f.sc-=dt;if(f.mb>0)f.mb-=dt;
   if(d<450&&f.sc<=0&&W[f.w].cd){special(f,T);f.sc=W[f.w].cd}
   if(d<(f.w==3||f.w==7?60:450)&&f.ac<=0){attack(f,T);f.ac=W[f.w].i/(f.mb>0?1.15:1)}}
  if(stun)f.vx*=.5;f.mvx=stun?0:mv;f.x=Math.min(880,Math.max(20,f.x+(f.vx+f.mvx)*dt));f.vx*=Math.pow(.01,dt)}
 for(let i=P.length-1;i>=0;i--){const p=P[i];p.life-=dt;
  if(p.hm&&p.tg&&!p.tg.dead){const dx=p.tg.x-p.x,dy=p.tg.y-30-p.y,L=H(dx,dy)||1;p.vx=dx/L*420;p.vy=dy/L*420}
  if(p.k=='sp'&&p.ret){const dx=p.o.x-p.x,dy=p.o.y-35-p.y,L=H(dx,dy)||1;p.vx=dx/L*450;p.vy=dy/L*450;if(L<22)p.life=0}
  p.vy+=p.g*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;let rm=p.life<=0;
  if(!rm&&p.k=='sp'&&!p.ret&&(p.y>=340||p.x<10||p.x>890)){p.ret=1;p.hit=new Set;p.g=0;p.life=5}
  else if(!rm&&p.k!='sp'&&(p.y>=340||p.x<0||p.x>900)){if(p.ex&&p.y>=340)boom(p.x,340,p.ex,p.d,p.o,p.fx,p.ec,p.sp);rm=1}
  if(!rm)for(const e of F){if(e.dead||e.team==p.o.team)continue;
   if(Math.abs(p.x-e.x)<e.r+p.r&&p.y>e.y-62*e.s&&p.y<e.y+4){
    if(p.hit&&p.hit.has(e))continue;
    if(e.w==3&&!p.pr&&p.k!='sp'&&R()<.3){p.o=e;p.vx*=-1;p.vy*=-1;p.d*=1.1;p.tg=null;p.hm=0;txt(e.x,e.y-75,'반사!');break}
    if(p.hit)p.hit.add(e);
    if(p.ex){boom(p.x,p.y,p.ex,p.d,p.o,p.fx,p.ec,p.sp);rm=1}else{hit(e,p.d,p.o,p.fx,p.pr,p.k=='sp'&&p.ret);if(!p.hit)rm=1}
    break}}
  if(rm)P.splice(i,1)}
 for(let i=M.length-1;i>=0;i--){const m=M[i];for(const f of F)if(!f.dead&&f.team!=m.o.team&&Math.abs(f.x-m.x)<20&&f.y>=330){E.push({x:m.x,y:338,r:60,t:.5,c:'#f55',ring:1});hurt(f,f.hp*.5,m.o);M.splice(i,1);break}}
 for(let i=E.length-1;i>=0;i--){const e=E[i];e.t-=dt;if(e.tx)e.y-=25*dt;if(e.t<=0){e.fn&&e.fn();E.splice(i,1)}}
 if(!ended){const al=F.filter(f=>!f.dead);if(new Set(al.map(f=>f.team)).size<=1){ended=1;win=al[0]?al[0].i:-1}}else et+=dt;}

const snap=()=>({F:F.map(f=>({i:f.i,n:f.n,w:f.w,team:f.team,x:Math.round(f.x),y:Math.round(f.y),face:f.face,hp:f.hp,mx:f.mx,dead:f.dead,dt:f.dt,hf:f.hf,sw:f.sw,s:f.s,t:f.t,mvx:f.mvx,bn:f.bn,fz:f.fz,pl:f.pl,bl:f.bl,ar:f.ar,sh:f.sh,mb:f.mb})),P:P.map(p=>({x:Math.round(p.x),y:Math.round(p.y),vx:Math.round(p.vx),vy:Math.round(p.vy),k:p.k,r:p.r,c:p.c,ex:p.ex,hm:p.hm,sp:p.sp,ret:p.ret})),M:M.map(m=>({x:Math.round(m.x)})),E:E.map(e=>({x:Math.round(e.x),y:Math.round(e.y),r:e.r,t:e.t,c:e.c,tx:e.tx,rock:e.rock,ring:e.ring})),over:ended&&et>1.2,win});
if(typeof module!='undefined')module.exports={W,A,init,step,snap,get:()=>({F,P,M,E,ended,et,win,mode}),set:s=>{F=s.F;P=s.P;M=s.M;E=s.E;ended=s.ended;et=s.et;win=s.win;mode=s.mode}};
