import { Stage, GameMode, ChatContent, ArticleContent, TextContent, StageVariant } from './types';

// LocalStorage 키
const STORAGE_KEY = 'oppa-admin-stages-v2';

// 샘플 데이터 - 새 구조 (variants 기반)
const sampleStages: Stage[] = [
  {
    id: 'stage-1',
    level: 1,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1a',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '민수', text: '오늘 뭐해?' },
            { id: 'msg2', sender: 'right', text: '별로 안해도 돼' },
            { id: 'msg3', sender: 'left', name: '민수', text: '그럼 같이 영화 볼래?' },
          ],
        } as ChatContent,
        error: {
          id: 'err1a',
          wrongText: '안해도',
          correctText: '안 해도',
          explanation: '"안"은 부정을 나타내는 부사로, 뒤의 동사와 띄어 씁니다.',
          location: 'msg2',
        },
      },
      {
        id: 'v1b',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '민수', text: '오늘 뭐해?' },
            { id: 'msg2', sender: 'right', text: '별로 안 해도 돼' },
            { id: 'msg3', sender: 'left', name: '민수', text: '그럼 같이 영화볼래?' },
          ],
        } as ChatContent,
        error: {
          id: 'err1b',
          wrongText: '영화볼래',
          correctText: '영화 볼래',
          explanation: '"영화"와 "볼래" 사이에는 띄어쓰기가 필요합니다.',
          location: 'msg3',
        },
      },
      {
        id: 'v1c',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '민수', text: '오늘뭐해?' },
            { id: 'msg2', sender: 'right', text: '별로 안 해도 돼' },
            { id: 'msg3', sender: 'left', name: '민수', text: '그럼 같이 영화 볼래?' },
          ],
        } as ChatContent,
        error: {
          id: 'err1c',
          wrongText: '오늘뭐해',
          correctText: '오늘 뭐해',
          explanation: '"오늘"과 "뭐해" 사이에는 띄어쓰기가 필요합니다.',
          location: 'msg1',
        },
      },
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'stage-2',
    level: 2,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v2a',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '지은', text: '어제 본 영화 어땠어?' },
            { id: 'msg2', sender: 'right', text: '완전재밌었어!' },
            { id: 'msg3', sender: 'left', name: '지은', text: '그랬구나~ 나도 볼게' },
          ],
        } as ChatContent,
        error: {
          id: 'err2a',
          wrongText: '완전재밌었어',
          correctText: '완전 재밌었어',
          explanation: '"완전"과 "재밌었어" 사이에는 띄어쓰기가 필요합니다.',
          location: 'msg2',
        },
      },
      {
        id: 'v2b',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '지은', text: '어제 본 영화 어땠어?' },
            { id: 'msg2', sender: 'right', text: '완전 재밌었어!' },
            { id: 'msg3', sender: 'left', name: '지은', text: '그랬구나~ 나도 볼께' },
          ],
        } as ChatContent,
        error: {
          id: 'err2b',
          wrongText: '볼께',
          correctText: '볼게',
          explanation: '"~ㄹ게"는 "께"가 아닌 "게"로 씁니다.',
          location: 'msg3',
        },
      },
      {
        id: 'v2c',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '지은', text: '어제본 영화 어땠어?' },
            { id: 'msg2', sender: 'right', text: '완전 재밌었어!' },
            { id: 'msg3', sender: 'left', name: '지은', text: '그랬구나~ 나도 볼게' },
          ],
        } as ChatContent,
        error: {
          id: 'err2c',
          wrongText: '어제본',
          correctText: '어제 본',
          explanation: '"어제"와 "본" 사이에는 띄어쓰기가 필요합니다.',
          location: 'msg1',
        },
      },
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'stage-11',
    level: 11,
    mode: 'article',
    timeLimit: 75,
    variants: [
      {
        id: 'v11a',
        content: {
          title: '청소년 독서량, 10년 새 절반으로 감소',
          subtitle: '스마트폰 사용 증가가 주요 원인으로 꼽혀',
          author: '김기자',
          source: '한국일보',
          paragraphs: [
            '최근 조사에 따르면, 청소년들의 독서량이 10년전에 비해 절반 가까이 줄어든 것으로 나타났다.',
            '전문가들은 스마트폰 사용 시간 증가가 주된 원인이라고 분석했다.',
            '이에 따라 교육부는 독서 장려 정책을 강화할 계획이라고 밝혔다.',
          ],
        } as ArticleContent,
        error: {
          id: 'err11a',
          wrongText: '10년전',
          correctText: '10년 전',
          explanation: '숫자와 "전" 사이에는 띄어쓰기가 필요합니다.',
          location: 'p0',
        },
      },
      {
        id: 'v11b',
        content: {
          title: '청소년 독서량, 10년 새 절반으로 감소',
          subtitle: '스마트폰 사용 증가가 주요 원인으로 꼽혀',
          author: '김기자',
          source: '한국일보',
          paragraphs: [
            '최근 조사에 따르면, 청소년들의 독서량이 10년 전에 비해 절반 가까이 줄어든 것으로 나타났다.',
            '전문가들은 스마트폰 사용 시간 증가가 주된원인이라고 분석했다.',
            '이에 따라 교육부는 독서 장려 정책을 강화할 계획이라고 밝혔다.',
          ],
        } as ArticleContent,
        error: {
          id: 'err11b',
          wrongText: '주된원인',
          correctText: '주된 원인',
          explanation: '"주된"과 "원인" 사이에는 띄어쓰기가 필요합니다.',
          location: 'p1',
        },
      },
      {
        id: 'v11c',
        content: {
          title: '청소년 독서량, 10년 새 절반으로 감소',
          subtitle: '스마트폰 사용 증가가 주요 원인으로 꼽혀',
          author: '김기자',
          source: '한국일보',
          paragraphs: [
            '최근 조사에 따르면, 청소년들의 독서량이 10년 전에 비해 절반 가까이 줄어든 것으로 나타났다.',
            '전문가들은 스마트폰 사용 시간 증가가 주된 원인이라고 분석했다.',
            '이에따라 교육부는 독서 장려 정책을 강화할 계획이라고 밝혔다.',
          ],
        } as ArticleContent,
        error: {
          id: 'err11c',
          wrongText: '이에따라',
          correctText: '이에 따라',
          explanation: '"이에"와 "따라" 사이에는 띄어쓰기가 필요합니다.',
          location: 'p2',
        },
      },
    ],
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
  },
  {
    id: 'stage-31',
    level: 31,
    mode: 'text',
    timeLimit: 90,
    variants: [
      {
        id: 'v31a',
        content: {
          title: '과학 지문',
          paragraphs: [
            '우주는 약 138억년 전 빅뱅으로부터 시작되었다고 알려져 있다.',
            '은하들은 서로 멀어지고 있으며, 이는 우주가 팽창하고 있음을 의미한다.',
            '과학자들은 우주 배경 복사를 관측하여 빅뱅 이론을 증명했다.',
          ],
        } as TextContent,
        error: {
          id: 'err31a',
          wrongText: '138억년',
          correctText: '138억 년',
          explanation: '숫자와 단위 사이에는 띄어쓰기가 필요합니다.',
          location: 'p0',
        },
      },
      {
        id: 'v31b',
        content: {
          title: '과학 지문',
          paragraphs: [
            '우주는 약 138억 년 전 빅뱅으로부터 시작되었다고 알려져 있다.',
            '은하들은 서로 멀어지고있으며, 이는 우주가 팽창하고 있음을 의미한다.',
            '과학자들은 우주 배경 복사를 관측하여 빅뱅 이론을 증명했다.',
          ],
        } as TextContent,
        error: {
          id: 'err31b',
          wrongText: '멀어지고있으며',
          correctText: '멀어지고 있으며',
          explanation: '보조 용언 "있다"는 띄어 씁니다.',
          location: 'p1',
        },
      },
      {
        id: 'v31c',
        content: {
          title: '과학 지문',
          paragraphs: [
            '우주는 약 138억 년 전 빅뱅으로부터 시작되었다고 알려져 있다.',
            '은하들은 서로 멀어지고 있으며, 이는 우주가 팽창하고 있음을 의미한다.',
            '과학자들은 우주배경 복사를 관측하여 빅뱅 이론을 증명했다.',
          ],
        } as TextContent,
        error: {
          id: 'err31c',
          wrongText: '우주배경',
          correctText: '우주 배경',
          explanation: '"우주"와 "배경" 사이에는 띄어쓰기가 필요합니다.',
          location: 'p2',
        },
      },
    ],
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13'),
  },
];

