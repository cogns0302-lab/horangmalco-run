/* 호랑말코 러닝화 — 앱 로직 */
const $ = s => document.querySelector(s);
const app = $('#app');
const TODAY = new Date('2026-11-10T00:00:00');
const won = p => p ? p.toLocaleString('ko-KR') + ',000원' : '국내 정가 미정';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const CAT_ORDER = ['FR', 'CR', 'LR', 'ST', 'SN', 'MX', 'CU', 'SB', 'DY'];
const RR_BRAND = { nb: 'new-balance', ua: 'under-armour', salomon: 'salomon', decathlon: 'kiprun' };
const byId = Object.fromEntries(SHOES.map(s => [s.id, s]));
let charts = [];

function go(h) { location.hash = h; }

/* ---------- 공통 그래픽 ---------- */
/* 신발 그림: 분류별 미드솔 두께·플레이트 표시 */
const STACK = { MX: 1.6, FR: 1.45, CR: 1.4, ST: 1.4, SN: 1.3, CU: 1.25, SB: 1.25, DY: 1, LR: .8 };
const PLATED = new Set(['FR', 'CR', 'ST', 'LR']);
function shoeSVG(b, w = 170, c = 'DY', attrs = '') {
  const B = BRANDS[b], sole = 15 * (STACK[c] || 1), t = 48, H = t + sole + 8;
  return `<svg viewBox="0 0 200 ${H}" width="${w}" ${attrs} aria-hidden="true">
    <ellipse cx="102" cy="${t + sole + 3}" rx="88" ry="4" fill="#0003"/>
    <path d="M14 ${t} Q6 ${t + sole} 26 ${t + sole} L182 ${t + sole} Q198 ${t + sole} 195 ${t + 6} L192 ${t} Z" fill="#fff"/>
    ${PLATED.has(c) ? `<path d="M28 ${t + sole * .62} Q100 ${t + sole * .8} 188 ${t + sole * .3}" stroke="#f5a300" stroke-width="2.6" fill="none"/>`
      : `<path d="M16 ${t + sole * .55} L193 ${t + sole * .55}" stroke="${B.accent}" stroke-width="2.6" opacity=".9"/>`}
    <path d="M16 ${t} L24 ${t - 22} Q32 ${t - 33} 50 ${t - 30} L72 ${t - 40} Q82 ${t - 45} 89 ${t - 36} L103 ${t - 22} Q132 ${t - 16} 168 ${t - 12} Q192 ${t - 8} 192 ${t} Z" fill="${B.accent}"/>
    <path d="M56 ${t - 10} Q100 ${t - 30} 150 ${t - 8}" stroke="${B.color}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".85"/>
    <path d="M78 ${t - 34} L96 ${t - 18} M70 ${t - 30} L88 ${t - 16}" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".8"/>
  </svg>`;
}
/* 실제 사진이 있으면 사진, 없으면 그림 */
const SHOE_PHOTO = {};
const hasPhoto = s => !!SHOE_PHOTO[s.id];
/* 종류별 모션 그래픽 */
const SCENE_BY_CAT = { FR: 'marathon', CR: 'race', LR: 'sprint', ST: 'allround', SN: 'allround', MX: 'recovery', CU: 'longrun', SB: 'stable' };
const DAILY_SCENES = ['jog', 'walk', 'train', 'city'];
const SCENE_LABEL = { marathon: '풀코스 마라톤', race: '레이스 데이', sprint: '스피드 · 단거리', allround: '전천후 훈련', recovery: '회복주', longrun: '롱런', stable: '안정 주행', jog: '매일 조깅', walk: '가벼운 산책', train: '매일 연습', city: '도심 러닝' };
function sceneOf(s) {
  if (s.c !== 'DY') return SCENE_BY_CAT[s.c];
  const dys = SHOES.filter(x => x.b === s.b && x.c === 'DY');
  return DAILY_SCENES[Math.max(0, dys.indexOf(s)) % DAILY_SCENES.length];
}
function anim(type, values, dur, extra = '') {
  return REDUCED ? '' : `<animateTransform attributeName="transform" type="${type}" values="${values}" dur="${dur}s" repeatCount="indefinite" ${extra}/>`;
}
function figure(x, dur, walk) {
  const L = walk ? ['18;-18;18', '-18;18;-18'] : ['38;-34;38', '-34;38;-34'];
  const Ar = walk ? ['-20;20;-20', '20;-20;20'] : ['-45;40;-45', '40;-45;40'];
  const leg = v => `<g>${anim('rotate', v, dur)}<path d="M0 0 L${walk ? 2 : 6} 12 L0 24 L6 25"/></g>`;
  const arm = v => `<g>${anim('rotate', v, dur)}<path d="M0 0 L5 9 L12 6"/></g>`;
  return `<g transform="translate(${x} 0)"><g>${anim('translate', walk ? '0 0;0 -1;0 0' : '0 0;0 -3;0 0', dur / 2)}
    <g fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
      <g transform="translate(0 64)">${leg(L[1])}</g><g transform="translate(2 44)" opacity=".75">${arm(Ar[1])}</g>
      <path d="M2 42 L0 64"/>
      <g transform="translate(0 64)">${leg(L[0])}</g><g transform="translate(2 44)">${arm(Ar[0])}</g>
    </g><circle cx="3" cy="33" r="7" fill="#fff"/></g></g>`;
}
function sceneSVG(kind, w = 170) {
  const mv = (d, dist = 40) => anim('translate', `0 0;-${dist} 0`, d);
  const road = (d = 1.2) => `<g stroke="#ffffff70" stroke-width="3" stroke-linecap="round"><g>${mv(d)}${[0, 40, 80, 120, 160, 200].map(x => `<path d="M${x} 102 h20"/>`).join('')}</g></g><path d="M0 92 H200" stroke="#ffffffa0" stroke-width="2"/>`;
  const speed = (d = .6) => `<g stroke="#ffffff90" stroke-width="3" stroke-linecap="round"><g>${anim('translate', '30 0;-30 0', d)}<path d="M40 48 h-26 M50 62 h-34 M36 76 h-22"/></g></g>`;
  let bg = '', fig = figure(96, .7), fg = '';
  switch (kind) {
    case 'marathon':
      bg = `<g stroke="#fff" stroke-width="3" fill="none" opacity=".9"><path d="M140 92 V22 M190 92 V22"/></g><rect x="138" y="18" width="54" height="16" rx="3" fill="#ffffffe0"/><text x="165" y="30" font-size="10" font-weight="900" fill="#111" text-anchor="middle">FINISH</text><text x="165" y="50" font-size="13" font-weight="900" fill="#fff" text-anchor="middle" opacity=".85">42.195</text>` + road(1.1);
      fig = figure(86, .72); break;
    case 'race':
      bg = road(.9) + speed(.55) + `<g transform="translate(160 26)"><circle r="13" fill="none" stroke="#fff" stroke-width="3"/><path d="M0 -4 V0 L4 4" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round">${anim('rotate', '0;360', 2)}</path><path d="M-3 -17 h6" stroke="#fff" stroke-width="3"/></g>`;
      fg = `<rect x="90" y="48" width="12" height="9" rx="1.5" fill="#fff" opacity=".9"/>`; fig = figure(92, .6); break;
    case 'sprint':
      bg = road(.6) + speed(.35) + `<g opacity=".8">${speed(.45).replace('M40 48', 'M60 40')}</g>`; fig = figure(108, .42); break;
    case 'allround':
      bg = `<circle cx="36" cy="26" r="11" fill="#fde047"/><g stroke="#fde047" stroke-width="2.5" stroke-linecap="round"><g>${anim('rotate', '0 36 26;360 36 26', 8)}<path d="M36 8 v-4 M36 44 v4 M18 26 h-4 M54 26 h4 M23 13 l-3 -3 M49 39 l3 3 M49 13 l3 -3 M23 39 l-3 3"/></g></g>
        <g fill="#fff"><path d="M128 30 a12 12 0 0 1 22 -6 a10 10 0 0 1 18 8 a8 8 0 0 1 -2 16 h-36 a9 9 0 0 1 -2 -18z" opacity=".95"/></g>
        <g stroke="#bae6fd" stroke-width="2.5" stroke-linecap="round">${[136, 148, 160].map((x, i) => `<path d="M${x} 54 l-3 8">${REDUCED ? '' : `<animateTransform attributeName="transform" type="translate" values="0 0;-6 26" dur=".9s" begin="${i * .3}s" repeatCount="indefinite"/>`}</path>`).join('')}</g>` + road(1);
      fig = figure(92, .62); break;
    case 'recovery':
      bg = `<path d="M8 22 H50 l6 -10 l8 22 l6 -12 H112" fill="none" stroke="#fff" stroke-width="2.5" opacity=".75" stroke-linejoin="round"/><path d="M160 20 c-6 -10 -20 -4 -14 8 l14 14 l14 -14 c6 -12 -8 -18 -14 -8z" fill="#fda4af">${anim('scale', '1;1.08;1', 1.3, 'additive="sum"')}</path>` + road(2.2);
      fig = figure(96, 1.15); break;
    case 'longrun':
      bg = `<g fill="#fff" font-size="10" font-weight="900"><g>${mv(3, 60)}${[[30, '5km'], [90, '10km'], [150, '15km'], [210, '21km']].map(([x, t]) => `<g transform="translate(${x} 0)"><path d="M0 92 V70" stroke="#fff" stroke-width="2.5"/><rect x="-14" y="58" width="28" height="13" rx="3" fill="#ffffffd0"/><text y="68" text-anchor="middle" fill="#111">${t}</text></g>`).join('')}</g></g>` + road(1.4);
      fig = figure(96, .8); break;
    case 'stable':
      bg = `<g transform="translate(160 30)"><path d="M0 -16 L14 -10 V2 C14 12 6 18 0 20 C-6 18 -14 12 -14 2 V-10 Z" fill="#ffffffd0"/><path d="M-6 1 l5 5 l8 -10" stroke="#16a34a" stroke-width="3.5" fill="none" stroke-linecap="round"/></g>
        <g fill="none" stroke="#fff" stroke-width="2"><ellipse cx="98" cy="92" rx="10" ry="3">${REDUCED ? '' : '<animate attributeName="rx" values="6;34;6" dur="1.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="1.4s" repeatCount="indefinite"/>'}</ellipse></g>` + road(1.3);
      fig = figure(96, .85); break;
    case 'jog':
      bg = `<circle cx="34" cy="24" r="10" fill="#fde047" opacity=".9"/><g>${mv(4, 80)}${[60, 140, 220].map(x => `<g transform="translate(${x} 0)"><path d="M0 92 V70" stroke="#fff" stroke-width="3"/><circle cy="62" r="12" fill="#ffffffb0"/></g>`).join('')}</g>` + road(1.4);
      fig = figure(96, .8); break;
    case 'walk':
      bg = `<circle cx="166" cy="24" r="10" fill="#fff" opacity=".85"/><g>${mv(6, 90)}${[40, 130, 220].map(x => `<g transform="translate(${x} 0)"><path d="M0 92 V74" stroke="#fff" stroke-width="3"/><path d="M-12 74 Q0 48 12 74 Z" fill="#ffffffa8"/></g>`).join('')}<rect x="80" y="82" width="26" height="4" rx="2" fill="#fff" opacity=".7"/><path d="M84 86 v6 M102 86 v6" stroke="#fff" stroke-width="2" opacity=".7"/></g>` + `<path d="M0 92 H200" stroke="#ffffffa0" stroke-width="2"/>`;
      fig = figure(98, 1.3, true); break;
    case 'train':
      bg = `<g transform="translate(140 14)"><rect width="50" height="44" rx="6" fill="#ffffffe0"/><rect width="50" height="11" rx="5" fill="#fff"/><text x="25" y="9" font-size="8" font-weight="900" text-anchor="middle" fill="#111">매일 RUN</text>
        ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${7 + (i % 3) * 15} ${23 + Math.floor(i / 3) * 13} l3 3 l6 -7" stroke="#16a34a" stroke-width="2.6" fill="none" stroke-linecap="round" opacity="${REDUCED ? 1 : 0}">${REDUCED ? '' : `<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(i / 7).toFixed(2)};${((i + .5) / 7).toFixed(2)};1" dur="4.2s" repeatCount="indefinite"/>`}</path>`).join('')}</g>` + road(1.2);
      fig = figure(84, .75); break;
    case 'city':
      bg = `<g fill="#ffffff55"><g>${mv(5, 100)}${[0, 100, 200].map(o => `<g transform="translate(${o} 0)"><rect x="4" y="40" width="18" height="52"/><rect x="26" y="26" width="22" height="66"/><rect x="52" y="50" width="16" height="42"/><rect x="72" y="34" width="20" height="58"/></g>`).join('')}</g></g>` + road(1.2);
      fig = figure(98, .75); break;
  }
  return `<svg class="scene" viewBox="0 0 200 110" width="${w}" role="img" aria-label="${SCENE_LABEL[kind]}">${bg}${fig}${fg}
    <text x="8" y="16" font-size="10" font-weight="900" fill="#fff" opacity=".95" letter-spacing=".5">${SCENE_LABEL[kind]}</text></svg>`;
}
function shoeVisual(s) { return `<span class="cvis"><span class="cv-logo">${LOGOS.has(s.b) ? `<img src="logos/${s.b}.svg" alt="${BRANDS[s.b].name}">` : `<b>${BRANDS[s.b].name}</b>`}</span></span>`; }
const flagship = b => SHOES.filter(s => s.b === b && s.c === 'FR').sort((a, z) => (z.p || 0) - (a.p || 0))[0] || SHOES.filter(s => s.b === b).sort((a, z) => (z.p || 0) - (a.p || 0))[0];
const LOGOS = new Set(['hoka', 'nike', 'adidas', 'asics', 'nb', 'puma', 'saucony', 'mizuno', 'brooks', 'on', 'lining', 'anta', 'xtep', 'd361', 'prospecs', 'fila', 'ua', 'salomon', 'decathlon']);
const blogo = (k, cls = '') => LOGOS.has(k) ? `<span class="blogo ${cls}"><img src="logos/${k}.svg" alt=""></span>` : `<span class="blogo txt ${cls}">${BRANDS[k].name}</span>`;
const CAT_GOALS = { FR: ['풀코스', '하프', 'PB'], CR: ['풀코스', '하프', '대회'], LR: ['5km', '10km', '하프'], ST: ['템포', 'LSD', '하프'], SN: ['조깅', '템포', '롱런'], MX: ['회복', 'LSD', '롱런'], CU: ['조깅', '롱런', '회복'], SB: ['입문', '조깅', '과내전'], DY: ['입문', '조깅', '10km'] };

const GOAL_COLOR = { '풀코스': '#e11d48', '하프': '#ea580c', 'PB': '#b45309', '대회': '#be123c', '5km': '#0284c7', '10km': '#2563eb', '템포': '#7c3aed', 'LSD': '#0f766e', '조깅': '#16a34a', '롱런': '#0e7490', '회복': '#475569', '입문': '#15803d', '과내전': '#9333ea' };
const grad = b => `linear-gradient(135deg,${BRANDS[b].grad[0]},${BRANDS[b].grad[1]})`;
const rrUrl = s => s.rr ? 'https://runrepeat.com' + s.rr : `https://runrepeat.com/${RR_BRAND[s.b] || s.b}-${s.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '')}`;
const rrSearch = s => `https://www.google.com/search?q=${encodeURIComponent('site:runrepeat.com ' + BRANDS[s.b].name + ' ' + s.en)}`;
const scoreLabel = v => v >= 90 ? 'Superb' : v >= 85 ? 'Great' : v >= 80 ? 'Good' : 'Decent';
const tagsOf = s => [s.w ? `${s.w}g` : '', s.d != null ? `드롭 ${s.d}mm` : '', s.f.split(' ')[0]].filter(Boolean);

/* 점수·가격 표시 (RunRepeat 미평가 모델 대응) */
const sc = s => s.s ?? 0;
const krm = s => typeof KR_MARKET === 'object' && KR_MARKET[s.id];
const priceTxt = s => s.p ? won(s.p) : s.usd ? `해외 정가 $${s.usd}` : krm(s) ? `국내 판매가 ${krm(s)[0].toLocaleString('ko-KR')}원` : '국내 정가 미정';
const scoreTag = s => s.s == null ? '미평가' : s.est ? '추정치' : 'RunRepeat';
const tier = s => s.s == null ? 'n' : s.s >= 90 ? 'a' : s.s >= 85 ? 'b' : s.s >= 80 ? 'c' : 'd';

function card(s, why) {
  const C = CATS[s.c];
  return `<div class="card" onclick="openShoe('${s.id}')">
    <div class="ci ${hasPhoto(s) ? 'photo' : ''}" style="background:${grad(s.b)}">${shoeVisual(s, 150)}
      <div class="score t-${tier(s)}"><b>${s.s ?? '—'}</b><small>${scoreTag(s)}</small></div></div>
    <div class="cb">
      <span class="brandlbl">${blogo(s.b)}${BRANDS[s.b].name}${s.bs ? ' · 🔥 베스트셀러' : ''}</span>
      <h4>${esc(s.ko)}</h4>
      <span class="cat-row"><span class="catchip" style="background:${C.color}">${C.name}</span>${ftChips(s)}</span>
      <div class="tags">${tagsOf(s).map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
      ${why ? `<div class="why">${why}</div>` : ''}
      <div class="price">${priceTxt(s)}</div>
    </div></div>`;
}

/* ---------- 추천 로직 ---------- */
const LEVELS = {
  '초보': { DY: 1, CU: .95, SB: .9, MX: .8, SN: .6, ST: .3, LR: .1, CR: .1, FR: .05 },
  '10km': { DY: .9, SN: .9, CU: .8, ST: .8, LR: .75, CR: .6, SB: .6, MX: .55, FR: .5 },
  '하프': { ST: 1, SN: .95, CR: .85, FR: .75, CU: .75, DY: .7, LR: .6, MX: .65, SB: .55 },
  '풀코스': { CR: 1, FR: .95, ST: .9, SN: .85, MX: .75, CU: .7, DY: .55, SB: .55, LR: .4 },
};
const mix = (a, b) => Object.fromEntries(Object.keys(a).map(k => [k, (a[k] + b[k]) / 2]));
const REC_GROUPS = [
  { k: 'beg', name: '초보', sub: '입문 · 조깅 · 5km', desc: '편안한 쿠션과 안정감 위주로 골랐어요. 부상 없이 꾸준히 달리는 게 목표예요.', w: LEVELS['초보'], col: '#16a34a' },
  { k: 'mid', name: '10km ~ 하프', sub: '템포 · 기록 향상', desc: '가볍고 반발력 좋은 데일리·슈퍼트레이너 위주예요. 훈련과 대회를 함께 커버해요.', w: mix(LEVELS['10km'], LEVELS['하프']), col: '#2563eb' },
  { k: 'full', name: '풀코스', sub: '마라톤 완주 · 기록', desc: '42.195km를 버티는 쿠션과 추진력. 카본 레이싱화와 슈퍼트레이너 위주예요.', w: LEVELS['풀코스'], col: '#e11d48' },
];
let prof = { h: 172, w: 68, g: '남성', a: 35, pu: '조깅', ft: '일반' };
/* 족형: RunRepeat 실측 발볼(FOOT) 기준 키워드 */
const FOOT_TYPES = { '일반': '', '평발': '평발', '넓은 발볼': '넓은 발볼', '칼발': '칼발' };
const FT_COLOR = { '넓은 발볼': '#0891b2', '칼발': '#7c3aed', '평발': '#c2410c' };
function footTags(s) {
  const F = typeof FOOT === 'object' && FOOT[s.id], out = [];
  if (F && (/[WX]/.test(F[0]) || F[1] === 'W' || F[2] === 'W')) out.push('넓은 발볼');
  if (F && ((F[1] === 'N' && !/[WX]/.test(F[0])) || /N/.test(F[0]))) out.push('칼발');
  if ((F && F[3]) || s.c === 'SB') out.push('평발');
  return out;
}
const ftChips = s => footTags(s).map(t => `<span class="ftag" style="--fc:${FT_COLOR[t]}">${t === '칼발' ? '칼발(좁은 발볼)' : t}</span>`).join('');
function widthOpts(s) {
  const F = typeof FOOT === 'object' && FOOT[s.id]; if (!F || !/[NWX]/.test(F[0])) return null;
  const M = { N: 'B', D: 'D', W: '2E', X: '4E' }, Wm = { N: '2A', D: 'B', W: 'D', X: '2E' };
  return { m: [...F[0]].map(c => M[c]), w: [...F[0]].map(c => Wm[c]) };
}
const PURPOSES = {
  '조깅': { up: ['CU', 'DY', 'SN'], down: ['FR', 'LR'], note: '편하게 오래 달리는 조깅용 쿠션' },
  '리커버리(회복)': { up: ['MX', 'CU'], down: ['FR', 'LR', 'CR'], note: '회복주에 좋은 푹신한 쿠션' },
  '다이어트': { up: ['CU', 'MX', 'SB', 'DY'], down: ['FR', 'LR'], note: '체중 관리 러닝에 편한 쿠션·안정성' },
  '기록 단축': { up: ['FR', 'CR', 'LR', 'ST', 'SN'], down: ['MX', 'SB'], note: '기록 단축을 돕는 반발력' },
  '풀코스': { up: ['CR', 'FR', 'ST', 'MX'], down: ['LR'], note: '42.195km를 버티는 쿠션·추진력' },
  '하프': { up: ['CR', 'ST', 'SN', 'LR'], down: ['MX', 'SB'], note: '하프 페이스에 맞는 가벼운 반발력' },
};
const ageBand = n => n >= 60 ? '60대 이상' : n >= 50 ? '50대' : n >= 40 ? '40대' : n >= 30 ? '30대' : '20대 이하';
const recMore = {};

function recommend(p, W, label) {
  const bmi = p.w / Math.pow(p.h / 100, 2);
  const heavy = bmi >= 25 || p.w >= 85, light = bmi < 20.5;
  let list = SHOES.filter(s => s.s >= 80 && !s.est).map(s => {
    let fit = W[s.c] ?? .5;
    const notes = [];
    if (heavy) {
      if (['MX', 'SB', 'CU'].includes(s.c)) { fit += .12; notes.push('체중 대비 충분한 쿠션·지지'); }
      if (s.c === 'LR' || s.w < 190) fit -= .18;
      if (s.c === 'FR') fit -= .08;
    }
    if (light && ['LR', 'CR', 'SN'].includes(s.c)) { fit += .05; notes.push('가벼운 체격에 맞는 경량 반발'); }
    if (p.g === '여성' && s.w > 290) fit -= .05;
    const P = PURPOSES[p.pu];
    if (P) { if (P.up.includes(s.c)) { fit += .22; notes.unshift(P.note); } if (P.down.includes(s.c)) fit -= .3; }
    if (p.a >= 50) { if (['MX', 'CU', 'SB'].includes(s.c)) { fit += .18; notes.unshift(ageBand(p.a) + ' 관절을 지켜주는 쿠션'); } if (['LR', 'FR', 'ST'].includes(s.c)) fit -= .15; }
    else if (p.a >= 40) { if (['MX', 'CU', 'SB'].includes(s.c)) fit += .08; }
    else if (p.a < 30 && ['SN', 'ST', 'LR', 'CR'].includes(s.c)) fit += .06;
    if (label === '초보' && s.c === 'SB') notes.push('초보 부상 예방에 좋은 안정화');
    const total = s.s / 100 * .6 + fit * .4 + (s.bs ? .03 : 0);
    const why = `<b>${label}</b> 러너에게 맞는 ${CATS[s.c].name}${notes.length ? ' · ' + notes[0] : ''}`;
    return { s, total, why };
  }).sort((a, b) => b.total - a.total);
  if (p.ft && FOOT_TYPES[p.ft]) {
    const ok = list.filter(r => footTags(r.s).includes(FOOT_TYPES[p.ft]));
    ok.forEach(r => { r.why += ` · <b>${p.ft}</b> 적합`; });
    if (ok.length >= 3) list = ok;
  }
  const top = [], seen = new Set();
  for (const r of list) { if (top.length < 3 && !seen.has(r.s.b)) { top.push(r); seen.add(r.s.b); } }
  return { bmi, heavy, light, top, rest: list.filter(r => !top.includes(r)) };
}

