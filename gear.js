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
  ['watch', '⌚', '시계', '러닝워치 · 스마트워치'],
  ['ear', '🎧', '이어폰', '골전도 · 오픈형 · 클립형'],
  ['cap', '🧢', '모자', '캡 · 바이저'],
  ['vest', '🎒', '조끼', '러닝 베스트 · 하이드레이션'],
  ['belt', '👝', '러닝벨트', '밴드형 · 파우치형'],
  ['sun', '🕶️', '선글라스', '편광 · 프리즘 렌즈'],
  ['sock', '🧦', '양말', '쿠션 · 발가락 · 메리노'],
];

/* ---------- 시계 ---------- */
const WATCH_BRANDS = {
  samsung: { n: '삼성 갤럭시', c: '#1d4ed8', os: '안드로이드 전용', pros: ['갤럭시 폰과 완벽 연동 · 삼성페이', '밝은 AMOLED 화면 (워치9 최대 3,000니트)', '국내 서비스센터가 가장 많아요'], cons: ['아이폰에서는 못 써요', '배터리가 1~2일 (울트라 제외)', '러닝 분석 깊이는 가민·코로스보다 얕아요'] },
  apple: { n: '애플워치', c: '#94a3b8', os: '아이폰 전용', pros: ['아이폰 연동·앱 생태계 최고 (나이키 런 클럽·스트라바)', '심박·건강 기능이 촘촘해요', '셀룰러로 폰 없이 음악·통화'], cons: ['안드로이드에서는 못 써요', '배터리가 짧아 매일 충전', '같은 기능 대비 가장 비싸요'] },
  garmin: { n: '가민', c: '#0ea5e9', os: '안드로이드·아이폰', pros: ['러닝 분석 최강 (트레이닝 레디니스·레이스 예측·HRV)', '배터리 1~2주 · 듀얼밴드 GPS', '국내 공식몰·브랜드샵 A/S'], cons: ['같은 급 대비 비싸요', '앱·스마트 기능은 단순한 편', '메뉴가 많아 처음엔 어려워요'] },
  xiaomi: { n: '샤오미', c: '#f97316', os: '안드로이드·아이폰', pros: ['7만 원대부터 — 가장 싸게 시작', '배터리 최대 21일', '가볍고 24시간 차기 편해요'], cons: ['러닝 지표가 단순해요', '밴드는 화면이 작아 기록 보기 불편', '정밀한 훈련용으로는 부족'] },
  coros: { n: '코로스', c: '#e11d48', os: '안드로이드·아이폰', pros: ['가격 대비 배터리·GPS 정확도 최고 수준', '30g대 초경량 (페이스 시리즈)', '킵초게 등 엘리트 선수 사용'], cons: ['국내 공식 판매처·A/S가 약해요', '스마트 기능(결제·앱)이 거의 없어요', '해외 직구 위주'] },
  suunto: { n: '순토', c: '#64748b', os: '안드로이드·아이폰', pros: ['핀란드 아웃도어 감성·튼튼한 마감', '지도·트레일 기능', '긴 배터리'], cons: ['국내 유통이 적어요', '앱 생태계가 작아요', '러닝 분석은 가민보다 단순'] },
  amazfit: { n: '어메이즈핏', c: '#14b8a6', os: '안드로이드·아이폰', pros: ['싼 가격에 GPS·러닝 지표·구독 없음', '배터리 길어요', '하이록스·트레일 등 라인업 다양'], cons: ['국내 정식 유통이 적어요', '앱 완성도가 아쉬워요', '센서 정확도 편차'] },
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
  { id: 'pace4', wb: 'coros', n: '코로스 페이스 4', t: 'mid', usd: 249, img: 'https://d1teks7lx8pls2.cloudfront.net/filters:format(webp)/filters:quality(90)/fit-in/1104x1054/coros-v2/images/6f8656de38da0b7b7d54e62ded3ab33b.png', url: 'https://coros.com/pace4', shop: '코로스 공식 (해외)', spec: '2025.11 출시 · AMOLED', pts: ['가성비 러닝워치 1순위로 꼽혀요', '가볍고 배터리 길어요'], beg: 1 },
  { id: 'pace4p', wb: 'coros', n: '코로스 페이스 4 프로', t: 'pro', usd: 449, img: 'https://d1teks7lx8pls2.cloudfront.net/filters:format(webp)/filters:quality(90)/fit-in/1000x900/coros-v2/images/68a2c329e4627bd0c0286100d48bb054.png', url: 'https://coros.com/pace4pro', shop: '코로스 공식 (해외)', spec: '2026.9 출시 · 티타늄 · GPS 30시간(공식)', pts: ['코로스 레이싱 플래그십', '실측 배터리는 공식보다 짧다는 리뷰도'], elite: 1 },
  { cv: 1, id: 'apex4', wb: 'coros', n: '코로스 에이펙스 4', t: 'high', usd: 429, pn: '42mm · 46mm $479', img: 'https://d1teks7lx8pls2.cloudfront.net/filters:format(webp)/filters:quality(90)/fit-in/1240x720/coros-v2/images/apex4/banners/menu.jpg', url: 'https://coros.com/apex4', shop: '코로스 공식 (해외)', spec: '2025.10 출시 · 산악·트레일', pts: ['트레일 러너용 튼튼한 시계', '긴 배터리'], elite: 1 },
  { id: 'srun', wb: 'suunto', n: '순토 런', t: 'mid', usd: 249, img: 'https://us.suunto.com/cdn/shop/files/Suunto_Run-ALL_BLACK-Front-ALL_BLACK-watchface_EN.png', url: 'https://us.suunto.com/products/suunto-run-all-black', shop: '순토 공식 (해외)', spec: '러너 전용 경량 AMOLED', pts: ['순토 최초 러닝 특화 모델', '가볍고 깔끔한 디자인'] },
  { id: 'srace2', wb: 'suunto', n: '순토 레이스 2', t: 'high', usd: 499, img: 'https://us.suunto.com/cdn/shop/files/Suunto_Race2-AllBlack-Front-AllBlack-watchface-c40-sailfish_EN_1024x.png', url: 'https://us.suunto.com/products/suunto-race-2-all-black', shop: '순토 공식 (해외)', spec: '1.5인치 AMOLED · 사파이어', pts: ['지도·트레일 최상급', '티타늄 버전 65g'], elite: 1 },
  { id: 'active3', wb: 'amazfit', n: '어메이즈핏 액티브 3 프리미엄', t: 'cheap', usd: 169.99, img: 'https://us.amazfit.com/cdn/shop/files/PP-Black.png', url: 'https://us.amazfit.com/products/active-3-premium', shop: '어메이즈핏 공식 (해외)', spec: '2026.2 출시 · 사파이어 · 배터리 12일', pts: ['입문 러너용 GPS 워치', '구독료 없음'], beg: 1 },
  { id: 'cheetah2p', wb: 'amazfit', n: '어메이즈핏 치타 2 프로', t: 'high', usd: 449.99, img: 'https://us.amazfit.com/cdn/shop/files/Main_image_with_hycridcharge_e67ed706-172a-467a-831d-c4c61d0e572f.jpg', url: 'https://us.amazfit.com/products/cheetah-2-pro', shop: '어메이즈핏 공식 (해외)', spec: '2026.4 출시 · 티타늄 · 러닝 파워', pts: ['마라톤 준비용 지표 (VO₂max·젖산역치)', '가민보다 30만 원가량 싸요'] },
];
/* 시장 점유율·출하 (조사 기관마다 기준이 달라 따로 표시) */
const WATCH_MKT = {
  cp: { src: '카운터포인트리서치 · 2026년 2분기 전 세계 스마트워치 출하량 (키즈·보급형 포함)', d: [['화웨이', 22, '#e11d48'], ['애플', 20.1, '#cbd5e1'], ['아이무 (키즈워치)', 7.8, '#f59e0b'], ['샤오미', 6.1, '#f97316'], ['가민', 5.6, '#0ea5e9'], ['기타 (삼성 포함)', 38.5, '#475569']] },
  om: { src: '옴디아 · 2026년 2분기 스마트워치 출하량 (보급형 밴드 제외)', d: [['애플', 46, '#cbd5e1'], ['삼성', 15, '#1d4ed8'], ['가민', 15, '#0ea5e9'], ['기타', 24, '#475569']] },
  gr: { src: '카운터포인트리서치 · 2026년 2분기 출하량 전년 대비', d: [['애플', 14], ['가민', 11], ['화웨이', 1], ['아이무', -3], ['기타', -8], ['샤오미', -38]] },
};
/* 종합 판매순위 = 2026년 2분기 전 세계 출하 순위 (카운터포인트) */
const WATCH_SALES = [
  [1, '화웨이', '22%', '중국 판매가 약 80% — 국내 정식 판매는 적어요', null],
  [2, '애플', '20.1%', '출하의 80% 이상이 시리즈 11·SE 3 — 상위 5개 중 가장 빠른 성장(+14%)', 'awse3'],
  [3, '아이무', '7.8%', '어린이용 키즈워치 브랜드', null],
  [4, '샤오미', '6.1%', '출하 38% 감소 — 그래도 밴드는 꾸준한 베스트셀러', 'band11'],
  [5, '가민', '5.6%', '+11% 성장 · 포러너 시리즈가 견인 (옴디아 기준 삼성과 공동 2위 15%)', 'fr570'],
  ['-', '삼성', '5% (1분기)', '1분기 카운터포인트 기준 5위 — 2분기 옴디아 기준 15% (애플 다음)', 'gw9'],
];
const WATCH_TIPS = [
  ['🌱', '입문', '주 1~2회 · 5~10km', '10~40만 원', ['심박·거리·페이스만 정확하면 충분', '폰 GPS를 빌리는 밴드도 OK', '가볍고 매일 차기 편한 것'], ['band11', 'fr70', 'awse3']],
  ['🏃', '중급', '하프·10km 기록 단축', '25~60만 원', ['시계 자체 GPS (폰 없이 달리기)', '인터벌 훈련 설정·회복 시간', '배터리 1주 이상이면 편해요'], ['pace4', 'fr170', 'gw9']],
  ['🔥', '상급', '풀코스 · 서브4 목표', '60~110만 원', ['듀얼밴드 GPS — 빌딩숲에서도 정확', '훈련 부하·HRV·레이스 예측', 'GPS 배터리 20시간 이상'], ['fr570', 'srace2', 'cheetah2p']],
  ['🏆', '엘리트·트레일', '서브3 · 울트라 · 산악', '100만 원+ 또는 초경량', ['외부 심박계(가슴 스트랩) 연동', '지도·고도·긴 배터리', '무게까지 따지는 레이스 세팅'], ['fr970', 'pace4p', 'fenix9']],
];
const WATCH_RULES = [
  ['📱', '내 폰부터 확인', '애플워치는 아이폰, 갤럭시 워치는 안드로이드 전용. 가민·코로스·순토·샤오미·어메이즈핏은 둘 다 돼요.'],
  ['🔋', '배터리 = 충전 스트레스', '스마트워치(애플·갤럭시)는 1~2일, 러닝워치(가민·코로스)는 1~3주.'],
  ['🛰️', '듀얼밴드 GPS', '도심 빌딩 사이에서 페이스가 튀지 않아요. 기록용이면 꼭 확인.'],
  ['⚖️', '무게 40g대', '손목이 가벼워야 풀코스 후반까지 신경 쓰이지 않아요.'],
];
const WATCH_BEST = ['fr570', 'pace4', 'gw9'];
const WATCH_BEST_WHY = { fr570: '러닝 기능·배터리·가격 균형이 가장 좋은 "정답" 러닝워치', pace4: '30만 원대 해외가로 GPS·배터리 모두 상급 — 가성비 1위', gw9: '안드로이드 러너라면 일상+러닝 올라운더 (아이폰이면 애플워치 SE 3)' };

