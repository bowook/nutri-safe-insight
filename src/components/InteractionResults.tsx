import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, CheckCircle, Info, Star, Heart } from "lucide-react";

interface InteractionResultsProps {
  supplements: string[];
  onToggleFavorite: (item: string) => void;
  favorites: string[];
}

// 목업 상호작용 데이터
const getInteractionData = (supplements: string[]) => {
  if (supplements.length === 0) {
    return { synergies: [], warnings: [], dangers: [] };
  }

  const synergies = [];
  const warnings = [];
  const dangers = [];

  // 비타민 D3 관련 상호작용
  if (supplements.includes("비타민 D3")) {
    if (supplements.includes("칼슘")) {
      synergies.push({
        combination: "비타민 D3 + 칼슘",
        effect: "칼슘 흡수율 향상",
        description: "비타민 D3는 장에서 칼슘 흡수를 돕는 칼시트리올로 전환되어 칼슘 흡수율을 최대 30-40% 향상시킵니다.",
        evidence: "Journal of Bone and Mineral Research (2018)",
        recommendation: "식후 함께 복용 권장"
      });
    }
    if (supplements.includes("마그네슘")) {
      synergies.push({
        combination: "비타민 D3 + 마그네슘",
        effect: "비타민 D 활성화 촉진",
        description: "마그네슘은 비타민 D의 활성형 전환에 필요한 효소의 보조인자로 작용합니다.",
        evidence: "American Journal of Clinical Nutrition (2019)",
        recommendation: "함께 복용 시 효과 극대화"
      });
    }
  }

  // 오메가-3 관련 상호작용
  if (supplements.includes("오메가-3") && supplements.includes("비타민 E")) {
    warnings.push({
      combination: "오메가-3 + 비타민 E",
      effect: "산화 방지 효과",
      description: "비타민 E가 오메가-3 지방산의 산화를 방지하지만, 과량 섭취 시 출혈 위험이 증가할 수 있습니다.",
      evidence: "Nutrients Journal (2020)",
      recommendation: "적정 용량 준수 필요"
    });
  }

  // 철분 관련 상호작용
  if (supplements.includes("철분")) {
    if (supplements.includes("칼슘")) {
      warnings.push({
        combination: "철분 + 칼슘",
        effect: "흡수 경쟁 작용",
        description: "칼슘과 철분은 같은 운반체를 사용하여 흡수되므로 동시 복용 시 철분 흡수가 40-50% 감소할 수 있습니다.",
        evidence: "American Journal of Clinical Nutrition (2017)",
        recommendation: "2시간 간격을 두고 복용"
      });
    }
    if (supplements.includes("아연")) {
      warnings.push({
        combination: "철분 + 아연",
        effect: "상호 흡수 방해",
        description: "철분과 아연은 서로의 흡수를 방해하여 각각의 생체이용률이 감소합니다.",
        evidence: "Journal of Nutrition (2018)",
        recommendation: "식사와 함께 별도 시간에 복용"
      });
    }
  }

  // 위험한 조합
  if (supplements.includes("비타민 K") && supplements.includes("비타민 E")) {
    dangers.push({
      combination: "비타민 K + 고용량 비타민 E",
      effect: "혈액 응고 장애 위험",
      description: "고용량 비타민 E(400IU 이상)는 비타민 K의 작용을 저해하여 출혈 위험을 증가시킬 수 있습니다.",
      evidence: "Blood Coagulation & Fibrinolysis (2019)",
      recommendation: "의사와 상담 후 복용"
    });
  }

  return { synergies, warnings, dangers };
};

