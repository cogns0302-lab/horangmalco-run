/* =========================================================
   호랑말코 러닝화 데이터
   - 모델/분류/가격: 참고 스프레드시트(26년 6월 기준 정가)
   - 점수/무게/드롭: RunRepeat 리뷰 기준 참고치(버전별 변동 가능)
   ========================================================= */

const CATS = {
  FR: { name: '플래그십 레이싱화', use: 'PB · 10~42km', color: '#e11d48', desc: '브랜드 최상위 카본 레이싱화. 가장 가볍고 반발력이 강해 기록 경신용 대회화로 쓰입니다.' },
  CR: { name: '카본 레이싱화', use: '대회 · 하프~풀', color: '#f97316', desc: '카본 플레이트 + 고반발 폼 조합. 플래그십보다 안정적이고 내구성이 좋아 대회와 고강도 훈련에 두루 쓰입니다.' },
  LR: { name: '초경량 레이싱화', use: '단거리 · 10~20km', color: '#eab308', desc: '최소한의 무게로 빠른 턴오버를 돕는 레이싱화. 5km·10km·하프 기록용으로 적합합니다.' },
  ST: { name: '슈퍼트레이너 (플레이트O)', use: '템포 · LSD 5~20km', color: '#8b5cf6', desc: '플레이트를 넣은 훈련용 고반발 러닝화. 대회화의 느낌을 훈련에서 내구성 있게 즐길 수 있습니다.' },
  SN: { name: '슈퍼트레이너 (플레이트X)', use: '템포 · 롱런', color: '#6366f1', desc: '플레이트 없이 고반발 폼만으로 빠름과 편안함을 함께 주는 만능형. 러너 한 켤레로 많은 걸 하고 싶을 때.' },
  MX: { name: '맥스쿠션화', use: '리커버리 · LSD', color: '#0ea5e9', desc: '최대 두께의 미드솔로 충격을 흡수. 회복주, 장거리 LSD, 체중이 있는 러너에게 좋습니다.' },
  CU: { name: '쿠션화', use: '데일리 · 롱런', color: '#14b8a6', desc: '부드럽고 편안한 쿠셔닝 중심의 훈련화. 매일 신기 좋은 편안함이 강점입니다.' },
  SB: { name: '안정화', use: '과내전 · 초보', color: '#22c55e', desc: '발이 안쪽으로 무너지는 과내전을 잡아주는 구조. 평발·초보·체중 있는 러너에게 부상 예방에 도움.' },
  DY: { name: '데일리', use: '입문 · 조깅', color: '#64748b', desc: '가성비와 범용성이 좋은 기본 러닝화. 입문자 첫 러닝화나 매일 조깅용으로 무난합니다.' },
};

const REGIONS = [
  ['asia', '아시아', ['asics', 'mizuno', 'lining', 'anta', 'xtep', 'd361', 'prospecs', 'fila']],
  ['europe', '유럽', ['adidas', 'puma', 'on', 'salomon']],
  ['usa', '미국', ['nike', 'nb', 'brooks', 'saucony', 'hoka', 'ua']],
];
const BRANDS = {
  nike:    { name: 'NIKE', ko: '나이키', color: '#111827', accent: '#c6f432', grad: ['#4c1d95', '#7c3aed'], founded: 1964, country: '미국', founder: '필 나이트 · 빌 바우어만', revenue: 51.4, share: 30, hq: '오리건주 비버턴',
    site: 'https://www.nike.com/kr/', videos: [["QKiFCLbDth8","당신이 몰랐던 나이키(NIKE)의 역사","세상의모든지식",74],["s8okK1e-yBo","예측이 틀려도 성공할 수 있다는 증거, 나이키 스토리","14F 일사에프",133],["zjlnRGv4ugw","나이키 창업 스토리 [슈독 SHOE DOG]","김지윤의 지식Play",37]],
    history: [[1964, '블루 리본 스포츠 창립 — 오니츠카 타이거 수입 판매'], [1971, '"Nike" 브랜드·스우시 로고 탄생 (디자인 비용 35달러)'], [1972, '와플 솔 — 와플 기계로 만든 아웃솔'], [1979, '에어 쿠셔닝 첫 적용 (테일윈드)'], [1983, '페가수스 첫 출시 — 지금까지 이어지는 최장수 러닝화'], [1988, '"Just Do It" 슬로건 등장'], [2017, '베이퍼플라이 4% & Breaking2 프로젝트 — 카본 레이싱화 시대 개막'], [2019, '킵초게, 알파플라이 프로토타입으로 마라톤 2시간 벽 돌파 (1:59:40)'], [2024, '페가수스 41·보메로 18로 ReactX 폼 확대']] },
  adidas:  { name: 'ADIDAS', ko: '아디다스', color: '#0f172a', accent: '#a3e635', grad: ['#134e4a', '#0f766e'], founded: 1949, country: '독일', founder: '아돌프 "아디" 다슬러', revenue: 25.6, share: 18, hq: '헤르초게나우라흐',
    site: 'https://www.adidas.co.kr/', videos: [["zITfWF7dMbw","피 터지게 싸운 형제 재벌, 아디다스 이야기","소비더머니",63],["FKCDQmq6hJk","당신이 몰랐던 아디다스의 역사 통합편","세상의모든지식",15],["9Fnwzgy1dTo","스포츠 패션 아이콘! 아디다스의 역사","TAGGER",2]],
    history: [[1924, '다슬러 형제 신발 공장 설립'], [1949, '형제 결별 후 아디 다슬러가 아디다스 설립, 3선 로고 등록'], [1954, '스터드 축구화로 서독 월드컵 우승 ("베른의 기적")'], [2013, '부스트(BOOST) 폼 출시 — 쿠셔닝 혁신'], [2015, '울트라부스트 출시, 러닝·라이프스타일 동시 히트'], [2021, '아디오스 프로 & 에너지로드(ENERGYRODS) 공개'], [2023, '아디오스 프로 EVO 1 — 138g 초경량, 티지스트 아세파 여자 마라톤 세계기록'], [2024, '아디오스 프로 4·EVO SL로 라이트스트라이크 프로 확대']] },
  asics:   { name: 'ASICS', ko: '아식스', color: '#1e3a8a', accent: '#f43f5e', grad: ['#0b1d4f', '#1e3a8a'], founded: 1949, country: '일본', founder: '오니츠카 기하치로', revenue: 4.5, share: 6, hq: '고베',
    site: 'https://www.asics.co.kr/', videos: [["yl-0yH5aYCU","나이키에 밀리던 아식스가 대반전을 일으킨 이유","크랩 KLAB",114],["LrSmuXq4DLw","나이키를 낳은(?) 아식스의 역사","세상의모든지식",39],["eS4eicizC-E","숨겨진 의미가 많은 브랜드 아식스 이야기","다나옷",33]],
    history: [[1949, '오니츠카 주식회사 설립 (고베)'], [1953, '마라톤화 "마라톤 타비" 개발'], [1977, '오니츠카·GTO·지에르프 합병 → ASICS ("건강한 신체에 건강한 정신이")'], [1986, 'GEL 쿠셔닝 기술 첫 도입'], [1993, 'GT-2000 시리즈의 전신 GT-2000 출시'], [1993, '젤 카야노 첫 출시 — 대표 안정화'], [2021, '메타스피드 스카이·엣지로 카본 레이싱 본격 경쟁'], [2024, '메타스피드 파리 시리즈, FF BLAST MAX 폼 확대']] },
  hoka:    { name: 'HOKA', ko: '호카', color: '#0c4a6e', accent: '#38bdf8', grad: ['#1e1b4b', '#3730a3'], founded: 2009, country: '프랑스 (현 미국 데커스 소유)', founder: '니콜라 메르무드 · 장뤽 디아르', revenue: 2.2, share: 4, hq: '캘리포니아 고레타',
    site: 'https://www.hoka.com/', videos: [["DbNi6R5OfXE","힙한 러닝화의 대명사 HOKA의 역사","세상의모든지식",18],["T7iTm6_3tCE","미국에서 미친듯이 팔리는 못생긴 운동화 호카","매경 월가월부",38],["XendOxjSMSA","지구상 가장 편한 신발 브랜드 호카 이야기","타브랜드",18]],
    history: [[2009, '프랑스 안시에서 창립 — 다운힐 트레일용 맥스쿠션 콘셉트'], [2010, '첫 모델 Mafate 출시'], [2013, '데커스 브랜즈가 인수'], [2014, '클리프톤 1 출시 — 가벼운 맥스쿠션 대중화'], [2016, '본디 5·스피드고트로 울트라·트레일 시장 장악'], [2021, '로켓 X·마하 시리즈로 스피드 라인업 강화'], [2023, '매출 14억 달러 돌파, 빠르게 성장하는 러닝 브랜드'], [2024, '스카이워드 X·씨엘로 X1 2.0로 슈퍼 트레이너/레이싱 확장']] },
  nb:      { name: 'NEW BALANCE', ko: '뉴발란스', color: '#7f1d1d', accent: '#f97316', grad: ['#0f3b3e', '#155e63'], founded: 1906, country: '미국', founder: '윌리엄 J. 라일리', revenue: 7.8, share: 7, hq: '보스턴',
    site: 'https://www.nbkorea.com/', videos: [["Z6mnGBWZOK0","아빠 신발의 대반전, 뉴발란스","소비더머니",37],["1UzComqDvq0","뉴발란스는 어떻게 국내 2위 브랜드가 됐을까?","크랩 KLAB",27],["U787SGT5gtc","신발장 속 그 신발을 다시 보게 될 뉴발란스 이야기","다나옷",21]],
    history: [[1906, '아치 서포트(깔창) 회사로 시작'], [1960, '첫 러닝화 "Trackster" — 폭(Width) 사이즈 도입'], [1976, '320 모델이 러너스 월드 1위 선정'], [1982, '990 출시 — 100달러 러닝화 시대'], [2015, 'Fresh Foam 1080 — 데이터 기반 미드솔'], [2020, 'FuelCell RC Elite로 카본 레이싱화 진입'], [2023, 'SC Elite v3, 2024년 SC Elite v4 — 레이싱 라인업 고도화'], [2024, '매출 78억 달러, 역대 최고 성장']] },
  puma:    { name: 'PUMA', ko: '푸마', color: '#111827', accent: '#facc15', grad: ['#3b0764', '#6d28d9'], founded: 1948, country: '독일', founder: '루돌프 다슬러', revenue: 9.5, share: 6, hq: '헤르초게나우라흐',
    site: 'https://kr.puma.com/', videos: [["I_uxdsEkrPU","결코 무시할 수 없는 푸마의 역사","TAGGER",4],["U22Nj9Lmy_4","원수보다 못했던 형제의 전쟁, 아디다스와 푸마","일상경제학",1],["_kbje-h9Ih8","형제 간의 불화에서 이어온 70년의 경쟁","뇌말랑",0.2]],
    history: [[1948, '루돌프 다슬러가 형과 결별 후 푸마 설립'], [1968, '토미 스미스, 푸마 신고 멕시코 올림픽 200m 우승'], [1991, 'Disc 시스템 — 끈 없는 러닝화'], [2008, '우사인 볼트와 베이징 올림픽 100m 세계기록'], [2020, 'NITRO 폼 출시 — 러닝 재도약'], [2022, '디비에이트 나이트로 엘리트 2 호평'], [2024, '패스트-R 나이트로 엘리트 2 등 레이싱화 경쟁력 확보'], [2025, '벨로시티 나이트로 등 데일리화가 RunRepeat 상위권']] },
  saucony: { name: 'SAUCONY', ko: '써코니', color: '#7c2d12', accent: '#fb923c', grad: ['#0f172a', '#1e293b'], founded: 1898, country: '미국', founder: '에이브러햄 하이드', revenue: 0.5, share: 2, hq: '매사추세츠 월섬',
    site: 'https://www.saucony.com/', videos: [["PY9VM3BEfUo","써코니 — 출퇴근하며 듣는 브랜드 스토리","Sports Brand 101",0.7],["NTWy_CT9gwU","써코니 엔돌핀 라인업 총정리","런업TV",2],["k7jK7hvbmZA","써코니 첫 오프라인 매장 러닝화 라인업 설명","방구석 운동가 디어",1.5]],
    history: [[1898, '펜실베이니아 쿠츠타운에서 신발 회사로 출발'], [1910, '쏘코니 강(Saucony Creek)에서 이름 유래'], [1977, 'Jazz 출시, 러닝 붐과 함께 성장'], [2005, '울버린 월드와이드에 인수'], [2019, 'PWRRUN 폼 도입'], [2020, '엔돌핀 시리즈(스피드·프로·쉬프트) 출시 — 러너들 사이 돌풍'], [2023, '엔돌핀 엘리트 — PWRRUN HG 슈퍼폼'], [2024, '엔돌핀 스피드 4·라이드 17 등 인기 지속']] },
  mizuno:  { name: 'MIZUNO', ko: '미즈노', color: '#1e3a8a', accent: '#60a5fa', grad: ['#831843', '#be185d'], founded: 1906, country: '일본', founder: '미즈노 리하치', revenue: 1.5, share: 2, hq: '오사카',
    site: 'https://www.mizuno.com/', videos: [["_kdRKVz2vdQ","4분만에 알아보는 미즈노에 대한 11가지 사실","앤드류의 5분 대백과사전",0.4],["v_XMQ5e9W00","아이언의 명가 미즈노 100년의 역사","나쁜골프",2],["mRkx-CrBlJc","Mizuno History","Mizuno Europe",0.7]],
    history: [[1906, '오사카에서 미즈노 형제상회 설립'], [1924,'야구용품으로 일본 스포츠 산업 주도'], [1997, '웨이브(WAVE) 플레이트 기술 도입 — 쿠션+안정성'], [1997, '웨이브 라이더 첫 출시 — 장수 데일리화'], [2019, 'MIZUNO ENERZY 폼 개발'], [2022, '웨이브 리벨리온 프로 — 독특한 롤링 카본화'], [2024, '네오 비스타·하이퍼워프로 레이싱 라인업 리뉴얼']] },
  salomon: { name: 'SALOMON', ko: '살로몬', color: '#111111', accent: '#c4b5fd', grad: ['#1e1b4b', '#4338ca'], founded: 1947, country: '프랑스', founder: '프랑수아 살로몬', revenue: 0, share: 0, hq: '안시(Annecy)',
    site: 'https://www.salomon.com/ko-kr', videos: [["p8tMQecpPyo","지금 전세계에서 가장 뜨거운 아빠신발 브랜드 살로몬 이야기","브랜드보이 Brand Boy",11],["6OZzdfTMINE","등산화 살로몬은 어떻게 패션계의 블루칩이 되었을까?","찢어쓰",3],["wk1M6uMGGVg","4분만에 알아보는 살로몬에 대한 8가지 사실","앤드류의 5분 대백과사전",1]],
    history: [[1947, '프랑스 안시에서 톱날·스키 엣지 공방으로 출발'], [1972, '스키 바인딩 세계 1위 브랜드로 성장'], [1997, '아디다스에 인수'], [2005, '아머 스포츠(Amer Sports)에 인수'], [2006, '트레일 러닝화 스피드크로스 출시 — 트레일 러닝 대표 브랜드로'], [2023, '카본 레이싱화 S/LAB 판타즘 2로 로드 레이싱 공략'], [2026, '에어로 글라이드 4로 로드 데일리 강화']] },
  ua:      { name: 'UNDER ARMOUR', ko: '언더아머', color: '#1d1d1f', accent: '#e5e7eb', grad: ['#18181b', '#52525b'], founded: 1996, country: '미국', founder: '케빈 플랭크', revenue: 5.2, share: 0, hq: '메릴랜드주 볼티모어',
    site: 'https://www.underarmour.co.kr/', videos: [["NXY8VkjFif0","나이키를 위협할 거라 하지 않았나요? 언더아머의 끝없는 부진","비욘드 스포츠",262],["jRyi2ArWCl0","편견에 가려진 이 브랜드, 언더아머 이야기","다나옷",4],["Q_PpwxHsiS4","스포츠 브랜드의 새로운 강자 언더아머 [Under Armour Story]","TAGGER - 태거",9]],
    history: [[1996, '케빈 플랭크가 땀 배출 기능성 티셔츠로 창업'], [2006, '첫 풋웨어(미식축구 클리트) 출시'], [2018, 'HOVR 폼과 센서를 넣은 커넥티드 러닝화 HOVR 소닉·팬텀 출시'], [2020, '고무 아웃솔 없이 폼 하나로 만든 UA FLOW 기술 공개'], [2022, '첫 카본 레이싱화 FLOW 벨로시티 엘리트 출시'], [2025, '벨로시티 엘리트 2·인피니트 엘리트 2로 러닝 라인 강화']] },
  brooks:  { name: 'BROOKS', ko: '브룩스', color: '#1e3a8a', accent: '#38bdf8', grad: ['#1e293b', '#334155'], founded: 1914, country: '미국', founder: '존 브룩스 골드버그', revenue: 1.25, share: 3, hq: '시애틀',
    site: 'https://www.brooksrunning.co.kr/', videos: [["iFsRCNEr5RE","지금 존재하는 모든 러닝화는 이 브랜드에서 파생됐다, 브룩스 이야기","다나옷",9],["he58KSivTZ4","브룩스 러닝 — 출퇴근하며 듣는 브랜드 스토리","Sports Brand 101",1]],
    history: [[1914, '필라델피아에서 발레·수영화 회사로 시작'], [1975, '빌라노바 러닝화가 러너스 월드 1위'], [2001, '러닝 전문 브랜드로 전환 선언 ("Run Happy")'], [2006, '버크셔 해서웨이 계열 편입'], [2017, 'DNA AMP·DNA LOFT 등 폼 기술 다변화'], [2021, 'DNA FLASH(질소 주입) — 하이페리온 시리즈'], [2024, '고스트 16·글리세린 21 등 미국 러닝 매장 점유율 1위권']] },
  on:      { name: 'ON', ko: '온러닝', color: '#111827', accent: '#e5e7eb', grad: ['#18181b', '#3f3f46'], founded: 2010, country: '스위스', founder: '올리비에 베른하르트 외 2인', revenue: 2.6, share: 3, hq: '취리히',
    site: 'https://www.on.com/ko-kr', videos: [["sIKfA-9hcOQ","역사상 가장 빠르게 성장하는 러닝화 브랜드 on 이야기","브랜드보이",19],["doIP69JG4Jk","수평 쿠셔닝으로 미국에서 대박난 운동화 온 러닝","매경 월가월부",34],["qPhdlf4muEQ","나이키를 긴장시키는 온러닝 브랜드 스토리","타브랜드",7]],
    history: [[2010, '철인3종 챔피언 올리비에 베른하르트 등 3인이 취리히에서 창업'], [2010, 'CloudTec® — 구멍 뚫린 "구름" 아웃솔'], [2019, '로저 페더러 투자·파트너십'], [2020, '헬리온 슈퍼폼·스피드보드 확대'], [2021, '뉴욕증권거래소 상장'], [2023, '클라우드붐 에코 3 — 카본 레이싱 진입'], [2024, '클라우드붐 스트라이크·클라우드몬스터 하이퍼 출시']] },
  lining:  { name: 'LI-NING', ko: '리닝', color: '#111827', accent: '#facc15', grad: ['#7f1d1d', '#dc2626'], founded: 1990, country: '중국', founder: '리닝 (체조 올림픽 금메달리스트)', revenue: 4.0, share: 1, hq: '베이징',
    site: 'https://www.lining.com/', videos: [['-3YFIEYWt_Y', '이제 중국 러닝화 가성비로 신는 시대는 끝났다, 적토끼 9 울트라 리뷰', '러너임바', 7], ['HfbZN7SB5k0', '리닝 레드헤어9 울트라 리뷰 — 가성비 최고 슈퍼트레이너', '안은태', 4], ['epI7OTmtP_o', '오사코 스구루가 신기록을 세울 수밖에 없었던 신발', '슈파인더맨', 1.9], ['BxKTer99LlQ', '리닝 페이디안 6 엘리트 리뷰 — 일본 남자 마라톤 신기록 신발', '달리기를사랑하는남자', 1.8]],
    history: [[1990, '체조 올림픽 3관왕 리닝이 자신의 이름으로 브랜드 창업'], [2004, '홍콩 증권거래소 상장'], [2008, '베이징 올림픽 개막식에서 리닝이 성화 최종 점화'], [2018, '"중국리닝" 컬렉션으로 뉴욕 패션위크 데뷔, 브랜드 재도약'], [2023, '코펜하겐 마라톤 상위 3명이 모두 리닝을 신고 입상'], [2025, '오사코 스구루가 페이뎬 6 엘리트를 신고 일본 기록 2:04:55 수립']] },
  anta:    { name: 'ANTA', ko: '안타', color: '#111827', accent: '#f87171', grad: ['#1f2937', '#b91c1c'], founded: 1991, country: '중국', founder: '딩스중', revenue: 9.8, share: 2, hq: '푸젠성 진장',
    site: 'https://www.anta.com/', videos: [['zYZfvi4ZXYI', '중국인들이 나이키 거르고 찾는다는 브랜드의 정체', '스브스뉴스', 40.9], ['D-a1v15FnRc', '차이나머니 어디까지? 중국 안타 이야기', 'KBS News', 3.7], ['JeEdL8f8HoU', '안타 C202 7세대 리뷰', '후라이남', 1.4], ['dHkNT4DH7Iw', '안타 존2 90 러닝화 리뷰 — 가성비 슈퍼트레이너', '강해져라 윤복치', 0.6]],
    history: [[1991, '푸젠성 진장에서 신발 공장으로 창업'], [2007, '홍콩 증권거래소 상장'], [2009, '휠라(FILA)의 중국 사업권 인수'], [2019, '살로몬·아크테릭스를 보유한 아머스포츠 인수 컨소시엄 주도'], [2025, 'RunRepeat이 안타 존2 90에 91점(Superb), 마하 6 프로에 90점 부여']] },
  xtep:    { name: 'XTEP', ko: '엑스텝', color: '#111827', accent: '#fb923c', grad: ['#7c2d12', '#ea580c'], founded: 2001, country: '중국', founder: '딩수이보', revenue: 1.9, share: 1, hq: '푸젠성 샤먼',
    site: 'https://www.xtep.com/', videos: [['j-UBq-gtQag', 'XTEP 160X 6.0 — 슈퍼트레이너를 뛰어넘다', '슈파인더맨', 1.7], ['_B4bDUvHlYc', '러닝화 가이드 Xtep', '슈파인더맨', 1.5], ['A6e3nvhEb0Y', 'Xtep 160X 6.0 리뷰', '달리기를사랑하는남자', 1.5], ['qkpXxFQbyYY', '엑스텝 160X 8.0 PRO 리뷰', '후라이남', 0.7]],
    history: [[2001, '스포츠 브랜드 엑스텝 출범'], [2008, '홍콩 증권거래소 상장'], [2019, '써코니·머렐의 중국 사업 합작 시작'], [2019, '카본 레이싱 라인 160X 출시 — 중국 마라톤 엘리트·마스터즈의 대표 레이싱화로 성장']] },
  d361:    { name: '361°', ko: '361도', color: '#111827', accent: '#38bdf8', grad: ['#0c4a6e', '#0284c7'], founded: 2003, country: '중국', founder: '푸젠성 진장 출신 창업가들', revenue: 1.4, share: 1, hq: '푸젠성 샤먼',
    site: 'https://www.361sport.com/', videos: [['OmeRxqKFqzY', '요즘 가장 핫한 러닝화 2종 — 레일리 2.0과 메가 3 프로', '러너임바', 8.4], ['PrYUTsklDAE', '361 메가3 프로 리뷰 (생태계교란종)', '후라이남', 5.2], ['QudbDKVDBkg', '요즘 중국 러닝화가 무서워졌습니다 — 361도 메가 3 프로', '방구석 운동가 디어', 5.1], ['Bi-4Z1iuJfc', '361 메가3 프로 솔직 리뷰', '헤비러너', 2.7]],
    history: [[2003, '"360도 최선에 1도 더"라는 뜻의 361°로 창업'], [2009, '홍콩 증권거래소 상장'], [2010, '광저우 아시안게임 공식 후원사'], [2025, '메가 3 프로가 가성비 러닝화로 국내 러너들 사이에서 화제']] },
  prospecs: { name: 'PRO-SPECS', ko: '프로스펙스', color: '#111827', accent: '#93c5fd', grad: ['#0b2a6f', '#1d4ed8'], founded: 1981, country: '한국', founder: '국제상사 (국제그룹)', revenue: null, share: 0, hq: '서울 (LS네트웍스)',
    site: 'https://www.prospecs.com/', videos: [['89FsfFrMc2Q', '프로스펙스를 만든 재벌의 몰락, 국제그룹 이야기', '소비더머니', 25.8], ['2OREd68wR_M', '나이키 vs 프로스펙스 80년대 운동화 전쟁', '팩스토리', 49.9], ['L_xiWbS_gDQ', '프로-스펙스 신상 러닝화? 솔직히 말할게요', '마라닉TV', 5], ['jd7wzF24vFM', '프로-스펙스 인피니트 러시 리뷰 — 기대 이상', '달리기를사랑하는남자', 2.1], ['ylzDuP27Zcw', '초보러너에게 좋은 안정화 (프로-스펙스 듀플렉스 GF)', '달리기를사랑하는남자', 1]],
    history: [[1981, '국제상사가 국내 첫 자체 스포츠 브랜드 프로스펙스 출시'], [1985, '모기업 국제그룹 해체 — 이후 국제상사가 브랜드 유지'], [2007, 'LS그룹이 국제상사를 인수해 LS네트웍스로 출범'], [2010, '"W 워킹화"가 큰 인기를 끌며 워킹화 시장 개척'], [2025, '브랜드 첫 PEBA 카본 레이싱화 인피니트 러쉬 출시'], [2026, '"모두를 위한 스포츠" 리브랜딩, 인피니트 러시 Rev. 출시']] },
  fila:     { name: 'FILA', ko: '휠라', color: '#0b1f4d', accent: '#ef4444', grad: ['#0b1f4d', '#1e3a8a'], founded: 1911, country: '한국 (이탈리아에서 탄생)', founder: '필라 형제', revenue: null, share: 0, hq: '서울',
    site: 'https://www.fila.co.kr/', videos: [['tYu8cFDBS_M', '다니던 회사를 사버린 한국인, 멈추지 않는 휠라 이야기', '소비더머니', 296], ['QYlKQz3-EYk', '휠라 스피드템포 플러스 리뷰', '런업TV', 37.2], ['iQgb-1tW3w4', '100년 휠라 몰락의 전말', '더시프트', 21.3], ['NBkKqkJigfw', '이탈리아 브랜드 휠라를 한국이 인수한 이야기', '마케팅의 모든 것', 3.1]],
    history: [[1911, '이탈리아 비엘라에서 필라 형제가 니트웨어 회사로 창업'], [1970, '테니스 스타 비에른 보리의 경기복으로 세계적 스포츠 브랜드로 성장'], [1991, '휠라코리아 설립'], [2007, '휠라코리아가 글로벌 휠라 브랜드를 인수 — 한국 회사가 된 휠라'], [2011, '골프 브랜드 타이틀리스트의 아쿠쉬네트 인수'], [2026, '카본 레이싱화 레이서 카본 3·스피드템포 플러스로 러닝 라인 강화']] },
};

