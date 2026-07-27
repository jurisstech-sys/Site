/* ============================================================
   Signature background: a slow, quiet circuit-trace field that
   echoes the FAC TECNOLOGIA logo's circuitry motif. Lines with
   right-angle turns, occasional pulses of light travelling
   along them. Intentionally subtle — never fights the content.
   ============================================================ */
(function(){
  const canvas = document.getElementById('bg-circuit');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, dpr;
  let nodes = [];
  let pulses = [];
  const GRID = 64;

  function resize(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = document.documentElement.scrollHeight;
    canvas.width = w * dpr;
    canvas.height = Math.min(h, window.innerHeight * 2.2) * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = canvas.height / dpr + 'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    buildPaths();
  }

  function buildPaths(){
    nodes = [];
    const cols = Math.ceil(w / GRID) + 1;
    const rows = Math.ceil((canvas.height/dpr) / GRID) + 1;
    const pathCount = Math.min(26, Math.floor((cols*rows)/34));
    for(let i=0;i<pathCount;i++){
      let x = Math.floor(Math.random()*cols)*GRID;
      let y = Math.floor(Math.random()*rows)*GRID;
      const segs = [{x,y}];
      const len = 3 + Math.floor(Math.random()*5);
      for(let s=0;s<len;s++){
        const horiz = Math.random() > 0.5;
        const dir = Math.random() > 0.5 ? 1 : -1;
        if(horiz) x += dir*GRID*(1+Math.floor(Math.random()*2));
        else y += dir*GRID*(1+Math.floor(Math.random()*2));
        segs.push({x,y});
      }
      nodes.push(segs);
    }
    pulses = nodes.map((seg,i)=>({ path:i, t: Math.random(), speed: 0.0009 + Math.random()*0.0014, delay: Math.random()*400 }));
  }

  function pointAt(seg, t){
    const totalLen = seg.length - 1;
    const pos = t * totalLen;
    const idx = Math.min(Math.floor(pos), totalLen-1);
    const localT = pos - idx;
    const a = seg[idx], b = seg[idx+1] || seg[idx];
    return { x: a.x + (b.x-a.x)*localT, y: a.y + (b.y-a.y)*localT };
  }

  function draw(){
    ctx.clearRect(0,0,w, canvas.height/dpr);

    // static traces
    ctx.strokeStyle = 'rgba(255,255,255,0.045)';
    ctx.lineWidth = 1;
    nodes.forEach(seg=>{
      ctx.beginPath();
      ctx.moveTo(seg[0].x, seg[0].y);
      for(let i=1;i<seg.length;i++) ctx.lineTo(seg[i].x, seg[i].y);
      ctx.stroke();
      // node dots
      seg.forEach((p,i)=>{
        if(i===0 || i===seg.length-1){
          ctx.beginPath();
          ctx.arc(p.x,p.y,2,0,Math.PI*2);
          ctx.fillStyle='rgba(255,255,255,0.08)';
          ctx.fill();
        }
      });
    });

    // moving pulses
    pulses.forEach(p=>{
      p.t += p.speed;
      if(p.t > 1) p.t = 0;
      const seg = nodes[p.path];
      const pos = pointAt(seg, p.t);
      const grad = ctx.createRadialGradient(pos.x,pos.y,0,pos.x,pos.y,26);
      grad.addColorStop(0,'rgba(61,107,255,0.55)');
      grad.addColorStop(1,'rgba(61,107,255,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(pos.x,pos.y,26,0,Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(pos.x,pos.y,2.4,0,Math.PI*2);
      ctx.fillStyle = 'rgba(210,222,255,0.9)';
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(draw);
})();
