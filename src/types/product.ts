export interface Ingredient {
  name: string;
  amount: string; // 예: "210mg", "50μg", "1000mg"
  unit: string; // 예: "mg", "μg", "IU"
}

export interface ProductInfo {
  company: string;
  productName: string;
  registrationNumber: string;
  registrationDate: string;
  expiryPeriod: string;
  appearance: string;
  dosage: string;
  packaging: string;
  storage: string;
  precautions: string;
  functionalContent: string;
  ingredients: Ingredient[];
  standards: string;
}

export interface ProductSearchResult {
  id: string;
  productName: string;
  company: string;
  registrationNumber: string;
}