/* S(brand, 한글명, 영문명, 분류, 가격(천원), 점수, 무게g, 드롭mm, 폼, 핵심 한줄, [장점3], [아쉬운점], 베스트셀러여부) */
const SHOES = [];
/* RunRepeat 실측값 (2026-11 확인): id → [점수, 무게g, 드롭mm, 리뷰 경로] */
const RR_LAB = {"salomon-s-lab-phantasm-2":[80,213,5.1,"/salomon-s-lab-phantasm-2"],"salomon-spectur-2":[73,258,11,"/salomon-spectur-2"],"salomon-s-lab-spectur":[77,258,10.7,"/salomon-s-lab-spectur"],"salomon-aero-glide-4":[92,255,11.7,"/salomon-aero-glide-4"],"nike-alphafly-4":[94,190,6.2,"/nike-alphafly-4"],"nike-pegasus-plus-2":[85,247,10.4,"/nike-pegasus-plus-2"],"nike-pegasus-42":[80,286,14,"/nike-pegasus-42"],"adidas-adizero-adios-pro-5":[91,176,5.6,"/adidas-adizero-adios-pro-5"],"adidas-supernova-prima-3":[89,289,11.2,"/adidas-supernova-prima-3"],"adidas-supernova-solution-3":[80,281,8.3,"/adidas-supernova-solution-3"],"asics-metaspeed-sky-tokyo":[92,163,6,"/asics-metaspeed-sky-tokyo"],"asics-metaspeed-edge-tokyo":[92,159,6.9,"/asics-metaspeed-edge-tokyo"],"asics-sonicblast-2":[85,230,7.5,"/asics-sonicblast-2"],"asics-gt-2000-15":[91,252,8.2,"/asics-gt-2000-15"],"asics-novablast-6":[93,249,7.1,"/asics-novablast-6"],"hoka-cielo-x1-3-0":[91,193,13.4,"/hoka-cielo-x-1-3-0"],"hoka-skyward-x-2":[87,286,7.6,"/hoka-skyward-x-2"],"hoka-mach-7":[90,224,9.4,"/hoka-mach-7"],"hoka-clifton-11":[85,266,11.7,"/hoka-clifton-11"],"hoka-arahi-9":[79,278,10.3,"/hoka-arahi-9"],"nb-supercomp-elite-v6":[87,190,13.9,"/new-balance-super-comp-elite-v-6"],"puma-velocity-nitro-5":[89,238,5.2,"/puma-velocity-nitro-5"],"saucony-endorphin-elite-3":[92,210,5.7,"/saucony-endorphin-elite-3"],"saucony-endorphin-pro-5":[91,215,8.7,"/saucony-endorphin-pro-5"],"saucony-hurricane-26":[91,272,5.9,"/saucony-hurricane-26"],"saucony-guide-19":[84,298,6,"/saucony-guide-19"],"mizuno-wave-rebellion-flash-3":[86,244,7.5,"/mizuno-wave-rebellion-flash-3"],"mizuno-neo-vista-3":[83,266,8.5,"/mizuno-neo-vista-3"],"mizuno-wave-inspire-22":[83,280,7.6,"/mizuno-wave-inspire-22"],"mizuno-wave-rider-30":[83,266,9.1,"/mizuno-wave-rider-30"],"brooks-hyperion-elite-6":[86,193,10.6,"/brooks-hyperion-elite-6"],"brooks-hyperion-max-4":[86,292,9.6,"/brooks-hyperion-max-4"],"brooks-ghost-max-4":[83,286,9,"/brooks-ghost-max-4"],"on-lightspray-cloudboom-strike-2":[88,167,2.7,"/on-light-spray-cloudboom-strike-2"],"on-cloudmonster-3-hyper":[90,264,9.2,"/on-cloudmonster-3-hyper"],"on-cloudmonster-3":[82,301,6.4,"/on-cloudmonster-3"],"on-cloudrunner-3":[76,298,8.1,"/on-cloudrunner-3"],"nike-structure-plus":[87,292,11.2,"/nike-structure-plus"],"nike-vomero-premium":[86,326,8.8,"/nike-vomero-premium"],"nb-supercomp-rebel":[94,207,8.8,"/new-balance-super-comp-rebel"],"puma-deviate-pure-nitro":[93,215,9.6,"/puma-deviate-pure-nitro"],"saucony-endorphin-azura":[91,241,8,"/saucony-endorphin-azura"],"ua-velociti-elite-2":[83,257,6,"/under-armour-velociti-elite-2"],"ua-infinite-elite-2":[80,288,7,"/under-armour-infinite-elite-2"],"ua-infinite-pro":[81,305,8.3,"/under-armour-infinite-pro"],"ua-hovr-sonic-6":[80,286,7,"/under-armour-hovr-sonic-6"],"ua-charged-assert-10":[72,298,9.4,"/under-armour-charged-assert-10"],"anta-mach-6-pro":[90,201,3.1,"/anta-mach-6-pro"],"anta-zone-2-90":[91,196,7.2,"/anta-zone-2-90"],"nike-streakfly-2":[88,128,3.7,"/nike-streakfly-2"],"nike-alphafly-3":[93,201,8.5,"/nike-alphafly-3"],"nike-vaporfly-4":[93,166,8.6,"/nike-vaporfly-4"],"nike-zoom-fly-6":[88,248,9.6,"/nike-zoom-fly-6"],"nike-pegasus-plus":[84,244,9.4,"/nike-pegasus-plus"],"nike-vomero-plus":[91,289,9.6,"/nike-vomero-plus"],"nike-vomero-18":[90,298,13.9,"/nike-vomero-18"],"nike-pegasus-premium":[83,308,11.8,"/nike-pegasus-premium"],"nike-structure-26":[85,296,10.1,"/nike-structure-26"],"nike-pegasus-41":[85,281,11.4,"/nike-pegasus-41"],"nike-winflo-12":[85,301,10.6,"/nike-winflo-12"],"adidas-adizero-adios-pro-evo-3":[91,99,5.9,"/adidas-adizero-adios-pro-evo-3"],"adidas-adizero-adios-pro-4":[93,200,8.1,"/adidas-adizero-adios-pro-4"],"nike-invincible-3":[83,284,9.6,"/nike-zoom-x-invincible-run-flyknit-3"],"nike-infinity-run-4":[82,316,9.8,"/nike-infinityrn-4"],"adidas-adizero-takumi-sen-11":[86,184,6.9,"/adidas-adizero-takumi-sen-11"],"adidas-adizero-adios-9":[85,176,6.2,"/adidas-adizero-adios-9"],"adidas-adizero-boston-13":[88,254,6,"/adidas-adizero-boston-13"],"adidas-adizero-evo-sl":[94,223,8,"/adidas-adizero-evo-sl"],"adidas-supernova-prima":[84,281,8.9,"/adidas-supernova-prima"],"adidas-supernova-solution-2":[84,261,10.2,"/adidas-supernova-solution-2"],"adidas-adizero-sl2":[85,245,8.2,"/adidas-adizero-sl2"],"adidas-ultraboost-5x":[85,266,10.4,"/adidas-ultraboost-5-x"],"adidas-supernova-rise-3":[87,264,7.8,"/adidas-supernova-rise-3"],"asics-metaspeed-ray":[90,129,9.8,"/asics-metaspeed-ray"],"asics-metaspeed-sky-paris":[88,183,6.5,"/asics-metaspeed-sky-paris"],"asics-sonicblast":[83,255,9,"/asics-sonicblast"],"asics-magic-speed-5":[86,201,8.7,"/asics-magic-speed-5"],"asics-superblast-3":[94,235,8.1,"/asics-superblast-3"],"asics-megablast":[95,218,9.9,"/asics-megablast"],"asics-gel-nimbus-28":[86,278,8.1,"/asics-gel-nimbus-28"],"asics-gel-kayano-33":[86,298,8.5,"/asics-gel-kayano-33"],"asics-novablast-5":[93,254,7.4,"/asics-novablast-5"],"asics-gt-2000-14":[87,269,8.7,"/asics-gt-2000-14"],"hoka-rocket-x-3":[88,220,10,"/hoka-rocket-x-3"],"asics-gel-contend-9":[74,275,7.8,"/asics-gel-contend-9"],"hoka-skyward-x":[86,315,9.2,"/hoka-skyward-x"],"hoka-mach-x-3":[83,264,9.5,"/hoka-mach-x-3"],"hoka-bondi-9":[86,303,9.1,"/hoka-bondi-9"],"hoka-cielo-x1-2-0":[88,208,10.7,"/hoka-cielo-x-1-2-0"],"hoka-clifton-10":[86,275,12.4,"/hoka-clifton-10"],"hoka-mach-6":[87,232,9.6,"/hoka-mach-6"],"hoka-skyflow":[83,282,8.7,"/hoka-skyflow"],"hoka-gaviota-6":[81,283,7.3,"/hoka-gaviota-6"],"hoka-arahi-8":[83,259,11.3,"/hoka-arahi-8"],"hoka-kawana-2":[78,298,5.2,"/hoka-kawana-2"],"hoka-rincon-4":[83,231,9.4,"/hoka-rincon-4"],"nb-fuelcell-supercomp-elite-v5":[85,198,10.7,"/new-balance-fuel-cell-super-comp-elite-v-5"],"nb-fuelcell-supercomp-pacer-v2":[84,200,7.5,"/new-balance-fuel-cell-super-comp-pacer-v-2"],"nb-fuelcell-supercomp-trainer-v3":[89,278,7.3,"/new-balance-fuel-cell-super-comp-trainer-v-3"],"nb-fresh-foam-x-more-v6":[86,302,3.3,"/new-balance-fresh-foam-x-more-v-6"],"nb-fuelcell-rebel-v5":[86,220,6.3,"/new-balance-fuel-cell-rebel-v-5"],"nb-fresh-foam-x-1080-v15":[91,255,6.4,"/new-balance-1080-v-15"],"nb-fresh-foam-x-860-v15":[85,332,7.6,"/new-balance-fresh-foam-x-860-v-15"],"nb-fuelcell-propel-v5":[82,269,6.7,"/new-balance-fuelcell-propel-v5"],"nb-fresh-foam-x-vongo-v6":[84,312,5.6,"/new-balance-fresh-foam-x-vongo-v-6"],"puma-fast-r-nitro-elite-3":[92,173,8.3,"/puma-fast-r-nitro-elite-3"],"puma-deviate-nitro-elite-4":[89,173,8.9,"/puma-deviate-nitro-elite-4"],"nb-fresh-foam-x-880-v15":[82,286,4.3,"/new-balance-fresh-foam-x-880-v-15"],"puma-deviate-nitro-4":[85,247,7,"/puma-deviate-nitro-4"],"puma-foreverrun-nitro-2":[85,291,8.8,"/puma-foreverrun-nitro-2"],"puma-velocity-nitro-4":[93,224,9.7,"/puma-velocity-nitro-4"],"puma-magnify-nitro-3":[91,261,11.5,"/puma-magnify-nitro-3"],"saucony-endorphin-elite-2":[91,197,7.5,"/saucony-endorphin-elite-2"],"saucony-endorphin-pro-4":[90,220,9.5,"/saucony-endorphin-pro-4"],"puma-magmax-nitro-2":[83,269,10.5,"/puma-mag-max-nitro-2"],"saucony-endorphin-speed-5":[94,241,10.6,"/saucony-endorphin-speed-5"],"saucony-endorphin-trainer":[82,285,6.9,"/saucony-endorphin-trainer"],"saucony-triumph-24":[92,258,8,"/saucony-triumph-24"],"saucony-hurricane-25":[90,286,7.1,"/saucony-hurricane-25"],"saucony-tempus-2":[93,264,10.1,"/saucony-tempus-2"],"saucony-guide-18":[82,278,8.3,"/saucony-guide-18"],"saucony-ride-19":[88,278,8.5,"/saucony-ride-19"],"saucony-kinvara-16":[79,207,4.5,"/saucony-kinvara-16"],"mizuno-wave-rebellion-pro-3":[84,227,5.4,"/mizuno-wave-rebellion-pro-3"],"mizuno-wave-rebellion-flash-2":[82,239,2.9,"/mizuno-wave-rebellion-flash-2"],"mizuno-neo-vista-2":[82,264,8.5,"/mizuno-neo-vista-2"],"mizuno-neo-zen-2":[79,237,5,"/mizuno-neo-zen-2"],"mizuno-wave-sky-9":[86,295,6.2,"/mizuno-wave-sky-9"],"mizuno-wave-inspire-21":[82,286,12.9,"/mizuno-wave-inspire-21"],"mizuno-wave-rider-29":[85,258,8.3,"/mizuno-wave-rider-29"],"brooks-hyperion-elite-5":[87,204,11.2,"/brooks-hyperion-elite-5"],"brooks-hyperion-max-3":[85,283,10.6,"/brooks-hyperion-max-3"],"brooks-glycerin-max-2":[85,318,8.1,"/brooks-glycerin-max-2"],"brooks-glycerin-23":[85,303,8.2,"/brooks-glycerin-23"],"brooks-adrenaline-gts-25":[86,295,10.2,"/brooks-adrenaline-gts-25"],"brooks-ghost-max-3":[83,303,7.3,"/brooks-ghost-max-3"],"brooks-hyperion-3":[78,244,11.3,"/brooks-hyperion-3"],"on-cloudboom-strike":[90,201,3.2,"/on-cloudboom-strike"],"brooks-ghost-18":[86,289,12.2,"/brooks-ghost-18"],"on-cloudmonster-hyper":[79,258,6.7,"/on-cloudmonster-hyper"],"on-cloudmonster-2":[85,292,6.6,"/on-cloudmonster-2"],"on-cloudboom-echo-3":[84,225,10.2,"/on-cloudboom-echo-3"],"on-cloudeclipse":[84,272,9.4,"/on-cloudeclipse"],"on-cloudsurfer-2":[80,254,10.4,"/on-cloudsurfer-2"],"on-cloudrunner-2":[82,275,8.5,"/on-cloudrunner-2"]};
function S(b, ko, en, c, p, s, w, d, f, head, pros, cons, bs, extra) {
  const id = (b + '-' + en).toLowerCase().replace(/[^a-z0-9]+/g, '-'), lab = RR_LAB[id];
  const o = { id, b, ko, en, c, p, s, w, d, f, head, pros, cons, bs: !!bs, ...(extra || {}) };
  if (lab) { o.s = lab[0]; o.w = lab[1]; o.d = lab[2]; o.rr = lab[3]; o.lab = true; }
  else if (o.s != null && !o.rr) o.est = true;   // RunRepeat 미리뷰 — 참고용 추정치
  SHOES.push(o);
}

