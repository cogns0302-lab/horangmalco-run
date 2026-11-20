/* ===== 러닝 아이템 (2026년 11월 기준) =====
   가격: 각 공식몰·공식 판매처 표시가 (할인가는 시기마다 달라요)
   사진: 각 공식 판매 페이지의 제품 사진을 그대로 불러와요 (클릭하면 그 페이지로 이동) */
const GEAR_USD = 1400; // 해외 가격 정렬용 대략 환산 (1달러 ≈ 1,400원)
const GEAR_TIER = {
  cheap: ['가성비', '#16a34a', '알리·쿠팡·데카트론처럼 싸게 시작'],
  mid: ['중급', '#2563eb', '꾸준히 달리는 러너의 표준'],
  high: ['하이엔드', '#7c3aed', '소재·기능 모두 최상급'],
  pro: ['선수용', '#dc2626', '엘리트·대회용으로 검증된 모델'],
};
const GEAR_CATS = [
  ['set', '🎁', '풀세트', '거지 ~ 선수 세트'],
  ['daiso', '🏪', '다이소', '1천~5천 원 러닝템'],
  ['watch', '⌚', '워치', '러닝워치 · 스마트워치'],
  ['ear', '🎧', '이어폰', '골전도 · 오픈형 · 클립형'],
  ['cap', '🧢', '모자', '캡 · 바이저'],
  ['vest', '🎒', '조끼', '러닝 베스트 · 하이드레이션'],
  ['belt', '👝', '러닝벨트', '밴드형 · 파우치형'],
  ['sun', '🕶️', '선글라스', '편광 · 프리즘 렌즈'],
  ['sock', '🧦', '양말', '쿠션 · 발가락 · 메리노'],
  ['wear', '👕', '의류', '남성 · 여성 · 상의 · 하의'],
];

/* ---------- 시계 ---------- */
const WATCH_BRANDS = {
  samsung: { n: '삼성 갤럭시', c: '#1d4ed8', os: '안드로이드 전용', pros: ['갤럭시 폰과 완벽 연동 · 삼성페이', '밝은 AMOLED 화면 (워치9 최대 3,000니트)', '국내 서비스센터가 가장 많아요'], cons: ['아이폰에서는 못 써요', '배터리가 1~2일 (울트라 제외)', '러닝 분석 깊이는 가민·코로스보다 얕아요'] },
  apple: { n: '애플워치', c: '#94a3b8', os: '아이폰 전용', pros: ['아이폰 연동·앱 생태계 최고 (나이키 런 클럽·스트라바)', '심박·건강 기능이 촘촘해요', '셀룰러로 폰 없이 음악·통화'], cons: ['안드로이드에서는 못 써요', '배터리가 짧아 매일 충전', '같은 기능 대비 가장 비싸요'] },
  garmin: { n: '가민', c: '#0ea5e9', os: '안드로이드·아이폰', pros: ['러닝 분석 최강 (트레이닝 레디니스·레이스 예측·HRV)', '배터리 1~2주 · 듀얼밴드 GPS', '국내 공식몰·브랜드샵 A/S'], cons: ['같은 급 대비 비싸요', '앱·스마트 기능은 단순한 편', '메뉴가 많아 처음엔 어려워요'] },
  xiaomi: { n: '샤오미', c: '#f97316', os: '안드로이드·아이폰', pros: ['7만 원대부터 — 가장 싸게 시작', '배터리 최대 21일', '가볍고 24시간 차기 편해요'], cons: ['러닝 지표가 단순해요', '밴드는 화면이 작아 기록 보기 불편', '정밀한 훈련용으로는 부족'] },
  suunto: { n: '순토', c: '#64748b', os: '안드로이드·아이폰', pros: ['핀란드 아웃도어 감성·튼튼한 마감', '지도·트레일 기능', '긴 배터리'], cons: ['국내 구매처가 코오롱몰 등으로 한정적', '앱 생태계가 작아요', '러닝 분석은 가민보다 단순'] },
  amazfit: { n: '어메이즈핏', c: '#14b8a6', os: '안드로이드·아이폰', pros: ['같은 급 대비 싼 가격 · 구독료 없음', '러닝 파워·젖산역치 등 지표', '배터리 길어요'], cons: ['국내는 치타 2 프로 등 일부 모델만 공식 출시', '앱 완성도가 아쉬워요', '국내 판매처가 적어요'] },
};
const WATCHES = [
  { id: 'fit3', wb: 'samsung', n: '갤럭시 핏3', t: 'cheap', krw: 89000, img: 'https://images.samsung.com/kdp/goods/2024/03/12/bbaf0b08-02cd-4c20-9f23-64d411c662d3.png', url: 'https://www.samsung.com/sec/watches/galaxy-fit3-r390/SM-R390NZAAKOO/', shop: '삼성닷컴', spec: '배터리 최대 13일 · 밴드형', pts: ['갤럭시 폰 사용자의 입문 밴드', 'GPS는 폰 연결형'], beg: 1 },
  { id: 'gw9', wb: 'samsung', n: '갤럭시 워치9', t: 'mid', krw: 499000, pn: '40mm 블루투스 · 44mm 53.9만', img: 'https://images.samsung.com/kdp/goods/2026/07/01/e7561c34-d6ad-492f-9805-00e7717fd35d.png', url: 'https://www.samsung.com/sec/watches/galaxy-watch9/buy/?modelCode=SM-L355NZSAKOO', shop: '삼성닷컴', spec: '2026.8 출시 · 스냅드래곤 칩 · 배터리 20%↑', pts: ['일일 유산소 부하·체력 지수 등 새 지표', '안드로이드 러너의 올라운더'], beg: 1 },
  { id: 'gwu2', wb: 'samsung', n: '갤럭시 워치 울트라2', t: 'high', krw: 969100, img: 'https://images.samsung.com/kdp/goods/2026/07/01/c14ca24b-7fb9-4782-9693-95b6d42548e5.png', url: 'https://www.samsung.com/sec/watches/galaxywatch-ultra2-l715/SM-L715NZSAKOO/', shop: '삼성닷컴', spec: '800mAh · 5,000니트 · IP69K · LTE', pts: ['트레일 러닝 고도·지면 분석', '땀 손실 기반 수분 보충 알림'] },
  { cv: 1, id: 'awse3', wb: 'apple', n: '애플워치 SE 3', t: 'cheap', krw: 369000, pn: '40mm GPS · 44mm 40.9만', img: 'https://www.apple.com/kr/apple-watch-se-3/images/meta/apple-watch-se-3__d0wwc67lzg02_og.png', url: 'https://www.apple.com/kr/apple-watch-se-3/', shop: '애플 공식', spec: '아이폰 입문 워치 · 고혈압 알림 지원', pts: ['아이폰 러너의 가장 싼 선택', '2분기 애플 출하의 큰 몫'], beg: 1 },
  { cv: 1, id: 'aw12', wb: 'apple', n: '애플워치 시리즈 12', t: 'mid', krw: 599000, img: 'https://www.apple.com/kr/apple-watch-series-12/images/meta/apple-watch-series-12__ep17epp8v16q_og.png', url: 'https://www.apple.com/kr/apple-watch-series-12/', shop: '애플 공식', spec: '2026.9 출시 · 새 건강 센서', pts: ['일상+러닝 모두 무난', 'GPS / 셀룰러 선택'] },
  { cv: 1, id: 'awu4', wb: 'apple', n: '애플워치 울트라 4', t: 'high', krw: 1249000, img: 'https://www.apple.com/kr/apple-watch-ultra-4/images/meta/apple-watch-ultra-4__bzmdvy2wwb2a_og.png', url: 'https://www.apple.com/kr/apple-watch-ultra-4/', shop: '애플 공식', spec: '셀룰러 기본 · 티타늄', pts: ['애플워치 중 배터리·GPS 최상', '트레일·철인 3종용'], elite: 1 },
  { id: 'fr70', wb: 'garmin', n: '가민 포러너 70', t: 'cheap', krw: 399000, img: 'https://res.garmin.com/ko_KR/products/010-04307-10/v/cf-lg.jpg', url: 'https://www.garmin.com/ko-KR/p/1941179', shop: '가민 공식', spec: '2026.5 출시 · AMOLED · 배터리 13일 · 40g', pts: ['가민 러닝 기능을 가장 싸게', '5버튼 + 터치'], beg: 1 },
  { id: 'fr170', wb: 'garmin', n: '가민 포러너 170', t: 'mid', krw: 479000, pn: '뮤직 모델 55.9만', img: 'https://res.garmin.com/ko_KR/products/010-03920-50/v/cf-lg.jpg', url: 'https://www.garmin.com/ko-KR/p/1915560', shop: '가민 공식', spec: '배터리 10일 · 가민페이 · 고도계', pts: ['70에 기압 고도계·나침반·결제 추가', '하프·풀 입문 훈련용'], beg: 1 },
  { id: 'fr570', wb: 'garmin', n: '가민 포러너 570', t: 'high', krw: 799000, img: 'https://res.garmin.com/ko_KR/products/010-02970-40/v/cf-lg.jpg', url: 'https://www.garmin.com/ko-KR/p/1463821', shop: '가민 공식', spec: 'GPS 18시간 · 스마트 11일 · 스피커·마이크', pts: ['풀코스 준비 러너의 정석', '42mm·47mm 두 가지'] },
  { id: 'fr970', wb: 'garmin', n: '가민 포러너 970', t: 'pro', krw: 1089000, img: 'https://res.garmin.com/ko_KR/products/010-02969-60/v/cf-lg.jpg', url: 'https://www.garmin.com/ko-KR/p/1462801', shop: '가민 공식', spec: 'GPS 26시간 · 15일 · 사파이어·티타늄 · 지도', pts: ['러닝 톨러런스·플래시라이트', 'HRM 600 연동 러닝 지표'], elite: 1 },
  { id: 'fenix9', wb: 'garmin', n: '가민 페닉스 9', t: 'pro', krw: 1490000, pn: '43mm', img: 'https://res.garmin.com/ko_KR/products/010-04761-05/v/cf-lg.jpg', url: 'https://www.garmin.com/ko-KR/p/2021177', shop: '가민 공식', spec: '신제품 · AMOLED · 티타늄 베젤', pts: ['멀티스포츠·트레일 최상위', '러닝 전용보다 크고 무거워요'], elite: 1 },
  { cv: 1, id: 'band11', wb: 'xiaomi', n: '샤오미 스마트밴드 11', t: 'cheap', krw: 76800, img: 'https://i02.appmifile.com/mi-com-product/fly-birds/xiaomi-smart-band-11/pc/bg-screen01-v3.jpg', url: 'https://www.mi.com/kr/product/xiaomi-smart-band-11/buy/', shop: '샤오미 공식', spec: '배터리 최대 21일 · AMOLED', pts: ['가장 싼 러닝 기록 입문', '심박·수면·SpO₂'], beg: 1 },
  { id: 'band10p', wb: 'xiaomi', n: '샤오미 스마트밴드 10 프로', t: 'cheap', krw: 99800, img: 'https://i02.appmifile.com/736_item_kr/17/06/2026/f2d44cb1a24df84d0bf532019125265b.png', url: 'https://www.mi.com/kr/product/xiaomi-smart-band-10-pro/buy/', shop: '샤오미 공식', spec: '1.74인치 AMOLED', pts: ['밴드보다 큰 화면', '10만 원 아래'] },
  { id: 's5', wb: 'xiaomi', n: '샤오미 워치 S5 46mm', t: 'mid', krw: 244800, img: 'https://i02.appmifile.com/268_item_kr/17/06/2026/337825a0292efb00793f45e6468584c4.png', url: 'https://www.mi.com/kr/product/xiaomi-watch-s5-46mm/buy/', shop: '샤오미 공식', spec: '듀얼밴드 GNSS · 배터리 21일', pts: ['20만 원대 듀얼밴드 GPS', '시계형 디자인'] },
  { id: 'srun', wb: 'suunto', n: '순토 런', t: 'mid', krw: 399000, img: 'https://images.kolonmall.com/Prod_Img/10003602/2024/LS1/K1788506267461098NO01_LS1.jpg', url: 'https://www.kolonmall.com/Product/K1788506267461098NO01', shop: '코오롱몰 순토', spec: '러너 전용 경량 AMOLED', pts: ['순토 최초 러닝 특화 모델', '가볍고 깔끔한 디자인'] },
  { id: 'srace2', wb: 'suunto', n: '순토 레이스 2', t: 'high', krw: 890000, pn: '티타늄 109만', img: 'https://images.kolonmall.com/Prod_Img/10003602/2024/LS1/K1788504859733011NO01_LS1.jpg', url: 'https://www.kolonmall.com/Product/K1788504859733011NO01', shop: '코오롱몰 순토', spec: '1.5인치 AMOLED · 사파이어', pts: ['지도·트레일 최상급', '티타늄 버전 65g'], elite: 1 },
  { id: 'cheetah2p', wb: 'amazfit', n: '어메이즈핏 치타 2 프로', t: 'high', krw: 659000, pn: '쿠팡 표시 정가 · 할인 잦음', img: 'https://us.amazfit.com/cdn/shop/files/Main_image_with_hycridcharge_e67ed706-172a-467a-831d-c4c61d0e572f.jpg', url: 'https://www.coupang.com/np/search?q=%EC%96%B4%EB%A9%94%EC%9D%B4%EC%A6%88%ED%95%8F%20%EC%B9%98%ED%83%80%202%20%ED%94%84%EB%A1%9C', shop: '쿠팡', spec: '2026.4 국내 공식 출시 · 티타늄 · 러닝 파워', pts: ['마라톤 준비용 지표 (VO₂max·젖산역치)', '가민 570보다 14만 원 싸요'] },
];
/* 시장 점유율·출하 (조사 기관마다 기준이 달라 따로 표시) */
const WATCH_MKT = {
  om: { src: '옴디아 · 2026년 2분기 세계 스마트워치 출하량', d: [['애플', 46, '#cbd5e1'], ['삼성', 15, '#1d4ed8'], ['가민', 15, '#0ea5e9'], ['기타', 24, '#475569']] },
  gr: { src: '카운터포인트리서치 · 출하량 전년 대비 (삼성은 1분기, 나머지는 2분기)', d: [['애플', 14], ['가민', 11], ['삼성', -28], ['샤오미', -38]] },
};
/* 종합 판매순위: 국내만 따로 집계한 공개 자료가 없어, 국내 공식 판매 브랜드의 세계 출하 순위로 표시 */
const WATCH_SALES = [
  [1, '애플', '46%', '옴디아 2026년 2분기 스마트워치 1위 — 애플 출하의 80% 이상이 시리즈 11·SE 3', 'awse3'],
  [2, '삼성', '15%', '가민과 같은 15%지만 판매 대수는 근소하게 앞서요 (옴디아)', 'gw9'],
  [3, '가민', '15%', '1년 새 11% → 15% · 출하 +11% — 포러너 시리즈가 견인', 'fr570'],
  [4, '샤오미', '밴드 17%', '화면 있는 밴드 시장에서 화웨이 다음 2위 (옴디아)', 'band11'],
  [5, '순토 · 어메이즈핏', '비공개', '점유율이 따로 공개되지 않는 러닝워치 전문 브랜드', 'srun'],
];
const WATCH_TIPS = [
  ['🌱', '입문', '주 1~2회 · 5~10km', '10~40만 원', ['심박·거리·페이스만 정확하면 충분', '폰 GPS를 빌리는 밴드도 OK', '가볍고 매일 차기 편한 것'], ['band11', 'fr70', 'awse3']],
  ['🏃', '중급', '하프·10km 기록 단축', '25~60만 원', ['시계 자체 GPS (폰 없이 달리기)', '인터벌 훈련 설정·회복 시간', '배터리 1주 이상이면 편해요'], ['fr170', 'gw9', 'srun']],
  ['🔥', '상급', '풀코스 · 서브4 목표', '60~110만 원', ['듀얼밴드 GPS — 빌딩숲에서도 정확', '훈련 부하·HRV·레이스 예측', 'GPS 배터리 20시간 이상'], ['fr570', 'srace2', 'cheetah2p']],
  ['🏆', '엘리트·트레일', '서브3 · 울트라 · 산악', '100만 원+', ['외부 심박계(가슴 스트랩) 연동', '지도·고도·긴 배터리', '무게까지 따지는 레이스 세팅'], ['fr970', 'fenix9', 'awu4']],
];
const WATCH_RULES = [
  ['📱', '내 폰부터 확인', '애플워치는 아이폰, 갤럭시 워치는 안드로이드 전용. 가민·순토·샤오미·어메이즈핏은 둘 다 돼요.'],
  ['🔋', '배터리 = 충전 스트레스', '스마트워치(애플·갤럭시)는 1~2일, 러닝워치(가민·순토)는 1~3주.'],
  ['🛰️', '듀얼밴드 GPS', '도심 빌딩 사이에서 페이스가 튀지 않아요. 기록용이면 꼭 확인.'],
  ['⚖️', '무게 40g대', '손목이 가벼워야 풀코스 후반까지 신경 쓰이지 않아요.'],
];
/* 워치 추천 순위 — 레벨별 (1~3위 카드, 4위부터 더보기) */
const WATCH_LV = [
  ['🌱 입문', '첫 러닝 · 주 1~3회', [['fr70', '가민 러닝 기능을 40만 원 아래로 — 입문 정답'], ['awse3', '아이폰이면 가장 싼 애플워치'], ['band11', '7만 원대로 기록 시작'], ['s5', '20만 원대 듀얼밴드 GPS'], ['fit3', '갤럭시 폰 사용자의 입문 밴드'], ['band10p', '큰 화면 밴드']]],
  ['🏃 중수', '하프·풀 준비 · 기록 단축', [['fr170', '고도계·결제까지 갖춘 훈련용 가민'], ['gw9', '안드로이드 러너의 일상+러닝 올라운더'], ['srun', '가볍고 깔끔한 러닝 전용'], ['aw12', '아이폰 러너의 올라운더'], ['cheetah2p', '가민 대비 싼 마라톤 지표 워치']]],
  ['🏆 선수', '서브3 · 울트라 · 트레일', [['fr970', '러닝 톨러런스·지도까지 — 러닝워치 최상위'], ['fr570', '풀코스 기록 도전의 정석'], ['fenix9', '멀티스포츠·트레일 플래그십'], ['srace2', '지도·트레일 최상급'], ['awu4', '애플워치 최상위'], ['gwu2', '트레일·장거리용 갤럭시']]],
];
function gearLv3() {
  const row = (p, why, r) => `<li ${gOpen(p.id)}><span class="lv3-n r${r}">${r}</span><span class="lv3-im ${p.cv ? 'cv' : ''}">${gImg(p.img, p.n)}</span><span class="lv3-tx"><b>${esc(p.n)}</b><strong>${gPrice(p)}</strong><small>${esc(why)}</small></span></li>`;
  return `<div class="lv3">${WATCH_LV.map(([lv, d, L]) => `<div class="lv3-c"><div class="lv3-h"><b>${lv}</b><small>${d}</small></div>
    <ol>${L.slice(0, 3).map(([id, why], i) => row(GEAR_ALL[id], why, i + 1)).join('')}</ol>
    ${L.length > 3 ? `<ol class="lv3-more" hidden>${L.slice(3).map(([id, why], i) => row(GEAR_ALL[id], why, i + 4)).join('')}</ol><button type="button" class="gb-btn" onclick="gearLvMore(this)">더보기 · 4~${L.length}위 ▾</button>` : ''}</div>`).join('')}</div>`;
}
function gearLvMore(btn) { const o = btn.previousElementSibling; btn.dataset.t = btn.dataset.t || btn.textContent; o.hidden = !o.hidden; btn.textContent = o.hidden ? btn.dataset.t : '접기 ▴'; }
function gearLv(btn, i) {
  const sec = btn.closest('section');
  sec.querySelectorAll('.wlv-t button').forEach((b, j) => b.classList.toggle('on', j === i));
  sec.querySelectorAll('.wlv').forEach((d, j) => { d.hidden = j !== i; if (j === i) { d.querySelectorAll('.grow').forEach(e => e.classList.add('play')); d.classList.remove('pg-in'); void d.offsetWidth; d.classList.add('pg-in'); } });
}
/* (예전 단일 순위) */
const WATCH_RANK = [['fr570', '러닝 기능·배터리·가격 균형이 가장 좋은 "정답" 러닝워치'], ['gw9', '안드로이드 러너의 일상+러닝 올라운더'], ['fr170', '40만 원대로 가민 훈련 기능 대부분'],
  ['awse3', '아이폰 러너의 가장 싼 정답'], ['fr970', '풀코스 기록 도전용 최상위 러닝워치'], ['srun', '가볍고 깔끔한 러닝 전용'], ['fr70', '가민을 가장 싸게 시작'], ['band11', '7만 원대 입문 밴드'],
  ['cheetah2p', '가민 570 대비 싼 마라톤 지표 워치'], ['aw12', '일상과 러닝 모두 무난한 애플워치'], ['srace2', '지도·트레일 최상급'], ['gwu2', '트레일·장거리용 갤럭시'], ['awu4', '애플워치 최상위'],
  ['fenix9', '멀티스포츠 플래그십'], ['s5', '20만 원대 듀얼밴드 GPS'], ['band10p', '큰 화면 밴드'], ['fit3', '갤럭시 폰 사용자의 입문 밴드']];

