
import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink, Package, Building, FileText } from "lucide-react";
import { mockProductSearch, mockProductDetails } from '@/data/mockProducts';
import { ProductSearchResult, ProductInfo } from '@/types/product';

interface ProductSearchProps {
  onProductSelect: (productInfo: ProductInfo) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onProductSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<ProductSearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductInfo | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = mockProductSearch.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredProducts([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectProduct = (productResult: ProductSearchResult) => {
    const productDetail = mockProductDetails[productResult.id];
    if (productDetail) {
      setSelectedProduct(productDetail);
      setSearchTerm(productResult.productName);
      setShowSuggestions(false);
    }
  };

  const handleAddProduct = () => {
    if (selectedProduct) {
      onProductSelect(selectedProduct);
      setSelectedProduct(null);
      setSearchTerm('');
    }
  };

  const openFoodSafetyKorea = () => {
    window.open('https://www.foodsafetykorea.go.kr/portal/healthyfoodlife/searchHomeHF.do?menu_grp=MENU_NEW04&menu_no=2823', '_blank');
  };

  return (
    <div className="space-y-4">
      {/* 검색 영역 */}
      <div ref={searchRef} className="relative">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="제품명을 입력하세요 (예: 광동 365케어 칼슘)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
              className="pl-10 bg-white border-gray-200 focus:border-blue-300 focus:ring-blue-200"
            />
          </div>
          <Button 
            onClick={openFoodSafetyKorea}
            variant="outline"
            size="icon"
            title="식품안전나라에서 검색"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>

        {/* 검색 결과 드롭다운 */}
        {showSuggestions && filteredProducts.length > 0 && (
          <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto shadow-lg border-gray-200">
            <CardContent className="p-0">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium text-gray-900">{product.productName}</span>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Building className="h-3 w-3" />
                      <span>{product.company}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <FileText className="h-3 w-3" />
                      <span>{product.registrationNumber}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* 선택된 제품 상세 정보 */}
      {selectedProduct && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Package className="h-5 w-5 text-blue-600" />
              <span>제품 정보</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900">{selectedProduct.productName}</h4>
              <p className="text-sm text-gray-600">{selectedProduct.company}</p>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-1">주요 성분</h5>
              <div className="flex flex-wrap gap-1">
                {selectedProduct.ingredients.map((ingredient, index) => (
                  <Badge key={index} variant="outline" className="bg-white text-blue-700 border-blue-200 text-xs">
                    {ingredient.name} {ingredient.amount}{ingredient.unit}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-1">섭취 방법</h5>
              <p className="text-sm text-gray-600">{selectedProduct.dosage}</p>
            </div>

            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-1">기능성 내용</h5>
              <p className="text-sm text-gray-600 whitespace-pre-line">{selectedProduct.functionalContent}</p>
            </div>

            <Button 
              onClick={handleAddProduct}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              이 제품으로 분석하기
            </Button>
          </CardContent>
        </Card>
      )}

      {/* 안내 메시지 */}
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <ExternalLink className="h-4 w-4 inline mr-1" />
          더 정확한 제품 검색을 위해 식품안전나라 사이트를 이용해보세요
        </p>
      </div>
    </div>
  );
};

export default ProductSearch;