function viewHome() {
  app.innerHTML = `
  <section class="hero">
    <div style="position:relative;z-index:1">
      <h1>내 몸에 맞는<br><em>목적별 러닝화 베스트 3</em></h1>
      <p>키 · 몸무게 · 성별 · 나이 · 족형 · 달리는 목적을 입력하면 RunRepeat 실측 80점 이상 모델 중 나에게 맞는 베스트 3를 골라드려요.</p>
      <ul><li>RunRepeat 실측 리뷰 80점+ 모델만 추천</li><li>${Object.keys(BRANDS).length}개 브랜드 · ${SHOES.length}개 모델 분석</li><li>체격(BMI) · 나이 · 목적에 맞춰 쿠션·반발·안정성 매칭</li></ul>
    </div>
    <form class="form" onsubmit="event.preventDefault();runRec()">
      <div class="frow">
        <div class="fl"><label for="fh">키</label><div class="inp"><input id="fh" type="number" min="130" max="215" value="${prof.h}" required><span>cm</span></div></div>
        <div class="fl"><label for="fw">몸무게</label><div class="inp"><input id="fw" type="number" min="30" max="160" value="${prof.w}" required><span>kg</span></div></div>
      </div>
      <div class="frow">
        <div class="fl"><label for="fa">나이</label><div class="inp"><input id="fa" type="number" min="10" max="90" value="${prof.a}" required><span>세</span></div></div>
        <div class="fl"><label>성별</label>
          <div class="seg" style="--n:2" id="fg">${['남성', '여성'].map(g => `<button type="button" class="${prof.g === g ? 'on' : ''}" onclick="pick('g','${g}',this)">${g}</button>`).join('')}</div></div>
      </div>
      <div class="fl fl-ft"><div class="fl-h"><label>족형</label><button type="button" class="fw-open" onclick="openFootGuide()">📏 발볼 기준보기</button></div>
        <div class="seg seg-ft" style="--n:4" id="fft">${Object.keys(FOOT_TYPES).map(k => `<button type="button" class="${prof.ft === k ? 'on' : ''}" onclick="pick('ft','${k}',this)">${k}</button>`).join('')}</div></div>
      <div class="fl" style="margin-bottom:16px"><label>달리는 목적</label>
        <div class="seg seg-pu" style="--n:3" id="fp">${Object.keys(PURPOSES).map(k => `<button type="button" class="${prof.pu === k ? 'on' : ''}" onclick="pick('pu','${k}',this)">${k}</button>`).join('')}</div></div>
      <div class="lvl-note">선택한 목적에 맞는 러닝화 <span style="--gc:#f5a300">베스트 3</span>를 골라드려요</div>
      <button class="btn pri" type="submit">러닝화 추천받기 →</button>
    </form>
  </section>
  <div id="rec"></div>`;
  renderRec();
}
function pick(k, v, el) { prof[k] = v; [...el.parentNode.children].forEach(b => b.classList.toggle('on', b === el)); }
function runRec() {
  prof.h = +$('#fh').value; prof.w = +$('#fw').value; prof.a = +$('#fa').value || prof.a;
  REC_GROUPS.forEach(g => recMore[g.k] = 0); recMore.pu = 0; recDone = true;
  renderRec();
  $('#rec').scrollIntoView({ behavior: 'smooth' });
}
/* 추천받기 결과: 목적 맞춤 베스트 3 + 더 보기 */
function renderMyRec() {
  const bmi = prof.w / Math.pow(prof.h / 100, 2);
  const type = bmi >= 25 || prof.w >= 85 ? '쿠션·안정성 우선' : bmi < 20.5 ? '경량·반발 우선' : '균형형';
  const W = PU_W[prof.pu] || LEVELS[prof.pu] || LEVELS['10km'];
  const r = recommend(prof, W, prof.pu), n = recMore.pu || 0, list = [...r.top, ...r.rest.slice(0, n)];
  const P = PURPOSES[prof.pu];
  $('#rec').innerHTML = `
    <div class="rsum"><div>
      <h2 class="sec-title">🎯 ${prof.pu} 맞춤 러닝화 베스트 3</h2>
      <div class="pills"><span class="pill">${prof.g}</span><span class="pill">${prof.h}cm · ${prof.w}kg</span><span class="pill">${ageBand(prof.a)}</span><span class="pill t">${prof.pu}</span>${prof.ft !== '일반' ? `<span class="pill t">${prof.ft}</span>` : ''}<span class="pill">BMI ${bmi.toFixed(1)}</span><span class="pill">${type}</span></div>
    </div><button class="btn ghost" style="font-size:13px" onclick="recDone=false;renderRec();">← 26년 베스트 3 다시 보기</button></div>
    <section class="rsolo">
      <p class="rsolo-why">${P ? `<b>${prof.pu}</b>에는 ${P.note}이 중요해요. ` : ''}${prof.ft !== '일반' ? `<b>${prof.ft}</b>에 맞는 신발(RunRepeat 실측 발볼·지지 기준)만 추렸어요. ` : ''}RunRepeat 점수, 체격(BMI), 나이까지 반영해 브랜드가 겹치지 않게 골랐어요.</p>
      <div class="rsolo-grid">${list.map((x, i) => recCard(x, i)).join('')}</div>
      ${n < r.rest.length ? `<button class="btn ghost rc-more rsolo-more" onclick="recMore.pu=${n + 3};renderRec();">추천 더 보기 (+3) ↓</button>` : ''}
    </section>`;
}
/* 브랜드 로고 상자 (신발 그림 대신) */
const logoBox = b => `<span class="rlogo" style="background:${grad(b)}"><span>${LOGOS.has(b) ? `<img src="logos/${b}.svg" alt="${BRANDS[b].name}">` : `<b>${BRANDS[b].name}</b>`}</span></span>`;
function recCard(x, i, g) {
  const s = x.s, C = CATS[s.c];
  return `<button class="ritem" onclick="openShoe('${s.id}')">
    <span class="rnum">${i + 1}</span>
    ${logoBox(s.b)}
    <span class="rbody">
      <span class="rbrand">${BRANDS[s.b].name}${s.bs ? ' · 🔥 베스트셀러' : ''}</span>
      <b class="rname">${esc(s.ko)}</b>
      <span class="cat-row"><span class="catchip" style="background:${C.color}">${C.name}</span>${ftChips(s)}</span>
      <span class="rhead">${esc(s.head)}</span>
      <span class="rmeta">${tagsOf(s).join(' · ')} · <b>${priceTxt(s)}</b></span>
    </span>
    <span class="lu-sc t-${tier(s)}"><b>${s.s}</b><small>점</small></span>
  </button>`;
}
/* 목적별 기본 가중치 */
const PU_W = {
  '조깅': { CU: 1, DY: .95, SN: .9, MX: .8, SB: .8, ST: .65, CR: .45, LR: .4, FR: .35 },
  '리커버리(회복)': { MX: 1, CU: .95, SB: .8, DY: .7, SN: .65, ST: .5, CR: .3, FR: .25, LR: .25 },
  '다이어트': { CU: 1, DY: .95, MX: .9, SB: .9, SN: .75, ST: .55, CR: .35, FR: .3, LR: .3 },
  '기록 단축': { FR: 1, CR: .95, LR: .9, ST: .85, SN: .8, DY: .55, CU: .5, MX: .35, SB: .35 },
};
let recDone = false;
function renderRec() { setTimeout(revealObserve, 0);
  if (recDone) return renderMyRec();
  const bmi = prof.w / Math.pow(prof.h / 100, 2);
  const type = bmi >= 25 || prof.w >= 85 ? '쿠션·안정성 우선' : bmi < 20.5 ? '경량·반발 우선' : '균형형';
  $('#rec').innerHTML = `
    <div class="rsum"><div>
      <h2 class="sec-title">🏆 26년 러닝화 베스트 3</h2>
      <p class="rsub">RunRepeat 실측 80점 이상 모델 중 초보 · 10km~하프 · 풀코스 목표별로 골랐어요. 위에서 내 정보를 넣으면 나에게 맞는 베스트 3를 찾아드려요.</p>
    </div><span style="color:var(--sub);font-size:13px">카드를 누르면 핵심 포인트를 볼 수 있어요</span></div>
    <div class="rec3">${REC_GROUPS.map(g => {
      const r = recommend({ h: 172, w: 68, g: '남성', a: 35, pu: null }, g.w, g.name), n = recMore[g.k] || 0, list = [...r.top, ...r.rest.slice(0, n)];
      return `<section class="rcol" style="--gc:${g.col}">
        <div class="rc-head"><span class="rg-badge">${g.name}</span><b>${g.sub}</b><p>${g.desc}</p></div>
        <div class="rlist">${list.map((x, i) => recCard(x, i, g)).join('')}</div>
        ${n < r.rest.length ? `<button class="btn ghost rc-more" onclick="recMore['${g.k}']=${n + 3};renderRec();">${g.name} 추천 더 보기 ↓</button>` : ''}
      </section>`;
    }).join('')}</div>`;
}

