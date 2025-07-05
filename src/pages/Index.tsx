import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TestTube, Shield, Search, Plus, Star, Bot, Sparkles, Dumbbell, Zap } from "lucide-react";
import SupplementSearch from "@/components/SupplementSearch";
import InteractionResults from "@/components/InteractionResults";
import AIRecommendation from "@/components/AIRecommendation";
import { useToast } from "@/hooks/use-toast";
import { Ingredient } from "@/types/product";

// 선택된 영양제 정보를 위한 타입
interface SelectedSupplement {
  name: string;
  amount: number;
  unit: string;
  sources: string[]; // 출처 제품명들
}

const Index = () => {
  const [selectedSupplements, setSelectedSupplements] = useState<SelectedSupplement[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSupplementSelect = (ingredient: Ingredient, source?: string) => {
    console.log('영양제 선택됨:', ingredient.name, ingredient.amount, ingredient.unit, '출처:', source);
    console.log('현재 선택된 영양제들:', selectedSupplements);
    
    const existingIndex = selectedSupplements.findIndex(s => s.name === ingredient.name && s.unit === ingredient.unit);
    console.log('기존 인덱스:', existingIndex);
    
    if (existingIndex === -1) {
      // 새로운 영양제 추가
      const newSupplement = {
        name: ingredient.name,
        amount: parseFloat(ingredient.amount),
        unit: ingredient.unit,
        sources: source ? [source] : []
      };
      console.log('새로운 영양제 추가:', newSupplement);
      
      setSelectedSupplements(prevSupplements => {
        const updated = [...prevSupplements, newSupplement];
        console.log('업데이트된 영양제 목록:', updated);
        return updated;
      });
      
      toast({
        title: "영양제 추가됨",
        description: `${ingredient.name} ${ingredient.amount}${ingredient.unit}이(가) 분석 목록에 추가되었습니다.`,
      });
    } else {
      // 기존 영양제의 복용량 증가
      setSelectedSupplements(prevSupplements => {
        const updatedSupplements = [...prevSupplements];
        const currentAmount = updatedSupplements[existingIndex].amount;
        const newAmount = currentAmount + parseFloat(ingredient.amount);
        
        updatedSupplements[existingIndex] = {
          ...updatedSupplements[existingIndex],
          amount: Math.round(newAmount * 100) / 100, // 소수점 2자리까지 반올림
          sources: source ? [...updatedSupplements[existingIndex].sources, source] : updatedSupplements[existingIndex].sources
        };
        console.log('기존 영양제 업데이트:', updatedSupplements[existingIndex]);
        console.log('업데이트된 영양제 목록:', updatedSupplements);
        return updatedSupplements;
      });
      
      toast({
        title: "복용량 업데이트됨",
        description: `${ingredient.name}의 복용량이 업데이트되었습니다.`,
      });
    }
  };

  const handleRemoveSupplement = (supplementName: string) => {
    setSelectedSupplements(selectedSupplements.filter(s => s.name !== supplementName));
  };

  const toggleFavorite = (item: string) => {
    if (favorites.includes(item)) {
      setFavorites(favorites.filter(f => f !== item));
    } else {
      setFavorites([...favorites, item]);
      toast({
        title: "즐겨찾기 추가",
        description: `${item}이(가) 즐겨찾기에 추가되었습니다.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-center space-x-4">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 p-3 rounded-2xl shadow-lg">
                {/* 알약 이모지 로고 */}
                <span className="text-2xl">💊</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                필마바디
              </h1>
              <p className="text-xs text-gray-500 font-medium">PillMyBody</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-6 pb-8">
        {/* Hero Section */}
        <div className="text-center py-8">
          <div className="mb-6">
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-gray-700">안전한 영양제 관리</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            스마트한 영양제
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              상호작용 분석
            </span>
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed max-w-sm mx-auto">
            AI 추천과 의학적 근거를 바탕으로
            <br />
            안전하고 효과적인 영양제 조합을 제안합니다
          </p>
        </div>

        {/* Modern Tabs */}
        <Tabs defaultValue="supplements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/60 backdrop-blur-sm rounded-2xl p-1 shadow-sm border border-gray-200">
            <TabsTrigger 
              value="supplements" 
              className="rounded-xl text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 transition-all duration-200"
            >
              <TestTube className="h-4 w-4 mr-2" />
              영양제 분석
            </TabsTrigger>
            <TabsTrigger 
              value="ai-recommendation" 
              className="rounded-xl text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-purple-600 transition-all duration-200"
            >
              <Bot className="h-4 w-4 mr-2" />
              AI 추천
            </TabsTrigger>
          </TabsList>

          {/* 영양제 조합 분석 탭 */}
          <TabsContent value="supplements" className="space-y-6">
            {/* 영양제 검색 카드 */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 rounded-3xl overflow-hidden">
              <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <Search className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-gray-800">영양제 검색</span>
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  복용하는 영양제를 검색하고 추가해주세요
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <SupplementSearch onSupplementSelect={handleSupplementSelect} />
                
                {/* 선택된 영양제 목록 */}
                {selectedSupplements.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold text-gray-700">
                        선택된 영양제
                      </h4>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        {selectedSupplements.length}개
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedSupplements.map((supplement) => (
                        <div
                          key={supplement.name}
                          className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 rounded-2xl px-4 py-2 text-sm inline-flex items-center shadow-sm"
                        >
                          <span className="font-medium">{supplement.name}</span>
                          <span className="text-xs ml-2 bg-blue-100 px-2 py-1 rounded-full">
                            {supplement.amount}{supplement.unit}
                          </span>
                          {supplement.sources.length > 0 && (
                            <span className="text-xs text-gray-500 ml-2">({supplement.sources.join(', ')})</span>
                          )}
                          <button
                            onClick={() => handleRemoveSupplement(supplement.name)}
                            className="ml-2 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 분석 결과 카드 */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 rounded-3xl overflow-hidden">
              <CardHeader className="pb-4 bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="p-2 bg-green-100 rounded-xl">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-gray-800">분석 결과</span>
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  영양제 간 상호작용을 분석합니다
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <InteractionResults 
                  supplements={selectedSupplements.map(s => s.name)}
                  onToggleFavorite={toggleFavorite}
                  favorites={favorites}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI 영양제 추천 탭 */}
          <TabsContent value="ai-recommendation" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 rounded-3xl overflow-hidden">
              <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="p-2 bg-purple-100 rounded-xl">
                    <Bot className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-gray-800">AI 영양제 추천</span>
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  개인 맞춤형 영양제를 추천받아보세요
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <AIRecommendation 
                  onSupplementSelect={handleSupplementSelect}
                  selectedSupplements={selectedSupplements}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 즐겨찾기 섹션 */}
        {favorites.length > 0 && (
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 rounded-3xl overflow-hidden mt-6">
            <CardHeader className="pb-4 bg-gradient-to-r from-yellow-50 to-orange-50">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <div className="p-2 bg-yellow-100 rounded-xl">
                  <Star className="h-5 w-5 text-yellow-600" />
                </div>
                <span className="text-gray-800">즐겨찾기</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                {favorites.map((item) => (
                  <div
                    key={item}
                    className="bg-gradient-to-r from-yellow-50 to-orange-50 text-yellow-700 border border-yellow-200 rounded-2xl px-3 py-2 text-sm inline-flex items-center shadow-sm"
                  >
                    <Star className="h-3 w-3 mr-2 fill-current" />
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center mt-12 pb-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-gray-700">안전한 영양제 관리</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              본 서비스는 의학적 근거를 바탕으로 정보를 제공하지만,<br />
              전문의 상담을 대체할 수 없습니다.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