/* ---------- NIKE ---------- */
S('nike', '알파플라이 4', 'Alphafly 4', 'FR', 339, null, null, null, 'ZoomX + 에어줌 유닛 + 카본', '26년 9월 출시 — 더 가벼워진 나이키 최강 레이싱화', ['실측 190g, 전작(201g)보다 확 가벼워진 무게','ZoomX와 에어 포드의 압도적 반발력','RunRepeat 94점 — 나이키 러닝화 최고점'], ['비싼 가격','좁은 앞볼'], 1);
S('nike', '베이퍼플라이 4', 'Vaporfly 4', 'CR', 309, 90, 185, 6, 'ZoomX', '가볍고 빠른 카본 레이싱화의 원조', ['166g(실측)까지 가벼워진 무게', 'ZoomX 특유의 통통 튀는 반발감', '10km~풀코스 모두 커버하는 범용성'], ['내구성이 높지 않음', '발볼 넓은 러너에겐 타이트'], 1);
S('nike', '스트릭플라이 2', 'Streakfly 2', 'LR', 219, 86, 170, 6, 'ZoomX + 플레이트', '5km·10km PB용 초경량 레이싱화', ['128g(실측)의 깃털 같은 무게', '빠른 턴오버에 최적화된 낮은 스택', '지면 감각이 살아있는 날렵한 승차감'], ['하프 이상은 쿠션 부족', '좁은 핏'], 0);
S('nike', '줌 플라이 6', 'Zoom Fly 6', 'ST', 209, 89, 245, 8, 'ZoomX + SR-02', '베이퍼플라이 느낌을 훈련에서 — 카본 트레이너', ['ZoomX 탑재로 전작보다 확 살아난 반발력', '카본 플레이트로 템포런·인터벌에 탄력', '대회화보다 높은 내구성과 안정감'], ['일상 조깅용으론 다소 딱딱', '무게가 대회화보다 무거움'], 1);
S('nike', '페가수스 플러스 2', 'Pegasus Plus 2', 'SN', 219, null, null, null, '풀렝스 ZoomX', '26년 8월 출시 — ZoomX를 통째로 넣은 경쾌한 페가수스', ['풀렝스 ZoomX의 경쾌한 반발','조깅부터 템포까지 만능','247g의 가벼운 무게'], ['안정성은 일반 페가수스보다 낮음'], 0);
S('nike', '페가수스 프리미엄', 'Pegasus Premium', 'SN', 279, 85, 300, 10, 'ZoomX + 에어줌 + ReactX', '에어 유닛 3중 레이어 — 가장 탄력적인 페가수스', ['에어줌 유닛의 강한 튕김', '프리미엄 쿠션의 꽉 찬 착화감', '롱런에서도 지치지 않는 탄력'], ['무겁고 비쌈', '뒤꿈치 착지 러너에겐 이질감'], 0);
S('nike', '인빈서블 3', 'Invincible 3', 'MX', 209, 86, 310, 9, 'ZoomX', '구름 위를 걷는 듯한 맥스쿠션 리커버리화', ['두툼한 ZoomX의 최상급 충격 흡수', '넓은 바닥으로 안정적인 착지', '회복주·LSD에 최적'], ['무게가 있음', '빠른 페이스엔 둔함'], 1);
S('nike', '보메로 플러스', 'Vomero Plus', 'MX', 219, 88, 290, 10, 'ZoomX + ReactX', '최고 높이 스택의 신형 보메로 — 가볍고 푹신', ['인빈서블보다 가볍고 경쾌한 맥스쿠션', 'ZoomX의 반발 + ReactX의 안정', '장거리에서도 다리 보호'], ['좁은 앞볼'], 0);
S('nike', '보메로 18', 'Vomero 18', 'CU', 179, 89, 304, 10, 'ZoomX + ReactX', '푹신함과 안정감을 모두 잡은 데일리 쿠션화', ['ZoomX/ReactX 듀얼 폼의 부드러운 쿠션', '넓어진 바닥으로 초보도 안정적', '합리적 가격 대비 높은 완성도'], ['무게가 다소 있음'], 1);
S('nike', '스트럭처 26', 'Structure 26', 'SB', 169, 84, 299, 10, 'ReactX', '나이키 대표 안정화 — 과내전 러너용', ['ReactX의 부드러우면서 단단한 지지', '미드풋 서포트로 발 무너짐 방지', '튼튼한 내구성'], ['다소 무겁고 둔한 편'], 0);
S('nike', '페가수스 42', 'Pegasus 42', 'DY', 169, null, null, null, 'ReactX + 에어줌', '26년 4월 출시 — 국민 데일리 러닝화의 최신판', ['ReactX + 에어줌의 무난한 쿠션','튼튼한 내구성','어떤 페이스에도 무난한 만능형'], ['높은 드롭(14mm), 개성 부족'], 1);
S('nike', '인피니티 런 4', 'Infinity Run 4', 'DY', 179, 81, 300, 9, 'ReactX', '부상 걱정 줄이는 안정적 데일리화', ['넓은 플랫폼의 높은 안정성', '부드러운 ReactX 쿠셔닝', '초보 입문용으로 편안'], ['무게감, 반발력 약함'], 0);
S('nike', '윈플로 12', 'Winflo 12', 'DY', 139, 80, 285, 10, 'Cushlon 3.0', '가성비 좋은 입문용 나이키 러닝화', ['10만원대 초반 합리적 가격', '부드럽고 편안한 쿠션', '넉넉한 앞볼'], ['반발력은 평범'], 0);
S('nike', '스트럭처 플러스', 'Structure Plus', 'SB', 199, null, null, null, 'ZoomX + ReactX', 'ZoomX를 넣은 프리미엄 안정화', ['푹신한 ZoomX와 단단한 지지의 조합','RunRepeat 87점','장거리 안정화'], ['무게'], 0);
S('nike', '보메로 프리미엄', 'Vomero Premium', 'MX', 279, null, null, null, 'ZoomX + 에어줌', '50mm 초고스택 — 가장 푹신한 나이키', ['압도적인 50mm 스택','에어줌 유닛의 튕김','회복주·LSD'], ['무게(326g), 고가'], 0);

/* ---------- ADIDAS ---------- */
S('adidas', '아디오스 프로 EVO 3', 'Adizero Adios Pro Evo 3', 'FR', 599, 90, 140, 6, 'Lightstrike Pro EVO', '100g 안팎 — 세계기록을 위한 초경량 슈퍼슈즈', ['상상 이상으로 가벼운 99g(실측) 무게', '라이트스트라이크 프로 EVO의 강력한 반발', '엘리트 마라토너 검증 레이싱화'], ['매우 비싸고 내구성 짧음(1회용에 가까움)'], 0);
S('adidas', '아디오스 프로 5', 'Adizero Adios Pro 5', 'CR', 299, null, null, null, 'Lightstrike Pro + 에너지로드', '26년 9월 출시 — 서브3 러너들의 카본 레이싱화 최신판', ['실측 176g으로 가벼워진 무게','에너지로드의 롤링감으로 후반 페이스 유지','하프~풀코스 레이스에 최적'], ['좁은 앞볼'], 1);
S('adidas', '타쿠미 센 11', 'Adizero Takumi Sen 11', 'LR', 219, 88, 190, 6, 'Lightstrike Pro', '5km~하프 스피드 레이싱의 정석', ['낮고 날렵한 스택으로 빠른 반응', '라이트스트라이크 프로의 탄력', '인터벌·트랙 훈련에도 최적'], ['풀코스엔 쿠션 부족'], 1);
S('adidas', '아디오스 9', 'Adizero Adios 9', 'LR', 169, 85, 200, 8, 'Lightstrike 2.0 + Pro', '플레이트 없이 가볍고 빠른 클래식 레이서', ['가성비 좋은 레이싱화', '지면 감각을 느끼는 날렵한 주행감', '템포런 훈련용으로도 좋음'], ['쿠션이 얇아 장거리엔 부담'], 0);
S('adidas', '보스턴 13', 'Adizero Boston 13', 'ST', 179, 90, 270, 6, 'Lightstrike Pro + 에너지로드', '대회화급 반발의 가성비 슈퍼트레이너', ['아디오스 프로 DNA를 훈련용으로', '롱런·템포·마라톤 페이스 훈련 만능', '높은 내구성'], ['다소 단단한 착화감'], 1);
S('adidas', '아디제로 EVO SL', 'Adizero Evo SL', 'SN', 209, 92, 224, 6, 'Lightstrike Pro', '플레이트 없는 레이싱 폼 — 올해의 만능 슈퍼트레이너', ['라이트스트라이크 프로 풀렝스의 놀라운 반발', '224g의 가벼움, 데일리부터 대회까지', '가격 대비 성능 최상급'], ['안정성은 보통', '발볼 좁음'], 1);
S('adidas', '슈퍼노바 프리마 3', 'Supernova Prima 3', 'SN', 199, null, null, null, 'Dreamstrike+ + 에너지로드', '26년 7월 출시 — 편안함과 반발을 잡은 프리미엄 데일리', ['푹신한 드림스트라이크+','에너지로드로 부드러운 전환','RunRepeat 89점으로 전작보다 개선'], ['무게가 다소 있음'], 0);
S('adidas', '울트라부스트 5X', 'Ultraboost 5X', 'MX', 199, 80, 320, 10, 'Light BOOST', '러닝·일상 겸용 맥스쿠션', ['라이트 부스트의 쫀득한 쿠션', '양말처럼 편한 니트 갑피', '일상화로도 멋진 디자인'], ['러닝용으론 무겁고 반응 느림'], 0);
S('adidas', '아디스타 BYD 2', 'Adistar BYD 2', 'CU', 209, 82, 315, 6, 'Repetitor', '롤링감이 좋은 장거리 쿠션화', ['로커 형상으로 부드러운 굴림', '넓은 바닥으로 안정적', '튼튼한 내구성'], ['무게, 경쾌함 부족'], 0);
S('adidas', '슈퍼노바 솔루션 3', 'Supernova Solution 3', 'SB', 179, null, null, null, 'Dreamstrike+', '부드럽게 잡아주는 아디다스 안정화 최신판', ['드림스트라이크+의 편안함','과내전을 부드럽게 보정','초보에게 안정적인 착화감'], ['날렵함은 부족'], 0);
S('adidas', '아디제로 SL 2', 'Adizero SL2', 'DY', 149, 86, 240, 8, 'Lightstrike 2.0 + Pro', '빠르게도 달리고 싶은 입문자의 데일리', ['가벼운 무게와 경쾌한 반응', '15만원 이하 가성비', '템포 훈련 입문용'], ['장거리 쿠션 부족'], 1);
S('adidas', '슈퍼노바 라이즈 3', 'Supernova Rise 3', 'DY', 159, 85, 285, 10, 'Dreamstrike+', '편안함 위주의 무난한 데일리화', ['부드럽고 꽉 찬 쿠션', '안정적인 착지', '편안한 갑피 핏'], ['반발력은 평범'], 0);

