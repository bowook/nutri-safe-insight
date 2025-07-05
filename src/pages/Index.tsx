
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg">
                <TestTube className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">헬스가드</h1>
                <p className="text-sm text-gray-600">영양제·약물 상호작용 분석 플랫폼</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Shield className="h-3 w-3 mr-1" />
                의학 근거 기반
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            안전한 영양제 조합을 위한
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> 스마트 분석</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            복용 중인 영양제와 약물의 상호작용을 의학적 근거와 함께 분석하여, 
            건강한 선택을 도와드립니다.
          </p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="supplements" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="supplements" className="flex items-center space-x-2">
              <TestTube className="h-4 w-4" />
              <span>영양제 조합 분석</span>
            </TabsTrigger>
            <TabsTrigger value="medications" className="flex items-center space-x-2">
              <Pill className="h-4 w-4" />
              <span>약물 상호작용</span>
            </TabsTrigger>
          </TabsList>

          {/* 영양제 조합 분석 탭 */}
          <TabsContent value="supplements" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 영양제 검색 및 선택 */}
              <Card className="bg-white/70 backdrop-blur-sm border-blue-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Search className="h-5 w-5 text-blue-600" />
                    <span>영양제 검색 및 선택</span>
                  </CardTitle>
                  <CardDescription>
                    복용 중이거나 복용 예정인 영양제를 검색하여 추가해주세요.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SupplementSearch onSupplementSelect={handleSupplementSelect} />
                  
                  {/* 선택된 영양제 목록 */}
                  {selectedSupplements.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">선택된 영양제 ({selectedSupplements.length}개)</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSupplements.map((supplement) => (
                          <Badge
                            key={supplement}
                            variant="secondary"
                            className="bg-blue-50 text-blue-700 border-blue-200 flex items-center space-x-2 px-3 py-1"
                          >
                            <span>{supplement}</span>
                            <button
                              onClick={() => handleRemoveSupplement(supplement)}
                              className="ml-2 hover:text-red-600 transition-colors"
                            >
                              ✕
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 분석 결과 */}
              <Card className="bg-white/70 backdrop-blur-sm border-blue-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span>상호작용 분석 결과</span>
                  </CardTitle>
                  <CardDescription>
                    선택하신 영양제들의 조합을 의학적 근거와 함께 분석합니다.
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
            </div>
          </TabsContent>

          {/* 약물 상호작용 탭 */}
          <TabsContent value="medications" className="space-y-8">
            <Card className="bg-white/70 backdrop-blur-sm border-blue-100 shadow-lg max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Pill className="h-5 w-5 text-red-600" />
                  <span>약물-영양제 상호작용 검사</span>
                </CardTitle>
                <CardDescription>
                  복용 중인 약물을 입력하면 위험한 영양제 조합을 실시간으로 확인할 수 있습니다.
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
          <Card className="bg-white/70 backdrop-blur-sm border-yellow-100 shadow-lg mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-600" />
                <span>즐겨찾기</span>
              </CardTitle>
              <CardDescription>
                자주 확인하는 조합들을 저장했습니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {favorites.map((item) => (
                  <Badge
                    key={item}
                    variant="outline"
                    className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center space-x-2 px-3 py-1"
                  >
                    <Star className="h-3 w-3 fill-current" />
                    <span>{item}</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-blue-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              본 서비스는 의학적 근거를 바탕으로 정보를 제공하지만, 전문의 상담을 대체할 수 없습니다.
            </p>
            <p className="text-sm text-gray-500">
              건강상 문제가 있으시면 반드시 의료진과 상담하시기 바랍니다.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
