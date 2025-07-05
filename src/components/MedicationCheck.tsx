
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Pill, Plus, AlertTriangle, XCircle, Search, Info, X } from "lucide-react";

interface MedicationCheckProps {
  medications: string[];
  onMedicationAdd: (medication: string) => void;
  onMedicationRemove: (medication: string) => void;
  supplements: string[];
}

const commonMedications = [
  "와파린", "아스피린", "메트포르민", "리피토", "심바스타틴",
  "암로디핀", "리시노프릴", "레보티록신", "오메프라졸", "가바펜틴"
];

// 약물-영양제 상호작용 데이터
const getMedicationInteractions = (medications: string[], supplements: string[]) => {
  const interactions = [];

  medications.forEach(medication => {
    supplements.forEach(supplement => {
      // 와파린 상호작용
      if (medication === "와파린") {
        if (supplement.includes("비타민 K")) {
          interactions.push({
            medication,
            supplement,
            severity: "danger",
            effect: "항응고 효과 감소",
            description: "비타민 K는 와파린의 항응고 효과를 상쇄시켜 혈전 위험을 증가시킬 수 있습니다.",
            recommendation: "복용 전 반드시 의사와 상담하세요."
          });
        }
        if (supplement.includes("오메가-3")) {
          interactions.push({
            medication,
            supplement,
            severity: "warning",
            effect: "출혈 위험 증가",
            description: "오메가-3와 와파린 병용 시 출혈 위험이 증가할 수 있습니다.",
            recommendation: "정기적인 혈액 검사 모니터링이 필요합니다."
          });
        }
      }

      // 메트포르민 상호작용
      if (medication === "메트포르민") {
        if (supplement.includes("비타민 B12")) {
          interactions.push({
            medication,
            supplement,
            severity: "info",
            effect: "비타민 B12 흡수 저해",
            description: "메트포르민 장기 복용 시 비타민 B12 결핍이 발생할 수 있어 보충이 권장됩니다.",
            recommendation: "비타민 B12 보충제 복용을 고려하세요."
          });
        }
      }

      // 아스피린 상호작용
      if (medication === "아스피린") {
        if (supplement.includes("오메가-3") || supplement.includes("비타민 E")) {
          interactions.push({
            medication,
            supplement,
            severity: "warning",
            effect: "출혈 위험 증가",
            description: "아스피린과 함께 복용 시 출혈 경향이 증가할 수 있습니다.",
            recommendation: "복용량 조절이 필요할 수 있습니다."
          });
        }
      }

      // 리피토/심바스타틴 상호작용
      if (medication.includes("리피토") || medication === "심바스타틴") {
        if (supplement.includes("코엔자임 Q10")) {
          interactions.push({
            medication,
            supplement,
            severity: "info",
            effect: "근육 부작용 완화",
            description: "스타틴 계열 약물로 인한 근육 통증을 코엔자임 Q10가 완화할 수 있습니다.",
            recommendation: "함께 복용하면 도움이 될 수 있습니다."
          });
        }
      }
    });
  });

  return interactions;
};

const MedicationCheck: React.FC<MedicationCheckProps> = ({ 
  medications, 
  onMedicationAdd, 
  onMedicationRemove,
  supplements 
}) => {
  const [medicationInput, setMedicationInput] = useState('');
  const interactions = getMedicationInteractions(medications, supplements);

  const handleAddMedication = () => {
    if (medicationInput.trim()) {
      onMedicationAdd(medicationInput.trim());
      setMedicationInput('');
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'danger': return 'border-red-200 bg-red-50/50';
      case 'warning': return 'border-yellow-200 bg-yellow-50/50';
      case 'info': return 'border-blue-200 bg-blue-50/50';
      default: return 'border-gray-200 bg-gray-50/50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'danger': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'info': return <Info className="h-5 w-5 text-blue-600" />;
      default: return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'danger': return 'destructive';
      case 'warning': return 'outline';
      case 'info': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* 약물 입력 */}
      <div>
        <div className="flex space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="복용 중인 약물명을 입력하세요 (예: 와파린, 아스피린)"
              value={medicationInput}
              onChange={(e) => setMedicationInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddMedication()}
              className="pl-10 bg-white border-gray-200 focus:border-red-300 focus:ring-red-200"
            />
          </div>
          <Button 
            onClick={handleAddMedication}
            disabled={!medicationInput.trim()}
            className="bg-red-600 hover:bg-red-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            추가
          </Button>
        </div>

        {/* 자주 검색되는 약물 */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">자주 검색되는 약물</h4>
          <div className="flex flex-wrap gap-2">
            {commonMedications.map((medication) => (
              <Button
                key={medication}
                variant="outline"
                size="sm"
                onClick={() => onMedicationAdd(medication)}
                className="text-xs bg-gray-50 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors"
              >
                <Pill className="h-3 w-3 mr-1" />
                {medication}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* 현재 약물 목록 */}
      {medications.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">현재 복용 약물 ({medications.length}개)</h4>
          <div className="flex flex-wrap gap-2">
            {medications.map((medication) => (
              <Badge
                key={medication}
                variant="secondary"
                className="bg-red-50 text-red-700 border-red-200 flex items-center space-x-2 px-3 py-1"
              >
                <Pill className="h-3 w-3" />
                <span>{medication}</span>
                <button
                  onClick={() => onMedicationRemove(medication)}
                  className="ml-2 hover:text-red-900 transition-colors"
                  title="약물 삭제"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* 상호작용 결과 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">약물-영양제 상호작용 검사 결과</h3>
        
        {medications.length === 0 && supplements.length === 0 && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              약물과 영양제를 입력하시면 상호작용을 검사할 수 있습니다.
            </AlertDescription>
          </Alert>
        )}

        {medications.length > 0 && supplements.length === 0 && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              영양제 조합 분석 탭에서 영양제를 선택하시면 약물과의 상호작용을 확인할 수 있습니다.
            </AlertDescription>
          </Alert>
        )}

        {interactions.length === 0 && medications.length > 0 && supplements.length > 0 && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              현재 입력된 약물과 영양제 간에 특별한 상호작용이 발견되지 않았습니다.
            </AlertDescription>
          </Alert>
        )}

        {interactions.length > 0 && (
          <div className="space-y-4">
            {interactions.map((interaction, index) => (
              <Card key={index} className={getSeverityColor(interaction.severity)}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getSeverityIcon(interaction.severity)}
                      <span className="text-sm">
                        {interaction.medication} ↔ {interaction.supplement}
                      </span>
                    </div>
                    <Badge variant={getSeverityBadge(interaction.severity) as any}>
                      {interaction.effect}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-700 mb-3">{interaction.description}</p>
                  <div className="bg-white/60 p-3 rounded-lg border">
                    <p className="text-sm font-medium text-gray-900">
                      💡 권장사항: {interaction.recommendation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicationCheck;