/* ---------- ASICS ---------- */
S('asics', '메타스피드 레이', 'Metaspeed Ray', 'FR', 439, 90, 129, 5, 'FF TURBO SQUARED', '130g 미만 — 아식스 사상 가장 가벼운 레이싱화', ['130g 미만의 압도적 경량', '새로운 터보 스퀘어드 폼의 반발', '레이스 페이스 유지력'], ['고가, 내구성 짧음'], 0);
S('asics', '메타스피드 스카이 도쿄', 'Metaspeed Sky Tokyo', 'CR', 339, null, null, null, 'FF LEAP + 카본', '스트라이드형 러너용 카본화 — 도쿄 에디션', ['실측 163g의 가벼운 무게','새 FF LEAP 폼의 강한 반발','RunRepeat 인기 1위 레이싱화'], ['케이던스형 러너에겐 덜 맞음'], 1);
S('asics', '메타스피드 엣지 도쿄', 'Metaspeed Edge Tokyo', 'CR', 339, null, null, null, 'FF LEAP + 카본', '케이던스형 러너용 카본화 — 도쿄 에디션', ['실측 159g의 초경량','빠른 턴오버를 돕는 설계','하프~풀코스 레이스용'], ['좁은 핏'], 1);
S('asics', '매직스피드 5', 'Magic Speed 5', 'CR', 209, 88, 225, 8, 'FF TURBO + FF BLAST+', '20만원 초반 가성비 카본화', ['카본 플레이트 + 고반발 폼, 저렴한 가격', '훈련과 대회를 모두 커버', '레이싱화보다 높은 안정성'], ['플래그십 대비 반발 약함'], 1);
S('asics', '소닉블라스트 2', 'Sonicblast 2', 'ST', 229, null, null, null, 'FF TURBO+ + FF BLAST MAX', '26년 8월 출시 — 더 가벼워진 고스택 슈퍼트레이너', ['전작보다 25g 가벼워진 230g','튀는 반발과 두꺼운 쿠션','템포·LSD 다목적'], ['코너에서 불안정'], 0);
S('asics', '슈퍼블라스트 3', 'Superblast 3', 'SN', 259, 93, 240, 8, 'FF TURBO+ + FF LEAP', '러너들이 꼽는 최고의 만능 슈퍼트레이너', ['플레이트 없이도 놀라운 반발과 쿠션', '조깅·템포·롱런·대회까지 한 켤레로', 'RunRepeat 최상위권 평가'], ['가격이 높은 편', '품절 잦음'], 1);
S('asics', '메가블라스트', 'Megablast', 'MX', 299, 89, 255, 8, 'FF TURBO SQUARED', '터보 스퀘어드 폼의 초고반발 맥스쿠션', ['슈퍼폼 풀렝스로 매우 가볍고 푹신', '롱런에서 극강의 반발', '가벼운 맥스쿠션'], ['비쌈', '안정성 보통'], 0);
S('asics', '젤 님버스 28', 'Gel-Nimbus 28', 'CU', 199, 88, 290, 8, 'FF BLAST+ ECO + PureGEL', '아식스 대표 프리미엄 쿠션화', ['푹신한 FF BLAST+와 PureGEL', '부드러운 니트 갑피의 편안함', '장거리·회복주 최적'], ['무게가 있음'], 1);
S('asics', '젤 카야노 33', 'Gel-Kayano 33', 'SB', 199, 88, 300, 8, 'FF BLAST+ + 4D 가이던스', '안정화의 대명사 — 과내전·평발 러너용', ['4D 가이던스 시스템의 자연스러운 지지', '푹신하면서 무너지지 않는 쿠션', '초보·체중 있는 러너에게 강력 추천'], ['가볍진 않음'], 1);
S('asics', 'GT-2000 15', 'GT-2000 15', 'SB', 169, null, null, null, 'FF BLAST+', 'RunRepeat 91점 — 가볍고 편한 안정화', ['252g으로 가벼운 안정화','자연스러운 지지력','초보 첫 러닝화로 인기'], ['반발은 평범'], 0);
S('asics', '노바블라스트 6', 'Novablast 6', 'DY', 159, null, null, null, 'FF BLAST MAX', '26년 7월 출시 — 통통 튀는 가성비 데일리 끝판왕', ['FF BLAST MAX의 경쾌한 반발','15만원대에 슈퍼트레이너급 재미','조깅부터 빌드업까지 만능'], ['안정화가 필요한 러너에겐 부족'], 1);
S('asics', '젤 컨텐드 9', 'Gel-Contend 9', 'DY', 79, 74, 280, 10, 'Amplifoam Plus', '8만원 이하 입문용 러닝화', ['부담 없는 가격', '기본 쿠셔닝', '걷기·가벼운 조깅용'], ['러닝 성능은 기본 수준'], 0);

/* ---------- HOKA ---------- */
S('hoka', '씨엘로 X1 3.0', 'Cielo X1 3.0', 'FR', 339, null, null, null, 'PEBA + 카본', '193g으로 가벼워진 호카 플래그십 레이싱화', ['전작보다 15g 가벼워진 무게','로커 형상 + 카본의 추진력','두꺼운 PEBA 폼으로 다리 보호'], ['높은 드롭(13mm), 고가'], 0);
S('hoka', '로켓 X 3', 'Rocket X 3', 'CR', 299, 89, 200, 7, 'PEBA 듀얼 + 카본', '가볍고 균형 잡힌 호카 카본 레이싱화', ['200g대 초경량', '안정적인 착지와 매끄러운 롤링', '하프~풀코스용'], ['앞볼이 좁음'], 0);
S('hoka', '스카이워드 X 2', 'Skyward X 2', 'ST', 279, null, null, null, 'PEBA + 카본', '초고스택 카본 맥스쿠션 트레이너 2세대', ['극강의 쿠션과 카본의 추진력','전작보다 약 30g 가벼워짐','롱런에서 다리 피로 최소화'], ['무거운 편, 비쌈'], 0);
S('hoka', '마하 X 3', 'Mach X 3', 'ST', 249, 89, 258, 5, 'PEBA + 플레이트', '템포·롱런용 경쾌한 플레이트 트레이너', ['PEBA 폼의 경쾌함', '플레이트로 빠른 전환', '데일리부터 스피드 훈련까지'], ['다소 딱딱한 플레이트감'], 0);
S('hoka', '본디 9', 'Bondi 9', 'MX', 219, 87, 300, 5, '수퍼크리티컬 EVA', '호카 최대 쿠션 — 회복주와 장시간 러닝', ['최대 두께의 푹신한 쿠셔닝', '넓은 바닥의 안정감', '체중·관절 부담 큰 러너에게 최적'], ['무겁고 느림'], 1);
S('hoka', '클리프톤 11', 'Clifton 11', 'CU', 199, null, null, null, 'CMEVA', '호카 대표 데일리 쿠션화 최신판', ['넉넉하고 부드러운 쿠션','메타로커로 부드러운 굴림','초보부터 상급자까지 무난'], ['반발력은 평범'], 1);
S('hoka', '마하 7', 'Mach 7', 'CU', 189, null, null, null, '수퍼크리티컬 EVA', '26년 3월 출시 — 가볍고 빠른 가성비 템포 데일리', ['224g 경량으로 빠른 페이스 가능','튀는 수퍼크리티컬 폼','RunRepeat 90점'], ['쿠션은 적당한 수준'], 1);
S('hoka', '스카이플로우', 'Skyflow', 'CU', 209, 87, 275, 5, '수퍼크리티컬 EVA', '클리프톤보다 탄력 있는 쿠션 트레이너', ['쿠션과 반발의 균형', '안정적인 넓은 바닥', '롱런 데일리'], ['특출난 개성 부족'], 0);
S('hoka', '아라히 9', 'Arahi 9', 'SB', 199, null, null, null, 'CMEVA + J-프레임', '무겁지 않은 경량 안정화 최신판', ['J-프레임이 자연스럽게 과내전 제어','데일리 안정화로 인기'], ['쿠션이 단단한 편'], 0);
S('hoka', '가비오타 6', 'Gaviota 6', 'SB', 239, 85, 300, 5, 'CMEVA + H-프레임', '최대 지지력의 맥스쿠션 안정화', ['강한 과내전 제어', '두툼한 쿠션', '평발·체중 있는 러너에게'], ['무겁고 비쌈'], 0);
S('hoka', '카와나 2', 'Kawana 2', 'DY', 179, 82, 280, 9, 'SwallowTail EVA', '체육관과 러닝을 오가는 만능 데일리', ['넓은 뒤꿈치로 안정적', '푹신한 쿠셔닝', '러닝 외 운동에도 OK'], ['러닝 전용감 약함'], 0);
S('hoka', '림콘 4', 'Rincon 4', 'DY', 169, 85, 220, 5, 'CMEVA', '가볍고 저렴한 호카 입문화', ['230g대 가벼운 무게', '푹신하고 경쾌한 승차감', '가성비 우수'], ['아웃솔 내구성 약함'], 0);

/* ---------- NEW BALANCE ---------- */
S('nb', 'SC 엘리트 v6', 'SuperComp Elite v6', 'FR', 339, null, null, null, 'FuelCell PEBA + 카본', '26년 8월 출시 — 190g으로 가벼워진 뉴발란스 플래그십', ['전작보다 20g 가벼워진 190g','푹신하면서 반발 좋은 FuelCell','안정적인 넓은 플랫폼'], ['높은 드롭(14mm)'], 0);
S('nb', 'SC 페이서 v2', 'FuelCell SuperComp Pacer v2', 'LR', 269, 87, 180, 4, 'FuelCell + 카본', '단거리용 경량 카본 레이서', ['200g의 가벼운 레이서', '날렵한 반응성', '5km~하프 기록용'], ['풀코스엔 쿠션 부족'], 0);
S('nb', 'SC 트레이너 v3', 'FuelCell SuperComp Trainer v3', 'ST', 249, 89, 290, 6, 'FuelCell + 에너지 아크', '두툼한 쿠션의 카본 슈퍼트레이너', ['풍성한 쿠션의 롱런 머신', '카본 플레이트로 탄력 있는 롱런', '대회 대용으로도 가능'], ['무게감'], 0);
S('nb', '모어 v6', 'Fresh Foam X More v6', 'MX', 209, 85, 300, 4, 'Fresh Foam X', '넓고 두꺼운 맥스쿠션 리커버리화', ['넓은 플랫폼의 극강 안정성', '부드러운 프레시폼 X', '회복주용'], ['무겁고 둔함'], 0);
S('nb', '레벨 v5', 'FuelCell Rebel v5', 'CU', 189, 90, 215, 6, 'FuelCell', '가볍고 통통 튀는 템포 데일리', ['220g대의 가벼운 무게', 'FuelCell의 재미있는 반발', '템포·인터벌에 좋음'], ['안정성 보통'], 1);
S('nb', '1080 v15', 'Fresh Foam X 1080 v15', 'CU', 209, 89, 275, 6, 'Infinion', '뉴발란스 대표 프리미엄 쿠션화', ['새 Infinion 폼의 부드럽고 탄력적인 쿠션', '넉넉한 발볼 옵션', '롱런 데일리 최적'], ['가격 높은 편'], 1);
S('nb', '860 v15', 'Fresh Foam X 860 v15', 'SB', 189, 85, 285, 8, 'Fresh Foam X', '부드러운 지지의 데일리 안정화', ['메디얼 포스트로 과내전 보정', '편안한 쿠션', '와이드 사이즈 선택 가능'], ['다소 무거움'], 0);
S('nb', '봉고 v6', 'Fresh Foam X Vongo v6', 'SB', 199, 86, 290, 6, 'Fresh Foam X', '쿠션 많은 안정화 — 장거리용', ['두툼한 쿠션과 안정성', '롱런 편안함', '과내전 러너용'], ['무게'], 0);
S('nb', '프로펠 v5', 'FuelCell Propel v5', 'DY', 169, 84, 270, 6, 'FuelCell', '가성비 좋은 FuelCell 데일리', ['합리적인 가격', '튀는 FuelCell 쿠션', '넓은 바닥 안정감'], ['무게감'], 0);
S('nb', '880 v15', 'Fresh Foam X 880 v15', 'DY', 179, 85, 290, 10, 'Fresh Foam X', '튼튼하고 무난한 데일리 워크호스', ['편안한 쿠션', '높은 내구성', '넓은 발볼 옵션'], ['개성 부족'], 0);
S('nb', 'SC 레벨', 'SuperComp Rebel', 'ST', 229, null, null, null, 'FuelCell + 카본', '26년 8월 출시 — RunRepeat 94점 카본 트레이너', ['레벨의 경쾌함에 카본 플레이트 추가','207g의 가벼운 무게','템포·인터벌·대회 겸용'], ['좁은 편'], 1);

/* ---------- PUMA ---------- */
S('puma', '패스트-R 나이트로 엘리트 3', 'Fast-R Nitro Elite 3', 'FR', 379, 89, 180, 8, 'NITROFOAM Elite + 카본', '독특한 분리형 미드솔의 플래그십 레이서', ['170g대 초경량', '앞발 집중형 강한 추진', '풀코스 레이스용'], ['뒤꿈치 착지 러너에겐 불편'], 0);
S('puma', '디비에이트 나이트로 엘리트 4', 'Deviate Nitro Elite 4', 'CR', 289, 90, 195, 8, 'NITROFOAM Elite + 카본', '가성비 좋은 고성능 카본 레이싱화', ['가볍고 반발 좋은 나이트로 엘리트', '그립 좋은 PUMAGRIP 아웃솔', '하프~풀코스'], ['갑피 핏 호불호'], 1);
S('puma', '디비에이트 나이트로 4', 'Deviate Nitro 4', 'ST', 219, 90, 265, 10, 'NITRO Elite + 카본', '대표 카본 슈퍼트레이너 — 가성비 최고', ['카본 플레이트의 탄력', '나이트로 폼의 쿠션과 반발', '훈련 겸 대회화 가능'], ['다소 단단함'], 1);
S('puma', '매그맥스 나이트로 2', 'MagMax Nitro 2', 'MX', 239, 87, 300, 10, 'NITRO', '푸마 맥스쿠션 롱런화', ['푹신한 나이트로 맥스 쿠션', '안정적인 넓은 바닥', '회복주·LSD'], ['무게'], 0);
S('puma', '매그니파이 나이트로 3', 'Magnify Nitro 3', 'CU', 199, 88, 270, 10, 'NITRO', '가볍고 푹신한 쿠션 데일리', ['나이트로의 가벼운 쿠션', '접지력 좋은 PUMAGRIP', '롱런 데일리'], ['특출난 반발은 아님'], 0);
S('puma', '포에버런 나이트로 2', 'ForeverRun Nitro 2', 'SB', 199, 86, 290, 10, 'NITRO', '푸마 안정화 — 부드러운 지지', ['자연스러운 과내전 가이드', '편안한 나이트로 쿠션', '초보 데일리'], ['무게감'], 0);
S('puma', '벨로시티 나이트로 5', 'Velocity Nitro 5', 'DY', 179, null, null, null, 'NITRO', '26년 7월 출시 — 가볍고 튀는 가성비 데일리', ['238g으로 가벼워진 무게','통통 튀는 나이트로 폼','탁월한 접지력'], ['낮은 스택, 쿠션은 적당'], 1);
S('puma', '일렉트리파이 나이트로 4', 'Electrify Nitro 4', 'DY', 159, 84, 260, 8, 'NITRO', '15만원대 입문용 나이트로', ['합리적 가격', '가벼운 착화감', '좋은 접지력'], ['쿠션 얇음'], 0);
S('puma', '디비에이트 퓨어 나이트로', 'Deviate Pure Nitro', 'SN', 189, null, null, null, 'NITRO ELITE', '26년 6월 출시 — 플레이트 없는 고반발 슈퍼트레이너', ['RunRepeat 93점','215g의 가벼운 무게','조깅·템포·롱런 만능'], ['안정성 보통'], 0);

