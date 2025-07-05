import { ProductInfo, ProductSearchResult } from '@/types/product';

export const mockProductSearch: ProductSearchResult[] = [
  {
    id: '1',
    productName: '광동 365케어 칼슘',
    company: '주식회사 뉴트리플래닛',
    registrationNumber: '2019001602484'
  },
  {
    id: '2',
    productName: '센트룸 종합비타민',
    company: '한국화이자제약',
    registrationNumber: '2020001234567'
  },
  {
    id: '3',
    productName: '비타민 D3 2000IU',
    company: '종근당건강',
    registrationNumber: '2021001345678'
  },
  {
    id: '4',
    productName: '오메가3 프리미엄',
    company: '대웅제약',
    registrationNumber: '2022001456789'
  },
  {
    id: '5',
    productName: '철분 플러스',
    company: '유한양행',
    registrationNumber: '2020001567890'
  }
];

export const mockProductDetails: Record<string, ProductInfo> = {
  '1': {
    company: '주식회사 뉴트리플래닛',
    productName: '광동 365케어 칼슘',
    registrationNumber: '2019001602484',
    registrationDate: '2025-07-04',
    expiryPeriod: '제조일로부터 24개월',
    appearance: '고유의 향미가 있고 이미, 이취가 없는 흰색의 장방형 코팅정제',
    dosage: '1일 1회, 1회 1정을 충분한 물과 함께 섭취하십시오.',
    packaging: 'PE(폴리에틸렌), PP(폴리프로필렌), PET(폴리에틸렌테레프탈레이트), PVC(폴리염화비닐), AL-Foil(알루미늄호일)',
    storage: '습기가 적고 직사광선을 피하여 서늘한 곳에 보관하며, 어린이 손에 닿지 않도록 주의하십시오.',
    precautions: '',
    functionalContent: '아연: 1. 정상적인 면역기능에 필요 2. 정상적인 세포분열에 필요\n칼슘: 1. 뼈와 치아 형성에 필요 2. 신경과 근육 기능 유지에 필요 3. 정상적인 혈액응고에 필요 4. 골다공증발생 위험 감소에 도움을 줌',
    ingredients: [
      { name: '칼슘', amount: '210', unit: 'mg' },
      { name: '아연', amount: '2.55', unit: 'mg' }
    ],
    standards: '1. 성상: 고유의 향미가 있고 이미, 이취가 없는 흰색의 장방형 코팅정제\n2. 칼슘: 표시량(210 mg/700 mg)의 80~150%\n3. 아연: 표시량(2.55 mg/700 mg)의 80~150%'
  },
  '2': {
    company: '한국화이자제약',
    productName: '센트룸 종합비타민',
    registrationNumber: '2020001234567',
    registrationDate: '2024-03-15',
    expiryPeriod: '제조일로부터 36개월',
    appearance: '고유의 향미가 있고 이미, 이취가 없는 분홍색의 타원형 코팅정제',
    dosage: '1일 1회, 1회 1정을 충분한 물과 함께 섭취하십시오.',
    packaging: 'PET병, 알루미늄 캡',
    storage: '직사광선을 피하여 서늘하고 건조한 곳에 보관하십시오.',
    precautions: '임신, 수유부는 의사와 상담 후 섭취',
    functionalContent: '비타민 A, B군, C, D, E, 엽산, 비오틴 등 종합비타민',
    ingredients: [
      { name: '비타민 A', amount: '800', unit: 'μg' },
      { name: '비타민 B1', amount: '1.4', unit: 'mg' },
      { name: '비타민 B2', amount: '1.6', unit: 'mg' },
      { name: '비타민 B6', amount: '2.0', unit: 'mg' },
      { name: '비타민 B12', amount: '2.5', unit: 'μg' },
      { name: '비타민 C', amount: '60', unit: 'mg' },
      { name: '비타민 D3', amount: '10', unit: 'μg' },
      { name: '비타민 E', amount: '14', unit: 'mg' },
      { name: '엽산', amount: '200', unit: 'μg' },
      { name: '비오틴', amount: '30', unit: 'μg' }
    ],
    standards: '각 비타민 성분별 표시량의 80~150% 함유'
  },
  '3': {
    company: '종근당건강',
    productName: '비타민 D3 2000IU',
    registrationNumber: '2021001345678',
    registrationDate: '2024-06-20',
    expiryPeriod: '제조일로부터 24개월',
    appearance: '투명한 연질캡슐',
    dosage: '1일 1회, 1회 1캡슐을 충분한 물과 함께 섭취하십시오.',
    packaging: 'PTP포장',
    storage: '직사광선을 피하여 서늘한 곳에 보관하십시오.',
    precautions: '과량 섭취 시 구토, 식욕부진 등이 나타날 수 있음',
    functionalContent: '비타민 D: 1. 칼슘과 인의 흡수에 이용에 필요 2. 뼈의 형성과 유지에 필요 3. 골다공증발생 위험 감소에 도움을 줌',
    ingredients: [
      { name: '비타민 D3', amount: '50', unit: 'μg' }
    ],
    standards: '비타민 D3: 표시량(50㎍/캡슐)의 80~150%'
  },
  '4': {
    company: '대웅제약',
    productName: '오메가3 프리미엄',
    registrationNumber: '2022001456789',
    registrationDate: '2024-01-10',
    expiryPeriod: '제조일로부터 24개월',
    appearance: '투명한 연질캡슐',
    dosage: '1일 2회, 1회 1캡슐을 충분한 물과 함께 섭취하십시오.',
    packaging: '병포장',
    storage: '직사광선을 피하여 서늘한 곳에 보관하십시오.',
    precautions: '항응고제 복용자는 의사와 상담 후 섭취',
    functionalContent: 'EPA 및 DHA 함유 유지: 1. 혈중 중성지질 개선에 도움을 줌 2. 혈행 개선에 도움을 줌',
    ingredients: [
      { name: '오메가-3', amount: '1000', unit: 'mg' },
      { name: 'EPA', amount: '180', unit: 'mg' },
      { name: 'DHA', amount: '120', unit: 'mg' }
    ],
    standards: 'EPA 및 DHA 합계: 표시량(1000mg/캡슐)의 80~150%'
  },
  '5': {
    company: '유한양행',
    productName: '철분 플러스',
    registrationNumber: '2020001567890',
    registrationDate: '2024-02-28',
    expiryPeriod: '제조일로부터 24개월',
    appearance: '갈색의 타원형 코팅정제',
    dosage: '1일 1회, 1회 1정을 충분한 물과 함께 섭취하십시오.',
    packaging: 'PTP포장',
    storage: '습기를 피하여 서늘한 곳에 보관하십시오.',
    precautions: '위장장애가 있는 경우 식후 섭취 권장',
    functionalContent: '철: 1. 체내 산소운반과 혈액생성에 필요 2. 에너지 생성에 필요',
    ingredients: [
      { name: '철분', amount: '14', unit: 'mg' },
      { name: '비타민 C', amount: '100', unit: 'mg' }
    ],
    standards: '철: 표시량(14mg/정)의 80~150%'
  }
};