/* 공식몰: 모델 상품·소개 페이지 → 없으면 공식몰 검색 → 그래도 없으면 브랜드 공식 사이트 */
const SHOP_SEARCH = { nike: 'https://www.nike.com/kr/w?q=', adidas: 'https://www.adidas.co.kr/search?q=', asics: 'https://www.asics.co.kr/goods/search?search_text=', nb: 'https://www.nbkorea.com/product/searchResult.action?schWord=', saucony: 'https://www.saucony.co.kr/product/search.html?keyword=', ua: 'https://www.underarmour.co.kr/ko-kr/search/?q=', puma: 'https://kr.puma.com/kr/ko/search?q=', decathlon: 'https://www.decathlon.co.kr/search?Ntt=' };
const KR_SHOP = ['nike.com/kr', '.co.kr', 'kr.puma', 'on.com/ko-kr', 'prospecs.com', 'kor.mizuno'];
function shopLink(s) {
  const u = typeof SHOP === 'object' && SHOP[s.id], B = BRANDS[s.b];
  if (u) return KR_SHOP.some(k => u.includes(k)) ? [u, '공식몰', '공식몰 ' + s.ko + ' 페이지'] : [u, '해외 공식몰', '국내 공식 온라인몰이 없어 해외 공식 페이지로 연결해요'];
  if (SHOP_SEARCH[s.b]) return [SHOP_SEARCH[s.b] + encodeURIComponent(s.ko), '공식몰 검색', '공식몰에 모델 페이지가 없어 공식몰 검색 결과로 연결해요'];
  return [B.site, '공식 사이트', '모델별 판매 페이지가 없어 브랜드 공식 사이트로 연결해요'];
}
/* ---------- 상세 모달 ---------- */
const METER = {
  cush: { FR: 4, CR: 4, LR: 2, ST: 4, SN: 4, MX: 5, CU: 4, SB: 4, DY: 3 },
  speed: { FR: 5, CR: 5, LR: 5, ST: 4, SN: 4, MX: 2, CU: 3, SB: 2, DY: 3 },
  stab: { FR: 2, CR: 3, LR: 2, ST: 3, SN: 3, MX: 4, CU: 3, SB: 5, DY: 3 },
};
const WHO = {
  FR: '서브3~서브4를 노리며 대회 기록 단축이 목표인 중·상급 러너', CR: '하프·풀코스 대회에서 기록을 줄이고 싶은 러너',
  LR: '5km·10km 기록을 노리는 가벼운 체격의 스피드형 러너', ST: '템포런·LSD를 빠르게 소화하고 싶은 중급 이상 러너',
  SN: '한 켤레로 조깅·템포·대회까지 해결하고 싶은 러너', MX: '회복주·장거리 LSD 위주, 체중이 있거나 관절이 걱정되는 러너',
  CU: '매일 편하게 오래 달리고 싶은 모든 러너', SB: '발이 안쪽으로 무너지는 과내전·평발 러너, 부상이 걱정되는 초보',
  DY: '첫 러닝화를 찾는 입문자, 가성비 데일리를 원하는 러너',
};
function avg(arr) { return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0; }
/* 점수 이유 키워드: RunRepeat 실측 항목 → [문구, 'p'(장점)|'n'(약점)|'i'(특징)] */
function rrWhy(s) {
  const k = s.rr && RR_KW[s.rr]; if (!k || !s.lab) return [];
  const [shock, energy, traction, light, soft, toebox, heelpad, outsole, breath, stiff, rocker, plate, arch, rank] = k;
  const hi = v => /High/.test(v || ''), lo = v => /Low/.test(v || '');
  const out = [];
  if (rank) { const [n, tb, pc] = rank.split(' '); out.push([`러닝화 전체 ${n}위 · ${tb === 'Top' ? '상위' : '하위'} ${pc}%`, tb === 'Top' && +pc <= 30 ? 'p' : tb === 'Top' ? 'i' : 'n']); }
  if (hi(energy)) out.push(['반발력 높음', 'p']); else if (lo(energy)) out.push(['반발력 낮음', 'n']); else if (s.s < 85) out.push(['반발력 보통', 'n']);
  if (hi(shock)) out.push(['충격 흡수 우수', 'p']); else if (lo(shock)) out.push(['충격 흡수 약함', 'n']); else if (s.s < 85) out.push(['충격 흡수 보통', 'n']);
  if (s.w) { if (s.w < 220) out.push([`초경량 ${s.w}g`, 'p']); else if (s.w < 250 || light === '✓') out.push([`가벼움 ${s.w}g`, 'p']); else if (s.w > 300) out.push([`무거운 편 ${s.w}g`, 'n']); }
  if (hi(traction)) out.push(['접지력 좋음', 'p']); else if (lo(traction)) out.push(['접지력 아쉬움', 'n']);
  if (outsole === 'Good' && toebox !== 'Bad' && heelpad !== 'Bad') out.push(['내구성 좋음', 'p']);
  else { if (outsole === 'Bad') out.push(['밑창 빨리 닳음', 'n']); if (toebox === 'Bad') out.push(['앞코 내구성 약함', 'n']); if (heelpad === 'Bad') out.push(['뒤꿈치 안감 약함', 'n']); }
  if (breath === 'Breathable') out.push(['통기성 좋음', 'p']); else if (breath === 'Warm') out.push(['통기성 아쉬움', 'n']);
  if (/soft/i.test(soft || '')) out.push(['부드러운 쿠션', 'i']); else if (/firm/i.test(soft || '')) out.push(['단단한 미드솔', 'i']);
  if (plate) out.push(['카본 플레이트', 'i']);
  if (rocker === '✓') out.push(['로커 형상 · 부드러운 굴림', 'i']);
  if (arch && arch !== 'Neutral') out.push(['안정화 구조', 'i']);
  if (/flexible/i.test(stiff || '')) out.push(['유연한 바닥', 'i']);
  return out;
}
/* 핵심 특징 (왼쪽) */
function featPanel(s) {
  const why = rrWhy(s).filter(w => !/^러닝화 전체/.test(w[0]));
  const basic = [C_NAME(s), s.f, s.d != null ? `드롭 ${s.d}mm` : null].filter(Boolean).map(t => [t, 'i']);
  let n = 0;
  const grp = (label, cls, list) => list.length ? `<div class="fgrp ${cls}"><b class="mst" style="--i:${n++}">${label}</b><div>${list.map(([t]) => `<span class="mst" style="--i:${n++}">${esc(t)}</span>`).join('')}</div></div>` : '';
  return `<div class="feat"><h4 class="mst" style="--i:4">핵심 특징</h4>
    ${grp('강점', 'fg-p', why.filter(w => w[1] === 'p'))}
    ${grp('아쉬운 점', 'fg-n', why.filter(w => w[1] === 'n'))}
    ${grp('특징', 'fg-i', [...basic, ...why.filter(w => w[1] === 'i')])}
    ${footTags(s).length ? grp('족형', 'fg-f', footTags(s).map(t => [t === '칼발' ? '칼발(좁은 발볼) OK' : t === '평발' ? '평발 · 과내전 지지' : '넓은 발볼 OK'])) : ''}
    ${(o => o ? `<div class="fw-opt mst" style="--i:${n++}"><b>발볼 옵션</b><div><span><i>남성</i>${o.m.join(' · ')}</span><span><i>여성</i>${o.w.join(' · ')}</span></div><small>RunRepeat 기준 해외 출시 폭이에요. 국내 판매처에 따라 와이드 버전이 없을 수 있어요.</small></div>` : '')(widthOpts(s))}</div>`;
}
/* 점수 설명 문장 (오른쪽) */
const WHY_P = { '반발력 높음': '반발력', '충격 흡수 우수': '충격 흡수', '접지력 좋음': '접지력', '내구성 좋음': '내구성', '통기성 좋음': '통기성' };
const WHY_N = { '반발력 보통': '보통 수준의 반발력', '반발력 낮음': '낮은 반발력', '충격 흡수 보통': '보통 수준의 충격 흡수', '충격 흡수 약함': '약한 충격 흡수', '접지력 아쉬움': '아쉬운 접지력', '밑창 빨리 닳음': '빨리 닳는 밑창', '앞코 내구성 약함': '약한 앞코 내구성', '뒤꿈치 안감 약함': '약한 뒤꿈치 안감', '통기성 아쉬움': '아쉬운 통기성' };
function whyText(s, cRank, cTotal) {
  const li = (ic, k, v, cls = '') => `<li class="${cls}"><span class="wy-i">${ic}</span><span class="wy-k">${k}</span><span class="wy-v">${v}</span></li>`;
  if (s.s == null) return `<ul class="why-list">${li('ⓘ', '점수', 'RunRepeat 실험실 리뷰 없음')}${li('📝', '참고 자료', '제조사 정보 · 국내 리뷰')}</ul>`;
  if (s.est || !s.lab) return `<ul class="why-list">${li('ⓘ', '점수', '이전 버전 · 국내 리뷰 기반 추정치')}${li('🥇', '같은 종류', `${C_NAME(s)} ${cTotal}개 중 <b>${cRank}위</b>`, 'r-cat')}</ul>`;
  const w = rrWhy(s), rank = w.find(x => /^러닝화 전체/.test(x[0]));
  const pos = w.filter(x => x[1] === 'p' && x !== rank).map(x => WHY_P[x[0]] || (/g$/.test(x[0]) ? `가벼운 무게(${s.w}g)` : null)).filter(Boolean);
  const neg = w.filter(x => x[1] === 'n' && x !== rank).map(x => WHY_N[x[0]] || (/g$/.test(x[0]) ? `무거운 무게(${s.w}g)` : null)).filter(Boolean);
  const rows = [];
  if (rank) { const m = rank[0].match(/(\d+)위 · (상위|하위) (\d+)%/); rows.push(li('🏆', '전체 순위', `RunRepeat 리뷰 전체 러닝화 중 <b>${m[1]}위</b> (${m[2]} ${m[3]}%) · ${scoreLabel(s.s)}`, 'r-rank')); }
  rows.push(li('▲', '최상급 항목', pos.length ? `<b>${pos.slice(0, 5).join(' · ')}</b>` : '뚜렷한 강점 없음', 'r-up'));
  rows.push(li('▼', '감점 항목', neg.length ? neg.slice(0, 4).join(' · ') : '뚜렷한 감점 없음', 'r-down'));
  rows.push(li('🥇', '같은 종류', `${C_NAME(s)} ${cTotal}개 중 <b>${cRank}위</b>`, 'r-cat'));
  const same = SHOES.filter(x => x.c === s.c && x.p), ap = same.length ? same.reduce((t, x) => t + x.p, 0) / same.length : 0;
  if (s.p && ap) rows.push(li('💰', '가격 비교', `${won(s.p)} · 같은 종류 평균(${won(Math.round(ap))})보다 <b>${s.p <= ap ? Math.round(ap - s.p).toLocaleString('ko-KR') + ',000원 저렴' : Math.round(s.p - ap).toLocaleString('ko-KR') + ',000원 비쌈'}</b>`, 'r-price'));
  rows.push(li('🏃', '추천 러너', WHO[s.c], 'r-who'));
  return `<ul class="why-list">${rows.join('')}</ul>`;
}
/* 점수 패널 (오른쪽) */
function scorePanel(s, B, circ, cRank, cTotal) {
  const rank = rrWhy(s).find(w => /^러닝화 전체/.test(w[0]));
  const tier = s.s == null ? '미평가' : s.est ? '참고 추정치' : scoreLabel(s.s);
  return `<div class="mh-score">
      <div class="ring"><svg viewBox="0 0 150 150" width="118" height="118"><circle cx="75" cy="75" r="64" stroke="#ffffff26" stroke-width="12" fill="none"/>
        ${s.s != null ? `<circle class="ring-v" cx="75" cy="75" r="64" stroke="${B.accent}" stroke-width="12" fill="none" stroke-linecap="round" stroke-dasharray="${circ}" stroke-dashoffset="${circ * (1 - s.s / 100)}" data-to="${circ * (1 - s.s / 100)}" data-from="${circ}"/>` : ''}</svg>
        <div class="rv"><b class="cnt" data-to="${s.s ?? ''}">${s.s ?? '—'}</b></div></div>
      <div class="ms-txt"><small>RunRepeat 점수</small><b>${tier}</b>
        ${rank ? `<span class="ms-rank${rank[1] === 'n' ? ' low' : ''}">${rank[0].replace('러닝화 전체 ', '전체 ')}</span>` : `<span class="ms-note">${s.est ? '이전 버전·국내 리뷰 참고' : '실험실 리뷰 없음'}</span>`}</div>
    </div>
    <div class="whybox mst" style="--i:6"><h4>왜 이 점수일까?</h4>${whyText(s, cRank, cTotal)}</div>
    <p class="rrinfo mst" style="--i:8"><b>RunRepeat란?</b> ${RR_ABOUT}</p>`;
}
const C_NAME = s => CATS[s.c].name;
const RR_ABOUT = '신발을 직접 사서 실험실에서 반으로 자르고 무게·쿠션·반발력·내구성을 측정한 뒤, 실제 러닝 테스트를 더해 100점 만점으로 매기는 세계 최대 러닝화 리뷰 사이트예요.';
function openShoe(id) {
  const s = byId[id], B = BRANDS[s.b], C = CATS[s.c];
  const peers = SHOES.filter(x => x.c === s.c);
  const aw = avg(peers.filter(x => x.w).map(x => x.w)), ap = avg(peers.filter(x => x.p).map(x => x.p));
  const scored = peers.filter(x => x.s != null).sort((a, b) => b.s - a.s), rank = scored.findIndex(x => x.id === s.id) + 1;
  const speed = Math.min(5, METER.speed[s.c] + (s.w && s.w < 220 ? 0.5 : 0) - (s.w > 300 ? 0.5 : 0));
  const meter = (k, v) => `<div class="spec"><small>${k}</small><b>${v.toFixed(1)} / 5</b><div class="bar"><i style="width:${v / 5 * 100}%"></i></div></div>`;
  const circ = 2 * Math.PI * 64;
  const reviewed = s.lab;
  $('#mbox').innerHTML = `
    <button class="mx" onclick="closeModal()" aria-label="닫기">×</button>
    <div class="mhero mh2" style="--hb:${grad(s.b)}">
      <div class="mh-left">
        <span class="brandlbl mst" style="--i:0">${blogo(s.b)}${B.name} · ${C.name}${s.bs ? ' · 🔥 베스트셀러' : ''}</span>
        <h2 class="mst" style="--i:1">${esc(s.ko)}<span class="mh-pr">${s.p ? won(s.p) : s.usd ? "해외 정가 $" + s.usd : krm(s) ? krm(s)[0].toLocaleString("ko-KR") + "원" : "가격 미공개"}</span></h2><div class="mh-en mst" style="--i:2">${esc(s.en)}${!s.p && !s.usd && krm(s) ? `<span class="mh-prn">국내 판매가 · ${krm(s)[1]}</span>` : ""}</div>
        <div class="head mst" style="--i:3">${esc(s.head)}</div>
        ${featPanel(s)}
      <div class="mact mh-act mst" style="--i:14">
        ${reviewed ? `<a class="btn act-p" href="${rrUrl(s)}" target="_blank" rel="noopener">RunRepeat<span class="mh-x"> 리뷰</span></a>` : `<a class="btn pri" href="${rrSearch(s)}" target="_blank" rel="noopener">RunRepeat<span class="mh-x"> 검색</span></a>`}
        <a class="btn act-g" href="https://search.shopping.naver.com/search/all?query=${encodeURIComponent(B.ko + ' ' + s.ko)}" target="_blank" rel="noopener">네이버 최저가</a>
        ${(L => `<a class="btn act-g act-shop" href="${L[0]}" target="_blank" rel="noopener" aria-label="${B.ko} ${esc(s.ko)} ${L[1]}" title="${L[2]}">${blogo(s.b)}${L[1]}</a>`)(shopLink(s))}
      </div>
      </div>
      <div class="mh-right">${scorePanel(s, B, circ, rank, scored.length)}</div>
    </div>
    <div class="mbody">
      <h3 style="margin-top:0">핵심 포인트 & 장점 3</h3>
      <div class="pros">${s.pros.map((p, i) => `<div class="pro"><div class="n">${i + 1}</div><p>${esc(p)}</p></div>`).join('')}</div>
      <h3>한눈에 보는 요약</h3>
      <ul class="sumlist">
        <li><b>평가</b><span>${s.s == null ? 'RunRepeat에 아직 리뷰가 없는 모델이에요. 특징은 국내 리뷰와 제조사 정보를 참고했어요.' : `RunRepeat ${s.s}점(${scoreLabel(s.s)})${s.est ? ' — 같은 버전의 리뷰가 없어 참고용 추정치예요' : ' — 실험실 실측 리뷰'} · ${C.name} ${scored.length}개 중 <b style="color:inherit">${rank}위</b>`}</span></li>
        ${s.w ? `<li><b>무게</b><span>${s.w}g${reviewed ? ' (RunRepeat 실측)' : s.mfr ? ' (제조사 공시, 270mm)' : ''} — 같은 분류 평균(${Math.round(aw)}g)보다 ${s.w <= aw ? `${Math.round(aw - s.w)}g 가벼움` : `${Math.round(s.w - aw)}g 무거움`}</span></li>` : ''}
        <li><b>쿠셔닝</b><span>${esc(s.f)}${s.d != null ? ` · 드롭 ${s.d}mm ${s.d <= 5 ? '(저드롭 — 미드·포어풋 착지에 유리)' : s.d >= 10 ? '(고드롭 — 뒤꿈치 착지·아킬레스 부담 완화)' : '(중간 드롭 — 무난한 범용성)'}` : ''}</span></li>
        <li><b>용도</b><span>${C.use} · ${C.desc}</span></li>
        <li><b>가격</b><span>${priceTxt(s)}${s.p && ap ? ` — 같은 분류 평균(${won(Math.round(ap))}) 대비 ${s.p <= ap ? '합리적' : '프리미엄'}` : ''}</span></li>
      </ul>

      <h3>성향 그래프</h3>
      <div class="meters">${meter('쿠셔닝', METER.cush[s.c])}${meter('스피드 · 반발', speed)}${meter('안정성', METER.stab[s.c])}</div>

      <h3>스펙</h3>
      <div class="specs">
        <div class="spec"><small>무게 (남성 US9)</small><b>${s.w ? s.w + 'g' : '—'}</b></div>
        <div class="spec"><small>힐-토 드롭</small><b>${s.d != null ? s.d + 'mm' : '—'}</b></div>
        <div class="spec"><small>분류</small><b>${C.name}</b></div>
        <div class="spec"><small>가격</small><b>${priceTxt(s)}</b></div>
      </div>

      <h3>이런 러너에게 추천</h3>
      <ul class="sumlist"><li><b>👍</b><span>${WHO[s.c]}</span></li></ul>
      <h3>아쉬운 점</h3>
      <ul class="sumlist">${s.cons.map(c => `<li><b>⚠️</b><span>${esc(c)}</span></li>`).join('')}</ul>
      ${reviewBlock(s)}

    </div>`;
  $('#modal').classList.add('on');
  $('#modal').scrollTop = 0;
  animateScore($('#mbox'));
  sectionize($('#mbox .mbody'));
  document.body.style.overflow = 'hidden';
}
/* 실제 러너 리뷰 영상 TOP 3 */
function reviewBlock(s) {
  const list = ((typeof REVIEWS === 'object' && REVIEWS[s.id]) || []).slice(0, 3);
  const more = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(BRANDS[s.b].ko + ' ' + s.ko + ' 리뷰');
  return `<h3>실제 러너 리뷰 TOP 3</h3>
    ${list.length ? `<div class="rv-list">${list.map(([id, t, ch, v, k, age], i) => `<a class="rv-item" href="${k === 'S' ? 'https://www.youtube.com/shorts/' + id : 'https://www.youtube.com/watch?v=' + id}" target="_blank" rel="noopener">
      <span class="rv-n">${i + 1}</span>
      <span class="rv-th"><img src="thumbs/${id}.jpg" alt="" loading="lazy"><i>${k === 'S' ? 'Shorts' : '▶'}</i></span>
      <span class="rv-tx"><b>${esc(t)}</b><small>${esc(ch || '')}${ch ? ' · ' : ''}조회수 ${views(v)}${age ? ' · ' + esc(age) : ''}</small></span></a>`).join('')}</div>`
      : '<p class="rv-empty">아직 이 모델을 다룬 한국어 리뷰 영상이 많지 않아요. 유튜브에서 더 많은 리뷰를 찾아보세요.</p>'}
    <a class="rv-more" href="${more}" target="_blank" rel="noopener">▶ 유튜브에서 리뷰 더 보기</a>`;
}
/* 팝업 아래쪽: 제목(h3)마다 색 상자로 묶기 */
const MSEC = { '핵심 포인트': ['⭐', '#f5a300'], '실제 러너 리뷰': ['▶', '#ff4e45'], '한눈에 보는 요약': ['📋', '#60a5fa'], '성향 그래프': ['📊', '#a78bfa'], '스펙': ['📐', '#34d399'], '이런 러너에게 추천': ['👍', '#22c55e'], '아쉬운 점': ['⚠️', '#f87171'] };
function sectionize(body) {
  if (!body) return;
  const kids = [...body.children], secs = [];
  let cur = null;
  for (const el of kids) {
    if (el.tagName === 'H3') {
      const key = Object.keys(MSEC).find(k => el.textContent.startsWith(k)) || '';
      const [ic, col] = MSEC[key] || ['•', '#a1a1aa'];
      cur = document.createElement('section'); cur.className = 'msec'; cur.style.setProperty('--sc', col);
      el.style.margin = ''; el.insertAdjacentHTML('afterbegin', `<span class="msec-ic">${ic}</span>`);
      body.insertBefore(cur, el); cur.appendChild(el); secs.push(cur);
    } else if (cur && !el.classList.contains('msec')) cur.appendChild(el);
  }
  const n = secs.length;
  if (n >= 2 && /추천/.test(secs[n - 2].textContent) && /아쉬운/.test(secs[n - 1].firstChild.textContent)) {
    const pair = document.createElement('div'); pair.className = 'msec-pair';
    body.insertBefore(pair, secs[n - 2]); pair.appendChild(secs[n - 2]); pair.appendChild(secs[n - 1]);
  }
}
function animateScore(root) {
  const ring = root.querySelector('.ring-v'), num = root.querySelector('.cnt');
  if (REDUCED || !num || num.dataset.to === '') return;
  const to = +num.dataset.to, t0 = performance.now(), dur = 1100;
  if (ring) { ring.style.transition = 'none'; ring.style.strokeDashoffset = ring.dataset.from; ring.getBoundingClientRect(); ring.style.transition = 'stroke-dashoffset 1.1s cubic-bezier(.2,.8,.2,1) .05s'; requestAnimationFrame(() => { ring.style.strokeDashoffset = ring.dataset.to; }); }
  num.textContent = '0';
  const step = now => { const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3); num.textContent = Math.round(to * e); if (p < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
function closeModal() { $('#modal').classList.remove('on'); document.body.style.overflow = ''; }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ---------- 러닝화 찾기 ---------- */
const regionOf = b => REGIONS.find(r => r[2].includes(b));
function regionMenu(cur, mode) {
  const to = b => (mode === 'find' ? 'find-' : 'history-') + b;
  return `<div class="regionbar ${mode === 'history' ? 'hist' : ''}">
    ${mode === 'history' ? `<button class="reg-all ${!cur ? 'on' : ''}" onclick="go('history')"><b>러닝화의 역사</b><small>전체 흐름 보기</small></button>` : ''}
    ${REGIONS.map(([k, n, bs]) => { const on = bs.includes(cur);
      return `<div class="reg ${on ? 'on' : ''}">
        <button class="reg-btn" aria-haspopup="true" aria-expanded="false" onclick="toggleDD(this)">
          <span><b>${n}</b><small>${on ? blogo(cur) + BRANDS[cur].ko : bs.length + '개 브랜드'}</small></span><i class="caret" aria-hidden="true"></i></button>
        <div class="dd" role="menu">
          <div class="dd-title">${n} 브랜드</div>
          ${bs.map(b => `<button role="menuitem" class="dd-item ${b === cur ? 'on' : ''}" onclick="go('${to(b)}')">${blogo(b)}<span><b>${BRANDS[b].ko}</b><small>${BRANDS[b].country.replace(/ \(.*\)/, '')} · ${BRANDS[b].founded}년 창립 · ${SHOES.filter(x => x.b === b).length}개 모델</small></span></button>`).join('')}
        </div></div>`; }).join('')}
  </div>`;
}
function toggleDD(btn) {
  const box = btn.parentNode, open = !box.classList.contains('open');
  document.querySelectorAll('.reg.open').forEach(r => { r.classList.remove('open'); r.querySelector('.reg-btn').setAttribute('aria-expanded', 'false'); });
  if (open) { box.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
}
document.addEventListener('click', e => { if (!e.target.closest('.reg')) document.querySelectorAll('.reg.open').forEach(r => { r.classList.remove('open'); r.querySelector('.reg-btn').setAttribute('aria-expanded', 'false'); }); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelectorAll('.reg.open').forEach(r => r.classList.remove('open')); });
function lineup(b) {
  const list = SHOES.filter(s => s.b === b);
  const cats = CAT_ORDER.filter(c => list.some(s => s.c === c));
  return `<div class="lineup" role="table" aria-label="${BRANDS[b].name} 라인업">
    <div class="lu-head" role="row"><span role="columnheader">종류</span><span role="columnheader">목적 &amp; 특징</span><span role="columnheader">모델명</span><span role="columnheader" class="r">점수</span></div>
    ${cats.map(c => { const ms = list.filter(s => s.c === c).sort((a, z) => sc(z) - sc(a));
      return `<div class="lu-group ${c === 'FR' ? 'lu-flag' : ''}" role="row" style="--cc:${CATS[c].color}">
        <div class="lu-cat"><i></i><div><b>${CATS[c].name}</b><small>${CATS[c].use}</small></div></div>
        <div class="lu-gd">
          <div class="lu-goal">${CAT_GOALS[c].map(g => `<span style="--gc:${GOAL_COLOR[g] || '#64748b'}">${g}</span>`).join('')}</div>
          <p class="lu-desc">${CATS[c].desc}</p>
        </div>
        <div class="lu-models">${ms.map(s => `<button class="lu-m" onclick="openShoe('${s.id}')">
          <span class="lu-txt"><b>${esc(s.ko)}${s.bs ? '<em>BEST</em>' : ''}</b><small>${esc(s.head)}</small>
            <span class="lu-spec">${[s.w ? s.w + 'g' : '', s.d != null ? '드롭 ' + s.d + 'mm' : '', priceTxt(s)].filter(Boolean).join(' · ')}</span></span>
          <span class="lu-sc t-${tier(s)}"><b>${s.s ?? '—'}</b><small>${s.s == null ? '미평가' : s.est ? '추정' : '점'}</small></span>
        </button>`).join('')}</div>
      </div>`; }).join('')}
    <p class="lu-note"><span class="lu-sc t-a"><b>90+</b></span> 최상 <span class="lu-sc t-b"><b>85+</b></span> 우수 <span class="lu-sc t-c"><b>80+</b></span> 좋음 <span class="lu-sc t-n"><b>—</b></span> RunRepeat 미평가 · 점수는 RunRepeat 실험실 리뷰 기준</p>
  </div>`;
}
function top3(b) {
  const rr = TOP3[b], list = rr ? rr.map(id => SHOES.find(s => s.id === id)).filter(Boolean)
    : SHOES.filter(s => s.b === b).sort((a, z) => (z.bs - a.bs) || (sc(z) - sc(a))).slice(0, 3);
  return `<section class="bt3box">
    <div class="bt3-h"><h3>2026 인기 베스트 3</h3><span>${rr ? 'RunRepeat 인기순 · 26년 11월 기준' : '국내 판매처 베스트셀러 표기 기준'}</span></div>
    <div class="bt3-grid">${list.map((s, i) => `<button class="bt3" onclick="openShoe('${s.id}')">
      <span class="bt3-n">${i + 1}</span>
      <span class="bt3-tx"><b>${esc(s.ko)}</b><small><i style="background:${CATS[s.c].color}"></i>${CATS[s.c].name} · ${priceTxt(s)}</small></span>
      <span class="lu-sc t-${tier(s)}"><b>${s.s ?? '—'}</b><small>${s.s == null ? '미평가' : s.est ? '추정' : '점'}</small></span></button>`).join('')}</div>
    <p class="bt3-note">브랜드가 모델별 판매량을 공개하지 않아, ${rr ? '세계 최대 러닝화 리뷰 사이트 RunRepeat의 인기 순위' : '국내 판매처의 베스트셀러 표기'}로 대신했어요.</p>
  </section>`;
}
function viewFind(b) {
  if (!BRANDS[b]) b = 'nike';
  const B = BRANDS[b], list = SHOES.filter(s => s.b === b), reg = regionOf(b);
  const best = [...list].sort((a, z) => sc(z) - sc(a))[0], fs_ = flagship(b);
  app.innerHTML = `
    <h1 class="sec-title">러닝화 찾기</h1><p class="sec-sub">지역과 브랜드를 고르면 모델 라인업과 용도별 분류를 보여드려요.</p>
    ${regionMenu(b, 'find')}
    <div class="banner2" style="--g1:${B.grad[0]};--g2:${B.grad[1]};--ac:${B.accent}">
      <div class="bn-text">
        <span class="bn-eye">${esc(B.country.replace(/ \(.*\)/, ''))} · ${B.founded}년 창립</span>
        <h2>${B.name}</h2>
        <p>${esc(B.ko)}의 러닝화 ${list.length}개 모델을 용도별로 정리했어요.</p>
        <div class="bn-chips"><span><b>${list.length}</b>개 모델</span>${best.s != null ? `<span>최고점 <b>${esc(best.ko)} ${best.s}점</b></span>` : ''}<span>플래그십 <b>${esc(fs_.ko)}</b></span></div>
      </div>
      <button class="bn-visual" onclick="openShoe('${fs_.id}')" aria-label="${esc(fs_.ko)} 자세히 보기">
        <span class="bn-logo">${LOGOS.has(b) ? `<img src="logos/${b}.svg" alt="${B.name} 로고">` : `<b>${B.name}</b>`}</span>
        <span class="bn-flag">FLAGSHIP<b>${esc(fs_.ko)}</b><small>${priceTxt(fs_)}</small></span>
      </button>
    </div>
    ${top3(b)}
    <div class="banner" hidden>
      <div class="big">${B.name}</div>
      <button class="shoe ${hasPhoto(fs_) ? 'photo' : ''}" onclick="openShoe('${fs_.id}')" aria-label="${esc(fs_.ko)} 자세히 보기">${shoeVisual(fs_, 300)}<span class="fl">FLAGSHIP · ${esc(fs_.ko)} · ${priceTxt(fs_)}</span></button>
      <div class="stk"><span>${list.length} SHOES</span><span>${best.s != null ? `WHAT'S BEST? → ${esc(best.ko)}` : `${B.country} 브랜드`}</span></div>
    </div>
    ${lineup(b)}`;
}

/* ---------- 러닝화 역사 ---------- */
const photoSrc = k => `photos/${k}.${/\.png$/i.test(PHOTOS[k][0]) ? 'png' : 'jpg'}`;
const commonsUrl = k => 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(PHOTOS[k][0].replace(/ /g, '_'));
const credit = k => `<a class="credit" href="${commonsUrl(k)}" target="_blank" rel="noopener">사진 ${esc(PHOTOS[k][2])} · ${esc(PHOTOS[k][1])}</a>`;
const toSec = t => t.split(':').reduce((a, b) => a * 60 + +b, 0);
const fmtSec = s => `${Math.floor(s / 3600)}:${String(Math.floor(s % 3600 / 60)).padStart(2, '0')}:${String(Math.round(s % 60)).padStart(2, '0')}`;
const tok = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const DARKS = ['#1e293b', '#3f3f46', '#0f172a', '#334155'];
const bcol = k => DARKS.includes(BRANDS[k].grad[1]) ? tok('--sub') : BRANDS[k].grad[1];

/* 가로 타임라인: 연도 포인트 + 굵직한 사건은 사진 카드 */
function photoTimeline(items, onclickFn) {
  // items: [연도, 제목, 사진키|null, 색, 대상id]
  const STEP = 168, PAD = 60, W = PAD * 2 + items.length * STEP;
  return `<div class="htl-wrap pop" tabindex="0" aria-label="연도별 타임라인 (좌우로 스크롤)"><div class="htl" style="width:${W}px">
    ${items.map(([y, t, ph, col, id], i) => {
      const x = PAD + i * STEP + STEP / 2, up = i % 2 === 0, big = !!ph;
      return `<div class="seg" style="left:${x - STEP / 2}px;width:${STEP}px;background:${col}"></div>
      <button class="pt ${big ? 'big' : ''}" style="left:${x}px;--pc:${col}" ${id ? `onclick="${onclickFn}('${id}')"` : ''} aria-label="${y}년 ${esc(t)}"></button>
      <span class="yl ${up ? 'dn' : 'upl'}" style="left:${x}px;color:${col}">${y}</span>
      <div class="stem ${up ? 'up' : 'down'} ${big ? 'big' : ''}" style="left:${x}px;background:${col}"></div>
      <div class="tc ${up ? 'up' : 'down'} ${big ? 'big' : ''}" style="left:${x}px;--pc:${col};--n:${i}" ${id ? `onclick="${onclickFn}('${id}')" role="button" tabindex="0"` : ''}>
        ${big ? `<img src="${photoSrc(ph)}" alt="" loading="lazy">` : ''}
        <b>${y}</b><span>${esc(t)}</span></div>`;
    }).join('')}
  </div></div><p class="note" style="margin:6px 0 0">← 좌우로 밀어서 보세요 · 사진이 있는 카드는 굵직한 사건이에요 · 누르면 자세한 설명으로 이동해요</p>`;
}
function jumpTo(id) { const el = document.getElementById(id); const nav = document.querySelector('.pg-tabs'); if (el && el.closest('[hidden]') && nav) for (const b of nav.querySelectorAll('button')) { b.click(); if (!el.closest('[hidden]')) break; } if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 1600); } }

function histMenu(cur) { return regionMenu(cur, 'history'); }
function vidCard(id, title, ch, v) {
  return `<a class="vcard" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">
    <div class="thumb"><img src="thumbs/${id}.jpg" alt="" loading="lazy"><span class="badge">▶ 롱폼</span></div>
    <div class="vb"><b>${esc(title)}</b><span>${esc(ch)} · 조회수 ${views(v)} ↗</span></div></a>`;
}
function chartBase() {
  charts.forEach(c => c.destroy()); charts = [];
  if (!window.Chart) return false;
  Chart.defaults.font.family = '"Noto Sans KR", sans-serif';
  Chart.defaults.color = tok('--sub'); Chart.defaults.borderColor = tok('--line');
  return true;
}

function viewHistory(b) {
  if (b && BRANDS[b]) return viewBrandHistory(b);
  const evByEra = RS_ERAS.map((e, i) => RS_EVENTS.filter(x => x[4] === i));
  app.innerHTML = `
    <section class="mhero2 shoe">
      <div class="mh-copy"><span class="eyebrow">RUNNING SHOES · 1830 → 2026</span>
        <h1>고무 밑창 캔버스화에서<br><em>카본 슈퍼슈즈</em>까지</h1>
        <p>약 190년 동안 러닝화가 어떻게 바뀌었고, 그 변화가 기록과 시장을 어떻게 바꿨는지 정리했어요. 브랜드를 누르면 브랜드별 역사를 볼 수 있어요.</p></div>
      <div class="mh-stats">
        <div><b>${cnt(196, 'int', '', '년')}</b><span>1830년 첫 고무 밑창 운동화 이후</span></div>
        <div><b>${cnt(55, 'int', '−', '분')}</b><span>1908년 이후 남자 세계기록 단축</span></div>
        <div><b>${cnt(207, 'int', '−', '초')}</b><span>슈퍼슈즈 등장 이후 단축 (2:02:57 → 1:59:30)</span></div>
        <div><b>${cnt(MIDSOLE.length, 'int', '', '종')}</b><span>러닝화를 바꾼 미드솔 기술</span></div>
      </div>
    </section>
    ${histMenu('')}
    <div class="eras">${RS_ERAS.map(([a, z, n, c], i) => `<a class="era pop" href="#history" onclick="event.preventDefault();document.getElementById('era-${i}').scrollIntoView({behavior:'smooth'})" style="--ec:${c};--i:${i}">
      <span class="yrs">${a}–${i === RS_ERAS.length - 1 ? '현재' : z}</span><b>${n}</b><span class="cnt">사건 ${evByEra[i].length}개</span></a>`).join('')}</div>

    <div class="cgrid">
      <div class="panel wide"><h3>마라톤 세계기록과 러닝화의 시대</h3>
        <p class="note">배경색은 러닝화 시대 구분입니다. 슈퍼슈즈가 등장한 2017년 이후 남자 기록은 3분 이상 줄었어요. 출처: World Athletics 공인 기록</p>
        <div class="cbox tall"><canvas id="cwr" aria-label="마라톤 세계기록 변화 그래프"></canvas></div>
        <div class="stats">
          <div><small>남자 세계기록</small><b>1:59:30</b><span>사웨 · 2026 런던</span></div>
          <div><small>여자 세계기록</small><b>2:09:56</b><span>쳅응게티치 · 2024 시카고</span></div>
          <div><small>슈퍼슈즈 이후 단축 (남자)</small><b>−3분 27초</b><span>2:02:57(2014) → 1:59:30</span></div>
          <div><small>한국인 세계기록</small><b>2회</b><span>손기정 1935 · 서윤복 1947</span></div>
        </div></div>
      <div class="panel wide"><h3>미드솔 기술 연대표</h3><p class="note">러닝화의 성능을 가른 쿠셔닝 소재가 등장한 해</p><div class="cbox mid"><canvas id="cmid" aria-label="미드솔 기술 연대표"></canvas></div></div>
    </div>

    <h2 class="h2">러닝화 타임라인</h2>
    ${photoTimeline(RS_EVENTS.map(([y, t, d, ph, e], i) => [y, t, ph, RS_ERAS[e][3], 'ev-' + i]), 'jumpTo')}

    <h2 class="h2">시대별 사건 자세히 보기</h2>
    ${RS_ERAS.map(([a, z, n, c, d], i) => `<section class="era-sec" id="era-${i}">
      <div class="era-head" style="--ec:${c}"><span class="yrs">${a}–${i === RS_ERAS.length - 1 ? '현재' : z}</span><div><h3>${n}</h3><p>${d}</p></div></div>
      <div class="ev-grid">${evByEra[i].map(([y, t, desc, ph]) => `<article class="evc" id="ev-${RS_EVENTS.findIndex(x => x[0] === y && x[1] === t)}">
        ${ph ? `<div class="ph"><img src="${photoSrc(ph)}" alt="${esc(t)}" loading="lazy"></div>` : `<div class="ph none" style="--ec:${c}"><span>${y}</span></div>`}
        <div class="eb"><span class="ey" style="color:${c}">${y}</span><h4>${esc(t)}</h4><p>${esc(desc)}</p>${ph ? credit(ph) : ''}</div></article>`).join('')}</div>
    </section>`).join('')}

    <h2 class="h2">브랜드로 보는 러닝화 시장</h2>
    <div class="cgrid">
      <div class="panel wide"><h3>브랜드 탄생 타임라인</h3><p class="note">창립 연도 · 브랜드를 누르면 브랜드 역사로 이동해요</p><div id="found"></div></div>
      <div class="panel"><h3>2019년 대비 매출 성장 (2019 = 100)</h3><p class="note">각사 공시 기준 · 자국 통화 기준 지수 · 호카는 데커스 회계연도</p><div class="cbox"><canvas id="cgrow"></canvas></div></div>
      <div class="panel"><h3>연 매출 규모 (억 달러)</h3><p class="note">2024년 기준 근사치 · 달러 환산</p><div class="cbox"><canvas id="c1"></canvas></div></div>
      <div class="panel"><h3>글로벌 러닝화 시장 점유율 (%)</h3><p class="note">업계 추정치 · 참고용</p><div class="cbox"><canvas id="c2"></canvas></div></div>
      <div class="panel"><h3>브랜드별 RunRepeat 평균 점수</h3><p class="note">이 사이트에 수록된 모델 기준</p><div class="cbox"><canvas id="c3"></canvas></div></div>
    </div>

    <h2 class="h2">러닝화 역사 영상</h2>
    <div class="vgrid">${RS_VIDEOS.map(v => vidCard(...v)).join('')}</div>
    <p class="note" style="margin-top:14px">사진은 위키미디어 공용의 자유 라이선스 이미지이며, 사진 아래 표기를 누르면 원본과 라이선스를 볼 수 있어요.</p>`;

  drawFounding();
  motion();
  if (!chartBase()) return;
  // 1) 세계기록 + 시대 배경
  const bands = { id: 'bands', beforeDatasetsDraw(c) {
    const { ctx, chartArea: a, scales: { x } } = c;
    RS_ERAS.forEach(([s, e, n, col]) => {
      const x0 = Math.max(x.getPixelForValue(s), a.left), x1 = Math.min(x.getPixelForValue(e + 1), a.right);
      if (x1 <= x0) return;
      ctx.save(); ctx.fillStyle = col + '22'; ctx.fillRect(x0, a.top, x1 - x0, a.bottom - a.top);
      ctx.fillStyle = col; ctx.font = '700 11px "Noto Sans KR", sans-serif'; ctx.textAlign = 'center';
      if (x1 - x0 > 46) ctx.fillText(n, (x0 + x1) / 2, a.top + 14); ctx.restore();
    });
  } };
  const pts = arr => arr.map(([y, t, n]) => ({ x: y, y: toSec(t), n }));
  charts.push(new Chart($('#cwr'), { type: 'line', plugins: [bands],
    data: { datasets: [
      { label: '남자', data: pts(WR_MEN), borderColor: '#f5a300', backgroundColor: '#f5a300', stepped: 'before', pointRadius: 3, borderWidth: 2.5 },
      { label: '여자', data: pts(WR_WOMEN), borderColor: tok('--info'), backgroundColor: tok('--info'), stepped: 'before', pointRadius: 3, borderWidth: 2.5 }] },
    options: { maintainAspectRatio: false, interaction: { mode: 'nearest', intersect: false },
      scales: { x: { type: 'linear', min: 1900, max: 2027, ticks: { stepSize: 20, callback: v => v } , grid: { display: false } },
        y: { min: 7000, max: 12300, ticks: { callback: v => fmtSec(v), stepSize: 900 }, grid: { color: tok('--line') } } },
      plugins: { legend: { position: 'top', align: 'end', labels: { boxWidth: 12 } },
        tooltip: { callbacks: { title: i => i[0].raw.x + '년', label: i => ` ${i.dataset.label} ${fmtSec(i.raw.y)} — ${i.raw.n}` } } } } }));
  // 2) 미드솔 연대표
  charts.push(new Chart($('#cmid'), { type: 'bar',
    data: { labels: MIDSOLE.map(m => m[0]), datasets: [{ data: MIDSOLE.map(m => [m[1], 2026]), backgroundColor: MIDSOLE.map(m => m[2] ? bcol(m[2]) : '#9a6b3f'), borderRadius: 4, barPercentage: .7 }] },
    options: { indexAxis: 'y', maintainAspectRatio: false, scales: { x: { min: 1970, max: 2026, ticks: { callback: v => v }, grid: { color: tok('--line') } }, y: { grid: { display: false } } },
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: i => ` ${MIDSOLE[i.dataIndex][1]}년 — ${MIDSOLE[i.dataIndex][3]}` } } } } }));
  // 3) 성장 지수
  const yrs = [2019, 2020, 2021, 2022, 2023, 2024];
  const gk = Object.keys(REVENUE).filter(k => REVENUE[k].s.some(r => r[0] === 2019) && REVENUE[k].s.some(r => r[0] === 2024));
  charts.push(new Chart($('#cgrow'), { type: 'line',
    data: { labels: yrs, datasets: gk.map(k => { const s = Object.fromEntries(REVENUE[k].s), base = s[2019];
      return { label: BRANDS[k].ko, data: yrs.map(y => s[y] ? Math.round(s[y] / base * 100) : null), borderColor: bcol(k), backgroundColor: bcol(k), spanGaps: true, tension: .3, pointRadius: 2 }; }) },
    options: { maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } } }, scales: { y: { grid: { color: tok('--line') } }, x: { grid: { display: false } } } } }));
  brandCharts();
}

function drawFounding() {
  const keys = Object.keys(BRANDS);
  const sorted = keys.map(k => [k, BRANDS[k].founded]).sort((a, z) => a[1] - z[1]);
  const x0 = 1890, x1 = 2020, W = 1000, sx = y => 40 + (y - x0) / (x1 - x0) * (W - 80);
  const AX = 165, LANES = [6, 286, 46, 246, 86, 206];
  let svg = `<svg viewBox="0 0 ${W} 330" width="100%" style="min-width:720px"><line x1="30" y1="${AX}" x2="${W - 30}" y2="${AX}" stroke="#a8a49c" stroke-width="3"/>`;
  for (let y = 1900; y <= 2020; y += 20) svg += `<text x="${sx(y)}" y="${AX - 8}" font-size="11" fill="#8a8f9a" text-anchor="middle">${y}</text>`;
  sorted.forEach(([k, y], i) => {
    const by = LANES[i % 6], X = sx(y), BB = BRANDS[k], up = by < AX;
    svg += `<line x1="${X}" y1="${AX}" x2="${X}" y2="${up ? by + 36 : by}" stroke="${BB.grad[1]}" stroke-width="2"/>
      <circle cx="${X}" cy="${AX}" r="7" fill="${BB.grad[1]}" stroke="#fff" stroke-width="2"/>
      <g style="cursor:pointer" onclick="go('history-${k}')"><rect x="${X - 46}" y="${by}" width="92" height="36" rx="9" fill="${BB.grad[0]}" stroke="#fff" stroke-width="1.5"/>
      <text x="${X}" y="${by + 15}" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">${BB.name}</text>
      <text x="${X}" y="${by + 29}" font-size="11" fill="#fffc" text-anchor="middle">${y}</text></g>`;
  });
  $('#found').innerHTML = `<div style="overflow-x:auto">${svg}</svg></div>`;
}

function brandCharts(b) {
  const keys = Object.keys(BRANDS);
  const byRev = keys.filter(k => BRANDS[k].revenue).sort((a, z) => BRANDS[z].revenue - BRANDS[a].revenue);
  charts.push(new Chart($('#c1'), { type: 'bar', data: { labels: byRev.map(k => BRANDS[k].ko), datasets: [{ data: byRev.map(k => BRANDS[k].revenue * 10), backgroundColor: byRev.map(k => k === b ? '#f5a300' : bcol(k)), borderRadius: 6 }] },
    options: { indexAxis: 'y', maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => ` 약 ${c.raw}억 달러` } } }, scales: { x: { grid: { color: tok('--line') } }, y: { grid: { display: false } } } } }));
  const sh = keys.filter(k => BRANDS[k].share > 0).sort((a, z) => BRANDS[z].share - BRANDS[a].share), other = 100 - sh.reduce((a, k) => a + BRANDS[k].share, 0);
  charts.push(new Chart($('#c2'), { type: 'doughnut', data: { labels: [...sh.map(k => BRANDS[k].ko), '기타'], datasets: [{ data: [...sh.map(k => BRANDS[k].share), other], backgroundColor: [...sh.map(k => k === b ? '#f5a300' : bcol(k)), tok('--soft')], borderColor: tok('--card'), borderWidth: 2 }] },
    options: { maintainAspectRatio: false, cutout: '58%', plugins: { legend: { position: 'right', labels: { boxWidth: 12 } } } } }));
  const sk = keys.filter(k => SHOES.some(s => s.b === k && s.s != null));
  charts.push(new Chart($('#c3'), { type: 'bar', data: { labels: sk.map(k => BRANDS[k].ko), datasets: [{ label: '평균 점수', data: sk.map(k => +avg(SHOES.filter(s => s.b === k && s.s != null).map(s => s.s)).toFixed(1)), backgroundColor: sk.map(k => k === b ? '#f5a300' : tok('--sub')), borderRadius: 6 }] },
    options: { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { min: 75, max: 95, grid: { color: tok('--line') } }, x: { grid: { display: false } } } } }));
}

/* 연도별 사건 카드: 사진이 없으면 브랜드 색 카드 + 아이콘 */
const EV_ICON = t => /창립|설립|창업|출발|시작|출범/.test(t) ? '🏁' : /인수|합병|편입|합작/.test(t) ? '🤝' : /상장|매출/.test(t) ? '📈' : /기록|우승|올림픽|금메달|점화|1위/.test(t) ? '🏆' : /슬로건|리브랜딩|패션/.test(t) ? '✨' : '👟';
function evPhoto(b, y, t) { const m = (EV_PHOTO[b] || []).find(([yy, kw]) => yy === y && (!kw || t.includes(kw))); return m && PHOTOS[m[2]] ? m[2] : null; }
const fmtLen = s => s ? `${Math.floor(s / 60)}분 ${String(s % 60).padStart(2, '0')}초` : '';
const fmtViews = n => n >= 10000 ? `${(n / 10000).toFixed(n >= 100000 ? 0 : 1)}만회` : `${(n || 0).toLocaleString()}회`;
function viewBrandHistory(b) {
  const B = BRANDS[b], R = REVENUE[b], K = (KILLERS[b] || []).slice().sort((a, z) => a[0] - z[0]);
  const ST = STORIES[b] || { tag: '', video: '', stats: [], ch: [] }, VM = VMETA[b], V = B.videos[0];
  const list = SHOES.filter(s => s.b === b);
  const cats = CAT_ORDER.filter(c => list.some(s => s.c === c));
  const first = R && R.s[0], last = R && R.s[R.s.length - 1];
  const hist = B.history.slice().sort((x, z) => x[0] - z[0]);
  app.innerHTML = `
    <h1 class="sec-title">러닝화의 역사 · ${B.ko}</h1>
    <p class="sec-sub">${B.ko}의 탄생 이야기, 연도별 사건, 매출과 킬러 모델을 한눈에 정리했어요.</p>
    ${histMenu(b)}
    <div class="bhero" style="background:${grad(b)}">
      <div class="bh-left"><div class="bh-head">${blogo(b, 'big')}<div><h2>${B.name}</h2><span>${B.ko} · ${B.country}</span></div></div>
        ${ST.tag ? `<p class="bh-tag">${esc(ST.tag)}</p>` : ''}
        <div class="facts"><div><small>창립</small><b>${B.founded}년</b></div><div><small>창업자</small><b>${B.founder}</b></div>
          <div><small>본사</small><b>${B.hq}</b></div><div><small>${R ? `최근 매출 (${last[0]})` : '연 매출(근사)'}</small><b>${R ? `${last[1].toLocaleString()}${R.unit}` : (B.revenue ? `약 ${+(B.revenue * 10).toFixed(1)}억 달러` : '비공개')}</b></div></div></div>
      <div class="bh-video">${V ? `<a class="video" href="https://www.youtube.com/watch?v=${V[0]}" target="_blank" rel="noopener" aria-label="${esc(V[1])} 유튜브에서 보기">
          <img src="thumbs/${V[0]}.jpg" alt=""><span class="vplay"><svg width="22" height="24" viewBox="0 0 22 24"><path d="M0 0L22 12L0 24Z" fill="#fff"/></svg></span>${VM && VM[0] ? `<span class="vlen">${fmtLen(VM[0])}</span>` : ''}</a>
        <div class="vinfo"><b>${esc(V[1])}</b>
          <div class="vmeta"><span>${esc(V[2])}</span>${VM ? `<span>조회수 ${fmtViews(VM[2])}</span><span>${VM[1]} 업로드</span>` : ''}</div>
          <p>${esc(ST.video)}</p>
          <a class="vgo" href="https://www.youtube.com/watch?v=${V[0]}" target="_blank" rel="noopener">유튜브에서 보기 ↗</a></div>` : ''}</div>
    </div>

    ${ST.ch.length ? `<h2 class="h2">${B.ko} 브랜드 스토리</h2>
    <div class="bs-stats">${ST.stats.map(([n, d], i) => `<div class="bs-stat" style="--i:${i}"><b>${esc(n)}</b><span>${esc(d)}</span></div>`).join('')}</div>
    <div class="story" style="--bc:${DARKS.includes(B.grad[1]) ? '#f5a300' : B.grad[1]}">
      ${ST.ch.map(([y, t, txt, ph], i) => `<article class="sch ${i % 2 ? 'r' : ''} ${ph && PHOTOS[ph] ? '' : 'noph'}">
        <div class="sch-dot"><span>${y}</span></div>
        <div class="sch-card">
          ${ph && PHOTOS[ph] ? `<figure class="sch-ph"><img src="${photoSrc(ph)}" alt="${esc(t)}" loading="lazy">${credit(ph)}</figure>` : ''}
          <div class="sch-tx"><span class="sch-n">CHAPTER ${i + 1} · ${y}</span><h3>${esc(t)}</h3><p>${esc(txt)}</p></div>
        </div></article>`).join('')}
    </div>` : ''}

    <h2 class="h2">타임라인으로 보는 ${B.ko}</h2>
    ${photoTimeline([...hist.map(([y, t], i) => [y, t, evPhoto(b, y, t), B.grad[1] === '#1e293b' || B.grad[1] === '#3f3f46' || B.grad[1] === '#334155' ? '#8a8f9a' : B.grad[1], 'bev-' + i]),
      ...K.map(([y, n, d, ph], i) => [y, '킬러 모델 · ' + n, ph, '#f5a300', 'km-' + i])].sort((a, z) => a[0] - z[0]), 'jumpTo')}

    <h2 class="h2">연도별 사건</h2>
    <div class="ev-grid bev">${hist.map(([y, t], i) => { const ph = evPhoto(b, y, t);
      return `<article class="evc" id="bev-${i}">${ph ? `<div class="ph"><img src="${photoSrc(ph)}" alt="${esc(t)}" loading="lazy"></div>` : `<div class="ph bev-art" style="background:${grad(b)}"><span class="ba-logo">${LOGOS.has(b) ? `<img src="logos/${b}.svg" alt="">` : `<b>${B.name}</b>`}</span><span class="ba-ic">${EV_ICON(t)}</span></div>`}
        <div class="eb"><span class="ey" style="color:${DARKS.includes(B.grad[1]) ? 'var(--tiger-d)' : B.grad[1]}">${y}</span><h4>${esc(t)}</h4>${ph ? credit(ph) : ''}</div></article>`; }).join('')}</div>

    ${K.length ? `<h2 class="h2">킬러 모델</h2>
    <div class="kgrid">${K.map(([y, n, d, ph], i) => `<article class="kc" id="km-${i}">
      <div class="ph">${ph && PHOTOS[ph] ? `<img src="${photoSrc(ph)}" alt="${esc(n)}" loading="lazy">` : `<div class="noph" style="background:${grad(b)}">${shoeSVG(b, 200)}</div>`}<span class="ky">${y}</span></div>
      <div class="eb"><h4>${esc(n)}</h4><p>${esc(d)}</p>${ph && PHOTOS[ph] ? credit(ph) : ''}</div></article>`).join('')}</div>` : ''}

    <div class="cgrid">
      <div class="panel"><h3>${R ? `매출 추이 (${R.unit})` : list.some(x => x.s != null) ? 'RunRepeat 점수 (수록 모델)' : '모델별 무게 (제조사 공시)'}</h3>
        <p class="note">${R ? `${R.note} · 각사 공시 기준 근사치${first ? ` · ${first[0]}→${last[0]} ${(last[1] / first[1]).toFixed(1)}배` : ''}` : list.some(x => x.s != null) ? '브랜드 단독 매출이 공개되지 않아 수록 모델 점수로 대신 보여드려요' : '브랜드 단독 매출과 RunRepeat 리뷰가 없어 제조사가 공개한 무게로 보여드려요 (g)'}</p>
        <div class="cbox"><canvas id="crev"></canvas></div></div>
      <div class="panel"><h3>현재 라인업 구성</h3><p class="note">이 사이트 수록 ${list.length}개 모델 · 용도별</p><div class="cbox"><canvas id="cline"></canvas></div></div>
    </div>

    <h2 class="h2">${B.ko} 관련 한국어 영상</h2>
    <div class="vgrid">${B.videos.map(v => vidCard(v[0], v[1], v[2], v[3])).join('')}</div>`;
  storyMotion();
  motion();
  if (!chartBase()) return;
  const col = DARKS.includes(B.grad[1]) ? '#f5a300' : B.grad[1];
  if (R) charts.push(new Chart($('#crev'), { type: 'bar', data: { labels: R.s.map(r => r[0]), datasets: [{ data: R.s.map(r => r[1]), backgroundColor: R.s.map((r, i) => i === R.s.length - 1 ? '#f5a300' : col), borderRadius: 5 }] },
    options: { maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => ` ${c.raw.toLocaleString()}${R.unit}` } } }, scales: { y: { beginAtZero: true, grid: { color: tok('--line') } }, x: { grid: { display: false } } } } }));
  else { const hasS = list.some(x => x.s != null), ms = list.filter(s => hasS ? s.s != null : s.w).sort((a, z) => hasS ? z.s - a.s : a.w - z.w);
    charts.push(new Chart($('#crev'), { type: 'bar', data: { labels: ms.map(s => s.ko), datasets: [{ data: ms.map(s => hasS ? s.s : s.w), backgroundColor: col, borderRadius: 5 }] },
      options: { indexAxis: 'y', maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: hasS ? { min: 70, max: 95, grid: { color: tok('--line') } } : { beginAtZero: true, grid: { color: tok('--line') } }, y: { grid: { display: false }, ticks: { font: { size: 11 } } } } } })); }
  charts.push(new Chart($('#cline'), { type: 'doughnut', data: { labels: cats.map(c => CATS[c].name), datasets: [{ data: cats.map(c => list.filter(s => s.c === c).length), backgroundColor: cats.map(c => CATS[c].color), borderColor: tok('--card'), borderWidth: 2 }] },
    options: { maintainAspectRatio: false, cutout: '55%', plugins: { legend: { position: 'right', labels: { boxWidth: 12, font: { size: 11 } } } } } }));
}

/* ---------- 브랜드 스토리 모션 ---------- */
function storyMotion() {
  const els = [...app.querySelectorAll('.sch, .bs-stat')];
  if (REDUCED || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px' });
  els.forEach(e => { e.classList.add('sm'); io.observe(e); });
}
/* ---------- 모션 그래픽 공통 ---------- */
const REDUCED = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
function fmtCount(v, f) { return f === 'time' ? fmtSec(v) : f === 'dec1' ? v.toFixed(1) : f === 'dec3' ? v.toFixed(3) : Math.round(v).toLocaleString(); }
function cnt(v, f = 'int', pre = '', suf = '') {
  return `<span class="cnt-up" data-count="${v}" data-fmt="${f}" data-pre="${pre}" data-suf="${suf}">${pre}${fmtCount(v, f)}${suf}</span>`;
}
function motion(root = app) {
  if (REDUCED || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target; io.unobserve(el);
    if (el.dataset.count != null) {
      const to = +el.dataset.count, f = el.dataset.fmt, t0 = performance.now(), D = 1500, from = f === 'time' ? to * 1.25 : 0;
      const step = t => { const p = Math.min(1, (t - t0) / D), k = 1 - Math.pow(1 - p, 3);
        el.textContent = el.dataset.pre + fmtCount(from + (to - from) * k, f) + el.dataset.suf; if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    } else {
      el.querySelectorAll('path.d').forEach(p => { try { p.style.setProperty('--len', Math.ceil(p.getTotalLength())); } catch (x) {} });
      el.classList.add('play');
    }
  }), { rootMargin: '0px 0px -6% 0px' });
  root.querySelectorAll('[data-count], .grow, .draw, .pop, .race').forEach(el => io.observe(el));
}

/* ---------- 마라톤 랭킹 ---------- */
let rankSex = 'men';
const RANK_SECS = [['rk-wr', '🏆 세계 신기록'], ['rk-top', '📊 역대 TOP 20'], ['rk-nat', '🌍 국가별 랭킹'], ['rk-hall', '⭐ 명예의 전당'], ['rk-kr', '🇰🇷 대한민국 기록'], ['rk-un', '🚫 비공식 기록']];
const natPill = c => { const n = NAT_KO[c] || [c, '#64748b']; return `<span class="rk-nat" style="--nc:${n[1]}">${n[0]}</span>`; };
function rankTop20() {
  const L = TOP20[rankSex], lead = toSec(L[0][1]), last = toSec(L[L.length - 1][1]);
  return `<div class="rk-toggle">${[['men', '남자'], ['women', '여자']].map(([k, n]) => `<button class="${k === rankSex ? 'on' : ''}" onclick="rankSex='${k}';$('#rk-top20').innerHTML=rankTop20();motion($('#rk-top20'))">${n}</button>`).join('')}</div>
    <div class="rk-list race">${L.map(([rk, t, n, c, w, y], i) => { const s = toSec(t), gap = s - lead, m = Math.round(42195 * (1 - lead / s));
      return `<div class="rk-row ${rk <= 3 ? 'p' + rk : ''}" style="--i:${i}">
        <span class="rk-no">${rk}</span>
        <span class="rk-who"><b>${n}</b>${natPill(c)}<small>${w} · ${y}</small></span>
        <span class="rk-bar"><i style="--w:${100 - (s - lead) / (last - lead + 1) * 38}%;--nc:${(NAT_KO[c] || [, '#64748b'])[1]}"></i></span>
        <span class="rk-t"><b>${t}</b><small>${gap ? `+${Math.floor(gap / 60) ? Math.floor(gap / 60) + '분 ' : ''}${gap % 60}초 · ${m.toLocaleString()}m 뒤` : '1위'}</small></span></div>`; }).join('')}</div>
    <p class="note">World Athletics 역대 순위 · 선수별 최고 기록 · ${RANK_ASOF} 기준 · 막대는 1위 기록과의 차이, "m 뒤"는 1위가 결승선에 들어온 순간의 거리 차예요</p>`;
}
function viewRank() {
  const wm = WR_PROG.men[WR_PROG.men.length - 1], ww = WR_PROG.women[WR_PROG.women.length - 1];
  const kr = KR_REC.men[0], krw = KR_REC.women[0];
  app.innerHTML = `
    <h1 class="sec-title">마라톤 랭킹</h1>
    <p class="sec-sub">세계 신기록부터 역대 TOP 20, 국가별 순위, 명예의 전당, 대한민국 기록까지 — ${RANK_ASOF} 기준 World Athletics 공식 기록으로 정리했어요.</p>
    <nav class="rk-sub" aria-label="마라톤 랭킹 메뉴">${RANK_SECS.map(([id, n]) => `<button onclick="document.getElementById('${id}').scrollIntoView({behavior:'smooth',block:'start'})">${n}</button>`).join('')}</nav>

    <section id="rk-wr" class="rk-sec">
      <h2 class="h2">세계 신기록 <small>${RANK_ASOF} 기준</small></h2>
      <div class="rk-wr">
        ${[['남자', wm, 'sawe', '#16a34a'], ['여자', ww, 'chepngetich', '#ca8a04']].map(([g, r, ph, c]) => `<article class="rk-wrc" style="--wc:${c}">
          <figure><img src="${photoSrc(ph)}" alt="${esc(r[2])}" loading="lazy">${credit(ph)}</figure>
          <div class="rk-wrt"><span class="rk-g">${g} 세계기록</span>
            <b class="rk-time">${cnt(toSec(r[1]), 'time')}</b>
            <span class="rk-wn">${r[2]} <small>${r[3]}</small></span>
            <span class="rk-wm">${r[4]} 마라톤 · ${r[0]}년 · 1km ${Math.floor(toSec(r[1]) / 42.195 / 60)}분 ${String(Math.round(toSec(r[1]) / 42.195 % 60)).padStart(2, '0')}초 페이스</span></div></article>`).join('')}
      </div>
      <div class="panel wide"><h3>세계기록 변천 <small>1999년 이후</small></h3>
        <div class="rk-toggle sm">${[['men', '남자'], ['women', '여자']].map(([k, n]) => `<button class="${k === 'men' ? 'on' : ''}" onclick="[...this.parentNode.children].forEach(b=>b.classList.toggle('on',b===this));rankWRChart('${k}')">${n}</button>`).join('')}</div>
        <div class="cbox"><canvas id="cwrp"></canvas></div>
        <p class="note">점마다 새 세계기록이에요 · 남자 기록은 27년 동안 6분 12초 빨라졌어요</p></div>
    </section>

    <section id="rk-top" class="rk-sec">
      <h2 class="h2">역대 TOP 20</h2>
      <div id="rk-top20">${rankTop20()}</div>
    </section>

    <section id="rk-nat" class="rk-sec">
      <h2 class="h2">국가별 세계랭킹</h2>
      <div class="rk-grid2">
        <div class="panel"><h3>남자 세계랭킹 TOP 10 <small>World Athletics · ${WA_RANK.asOf}</small></h3>
          <ol class="rk-wa">${WA_RANK.men.map(([r, n, c, p], i) => `<li style="--i:${i}"><span class="rk-no">${r}</span><b>${n}</b><span class="rk-nat" style="--nc:${NAT_COL[c] || '#64748b'}">${c}</span><em>${p.toLocaleString()}점</em></li>`).join('')}</ol>
          <p class="note">아시아 최고: ${WA_RANK.asia.filter(a => a[1]).map(([c, r, n]) => `${n}(${c}) ${r}위`).join(' · ')} · 한국은 상위 600위 밖</p></div>
        <div class="panel"><h3>역대 TOP 100 국적 <small>몇 명이 어느 나라 출신일까?</small></h3>
          <h4 class="rk-h4">남자</h4>${rankNat('men')}<h4 class="rk-h4">여자</h4>${rankNat('women')}
          <p class="note">케냐·에티오피아 두 나라가 남자 85명, 여자 84명 — 역대 100명 중 85%예요</p></div>
      </div>
      <div class="rk-grid2">
        <div class="panel"><h3>국가별 남자 최고 기록</h3><div class="hbars grow">${NAT_REC.map((r, i) => { const base = toSec('2:12:00'), w = (base - toSec(r[1])) / (base - toSec(NAT_REC[0][1])) * 100;
          return `<div class="hb" style="--i:${i}"><span class="hl">${r[0]}</span><div class="ht"><i style="width:${Math.max(4, w)}%;background:${r[3]}"></i></div><span class="hv">${r[1]}</span><span class="hn">${NAT_REC_WHO[r[0]].split(' · ')[0]}</span></div>`; }).join('')}</div>
          <p class="note">막대가 길수록 빠른 기록이에요 (2:12:00 기준)</p></div>
        <div class="panel"><h3>올림픽 남자 마라톤 금메달 <small>1896~2024</small></h3>${hbars(OLY_GOLD.slice(0, 10).map(([c, n, note]) => [c, n, c === '한국' ? '#e11d48' : '#f5a300', note || '']), 5, '개')}</div>
      </div>
    </section>

    <section id="rk-hall" class="rk-sec">
      <h2 class="h2">명예의 전당 <small>마라톤 역사를 바꾼 12명</small></h2>
      <div class="rk-hall">${HALL.map(([n, c, ph, rec, d], i) => `<article class="rk-hc" style="--i:${i}">
        <figure><img src="${photoSrc(ph)}" alt="${esc(n)}" loading="lazy"><span class="rk-hn">${c}</span>${credit(ph)}</figure>
        <div><b>${n}</b><span class="rk-hr">${rec}</span><p>${d}</p></div></article>`).join('')}</div>
    </section>

    <section id="rk-kr" class="rk-sec">
      <h2 class="h2">대한민국 기록</h2>
      <div class="rk-kr">
        ${[['남자 한국기록', kr, 'leebj2', WR_PROG.men], ['여자 한국기록', krw, 'seoul_mar5', WR_PROG.women]].map(([g, r, ph, W]) => { const wr = toSec(W[W.length - 1][1]), s = toSec(r[0]), behind = 42.195 * (1 - wr / s);
          return `<article class="rk-krc"><figure><img src="${photoSrc(ph)}" alt="" loading="lazy">${credit(ph)}</figure>
            <div><span class="rk-g">${g}</span><b class="rk-time">${cnt(s, 'time')}</b><span class="rk-wn">${r[1]} <small>${r[2]} · ${r[3]}</small></span>
            <span class="rk-gap">세계기록과 <b>${Math.floor((s - wr) / 60)}분 ${(s - wr) % 60}초</b> 차이 · 세계기록 보유자가 결승할 때 <b>${behind.toFixed(2)}km</b> 뒤</span></div></article>`; }).join('')}
      </div>
      <div class="rk-grid2">
        <div class="panel"><h3>남자 역대 주요 기록</h3><ol class="rk-krl">${KR_REC.men.map(([t, n, y, w, note], i) => `<li style="--i:${i}"><span class="rk-no">${i + 1}</span><b>${t}</b><span>${n}<small>${y} · ${w}</small></span><em>${note}</em></li>`).join('')}</ol></div>
        <div class="panel"><h3>여자 역대 주요 기록</h3><ol class="rk-krl">${KR_REC.women.map(([t, n, y, w, note], i) => `<li style="--i:${i}"><span class="rk-no">${i + 1}</span><b>${t}</b><span>${n}<small>${y} · ${w}</small></span><em>${note}</em></li>`).join('')}</ol>
          <h4 class="rk-h4">아시아 여자 국가기록 비교</h4><div class="hbars grow">${NAT_REC.filter(r => ['일본', '중국', '한국'].includes(r[0])).map((r, i) => { const base = toSec('2:30:00'), w = (base - toSec(r[2])) / (base - toSec('2:18:00')) * 100;
            return `<div class="hb" style="--i:${i}"><span class="hl">${r[0]}</span><div class="ht"><i style="width:${Math.max(4, w)}%;background:${r[3]}"></i></div><span class="hv">${r[2]}</span><span class="hn">${NAT_REC_WHO[r[0]].split(' · ')[1]}</span></div>`; }).join('')}</div>
          <p class="note">한국 여자 마라톤은 2018년 이후 2시간 25분대 기록이 다시 나오지 않았어요</p></div>
      </div>
      <div class="panel wide"><h3>국가기록 보유자들이 함께 뛴다면? (남자)</h3><p class="note">세계기록 보유자가 결승선에 들어오는 순간의 위치예요</p>${raceViz('m')}</div>
    </section>

    <section id="rk-un" class="rk-sec">
      <h2 class="h2">비공식 기록은 왜 인정되지 않을까?</h2>
      <div class="rk-un">${UNOFFICIAL.map(u => `<article class="rk-uc">
        ${u.photo ? `<figure><img src="${photoSrc(u.photo)}" alt="" loading="lazy">${credit(u.photo)}</figure>` : `<figure class="noph"><span>2:00:25</span></figure>`}
        <div><span class="rk-stamp">비공인</span><b class="rk-ut">${u.t}</b><span class="rk-wn">${u.who} <small>${u.where}</small></span>
          <ul>${u.why.map(w => `<li>✕ ${w}</li>`).join('')}</ul></div></article>`).join('')}</div>
      <div class="panel wide"><h3>세계기록으로 인정받으려면 <small>World Athletics 공인 조건</small></h3>
        <div class="rk-rules">${RECORD_RULES.map(([ic, k, v], i) => `<div style="--i:${i}"><span>${ic}</span><b>${k}</b><p>${v}</p></div>`).join('')}</div>
        <p class="note">여자 기록은 남녀가 함께 뛴 대회 기록과 여자만 뛴 대회(여자 단독) 기록을 따로 인정해요 · 여자 단독 세계기록은 티지스트 아세파 2:15:50 (2025 런던)</p></div>
    </section>
    <p class="note" style="margin-top:14px">출처: World Athletics 역대 순위·세계랭킹·세계기록 (${RANK_ASOF} 조회) · 대한육상연맹·언론 보도 · 사진: 위키미디어 공용 자유 라이선스</p>`;
  rankWRChart('men');
  motion();
}
function rankNat(sex) {
  const rows = TOP100_NAT[sex], max = rows[0][1];
  return hbars(rows.map(([c, n]) => [NAT_KO[c] ? NAT_KO[c][0] : c, n, NAT_KO[c] ? NAT_KO[c][1] : '#64748b']), max, '명');
}
function rankWRChart(sex) {
  const W = WR_PROG[sex], col = sex === 'men' ? '#16a34a' : '#ca8a04';
  charts.filter(c => c.canvas && c.canvas.id === 'cwrp').forEach(c => c.destroy());
  charts.push(new Chart($('#cwrp'), { type: 'line', data: { datasets: [{ data: W.map(([y, t, n, c, w]) => ({ x: y, y: toSec(t), n, c, w, t })), borderColor: col, backgroundColor: col + '33', fill: true, stepped: 'before', pointRadius: 6, pointHoverRadius: 9, pointBackgroundColor: col, borderWidth: 3 }] },
    options: { maintainAspectRatio: false, animation: { duration: REDUCED ? 0 : 1600 },
      scales: { x: { type: 'linear', min: 1998, max: 2027, ticks: { stepSize: 4, callback: v => v }, grid: { display: false } }, y: { reverse: false, ticks: { callback: v => fmtSec(v) }, grid: { color: tok('--line') } } },
      plugins: { legend: { display: false }, tooltip: { callbacks: { title: i => i[0].raw.x + '년 ' + i[0].raw.w, label: i => ` ${i.raw.t} · ${i.raw.n} (${i.raw.c})` } } } } }));
}

/* ---------- 마라톤의 역사 ---------- */
const MAR_SUBS = [['', '마라톤의 역사', '#b45309', 'photo:merson'], ['powers', '마라톤 강대국', '#16a34a', 'flag:ke'], ['korea', '무너진 한국', '#2563eb', 'flag:kr'], ['china', '떠오르는 중국', '#dc2626', 'flag:cn'], ['japan', '과학의 일본', '#7c3aed', 'flag:jp']];
function marMenu(cur) {
  return `<nav class="martabs" aria-label="마라톤의 역사 메뉴">${MAR_SUBS.map(([k, n, c, img]) => { const [t, v] = img.split(':');
    return `<button class="mt ${k === cur ? 'on' : ''}" style="--mc:${c}" onclick="go('${k ? 'marathon-' + k : 'marathon'}')"><span class="mt-img ${t}"><img src="${t === 'flag' ? 'flags/' + v + '.svg' : photoSrc(v)}" alt=""></span><b>${n}</b></button>`; }).join('')}</nav>`;
}
/* 시간대 띠 — 사건 포인트가 서서히 빛남 */
function eraRibbon(evs) {
  return `<div class="ribbon" aria-label="마라톤 시간대">${MAR_ERAS.map(([a, z, n, c]) => { const inEra = evs.map((e, i) => [e, i]).filter(([e]) => e[1] >= a && e[1] <= z);
    return `<div class="rb-seg" style="--rc:${c};flex-grow:${inEra.length + 1.5};min-width:${Math.max(120, inEra.length * 52)}px">
      <div class="rb-head"><b>${n}</b><span>${a < 0 ? 'BC ' + (-a) : a}–${z === 2026 ? '현재' : z}</span></div>
      <div class="rb-line">${inEra.map(([e, i], j) => `<button class="rb-dot ${j % 2 ? 'lo' : 'hi'}" style="left:${(j + .5) / inEra.length * 100}%;--d:${(i % 8) * .35}s" title="${e[0]} ${esc(e[2])}" onclick="jumpTo('me-${i}')"><i></i><span>${e[0]}</span></button>`).join('')}</div></div>`; }).join('')}</div>
    <p class="note" style="margin:6px 0 14px">빛나는 점이 사건이에요 · 누르면 아래 사진 카드로 이동해요</p>`;
}
/* 아시아 3국 국가기록 변천 */
function asiaChart(id) {
  const col = { '일본': '#7c3aed', '중국': '#dc2626', '한국': '#2563eb' };
  charts.push(new Chart($(id), { type: 'line', data: { datasets: Object.entries(ASIA_REC).map(([n, arr]) => ({ label: n, data: [...arr.map(([y, t, p]) => ({ x: y, y: toSec(t), p })), { x: 2026.9, y: toSec(arr[arr.length - 1][1]), p: '현재' }], borderColor: col[n], backgroundColor: col[n], stepped: 'before', pointRadius: c => c.dataIndex === c.dataset.data.length - 1 ? 0 : 5, borderWidth: 3 })) },
    options: { maintainAspectRatio: false, animation: { duration: REDUCED ? 0 : 1800 }, scales: { x: { type: 'linear', min: 2000, max: 2027, ticks: { callback: v => Math.floor(v), stepSize: 2 }, grid: { display: false } }, y: { min: toSec('2:04:30'), max: toSec('2:08:30'), ticks: { callback: v => fmtSec(v), stepSize: 30 }, grid: { color: tok('--line') } } },
      plugins: { legend: { position: 'top', align: 'end', labels: { boxWidth: 12 } }, tooltip: { callbacks: { title: i => i[0].raw.p === '현재' ? '2026년 현재' : Math.floor(i[0].raw.x) + '년', label: i => ` ${i.dataset.label} ${fmtSec(i.raw.y)} ${i.raw.p === '현재' ? '' : '— ' + i.raw.p}` } } } } }));
}
function hbars(rows, max, unit = '') {
  // rows: [라벨, 값, 색, 보조문구]
  return `<div class="hbars grow">${rows.map(([l, v, c, note], i) => `<div class="hb" style="--i:${i}">
    <span class="hl">${l}</span><div class="ht"><i style="width:${Math.max(2, v / max * 100)}%;background:${c}"></i></div>
    <span class="hv">${typeof v === 'number' ? v.toLocaleString() : v}${unit}</span>${note ? `<span class="hn">${note}</span>` : ''}</div>`).join('')}</div>`;
}
function raceViz(sex) {
  // 1위가 결승선에 들어오는 순간 각국 기록 보유자의 위치
  const idx = sex === 'm' ? 1 : 2, lead = toSec(NAT_REC[0][idx]);
  return `<div class="race" aria-label="국가 기록 보유자가 함께 뛰었을 때의 위치">
    <div class="track-lines"><span>0km</span><span>10km</span><span>21.1km</span><span>30km</span><span>결승 42.195km</span></div>
    ${NAT_REC.map(r => { const t = toSec(r[idx]), pos = lead / t * 100, gap = 42.195 * (1 - lead / t);
      return `<div class="lane"><span class="ln">${r[0]} <small>${r[idx]}</small></span>
        <div class="lt"><i class="runner" style="--to:${pos}%;background:${r[3]}"></i></div>
        <span class="lg">${gap < 0.005 ? '결승' : `−${gap < 1 ? Math.round(gap * 1000) + 'm' : gap.toFixed(2) + 'km'}`}</span></div>`; }).join('')}
  </div>`;
}

function viewMarathon(sub) {
  if (sub === 'powers') return viewMarPowers();
  if (sub === 'korea') return viewMarKorea();
  if (sub === 'china') return viewMarChina();
  if (sub === 'japan') return viewMarJapan();
  const evs = [...MAR_EVENTS].sort((a, z) => a[1] - z[1]);
  app.innerHTML = `
    <section class="mhero2">
      <div class="mh-copy">
        <span class="eyebrow">MARATHON · BC 490 → 2026</span>
        <h1>전령의 전설에서<br><em>113만 명이 신청하는 축제</em>까지</h1>
        <p>마라톤이 어떻게 시작됐고, 어떻게 세계적인 메이저 스포츠가 됐는지 기록과 숫자로 따라가 봐요.</p>
      </div>
      <div class="mh-stats">
        <div><b>${cnt(42.195, 'dec3')}<small>km</small></b><span>마라톤 공식 거리</span></div>
        <div><b>1896<small>년</small></b><span>첫 올림픽 마라톤 (아테네)</span></div>
        <div><b>${cnt(1133813)}<small>명</small></b><span>2026 런던 신청자</span></div>
        <div><b>${cnt(7170, 'time')}</b><span>남자 세계기록 (2026)</span></div>
      </div>
      
    </section>
    ${marMenu('')}

    <h2 class="h2">1. 전설의 시작 — 마라톤 전투</h2>
    <div class="legend-grid">
      <figure class="lg-photo pop"><img src="${photoSrc('merson')}" alt="뤽올리비에 메르송, 마라톤의 병사" loading="lazy"><figcaption>뤽올리비에 메르송 「마라톤의 병사」 (1869) · ${credit('merson')}</figcaption></figure>
      <div class="panel draw">
        <h3>두 개의 전설, 두 개의 거리</h3><p class="note">고대 그리스 지명 위치는 단순화한 그림이에요</p>
        <svg viewBox="0 0 420 300" class="map" role="img" aria-label="마라톤에서 아테네, 아테네에서 스파르타까지의 경로">
          <path d="M60 40 C 140 60, 200 120, 250 120 L 330 90 L 380 140 C 360 200, 300 230, 230 250 L 140 270 L 60 230 Z" fill="var(--soft)"/>
          <path class="d" d="M330 92 C 300 100, 275 110, 250 122" stroke="#f27100" stroke-width="5" fill="none" stroke-linecap="round"/>
          <path class="d" d="M250 122 C 220 160, 180 200, 150 262" stroke="#2563eb" stroke-width="4" fill="none" stroke-dasharray="1 0" stroke-linecap="round"/>
          <circle cx="330" cy="92" r="7" fill="#f27100"/><text x="340" y="84" class="mt">마라톤</text>
          <circle cx="250" cy="122" r="7" fill="var(--ink)"/><text x="196" y="112" class="mt">아테네</text>
          <circle cx="150" cy="262" r="7" fill="#2563eb"/><text x="160" y="284" class="mt">스파르타</text>
          <text x="300" y="136" class="ms" fill="#f27100">약 40km</text><text x="200" y="210" class="ms" fill="#2563eb">약 240km</text>
        </svg>
        <div class="legend2">
          <p><b style="color:#f27100">마라톤 → 아테네 (약 40km)</b> 승전보를 전하고 숨졌다는 전령 이야기. 수백 년 뒤 플루타르코스 등의 기록에 등장하고, 1879년 로버트 브라우닝의 시로 널리 알려졌어요.</p>
          <p><b style="color:#2563eb">아테네 → 스파르타 (약 240km)</b> 역사가 헤로도토스가 기록한 전령 페이디피데스의 이야기. 지금의 246km 울트라 대회 '스파르타슬론'의 바탕이에요.</p>
        </div>
      </div>
    </div>

    <h2 class="h2">2. 42.195km가 되기까지</h2>
    <div class="cgrid">
      <div class="panel"><h3>올림픽 마라톤 거리 변화 (km)</h3><p class="note">초기 올림픽은 대회마다 거리가 달랐어요</p>
        ${hbars(OLY_DIST.map(([y, d]) => [y + '년', d, d === 42.195 ? '#f27100' : 'var(--sub)']), 43, 'km')}</div>
      <div class="panel story">
        <span class="big-num">${cnt(195, 'int', '+', 'm')}</span>
        <h3>왜 하필 195m가 더 붙었을까?</h3>
        <p>1908년 런던 올림픽 조직위는 윈저성 앞에서 출발해, 화이트시티 경기장의 왕실 관람석 앞에서 끝나도록 코스를 짰어요. 그렇게 정해진 26마일 385야드가 바로 <b>42.195km</b>예요.</p>
        <p>이 대회에서 선두로 경기장에 들어온 이탈리아의 도란도 피에트리는 결승선 앞에서 여러 번 쓰러졌고, 심판의 부축을 받아 들어와 실격됐어요. 이 장면이 세계적인 화제가 되면서 1908년 거리가 상징처럼 남았고, 1921년 공식 거리가 됐어요.</p>
        <figure class="mini"><img src="${photoSrc('pietri')}" alt="1908년 도란도 피에트리" loading="lazy"><figcaption>1908 런던, 결승선 앞 피에트리 · ${credit('pietri')}</figcaption></figure>
      </div>
    </div>

    <h2 class="h2">3. 마라톤 타임라인</h2>
    <div class="theme-legend">${Object.values(MAR_THEME).map(([n, c]) => `<span><i style="background:${c}"></i>${n}</span>`).join('')}</div>
    ${photoTimeline(evs.map((e, i) => [e[0], e[2], e[4], MAR_THEME[e[5]][1], 'me-' + i]), 'jumpTo')}
    <h2 class="h2">시간대별로 보기</h2>
    ${eraRibbon(evs)}
    <div class="ev-grid">${evs.map((e, i) => `<article class="evc" id="me-${i}">
      ${e[4] ? `<div class="ph"><img src="${photoSrc(e[4])}" alt="${esc(e[2])}" loading="lazy"></div>` : `<div class="ph none" style="--ec:${MAR_THEME[e[5]][1]}"><span>${e[0]}</span></div>`}
      <div class="eb"><span class="ey" style="color:${MAR_THEME[e[5]][1]}">${e[0]}</span><h4>${esc(e[2])}</h4><p>${esc(e[3])}</p>${e[4] ? credit(e[4]) : ''}</div></article>`).join('')}</div>

    <h2 class="h2">4. 세계 기록 Top 10 · 세계랭킹 <small class="asof">2026년 11월 기준</small></h2>
    <div class="cgrid">
      ${['men', 'women'].map(sx => { const L = ALLTIME[sx], best = toSec(L[0][0]);
        return `<div class="panel"><h3>역대 ${sx === 'men' ? '남자' : '여자'} 기록 Top 10</h3><p class="note">선수별 최고 기록 · World Athletics 역대 순위</p>
        <ol class="top10 grow">${L.map(([t, n, c, y, r], i) => `<li style="--i:${i}"><span class="tn">${i + 1}</span><b class="tt">${t}</b><span class="tw"><b>${n}</b><small><i style="background:${NAT_COL[c] || 'var(--sub)'}"></i>${c} · ${y} ${r}</small></span><span class="tg">${i ? '+' + (toSec(t) - best) + '초' : 'WR'}</span></li>`).join('')}</ol></div>`; }).join('')}
      <div class="panel wide"><h3>World Athletics 남자 마라톤 세계랭킹 Top 10</h3><p class="note">${WA_RANK.asOf} 기준 · 최근 대회 성적을 점수로 환산한 공식 랭킹 · <a href="https://worldathletics.org/world-rankings/marathon/women" target="_blank" rel="noopener">여자 랭킹 보기 ↗</a></p>
        <div class="wa grow">${WA_RANK.men.map(([r, n, c, p], i) => `<div class="wa-r" style="--i:${i}"><span class="tn">${r}</span><span class="wa-n"><b>${n}</b><small><i style="background:${NAT_COL[c] || 'var(--sub)'}"></i>${c}</small></span><div class="ht"><i style="width:${(p - 1200) / (1441 - 1200) * 100}%;background:${NAT_COL[c] || 'var(--sub)'}"></i></div><b class="wa-p">${p}</b></div>`).join('')}</div>
        <div class="asia-rank">${WA_RANK.asia.map(([c, r, n]) => `<div class="ar ${r ? '' : 'none'}"><span>${c}</span><b>${r ? r + '위' : '—'}</b><small>${n}</small></div>`).join('')}</div></div>
    </div>

    <h2 class="h2">5. 세계 메이저 마라톤 — 4대에서 8대로</h2>
    <p class="sec-sub">"세계 4대 마라톤"은 오래되고 규모가 큰 보스턴·런던·베를린·뉴욕을 묶어 부르던 옛 표현이에요. 2006년 이 대회들이 시카고와 함께 공식 시리즈 '월드 마라톤 메이저(WMM)'를 만들면서, 여러 해 동안 운영 심사를 통과한 대회만 새로 합류할 수 있게 됐어요. 그렇게 도쿄(2013)·시드니(2025)가 들어와 지금은 7개, 케이프타운이 8번째 후보예요.</p>
    <div class="maj-evo grow">${WMM_STEPS.slice(1).map(([y, t, d, c]) => `<div style="--c:${c}"><b>${y}</b><strong>${t}</strong><p>${d}</p></div>`).join('')}</div>
    <h3 class="rk-h4" style="font-size:15px;color:var(--ink);margin:4px 0 10px">전통의 4대 마라톤 자세히 보기</h3>
    <div class="w4">${WORLD4.map((m, i) => `<article class="w4c pop" style="--i:${i};--wc:${m.col}">
      <div class="w4-ph"><img src="${photoSrc(m.photo)}" alt="" loading="lazy"><div class="w4-t"><b>${m.city}</b><span>${m.en} · ${m.year}년 창설 · ${m.month}</span></div></div>
      <div class="w4-b"><h4>왜 메이저 대회가 되었나?</h4><ul>${m.why.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        <h4>참가 방법</h4><ol class="steps">${m.how.map(x => `<li>${esc(x)}</li>`).join('')}</ol>
        <a class="btn ghost" href="${m.url}" target="_blank" rel="noopener">공식 홈페이지 ↗</a>${credit(m.photo)}</div></article>`).join('')}</div>
    <p class="note" style="margin-top:10px">참가 요강은 매년 바뀌어요. 한국 러너는 주로 공인 여행사 패키지나 기록 기준으로 출전하니, 신청 전 공식 홈페이지를 꼭 확인하세요.</p>

    <h2 class="h2">6. 메이저 스포츠로의 성장</h2>
    <div class="cgrid">
      <div class="panel wide"><h3>런던 마라톤 신청자 vs 완주자</h3><p class="note">신청자는 45년 동안 약 57배 늘었어요 · 출처: 런던 마라톤 대회별 기록 (2020~2021년은 코로나로 제외)</p>
        <div class="cbox tall"><canvas id="clon"></canvas></div></div>
      <div class="panel"><h3>뉴욕 시티 마라톤 완주자</h3><p class="note">작은 동네 대회가 세계 최대 대회로</p>
        ${hbars([['1970', 55, '#94a3b8'], ['1976', 1549, '#64748b'], ['1997', 30427, '#f59e0b'], ['2025', 59135, '#f27100']], 59135, '명')}</div>
      <div class="panel"><h3>월드 마라톤 메이저 8개 대회</h3><p class="note">창설 연도순 · 2006년 5개 대회로 출범</p>
        <div class="majors">${MAJORS.map(([c, y, n], i) => `<div class="mj pop" style="--i:${i}"><b>${y}</b><span>${c}</span><small>${n}</small></div>`).join('')}</div></div>
    </div>

    <h2 class="h2">7. 마라톤이 메이저 스포츠가 된 6가지 이유</h2>
    <div class="why-grid">${[
      ['조깅 붐', '1970년대 미국에서 시작된 달리기 열풍이 전 세계로 퍼졌어요.', 'rodgers'],
      ['여성에게 열린 문', '1972년 보스턴, 1984년 올림픽 여자 마라톤으로 여성 참가가 열리며 참가자가 크게 늘었어요.', 'benoit'],
      ['도시 축제', '도시의 명소를 달리는 코스가 관광과 축제가 됐어요.', 'london'],
      ['자선과 기부', '런던 마라톤은 세계 최대 규모의 1일 자선 모금 행사로 꼽혀요.', 'nyc'],
      ['기록과 스타', '2시간 벽 도전과 킵초게 같은 스타가 전 세계 관심을 모았어요.', 'kipchoge'],
      ['장비와 SNS', '슈퍼슈즈, 스마트워치, 완주 인증이 달리기를 더 즐겁게 만들었어요.', 'tokyomar'],
    ].map(([t, d, ph], i) => `<article class="why pop" style="--i:${i}"><div class="wimg"><img src="${photoSrc(ph)}" alt="" loading="lazy"><span>${i + 1}</span></div><div class="eb"><h4>${t}</h4><p>${d}</p>${credit(ph)}</div></article>`).join('')}</div>

    <h2 class="h2">마라톤 역사 영상</h2>
    <div class="vgrid">${MAR_VIDEOS.hist.map(v => vidCard(...v)).join('')}</div>`;
  if (chartBase()) {
    charts.push(new Chart($('#clon'), { type: 'line', data: { labels: LONDON.map(r => r[0]), datasets: [
      { label: '신청자', data: LONDON.map(r => r[1]), borderColor: '#f27100', backgroundColor: '#f2710033', fill: true, tension: .3, yAxisID: 'y', pointRadius: 3 },
      { label: '완주자', data: LONDON.map(r => r[2]), borderColor: tok('--info'), backgroundColor: tok('--info'), tension: .3, yAxisID: 'y2', pointRadius: 3, spanGaps: true }] },
      options: { maintainAspectRatio: false, animation: { duration: REDUCED ? 0 : 1800 }, interaction: { mode: 'index', intersect: false },
        plugins: { tooltip: { callbacks: { label: c => ` ${c.dataset.label} ${c.raw == null ? '-' : c.raw.toLocaleString()}명` } } },
        scales: { y: { position: 'left', ticks: { callback: v => (v / 10000) + '만' }, grid: { color: tok('--line') }, title: { display: true, text: '신청자' } },
          y2: { position: 'right', grid: { display: false }, ticks: { callback: v => (v / 10000) + '만' }, title: { display: true, text: '완주자' } }, x: { grid: { display: false } } } } }));
  }
  motion();
}

function viewMarPowers() {
  app.innerHTML = `
    <section class="mhero2 green">
      <div class="mh-copy"><span class="eyebrow">MARATHON POWERS</span>
        <h1>역대 최고 기록 50개 중<br><em>46개가 케냐·에티오피아</em></h1>
        <p>남녀 역대 상위 25명씩, 50명 가운데 46명이 동아프리카 두 나라 출신이에요. 강대국은 어떤 유형이 있고, 왜 강해졌을까요?</p></div>
      <div class="mh-stats">
        <div><b>${cnt(92, 'int', '', '%')}</b><span>역대 상위 50명 중 케냐·에티오피아</span></div>
        <div><b>${cnt(8)}</b><span>올림픽 남자 마라톤 금메달 (두 나라 합계)</span></div>
        <div><b>${cnt(2400, 'int', '', 'm')}</b><span>케냐 이텐 해발 고도</span></div>
        <div><b>${cnt(11)}<small>초</small></b><span>세계 1·2위 국가기록 차이</span></div>
      </div>
    </section>
    ${marMenu('powers')}

    <h2 class="h2">1. 숫자로 보는 압도적 격차</h2>
    <div class="cgrid">
      <div class="panel"><h3>역대 상위 25명 국적 — 남자</h3><p class="note">World Athletics 역대 순위 (선수 기준)</p><div class="cbox"><canvas id="ctm"></canvas></div></div>
      <div class="panel"><h3>역대 상위 25명 국적 — 여자</h3><p class="note">World Athletics 역대 순위 (선수 기준)</p><div class="cbox"><canvas id="ctw"></canvas></div></div>
      <div class="panel wide"><h3>국가기록 보유자들이 함께 뛴다면?</h3>
        <p class="note">남자 세계기록 보유자가 결승선에 들어오는 순간, 각 나라 기록 보유자의 위치예요 (같은 속도로 달렸다고 가정)</p>
        ${raceViz('m')}
        <p class="note" style="margin-top:14px">여자 기준</p>${raceViz('w')}</div>
      <div class="panel wide"><h3>올림픽 남자 마라톤 금메달 국가 (1896~2024)</h3><p class="note">30회 대회 기준</p>
        ${hbars(OLY_GOLD.map(([n, v, note]) => [n, v, n === '에티오피아' || n === '케냐' ? '#16a34a' : n === '한국' ? '#e11d48' : 'var(--sub)', note]), 5, '개')}</div>
    </div>

    <h2 class="h2">2. 마라톤 강대국의 4가지 유형</h2>
    <div class="types">${POWER_TYPES.map((t, i) => `<article class="type pop" style="--i:${i};--tc:${t.col}">
      ${t.photo ? `<div class="tph"><img src="${photoSrc(t.photo)}" alt="" loading="lazy"></div>` : `<div class="tph none"><span>${i + 1}</span></div>`}
      <div class="tb2"><span class="tk">유형 ${i + 1}</span><h3>${t.name}</h3><p class="who">${t.who}</p>
        <ul>${t.pts.map(p => `<li>${esc(p)}</li>`).join('')}</ul>${t.photo ? credit(t.photo) : ''}</div></article>`).join('')}</div>

    <h2 class="h2">3. 동아프리카는 왜 강해졌을까?</h2>
    <div class="cgrid">
      <div class="panel"><h3>주요 훈련지의 해발 고도</h3><p class="note">높은 곳에서 살수록 산소 운반 능력이 좋아져요</p>
        <div class="alt grow">${ALTITUDE.map(([n, h, c], i) => `<div class="ab" style="--i:${i}"><span class="av">${h.toLocaleString()}m</span><div class="abar"><i style="height:${Math.max(2, h / 2400 * 100)}%;background:${c}"></i></div><span class="an">${n}</span></div>`).join('')}</div></div>
      <div class="panel"><h3>6가지 핵심 요인</h3><p class="note">연구와 현지 취재에서 공통으로 꼽히는 요인이에요</p>
        <div class="factors">${WHY_AFRICA.map(([ic, t, d], i) => `<div class="fc pop" style="--i:${i}"><span class="fn">${i + 1}</span><div><b>${t}</b><p>${d}</p></div></div>`).join('')}</div></div>
    </div>

    <h2 class="h2">4. 일본 — 시스템으로 만든 강대국</h2>
    <div class="legend-grid">
      <figure class="lg-photo pop"><img src="${photoSrc('hakone')}" alt="하코네 에키덴" loading="lazy"><figcaption>하코네 에키덴 2026 · ${credit('hakone')}</figcaption></figure>
      <div class="panel">
        <h3>에키덴 → 대학 → 실업팀, 끊기지 않는 사다리</h3>
        <div class="ladder">${[['고교 에키덴', '전국 고교 역전 경주로 어릴 때부터 장거리 경쟁'], ['하코네 에키덴', '1월 2~3일 대학 10개 구간 릴레이. 정월 최고 인기 스포츠 중계'], ['실업팀 (뉴이어 에키덴)', '기업팀이 선수 생활을 지원하고 1월 1일 실업 에키덴으로 경쟁'], ['마라톤 국가대표', '두꺼운 선수층에서 2시간 4~6분대 선수 배출']].map(([t, d], i) => `<div class="rung pop" style="--i:${i}"><span>${i + 1}</span><div><b>${t}</b><p>${d}</p></div></div>`).join('')}</div>
        <p class="note">일본 기록 2:04:55 (오사코 스구루, 2025) · 한국 기록보다 2분 25초 빨라요</p>
      </div>
    </div>

    <h2 class="h2">5. 강대국들의 특징 한눈에 보기</h2>
    <div class="panel tbl-wrap"><table class="tbl">
      <thead><tr><th>국가</th><th>유형</th><th>강점</th><th>남자 기록</th><th>여자 기록</th></tr></thead>
      <tbody>${[['케냐', '고지대 천재형', '압도적 선수층, 이텐 훈련 캠프', 0], ['에티오피아', '고지대 천재형', '아디스아바바 고지대, 여자 최강', 1], ['미국', '과학·자본형', '스포츠과학, 프로 트레이닝 그룹', 2], ['일본', '시스템·저변형', '에키덴·실업팀 육성 사다리', 3], ['중국', '시스템·저변형', '국가 주도 육성, 최근 급성장', 4], ['한국', '—', '최근 시민 러닝 붐', 5]].map(([n, t, s, i]) => `<tr class="${n === '한국' ? 'kr' : ''}"><td><b>${n}</b></td><td>${t}</td><td>${s}</td><td class="num">${NAT_REC[i][1]}</td><td class="num">${NAT_REC[i][2]}</td></tr>`).join('')}</tbody></table>
      <p class="note">기록 보유자: ${NAT_REC.map(r => `${r[0]} ${NAT_REC_WHO[r[0]]}`).join(' · ')}</p></div>

    <h2 class="h2">관련 영상</h2>
    <div class="vgrid">${MAR_VIDEOS.powers.map(v => vidCard(...v)).join('')}</div>`;
  if (chartBase()) {
    const pal = { '케냐': '#16a34a', '에티오피아': '#ca8a04' };
    [['#ctm', TOP25.men], ['#ctw', TOP25.women]].forEach(([id, d]) => charts.push(new Chart($(id), { type: 'doughnut',
      data: { labels: d.map(x => x[0]), datasets: [{ data: d.map(x => x[1]), backgroundColor: d.map(x => pal[x[0]] || tok('--sub')), borderColor: tok('--card'), borderWidth: 2 }] },
      options: { maintainAspectRatio: false, cutout: '60%', animation: { animateRotate: !REDUCED, duration: 1600 }, plugins: { legend: { position: 'right', labels: { boxWidth: 12 } }, tooltip: { callbacks: { label: c => ` ${c.label} ${c.raw}명` } } } } })));
  }
  motion();
}

function viewMarKorea() {
  const kr = toSec('2:07:20'), jp = toSec('2:04:55'), cn = toSec('2:05:58');
  const byMonth = {}; RACES.forEach(r => { const m = r[1].slice(0, 7); if (r[1] >= '2026-11-10') byMonth[m] = (byMonth[m] || 0) + 1; });
  const months = Object.keys(byMonth).sort();
  const kTimeline = [[1935, '손기정 세계기록', 'sohn'], [1936, '손기정 금 · 남승룡 동', 'nam'], [1947, '서윤복 보스턴 세계기록', 'suh'], [1950, '보스턴 1·2·3위 석권', 'boston1968'], [1992, '황영조 바르셀로나 금', 'hwang'], [1996, '이봉주 애틀랜타 은', 'leebj'], [2000, '이봉주 2:07:20 한국기록', 'leebj2'], [2001, '이봉주 보스턴 우승', 'boston_finish'], [2018, '김도연 2:25:41 여자 한국기록', 'seoul_mar5'], [2026, '한국기록 26년째 그대로', 'seoul_mar2']];
  app.innerHTML = `
    <section class="mhero2 kr">
      <div class="mh-copy"><span class="eyebrow">무너진 한국 · KOREA</span>
        <h1>한국 마라톤의 시계는<br><em>2000년에 멈춰 있다</em></h1>
        <p>이봉주의 2:07:20은 26년째 한국기록이에요. 그사이 일본·중국은 한국보다 1~2분 이상 빨라졌어요. 무엇이 달랐고, 이제 무엇을 해야 할까요?</p></div>
      <div class="mh-stats">
        <div><b>${cnt(kr, 'time')}</b><span>한국 남자 기록 (이봉주, 2000)</span></div>
        <div><b>${cnt(26, 'int', '', '년')}</b><span>한국기록이 깨지지 않은 기간</span></div>
        <div><b>${cnt(kr - jp, 'int', '−', '초')}</b><span>일본 기록과의 차이 (2:04:55)</span></div>
        <div><b>${cnt(kr - cn, 'int', '−', '초')}</b><span>중국 기록과의 차이 (2:05:58)</span></div>
      </div>
    </section>
    ${marMenu('korea')}

    <h2 class="h2">1. 한국 마라톤의 영광과 정체</h2>
    ${photoTimeline(kTimeline.map(([y, t, ph], i) => [y, t, ph, y >= 2002 ? '#64748b' : '#e11d48', null]), 'jumpTo')}
    <p class="note tl-cr">타임라인 사진: ${kTimeline.filter(v => v[2] && PHOTOS[v[2]]).map(([y, , ph]) => `${y} ${credit(ph)}`).join(' · ')}</p>
    <div class="cgrid" style="margin-top:16px">
      <div class="panel wide"><h3>국가기록 보유자들이 함께 뛴다면? (남자)</h3><p class="note">결승선까지 남은 거리로 보면 격차가 더 실감 나요</p>${raceViz('m')}</div>
      <div class="panel wide"><h3>아시아 3국 남자 국가기록 변천</h3><p class="note">한국이 2000년에 멈춘 사이 일본은 6번, 중국은 4번 기록을 새로 썼어요 · 출처: 각국 국가기록</p><div class="cbox"><canvas id="casia"></canvas></div></div>
    </div>

    <h2 class="h2">2. 한국은 강대국들과 무엇이 다른가?</h2>
    <div class="panel tbl-wrap"><table class="tbl cmp">
      <thead><tr><th>항목</th>${COMPARE.cols.map(c => `<th>${c}</th>`).join('')}<th>한국의 현실</th></tr></thead>
      <tbody>${COMPARE.rows.map(([n, v, d]) => `<tr><td><b>${n}</b></td>${v.map((x, i) => `<td><span class="dots grow" aria-label="5점 중 ${x}점">${[1, 2, 3, 4, 5].map(k => `<i class="${k <= x ? 'on' : ''} ${i === 2 ? 'kr' : ''}" style="--k:${k}"></i>`).join('')}</span></td>`).join('')}<td class="desc">${d}</td></tr>`).join('')}</tbody></table>
      <p class="note">점수는 공개 자료와 언론 보도를 바탕으로 한 호랑말코의 정성 평가예요 (5점 만점)</p></div>

    <h2 class="h2">3. 황영조·이봉주 이후, 왜 슈퍼스타가 안 나올까?</h2>
    <div class="why-k">${WHY_KOREA.map(([t, d], i) => `<article class="wk pop" style="--i:${i}"><span class="wn">${String(i + 1).padStart(2, '0')}</span><h4>${t}</h4><p>${d}</p></article>`).join('')}</div>

    <h2 class="h2">4. 향후 대응책 로드맵</h2>
    <div class="road">${ROADMAP.map(([t, c, items], i) => `<div class="rd pop" style="--i:${i};--rc:${c}"><div class="rh"><span>${i + 1}</span><b>${t}</b></div><ul>${items.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`).join('<div class="rarr" aria-hidden="true">→</div>')}</div>

    <h2 class="h2">5. 지금의 마라톤 붐, 이렇게 활용하자</h2>
    <div class="cgrid">
      <div class="panel"><h3>러닝 붐을 엘리트로 잇는 깔때기</h3><p class="note">넓은 저변이 좁은 정상을 만든다</p>
        <div class="funnel grow">${FUNNEL.map(([t, d, w], i) => `<div class="fu" style="--w:${w}%;--i:${i}"><b>${t}</b><span>${d}</span></div>`).join('')}</div></div>
      <div class="panel"><h3>다가오는 국내 대회 수 (월별)</h3><p class="note">이 사이트 '대회' 탭에 수집된 ${RACES.filter(r => r[1] >= '2026-11-10').length}개 대회 기준 · 출처: 마라톤온라인</p><div class="cbox"><canvas id="cmon"></canvas></div></div>
    </div>
    <div class="ideas">${BOOM_IDEAS.map(([t, d], i) => `<div class="idea pop" style="--i:${i}"><span>${i + 1}</span><div><b>${t}</b><p>${d}</p></div></div>`).join('')}</div>
    <figure class="lg-photo wide pop" style="margin-top:16px"><img src="${photoSrc('seoulmar')}" alt="서울국제마라톤" loading="lazy"><figcaption>서울국제마라톤 · ${credit('seoulmar')}</figcaption></figure>

    <h2 class="h2">관련 영상</h2>
    <div class="vgrid">${MAR_VIDEOS.korea.map(v => vidCard(...v)).join('')}</div>`;
  if (chartBase()) {
    asiaChart('#casia');
    charts.push(new Chart($('#cmon'), { type: 'bar', data: { labels: months.map(m => `${m.slice(2, 4)}.${+m.slice(5)}월`), datasets: [{ data: months.map(m => byMonth[m]), backgroundColor: months.map(m => m.startsWith('2026') ? '#f27100' : tok('--sub')), borderRadius: 6 }] },
      options: { maintainAspectRatio: false, animation: { duration: REDUCED ? 0 : 1500 }, plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => ` ${c.raw}개 대회` } } }, scales: { y: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: tok('--line') } }, x: { grid: { display: false } } } } }));
  }
  motion();
}

function pillarGrid(arr, col) {
  return `<div class="why-k">${arr.map(([t, d], i) => `<article class="wk pop" style="--i:${i};border-left-color:${col}"><span class="wn" style="color:${col}">${String(i + 1).padStart(2, '0')}</span><h4>${t}</h4><p>${d}</p></article>`).join('')}</div>`;
}
function photoStrip(keys) {
  return `<div class="pstrip">${keys.map(([k, cap]) => `<figure class="pop"><img src="${photoSrc(k)}" alt="${esc(cap)}" loading="lazy"><figcaption><b>${esc(cap)}</b>${credit(k)}</figcaption></figure>`).join('')}</div>`;
}
function viewMarChina() {
  const cn = toSec('2:05:58'), kr = toSec('2:07:20');
  app.innerHTML = `
    <section class="mhero2 cn">
      <div class="mh-copy"><span class="eyebrow"><img class="eflag" src="flags/cn.svg" alt="">떠오르는 중국 · RISING CHINA</span>
        <h1>16년 멈춰 있던 기록을<br><em>3년 만에 네 번 갈아치우다</em></h1>
        <p>2007년 2:08:15에 묶여 있던 중국 남자 마라톤은 2023년부터 무섭게 빨라졌어요. 국가 주도 육성, 폭발한 대회 시장, 자국 브랜드의 기술 경쟁이 함께 움직이고 있어요.</p></div>
      <div class="mh-stats">
        <div><b>${cnt(cn, 'time')}</b><span>중국 남자 기록 (펑페이유, 2026 도쿄)</span></div>
        <div><b>${cnt(4, 'int', '', '번')}</b><span>2023~2026년 국가기록 경신</span></div>
        <div><b>${cnt(88, 'int', '', '위')}</b><span>세계랭킹 중국 최고 순위 (펑페이유)</span></div>
        <div><b>${cnt(kr - cn, 'int', '−', '초')}</b><span>한국 기록보다 빠른 시간</span></div>
      </div>
    </section>
    ${marMenu('china')}

    <h2 class="h2">1. 기록으로 보는 중국의 상승</h2>
    <div class="cgrid">
      <div class="panel wide"><h3>아시아 3국 남자 국가기록 변천</h3><p class="note">중국은 2023년 3월 우시 마라톤을 시작으로 3년 동안 네 번 기록을 새로 썼어요</p><div class="cbox"><canvas id="casia"></canvas></div></div>
    </div>
    ${photoStrip([['hejie', '허제 — 2024년 2:06:57 중국 기록'], ['xiamen', '샤먼 국제마라톤'], ['shanghai', '상하이 국제마라톤']])}

    <h2 class="h2">2. 중국이 떠오른 6가지 이유</h2>
    ${pillarGrid(CHINA.pillars, '#dc2626')}

    <h2 class="h2">3. 기록 뒤의 중국 러닝화</h2>
    <div class="panel"><p style="margin:0 0 12px">중국 엘리트들은 자국 브랜드의 카본화를 신고 기록을 깨고 있어요. 러닝화 찾기에서 중국 브랜드를 볼 수 있어요.</p>
      <div class="chips">${['lining', 'anta', 'xtep', 'd361'].map(k => `<button class="chip" onclick="go('find-${k}')">${blogo(k)}${BRANDS[k].ko} 러닝화 보기</button>`).join('')}</div></div>

    <h2 class="h2">관련 영상</h2>
    <div class="vgrid">${MAR_VIDEOS.china.map(v => vidCard(...v)).join('')}</div>`;
  if (chartBase()) asiaChart('#casia');
  motion();
}
function viewMarJapan() {
  const jp = toSec('2:04:55'), kr = toSec('2:07:20');
  app.innerHTML = `
    <section class="mhero2 jp">
      <div class="mh-copy"><span class="eyebrow"><img class="eflag" src="flags/jp.svg" alt="">과학의 일본 · SCIENCE JAPAN</span>
        <h1>1억 엔 보너스와 데이터로<br><em>2:04:55를 만든 일본</em></h1>
        <p>일본은 에키덴과 실업팀이라는 두꺼운 저변 위에, 기록 보너스·투명한 선발전·스포츠과학을 더해 아시아 최강의 마라톤 국가가 됐어요.</p></div>
      <div class="mh-stats">
        <div><b>${cnt(jp, 'time')}</b><span>일본 남자 기록 (오사코, 2025 발렌시아)</span></div>
        <div><b>${cnt(1, 'int', '', '억 엔')}</b><span>일본 기록 경신 보너스 (프로젝트 EXCEED)</span></div>
        <div><b>${cnt(44, 'int', '', '위')}</b><span>세계랭킹 일본 최고 순위 (아카사키)</span></div>
        <div><b>${cnt(kr - jp, 'int', '−', '초')}</b><span>한국 기록보다 빠른 시간</span></div>
      </div>
    </section>
    ${marMenu('japan')}

    <h2 class="h2">1. 기록으로 보는 일본</h2>
    <div class="cgrid">
      <div class="panel wide"><h3>아시아 3국 남자 국가기록 변천</h3><p class="note">일본은 2018년 이후에만 다섯 번 기록을 새로 썼어요</p><div class="cbox"><canvas id="casia"></canvas></div></div>
    </div>
    ${photoStrip([['shitara', '시타라 유타 — 2018년 2:06:11, 1억 엔 보너스'], ['osako', '오사코 스구루 — 일본 기록 2:04:55'], ['ksuzuki', '스즈키 겐고 — 2021년 2:04:56']])}

    <h2 class="h2">2. 과학과 시스템, 6가지 무기</h2>
    ${pillarGrid(JAPAN.pillars, '#7c3aed')}

    <h2 class="h2">3. 여자 마라톤의 황금기</h2>
    <div class="golds">${JAPAN.golds.map(([y, n, d, ph], i) => `<article class="gold pop" style="--i:${i}"><img src="${photoSrc(ph)}" alt="${n}" loading="lazy"><div><span class="gy">${y}</span><h4>${n}</h4><p>${d}</p>${credit(ph)}</div></article>`).join('')}</div>

    <h2 class="h2">4. 끊기지 않는 육성 사다리</h2>
    <div class="legend-grid">
      <figure class="lg-photo pop"><img src="${photoSrc('hakone')}" alt="하코네 에키덴" loading="lazy"><figcaption>하코네 에키덴 2026 · ${credit('hakone')}</figcaption></figure>
      <div class="panel"><div class="ladder">${[['고교 에키덴', '전국 고교 역전 경주로 어릴 때부터 장거리 경쟁'], ['하코네 에키덴', '1월 2~3일 대학 10개 구간 릴레이, 정월 최고 인기 스포츠 중계'], ['실업팀 (뉴이어 에키덴)', '기업팀이 선수 생활을 지원하고 1월 1일 실업 에키덴으로 경쟁'], ['MGC → 올림픽', '한 번의 선발 레이스로 올림픽 대표를 투명하게 선발']].map(([t, d], i) => `<div class="rung pop" style="--i:${i}"><span style="background:#7c3aed">${i + 1}</span><div><b>${t}</b><p>${d}</p></div></div>`).join('')}</div></div>
    </div>

    <h2 class="h2">관련 영상</h2>
    <div class="vgrid">${MAR_VIDEOS.japan.map(v => vidCard(...v)).join('')}</div>`;
  if (chartBase()) asiaChart('#casia');
  motion();
}

/* ---------- 러닝 팁 ---------- */
const TIP_COL = { '스트레칭': ['#0f766e', '#14b8a6'], '초보': ['#1d4ed8', '#60a5fa'], '10km': ['#7c3aed', '#a78bfa'], '하프': ['#c2410c', '#fb923c'], '풀코스': ['#be123c', '#fb7185'], '서브3': ['#111827', '#f5a300'] };
let tipPage = 1, tipType = '전체';
function views(m) { return m >= 10000 ? (m / 10000).toFixed(1).replace(/\.0$/, '') + '억회' : m >= 1 ? Math.round(m).toLocaleString() + '만회' : Math.round(m * 10000).toLocaleString() + '회'; }
const TIP_IDS = { '정보': 'info', '슬로우 조깅': 'slow', '초보': 'beginner', '10km': '10k', '하프': 'half', '풀코스': 'full', '서브3': 'sub3' };
const TIP_COLOR = { '정보': '#0284c7', '슬로우 조깅': '#0d9488', '초보': '#16a34a', '10km': '#2563eb', '하프': '#ea580c', '풀코스': '#e11d48', '서브3': '#7c3aed' };
let chMore = false;
function channelCard([k, n, h, subs, d], i) {
  return `<a class="ytc ${i < 3 ? 'top' : ''}" href="https://www.youtube.com/${h}" target="_blank" rel="noopener">
    ${i < 3 ? `<span class="ytc-rank">TOP ${i + 1}</span>` : ''}
    <img src="avatars/${k}.jpg" alt="" loading="lazy">
    <span class="ytc-b"><b>${esc(n)}</b><small>${esc(h)} · 구독자 ${subs}만명</small><span>${esc(d)}</span></span>
    <span class="ytc-go">채널 보기 ↗</span></a>`;
}
function tipChips(t) {
  const tabs = Object.keys(TIPS), nTrain = Object.values(TRAIN).reduce((s, v) => s + v.length, 0);
  return `<div class="chips" style="margin:22px 0 12px">${tabs.map(k => `<button class="chip tchip ${k === t ? 'on' : ''}" style="--tc:${TIP_COLOR[k] || '#64748b'}" onclick="tipPage=1;go('tips-'+TIP_IDS['${k}'])">${k} <small>${TIPS[k].length}</small></button>`).join('')}<button class="chip tchip ${t === '훈련법' ? 'on' : ''}" style="--tc:#f5a300" onclick="tipPage=1;go('tips-train')">훈련법 <small>${nTrain}</small></button></div>`;
}
function viewTrain(id) {
  const I = TRAIN_INFO.find(x => x[0] === id), [, name, sub, col, , G] = I, list = TRAIN[id] || [];
  const items = list.filter(v => tipType === '전체' || (tipType === '쇼츠') === (v[2] === 'S')).sort((a, b) => b[3] - a[3]);
  const per = 9, pages = Math.max(1, Math.ceil(items.length / per));
  tipPage = Math.min(Math.max(1, tipPage), pages);
  const top = list.slice().sort((x, z) => z[3] - x[3]).slice(0, 3);
  const chs = chMore ? TIP_CHANNELS : TIP_CHANNELS.slice(0, 3);
  const vurl = (id2, type) => type === 'S' ? 'https://www.youtube.com/shorts/' + id2 : 'https://www.youtube.com/watch?v=' + id2;
  app.innerHTML = `
    <h1 class="sec-title">러닝 팁</h1><p class="sec-sub">대표 러닝 훈련법을 골라 핵심 방법과 조회수가 높은 최신 영상을 확인해 보세요.</p>
    ${tipChips('훈련법')}
    ${trainRail(id)}
    <section class="tg" style="--tc:${col}">
      <div class="tg-guide"><h3>${name} 핵심 가이드 <small>${sub}</small></h3>
        ${G.map(([hh, p], i) => `<div class="tg-i" style="--i:${i}"><span>${i + 1}</span><div><b>${esc(hh)}</b><p>${esc(p)}</p></div></div>`).join('')}</div>
      <div class="tg-top"><h3>추천 영상 베스트 3 <small>${typeof DATA_UPDATED === 'string' ? DATA_UPDATED : '26년 11월'} 기준 조회수 순</small></h3>
        ${top.map(([vid, title, type, v, ch], i) => `<a class="tg-v" style="--i:${i}" href="${vurl(vid, type)}" target="_blank" rel="noopener">
          <span class="tg-rank">${i + 1}</span><span class="tg-th"><img src="thumbs/${vid}.jpg" alt="" loading="lazy"><i>${type === 'S' ? 'Shorts' : '롱폼'}</i></span>
          <span class="tg-tx"><b>${esc(title)}</b><small>${esc(ch || '')} · 조회수 ${views(v)}</small></span></a>`).join('') || '<p class="rv-empty">조건에 맞는 영상이 아직 없어요.</p>'}</div>
    </section>
    <div class="rtabs" style="margin-bottom:20px">${['전체', '롱폼', '쇼츠'].map(k => `<button class="${k === tipType ? 'on' : ''}" onclick="tipType='${k}';tipPage=1;viewTrain('${id}')">${k} <small style="font-size:13px">${k === '전체' ? list.length : list.filter(v => (k === '쇼츠') === (v[2] === 'S')).length}</small></button>`).join('')}</div>
    <div class="vgrid">${items.slice((tipPage - 1) * per, tipPage * per).map(([vid, title, type, v, ch, age]) => `<a class="vcard" href="${vurl(vid, type)}" target="_blank" rel="noopener">
        <div class="thumb"><img src="thumbs/${vid}.jpg" alt="" loading="lazy"><span class="badge ${type === 'S' ? 's' : ''}">${type === 'S' ? '▮ Shorts' : '▶ 롱폼'}</span>${age ? `<span class="age">${age}</span>` : ''}</div>
        <div class="vb"><b>${esc(title)}</b><span>${ch ? esc(ch) + ' · ' : ''}조회수 ${views(v)} ↗</span></div></a>`).join('')}</div>
    <div class="pager"><button ${tipPage <= 1 ? 'disabled' : ''} onclick="tipPage--;viewTrain('${id}')">‹</button>
      <span class="pn"><b>${tipPage}</b> / ${pages}</span>
      <button ${tipPage >= pages ? 'disabled' : ''} onclick="tipPage++;viewTrain('${id}')">›</button></div>
    <p style="color:var(--sub);font-size:12px;text-align:center;margin-top:14px">유튜브 조회수 순 검색 · 2026년 11월 수집 · 조회수 100만 회 이상은 최근 2년, 10만 회 이상은 최근 1년 안에 올라온 영상만 넣었어요</p>`;
  const on = app.querySelector('.tr-card.on'); if (on) on.scrollIntoView({ block: 'nearest', inline: 'center' });
  window.scrollTo(0, 0);
}
function tipGuide(t) {
  const G = TIP_GUIDE[t] || [], top = TIPS[t].slice().sort((x, z) => z[3] - x[3]).slice(0, 3), col = TIP_COLOR[t] || '#64748b';
  return `<section class="tg" style="--tc:${col}">
    <div class="tg-guide"><h3>${t} 핵심 가이드</h3>
      ${G.map(([h, p], i) => `<div class="tg-i" style="--i:${i}"><span>${i + 1}</span><div><b>${esc(h)}</b><p>${esc(p)}</p></div></div>`).join('')}</div>
    <div class="tg-top"><h3>추천 영상 베스트 3 <small>${typeof DATA_UPDATED === 'string' ? DATA_UPDATED : '26년 11월'} 기준 조회수 순</small></h3>
      ${top.map(([id, title, type, v, ch, age], i) => `<a class="tg-v" style="--i:${i}" href="${type === 'S' ? 'https://www.youtube.com/shorts/' + id : 'https://www.youtube.com/watch?v=' + id}" target="_blank" rel="noopener">
        <span class="tg-rank">${i + 1}</span><span class="tg-th"><img src="thumbs/${id}.jpg" alt="" loading="lazy"><i>${type === 'S' ? 'Shorts' : '롱폼'}</i></span>
        <span class="tg-tx"><b>${esc(title)}</b><small>${esc(ch || '')} · 조회수 ${views(v)}</small></span></a>`).join('')}</div>
  </section>`;
}
/* 훈련법: 카드 레일 + 가이드 + 영상 */
let trainId = 'lsd';
function trainRail(cur) {
  return `<div class="tr-rail" role="tablist">${TRAIN_INFO.map(([id, name, sub, col, path], i) => `<button role="tab" class="tr-card ${id === cur ? 'on' : ''}" style="--tc:${col};--i:${i}" onclick="tipPage=1;go('tips-train-${id}')" aria-selected="${id === cur}">
      <svg viewBox="0 0 120 40" class="tr-graph" aria-hidden="true"><line x1="2" y1="36" x2="118" y2="36" class="tr-base"/><path d="${path}" pathLength="1" class="tr-line"/></svg>
      <b>${name}</b><small>${sub}</small><em>${(TRAIN[id] || []).length}개 영상</em></button>`).join('')}</div>`;
}
function viewTips(t) {
  if (/^train/.test(t || '') || t === '훈련법') { trainId = (t || '').split('-')[1] || trainId; if (!TRAIN_INFO.some(x => x[0] === trainId)) trainId = 'lsd'; return viewTrain(trainId); }
  const tabs = Object.keys(TIPS); t = tabs.find(k => TIP_IDS[k] === t) || (TIPS[t] ? t : tabs[0]);
  const items = TIPS[t].filter(v => tipType === '전체' || (tipType === '쇼츠') === (v[2] === 'S')).sort((a, b) => b[3] - a[3]);
  const per = 9, pages = Math.max(1, Math.ceil(items.length / per));
  tipPage = Math.min(Math.max(1, tipPage), pages);
  const chs = chMore ? TIP_CHANNELS : TIP_CHANNELS.slice(0, 3);
  app.innerHTML = `
    <h1 class="sec-title">러닝 팁</h1><p class="sec-sub">단계별로 조회수가 높은 최신 롱폼·쇼츠를 모았어요. 영상을 누르면 새 창으로 열립니다.</p>
    ${tipChips(t)}
    ${tipGuide(t)}
    <div class="rtabs" style="margin-bottom:20px">${['전체', '롱폼', '쇼츠'].map(k => `<button class="${k === tipType ? 'on' : ''}" onclick="tipType='${k}';tipPage=1;viewTips('${t}')">${k} <small style="font-size:13px">${k === '전체' ? TIPS[t].length : TIPS[t].filter(v => (k === '쇼츠') === (v[2] === 'S')).length}</small></button>`).join('')}</div>
    <div class="vgrid">${items.slice((tipPage - 1) * per, tipPage * per).map(([id, title, type, v, ch, age]) => {
      const shorts = type === 'S';
      const href = shorts ? `https://www.youtube.com/shorts/${id}` : `https://www.youtube.com/watch?v=${id}`;
      return `<a class="vcard" href="${href}" target="_blank" rel="noopener">
        <div class="thumb"><img src="thumbs/${id}.jpg" alt="" loading="lazy">
          <span class="badge ${shorts ? 's' : ''}">${shorts ? '▮ Shorts' : '▶ 롱폼'}</span>${age ? `<span class="age">${age === '올해' ? '2026년' : age}</span>` : ''}</div>
        <div class="vb"><b>${esc(title)}</b><span>${ch ? esc(ch) + ' · ' : ''}조회수 ${views(v)} ↗</span></div></a>`;
    }).join('')}</div>
    <div class="pager"><button ${tipPage <= 1 ? 'disabled' : ''} onclick="tipPage--;viewTips('${t}')">‹</button>
      <span class="pn"><b>${tipPage}</b> / ${pages}</span>
      <button ${tipPage >= pages ? 'disabled' : ''} onclick="tipPage++;viewTips('${t}')">›</button></div>
    <p style="color:var(--sub);font-size:12px;text-align:center;margin-top:14px">유튜브 조회수 순 검색 · 2026년 11월 11일 수집 · 조회수 100만 회 이상은 최근 2년, 10만 회 이상은 최근 1년 안에 올라온 영상만 넣었어요</p>`;
}

/* ---------- 대회 ---------- */
let rs = { tab: '전체', m: '', r: '', e: '', page: 1 };
/* ---------- 긴 페이지를 탭으로: 큰 제목(h2)마다 한 화면씩 ---------- */
const PG_TAB = {};
const PG_MERGE = /^(시간대별로 보기)/;
function tabify(key) {
  const kids = [...app.children], groups = [], pre = [];
  let cur = null;
  const head = el => {
    const h = el.matches('h2.h2') ? el : el.querySelector(':scope > h2.h2');
    if (!h) return null;
    const t = [...h.childNodes].filter(n => n.nodeType === 3 || !n.matches('small')).map(n => n.textContent).join('').trim();
    return PG_MERGE.test(t) ? null : t.replace(/^\d+\.\s*/, '');
  };
  for (const el of kids) {
    if (el.matches('nav.rk-sub')) { el.remove(); continue; }
    const t = head(el);
    if (t) { cur = { t, els: [el] }; groups.push(cur); } else if (cur) cur.els.push(el); else pre.push(el);
  }
  if (groups.length < 2 || !pre.length) return;
  const short = t => { const s = t.split(/\s[—·(]|\?/)[0].trim(); return s.length > 21 ? s.slice(0, 20) + '…' : s; };
  let sel = Math.min(PG_TAB[key] || 0, groups.length - 1);
  const nav = document.createElement('nav');
  nav.className = 'pg-tabs'; nav.setAttribute('aria-label', '페이지 탭');
  nav.innerHTML = groups.map((g, i) => `<button type="button" data-i="${i}"><i>${i + 1}</i>${esc(short(g.t))}</button>`).join('');
  pre[pre.length - 1].after(nav);
  const show = (i, scroll) => {
    PG_TAB[key] = i;
    groups.forEach((g, j) => g.els.forEach(e => { e.hidden = j !== i; }));
    nav.querySelectorAll('button').forEach((b, j) => b.classList.toggle('on', j === i));
    charts.forEach(c => { try { c.resize(); } catch (e) {} });
    if (scroll && nav.getBoundingClientRect().top < 70) window.scrollTo({ top: nav.getBoundingClientRect().top + scrollY - 76, behavior: 'smooth' });
    groups[i].els.forEach(e => { e.classList.remove('pg-in'); void e.offsetWidth; e.classList.add('pg-in'); });
    motion();
  };
  nav.addEventListener('click', e => { const b = e.target.closest('button'); if (b) show(+b.dataset.i, true); });
  show(sel, false);
}
/* 해외 대회 첫 화면: 세계 8대 메이저 기사 */
const WMM_STEPS = [
  [1897, '보스턴 마라톤 시작', '세계에서 가장 오래된 연례 마라톤', '#1d4ed8'],
  [1981, '"세계 4대 마라톤" 시대', '보스턴·런던·베를린·뉴욕 — 오래되고 큰 대회를 묶어 부르던 표현', '#64748b'],
  [2006, '월드 마라톤 메이저(WMM) 출범', '보스턴·런던·베를린·시카고·뉴욕 5개 대회가 공식 시리즈 결성', '#f5a300'],
  [2013, '도쿄 합류 · 6대 메이저', '아시아 최초 메이저 — 6개 완주 "식스 스타" 메달 탄생', '#dc2626'],
  [2025, '시드니 합류 · 7대 메이저', '수년간 후보 심사를 통과한 남반구 첫 메이저', '#0ea5e9'],
  [2026, '케이프타운 · 8번째 후보', '아프리카 첫 메이저를 목표로 심사 중', '#16a34a'],
];
const WMM_CRIT = [
  ['📈', '여러 해 연속 심사 통과', '후보 대회가 되면 매년 운영 평가를 받고, 연속으로 통과해야 승격돼요'],
  ['🏅', '세계 최고 등급 운영', '세계육상연맹 최고 수준(플래티넘급) 라벨 — 엘리트 선수 초청·상금'],
  ['👥', '수만 명 규모', '대규모 참가자와 관중, 도시 전체가 함께하는 축제'],
  ['📏', '공인 코스·도핑 검사', '국제 공인 코스 측정과 철저한 도핑 검사'],
  ['📺', '세계 중계·자선', '전 세계 중계, 자선 모금 등 사회적 영향력'],
  ['🌏', '대륙 다양성', '아시아·오세아니아·아프리카로 넓혀 전 세계 러너를 잇는 목표'],
];
const WMM_FINISH = [['뉴욕', 61147, '#f27100', '2026'], ['런던', 59830, '#e11d48', '2026'], ['시카고', 52062, '#0369a1', '2024'], ['시드니', 36295, '#0ea5e9', '2026']];
const WMM_WHY = [
  ['⚡', '세계기록의 무대', '남자 세계기록 1:59:30(런던)·여자 2:09:56(시카고) 모두 메이저에서 나왔어요'],
  ['🎟', '들어가기 어려운 대회', '런던은 2026년 신청자 113만 명 — 추첨 경쟁률이 수십 대 1'],
  ['⭐', '식스·세븐 스타 메달', '모든 메이저를 완주하면 받는 특별 메달 — 전 세계 러너의 버킷리스트'],
  ['🏙', '도시 전체가 축제', '도로를 통째로 막고 수십만 명이 응원 — 도시의 상징이 된 대회'],
];
function majorArticle() {
  return `<section class="rg-sec wmm" id="rg-wmm"><h2 class="h2">세계 8대 메이저란? <small>선정 기준과 유명한 이유</small></h2>
    <div class="wmm-lead"><div><span class="wmm-kicker">WORLD MARATHON MAJORS</span>
      <b>전 세계 러너가 꿈꾸는 7개의 대회, 그리고 8번째 후보</b>
      <p>"세계 4대 마라톤"은 보스턴·런던·베를린·뉴욕처럼 오래되고 큰 대회를 묶어 부르던 표현이에요. 2006년 이 대회들이 시카고와 함께 공식 시리즈 <b>월드 마라톤 메이저(WMM)</b>를 만들었고, 엄격한 심사를 거쳐 도쿄(2013)·시드니(2025)가 합류해 지금은 7개, 케이프타운이 8번째 후보예요.</p></div>
      <div class="wmm-nums">${[[cnt(7), '공식 메이저'], [cnt(1), '8번째 후보'], [cnt(2006), '시리즈 출범'], [cnt(61147), '뉴욕 2026 완주자']].map(([v, l]) => `<div><b>${v}</b><span>${l}</span></div>`).join('')}</div></div>
    <div class="panel wide"><h3>4대에서 8대로 — 메이저가 늘어난 과정</h3>
      <div class="wmm-tl grow">${WMM_STEPS.map(([y, t, d, c], i) => `<div style="--c:${c};--i:${i}"><i></i><b>${y}</b><strong>${t}</strong><p>${d}</p></div>`).join('')}</div></div>
    <div class="rk-grid2">
      <div class="panel"><h3>메이저 선정 기준 <small>후보 대회가 통과해야 하는 것</small></h3><div class="wmm-crit">${WMM_CRIT.map(([ic, k, v], i) => `<div style="--i:${i}"><span>${ic}</span><b>${k}</b><p>${v}</p></div>`).join('')}</div></div>
      <div class="panel"><h3>왜 이렇게 유명할까?</h3><div class="wmm-crit">${WMM_WHY.map(([ic, k, v], i) => `<div style="--i:${i}"><span>${ic}</span><b>${k}</b><p>${v}</p></div>`).join('')}</div>
        <h4 class="rk-h4">대회별 완주자 수</h4>${hbars(WMM_FINISH.map(([n, v, c, y]) => [n, v, c, y + '년']), 62000, '명')}</div>
    </div>
    <div class="wmm-map grow">${RACE_GUIDE.world.major.map((r, i) => `<button style="--rc:${r.col};--i:${i}" onclick="pgGo('rg-${r.id}')"><b>${r.name.replace(' 마라톤', '')}</b><small>${r.month}${r.id === 'capetown' ? ' · 후보' : ''}</small></button>`).join('')}</div>
    <p class="note">선정 기준은 WMM이 후보 대회 심사에서 밝힌 주요 항목을 정리한 것이에요 · 완주자 수는 각 대회 발표 기준</p></section>`;
}
/* 탭 안의 카드로 이동 (다른 탭에 있으면 그 탭을 먼저 열어요) */
function pgGo(id) {
  const el = document.getElementById(id); if (!el) return;
  const nav = document.querySelector('.pg-tabs');
  if (el.closest('[hidden]') && nav) { const sec = el.closest('section.rg-sec, section.rk-sec') || el; const btns = [...nav.querySelectorAll('button')]; const idx = btns.findIndex((b, i) => { return false; });
    // 숨겨진 그룹을 찾아 그 탭 버튼을 눌러요
    for (const b of btns) { b.click(); if (!el.closest('[hidden]')) break; } }
  setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
}
/* ---------- 대회: 국내 · 해외 가이드 ---------- */
const RG_NAT = { KEN: '케냐', ETH: '에티오피아', TAN: '탄자니아', ERI: '에리트레아', KOR: '한국', CHN: '중국', ROU: '루마니아', GBR: '영국', NED: '네덜란드', RSA: '남아공', USA: '미국', JPN: '일본' };
const RG_TYPE = { f: ['평지', '#22c55e'], u: ['오르막', '#ef4444'], d: ['내리막', '#3b82f6'], r: ['기복', '#f59e0b'] };
function raceTabs(cur) {
  return `<nav class="rg-tabs" aria-label="대회 메뉴">${[['', '📅 대회 일정'], ['kr', '🇰🇷 국내 대회'], ['world', '🌍 해외 대회']].map(([k, n]) => `<button class="${k === cur ? 'on' : ''}" onclick="go('${k ? 'races-' + k : 'races'}')">${n}</button>`).join('')}</nav>`;
}
/* 코스 고도 개략도: 구간 종류(평지·오르막·내리막·기복)로 그린 프로필 + 달리는 점 */
function courseViz(r) {
  const W = 1000, H = 120, pts = [];
  let y = 60;
  for (let k = 0; k <= 42.2; k += 0.4) {
    const seg = r.course.find(s => k >= s[0] && k <= s[1]) || r.course[r.course.length - 1];
    const len = Math.max(1, seg[1] - seg[0]);
    if (seg[2] === 'u') y -= 34 / len * 0.4; else if (seg[2] === 'd') y += 30 / len * 0.4; else if (seg[2] === 'r') y += Math.sin(k * 1.3) * 1.6;
    y = Math.max(14, Math.min(100, y));
    pts.push([k / 42.2 * W, y]);
  }
  const d = 'M' + pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L');
  const area = d + ` L${W} ${H} L0 ${H} Z`;
  return `<div class="rg-course draw">
    <div class="rg-cs-h"><b>코스 분석</b><span>${r.stat.map(([k, v]) => `<em>${k} <b>${v}</b></em>`).join('')}</span></div>
    <div class="rg-pscroll"><div class="rg-pw"><svg viewBox="0 0 ${W} ${H + 12}" class="rg-prof" aria-label="${esc(r.name)} 코스 개략도">
      <defs><linearGradient id="rgg-${r.id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${r.col}" stop-opacity=".55"/><stop offset="1" stop-color="${r.col}" stop-opacity="0"/></linearGradient></defs>
      ${r.course.map(s => `<rect x="${s[0] / 42.2 * W}" y="${H + 4}" width="${(s[1] - s[0]) / 42.2 * W}" height="6" rx="3" fill="${RG_TYPE[s[2]][1]}"/>`).join('')}
      <path d="${area}" fill="url(#rgg-${r.id})" class="rg-area"/>
      <path class="d" d="${d}" fill="none" stroke="${r.col}" stroke-width="3" stroke-linecap="round"/>
      <circle r="6" class="rg-runner" fill="#fff" stroke="${r.col}" stroke-width="3" style="offset-path:path('${d}')"/>
      ${r.marks.map(([k]) => { const x = Math.min(W - 4, Math.max(4, k / 42.2 * W)); return `<line class="rg-mk" x1="${x}" y1="8" x2="${x}" y2="${H}" />`; }).join('')}
    </svg><div class="rg-mks">${r.marks.map(([k, n]) => `<span style="left:${k / 42.2 * 100}%" class="${k < 3 ? 'st' : k > 40 ? 'en' : ''}">${n}<small>${k}km</small></span>`).join('')}</div></div></div>
    <ul class="rg-segs">${r.course.map(s => `<li style="--sc:${RG_TYPE[s[2]][1]}"><span>${s[0]}–${s[1]}km</span><i>${RG_TYPE[s[2]][0]}</i>${s[3]}</li>`).join('')}</ul>
    <p class="note">구간 정보로 그린 개략도예요 · 정확한 고도표는 대회 공식 코스맵을 확인하세요</p></div>`;
}
/* 선수 이름 → 사진 키 (자유 라이선스 사진이 있는 선수만) */
const PERSON_PH = { '엘리우드 킵초게': 'kipchoge', '켈빈 키프텀': 'kiptum', '사바스티안 사웨': 'sawe', '루스 쳅응게티치': 'chepngetich', '티지스트 아세파': 'assefa', '티지스트 아세파 등': 'assefa', '폴라 래드클리프': 'radcliffe', '그레테 바이츠': 'waitz', '빌 로저스': 'rodgers', '할리드 하누치': 'khannouchi', '클래런스 디마': 'demar', '캐서린 은데레바': 'ndereba', '잉그리드 크리스티안센': 'kristiansen', '제임스 쾀바이': 'kwambai', '가브리엘 게이': 'geay', '모시네트 게레메우': 'geremew', '벤슨 키프루토': 'bkipruto', '존 코리르': 'korir', '샤론 로케디': 'lokedi', '시판 하산': 'shassan', '타미랏 톨라': 'tola', '헬렌 오비리': 'obiri', '모하메드 에사': 'esa', '이봉주': 'leebj2', '서윤복': 'suh', '손기정': 'sohn', '황영조': 'hwang' };
const pph = n => { const k = PERSON_PH[n]; return k && PHOTOS[k] ? k : null; };
const avatar = (n, cls = 'pav') => { const k = pph(n); return k ? `<img class="${cls}" src="${photoSrc(k)}" alt="${esc(n)}" loading="lazy" title="사진: ${esc(PHOTOS[k][2])} · ${esc(PHOTOS[k][1])}">` : ''; };
function raceTopList(list, sex) {
  const best = toSec(list[0][0]);
  return `<ol class="rg-top">${list.map(([t, n, c, y], i) => `<li style="--i:${i}"><span class="rk-no">${i + 1}</span><span class="rg-tn ${pph(n) ? 'hasav' : ''}">${avatar(n)}<b>${n}</b><small>${RG_NAT[c] || c} · ${y}</small></span><span class="rg-tb"><i style="--w:${100 - (toSec(t) - best) / 6}%"></i></span><b class="rg-tt">${t}</b></li>`).join('')}</ol>`;
}
function raceCard(r, i) {
  return `<article class="rg-card" id="rg-${r.id}" style="--rc:${r.col};--i:${i}">
    ${(rp => `<header class="rg-hero ${rp ? 'ph' : ''}">
      ${rp ? `<img src="${photoSrc(rp)}" alt="" loading="lazy">${credit(rp)}` : ''}`)(r.photo && PHOTOS[r.photo] ? r.photo : PHOTOS['rg_' + r.id] ? 'rg_' + r.id : PHOTOS[r.id] ? r.id : null)}
      <div class="rg-ht"><span class="rg-en">${r.en}</span><h3>${r.name}</h3>
        <div class="rg-chips">${[r.since ? r.since + '년 시작' : '', r.month, r.label, r.size].filter(Boolean).map(x => `<span>${x}</span>`).join('')}</div></div>
      ${r.url ? `<a class="rg-go" href="${r.url}" target="_blank" rel="noopener">공식 홈페이지 ↗</a>` : ''}
    </header>
    <div class="rg-body">
      ${(side => `<div class="rg-why ${side ? '' : 'full'}"><h4>${r.top || r.cr ? '이 대회가 특별한 이유' : '왜 어려울까?'}</h4><ul>${r.why.map(w => `<li>${w}</li>`).join('')}</ul></div>${side ? `<div class="rg-side">${side}</div>` : ''}`)([
        r.cr ? `<div class="rg-cr">${r.cr.map(([t, n, c, y], j) => t ? `<div><span>${j ? '여자' : '남자'} 대회 기록</span><b>${t}</b><small>${n} · ${RG_NAT[c] || c} · ${y}</small></div>` : '').join('')}</div>` : '',
        (r.most && r.most.length) || r.hall ? `<div class="rg-hall"><h4>명예의 전당 · 최다 우승</h4><div>${(r.most || []).map(([n, g, k, note]) => `<span class="rg-hc ${pph(n) ? 'hasav' : ''}">${pph(n) ? avatar(n, 'hav') : `<i>${g}</i>`}<b>${n}</b><em>${k}회 우승</em><small>${note}</small></span>`).join('')}${(r.hall || []).map(([n, note]) => `<span class="rg-hc star ${pph(n) ? 'hasav' : ''}">${pph(n) ? avatar(n, 'hav') : '<i>★</i>'}<b>${n}</b><small>${note}</small></span>`).join('')}</div></div>` : ''].join(''))}
      ${r.top ? `<div class="rg-recs"><div><h4>남자 역대 우승 기록 TOP 5</h4>${raceTopList(r.top.m)}</div><div><h4>여자 역대 우승 기록 TOP 5</h4>${raceTopList(r.top.w)}</div></div>` : ''}
      ${courseViz(r)}
    </div></article>`;
}
function raceSection(id, title, sub, list) {
  return `<section class="rg-sec" id="${id}"><h2 class="h2">${title}${sub ? ` <small>${sub}</small>` : ''}</h2>${list.map(raceCard).join('')}</section>`;
}
function raceHowto(list) {
  return `<div class="rg-how">${list.map(([ic, k, v], i) => `<div style="--i:${i}"><span>${ic}</span><b>${k}</b><p>${v}</p></div>`).join('')}</div>`;
}
function viewRaceGuide(sub) {
  const G = RACE_GUIDE[sub], kr = sub === 'kr';
  const secs = kr ? [['rg-major', '🏆 3대 메이저'], ['rg-hard', '⛰ 극악 난이도'], ['rg-rising', '🚀 떠오르는 대회'], ['rg-how', '📝 접수 방법']]
    : [['rg-major', '🌍 세계 8대 메이저'], ['rg-hard', '⛰ 극악 난이도'], ['rg-rising', '🚀 떠오르는 대회'], ['rg-rec', '✈️ 추천 대회'], ['rg-how', '📝 접수 방법']];
  app.innerHTML = `
    <h1 class="sec-title">대회</h1><p class="sec-sub">${kr ? '국내 대표 마라톤의 역사와 역대 기록, 코스를 한눈에 정리했어요.' : '세계 8대 메이저부터 극한 대회, 한국 러너 추천 대회까지 정리했어요.'} 기록은 ${RANK_ASOF} 기준이에요.</p>
    ${raceTabs(sub)}
    <nav class="rk-sub">${secs.map(([id, n]) => `<button onclick="document.getElementById('${id}').scrollIntoView({behavior:'smooth',block:'start'})">${n}</button>`).join('')}</nav>
    ${!kr ? majorArticle() : ''}
    ${raceSection('rg-major', kr ? '국내 3대 메이저 마라톤' : '세계 8대 메이저 마라톤', kr ? '서울(동아) · 춘천 · JTBC 서울' : '월드 마라톤 메이저 7개 + 8번째 후보 케이프타운', G.major)}
    ${raceSection('rg-hard', '극악의 난이도 대회', kr ? '러너들 사이에서 가장 힘들다고 꼽히는 코스' : '완주 자체가 도전인 대회', G.hard)}
    ${raceSection('rg-rising', '떠오르는 대회', kr ? '규모와 등급이 빠르게 커지는 대회' : '메이저급으로 주목받는 대회', G.rising)}
    ${!kr ? `<section class="rg-sec" id="rg-rec"><h2 class="h2">한국 러너 추천 해외 대회 <small>가깝고 · 날씨 좋고 · 첫 해외 대회로 좋은 곳</small></h2>
      <div class="rg-rec">${G.recommend.map(([n, m, d, c], i) => `<article style="--rc:${c};--i:${i}"><b>${n}</b><span>${m}</span><p>${d}</p></article>`).join('')}</div></section>` : ''}
    <section class="rg-sec" id="rg-how"><h2 class="h2">${kr ? '국내 대회 접수 방법' : '해외 대회 접수 방법'}</h2>${raceHowto(G.howto)}</section>
    <p class="note" style="margin-top:14px">출처: 위키백과 대회별 역대 우승자 · World Athletics 대회 결과 · 대회 공식 발표·언론 보도 (${RANK_ASOF} 확인) · 최신 일정·접수는 대회 홈페이지에서 꼭 확인하세요</p>`;
  motion();
}
function viewRaces() {
  const all = RACES.map(([n, d, r, p, ev, url, st, no]) => ({ n, d: new Date(d + 'T00:00:00'), ds: d, r, p, ev, url, st, no })).filter(x => x.d >= TODAY).sort((a, z) => a.d - z.d);
  const months = [...new Set(all.map(x => x.ds.slice(0, 7)))];
  const regions = [...new Set(all.map(x => x.r))].sort();
  const evOrder = ['Full', 'Half', '10km', '5km', '걷기', '가족·어린이', '트레일런', '울트라'];
  const events = evOrder.filter(e => all.some(x => x.ev.includes(e)));
  let list = all.filter(x => (rs.tab === '전체' || (rs.tab === '현재접수중' ? x.st === '접수중' : x.r === '온라인'))
    && (!rs.m || x.ds.startsWith(rs.m)) && (!rs.r || x.r === rs.r) && (!rs.e || x.ev.includes(rs.e)));
  const per = 6, pages = Math.max(1, Math.ceil(list.length / per));
  rs.page = Math.min(rs.page, pages);
  const wk = ['일', '월', '화', '수', '목', '금', '토'];
  const fmt = d => `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}. (${wk[d.getDay()]})`;
  const pal = ['#b45309', '#1d4ed8', '#be123c', '#047857', '#7c3aed', '#0e7490'];
  const sel = (k, label, opts, fmtO = o => o) => `<select class="${rs[k] ? 'act' : ''}" onchange="rs.${k}=this.value;rs.page=1;viewRaces()"><option value="">${label}</option>${opts.map(o => `<option value="${o}" ${rs[k] === o ? 'selected' : ''}>${fmtO(o)}</option>`).join('')}</select>`;
  app.innerHTML = `
    <h1 class="sec-title">대회</h1><p class="sec-sub">월별 · 지역 · 종목으로 다가오는 러닝 대회를 찾아보세요. 카드를 누르면 대회 홈페이지로 연결됩니다.</p>
    ${raceTabs("")}
    <div class="panel">
      <div class="rtabs">${['전체', '현재접수중', '온라인'].map(t => `<button class="${rs.tab === t ? 'on' : ''}" onclick="rs.tab='${t}';rs.page=1;viewRaces()">${t}</button>`).join('')}</div>
      <div class="rfil"><button class="reset" title="초기화" onclick="rs={tab:'전체',m:'',r:'',e:'',page:1};viewRaces()">↻</button>
        ${sel('m', '월별', months, o => `${o.slice(0, 4)}년 ${+o.slice(5)}월`)}${sel('r', '지역', regions)}${sel('e', '종목', events)}</div>
      ${list.length ? `<div class="rgrid">${list.slice((rs.page - 1) * per, rs.page * per).map((x, i) => {
        const dday = Math.round((x.d - TODAY) / 864e5);
        const home = x.url || `http://www.roadrun.co.kr/schedule/view.php?no=${x.no}`;
        const c = pal[(x.d.getMonth() + i) % pal.length];
        return `<div class="rcard"><a class="rt" href="${home}" target="_blank" rel="noopener">
          <div><h4>${esc(x.n)}<span class="st ${x.st === '접수중' ? 'on' : x.st === '예정' ? 'soon' : 'off'}">${x.st}</span></h4>
            <dl><dt>기간</dt><dd>${fmt(x.d)}</dd><dt>장소</dt><dd>${x.r === '온라인' ? '' : x.r + ' '}${esc(x.p)}</dd><dt>종목</dt><dd>${x.ev.join(' · ')}</dd></dl></div>
          <div class="rposter" style="background:linear-gradient(160deg,${c},#111)"><span class="dd">D-${dday}</span><div class="mo">${x.d.getMonth() + 1}월</div><div class="ev">${x.ev[0]}</div></div></a>
          <div class="ra">${x.r === '온라인' ? `<a href="https://search.naver.com/search.naver?query=${encodeURIComponent('버추얼런 ' + x.n)}" target="_blank" rel="noopener"><span>🔎</span> 참가 방법</a>` : `<a href="https://map.naver.com/p/search/${encodeURIComponent(x.p)}" target="_blank" rel="noopener"><span>📍</span> 지도</a>`}
            <a href="${home}" target="_blank" rel="noopener"><span>↗</span> 홈페이지</a></div></div>`;
      }).join('')}</div>` : `<div class="empty">${rs.tab === '온라인' ? '현재 등록된 온라인(버추얼) 대회가 없어요.' : '조건에 맞는 대회가 없어요.'}</div>`}
      <p style="color:var(--sub);font-size:12px;text-align:center;margin:10px 0 0">출처: 마라톤온라인 대회일정 (2026년 11월 10일 수집) · 일정·접수는 대회 홈페이지에서 꼭 확인하세요</p>
      <div class="pager"><button ${rs.page <= 1 ? 'disabled' : ''} onclick="rs.page--;viewRaces()">‹</button><span class="pn"><b>${rs.page}</b> / ${pages}</span><button ${rs.page >= pages ? 'disabled' : ''} onclick="rs.page++;viewRaces()">›</button></div>
    </div>`;
}

