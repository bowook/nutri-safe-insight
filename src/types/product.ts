
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
  ingredients: string[];
  standards: string;
}

export interface ProductSearchResult {
  id: string;
  productName: string;
  company: string;
  registrationNumber: string;
}