/* ---------- SAUCONY ---------- */
S('saucony', '엔돌핀 엘리트 3', 'Endorphin Elite 3', 'FR', 339, null, null, null, 'PWRRUN HG + 카본', '26년 6월 출시 — 써코니 최상위 슈퍼폼 레이싱화', ['PWRRUN HG의 강력한 반발','RunRepeat 92점','풀코스 PB용'], ['고가'], 0);
S('saucony', '엔돌핀 프로 5', 'Endorphin Pro 5', 'CR', 269, null, null, null, 'PWRRUN HG + PB + 카본', '안정적이고 빠른 써코니 카본 레이서 최신판', ['스피드롤로 매끄러운 굴림','안정적인 착지','하프~풀코스 레이스'], ['좁은 편'], 1);
S('saucony', '엔돌핀 스피드 5', 'Endorphin Speed 5', 'ST', 209, 93, 230, 8, 'PWRRUN PB + 나일론 플레이트', '러너들이 가장 많이 추천하는 슈퍼트레이너', ['가볍고 탄력 있는 PWRRUN PB', '나일론 플레이트로 부드러운 추진', '템포·롱런·대회까지 만능'], ['가끔 품절'], 1);
S('saucony', '엔돌핀 트레이너', 'Endorphin Trainer', 'ST', 219, 87, 285, 8, 'PWRRUN PB', '쿠션 많은 훈련용 엔돌핀', ['두툼한 쿠션과 반발', '롱런 편안함', '높은 내구성'], ['무게감'], 0);
S('saucony', '허리케인 26', 'Hurricane 26', 'MX', 199, null, null, null, 'PWRRUN PB', 'RunRepeat 91점 — 맥스쿠션 안정 롱런화', ['부드럽고 튀는 쿠션','안정적인 착지','장거리 회복주'], ['무게'], 0);
S('saucony', '트라이엄프 24', 'Triumph 24', 'CU', 209, 89, 280, 10, 'PWRRUN PB', '편안함의 끝 — 써코니 쿠션 플래그십', ['PWRRUN PB 풀렝스의 푹신한 쿠션', '고급스러운 갑피', '장거리·데일리'], ['무게'], 1);
S('saucony', '가이드 19', 'Guide 19', 'SB', 159, null, null, null, 'PWRRUN', '가성비 좋은 데일리 안정화 최신판', ['자연스러운 센터패스 지지','합리적 가격','초보 첫 안정화로 추천'], ['무게가 있는 편'], 1);
S('saucony', '템퍼스 2', 'Tempus 2', 'SB', 199, 88, 270, 8, 'PWRRUN PB 프레임', '빠르게 달릴 수 있는 안정화', ['PWRRUN PB의 탄력', '과내전 러너도 템포 가능', '가벼운 안정화'], ['단단한 편'], 0);
S('saucony', '라이드 19', 'Ride 19', 'DY', 179, 89, 265, 8, 'PWRRUN+', '균형 잡힌 써코니 대표 데일리', ['부드럽고 반발 좋은 PWRRUN+', '넓은 범용성', '편안한 핏'], ['특출남은 없음'], 1);
S('saucony', '킨바라 16', 'Kinvara 16', 'DY', 168, 86, 210, 4, 'PWRRUN', '가볍고 자연스러운 저드롭 데일리', ['210g 경량', '4mm 저드롭으로 자연스러운 주법', '빠른 페이스에 좋음'], ['쿠션 얇음'], 0);
S('saucony', '엔돌핀 아주라', 'Endorphin Azura', 'SN', 189, null, null, null, 'PWRRUN PB', '플레이트 없는 엔돌핀 — 경쾌한 만능 트레이너', ['RunRepeat 91점','부드럽고 튀는 PWRRUN PB','데일리~템포'], ['안정성 보통'], 0);

/* ---------- MIZUNO ---------- */
S('mizuno', '하이퍼워프 퓨어', 'Hyperwarp Pure', 'FR', 309, 87, 150, 4, 'ENERZY XP + 카본', '초경량 미즈노 레이싱 신작', ['150g대 초경량', '날렵한 레이싱 핏', '단~장거리 기록용'], ['쿠션 얇음'], 0);
S('mizuno', '하이퍼워프 엘리트', 'Hyperwarp Elite', 'FR', 279, 87, 190, 6, 'ENERZY XP + 카본', '풀코스용 미즈노 플래그십', ['카본 플레이트 + 고반발 폼', '안정적인 레이싱화', '풀코스 대응 쿠션'], ['정보 부족한 신작'], 0);
S('mizuno', '하이퍼워프 프로', 'Hyperwarp Pro', 'CR', 249, 86, 210, 6, 'ENERZY + 카본', '가성비 미즈노 카본 레이서', ['합리적 가격의 카본화', '안정적 착지', '훈련 겸 대회화'], ['반발 무난'], 0);
S('mizuno', '웨이브 리벨리온 프로 3', 'Wave Rebellion Pro 3', 'CR', 259, 88, 225, 3, 'ENERZY XP + 글라스카본', '독특한 롤링 지오메트리의 카본화', ['앞으로 굴러가는 독특한 추진감', '튼튼한 내구성', '하프~풀코스'], ['호불호 강한 형상'], 0);
S('mizuno', '웨이브 리벨리온 플래시 3', 'Wave Rebellion Flash 3', 'LR', 189, null, null, null, 'ENERZY XP + 플레이트', '빠른 템포를 위한 가성비 레이서 최신판', ['ENERZY XP의 반발','내구성 좋은 레이싱화','템포·대회 겸용'], ['무게 다소'], 0);
S('mizuno', '네오 비스타 3', 'Neo Vista 3', 'ST', 209, null, null, null, 'ENERZY NXT + 플레이트', '부드럽고 튀는 미즈노 슈퍼트레이너 최신판', ['ENERZY NXT의 높은 반발','롱런 편안함','데일리~템포'], ['안정성 보통'], 0);
S('mizuno', '네오 젠 2', 'Neo Zen 2', 'SN', 169, 87, 220, 8, 'ENERZY NXT', '가볍고 푹신한 무플레이트 트레이너', ['가벼운 무게', '부드러운 쿠션', '가성비 좋은 만능형'], ['안정성 보통'], 0);
S('mizuno', '웨이브 스카이 9', 'Wave Sky 9', 'CU', 189, 86, 290, 8, 'ENERZY NXT', '미즈노 프리미엄 쿠션화', ['푹신한 ENERZY NXT', '편안한 롱런', '견고한 만듦새'], ['무게'], 0);
S('mizuno', '웨이브 인스파이어 22', 'Wave Inspire 22', 'SB', 159, null, null, null, 'ENERZY + 웨이브 플레이트', '전통의 미즈노 안정화 최신판', ['웨이브 플레이트의 지지력','합리적 가격','과내전 초보'], ['다소 단단함'], 0);
S('mizuno', '웨이브 라이더 30', 'Wave Rider 30', 'DY', 169, null, null, null, 'ENERZY NXT', '26년 6월 출시 — 미즈노 대표 데일리 30번째 모델', ['안정적인 웨이브 플레이트','튼튼한 내구성','무난한 데일리'], ['다소 단단함'], 1);

/* ---------- BROOKS ---------- */
S('brooks', '하이페리온 엘리트 6', 'Hyperion Elite 6', 'FR', 299, null, null, null, 'DNA GOLD + 카본', '193g으로 가벼워진 브룩스 플래그십 카본화', ['전작보다 가벼워진 193g','PEBA DNA GOLD의 반발','안정적인 레이싱 플랫폼'], ['높은 드롭(10.6mm)'], 0);
S('brooks', '하이페리온 맥스 4', 'Hyperion Max 4', 'ST', 219, null, null, null, 'DNA FLASH + 플레이트', '26년 7월 출시 — 쿠션 많은 브룩스 슈퍼트레이너', ['두꺼운 쿠션의 롱런 편안함','플레이트의 탄력','템포·롱런'], ['무게(292g)'], 0);
S('brooks', '글리세린 맥스 2', 'Glycerin Max 2', 'MX', 249, 86, 310, 6, 'DNA TUNED', '브룩스 최대 쿠션 롤링 쿠션화', ['초고스택 푹신함', '부드러운 롤링', '장거리 회복주'], ['무겁고 비쌈'], 0);
S('brooks', '글리세린 23', 'Glycerin 23', 'CU', 199, 88, 290, 10, 'DNA TUNED', '프리미엄 쿠셔닝의 정석', ['부드럽고 탄력 있는 DNA TUNED', '안정적인 넓은 바닥', '장거리 데일리'], ['무게감'], 1);
S('brooks', '하이페리온 3', 'Hyperion 3', 'CU', 189, 86, 200, 8, 'DNA FLASH', '가볍고 빠른 템포화', ['빠른 반응의 템포 구조', '경쾌한 승차감', '인터벌·템포 훈련'], ['쿠션 얇음'], 0);
S('brooks', '고스트 맥스 4', 'Ghost Max 4', 'CU', 179, null, null, null, 'DNA LOFT v3', '26년 8월 출시 — 편안한 고스택 데일리 쿠션화', ['두툼하고 부드러운 쿠션','안정적 착지','초보·체중 있는 러너'], ['반발 약함'], 0);
S('brooks', '아드레날린 GTS 25', 'Adrenaline GTS 25', 'SB', 189, 88, 285, 12, 'DNA LOFT v3 + 가이드레일', '미국 판매 1위급 안정화', ['가이드레일로 무릎까지 정렬', '부드러운 쿠션', '초보·과내전 러너 강력 추천'], ['높은 드롭'], 1);
S('brooks', '글리세린 GTS 23', 'Glycerin GTS 23', 'SB', 209, 87, 300, 10, 'DNA TUNED + 가이드레일', '프리미엄 쿠션 안정화', ['최상급 쿠션 + 안정', '장거리 안정화', '편안한 갑피'], ['무게'], 0);
S('brooks', '고스트 18', 'Ghost 18', 'DY', 169, 88, 280, 12, 'DNA LOFT v3', '브룩스 국민 데일리 러닝화', ['부드럽고 안정적인 쿠션', '어떤 러너에게나 무난', '높은 내구성'], ['반발 평범'], 1);

/* ---------- UNDER ARMOUR ---------- */
S('ua', '벨로시티 엘리트 2', 'Velociti Elite 2', 'FR', 299, null, null, null, 'FLOW + 카본', '언더아머 플래그십 카본 레이싱화', ['아웃솔 없는 UA FLOW 폼의 접지력','카본 플레이트 추진력','풀코스 대회용'], ['경쟁작보다 무거움(257g)'], 0);
S('ua', '인피니트 엘리트 2', 'Infinite Elite 2', 'CU', 199, null, null, null, 'HOVR+', '언더아머 대표 고쿠션 데일리', ['두툼하고 부드러운 HOVR+ 쿠션','롱런 편안함'], ['반발은 평범'], 1);
S('ua', '인피니트 프로', 'Infinite Pro', 'CU', 179, null, null, null, 'HOVR+', 'RunRepeat 인기 1위 언더아머 쿠션화', ['편안한 쿠션','튼튼한 내구성'], ['무게(305g)'], 1);
S('ua', '호버 소닉 6', 'HOVR Sonic 6', 'DY', 139, null, null, null, 'HOVR', '가성비 데일리 입문화', ['합리적 가격','무난한 쿠션'], ['반발 약함'], 0);
S('ua', '차지드 어썰트 10', 'Charged Assert 10', 'DY', 99, null, null, null, 'Charged', '10만원 이하 입문용 러닝화', ['부담 없는 가격','걷기·가벼운 조깅용'], ['러닝 성능은 기본 수준'], 1);

/* ---------- SALOMON ---------- */
S('salomon', 'S/LAB 판타즘 2', 'S/LAB Phantasm 2', 'FR', 359, null, null, null, 'Energy Surge + 카본', '살로몬 플래그십 카본 레이싱화', ['낮은 스택(31mm)의 안정적인 착지','카본 플레이트의 추진력','코너링이 안정적인 레이싱화'], ['경쟁작보다 쿠션이 얇음'], 0);
S('salomon', '스펙터 2', 'Spectur 2', 'ST', 229, null, null, null, 'Energy Foam + 카본', '카본 플레이트를 넣은 템포 트레이너', ['카본의 탄탄한 추진력','템포·인터벌 훈련용'], ['단단한 승차감, 높은 드롭(11mm)'], 0);
S('salomon', 'S/LAB 스펙터', 'S/LAB Spectur', 'SN', 289, null, null, null, 'Energy Surge', 'S/LAB 라인의 고반발 템포 트레이너', ['경쾌한 반발','빠른 페이스 훈련용'], ['비싼 가격'], 0);
S('salomon', '에어로 글라이드 4', 'Aero Glide 4', 'CU', 199, null, null, null, 'Energy Foam+', '26년 2월 출시 — RunRepeat 92점 살로몬 대표 로드화', ['43mm 고스택의 푹신한 쿠션','로커 형상의 부드러운 굴림','살로몬 로드화 인기 1위'], ['높은 드롭(11.7mm)'], 1);

/* ---------- ON ---------- */
S('on', '클라우드붐 스트라이크 2', 'LightSpray Cloudboom Strike 2', 'FR', 359, null, null, null, 'Helion HF + 스피드보드', '로봇이 분사해 만든 LightSpray 갑피의 온 플래그십', ['실측 167g의 가벼운 무게','끈 없이 감싸는 LightSpray 갑피','스피드보드 카본의 추진'], ['최고가 수준','낮은 드롭(2.7mm)'], 0);
S('on', '클라우드몬스터 3 하이퍼', 'Cloudmonster 3 Hyper', 'CR', 269, null, null, null, 'Helion HF', 'RunRepeat 90점 — 온의 슈퍼폼 맥스 트레이너', ['헬리온 HF 슈퍼폼의 반발','두꺼운 쿠션','롱런·템포'], ['무게'], 0);
S('on', '클라우드붐 에코 3', 'Cloudboom Echo 3', 'LR', 329, 86, 225, 9, 'Helion HF + 카본', '튀는 클라우드텍 카본 레이서', ['카본 스피드보드 추진력', '클라우드텍의 반발', '하프~풀코스'], ['고가'], 0);
S('on', '클라우드몬스터 3', 'Cloudmonster 3', 'MX', 229, null, null, null, 'Helion', '큰 구름 쿠션의 맥스 데일리 3세대', ['큼직한 클라우드텍의 튕김','편안한 롱런','세련된 디자인'], ['무게(301g)'], 1);
S('on', '클라우드이클립스', 'Cloudeclipse', 'CU', 219, 85, 290, 6, 'Helion HF', '부드러운 쿠션의 장거리 데일리', ['헬리온 HF의 부드러움', '롤링이 좋은 형상', '장거리용'], ['반발 약함'], 0);
S('on', '클라우드러너 3', 'Cloudrunner 3', 'SB', 199, null, null, null, 'Helion', '온의 안정화 — 편안한 지지 최신판', ['안정적인 넓은 바닥','편안한 쿠션'], ['무게, 반발 약함'], 0);
S('on', '클라우드서퍼 2', 'Cloudsurfer 2', 'DY', 199, 86, 255, 9, 'Helion', '부드러운 클라우드텍 피닉스 데일리', ['부드러운 착지', '가벼운 무게', '도심 러닝·데일리'], ['쿠션 두께 평범'], 0);


/* ---------- LI-NING (RunRepeat 미리뷰 · 국내 정식 판매 없음) ---------- */
S('lining', '페이뎬 6 엘리트', 'Feidian 6 Elite', 'FR', null, null, null, null, 'BOOM 슈퍼폼 + 카본', '2025년 일본 마라톤 신기록을 만든 리닝 최상급 카본화', ['고반발 슈퍼폼과 풀렝스 카본 플레이트', '오사코 스구루의 일본 기록(2:04:55) 레이싱화', '중국 최상급 레이싱화로 평가'], ['국내 정식 판매처가 적어 해외 구매 필요'], 0);
S('lining', '페이뎬 6 챌린저', 'Feidian 6 Challenger', 'CR', null, null, null, null, 'BOOM 폼 + 카본', '엘리트보다 안정적인 훈련·대회 겸용 카본화', ['엘리트 대비 안정적인 플랫폼', '훈련과 대회 모두 활용', '합리적인 해외 가격'], ['국내 정식 판매처가 적음'], 0);
S('lining', '레드헤어(적토끼) 9 울트라', 'Red Hare 9 Ultra', 'SN', null, null, null, null, 'BOOM 슈퍼폼', '국내 러너들 사이에서 화제인 가성비 슈퍼트레이너', ['플레이트 없이 경쾌한 반발', '롱런부터 템포까지 올라운더', '가격 대비 높은 완성도'], ['국내 정식 판매처가 적음'], 0);
S('lining', '레드헤어(적토끼) 9 프로', 'Red Hare 9 Pro', 'DY', null, null, null, null, 'BOOM 폼', '매일 신기 좋은 안정적인 데일리 트레이너', ['조깅·회복주에 편안', '안정적인 착지', '입문용 가성비'], ['국내 정식 판매처가 적음'], 0);

/* ---------- ANTA ---------- */
S('anta', 'C10 프로', 'C10 Pro', 'FR', 500, null, null, null, '질소 주입 폼 + 카본', '안타 최상급 카본 레이싱화', ['안타 최고 사양의 레이싱 폼', '풀렝스 카본 플레이트', '풀코스 대회용 설계'], ['RunRepeat 미리뷰 — 정보 제한적'], 0);
S('anta', 'C202 6 프로', 'C202 6 Pro', 'CR', 300, null, null, null, '질소 주입 폼 + 카본', '중국 마라톤 대회에서 인기 높은 카본 레이서', ['카본 플레이트의 추진력', '대회용 경량 설계', '플래그십보다 합리적인 가격'], ['RunRepeat 미리뷰'], 0);
S('anta', 'C202 6', 'C202 6', 'ST', 100, null, null, null, '질소 주입 폼 + 플레이트', '10만원대 가성비 플레이트 트레이너', ['저렴한 가격의 플레이트 훈련화', '템포·LSD 활용', '입문 대회화로도 사용'], ['RunRepeat 미리뷰'], 0);
S('anta', '마하 6 프로', 'Mach 6 Pro', 'ST', null, 90, 201, 3.1, 'PEBA 폼 + 플레이트', 'RunRepeat 90점 — 가격 대비 놀라운 템포 트레이너', ['아주 가볍고 빠른 승차감', 'PEBA 폼의 뛰어난 반발력', '최상급 접지력과 가성비'], ['뒤꿈치 지지가 약함', '아웃솔이 얇음'], 0, { usd: 120 });
S('anta', '존2 90', 'Zone 2 90', 'SN', null, 91, 196, 7.2, 'PEBA 슈퍼폼', 'RunRepeat 91점 — 플레이트 없는 가성비 슈퍼트레이너', ['슈퍼트레이너급 반발을 저렴한 가격에', '카테고리 대비 매우 가벼움', '롱런과 대회까지 커버'], ['아시아 밖에서는 구하기 어려움', '중립 주법 러너에게 적합'], 1, { usd: 115 });