/* ---------- 구매 사이트 ---------- */
function viewShop() {
  app.innerHTML = `
    <h1 class="sec-title">구매 사이트</h1><p class="sec-sub">브랜드 공식몰과 정품 판매 사이트로 바로 이동합니다.</p>
    ${REGIONS.map(([rk, rn, bs]) => `<h3 class="shop-reg">${rn} 브랜드 <small>${bs.length}개</small></h3>
    <div class="sgrid">${bs.map(k => [k, BRANDS[k]]).map(([k, B]) => `
      <a class="stile" href="${B.site}" target="_blank" rel="noopener" style="background:${grad(k)}">
        
        <div class="logo-badge">${LOGOS.has(k) ? `<img src="logos/${k}.svg" alt="${B.name} 로고">` : `<span class="lb-txt">${B.name}</span>`}</div>
        <div class="ko">${B.ko} 공식몰</div><div class="ds">${B.site.replace(/^https?:\/\//, '').replace(/\/$/, '')}</div><div class="go">↗</div></a>`).join('')}</div>`).join('')}`;
}

/* ---------- 러닝화 계급도 ---------- */
const TIERS = [
  ['S', 93, 100, '최상위', '#f5a300', '#ffd166'],
  ['A', 90, 92, '탁월', '#f43f5e', '#fb7185'],
  ['B', 87, 89, '우수', '#8b5cf6', '#a78bfa'],
  ['C', 84, 86, '좋음', '#2563eb', '#60a5fa'],
  ['D', 80, 83, '무난', '#059669', '#34d399'],
  ['E', 0, 79, '아쉬움', '#52525b', '#a1a1aa'],
];
const TIER_GROUPS = [['전체', null], ['레이싱화', ['FR', 'CR', 'LR']], ['템포화', ['ST', 'SN']], ['중립화', ['CU']], ['맥스쿠션', ['MX']], ['안정화', ['SB']], ['입문화', ['DY']]];
/* 계급도 종류 설명 (종류 탭을 누르면 아래에 표시) */
const TIER_INFO = {
  '전체': { ic: '👟', col: '#f5a300', one: '러닝화는 용도에 따라 크게 6가지로 나뉘어요. 위에서 종류를 누르면 특징과 고르는 법이 여기에 나와요.',
    feat: ['레이싱화 — 대회 기록용, 가장 빠름', '템포화 — 빠른 훈련용 슈퍼트레이너', '중립화·맥스쿠션 — 매일 편하게 달리는 데일리', '안정화 — 발이 안쪽으로 무너지는 러너용', '입문화 — 첫 러닝화, 가성비'],
    who: ['처음이라면 중립화나 입문화부터', '평발·과내전이면 안정화', '대회 기록을 노리면 레이싱화 + 템포화 조합'], care: ['한 켤레로 모든 걸 하려면 템포화(플레이트X)가 무난해요', '러닝화 수명은 보통 500~800km예요'] },
  '레이싱화': { ic: '⚡', col: '#e11d48', one: '대회에서 기록을 줄이기 위해 만든 가장 빠른 신발이에요. 카본 플레이트와 고반발 슈퍼폼이 한 걸음마다 앞으로 튕겨 줘요.',
    feat: ['카본 플레이트 + PEBA 등 고반발 슈퍼폼', '200g 안팎의 아주 가벼운 무게', '앞으로 굴러가는 로커 형상의 추진력', '수명이 짧은 편 (약 300~500km)'],
    who: ['하프·풀코스 기록 단축을 노리는 중·상급 러너', '5km·10km PB를 노리는 스피드형 러너(경량 레이싱화)'], care: ['발목·종아리 근력이 약하면 부상 위험이 있어요', '매일 훈련용으로 신기보다는 대회·중요 훈련용으로'] },
  '템포화': { ic: '🏃', col: '#8b5cf6', one: '훈련 중 빠르게 달리는 날을 위한 신발이에요. 레이싱화의 반발력을 갖췄지만 더 두껍고 튼튼해서 오래 신을 수 있어요.',
    feat: ['플레이트O — 나일론·카본 플레이트로 추진력', '플레이트X — 고반발 폼만으로 탄력, 더 편안함', '템포런·인터벌·LSD까지 다목적', '레이싱화보다 내구성이 좋아요'],
    who: ['대회 느낌으로 훈련하고 싶은 러너', '한 켤레로 조깅부터 대회까지 쓰고 싶은 러너'], care: ['회복주·느린 조깅에는 과한 반발이 부담될 수 있어요', '플레이트O는 초보에게 다소 딱딱할 수 있어요'] },
  '중립화': { ic: '☁️', col: '#14b8a6', one: '발 안쪽을 받쳐 주는 장치가 없는 기본 데일리 러닝화예요. 발이 자연스럽게 움직이도록 쿠션과 반발의 균형을 맞췄어요.',
    feat: ['쿠션과 반발의 균형 잡힌 착지감', '발이 자연스럽게 움직이는 설계', '조깅·롱런 등 매일 훈련용', '종류가 가장 많아 고르기 쉬워요'],
    who: ['과내전이 없는 대부분의 러너', '매일 편하게 오래 달리고 싶은 러너'], care: ['발이 안쪽으로 많이 무너지면 안정화가 나아요'] },
  '맥스쿠션': { ic: '🛏️', col: '#0ea5e9', one: '뒤꿈치 두께 42mm 이상의 두꺼운 미드솔로 충격을 최대한 줄인 신발이에요. 가장 푹신한 착지감을 줘요.',
    feat: ['가장 두껍고 푹신한 쿠셔닝', '무릎·발목 관절 부담 감소', '회복주·장거리 LSD에 최적', '로커 형상으로 부드럽게 굴러가요'],
    who: ['체중이 있거나 관절이 걱정되는 러너', '장거리 후 회복주를 뛰는 러너'], care: ['무게가 있어 빠른 페이스에는 둔하게 느껴질 수 있어요', '바닥이 높아 발목이 약하면 처음엔 조심하세요'] },
  '안정화': { ic: '🛡️', col: '#22c55e', one: '발이 안쪽으로 무너지는 과내전을 잡아 주는 지지 구조가 있는 신발이에요. 평발 러너의 부상 예방에 좋아요.',
    feat: ['안쪽 아치를 받쳐 주는 가이드레일·단단한 폼', '넓은 바닥으로 흔들림 감소', '무릎 안쪽 부담 감소', '쿠션도 충분한 데일리 성격'],
    who: ['평발·과내전 러너', '무릎 안쪽이나 정강이 통증이 잦은 러너', '부상이 걱정되는 초보'], care: ['정상 발에게는 답답하게 느껴질 수 있어요'] },
  '입문화': { ic: '🌱', col: '#64748b', one: '13만 9천 원 이하의 가성비 중립화예요. 처음 사는 러닝화나 가볍게 조깅할 때 부담 없이 신기 좋아요.',
    feat: ['부담 없는 가격', '무난한 쿠셔닝', '조깅·걷기·입문용'],
    who: ['첫 러닝화를 찾는 사람', '주 1~2회 가볍게 달리는 러너'], care: ['기록 도전용으로는 반발이 아쉬워요', '달리는 거리가 늘면 중립화·템포화로 업그레이드하세요'] },
};
function tierInfo(g, cats) {
  const I = TIER_INFO[g]; if (!I) return '';
  const subs = (cats || []).map(c => `<span style="--cc:${CATS[c].color}"><b>${CATS[c].name}</b><small>${CATS[c].desc}</small></span>`).join('');
  return `<section class="ti-box" style="--tc:${I.col}">
    <div class="ti-h"><span class="ti-ic">${I.ic}</span><div><b>${g === '전체' ? '러닝화 종류 한눈에 보기' : g + '란?'}</b><p>${I.one}</p></div></div>
    <div class="ti-cols">
      <div><h5>특징</h5><ul>${I.feat.map(x => `<li>${x}</li>`).join('')}</ul></div>
      <div><h5>이런 러너에게</h5><ul>${I.who.map(x => `<li>${x}</li>`).join('')}</ul></div>
      <div><h5>알아 두세요</h5><ul>${I.care.map(x => `<li>${x}</li>`).join('')}</ul></div>
    </div>
    ${subs ? `<div class="ti-subs">${subs}</div>` : ''}
  </section>`;
}
let tierGroup = '전체';
function viewTier() {
  const G = TIER_GROUPS.find(g => g[0] === tierGroup) || TIER_GROUPS[0];
  const all = SHOES.filter(s => s.lab && s.s != null), pool = all.filter(s => !G[1] || G[1].includes(s.c));
  const rows = TIERS.map(t => [t, pool.filter(s => s.s >= t[1] && s.s <= t[2]).sort((x, z) => z.s - x.s || (x.w || 999) - (z.w || 999))]);
  const total = pool.length || 1;
  app.innerHTML = `
    <section class="tl-hero">
      <div class="tl-hero-tx">
        <span class="tl-eye">RUNREPEAT LAB SCORE</span>
        <h1>2026 러닝화 계급도</h1>
        <p>신발을 실험실에서 직접 잘라 측정하는 RunRepeat의 점수로 <b>${all.length}개 모델</b>을 6개 티어로 나눴어요. 신발을 누르면 점수가 나온 이유와 핵심 특징을 볼 수 있어요.</p>
        <div class="tl-upd"><span>📅 <b>${DATA_UPDATED}</b> 기준 최신 모델</span><span>🔄 매달 1일·15일 자동 업데이트</span></div>
      </div>
      <div class="tl-dist" aria-label="티어별 모델 수">
        ${rows.map(([t, l], i) => `<button class="tl-seg" style="--c1:${t[4]};--c2:${t[5]};--w:${Math.max(l.length / total * 100, l.length ? 6 : 0)}%;--i:${i}" onclick="document.getElementById('tier-${t[0]}').scrollIntoView({behavior:'smooth',block:'center'})" ${l.length ? '' : 'hidden'}><b>${t[0]}</b><span>${l.length}</span></button>`).join('')}
      </div>
    </section>
    <div class="tl-filter">${TIER_GROUPS.map(([g, cs]) => { const n = all.filter(s => !cs || cs.includes(s.c)).length; return `<button class="${g === tierGroup ? 'on' : ''}" onclick="tierGroup='${g}';viewTier()">${g} <small>${n}</small></button>`; }).join('')}</div>
    ${tierInfo(tierGroup, G[1])}
    <div class="tl-board">
      ${rows.map(([t, l], ri) => `<section class="tl-row t-${t[0]}" id="tier-${t[0]}" style="--c1:${t[4]};--c2:${t[5]};--r:${ri}">
        <div class="tl-label"><b>${t[0]}</b><span>${t[3]}</span><small>${t[0] === 'S' ? '93점 이상' : t[0] === 'E' ? '79점 이하' : t[1] + '~' + t[2] + '점'}</small><em>${l.length}개</em></div>
        <div class="tl-groups">${l.length ? [...new Set(l.map(s => s.s))].map((sc, gi) => { const g = l.filter(s => s.s === sc); return `<div class="tl-sg" style="--g:${gi}">
          <div class="tl-sgh"><b>${sc}<i>점</i></b><small>${g.length}개</small></div>
          <div class="tl-chips">${g.map((s, i) => `<button class="tl-chip" style="--i:${Math.min(i, 16)}" onclick="openShoe('${s.id}')" title="${esc(BRANDS[s.b].name)} ${esc(s.ko)} · ${CATS[s.c].name}">
            <span class="tl-logo">${LOGOS.has(s.b) ? `<img src="logos/${s.b}.svg" alt="${BRANDS[s.b].name}">` : `<b>${BRANDS[s.b].name}</b>`}</span>
            <span class="tl-name"><b>${esc(s.ko)}</b><small><i style="background:${CATS[s.c].color}"></i>${CATS[s.c].name}</small></span></button>`).join('')}</div>
        </div>`; }).join('') : '<p class="tl-empty">이 분류에는 해당 점수대 모델이 없어요</p>'}</div>
      </section>`).join('')}
    </div>
    <p class="note" style="margin-top:14px">점수: RunRepeat 실험실 리뷰 · ${DATA_UPDATED} 기준 · 매달 1일·15일에 RunRepeat 점수·무게·순위를 다시 받고, 한국에 정식 출시된 새 모델을 추가해요 · RunRepeat 리뷰가 없는 모델 ${SHOES.length - all.length}개(중국·한국 브랜드 대부분 등)는 제외했어요 · 같은 점수는 가벼운 순</p>`;
}

