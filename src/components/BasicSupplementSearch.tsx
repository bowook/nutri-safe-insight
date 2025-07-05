
import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus } from "lucide-react";

interface BasicSupplementSearchProps {
  onSupplementSelect: (supplement: string) => void;
}

const mockSupplements = [
  "비타민 D3", "비타민 C", "비타민 B12", "비타민 B6", "비타민 E", "비타민 K",
  "오메가-3", "마그네슘", "칼슘", "철분", "아연", "셀레늄",
  "프로바이오틱스", "코엔자임 Q10", "글루코사민", "콜라겐",
  "루테인", "밀크씨슬", "홍삼", "플라보노이드", "커큐민", "아슈와간다"
];

const BasicSupplementSearch: React.FC<BasicSupplementSearchProps> = ({ onSupplementSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSupplements, setFilteredSupplements] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = mockSupplements.filter(supplement =>
        supplement.toLowerCase().includes(searchTerm.toLowerCase())
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
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSupplement = (supplement: string) => {
    onSupplementSelect(supplement);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const handleAddCustomSupplement = () => {
    if (searchTerm.trim()) {
      onSupplementSelect(searchTerm.trim());
      setSearchTerm('');
      setShowSuggestions(false);
    }
  };

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
        {searchTerm.trim() && (
          <Button 
            onClick={handleAddCustomSupplement}
            size="icon"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>

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
                <span className="text-gray-700">{supplement}</span>
                <Plus className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* 인기 영양제 */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">인기 영양제</h4>
        <div className="flex flex-wrap gap-2">
          {mockSupplements.slice(0, 8).map((supplement) => (
            <Button
              key={supplement}
              variant="outline"
              size="sm"
              onClick={() => handleSelectSupplement(supplement)}
              className="text-xs bg-gray-50 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors"
            >
              <Plus className="h-3 w-3 mr-1" />
              {supplement}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicSupplementSearch;