// 스테이지 관리 함수들
export const stagesStore = {
  // 모든 스테이지 가져오기
  getAll(): Stage[] {
    if (typeof window === 'undefined') return sampleStages;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // 처음 로드 시 샘플 데이터 저장
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleStages));
      return sampleStages;
    }

    try {
      const parsed = JSON.parse(stored);
      return parsed.map((s: any) => ({
        ...s,
        createdAt: s.createdAt ? new Date(s.createdAt) : undefined,
        updatedAt: s.updatedAt ? new Date(s.updatedAt) : undefined,
      }));
    } catch {
      return sampleStages;
    }
  },

  // ID로 스테이지 가져오기
  getById(id: string): Stage | null {
    const stages = this.getAll();
    return stages.find(s => s.id === id) || null;
  },

  // 스테이지 추가
  add(stage: Omit<Stage, 'id' | 'createdAt' | 'updatedAt'>): Stage {
    const stages = this.getAll();
    const newStage: Stage = {
      ...stage,
      id: `stage-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    stages.push(newStage);
    this.save(stages);
    return newStage;
  },

  // 여러 스테이지 일괄 추가
  addBulk(newStages: Omit<Stage, 'id' | 'createdAt' | 'updatedAt'>[]): Stage[] {
    const stages = this.getAll();
    const addedStages: Stage[] = [];

    newStages.forEach((stage, index) => {
      const newStage: Stage = {
        ...stage,
        id: `stage-${Date.now()}-${index}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      stages.push(newStage);
      addedStages.push(newStage);
    });

    this.save(stages);
    return addedStages;
  },

  // 스테이지 수정
  update(id: string, updates: Partial<Stage>): Stage | null {
    const stages = this.getAll();
    const index = stages.findIndex(s => s.id === id);

    if (index === -1) return null;

    stages[index] = {
      ...stages[index],
      ...updates,
      id, // ID는 변경 불가
      updatedAt: new Date(),
    };

    this.save(stages);
    return stages[index];
  },

  // 스테이지 삭제
  delete(id: string): boolean {
    const stages = this.getAll();
    const index = stages.findIndex(s => s.id === id);

    if (index === -1) return false;

    stages.splice(index, 1);
    this.save(stages);
    return true;
  },

  // LocalStorage에 저장
  save(stages: Stage[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stages));
  },

  // 모든 데이터 초기화 (샘플 데이터로)
  reset(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleStages));
  },

  // JSON 내보내기
  exportToJSON(): string {
    const stages = this.getAll();
    return JSON.stringify(stages, null, 2);
  },

  // JSON 가져오기 (유효성 검사 포함)
  importFromJSON(jsonString: string): { success: boolean; count: number; errors: string[] } {
    const errors: string[] = [];

    try {
      const parsed = JSON.parse(jsonString);

      if (!Array.isArray(parsed)) {
        return { success: false, count: 0, errors: ['JSON은 배열 형식이어야 합니다.'] };
      }

      const validStages: Omit<Stage, 'id' | 'createdAt' | 'updatedAt'>[] = [];

      parsed.forEach((item: any, index: number) => {
        const stageErrors: string[] = [];

        // 필수 필드 검증
        if (typeof item.level !== 'number') {
          stageErrors.push(`level이 숫자가 아닙니다`);
        }
        if (!['chat', 'article', 'text'].includes(item.mode)) {
          stageErrors.push(`mode가 올바르지 않습니다 (chat/article/text)`);
        }
        if (typeof item.timeLimit !== 'number') {
          stageErrors.push(`timeLimit이 숫자가 아닙니다`);
        }
        if (!Array.isArray(item.variants) || item.variants.length < 3) {
          stageErrors.push(`variants가 3개 이상 필요합니다`);
        }

        // variants 검증
        if (Array.isArray(item.variants)) {
          item.variants.forEach((v: any, vIndex: number) => {
            if (!v.id || !v.content || !v.error) {
              stageErrors.push(`variants[${vIndex}]에 필수 필드가 없습니다 (id, content, error)`);
            }
            if (v.error && (!v.error.wrongText || !v.error.correctText || !v.error.explanation || !v.error.location)) {
              stageErrors.push(`variants[${vIndex}].error에 필수 필드가 없습니다`);
            }
          });
        }

        if (stageErrors.length > 0) {
          errors.push(`스테이지 ${index + 1}: ${stageErrors.join(', ')}`);
        } else {
          validStages.push({
            level: item.level,
            mode: item.mode,
            timeLimit: item.timeLimit,
            variants: item.variants,
          });
        }
      });

      if (validStages.length > 0) {
        this.addBulk(validStages);
      }

      return {
        success: validStages.length > 0,
        count: validStages.length,
        errors,
      };
    } catch (e) {
      return { success: false, count: 0, errors: ['JSON 파싱 오류: ' + (e as Error).message] };
    }
  },
};

