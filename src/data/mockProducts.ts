
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
    ingredients: ['칼슘', '아연'],
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
    ingredients: ['비타민 A', '비타민 B1', '비타민 B2', '비타민 B6', '비타민 B12', '비타민 C', '비타민 D3', '비타민 E', '엽산', '비오틴'],
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
    ingredients: ['비타민 D3'],
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
    ingredients: ['오메가-3', 'EPA', 'DHA'],
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
    ingredients: ['철분', '비타민 C'],
    standards: '철: 표시량(14mg/정)의 80~150%'
  }
};