// 새로운 형식의 제품 데이터
export const mockProducts = [
  {
    id: '1',
    name: '센트룸 종합비타민',
    brand: '한국화이자제약',
    description: '일일 필요한 모든 비타민과 미네랄을 함유한 종합비타민',
    price: 25000,
    size: '60정',
    rating: 4.8,
    ingredients: [
      { name: '비타민 A', amount: '800', unit: 'μg' },
      { name: '비타민 B1', amount: '1.4', unit: 'mg' },
      { name: '비타민 B2', amount: '1.6', unit: 'mg' },
      { name: '비타민 B6', amount: '2.0', unit: 'mg' },
      { name: '비타민 B12', amount: '2.5', unit: 'μg' },
      { name: '비타민 C', amount: '60', unit: 'mg' },
      { name: '비타민 D3', amount: '10', unit: 'μg' },
      { name: '비타민 E', amount: '14', unit: 'mg' },
      { name: '엽산', amount: '200', unit: 'μg' },
      { name: '비오틴', amount: '30', unit: 'μg' }
    ]
  },
  {
    id: '2',
    name: '오메가3 프리미엄',
    brand: '대웅제약',
    description: '고농축 EPA/DHA 함유로 심장 건강과 뇌 기능 개선',
    price: 35000,
    size: '60캡슐',
    rating: 4.6,
    ingredients: [
      { name: '오메가-3', amount: '1000', unit: 'mg' },
      { name: 'EPA', amount: '180', unit: 'mg' },
      { name: 'DHA', amount: '120', unit: 'mg' }
    ]
  },
  {
    id: '3',
    name: '비타민 D3 2000IU',
    brand: '종근당건강',
    description: '뼈 건강과 면역력 증진을 위한 고용량 비타민 D3',
    price: 18000,
    size: '90캡슐',
    rating: 4.7,
    ingredients: [
      { name: '비타민 D3', amount: '50', unit: 'μg' }
    ]
  },
  {
    id: '4',
    name: '마그네슘 400mg',
    brand: '네추럴라이프',
    description: '근육 이완과 수면 개선에 도움을 주는 마그네슘',
    price: 22000,
    size: '60정',
    rating: 4.5,
    ingredients: [
      { name: '마그네슘', amount: '400', unit: 'mg' }
    ]
  },
  {
    id: '5',
    name: '글루코사민 1500mg',
    brand: '바이오랩',
    description: '관절 건강과 연골 보호를 위한 글루코사민',
    price: 28000,
    size: '60정',
    rating: 4.4,
    ingredients: [
      { name: '글루코사민', amount: '1500', unit: 'mg' },
      { name: '콘드로이틴', amount: '200', unit: 'mg' }
    ]
  },
  {
    id: '6',
    name: '철분 플러스',
    brand: '유한양행',
    description: '빈혈 예방과 에너지 증진을 위한 철분 보충제',
    price: 15000,
    size: '30정',
    rating: 4.3,
    ingredients: [
      { name: '철분', amount: '14', unit: 'mg' },
      { name: '비타민 C', amount: '100', unit: 'mg' }
    ]
  },
  {
    id: '7',
    name: '프로바이오틱스 100억',
    brand: '락토바실러스',
    description: '장 건강과 면역력 증진을 위한 프로바이오틱스',
    price: 32000,
    size: '30캡슐',
    rating: 4.6,
    ingredients: [
      { name: '락토바실러스', amount: '100억', unit: 'CFU' },
      { name: '비피도박테리움', amount: '50억', unit: 'CFU' }
    ]
  },
  {
    id: '8',
    name: '코엔자임 Q10',
    brand: '뉴트리코어',
    description: '에너지 생산과 항산화 작용을 위한 코엔자임 Q10',
    price: 45000,
    size: '60캡슐',
    rating: 4.8,
    ingredients: [
      { name: '코엔자임 Q10', amount: '100', unit: 'mg' }
    ]
  }
];
