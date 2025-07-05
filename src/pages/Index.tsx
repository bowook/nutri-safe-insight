
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TestTube, Pill, Shield, Search, Plus, Star, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import SupplementSearch from "@/components/SupplementSearch";
import InteractionResults from "@/components/InteractionResults";
import MedicationCheck from "@/components/MedicationCheck";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedSupplements, setSelectedSupplements] = useState<string[]>([]);
  const [currentMedications, setCurrentMedications] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSupplementSelect = (supplement: string) => {
    if (!selectedSupplements.includes(supplement)) {
      setSelectedSupplements([...selectedSupplements, supplement]);
      toast({
        title: "영양제 추가됨",
        description: `${supplement}이(가) 분석 목록에 추가되었습니다.`,
      });
    }
  };

  const handleRemoveSupplement = (supplement: string) => {
    setSelectedSupplements(selectedSupplements.filter(s => s !== supplement));
  };

  const handleMedicationAdd = (medication: string) => {
    if (!currentMedications.includes(medication)) {
      setCurrentMedications([...currentMedications, medication]);
      toast({
        title: "약물 추가됨",
        description: `${medication}이(가) 상호작용 검사 목록에 추가되었습니다.`,
      });
    }
  };

  const handleMedicationRemove = (medication: string) => {
    setCurrentMedications(currentMedications.filter(m => m !== medication));
    toast({
      title: "약물 삭제됨",
      description: `${medication}이(가) 목록에서 삭제되었습니다.`,
    });
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
    <div className="min-h-screen bg-gray-50">
      {/* Mobile App Style Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2.5 rounded-full shadow-lg">
              <TestTube className="h-6 w-6 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">필마바디</h1>
              <p className="text-xs text-gray-500">PillMyBody</p>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile App Style Content */}
      <main className="max-w-md mx-auto px-4 pb-6">
        {/* Hero Section - Mobile Style */}
        <div className="text-center py-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            안전한 영양제 조합
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            복용 중인 영양제와 약물의 상호작용을<br />
            의학적 근거와 함께 분석합니다
          </p>
        </div>

        {/* Mobile Tabs */}
        <Tabs defaultValue="supplements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-full p-1">
            <TabsTrigger 
              value="supplements" 
              className="rounded-full text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <TestTube className="h-4 w-4 mr-2" />
              영양제 분석
            </TabsTrigger>
            <TabsTrigger 
              value="medications" 
              className="rounded-full text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Pill className="h-4 w-4 mr-2" />
              약물 상호작용
            </TabsTrigger>
          </TabsList>

          {/* 영양제 조합 분석 탭 */}
          <TabsContent value="supplements" className="space-y-4">
            {/* 영양제 검색 카드 */}
            <Card className="bg-white shadow-sm border-0 rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Search className="h-5 w-5 text-blue-500" />
                  <span>영양제 검색</span>
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  복용하는 영양제를 검색해주세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SupplementSearch onSupplementSelect={handleSupplementSelect} />
                
                {/* 선택된 영양제 목록 */}
                {selectedSupplements.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      선택된 영양제 ({selectedSupplements.length}개)
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSupplements.map((supplement) => (
                        <Badge
                          key={supplement}
                          className="bg-blue-50 text-blue-700 border-blue-200 rounded-full px-3 py-1 text-sm"
                        >
                          <span>{supplement}</span>
                          <button
                            onClick={() => handleRemoveSupplement(supplement)}
                            className="ml-2 hover:text-red-600 transition-colors"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 분석 결과 카드 */}
            <Card className="bg-white shadow-sm border-0 rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span>분석 결과</span>
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  상호작용을 분석합니다
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InteractionResults 
                  supplements={selectedSupplements}
                  onToggleFavorite={toggleFavorite}
                  favorites={favorites}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* 약물 상호작용 탭 */}
          <TabsContent value="medications" className="space-y-4">
            <Card className="bg-white shadow-sm border-0 rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Pill className="h-5 w-5 text-red-500" />
                  <span>약물 상호작용 검사</span>
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  복용 중인 약물을 입력해주세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MedicationCheck 
                  medications={currentMedications}
                  onMedicationAdd={handleMedicationAdd}
                  onMedicationRemove={handleMedicationRemove}
                  supplements={selectedSupplements}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 즐겨찾기 섹션 */}
        {favorites.length > 0 && (
          <Card className="bg-white shadow-sm border-0 rounded-2xl mt-6">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>즐겨찾기</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {favorites.map((item) => (
                  <Badge
                    key={item}
                    className="bg-yellow-50 text-yellow-700 border-yellow-200 rounded-full px-3 py-1 text-sm"
                  >
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    <span>{item}</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mobile Footer */}
        <div className="text-center mt-8 pb-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            본 서비스는 의학적 근거를 바탕으로 정보를 제공하지만,<br />
            전문의 상담을 대체할 수 없습니다.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