/* ---------- 라우터 ---------- */
/* 페이지 전환: 섹션이 순서대로 떠오름 */
function pageEnter() {
  if (REDUCED) return;
  const kids = [...app.children].slice(0, 14);
  kids.forEach((el, i) => { el.style.setProperty('--i', i); el.classList.remove('pg-in'); void el.offsetWidth; el.classList.add('pg-in'); });
  revealObserve();
}
/* 스크롤 등장: 카드·행이 화면에 들어올 때 살짝 떠오름 */
let revIO = null;
function revealObserve() {
  if (REDUCED || !('IntersectionObserver' in window)) return;
  if (!revIO) revIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('rvl-in'); revIO.unobserve(e.target); } }), { rootMargin: '0px 0px -6% 0px' });
  app.querySelectorAll('.lu-group, .card, .vcard, .rcol, .stile, .catsec, .bt3, .ritem, .panel').forEach((el, i) => {
    if (el.classList.contains('rvl-in')) return;
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight * 0.94) { el.classList.add('rvl-in'); return; }
    el.classList.add('rvl'); el.style.setProperty('--d', (i % 4) * 60 + 'ms'); revIO.observe(el);
  });
}
/* 클릭 반응: 눌리는 느낌 + 퍼지는 링 */
document.addEventListener('pointerdown', e => {
  if (REDUCED) return;
  const t = e.target.closest('button, .btn, .chip, a.stile, .lu-m, .bt3, .ritem, .vcard, .card, #nav a, .seg button');
  if (!t) return;
  t.classList.remove('tap'); void t.offsetWidth; t.classList.add('tap');
  setTimeout(() => t.classList.remove('tap'), 520);
}, { passive: true });
function route() {
  closeModal();
  const h = location.hash.slice(1), i = h.indexOf('-'), v = i < 0 ? h : h.slice(0, i), arg = i < 0 ? '' : h.slice(i + 1);
  document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('on', a.dataset.v === v));
  if (v === 'history') viewHistory(arg);
  else if (v === 'marathon') viewMarathon(arg);
  else if (v === 'rank') viewRank();
  else if (v === 'tier') viewTier();
  else if (v === 'find') viewFind(arg);
  else if (v === 'tips') viewTips(arg);
  else if (v === 'races') (arg ? viewRaceGuide(arg) : viewRaces());
  else if (v === 'shop') viewShop();
  else viewHome();
  if (v === 'history' || v === 'marathon' || v === 'rank' || (v === 'races' && arg)) tabify(h);
  window.scrollTo(0, 0);
  pageEnter();
}
window.addEventListener('hashchange', route);
/* ---------- 방문자 수: 무료 카운터(Abacus) · 같은 브라우저는 하루 1회만 집계 ---------- */
async function visitCounter() {
  const t = document.getElementById('vc-t'), all = document.getElementById('vc-a'); if (!t || !all) return;
  const ns = 'horangmalco-run', day = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10).replace(/-/g, '');
  let seen = null; try { seen = localStorage.getItem('hm-visit'); } catch (e) {}
  const act = (seen === day || /^(localhost|127.0.0.1)$/.test(location.hostname)) ? 'get' : 'hit';
  const call = key => fetch(`https://abacus.jasoncameron.dev/${act}/${ns}/${key}`).then(r => r.ok ? r.json() : { value: 0 }).catch(() => null);
  const [d, tot] = await Promise.all([call('d' + day), call('total')]);
  if (!d && !tot) { document.getElementById('vc').hidden = true; return; }
  if (act === 'hit') try { localStorage.setItem('hm-visit', day); } catch (e) {}
  const fmt = n => Math.max(0, +n || 0).toLocaleString('en-US');
  t.textContent = fmt(d && d.value); all.textContent = fmt(tot && tot.value);
}
route();
visitCounter();