const InteractionResults: React.FC<InteractionResultsProps> = ({ 
  supplements, 
  onToggleFavorite, 
  favorites 
}) => {
  const { synergies, warnings, dangers } = getInteractionData(supplements);

  // 영양제 상호작용 데이터
  const interactions = [
    {
      type: 'positive',
      title: '시너지 효과',
      description: '비타민 C와 철분을 함께 복용하면 철분 흡수율이 향상됩니다.',
      supplements: ['비타민 C', '철분'],
      evidence: 'Journal of Nutrition (2018)',
      icon: CheckCircle,
      color: 'green'
    },
    {
      type: 'positive',
      title: '항산화 시너지',
      description: '비타민 E와 비타민 C를 함께 복용하면 항산화 효과가 증대됩니다.',
      supplements: ['비타민 E', '비타민 C'],
      evidence: 'Free Radical Biology and Medicine (2019)',
      icon: CheckCircle,
      color: 'green'
    },
    {
      type: 'caution',
      title: '철분 흡수 방해',
      description: '칼슘과 철분을 동시에 복용하면 철분 흡수가 저해될 수 있습니다.',
      supplements: ['칼슘', '철분'],
      evidence: 'American Journal of Clinical Nutrition (2017)',
      icon: AlertTriangle,
      color: 'yellow'
    },
    {
      type: 'caution',
      title: '마그네슘 흡수 방해',
      description: '칼슘과 마그네슘을 함께 복용하면 마그네슘 흡수가 감소할 수 있습니다.',
      supplements: ['칼슘', '마그네슘'],
      evidence: 'Nutrients (2016)',
      icon: AlertTriangle,
      color: 'yellow'
    }
  ];

  // 현재 선택된 영양제와 관련된 상호작용 필터링
  const relevantInteractions = interactions.filter(interaction =>
    interaction.supplements.some(supplement =>
      supplements.some(selected => 
        selected.toLowerCase().includes(supplement.toLowerCase()) ||
        supplement.toLowerCase().includes(selected.toLowerCase())
      )
    )
  );

  const getIconComponent = (iconComponent: any) => {
    return iconComponent;
  };

  const getColorClasses = (type: string) => {
    switch (type) {
      case 'positive':
        return {
          bg: 'bg-gradient-to-r from-green-50 to-emerald-50',
          border: 'border-green-200',
          icon: 'text-green-600',
          badge: 'bg-green-100 text-green-700'
        };
      case 'caution':
        return {
          bg: 'bg-gradient-to-r from-yellow-50 to-orange-50',
          border: 'border-yellow-200',
          icon: 'text-yellow-600',
          badge: 'bg-yellow-100 text-yellow-700'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-blue-50 to-indigo-50',
          border: 'border-blue-200',
          icon: 'text-blue-600',
          badge: 'bg-blue-100 text-blue-700'
        };
    }
  };

  if (supplements.length === 0) {
    return (
      <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-gray-200 rounded-2xl">
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-blue-100 rounded-full">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                영양제를 추가해주세요
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                복용 중인 영양제를 추가하면<br />
                상호작용을 분석해드립니다
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* 선택된 영양제 요약 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-gray-700">
            분석 대상 영양제
          </h4>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            {supplements.length}개
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          {supplements.map((supplement, index) => (
            <div
              key={index}
              className="bg-white/80 text-blue-700 border border-blue-200 rounded-xl px-3 py-2 text-sm inline-flex items-center shadow-sm"
            >
              <span className="font-medium">{supplement}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 상호작용 결과 */}
      {relevantInteractions.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-gray-700">
              상호작용 분석 결과
            </h4>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              {relevantInteractions.length}개 발견
            </Badge>
          </div>
          
          <div className="space-y-4">
            {relevantInteractions.map((interaction, index) => {
              const IconComponent = getIconComponent(interaction.icon);
              const colorClasses = getColorClasses(interaction.type);
              
              return (
                <Card 
                  key={index} 
                  className={`${colorClasses.bg} ${colorClasses.border} rounded-2xl overflow-hidden shadow-sm`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 bg-white/80 rounded-xl ${colorClasses.icon}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-1">
                              {interaction.title}
                            </h5>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {interaction.description}
                            </p>
                          </div>
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onToggleFavorite(interaction.title)}
                            className={`p-2 rounded-xl hover:bg-white/60 ${
                              favorites.includes(interaction.title) 
                                ? 'text-red-500' 
                                : 'text-gray-400'
                            }`}
                          >
                            <Heart 
                              className={`h-4 w-4 ${
                                favorites.includes(interaction.title) 
                                  ? 'fill-current' 
                                  : ''
                              }`} 
                            />
                          </Button>
                        </div>
                        
                        {/* 관련 영양제 */}
                        <div className="flex flex-wrap gap-2">
                          {interaction.supplements.map((supplement, idx) => (
                            <Badge 
                              key={idx} 
                              variant="outline" 
                              className="bg-white/60 text-gray-700 border-gray-300 text-xs"
                            >
                              {supplement}
                            </Badge>
                          ))}
                        </div>
                        
                        {/* 근거 */}
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Info className="h-3 w-3" />
                          <span>근거: {interaction.evidence}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ) : (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 rounded-2xl">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  상호작용 없음
                </h4>
                <p className="text-sm text-gray-600">
                  현재 선택된 영양제들 간에<br />
                  특별한 상호작용이 발견되지 않았습니다
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 안전성 팁 */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Shield className="h-5 w-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">
                안전한 영양제 복용을 위한 팁
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 식사와 함께 복용하여 흡수율을 높이세요</li>
                <li>• 권장 복용량을 초과하지 마세요</li>
                <li>• 기존 복용 약물이 있다면 의사와 상담하세요</li>
                <li>• 부작용이 나타나면 즉시 복용을 중단하세요</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractionResults;