/* ---------- XTEP (RunRepeat 미리뷰) ---------- */
S('xtep', '160X 6.0 몬스터', '160X 6.0 Monxter', 'FR', 500, null, null, null, '슈퍼폼 + 카본', '엑스텝 최상급 플래그십 레이싱화', ['엑스텝 최고 사양 레이싱화', '풀코스 기록용 설계', '160X 라인의 정점'], ['고가', 'RunRepeat 미리뷰'], 0);
S('xtep', '160X 6.0 프로', '160X 6.0 Pro', 'CR', 250, null, null, null, '슈퍼폼 + 카본', '중국 마라톤 러너들이 가장 많이 찾는 카본 레이서', ['중국 마라톤 대회에서 착용 비율 높음', '안정적인 카본 레이서', '가격 대비 성능 우수'], ['RunRepeat 미리뷰'], 1);
S('xtep', '160X 6.0', '160X 6.0', 'ST', 200, null, null, null, '슈퍼폼 + 플레이트', '"슈퍼트레이너를 뛰어넘는다"는 평가의 훈련화', ['대회화 느낌의 훈련용 모델', '템포·LSD 다목적', '국내 리뷰어 호평'], ['RunRepeat 미리뷰'], 1);
S('xtep', '160X 5.0', '160X 5.0', 'ST', 130, null, null, null, '슈퍼폼 + 플레이트', '13만원대 가성비 플레이트 트레이너', ['저렴한 플레이트 트레이너', '템포 훈련 입문용', '검증된 전작'], ['RunRepeat 미리뷰'], 0);
S('xtep', '360X', '360X', 'CU', 85, null, null, null, '쿠션 폼', '8만원대 가성비 쿠션화', ['부담 없는 가격', '푹신한 데일리 쿠션', '입문용'], ['RunRepeat 미리뷰'], 0);
S('xtep', '260X', '260X', 'CU', 100, null, null, null, '쿠션 폼', '10만원대 데일리 쿠션화', ['편안한 쿠셔닝', '조깅·롱런 데일리', '합리적 가격'], ['RunRepeat 미리뷰'], 0);
S('xtep', '원피스 3.0', 'Onepiece 3.0', 'DY', 97, null, null, null, '경량 폼', '가볍고 저렴한 데일리 러닝화', ['가벼운 무게', '10만원 이하 가격', '입문 조깅용'], ['RunRepeat 미리뷰'], 0);

/* ---------- 361° (RunRepeat 미리뷰) ---------- */
S('d361', '미로 누드', 'Miro Nude', 'FR', 300, null, null, null, '슈퍼폼 + 카본', '361° 최상급 카본 레이싱화', ['361° 최고 사양 레이싱화', '카본 플레이트 추진력', '풀코스 대회용'], ['RunRepeat 미리뷰'], 0);
S('d361', '퓨처 1.5', 'Future 1.5', 'CR', 160, null, null, null, '슈퍼폼 + 카본', '16만원대 가성비 카본 레이서', ['저렴한 카본 레이싱화', '하프~풀코스 대회용', '입문 카본화로 적합'], ['RunRepeat 미리뷰'], 0);
S('d361', '퓨리어스 2.0', 'Furious 2.0', 'CR', 130, null, null, null, '슈퍼폼 + 카본', '13만원대 카본 레이서', ['부담 없는 카본화', '템포·대회 겸용', '가벼운 착화감'], ['RunRepeat 미리뷰'], 0);
S('d361', '메가 3 프로', 'Mega 3 Pro', 'SN', 90, null, null, null, '슈퍼폼', '9만원대에 장거리까지 되는 화제의 가성비 러닝화', ['국내 리뷰어들이 꼽는 가성비 1위권', '40km 장거리 테스트 호평', '데일리~템포 만능'], ['RunRepeat 미리뷰'], 1);
S('d361', '플레임 4', 'Flame 4', 'ST', 90, null, null, null, '슈퍼폼 + 플레이트', '9만원대 플레이트 트레이너', ['저렴한 플레이트 훈련화', '템포 훈련용', '가벼운 무게'], ['RunRepeat 미리뷰'], 0);
S('d361', '플레임 3 ET', 'Flame 3 ET', 'ST', 85, null, null, null, '슈퍼폼 + 플레이트', '8만원대 가성비 트레이너', ['가성비 트레이너', '템포·인터벌', '입문용 플레이트화'], ['RunRepeat 미리뷰'], 0);
S('d361', '퓨리어스 ET', 'Furious ET', 'DY', 90, null, null, null, '경량 폼', '9만원대 데일리 러닝화', ['가벼운 데일리', '조깅·10km', '합리적 가격'], ['RunRepeat 미리뷰'], 0);


/* ---------- PRO-SPECS (RunRepeat 미리뷰 · 무게/드롭은 제조사 공시값, 270mm 기준) ---------- */
S('prospecs', '인피니트 러시 Rev.', 'Infinite Rush Rev', 'FR', 299, null, 225, 5, '슈퍼폼+ (PEBA) + 카본', '프로스펙스 최상위 레이싱화 — PB 달성을 위한 스피드 퍼포먼스', ['PEBA 슈퍼폼+와 풀렝스 카본 플레이트', '225g의 가벼운 레이싱화', '국산 브랜드 최상급 사양'], ['RunRepeat 미리뷰'], 0, { mfr: true });
S('prospecs', '인피니트 러쉬', 'Infinite Rush', 'CR', 259, null, 230, 5, '슈퍼폼+ (PEBA) + 카본', '"발볼 가장 넓은 토종 레이싱화" — 국산 카본화의 반란', ['전작보다 30% 넓어진 풀렝스 카본 플레이트', '넓은 발볼로 한국인 발에 편안', '국내 리뷰어 "기대 이상" 호평'], ['RunRepeat 미리뷰'], 1, { mfr: true });
S('prospecs', '하이퍼 러쉬 2', 'Hyper Rush 2', 'ST', 219, null, 210, 9, '슈퍼폼 + 카본', '210g 카본 플레이트 템포 트레이너', ['카본 플레이트 탑재 훈련화', '210g의 가벼운 무게', '템포런·인터벌용'], ['RunRepeat 미리뷰'], 0, { mfr: true });
S('prospecs', '스피드 러시 3', 'Speed Rush 3', 'SN', 209, null, 224, 8.5, '슈퍼폼', '입문 러너를 위한 가볍고 빠른 트레이닝화', ['224g의 가벼운 데일리 트레이너', '템포·조깅 겸용', '합리적인 국산 가격'], ['RunRepeat 미리뷰'], 0, { mfr: true });
S('prospecs', 'SWNA SEAM 26', 'SWNA SEAM 26', 'DY', 169, null, 305, 10.5, '슈퍼폼', '일상과 러닝의 경계를 허문 데일리 러닝화', ['조깅·입문·일상 훈련용', '디자이너 협업 디자인', '두툼한 36.5mm 스택'], ['무게가 다소 무거움', 'RunRepeat 미리뷰'], 0, { mfr: true });
S('prospecs', '듀플렉스 GF', 'Duplex GF', 'SB', 159, null, 320, 9.5, '슈퍼폼·슈퍼라이트 + G-FRAME', '초보 러너에게 좋은 국산 안정화', ['G-FRAME 지지 구조로 과내전 보정', '이중 물성 미드솔의 안정감', '15만원대 합리적 가격'], ['무게가 무거운 편', 'RunRepeat 미리뷰'], 0, { mfr: true });

/* ---------- FILA (RunRepeat 미리뷰 · 가격은 휠라코리아 공식몰 정가) ---------- */
S('fila', '레이서 카본 3', 'Racer Carbon 3', 'FR', 279, null, null, null, 'PEBA + 100% 카본 플레이트', 'FILA 러닝 기술력이 집약된 최상급 카본 레이싱화', ['SPEED TECH CARBON 시스템 + PEBA 미드솔', '100% 카본 플레이트의 강한 추진력', '가볍고 정교한 S-KNIT 어퍼'], ['RunRepeat 미리뷰'], 0);
S('fila', '스피드템포 플러스', 'Speedtempo Plus', 'SN', 179, null, 210, null, 'SKYFOAM (초임계 발포)', 'FILA의 대표 러닝화 — 가볍고 경쾌한 경량 트레이너', ['초임계 발포 SKYFOAM의 반발력', '270mm 기준 약 210g의 가벼운 무게', '국내 리뷰 조회수 37만의 화제작'], ['RunRepeat 미리뷰'], 1, { mfr: true });
S('fila', '플로트 E9', 'Float E9', 'DY', 159, null, null, null, 'SKYFOAM', '10K 템포런부터 하프까지 쓰는 반응성 좋은 러닝화', ['통통 튀는 SKYFOAM 반응성', '10K 템포·하프마라톤 대응', '15만원대 가격'], ['RunRepeat 미리뷰'], 0);
S('fila', '레이서 스피드존', 'Racer Speedzone', 'CU', 159, null, null, null, 'SPEED TECH FOAM', '편안함과 안정성 중심의 쿠셔닝 러닝화', ['풍부한 SPEED TECH FOAM 쿠셔닝', '데일리·리커버리 러닝', '발을 잡아주는 S-KNIT 어퍼'], ['RunRepeat 미리뷰'], 0);
S('fila', '스카이코어 에버', 'Skycore Ever', 'DY', 149, null, null, null, 'SKYFLOAT', '가벼운 러닝과 일상을 위한 말랑한 쿠션화', ['부드럽고 말랑한 SKYFLOAT 폼', '통기성 좋은 메쉬', '일상화로도 무난'], ['러닝 전용 성능은 평범', 'RunRepeat 미리뷰'], 0);

/* ---------- 러닝 팁 영상 ----------
   유튜브 조회수 순 검색으로 수집 (2026-11-11)
   기준: 조회수 100만 이상은 최근 2년 이내, 10만 이상은 최근 1년 이내 업로드
   [영상ID, 제목, 'L'(롱폼)|'S'(쇼츠), 조회수(만회), 채널, 업로드 시점] */
