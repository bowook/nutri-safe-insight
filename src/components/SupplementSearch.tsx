import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Package, Info, Star, TestTube } from "lucide-react";
import { mockProducts } from "@/data/mockProducts";
import { Ingredient } from "@/types/product";
import { useToast } from "@/hooks/use-toast";
import BasicSupplementSearch from './BasicSupplementSearch';

interface SupplementSearchProps {
  onSupplementSelect: (ingredient: Ingredient, source?: string) => void;
}

const SupplementSearch: React.FC<SupplementSearchProps> = ({ onSupplementSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { toast } = useToast();

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.ingredients.some(ingredient =>
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleProductSelect = (product: any) => {
    setSelectedProduct(product);
  };

  const handleIngredientAdd = (ingredient: Ingredient, productName: string) => {
    onSupplementSelect(ingredient, productName);
    toast({
      title: "성분 추가됨",
      description: `${ingredient.name} ${ingredient.amount}${ingredient.unit}이(가) 추가되었습니다.`,
    });
  };

  return (
    <Tabs defaultValue="basic" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2 bg-white/60 backdrop-blur-sm rounded-2xl p-1 shadow-sm border border-gray-200">
        <TabsTrigger 
          value="basic" 
          className="rounded-xl text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 transition-all duration-200"
        >
          <TestTube className="h-4 w-4 mr-2" />
          직접 검색
        </TabsTrigger>
        <TabsTrigger 
          value="product" 
          className="rounded-xl text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-purple-600 transition-all duration-200"
        >
          <Package className="h-4 w-4 mr-2" />
          제품 검색
        </TabsTrigger>
      </TabsList>

      {/* 직접 검색 탭 */}
      <TabsContent value="basic" className="space-y-6">
        <BasicSupplementSearch onSupplementSelect={onSupplementSelect} />
      </TabsContent>

      {/* 제품 검색 탭 */}
      <TabsContent value="product" className="space-y-6">
        {/* 검색 입력 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="영양제 제품명이나 성분을 검색해보세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/60 backdrop-blur-sm border-gray-200 rounded-2xl"
          />
        </div>

        {/* 검색 결과 */}
        {searchTerm && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-700">
                검색 결과
              </h4>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {filteredProducts.length}개 제품
              </Badge>
            </div>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedProduct?.id === product.id 
                      ? 'bg-blue-50 border-blue-200 shadow-md' 
                      : 'bg-white/80 backdrop-blur-sm border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleProductSelect(product)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Package className="h-4 w-4 text-blue-500" />
                          <h5 className="font-semibold text-gray-900">{product.name}</h5>
                          <Badge variant="outline" className="text-xs bg-gray-50">
                            {product.brand}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                        
                        {/* 주요 성분 미리보기 */}
                        <div className="flex flex-wrap gap-1">
                          {product.ingredients.slice(0, 3).map((ingredient, index) => (
                            <span
                              key={index}
                              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                            >
                              {ingredient.name} {ingredient.amount}{ingredient.unit}
                            </span>
                          ))}
                          {product.ingredients.length > 3 && (
                            <span className="text-xs text-gray-500 px-2 py-1">
                              +{product.ingredients.length - 3}개 더
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1 ml-3">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 선택된 제품 상세 정보 */}
        {selectedProduct && (
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 rounded-2xl overflow-hidden">
            <CardHeader className="pb-4 bg-gradient-to-r from-blue-100 to-indigo-100">
              <CardTitle className="flex items-center space-x-3 text-lg">
                <div className="p-2 bg-blue-200 rounded-xl">
                  <Info className="h-4 w-4 text-blue-700" />
                </div>
                <span className="text-gray-800">{selectedProduct.name}</span>
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                {selectedProduct.brand} • {selectedProduct.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    주요 성분 ({selectedProduct.ingredients.length}개)
                  </h4>
                  <div className="space-y-2">
                    {selectedProduct.ingredients.map((ingredient: Ingredient, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white/80 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">{ingredient.name}</span>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                              {ingredient.amount}{ingredient.unit}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleIngredientAdd(ingredient, selectedProduct.name);
                          }}
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          추가
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* 제품 정보 */}
                <div className="bg-white/60 rounded-xl p-4 border border-gray-200">
                  <h5 className="text-sm font-semibold text-gray-700 mb-2">제품 정보</h5>
                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                    <div>
                      <span className="font-medium">브랜드:</span> {selectedProduct.brand}
                    </div>
                    <div>
                      <span className="font-medium">평점:</span> 
                      <span className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span>{selectedProduct.rating}</span>
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">가격:</span> {selectedProduct.price}원
                    </div>
                    <div>
                      <span className="font-medium">용량:</span> {selectedProduct.size}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 검색 안내 */}
        {!searchTerm && (
          <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-gray-200 rounded-2xl">
            <CardContent className="p-6 text-center">
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">영양제 제품을 검색해보세요</h4>
                  <p className="text-sm text-gray-600">
                    제품명, 브랜드, 또는 성분명으로 검색할 수 있습니다
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default SupplementSearch;