/* ---------- 다른 아이템 ---------- */
const GEAR = {
  ear: {
    types: [['🦴', '골전도 헤드형', '광대뼈 진동으로 소리 전달 — 귀가 완전히 열려 차 소리까지 들려요. 흔들림이 거의 없어 러닝 정석.', '저음이 약하고 볼륨을 올리면 진동이 느껴져요'],
      ['👂', '오픈형 이어훅', '귀 앞 작은 스피커 — 골전도보다 음질이 좋고 편해요.', '소리가 새고 바람 소리가 섞여요'],
      ['📎', '이어커프·클립형', '귀에 집게처럼 걸어요 — 작고 모자·선글라스와 덜 부딪혀요.', '격하게 뛰면 흔들림 개인차'],
      ['🔇', '커널형 스포츠', '귀를 막는 이어팁 + 이어훅 — 음질·노캔 최고.', '주변 소리가 막혀 도로에선 주변음 모드 필수'],
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
      { n: '샥즈 오픈핏 프로', b: '샥즈', ty: '오픈형 이어훅', t: 'high', krw: 369000, img: 'https://static.shokz.co.kr/resource/2026/08/24/OpenFit_Pro________6a8c0c670d55e.webp', url: 'https://shokz.co.kr/shop/all', shop: '샥즈 공식', pts: ['2026년 3월 출시 직후 완판 화제', '샥즈 오픈형 최상위'] },
      { n: '샥즈 오픈스윔 프로', b: '샥즈', ty: '수영·철인용', t: 'pro', krw: 319000, img: 'https://static.shokz.co.kr/resource/2026/08/24/OpenSwim_Pro_____6a8bacf8c152d.webp', url: 'https://shokz.co.kr/shop/all', shop: '샥즈 공식', pts: ['수영·러닝 모두 — 철인 3종 훈련', '내장 MP3 + 블루투스'], elite: 1 },
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
    best: [['플립벨트 클래식', '안 흔들리는 밴드형의 원조'], ['데카트론 러닝 스마트폰 벨트 베이직 2', '1.5만 원 국민 러닝벨트'], ['살로몬 펄스 벨트', '국내 공식몰에서 사는 레이스 벨트']],
  },
  sun: {
    types: [['🌊', '편광 렌즈', '물·아스팔트 반사광을 잘라요 — 눈부심 감소.', '화면(시계) 보기가 어두울 때가 있어요'], ['🌈', '프리즘·고대비 렌즈', '노면 굴곡이 또렷 — 오클리 프리즘 등.', '비싸요'], ['🌗', '변색 렌즈', '빛에 따라 어두워졌다 밝아져요 — 새벽·숲길.', '반응에 몇십 초 걸려요']],
    rules: [['🪶', '30g 안팎 가벼움', '코·귀 자국이 안 생겨요.'], ['🧲', '미끄럼 방지 코패드', '땀 나도 안 흘러내리는지.'], ['🛡️', 'UV400 차단', '싼 제품도 UV 차단 표시는 필수.']],
    items: [
      { n: '락브로스 편광 스포츠 선글라스', b: 'ROCKBROS', ty: '편광 렌즈', t: 'cheap', usd: 15, pn: '알리 약 12~50달러 (모델별)', img: 'https://ae-pic-a1.aliexpress-media.com/kf/Sb685b848327e4a56a9a6110b57bce97eL.jpg', url: 'https://ko.aliexpress.com/i/33022724107.html', shop: '알리익스프레스', pts: ['2만 원대 편광·UV400', '자전거·러닝 겸용'], beg: 1 },
      { n: 'goodr OG', b: 'goodr', ty: '편광 렌즈', t: 'cheap', usd: 30, img: 'https://cdn.shopify.com/s/files/1/0084/1616/5946/files/1_MICK_KEITHS_MIDNIGHT_RAMBLE_Side_Transparent_cad0cf3e-dbef-42c4-8d8e-ac03a16efa0e.png', url: 'https://goodr.com/products/mick-and-keiths-midnight-ramble', shop: 'goodr 공식 (해외)', pts: ['"안 미끄러지고 안 튀는" 편광 30달러', '러너 인기 1위 가성비'], beg: 1 },
      { n: '100% 스피드크래프트', b: '100%', ty: '프리즘·고대비 렌즈', t: 'mid', usd: 149.95, img: 'https://cdn.shopify.com/s/files/1/0042/0190/6234/files/SP26_SPEEDCRAFT_60007-10084_3Q.jpg', url: 'https://www.100percent.com/products/speedcraft-polished-translucent-clear-purple-mirror-lens', shop: '100% 공식 (해외)', pts: ['넓은 실드 렌즈 — 시야 최대', '사이클·러닝 선수 다수 사용'] },
      { n: '디스트릭트 비전 준야 레이서', b: '디스트릭트 비전', ty: '프리즘·고대비 렌즈', t: 'high', krw: 398379, pn: '공식몰 원화 표시가', img: 'https://cdn.shopify.com/s/files/1/0464/6148/5224/files/DVG003_Grey_001.jpg', url: 'https://districtvision.com/products/junya-racer-slate-d-onyx-mirror', shop: '디스트릭트 비전 공식 (해외)', pts: ['러닝 패션 하이엔드', '초경량 레이서 프레임'] },
      { n: '오클리 레이더 EV 패스', b: '오클리', ty: '프리즘·고대비 렌즈', t: 'pro', usd: 244, img: 'https://assets2.oakley.com/prod-onecp-record-files/pieyewear/38bb5876-a40c-4880-9348-b35f004b5e7c/0OO9208__920852__P21__shad__qt.png', url: 'https://www.oakley.com/en-us/product/W0OO9208', shop: '오클리 공식 (미국)', pts: ['엘리트 마라토너·사이클 선수 대표 선글라스', '프리즘 렌즈로 노면이 또렷'], elite: 1 },
    ],
    best: [['오클리 레이더 EV 패스', '대회 사진 속 선수들이 쓰는 그 선글라스'], ['goodr OG', '3만 원대로 안 흘러내리는 편광'], ['100% 스피드크래프트', '넓은 시야의 실드형']],
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
    best: [['발레가 히든 컴포트', '첫 "좋은 러닝 양말"로 가장 무난'], ['인진지 런 라이트웨이트 노쇼', '물집이 잦다면 발가락 양말'], ['데카트론 러닝 쿠션 중목 양말 런 500', '2켤레 7,900원 가성비']],
  },
};
const GEAR_TIPS = {
  ear: [['🌱', '입문', '5만 원 이하', ['오픈형 클립·이어훅부터', '빠지지 않는지만 확인'], ['QCY 크로스키 C50', '사운드코어 에어로핏 2']], ['🏃', '중급', '20~30만 원', ['오픈형 이어훅 · 골전도', '방수·배터리 8시간+'], ['샥즈 오픈핏 2+', '보스 스포츠 오픈 이어버드']], ['🏆', '선수·대회', '25~37만 원', ['골전도 헤드형이 정석', '심박 측정 이어폰도 선택지'], ['샥즈 오픈런 프로 2', '파워비츠 프로 2']]],
  cap: [['🌱', '입문', '2만 원 안팎', ['가볍고 속건되는 캡', '뒤 조절 끈'], ['데카트론 러닝 캡 모자 V2', '데카트론 러닝 울트라라이트 캡']], ['🏃', '중급', '4~6만 원', ['납작 접히는 러닝 캡', '반사 로고'], ['시엘 GOCap 클래식', '나이키 드라이 핏 ADV 플라이 캡']], ['🏆', '선수·대회', '6만 원+', ['초경량 5패널', '대회 에디션'], ['시엘 GOCap SC 컴프']]],
  vest: [['🌱', '입문', '7~10만 원', ['로드 5L면 충분', '포켓 수 · 무게'], ['데카트론 경량 트레일러닝 베스트 5L']], ['🏃', '중급', '15~18만 원', ['플라스크 포함 세트', '흔들림 테스트'], ['살로몬 액티브 스킨 8 세트']], ['🏆', '트레일·울트라', '25~28만 원', ['필수 장비 수납 12L', '레이싱 S/LAB'], ['살로몬 어드밴스드 스킨 12 세트', '살로몬 S/LAB 센스 6 세트']]],
  belt: [['🌱', '입문', '2만 원 이하', ['폰만 들어가면 OK', '밴드형이 덜 흔들려요'], ['데카트론 러닝 스마트폰 벨트 베이직 2']], ['🏃', '중급', '3~5만 원', ['젤·키·폰 분리 수납', '배번 고리'], ['플립벨트 클래식', '살로몬 펄스 벨트']], ['🏆', '대회·울트라', '9~10만 원', ['물병·폴까지 수납', '레이스 전용'], ['네이키드 HC 러닝 밴드', '살로몬 S/LAB 벨트 PNS']]],
  sun: [['🌱', '입문', '2~5만 원', ['UV400 + 편광', '미끄럼 방지'], ['락브로스 편광 스포츠 선글라스', 'goodr OG']], ['🏃', '중급', '20만 원대', ['넓은 시야 실드형', '고대비 렌즈'], ['100% 스피드크래프트']], ['🏆', '선수·대회', '30만 원+', ['프리즘 렌즈 · 초경량', '교체 렌즈'], ['오클리 레이더 EV 패스', '디스트릭트 비전 준야 레이서']]],
  sock: [['🌱', '입문', '켤레당 2~4천 원', ['쿠션형 + 뒤꿈치 탭', '여러 켤레 돌려 신기'], ['데카트론 러닝 단목 양말 런 100 (3켤레)']], ['🏃', '중급', '2만 원대', ['좌우 구분 설계', '봉제선 없는 앞코'], ['발레가 히든 컴포트', '피처스 엘리트 라이트 쿠션']], ['🏆', '장거리·울트라', '2~3만 원대', ['발가락 양말로 물집 방지', '메리노 울'], ['인진지 런 라이트웨이트 노쇼', '단터프 런 마이크로 크루']]],
};

/* ---------- 화면 ---------- */
const gCols = n => n <= 5 ? n : [5, 4, 3].sort((a, z) => ((a - n % a) % a) - ((z - n % z) % z) || z - a)[0];
const gKrw = p => p.krw || (p.usd ? Math.round(p.usd * GEAR_USD) : 0);
const gPrice = p => p.krw ? `₩${p.krw.toLocaleString()}` : `$${p.usd}`;
const gImg = (src, alt) => `<img src="${src}" alt="${esc(alt)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentNode.classList.add('noimg')">`;
function gearCard(p, i, brandName) {
  const T = GEAR_TIER[p.t];
  return `<a class="gi grow" href="${p.url}" target="_blank" rel="noopener" style="--tc:${T[1]};--i:${i}">
    <div class="gi-ph ${p.cv ? 'cv' : ''}">${gImg(p.img, p.n)}<span class="gi-t">${T[0]}</span>${p.ty ? `<span class="gi-ty">${p.ty}</span>` : ''}</div>
    <div class="gi-b"><small>${esc(brandName || p.b || '')}</small><b>${esc(p.n)}</b>
      <div class="gi-p"><strong>${gPrice(p)}</strong>${p.usd && !p.krw ? `<em>약 ${Math.round(p.usd * GEAR_USD / 10000).toLocaleString()}만 원</em>` : ''}</div>
      ${p.pn ? `<span class="gi-pn">${esc(p.pn)}</span>` : ''}${p.spec ? `<span class="gi-sp">${esc(p.spec)}</span>` : ''}
      <ul>${p.pts.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      <span class="gi-go">${esc(p.shop)}에서 보기 ↗</span></div></a>`;
}
/* 가격 사다리: 가장 싼 것 → 가장 비싼 것 (로그 눈금 막대가 차오르는 모션) */
function gearLadder(list, nameOf) {
  const s = [...list].sort((a, z) => gKrw(a) - gKrw(z)), lo = Math.log(Math.max(3000, gKrw(s[0]) * 0.6)), hi = Math.log(gKrw(s[s.length - 1]));
  return `<div class="gl grow">${s.map((p, i) => `<div class="gl-r" style="--i:${i};--tc:${GEAR_TIER[p.t][1]}"><span class="gl-n">${esc(nameOf(p))}</span>
    <span class="gl-b"><i style="width:${Math.max(4, (Math.log(gKrw(p)) - lo) / (hi - lo) * 100).toFixed(1)}%"></i></span><b>${p.krw ? (p.krw >= 10000 ? (p.krw / 10000).toFixed(p.krw % 10000 ? 1 : 0).replace(/\.0$/, '') + '만' : p.krw.toLocaleString()) : '$' + p.usd}</b></div>`).join('')}
    <div class="gl-leg">${Object.values(GEAR_TIER).map(([n, c]) => `<span style="--tc:${c}"><i></i>${n}</span>`).join('')}<small>막대 = 가격 (해외가는 1달러 ≈ 1,400원으로 환산 · 로그 눈금)</small></div></div>`;
}
function gearMenu(cur) {
  return `<nav class="gm">${GEAR_CATS.map(([k, ic, n, d]) => `<a href="#gear-${k}" class="${k === cur ? 'on' : ''}"><span>${ic}</span><b>${n}</b><small>${d}</small></a>`).join('')}</nav>`;
}
function gearRules(rules) {
  return `<div class="gr">${rules.map(([ic, t, d], i) => `<div class="grow" style="--i:${i}"><span>${ic}</span><b>${t}</b><p>${d}</p></div>`).join('')}</div>`;
}
function gearLevels(levels, find) {
  return `<div class="glv">${levels.map(([ic, lv, who, bud, need, picks], i) => `<div class="glv-c grow" style="--i:${i}">
      <div class="glv-h"><span>${ic}</span><div><b>${lv}</b>${who ? `<small>${who}</small>` : ''}</div></div><em class="glv-bud">💰 ${bud}</em>
      <ul>${need.map(x => `<li>${x}</li>`).join('')}</ul>
      <div class="glv-p">${picks.map(k => { const p = find(k); return p ? `<a href="${p.url}" target="_blank" rel="noopener"><span class="glv-im">${gImg(p.img, p.n)}</span>${esc(p.n)}</a>` : ''; }).join('')}</div></div>`).join('')}</div>`;
}
function gearBest(arr) {
  return `<div class="gb">${arr.map(([p, why], i) => `<a class="gb-c grow r${i + 1}" href="${p.url}" target="_blank" rel="noopener" style="--i:${i}">
      <span class="gb-rk">${['🥇', '🥈', '🥉'][i]}<b>${i + 1}위</b></span><div class="gb-ph ${p.cv ? 'cv' : ''}">${gImg(p.img, p.n)}</div>
      <b>${esc(p.n)}</b><strong>${gPrice(p)}</strong><p>${esc(why)}</p></a>`).join('')}</div>`;
}
function gearRank(cat, list, nameOf) {
  const tabs = [['price', '💰 가격순'], ['beg', '🌱 초보 추천'], ['elite', '🏆 엘리트 추천']];
  if (cat === 'watch') tabs.unshift(['sales', '📈 종합 판매순위']);
  return `<div class="grk" data-cat="${cat}"><div class="grk-t">${tabs.map(([k, n], i) => `<button type="button" class="${i ? '' : 'on'}" onclick="gearRankShow(this,'${k}')">${n}</button>`).join('')}</div>
    <div class="grk-b">${tabs.map(([k], i) => `<ol class="grk-l" data-k="${k}" ${i ? 'hidden' : ''}>${gearRankRows(cat, k, list, nameOf)}</ol>`).join('')}</div></div>`;
}
function gearRankRows(cat, k, list, nameOf) {
  if (k === 'sales') return WATCH_SALES.map(([r, b, sh, note, pid]) => { const p = pid && WATCHES.find(w => w.id === pid);
    return `<li><span class="grk-n">${r}</span>${p ? `<span class="grk-im">${gImg(p.img, p.n)}</span>` : '<span class="grk-im em">⌚</span>'}<div><b>${b} <em>${sh}</em></b><small>${esc(note)}</small></div>${p ? `<a href="${p.url}" target="_blank" rel="noopener">${esc(p.n)} ↗</a>` : ''}</li>`; }).join('');
  const L = k === 'price' ? [...list].sort((a, z) => gKrw(a) - gKrw(z)) : list.filter(p => p[k === 'beg' ? 'beg' : 'elite']).sort((a, z) => gKrw(a) - gKrw(z));
  return L.map((p, i) => `<li><span class="grk-n">${i + 1}</span><span class="grk-im">${gImg(p.img, p.n)}</span><div><b>${esc(nameOf(p))}</b><small>${GEAR_TIER[p.t][0]} · ${esc(p.spec || p.ty || '')}</small></div><a href="${p.url}" target="_blank" rel="noopener">${gPrice(p)} ↗</a></li>`).join('');
}
function gearRankShow(btn, k) {
  const box = btn.closest('.grk');
  box.querySelectorAll('.grk-t button').forEach(b => b.classList.toggle('on', b === btn));
  box.querySelectorAll('.grk-l').forEach(l => { l.hidden = l.dataset.k !== k; if (!l.hidden) { l.classList.remove('pg-in'); void l.offsetWidth; l.classList.add('pg-in'); } });
}

function viewGear(cat) {
  if (!GEAR_CATS.some(c => c[0] === cat)) cat = 'watch';
  const C = GEAR_CATS.find(c => c[0] === cat);
  const head = `<h1 class="sec-title">러닝 아이템 · ${C[2]}</h1><p class="sec-sub">가성비(알리·쿠팡·데카트론)부터 선수용까지 — 2026년 11월 공식몰 가격 기준이에요. 사진·버튼을 누르면 공식 판매 페이지로 이동해요.</p>${gearMenu(cat)}`;
  if (cat === 'watch') return viewGearWatch(head);
  const G = GEAR[cat], byName = n => G.items.find(p => p.n === n), nm = p => p.n;
  const tiers = Object.keys(GEAR_TIER).filter(t => G.items.some(p => p.t === t));
  app.innerHTML = `${head}
    <section><h2 class="h2">${C[2]} 고르는 팁</h2>
      <div class="gtype">${G.types.map(([ic, n, d, minus], i) => `<div class="grow" style="--i:${i}"><span>${ic}</span><b>${n}</b><p>${d}</p><small>− ${minus}</small></div>`).join('')}</div>
      ${gearRules(G.rules)}
      <h3 class="g-sh">수준별 추천</h3>${gearLevels(GEAR_TIPS[cat].map(([ic, lv, bud, need, picks]) => [ic, lv, '', bud, need, picks]), byName)}</section>
    <section><h2 class="h2">추천 ${C[2]} 베스트 3</h2>${gearBest(G.best.map(([n, why]) => [byName(n), why]))}</section>
    <section><h2 class="h2">가격 한눈에 보기</h2>${gearLadder(G.items, nm)}${gearRank(cat, G.items, nm)}</section>
    <section><h2 class="h2">가성비부터 선수용까지</h2>
      <div class="g-tl">${tiers.map((t, i) => `<div class="grow" style="--tc:${GEAR_TIER[t][1]};--i:${i}"><b>${GEAR_TIER[t][0]}</b><span>${G.items.filter(p => p.t === t).length}개</span><small>${GEAR_TIER[t][2]}</small></div>`).join('<i>→</i>')}</div>
      <div class="gi-grid" style="--cols:${gCols(G.items.length)}">${tiers.flatMap(t => G.items.filter(p => p.t === t)).map((p, i) => gearCard(p, i)).join('')}</div>
      <p class="note">가격은 2026년 11월 각 공식몰 표시가예요. 해외 공식몰 제품은 배송비·관세가 붙을 수 있고, 알리 제품은 판매자마다 가격이 달라요.</p></section>`;
  motion();
}
function viewGearWatch(head) {
  const W = id => WATCHES.find(w => w.id === id), nm = p => p.n;
  app.innerHTML = `${head}
    <section><h2 class="h2">수준별 시계 고르는 팁</h2>
      ${gearRules(WATCH_RULES)}
      ${gearLevels(WATCH_TIPS, W)}
      <h3 class="g-sh">추천 시계 베스트 3</h3>${gearBest(WATCH_BEST.map(id => [W(id), WATCH_BEST_WHY[id]]))}</section>
    <section><h2 class="h2">시장 점유율 · 판매량</h2>
      <div class="gw-kpi">
        <div class="grow"><b>${cnt(4, 'int', '−', '%')}</b><span>2026년 2분기 전 세계 스마트워치 출하 (전년 대비)</span></div>
        <div class="grow" style="--i:1"><b>${cnt(14, 'int', '+', '%')}</b><span>애플 출하 성장 — 상위 5개 중 1위</span></div>
        <div class="grow" style="--i:2"><b>${cnt(15, 'int', '', '%')}</b><span>가민 점유율 (옴디아) — 1년 새 11%에서 껑충</span></div></div>
      <div class="gw-ch">
        <div class="card"><h4>브랜드 점유율 · 전체</h4><div class="gw-cv"><canvas id="gwc1"></canvas></div><small>${WATCH_MKT.cp.src}</small></div>
        <div class="card"><h4>브랜드 점유율 · 스마트워치</h4><div class="gw-cv"><canvas id="gwc2"></canvas></div><small>${WATCH_MKT.om.src}</small></div>
        <div class="card"><h4>출하량 증감</h4><div class="gw-cv"><canvas id="gwc3"></canvas></div><small>${WATCH_MKT.gr.src}</small></div></div>
      <p class="note">조사 기관마다 집계 기준이 달라요 — 카운터포인트는 키즈·보급형까지 포함, 옴디아는 화면 없는 밴드 등을 따로 집계해요. 수치는 판매가 아닌 "출하량" 기준이에요.</p></section>
    <section><h2 class="h2">순위 · 가격순 · 수준별 추천</h2>${gearRank('watch', WATCHES, nm)}${gearLadder(WATCHES, nm)}</section>
    <section><h2 class="h2">브랜드별 최신 모델</h2>
      ${Object.entries(WATCH_BRANDS).map(([k, B]) => `<div class="gwb" style="--bc:${B.c}">
        <div class="gwb-h"><b>${B.n}</b><span>${B.os}</span></div>
        <div class="gwb-pc"><div><h5>👍 장점</h5><ul>${B.pros.map(x => `<li>${x}</li>`).join('')}</ul></div><div><h5>👎 단점</h5><ul>${B.cons.map(x => `<li>${x}</li>`).join('')}</ul></div></div>
        <div class="gi-grid" style="--cols:${gCols(WATCHES.filter(w => w.wb === k).length)}">${WATCHES.filter(w => w.wb === k).map((p, i) => gearCard(p, i, B.n)).join('')}</div></div>`).join('')}
      <p class="note">가격은 2026년 11월 공식몰 정가예요 (할인가 별도). 코로스·순토·어메이즈핏은 국내 공식 판매가 확인되지 않아 해외 공식몰 가격이에요. 갤럭시 핏4는 아직 공식 출시 전이에요.</p></section>`;
  motion();
  gearWatchCharts();
}
function gearWatchCharts() {
  const make = () => {
    if (!chartBase()) return;
    const dn = (id, D) => charts.push(new Chart($(id), { type: 'doughnut', data: { labels: D.d.map(x => x[0]), datasets: [{ data: D.d.map(x => x[1]), backgroundColor: D.d.map(x => x[2]), borderColor: tok('--card'), borderWidth: 2 }] },
      options: { maintainAspectRatio: false, cutout: '58%', animation: { animateRotate: true, duration: 1400 }, plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } }, tooltip: { callbacks: { label: c => ` ${c.label} ${c.raw}%` } } } } }));
    dn('#gwc1', WATCH_MKT.cp); dn('#gwc2', WATCH_MKT.om);
    const g = WATCH_MKT.gr.d;
    charts.push(new Chart($('#gwc3'), { type: 'bar', data: { labels: g.map(x => x[0]), datasets: [{ data: g.map(x => x[1]), backgroundColor: g.map(x => x[1] >= 0 ? '#16a34a' : '#dc2626'), borderRadius: 6 }] },
      options: { indexAxis: 'y', maintainAspectRatio: false, animation: { duration: 1400 }, plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => ` ${c.raw > 0 ? '+' : ''}${c.raw}%` } } }, scales: { x: { grid: { color: tok('--line') }, ticks: { callback: v => v + '%' } }, y: { grid: { display: false } } } } }));
  };
  const box = app.querySelector('.gw-ch'); if (!box) return;
  if (!('IntersectionObserver' in window)) return make();
  const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); make(); } }, { rootMargin: '0px 0px -10% 0px' });
  io.observe(box);
}
