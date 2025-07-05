
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Package } from "lucide-react";
import ProductSearch from './ProductSearch';
import BasicSupplementSearch from './BasicSupplementSearch';
import { ProductInfo } from '@/types/product';

interface SupplementSearchProps {
  onSupplementSelect: (supplement: string) => void;
}

const SupplementSearch: React.FC<SupplementSearchProps> = ({ onSupplementSelect }) => {
  const handleProductSelect = (productInfo: ProductInfo) => {
    // 제품의 성분들을 개별적으로 추가
    productInfo.ingredients.forEach(ingredient => {
      onSupplementSelect(ingredient);
    });
  };

  return (
    <Tabs defaultValue="basic" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-full p-1">
        <TabsTrigger 
          value="basic" 
          className="rounded-full text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          <Search className="h-4 w-4 mr-2" />
          직접 검색
        </TabsTrigger>
        <TabsTrigger 
          value="product" 
          className="rounded-full text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          <Package className="h-4 w-4 mr-2" />
          제품 검색
        </TabsTrigger>
      </TabsList>

      <TabsContent value="basic">
        <BasicSupplementSearch onSupplementSelect={onSupplementSelect} />
      </TabsContent>

      <TabsContent value="product">
        <ProductSearch onProductSelect={handleProductSelect} />
      </TabsContent>
    </Tabs>
  );
};

export default SupplementSearch;