// JSON 업로드 양식 예시 (새 구조)
export const jsonFormatExample = `[
  {
    "level": 1,
    "mode": "chat",
    "timeLimit": 60,
    "variants": [
      {
        "id": "v1a",
        "content": {
          "messages": [
            { "id": "msg1", "sender": "left", "name": "친구", "text": "오늘 뭐해?" },
            { "id": "msg2", "sender": "right", "text": "별로 안해도 돼" }
          ]
        },
        "error": {
          "id": "err1a",
          "wrongText": "안해도",
          "correctText": "안 해도",
          "explanation": "\\"안\\"은 부정 부사로 띄어 씁니다.",
          "location": "msg2"
        }
      },
      {
        "id": "v1b",
        "content": {
          "messages": [
            { "id": "msg1", "sender": "left", "name": "친구", "text": "오늘뭐해?" },
            { "id": "msg2", "sender": "right", "text": "별로 안 해도 돼" }
          ]
        },
        "error": {
          "id": "err1b",
          "wrongText": "오늘뭐해",
          "correctText": "오늘 뭐해",
          "explanation": "\\"오늘\\"과 \\"뭐해\\" 사이에 띄어쓰기가 필요합니다.",
          "location": "msg1"
        }
      },
      {
        "id": "v1c",
        "content": {
          "messages": [
            { "id": "msg1", "sender": "left", "name": "친구", "text": "오늘 뭐해?" },
            { "id": "msg2", "sender": "right", "text": "별로안 해도 돼" }
          ]
        },
        "error": {
          "id": "err1c",
          "wrongText": "별로안",
          "correctText": "별로 안",
          "explanation": "\\"별로\\"와 \\"안\\" 사이에 띄어쓰기가 필요합니다.",
          "location": "msg2"
        }
      }
    ]
  }
]`;