/* ---------- 다른 아이템 ---------- */
const GEAR = {
  ear: {
    types: [['🦴', '골전도 헤드형', '광대뼈 진동으로 소리 전달 — 귀가 완전히 열려 차 소리까지 들려요. 흔들림이 거의 없어 러닝 정석.', '저음이 약하고 볼륨을 올리면 진동이 느껴져요'],
      ['👂', '오픈형 이어훅', '귀 앞 작은 스피커 — 골전도보다 음질이 좋고 편해요.', '소리가 새고 바람 소리가 섞여요'],
      ['📎', '이어커프·클립형', '귀에 집게처럼 걸어요 — 작고 모자·선글라스와 덜 부딪혀요.', '격하게 뛰면 흔들림 개인차'],
      ['🔇', '커널형 스포츠', '귀를 막는 이어팁 + 이어훅 — 음질·노캔 최고.', '주변 소리가 막혀 도로에선 주변음 모드 필수'],
      ['🎵', '일상용 무선', '출퇴근 겸용 무선 이어폰 — 노캔·통화·음질이 좋아요.', '러닝 고정 장치가 없어 격하게 뛰면 빠질 수 있어요'],
      ['🏊', '수영·철인용', '물속에서도 재생 — 철인 3종 훈련용.', '블루투스는 물속에서 끊겨 내장 MP3로 들어요']],
    rules: [['🚗', '도로 러닝은 귀를 여는 형태', '골전도·오픈형이 안전해요. 대회 규정상 이어폰을 막는 곳도 있으니 확인하세요.'], ['💦', '방수 IP55 이상', '땀·비에 강해야 오래 써요.'], ['🔋', '재생 8시간+', '풀코스 + 이동 시간까지 버텨요.']],
    items: [
      { n: 'QCY 크로스키 C50', b: 'QCY', ty: '이어커프·클립형', t: 'cheap', usd: 39.99, img: 'https://www.qcy.com/cdn/shop/files/ct06_1_ea12e5c0-8b99-420d-8ead-e144faef5dda.png', url: 'https://www.qcy.com/products/qcy-crossky-c50', shop: 'QCY 공식 (해외) · 알리 공식스토어', pts: ['4만 원대 클립형 — 가성비 끝판왕', '재생 35시간 (케이스 포함)'], beg: 1 },
      { n: '사운드코어 에어로핏 2', b: '앤커', ty: '오픈형 이어훅', t: 'cheap', usd: 129.99, pn: '쿠팡 정가 15.9만~', img: 'https://cdn.shopify.com/s/files/1/0516/3761/6830/files/A3874Z11_Rich_image_TD01_US_V2.png', url: 'https://www.soundcore.com/products/a3874-aerofit-2-open-earbuds', shop: '사운드코어 공식 (해외)', pts: ['각도 조절 이어훅 · IP55', 'LDAC 고음질'], beg: 1 },
      { n: '보스 스포츠 오픈 이어버드', b: '보스', ty: '오픈형 이어훅', t: 'mid', krw: 249000, img: 'https://cdn.imweb.me/thumbnail/20261109/6f53806f57f17.jpg', url: 'https://www.bose.co.kr/1277865808/?idx=427', shop: '보스 공식', pts: ['운동용 실리콘 커프 · IP54', '보스 음질을 오픈형으로'] },
      { n: '샥즈 오픈핏 2+', b: '샥즈', ty: '오픈형 이어훅', t: 'mid', krw: 289000, img: 'https://static.shokz.co.kr/resource/2026/08/24/OpenFit2_________6a8c0c3c826f8.webp', url: 'https://shokz.co.kr/shop/item.php?it_id=openfit2plus', shop: '샥즈 공식', pts: ['가장 편한 오픈형 이어훅', '무선 충전 지원'], beg: 1 },
      { n: '샥즈 오픈런 프로 2', b: '샥즈', ty: '골전도 헤드형', t: 'pro', krw: 249000, img: 'https://static.shokz.co.kr/resource/2026/08/24/OpenRun_Pro_2_____6a8bb2794637b.webp', url: 'https://shokz.co.kr/shop/openrun-pro2', shop: '샥즈 공식', pts: ['킵초게가 쓰는 러닝 이어폰 대명사', 'IP55 · 최대 12시간'], elite: 1 },
      { cv: 1, n: '파워비츠 프로 2', b: '비츠', ty: '커널형 스포츠', t: 'high', krw: 369000, img: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MX743?wid=1200&hei=630&fmt=jpeg&qlt=95', url: 'https://www.apple.com/kr/shop/product/mx743zp/a/powerbeats-pro-2-%EA%B3%A0%EC%84%B1%EB%8A%A5-%EC%9D%B4%EC%96%B4%EB%B2%84%EB%93%9C-%EC%9D%BC%EB%A0%89%ED%8A%B8%EB%A6%AD-%EC%98%A4%EB%A0%8C%EC%A7%80', shop: '애플 공식', pts: ['심박 측정 · 노이즈 캔슬링', '이어훅으로 절대 안 빠져요 · 최대 45시간'], elite: 1 },
      { cv: 1, n: '에어팟 프로 3', b: '애플', ty: '커널형 스포츠', t: 'high', krw: 369000, img: 'https://www.apple.com/v/airpods-pro/t/images/meta/og__c0ceegchesom_overview.png', url: 'https://www.apple.com/kr/shop/buy-airpods/airpods-pro-3', shop: '애플 공식', pts: ['운동 중 심박 측정', '노캔 최강 — 러닝 땐 주변음 모드로'] },
      { n: '보스 울트라 오픈 이어버드 2세대', b: '보스', ty: '이어커프·클립형', t: 'high', krw: 359000, img: 'https://cdn.imweb.me/thumbnail/20261109/42ee0a4f5fca3.jpg', url: 'https://www.bose.co.kr/408/?idx=426', shop: '보스 공식', pts: ['클립형 하이엔드 음질', '2026년 9월 출시'] },
      { n: '샥즈 오픈핏 프로', b: '샥즈', ty: '오픈형 이어훅', t: 'high', krw: 369000, img: 'https://static.shokz.co.kr/resource/2026/08/24/OpenFit_Pro________6a8c0c670d55e.webp', url: 'https://shokz.co.kr/shop/openfit-pro', shop: '샥즈 공식', pts: ['2026년 3월 출시 직후 완판 화제', '샥즈 오픈형 최상위'] },
{ n: '샥즈 오픈무브', b: '샥즈', ty: '골전도 헤드형', t: 'cheap', krw: 119000, img: 'https://static.shokz.co.kr/resource/2026/07/29/Openmove_____6a69b6025fb94.webp', url: 'https://shokz.co.kr/shop/1633507126', shop: '샥즈 공식', pts: ['샥즈 골전도 입문 모델 — 12만 원', 'IP55 · 최대 6시간'], cons: ['오픈런보다 배터리·방수가 약해요'], beg: 1 },
      { n: '샥즈 오픈런 에어 2', b: '샥즈', ty: '골전도 헤드형', t: 'mid', krw: 215000, img: 'https://static.shokz.co.kr/resource/2026/09/14/OpenRunAir2-______-___-__________01_6aa79dfa03270.webp', url: 'https://shokz.co.kr/shop/openrun-air-2', shop: '샥즈 공식', pts: ['2026 신제품 — 오픈런 계열 경량 모델', '스탠다드·미니 사이즈'], cons: ['프로 2보다 저음이 약해요'] },
      { n: '샥즈 오픈핏 에어 2', b: '샥즈', ty: '오픈형 이어훅', t: 'mid', krw: 215000, img: 'https://static.shokz.co.kr/resource/2026/08/19/___1_6a85527e522bb.webp', url: 'https://shokz.co.kr/shop/openfit-air-2', shop: '샥즈 공식', pts: ['2026 신제품 — 가벼운 오픈형 이어훅', '오픈핏 2+보다 7만 원 저렴'], cons: ['무선 충전·고급 기능은 2+에만'] },
      { n: '샥즈 오픈닷 에어', b: '샥즈', ty: '이어커프·클립형', t: 'mid', krw: 199000, img: 'https://static.shokz.co.kr/resource/2026/07/06/Opendots_Air________6a4b81984899a.webp', url: 'https://shokz.co.kr/shop/opendots-air', shop: '샥즈 공식', pts: ['2026 신제품 — 샥즈 클립형 중 가장 저렴', '가볍고 작아요'], cons: ['오픈닷 2보다 배터리·음질이 낮아요'] },
      { n: '샥즈 오픈닷 원', b: '샥즈', ty: '이어커프·클립형', t: 'mid', krw: 231200, img: 'https://static.shokz.co.kr/resource/2026/07/06/Opendots_2________6a4b8319b7478.webp', url: 'https://shokz.co.kr/shop/opendotsone', shop: '샥즈 공식', pts: ['샥즈 첫 클립형 이어폰', '할인가 23만 원대'], cons: ['신형 오픈닷 2가 나왔어요'] },
      { n: '샥즈 오픈닷 2', b: '샥즈', ty: '이어커프·클립형', t: 'high', krw: 299000, img: 'https://static.shokz.co.kr/resource/2026/07/06/Opendots2________6a4b81252f99a.webp', url: 'https://shokz.co.kr/shop/opendots-2', shop: '샥즈 공식', pts: ['샥즈 클립형 플래그십 · 돌비 오디오', 'IP57 · 최대 40시간'], cons: ['29.9만 원'] },
      { n: '샥즈 오픈컴 2', b: '샥즈', ty: '업무·통화용', t: 'mid', krw: 214000, img: 'https://static.shokz.co.kr/resource/2026/07/29/Opencomm_2_6a69b6f2ebe1e.webp', url: 'https://shokz.co.kr/shop/opencomm2', shop: '샥즈 공식', pts: ['붐 마이크 달린 골전도 — 통화·업무용', '러닝 중 통화가 잦다면'], cons: ['러닝 전용보다 무거워요'], lineup: 1 },
      { n: '샥즈 오픈컴 2 UC', b: '샥즈', ty: '업무·통화용', t: 'high', krw: 279000, img: 'https://static.shokz.co.kr/resource/2026/07/20/OpenComm_2_UC_USB-A_6a545ab91e57b_6a5dcfe2ed37a.webp', url: 'https://shokz.co.kr/shop/opencomm2uc', shop: '샥즈 공식', pts: ['USB 동글 포함 화상회의용', '노이즈 캔슬링 마이크'], cons: ['러닝용은 아니에요'], lineup: 1 },
      { n: '샥즈 오픈밋', b: '샥즈', ty: '업무·통화용', t: 'mid', krw: 197400, img: 'https://static.shokz.co.kr/resource/2026/07/09/OpenMeet_6a4f76d1b829e.webp', url: 'https://shokz.co.kr/shop/openmeet', shop: '샥즈 공식', pts: ['오픈형 업무용 헤드셋', '장시간 착용 편안'], cons: ['러닝용은 아니에요'], lineup: 1 },
      { n: 'QCY 크로스키 C30S', b: 'QCY', ty: '이어커프·클립형', t: 'cheap', usd: 47.99, img: 'https://www.qcy.com/cdn/shop/files/T33_S_-_-1_9b21bfe4-ac4f-4fdd-9556-5ed93f57cca3.png', url: 'https://www.qcy.com/products/qcy-crossky-c30s', shop: 'QCY 공식 (해외) · 국내 쿠팡·네이버 판매', pts: ['Hi-Res · 재생 40시간', 'IPX5 방수'], cons: ['국내가는 판매처마다 달라요'] },
      { n: '다이소 무선 이어폰 5천 원', b: '다이소', ty: '커널형 스포츠', t: 'cheap', krw: 5000, img: 'https://cdn.daisomall.co.kr/file/PD/20260528/3QZHTLGjQsHIUU1olD7x1069224_00_003QZHTLGjQsHIUU1olD7x.jpg', url: 'https://www.daisomall.co.kr/pd/pdr/SCR_PDR_0001?pdNo=1069224', shop: '다이소몰', pts: ['5천 원 블루투스 · 자동 페어링', '분실해도 부담 없어요'], cons: ['러닝 전용 설계가 아니라 빠질 수 있어요', '음질 평가는 엇갈려요'], beg: 1 },
      { n: "갤럭시 버즈 온", b: "삼성", ty: "이어커프·클립형", t: "mid", krw: 299000, img: "https://images.samsung.com/kdp/goods/2026/10/20/dd79a169-0fa6-4af5-9593-ac902e09875c.png", url: "https://www.samsung.com/sec/buds/galaxy-buds-on-u600/SM-U600NZKAKOO/", shop: "삼성닷컴", pts: ["갤럭시 최초 클립형 오픈 이어폰 (2026 신제품)","귀가 열린 완전 개방형 · 고개 끄덕여 전화 받기"], cons: ["29.9만 원으로 클립형 중 비싼 편","갤럭시 폰에서만 모든 기능"] },
      { n: "갤럭시 버즈4 프로", b: "삼성", ty: "일상용 무선", t: "high", krw: 323100, pn: "삼성닷컴 최대 혜택가", img: "https://images.samsung.com/kdp/goods/2026/02/03/33658cb7-cbfa-4200-bc59-9ada3ee1e459.png", url: "https://www.samsung.com/sec/buds/galaxy-buds4-pro-r640/SM-R640NZWAKOO/", shop: "삼성닷컴", pts: ["갤럭시 플래그십 노이즈 캔슬링","삼성닷컴 리뷰 8천 건+ · 평점 4.8"], cons: ["러닝 고정 장치가 없어요","도로에선 주변음 모드 필수"] },
      { n: "갤럭시 버즈4", b: "삼성", ty: "일상용 무선", t: "mid", krw: 220200, pn: "삼성닷컴 최대 혜택가", img: "https://images.samsung.com/kdp/goods/2026/02/03/75ca2f44-6013-406e-b0b3-b57086c33f2c.png", url: "https://www.samsung.com/sec/buds/galaxy-buds4-r540/SM-R540NZWAKOO/", shop: "삼성닷컴", pts: ["갤럭시 기본형 무선 이어폰","프로보다 10만 원 저렴"], cons: ["격하게 뛰면 빠질 수 있어요"] },
      { n: "갤럭시 버즈3 FE", b: "삼성", ty: "일상용 무선", t: "mid", krw: 135200, pn: "삼성닷컴 최대 혜택가", img: "https://images.samsung.com/kdp/goods/2025/09/08/86afadc6-2aa7-4f65-b944-6bd28dd1a632.png", url: "https://www.samsung.com/sec/buds/galaxy-buds3-r420/SM-R420NZKAKOO/", shop: "삼성닷컴", pts: ["갤럭시 버즈 입문 노캔 모델","13만 원대"], cons: ["러닝 고정 장치가 없어요"], beg: 1 },
      { n: "에어팟 5", b: "애플", ty: "일상용 무선", t: "mid", krw: 199000, pn: "무선 충전 케이스 모델 22.9만", img: "https://www.apple.com/v/airpods-5/a/images/meta/airpods-5__bwo9ith0md42_og.png", url: "https://www.apple.com/kr/airpods-5/", shop: "애플 공식", pts: ["2026 신제품 · 귀를 막지 않는 오픈핏","노이즈 캔슬링 탑재"], cons: ["이어팁·이어훅이 없어 격하게 뛰면 빠질 수 있어요","안드로이드에선 기능 제한"], cv: 1 },
      { n: "파워비츠 핏", b: "비츠", ty: "커널형 스포츠", t: "mid", krw: 279000, img: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ME2L4?wid=800&hei=800&fmt=jpeg&qlt=90", url: "https://www.apple.com/kr/shop/product/me2l4zp/a/", shop: "애플 공식", pts: ["윙팁으로 귀에 고정되는 운동용 이어폰","안드로이드·아이폰 모두 지원"], cons: ["귀를 막아 도로에선 주변음 모드 필수"] },
      { n: "비츠 스튜디오 버즈 +", b: "비츠", ty: "일상용 무선", t: "mid", krw: 229000, img: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MQLJ3?wid=800&hei=800&fmt=jpeg&qlt=90", url: "https://www.apple.com/kr/shop/product/mqlj3zp/a/", shop: "애플 공식", pts: ["노이즈 캔슬링 · 투명 디자인","안드로이드·아이폰 모두 지원"], cons: ["러닝 고정 장치가 없어요"] },
      { n: "비츠 솔로 버즈", b: "비츠", ty: "일상용 무선", t: "mid", krw: 109000, img: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MUW03?wid=800&hei=800&fmt=jpeg&qlt=90", url: "https://www.apple.com/kr/shop/product/muw03zp/a/", shop: "애플 공식", pts: ["비츠 가장 저렴한 무선 이어폰","작고 가벼워요"], cons: ["노캔 없음","케이스 배터리 없음"] },
      { n: "비츠 플렉스", b: "비츠", ty: "커널형 스포츠", t: "cheap", krw: 89000, img: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MYMG2?wid=800&hei=800&fmt=jpeg&qlt=90", url: "https://www.apple.com/kr/shop/product/mymg2zp/a/", shop: "애플 공식", pts: ["줄로 연결된 넥밴드 — 떨어뜨려도 안 잃어버려요","8.9만 원"], cons: ["줄이 뛸 때 흔들려요"], beg: 1 },
      { n: "보스 울트라 오픈 이어버드 1세대", b: "보스", ty: "이어커프·클립형", t: "high", krw: 359000, pn: "공식몰 할인가 27.9만", img: "https://cdn.imweb.me/thumbnail/20260428/9c4a234fc0fa8.jpg", url: "https://www.bose.co.kr/408/?idx=133", shop: "보스 공식", pts: ["클립형 하이엔드의 원조","2세대 출시 후 할인 중"], cons: ["오픈형이라 소리가 새요"] },
      { n: "보스 QC 울트라 이어버드 2세대", b: "보스", ty: "일상용 무선", t: "high", krw: 359000, pn: "공식몰 할인가 31만", img: "https://cdn.imweb.me/thumbnail/20251010/65389944c7296.jpg", url: "https://www.bose.co.kr/408/?idx=253", shop: "보스 공식", pts: ["노이즈 캔슬링 최상급","보스 플래그십 이어폰"], cons: ["귀를 막아 도로에선 주변음 모드 필수","35.9만 원"] },
      { n: "보스 QC 이어버드", b: "보스", ty: "일상용 무선", t: "mid", krw: 229000, pn: "공식몰 할인가 17.7만", img: "https://cdn.imweb.me/thumbnail/20260901/5ca2fb81b256c.jpg", url: "https://www.bose.co.kr/408/?idx=167", shop: "보스 공식", pts: ["보스 노캔 입문 모델","안정 밴드로 귀에 고정"], cons: ["울트라보다 노캔이 약해요"] },
      { n: "사운드코어 에어로핏 2 프로", b: "앤커", ty: "오픈형 이어훅", t: "mid", usd: 179.99, pn: "미국 공식몰 현재가 · 국내는 앤커코리아 쿠팡·네이버 판매", img: "https://cdn.shopify.com/s/files/1/0516/3761/6830/files/A3875Z11_DTC_listing_image_TD01_US_V2_331d9c48-fc00-4f19-abea-15816b1b05fb.png", url: "https://www.soundcore.com/products/a3875-aerofit-2-pro-open-ear-earbuds-with-anc", shop: "사운드코어 공식 (해외)", pts: ["오픈형 ↔ 노캔 커널형 변신","각도 조절 이어훅"], cons: ["국내가는 판매처마다 달라요"] },
      { n: "사운드코어 에어로클립 2", b: "앤커", ty: "이어커프·클립형", t: "mid", usd: 143.99, pn: "미국 공식몰 현재가 · 국내는 앤커코리아 쿠팡·네이버 판매", img: "https://cdn.shopify.com/s/files/1/0516/3761/6830/files/D1105Z91_DTC_listing_image_TD01_US.png", url: "https://www.soundcore.com/products/d1105-aeroclip-2-clip-on-earbuds-with-clearest-calls", shop: "사운드코어 공식 (해외)", pts: ["통화 품질 강조한 클립형 신제품","작고 가벼워요"], cons: ["국내가는 판매처마다 달라요"] },
      { n: "사운드코어 에어로클립", b: "앤커", ty: "이어커프·클립형", t: "mid", usd: 129.99, pn: "미국 공식몰 현재가 · 국내는 앤커코리아 쿠팡·네이버 판매", img: "https://cdn.shopify.com/s/files/1/0516/3761/6830/files/A3388Z11_DTC_listing_image_TD01_US_V1_59c18857-9355-46ac-ac07-48f92411ed6a.png", url: "https://www.soundcore.com/products/a3388-aeroclip-open-earbuds", shop: "사운드코어 공식 (해외)", pts: ["편안한 클립형 오픈 이어폰","메탈 브리지 디자인"], cons: ["격하게 뛰면 흔들림 개인차"] },
      { n: "사운드코어 스포츠 X20", b: "앤커", ty: "커널형 스포츠", t: "cheap", usd: 69.99, pn: "미국 공식몰 현재가 · 국내는 앤커코리아 쿠팡·네이버 판매", img: "https://cdn.shopify.com/s/files/1/0516/3761/6830/files/A3968Z11_TD01_V1.png", url: "https://www.soundcore.com/products/a3968-sport-x20-earbuds", shop: "사운드코어 공식 (해외)", pts: ["회전 이어훅으로 안 빠지는 운동용","노이즈 캔슬링"], cons: ["귀를 막아 도로에선 주변음 모드 필수"], beg: 1 },
      { n: "사운드코어 C40i", b: "앤커", ty: "이어커프·클립형", t: "cheap", usd: 49.99, pn: "미국 공식몰 현재가 · 국내는 앤커코리아 쿠팡·네이버 판매", img: "https://cdn.shopify.com/s/files/1/0516/3761/6830/files/Frame_427322111.png", url: "https://www.soundcore.com/products/a3331-c40i-clip-earbuds", shop: "사운드코어 공식 (해외)", pts: ["7만 원 아래 클립형","가볍고 작아요"], cons: ["음질·통화는 평범"] },
      { n: "사운드코어 C50i", b: "앤커", ty: "이어커프·클립형", t: "cheap", usd: 34.99, pn: "미국 공식몰 현재가 · 국내는 앤커코리아 쿠팡·네이버 판매", img: "https://cdn.shopify.com/s/files/1/0516/3761/6830/files/D1101Z11-DTC.png", url: "https://www.soundcore.com/products/d1101-c50i-comfortable-clip-on-earbuds", shop: "사운드코어 공식 (해외)", pts: ["5만 원 아래 클립형","활동용 고정 설계"], cons: ["음질·통화는 평범"], beg: 1 },
      { n: "브리츠 BZ-BONEX5", b: "브리츠", ty: "골전도 헤드형", t: "cheap", krw: 39800, pn: "KREAM 공식 브랜드샵 판매가 (할인 반영)", img: "https://kream-phinf.pstatic.net/MjAyNjAzMDNfMjgy/MDAxNzcyNTI1ODE5Mjc3.-Xj6-yLfqqz_3kvToIJ3AMxXwyfHGuyzdX-s82KZDYcg.exGcHX4oBwOiyutRUnIxaj1VfS3opU3CGFBtDZbzolgg.PNG/p_9cc9a71f964d4579a887cc7977ec4fe3.png", url: "https://kream.co.kr/products/815245", shop: "KREAM 브리츠 공식", pts: ["4만 원 아래 러닝 이어폰","IPX7 방수"], cons: ["샥즈보다 음질·마감이 아쉬워요"], beg: 1 },
      { n: "브리츠 BZ-M2BONE", b: "브리츠", ty: "골전도 헤드형", t: "cheap", krw: 64900, pn: "KREAM 공식 브랜드샵 판매가 (할인 반영)", img: "https://kream-phinf.pstatic.net/MjAyNjAzMTlfMTg5/MDAxNzczOTA5MDg3NzYy.HQy6PuF37bfo4m5eDttqAhmIwLNV4FLqobuks-Y3ABMg.ONCIRjGGLrwR68gHMyphNEhmEKMrgBcjXZARvwmu_Lwg.PNG/p_46efbe7ca06a4a419e1863720690cc56.png", url: "https://kream.co.kr/products/837285", shop: "KREAM 브리츠 공식", pts: ["러닝용 방수 골전도","6만 원대"], cons: ["골전도 특유의 진동"] },
      { n: "브리츠 BZ-M5BONE", b: "브리츠", ty: "골전도 헤드형", t: "cheap", krw: 69900, pn: "KREAM 공식 브랜드샵 판매가 (할인 반영)", img: "https://kream-phinf.pstatic.net/MjAyNjA3MDhfMjU2/MDAxNzgzNDg2NDY4Mzkw.8qX156DajE0ltGjlQQz0Ttdzqp0UI9QZQb-PExEcs_Ag.O4hsSMy-la2ZVbwaopdQ8xBp0PbIHRvX-7rKb3yRoecg.PNG/p_86c0b7296752495691d2c6d4fe75668e.png", url: "https://kream.co.kr/products/996517", shop: "KREAM 브리츠 공식", pts: ["IP67 방수 골전도 러닝 이어폰","2026 신제품"], cons: ["골전도 특유의 진동"] },
      { n: "브리츠 BoneWave8", b: "브리츠", ty: "골전도 헤드형", t: "cheap", krw: 89900, pn: "KREAM 공식 브랜드샵 판매가 (할인 반영)", img: "https://kream-phinf.pstatic.net/MjAyNjA2MTlfNzgg/MDAxNzgxODQ2Njc5NjAx.wVaOnCTPVrqTE9B04DJYB_qzYj1kMFHeyFWwK4oOkAgg.blqeR9umLwtlxj_hfykCoZ9SF95E1PDabPcaBJqMiycg.PNG/p_b33a20bd06e74d5d966949855bc39667.png", url: "https://kream.co.kr/products/972056", shop: "KREAM 브리츠 공식", pts: ["IPX8 방수 — 각종 스포츠용 골전도","9만 원 아래"], cons: ["골전도 특유의 진동"] },
      { n: "브리츠 BZ-BONE X9", b: "브리츠", ty: "골전도 헤드형", t: "cheap", krw: 99000, pn: "KREAM 공식 브랜드샵 판매가 (할인 반영)", img: "https://kream-phinf.pstatic.net/MjAyNjAyMDNfMjMx/MDAxNzcwMTA1OTQzNzA4.dEqhsHTOfOPLc36mkF3CQnbD-EZBhGHiWo9UwZlzQ2Ig.Mj2inWok65TT7jEHr7sBV13s8RGiyNfUJlE37_VHthog.PNG/p_c657ad51bc864f7496fd81edd0077053.png", url: "https://kream.co.kr/products/782251", shop: "KREAM 브리츠 공식", pts: ["완전 방수 골전도 — 브리츠 상위 모델","모든 스포츠용"], cons: ["샥즈 오픈런과 가격 차이가 작아요"] },
      { n: "브리츠 BZ-CLIP7 PLUS", b: "브리츠", ty: "이어커프·클립형", t: "cheap", krw: 39900, pn: "KREAM 공식 브랜드샵 판매가 (할인 반영)", img: "https://kream-phinf.pstatic.net/MjAyNjAxMjlfMTQ4/MDAxNzY5Njc1MzUzODMx.Wpl2Yv119fHbjyJ76-JJ2vbKZ3qKrzvFiO9O1kpyqJog.nGSRuZtGTmUinWcn19euAOH4GOsO_Bj0srGhKl6RBYcg.PNG/p_7d7d375153bf4c5993eb0d02319a2628.png", url: "https://kream.co.kr/products/775851", shop: "KREAM 브리츠 공식", pts: ["4만 원 아래 귀찌형 오픈 이어폰","가볍고 작아요"], cons: ["격하게 뛰면 흔들림 개인차"] },
      { n: "베이스어스 BC1 Lite", b: "베이스어스", ty: "오픈형 이어훅", t: "cheap", krw: 37900, pn: "KREAM 공식 브랜드샵 판매가 (할인 반영)", img: "https://kream-phinf.pstatic.net/MjAyNjExMDVfMzkg/MDAxNzkzODQ1NTMwNjYw.4ZymUO9zNJ1WGDIqwZriyTTh66o1Gpyu-xCurqKjU5cg.hEVj_AYrm8vvW8TJZqqNk8LT-fKMGplb54yOCuL4RdMg.PNG/p_b36762cccc174e9c897b3c492e9ed93c.png", url: "https://kream.co.kr/products/1015899", shop: "KREAM 베이스어스 공식", pts: ["3만 원대 에어쿠션 오픈형","귀에 거는 이어훅"], cons: ["음질은 평범"], beg: 1 },
      { n: "베이스어스 BC2", b: "베이스어스", ty: "오픈형 이어훅", t: "cheap", krw: 39900, pn: "KREAM 공식 브랜드샵 판매가 (할인 반영)", img: "https://kream-phinf.pstatic.net/MjAyNjA4MjZfMjkw/MDAxNzg3NzI3MzcwNTUy.sfCH1z90YEIlBe4GrbBrYc6Dj57q7VXa_QOZuNUTQeEg.bXpHrKr8bJGojETT3jgsnJDudPQLp4ZHvPursnTc554g.PNG/p_1551b0d02cc3415fb7f07729045ce582.png", url: "https://kream.co.kr/products/1063162", shop: "KREAM 베이스어스 공식", pts: ["에어쿠션 러닝용 이어훅","4만 원 아래"], cons: ["음질은 평범"] },
      { n: "베이스어스 MC1 PRO", b: "베이스어스", ty: "오픈형 이어훅", t: "cheap", krw: 69900, pn: "KREAM 공식 브랜드샵 판매가 (할인 반영)", img: "https://kream-phinf.pstatic.net/MjAyNjAxMDZfMjM2/MDAxNzY3Njg5MDI5MDMw.3eXFJTlPXpFnaR0PODWJhcwIdHMO2t92ouK1hIzUgEQg.MhNR9pJAcgk28kBN9tVtKP-y7vXkI4L1iIj_iLfZzBIg.PNG/p_004e61bafc934794b44f8841030b748d.png", url: "https://kream.co.kr/products/752183", shop: "KREAM 베이스어스 공식", pts: ["러닝용 귀걸이형 오픈 이어폰","7만 원 아래"], cons: ["국내 리뷰가 적어요"] },
      { n: "베이스어스 MC2", b: "베이스어스", ty: "오픈형 이어훅", t: "mid", krw: 109000, pn: "KREAM 공식 브랜드샵 판매가 (할인 반영)", img: "https://kream-phinf.pstatic.net/MjAyNjA2MTFfMTAw/MDAxNzgxMTQxNDQ5MDc1.h9m9aFUGgihEX43Tbg-bxr5Dy6RQthTQdTC9ba3Hpzcg.nZPFa4NvSQooMT03XHxCSE_y04IXc2IWEG0X99vVDf8g.PNG/p_9972bd3a22094067b522084bc46b93d7.png", url: "https://kream.co.kr/products/961172", shop: "KREAM 베이스어스 공식", pts: ["베이스어스 상위 오픈형 · 에어쿠션","러닝 귀걸이형"], cons: ["10만 원대면 샥즈 입문 모델과 비교해 보세요"] },
      { n: "베이스어스 E20s", b: "베이스어스", ty: "커널형 스포츠", t: "cheap", krw: 25900, pn: "KREAM 공식 브랜드샵 판매가 (할인 반영)", img: "https://kream-phinf.pstatic.net/MjAyNjAxMDZfOTkg/MDAxNzY3Njg5MTEwMDQ5.5khc6xV9Mu7k1PRDR-ETagzrgYZCo6N4PMYRfQznq3Ig.gaX_5fGdAbEhL8yrYkY8TB_9s7WqsuEFQGHZbvKevfcg.PNG/p_43f1e94c5f1d41c59574007bd6cd549d.png", url: "https://kream.co.kr/products/752190", shop: "KREAM 베이스어스 공식", pts: ["2만 원대 방수 스포츠 이어폰","재생 32시간 (케이스 포함)"], cons: ["귀를 막아 도로에선 조심"] },
      { n: "베이스어스 보위 M2s", b: "베이스어스", ty: "일상용 무선", t: "cheap", krw: 35900, pn: "KREAM 공식 브랜드샵 판매가 (할인 반영)", img: "https://kream-phinf.pstatic.net/MjAyNjAxMDZfOTUg/MDAxNzY3Njg5MDg3MzAy.4srJGeEL6ZuIf_WVBg-LltT7W5aoBiTAQknLE2joYM8g.GP8RsQoc6A8YsBsfqgIl_tqu2KW0FCxmMXPZ2xvw2o4g.PNG/p_6e5d49717bff485ca0b53b850153bfce.png", url: "https://kream.co.kr/products/752187", shop: "KREAM 베이스어스 공식", pts: ["3만 원대 노이즈 캔슬링","일상 겸용"], cons: ["러닝 고정 장치가 없어요"] },
      { n: "에디파이어 컴포 베이스", b: "에디파이어", ty: "오픈형 이어훅", t: "cheap", krw: 49000, pn: "KREAM 공식 브랜드샵 판매가 (할인 반영)", img: "https://kream-phinf.pstatic.net/MjAyNjA3MTNfMTA5/MDAxNzgzOTIzODMwOTQ2.qhnXVoh0a9ieoaIrxWua6K_kduMQ_WlH23q1uGAoG1kg.oGDwpey4UsghpG2nvLE0R9Ab-sqgrierhxnDgf2N-uIg.PNG/p_b7b02316915342a29d2262e24a8c6055.png", url: "https://kream.co.kr/products/1002218", shop: "KREAM 에디파이어 공식", pts: ["5만 원 아래 오픈형 · 저음 강조","리뷰 10건+"], cons: ["오픈형이라 소리가 새요"], beg: 1 },
      { n: "에디파이어 컴포 C", b: "에디파이어", ty: "이어커프·클립형", t: "cheap", krw: 59000, pn: "KREAM 공식 브랜드샵 판매가 (할인 반영)", img: "https://kream-phinf.pstatic.net/MjAyNjA3MDdfODYg/MDAxNzgzNDA2Nzk4MjUy.l-rrEZ5dzyUlO7YlU1NHyN3xWTxxfU-m6zciVZ3WTuwg.mEX1WJm8g53lkLMnKvZV1z_Z3g3yeDQ5G5nZA2h8Hbgg.PNG/a_3115932e8350420d8345adfbbbfa5f1a.png", url: "https://kream.co.kr/products/688840", shop: "KREAM 에디파이어 공식", pts: ["6만 원 아래 클립형 오픈 이어폰","가볍고 작아요"], cons: ["격하게 뛰면 흔들림 개인차"] },
      { n: "에디파이어 컴포 베이스 프로", b: "에디파이어", ty: "오픈형 이어훅", t: "mid", krw: 109000, pn: "KREAM 공식 브랜드샵 판매가 (할인 반영)", img: "https://kream-phinf.pstatic.net/MjAyNjExMTBfODYg/MDAxNzk0MjgyNDU5OTky.Q7kBffVkWDMDbkeTYD6TmO39R8-xlxOVxr5e0v3HFAIg.d3ZRDSFfeEeGAk-zinFVW9XJmmttXfDj-YkEbqW4aUAg.PNG/p_0dd6f51d488c4438890494f1fbe5ea6a.png", url: "https://kream.co.kr/products/1176639", shop: "KREAM 에디파이어 공식", pts: ["컴포 베이스 상위 모델 (2026년 11월 신제품)","저음 강화 오픈형"], cons: ["국내 리뷰가 아직 적어요"] },
      { n: "에디파이어 에보버즈 프로", b: "에디파이어", ty: "일상용 무선", t: "cheap", krw: 89000, pn: "KREAM 공식 브랜드샵 판매가 (할인 반영)", img: "https://kream-phinf.pstatic.net/MjAyNjA3MzFfMTgw/MDAxNzg1NDg3MzQwMjg2.vPy5HAbGNax5Vg5GgOL6q5quQR_pZ5twWE7CbIF4Y9Mg.YG0L7ynUBXnqfGidU7ARLgE_smQFFyGilAYjKQgTbxUg.PNG/p_e20ae8bbdefe4665ba59e7cf4f26ec74.png", url: "https://kream.co.kr/products/1019149", shop: "KREAM 에디파이어 공식", pts: ["9만 원 아래 노이즈 캔슬링","일상 겸용"], cons: ["러닝 고정 장치가 없어요"] },
      { n: "에디파이어 네오버즈 프로 3", b: "에디파이어", ty: "일상용 무선", t: "mid", krw: 159000, pn: "KREAM 공식 브랜드샵 판매가 (할인 반영)", img: "https://kream-phinf.pstatic.net/MjAyNjA3MDhfMTU2/MDAxNzgzNDkzNDI1MTYx.2lZNllwOeil917xqJaQ5XL6w3cmKyb7lgmuWkwaQlkQg.WTxBjHK5Eoil2yPTOxcPpopPnX0cHSD8ErpAddMHnLMg.PNG/p_0f06ce9d7575464a9dc4e7d65a2cff25.png", url: "https://kream.co.kr/products/689287", shop: "KREAM 에디파이어 공식", pts: ["에디파이어 하이파이 플래그십 · 노캔","음질 중심"], cons: ["러닝 고정 장치가 없어요"] },
      { n: "QCY 크로스키 C70", b: 'QCY', ty: "이어커프·클립형", t: 'cheap', usd: 69.99, img: "https://cdn.shopify.com/s/files/1/0639/3492/2809/files/CT03_02_d414a27e-ce74-4907-bc35-fb1e2ecb8aec.png", url: "https://www.qcy.com/products/qcy-crossky-c70-open-ear-clip-on-earbuds", shop: "QCY 공식 (해외) · 국내 쿠팡·네이버 판매", pts: ["크로스키 상위 클립형 · 통화용 골전도 센서 마이크","압박 없는 실리콘 착용"], cons: ["7만 원대면 사운드코어 C40i 등과 비교해 보세요"] },
      { n: "QCY 크로스키 C50i", b: 'QCY', ty: "이어커프·클립형", t: 'cheap', usd: 37.99, img: "https://cdn.shopify.com/s/files/1/0639/3492/2809/files/CT12_01_05e3000d-db25-4d0a-8c82-1072ca86d040.png", url: "https://www.qcy.com/products/qcy-crossky-c50i", shop: "QCY 공식 (해외) · 국내 쿠팡·네이버 판매", pts: ["LDAC 고음질 · 재생 최대 42시간","다나와 빅스마일데이 이어폰 판매 2위 (2026년 11월)"], cons: ["격하게 뛰면 흔들림 개인차"], beg: 1 },
      { n: "QCY 크로스키 C30", b: 'QCY', ty: "이어커프·클립형", t: 'cheap', usd: 37.99, img: "https://cdn.shopify.com/s/files/1/0639/3492/2809/files/QT33_-1_ce02fcee-fba9-470f-8a58-c375228f3683.png", url: "https://www.qcy.com/products/qcy-crossky-c30", shop: "QCY 공식 (해외) · 국내 쿠팡·네이버 판매", pts: ["C자형 오픈 클립 · 마이크 4개","방수"], cons: ["음질은 C50i보다 단순"] },
      { n: "QCY 멜로버즈 프로", b: 'QCY', ty: "일상용 무선", t: 'cheap', usd: 47.99, img: "https://cdn.shopify.com/s/files/1/0639/3492/2809/files/HT08_-1_aca60518-7636-48a3-adf8-a2df012c997b.png", url: "https://www.qcy.com/products/qcy-melobuds-pro", shop: "QCY 공식 (해외) · 국내 쿠팡·네이버 판매", pts: ["LDAC · 최대 46dB 노이즈 캔슬링","다나와 5만 원 이하 이어폰 판매 2위 (2026년 9월)"], cons: ["러닝 고정 장치가 없어요"] },
      { n: "QCY 멜로버즈 N70", b: 'QCY', ty: "일상용 무선", t: 'cheap', usd: 59.99, img: "https://cdn.shopify.com/s/files/1/0639/3492/2809/files/8ee163965c752b4df31d594396825cee.png", url: "https://www.qcy.com/products/qcy-melobuds-n70", shop: "QCY 공식 (해외) · 국내 쿠팡·네이버 판매", pts: ["듀얼 드라이버 · LDAC · 최대 56dB 노캔","무선 충전"], cons: ["러닝 고정 장치가 없어요"] },
      { n: "QCY 멜로버즈 N60", b: 'QCY', ty: "일상용 무선", t: 'cheap', usd: 39.99, img: "https://cdn.shopify.com/s/files/1/0639/3492/2809/files/A_45b48068-2e28-4578-b7f8-2c64c6bcd8ad.png", url: "https://www.qcy.com/products/qcy-melobuds-n60", shop: "QCY 공식 (해외) · 국내 쿠팡·네이버 판매", pts: ["동축 듀얼 드라이버 · 최대 56dB 노캔","재생 최대 45시간"], cons: ["러닝 고정 장치가 없어요"] },
      { n: "QCY 멜로버즈 N50", b: 'QCY', ty: "일상용 무선", t: 'cheap', usd: 33.99, img: "https://cdn.shopify.com/s/files/1/0639/3492/2809/files/HT12_-2_221ed393-b2a1-411c-a4b1-f86f6ed5d72a.png", url: "https://www.qcy.com/products/qcy-melobuds-n50", shop: "QCY 공식 (해외) · 국내 쿠팡·네이버 판매", pts: ["3만 원대 적응형 노캔 · 마이크 6개","EQ 프리셋 9종"], cons: ["러닝 고정 장치가 없어요"] },
      { n: "QCY T13 프로", b: 'QCY', ty: "일상용 무선", t: 'cheap', usd: 24.99, img: "https://cdn.shopify.com/s/files/1/0639/3492/2809/files/HT23_-2_008999fe-f4b4-4206-83f6-f14667df739c.png", url: "https://www.qcy.com/products/qcy-t13-pro", shop: "QCY 공식 (해외) · 국내 쿠팡·네이버 판매", pts: ["2만 원대 노캔 · IPX4 방수","재생 최대 47시간"], cons: ["러닝 고정 장치가 없어요"], beg: 1 },
      { n: "QCY T13 ANC2", b: 'QCY', ty: "일상용 무선", t: 'cheap', usd: 46.99, img: "https://cdn.shopify.com/s/files/1/0639/3492/2809/files/1_e616678c-52a0-4dcc-8463-005d1f32c00a.jpg", url: "https://www.qcy.com/products/qcy-t13-anc2-active-noise-canceling-wireless-earbuds", shop: "QCY 공식 (해외) · 국내 쿠팡·네이버 판매", pts: ["하이브리드 노캔 · 주변음 모드","가성비 입문"], cons: ["러닝 고정 장치가 없어요"] },
      { n: "QCY T13 ANC", b: 'QCY', ty: "일상용 무선", t: 'cheap', usd: 32.99, img: "https://cdn.shopify.com/s/files/1/0639/3492/2809/files/01_e1a505d9-3849-4a73-9b6f-8a3a1730d6f3.png", url: "https://www.qcy.com/products/qcy-t13-anc", shop: "QCY 공식 (해외) · 국내 쿠팡·네이버 판매", pts: ["3만 원대 적응형 노캔 · 바람 소리 감소","무선 충전"], cons: ["러닝 고정 장치가 없어요"] },
      { n: '샥즈 오픈스윔 프로', b: '샥즈', ty: '수영·철인용', t: 'pro', krw: 319000, img: 'https://static.shokz.co.kr/resource/2026/08/24/OpenSwim_Pro_____6a8bacf8c152d.webp', url: 'https://shokz.co.kr/shop/OpenSwimPro', shop: '샥즈 공식', pts: ['수영·러닝 모두 — 철인 3종 훈련', '내장 MP3 + 블루투스'], elite: 1 },
    ],
    brands: [
      ['샥즈', '#f97316', '골전도·오픈형 이어폰 세계 1위 브랜드 (옛 이름 애프터샥즈, 2021년 변경). 킵초게 등 엘리트 마라토너를 후원해요.', 'https://shokz.co.kr/', [['오픈런', '골전도 헤드형 · 러닝 정석'], ['오픈무브', '골전도 입문'], ['오픈스윔', '수영·철인'], ['오픈핏', '오픈형 이어훅'], ['오픈닷', '이어커프·클립형'], ['오픈컴·오픈밋', '업무·통화용']]],
      ['삼성', '#1d4ed8', '갤럭시 폰과 최고의 연동 — 노캔 커널형부터 2026년 첫 클립형 오픈 이어폰(버즈 온)까지. 삼성닷컴 공식.', 'https://www.samsung.com/sec/buds/all-buds/', [['버즈 온', '클립형 오픈 (신제품)'], ['버즈4 프로', '플래그십 노캔'], ['버즈4', '기본형'], ['버즈3 FE', '입문 노캔']]],
      ['애플·비츠', '#64748b', '아이폰과 최고의 연동 — 심박 측정 운동용 이어폰부터 일상용 에어팟까지. 비츠는 안드로이드도 지원.', 'https://www.apple.com/kr/airpods/', [['에어팟 5', '오픈핏 · 노캔'], ['에어팟 프로 3', '노캔 커널형 · 심박'], ['파워비츠 프로 2', '이어훅 · 심박'], ['파워비츠 핏', '윙팁 운동용'], ['스튜디오 버즈+·솔로 버즈', '일상용'], ['비츠 플렉스', '넥밴드']]],
      ['보스', '#111827', '미국 오디오 브랜드 — 노이즈 캔슬링 최강, 오픈형에서도 보스 특유의 음질. 보스 공식몰.', 'https://www.bose.co.kr/', [['울트라 오픈', '클립형 하이엔드'], ['스포츠 오픈', '운동용 이어훅'], ['QC 울트라', '노캔 플래그십'], ['QC 이어버드', '노캔 입문']]],
      ['앤커 사운드코어', '#0ea5e9', '가성비 오디오 브랜드 — 각도 조절 이어훅·클립형·운동용까지. 국내는 앤커코리아 쿠팡·네이버 판매.', 'https://www.soundcore.com/', [['에어로핏', '오픈형 이어훅'], ['에어로클립', '클립형'], ['스포츠 X', '이어훅 커널형'], ['C 시리즈', '가성비 클립형']]],
      ['브리츠', '#b45309', '국내 음향 브랜드 — 2~10만 원대 골전도·귀찌형 러닝 이어폰. KREAM 공식 브랜드샵·11번가 공식 스토어.', 'https://kream.co.kr/brand-stores/britz', [['BONE', '골전도 러닝용'], ['BoneWave', '완전 방수 골전도'], ['CLIP', '귀찌형 오픈']]],
      ['베이스어스', '#0f766e', '중국 모바일 액세서리 브랜드 — 2~10만 원대 오픈형 이어훅·스포츠 이어폰. KREAM 공식 브랜드샵.', 'https://www.baseus.com/', [['MC', '오픈형 에어쿠션'], ['BC', '오픈형 입문'], ['E20s', '스포츠 커널형'], ['보위', '노캔 일상용']]],
      ['에디파이어', '#475569', '중국 오디오 브랜드 (스피커로 유명) — 4~16만 원대 오픈형·노캔 이어폰. KREAM 공식 브랜드샵.', 'https://www.edifier.com/', [['컴포', '오픈형 · 클립형'], ['에보버즈·네오버즈', '노캔 일상용']]],
      ['QCY', '#16a34a', '중국 초가성비 브랜드 — 다나와 5만 원 이하 이어폰 거래액 1위. 쿠팡·네이버·알리에서 2~7만 원대.', 'https://www.qcy.com/', [['크로스키', '클립형 오픈'], ['멜로버즈', '노캔 일상용'], ['T13', '입문 무선']]],
      ['다이소', '#e11d48', '5천 원 균일가 — 러닝 전용은 아니지만 입문용으로 부담 없어요.', 'https://www.daisomall.co.kr/', [['무선 이어폰', '5천 원 블루투스']]],
    ],
    best: [['샥즈 오픈런 프로 2', '귀를 열고 안 흔들리는 러닝 이어폰의 정석'], ['샥즈 오픈핏 2+', '골전도가 답답하면 — 가장 편한 오픈형'], ['QCY 크로스키 C50', '5만 원 아래로 오픈형을 써보고 싶다면']],
  },
  cap: {
    types: [['🧢', '러닝 캡', '챙이 햇빛·비를 막아요 — 가장 기본.', '한여름엔 머리가 덥기도'], ['🌞', '바이저', '정수리가 뚫려 열이 빠져요 — 한여름·대회용.', '정수리 햇빛은 못 막아요'], ['🪶', '경량 5패널', '접어서 주머니에 — 초경량 레이스 캡.', '비싸요']],
    rules: [['💨', '메쉬·속건 소재', '땀이 바로 마르는 원단인지 확인.'], ['🪢', '뒤 조절 끈', '땀에 젖어도 안 흘러내리게.'], ['🌙', '반사 로고', '새벽·밤 러닝이면 반사 소재가 안전해요.']],
    items: [
      { n: '데카트론 러닝 캡 모자 V2', b: '킵런', ty: '러닝 캡', t: 'cheap', krw: 16900, img: 'https://contents.mediadecathlon.com/p2888994/k$831b41d13adede2b6a4bfa671bda4138/%EB%9F%AC%EB%8B%9D-%EC%BA%A1-%EB%AA%A8%EC%9E%90-v2-kiprun-8883214.jpg', url: 'https://www.decathlon.co.kr/p/%EB%9F%AC%EB%8B%9D-%EC%BA%A1-%EB%AA%A8%EC%9E%90-v2-kiprun-8883214.html', shop: '데카트론 공식', pts: ['평점 4.8 · 리뷰 2천 개+', '가볍고 땀 배출 잘 돼요'], beg: 1 },
      { n: '데카트론 러닝 울트라라이트 캡', b: '킵런', ty: '경량 5패널', t: 'cheap', krw: 22900, img: 'https://contents.mediadecathlon.com/p3233186/k$22ec0eb6734a00710c40d0f75432996c/%EC%9A%B8%ED%8A%B8%EB%9D%BC%EB%9D%BC%EC%9D%B4%ED%8A%B8-%EB%9F%AC%EB%8B%9D-%EC%BA%A1-%EB%AA%A8%EC%9E%90-kiprun-8871360.jpg', url: 'https://www.decathlon.co.kr/p/%EB%9F%AC%EB%8B%9D-%EC%9A%B8%ED%8A%B8%EB%9D%BC%EB%9D%BC%EC%9D%B4%ED%8A%B8-%EC%BA%A1-%EB%AA%A8%EC%9E%90-kiprun-8871360.html', shop: '데카트론 공식', pts: ['작게 접히는 초경량 캡', '한여름 로드·트레일']},
      { n: '시엘 GOCap 클래식', b: '시엘', ty: '러닝 캡', t: 'mid', usd: 40, img: 'https://cdn.shopify.com/s/files/1/0683/8678/3506/files/U-2-CA-0056-GN001_GOCap-Classic-Athletics-LimeGreen_D3_2025_FRNTL.jpg', url: 'https://cieleathletics.com/products/gocap-classic-athletics-lime-green', shop: '시엘 공식 (해외)', pts: ['러너들의 "국민 러닝캡"', '납작 접혀도 모양 유지'], beg: 1 },
      { n: '나이키 드라이 핏 ADV 플라이 캡', b: '나이키', ty: '러닝 캡', t: 'mid', krw: 59000, pn: '할인 시 5.3만', img: 'https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/2627cccb-139f-4073-9dcc-b55e34c89ece/U+NK+DFADV+FLY+CAP+U+AB+AEROAD.png', url: 'https://www.nike.com/kr/t/%EB%93%9C%EB%9D%BC%EC%9D%B4-%ED%95%8F-adv-%ED%94%8C%EB%9D%BC%EC%9D%B4-%EC%96%B8%EC%8A%A4%ED%8A%B8%EB%9F%AD%EC%B2%98-%EC%97%90%EC%96%B4%EB%A1%9C%EB%B9%8C-%EC%97%90%EC%96%B4%EB%A1%9C%EC%96%B4%EB%8C%91%ED%8A%B8-%EC%BA%A1-j4HapP4s', shop: '나이키 코리아', pts: ['에어로어댑트 통풍 · 낮은 깊이', '러닝·운동 겸용'] },
      { n: '시엘 GOCap SC 컴프', b: '시엘', ty: '경량 5패널', t: 'pro', usd: 60, img: 'https://cdn.shopify.com/s/files/1/0683/8678/3506/files/U-2-CA-0092-BK006_GOCapSC-Comp-WWM26-Tokyo_D1_2026_FRNTL.jpg', url: 'https://cieleathletics.com/products/gocap-sc-comp-wwm26-tokyo', shop: '시엘 공식 (해외)', pts: ['세계 메이저 대회 에디션', '레이스용 초경량 캡'], elite: 1 },
      { n: '새티스파이 플라이트실크 5패널', b: '새티스파이', ty: '경량 5패널', t: 'high', krw: 170000, pn: '공식몰 원화 표시가', img: 'https://cdn.shopify.com/s/files/1/0075/4617/5546/files/31015-66046_Flitesilk-5-panel-pinch-cap-proud_blue_front.jpg', url: 'https://satisfyrunning.com/products/flitesilk-5-panel-pinch-cap-navy-bumper', shop: '새티스파이 공식 (해외)', pts: ['파리 러닝 패션 브랜드', '실크처럼 가벼운 원단'] },
    ],
    brands: [
      ["데카트론","#0082c3","프랑스 스포츠용품 유통사 — 러닝 자체 브랜드 킵런(KIPRUN). 국내 공식몰·매장에서 바로 사요.","https://www.decathlon.co.kr/",[["러닝 캡 V2","1.7만 원 기본 캡"],["울트라라이트","접히는 경량 캡"]]],
      ["시엘","#84cc16","캐나다 러닝 캡 전문 브랜드 — \"러너 모자\" 하면 떠오르는 GOCap.","https://cieleathletics.com/",[["GOCap","데일리 러닝 캡"],["GOCap SC","레이스 경량 캡"]]],
      ["나이키","#111827","세계 1위 스포츠 브랜드 — 드라이 핏 러닝 라인. 국내 공식몰.","https://www.nike.com/kr/",[["플라이 캡","에어로어댑트 통풍"]]],
      ["새티스파이","#a16207","파리 러닝 패션 브랜드 — 실크 같은 테크 원단, 하이엔드 가격.","https://satisfyrunning.com/",[["플라이트실크","초경량 5패널"]]],
    ],
    best: [['시엘 GOCap 클래식', '러너 모자 하면 이것 — 디자인·기능 모두'], ['나이키 드라이 핏 ADV 플라이 캡', '국내 공식몰에서 바로 사는 통풍 캡'], ['데카트론 러닝 캡 모자 V2', '1.7만 원 — 처음 사는 러닝 캡']],
  },
  vest: {
    types: [['🏙️', '로드 경량 (2~5L)', '젤·폰·작은 물병 — 하프·풀코스·장거리 훈련.', '물을 많이 못 넣어요'], ['⛰️', '트레일 (8~12L)', '물 1L+ · 바람막이 · 필수 장비 — 산악·울트라.', '로드엔 과해요'], ['🧴', '플라스크 포함 세트', '소프트 플라스크(물병) 2개 포함 — 처음 살 때 세트가 이득.', '단품보다 비싸요']],
    rules: [['📏', '가슴 둘레로 사이즈', '흔들림이 없어야 해요 — 꼭 맞게.'], ['🍶', '앞쪽 플라스크 위치', '달리면서 마실 수 있어야 해요.'], ['⚖️', '빈 무게 200g 안팎', '가벼울수록 장거리 피로가 줄어요.']],
    items: [
      { n: 'AONIJIE 10L 트레일 베스트 C9116', b: 'AONIJIE', ty: '트레일 (8~12L)', t: 'cheap', usd: 70, pn: '알리 약 60~80달러 (판매자별)', img: 'https://ae-pic-a1.aliexpress-media.com/kf/S210527e9cbfd4e8ab2bbdd7420637266H.jpg', url: 'https://ko.aliexpress.com/item/1005008218810546.html', shop: '알리익스프레스', pts: ['살로몬 대비 3분의 1 가격', '트레일 입문 세팅'], beg: 1 },
      { n: '데카트론 경량 트레일러닝 베스트 5L', b: '킵런', ty: '로드 경량 (2~5L)', t: 'cheap', krw: 69900, img: 'https://contents.mediadecathlon.com/p2928092/k$c0070fea48cb337287287b929a329f8a/%EA%B2%BD%EB%9F%89-%ED%8A%B8%EB%A0%88%EC%9D%BC%EB%9F%AC%EB%8B%9D-%EB%B2%A0%EC%8A%A4%ED%8A%B8-5l-kiprun-8786242.jpg', url: 'https://www.decathlon.co.kr/p/%EA%B2%BD%EB%9F%89-%ED%8A%B8%EB%A0%88%EC%9D%BC%EB%9F%AC%EB%8B%9D-%EB%B2%A0%EC%8A%A4%ED%8A%B8-5l-kiprun-8786242.html', shop: '데카트론 공식', pts: ['190g 초경량 · 포켓 10개', '국내 공식몰 7만 원'], beg: 1 },
      { n: '살로몬 액티브 스킨 8 세트', b: '살로몬', ty: '플라스크 포함 세트', t: 'mid', krw: 175000, img: 'https://cdn.shopify.com/s/files/1/0580/9035/6875/files/LC2177800_0_GHO_ACTIVESKIN8SET-BLACK-METAL.png', url: 'https://salomon.co.kr/products/lc2177800', shop: '살로몬 코리아', pts: ['살로몬 입문 베스트 — 플라스크 포함', '로드·가벼운 트레일 겸용'] },
      { n: '네이키드 하이 커패시티 베스트', b: '네이키드', ty: '로드 경량 (2~5L)', t: 'mid', usd: 110, img: 'https://cdn.shopify.com/s/files/1/0596/0866/2196/files/HC_VEST-BLACK-F.jpg', url: 'https://www.nakedsportsinnovations.com/products/naked%C2%AE-high-capacity-running-vest-mens-copy', shop: '네이키드 공식 (해외)', pts: ['밴드형 원단으로 안 흔들려요', '수납 많고 가벼움'] },
      { n: '살로몬 어드밴스드 스킨 12 세트', b: '살로몬', ty: '트레일 (8~12L)', t: 'high', krw: 250000, img: 'https://cdn.shopify.com/s/files/1/0580/9035/6875/files/LC2464300_0_GHO_ADVSKIN12SETBLACK_8c3006c0-bc4f-4991-9c9a-eae89b4620ac.png', url: 'https://salomon.co.kr/products/lc2464300', shop: '살로몬 코리아', pts: ['트레일 러닝 베스트의 표준', '울트라·산악 대회 필수 장비 수납'], elite: 1 },
      { n: '살로몬 S/LAB 센스 6 세트', b: '살로몬', ty: '플라스크 포함 세트', t: 'pro', krw: 280000, img: 'https://cdn.shopify.com/s/files/1/0580/9035/6875/files/LC2855200_0_GHO_S-LABSENSE6SET-BLACK.png', url: 'https://salomon.co.kr/products/lc2855200', shop: '살로몬 코리아', pts: ['엘리트 트레일 선수용 레이싱 베스트', '최소 무게 · 최대 밀착'], elite: 1 },
    ],
    brands: [
      ["살로몬","#0f172a","프랑스 트레일러닝 대표 브랜드 — 러닝 베스트의 표준 \"스킨\" 시리즈. 국내 공식몰.","https://salomon.co.kr/",[["액티브 스킨","입문·로드"],["어드밴스드 스킨","트레일·울트라"],["S/LAB","엘리트 레이싱"]]],
      ["데카트론","#0082c3","프랑스 스포츠용품 유통사 — 러닝 자체 브랜드 킵런(KIPRUN). 국내 공식몰·매장에서 바로 사요.","https://www.decathlon.co.kr/",[["트레일러닝 베스트","5L 경량"]]],
      ["네이키드","#ea580c","캐나다 밴드형 러닝 장비 — 원단이 늘어나 몸에 붙어서 안 흔들려요.","https://www.nakedsportsinnovations.com/",[["하이 커패시티","대용량 로드 베스트"]]],
      ["AONIJIE","#65a30d","중국 초가성비 트레일 브랜드 — 알리에서 살로몬의 3분의 1 가격.","https://www.aonijie.com/",[["트레일 베스트","10L 입문"]]],
    ],
    best: [['살로몬 어드밴스드 스킨 12 세트', '트레일·울트라를 한다면 결국 이 베스트'], ['데카트론 경량 트레일러닝 베스트 5L', '7만 원으로 시작하는 첫 러닝 베스트'], ['살로몬 액티브 스킨 8 세트', '로드 장거리 + 가벼운 트레일 겸용']],
  },
  belt: {
    types: [['🌀', '밴드형 (튜브)', '허리에 끼우는 원통 — 출렁임이 가장 적어요.', '사이즈를 정확히 골라야 해요'], ['👛', '파우치형', '작은 지퍼 주머니 + 끈 — 싸고 간편.', '무거운 폰은 출렁여요'], ['🍼', '물병 벨트', '작은 물병 1~2개 — 여름 장거리.', '무게가 허리에 몰려요']],
    rules: [['📱', '폰 크기 확인', '요즘 큰 폰이 들어가는지 꼭 확인.'], ['🎯', '배번 고리', '대회용이면 배번 고리가 있으면 편해요.'], ['🔁', '안 흔들림이 최우선', '뛰어 보면 출렁임이 제일 거슬려요.']],
    items: [
      { n: '데카트론 러닝 스마트폰 벨트 베이직 2', b: '킵런', ty: '밴드형 (튜브)', t: 'cheap', krw: 14900, img: 'https://contents.mediadecathlon.com/p2713513/k$ede67902246f5e9ed3af5566b952d633/%EB%9F%AC%EB%8B%9D-%EC%8A%A4%EB%A7%88%ED%8A%B8%ED%8F%B0-%EB%B2%A8%ED%8A%B8-%EB%B2%A0%EC%9D%B4%EC%A7%81-2-kiprun-8788273.jpg', url: 'https://www.decathlon.co.kr/p/%EB%9F%AC%EB%8B%9D-%EC%8A%A4%EB%A7%88%ED%8A%B8%ED%8F%B0-%EB%B2%A8%ED%8A%B8-%EB%B2%A0%EC%9D%B4%EC%A7%81-2-kiprun-8788273.html', shop: '데카트론 공식', pts: ['리뷰 1만 개 넘는 국민 러닝벨트', '1.5만 원'], beg: 1 },
      { n: 'AONIJIE 러닝 벨트', b: 'AONIJIE', ty: '파우치형', t: 'cheap', usd: 12, pn: '알리 약 1~2만 원대 (판매자별)', img: 'https://ecdn6.globalso.com/upload/p/2902/image_product/2024-12/1-102.jpg', url: 'https://www.aonijie.com/running-belt-3-product/', shop: 'AONIJIE 공식 · 알리', pts: ['폰 포켓 + 물병 포켓 버전', '초저가 트레일 브랜드'] },
      { n: '플립벨트 클래식', b: '플립벨트', ty: '밴드형 (튜브)', t: 'mid', usd: 27, img: 'https://cdn.shopify.com/s/files/1/0267/7322/5672/files/Classic_Belt_1.png', url: 'https://flipbelt.com/products/flipbelt-classic-running-belt-acrylic-summer', shop: '플립벨트 공식 (해외)', pts: ['밴드형 러닝벨트의 원조', '버클 없이 몸에 밀착'], beg: 1 },
      { n: '살로몬 펄스 벨트', b: '살로몬', ty: '밴드형 (튜브)', t: 'mid', krw: 50000, img: 'https://cdn.shopify.com/s/files/1/0580/9035/6875/files/LC2179800_0_GHO_PULSEBELT-BLACK.png', url: 'https://salomon.co.kr/products/lc2179800', shop: '살로몬 코리아', pts: ['국내 공식몰 5만 원', '젤·폰 수납 레이스 벨트'] },
      { n: '네이키드 HC 러닝 밴드', b: '네이키드', ty: '밴드형 (튜브)', t: 'high', usd: 65, img: 'https://cdn.shopify.com/s/files/1/0596/0866/2196/files/HCBand-Black-F_1.jpg', url: 'https://www.nakedsportsinnovations.com/products/naked%C2%AE-hc-running-band', shop: '네이키드 공식 (해외)', pts: ['대용량 — 물병·폴까지', '울트라 러너 인기'], elite: 1 },
      { n: '살로몬 S/LAB 벨트 PNS', b: '살로몬', ty: '밴드형 (튜브)', t: 'pro', krw: 100000, img: 'https://cdn.shopify.com/s/files/1/0580/9035/6875/files/LC3068400_0_GHO_S-LABBELTPNS.png', url: 'https://salomon.co.kr/products/lc3068400', shop: '살로몬 코리아', pts: ['S/LAB 레이스 라인', '엘리트 대회용'], elite: 1 },
    ],
    brands: [
      ["살로몬","#0f172a","프랑스 트레일러닝 대표 브랜드 — 러닝 베스트의 표준 \"스킨\" 시리즈. 국내 공식몰.","https://salomon.co.kr/",[["펄스 벨트","로드 레이스"],["S/LAB 벨트","엘리트"]]],
      ["데카트론","#0082c3","프랑스 스포츠용품 유통사 — 러닝 자체 브랜드 킵런(KIPRUN). 국내 공식몰·매장에서 바로 사요.","https://www.decathlon.co.kr/",[["스마트폰 벨트","1.5만 원 국민 벨트"]]],
      ["플립벨트","#7c3aed","미국 밴드형 러닝벨트의 원조 — 버클 없는 튜브 벨트.","https://flipbelt.com/",[["클래식","튜브형 밴드"]]],
      ["네이키드","#ea580c","캐나다 밴드형 러닝 장비 — 원단이 늘어나 몸에 붙어서 안 흔들려요.","https://www.nakedsportsinnovations.com/",[["HC 러닝 밴드","대용량 밴드"]]],
      ["AONIJIE","#65a30d","중국 초가성비 트레일 브랜드 — 알리에서 살로몬의 3분의 1 가격.","https://www.aonijie.com/",[["러닝 벨트","파우치형 초저가"]]],
    ],
    best: [['플립벨트 클래식', '안 흔들리는 밴드형의 원조'], ['데카트론 러닝 스마트폰 벨트 베이직 2', '1.5만 원 국민 러닝벨트'], ['살로몬 펄스 벨트', '국내 공식몰에서 사는 레이스 벨트']],
  },
  sun: {
    types: [['🌊', '편광 렌즈', '물·아스팔트 반사광을 잘라요 — 눈부심 감소.', '시계 화면이 어둡게 보일 때가 있어요'], ['🌈', '프리즘·고대비 렌즈', '노면 굴곡이 또렷 — 오클리 프리즘 등.', '비싸요'], ['🌗', '변색 렌즈', '빛에 따라 어두워졌다 밝아져요 — 새벽·숲길.', '반응에 몇십 초 걸려요'], ['🛡️', 'UV400 일반 렌즈', '자외선만 막는 기본 렌즈 — 가장 싸요.', '반사광 눈부심은 그대로']],
    rules: [['🪶', '30g 안팎 가벼움', '코·귀 자국이 안 생겨요.'], ['🧲', '미끄럼 방지 코패드', '땀 나도 안 흘러내리는지. 동양인은 "아시안핏"이 편해요.'], ['🛡️', 'UV400 차단', '싼 제품도 UV 차단 표시는 필수.']],
    items: [
      { n: '다이소 러닝 선글라스 1천 원', b: '다이소', ty: 'UV400 일반 렌즈', t: 'cheap', krw: 1000, img: 'https://cdn.daisomall.co.kr/file/PD/20260422/ZOAeERVwFVCjJFAO6Hgx1073820_00_00ZOAeERVwFVCjJFAO6Hgx.jpg', url: 'https://www.daisomall.co.kr/pd/pdr/SCR_PDR_0001?pdNo=1073820', shop: '다이소몰', pts: ['UV400 · 자외선 최대 99% 차단', '단돈 1천 원'], cons: ['편광 아님 · 렌즈 왜곡이 있을 수 있어요', '품절 잦음'], beg: 1 },
      { n: '락브로스 편광 스포츠 선글라스', b: 'ROCKBROS', ty: '편광 렌즈', t: 'cheap', usd: 15, pn: '알리 약 12~50달러 (모델별)', img: 'https://ae-pic-a1.aliexpress-media.com/kf/Sb685b848327e4a56a9a6110b57bce97eL.jpg', url: 'https://ko.aliexpress.com/i/33022724107.html', shop: '알리익스프레스', pts: ['2만 원대 편광·UV400', '자전거·러닝 겸용'], beg: 1 },
      { n: 'goodr OG', b: 'goodr', ty: '편광 렌즈', t: 'cheap', usd: 30, img: 'https://cdn.shopify.com/s/files/1/0084/1616/5946/files/1_MICK_KEITHS_MIDNIGHT_RAMBLE_Side_Transparent_cad0cf3e-dbef-42c4-8d8e-ac03a16efa0e.png', url: 'https://goodr.com/products/mick-and-keiths-midnight-ramble', shop: 'goodr 공식 (해외)', pts: ['"안 미끄러지고 안 튀는" 편광 30달러', '러너 인기 1위 가성비'], beg: 1 },
      { n: '리끌로우 TR 셀리파 편광 고글 선글라스', b: '리끌로우', ty: '편광 렌즈', t: 'cheap', krw: 69900, img: 'https://images.kolonmall.com/Prod_Img/10003999/2026/LS1/K1768988636165006GY01_LS1.jpg', url: 'https://www.kolonmall.com/Product/K1768988636165006GY01', shop: '코오롱몰', pts: ['국내 브랜드 편광 고글형 · 7만 원대', '코오롱몰 평점 4.9'], cons: ['해외 스포츠 브랜드보다 인지도가 낮아요'] },
      { n: '리끌로우 KLAY 변색 고글 선글라스', b: '리끌로우', ty: '변색 렌즈', t: 'cheap', krw: 69900, img: 'https://images.kolonmall.com/Prod_Img/10003999/2026/LS1/K1769504680043010WH01_LS1.jpg', url: 'https://www.kolonmall.com/Product/K1769504680043010WH01', shop: '코오롱몰', pts: ['새벽·밤에도 쓰는 변색 렌즈 · 7만 원대', '코오롱몰 평점 4.8'], cons: ['변색 반응에 수십 초 걸려요'], beg: 1 },
      { n: '소다몬 리트론 RT3301', b: '소다몬', ty: '변색 렌즈', t: 'mid', krw: 149000, img: 'https://images.kolonmall.com/Prod_Img/10003795/2024/LS1/K1710400915305051BL03_LS1.jpg', url: 'https://www.kolonmall.com/Product/K1710400915305051BL03', shop: '코오롱몰', pts: ['변색 + 편광 렌즈를 한 번에', '국내 스포츠 아이웨어 브랜드'], cons: ['렌즈가 커서 얼굴이 작으면 부담'] },
      { n: '100% 허드슨', b: '100%', ty: 'UV400 일반 렌즈', t: 'mid', krw: 150000, img: 'https://images.kolonmall.com/Prod_Img/10003602/2025/LS1/K1788508078021042BR01_LS1.jpg', url: 'https://www.kolonmall.com/Product/K1788508078021042BR01', shop: '코오롱몰 백퍼센트', pts: ['일상·러닝 겸용 라이프스타일 프레임', '15만 원으로 100% 입문'], cons: ['실드형보다 옆 시야가 좁아요'] },
      { n: '100% 스피드크래프트 XS', b: '100%', ty: '프리즘·고대비 렌즈', t: 'mid', krw: 200000, img: 'https://images.kolonmall.com/Prod_Img/10003602/2020/LS1/K1788511709568035BR01_LS1.jpg', url: 'https://www.kolonmall.com/Product/K1788511709568035BR01', shop: '코오롱몰 백퍼센트', pts: ['얼굴이 작은 러너용 작은 실드', '스피드크래프트보다 8만 원 저렴'], cons: ['얼굴이 크면 작아요'] },
      { n: '100% 스피드크래프트', b: '100%', ty: '프리즘·고대비 렌즈', t: 'mid', krw: 280000, pn: '컬러·렌즈별 28~30만 원', img: 'https://images.kolonmall.com/Prod_Img/10003602/2024/LS1/K1788511063188086BR01_LS1.jpg', url: 'https://www.kolonmall.com/Product/K1788511063188086BR01', shop: '코오롱몰 백퍼센트', pts: ['넓은 실드 렌즈 — 시야 최대', '사이클·러닝 선수 다수 사용'] },
      { n: '오클리 수트로', b: '오클리', ty: '프리즘·고대비 렌즈', t: 'high', krw: 287000, pn: '코오롱몰 할인가 수시 변동', img: 'https://images.kolonmall.com/Prod_Img/10003821/2024/LS1/K1764223697133086NO01_LS1.jpg', url: 'https://www.kolonmall.com/Product/K1764223697133086NO01', shop: '코오롱몰 오클리', pts: ['큰 실드형 프리즘 — 러닝·사이클 인기', '아시안핏 코패드'], cons: ['얼굴 작으면 렌즈가 커 보여요'] },
      { n: '오클리 EV제로 패스', b: '오클리', ty: '프리즘·고대비 렌즈', t: 'high', krw: 303000, pn: '코오롱몰 할인가 수시 변동', img: 'https://images.kolonmall.com/Prod_Img/10003821/2025/LS1/K1764223698204061NO01_LS1.jpg', url: 'https://www.kolonmall.com/Product/K1764223698204061NO01', shop: '코오롱몰 오클리', pts: ['테 없는 초경량 실드 — 시야가 넓어요', '아시안핏'], cons: ['렌즈가 노출돼 흠집에 약해요'] },
      { n: '오클리 수트로 라이트', b: '오클리', ty: '프리즘·고대비 렌즈', t: 'high', krw: 303000, pn: '코오롱몰 할인가 수시 변동', img: 'https://images.kolonmall.com/Prod_Img/10003821/2024/LS1/K1764223680772029NO01_LS1.jpg', url: 'https://www.kolonmall.com/Product/K1764223680772029NO01', shop: '코오롱몰 오클리', pts: ['수트로의 하프 프레임 경량 버전', '아래쪽 시야가 트여 노면이 잘 보여요'], elite: 1 },
      { n: '오클리 수트로 라이트 변색', b: '오클리', ty: '변색 렌즈', t: 'high', krw: 352000, img: 'https://images.kolonmall.com/Prod_Img/10003821/2024/LS1/K1764223667137044NO01_LS1.jpg', url: 'https://www.kolonmall.com/Product/K1764223667137044NO01', shop: '코오롱몰 오클리', pts: ['새벽부터 한낮까지 하나로 — 변색 프리즘', '울트라·장거리 러너용'], cons: ['35만 원대'] },
      { n: '디스트릭트 비전 준야 레이서', b: '디스트릭트 비전', ty: '프리즘·고대비 렌즈', t: 'high', krw: 398379, pn: '공식몰 원화 표시가', img: 'https://cdn.shopify.com/s/files/1/0464/6148/5224/files/DVG003_Grey_001.jpg', url: 'https://districtvision.com/products/junya-racer-slate-d-onyx-mirror', shop: '디스트릭트 비전 공식 (해외)', pts: ['러닝 패션 하이엔드', '초경량 레이서 프레임'], elite: 1 },
      { n: '오클리 레이더 EV 패스', b: '오클리', ty: '프리즘·고대비 렌즈', t: 'pro', usd: 244, img: 'https://assets2.oakley.com/prod-onecp-record-files/pieyewear/38bb5876-a40c-4880-9348-b35f004b5e7c/0OO9208__920852__P21__shad__qt.png', url: 'https://www.oakley.com/en-us/product/W0OO9208', shop: '오클리 공식 (미국)', pts: ['엘리트 마라토너·사이클 선수 대표 선글라스', '프리즘 렌즈로 노면이 또렷'], elite: 1 },
    ],
    brands: [
      ['오클리', '#dc2626', '스포츠 선글라스 대표 브랜드 (모회사 에실로룩소티카) — 노면이 또렷한 프리즘 렌즈. 국내는 코오롱몰 등 공식 판매처.', 'https://www.oakley.com/', [['레이더 EV', '선수 대표 실드'], ['수트로', '큰 실드형'], ['EV제로', '테 없는 초경량']]],
      ['100%', '#0f172a', '미국 사이클·모토크로스 아이웨어 — 넓은 실드 렌즈. 국내는 코오롱몰 백퍼센트관.', 'https://www.100percent.com/', [['스피드크래프트', '실드형 대표'], ['허드슨', '라이프스타일']]],
      ['goodr', '#ec4899', '미국 러닝 선글라스 브랜드 — 30달러 편광, 땀에도 안 미끄러지는 코팅.', 'https://goodr.com/', [['OG', '데일리 러닝 편광']]],
      ['리끌로우', '#0ea5e9', '국내 아이웨어 브랜드 — 7만 원대 편광·변색 고글형 러닝 선글라스.', 'https://www.kolonmall.com/Search?keyword=%EB%A6%AC%EB%81%8C%EB%A1%9C%EC%9A%B0', [['TR 셀리파', '편광 고글형'], ['KLAY', '변색 고글형']]],
      ['소다몬', '#16a34a', '국내 스포츠 아이웨어 브랜드 — 변색과 편광을 합친 렌즈.', 'https://www.kolonmall.com/Search?keyword=%EC%86%8C%EB%8B%A4%EB%AA%AC', [['리트론', '변색+편광']]],
      ['디스트릭트 비전', '#64748b', '뉴욕 러닝 패션 아이웨어 — 초경량 레이서 프레임.', 'https://districtvision.com/', [['준야 레이서', '하이엔드 레이서']]],
      ['락브로스', '#f59e0b', '중국 자전거·러닝 용품 브랜드 — 알리에서 1~5만 원대 편광.', 'https://ko.aliexpress.com/i/33022724107.html', [['편광 스포츠', '초가성비']]],
      ['다이소', '#e11d48', '1천 원 균일가 러닝 선글라스 — 편광은 아니지만 UV400.', 'https://www.daisomall.co.kr/', [['러닝 선글라스', 'UV400 1천 원']]],
    ],
    best: [['오클리 레이더 EV 패스', '대회 사진 속 선수들이 쓰는 그 선글라스'], ['goodr OG', '3만 원대로 안 흘러내리는 편광'], ['100% 스피드크래프트', '넓은 시야의 실드형'], ['오클리 수트로 라이트', '국내 공식 판매 오클리 중 러너 인기'], ['리끌로우 KLAY 변색 고글 선글라스', '7만 원대 변색 렌즈']],
  },
  sock: {
    types: [['🧽', '쿠션형', '발바닥 두툼 — 장거리·초보 충격 완화.', '여름엔 더워요'], ['🖐️', '발가락 양말', '발가락 사이 마찰을 막아 물집 방지 — 울트라 러너 필수.', '신기 번거로워요'], ['🐑', '메리노 울', '땀·냄새에 강하고 사계절 — 오래가요.', '비싸요']],
    rules: [['🦶', '뒤꿈치 탭', '신발에 쓸리지 않게 뒤꿈치가 올라온 것.'], ['🧵', '봉제선 없는 앞코', '발가락 물집 예방.'], ['📐', '왼발·오른발 구분', '발에 맞춘 형태면 주름이 안 생겨요.']],
    items: [
      { n: '데카트론 러닝 단목 양말 런 100 (3켤레)', b: '킵런', ty: '쿠션형', t: 'cheap', krw: 5900, img: 'https://contents.mediadecathlon.com/p2707878/k$62f6a58896f77a80b8a697a675a06967/%EB%9F%AC%EB%8B%9D-%EB%8B%A8%EB%AA%A9-%EC%96%91%EB%A7%90-3%EC%BC%A4%EB%A0%88-%EB%9F%B0-100-kiprun-8296178.jpg', url: 'https://www.decathlon.co.kr/kr_ko/running-socks-run-100-3-pack-ko-s11690.html', shop: '데카트론 공식', pts: ['3켤레 5,900원', '입문용 기본기'], beg: 1 },
      { n: '데카트론 러닝 쿠션 중목 양말 런 500 (2켤레)', b: '킵런', ty: '쿠션형', t: 'cheap', krw: 7900, img: 'https://contents.mediadecathlon.com/p2590579/k$ada9cb29b9b26014b5640d1d1f54f065/%EB%9F%AC%EB%8B%9D-%EC%BF%A0%EC%85%98-%EC%A4%91%EB%AA%A9-%EC%96%91%EB%A7%90-2%EC%BC%A4%EB%A0%88-%EB%9F%B0-500-kiprun-8810442.jpg', url: 'https://www.decathlon.co.kr/p/%EB%9F%AC%EB%8B%9D-%EB%8F%84%ED%86%B0%ED%95%9C-%EC%A4%91%EB%AA%A9-%EC%96%91%EB%A7%90-2%EC%BC%A4%EB%A0%88-%EB%9F%B0-500-kiprun-8810442.html', shop: '데카트론 공식', pts: ['쿠션 + 중목 · 평점 4.8', '2켤레 7,900원'] },
      { n: '인진지 런 라이트웨이트 노쇼', b: '인진지', ty: '발가락 양말', t: 'mid', usd: 15, img: 'https://www.injinji.com/media/catalog/product/2/8/281110_cbn_dual_4.png', url: 'https://www.injinji.com/run-lightweight-no-show.html', shop: '인진지 공식 (해외)', pts: ['발가락 물집 걱정 끝', '울트라·풀코스 러너 애용'], elite: 1 },
      { n: '발레가 히든 컴포트', b: '발레가', ty: '쿠션형', t: 'mid', usd: 17, img: 'https://balega.com/cdn/shop/files/BALE_616760_8025-0692_HiddenComfort_NoShowTab_Teal_250722_FA26_MV.jpg', url: 'https://balega.com/products/hidden-comfort-no-show-tab', shop: '발레가 공식 (해외)', pts: ['푹신한 쿠션 + 깊은 뒤꿈치', '러닝 양말 스테디셀러'], beg: 1 },
      { n: '피처스 엘리트 라이트 쿠션', b: '피처스', ty: '쿠션형', t: 'high', usd: 19, img: 'https://feetures.com/cdn/shop/files/Elite_LC_Tab_LilacBreeze_E5090857_1.jpg', url: 'https://feetures.com/products/elite-light-cushion-no-show-tab', shop: '피처스 공식 (해외)', pts: ['아치 압박 · 좌우 구분 설계', '얇고 밀착 — 레이스용'], elite: 1 },
      { n: '단터프 런 마이크로 크루', b: '단터프', ty: '메리노 울', t: 'high', usd: 23, img: 'https://cdn.shopify.com/s/files/1/1354/8177/files/1071_Whitenew.png', url: 'https://darntough.com/products/mens-merino-wool-run-micro-crew-cushioned-ultra-lightweight-running-socks', shop: '단터프 공식 (해외)', pts: ['메리노 울 · 평생 보증', '사계절 · 냄새 적음'] },
    ],
    brands: [
      ["데카트론","#0082c3","프랑스 스포츠용품 유통사 — 러닝 자체 브랜드 킵런(KIPRUN). 국내 공식몰·매장에서 바로 사요.","https://www.decathlon.co.kr/",[["런 100","3켤레 기본"],["런 500","쿠션 중목"]]],
      ["발레가","#0d9488","남아공 러닝 양말 브랜드 — 푹신한 쿠션과 깊은 뒤꿈치.","https://balega.com/",[["히든 컴포트","쿠션 노쇼"]]],
      ["인진지","#2563eb","미국 발가락 양말 브랜드 — 울트라 러너의 물집 방지 필수템.","https://www.injinji.com/",[["런","라이트웨이트 발가락 양말"]]],
      ["피처스","#9333ea","미국 러닝 양말 — 좌우 구분·아치 압박 설계.","https://feetures.com/",[["엘리트","얇은 레이스 양말"]]],
      ["단터프","#b45309","미국 버몬트 메리노 울 양말 — 평생 보증.","https://darntough.com/",[["런","메리노 러닝 양말"]]],
    ],
    best: [['발레가 히든 컴포트', '첫 "좋은 러닝 양말"로 가장 무난'], ['인진지 런 라이트웨이트 노쇼', '물집이 잦다면 발가락 양말'], ['데카트론 러닝 쿠션 중목 양말 런 500', '2켤레 7,900원 가성비']],
  },
};
const GEAR_TIPS = {
  ear: [['🌱', '입문', '5만 원 이하', ['오픈형 클립·이어훅부터', '빠지지 않는지만 확인'], ['QCY 크로스키 C50', '사운드코어 에어로핏 2']], ['🏃', '중급', '20~30만 원', ['오픈형 이어훅 · 골전도', '방수·배터리 8시간+'], ['샥즈 오픈핏 2+', '보스 스포츠 오픈 이어버드']], ['🏆', '선수·대회', '25~37만 원', ['골전도 헤드형이 정석', '심박 측정 이어폰도 선택지'], ['샥즈 오픈런 프로 2', '파워비츠 프로 2']]],
  cap: [['🌱', '입문', '2만 원 안팎', ['가볍고 속건되는 캡', '뒤 조절 끈'], ['데카트론 러닝 캡 모자 V2', '데카트론 러닝 울트라라이트 캡']], ['🏃', '중급', '4~6만 원', ['납작 접히는 러닝 캡', '반사 로고'], ['시엘 GOCap 클래식', '나이키 드라이 핏 ADV 플라이 캡']], ['🏆', '선수·대회', '6만 원+', ['초경량 5패널', '대회 에디션'], ['시엘 GOCap SC 컴프', '새티스파이 플라이트실크 5패널']]],
  vest: [['🌱', '입문', '7~10만 원', ['로드 5L면 충분', '포켓 수 · 무게'], ['데카트론 경량 트레일러닝 베스트 5L', 'AONIJIE 10L 트레일 베스트 C9116']], ['🏃', '중급', '15~18만 원', ['플라스크 포함 세트', '흔들림 테스트'], ['살로몬 액티브 스킨 8 세트', '네이키드 하이 커패시티 베스트']], ['🏆', '트레일·울트라', '25~28만 원', ['필수 장비 수납 12L', '레이싱 S/LAB'], ['살로몬 어드밴스드 스킨 12 세트', '살로몬 S/LAB 센스 6 세트']]],
  belt: [['🌱', '입문', '2만 원 이하', ['폰만 들어가면 OK', '밴드형이 덜 흔들려요'], ['데카트론 러닝 스마트폰 벨트 베이직 2', 'AONIJIE 러닝 벨트']], ['🏃', '중급', '3~5만 원', ['젤·키·폰 분리 수납', '배번 고리'], ['플립벨트 클래식', '살로몬 펄스 벨트']], ['🏆', '대회·울트라', '9~10만 원', ['물병·폴까지 수납', '레이스 전용'], ['네이키드 HC 러닝 밴드', '살로몬 S/LAB 벨트 PNS']]],
  sun: [['🌱', '입문', '1천~7만 원', ['UV400 + 편광', '미끄럼 방지'], ['goodr OG', '리끌로우 TR 셀리파 편광 고글 선글라스']], ['🏃', '중급', '15~30만 원', ['넓은 시야 실드형', '고대비·변색 렌즈'], ['100% 스피드크래프트', '소다몬 리트론 RT3301']], ['🏆', '선수·대회', '30만 원+', ['프리즘 렌즈 · 초경량', '교체 렌즈'], ['오클리 레이더 EV 패스', '오클리 수트로 라이트']]],
  sock: [['🌱', '입문', '켤레당 2~4천 원', ['쿠션형 + 뒤꿈치 탭', '여러 켤레 돌려 신기'], ['데카트론 러닝 단목 양말 런 100 (3켤레)', '데카트론 러닝 쿠션 중목 양말 런 500 (2켤레)']], ['🏃', '중급', '2만 원대', ['좌우 구분 설계', '봉제선 없는 앞코'], ['발레가 히든 컴포트', '피처스 엘리트 라이트 쿠션']], ['🏆', '장거리·울트라', '2~3만 원대', ['발가락 양말로 물집 방지', '메리노 울'], ['인진지 런 라이트웨이트 노쇼', '단터프 런 마이크로 크루']]],
};

/* ---------- 제품별 단점 (상세 팝업) ---------- */
const GEAR_CONS = {
  fit3: ['GPS가 없어 폰을 들고 뛰어야 해요', '러닝 지표가 기본 수준'], gw9: ['아이폰에서는 못 써요', '배터리 1~2일'], gwu2: ['크고 무거워요 (61.5g)', '러닝만 하기엔 비싸요'],
  awse3: ['안드로이드에서는 못 써요', '배터리 하루', '러닝 지표가 단순'], aw12: ['매일 충전해야 해요', '아이폰 전용'], awu4: ['124.9만 원으로 비싸요', '크고 무거운 편'],
  fr70: ['듀얼밴드 GPS 없음', '음악 저장 없음'], fr170: ['듀얼밴드 GPS 없음', '570보다 소재·화면이 저렴'], fr570: ['입문용으로는 비싸요', '지도 기능은 970에만'],
  fr970: ['108.9만 원', '기능이 많아 처음엔 복잡'], fenix9: ['149만 원으로 가장 비싸요', '러닝 전용보다 크고 무거워요'], band11: ['GPS 없음 — 폰 연결 필요', '화면이 작아요'],
  band10p: ['정밀한 훈련 분석은 약해요', '지표가 러닝워치보다 단순'], s5: ['러닝 분석 깊이는 가민보다 얕아요', '앱 생태계가 작아요'], srun: ['구매처가 한정적', '러닝 분석은 가민보다 단순'],
  srace2: ['89만 원', '일반 모델은 76g으로 무거운 편'], cheetah2p: ['국내 판매처가 적어요', '앱 완성도가 아쉬워요'],
  'QCY 크로스키 C50': ['음질·통화 품질은 평범', '격하게 뛰면 흔들릴 수 있어요'], '사운드코어 에어로핏 2': ['국내 정식 판매가가 판매처마다 달라요', '바람 소리가 섞여요'],
  '보스 스포츠 오픈 이어버드': ['오픈형이라 소리가 새요', '방수 IP54로 보통'], '샥즈 오픈핏 2+': ['저음이 약한 편', '28.9만 원'], '샥즈 오픈런 프로 2': ['골전도 특유의 진동', '음악 감상용 음질은 아쉬움'],
  '파워비츠 프로 2': ['귀를 막아 도로에서는 주변음 모드 필수', '케이스가 커요'], '에어팟 프로 3': ['격한 러닝에선 빠질 수 있어요', '안드로이드에선 기능 제한'],
  '보스 울트라 오픈 이어버드 2세대': ['35.9만 원으로 비싸요', '오픈형이라 소리가 새요'], '샥즈 오픈핏 프로': ['36.9만 원', '재고가 자주 품절'], '샥즈 오픈스윔 프로': ['수영 중엔 블루투스가 끊겨 MP3로 들어야 해요', '러닝만 하면 과해요'],
  '데카트론 러닝 캡 모자 V2': ['디자인이 단순해요'], '데카트론 러닝 울트라라이트 캡': ['챙이 짧아요'], '시엘 GOCap 클래식': ['해외 직구 · 배송비'], '나이키 드라이 핏 ADV 플라이 캡': ['깊이가 얕아 머리 큰 사람은 작을 수 있어요'],
  '시엘 GOCap SC 컴프': ['해외 직구 · 한정 에디션'], '새티스파이 플라이트실크 5패널': ['17만 원으로 비싸요', '해외 직구'],
  'AONIJIE 10L 트레일 베스트 C9116': ['판매자마다 품질 편차', '배송이 오래 걸려요'], '데카트론 경량 트레일러닝 베스트 5L': ['물을 많이 못 넣어요'], '살로몬 액티브 스킨 8 세트': ['장거리 트레일엔 수납 부족'],
  '네이키드 하이 커패시티 베스트': ['해외 직구', '사이즈 선택이 까다로워요'], '살로몬 어드밴스드 스킨 12 세트': ['25만 원', '로드 러닝엔 과해요'], '살로몬 S/LAB 센스 6 세트': ['28만 원', '수납이 최소라 초보에겐 불편'],
  '데카트론 러닝 스마트폰 벨트 베이직 2': ['큰 폰은 빡빡할 수 있어요'], 'AONIJIE 러닝 벨트': ['판매자마다 품질 편차'], '플립벨트 클래식': ['허리 사이즈를 정확히 골라야 해요', '해외 직구'],
  '살로몬 펄스 벨트': ['물병 수납은 작아요'], '네이키드 HC 러닝 밴드': ['해외 직구', '짐을 많이 넣으면 무거워요'], '살로몬 S/LAB 벨트 PNS': ['10만 원'],
  '락브로스 편광 스포츠 선글라스': ['렌즈 품질 편차', '코패드가 쉽게 닳아요'], 'goodr OG': ['랩 형태가 아니라 옆 빛은 들어와요', '해외 직구'], '100% 스피드크래프트': ['렌즈가 커서 얼굴 작으면 부담'],
  '디스트릭트 비전 준야 레이서': ['40만 원 가까이 비싸요'], '오클리 레이더 EV 패스': ['국내가는 판매처마다 달라요', '렌즈별 가격 차이 커요'],
  '데카트론 러닝 단목 양말 런 100 (3켤레)': ['쿠션이 얇아요'], '데카트론 러닝 쿠션 중목 양말 런 500 (2켤레)': ['여름엔 두꺼워요'], '인진지 런 라이트웨이트 노쇼': ['신고 벗기 번거로워요'],
  '발레가 히든 컴포트': ['여름엔 두툼해요', '해외 직구'], '피처스 엘리트 라이트 쿠션': ['쿠션이 얇아 장거리엔 아쉬울 수 있어요'], '단터프 런 마이크로 크루': ['울 소재라 여름엔 덥다는 평'],
};
GEAR.daiso = {
  types: [['👕', '의류', '소로나 반팔·경량 반바지 — 3천~5천 원으로 기능성 원단.', '사이즈·색상 품절이 잦아요'], ['🧢', '소품', '캡·선글라스·벨트·양말 — 1천~3천 원.', '내구성은 브랜드 제품보다 약해요'], ['🎧', '전자', '5천 원 무선 이어폰.', '러닝 전용 설계는 아니에요']],
  rules: [['🏪', '매장 재고부터', '다이소몰 앱 "매장 상품 찾기"로 재고 확인 후 방문하세요.'], ['🔁', '인기템은 품절 반복', 'HEAD 협업 러닝 라인(2026년 5월 출시)은 입고 즉시 품절되기도 해요.'], ['👟', '러닝화·시계는 없어요', '다이소에 러닝화·러닝워치는 없어서 풀세트엔 최저가 제품을 넣었어요.']],
  items: [
    { n: '다이소 소로나 라글란 반팔 티', b: '다이소', ty: '상의', t: 'cheap', krw: 5000, img: 'https://cdn.daisomall.co.kr/file/PD/20250502/mQ5JADBoZ2GS3TL2l3qTO202503142531_00_00mQ5JADBoZ2GS3TL2l3qT.jpg', url: 'https://www.daisomall.co.kr/pd/pdr/SCR_PDR_0001?pdNo=O202503142531', shop: '다이소몰', pts: ['땀이 빨리 마르는 소로나 원단','5천 원 러닝 티'], cons: ['인기 색상·사이즈 품절이 잦아요'], beg: 1 },
    { n: '다이소 러닝 라이트 반바지', b: '다이소', ty: '하의', t: 'cheap', krw: 3000, img: 'https://cdn.daisomall.co.kr/file/PD/20260708/Z1lj6ccuMCdhlokMfY4fO202603105071_00_00Z1lj6ccuMCdhlokMfY4f.jpg', url: 'https://www.daisomall.co.kr/pd/pdr/SCR_PDR_0001?pdNo=O202603105071', shop: '다이소몰', pts: ['가벼운 폴리에스터 · 허리 밴딩','리뷰 평점 4.7'], cons: ['다이소몰 분류는 여성 하의 — 남성은 사이즈 확인','품절 잦음'], beg: 1 },
    { n: '다이소 러닝 여성용 라이트 반바지', b: '다이소', ty: '하의', t: 'cheap', krw: 3000, img: 'https://cdn.daisomall.co.kr/file/PD/20260316/IW8meHR3rLfhrLxIuIbd1074444_00_00IW8meHR3rLfhrLxIuIbd.jpg', url: 'https://www.daisomall.co.kr/pd/pdr/SCR_PDR_0001?pdNo=1074444', shop: '다이소몰', pts: ['여성용 경량 러닝 반바지','3천 원'], cons: ['M 단일 사이즈'] },
    { n: 'HEAD 나일론 경량 러닝 볼캡', b: '헤드 × 다이소', ty: '모자', t: 'cheap', krw: 3000, img: 'https://cdn.daisomall.co.kr/file/PD/20260422/jd8IJRWAIwQEgz3vkxxq1079465_00_00jd8IJRWAIwQEgz3vkxxq.jpg', url: 'https://www.daisomall.co.kr/pd/pdr/SCR_PDR_0001?pdNo=1079465', shop: '다이소몰', pts: ['나일론 100% 경량 · 버클 조절','리뷰 평점 4.8 (190건+)'], cons: ['통풍 메쉬는 없어요'], beg: 1 },
    { n: '다이소 러닝 선글라스', b: '다이소', ty: '선글라스', t: 'cheap', krw: 1000, img: 'https://cdn.daisomall.co.kr/file/PD/20260422/ZOAeERVwFVCjJFAO6Hgx1073820_00_00ZOAeERVwFVCjJFAO6Hgx.jpg', url: 'https://www.daisomall.co.kr/pd/pdr/SCR_PDR_0001?pdNo=1073820', shop: '다이소몰', pts: ['UV400 · 자외선 최대 99% 차단','단돈 1천 원'], cons: ['편광 아님 · 렌즈 왜곡이 있을 수 있어요'], beg: 1 },
    { n: '다이소 무선 이어폰', b: '다이소', ty: '이어폰', t: 'cheap', krw: 5000, img: 'https://cdn.daisomall.co.kr/file/PD/20260528/3QZHTLGjQsHIUU1olD7x1069224_00_003QZHTLGjQsHIUU1olD7x.jpg', url: 'https://www.daisomall.co.kr/pd/pdr/SCR_PDR_0001?pdNo=1069224', shop: '다이소몰', pts: ['자동 페어링 · 터치 조작','5천 원 블루투스'], cons: ['러닝 전용 설계가 아니라 격하게 뛰면 빠질 수 있어요','음질 평가는 엇갈려요'], beg: 1 },
    { n: '늘어나는 러닝용 소지품 벨트', b: '다이소', ty: '러닝벨트', t: 'cheap', krw: 2000, img: 'https://cdn.daisomall.co.kr/file/PD/20260423/PmdnVJ7wOopdQfMlGx2C1075176_00_00PmdnVJ7wOopdQfMlGx2C.jpg', url: 'https://www.daisomall.co.kr/pd/pdr/SCR_PDR_0001?pdNo=1075176', shop: '다이소몰', pts: ['밴딩 소재 + 버클로 흔들림 줄임','허리 약 59~76.5cm'], cons: ['주머니 깊이 약 5cm — 큰 폰은 빡빡'], beg: 1 },
    { n: 'HEAD 남성용 단목 양말', b: '헤드 × 다이소', ty: '양말', t: 'cheap', krw: 1500, img: 'https://cdn.daisomall.co.kr/file/PD/20260709/wm0kQ5DjxGxUhaSJ8R5h1079202_00_00wm0kQ5DjxGxUhaSJ8R5h.jpg', url: 'https://www.daisomall.co.kr/pd/pdr/SCR_PDR_0001?pdNo=1079202', shop: '다이소몰', pts: ['가볍고 신축성 좋은 러닝 양말','1,500원'], cons: ['쿠션이 얇아요'], beg: 1 },
    { n: '에버라스트 남성 스포츠 중목 양말 3켤레', b: '에버라스트 × 다이소', ty: '양말', t: 'cheap', krw: 5000, img: 'https://cdn.daisomall.co.kr/file/PD/20240620/3tqgjIIq56m11ZndLvxi1025233_00_003tqgjIIq56m11ZndLvxi.jpg', url: 'https://www.daisomall.co.kr/pd/pdr/SCR_PDR_0001?pdNo=1025233', shop: '다이소몰', pts: ['발등 메쉬로 통기성','3켤레 5천 원'], cons: ['러닝 전용 쿠션 설계는 아니에요'] },
    { n: 'HEAD 스포츠 러닝 조끼', b: '헤드 × 다이소', ty: '조끼', t: 'cheap', krw: 5000, img: 'https://cdn.daisomall.co.kr/file/PD/20260903/W0ANXZN3a28cVP1LuD8T1077099_00_00W0ANXZN3a28cVP1LuD8T.jpg', url: 'https://www.daisomall.co.kr/pd/pdr/SCR_PDR_0001?pdNo=1077099', shop: '다이소몰', pts: ['메쉬 러닝 조끼 · 리뷰 2,900건+','5천 원'], cons: ['물병 수납은 작아요','품절 잦음'] },
  ],
  best: [['HEAD 나일론 경량 러닝 볼캡', '리뷰 평점 4.8 — 3천 원 러닝 캡'], ['다이소 소로나 라글란 반팔 티', '5천 원 기능성 러닝 티'], ['늘어나는 러닝용 소지품 벨트', '2천 원 러닝벨트']],
};
GEAR_TIPS.daiso = [['🌱', '입문', '1만 원 안팎', ['캡·선글라스·양말부터', '반바지 3천 원'], ['HEAD 나일론 경량 러닝 볼캡', '다이소 러닝 선글라스']], ['🏃', '중급', '2만 원 안팎', ['티 + 반바지 + 벨트 세트', '양말 3켤레 묶음'], ['다이소 소로나 라글란 반팔 티', '늘어나는 러닝용 소지품 벨트']], ['🎒', '장거리', '5천 원', ['메쉬 러닝 조끼', '무선 이어폰'], ['HEAD 스포츠 러닝 조끼', '다이소 무선 이어폰']]];
/* ---------- 복장 (남자·여자 / 상의·하의) ---------- */
const DKR = 'https://contents.mediadecathlon.com/', NIKE_IMG = 'https://static.nike.com/a/images/t_default/', NIKE_U = 'u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/';
GEAR.wear = {
  types: [['👕', '반팔·싱글렛', '땀이 바로 마르는 폴리에스터 — 봄~가을 기본, 대회날 싱글렛.', '11월부터는 단독으로 추워요'], ['🧥', '긴팔·하프집', '11~3월 기본 — 심리스·기모로 체온 유지.', '여름엔 더워요'], ['🩳', '쇼츠', '브리프 라인드(속바지 내장) 5~7인치가 표준.', '추운 날엔 다리가 시려요'], ['🦵', '타이츠·레깅스·바지', '겨울엔 기모 타이츠·러닝 팬츠, 여성은 투인원 쇼츠·레깅스.', '사이즈가 꽉 맞아야 해요']],
  rules: [['💧', '면 대신 기능성 원단', '면은 땀을 머금어 무겁고 쓸려요.'], ['🌡️', '11월엔 레이어링', '긴팔 + 얇은 바람막이 — 출발 때 살짝 춥게 입어요.'], ['🌙', '반사 소재', '해가 짧은 계절엔 반사 로고가 안전해요.']],
  items: [
    { n: '데카트론 남성 러닝 반팔티 런 드라이 100', b: '데카트론', g: 'm', part: 'top', ty: '반팔', t: 'cheap', krw: 9900, img: DKR + 'p2924641/k$67d6b1e1b55aa3217970880ea31408c6/%EB%82%A8%EC%84%B1-%EB%9F%AC%EB%8B%9D-%EB%B0%98%ED%8C%94%ED%8B%B0-%EB%9F%B0-%EB%93%9C%EB%9D%BC%EC%9D%B4-100-kalenji-8488034.jpg', url: 'https://www.decathlon.co.kr/p/%EB%82%A8%EC%84%B1-%EB%9F%AC%EB%8B%9D-%EB%B0%98%ED%8C%94-%ED%8B%B0-%EB%9F%B0-%EB%93%9C%EB%9D%BC%EC%9D%B4-100-decathlon-8488034.html', shop: '데카트론 공식', pts: ['1만 원 아래 기능성 티', '빨리 마르는 폴리에스터'], beg: 1, cons: ['얇고 핏이 단순해요'] },
    { n: '데카트론 남성 러닝 심리스 긴팔티 런 500', b: '킵런', g: 'm', part: 'top', ty: '긴팔', t: 'cheap', krw: 29900, img: DKR + 'p2906552/k$185fd7fcff66ba4a4d8d88723d30db9a/%EB%82%A8%EC%84%B1-%EB%9F%AC%EB%8B%9D-%EC%8B%AC%EB%A6%AC%EC%8A%A4-%EA%B8%B4%ED%8C%94%ED%8B%B0-%EB%9F%B0-500-kiprun-8911504.jpg', url: 'https://www.decathlon.co.kr/p/%EB%82%A8%EC%84%B1-%EB%9F%AC%EB%8B%9D-%EC%8B%AC%EB%A6%AC%EC%8A%A4-%EA%B8%B4%ED%8C%94%ED%8B%B0-%EB%9F%B0-500-kiprun-8911504.html', shop: '데카트론 공식', pts: ['봉제선 없는 심리스 — 쓸림 적음', '늦가을·겨울 기본 긴팔'], beg: 1, cons: ['한겨울엔 단독으로 추워요'] },
    { n: '나이키 마일러 드라이 핏 UV 반팔 러닝 탑', b: '나이키', g: 'm', part: 'top', ty: '반팔', t: 'mid', krw: 49000, img: NIKE_IMG + NIKE_U + '7fe6de26-c4c3-4eff-bd1a-84187613fafc/AS+M+NK+DF+UV+MILER+SS.png', url: 'https://www.nike.com/kr/t/%EB%82%98%EC%9D%B4%ED%82%A4-%EB%A7%88%EC%9D%BC%EB%9F%AC-%EB%82%A8%EC%84%B1-%EB%93%9C%EB%9D%BC%EC%9D%B4-%ED%95%8F-uv-%EC%B0%A8%EB%8B%A8-%EB%B0%98%ED%8C%94-%EB%9F%AC%EB%8B%9D-%ED%83%91-FBg6lqrd/IF2083-010', shop: '나이키 코리아', pts: ['러너 교복 — 마일러 라인', 'UV 차단 · 드라이 핏'], cons: ['정가 대비 할인이 잦아 타이밍 중요'] },
    { n: '새티스파이 오라라이트 티셔츠', b: '새티스파이', g: 'm', part: 'top', ty: '반팔', t: 'high', krw: 200000, pn: '공식몰 원화 표시가', img: 'https://cdn.shopify.com/s/files/1/0075/4617/5546/files/11000-DO-SA_auralite-t-shirt_dusty-olive_front_d05af1b4-1b14-4463-b463-a1cfecb5232d.jpg', url: 'https://satisfyrunning.com/products/auralite-t-shirt-dusty-olive', shop: '새티스파이 공식 (해외)', pts: ['파리 러닝 패션의 상징', '초경량 · 통기성 원단'], cons: ['티셔츠 한 장 20만 원', '해외 직구'] },
    { n: '나이키 에어로스위프트 남성 싱글렛', b: '나이키', g: 'm', part: 'top', ty: '싱글렛', t: 'pro', krw: 119000, img: NIKE_IMG + NIKE_U + '98d51074-8a63-475d-8470-b8a7f5086a76/AS+M+NK+DFADV+AROSWFT+SINGLET.png', url: 'https://www.nike.com/kr/t/%EB%82%98%EC%9D%B4%ED%82%A4-%EC%97%90%EC%96%B4%EB%A1%9C%EC%8A%A4%EC%9C%84%ED%94%84%ED%8A%B8-%EB%82%A8%EC%84%B1-%EB%93%9C%EB%9D%BC%EC%9D%B4-%ED%95%8F-adv-%EB%9F%AC%EB%8B%9D-%EC%8B%B1%EA%B8%80%EB%A0%9B-H9juRsU2/FN4232-010', shop: '나이키 코리아', pts: ['엘리트 선수 레이스 킷', '초경량 ADV 원단'], elite: 1, cons: ['슬림 핏이라 몸매가 드러나요', '훈련용으로는 비싸요'] },
    { n: '데카트론 남성 10인치 러닝 숏 타이츠 런 100', b: '킵런', g: 'm', part: 'bottom', ty: '숏 타이츠', t: 'cheap', krw: 14900, img: DKR + 'p2600577/k$dd5af38cad41b69d61cda655e3ffca88/%EB%82%A8%EC%84%B1-10%EC%9D%B8%EC%B9%98-%EB%9F%AC%EB%8B%9D-%EC%88%8F-%ED%83%80%EC%9D%B4%EC%B8%A0-%EB%9F%B0-100-kiprun-8817446.jpg', url: 'https://www.decathlon.co.kr/p/%EB%82%A8%EC%84%B1-5%EB%B6%80-%EB%9F%AC%EB%8B%9D-%EB%A0%88%EA%B9%85%EC%8A%A4-%EC%87%BC%EC%B8%A0-%EB%9F%B0-100-kalenji-8817446.html', shop: '데카트론 공식', pts: ['허벅지 쓸림 방지 숏 타이츠', '포켓 있음'], beg: 1, cons: ['쇼츠 위에 겹쳐 입는 사람이 많아요'] },
    { n: '데카트론 남성 러닝 바지 런 웜 500', b: '킵런', g: 'm', part: 'bottom', ty: '긴바지', t: 'cheap', krw: 54900, img: DKR + 'p3188559/k$91190eaef384519c78d9efc58bf5d7b5/%EB%82%A8%EC%84%B1-%EB%9F%AC%EB%8B%9D-%EB%B0%94%EC%A7%80-%EB%9F%B0-%EC%9B%9C-500-kiprun-9017481.jpg', url: 'https://www.decathlon.co.kr/p/%EB%82%A8%EC%84%B1-%EB%9F%AC%EB%8B%9D-%EB%B0%94%EC%A7%80-%EB%9F%B0-%EC%9B%9C-500-kiprun-9017481.html', shop: '데카트론 공식', pts: ['겨울용 기모 러닝 팬츠', '할인 시 4만 원대'], beg: 1, cons: ['영상 날씨엔 더워요'] },
    { n: '나이키 마일러 7인치 브리프 라인드 쇼츠', b: '나이키', g: 'm', part: 'bottom', ty: '쇼츠', t: 'mid', krw: 55000, img: NIKE_IMG + NIKE_U + 'c05857a2-1e9e-4ce1-95c2-d2d23e422d57/AS+M+NK+DF+MILER+7BF+SHORT.png', url: 'https://www.nike.com/kr/t/%EB%82%98%EC%9D%B4%ED%82%A4-%EB%B0%80%EB%9F%AC-%EB%82%A8%EC%84%B1-%EB%93%9C%EB%9D%BC%EC%9D%B4-%ED%95%8F-7%EC%9D%B8%EC%B9%98-%EB%B8%8C%EB%A6%AC%ED%94%84-%EB%9D%BC%EC%9D%B8%EB%93%9C-%EB%9F%AC%EB%8B%9D-%EC%87%BC%EC%B8%A0-kb8uMUgY/IF2071-010', shop: '나이키 코리아', pts: ['속바지 내장 7인치 — 표준 러닝 쇼츠', '지퍼 포켓'], cons: ['쇼츠 길이 취향 탈 수 있어요'] },
    { n: '새티스파이 테크실크 8인치 쇼츠', b: '새티스파이', g: 'm', part: 'bottom', ty: '쇼츠', t: 'high', krw: 400000, pn: '공식몰 원화 표시가', img: 'https://cdn.shopify.com/s/files/1/0075/4617/5546/files/12099-84000_techsilk-8-short_pyrite_front.jpg', url: 'https://satisfyrunning.com/products/techsilk-8-shorts-pyrite', shop: '새티스파이 공식 (해외)', pts: ['실크 같은 테크 원단', '러닝 패션 최상위'], cons: ['쇼츠 하나 40만 원', '해외 직구'] },
    { n: '나이키 에어로스위프트 2인치 쇼츠', b: '나이키', g: 'm', part: 'bottom', ty: '레이싱 쇼츠', t: 'pro', krw: 115000, img: NIKE_IMG + NIKE_U + '5fa0009c-c78f-4f53-be94-f9d9548ed073/AS+M+NK+DFADV+AROSWFT+2INBF+SH.png', url: 'https://www.nike.com/kr/t/%EB%82%98%EC%9D%B4%ED%82%A4-%EC%97%90%EC%96%B4%EB%A1%9C%EC%8A%A4%EC%9C%84%ED%94%84%ED%8A%B8-%EB%82%A8%EC%84%B1-%EB%93%9C%EB%9D%BC%EC%9D%B4-%ED%95%8F-adv-2%EC%9D%B8%EC%B9%98-%EB%B8%8C%EB%A6%AC%ED%94%84-%EB%9D%BC%EC%9D%B8%EB%93%9C-%EB%9F%AC%EB%8B%9D-%EC%87%BC%EC%B8%A0-5eemh4tZ/FN3350-418', shop: '나이키 코리아', pts: ['선수용 2인치 레이싱 쇼츠', '젤 포켓'], elite: 1, cons: ['짧아서 일상 착용은 부담'] },
    { n: '데카트론 여성 러닝 반팔티 런 드라이 100', b: '킵런', g: 'w', part: 'top', ty: '반팔', t: 'cheap', krw: 9900, img: DKR + 'p2600498/k$04e451540a306d9a8a981689d5ae42e9/%EC%97%AC%EC%84%B1-%EB%9F%AC%EB%8B%9D-%EB%B0%98%ED%8C%94%ED%8B%B0-%EB%9F%B0-%EB%93%9C%EB%9D%BC%EC%9D%B4-100-kiprun-8817407.jpg', url: 'https://www.decathlon.co.kr/p/%EC%97%AC%EC%84%B1-%EB%9F%AC%EB%8B%9D-%EB%B0%98%ED%8C%94-%ED%8B%B0-%EB%9F%B0-%EB%93%9C%EB%9D%BC%EC%9D%B4-100-kalenji-8817407.html', shop: '데카트론 공식', pts: ['1만 원 아래 기능성 티', 'XS~2XL'], beg: 1, cons: ['얇고 핏이 단순해요'] },
    { n: '데카트론 여성 러닝 심리스 긴팔티 런 500', b: '킵런', g: 'w', part: 'top', ty: '긴팔', t: 'cheap', krw: 29900, img: DKR + 'p3237448/k$abcecf27f81b2fedfb5344e8ca8b7525/%EC%97%AC%EC%84%B1-%EB%9F%AC%EB%8B%9D-%EC%8B%AC%EB%A6%AC%EC%8A%A4-%EA%B8%B4%ED%8C%94%ED%8B%B0-%EB%9F%B0-%EC%8A%A4%ED%82%A8%EC%BC%80%EC%96%B4-500-kiprun-8954770.jpg', url: 'https://www.decathlon.co.kr/p/%EC%97%AC%EC%84%B1-%EB%9F%AC%EB%8B%9D-%EC%8B%AC%EB%A6%AC%EC%8A%A4-%EA%B8%B4%ED%8C%94%ED%8B%B0-%EB%9F%B0-%EC%8A%A4%ED%82%A8%EC%BC%80%EC%96%B4-500-kiprun-8954770.html', shop: '데카트론 공식', pts: ['심리스 · 피부 쓸림 적음', '늦가을·겨울 기본 긴팔'], beg: 1, cons: ['한겨울엔 단독으로 추워요'] },
    { n: '나이키 스위프트 여성 반팔 러닝 탑', b: '나이키', g: 'w', part: 'top', ty: '반팔', t: 'mid', krw: 69000, img: NIKE_IMG + NIKE_U + '4e8bdf7d-1154-4279-9227-399ce1d7639a/AS+W+NK+SWIFT+DF+TOP+SS+STNDRD.png', url: 'https://www.nike.com/kr/t/%EB%82%98%EC%9D%B4%ED%82%A4-%EC%8A%A4%EC%9C%84%ED%94%84%ED%8A%B8-%EC%97%AC%EC%84%B1-%EB%93%9C%EB%9D%BC%EC%9D%B4-%ED%95%8F-%EB%B0%98%ED%8C%94-%EB%9F%AC%EB%8B%9D-%ED%83%91-OIjzWa9n/IU1053-010', shop: '나이키 코리아', pts: ['여성 러닝 대표 라인 스위프트', '드라이 핏'], cons: ['정가 대비 할인이 잦아 타이밍 중요'] },
    { n: '새티스파이 오라라이트 티셔츠 (여성)', b: '새티스파이', g: 'w', part: 'top', ty: '반팔', t: 'high', krw: 200000, pn: '공식몰 원화 표시가', img: 'https://cdn.shopify.com/s/files/1/0075/4617/5546/files/21000-AL-SA_auralite-t-shirt_aluminium_front_2ba8c998-393a-4ce3-9955-4aa15ae28eb9.jpg', url: 'https://satisfyrunning.com/products/auralite-t-shirt-aluminium-1', shop: '새티스파이 공식 (해외)', pts: ['초경량 · 통기성 원단', '러닝 패션 하이엔드'], cons: ['티셔츠 한 장 20만 원', '해외 직구'] },
    { n: '나이키 에어로스위프트 여성 싱글렛', b: '나이키', g: 'w', part: 'top', ty: '싱글렛', t: 'pro', krw: 119000, img: NIKE_IMG + '777c90ef-0766-40b7-9f8c-6d7ae616b111/AS+W+NK+ARSWFT+DFADV+SINGLET.png', url: 'https://www.nike.com/kr/t/%EB%82%98%EC%9D%B4%ED%82%A4-%EC%97%90%EC%96%B4%EB%A1%9C%EC%8A%A4%EC%9C%84%ED%94%84%ED%8A%B8-%EC%97%AC%EC%84%B1-%EB%93%9C%EB%9D%BC%EC%9D%B4-%ED%95%8F-adv-%EB%9F%AC%EB%8B%9D-%EC%8B%B1%EA%B8%80%EB%A0%9B-mLK3F2EU/IF1253-010', shop: '나이키 코리아', pts: ['엘리트 선수 레이스 킷', '초경량 ADV 원단'], elite: 1, cons: ['훈련용으로는 비싸요'] },
    { n: '데카트론 여성 투인원 쇼츠 레깅스 런 드라이 100', b: '킵런', g: 'w', part: 'bottom', ty: '투인원 쇼츠', t: 'cheap', krw: 34900, img: DKR + 'p2747413/k$a18a8792528679ff5a722a941847e456/%EC%97%AC%EC%84%B1-%EB%9F%AC%EB%8B%9D-%ED%88%AC%EC%9D%B8%EC%9B%90-%EC%87%BC%EC%B8%A0-%EB%A0%88%EA%B9%85%EC%8A%A4-%EB%9F%B0-%EB%93%9C%EB%9D%BC%EC%9D%B4-100-kiprun-8902783.jpg', url: 'https://www.decathlon.co.kr/p/%EC%97%AC%EC%84%B1-%EB%9F%AC%EB%8B%9D-%ED%88%AC%EC%9D%B8%EC%9B%90-%EC%87%BC%EC%B8%A0-%EB%A0%88%EA%B9%85%EC%8A%A4-%EB%9F%B0-%EB%93%9C%EB%9D%BC%EC%9D%B4-100-kiprun-8902783.html', shop: '데카트론 공식', pts: ['쇼츠 + 레깅스 한 벌', '쓸림 걱정 없음'], beg: 1, cons: ['여름엔 레깅스가 더울 수 있어요'] },
    { n: '데카트론 여성 러닝 레깅스 런 웜 500', b: '킵런', g: 'w', part: 'bottom', ty: '레깅스', t: 'cheap', krw: 44900, img: DKR + 'p3237443/k$93d4a98bb8fe77359920c2cca29a3d48/%EC%97%AC%EC%84%B1-%EB%9F%AC%EB%8B%9D-%EB%A0%88%EA%B9%85%EC%8A%A4-%EB%9F%B0-%EC%9B%9C-500-kiprun-9008248.jpg', url: 'https://www.decathlon.co.kr/p/%EC%97%AC%EC%84%B1-%EB%9F%AC%EB%8B%9D-%EB%A0%88%EA%B9%85%EC%8A%A4-%EB%9F%B0-%EC%9B%9C-500-kiprun-9008248.html', shop: '데카트론 공식', pts: ['겨울용 기모 레깅스', '할인 시 3만 원대'], beg: 1, cons: ['영상 날씨엔 더워요'] },
    { n: '나이키 스위프트 여성 투인원 러닝 쇼츠', b: '나이키', g: 'w', part: 'bottom', ty: '투인원 쇼츠', t: 'mid', krw: 79000, img: NIKE_IMG + 'b637aa2f-7224-4a2e-84a1-12c20d153360/AS+W+NK+SWIFT+DF+MR+2N1+SHRT.png', url: 'https://www.nike.com/kr/t/%EB%82%98%EC%9D%B4%ED%82%A4-%EC%8A%A4%EC%9C%84%ED%94%84%ED%8A%B8-%EC%97%AC%EC%84%B1-%EB%93%9C%EB%9D%BC%EC%9D%B4-%ED%95%8F-%EB%AF%B8%EB%93%9C%EB%9D%BC%EC%9D%B4%EC%A6%88-%ED%88%AC%EC%9D%B8%EC%9B%90-%EB%9F%AC%EB%8B%9D-%EC%87%BC%EC%B8%A0-cOddONs6/HJ5377-010', shop: '나이키 코리아', pts: ['미드라이즈 투인원', '여성 러너 인기 라인'], cons: ['정가 대비 할인이 잦아 타이밍 중요'] },
    { n: '새티스파이 테크실크 5인치 쇼츠 (여성)', b: '새티스파이', g: 'w', part: 'bottom', ty: '쇼츠', t: 'high', krw: 360000, pn: '공식몰 원화 표시가', img: 'https://cdn.shopify.com/s/files/1/0075/4617/5546/files/22017-00000_tech-silk-5-shorts_black_front_b13f63a2-3c41-4fa8-af6f-7ab465a673af.jpg', url: 'https://satisfyrunning.com/products/techsilk-5-shorts-black-women', shop: '새티스파이 공식 (해외)', pts: ['실크 같은 테크 원단', '러닝 패션 최상위'], cons: ['쇼츠 하나 36만 원', '해외 직구'] },
    { n: '나이키 에어로스위프트 여성 3인치 쇼츠', b: '나이키', g: 'w', part: 'bottom', ty: '레이싱 쇼츠', t: 'pro', krw: 105000, img: NIKE_IMG + 'e9894cf4-bc97-452d-af9b-963bdfb6d399/AS+W+NK+ARSWFT+DFADVMR3INSHORT.png', url: 'https://www.nike.com/kr/t/%EB%82%98%EC%9D%B4%ED%82%A4-%EC%97%90%EC%96%B4%EB%A1%9C%EC%8A%A4%EC%9C%84%ED%94%84%ED%8A%B8-%EC%97%AC%EC%84%B1-%EB%93%9C%EB%9D%BC%EC%9D%B4-%ED%95%8F-adv-%EB%AF%B8%EB%93%9C%EB%9D%BC%EC%9D%B4%EC%A6%88-%EB%B8%8C%EB%A6%AC%ED%94%84-%EB%9D%BC%EC%9D%B8%EB%93%9C-3%EC%9D%B8%EC%B9%98-%EB%9F%AC%EB%8B%9D-%EC%87%BC%EC%B8%A0-sKfhxF4d/FN2329-010', shop: '나이키 코리아', pts: ['선수용 레이싱 쇼츠', '브리프 라인드'], elite: 1, cons: ['짧아서 일상 착용은 부담'] },
    { n: "아디다스 아디제로 NYC 러닝 싱글렛 (남성)", b: "아디다스", g: 'm', part: 'top', ty: "싱글렛", t: 'mid', krw: 79000, img: "https://image.msscdn.net/thumbnails/images/goods_img/20261016/7538820/7538820_17921294728215_big.jpg", url: "https://www.musinsa.com/products/7538820", shop: '무신사', pts: ["민소매 레이싱·여름용","무신사 「아디다스 러닝」 판매금액순 42위"], cons: ["노출이 커서 훈련복으론 호불호"] },
    { n: "아디다스 오운 더 런 숏 타이츠", b: "아디다스", g: 'm', part: 'bottom', ty: "숏 타이츠", t: 'mid', krw: 69000, img: "https://image.msscdn.net/thumbnails/images/goods_img/20261117/7813817/7813817_17949832896944_big.jpg", url: "https://www.musinsa.com/products/7813817", shop: '무신사', pts: ["허벅지 쓸림을 막는 숏 타이츠","무신사 「아디다스 러닝」 판매금액순 28위"], cons: ["몸에 붙는 핏이 부담일 수 있어요"] },
    { n: "아디다스 아디제로 NYC 러닝 싱글렛 (여성)", b: "아디다스", g: 'w', part: 'top', ty: "싱글렛", t: 'mid', krw: 79000, img: "https://image.msscdn.net/thumbnails/images/goods_img/20261016/7538818/7538818_17921294577114_big.jpg", url: "https://www.musinsa.com/products/7538818", shop: '무신사', pts: ["민소매 레이싱·여름용","무신사 「아디다스 러닝」 판매금액순 33위"], cons: ["노출이 커서 훈련복으론 호불호"] },
    { n: "아디다스 adi365 러닝 쇼츠 4인치 (여성)", b: "아디다스", g: 'w', part: 'bottom', ty: "쇼츠", t: 'mid', krw: 89000, img: "https://image.msscdn.net/thumbnails/images/goods_img/20260305/6088424/6088424_17750129048089_big.jpg", url: "https://www.musinsa.com/products/6088424", shop: '무신사', pts: ["러닝 쇼츠","무신사 「아디다스 러닝」 판매금액순 29위"], cons: ["추운 날엔 다리가 시려요"] },
    { n: "푸마 테크 윈드브레이커", b: "푸마", g: 'm', part: 'top', ty: "바람막이", t: 'mid', krw: 119000, img: "https://image.msscdn.net/thumbnails/images/goods_img/20261029/7655566/7655566_17932491035993_big.jpg", url: "https://www.musinsa.com/products/7655566", shop: '무신사', pts: ["가벼운 러닝 바람막이","무신사 「푸마 러닝」 판매금액순 16위"], cons: ["통기성은 티셔츠보다 떨어져요"] },
    { n: "푸마 러닝 윈터 롱 팬츠", b: "푸마", g: 'm', part: 'bottom', ty: "긴바지", t: 'high', krw: 159000, pn: '무신사 판매가 79,500원', img: "https://image.msscdn.net/thumbnails/images/goods_img/20251016/5602021/5602021_17610337030379_big.jpg", url: "https://www.musinsa.com/products/5602021", shop: '무신사', pts: ["추운 날 러닝 긴바지","무신사 「푸마 러닝」 판매금액순 28위"], cons: ["영상 날씨엔 더워요"] },
    { n: "푸마 여성 러닝 롱 슬리브", b: "푸마", g: 'w', part: 'top', ty: "긴팔", t: 'mid', krw: 69000, img: "https://image.msscdn.net/thumbnails/images/goods_img/20260909/7283504/7283504_17889179672483_big.jpg", url: "https://www.musinsa.com/products/7283504", shop: '무신사', pts: ["가을·겨울 러닝 긴팔","무신사 「푸마 러닝」 판매금액순 47위"], cons: ["여름엔 더워요"] },
    { n: "푸마 x 하이록스 파워모드 우븐 쇼츠 (여성)", b: "푸마", g: 'w', part: 'bottom', ty: "쇼츠", t: 'mid', krw: 89000, img: "https://image.msscdn.net/thumbnails/images/goods_img/20260622/6711044/6711044_17824401877488_big.jpg", url: "https://www.musinsa.com/products/6711044", shop: '무신사', pts: ["러닝 쇼츠","무신사 「푸마 러닝」 판매금액순 38위"], cons: ["추운 날엔 다리가 시려요"] },
    { n: "뉴발란스 MEN 애슬레틱 나시티", b: "뉴발란스", g: 'm', part: 'top', ty: "싱글렛", t: 'cheap', krw: 49900, img: "https://image.msscdn.net/thumbnails/images/goods_img/20260709/6812731/6812731_17835700227462_big.jpg", url: "https://www.musinsa.com/products/6812731", shop: '무신사', pts: ["민소매 레이싱·여름용","무신사 「뉴발란스 러닝」 판매금액순 5위"], cons: ["노출이 커서 훈련복으론 호불호"] },
    { n: "뉴발란스 MEN RC 쇼츠 5인치", b: "뉴발란스", g: 'm', part: 'bottom', ty: "쇼츠", t: 'mid', krw: 89900, img: "https://image.msscdn.net/thumbnails/images/goods_img/20260703/6776801/6776801_17830433104539_big.jpg", url: "https://www.musinsa.com/products/6776801", shop: '무신사', pts: ["러닝 쇼츠","무신사 「뉴발란스 러닝」 판매금액순 10위"], cons: ["추운 날엔 다리가 시려요"] },
    { n: "뉴발란스 WOMEN RC 에어 프로 나시티", b: "뉴발란스", g: 'w', part: 'top', ty: "싱글렛", t: 'mid', krw: 69900, img: "https://image.msscdn.net/thumbnails/images/goods_img/20260706/6787318/6787318_17833105834053_big.jpg", url: "https://www.musinsa.com/products/6787318", shop: '무신사', pts: ["민소매 레이싱·여름용","무신사 「뉴발란스 러닝」 판매금액순 3위"], cons: ["노출이 커서 훈련복으론 호불호"] },
    { n: "뉴발란스 WOMEN RC 에센셜 쇼츠 3인치", b: "뉴발란스", g: 'w', part: 'bottom', ty: "쇼츠", t: 'mid', krw: 69900, img: "https://image.msscdn.net/thumbnails/images/goods_img/20260707/6797146/6797146_17833997263261_big.jpg", url: "https://www.musinsa.com/products/6797146", shop: '무신사', pts: ["러닝 쇼츠","무신사 「뉴발란스 러닝」 판매금액순 9위"], cons: ["추운 날엔 다리가 시려요"] },
    { n: "아식스 실버 SS 탑 우먼", b: "아식스", g: 'w', part: 'top', ty: "반팔", t: 'cheap', krw: 48000, img: "https://image.msscdn.net/thumbnails/images/goods_img/20250723/5266519/5266519_17533455474594_big.jpg", url: "https://www.musinsa.com/products/5266519", shop: '무신사', pts: ["기본 러닝 반팔","무신사 「아식스 러닝」 판매금액순 47위"], cons: ["한겨울엔 단독으로 추워요"] },
    { n: "아식스 메타런 탱크 (여성)", b: "아식스", g: 'w', part: 'top', ty: "싱글렛", t: 'mid', krw: 95000, img: "https://image.msscdn.net/thumbnails/images/goods_img/20260116/5902221/5902221_17687848877658_big.jpg", url: "https://www.musinsa.com/products/5902221", shop: '무신사', pts: ["민소매 레이싱·여름용","무신사 「아식스 러닝」 판매금액순 48위"], cons: ["노출이 커서 훈련복으론 호불호"] },
    { n: "브룩스 대쉬 숏 슬리브 (남성)", b: "브룩스", g: 'm', part: 'top', ty: "반팔", t: 'cheap', krw: 49900, img: "https://image.msscdn.net/thumbnails/images/goods_img/20260326/6198305/6198305_17781338813317_big.jpg", url: "https://www.musinsa.com/products/6198305", shop: '무신사', pts: ["기본 러닝 반팔","무신사 「브룩스 러닝」 판매금액순 36위"], cons: ["한겨울엔 단독으로 추워요"] },
    { n: "브룩스 대쉬 쇼츠 (남성)", b: "브룩스", g: 'm', part: 'bottom', ty: "쇼츠", t: 'cheap', krw: 49900, img: "https://image.msscdn.net/thumbnails/images/goods_img/20260326/6198308/6198308_17781337118163_big.jpg", url: "https://www.musinsa.com/products/6198308", shop: '무신사', pts: ["러닝 쇼츠","무신사 「브룩스 러닝」 판매금액순 39위"], cons: ["추운 날엔 다리가 시려요"] },
    { n: "브룩스 대쉬 탱크 (여성)", b: "브룩스", g: 'w', part: 'top', ty: "싱글렛", t: 'cheap', krw: 45900, img: "https://image.msscdn.net/thumbnails/images/goods_img/20260326/6198295/6198295_17781347003213_big.jpg", url: "https://www.musinsa.com/products/6198295", shop: '무신사', pts: ["민소매 레이싱·여름용","무신사 「브룩스 러닝」 판매금액순 34위"], cons: ["노출이 커서 훈련복으론 호불호"] },
    { n: "브룩스 체이서 7인치 쇼츠 타이즈 (여성)", b: "브룩스", g: 'w', part: 'bottom', ty: "숏 타이츠", t: 'mid', krw: 75900, img: "https://image.msscdn.net/thumbnails/images/goods_img/20260326/6198349/6198349_17785502526280_big.jpg", url: "https://www.musinsa.com/products/6198349", shop: '무신사', pts: ["허벅지 쓸림을 막는 숏 타이츠","무신사 「브룩스 러닝」 판매금액순 40위"], cons: ["몸에 붙는 핏이 부담일 수 있어요"] },
    { n: "언더아머 테크 2.0 반팔티", b: "언더아머", g: 'm', part: 'top', ty: "반팔", t: 'cheap', krw: 39000, pn: '무신사 판매가 37,050원', img: "https://image.msscdn.net/thumbnails/images/goods_img/20210405/1880961/1880961_1_big.jpg", url: "https://www.musinsa.com/products/1880961", shop: '무신사', pts: ["기본 러닝 반팔","무신사 「언더아머 러닝」 판매금액순 8위"], cons: ["한겨울엔 단독으로 추워요"] },
    { n: "언더아머 론치 언라인드 7인치 쇼츠", b: "언더아머", g: 'm', part: 'bottom', ty: "쇼츠", t: 'mid', krw: 55000, pn: '무신사 판매가 52,250원', img: "https://image.msscdn.net/thumbnails/images/goods_img/20240717/4255775/4255775_17212064278392_big.jpg", url: "https://www.musinsa.com/products/4255775", shop: '무신사', pts: ["러닝 쇼츠","무신사 「언더아머 러닝」 판매금액순 14위"], cons: ["추운 날엔 다리가 시려요"] },
    { n: "언더아머 여성 테크 반팔", b: "언더아머", g: 'w', part: 'top', ty: "반팔", t: 'cheap', krw: 39000, pn: '무신사 판매가 37,050원', img: "https://image.msscdn.net/thumbnails/images/goods_img/20240216/3876548/3876548_17821053409421_big.jpg", url: "https://www.musinsa.com/products/3876548", shop: '무신사', pts: ["기본 러닝 반팔","무신사 「언더아머 러닝」 판매금액순 17위"], cons: ["한겨울엔 단독으로 추워요"] },
    { n: "언더아머 여성 아머 스포츠 우븐 팬츠", b: "언더아머", g: 'w', part: 'bottom', ty: "긴바지", t: 'mid', krw: 59000, pn: '무신사 판매가 53,100원', img: "https://image.msscdn.net/thumbnails/images/goods_img/20240216/3876756/3876756_17083392878944_big.jpg", url: "https://www.musinsa.com/products/3876756", shop: '무신사', pts: ["추운 날 러닝 긴바지","무신사 「언더아머 러닝」 판매금액순 26위"], cons: ["영상 날씨엔 더워요"] },
    { n: "룰루레몬 Rulu 플리스 하프집 롱슬리브", b: "룰루레몬", g: 'm', part: 'top', ty: "하프집", t: 'high', krw: 169000, img: "https://image.msscdn.net/thumbnails/images/goods_img/20251114/5732790/5732790_17905435980321_big.jpg", url: "https://www.musinsa.com/products/5732790", shop: '무신사', pts: ["보온 하프집 미드레이어","무신사 「룰루레몬 러닝」 판매금액순 5위"], cons: ["보온용이라 고강도 훈련엔 더워요"] },
    { n: "룰루레몬 페이스 브레이커 라인드 쇼츠 5인치", b: "룰루레몬", g: 'm', part: 'bottom', ty: "쇼츠", t: 'mid', krw: 93000, pn: '무신사 판매가 65,000원', img: "https://image.msscdn.net/thumbnails/images/goods_img/20260818/7092133/7092133_17870296387633_big.jpg", url: "https://www.musinsa.com/products/7092133", shop: '무신사', pts: ["러닝 쇼츠","무신사 「룰루레몬 러닝」 판매금액순 6위"], cons: ["추운 날엔 다리가 시려요"] },
    { n: "룰루레몬 심리스 메쉬백 러닝 탱크탑", b: "룰루레몬", g: 'w', part: 'top', ty: "싱글렛", t: 'mid', krw: 93000, img: "https://image.msscdn.net/thumbnails/images/goods_img/20261102/7675879/7675879_17935781715810_big.jpg", url: "https://www.musinsa.com/products/7675879", shop: '무신사', pts: ["민소매 레이싱·여름용","무신사 「룰루레몬 러닝」 판매금액순 16위"], cons: ["노출이 커서 훈련복으론 호불호"] },
    { n: "룰루레몬 Nulux 하이라이즈 타이츠 25인치", b: "룰루레몬", g: 'w', part: 'bottom', ty: "레깅스", t: 'high', krw: 198000, pn: '무신사 판매가 118,000원', img: "https://image.msscdn.net/thumbnails/images/goods_img/20260818/7092600/7092600_17871129280962_big.jpg", url: "https://www.musinsa.com/products/7092600", shop: '무신사', pts: ["겨울·장거리 러닝 타이츠","무신사 「룰루레몬 러닝」 판매금액순 19위"], cons: ["사이즈가 꼭 맞아야 해요"] },
    { n: "살로몬 스팀플로우 롱 슬리브", b: "살로몬", g: 'm', part: 'top', ty: "긴팔", t: 'high', krw: 130000, img: "https://image.msscdn.net/thumbnails/images/goods_img/20260804/6991442/6991442_17878783724079_big.jpg", url: "https://www.musinsa.com/products/6991442", shop: '무신사', pts: ["가을·겨울 러닝 긴팔","무신사 「살로몬 러닝」 판매금액순 32위"], cons: ["여름엔 더워요"] },
    { n: "살로몬 템포스 러닝 자켓", b: "살로몬", g: 'm', part: 'top', ty: "바람막이", t: 'high', krw: 240000, img: "https://image.msscdn.net/thumbnails/images/goods_img/20260722/6899194/6899194_17872975839081_big.jpg", url: "https://www.musinsa.com/products/6899194", shop: '무신사', pts: ["가벼운 러닝 바람막이","무신사 「살로몬 러닝」 판매금액순 42위"], cons: ["통기성은 티셔츠보다 떨어져요"] },
    { n: "살로몬 스피랄 롱 슬리브 W", b: "살로몬", g: 'w', part: 'top', ty: "긴팔", t: 'high', krw: 130000, img: "https://image.msscdn.net/thumbnails/images/goods_img/20260804/6991461/6991461_17944621803249_big.jpg", url: "https://www.musinsa.com/products/6991461", shop: '무신사', pts: ["가을·겨울 러닝 긴팔","무신사 「살로몬 러닝」 판매금액순 48위"], cons: ["여름엔 더워요"] },
    { n: "무신사 스탠다드 스포츠 드라이액트 퓨즈 롱슬리브", b: "무신사 스탠다드 스포츠", g: 'm', part: 'top', ty: "긴팔", t: 'cheap', krw: 49900, pn: '무신사 판매가 46,550원', img: "https://image.msscdn.net/thumbnails/images/goods_img/20251121/5762245/5762245_17701714862829_big.jpg", url: "https://www.musinsa.com/products/5762245", shop: '무신사', pts: ["가을·겨울 러닝 긴팔","무신사 「무신사 스탠다드 스포츠 러닝」 판매금액순 13위"], cons: ["여름엔 더워요"] },
    { n: "무신사 스탠다드 스포츠 컴포트액트 롱타이즈", b: "무신사 스탠다드 스포츠", g: 'm', part: 'bottom', ty: "롱 타이츠", t: 'mid', krw: 69900, pn: '무신사 판매가 55,440원', img: "https://image.msscdn.net/thumbnails/images/goods_img/20251121/5761359/5761359_17732132485672_big.jpg", url: "https://www.musinsa.com/products/5761359", shop: '무신사', pts: ["겨울 러닝 롱 타이츠","무신사 「무신사 스탠다드 스포츠 러닝」 판매금액순 7위"], cons: ["사이즈가 꼭 맞아야 해요"] },
    { n: "무신사 스탠다드 스포츠 퀵드라이 퓨즈 롱슬리브 우먼", b: "무신사 스탠다드 스포츠", g: 'w', part: 'top', ty: "긴팔", t: 'cheap', krw: 49900, pn: '무신사 판매가 44,330원', img: "https://image.msscdn.net/thumbnails/images/goods_img/20260506/6423041/6423041_17865825467230_big.jpg", url: "https://www.musinsa.com/products/6423041", shop: '무신사', pts: ["가을·겨울 러닝 긴팔","무신사 「무신사 스탠다드 스포츠 러닝」 판매금액순 2위"], cons: ["여름엔 더워요"] },
    { n: "무신사 스탠다드 스포츠 베이직 숏슬리브 우먼 2팩", b: "무신사 스탠다드 스포츠", g: 'w', part: 'top', ty: "반팔", t: 'cheap', krw: 35800, pn: '무신사 판매가 33,220원', img: "https://image.msscdn.net/thumbnails/images/goods_img/20250912/5449070/5449070_17742366607956_big.jpg", url: "https://www.musinsa.com/products/5449070", shop: '무신사', pts: ["기본 러닝 반팔","무신사 「무신사 스탠다드 스포츠 러닝」 판매금액순 18위"], cons: ["한겨울엔 단독으로 추워요"] },
    { n: "안다르 드라이 러닝 하프넥 베이스레이어", b: "안다르", g: 'w', part: 'top', ty: "긴팔", t: 'cheap', krw: 45000, pn: '무신사 판매가 36,000원', img: "https://image.msscdn.net/thumbnails/images/goods_img/20250828/5374920/5374920_17563645691105_big.jpg", url: "https://www.musinsa.com/products/5374920", shop: '무신사', pts: ["가을·겨울 러닝 긴팔","무신사 「안다르 러닝」 판매금액순 4위"], cons: ["여름엔 더워요"] },
    { n: "안다르 런 핏 포켓 롱슬리브", b: "안다르", g: 'w', part: 'top', ty: "긴팔", t: 'mid', krw: 65000, pn: '무신사 판매가 49,000원', img: "https://image.msscdn.net/thumbnails/images/goods_img/20260910/7293883/7293883_17890012666006_big.jpg", url: "https://www.musinsa.com/products/7293883", shop: '무신사', pts: ["가을·겨울 러닝 긴팔","무신사 「안다르 러닝」 판매금액순 11위"], cons: ["여름엔 더워요"] },
    { n: "안다르 액티브가드 웜 메쉬 윈드자켓", b: "안다르", g: 'w', part: 'top', ty: "바람막이", t: 'high', krw: 139000, img: "https://image.msscdn.net/thumbnails/images/goods_img/20261022/7585419/7585419_17926305071956_big.jpg", url: "https://www.musinsa.com/products/7585419", shop: '무신사', pts: ["가벼운 러닝 바람막이","무신사 「안다르 러닝」 판매금액순 5위"], cons: ["통기성은 티셔츠보다 떨어져요"] },
    { n: "안다르 에어쿨링 맨즈 퍼포먼스 5부 레깅스", b: "안다르", g: 'm', part: 'bottom', ty: "숏 타이츠", t: 'cheap', krw: 43000, pn: '무신사 판매가 37,000원', img: "https://image.msscdn.net/thumbnails/images/goods_img/20241219/4674297/4674297_17899685309177_big.jpg", url: "https://www.musinsa.com/products/4674297", shop: '무신사', pts: ["허벅지 쓸림을 막는 숏 타이츠","무신사 「안다르 러닝」 판매금액순 25위"], cons: ["몸에 붙는 핏이 부담일 수 있어요"] },
    { n: "젝시믹스 RX 맨즈 아이스페더 롱슬리브", b: "젝시믹스", g: 'm', part: 'top', ty: "긴팔", t: 'mid', krw: 64000, pn: '무신사 판매가 37,900원', img: "https://image.msscdn.net/thumbnails/images/goods_img/20250902/5386868/5386868_17708863967111_big.png", url: "https://www.musinsa.com/products/5386868", shop: '무신사', pts: ["가을·겨울 러닝 긴팔","무신사 「젝시믹스 러닝」 판매금액순 9위"], cons: ["여름엔 더워요"] },
    { n: "젝시믹스 3인치 러닝 쇼츠", b: "젝시믹스", g: 'm', part: 'bottom', ty: "쇼츠", t: 'cheap', krw: 46000, pn: '무신사 판매가 29,000원', img: "https://image.msscdn.net/thumbnails/images/goods_img/20250714/5246262/5246262_17720827763115_big.jpg", url: "https://www.musinsa.com/products/5246262", shop: '무신사', pts: ["러닝 쇼츠","무신사 「젝시믹스 러닝」 판매금액순 26위"], cons: ["추운 날엔 다리가 시려요"] },
    { n: "젝시믹스 RX 수퍼라이트 포켓터블 바람막이", b: "젝시믹스", g: 'm', part: 'top', ty: "바람막이", t: 'high', krw: 139000, pn: '무신사 판매가 37,900원', img: "https://image.msscdn.net/thumbnails/images/goods_img/20250709/5236328/5236328_17709593959766_big.jpg", url: "https://www.musinsa.com/products/5236328", shop: '무신사', pts: ["가벼운 러닝 바람막이","무신사 「젝시믹스 러닝」 판매금액순 14위"], cons: ["통기성은 티셔츠보다 떨어져요"] },
    { n: "젝시믹스 RX 메쉬 믹스 핑거홀 롱슬리브", b: "젝시믹스", g: 'w', part: 'top', ty: "긴팔", t: 'cheap', krw: 39000, pn: '무신사 판매가 29,000원', img: "https://image.msscdn.net/thumbnails/images/goods_img/20250709/5237488/5237488_17706196902374_big.jpg", url: "https://www.musinsa.com/products/5237488", shop: '무신사', pts: ["가을·겨울 러닝 긴팔","무신사 「젝시믹스 러닝」 판매금액순 2위"], cons: ["여름엔 더워요"] },
    { n: "젝시믹스 RX 리플렉티브 파이핑 윈드브레이커", b: "젝시믹스", g: 'w', part: 'top', ty: "바람막이", t: 'high', krw: 159000, pn: '무신사 판매가 89,900원', img: "https://image.msscdn.net/thumbnails/images/goods_img/20250902/5386871/5386871_17708918043133_big.png", url: "https://www.musinsa.com/products/5386871", shop: '무신사', pts: ["가벼운 러닝 바람막이","무신사 「젝시믹스 러닝」 판매금액순 17위"], cons: ["통기성은 티셔츠보다 떨어져요"] },
    { n: "에이치덱스 에어 페더 러닝 후디 롱 슬리브", b: "에이치덱스", g: 'm', part: 'top', ty: "긴팔", t: 'mid', krw: 69000, img: "https://image.msscdn.net/thumbnails/images/goods_img/20260908/7272968/7272968_17900572582410_big.jpg", url: "https://www.musinsa.com/products/7272968", shop: '무신사', pts: ["가을·겨울 러닝 긴팔","무신사 「에이치덱스 러닝」 판매금액순 33위"], cons: ["여름엔 더워요"] },
    { n: "에이치덱스 에어 드라이 숏 슬리브 W", b: "에이치덱스", g: 'w', part: 'top', ty: "반팔", t: 'cheap', krw: 32000, img: "https://image.msscdn.net/thumbnails/images/goods_img/20260721/6885832/6885832_17846058650143_big.jpg", url: "https://www.musinsa.com/products/6885832", shop: '무신사', pts: ["기본 러닝 반팔","무신사 「에이치덱스 러닝」 판매금액순 17위"], cons: ["한겨울엔 단독으로 추워요"] },
    { n: "에이치덱스 어시스트 모션 매쉬 쇼츠 W", b: "에이치덱스", g: 'w', part: 'bottom', ty: "쇼츠", t: 'cheap', krw: 49000, img: "https://image.msscdn.net/thumbnails/images/goods_img/20260327/6212720/6212720_17760631352126_big.jpg", url: "https://www.musinsa.com/products/6212720", shop: '무신사', pts: ["러닝 쇼츠","무신사 「에이치덱스 러닝」 판매금액순 23위"], cons: ["추운 날엔 다리가 시려요"] },
    { n: "노스페이스 화이트라벨 제트 런 긴팔 티", b: "노스페이스", g: 'm', part: 'top', ty: "긴팔", t: 'mid', krw: 108000, pn: '무신사 판매가 75,600원', img: "https://image.msscdn.net/thumbnails/images/goods_img/20260319/6162345/6162345_17739040144745_big.jpg", url: "https://www.musinsa.com/products/6162345", shop: '무신사', pts: ["가을·겨울 러닝 긴팔","무신사 「노스페이스 러닝」 판매금액순 10위"], cons: ["여름엔 더워요"] },
    { n: "노스페이스 파워온 반팔 티", b: "노스페이스", g: 'm', part: 'top', ty: "반팔", t: 'mid', krw: 53000, pn: '무신사 판매가 37,100원', img: "https://image.msscdn.net/thumbnails/images/goods_img/20260331/6226904/6226904_17749349923019_big.jpg", url: "https://www.musinsa.com/products/6226904", shop: '무신사', pts: ["기본 러닝 반팔","무신사 「노스페이스 러닝」 판매금액순 18위"], cons: ["한겨울엔 단독으로 추워요"] },
    { n: "노스페이스 여성 아이스펄스 쇼츠", b: "노스페이스", g: 'w', part: 'bottom', ty: "쇼츠", t: 'mid', krw: 78000, pn: '무신사 판매가 46,800원', img: "https://image.msscdn.net/thumbnails/images/goods_img/20260408/6276346/6276346_17828902396618_big.jpg", url: "https://www.musinsa.com/products/6276346", shop: '무신사', pts: ["러닝 쇼츠","무신사 「노스페이스 러닝」 판매금액순 11위"], cons: ["추운 날엔 다리가 시려요"] },
    { n: "나이키 스위프트 리펠 패커블 러닝 재킷 W", b: "나이키", g: 'w', part: 'top', ty: "바람막이", t: 'high', krw: 155000, pn: '무신사 판매가 139,500원', img: "https://image.msscdn.net/thumbnails/images/goods_img/20250304/4851398/4851398_17417475155310_big.jpg", url: "https://www.musinsa.com/products/4851398", shop: '무신사', pts: ["가벼운 러닝 바람막이","무신사 「나이키 러닝」 판매금액순 8위"], cons: ["통기성은 티셔츠보다 떨어져요"] },
    { n: "나이키 스트라이드 리펠 UV 러닝 재킷 M", b: "나이키", g: 'm', part: 'top', ty: "바람막이", t: 'high', krw: 155000, pn: '무신사 판매가 131,750원', img: "https://image.msscdn.net/thumbnails/images/goods_img/20250304/4851406/4851406_17417478253759_big.jpg", url: "https://www.musinsa.com/products/4851406", shop: '무신사', pts: ["가벼운 러닝 바람막이","무신사 「나이키 러닝」 판매금액순 13위"], cons: ["통기성은 티셔츠보다 떨어져요"] },
    { n: "온 러닝 클럽 티셔츠", b: "온", g: 'm', part: 'top', ty: "반팔", t: 'mid', krw: 66000, pn: 'KREAM 거래가 (시세 변동)', img: "https://kream-phinf.pstatic.net/MjAyNTA3MzFfNjcg/MDAxNzUzOTU0MzMyNDM3.UFDfMR8m-_eUox-u6t5bfhJu6ITFXioi2ZIvY3weUlcg.P0bEGo07sG2HT54qx_Xf07Z7SiZKU1wJN2nvKPOpjCEg.PNG/a_72126934da9c43eb9be4c58d62594630.png", url: "https://kream.co.kr/products/436420", shop: 'KREAM', pts: ["KREAM 「러닝 반팔」 인기순 상위 · 거래 280건+","러닝화 브랜드 온의 데일리 러닝 티"], cons: ["한겨울엔 단독으로 추워요","리셀 플랫폼이라 가격이 수시로 바뀌어요"] },
    { n: "온 러닝 퍼포먼스 티셔츠", b: "온", g: 'm', part: 'top', ty: "반팔", t: 'mid', krw: 110000, pn: 'KREAM 거래가 (시세 변동)', img: "https://kream-phinf.pstatic.net/MjAyNTA3MzBfMzIg/MDAxNzUzODcyNDUxMDQz.1kuub8OV6CRI4cB1AqpUV9eqyVBvgtjZ20YdJAEfg74g.DkHULu9V53hJyG-3b-wdASx8mRkwk-xg9yQoDPvvyJ4g.PNG/a_7000b0494f994357a943a76668b60739.png", url: "https://kream.co.kr/products/345254", shop: 'KREAM', pts: ["KREAM 「러닝 반팔」 인기순 상위","훈련용 경량 퍼포먼스 티"], cons: ["한겨울엔 단독으로 추워요","리셀 플랫폼이라 가격이 수시로 바뀌어요"] },
    { n: "아식스 메타런 숏슬리브 셔츠", b: "아식스", g: 'm', part: 'top', ty: "반팔", t: 'mid', krw: 100000, pn: 'KREAM 거래가 (시세 변동)', img: "https://kream-phinf.pstatic.net/MjAyNjA2MDlfMTQy/MDAxNzgwOTg0NzA4NDU4.10EKaIIagUirkxmVztRvgabz0JaxNQ9ILnr9CObw_8Eg.AVFC1Qyww6-7UKWc91bjVUoreGuBhuGICurMWW3eRlQg.PNG/a_649257b0b80d47d5b77e9d9bf7e016b3.png", url: "https://kream.co.kr/products/813387", shop: 'KREAM', pts: ["KREAM 「러닝 반팔」 인기순 상위","아식스 레이싱 라인 메타런"], cons: ["한겨울엔 단독으로 추워요","리셀 플랫폼이라 가격이 수시로 바뀌어요"] },
    { n: "새티스파이 모스테크 티셔츠", b: "새티스파이", g: 'm', part: 'top', ty: "반팔", t: 'high', krw: 127000, pn: 'KREAM 거래가 (시세 변동)', img: "https://kream-phinf.pstatic.net/MjAyNjAzMjVfMTUz/MDAxNzc0NDA1OTAwNjk0.LawMIxyvFu6uEoAWIS9ilKCpuJxnXRPKh9B4HC0KGYMg.eEUtsbcUv9mTI8YTAPa4jOIcwkBI_i1oRwnhOPhb1Icg.PNG/a_f2e9d014cf094ebeb51cb395c9afd185.png", url: "https://kream.co.kr/products/451672", shop: 'KREAM', pts: ["KREAM 「러닝 반팔」 인기순 4위 · 거래 1,100건+","새티스파이 대표 러닝 티"], cons: ["한겨울엔 단독으로 추워요","리셀 플랫폼이라 가격이 수시로 바뀌어요"] },
  ],
  brands: [
    ["나이키","#111827","세계 1위 스포츠 브랜드 — 드라이 핏 러닝 라인. 국내 공식몰.","https://www.nike.com/kr/",[["마일러","남성 데일리"],["스위프트","여성 데일리"],["에어로스위프트","엘리트 레이스 킷"]]],
    ["데카트론","#0082c3","프랑스 스포츠용품 유통사 — 러닝 자체 브랜드 킵런(KIPRUN). 국내 공식몰·매장에서 바로 사요.","https://www.decathlon.co.kr/",[["런 드라이 100","1만 원 기능성 티"],["런 500","심리스 긴팔·겨울 하의"]]],
    ["새티스파이","#a16207","파리 러닝 패션 브랜드 — 실크 같은 테크 원단, 하이엔드 가격.","https://satisfyrunning.com/",[["오라라이트","초경량 티"],["테크실크","실크 쇼츠"]]],
    ["무신사 스탠다드 스포츠","#0ea5e9","무신사 자체 스포츠 브랜드 — 2~7만 원대 기능성 러닝복. 무신사 러닝복 판매금액순 상위권을 가장 많이 차지해요.","https://www.musinsa.com/brand/musinsastandardsp",[["드라이액트·퀵드라이","기능성 티"],["컴포트액트","타이츠"],["시티러닝","러닝 라인"]]],
    ["룰루레몬","#be123c","캐나다 애슬레저 브랜드 — 페이스 브레이커·패스트 앤 프리 러닝 라인.","https://www.lululemon.co.kr/",[["페이스 브레이커","쇼츠"],["패스트 앤 프리","타이츠"],["Rulu·Nulux","보온·레깅스"]]],
    ["노스페이스","#991b1b","아웃도어 브랜드 — 화이트라벨 제트 런·파워온 러닝 티. 국내는 영원아웃도어 전개.","https://www.thenorthfacekorea.co.kr/",[["제트 런","러닝 긴팔"],["파워온","반팔"],["아이스펄스","쇼츠"]]],
    ["살로몬","#0f172a","프랑스 트레일러닝 브랜드 — 러닝 자켓·롱슬리브. 국내 공식몰.","https://salomon.co.kr/",[["템포스","러닝 자켓"],["스팀플로우·스피랄","롱슬리브"]]],
    ["언더아머","#374151","미국 스포츠 브랜드 — 테크 반팔·론치 쇼츠·히트기어 컴프레션.","https://www.underarmour.co.kr/",[["테크","기본 반팔"],["론치","러닝 쇼츠"],["히트기어","컴프레션"]]],
    ["젝시믹스","#f43f5e","국내 애슬레저 브랜드 — RX 러닝 라인 (덱스 착장 모델로 유명).","https://www.xexymix.com/",[["RX","러닝 라인"],["러닝 쇼츠","3인치"]]],
    ["아디다스","#1f2937","독일 스포츠 브랜드 — 아디제로(레이스)·오운 더 런·adi365 러닝 라인.","https://www.adidas.co.kr/",[["아디제로","레이스"],["오운 더 런","데일리"],["adi365","데일리 러닝"]]],
    ["에이치덱스","#65a30d","국내 피트니스·러닝 브랜드 — 에어 드라이·에어 페더 라인.","https://www.musinsa.com/brand/hadex",[["에어 드라이","기능성 반팔"],["에어 페더","러닝 후디"]]],
    ["푸마","#b91c1c","독일 스포츠 브랜드 — 러닝 라인과 하이록스(피트니스 레이스) 컬렉션.","https://kr.puma.com/",[["러닝","윈터 팬츠·롱슬리브"],["하이록스","하이브리드 레이스"]]],
    ["안다르","#a855f7","국내 애슬레저 브랜드 — 레깅스로 시작해 러닝 라인으로 확장.","https://www.andar.co.kr/",[["드라이 러닝","베이스레이어"],["런 핏","롱슬리브"],["액티브가드","윈드자켓"]]],
    ["뉴발란스","#dc2626","미국 러닝 브랜드 — RC(레이싱) 라인 러닝복. 국내는 이랜드 전개.","https://www.nbkorea.com/",[["RC","레이싱 나시·쇼츠"],["애슬레틱","데일리"]]],
    ["아식스","#1d4ed8","일본 러닝 브랜드 — 메타런 레이싱복부터 데일리 탑까지.","https://www.asics.co.kr/",[["메타런","레이싱"],["실버","데일리"]]],
    ["브룩스","#0369a1","미국 러닝 전문 브랜드 — 대쉬·체이서 러닝복. 국내는 무신사 등 판매.","https://www.musinsa.com/brand/brooksrunning",[["대쉬","반팔·쇼츠·탱크"],["체이서","쇼츠 타이즈"]]],
    ["온","#475569","스위스 러닝 브랜드 — 러닝화와 같은 감성의 러닝 티. 국내 정식 매장·KREAM 거래.","https://www.on.com/ko-kr/",[["클럽 티","데일리"],["퍼포먼스 티","훈련용"]]],
  ],
  best: [['나이키 마일러 드라이 핏 UV 반팔 러닝 탑', '러너 교복 — 무난한 중간값'], ['데카트론 남성 러닝 심리스 긴팔티 런 500', '11월 지금 입기 좋은 3만 원 긴팔'], ['나이키 스위프트 여성 투인원 러닝 쇼츠', '여성 러너 인기 하의']],
};
GEAR_TIPS.wear = {
  m: [['🌱', '입문', '상·하의 2~7만 원', ['데카트론 기능성 티 + 숏 타이츠', '면 티는 피하기'], ['데카트론 남성 러닝 반팔티 런 드라이 100', '데카트론 남성 10인치 러닝 숏 타이츠 런 100']], ['🏃', '중급', '상·하의 10만 원 안팎', ['브리프 라인드 쇼츠', '계절별 긴팔·타이츠'], ['나이키 마일러 드라이 핏 UV 반팔 러닝 탑', '나이키 마일러 7인치 브리프 라인드 쇼츠']], ['🏆', '선수·대회', '상·하의 23만 원+', ['싱글렛 + 레이싱 쇼츠', '초경량 원단'], ['나이키 에어로스위프트 남성 싱글렛', '나이키 에어로스위프트 2인치 쇼츠']]],
  w: [['🌱', '입문', '상·하의 4~8만 원', ['데카트론 기능성 티 + 투인원 쇼츠', '면 티는 피하기'], ['데카트론 여성 러닝 반팔티 런 드라이 100', '데카트론 여성 투인원 쇼츠 레깅스 런 드라이 100']], ['🏃', '중급', '상·하의 15만 원 안팎', ['투인원 쇼츠', '계절별 긴팔·레깅스'], ['나이키 스위프트 여성 반팔 러닝 탑', '나이키 스위프트 여성 투인원 러닝 쇼츠']], ['🏆', '선수·대회', '상·하의 22만 원+', ['싱글렛 + 레이싱 쇼츠', '초경량 원단'], ['나이키 에어로스위프트 여성 싱글렛', '나이키 에어로스위프트 여성 3인치 쇼츠']]],
};

/* ---------- 풀세트 (러닝화 + 아이템) ---------- */
const SET_SHOES = [
  { id: 'shoe-jog', n: '데카트론 조그플로우 100.1', b: '데카트론', t: 'cheap', krw: 34900, img: DKR + 'p3064149/k$16c1a92946c8062aac7a07053127ad98/%EB%82%A8%EC%84%B1-%EB%9F%AC%EB%8B%9D%ED%99%94-%EC%A1%B0%EA%B7%B8%ED%94%8C%EB%A1%9C%EC%9A%B0-100-1-decathlon-8733470.jpg', url: 'https://www.decathlon.co.kr/p/%EB%82%A8%EC%84%B1-%EB%9F%AC%EB%8B%9D%ED%99%94-%EC%A1%B0%EA%B7%B8%ED%94%8C%EB%A1%9C%EC%9A%B0-100-1-kalenji-8733470.html', shop: '데카트론 공식', ty: '러닝화', pts: ['3만 원대 입문 러닝화', '가볍고 쿠션 무난'], cons: ['장거리·기록용으로는 부족'] },
  { id: 'shoe-nova6', shoe: 'asics-novablast-6', n: '아식스 노바블라스트 6', b: '아식스', t: 'mid', krw: 179000, img: 'https://d26wss9rw703v0.cloudfront.net/1.PACKSHOT/PACKSHOT_PRUN_1/2026/1011C243_102_SL_LT_GLB.png', url: 'https://www.asics.co.kr/p/AKR_112630210-102', shop: '아식스 공식', ty: '러닝화', pts: ['RunRepeat 93점 가성비 데일리화', '통통 튀는 쿠션'], cons: ['인기 사이즈 품절 잦음'] },
  { id: 'shoe-evosl', shoe: 'adidas-adizero-evo-sl', n: '아디다스 아디제로 EVO SL', b: '아디다스', t: 'high', krw: 209000, img: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/b8d2e6f0cdd940f6bb2988cb68ee5bf0_9366/EVO_SL_Black_JP7149_HM1.jpg', url: 'https://www.adidas.co.kr/%EC%95%84%EB%94%94%EC%A0%9C%EB%A1%9C-evo-sl/JP7149.html', shop: '아디다스 공식', ty: '러닝화', pts: ['RunRepeat 94점 — 중간 가격대 최고 평가', '카본 없이 빠른 데일리 레이서'], cons: ['안정성은 보통'] },
  { id: 'shoe-alpha4', shoe: 'nike-alphafly-4', n: '나이키 알파플라이 4', b: '나이키', t: 'pro', krw: 349000, img: NIKE_IMG + NIKE_U + '7abad782-87f0-479a-91d3-ee01e94e5682/AIR+ZOOM+ALPHAFLY+NEXT%25+4.png', url: 'https://www.nike.com/kr/t/%EB%82%98%EC%9D%B4%ED%82%A4-%EC%95%8C%ED%8C%8C%ED%94%8C%EB%9D%BC%EC%9D%B4-4-%EB%82%A8%EC%84%B1-%EB%A1%9C%EB%93%9C-%EB%A0%88%EC%9D%B4%EC%8B%B1%ED%99%94-BxYAEFvI/IM5546-800', shop: '나이키 코리아', ty: '러닝화', pts: ['RunRepeat 94점 플래그십 레이싱화', '마라톤 기록 단축용'], cons: ['밑창이 빨리 닳아요', '34.9만 원'] },
];
const GEAR_SETS = [
  { k: 'beggar', e: '🪙', n: '거지 풀세트', sub: '다이소 풀세트 — 러닝화·시계만 최저가로', c: '#16a34a',
    items: [['러닝화', 'shoe-jog'], ['상의', '다이소 소로나 라글란 반팔 티'], ['하의', ['다이소 러닝 라이트 반바지', '다이소 러닝 여성용 라이트 반바지']], ['양말', 'HEAD 남성용 단목 양말'], ['모자', 'HEAD 나일론 경량 러닝 볼캡'], ['벨트', '늘어나는 러닝용 소지품 벨트'], ['시계', 'band11'], ['이어폰', '다이소 무선 이어폰'], ['선글라스', '다이소 러닝 선글라스']] },
  { k: 'begin', e: '🌱', n: '초보 풀세트', sub: '준수한 가성비 — 처음 제대로 시작하는 구성', c: '#2563eb',
    items: [['러닝화', 'shoe-nova6'], ['상의', ['데카트론 남성 러닝 심리스 긴팔티 런 500', '데카트론 여성 러닝 심리스 긴팔티 런 500']], ['하의', ['데카트론 남성 러닝 바지 런 웜 500', '데카트론 여성 러닝 레깅스 런 웜 500']], ['양말', '데카트론 러닝 쿠션 중목 양말 런 500 (2켤레)'], ['모자', '데카트론 러닝 울트라라이트 캡'], ['벨트', '플립벨트 클래식'], ['시계', 'fr70'], ['이어폰', '사운드코어 에어로핏 2'], ['선글라스', 'goodr OG']] },
  { k: 'mid', e: '🏃', n: '중수 풀세트', sub: '중간 가격대에서 평가가 가장 좋은 베스트만', c: '#7c3aed',
    items: [['러닝화', 'shoe-evosl'], ['상의', ['나이키 마일러 드라이 핏 UV 반팔 러닝 탑', '나이키 스위프트 여성 반팔 러닝 탑']], ['하의', ['나이키 마일러 7인치 브리프 라인드 쇼츠', '나이키 스위프트 여성 투인원 러닝 쇼츠']], ['양말', '발레가 히든 컴포트'], ['모자', '나이키 드라이 핏 ADV 플라이 캡'], ['벨트', '살로몬 펄스 벨트'], ['시계', 'fr570'], ['이어폰', '샥즈 오픈핏 2+'], ['선글라스', '100% 스피드크래프트']] },
  { k: 'pro', e: '🏆', n: '선수 풀세트', sub: '초하이엔드 — 최고급·최상급으로만', c: '#dc2626',
    items: [['러닝화', 'shoe-alpha4'], ['상의', ['나이키 에어로스위프트 남성 싱글렛', '나이키 에어로스위프트 여성 싱글렛']], ['하의', ['나이키 에어로스위프트 2인치 쇼츠', '나이키 에어로스위프트 여성 3인치 쇼츠']], ['양말', '피처스 엘리트 라이트 쿠션'], ['모자', '시엘 GOCap SC 컴프'], ['벨트', '살로몬 S/LAB 벨트 PNS'], ['시계', 'fenix9'], ['이어폰', '샥즈 오픈런 프로 2'], ['선글라스', '오클리 레이더 EV 패스']] },
];


/* ---------- 브랜드 시장 점유율 (공개 자료가 있는 분류만 그래프) ---------- */
const GEAR_SHARE_W = { m: {"t":"무신사 남성 러닝복 판매 상위 200개 중 비중","src":"무신사 검색 「러닝 반팔·긴팔·쇼츠·타이츠(여성은 레깅스)·바람막이」 성별 필터, 판매금액순 상위 40개씩 총 200개 제품의 브랜드 비중 (2026년 11월 20일 직접 집계) · 제품 수 비중이라 매출액 비중과는 달라요 · KREAM 「러닝 반팔」 인기순 상위 40개: 나이키 19 · 새티스파이·아디다스·데카트론·온 각 4","n":8,"all":[["무신사 스탠다드 스포츠",17],["나이키",12.5],["룰루레몬",6.5],["노스페이스",4.5],["살로몬",4.5],["언더아머",3.5],["젝시믹스",3.5],["원나우",3],["아디다스",2.5],["에이치덱스",2],["푸마",2]]}, w: {"t":"무신사 여성 러닝복 판매 상위 200개 중 비중","src":"무신사 검색 「러닝 반팔·긴팔·쇼츠·타이츠(여성은 레깅스)·바람막이」 성별 필터, 판매금액순 상위 40개씩 총 200개 제품의 브랜드 비중 (2026년 11월 20일 직접 집계) · 제품 수 비중이라 매출액 비중과는 달라요 · KREAM 「러닝 반팔」 인기순 상위 40개: 나이키 19 · 새티스파이·아디다스·데카트론·온 각 4","n":8,"all":[["무신사 스탠다드 스포츠",17],["나이키",10],["레이지비",10],["룰루레몬",7.5],["몽피치",4],["노스페이스",3.5],["젝시믹스",3],["테슬라",3],["안다르",2.5],["에이치덱스",2],["아디다스",2],["살로몬",2],["언더아머",1]]} };
const GEAR_SHARE = {"watch":{"t":"다나와 「스마트워치」 인기순위 상위 40개 중 제품 비중","src":"다나와 「스마트워치」 검색 인기상품순 상위 40개 제품의 브랜드 비중 (2026년 11월 20일 직접 집계) · 판매와 조회가 함께 반영된 순위라 판매량 그 자체는 아니에요 · 다나와 2025 연말결산에선 스마트워치 판매 1위 삼성, 2위 애플","all":[["삼성 갤럭시",27.5],["애플워치",25],["가민",20],["샤오미",7.5],["어메이즈핏",7.5]]},"ear":{"t":"다나와 이어폰·헤드폰 판매량 비중","src":"다나와 2026 상반기 이어폰·헤드폰 결산 (2026년 1~6월 다나와 판매량 기준)","all":[["애플·비츠",26.2],["삼성",17.1],["소니",9.3],["샥즈",8],["QCY",4.8]]},"sun":{"t":"다나와 「스포츠 선글라스」 인기순위 상위 40개 중 제품 비중","src":"다나와 「스포츠 선글라스」 검색 인기상품순 상위 40개 제품의 브랜드 비중 (2026년 11월 20일 직접 집계) · 판매와 조회가 함께 반영된 순위라 판매량 그 자체는 아니에요","all":[["오클리",42.5],["루디프로젝트",10],["락브로스",5],["오클랜즈",5],["체인지마스터",2.5]]},"cap":{"t":"다나와 「러닝 모자」 인기순위 상위 40개 중 제품 비중","src":"다나와 「러닝 모자」 검색 인기상품순 상위 40개 제품의 브랜드 비중 (2026년 11월 20일 직접 집계) · 판매와 조회가 함께 반영된 순위라 판매량 그 자체는 아니에요","all":[["아디다스",40],["나이키",12.5],["노스페이스",10],["푸마",10],["블랙야크",7.5],["살로몬",2.5]]},"vest":{"t":"다나와 「트레일러닝 베스트」 인기순위 상위 40개 중 제품 비중","src":"다나와 「트레일러닝 베스트」 검색 인기상품순 상위 40개 제품의 브랜드 비중 (2026년 11월 20일 직접 집계) · 판매와 조회가 함께 반영된 순위라 판매량 그 자체는 아니에요","all":[["아디다스",15],["블랙야크",15],["노스페이스",12.5],["나이키",7.5],["코오롱스포츠",7.5],["살로몬",7.5]]},"belt":{"t":"다나와 「러닝벨트」 인기순위 상위 40개 중 제품 비중","src":"다나와 「러닝벨트」 검색 인기상품순 상위 40개 제품의 브랜드 비중 (2026년 11월 20일 직접 집계) · 판매와 조회가 함께 반영된 순위라 판매량 그 자체는 아니에요","all":[["살로몬",15],["나이키",12.5],["아디다스",10],["노스페이스",7.5],["블랙야크",7.5]]},"sock":{"t":"다나와 「러닝 양말」 인기순위 상위 40개 중 제품 비중","src":"다나와 「러닝 양말」 검색 인기상품순 상위 40개 제품의 브랜드 비중 (2026년 11월 20일 직접 집계) · 판매와 조회가 함께 반영된 순위라 판매량 그 자체는 아니에요","all":[["나이키",17.5],["뉴발란스",17.5],["SMP스포츠",12.5],["아디다스",10],["요넥스",5],["인진지",2.5],["데카트론",2.5]]},"wear":{"t":"다나와 「러닝 티셔츠」 인기순위 상위 40개 중 제품 비중","src":"다나와 「러닝 티셔츠」 검색 인기상품순 상위 40개 제품의 브랜드 비중 (2026년 11월 20일 직접 집계) · 판매와 조회가 함께 반영된 순위라 판매량 그 자체는 아니에요","all":[["나이키",57.5],["뉴발란스",7.5],["아디다스",5]]}};
/* 분류별 브랜드 보충 수치 (다나와 기사 기준) */
const GEAR_BSH = {"ear":{"샥즈":["93%","골전도 이어폰 거래액 비중 1위 (다나와 2026년 5~6월) · 이어폰·헤드폰 전체 판매량 4위 8.0%"],"브리츠":["7%","골전도 이어폰 거래액 2위 (다나와 2026년 5~6월) · 5만 원 이하 이어폰 거래액 3위 8%"],"QCY":["33%","5만 원 이하 이어폰 거래액 1위 (다나와 2026년 9월 발표) · 이어폰·헤드폰 전체 판매량 5위 4.8%"],"앤커 사운드코어":["20%","5만 원 이하 이어폰 거래액 2위 (다나와 2026년 9월 발표) · 사운드코어 P31i 판매 비중 44%로 1위"]}};
/* ---------- 제품 목록 (상세 팝업용 id) ---------- */
const GEAR_ALL = {};
WATCHES.forEach(p => { p.cat = 'watch'; p.b = WATCH_BRANDS[p.wb].n; p.ty = /band|fit3/.test(p.id) ? '밴드' : ['garmin', 'suunto', 'amazfit'].includes(p.wb) ? '러닝워치' : '스마트워치'; GEAR_ALL[p.id] = p; });
Object.values(GEAR).forEach(G => { G.lineup = G.items.filter(p => p.lineup); G.items = G.items.filter(p => !p.lineup); });
Object.entries(GEAR).forEach(([c, G]) => [...G.items, ...G.lineup].forEach((p, i) => { p.cat = c; p.id = p.id || c + '-' + i; GEAR_ALL[p.id] = p; }));
SET_SHOES.forEach(p => { p.cat = 'shoe'; GEAR_ALL[p.id] = p; });
const gFind = k => GEAR_ALL[k] || Object.values(GEAR_ALL).find(p => p.n === k);
Object.values(GEAR_ALL).forEach(p => { p.cons = p.cons || GEAR_CONS[p.id] || GEAR_CONS[p.n] || []; });

/* ---------- 화면 ---------- */
const gCols = n => n <= 5 ? n : [5, 4, 3].sort((a, z) => ((a - n % a) % a) - ((z - n % z) % z) || z - a)[0];
const gKrw = p => p.krw || (p.usd ? Math.round(p.usd * GEAR_USD) : 0);
const gPrice = p => p.krw ? `₩${p.krw.toLocaleString()}` : `$${p.usd}`;
const gMan = v => v >= 10000 ? (v / 10000).toFixed(v % 10000 ? 1 : 0).replace(/\.0$/, '') + '만' : v.toLocaleString();
const gImg = (src, alt) => `<img src="${src}" alt="${esc(alt)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentNode.classList.add('noimg')">`;
const gShopLab = p => /coupang\.com/.test(p.url) ? '쿠팡' : /musinsa\.com/.test(p.url) ? '무신사' : /kream\.co\.kr/.test(p.url) && !/공식/.test(p.shop || '') ? 'KREAM' : /aliexpress/.test(p.url) ? '알리' : /해외|미국/.test(p.shop || '') ? '공식(해외)' : '공식';
const gOpen = id => `onclick="openGear('${id}')" role="button" tabindex="0"`;
function gearCard(p, i, brandName, rk) {
  const T = GEAR_TIER[p.t];
  return `<div class="gi grow" ${gOpen(p.id)} style="--tc:${T[1]};--i:${i}">
    <div class="gi-ph ${p.cv ? 'cv' : ''}">${gImg(p.img, p.n)}<span class="gi-t">${T[0]}</span>${rk ? `<span class="gi-rk r${rk}">${rk}위</span>` : ''}${p.ty ? `<span class="gi-ty">${p.ty}</span>` : ''}</div>
    <div class="gi-b"><small>${esc(brandName || p.b || '')}</small><b>${esc(p.n)}</b>
      <div class="gi-p"><strong>${gPrice(p)}</strong>${p.usd && !p.krw ? `<em>약 ${Math.round(p.usd * GEAR_USD / 10000).toLocaleString()}만 원</em>` : ''}</div>
      ${p.pn ? `<span class="gi-pn">${esc(p.pn)}</span>` : ''}${p.spec ? `<span class="gi-sp">${esc(p.spec)}</span>` : ''}
      <ul>${p.pts.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      <span class="gi-go">자세히 보기 →</span></div></div>`;
}
/* 상세 팝업 (러닝화 상세처럼) */
function openGear(id) {
  const p = GEAR_ALL[id]; if (!p) return;
  if (p.shoe && typeof byId !== 'undefined' && byId[p.shoe]) return openShoe(p.shoe);
  const T = GEAR_TIER[p.t] || ['', '#64748b'], C = GEAR_CATS.find(c => c[0] === p.cat), naver = 'https://search.shopping.naver.com/search/all?query=' + encodeURIComponent(p.n), coupang = 'https://www.coupang.com/np/search?q=' + encodeURIComponent(p.n);
  const peers = Object.values(GEAR_ALL).filter(x => x.cat === p.cat), rank = [...peers].sort((a, z) => gKrw(a) - gKrw(z)).findIndex(x => x.id === p.id) + 1;
  $('#mbox').innerHTML = `<div class="gmd" style="--tc:${T[1]}"><button class="mx" onclick="closeModal()" aria-label="닫기">×</button>
    <div class="gmd-ph ${p.cv ? 'cv' : ''}">${gImg(p.img, p.n)}</div>
    <div class="gmd-b"><div class="gmd-tags"><span class="gmd-t">${T[0]}</span>${C ? `<span>${C[1]} ${C[2]}</span>` : '<span>👟 러닝화</span>'}${p.ty ? `<span>${esc(p.ty)}</span>` : ''}</div>
      <small>${esc(p.b || '')}</small><h2>${esc(p.n)}</h2>
      <div class="gmd-p"><strong>${gPrice(p)}</strong>${p.usd && !p.krw ? `<em>약 ${Math.round(p.usd * GEAR_USD / 10000)}만 원 (1달러≈1,400원)</em>` : ''}${p.pn ? `<em>${esc(p.pn)}</em>` : ''}</div>
      ${p.spec ? `<p class="gmd-sp">${esc(p.spec)}</p>` : ''}
      <div class="gmd-pc"><div><h4>👍 장점</h4><ul>${p.pts.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div><div><h4>👎 단점</h4><ul>${(p.cons.length ? p.cons : ['특별한 단점이 보고되지 않았어요']).map(x => `<li>${esc(x)}</li>`).join('')}</ul></div></div>
      <div class="gmd-meta"><span>💰 같은 분류 ${peers.length}개 중 가격 ${rank}번째로 저렴</span><span>🛒 ${esc(p.shop || '')}</span></div>
      <div class="gmd-go"><a class="on" href="${p.url}" target="_blank" rel="noopener">${gShopLab(p)}</a>${/coupang.com/.test(p.url) ? '' : `<a class="cp" href="${coupang}" target="_blank" rel="noopener">쿠팡</a>`}<a href="${naver}" target="_blank" rel="noopener">네이버 최저가</a></div></div></div>`;
  $('#modal').classList.add('on'); document.body.style.overflow = 'hidden';
}
/* 가격 사다리 */
function gearLadder(list) {
  const s = [...list].sort((a, z) => gKrw(a) - gKrw(z)), lo = Math.log(Math.max(3000, gKrw(s[0]) * 0.6)), hi = Math.log(gKrw(s[s.length - 1]));
  return `<div class="gl grow">${s.map((p, i) => `<div class="gl-r" ${gOpen(p.id)} style="--i:${i};--tc:${GEAR_TIER[p.t][1]}"><span class="gl-n">${esc(p.n)}</span>
    <span class="gl-b"><i style="width:${Math.max(4, (Math.log(gKrw(p)) - lo) / (hi - lo) * 100).toFixed(1)}%"></i></span><b>${p.krw ? gMan(p.krw) : '$' + p.usd}</b></div>`).join('')}
    <div class="gl-leg">${Object.values(GEAR_TIER).map(([n, c]) => `<span style="--tc:${c}"><i></i>${n}</span>`).join('')}<small>막대 = 가격 (해외가는 1달러 ≈ 1,400원으로 환산 · 로그 눈금) · 누르면 상세 정보</small></div></div>`;
}
function gearMenu(cur) {
  const set = cur === 'set', g = GEAR_G;
  return `<div class="gm-h"><h3 class="g-sh">분류별 보기</h3><div class="gset-g">
      <a href="#gear" class="gm-set ${set ? 'on' : ''}">🎁 러닝 풀세트</a>
      ${set ? `<button type="button" class="${g === 'm' ? 'on' : ''}" onclick="gearSetG('m')">👨 남성</button><button type="button" class="${g === 'w' ? 'on' : ''}" onclick="gearSetG('w')">👩 여성</button>` : ''}</div></div>
    <nav class="gm">${GEAR_CATS.filter(c => c[0] !== 'set').map(([k, ic, n, d]) => `<a href="#gear-${k}" class="${k === cur ? 'on' : ''}"><span>${ic}</span><b>${n}</b><small>${d}</small></a>`).join('')}</nav>`;
}
function gearRules(rules) {
  return `<div class="gr">${rules.map(([ic, t, d], i) => `<div class="grow" style="--i:${i}"><span>${ic}</span><b>${t}</b><p>${d}</p></div>`).join('')}</div>`;
}
function gearLevels(levels) {
  return `<div class="glv">${levels.map(([ic, lv, who, bud, need, picks], i) => `<div class="glv-c grow" style="--i:${i}">
      <div class="glv-h"><span>${ic}</span><div><b>${lv}</b>${who ? `<small>${who}</small>` : ''}</div></div><em class="glv-bud">💰 ${bud}</em>
      <ul>${need.map(x => `<li>${x}</li>`).join('')}</ul>
      <div class="glv-p">${picks.map(k => { const p = gFind(k); return p ? `<div class="glv-pk" ${gOpen(p.id)}><span class="glv-im ${p.cv ? 'cv' : ''}">${gImg(p.img, p.n)}</span><span class="glv-tx"><b>${esc(p.n)}</b><em>${gPrice(p)}</em><small>자세히 →</small></span></div>` : ''; }).join('')}</div></div>`).join('')}</div>`;
}
/* 추천 순위: 1·2·3위 카드(왼쪽부터) + 더보기로 4위~ */
function gearBest(rank) {
  const top = rank.slice(0, 3), rest = rank.slice(3);
  return `<div class="gb">${top.map(([p, why], i) => `<div class="gb-c grow r${i + 1}" ${gOpen(p.id)} style="--i:${i}">
      <span class="gb-rk">${['🥇', '🥈', '🥉'][i]}<b>${i + 1}위</b></span><div class="gb-ph ${p.cv ? 'cv' : ''}">${gImg(p.img, p.n)}</div>
      <b>${esc(p.n)}</b><strong>${gPrice(p)}</strong><p>${esc(why)}</p></div>`).join('')}</div>
    ${rest.length ? `<div class="gb-more" hidden><ol start="4">${rest.map(([p, why], i) => `<li ${gOpen(p.id)}><span class="gbm-n">${i + 4}</span><span class="gbm-im ${p.cv ? 'cv' : ''}">${gImg(p.img, p.n)}</span><span class="gbm-tx"><b>${esc(p.n)}</b><small>${esc(why)}</small></span><strong>${gPrice(p)}</strong></li>`).join('')}</ol></div>
    <button type="button" class="gb-btn" onclick="gearMore(this)">더보기 · 4~${rank.length}위 ▾</button>` : ''}`;
}
function gearMore(btn) {
  const box = btn.previousElementSibling, open = box.hidden;
  box.hidden = !open;
  if (open) { btn.dataset.t = btn.dataset.t || btn.textContent; btn.textContent = '접기 ▴'; box.classList.remove('pg-in'); void box.offsetWidth; box.classList.add('pg-in'); }
  else btn.textContent = btn.dataset.t;
}
function gearRank(cat, list) {
  const tabs = [['price', '💰 가격순'], ['beg', '🌱 초보 추천'], ['elite', '🏆 엘리트 추천']];
  if (cat === 'watch') tabs.unshift(['sales', '📈 종합 판매순위']);
  return `<div class="grk"><div class="grk-t">${tabs.map(([k, n], i) => `<button type="button" class="${i ? '' : 'on'}" onclick="gearRankShow(this,'${k}')">${n}</button>`).join('')}</div>
    <div class="grk-b">${tabs.map(([k], i) => `<ol class="grk-l" data-k="${k}" ${i ? 'hidden' : ''}>${gearRankRows(k, list)}</ol>`).join('')}</div>
    ${cat === 'watch' ? '<p class="note">국내 시장만 따로 집계한 공개 점유율 자료가 없어, 국내에 공식 판매되는 브랜드의 세계 출하 점유율(옴디아 2026년 2분기)로 순위를 매겼어요.</p>' : ''}</div>`;
}
function gearRankRows(k, list) {
  if (k === 'sales') return WATCH_SALES.map(([r, b, sh, note, pid]) => { const p = GEAR_ALL[pid];
    return `<li ${gOpen(pid)}><span class="grk-n">${r}</span><span class="grk-im">${gImg(p.img, p.n)}</span><div><b>${b} <em>${sh}</em></b><small>${esc(note)}</small></div><span class="grk-a">${esc(p.n)} →</span></li>`; }).join('');
  const L = k === 'price' ? [...list].sort((a, z) => gKrw(a) - gKrw(z)) : list.filter(p => p[k === 'beg' ? 'beg' : 'elite']).sort((a, z) => gKrw(a) - gKrw(z));
  return L.map((p, i) => `<li ${gOpen(p.id)}><span class="grk-n">${i + 1}</span><span class="grk-im ${p.cv ? 'cv' : ''}">${gImg(p.img, p.n)}</span><div><b>${esc(p.n)}</b><small>${GEAR_TIER[p.t][0]} · ${esc(p.spec || p.ty || '')}</small></div><span class="grk-a">${gPrice(p)} →</span></li>`).join('');
}
function gearRankShow(btn, k) {
  const box = btn.closest('.grk');
  box.querySelectorAll('.grk-t button').forEach(b => b.classList.toggle('on', b === btn));
  box.querySelectorAll('.grk-l').forEach(l => { l.hidden = l.dataset.k !== k; if (!l.hidden) { l.classList.remove('pg-in'); void l.offsetWidth; l.classList.add('pg-in'); } });
}
function gearBrands(G) {
  const bn = p => p.b === '애플' || p.b === '비츠' ? '애플·비츠' : p.b === '앤커' ? '앤커 사운드코어' : p.b;
  const all = [...G.items, ...(G.lineup || [])];
  return '<div class="gbr-w">' + G.brands.map(([n, c, desc, site, lines]) => { const L = all.filter(p => bn(p) === n).sort((a, z) => gKrw(a) - gKrw(z));
    return `<div class="gbr ${L.length < 6 ? 'sm' : ''}" style="--bc:${c};--n:${L.length}"><div class="gbr-h"><div><b>${n}</b><p>${desc}</p></div><a href="${site}" target="_blank" rel="noopener">공식 홈페이지</a></div>
      <div class="gbr-l">${lines.map(([l, d]) => `<span><b>${l}</b>${d}</span>`).join('')}</div>
      <div class="gbr-g" style="--cols:${L.length < 6 ? L.length : L.length <= 6 ? 6 : [7, 6, 5].sort((x, y) => ((x - L.length % x) % x) - ((y - L.length % y) % y) || y - x)[0]}">${L.map(p => { const q = encodeURIComponent(p.n); return `<div class="gbr-c" ${gOpen(p.id)}><span class="gbr-im ${p.cv ? 'cv' : ''}">${gImg(p.img, p.n)}</span><b>${esc(p.n)}</b><small>${esc(p.ty || '')}</small><strong>${gPrice(p)}</strong>
        <span class="gbr-a" onclick="event.stopPropagation()"><a href="${p.url}" target="_blank" rel="noopener">${gShopLab(p)}</a><a href="https://search.shopping.naver.com/search/all?query=${q}" target="_blank" rel="noopener">네이버</a><a class="cp" href="https://www.coupang.com/np/search?q=${q}" target="_blank" rel="noopener">쿠팡</a></span></div>`; }).join('')}</div></div>`; }).join('') + '</div>';
}
function gearTierGrid(items) {
  const tiers = Object.keys(GEAR_TIER).filter(t => items.some(p => p.t === t));
  return `<div class="g-tl">${tiers.map((t, i) => `<div style="--tc:${GEAR_TIER[t][1]}"><b>${GEAR_TIER[t][0]}</b><span>${items.filter(p => p.t === t).length}개</span><small>${GEAR_TIER[t][2]}</small></div>`).join('<i>→</i>')}</div>
    <div class="gi-grid" style="--cols:${gCols(items.length)}">${tiers.flatMap(t => items.filter(p => p.t === t)).map((p, i) => gearCard(p, i)).join('')}</div>`;
}


const GSET_PH = { beggar: 'photos/set_beggar.jpg?v=3', begin: 'photos/set_begin.jpg', mid: 'photos/set_mid.jpg', pro: 'photos/set_pro.jpg' }; // 풀세트 착용 그림 (Canva AI 생성)
/* 풀세트 */
function gearSets(g) {
  return `<section class="gset-sec" id="gset">
    <div class="gset">${GEAR_SETS.map((S, si) => { const L = S.items.map(([lab, ref]) => [lab, gFind(Array.isArray(ref) ? ref[g === 'w' ? 1 : 0] : ref)]);
      const tot = L.reduce((a, [, p]) => a + gKrw(p), 0), anyUsd = L.some(([, p]) => !p.krw);
      return `<article class="gs grow" style="--sc:${S.c};--i:${si}">
        <div class="gs-h"><span>${S.e}</span><div><b>${S.n}</b><small>${S.sub}</small></div></div>${GSET_PH[S.k] ? `<div class="gs-ch ph" role="button" tabindex="0" title="아이템 9종 보기" onclick="gearSetOpen(this.closest('.gs').querySelector('.gs-btn'))"><img src="${GSET_PH[S.k]}" alt="${S.n} 착용 사진" loading="lazy"></div>` : ''}
        <div class="gs-t"><span>총 가격</span><b>${cnt(tot, 'int', anyUsd ? '약 ' : '', '원')}</b></div>
        ${anyUsd ? '<small class="gs-n">해외 공식몰 제품은 1달러 ≈ 1,400원으로 환산 · 배송비 별도</small>' : '<small class="gs-n">국내 공식몰 정가 합계 (할인가 별도)</small>'}
        <button type="button" class="gs-btn" onclick="gearSetOpen(this)">아이템 ${L.length}종 보기 ▾</button>
        <div class="gs-more" hidden>
        <div class="gs-col">${L.map(([lab, p], i) => `<div class="gs-ph ${p.cv ? 'cv' : ''} ${i === 0 ? 'big' : ''}" ${gOpen(p.id)} style="--k:${i}" title="${esc(p.n)}">${gImg(p.img, p.n)}<em>${lab}</em></div>`).join('')}</div>
        <ul class="gs-l">${L.map(([lab, p]) => `<li ${gOpen(p.id)}><i>${lab}</i><b>${esc(p.n)}</b><span>${p.krw ? p.krw.toLocaleString() + '원' : '$' + p.usd}</span></li>`).join('')}</ul></div></article>`; }).join('')}</div></section>`;
}
function gearSetOpen(btn) {
  const box = btn.nextElementSibling, open = box.hidden;
  btn.dataset.t = btn.dataset.t || btn.textContent;
  box.hidden = !open; btn.textContent = open ? '접기 ▴' : btn.dataset.t;
  if (open) box.classList.add('on');
}
let GEAR_G = 'm';
function gearSetG(g) { GEAR_G = g; const y = scrollY; viewGear('set'); scrollTo(0, y); }

/* 브랜드 이름 통일 */
const G_BN = { '킵런': '데카트론', 'ROCKBROS': '락브로스', '애플': '애플·비츠', '비츠': '애플·비츠', '앤커': '앤커 사운드코어', '헤드 × 다이소': '다이소', '에버라스트 × 다이소': '다이소' };
const gBn = p => G_BN[p.b] || p.b;
const WATCH_SITE = { samsung: 'https://www.samsung.com/sec/watches/all-watches/', apple: 'https://www.apple.com/kr/watch/', garmin: 'https://www.garmin.com/ko-KR/', xiaomi: 'https://www.mi.com/kr/', suunto: 'https://www.kolonmall.com/Search?keyword=%EC%88%9C%ED%86%A0', amazfit: 'https://www.coupang.com/np/search?q=%EC%96%B4%EB%A9%94%EC%9D%B4%EC%A6%88%ED%95%8F' };
/* 인기순: 추천 순위(best) → 초보·엘리트 추천 → 나머지 */
function gearPop(cat, items) {
  if (cat === 'watch') return WATCH_RANK.map(([id]) => GEAR_ALL[id]).filter(p => items.includes(p));
  const best = GEAR[cat].best.map(b => gFind(b[0])).filter(p => p && items.includes(p));
  return [...best, ...items.filter(p => !best.includes(p)).sort((a, z) => (z.elite || 0) + (z.beg || 0) - (a.elite || 0) - (a.beg || 0))];
}
/* 2. 제품 추천: 분류 칩 + 정렬 (인기순 · 가격순) */
let GREC = [];
function gearRec(cat, items) {
  const pop = gearPop(cat, items), k = GREC.push(pop) - 1;
  const order = cat === 'wear' ? ['상의', '하의'] : [...(cat === 'watch' ? ['밴드', '스마트워치', '러닝워치'] : GEAR[cat].types.map(t => t[1])), ...new Set(items.map(p => p.ty))];
  const tyOf = p => cat === 'wear' ? (p.part === 'top' ? '상의' : '하의') : p.ty;
  const tys = [...new Set(order)].filter(t => items.some(p => tyOf(p) === t));
  const chip = (t, n, on) => `<button type="button" class="${on ? 'on' : ''}" data-f="${t}" onclick="gearRecF(this)">${t} <i>${n}</i></button>`;
  return `<div class="grc" data-k="${k}" data-cat="${cat}" data-f="전체" data-s="pop">
    <div class="grc-bar"><div class="gd-f">${chip('전체', items.length, 1)}${tys.map(t => chip(t, items.filter(p => tyOf(p) === t).length)).join('')}</div>
      <div class="grc-s">${[['pop', '🔥 인기순'], ['lo', '💰 낮은 가격순'], ['hi', '💎 높은 가격순']].map(([v, n], i) => `<button type="button" class="${i ? '' : 'on'}" data-s="${v}" onclick="gearRecS(this)">${n}</button>`).join('')}</div></div>
    <div class="g-tl sm">${Object.entries(GEAR_TIER).filter(([t]) => items.some(p => p.t === t)).map(([t, [n, c, d]]) => `<div style="--tc:${c}"><b>${n}</b><small>${d}</small></div>`).join('<i>→</i>')}</div>
    <div class="gi-grid grc-g"></div><p class="grc-n">인기순 = 러너 추천·리뷰 수·판매 순위를 종합한 편집 순위예요 (공식 판매 집계 아님).</p></div>`;
}
function gearRecDraw(box) {
  const cat = box.dataset.cat, f = box.dataset.f, srt = box.dataset.s, tyOf = p => cat === 'wear' ? (p.part === 'top' ? '상의' : '하의') : p.ty;
  let L = GREC[box.dataset.k].filter(p => f === '전체' || tyOf(p) === f);
  if (srt !== 'pop') L = [...L].sort((a, z) => (gKrw(a) - gKrw(z)) * (srt === 'lo' ? 1 : -1));
  const g = box.querySelector('.grc-g');
  g.style.setProperty('--cols', gCols(L.length));
  g.innerHTML = L.map((p, i) => gearCard(p, i, cat === 'watch' ? WATCH_BRANDS[p.wb].n : gBn(p), srt === 'pop' ? i + 1 : 0)).join('');
  g.querySelectorAll('.grow').forEach(e => e.classList.add('play'));
}
function gearRecF(btn) { const box = btn.closest('.grc'); box.dataset.f = btn.dataset.f; btn.parentNode.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === btn)); gearRecDraw(box); }
function gearRecS(btn) { const box = btn.closest('.grc'); box.dataset.s = btn.dataset.s; btn.parentNode.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === btn)); gearRecDraw(box); }
/* 3. 브랜드: 브랜드를 누르면 점유율 + 라인업 + 구매 링크 */
function gearBrandList(cat, items) {
  if (cat === 'watch') return Object.entries(WATCH_BRANDS).map(([k, B]) => ({ n: B.n, c: B.c, desc: B.os, site: WATCH_SITE[k], pros: B.pros, cons: B.cons, L: items.filter(p => p.wb === k) }));
  return GEAR[cat].brands.map(([n, c, desc, site, lines]) => ({ n, c, desc, site, lines, L: items.filter(p => gBn(p) === n) })).filter(B => B.L.length);
}

/* ---------- 브랜드 종합 (인포그래픽) ---------- */
const GEAR_SALES = {"ear":[["무선이어폰 판매 TOP 5","다나와 2026 상반기 판매량",[["애플","에어팟 프로 3"],["애플","에어팟 4 ANC"],["삼성","갤럭시 버즈3 프로"],["삼성","갤럭시 버즈4 프로"],["삼성","갤럭시 버즈3 FE"]]],["골전도 이어폰 판매 TOP 5","다나와 2026년 5~6월 판매량",[["샥즈","오픈런 프로 2"],["샥즈","오픈런 프로 2 미니"],["브리츠","BZ-BONE9 PLUS"],["샥즈","오픈스윔 프로"],["샥즈","오픈런 USB-C"]]],["5만 원 이하 이어폰 판매 TOP 5","다나와 최근 3개월 실판매 (2026년 9월 발표)",[["앤커","사운드코어 P31i","판매 비중 44%"],["QCY","멜로버즈 프로 HT08","17%"],["애플","이어팟 USB-C","10%"],["QCY","크로스키 C50","8%"],["브리츠","BZ-BONE X5","7%"]]]],"wear_m":[["반팔","",[["무신사 스탠다드 스포츠","[3팩] 베이직 스포츠 숏슬리브",32920],["언더아머","테크 2.0 반팔티",37050],["드릭스","액티브 컴프레션 테크핏 하프 슬리브",29900]]],["긴팔","",[["무신사 스탠다드 스포츠","드라이액트 퓨즈 롱슬리브",46550],["노스페이스","베인 긴팔 티",57000],["무신사 스탠다드 스포츠","코튼드라이 스티치 롱슬리브",33220]]],["쇼츠","",[["무신사 스탠다드 스포츠","[2팩] 퀵드라이 7인치 쇼츠",44330],["룰루레몬","페이스 브레이커 라인드 쇼츠 5인치",65000],["하글로프스","림 퓨즈 2 숏",126280]]],["타이츠","",[["무신사 스탠다드 스포츠","컴포트액트 롱타이즈",55440],["무신사 스탠다드 스포츠","컴프레션 레깅스",34100],["룰루레몬","패스트 앤 프리 하프 타이츠 8인치",138000]]],["바람막이","",[["살로몬","슬레이트 옥타 안감 자켓",320000],["무신사 스탠다드 스포츠","3-Layer 방수 바람막이",133220],["무신사 스탠다드 스포츠","[시티러닝] 벤틸레이션 바람막이",39900]]]],"wear_w":[["반팔","",[["무신사 스탠다드 스포츠","[2팩] 베이직 스포츠 숏슬리브 우먼",33220],["무신사 스탠다드 스포츠","써모메쉬 오버핏 숏슬리브 우먼",55440],["에이치덱스","에어 드라이 숏 슬리브 W",32000]]],["긴팔","",[["무신사 스탠다드 스포츠","퀵드라이 퓨즈 롱슬리브 우먼",44330],["무신사 스탠다드 스포츠","템프드라이 그리드 하이넥 롱슬리브 우먼",52770],["나이키","스위프트 에어로 핏 쿼터집 러닝 탑 W",105000]]],["쇼츠","",[["에이치덱스","어시스트 모션 매쉬 쇼츠 W",49000],["리복","Running AOP 쇼츠",11710],["노스페이스","여성 아이스펄스 쇼츠",46800]]],["레깅스","",[["헤링본","하이라이즈 부츠컷 기모레깅스",11900],["테슬라","모션 컴포트 데일리 와이드 레깅스",24360],["룰루레몬","Nulux 하이라이즈 타이츠 25인치",118000]]],["바람막이","",[["나이키","스위프트 리펠 패커블 러닝 재킷 W",139500],["무신사 스탠다드 스포츠","[시티러닝] 슈퍼 쏘닉 바람막이 우먼",61000],["노스페이스","화이트라벨 여성 올레마 LT 자켓",142200]]]]};
['watch', 'sun', 'cap', 'vest', 'belt', 'sock', 'wear'].forEach(k => { GEAR_SHARE[k].base = 40; }); GEAR_SHARE_W.m.base = GEAR_SHARE_W.w.base = 200;
GEAR_SALES.watch = [['다나와 인기 TOP 5', '다나와 「스마트워치」 인기상품순 · 판매와 조회 반영 (2026년 11월 20일)', [["삼성전자","갤럭시워치9 40mm LTE"],["삼성전자","갤럭시워치9 44mm 블루투스"],["삼성전자","갤럭시워치9 40mm 블루투스"],["샤오미","레드미 워치6"],["삼성전자","갤럭시워치 울트라 2 47mm LTE"]]]];
GEAR_SALES.sun = [['다나와 인기 TOP 5', '다나와 「스포츠 선글라스」 인기상품순 · 판매와 조회 반영 (2026년 11월 20일)', [["오클리","수트로 라이트 로우 브릿지 핏"],["체인지마스터","14g 초경량 편광 변색 스포츠선글라스"],["오클리","아이자켓 리덕스 프리즘"],["락브로스","스포츠 편광고글 10134"],["오클리","홀브룩 XL 프리즘"]]]];
GEAR_SALES.cap = [['다나와 인기 TOP 5', '다나와 「러닝 모자」 인기상품순 · 판매와 조회 반영 (2026년 11월 20일)', [["아디다스","러닝 X 아디제로 라이트웨이트 캡 (블랙)"],["나이키","드라이 핏 ADV 플라이 에어로빌 캡"],["아디다스","러닝 X 아디제로 라이트웨이트 캡 (화이트)"],["나이키","드라이 핏 ADV 플라이 리플렉티브 캡"],["아디다스","러닝 X 아디제로 라이트웨이트 캡 (그레이)"]]]];
GEAR_SALES.vest = [['다나와 인기 TOP 5', '다나와 「트레일러닝 베스트」 인기상품순 · 판매와 조회 반영 (2026년 11월 20일)', [["아디다스","러닝 클라이마쿨 베스트"],["나이키","ACG 고트 팩 베스트"],["아디다스","테렉스 엑스페리어 트레일 러닝 베스트 2.5"],["나이키","러닝 베스트 5L"],["디스커버리 익스페디션","미를론 베스트 백"]]]];
GEAR_SALES.belt = [['다나와 인기 TOP 5', '다나와 「러닝벨트」 인기상품순 · 판매와 조회 반영 (2026년 11월 20일)', [["아디다스","런 웨이스트백"],["아디다스","러닝 멀티 포켓 벨트"],["나이키","슬림 4.0 러닝 웨이스트백"],["르까프","러닝용 소형 힙색"],["나이키","슬림 4.0 러닝 웨이스트 팩"]]]];
GEAR_SALES.sock = [['다나와 인기 TOP 5', '다나와 「러닝 양말」 인기상품순 · 판매와 조회 반영 (2026년 11월 20일)', [["인진지","라이너 쿨맥스 발가락 양말"],["요넥스","스포츠 쿠션 단목·중목 양말"],["나이키","러닝 라이트웨이트 마이크로 크루 삭스"],["뉴발란스","PF 컴프레션 러닝 크루삭스"],["오니지","발가락 등산양말 클레버"]]]];
const GX_PAL = ['#f5a300', '#38bdf8', '#f472b6', '#a3e635', '#c084fc', '#fb923c', '#2dd4bf', '#facc15', '#94a3b8', '#e879f9', '#4ade80', '#60a5fa'];
function gearOverview(cat, g, list, S) {
  const rows = S.all.slice(0, 12), sum = rows.reduce((a, r) => a + r[1], 0), etc = +(100 - sum).toFixed(1), top3 = +rows.slice(0, 3).reduce((a, r) => a + r[1], 0).toFixed(1);
  const col = (n, i) => GX_PAL[i % GX_PAL.length];
  const idx = n => list.findIndex(B => B.n === n);
  const C = 2 * Math.PI * 62; let acc = 0;
  const segs = [...rows.slice(0, 8), ['기타', +(100 - rows.slice(0, 8).reduce((a, r) => a + r[1], 0)).toFixed(1)]].filter(r => r[1] > 0).map(([n, v], i) => { const len = C * v / 100, off = -C * acc / 100; acc += v;
    return `<circle class="gx-seg" r="62" cx="80" cy="80" stroke="${n === '기타' ? '#475569' : col(n, i)}" stroke-dasharray="${len.toFixed(2)} ${C.toFixed(2)}" stroke-dashoffset="${off.toFixed(2)}" style="--d:${(i * 0.12).toFixed(2)}s"><title>${n} ${v}%</title></circle>`; }).join('');
  const dec = v => (v % 1 ? 1 : 0);
  const rowsH = [...rows, ...(etc > 0 ? [['기타', etc]] : [])].map(([n, v], i) => { const k = idx(n), cnt = S.base && n !== '기타' ? Math.round(v * S.base / 100) : 0;
    return `<div class="gx-r" style="--c:${n === '기타' ? '#475569' : col(n, i)};--w:${Math.max(1.5, v / Math.max(rows[0][1], etc) * 100)}%;--i:${i}"><span class="gx-n">${n === '기타' ? '·' : i + 1}</span>
      ${k >= 0 ? `<button type="button" class="gx-b" onclick="gearBrandOpen(this.closest('.gbx').querySelectorAll('.gbx-t button')[${k + 1}],${k + 1})">${esc(n)}</button>` : `<span class="gx-b">${esc(n)}</span>`}
      <em><i></i></em><b><span data-cu="${v}" data-d="${dec(v)}">0</span>%</b>${S.base ? `<small>${cnt ? cnt + '개' : ''}</small>` : ''}</div>`; }).join('');
  const SL = GEAR_SALES[g ? cat + '_' + g : cat];
  const sales = SL ? `<h4 class="gx-h">🏆 ${g ? '분류별 판매 TOP 3 · 무신사 판매금액순' : cat === 'ear' ? '판매 순위 · 다나와 판매 데이터' : '판매·인기 순위'}</h4><div class="gx-sales">${SL.map(([t, sub, L], si) => `<div class="gx-s" style="--i:${si}"><div class="gx-st"><b>${t}</b>${sub ? `<small>${sub}</small>` : ''}</div><ol>${L.map(([b, n, p], i) => `<li><i class="r${i + 1}">${i + 1}</i><span><em>${esc(b)}</em>${esc(n)}</span>${p ? `<strong>${typeof p === 'number' ? p.toLocaleString() + '원' : p}</strong>` : ''}</li>`).join('')}</ol></div>`).join('')}</div>` : '';
  return `<div class="gbx-p gx" style="--bc:#f5a300">
    <div class="gx-kpi">
      <div><small>점유율 1위</small><b>${esc(rows[0][0])}</b><strong><span data-cu="${rows[0][1]}" data-d="${dec(rows[0][1])}">0</span>%</strong></div>
      <div><small>TOP 3 합계</small><b>${rows.slice(0, 3).map(r => esc(r[0])).join(' · ')}</b><strong><span data-cu="${top3}" data-d="${dec(top3)}">0</span>%</strong></div>
      <div><small>${S.base ? '집계한 판매 상위 제품' : '집계 기준'}</small><b>${S.base ? '판매·인기 상위' : '판매량 비중'}</b><strong>${S.base ? `<span data-cu="${S.base}">0</span>개` : '100%'}</strong></div>
      <div><small>이 페이지 라인업</small><b>추천 브랜드</b><strong><span data-cu="${list.length}">0</span>개</strong></div></div>
    <div class="gx-main"><div class="gx-dn"><svg viewBox="0 0 160 160"><circle r="62" cx="80" cy="80" class="gx-bg"></circle>${segs}</svg><div class="gx-c"><small>1위</small><b>${esc(rows[0][0])}</b><strong><span data-cu="${rows[0][1]}" data-d="${dec(rows[0][1])}">0</span>%</strong></div></div>
      <div class="gx-bars"><h4>${esc(S.t)}</h4>${rowsH}</div></div>
    ${sales}
    <small class="gsb-src">출처: ${S.src}</small></div>`;
}
function gearCU(root) {
  if (!root) return;
  root.querySelectorAll('[data-cu]').forEach(e => { const v = +e.dataset.cu, d = +(e.dataset.d || 0), t0 = performance.now();
    const f = t => { const k = Math.min(1, (t - t0) / 1200), x = v * (1 - Math.pow(1 - k, 3)); e.textContent = x.toFixed(d); if (k < 1) requestAnimationFrame(f); }; requestAnimationFrame(f); });
  root.classList.remove('go'); void root.offsetWidth; root.classList.add('go');
}
const gearCUVis = () => app.querySelectorAll('.gbx-p.gx').forEach(p => { if (p.offsetParent && !p.hidden) gearCU(p); });
document.addEventListener('pg-show', () => setTimeout(gearCUVis, 30));
function gearBrandTab(cat, items, g) {
  const S0 = (g && GEAR_SHARE_W[g]) || GEAR_SHARE[cat], rkOf = n => { const i = S0.all.findIndex(r => r[0] === n); return i < 0 ? 99 : i; }, list = gearBrandList(cat, items).sort((a, z) => rkOf(a.n) - rkOf(z.n)), S = (g && GEAR_SHARE_W[g]) || GEAR_SHARE[cat], S5 = S.all.slice(0, S.n || 5), etc = +(100 - S5.reduce((x, r) => x + r[1], 0)).toFixed(1);
  return `<div class="gbx"><p class="gbx-hint">📊 종합에서 전체 브랜드 순위를, 브랜드를 누르면 점유율과 라인업을 볼 수 있어요</p>
    <div class="gbx-t"><button type="button" class="on gbx-all" style="--bc:#f5a300" onclick="gearBrandOpen(this,0)"><i></i>📊 종합</button>${list.map((B, i) => `<button type="button" style="--bc:${B.c}" onclick="gearBrandOpen(this,${i + 1})"><i></i>${esc(B.n)}<small>${B.L.length}</small></button>`).join('')}</div>
    ${gearOverview(cat, g, list, S)}
    ${list.map((B, i) => { const rk = S.all.findIndex(r => r[0] === B.n), ex = (GEAR_BSH[cat] || {})[B.n], sh = ex || (rk >= 0 ? [S.all[rk][1] + '%', S.t.replace(' 중 제품 비중', '') + ' · ' + (rk + 1) + '위'] : ['순위 밖', S.t.replace(' 중 제품 비중', '') + ' 안에 이 브랜드 제품이 없어요 (국내 판매가 적거나 해외 직구 위주)']);
      return `<div class="gbx-p" style="--bc:${B.c}" hidden>
      <div class="gbx-top"><div class="gbx-info"><b>${esc(B.n)}</b><p>${esc(B.desc)}</p>
          ${B.lines ? `<div class="gbr-l">${B.lines.map(([l, d]) => `<span><b>${l}</b>${d}</span>`).join('')}</div>` : ''}
          ${B.pros ? `<div class="gwb-pc"><div><h5>👍 장점</h5><ul>${B.pros.map(x => `<li>${x}</li>`).join('')}</ul></div><div><h5>👎 단점</h5><ul>${B.cons.map(x => `<li>${x}</li>`).join('')}</ul></div></div>` : ''}
          <a class="gbx-site" href="${B.site}" target="_blank" rel="noopener">공식 홈페이지</a></div>
        <div class="gbx-sh"><h4>📊 시장 점유율</h4><div class="gbx-v"><b>${sh[0]}</b><span>${esc(sh[1])}</span></div>
          <div class="gsb"><small>${S.t}</small>${[...S5, ['기타', etc]].map(([l, v]) => `<div class="gsb-r ${l === B.n ? 'on' : ''}"><span>${l}</span><em><i style="--w:${v}%"></i></em><b>${v}%</b></div>`).join('')}<small class="gsb-src">출처: ${S.src}</small></div></div></div>
      <h4 class="gbx-lh">${esc(B.n)} 제품 ${B.L.length}개</h4>
      <div class="gbr-g" style="--cols:${Math.min(6, Math.max(B.L.length, 4))}">${[...B.L].sort((a, z) => gKrw(a) - gKrw(z)).map(p => { const q = encodeURIComponent(p.n); return `<div class="gbr-c" ${gOpen(p.id)}><span class="gbr-im ${p.cv ? 'cv' : ''}">${gImg(p.img, p.n)}</span><b>${esc(p.n)}</b><small>${esc(p.ty || '')} · ${GEAR_TIER[p.t][0]}</small><strong>${gPrice(p)}</strong>
        <span class="gbr-a" onclick="event.stopPropagation()"><a href="${p.url}" target="_blank" rel="noopener">${gShopLab(p)}</a><a href="https://search.shopping.naver.com/search/all?query=${q}" target="_blank" rel="noopener">네이버</a><a class="cp" href="https://www.coupang.com/np/search?q=${q}" target="_blank" rel="noopener">쿠팡</a></span></div>`; }).join('')}</div></div>`; }).join('')}</div>`;
}
function gearBrandOpen(btn, i) {
  const box = btn.closest('.gbx');
  box.querySelectorAll('.gbx-t button').forEach((b, j) => b.classList.toggle('on', j === i));
  box.querySelectorAll('.gbx-p').forEach((p, j) => { p.hidden = j !== i; if (j === i) { p.classList.remove('pg-in'); void p.offsetWidth; p.classList.add('pg-in'); if (p.classList.contains('gx')) gearCU(p); } });
}
/* 의류: 탭마다 남성·여성 (모든 탭이 함께 바뀌어요) */
let GEAR_WG = 'm';
const gGen = () => `<div class="gset-g gg-t">${[['m', '👨 남성'], ['w', '👩 여성']].map(([g, n]) => `<button type="button" data-g="${g}" class="${GEAR_WG === g ? 'on' : ''}" onclick="gearWG('${g}')">${n}</button>`).join('')}</div>`;
function gearWG(g) { GEAR_WG = g; app.querySelectorAll('.gg-t button').forEach(b => b.classList.toggle('on', b.dataset.g === g)); app.querySelectorAll('.gg-b').forEach(d => { d.hidden = d.dataset.g !== g; d.querySelectorAll('.grow').forEach(e => e.classList.add('play')); }); gearCUVis(); }
const gByG = f => [['m'], ['w']].map(([g]) => `<div class="gg-b" data-g="${g}" ${GEAR_WG === g ? '' : 'hidden'}>${f(g)}</div>`).join('');

function viewGear(cat) {
  if (!GEAR_CATS.some(c => c[0] === cat)) cat = 'set';
  const C = GEAR_CATS.find(c => c[0] === cat);
  const sub = `<p class="sec-sub">거지 세트부터 선수용까지 — 2026년 11월 국내 공식몰 가격 기준이에요. 모든 사진·제품을 누르면 사진·장단점·구매 링크가 나와요.</p>`;
  if (cat === 'set') { app.innerHTML = `<h1 class="sec-title">러닝 아이템</h1>${sub}${gearMenu(cat)}${gearSets(GEAR_G)}`; return motion(); }
  const head = `<h1 class="sec-title">러닝 아이템 · ${C[2]}</h1>${sub}${gearMenu(cat)}`;
  if (cat === 'daiso') return viewGearDaiso(head);
  GREC = [];
  const W = cat === 'wear', items = cat === 'watch' ? WATCHES : GEAR[cat].items, G = GEAR[cat];
  const tipLv = L => gearLevels(L.map(([ic, lv, bud, need, picks]) => [ic, lv, '', bud, need, picks]));
  const tips = cat === 'watch' ? `${gearRules(WATCH_RULES)}${gearLevels(WATCH_TIPS)}`
    : `<div class="gtype">${G.types.map(([ic, n, d, minus], i) => `<div class="grow" style="--i:${i}"><span>${ic}</span><b>${n}</b><p>${d}</p><small>− ${minus}</small></div>`).join('')}</div>
      ${gearRules(G.rules)}<h3 class="g-sh">수준별 추천</h3>${W ? gByG(g => tipLv(GEAR_TIPS.wear[g])) : tipLv(GEAR_TIPS[cat])}`;
  const rec = (cat === 'watch' ? `<h3 class="g-sh">레벨별 추천 순위</h3>${gearLv3()}<h3 class="g-sh">분류별 인기 순위</h3>` : '') + (W ? gByG(g => gearRec(cat, items.filter(p => p.g === g))) : gearRec(cat, items));
  const brand = W ? gByG(g => gearBrandTab(cat, items.filter(p => p.g === g), g)) : gearBrandTab(cat, cat === 'ear' ? [...items, ...G.lineup] : items);
  const h2 = (t, x) => `<section><h2 class="h2">${t}</h2>${W ? gGen() : ''}${x}</section>`;
  app.innerHTML = `${head}${h2(C[2] + ' 선택 팁', tips)}${h2('제품 추천', rec)}${h2('브랜드', brand)}
    <p class="note">가격은 2026년 11월 각 공식몰 표시 정가예요 (할인가 별도). 해외 공식몰 제품은 배송비·관세가 붙을 수 있고, 알리 제품은 판매자마다 가격이 달라요. 네이버·쿠팡 링크는 해당 제품명 검색 결과로 연결돼요.</p>`;
  app.querySelectorAll('.grc').forEach(gearRecDraw);
  motion();
}
/* 다이소: 종류별 분류만 (모두 가성비라 등급·순위 없음) */
const DAISO_TYPES = ['상의', '하의', '양말', '모자', '조끼', '러닝벨트', '선글라스', '이어폰'];
function viewGearDaiso(head) {
  const L = GEAR.daiso.items, chip = (t, n) => `<button type="button" class="${t === '전체' ? 'on' : ''}" onclick="gearDaisoF(this,'${t}')">${t} <i>${n}</i></button>`;
  app.innerHTML = `${head}
    <div class="gd-f">${chip('전체', L.length)}${DAISO_TYPES.filter(t => L.some(p => p.ty === t)).map(t => chip(t, L.filter(p => p.ty === t).length)).join('')}</div>
    <div class="gi-grid gd-grid" style="--cols:5">${L.map((p, i) => gearCard(p, i).replace('<div class="gi grow"', `<div data-ty="${p.ty}" class="gi grow"`)).join('')}</div>
    <p class="note">${GEAR.daiso.rules.map(r => `${r[0]} ${r[2]}`).join(' · ')}</p>`;
  motion();
}
function gearDaisoF(btn, t) {
  btn.parentNode.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === btn));
  app.querySelectorAll('.gd-grid .gi').forEach(c => { c.hidden = t !== '전체' && c.dataset.ty !== t; c.classList.add('play'); });
}