const TIPS = {"정보":[["t2X6VaZ0MWE","같은 날 시작한 두 사람, 백일 뒤 몸이 이렇게 갈립니다 ㅣ 걷기 vs 달리기","L",463,"이거알아?","1개월 전"],
  ["VmYmTR49mQM","잘못된 달리기 자세, 매 걸음마다 무릎에 3배 부담됩니다 (김병곤 박사)","L",423.4,"지식인사이드","1년 전"],
  ["OUZaJ1FHxYo","※요즘 러닝하면 꼭 봐야 할 영상※｜크랩","L",302.5,"크랩 KLAB","3주 전"],
  ["sEzYR3hhCA0","느리게 달려도 효과 만점! 슬로우조깅을 아십니까","L",220.9,"KBS 생로병사의 비밀","1년 전"],
  ["0J42_MuTxoU","달리기가 인체를 완전히 바꾸는 방법","L",218.9,"Nicklas Rossner","1년 전"],
  ["9vuUOeCezfg","건강하려고 시작한 러닝이 독이 되는 순간…심장 전문의가 말하는 위험 신호","L",202.8,"세계일보","1개월 전"],
  ["LAGxk0KMiVU","과학적으로 체지방 분해 '극대화' 하고, 최고 효율로 달리는 방법","L",147.8,"지식인사이드","1년 전"],
  ["jMW7QN0HpDw","\"딱 30분만 따라하세요\" 다이어트를 위한 슬로우 조깅 방법","L",83.9,"마라닉TV","11개월 전"],
  ["HKMZPwqf2W4","러닝하면 뇌구조가 바뀐다?! 잘 달리면 \"내장 지방 쥐어짠다\"","L",83.2,"장르만 여의도","8개월 전"],
  ["lC1IbzkvHmY","매일 뛰어도 평생 제자리인 러닝초보가, 달리기 \"체질\"을 바꿔주는 진짜 훈련법","L",52.6,"막판스퍼트","6개월 전"],
  ["Q7vVPM9nLH8","올바른 러닝 방법, 발목 쓰는 법ㅣ김병곤 박사 2부","L",50.8,"닥터딩요","6개월 전"],
  ["b2xLzSn10VM","마라톤 기록이 미친 듯이 빨라지는 진짜 이유","L",50.8,"애슬레틱 라이프","11개월 전"],
  ["Xq3H4cHRCxk","하버드 교수가 밝힌 충격적 사실! 우울증과 치매를 막고 싶다면 운동화를 신어라","L",50.7,"KBS 생로병사의 비밀","10개월 전"],
  ["J-FsMknbkMU","걷는 속도로 뛰었더니 지방이 녹아 내립니다ㅣ올바른 걷기와 슬로조깅 방법","L",46,"닥터딩요","6개월 전"],
  ["XFDnYb6MJ5I","숨이 차지 않는 러닝 호흡법","S",137,"","올해"],
  ["QFcLMrdSy88","10km를 달리면 몸에 생기는 변화","S",90,"","올해"],
  ["IHBFLa2HPXw","러닝 '이 때' 해야 유산소 효과 지립니다","S",81,"","올해"],
  ["kUU_GPkoVf8","헬스랑 러닝을 같이하면 무서운 이유","S",20,"","올해"]],"초보":[["ut4WDMZG-ng","초보인 척 러닝 크루에 들어간 이봉주 (깜짝카메라)","L",269.1,"션과 함께","2주 전"],
  ["K8sYRXeLtVg","\"이것만 죽어라 반복해라\" 러닝 초보도 5km 쉽게 달리는 훈련법","L",191.5,"지식인사이드","6개월 전"],
  ["AUVTmK1Wt3M","저질체력 한가인이 정기적으로 러닝을 했더니 나타난 놀라운 변화","L",140.9,"자유부인 한가인","10개월 전"],
  ["d4DEYw5F0Xk","천천히 뛰었을 뿐인데… 12주 뒤 몸이 달라졌습니다","L",122.6,"초인 CHOIN","1개월 전"],
  ["B4A61x6T3ao","러닝 궁금증 전부 다! '초보자~10km' 맞춤 Q&A!","L",100.4,"션과 함께","1년 전"],
  ["aAf6JUIlbGA","2026년 런닝화 총정리(안정화, 쿠셔닝화, 카본화)","L",64.2,"런픽","8개월 전"],
  ["fRCHetcyn0c","러닝 고인물들이 추천해주는 BEST 러닝화(입문용 러닝화)","L",59.3,"션과 함께","1개월 전"],
  ["p8a_8N1J0eA","6~9만원대 가성비 러닝화 딱 정해드립니다!","L",44.9,"업스탯","4개월 전"],
  ["NXuvbhshGuQ","무작정 뛰면 큰일납니다. 초보러너 필수 시청! (김은서 나이키 트레이너)","L",42.2,"부모님 연구소","1개월 전"],
  ["Zd52BienOxM","러닝화 그냥 이거 사세요. (광고아님)","L",38,"마라닉TV · 런업TV","9개월 전"],
  ["rMOQlVe3Cy8","러닝 초보가 무조건 하는 실수 6가지","L",36.8,"한스 HANS","6개월 전"],
  ["6C91I8PLIQo","제발 '이것' 모르고 10km 뛰지 마세요","L",31.6,"러닝 TMI","3주 전"],
  ["pob0HncP1Jk","10km 러닝의 중요성","S",469,"","올해"],
  ["H95eqfb1eLk","5분에서 30분 뛸 수 있는 러닝 호흡법","S",90,"","올해"],
  ["NHwYmq_6W0s","슬로우조깅 자세 가장 쉽게 알려드림(13년차 트레이너)","S",82,"","올해"],
  ["uKesajx5vpE","건강을 위해서 뛴다? 5km면 충분합니다","S",3.6,"","올해"]],"10km":[["iGlS99t6kF0","나랑 부산 퇴근런 10km 뛸 사람? (with 정국)","L",190.2,"BANGTANTV","3개월 전"],
  ["bvAtE60s6WY","10km 38분에 도전한 아이돌 민호, 2026 서울마라톤 결과 공개","L",130.2,"최민호 MINHO","7개월 전"],
  ["1Fwnk-Bn1ao","역대급 게스트들과 함께 SM런 10km 마라톤","L",86.3,"M2","2주 전"],
  ["bFY0Jy52sNI","육상선수 김민지의 인생 첫 10km 마라톤 도전","L",48.8,"김민지 KIMMINGEE","3주 전"],
  ["7vQ1DlDXAX0","연예계 러닝 1,2위의 숨막히는 10km 대결 (권화운 vs 남태령)","L",45.7,"션과 함께","1개월 전"],
  ["EIMmLnPYcUA","10km를 34분대로?! 연예계 1등 러너 권화운","L",29.9,"MBC","7개월 전"],
  ["CTWgbgUrM6s","어른도 힘든 10km 마라톤… 만7세의 눈물의 도전","L",29.1,"MariAndFriends","11개월 전"],
  ["imHoSkJU06w","초보러너 10km 쉬지 않고 달리기 위한 포인트","L",28.5,"런클리어 RUNCLEAR","9개월 전"],
  ["FEG3N2B7XWA","풀코스보다 더 힘들었던 10K 마라톤","L",21.2,"김효정 kimhyojung","5개월 전"],
  ["ZWbUp35sSLM","10km 기록 줄이고 싶으면 이렇게 뛰세요","L",19.9,"최민호 MINHO","7개월 전"],
  ["L15g7HDqyvc","매일 10km 뛰는데 왜 안 늘까요? 마일리지의 함정","L",19.8,"러너임바","10개월 전"],
  ["s7FVLgiD78M","10km 기록별 조깅 페이스 (60분~30분대)","L",18.9,"러너임바","10개월 전"],
  ["UWT9s1j_cwo","5km 20분 벽을 깬 러닝 코치가 알려주는 sub20 도달법","L",17.6,"막판스퍼트","9개월 전"],
  ["-_swHs_G77I","일반인 러너 탑티어 속도 체감","S",66,"","올해"],
  ["hnFKttPsx70","10km를 30분대에 주파하는 압도적인 러닝 페이스","S",49,"","올해"],
  ["qrqlEDOZG2Y","10km 기록향상 치트키, NSM 훈련법","S",31,"","올해"],
  ["jebi2lFmuq4","10km 기록변화 2년 전 모습 비교","S",27,"","올해"],
  ["7BFRIUQQK00","8개월, 10km 50분 언더 할 수 있을까?","S",22,"","올해"],
  ["6kW2yinFYHM","10km 전략 이렇게만 해보세요","S",16,"","올해"],
  ["sji1xLuMcBs","10km 50분대면 풀코스 완주 가능합니다","S",10,"","올해"]],"하프":[["uSU5DE3wqB0","인생 첫 하프마라톤 끝나고 고삐 풀린 곽범","L",112.9,"스튜디오 수제","4개월 전"],
  ["gXUSv4Oy3YY","마라톤 '2시간 벽' 깼다..'1시간 59분 30초' 대기록","L",61.4,"SBS 뉴스","6개월 전"],
  ["vI02fjhWmJU","극한84 발가락 접질러도 독기있게 달리는 츠키","L",39.6,"MBC","10개월 전"],
  ["EqZwvoZqW50","하프 마라톤 기록을 단축해 줄 필수 훈련 5가지","L",28.7,"Phily Bowden","3개월 전"],
  ["K3dRHBuEUOg","2개월차 러너 이은지의 하프마라톤 도전기","L",22.7,"MBC","10개월 전"],
  ["AXmUu6dptVw","딱 하나의 훈련만 해야 한다면, 저는 오로지 이것만 합니다","L",21.9,"러너임바","10개월 전"],
  ["-mcSPGWMYAs","10km 33분 40초! 낭만러너 심진석 압도적 1위","L",20.3,"몬스터한_마라톤이야기","1개월 전"],
  ["Nf7ugI2_fb4","함께 허문 '2시간의 벽'..알수록 더 경이로운 이유","L",19.3,"스포츠머그","6개월 전"],
  ["iRItuh4Zpdg","안 먹고 마라톤 뛰어봤습니다 (뉴발 하프 마라톤)","L",17.5,"한스 HANS","8개월 전"],
  ["3aX_tZJRGlU","마라톤 레전드 권은주 감독이 말하는 10km, 하프 훈련방법","L",17.3,"마라닉TV","7개월 전"],
  ["d_aOE3KLIZE","페이스메이커 자처한 권화운의 와인 러닝","L",16.9,"MBC","10개월 전"],
  ["H0nC91hdfxw","장거리 훈련을 실패하는 게 거리가 길어서가 아닙니다","L",15.8,"러너임바","9개월 전"],
  ["2ApXQfoOxBs","스톤이랑 하프 동반주하고 왔어요","L",13.1,"힙으뜸","11개월 전"],
  ["NQ-2XcIAM2s","내 10km 러닝 기록, 어느 수준일까? 제마 & 춘마 통계로 본 기록","L",13.1,"쎄뇨르킴 러닝채널","10개월 전"],
  ["jWs_EQMWGG0","10,000m 1위가 하프마라톤을 뛴다면?","S",128,"","올해"],
  ["iL90Pj_36nc","하프마라톤 준비 이렇게만 하세요","S",39,"","올해"],
  ["rx7e_wHwROM","심으뜸 하프마라톤 기록은?","S",23,"","올해"],
  ["b0X9rqGgDto","하프 마라톤 서브2 달성을 위한 2가지 핵심 운동","S",11,"","올해"],
  ["E2CB1zaSdD8","일반인도 할 수 있는 하프마라톤 완주 꼼수","S",4.1,"","올해"]],"풀코스":[["1UWgvCPbkEU","풀코스 마라톤","L",183.2,"인생84","1년 전"],
  ["nX_DHc4-iGU","먹다보니 42km 완주했네요..2025 서울마라톤","L",169.1,"한스 HANS","1년 전"],
  ["ZRGopE3ZCeE","\"이걸 매일 한다고? 미쳤다\" 국가대표 엘리트 육상 선수들의 72시간","L",134.6,"권화운","2개월 전"],
  ["I4-2d8_8Kho","마라톤 한 번도 안 뛰어본 저질체력의 풀코스 42.195km 도전","L",131.7,"더블비","1년 전"],
  ["kKmnSefovKY","황영조 감독, 낭만러너 심진석의 오버페이스 해답을 찾았다","L",120.4,"영조형","2개월 전"],
  ["W6aMEgZKn14","세계에서 가장 긴 만리장성 마라톤 도전","L",70.9,"더블비","5개월 전"],
  ["-iErbzUNMqA","태국음식 먹다보니 42km 완주 (치앙마이 마라톤)","L",67.1,"한스 HANS","10개월 전"],
  ["wTWhS5l6KH4","아구찜 먹으면서 마라톤 완주했습니다","L",64.5,"한스 HANS","7개월 전"],
  ["5DJTyqxGzhU","1,000m를 오버페이스로 질주하는 심진석의 실제 속도는?","L",61.2,"션과 함께","10개월 전"],
  ["ZDk9MeHQWi8","장거리의 공포를 느껴버린 민호, 인생 첫 40km 훈련","L",51.9,"최민호 MINHO","2주 전"],
  ["klDDNvBPBMs","5개월 러닝 훈련 끝, 박서진 마라톤 완주 성공?","L",12.9,"KBS Entertain","2주 전"],
  ["WdDfi3F6t7s","JTBC마라톤까지 2시간 29분으로 완주했습니다","L",11.6,"안은태","7일 전"],
  ["t92tNsJzkDI","한국 마라톤은 장난이라는 케냐 마라톤 대회","S",258,"","올해"],
  ["VbCvnQdZf50","마라톤 선수가 3km 경기에 나가면 어떨까?","S",218,"","올해"],
  ["lkKoBLWOyCk","이봉주 페이스를 일반인이 달리면?","S",158,"","올해"],
  ["MiUS7a43P5U","100만 명이 인생을 본 기안84 마라톤","S",135,"","올해"],
  ["s1QDxFoRyNk","마라톤 세계 신기록 페이스","S",133,"","올해"],
  ["BftNr-QKOnI","이봉주 전성기 때 러닝머신 타는 법","S",106,"","올해"],
  ["Un1FEyZRJBk","요즘 러너들이 느끼는 박탈감","S",97,"","올해"],
  ["PVD8ygN3Lfg","풀코스 마라톤 쉽게 뛰는 방법","S",76,"","올해"]],"서브3":[["-kTYiOkQWUA","\"42.195km? 점심 전에 다녀올게요\" 가장 잘 달리는 남자, 킵초게","L",144.4,"라이프시크릿","1년 전"],
  ["AWyWh_kJukw","이건 기적이에요.. 서브3 페이스로 놀랍게 회복한 이봉주 선배님","L",102.9,"션과 함께","11개월 전"],
  ["WHISwq3EUIY","포어풋으로 한 달에 1,000km 이상 뛴다고??","L",54.3,"영조형","6개월 전"],
  ["fzrtKCBr7Js","션, 첫 서브3 도전 결과는?","L",47.7,"션과 함께","7개월 전"],
  ["Bvwr-NFWkqk","3대 500 vs 서브3, 이 사람들의 선택은?","L",38.1,"아모띠 amotti","4주 전"],
  ["Ono3L9inXDM","조깅페이스로 서브3 가능하다고?? 영조형의 마라톤 특훈","L",33.1,"영조형","7개월 전"],
  ["qtuaoVz0j-8","풀코스를 2시간대?! 션도 충격받은 70대 러너의 몸 관리 비결","L",30.3,"션과 함께","5개월 전"],
  ["o4Pr9_jy-dg","요즘 마라톤 '서브3 러너'가 많아진 이유","L",28.7,"영조형","7개월 전"],
  ["555yiCOipdI","이 종아리로 서브3 11번 했다고?","L",26.8,"영조형","5개월 전"],
  ["iqbbM6sdHKY","마라톤 완주자 상위 5% 기록 '서브3'는 얼마나 힘든 걸까?","L",24.6,"애슬레틱 라이프","7개월 전"],
  ["5EHurb9p2GA","올림픽 금메달리스트 황영조의 러닝화 선택 방법","L",22.9,"영조형","3개월 전"],
  ["LH6kmb_K92c","러닝초보가 서브3까지 걸리는 '진짜' 시간","L",11.3,"막판스퍼트","10개월 전"],
  ["2npx1woCxyI","5KM 20분, 다른 거 찾지 말고 이것만 하세요","L",11.2,"하낫둘","6개월 전"],
  ["pU7U8VKJk5g","서브3 페이스는 조깅이라고?!","S",67,"","올해"],
  ["kypqjgt0rU8","스톤이 알려주는 서브3 비결","S",17,"","올해"],
  ["Yz1aSbGAkQ0","풀코스 서브3의 충격 식단","S",7.6,"","올해"],
  ["WXOEZxfhK-A","션 발작버튼 '서브3'ㅣ뛰어야 산다2","S",4.1,"","올해"],
  ["Q1ivS3MiHxg","85kg 몸으로 풀코스 마라톤 서브3를 뛴 현실적인 방법","S",3.9,"","올해"]]};

/* 추천 러닝 유튜버 (구독자 10만 명 이상, 2026-11-11 확인) [키, 이름, 핸들, 구독자(만), 소개] — 앞의 3개가 대표 채널 */
const TIP_CHANNELS = [["sean","션과 함께","@Togetherwithsean",51.1,"가수 션의 러닝 채널. 이봉주·엘리트·연예인 러너와 함께하는 훈련법과 러닝 Q&A"],["hong","홍범석","@HongBeomseok",38,"러닝 크리에이터. 러닝 드릴, 10km 기록 도전, 실전 훈련 노하우"],["maranic","마라닉TV","@maranic_tv",22.6,"슬로우조깅·스트레칭·러닝 기초부터 마라톤 레전드 인터뷰까지"],["hans","한스 HANS","@hans_daily",62.9,"서울마라톤부터 사막·울트라 마라톤까지 유쾌한 완주 도전기"],["runup","런업TV","@runup_tv",17.6,"러닝화·러닝 기어 리뷰와 비교"],["athletic","애슬레틱 라이프","@애슬레틱라이프",15.9,"러닝화 기술과 마라톤 과학을 쉽게 풀어주는 채널"],["runclear","런클리어 RUNCLEAR","@runclear_running",15.5,"초보 러너 맞춤 훈련 포인트와 러닝 팁"],["zini","지니코치","@zinirun",13.7,"러닝 코치의 매일 달리기와 기록 단축 훈련"],["soterfly","소터플라이","@soterfly",13.6,"마라톤 국가대표 출신에게 배우는 러닝 자세 시리즈"],["youngjo","영조형","@황영조형",11.9,"황영조 감독의 마라톤 특훈과 레이스 전략"]];

/* ---------- 대회 ----------
   마라톤온라인(roadrun.co.kr) 등록 대회 (2026-11-10 수집)
   [이름, 날짜, 시도, 장소, 종목, 공식 홈페이지, 접수상태, 마라톤온라인 번호] */
