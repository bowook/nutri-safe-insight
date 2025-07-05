
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, XCircle, Star, ExternalLink, Info } from "lucide-react";

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

  const handleEvidenceClick = (evidence: string) => {
    // 실제 링크로 변환하는 로직 (예시)
    let searchUrl = '';
    if (evidence.includes('Journal')) {
      searchUrl = `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(evidence)}`;
    } else if (evidence.includes('American Journal')) {
      searchUrl = `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(evidence)}`;
    } else if (evidence.includes('Nutrients')) {
      searchUrl = `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(evidence)}`;
    } else {
      searchUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(evidence)}`;
    }
    window.open(searchUrl, '_blank');
  };

  if (supplements.length === 0) {
    return (
      <div className="text-center py-8">
        <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">영양제를 선택하시면 상호작용 분석 결과를 확인할 수 있습니다.</p>
      </div>
    );
  }

  if (synergies.length === 0 && warnings.length === 0 && dangers.length === 0) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">안전한 조합입니다</h3>
        <p className="text-gray-600">현재 선택된 영양제들 간에 특별한 상호작용이 발견되지 않았습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 시너지 효과 */}
      {synergies.length > 0 && (
        <div className="space-y-3">
          <h3 className="flex items-center space-x-2 text-green-700 font-semibold">
            <CheckCircle className="h-5 w-5" />
            <span>시너지 효과 ({synergies.length})</span>
          </h3>
          {synergies.map((synergy, index) => (
            <Card key={index} className="border-green-200 bg-green-50/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-green-800">{synergy.combination}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                      {synergy.effect}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onToggleFavorite(synergy.combination)}
                      className="h-6 w-6 p-0"
                    >
                      <Star 
                        className={`h-4 w-4 ${
                          favorites.includes(synergy.combination) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-400'
                        }`} 
                      />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-700 mb-2">{synergy.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <button
                    onClick={() => handleEvidenceClick(synergy.evidence)}
                    className="flex items-center space-x-1 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>근거: {synergy.evidence}</span>
                  </button>
                </div>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    💡 {synergy.recommendation}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 주의 사항 */}
      {warnings.length > 0 && (
        <div className="space-y-3">
          <h3 className="flex items-center space-x-2 text-yellow-700 font-semibold">
            <AlertTriangle className="h-5 w-5" />
            <span>주의 사항 ({warnings.length})</span>
          </h3>
          {warnings.map((warning, index) => (
            <Card key={index} className="border-yellow-200 bg-yellow-50/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-yellow-800">{warning.combination}</CardTitle>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300">
                    {warning.effect}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-700 mb-2">{warning.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <button
                    onClick={() => handleEvidenceClick(warning.evidence)}
                    className="flex items-center space-x-1 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>근거: {warning.evidence}</span>
                  </button>
                </div>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                    ⚠️ {warning.recommendation}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 위험 조합 */}
      {dangers.length > 0 && (
        <div className="space-y-3">
          <h3 className="flex items-center space-x-2 text-red-700 font-semibold">
            <XCircle className="h-5 w-5" />
            <span>위험 조합 ({dangers.length})</span>
          </h3>
          {dangers.map((danger, index) => (
            <Card key={index} className="border-red-200 bg-red-50/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-red-800">{danger.combination}</CardTitle>
                  <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-300">
                    {danger.effect}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-700 mb-2">{danger.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <button
                    onClick={() => handleEvidenceClick(danger.evidence)}
                    className="flex items-center space-x-1 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>근거: {danger.evidence}</span>
                  </button>
                </div>
                <div className="mt-2">
                  <Badge variant="destructive" className="text-xs">
                    🚨 {danger.recommendation}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default InteractionResults;
