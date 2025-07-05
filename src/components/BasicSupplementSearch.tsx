import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Edit3 } from "lucide-react";
import { Ingredient } from '@/types/product';

interface BasicSupplementSearchProps {
  onSupplementSelect: (ingredient: Ingredient, source?: string) => void;
}

// 기본 영양제 데이터에 복용량 정보 추가
const mockSupplements: Ingredient[] = [
  { name: "비타민 D3", amount: "10", unit: "μg" },
  { name: "비타민 C", amount: "1000", unit: "mg" },
  { name: "비타민 B12", amount: "2.4", unit: "μg" },
  { name: "비타민 B6", amount: "2.0", unit: "mg" },
  { name: "비타민 E", amount: "15", unit: "mg" },
  { name: "비타민 K", amount: "120", unit: "μg" },
  { name: "오메가-3", amount: "1000", unit: "mg" },
  { name: "마그네슘", amount: "400", unit: "mg" },
  { name: "칼슘", amount: "1000", unit: "mg" },
  { name: "철분", amount: "18", unit: "mg" },
  { name: "아연", amount: "15", unit: "mg" },
  { name: "셀레늄", amount: "55", unit: "μg" },
  { name: "프로바이오틱스", amount: "10", unit: "억 CFU" },
  { name: "코엔자임 Q10", amount: "100", unit: "mg" },
  { name: "글루코사민", amount: "1500", unit: "mg" },
  { name: "콜라겐", amount: "10", unit: "g" },
  { name: "루테인", amount: "10", unit: "mg" },
  { name: "밀크씨슬", amount: "250", unit: "mg" },
  { name: "홍삼", amount: "1000", unit: "mg" },
  { name: "플라보노이드", amount: "500", unit: "mg" },
  { name: "커큐민", amount: "500", unit: "mg" },
  { name: "아슈와간다", amount: "300", unit: "mg" }
];

const BasicSupplementSearch: React.FC<BasicSupplementSearchProps> = ({ onSupplementSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSupplements, setFilteredSupplements] = useState<Ingredient[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [editingSupplement, setEditingSupplement] = useState<Ingredient | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [customUnit, setCustomUnit] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = mockSupplements.filter(supplement =>
        supplement.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSupplements(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSupplements([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setEditingSupplement(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSupplement = (supplement: Ingredient) => {
    setEditingSupplement(supplement);
    setCustomAmount(supplement.amount);
    setCustomUnit(supplement.unit);
    setSearchTerm(supplement.name);
    setShowSuggestions(false);
  };

  const handleAddCustomSupplement = () => {
    if (searchTerm.trim()) {
      // 사용자 입력의 경우 기본값으로 설정
      const customIngredient: Ingredient = {
        name: searchTerm.trim(),
        amount: customAmount || "1",
        unit: customUnit || "정"
      };
      onSupplementSelect(customIngredient);
      setSearchTerm('');
      setCustomAmount('');
      setCustomUnit('');
      setEditingSupplement(null);
      setShowSuggestions(false);
    }
  };

  const handleConfirmEdit = () => {
    if (editingSupplement && customAmount.trim()) {
      const editedIngredient: Ingredient = {
        name: editingSupplement.name,
        amount: customAmount,
        unit: customUnit || editingSupplement.unit
      };
      onSupplementSelect(editedIngredient);
      setSearchTerm('');
      setCustomAmount('');
      setCustomUnit('');
      setEditingSupplement(null);
      setShowSuggestions(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingSupplement(null);
    setCustomAmount('');
    setCustomUnit('');
    setSearchTerm('');
  };

  const commonUnits = ['mg', 'μg', 'g', 'IU', '정', '캡슐', '알', '억 CFU'];

  return (
    <div ref={searchRef} className="relative space-y-4">
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="영양제명을 입력하세요 (예: 비타민 D3, 오메가-3)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
            className="pl-10 bg-white border-gray-200 focus:border-blue-300 focus:ring-blue-200"
          />
        </div>
        {searchTerm.trim() && !editingSupplement && (
          <Button 
            onClick={handleAddCustomSupplement}
            size="icon"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* 복용량 수정 영역 */}
      {editingSupplement && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center space-x-2">
              <Edit3 className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                {editingSupplement.name} 복용량 설정
              </span>
            </div>
            
            <div className="flex space-x-2">
              <div className="flex-1">
                <label className="text-xs text-gray-600 mb-1 block">용량</label>
                <Input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="용량 입력"
                  className="text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-600 mb-1 block">단위</label>
                <select
                  value={customUnit}
                  onChange={(e) => setCustomUnit(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {commonUnits.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={handleConfirmEdit}
                disabled={!customAmount.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-sm"
              >
                <Plus className="h-3 w-3 mr-1" />
                추가
              </Button>
              <Button
                onClick={handleCancelEdit}
                variant="outline"
                className="flex-1 text-sm"
              >
                취소
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 검색 결과 드롭다운 */}
      {showSuggestions && filteredSupplements.length > 0 && (
        <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto shadow-lg border-gray-200">
          <CardContent className="p-0">
            {filteredSupplements.map((supplement, index) => (
              <div
                key={index}
                onClick={() => handleSelectSupplement(supplement)}
                className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center justify-between group"
              >
                <div>
                  <span className="text-gray-700">{supplement.name}</span>
                  <span className="text-xs text-gray-500 ml-2">{supplement.amount}{supplement.unit}</span>
                </div>
                <Edit3 className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* 인기 영양제 */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">인기 영양제</h4>
        <div className="flex flex-wrap gap-2">
          {mockSupplements.slice(0, 8).map((supplement, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleSelectSupplement(supplement)}
              className="text-xs bg-gray-50 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors"
            >
              <Edit3 className="h-3 w-3 mr-1" />
              {supplement.name} {supplement.amount}{supplement.unit}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicSupplementSearch;