/* 브랜드별 인기 TOP 3 — RunRepeat 인기순(order_by=popular, 26년 11월 11일 조회) */
const TOP3 = {
  nike: ['nike-vomero-plus', 'nike-alphafly-4', 'nike-vomero-18'],
  adidas: ['adidas-adizero-evo-sl', 'adidas-adizero-adios-pro-evo-3', 'adidas-adizero-adios-pro-5'],
  asics: ['asics-metaspeed-sky-tokyo', 'asics-superblast-3', 'asics-novablast-6'],
  hoka: ['hoka-bondi-9', 'hoka-clifton-11', 'hoka-mach-7'],
  nb: ['nb-fresh-foam-x-more-v6', 'nb-fresh-foam-x-1080-v15', 'nb-fuelcell-supercomp-trainer-v3'],
  puma: ['puma-fast-r-nitro-elite-3', 'puma-velocity-nitro-5', 'puma-deviate-nitro-elite-4'],
  saucony: ['saucony-endorphin-speed-5', 'saucony-endorphin-pro-5', 'saucony-triumph-24'],
  mizuno: ['mizuno-wave-rider-30', 'mizuno-neo-vista-3', 'mizuno-wave-rebellion-pro-3'],
  brooks: ['brooks-adrenaline-gts-25', 'brooks-ghost-18', 'brooks-glycerin-23'],
  on: ['on-cloudmonster-3', 'on-lightspray-cloudboom-strike-2', 'on-cloudmonster-3-hyper'],
  salomon: ['salomon-aero-glide-4', 'salomon-s-lab-phantasm-2', 'salomon-s-lab-spectur'],
  ua: ['ua-infinite-pro', 'ua-charged-assert-10', 'ua-infinite-elite-2'],
};
const RACES = [
  ["서울 빵빵런 2026","2026-11-14","서울","뚝섬한강공원 수변무대",["10km","5km"],"http://seoul.bbangrun.com","접수중",41895],
  ["그 시절 스타들과 달리는 레트로 런 IN 증평","2026-11-14","충북","증평군 보강천 시민체육공원",["10km","5km"],"http://n-runplus.co.kr","마감",41872],
  ["2026 통큰런","2026-11-14","서울","상암 월드컵공원 평화광장",["10km","5km","가족·어린이"],"http://tongkeun-run.com","마감",41831],
  ["2026 영종 하늘길 마라톤","2026-11-14","인천","인천, 영종 씨사이드파크 일대",["Half","10km","5km"],"http://www.leaveit.co.kr/","마감",41825],
  ["제2회 안양천 단풍길 마라톤","2026-11-14","서울","신정교 하부 영롱이 억새구장",["Half","10km","5km"],"http://maplerun.kr","마감",41760],
  ["제2회 한강 브릿지 런","2026-11-14","서울","구리한강시민공원 주차장",["울트라"],"http://www.mtrailrun.kr/","접수중",41821],
  ["제26회 순천 남승룡마라톤대회","2026-11-14","전남","순천시 팔마로 333",["Full","Half","10km","5km"],"http://sc-marathon.kr","마감",41725],
  ["2026 포항마라톤챔피언십","2026-11-14","경북","영일대해상누각",["10km","5km"],"http://pohangmarathon.com/","마감",41528],
  ["2026 연수구청장배 송도 WALK & RUN","2026-11-15","인천","송도달빛공원",["Half","10km","5km","걷기"],"http://walknrun.kr","접수중",41910],
  ["2026 FILA RUN & ESPRESSO","2026-11-15","서울","상암 월드컵공원 평화광장",["10km"],"http://www.fila.co.kr/pages/fila-run-espresso-10k-seoul","마감",41847],
  ["2026 청춘레이스","2026-11-15","서울","우이천 다목적광장",["Half","10km","5km"],"http://youngrace.kr","마감",41909],
  ["2026 손기정평화마라톤","2026-11-15","경기","파주 임진각",["Full","Half","10km"],"http://sonkeechungrun.com","마감",41845],
  ["2026 에코나우런","2026-11-15","서울","뚝섬한강공원 수변무대 앞 광장",["5km"],"http://econow.campaignus.me/econow_run","마감",41906],
  ["2026 나눔레이스 인 용인","2026-11-15","경기","세리박위드용인",["10km","5km"],"http://nanumrun.or.kr","마감",41817],
  ["제12회 창원특례시장배 광려천마라톤","2026-11-15","경남","창원시 광려천수변공원",["Half","10km"],"http://www.cwaaf.kr/bbs/board.php?bo_table=rally&wr_id=3","마감",41838],
  ["2026 영남일보 혁신도시 마라톤","2026-11-15","대구","대구혁신도시 신서중앙공원",["10km","5km"],"http://inno.ynmarathon.kr","마감",41903],
  ["2026 제주감귤마라톤","2026-11-15","제주","조천운동장",["Full","Half","10km"],"http://marathon.ihalla.com","마감",41695],
  ["제28회 부산국제마라톤","2026-11-15","부산","사하구 다대포해수욕장",["Half","10km","5km"],"http://kjmarathon.com","마감",41699],
  ["26회 창원통일마라톤","2026-11-15","경남","창원종합운동장 보조경기장",["5km"],"http://www.tongilmarathon.kr","마감",41842],
  ["우리함께런 with 빗썸나눔","2026-11-15","서울","여의도한강공원 물빛무대앞광장",["10km","5km"],"http://bithumbnanumrun.com","마감",41902],
  ["제2회 세종특별자치시 전국 마라톤","2026-11-15","세종","세종시민운동장",["10km","5km"],"http://sjrun.com","마감",41602],
  ["2026 가민런 코리아","2026-11-15","경기","고양종합운동장",["Half","10km"],"http://runable.me/product/18977?comp=18962","마감",41614],
  ["제4회 영남알프스 전국 하프마라톤","2026-11-15","울산","울주군 영남알프스 일원",["Half","10km","5km"],"http://영남알프스마라톤.kr","마감",41565],
  ["2026 MBN 서울마라톤","2026-11-15","서울","광화문 광장 → 잠실종합운동장",["Half","10km"],"http://mbn-seoulmarathon.com","마감",41600],
  ["제17회 행복트레일런 축제","2026-11-15","서울","청계산수변공원",["트레일런"],"http://happytrailrun.com","마감",41585],
  ["2026 9회 서울평화마라톤","2026-11-15","서울","신정교하부육상트랙구장",["10km","5km"],"http://seoultongilrun.org","접수중",41686],
  ["제24회 상주 곶감 마라톤 대회","2026-11-15","경북","상주시민운동장",["Full","Half","10km"],"http://www.mara1080.com/event/c8dc2c22-a83a-4743-9e34-c884e9809dbb","마감",41563],
  ["제24회 고창고인돌마라톤","2026-11-15","전북","고창공설운동장",["Half","10km","5km"],"http://www.gcrun.com","마감",41644],
  ["제3회 무등산더블하트국제트레일런","2026-11-15","광주","조선대학교",["트레일런"],"http://www.cuk-sports.com/","마감",41558],
  ["제24회 대모산·구룡산 트레일런","2026-11-15","서울","수서역 7번출구광장",["10km","트레일런"],"http://www.koreatrail.net/home/main.php?link=event&einc=eapp&opp=20241014202801&csno=20200702232740#baseline","접수중",41522],
  ["제16회 대전서구청장배 마라톤대회","2026-11-15","대전","대전 유성구 엑스포 다리밑",["10km","5km","가족·어린이"],"http://JGMRUN.COM","마감",41830],
  ["2026 GETR 구미 에코 트레일레이스","2026-11-21","경북","구미시 경운대학교",["10km","트레일런","가족·어린이"],"http://naver.me/59lo1fB8","마감",41885],
  ["대한독립 천안 트레일런 산악등반대회","2026-11-21","충남","천안 독립기념관 태극기광장",["트레일런"],"http://cafe.naver.com/daehanindependence","접수중",41938],
  ["2026 서울 라이프마라톤(가을)","2026-11-21","서울","평화의공원 평화광장",["Half","10km","5km"],"http://seoul.lifemarathon.co.kr","접수중",41894],
  ["런텐 14차 레이스 JUST RUN10 대구","2026-11-21","대구","금호강 러닝성지",["10km","5km"],"http://runten.co.kr","마감",41868],
  ["K-거상 트레일 러닝 대회","2026-11-21","경남","의령여자중학교",["5km","트레일런"],"http://www.kpioneertrailrun.co.kr/","접수중",41899],
  ["2026 세정 가을바람 유러닝페스타","2026-11-21","경기","하남 미사리 조정경기장",["10km","5km"],"http://urfesta.com","마감",41673],
  ["2026 남해트레일레이스(가을)","2026-11-21","경남","남해공설운동장",["트레일런"],"http://rocknrun.kr","접수중",41748],
  ["GIVE RUN 2026 부산","2026-11-21","부산","부산 대저생태공원",["10km","5km"],"http://giverun.kr","마감",41789],
  ["2026 아식스 서울신문 고프리런","2026-11-21","서울","여의도공원 문화의마당",["Half","10km"],"http://gofree.seoul.co.kr/","마감",41865],
  ["제19회 대구광역시장기 생활체육 육상대회","2026-11-22","대구","대구스타디움",["10km"],"http://www.daegutf.co.kr/front/board/view.php?code=game&tab=%EB%8C%80%EA%B5%AC&mid=0003%2C0014&no=722","마감",41925],
  ["부산항일학생의거 86주년 부산시민이어달리기","2026-11-22","부산","구덕운동장 ~ 초읍",["이어달리기"],"http://i1123.org","마감",41908],
  ["2026 인천마라톤","2026-11-22","인천","인천아시아드 주경기장",["Full","10km","5km"],"http://incheonmarathon.or.kr","마감",41832],
  ["2026 평화의숲 마라톤","2026-11-22","서울","상암 월드컵공원 평화광장",["10km","5km"],"http://peace-run.kr/","접수중",41763],
  ["2026 서울 억새풀 마라톤대회","2026-11-22","서울","영등포 영롱이 억새구장",["Half","10km","5km"],"http://ssrun.kr/","접수중",41774],
  ["자이스 스마일 레이스","2026-11-22","서울","여의도공원 문화의 마당",["10km","5km"],"http://zeiss-smilerace.kr","마감",41768],
  ["2026 김대중마라톤대회","2026-11-22","전남","목포종합경기장",["Half","10km","5km"],"http://www.djrun.kr/","마감",41803],
  ["2026 무주반딧불평화마라톤","2026-11-22","전북","무주 등나무운동장",["Half","10km","5km"],"http://mujumarathon.com","마감",41841],
  ["제6회 고용노동부장관배 직장인마라톤","2026-11-22","경기","하남 미사경정공원",["10km","5km"],"http://krun.or.kr","마감",41859],
  ["2026 SPOTV NIGHT RUN","2026-11-28","경기","렛츠런파크 서울",["5km","가족·어린이"],"http://spotvrun.co.kr","접수중",41952],
  ["목욕런 2026","2026-11-28","서울","월드컵공원 평화의 광장",["10km","5km"],"http://mokyokrun.shop","마감",41947],
  ["2026 착한서구 공부방 기부앤런","2026-11-28","광주","영산강 자전거길 (극락교~서창교)",["10km","5km"],"http://기부앤런.kr","접수중",41927],
  ["2026 평화런","2026-11-28","서울","여의도공원 문화의마당",["10km","5km"],"http://www.peacerun.kr","마감",41766],
  ["2026 남원 춘향 전국 마라톤대회","2026-11-28","전북","남원 종합스포츠타운 운동장",["Full","Half","10km","5km"],"http://mara1080.com/event/c2cec79b-c38a-4832-bf4f-7ecb499cdcd5/guide/overview","마감",41675],
  ["2026 서울사랑마라톤","2026-11-29","서울","성북구 석관동",["Half","10km","5km"],"http://seoulloverun.com","접수중",41891],
  ["제9회 광진구청장배 육상대회","2026-11-29","서울","중곡동 중랑천 물놀이장 옆",["10km"],"http://ksgaaf.co.kr/","접수중",41898],
  ["2026 원주 치악마라톤","2026-11-29","강원","원주종합운동장",["Half","10km","5km"],"http://wonju.raceplan.co.kr/","마감",41879],
  ["가야왕도 김해 전국어울림 마라톤","2026-11-29","경남","롯데워터파크 제3주차장",["Half","10km","5km"],"http://gimhaemarathon.imweb.me/","마감",41804],
  ["제14회 안중근 평화 마라톤","2026-11-29","서울","여의도공원 문화의마당",["Half","10km","5km"],"http://ajgrun.kr","접수중",41759],
  ["2026 새한미디어 마라톤","2026-11-29","서울","평화의공원 평화광장",["Half","10km","5km"],"http://sh-run.co.kr/","접수중",41807],
  ["2026 정읍공동체 프리마켓 마라톤","2026-11-29","전북","정읍천변 어린이전용축구장",["10km","5km","가족·어린이"],"http://www.xn--ob0bs4k27c8xc9da633vynbkyur2ft5hckl.kr/","접수중",41810],
  ["2026 천안 희망나눔 마라톤","2026-11-29","충남","천안 독립기념관",["10km","5km","걷기"],"http://runwithus.co.kr","접수중",41741],
  ["2026 모악트레일런","2026-12-05","전북","대한민국술테마박물관",["트레일런"],"http://samsam3315.imweb.me/75","접수중",41941],
  ["제4회 가든파이브 라이프 레이스","2026-12-05","서울","가든파이브라이프 중앙광장",["Half","10km","5km"],"http://www.irunman.kr","접수중",41867],
  ["2026 허그런(HUG RUN)","2026-12-05","서울","상암 월드컵공원 평화광장",["10km","5km"],"http://hugrun.kr","마감",41911],
  ["전국마라톤협회 2026 골드런 레이스","2026-12-05","충남","금산세계인삼엑스포광장",["Half","10km","5km"],"http://mara1080.com/event/df4b4e7d-4fbc-4843-858c-f15c032e92cb","접수중",41833],
  ["제23회 한강시민마라톤","2026-12-05","서울","여의도 물빛무대 앞 광장",["Half","10km","5km"],"http://www.hangangmarathon.kr/","접수중",41720],
  ["제1회 정읍 고향사랑기부마라톤","2026-12-06","전북","내장산 단풍생태공원",["10km","5km","가족·어린이"],"http://love.myrunup.kr","접수중",41888],
  ["2026 화순고인돌마라톤","2026-12-06","전남","화순공설운동장",["Half","10km","5km"],"http://xn--299a84k68cg1cr8pi6h5qsd0i.kr/index.asp","접수중",41923],
  ["제20회 양산전국하프마라톤","2026-12-06","경남","양산종합운동장",["Half","10km","5km"],"http://ysmarathon.kr","마감",41851],
  ["2026 황영조 로드레이스","2026-12-06","인천","정서진 아라타워",["Half","10km"],"http://roadracing.co.kr/","접수중",41802],
  ["2026 대전보문산트레일","2026-12-06","대전","오월드 주차장",["트레일런"],"http://www.mtrailrun.kr/","접수중",41744],
  ["2026 부산브릿지 마라톤","2026-12-06","부산","부산 벡스코 제1전시장",["Full","10km"],"http://www.busanmarathon.com","마감",41710],
  ["제6회 2026 청춘런","2026-12-06","서울","상암동 평화의공원 평화광장",["10km","5km"],"http://www.youthrun.co.kr","접수중",41860],
  ["2026 평창 스노우런","2026-12-12","강원","알펜시아 스키점프센터",["15km"],"http://order.doortoout.com/12/8/78","접수중",41939],
  ["2026 연합뉴스 하남 국제 트레일런 페스티벌","2026-12-12","경기","미사경정공원 및 하남시 일대",["10km","5km","트레일런"],"http://yhitf.co.kr","접수중",41905],
  ["2026 소년소녀 가장 돕기 기부런","2026-12-12","서울","상암동 평화광장",["10km","5km","걷기"],"http://gibukidsrun.kr","마감",41812],
  ["화성레이스","2026-12-12","경기","봉담2생태체육공원",["10km","5km"],"http://hwaseongrace.com","접수중",41966],
  ["2026 ONE MORE RUN","2026-12-12","인천","영종 씨사이드파크 일원",["Half","10km","5km"],"http://www.omrun.co.kr","접수중",41866],
  ["2026 성남 헤리티지 런","2026-12-12","경기","탄천종합운동장",["10km","5km"],"http://charun.co.kr","접수중",41936],
  ["2026 이순신런페스타","2026-12-13","충남","아산 신정호국민관광지 야외음악당",["6.4km"],"http://yssmarathon.com","접수중",41951],
  ["제2회 일자산 트레일 러닝","2026-12-13","서울","일자산 보훈병원 앞",["트레일런"],"http://koreatrail.net","접수중",41914],
  ["제5회 밤섬 마라톤","2026-12-13","서울","상암월드컵공원 평화광장",["Half","10km","5km"],"http://bamseom.com/","접수중",41784],
  ["제36회 진주마라톤","2026-12-13","경남","진주노을공원",["Full","Half","10km","5km"],"http://www.jinma.co.kr","마감",41745],
  ["부산금정산성트레일","2026-12-13","부산","금정산성공원",["트레일런"],"http://www.mtrailrun.kr/","접수중",41642],
  ["2026 시즌마감마라톤대회","2026-12-13","인천","인천아시아드 경기장 북측 광장",["Half","10km","5km"],"http://42195race.com/","접수중",41935],
  ["경주 통포트레일","2026-12-27","경북","경주남산 통일전주차장",["트레일런"],"http://www.mtrailrun.kr/","접수중",41787],
  ["2027 제11회 새해일출런","2027-01-01","서울","신정교하부육상트랙구장",["Half","10km","5km"],"http://www.xn--zl2bt5ndwfh3g20k.kr/","접수중",41942],
  ["제19회 전국새해알몸마라톤","2027-01-03","대구","수성구 미술관로 88",["10km","5km"],"http://r.dgrunner.co.kr","접수중",41940],
  ["2027 전마협 새해 동계 마라톤","2027-01-10","충남","금산 인삼 엑스포광장 주차장",["Half","10km","5km"],"http://mara1080.com/event/2c881231-b5dd-4ae8-a587-c02d539566af","접수중",41919],
  ["제21회 여수해양마라톤","2027-01-10","전남","여수 진남경기장",["Full","Half","10km","5km"],"http://ysmarathon.co.kr/info/summary","접수중",41944],
  ["2027 북극곰 마라톤","2027-01-23","서울","신정교 하부 영롱이 억새구장",["Half","10km","5km"],"http://polarbearrun.kr","접수중",41957],
  ["2027 전마협 고흥 누리호 마라톤대회","2027-02-13","전남","고흥만 수변노을공원",["10km","5km"],"http://mara1080.com/event/f3c362bc-532f-4f3c-bc21-76d3023bfb3a","접수중",41931],
  ["제23회 밀양아리랑마라톤","2027-02-20","경남","밀양종합운동장",["Half","10km","5km"],"http://www.miryangmarathon.com","접수중",41900],
  ["2027 희망 청춘 런","2027-02-20","서울","신정교 하부 영롱이 억새구장",["Half","10km","5km"],"http://hope-young.kr","접수중",41960],
  ["2027 전마협 청주 무심천 투데이 마라톤 (토)","2027-02-20","충북","청주 무심천 롤러스케이트장",["Half","10km","5km"],"http://mara1080.com/event/3a1225a6-b473-4fb7-8f26-cda304cff617","접수중",41877],
  ["2027 전마협 청주 무심천 투데이 마라톤 (일)","2027-02-21","충북","청주 무심천 롤러스케이트장",["Full","Half","10km","5km"],"http://mara1080.com/event/b1aef378-cf4a-43b9-b2fd-a2d1ae33bc15","접수중",41878],
  ["희망드림 제24회 동계마라톤대회","2027-02-27","서울","여의도 한강 물빛광장",["Half","10km","5km"],"http://dkrun.co.kr","예정",41631],
  ["2027 대구마라톤","2027-02-28","대구","국채보상운동기념공원",["Full","10km","5km"],"http://daegumarathon.daegu.go.kr","마감",41918],
  ["2027 머니투데이방송 삼일절 마라톤","2027-03-01","서울","뚝섬한강공원 수변무대",["Half","10km","5km"],"http://mara1080.com/event/83acaaf1-1e30-411a-ac71-5e909ba1f7d9","마감",41901],
  ["2027 무주 반딧불 하프 마라톤","2027-03-07","전북","무주 등나무운동장",["Half","10km","5km"],"http://mara1080.com/event/6b68a627-24cf-4844-ac1d-9358b2a54227","접수중",41959],
  ["2027 부천국제10km로드레이스","2027-03-07","경기","부천시청 차없는거리",["10km","걷기"],"http://bskrun.co.kr/","접수중",41958],
  ["2027 금산 인삼 웰빙 마라톤대회","2027-03-13","충남","금산인삼엑스포주차장",["Half","10km","5km"],"http://mara1080.com/event/6397382b-be8d-4aee-b724-68f9fad03f29","접수중",41949],
  ["2027 서울마라톤 (동아마라톤)","2027-03-21","서울","광화문광장",["Full","10km"],"http://seoul-marathon.com","마감",41626],
  ["제3회 영광광풍마라톤","2027-03-28","전남","영광 스포디움",["Half","10km","5km"],"http://mara1080.com/event/92394e8e-a27c-4c3a-b286-7233340a9e7a","마감",41875],
  ["제9회 오션뷰 기장바다마라톤","2027-04-18","부산","오시리아 동부산관광9로",["Half","10km"],"http://www.badarun.co.kr","예정",41627],
  ["2027 강릉 옥계헌화로11k RUN","2027-04-24","강원","강릉시 옥계면",["10km"],"http://www.강릉헌화로11k.com","예정",41946],
  ["소아암환우돕기 제24회 서울시민마라톤","2027-05-16","서울","여의도 한강 물빛광장",["Half","10km","5km","걷기"],"http://soaam.runningdr.co.kr/","예정",41967],
  ["희망드림 제24회 새벽강변 국제마라톤","2027-05-23","서울","여의도 한강 물빛광장",["Half","10km","5km","가족·어린이"],"http://amarunsb.com/","예정",41968],
  ["2027 제3회 이순신트레일런","2027-09-26","충남","아산시 신정호 공원",["트레일런"],"http://www.isunshintrail.com/","예정",41950],
  ["제7회 천안삼거리 흥타령울트라마라톤","2027-10-09","충남","천안삼거리공원",["울트라"],"http://www.chultra.kr/","예정",41236],
  ["2027 경포마라톤대회","2027-10-16","강원","강릉 경포해변 중앙광장",["Half","10km"],"http://www.경포마라톤.com","예정",41955],
];

/* ---------- 구매 사이트 ---------- */
const SHOPS = [
  ['무신사', 'https://www.musinsa.com/', '국내 최대 패션 플랫폼 — 러닝화 단독 할인', '#000000'],
  ['ABC마트', 'https://abcmart.a-rt.com/', '오프라인 매장 픽업 가능', '#d6001c'],
  ['그랜드스테이지', 'https://grandstage.a-rt.com/', 'ABC마트 프리미엄 라인', '#1f2937'],
  ['네이버 쇼핑', 'https://shopping.naver.com/', '최저가 비교', '#03c75a'],
  ['쿠팡', 'https://www.coupang.com/', '로켓배송 빠른 수령', '#e2231a'],
  ['SSG.COM', 'https://www.ssg.com/', '백화점 정품', '#ff5452'],
  ['롯데ON', 'https://www.lotteon.com/', '롯데백화점 정품', '#e60012'],
  ['29CM', 'https://www.29cm.co.kr/', '감도 높은 셀렉트', '#111111'],
];
