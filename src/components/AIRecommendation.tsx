import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Sparkles, Plus, Loader2, Search, ExternalLink, Lightbulb } from "lucide-react";
import { Ingredient } from '@/types/product';
import { useToast } from "@/hooks/use-toast";

interface AIRecommendationProps {
  onSupplementSelect: (ingredient: Ingredient, source?: string) => void;
  selectedSupplements: Array<{
    name: string;
    amount: number;
    unit: string;
    sources: string[];
  }>;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
}

interface Recommendation {
  supplements: Array<{
    name: string;
    amount: number;
    unit: string;
    description: string;
  }>;
  evidence: string;
  sources: Array<{
    title: string;
    description: string;
    url: string;
  }>;
}

const AIRecommendation: React.FC<AIRecommendationProps> = ({ 
  onSupplementSelect, 
  selectedSupplements 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: '안녕하세요! 저는 영양제 추천 AI 어시스턴트입니다. 🧬\n\n현재 건강 상태나 목표를 말씀해 주시면, 의학적 근거를 바탕으로 개인 맞춤형 영양제를 추천해드리겠습니다.\n\n예시 질문:\n• "피로감이 심해요"\n• "면역력을 높이고 싶어요"\n• "관절이 아파요"\n• "눈이 피로해요"\n• "피부 건강을 원해요"\n• "스트레스가 많아요"'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentRecommendations, setCurrentRecommendations] = useState<Recommendation | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAddSupplement = (supplement: any) => {
    const ingredient: Ingredient = {
      name: supplement.name,
      amount: supplement.amount.toString(),
      unit: supplement.unit
    };
    
    onSupplementSelect(ingredient, `AI 추천 - ${supplement.name}`);
    
    toast({
      title: "영양제 추가됨",
      description: `${supplement.name} ${supplement.amount}${supplement.unit}이(가) 추가되었습니다.`,
    });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // AI 응답 시뮬레이션
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.content
      };

      setMessages(prev => [...prev, aiMessage]);
      
      if (aiResponse.recommendations) {
        setCurrentRecommendations(aiResponse.recommendations);
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): { content: string; recommendations?: Recommendation } => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('피로') || lowerInput.includes('에너지')) {
      return {
        content: `피로감과 에너지 부족에 대해 말씀해 주셨네요! 💪\n\n피로감 개선을 위해 다음과 같은 영양제를 추천드립니다:\n\n• 비타민 B12: 에너지 대사와 적혈구 생성에 필수\n• 마그네슘: 근육 이완과 에너지 생산 촉진\n• 코엔자임 Q10: 세포 에너지 생산 증진\n\n아래에서 추천 영양제를 확인하고 필요하시면 추가해보세요!`,
        recommendations: {
          supplements: [
            {
              name: '비타민 B12',
              amount: 1000,
              unit: 'mcg',
              description: '에너지 대사 및 적혈구 생성'
            },
            {
              name: '마그네슘',
              amount: 400,
              unit: 'mg',
              description: '근육 이완 및 에너지 생산'
            },
            {
              name: '코엔자임 Q10',
              amount: 100,
              unit: 'mg',
              description: '세포 에너지 생산 촉진'
            }
          ],
          evidence: 'Nutrients (2018) - 에너지 대사와 피로감 개선에 관한 연구',
          sources: [
            {
              title: 'Vitamin B12 and Energy Metabolism',
              description: '비타민 B12의 에너지 대사 역할',
              url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4772032/'
            },
            {
              title: 'Magnesium and Fatigue',
              description: '마그네슘의 피로감 개선 효과',
              url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6024559/'
            }
          ]
        }
      };
    } else if (lowerInput.includes('면역') || lowerInput.includes('감기')) {
      return {
        content: `면역력 증진에 대해 말씀해 주셨네요! 🛡️\n\n면역력 강화를 위해 다음과 같은 영양제를 추천드립니다:\n\n• 비타민 C: 면역 세포 기능 강화 및 항산화\n• 비타민 D: 면역 세포 조절 및 감염 예방\n• 아연: 면역 세포 활성화 및 상처 치유\n\n아래에서 추천 영양제를 확인하고 필요하시면 추가해보세요!`,
        recommendations: {
          supplements: [
            {
              name: '비타민 C',
              amount: 1000,
              unit: 'mg',
              description: '면역 세포 기능 강화 및 항산화'
            },
            {
              name: '비타민 D',
              amount: 2000,
              unit: 'IU',
              description: '면역 세포 조절 및 감염 예방'
            },
            {
              name: '아연',
              amount: 15,
              unit: 'mg',
              description: '면역 세포 활성화 및 상처 치유'
            }
          ],
          evidence: 'Journal of Clinical Medicine (2020) - 면역력 증진에 관한 연구',
          sources: [
            {
              title: 'Vitamin C and Immune Function',
              description: '비타민 C의 면역 기능 개선',
              url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7011499/'
            },
            {
              title: 'Vitamin D and Immunity',
              description: '비타민 D의 면역 조절 효과',
              url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7281985/'
            }
          ]
        }
      };
    } else if (lowerInput.includes('관절') || lowerInput.includes('뼈')) {
      return {
        content: `관절 건강에 대해 말씀해 주셨네요! 🦴\n\n관절 건강 개선을 위해 다음과 같은 영양제를 추천드립니다:\n\n• 글루코사민: 연골 보호 및 관절 건강 유지\n• 오메가-3: 항염증 작용 및 관절 건강\n• MSM: 관절 조직 건강 및 통증 완화\n\n아래에서 추천 영양제를 확인하고 필요하시면 추가해보세요!`,
        recommendations: {
          supplements: [
            {
              name: '글루코사민',
              amount: 1500,
              unit: 'mg',
              description: '연골 보호 및 관절 건강 유지'
            },
            {
              name: '오메가-3',
              amount: 1000,
              unit: 'mg',
              description: '항염증 작용 및 관절 건강'
            },
            {
              name: 'MSM (메틸설포닐메탄)',
              amount: 3000,
              unit: 'mg',
              description: '관절 조직 건강 및 통증 완화'
            }
          ],
          evidence: 'Osteoarthritis and Cartilage (2018) - 관절 건강에 관한 연구',
          sources: [
            {
              title: 'Glucosamine and Joint Health',
              description: '글루코사민의 관절 보호 효과',
              url: 'https://www.oarsijournal.com/article/S1063-4584(18)30190-9/fulltext'
            },
            {
              title: 'Omega-3 and Inflammation',
              description: '오메가-3의 항염증 효과',
              url: 'https://arthritis-research.biomedcentral.com/articles/10.1186/s13075-017-1417-7'
            }
          ]
        }
      };
    } else if (lowerInput.includes('눈') || lowerInput.includes('시력')) {
      return {
        content: `눈 건강에 대해 말씀해 주셨네요! 👁️\n\n눈 건강 개선을 위해 다음과 같은 영양제를 추천드립니다:\n\n• 루테인: 망막 보호 및 시력 개선\n• 지아잔틴: 블루라이트 차단 및 눈 피로 완화\n• 비타민 A: 시각 기능 유지\n\n아래에서 추천 영양제를 확인하고 필요하시면 추가해보세요!`,
        recommendations: {
          supplements: [
            {
              name: '루테인',
              amount: 20,
              unit: 'mg',
              description: '망막 보호 및 시력 개선'
            },
            {
              name: '지아잔틴',
              amount: 2,
              unit: 'mg',
              description: '블루라이트 차단 및 눈 피로 완화'
            },
            {
              name: '비타민 A',
              amount: 800,
              unit: 'μg',
              description: '시각 기능 유지'
            }
          ],
          evidence: 'Nutrients (2017) - 눈 건강에 관한 연구',
          sources: [
            {
              title: 'Lutein and Eye Health',
              description: '루테인의 망막 보호 효과',
              url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5707733/'
            }
          ]
        }
      };
    } else if (lowerInput.includes('피부') || lowerInput.includes('미용')) {
      return {
        content: `피부 건강에 대해 말씀해 주셨네요! ✨\n\n피부 건강 개선을 위해 다음과 같은 영양제를 추천드립니다:\n\n• 콜라겐: 피부 탄력 및 주름 개선\n• 비타민 C: 콜라겐 합성 및 항산화\n• 비타민 E: 피부 보호 및 재생\n\n아래에서 추천 영양제를 확인하고 필요하시면 추가해보세요!`,
        recommendations: {
          supplements: [
            {
              name: '콜라겐',
              amount: 5000,
              unit: 'mg',
              description: '피부 탄력 및 주름 개선'
            },
            {
              name: '비타민 C',
              amount: 1000,
              unit: 'mg',
              description: '콜라겐 합성 및 항산화'
            },
            {
              name: '비타민 E',
              amount: 400,
              unit: 'IU',
              description: '피부 보호 및 재생'
            }
          ],
          evidence: 'Journal of Cosmetic Dermatology (2019) - 피부 건강에 관한 연구',
          sources: [
            {
              title: 'Collagen and Skin Health',
              description: '콜라겐의 피부 개선 효과',
              url: 'https://onlinelibrary.wiley.com/doi/full/10.1111/jocd.12830'
            }
          ]
        }
      };
    } else if (lowerInput.includes('스트레스') || lowerInput.includes('불안')) {
      return {
        content: `스트레스 관리에 대해 말씀해 주셨네요! 😌\n\n스트레스 완화를 위해 다음과 같은 영양제를 추천드립니다:\n\n• 마그네슘: 신경 안정 및 근육 이완\n• L-테아닌: 스트레스 완화 및 집중력 향상\n• 감초추출물: 스트레스 호르몬 조절\n\n아래에서 추천 영양제를 확인하고 필요하시면 추가해보세요!`,
        recommendations: {
          supplements: [
            {
              name: '마그네슘',
              amount: 400,
              unit: 'mg',
              description: '신경 안정 및 근육 이완'
            },
            {
              name: 'L-테아닌',
              amount: 200,
              unit: 'mg',
              description: '스트레스 완화 및 집중력 향상'
            },
            {
              name: '감초추출물',
              amount: 500,
              unit: 'mg',
              description: '스트레스 호르몬 조절'
            }
          ],
          evidence: 'Nutrients (2018) - 스트레스 관리에 관한 연구',
          sources: [
            {
              title: 'Magnesium and Stress',
              description: '마그네슘의 스트레스 완화 효과',
              url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6024559/'
            }
          ]
        }
      };
    } else {
      return {
        content: `흥미로운 질문이네요! 🤔\n\n더 구체적인 건강 상태나 목표를 말씀해 주시면 더 정확한 추천을 드릴 수 있습니다.\n\n예를 들어:\n• "피로감이 심해요"\n• "면역력을 높이고 싶어요"\n• "관절이 아파요"\n• "눈이 피로해요"\n• "피부 건강을 원해요"\n• "스트레스가 많아요"\n\n어떤 부분에 관심이 있으신가요?`
      };
    }
  };

  const handleSourceClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* 채팅 영역 */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 h-96 overflow-y-auto border border-gray-200">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                    : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.type === 'ai' && (
                    <Bot className="h-4 w-4 mt-0.5 text-purple-500 flex-shrink-0" />
                  )}
                  <div className="text-sm whitespace-pre-line">{message.content}</div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 border border-gray-200 px-4 py-3 rounded-2xl shadow-sm">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-purple-500" />
                  <Loader2 className="h-4 w-4 animate-spin text-purple-500" />
                  <span className="text-sm">추천 영양제를 분석 중...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 입력 영역 */}
      <div className="flex space-x-2">
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="건강 상태나 목표를 말씀해 주세요..."
          className="flex-1 bg-white/60 backdrop-blur-sm border-gray-200 rounded-2xl"
        />
        <Button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isLoading}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      {/* 추천 영양제 영역 */}
      {currentRecommendations && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 rounded-2xl overflow-hidden">
          <CardHeader className="pb-4 bg-gradient-to-r from-purple-100 to-blue-100">
            <CardTitle className="flex items-center space-x-3 text-lg">
              <div className="p-2 bg-purple-200 rounded-xl">
                <Sparkles className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-gray-800">추천 영양제</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {/* 영양제 버튼들 */}
            <div className="flex flex-wrap gap-2">
              {currentRecommendations.supplements.map((supplement, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddSupplement(supplement)}
                  className="bg-white hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-colors rounded-xl"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {supplement.name} {supplement.amount}{supplement.unit}
                </Button>
              ))}
            </div>
            
            {/* 근거 정보 */}
            <div className="bg-white/80 rounded-xl p-4 border border-purple-200">
              <h4 className="text-sm font-semibold text-purple-800 mb-2 flex items-center space-x-2">
                <Lightbulb className="h-4 w-4" />
                <span>의학적 근거</span>
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed">{currentRecommendations.evidence}</p>
            </div>
            
            {/* 출처 링크들 */}
            <div className="bg-white/80 rounded-xl p-4 border border-purple-200">
              <h4 className="text-sm font-semibold text-purple-800 mb-2 flex items-center space-x-2">
                <ExternalLink className="h-4 w-4" />
                <span>참고 문헌</span>
              </h4>
              <div className="space-y-2">
                {currentRecommendations.sources.map((source, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <button
                      onClick={() => handleSourceClick(source.url)}
                      className="text-xs text-blue-600 hover:text-blue-800 underline text-left"
                    >
                      {source.title}
                    </button>
                    <span className="text-xs text-gray-500">- {source.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 현재 복용 중인 영양제 정보 */}
      {selectedSupplements.length > 0 && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-800 flex items-center space-x-2">
              <Bot className="h-4 w-4" />
              <span>현재 복용 중인 영양제 ({selectedSupplements.length}개)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedSupplements.map((supplement) => (
                <Badge
                  key={supplement.name}
                  variant="outline"
                  className="bg-white/80 text-blue-700 border-blue-300 text-xs rounded-xl"
                >
                  {supplement.name} {supplement.amount}{supplement.unit}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 빠른 질문 버튼들 */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">빠른 질문</h4>
        <div className="flex flex-wrap gap-2">
          {['피로감이 있어요', '면역력을 높이고 싶어요', '관절이 아파요', '눈이 피로해요', '피부 건강을 원해요', '스트레스가 많아요'].map((question) => (
            <Button
              key={question}
              variant="outline"
              size="sm"
              onClick={() => setInputMessage(question)}
              className="text-xs bg-white/60 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-colors rounded-xl"
            >
              {question}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIRecommendation; 