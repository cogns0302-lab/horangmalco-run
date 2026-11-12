/* =========================================================
   호랑말코 RUN — 매달 RunRepeat 점수 자동 업데이트
   실행: node tools/update-scores.js   (저장소 루트에서)
   - data.js 의 RR_LAB(점수·무게·드롭)과 RR_KW(실험실 측정 항목)를
     각 모델의 RunRepeat 리뷰 페이지에서 다시 읽어 갱신합니다.
   - DATA_UPDATED(기준 월)를 실행한 달로 바꿉니다.
   - 새 버전 모델 추가(한국어 이름·설명)는 사람이 해야 해서,
     브랜드별 최신 목록에서 아직 없는 모델은 tools/new-models.txt 로 남깁니다.
   ========================================================= */
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'data.js');
const H = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36', 'Accept-Language': 'en' };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const text = html => html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&').replace(/&check;|&#x2713;|&#10003;/g, '✓').replace(/&cross;|&times;|&#x2717;|&#10007;/g, '✗').replace(/\s+/g, ' ');
const first = (x, label, vals) => { const m = x.match(new RegExp(label + ' (' + vals + ')')); return m ? m[1] : null; };
const LVL = 'Very high|High|Moderate|Low|Very low';

async function get(url) {
  for (let t = 0; t < 3; t++) {
    try { const r = await fetch(url, { headers: H, signal: AbortSignal.timeout(25000) }); if (r.ok) return await r.text(); } catch (e) { /* 재시도 */ }
    await sleep(3000 * (t + 1));
  }
  return null;
}
async function readReview(p) {
  const html = await get('https://runrepeat.com' + p); if (!html) return null;
  const x = text(html), i = x.indexOf('Our score'); if (i < 0) return null;
  const y = x.slice(i, i + 6000);
  const s = +(y.match(/Our score (\d\d)/) || [])[1];
  const w = +(y.match(/Weight lab Weight brand [\d.]+ oz \/ (\d+)g/) || [])[1];
  const d = +(y.match(/Drop lab Drop brand ([\d.]+) mm/) || [])[1];
  if (!s) return null;
  const kw = [first(y, 'Shock absorption', LVL), first(y, 'Energy return', LVL), first(y, 'Traction', LVL), first(y, 'Lightweight', '✓|✗'),
    first(y, 'Midsole softness', 'Very soft|Soft|Balanced|Firm|Very firm'), first(y, 'Toebox durability', 'Good|Decent|Bad'), first(y, 'Heel padding durability', 'Good|Decent|Bad'),
    first(y, 'Outsole durability', 'Good|Decent|Bad'), first(y, 'Breathability', 'Breathable|Moderate|Warm|Very breathable|Not breathable'),
    first(y, 'Stiffness', 'Very flexible|Flexible|Moderate|Stiff|Very stiff'), first(y, 'Rocker', '✓|✗'),
    first(y, 'Plate', 'Carbon plate|Nylon plate|Fiberglass plate|Plastic plate|TPU plate'), first(y, 'Arch support', 'Neutral|Stability|Motion control'),
    (y.match(/Ranking #(\d+) (Top|Bottom) (\d+)%/) || []).slice(1).join(' ') || null];
  return { s, w: w || null, d: isNaN(d) ? null : d, kw };
}
async function newestList(slug) {
  const html = await get(`https://runrepeat.com/catalog/${slug}-road-running-shoes?order_by=newest`) || await get(`https://runrepeat.com/catalog/${slug}-running-shoes?order_by=newest`);
  if (!html) return [];
  return [...html.matchAll(/class="product-name"[^>]*>\s*<a href="(\/[a-z0-9-]+)"[^>]*>\s*<span[^>]*>([^<]+)<\/span>/g)].slice(0, 12).map(m => [m[1], m[2].trim()]);
}

(async () => {
  let src = fs.readFileSync(FILE, 'utf8');
  const labM = src.match(/^const RR_LAB = (\{.*\});$/m), kwM = src.match(/^const RR_KW = (\{.*\});$/m);
  if (!labM || !kwM) { console.error('RR_LAB / RR_KW 를 찾지 못했어요'); process.exit(1); }
  const LAB = JSON.parse(labM[1]), KW = JSON.parse(kwM[1]);
  const paths = [...new Set(Object.values(LAB).map(v => v[3]))];
  let changed = 0, failed = 0;
  const log = [];
  for (const p of paths) {
    const r = await readReview(p);
    if (!r) { failed++; log.push(`실패 ${p}`); await sleep(1500); continue; }
    for (const [id, v] of Object.entries(LAB)) if (v[3] === p) {
      const nv = [r.s, r.w || v[1], r.d ?? v[2], p];
      if (JSON.stringify(nv) !== JSON.stringify(v)) { log.push(`${id}: ${v[0]}→${r.s}점 ${v[1]}→${nv[1]}g`); LAB[id] = nv; changed++; }
    }
    if (r.kw.some(Boolean)) KW[p] = r.kw;
    await sleep(1500);
  }
  if (failed > paths.length / 2) { console.error(`리뷰 페이지 ${failed}/${paths.length}개를 읽지 못해 이번 달은 업데이트하지 않아요`); process.exit(1); }

  /* 새 버전 후보: 브랜드별 최신 목록 중 아직 없는 모델 */
  const known = new Set(paths);
  const brands = ['nike', 'adidas', 'asics', 'hoka', 'new-balance', 'puma', 'saucony', 'mizuno', 'brooks', 'on', 'under-armour', 'salomon', 'kiprun'];
  const fresh = [];
  for (const b of brands) { for (const [p, n] of await newestList(b)) if (!known.has(p) && !/gtx|trail|easyon|waterproof/i.test(p)) fresh.push(`${n}  https://runrepeat.com${p}`); await sleep(1500); }

  const now = new Date(Date.now() + 9 * 3600e3), label = `${now.getUTCFullYear()}년 ${now.getUTCMonth() + 1}월`;
  src = src.replace(labM[0], 'const RR_LAB = ' + JSON.stringify(LAB) + ';').replace(kwM[0], 'const RR_KW = ' + JSON.stringify(KW) + ';');
  src = /^const DATA_UPDATED = /m.test(src) ? src.replace(/^const DATA_UPDATED = .*$/m, `const DATA_UPDATED = '${label}';`) : src.replace(/^const RR_LAB = /m, `const DATA_UPDATED = '${label}';\nconst RR_LAB = `);
  fs.writeFileSync(FILE, src);
  fs.writeFileSync(path.join(__dirname, 'new-models.txt'), `# ${label} 기준 RunRepeat 최신 목록 중 사이트에 아직 없는 모델 (사람이 확인 후 추가)\n` + (fresh.join('\n') || '(없음)') + '\n');
  console.log(`기준 월: ${label} · 점수 갱신 ${changed}건 · 읽기 실패 ${failed}건 · 새 모델 후보 ${fresh.length}개`);
  log.slice(0, 60).forEach(l => console.log('  ' + l));
})();