/* ---------- 발볼 기준보기 ---------- */
function footGrade(g, len, wid) {
  const r = wid / len, T = g === '여성' ? [[.345, '좁음', '2A'], [.375, '보통', 'B'], [.40, '넓음', 'D'], [9, '매우 넓음', '2E']] : [[.355, '좁음', 'B'], [.385, '보통', 'D'], [.41, '넓음', '2E'], [9, '매우 넓음', '4E']];
  const t = T.find(x => r < x[0]); return { r, name: t[1], grade: t[2], ft: t[1] === '좁음' ? '칼발' : /넓음/.test(t[1]) ? '넓은 발볼' : '일반' };
}
function calcFoot() {
  const on = document.querySelector('#fwg .on'), g = on ? on.textContent : prof.g, len = +$('#fwl').value, wid = +$('#fwd').value, out = $('#fwr');
  if (!(len > 150 && len < 340 && wid > 60 && wid < 150)) { out.innerHTML = '<p class="fw-hint">발길이(150~340mm)와 발볼 너비(60~150mm)를 넣어 주세요.</p>'; return; }
  const r = footGrade(g, len, wid);
  out.innerHTML = `<div class="fw-res"><div><small>내 발볼</small><b>${r.name}</b></div><div><small>추천 발볼 등급</small><b>${r.grade}</b></div><div><small>발볼 비율</small><b>${(r.r * 100).toFixed(1)}%</b></div></div>
    <button class="btn ${r.ft !== '일반' ? 'pri' : 'ghost'} fw-apply" onclick="applyFoot('${r.ft}')">족형을 '${r.ft}'(으)로 선택하고 닫기</button>`;
}
function applyFoot(ft) { prof.ft = ft; document.querySelectorAll('#fft button').forEach(b => b.classList.toggle('on', b.textContent === ft)); closeFootGuide(); }
function closeFootGuide() { const m = $('#fwm'); if (m) { m.remove(); document.body.style.overflow = ''; } }
function openFootGuide() {
  closeFootGuide();
  const row = (k, m, w, d) => `<tr><th>${k}</th><td><b>${m}</b></td><td><b>${w}</b></td><td>${d}</td></tr>`;
  document.body.insertAdjacentHTML('beforeend', `<div class="modal on fwm" id="fwm" onclick="if(event.target===this)closeFootGuide()"><div class="fw-box" role="dialog" aria-label="발볼 기준">
    <button class="fw-x" onclick="closeFootGuide()" aria-label="닫기">✕</button>
    <h2>📏 발볼 기준보기</h2><p class="fw-sub">러닝화 발볼은 알파벳(폭 등급)으로 표기해요. 같은 발볼이라도 남성과 여성 표기가 한 칸씩 달라요.</p>
    <section class="fw-sec"><h3>남자 · 여자 발볼 기준</h3>
      <table class="fw-tb"><thead><tr><th>발볼</th><th>남성</th><th>여성</th><th>이런 분께</th></tr></thead><tbody>
        ${row('좁음', 'B', '2A', '칼발 · 발이 얇고 길쭉함')}${row('보통', 'D', 'B', '대부분 러닝화의 기본 폭')}${row('넓음', '2E', 'D', '발볼이 넓거나 발등이 높음')}${row('매우 넓음', '4E', '2E', '보통 신발이 새끼발가락을 누름')}
      </tbody></table>
      <p class="fw-note">한국인은 서양인보다 발볼이 넓은 편이라 2E(와이드)가 잘 맞는 경우가 많아요. 같은 등급도 브랜드마다 실제 폭이 조금씩 달라요.</p></section>
    <section class="fw-sec"><h3>발볼 측정법</h3><div class="fw-measure"><ol class="fw-steps fw-sync">
      <li><b>저녁에, 양말을 신고</b><span>발은 하루 중 저녁에 가장 커요. 달릴 때 신는 양말을 신어요.</span></li>
      <li><b>종이 위에 서서 발 테두리 그리기</b><span>체중을 실어 바르게 서고, 펜을 세워 발 모양을 따라 그려요.</span></li>
      <li><b>발길이 재기</b><span>뒤꿈치 끝부터 가장 긴 발가락 끝까지의 직선 길이(mm)예요.</span></li>
      <li><b>발볼 너비 재기</b><span>엄지발가락 뿌리 관절과 새끼발가락 뿌리 관절 사이, 가장 넓은 폭(mm)이에요.</span></li>
      <li><b>큰 발 기준으로</b><span>양발을 모두 재고 더 큰 쪽 숫자를 써요.</span></li></ol><div class="fw-anim" aria-hidden="true"><svg viewBox="0 0 220 320">
  <rect x="14" y="6" width="192" height="308" rx="10" class="fa-paper"/>
  <g class="fa-foot"><path d="M100 288 C74 288 62 268 63 240 C64 212 60 188 56 162 C52 136 52 112 60 94 C68 78 82 70 100 70 C118 70 134 76 142 90 C150 104 150 124 146 146 C142 168 138 190 136 214 C134 244 128 288 100 288 Z"/><ellipse cx="74" cy="50" rx="13" ry="17"/><ellipse cx="98" cy="42" rx="9" ry="11"/><ellipse cx="116" cy="46" rx="8" ry="10"/><ellipse cx="131" cy="54" rx="7" ry="9"/><ellipse cx="143" cy="67" rx="6" ry="8"/></g>
  <path class="fa-trace" d="M100 288 C74 288 62 268 63 240 C64 212 60 188 56 162 C52 136 52 112 60 94 C68 78 82 70 100 70 C118 70 134 76 142 90 C150 104 150 124 146 146 C142 168 138 190 136 214 C134 244 128 288 100 288 Z" pathLength="100"/>
  <circle class="fa-pen" r="5" style="offset-path:path('M100 288 C74 288 62 268 63 240 C64 212 60 188 56 162 C52 136 52 112 60 94 C68 78 82 70 100 70 C118 70 134 76 142 90 C150 104 150 124 146 146 C142 168 138 190 136 214 C134 244 128 288 100 288 Z')"/>
  <g class="fa-len"><line x1="182" y1="288" x2="182" y2="30"/><path d="M176 38 l6 -8 6 8 M176 280 l6 8 6 -8"/><line class="fa-tick" x1="100" y1="288" x2="190" y2="288"/><line class="fa-tick" x1="74" y1="32" x2="190" y2="32"/>
    <g class="fa-lbl"><rect x="148" y="146" width="66" height="26" rx="13"/><text x="181" y="163">발길이</text></g></g>
  <g class="fa-wid"><line x1="54" y1="108" x2="150" y2="108"/><path d="M62 102 l-8 6 8 6 M142 102 l8 6 -8 6"/>
    <g class="fa-lbl"><rect x="66" y="116" width="68" height="26" rx="13"/><text x="100" y="133">발볼 너비</text></g></g>
  <circle class="fa-dot d1" cx="57" cy="110" r="5"/><circle class="fa-dot d2" cx="148" cy="108" r="5"/>
</svg></div></div></section>
    <section class="fw-sec"><h3>내 추천 발볼 등급 계산</h3>
      <div class="fw-calc"><div class="seg" style="--n:2" id="fwg">${['남성', '여성'].map(g => `<button type="button" class="${prof.g === g ? 'on' : ''}" onclick="[...this.parentNode.children].forEach(b=>b.classList.toggle('on',b===this));calcFoot()">${g}</button>`).join('')}</div>
        <div class="inp"><input id="fwl" type="number" placeholder="발길이" min="150" max="340" oninput="calcFoot()"><span>mm</span></div>
        <div class="inp"><input id="fwd" type="number" placeholder="발볼 너비" min="60" max="150" oninput="calcFoot()"><span>mm</span></div></div>
      <div id="fwr"><p class="fw-hint">발길이와 발볼 너비를 넣으면 추천 등급이 나와요. (예: 남성 270mm · 100mm → 보통 D)</p></div>
      <p class="fw-note">발볼 비율(발볼 너비 ÷ 발길이)로 계산한 참고용 근사치예요. 정확한 핏은 매장에서 신어 보고 확인하세요.</p></section>
    <section class="fw-sec"><h3>족형별 고르는 법</h3><div class="fw-types">
      <div style="--fc:#0891b2"><b>넓은 발볼</b><p>2E·4E 와이드 버전이 있거나 앞코가 넓은 모델을 고르세요. 사이즈를 올리기보다 폭을 넓히는 게 좋아요.</p></div>
      <div style="--fc:#7c3aed"><b>칼발</b><p>앞코가 좁고 발을 단단히 잡아 주는 모델이 잘 맞아요. 넓은 신발은 발이 안에서 미끄러져요.</p></div>
      <div style="--fc:#c2410c"><b>평발</b><p>발 안쪽 아치가 무너지기 쉬워요. 안쪽을 받쳐 주는 안정화(과내전 지지)를 고르세요.</p></div></div></section>
  </div></div>`);
  document.body.style.overflow = 'hidden';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeFootGuide(); });
