import { Stage, ChatContent } from '../types';

// 스테이지 이미지 매핑
export const stageImages: Record<string, any> = {
  'yorkshire_terrier.jpg': require('../../assets/images/stages/yorkshire_terrier.jpg'),
  'barking_puppy.jpg': require('../../assets/images/stages/barking_puppy.jpg'),
  'used_game_console.jpg': require('../../assets/images/stages/used_game_console.jpg'),
  'ac_outdoor_unit.jpg': require('../../assets/images/stages/ac_outdoor_unit.jpg'),
  'tuna_can_meme.jpg': require('../../assets/images/stages/tuna_can_meme.jpg'),
  'gyro_swing_ride.jpg': require('../../assets/images/stages/gyro_swing_ride.jpg'),
  'music_playlist_meme.jpg': require('../../assets/images/stages/music_playlist_meme.jpg'),
  'tired_face.jpg': require('../../assets/images/stages/tired_face.jpg'),
  'celebrity.jpg': require('../../assets/images/stages/celebrity.jpg'),
  'angry_cat.jpg': require('../../assets/images/stages/angry_cat.jpg'),
  'fridge.jpg': require('../../assets/images/stages/fridge.jpg'),
  'album_cover.jpg': require('../../assets/images/stages/album_cover.jpg'),
  'passport.jpg': require('../../assets/images/stages/passport.jpg'),
  'cafe.jpg': require('../../assets/images/stages/cafe.jpg'),
  'school_bag.jpg': require('../../assets/images/stages/school_bag.jpg'),
  'mask.jpg': require('../../assets/images/stages/mask.jpg'),
  'porridge.jpg': require('../../assets/images/stages/porridge.jpg'),
  'bike.jpg': require('../../assets/images/stages/bike.jpg'),
  'swollen_face.jpg': require('../../assets/images/stages/swollen_face.jpg'),
  'cctv_monitor.jpg': require('../../assets/images/stages/cctv_monitor.jpg'),
  'fancy_dress.jpg': require('../../assets/images/stages/fancy_dress.jpg'),
  'mask_dust.jpg': require('../../assets/images/stages/mask_dust.jpg'),
  'pillow.jpg': require('../../assets/images/stages/pillow.jpg'),
  'test_100.jpg': require('../../assets/images/stages/test_100.jpg'),
  'omr_card.jpg': require('../../assets/images/stages/omr_card.jpg'),
  'happy_dance.jpg': require('../../assets/images/stages/happy_dance.jpg'),
  'empty_barn.jpg': require('../../assets/images/stages/empty_barn.jpg'),
  'empty_bowl.jpg': require('../../assets/images/stages/empty_bowl.jpg'),
  'stew.jpg': require('../../assets/images/stages/stew.jpg'),
  'expensive_bag.jpg': require('../../assets/images/stages/expensive_bag.jpg'),
  'living_room.jpg': require('../../assets/images/stages/living_room.jpg'),
};

export const sampleStages: Stage[] = [
  {
    id: 'stage1',
    level: 1,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '여친', text: '오빠 나 강아지 분양받았어!' },
            { id: 'msg2', sender: 'right', text: '오 진짜? 사진 좀 보여줘 ㅋㅋ' },
            { id: 'msg3', sender: 'left', name: '여친', text: '(사진)', image: 'yorkshire_terrier.jpg' },
            { id: 'msg4', sender: 'left', name: '여친', text: '완전 귀엽지? 육구시타리아야.' },
            { id: 'msg5', sender: 'right', text: '응? 종이 뭐라고?' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '육구시타리아',
          correctText: '요크셔테리어',
          explanation: "견종 '요크셔테리어'를 잘못 쓴 인터넷 밈입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '여친', text: '오빠 나 강아지 분양받았어!' },
            { id: 'msg2', sender: 'right', text: '오 진짜? 이름은 지었어?' },
            { id: 'msg3', sender: 'left', name: '여친', text: '(사진)', image: 'barking_puppy.jpg' },
            { id: 'msg4', sender: 'left', name: '여친', text: "응 '구름'인데 자꾸 나를 보고 짓어 ㅠㅠ" },
            { id: 'msg5', sender: 'right', text: '아직 낯설어서 그런가 봐.' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '짓어',
          correctText: '짖어',
          explanation: "개는 '짖다', 집은 '짓다'입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '여친', text: '오빠 우리집 강아지 천재인 듯' },
            { id: 'msg2', sender: 'right', text: '갑자기? 왜? ㅋㅋㅋ' },
            { id: 'msg3', sender: 'left', name: '여친', text: '배변 훈련을 하루 만에 끝냈어.' },
            { id: 'msg4', sender: 'left', name: '여친', text: '진짜 어의가 없어서 말이 안 나오네.' },
            { id: 'msg5', sender: 'right', text: '똒똒해서 놀란 거야?' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '어의가',
          correctText: '어이가',
          explanation: "'어처구니없다'는 뜻의 표준어는 '어이없다'입니다. '어의'는 임금님의 의사입니다.",
          location: 'msg4',
        },
      },
    ],
  },
  {
    id: 'stage2',
    level: 2,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '친구', text: '야 너 그 회사 계속 다닐 거야?' },
            { id: 'msg2', sender: 'right', text: '왜? 난 나름 괜찮은데.' },
            { id: 'msg3', sender: 'left', name: '친구', text: '월급도 적고 야근도 많잖아.' },
            { id: 'msg4', sender: 'right', text: '남의 인생에 일해라 절해라 하지 마.' },
            { id: 'msg5', sender: 'left', name: '친구', text: '걱정돼서 하는 말이지...' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '일해라 절해라',
          correctText: '이래라저래라',
          explanation: "'이거 해라 저거 해라'의 줄임말인 '이래라저래라'를 소리 나는 대로 잘못 쓴 밈입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '친구', text: '이번 주말에 소개팅 할래?' },
            { id: 'msg2', sender: 'right', text: '음... 글쎄 요즘 바쁜데.' },
            { id: 'msg3', sender: 'left', name: '친구', text: '에이 그러지 말고 한번만 봐봐.' },
            { id: 'msg4', sender: 'right', text: '미안. 당분간 연애는 않 할래.' },
            { id: 'msg5', sender: 'left', name: '친구', text: '철벽 진짜 심하네 ㅠㅠ' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '않 할래',
          correctText: '안 할래',
          explanation: "'아니 하-'의 준말은 '안'입니다. '않'은 '않고', '않다'처럼 뒤에 어미가 옵니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '김대리', text: '오늘 회식 메뉴 뭐로 할까요?' },
            { id: 'msg2', sender: 'right', text: '삼겹살 어때요?' },
            { id: 'msg3', sender: 'left', name: '김대리', text: '부장님이 고기 싫어하셔서...' },
            { id: 'msg4', sender: 'right', text: '아 그럼 메뉴 선정 어떻해 하죠?' },
            { id: 'msg5', sender: 'left', name: '김대리', text: '그냥 횟집으로 예약할게요.' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '어떻해',
          correctText: '어떡해',
          explanation: "'어떻게 해'의 줄임말은 '어떡해'입니다. '어떻해'는 없는 말입니다.",
          location: 'msg4',
        },
      },
    ],
  },
  {
    id: 'stage3',
    level: 3,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '썸남', text: '이번 주 영화 볼래요?' },
            { id: 'msg2', sender: 'right', text: '좋아요! 무슨 영화요?' },
            { id: 'msg3', sender: 'left', name: '썸남', text: '요즘 재밌는 거 많더라고요.' },
            { id: 'msg4', sender: 'right', text: '그럼 몇일 뒤에 만날까요?' },
            { id: 'msg5', sender: 'left', name: '썸남', text: '토요일 오후 어때요?' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '몇일',
          correctText: '며칠',
          explanation: "'몇 년', '몇 월'은 가능하지만 날짜를 셀 때는 항상 '며칠'로 적습니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '동창', text: '철수야 잘 지내냐?' },
            { id: 'msg2', sender: 'right', text: '오 이게 누구야?' },
            { id: 'msg3', sender: 'left', name: '동창', text: '나 민수 ㅋㅋ 번호 그대로네' },
            { id: 'msg4', sender: 'right', text: '와 진짜 오랫만이다 반갑다.' },
            { id: 'msg5', sender: 'left', name: '동창', text: '언제 밥 한번 먹자.' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '오랫만이다',
          correctText: '오랜만이다',
          explanation: "'오래간만이다'의 준말은 '오랜만이다'입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '선생님', text: '숙제 다 했니?' },
            { id: 'msg2', sender: 'right', text: '아뇨 아직 조금 남았어요.' },
            { id: 'msg3', sender: 'left', name: '선생님', text: '얼른 하고 자야지.' },
            { id: 'msg4', sender: 'right', text: '네 금새 끝내고 잘게요.' },
            { id: 'msg5', sender: 'left', name: '선생님', text: '그래 수고해라.' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '금새',
          correctText: '금세',
          explanation: "'금시에'의 준말이므로 '금세'가 올바른 표기입니다.",
          location: 'msg4',
        },
      },
    ],
  },
  {
    id: 'stage4',
    level: 4,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '여친', text: '오빠 나 몸이 좀 안 좋아 ㅠㅠ' },
            { id: 'msg2', sender: 'right', text: '헐 왜? 감기 걸렸어?' },
            { id: 'msg3', sender: 'left', name: '여친', text: '응 열도 나고 목도 아파.' },
            { id: 'msg4', sender: 'right', text: '저런... 약 먹고 빨리 낳으세요.' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '낳으세요',
          correctText: '나으세요',
          explanation: "병이 치유되는 것은 '낫다(나으세요)'이고, 아기는 '낳다(낳으세요)'입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '친구', text: '야 너 어제 왜 학원 안 옴?' },
            { id: 'msg2', sender: 'right', text: '나 좀 아파서 쉬었어.' },
            { id: 'msg3', sender: 'left', name: '친구', text: '헐 어디가 아픈데?' },
            { id: 'msg4', sender: 'right', text: '나 사실 아만자잖아...' },
            { id: 'msg5', sender: 'left', name: '친구', text: '뭐?? 진짜야??' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '아만자잖아',
          correctText: '암 환자잖아',
          explanation: "'암 환자'를 소리 나는 대로 잘못 쓴 밈입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '엄마', text: '아들 요즘 건강은 괜찮니?' },
            { id: 'msg2', sender: 'right', text: '네 뭐 그냥 그래요.' },
            { id: 'msg3', sender: 'left', name: '엄마', text: '미세먼지 심하니까 마스크 써.' },
            { id: 'msg4', sender: 'right', text: '맞아요 저 귀간지가 안 좋아서 조심해야 돼요.' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '귀간지',
          correctText: '기관지',
          explanation: "호흡기 기관인 '기관지'를 잘못 쓴 밈입니다.",
          location: 'msg4',
        },
      },
    ],
  },
  {
    id: 'stage5',
    level: 5,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '동기', text: '오늘 점심 뭐 먹을까?' },
            { id: 'msg2', sender: 'right', text: '글쎄... 김치찌게 어때?' },
            { id: 'msg3', sender: 'left', name: '동기', text: '어제도 먹었잖아.' },
            { id: 'msg4', sender: 'right', text: '그럼 된장찌개?' },
            { id: 'msg5', sender: 'left', name: '동기', text: '오 그건 좋다 가자.' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '김치찌게',
          correctText: '김치찌개',
          explanation: "음식 이름 '찌개'는 'ㅐ'가 맞습니다. (개)",
          location: 'msg2',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '동기', text: '편의점 갈 건데 뭐 사다 줄까?' },
            { id: 'msg2', sender: 'right', text: '음... 출출한데 떡볶기?' },
            { id: 'msg3', sender: 'left', name: '동기', text: '컵라면 말고?' },
            { id: 'msg4', sender: 'right', text: '응 매운 거 땡겨.' },
            { id: 'msg5', sender: 'left', name: '동기', text: '알았어 사 올게.' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '떡볶기',
          correctText: '떡볶이',
          explanation: "'떡을 볶다'에서 명사화 접미사 '-이'가 붙어 '떡볶이'가 됩니다.",
          location: 'msg2',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '선배', text: '오늘 밥값 5만 원 나왔네.' },
            { id: 'msg2', sender: 'right', text: '헉 꽤 많이 나왔네요.' },
            { id: 'msg3', sender: 'left', name: '선배', text: '내가 낼 테니까 커피는 네가 사.' },
            { id: 'msg4', sender: 'right', text: '에이 깔끔하게 덮집회의 하시죠.' },
            { id: 'msg5', sender: 'left', name: '선배', text: '덮집... 뭐?' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '덮집회의',
          correctText: '더치페이',
          explanation: "'Dutch pay(더치페이)'를 발음이 비슷한 한글로 엉터리로 적은 밈입니다.",
          location: 'msg4',
        },
      },
    ],
  },
  {
    id: 'stage6',
    level: 6,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '중고거래', text: '물건 구매하시나요?' },
            { id: 'msg2', sender: 'right', text: '네 지금 입금할게요.' },
            { id: 'msg3', sender: 'left', name: '중고거래', text: '감사합니다.' },
            { id: 'msg4', sender: 'right', text: '혹시 괴자번호 좀 알려주세요.' },
            { id: 'msg5', sender: 'left', name: '중고거래', text: '아 네 잠시만요.' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '괴자번호',
          correctText: '계좌번호',
          explanation: "은행 '계좌(計座)'를 '괴자'로 잘못 쓴 유명한 밈입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '팀장님', text: '박 사원, 그 기안서 올렸나?' },
            { id: 'msg2', sender: 'right', text: '네 아까 오전에 올렸습니다.' },
            { id: 'msg3', sender: 'left', name: '팀장님', text: '알겠네. 검토해볼게.' },
            { id: 'msg4', sender: 'right', text: '빠른 결제 부탁드립니다!' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '결제',
          correctText: '결재',
          explanation: "상사가 안건을 승인하는 것은 '결재(決裁)'이고, 돈을 내는 것이 '결제(決濟)'입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '친구', text: '야 너 그 게임기 샀어?' },
            { id: 'msg2', sender: 'right', text: '응 당근마켓에서 샀음.' },
            { id: 'msg3', sender: 'right', text: '(사진)', image: 'used_game_console.jpg' },
            { id: 'msg4', sender: 'right', text: '5만 원. 충분히 그럴 가보치가 있어.' },
            { id: 'msg5', sender: 'left', name: '친구', text: '오 싸게 잘 샀네.' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '가보치',
          correctText: '값어치',
          explanation: "'값(Value)'과 '어치(Worth)'의 합성어 '값어치'를 소리 나는 대로 쓴 오류입니다.",
          location: 'msg4',
        },
      },
    ],
  },
  {
    id: 'stage7',
    level: 7,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '남친', text: '자기야 나 차 사고 났어...' },
            { id: 'msg2', sender: 'right', text: '헐? 다친 데는 없어?' },
            { id: 'msg3', sender: 'left', name: '남친', text: '몸은 괜찮은데 범퍼가 박살 남.' },
            { id: 'msg4', sender: 'right', text: '와 진짜 어의없다.. 조심 좀 하지.' },
            { id: 'msg5', sender: 'left', name: '남친', text: '미안해 ㅠㅠ' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '어의없다',
          correctText: '어이없다',
          explanation: "'어이없다'가 표준어입니다. '어의'는 임금님의 의사를 뜻합니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '언니', text: '오늘 소개팅 어땠어?' },
            { id: 'msg2', sender: 'right', text: '그냥 뭐... 나쁘지 않았어.' },
            { id: 'msg3', sender: 'left', name: '언니', text: '외모는? 스타일은?' },
            { id: 'msg4', sender: 'right', text: '그냥 문안한 스타일이더라.' },
            { id: 'msg5', sender: 'left', name: '언니', text: '애프터는 받을 것 같아?' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '문안한',
          correctText: '무난한',
          explanation: "별 탈 없거나 평범하다는 뜻은 '무난(無難)하다'입니다. '문안'은 안부를 묻는 것입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '후배', text: '선배님 저 질문 있는데요.' },
            { id: 'msg2', sender: 'right', text: '어 뭔데? 말해봐.' },
            { id: 'msg3', sender: 'left', name: '후배', text: '신뢰지만 나이가 어떻게 되세요?' },
            { id: 'msg4', sender: 'right', text: '...? 갑자기?' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '신뢰지만',
          correctText: '실례지만',
          explanation: "무례를 범한다는 뜻의 '실례(失禮)'를 '신뢰(Trust)'로 잘못 쓴 밈입니다.",
          location: 'msg3',
        },
      },
    ],
  },
  {
    id: 'stage8',
    level: 8,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '친구', text: '오늘 날씨 진짜 춥지 않냐?' },
            { id: 'msg2', sender: 'right', text: '어제는 따뜻했는데 갑자기 왜 이래?' },
            { id: 'msg3', sender: 'left', name: '친구', text: '내일은 더 춥대.' },
            { id: 'msg4', sender: 'right', text: '요즘 곱셈추위라 그런가 봐.' },
            { id: 'msg5', sender: 'left', name: '친구', text: '수학 공부하냐? ㅋㅋ' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '곱셈추위',
          correctText: '꽃샘추위',
          explanation: "꽃이 피는 것을 시샘하는 추위는 '꽃샘추위'입니다. '곱셈'은 수학 용어입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '엄마', text: '에어컨 좀 틀어라 너무 덥다.' },
            { id: 'msg2', sender: 'right', text: '엄마 전기세 많이 나와요.' },
            { id: 'msg3', sender: 'right', text: '(사진)', image: 'ac_outdoor_unit.jpg' },
            { id: 'msg4', sender: 'right', text: '그리고 에어콘 시래기 소리 엄청 커.' },
            { id: 'msg5', sender: 'left', name: '엄마', text: '아 맞아 소리 좀 줄여야겠다.' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '에어콘 시래기',
          correctText: '에어컨 실외기',
          explanation: "실내의 열을 밖으로 내보내는 기계는 '실외기'입니다. '시래기'는 무청을 말린 나물입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '남친', text: '자기야 오늘 날씨 좋다.' },
            { id: 'msg2', sender: 'right', text: '그러게 집에만 있기 아깝네.' },
            { id: 'msg3', sender: 'left', name: '남친', text: '한강 가서 라면 먹을까?' },
            { id: 'msg4', sender: 'right', text: '좋아 바람 쇠러 가자!' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '쇠러',
          correctText: '쐬러',
          explanation: "'바람을 쐬다'가 기본형이므로 '쐬러'라고 써야 합니다.",
          location: 'msg4',
        },
      },
    ],
  },
  {
    id: 'stage9',
    level: 9,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '학생', text: '선생님 저 고등학교 어디 갈까요?' },
            { id: 'msg2', sender: 'right', text: '음 성적을 좀 볼까?' },
            { id: 'msg3', sender: 'left', name: '학생', text: '공부는 저랑 안 맞는 것 같아요.' },
            { id: 'msg4', sender: 'left', name: '학생', text: '그냥 시럽계 고등학교 갈까요?' },
            { id: 'msg5', sender: 'right', text: '달콤하겠구나...' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '시럽계',
          correctText: '실업계',
          explanation: "직업 교육을 하는 고등학교는 '실업계(實業系)'입니다. '시럽'은 먹는 것입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '후배', text: '선배님은 존경하는 사람 있어요?' },
            { id: 'msg2', sender: 'right', text: '난 이순신 장군님 존경해.' },
            { id: 'msg3', sender: 'left', name: '후배', text: '오 저도요.' },
            { id: 'msg4', sender: 'left', name: '후배', text: '제 멘토로 삶기 좋은 분이죠.' },
            { id: 'msg5', sender: 'right', text: '나도 그분 좋아해.' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '삶기',
          correctText: '삼기',
          explanation: "어떤 대상으로 만들다는 뜻은 '삼다'입니다. '삶다'는 익히는 것입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '친구', text: '야 시험 답안지 냈냐?' },
            { id: 'msg2', sender: 'right', text: '아 맞다 깜빡했다.' },
            { id: 'msg3', sender: 'left', name: '친구', text: '빨리 제출해 시간 다 됐어.' },
            { id: 'msg4', sender: 'right', text: '오회말 카드가 어디 갔지?' },
            { id: 'msg5', sender: 'left', name: '친구', text: '책상 서랍에 있지 않아?' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '오회말',
          correctText: 'OMR',
          explanation: "'OMR 카드'를 야구의 '5회 말'처럼 잘못 쓴 밈입니다.",
          location: 'msg4',
        },
      },
    ],
  },
  {
    id: 'stage10',
    level: 10,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '전여친', text: '오빠 자?...' },
            { id: 'msg2', sender: 'right', text: '누구세요?' },
            { id: 'msg3', sender: 'left', name: '전여친', text: '나야... 우리 다시 시작하면 안 될까?' },
            { id: 'msg4', sender: 'left', name: '전여친', text: '제발 나 흔들어 놋지 마.' },
            { id: 'msg5', sender: 'right', text: '미안 나 이제 자야겠어.' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '나 흔들어 놋지 마',
          correctText: '나 흔들어 놓지 마',
          explanation: "'흔들어 놓다'를 소리 나는 대로 잘못 적은 밈입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '전여친', text: '오빠 잊으려고 노력 많이 했어.' },
            { id: 'msg2', sender: 'right', text: '그래서?' },
            { id: 'msg3', sender: 'left', name: '전여친', text: '진짜 앟감힘을 쓰고 참았는데...' },
            { id: 'msg4', sender: 'right', text: '그래서? 제발 가라.' },
            { id: 'msg5', sender: 'left', name: '전여친', text: '너무해 ㅠㅠ' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '앟감힘을',
          correctText: '안간힘을',
          explanation: "어떤 일을 이루기 위해 몹시 애쓰는 힘은 '안간힘'입니다.",
          location: 'msg3',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '남친', text: '자기야 미안해 내가 잘못했어.' },
            { id: 'msg2', sender: 'right', text: '뭐가 미안한데?' },
            { id: 'msg3', sender: 'left', name: '남친', text: '데리러 가고 싶은데 차가 고장 났어.' },
            { id: 'msg4', sender: 'left', name: '남친', text: '지금 여권이 안 돼.' },
            { id: 'msg5', sender: 'right', text: '알았어 나중에 봐.' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '여권이',
          correctText: '여건이',
          explanation: "주어진 조건이나 상황은 '여건(與件)'입니다. '여권'은 해외여행 갈 때 필요합니다.",
          location: 'msg4',
        },
      },
    ],
  },
  {
    id: 'stage11',
    level: 11,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '동생', text: '형 사극 드라마 좋아해?' },
            { id: 'msg2', sender: 'right', text: '응 나 요즘 조선시대물 빠져있어.' },
            { id: 'msg3', sender: 'left', name: '동생', text: '거기서 대사 멋있는 거 뭐 있어?' },
            { id: 'msg4', sender: 'right', text: '저놈은 죄인이니 당장 오랄을 받아라!' },
            { id: 'msg5', sender: 'left', name: '동생', text: '형... 그건 좀 이상한데?' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '오랄을',
          correctText: '오라를',
          explanation: "죄인을 묶던 붉은 줄은 '오라'입니다. '오랄'은 영어의 구강(Oral)을 뜻해 의미가 왜곡됩니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '친구', text: '야 너 비밀 지킬 수 있지?' },
            { id: 'msg2', sender: 'right', text: '당연하지. 무덤까지 가져감.' },
            { id: 'msg3', sender: 'left', name: '친구', text: '진짜지? 딴 데 말하면 안 된다.' },
            { id: 'msg4', sender: 'right', text: '걱정 마. 마마 잃은 중천공이라잖아.' },
            { id: 'msg5', sender: 'left', name: '친구', text: '알았어 믿을게 ㅋㅋㅋ' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '마마 잃은 중천공',
          correctText: '남아일언중천금',
          explanation: "남자의 말은 무게가 있다는 사자성어 '남아일언중천금'을 소리 나는 대로 잘못 쓴 밈입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '김대리', text: '박 사원, 백업 안 해뒀어?' },
            { id: 'msg2', sender: 'right', text: '아 맞다... 파일 날아갔어요.' },
            { id: 'msg3', sender: 'left', name: '김대리', text: '미리미리 하라니까.' },
            { id: 'msg4', sender: 'right', text: '소 잃고 뇌 약간 고치는 격이네요 ㅠㅠ' },
            { id: 'msg5', sender: 'left', name: '김대리', text: '그러게요 앞으로는 꼭 해둬.' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '뇌 약간',
          correctText: '외양간',
          explanation: "속담 '소 잃고 외양간 고친다'를 잘못 쓴 밈입니다.",
          location: 'msg4',
        },
      },
    ],
  },
  {
    id: 'stage12',
    level: 12,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '여친', text: '오빠 폰 비번 좀 알려줘.' },
            { id: 'msg2', sender: 'right', text: '갑자기 왜?' },
            { id: 'msg3', sender: 'left', name: '여친', text: '그냥 궁금해서. 못 보여줘?' },
            { id: 'msg4', sender: 'right', text: '아무리 연인이라도 사생활치매는 좀 그래.' },
            { id: 'msg5', sender: 'left', name: '여친', text: '알았어 미안...' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '사생활치매',
          correctText: '사생활 침해',
          explanation: "권리를 침범하는 것은 '침해(侵害)'입니다. '치매'는 뇌 질환입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '알바생', text: '점장님 CCTV로 감시하지 마세요.' },
            { id: 'msg2', sender: 'right', text: '근무 태도 확인한 거야.' },
            { id: 'msg3', sender: 'left', name: '알바생', text: '이거 명백한 인권치매인 거 아시죠?' },
            { id: 'msg4', sender: 'right', text: '뭔 소리야 일이나 해.' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '인권치매',
          correctText: '인권 침해',
          explanation: "'인권 침해'를 '치매'로 잘못 쓴 사례입니다.",
          location: 'msg3',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '악플러', text: '너 진짜 못생겼다 ㅋㅋ' },
            { id: 'msg2', sender: 'right', text: '너 누구야?' },
            { id: 'msg3', sender: 'left', name: '악플러', text: '거울은 보고 다니냐?' },
            { id: 'msg4', sender: 'right', text: '캡처했다. 명예회손으로 고소할게.' },
            { id: 'msg5', sender: 'left', name: '악플러', text: '어휴 무서워 ㅋㅋ' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '명예회손',
          correctText: '명예훼손',
          explanation: "가치나 이름을 손상시키는 것은 '훼손(毁損)'이 맞습니다.",
          location: 'msg4',
        },
      },
    ],
  },
  {
    id: 'stage13',
    level: 13,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '자취생', text: '밥 비벼 먹을 건데 참치 있어?' },
            { id: 'msg2', sender: 'right', text: '응 찬장에 있어.' },
            { id: 'msg3', sender: 'right', text: '(사진)', image: 'tuna_can_meme.jpg' },
            { id: 'msg4', sender: 'right', text: '고추참치 먹을래 야치참치 먹을래?' },
            { id: 'msg5', sender: 'left', name: '자취생', text: '고추참치로 줘!' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '야치참치',
          correctText: '야채참치',
          explanation: "'야채(Vegetable)'를 '야치'로 잘못 쓴 인터넷 밈입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '구매자', text: '자전거 만 원에 파시나요?' },
            { id: 'msg2', sender: 'right', text: '네 상태 좋아요.' },
            { id: 'msg3', sender: 'left', name: '구매자', text: '학생인데 좀 깍깍주세요 ㅠㅠ' },
            { id: 'msg4', sender: 'right', text: '이미 충분히 싼데...' },
            { id: 'msg5', sender: 'left', name: '구매자', text: '천 원만요...' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '깍깍주세요',
          correctText: '깎아주세요',
          explanation: "값을 내리는 것은 '깎다'입니다. '깍깍'은 의성어입니다.",
          location: 'msg3',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '부장님', text: '오늘 회의 수고했네.' },
            { id: 'msg2', sender: 'right', text: '감사합니다 부장님.' },
            { id: 'msg3', sender: 'left', name: '부장님', text: '내일 아침에 다시 얘기하지.' },
            { id: 'msg4', sender: 'right', text: '네 내일 뵈요!' },
            { id: 'msg5', sender: 'left', name: '부장님', text: '그래 내일 보자고.' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '뵈요',
          correctText: '봬요',
          explanation: "'뵈어요'의 준말은 '봬요'입니다. '뵈' 뒤에 바로 보조사 '요'가 붙을 수 없습니다.",
          location: 'msg4',
        },
      },
    ],
  },
  {
    id: 'stage14',
    level: 14,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '썸녀', text: '오빠 놀이공원 가자!' },
            { id: 'msg2', sender: 'right', text: '좋지 롯데월드 갈까?' },
            { id: 'msg3', sender: 'left', name: '썸녀', text: '응 나 무서운 거 잘 타.' },
            { id: 'msg4', sender: 'left', name: '썸녀', text: '(사진)', image: 'gyro_swing_ride.jpg' },
            { id: 'msg5', sender: 'left', name: '썸녀', text: '자의로스윙 꼭 타자!' },
            { id: 'msg6', sender: 'right', text: '좋아 그거 타자!' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '자의로스윙',
          correctText: '자이로스윙',
          explanation: "놀이기구 '자이로스윙(Gyro Swing)'을 '자의로'로 잘못 쓴 밈입니다.",
          location: 'msg5',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '운동부', text: '너 이번 겨울 방학에 뭐 해?' },
            { id: 'msg2', sender: 'right', text: '나 제주도로 훈련 가.' },
            { id: 'msg3', sender: 'left', name: '운동부', text: '오 좋겠다 따뜻하겠네.' },
            { id: 'msg4', sender: 'right', text: '응 전지훌련 가서 몸 좀 만들려고.' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '전지훌련',
          correctText: '전지훈련',
          explanation: "장소를 옮겨서 하는 훈련은 '전지훈련(轉地訓鍊)'입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '스터디', text: '이번 주 책 다 읽어오셨나요?' },
            { id: 'msg2', sender: 'right', text: '너무 바빠서 대충 봤어요.' },
            { id: 'msg3', sender: 'left', name: '스터디', text: '토론하려면 정독해야 하는데...' },
            { id: 'msg4', sender: 'right', text: '완전 수박겁탈기 식으로 읽었네요 ㅠㅠ' },
            { id: 'msg5', sender: 'left', name: '스터디', text: '그래도 토론은 해봐야죠 ㅠㅠ' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '수박겁탈기',
          correctText: '수박 겉핥기',
          explanation: "내용은 모르고 겉만 건드린다는 속담은 '수박 겉핥기'입니다. '겁탈'은 범죄입니다.",
          location: 'msg4',
        },
      },
    ],
  },
  {
    id: 'stage15',
    level: 15,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '친구', text: '노래방 가서 무슨 노래 부를까?' },
            { id: 'msg2', sender: 'right', text: '부활 노래 어때?' },
            { id: 'msg3', sender: 'right', text: '(사진)', image: 'music_playlist_meme.jpg' },
            { id: 'msg4', sender: 'right', text: '이거 명곡이잖아. 네이버엔딩스토리.' },
            { id: 'msg5', sender: 'left', name: '친구', text: '아 그거 좋지!' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '네이버엔딩스토리',
          correctText: '네버엔딩스토리',
          explanation: "영어 'Never Ending'을 포털 사이트 'Naver'로 착각해 잘못 쓴 밈입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '소개팅녀', text: '어떤 스타일 좋아하세요?' },
            { id: 'msg2', sender: 'right', text: '저는 좀 차분한 사람이 좋아요.' },
            { id: 'msg3', sender: 'left', name: '소개팅녀', text: '아 유머러스한 사람은 별로인가요?' },
            { id: 'msg4', sender: 'right', text: '네. 제 성격이 좀 골이 따분해서요.' },
            { id: 'msg5', sender: 'left', name: '소개팅녀', text: '아 그런 스타일이시군요 ㅎㅎ' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '골이 따분해서요',
          correctText: '고리타분해서요',
          explanation: "하는 짓이나 성격이 신선하지 못하다는 '고리타분하다'가 맞습니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '학생', text: '선생님 보건 시간에 궁금한 게 있어요.' },
            { id: 'msg2', sender: 'right', text: '어 뭔데? 질문해 봐.' },
            { id: 'msg3', sender: 'left', name: '학생', text: '피임법 중에 지뢰사정법이 뭐예요?' },
            { id: 'msg4', sender: 'right', text: '...? 지뢰가 거기서 왜 나와?' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '지뢰사정법',
          correctText: '질외사정법',
          explanation: "피임 방법 중 하나인 '질외사정'을 '지뢰'로 잘못 쓴 밈입니다.",
          location: 'msg3',
        },
      },
    ],
  },
  {
    id: 'stage16',
    level: 16,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '엄마', text: '너 화장품 너무 많이 쓰지 마.' },
            { id: 'msg2', sender: 'right', text: '왜요? 이거 비싼 건데.' },
            { id: 'msg3', sender: 'left', name: '엄마', text: '뉴스 보니까 안 좋은 성분 있대.' },
            { id: 'msg4', sender: 'right', text: '설마 바람물질이라도 들어갔대요?' },
            { id: 'msg5', sender: 'left', name: '엄마', text: '그래 조심해서 써라.' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '바람물질',
          correctText: '발암물질',
          explanation: "암을 유발하는 물질은 '발암(發癌) 물질'입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '친구', text: '야 뉴스 봤냐? 바이러스 무섭더라.' },
            { id: 'msg2', sender: 'right', text: '그러게 마스크 꼭 쓰고 다녀야 해.' },
            { id: 'msg3', sender: 'left', name: '친구', text: '걸리면 죽을 수도 있대.' },
            { id: 'msg4', sender: 'right', text: '맞아 취사율이 90프로나 된대.' },
            { id: 'msg5', sender: 'left', name: '친구', text: '헐 진짜? 무섭다...' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '취사율',
          correctText: '치사율',
          explanation: "죽음에 이르는 비율은 '치사율(致死率)'입니다. '취사'는 밥을 짓는 것입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '다이어터', text: '나 샐러드만 먹었는데 1kg 쪘어.' },
            { id: 'msg2', sender: 'right', text: '드레싱 많이 뿌린 거 아냐?' },
            { id: 'msg3', sender: 'left', name: '다이어터', text: '아니야 진짜 풀만 먹었어.' },
            { id: 'msg4', sender: 'right', text: '와 진짜 귀신이 고칼로리네.' },
            { id: 'msg5', sender: 'left', name: '다이어터', text: '그러게 말이야...' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '귀신이 고칼로리',
          correctText: '곡할 노릇',
          explanation: "'귀신이 곡(wail)할 노릇이다'를 '고칼로리'로 잘못 쓴 재미있는 밈입니다.",
          location: 'msg4',
        },
      },
    ],
  },
  {
    id: 'stage17',
    level: 17,
    mode: 'chat',
    timeLimit: 50,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '친구', text: '오늘 기분 좋아 보이네?' },
            { id: 'msg2', sender: 'right', text: '응 날씨가 좋잖아.' },
            { id: 'msg3', sender: 'left', name: '친구', text: '단순하다 단순해.' },
            { id: 'msg4', sender: 'right', text: '그냥 웬지 좋은 일이 생길 것 같아.' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '웬지',
          correctText: '왠지',
          explanation: "'왜인지'의 준말은 '왠지'입니다. 그 외 '웬만하면', '웬일' 등은 모두 '웬'을 씁니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '팀원', text: '저 오늘 좀 늦을 것 같아요.' },
            { id: 'msg2', sender: 'right', text: '무슨 일 있어요?' },
            { id: 'msg3', sender: 'left', name: '팀원', text: '차가 너무 막히네요.' },
            { id: 'msg4', sender: 'right', text: '왠만하면 지하철 타시지 그랬어요.' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '왠만하면',
          correctText: '웬만하면',
          explanation: "'왠지(왜인지)'를 제외한 모든 경우는 '웬'을 씁니다. (웬만하면, 웬 떡이냐)",
          location: 'msg4',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '친구', text: '야 너 여기서 뭐 하냐?' },
            { id: 'msg2', sender: 'right', text: '어? 네가 여기 왠일이야?' },
            { id: 'msg3', sender: 'left', name: '친구', text: '나 여기 살아 바보야.' },
            { id: 'msg4', sender: 'right', text: '아 맞다 ㅋㅋㅋ' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '왠일',
          correctText: '웬일',
          explanation: "'어찌 된 일'이라는 뜻은 '웬일'이 맞습니다. '왠'은 '왠지'에서만 쓰입니다.",
          location: 'msg2',
        },
      },
    ],
  },
  {
    id: 'stage18',
    level: 18,
    mode: 'chat',
    timeLimit: 50,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '엄마', text: '설거지 좀 해라.' },
            { id: 'msg2', sender: 'right', text: '이따가 할게 좀 쉬고.' },
            { id: 'msg3', sender: 'left', name: '엄마', text: '지금 당장 해.' },
            { id: 'msg4', sender: 'right', text: '아 알았어 내가 할께.' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '할께',
          correctText: '할게',
          explanation: "종결 어미는 소리 나는 대로 적지 않습니다. '-ㄹ게'가 올바른 표기입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '친구', text: '나 먼저 간다.' },
            { id: 'msg2', sender: 'right', text: '벌써 가게?' },
            { id: 'msg3', sender: 'left', name: '친구', text: '응 학원 늦었어.' },
            { id: 'msg4', sender: 'right', text: '그래 조심해서 가 나도 곧 갈께.' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '갈께',
          correctText: '갈게',
          explanation: "발음은 [갈께]지만 표기는 '갈게'가 맞습니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '여친', text: '나 배고파.' },
            { id: 'msg2', sender: 'right', text: '뭐 먹고 싶은데?' },
            { id: 'msg3', sender: 'left', name: '여친', text: '아무거나 맛있는 거.' },
            { id: 'msg4', sender: 'right', text: '알았어 맛집 찾아봐 줄께.' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '줄께',
          correctText: '줄게',
          explanation: "'줄께'가 아니라 '줄게'로 적어야 합니다.",
          location: 'msg4',
        },
      },
    ],
  },
  {
    id: 'stage19',
    level: 19,
    mode: 'chat',
    timeLimit: 50,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '후배', text: '선배님 저 오늘 일찍 가도 돼요?' },
            { id: 'msg2', sender: 'right', text: '일은 다 끝냈어?' },
            { id: 'msg3', sender: 'left', name: '후배', text: '아뇨 내일 하려고요.' },
            { id: 'msg4', sender: 'right', text: '그럼 않 돼. 다 하고 가.' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '않 돼',
          correctText: '안 돼',
          explanation: "'안'은 '아니'의 준말이고, '않'은 '아니하-'의 준말입니다. '돼' 앞에는 '안'을 씁니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '친구', text: '너 어제 헬스장 갔냐?' },
            { id: 'msg2', sender: 'right', text: '아니 귀찮아서 안 갔어.' },
            { id: 'msg3', sender: 'left', name: '친구', text: '운동 좀 해라.' },
            { id: 'msg4', sender: 'right', text: '몰라 평생 운동 않 해.' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '않 해',
          correctText: '안 해',
          explanation: "'해(하다)' 앞에는 부정 부사 '안'을 씁니다. '않'은 뒤에 어미가 붙어 '않고', '않아' 꼴로 쓰입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '엄마', text: '밥 먹어라.' },
            { id: 'msg2', sender: 'right', text: '저 밥 생각 없어요.' },
            { id: 'msg3', sender: 'left', name: '엄마', text: '한 숟갈이라도 먹어.' },
            { id: 'msg4', sender: 'right', text: '진짜 밥 않 먹고 싶다고요.' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '않 먹고',
          correctText: '안 먹고',
          explanation: "'먹다'를 부정할 때는 '안 먹다' 혹은 '먹지 않다'로 씁니다. '않 먹다'는 틀린 표현입니다.",
          location: 'msg4',
        },
      },
    ],
  },
  {
    id: 'stage20',
    level: 20,
    mode: 'chat',
    timeLimit: 50,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '팀장', text: '이번 프로젝트에서 맡은 게 뭔가?' },
            { id: 'msg2', sender: 'right', text: '저는 자료 조사를 맡았습니다.' },
            { id: 'msg3', sender: 'left', name: '팀장', text: '중요한 일이군.' },
            { id: 'msg4', sender: 'right', text: '네 제 역활에 최선을 다하겠습니다.' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '역활',
          correctText: '역할',
          explanation: "자기가 마땅히 하여야 할 맡은 바 직책은 '역할(役割)'입니다. '할'입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '친구', text: '저기 봐봐 저 사람 옷차림 좀 봐.' },
            { id: 'msg2', sender: 'right', text: '와 진짜 특이하다.' },
            { id: 'msg3', sender: 'left', name: '친구', text: '그치? 어디서 산 거지?' },
            { id: 'msg4', sender: 'right', text: '참 희안한 스타일이네.' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '희안한',
          correctText: '희한한',
          explanation: "매우 드물거나 신기하다는 '희한(稀罕)하다'입니다. 'ㅎ' 받침입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '남친', text: '내일 데이트 기대된다.' },
            { id: 'msg2', sender: 'right', text: '나도! 빨리 보고 싶어.' },
            { id: 'msg3', sender: 'left', name: '남친', text: '잠이 안 오네 ㅋㅋ' },
            { id: 'msg4', sender: 'right', text: '나도 가슴이 설레임.' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '설레임',
          correctText: '설렘',
          explanation: "'설레다'의 명사형은 '설렘'입니다. '설레임'은 아이스크림 이름입니다.",
          location: 'msg4',
        },
      },
    ],
  },
  {
    id: 'stage21',
    level: 21,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '김철수', text: '이번 시험 범위 너무 많은 거 아니냐?' },
            { id: 'msg2', sender: 'right', text: '그러게. 교과서 100페이지가 말이 돼?' },
            { id: 'msg3', sender: 'left', name: '김철수', text: '나 어제 밤새서 공부했어.' },
            { id: 'msg4', sender: 'right', text: '(사진)', image: 'tired_face.jpg' },
            { id: 'msg5', sender: 'right', text: '얼굴 보니까 진짜 피곤해 보이네.' },
            { id: 'msg6', sender: 'left', name: '김철수', text: '오늘은 좀 시험시험 하려고.' },
            { id: 'msg7', sender: 'right', text: '그래. 건강 챙기면서 쉬엄쉬엄 해.' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '시험시험',
          correctText: '쉬엄쉬엄',
          explanation: "'쉬엄쉬엄'이 올바른 표현입니다.",
          location: 'msg6',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '이미영', text: '너 영어 숙제 다 했어?' },
            { id: 'msg2', sender: 'right', text: '아 맞다! 깜빡하고 있었다.' },
            { id: 'msg3', sender: 'left', name: '이미영', text: '지금이라도 빨리 해.' },
            { id: 'msg4', sender: 'right', text: '지금 시작하면 늦을 것 같은데 어떻해?' },
            { id: 'msg5', sender: 'left', name: '이미영', text: '어떡하긴 뭘 어떡해. 빨리 펜이나 잡아.' },
            { id: 'msg6', sender: 'right', text: '알았어 ㅠㅠ 금방 끝낼게.' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '어떻해',
          correctText: '어떡해',
          explanation: "'어떻게 해'의 준말은 '어떡해'입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '박지성', text: '도서관 자리 있어?' },
            { id: 'msg2', sender: 'right', text: '지금 꽉 찼어. 자리 잡기 힘들어.' },
            { id: 'msg3', sender: 'left', name: '박지성', text: '아 진짜? 그냥 집에서 해야겠네.' },
            { id: 'msg4', sender: 'right', text: '집에서는 집중 잘 안 되잖아.' },
            { id: 'msg5', sender: 'left', name: '박지성', text: '그래도 공부 않할 수는 없으니까.' },
            { id: 'msg6', sender: 'right', text: '맞아. 집에서도 열심히 해봐.' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '않할',
          correctText: '안 할',
          explanation: "'안 하다'의 '안'은 부정 부사로 띄어 씁니다.",
          location: 'msg5',
        },
      },
    ],
  },
  {
    id: 'stage22',
    level: 22,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '최민지', text: '너 존경하는 인물 있어?' },
            { id: 'msg2', sender: 'right', text: '갑자기? 음... 세종대왕님?' },
            { id: 'msg3', sender: 'left', name: '최민지', text: '너무 교과서적인 대답 아니야? ㅋㅋ' },
            { id: 'msg4', sender: 'right', text: '그럼 너는 누군데?' },
            { id: 'msg5', sender: 'left', name: '최민지', text: '(사진)', image: 'celebrity.jpg' },
            { id: 'msg6', sender: 'left', name: '최민지', text: '난 이 배우. 멘토로 삶기 딱 좋은 분 같아.' },
            { id: 'msg7', sender: 'right', text: '아 그분 인성 좋기로 유명하지.' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '멘토로 삶기',
          correctText: '멘토로 삼기',
          explanation: "'삼다'가 올바른 표현입니다. '삶다'는 요리할 때 씁니다.",
          location: 'msg6',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '김대리', text: '오늘 회의 자료 준비됐나요?' },
            { id: 'msg2', sender: 'right', text: '네, 지금 마무리 중입니다.' },
            { id: 'msg3', sender: 'left', name: '김대리', text: '알겠습니다. 3시에 회의실에서 뵈요.' },
            { id: 'msg4', sender: 'right', text: '네, 알겠습니다. 그때 뵙겠습니다.' },
            { id: 'msg5', sender: 'left', name: '김대리', text: '참, 커피 한 잔 사갈까요?' },
            { id: 'msg6', sender: 'right', text: '오 좋죠! 감사합니다.' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '뵈요',
          correctText: '봬요',
          explanation: "'뵈어요'의 준말은 '봬요'입니다.",
          location: 'msg3',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '이영희', text: '이번 조별 과제 누가 발표할래?' },
            { id: 'msg2', sender: 'right', text: '내가 자료 조사 맡았으니까 발표는 딴 사람이 해줘.' },
            { id: 'msg3', sender: 'left', name: '이영희', text: '그럼 내가 발표할게. PPT는 누가 만들어?' },
            { id: 'msg4', sender: 'right', text: '철수가 만든대.' },
            { id: 'msg5', sender: 'left', name: '이영희', text: '각자 역활 분담 잘 됐네.' },
            { id: 'msg6', sender: 'right', text: '응 이번엔 A+ 받자!' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '역활',
          correctText: '역할',
          explanation: "'역할(役割)'이 올바른 표기입니다.",
          location: 'msg5',
        },
      },
    ],
  },
  {
    id: 'stage23',
    level: 23,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '박철민', text: '야 너 어제 뱉은 말 책임질 수 있어?' },
            { id: 'msg2', sender: 'right', text: '무슨 말? 내가 뭐랬는데?' },
            { id: 'msg3', sender: 'left', name: '박철민', text: '오늘 밥 산다고 했잖아.' },
            { id: 'msg4', sender: 'right', text: '아 맞다 ㅋㅋ 알았어 사줄게.' },
            { id: 'msg5', sender: 'left', name: '박철민', text: '그래. 마마 잃은 중천공이라는데 지켜야지.' },
            { id: 'msg6', sender: 'right', text: '남아일언중천금 말하는 거지? ㅋㅋ 알았다고.' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '마마 잃은 중천공',
          correctText: '남아일언중천금',
          explanation: "'남아일언중천금(男兒一言重千金)'을 잘못 쓴 밈입니다.",
          location: 'msg5',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '김소연', text: '저기... 부탁 하나만 해도 될까?' },
            { id: 'msg2', sender: 'right', text: '뭔데? 말해봐.' },
            { id: 'msg3', sender: 'left', name: '김소연', text: '이번 주말에 내 알바 대타 좀 뛰어줄 수 있어?' },
            { id: 'msg4', sender: 'right', text: '주말은 좀 힘든데... 무슨 일 있어?' },
            { id: 'msg5', sender: 'left', name: '김소연', text: '급한 일이 생겨서. 염치 불구하고 부탁할게.' },
            { id: 'msg6', sender: 'right', text: '음... 알았어. 몇 시부터 몇 시까진데?' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '염치 불구하고',
          correctText: '염치 불고하고',
          explanation: "'돌아보지 아니하다'는 뜻의 '불고(不顧)하다'가 맞습니다.",
          location: 'msg5',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '정호석', text: '야 너 왜 자꾸 내 물건 만져?' },
            { id: 'msg2', sender: 'right', text: '아 미안, 신기해서 그랬어.' },
            { id: 'msg3', sender: 'left', name: '정호석', text: '내 물건 건들이지 마. 예민하단 말이야.' },
            { id: 'msg4', sender: 'right', text: '알았어. 다음부턴 눈으로만 볼게.' },
            { id: 'msg5', sender: 'left', name: '정호석', text: '(사진)', image: 'angry_cat.jpg' },
            { id: 'msg6', sender: 'left', name: '정호석', text: '조심해라 진짜.' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '건들이지',
          correctText: '건드리지',
          explanation: "'건드리다'가 기본형이므로 '건드리지'가 맞습니다.",
          location: 'msg3',
        },
      },
    ],
  },
  {
    id: 'stage24',
    level: 24,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '강진수', text: '어제 이사하느라 죽는 줄 알았다.' },
            { id: 'msg2', sender: 'right', text: '짐 많았어? 포장 이사 안 불렀어?' },
            { id: 'msg3', sender: 'left', name: '강진수', text: '돈 아끼려고 용달만 불렀지.' },
            { id: 'msg4', sender: 'right', text: '와 혼자서 그 냉장고를 옮겼다고?' },
            { id: 'msg5', sender: 'left', name: '강진수', text: '(사진)', image: 'fridge.jpg' },
            { id: 'msg6', sender: 'left', name: '강진수', text: '진짜 앟감힘을 쓰고 옮겼다.' },
            { id: 'msg7', sender: 'right', text: '고생했네. 몸살 나겠다.' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '앟감힘',
          correctText: '안간힘',
          explanation: "'어떤 일을 이루기 위해 몹시 쓰는 힘'은 '안간힘'입니다.",
          location: 'msg6',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'right', text: '나 지금 집 앞인데 문 좀 열어줘.' },
            { id: 'msg2', sender: 'left', name: '이수진', text: '어? 나 지금 밖에 있는데.' },
            { id: 'msg3', sender: 'right', text: '뭐야? 문 잠그고 나갔어?' },
            { id: 'msg4', sender: 'left', name: '이수진', text: '응 당연히 잠궜지. 비밀번호 몰라?' },
            { id: 'msg5', sender: 'right', text: '기억 안 나. 빨리 알려줘.' },
            { id: 'msg6', sender: 'left', name: '이수진', text: '0000이잖아 바보야.' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '잠궜지',
          correctText: '잠갔지',
          explanation: "'잠그다'의 활용형은 '잠가', '잠갔다'입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '한지민', text: '할머니 장례식 잘 끝났어?' },
            { id: 'msg2', sender: 'right', text: '응, 덕분에 잘 보냈어.' },
            { id: 'msg3', sender: 'left', name: '한지민', text: '많이 힘들었겠다. 몸은 좀 괜찮아?' },
            { id: 'msg4', sender: 'right', text: '피곤하긴 한데 괜찮아.' },
            { id: 'msg5', sender: 'left', name: '한지민', text: '큰일을 치루느라 고생 많았어. 푹 쉬어.' },
            { id: 'msg6', sender: 'right', text: '고마워. 조만간 밥 한 번 먹자.' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '치루느라',
          correctText: '치르느라',
          explanation: "'치르다'가 기본형이므로 '치르느라'가 맞습니다.",
          location: 'msg5',
        },
      },
    ],
  },
  {
    id: 'stage25',
    level: 25,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '노래방매니아', text: '야 오늘 노래방 고?' },
            { id: 'msg2', sender: 'right', text: '콜! 나 스트레스 풀고 싶었어.' },
            { id: 'msg3', sender: 'left', name: '노래방매니아', text: '나 요즘 꽂힌 노래 있어.' },
            { id: 'msg4', sender: 'right', text: '뭔데? 발라드?' },
            { id: 'msg5', sender: 'left', name: '노래방매니아', text: '나흔들어 놋지 마~ 이 노래 알지?' },
            { id: 'msg6', sender: 'right', text: '채연 노래 말하는 거야? ㅋㅋ 알지.' },
            { id: 'msg7', sender: 'left', name: '노래방매니아', text: '오늘 그거 부르면서 달린다.' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '나흔들어 놋지 마',
          correctText: '나를 흔들어 놓지 마',
          explanation: "가사를 소리 나는 대로 잘못 적은 것입니다.",
          location: 'msg5',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '김덕후', text: '이 노래 진짜 명곡 아니냐?' },
            { id: 'msg2', sender: 'right', text: '(사진)', image: 'album_cover.jpg' },
            { id: 'msg3', sender: 'right', text: '오 이거 나도 좋아해. 가사가 예술이지.' },
            { id: 'msg4', sender: 'left', name: '김덕후', text: '맞아. 사람들한테 명곡으로 불리워지는 이유가 있어.' },
            { id: 'msg5', sender: 'right', text: '멜로디도 너무 좋고.' },
            { id: 'msg6', sender: 'left', name: '김덕후', text: '무한 반복 중이다.' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '불리워지는',
          correctText: '불리는',
          explanation: "'불리다'가 피동사이므로 '불리워지다'는 이중 피동 오류입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '박팬클럽', text: '너 어제 TV 봤어? 내 최애 나옴!' },
            { id: 'msg2', sender: 'right', text: '아 그 예능 프로? 봤지.' },
            { id: 'msg3', sender: 'left', name: '박팬클럽', text: '진짜 너무 잘생기지 않았냐 ㅠㅠ' },
            { id: 'msg4', sender: 'right', text: '실물이 더 낫다던데.' },
            { id: 'msg5', sender: 'left', name: '박팬클럽', text: '나도 연애인 한 번만 실제로 보고 싶다.' },
            { id: 'msg6', sender: 'right', text: '콘서트 티켓팅 성공해야지 뭐.' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '연애인',
          correctText: '연예인',
          explanation: "'연예(演藝)'하는 사람이므로 '연예인'이 맞습니다.",
          location: 'msg5',
        },
      },
    ],
  },
  {
    id: 'stage26',
    level: 26,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '이여행', text: '이번 여름휴가 어디로 가?' },
            { id: 'msg2', sender: 'right', text: '아직 계획 못 세웠어. 넌?' },
            { id: 'msg3', sender: 'left', name: '이여행', text: '나도 못 가. 가고 싶은데 상황이 좀 그래.' },
            { id: 'msg4', sender: 'right', text: '왜? 휴가 못 냈어?' },
            { id: 'msg5', sender: 'left', name: '이여행', text: '아니, 돈도 없고 여권이 안 돼서.' },
            { id: 'msg6', sender: 'right', text: '여권? 아~ 여건이 안 된다고?', image: 'passport.jpg' },
            { id: 'msg7', sender: 'left', name: '이여행', text: '응. 요즘 너무 쪼들려서 ㅠㅠ' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '여권',
          correctText: '여건',
          explanation: "상황이나 조건을 뜻하는 말은 '여건'입니다.",
          location: 'msg5',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'right', text: '우리 부산 가는 길에 휴게소 갈까?' },
            { id: 'msg2', sender: 'left', name: '김운전', text: '그래. 나 화장실 좀 가고 싶어.' },
            { id: 'msg3', sender: 'right', text: '배고픈데 우동도 먹고 가자.' },
            { id: 'msg4', sender: 'left', name: '김운전', text: '좋아. 다음 휴게소 들렸다가 가자.' },
            { id: 'msg5', sender: 'right', text: '오케이. 내가 내비 찍을게.' },
            { id: 'msg6', sender: 'left', name: '김운전', text: '기름도 넣어야 해.' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '들렸다가',
          correctText: '들렀다가',
          explanation: "'들르다'의 활용형은 '들러', '들렀다'입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '최추억', text: '여기 기억나? 우리 예전에 왔었잖아.' },
            { id: 'msg2', sender: 'right', text: '어? 여기 그 카페잖아.' },
            { id: 'msg3', sender: 'left', name: '최추억', text: '(사진)', image: 'cafe.jpg' },
            { id: 'msg4', sender: 'left', name: '최추억', text: '맞아. 제작년에 왔었지.' },
            { id: 'msg5', sender: 'right', text: '벌써 2년이나 지났네. 시간 빠르다.' },
            { id: 'msg6', sender: 'left', name: '최추억', text: '그때 빙수 진짜 맛있었는데.' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '제작년',
          correctText: '재작년',
          explanation: "'지난해의 바로 전 해'는 '재작년(再昨年)'입니다.",
          location: 'msg4',
        },
      },
    ],
  },
  {
    id: 'stage27',
    level: 27,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '신입회원', text: '안녕하세요! 가입 인사 드립니다.' },
            { id: 'msg2', sender: 'right', text: '반갑습니다~ 잘 부탁드려요.' },
            { id: 'msg3', sender: 'left', name: '신입회원', text: '혹시 여기 평균 연령대가 어떻게 되나요?' },
            { id: 'msg4', sender: 'right', text: '다양해요. 20대부터 50대까지 있어요.' },
            { id: 'msg5', sender: 'left', name: '신입회원', text: '아 그렇군요. 신뢰지만 나이가 어떻게 되세요?' },
            { id: 'msg6', sender: 'right', text: '저는 30대입니다. 편하게 부르세요.' },
            { id: 'msg7', sender: 'left', name: '신입회원', text: '네 알겠습니다! 형님이라고 부를게요.' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '신뢰지만',
          correctText: '실례지만',
          explanation: "'말이나 행동이 예의에 벗어남'은 '실례(失禮)'입니다.",
          location: 'msg5',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '박엄마', text: '우리 아들 이번에 초등학교 입학해.' },
            { id: 'msg2', sender: 'right', text: '어머 정말? 벌써 그렇게 컸어?' },
            { id: 'msg3', sender: 'left', name: '박엄마', text: '(사진)', image: 'school_bag.jpg' },
            { id: 'msg4', sender: 'left', name: '박엄마', text: '가방 샀는데 너무 큰가 싶기도 하고.' },
            { id: 'msg5', sender: 'right', text: '아니야, 딱 좋아 보이는데?' },
            { id: 'msg6', sender: 'left', name: '박엄마', text: '나이에 알맞는 걸 사야 하는데 고민이네.' },
            { id: 'msg7', sender: 'right', text: '금방 크니까 좀 커도 괜찮아.' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '알맞는',
          correctText: '알맞은',
          explanation: "'알맞다'는 형용사이므로 관형사형 어미 '-은'을 써야 합니다.",
          location: 'msg6',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'right', text: '저기요, 이거 누구 거에요?' },
            { id: 'msg2', sender: 'left', name: '김철수', text: '어? 그거 제 우산이에요.' },
            { id: 'msg3', sender: 'right', text: '아까 두고 가셨더라고요. 여기 있어요.' },
            { id: 'msg4', sender: 'left', name: '김철수', text: '감사합니다. 비 쫄딱 맞을 뻔했네요.' },
            { id: 'msg5', sender: 'right', text: '조심해서 가세요.' },
            { id: 'msg6', sender: 'left', name: '김철수', text: '네! 다음에 뵙겠습니다. 내일 올거예요.' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '올거예요',
          correctText: '올 거예요',
          explanation: "의존 명사 '거'는 띄어 써야 합니다.",
          location: 'msg6',
        },
      },
    ],
  },
  {
    id: 'stage28',
    level: 28,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '김걱정', text: '뉴스 봤어? 그 바이러스 엄청 무섭대.' },
            { id: 'msg2', sender: 'right', text: '응 봤어. 전염성 강하다더라.' },
            { id: 'msg3', sender: 'left', name: '김걱정', text: '마스크 꼭 쓰고 다녀야겠다.' },
            { id: 'msg4', sender: 'right', text: '손도 잘 씻고 조심해야지.' },
            { id: 'msg5', sender: 'left', name: '김걱정', text: '취사율이 90프로나 된대. 덜덜...' },
            { id: 'msg6', sender: 'right', text: '치사율 말하는 거지? 진짜 무섭네.', image: 'mask.jpg' },
            { id: 'msg7', sender: 'left', name: '김걱정', text: '응. 우리 절대 아프지 말자.' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '취사율',
          correctText: '치사율',
          explanation: "'죽음에 이르는 비율'은 '치사율(致死率)'입니다. '취사'는 밥을 짓는 것입니다.",
          location: 'msg5',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'right', text: '몸살감기 걸려서 오늘 못 나갈 것 같아.' },
            { id: 'msg2', sender: 'left', name: '이친구', text: '헐 진짜? 열도 나?' },
            { id: 'msg3', sender: 'right', text: '응. 약 먹고 누워있어.' },
            { id: 'msg4', sender: 'left', name: '이친구', text: '(사진)', image: 'porridge.jpg' },
            { id: 'msg5', sender: 'left', name: '이친구', text: '죽이라도 사다 줄까?' },
            { id: 'msg6', sender: 'right', text: '아니야 괜찮아. 자고 일어나면 낫겠지.' },
            { id: 'msg7', sender: 'left', name: '이친구', text: '그래 푹 쉬고 빨리 낳으세요.' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '낳으세요',
          correctText: '나으세요',
          explanation: "'병이 낫다'의 활용은 '나으세요'입니다. '낳다'는 아이를 낳는 것입니다.",
          location: 'msg7',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '박뉴스', text: '요즘 유행어가 진짜 빨리 바뀌는 것 같아.' },
            { id: 'msg2', sender: 'right', text: '맞아. 며칠만 안 봐도 모르는 말 투성이야.' },
            { id: 'msg3', sender: 'left', name: '박뉴스', text: '저번 달 유행어 벌써 옛날 말 됐더라.' },
            { id: 'msg4', sender: 'right', text: '트렌드가 너무 빨라.' },
            { id: 'msg5', sender: 'left', name: '박뉴스', text: '금새 잊혀지는 게 좀 씁쓸하기도 하고.' },
            { id: 'msg6', sender: 'right', text: '그만큼 새로운 게 많이 나오는 거겠지.' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '금새',
          correctText: '금세',
          explanation: "'금시에'의 준말은 '금세'입니다.",
          location: 'msg5',
        },
      },
    ],
  },
  {
    id: 'stage29',
    level: 29,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '쿨거래남', text: '안녕하세요. 시계 팔렸나요?' },
            { id: 'msg2', sender: 'right', text: '아직 안 팔렸습니다.' },
            { id: 'msg3', sender: 'left', name: '쿨거래남', text: '상태는 어떤가요? 기스 없나요?' },
            { id: 'msg4', sender: 'right', text: '생활 기스 조금 있는데 깨끗해요.' },
            { id: 'msg5', sender: 'left', name: '쿨거래남', text: '네고 가능한가요? 3만원에 주세요.' },
            { id: 'msg6', sender: 'right', text: '죄송합니다. 그 가격엔 좀...' },
            { id: 'msg7', sender: 'left', name: '쿨거래남', text: '이거 5000원의 가보치도 안 되보이는데.' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '가보치',
          correctText: '값어치',
          explanation: "'일정한 액수에 해당하는 가치'는 '값어치'입니다.",
          location: 'msg7',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '구매희망', text: '자전거 구매하고 싶은데요.' },
            { id: 'msg2', sender: 'right', text: '네, 오시면 바로 타보실 수 있어요.' },
            { id: 'msg3', sender: 'left', name: '구매희망', text: '혹시 녹슨 데는 없나요?' },
            { id: 'msg4', sender: 'right', text: '(사진)', image: 'bike.jpg' },
            { id: 'msg5', sender: 'right', text: '보시다시피 관리 잘 했습니다.' },
            { id: 'msg6', sender: 'left', name: '구매희망', text: '오 상태 문안하네요. 제가 살게요.' },
            { id: 'msg7', sender: 'right', text: '네. 언제 오시겠어요?' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '문안하네요',
          correctText: '무난하네요',
          explanation: "'별로 어려움이 없다'는 '무난(無難)하다'입니다. '문안'은 안부를 묻는 것입니다.",
          location: 'msg6',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'right', text: '노트북 팝니다. 1년 썼어요.' },
            { id: 'msg2', sender: 'left', name: '김학생', text: '저요! 저 사고 싶습니다.' },
            { id: 'msg3', sender: 'right', text: '직거래 선호합니다. 서울입니다.' },
            { id: 'msg4', sender: 'left', name: '김학생', text: '저도 서울 살아요. 청소는 되어 있나요?' },
            { id: 'msg5', sender: 'right', text: '네 포맷하고 닦아놨습니다.' },
            { id: 'msg6', sender: 'left', name: '김학생', text: '깨끗히 쓰셨으면 바로 거래하고 싶어요.' },
            { id: 'msg7', sender: 'right', text: '네 정말 깨끗합니다.' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '깨끗히',
          correctText: '깨끗이',
          explanation: "'깨끗하다'의 부사형은 '깨끗이'입니다.",
          location: 'msg6',
        },
      },
    ],
  },
  {
    id: 'stage30',
    level: 30,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '다이어터', text: '나 오늘부터 진짜 다이어트한다.' },
            { id: 'msg2', sender: 'right', text: '작심삼일 예상합니다 ㅋㅋ' },
            { id: 'msg3', sender: 'left', name: '다이어터', text: '아니야 이번엔 진짜야. 저녁 굶었어.' },
            { id: 'msg4', sender: 'right', text: '오 독한데?' },
            { id: 'msg5', sender: 'left', name: '다이어터', text: '근데 체중계 올라갔는데 몸무게가 그대로야.' },
            { id: 'msg6', sender: 'right', text: '하루 굶는다고 빠지겠냐?' },
            { id: 'msg7', sender: 'left', name: '다이어터', text: '진짜 귀신이 고칼로리네 억울해.' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '귀신이 고칼로리',
          correctText: '귀신이 곡할 노릇',
          explanation: "신기하고 묘한 일을 이를 때 '귀신이 곡할 노릇'이라고 합니다.",
          location: 'msg7',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '이붓기', text: '나 아침에 얼굴 퉁퉁 부었어.' },
            { id: 'msg2', sender: 'right', text: '어제 라면 먹고 잤어?' },
            { id: 'msg3', sender: 'left', name: '이붓기', text: '응... 국물까지 다 먹었더니...' },
            { id: 'msg4', sender: 'right', text: '(사진)', image: 'swollen_face.jpg' },
            { id: 'msg5', sender: 'right', text: '호박즙이라도 먹어.' },
            { id: 'msg6', sender: 'left', name: '이붓기', text: '붓기가 너무 안 빠져서 큰일이다.' },
            { id: 'msg7', sender: 'right', text: '좀 걸으면 괜찮아질 거야.' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '붓기',
          correctText: '부기',
          explanation: "'부종'을 뜻하는 말은 '부기(浮氣)'입니다. '붓기'는 시옷 받침이 없습니다.",
          location: 'msg6',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '박헬스', text: '오늘 헬스장 갈 사람?' },
            { id: 'msg2', sender: 'right', text: '나! 나 요즘 운동 부족이야.' },
            { id: 'msg3', sender: 'left', name: '박헬스', text: '그래 같이 가자. 7시 어때?' },
            { id: 'msg4', sender: 'right', text: '좋아. 끝나고 프로틴 한잔?' },
            { id: 'msg5', sender: 'left', name: '박헬스', text: '콜. 오랫만에 땀 좀 흘려보자.' },
            { id: 'msg6', sender: 'right', text: '이따 봐!' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '오랫만에',
          correctText: '오랜만에',
          explanation: "'오래간만에'의 준말은 '오랜만에'입니다.",
          location: 'msg5',
        },
      },
    ],
  },
  {
    id: 'stage31',
    level: 31,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '분노조절', text: '뉴스 봤어? CCTV 영상 공개됐더라.' },
            { id: 'msg2', sender: 'right', text: '(사진)', image: 'cctv_monitor.jpg' },
            { id: 'msg3', sender: 'right', text: '어 봤어. 진짜 화나더라.' },
            { id: 'msg4', sender: 'left', name: '분노조절', text: '그니까. 이건 확실히 인권치매야.' },
            { id: 'msg5', sender: 'right', text: '법적 대응 해야 할 듯.' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '인권치매',
          correctText: '인권 침해',
          explanation: "'인권 침해'를 발음대로 잘못 쓴 표현입니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '현타', text: '나 오늘 진짜 빡쳤어.' },
            { id: 'msg2', sender: 'right', text: '왜? 무슨 일인데?' },
            { id: 'msg3', sender: 'left', name: '현타', text: '카페에서 새치기 당함.' },
            { id: 'msg4', sender: 'right', text: '에휴... 어이없네.' },
            { id: 'msg5', sender: 'left', name: '현타', text: '진짜 어의없네 세상에.' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '어의없네',
          correctText: '어이없네',
          explanation: "'어처구니없다'는 '어이없다'가 맞습니다. '어의'는 임금의 의사입니다.",
          location: 'msg5',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '직장인', text: '서류 뭉치 들고 왔어.' },
            { id: 'msg2', sender: 'left', name: '직장인', text: '이거 오늘까지 결제 받아야 하는데...' },
            { id: 'msg3', sender: 'right', text: '부장님한테?' },
            { id: 'msg4', sender: 'left', name: '직장인', text: '응. 근데 자리에 안 계셔.' },
            { id: 'msg5', sender: 'right', text: '전화 드려봐.' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '결제',
          correctText: '결재',
          explanation: "'승인을 받다'는 '결재(決裁)', '비용을 치르다'는 '결제(決濟)'입니다.",
          location: 'msg2',
        },
      },
    ],
  },
  {
    id: 'stage32',
    level: 32,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '운동부', text: '오늘 PT 진짜 힘들었어.' },
            { id: 'msg2', sender: 'right', text: '트레이너가 빡세게 잡았어?' },
            { id: 'msg3', sender: 'left', name: '운동부', text: '응 어쭈로 한 시간 버텼어.' },
            { id: 'msg4', sender: 'right', text: '대단하다 ㅋㅋ' },
            { id: 'msg5', sender: 'left', name: '운동부', text: '내일 근육통 올 듯.' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '어쭈로',
          correctText: '억지로',
          explanation: "'어거지로'의 준말은 '억지로'입니다. '어쭈로'는 잘못된 표현입니다.",
          location: 'msg3',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '친구', text: '(사진)', image: 'fancy_dress.jpg' },
            { id: 'msg2', sender: 'left', name: '친구', text: '이 드레스 어때?' },
            { id: 'msg3', sender: 'right', text: '오 예쁜데? 어디서 샀어?' },
            { id: 'msg4', sender: 'left', name: '친구', text: '해외 직구. 희안하게 사이즈가 딱 맞더라.' },
            { id: 'msg5', sender: 'right', text: '잘 어울려!' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '희안하게',
          correctText: '희한하게',
          explanation: "'稀罕(희한)'은 '드물고 신기하다'는 뜻으로 '희한하게'가 맞습니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '썸남', text: '오늘 뭐 했어?' },
            { id: 'msg2', sender: 'right', text: '그냥 집에서 쉬었어.' },
            { id: 'msg3', sender: 'left', name: '썸남', text: '할 예기가 있는데...' },
            { id: 'msg4', sender: 'right', text: '응? 뭔데?' },
            { id: 'msg5', sender: 'left', name: '썸남', text: '우리 만날까?' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '예기',
          correctText: '얘기',
          explanation: "'이야기'의 준말은 '얘기'입니다. '예기'는 다른 단어입니다.",
          location: 'msg3',
        },
      },
    ],
  },
  {
    id: 'stage33',
    level: 33,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '환절기', text: '(사진)', image: 'mask_dust.jpg' },
            { id: 'msg2', sender: 'left', name: '환절기', text: '요즘 미세먼지 때문에 마스크 필수야.' },
            { id: 'msg3', sender: 'right', text: '응 나도 귀간지 안 좋아서 힘들어.' },
            { id: 'msg4', sender: 'left', name: '환절기', text: '병원 가봐. 나 알레르기였어.' },
            { id: 'msg5', sender: 'right', text: '그래야겠다...' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '귀간지',
          correctText: '기관지',
          explanation: "'기관지(氣管支)'는 호흡기관입니다. '귀간지'는 잘못된 표현입니다.",
          location: 'msg3',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '감기', text: '으슬으슬 추워...' },
            { id: 'msg2', sender: 'right', text: '감기 기운 있어?' },
            { id: 'msg3', sender: 'left', name: '감기', text: '응 아침부터 으실으실해.' },
            { id: 'msg4', sender: 'right', text: '따뜻하게 하고 푹 쉬어.' },
            { id: 'msg5', sender: 'left', name: '감기', text: '응 약 먹고 잘게.' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '으실으실',
          correctText: '으슬으슬',
          explanation: "'추위로 몸이 떨리다'는 '으슬으슬'이 맞습니다.",
          location: 'msg3',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '꿀잠', text: '(사진)', image: 'pillow.jpg' },
            { id: 'msg2', sender: 'left', name: '꿀잠', text: '새 베게 샀어.' },
            { id: 'msg3', sender: 'right', text: '오 메모리폼?' },
            { id: 'msg4', sender: 'left', name: '꿀잠', text: '응. 목이 안 아프더라.' },
            { id: 'msg5', sender: 'right', text: '나도 하나 살까...' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '베게',
          correctText: '베개',
          explanation: "'머리를 받치고 눕는 물건'은 '베개'입니다.",
          location: 'msg2',
        },
      },
    ],
  },
  {
    id: 'stage34',
    level: 34,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '성형외과', text: '야 그 연예인 성형 전후 봤어?' },
            { id: 'msg2', sender: 'right', text: '응 완전 환골탈퇴했더라.' },
            { id: 'msg3', sender: 'left', name: '성형외과', text: '뼈부터 다 바꿨나 봐.' },
            { id: 'msg4', sender: 'right', text: '진짜 다른 사람 같아.' },
            { id: 'msg5', sender: 'left', name: '성형외과', text: '실력 좋은 병원이네.' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '환골탈퇴',
          correctText: '환골탈태',
          explanation: "'뼈와 살을 바꾸다'는 '환골탈태(換骨奪胎)'입니다. '탈퇴'가 아닙니다.",
          location: 'msg2',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '놀람', text: '왠일이야? 네가 먼저 연락하고?' },
            { id: 'msg2', sender: 'right', text: '그냥 보고 싶어서 ㅋㅋ' },
            { id: 'msg3', sender: 'left', name: '놀람', text: '오 감동이야.' },
            { id: 'msg4', sender: 'right', text: '뭐 먹을래? 내가 쏠게.' },
            { id: 'msg5', sender: 'left', name: '놀람', text: '삼겹살!' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '왠일',
          correctText: '웬일',
          explanation: "'어떤 일'이라는 뜻은 '웬일'이 맞습니다. '왠'은 '왜인지'의 준말입니다.",
          location: 'msg1',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '김치명인', text: '김장했어?' },
            { id: 'msg2', sender: 'right', text: '응. 배추 20포기 담궈서 힘들었어.' },
            { id: 'msg3', sender: 'left', name: '김치명인', text: '대단해! 손이 많이 가잖아.' },
            { id: 'msg4', sender: 'right', text: '부모님이 도와주셔서 다행이야.' },
            { id: 'msg5', sender: 'left', name: '김치명인', text: '맛있게 익겠다~' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '담궈',
          correctText: '담가',
          explanation: "'담그다'의 활용은 '담가', '담그고'입니다. '담궈'는 틀린 표현입니다.",
          location: 'msg2',
        },
      },
    ],
  },
  {
    id: 'stage35',
    level: 35,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '수험생', text: '(사진)', image: 'omr_card.jpg' },
            { id: 'msg2', sender: 'left', name: '수험생', text: '오회말카드 처음 칠해봤는데 긴장됐어.' },
            { id: 'msg3', sender: 'right', text: '밀리지 않게 조심해야 해.' },
            { id: 'msg4', sender: 'left', name: '수험생', text: '응 세 번이나 확인했어.' },
            { id: 'msg5', sender: 'right', text: '고생했어!' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '오회말카드',
          correctText: 'OMR 카드',
          explanation: "'Optical Mark Reader'의 약자 'OMR'입니다. '오회말'은 잘못된 표현입니다.",
          location: 'msg2',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '썸녀', text: '내일 소개팅인데 설레임 반 걱정 반이야.' },
            { id: 'msg2', sender: 'right', text: '잘 될 거야! 자신감 가져.' },
            { id: 'msg3', sender: 'left', name: '썸녀', text: '고마워 ㅋㅋ' },
            { id: 'msg4', sender: 'right', text: '뭐 입고 갈 건데?' },
            { id: 'msg5', sender: 'left', name: '썸녀', text: '원피스 입으려고.' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '설레임',
          correctText: '설렘',
          explanation: "'설레다'의 명사형은 '설렘'입니다. '설레임'은 상품명입니다.",
          location: 'msg1',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '우울', text: '시험 망했어...' },
            { id: 'msg2', sender: 'right', text: '에이 괜찮을 거야.' },
            { id: 'msg3', sender: 'left', name: '우울', text: '아니야 이번엔 진짜 안 되.' },
            { id: 'msg4', sender: 'right', text: '결과 나올 때까지 모르는 거야.' },
            { id: 'msg5', sender: 'left', name: '우울', text: '위로 고마워...' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '안 되',
          correctText: '안 돼',
          explanation: "'안 되다'가 '안 되어'로 활용되면 '안 돼'로 줄입니다.",
          location: 'msg3',
        },
      },
    ],
  },
  {
    id: 'stage36',
    level: 36,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '행사담당', text: '이번 행사 주최가 누구야?' },
            { id: 'msg2', sender: 'right', text: '학생회에서 하는 거야.' },
            { id: 'msg3', sender: 'left', name: '행사담당', text: '아 그래? 주체도 학생회야?' },
            { id: 'msg4', sender: 'right', text: '응 전부 학생들이 직접 해.' },
            { id: 'msg5', sender: 'left', name: '행사담당', text: '대단하네.' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '주최',
          correctText: '주체',
          explanation: "'행사를 여는 것'은 '주최(主催)', '중심이 되는 것'은 '주체(主體)'입니다.",
          location: 'msg1',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '걱정', text: '요즘 왜 연락 않하고 그래?' },
            { id: 'msg2', sender: 'right', text: '미안 요즘 너무 바빴어.' },
            { id: 'msg3', sender: 'left', name: '걱정', text: '무슨 일 있는 줄 알았잖아.' },
            { id: 'msg4', sender: 'right', text: '앞으로는 자주 연락할게.' },
            { id: 'msg5', sender: 'left', name: '걱정', text: '알았어~' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '않하고',
          correctText: '안 하고',
          explanation: "'않'은 '않다'처럼 동사로 쓰입니다. '안 하다'가 맞는 표현입니다.",
          location: 'msg1',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '분노', text: '진짜 화나. 어따 대고 반말이야.' },
            { id: 'msg2', sender: 'right', text: '누가 그랬어?' },
            { id: 'msg3', sender: 'left', name: '분노', text: '아까 카페 알바.' },
            { id: 'msg4', sender: 'right', text: '진상한테 당한 거 아냐?' },
            { id: 'msg5', sender: 'left', name: '분노', text: '아 그냥 참았어.' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '어따 대고',
          correctText: '얻다 대고',
          explanation: "'누구한테 대고'라는 뜻의 관용어는 '얻다 대고'입니다.",
          location: 'msg1',
        },
      },
    ],
  },
  {
    id: 'stage37',
    level: 37,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '농담', text: '(사진)', image: 'empty_barn.jpg' },
            { id: 'msg2', sender: 'left', name: '농담', text: '소 잃고 뇌 약간 고친다더니 진짜네 ㅋㅋ' },
            { id: 'msg3', sender: 'right', text: 'ㅋㅋㅋ 뭔 소리야' },
            { id: 'msg4', sender: 'left', name: '농담', text: '그냥 속담 밈이야.' },
            { id: 'msg5', sender: 'right', text: '아 ㅋㅋㅋ' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '뇌 약간',
          correctText: '외양간',
          explanation: "'소를 가두어 기르는 곳'은 '외양간'입니다. '뇌 약간'은 밈 표현입니다.",
          location: 'msg2',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '탄식', text: '(사진)', image: 'empty_bowl.jpg' },
            { id: 'msg2', sender: 'left', name: '탄식', text: '다이어트 힘들어...' },
            { id: 'msg3', sender: 'right', text: '작심삼일?' },
            { id: 'msg4', sender: 'left', name: '탄식', text: '노력이 숲으로 돌아갔어.' },
            { id: 'msg5', sender: 'right', text: '다시 시작하면 되지!' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '숲으로',
          correctText: '수포로',
          explanation: "'물거품'이란 뜻의 '수포(水泡)'입니다. '숲'이 아닙니다.",
          location: 'msg4',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '약속', text: '다음에 꼭 밥 살께!' },
            { id: 'msg2', sender: 'right', text: '진짜? 기대할게 ㅋㅋ' },
            { id: 'msg3', sender: 'left', name: '약속', text: '응 진짜야.' },
            { id: 'msg4', sender: 'right', text: '비싼 거 먹자.' },
            { id: 'msg5', sender: 'left', name: '약속', text: 'ㅋㅋ 알았어.' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '살께',
          correctText: '살게',
          explanation: "'ㄹ 것이다'의 구어체는 'ㄹ게'입니다. '께'가 아닙니다.",
          location: 'msg1',
        },
      },
    ],
  },
  {
    id: 'stage38',
    level: 38,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '성장', text: '(사진)', image: 'happy_dance.jpg' },
            { id: 'msg2', sender: 'left', name: '성장', text: '드디어 승진했어!' },
            { id: 'msg3', sender: 'right', text: '와 축하해! 진짜 일치얼짱이다.' },
            { id: 'msg4', sender: 'left', name: '성장', text: '고마워 ㅠㅠ' },
            { id: 'msg5', sender: 'right', text: '한턱 쏴야지?' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '일치얼짱',
          correctText: '일취월장',
          explanation: "'날로 달로 발전함'은 '일취월장(日就月將)'입니다.",
          location: 'msg3',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '시험', text: '(사진)', image: 'test_100.jpg' },
            { id: 'msg2', sender: 'left', name: '시험', text: '100점 맞았어!' },
            { id: 'msg3', sender: 'right', text: '대박! 금새 실력이 늘었네.' },
            { id: 'msg4', sender: 'left', name: '시험', text: '열심히 했거든 ㅋㅋ' },
            { id: 'msg5', sender: 'right', text: '축하해!' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '금새',
          correctText: '금세',
          explanation: "'금시에'의 준말은 '금세'입니다. '금새'는 '물건의 값'입니다.",
          location: 'msg3',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '기다림', text: '휴가 몇일 남았어?' },
            { id: 'msg2', sender: 'right', text: '3일!' },
            { id: 'msg3', sender: 'left', name: '기다림', text: '곧이네. 뭐 할 거야?' },
            { id: 'msg4', sender: 'right', text: '여행 갈 거야.' },
            { id: 'msg5', sender: 'left', name: '기다림', text: '부럽다~' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '몇일',
          correctText: '며칠',
          explanation: "'몇 날'의 뜻으로 쓸 때는 '며칠'이 맞습니다.",
          location: 'msg1',
        },
      },
    ],
  },
  {
    id: 'stage39',
    level: 39,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '법률', text: '그거 명예회손으로 고소할 수 있어?' },
            { id: 'msg2', sender: 'right', text: '증거가 있으면 가능하지.' },
            { id: 'msg3', sender: 'left', name: '법률', text: '캡처해뒀어.' },
            { id: 'msg4', sender: 'right', text: '변호사 상담 받아봐.' },
            { id: 'msg5', sender: 'left', name: '법률', text: '그래야겠다.' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '명예회손',
          correctText: '명예훼손',
          explanation: "'명예를 손상시킴'은 '명예훼손(名譽毁損)'입니다.",
          location: 'msg1',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '집밥', text: '(사진)', image: 'stew.jpg' },
            { id: 'msg2', sender: 'left', name: '집밥', text: '김치찌게 끓였어.' },
            { id: 'msg3', sender: 'right', text: '오 맛있겠다!' },
            { id: 'msg4', sender: 'left', name: '집밥', text: '엄마 레시피로 했어.' },
            { id: 'msg5', sender: 'right', text: '나도 먹고 싶어 ㅠㅠ' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '찌게',
          correctText: '찌개',
          explanation: "'국물 있는 반찬'은 '찌개'입니다. '찌게'는 틀린 표현입니다.",
          location: 'msg2',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '번아웃', text: '요즘 육제적으로 너무 힘들어.' },
            { id: 'msg2', sender: 'right', text: '많이 지쳤구나...' },
            { id: 'msg3', sender: 'left', name: '번아웃', text: '응 쉬고 싶어.' },
            { id: 'msg4', sender: 'right', text: '연차 내고 푹 쉬어.' },
            { id: 'msg5', sender: 'left', name: '번아웃', text: '그래야겠다.' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '육제적',
          correctText: '육체적',
          explanation: "'몸'을 뜻하는 말은 '육체(肉體)'입니다. '육제'가 아닙니다.",
          location: 'msg1',
        },
      },
    ],
  },
  {
    id: 'stage40',
    level: 40,
    mode: 'chat',
    timeLimit: 60,
    variants: [
      {
        id: 'v1',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '쇼핑', text: '(사진)', image: 'expensive_bag.jpg' },
            { id: 'msg2', sender: 'left', name: '쇼핑', text: '이거 구지 명품 사야 해?' },
            { id: 'msg3', sender: 'right', text: '가성비 좋은 거 많은데.' },
            { id: 'msg4', sender: 'left', name: '쇼핑', text: '그치? 나도 그렇게 생각해.' },
            { id: 'msg5', sender: 'right', text: '다른 거 찾아보자.' },
          ],
        } as ChatContent,
        error: {
          id: 'e1',
          wrongText: '구지',
          correctText: '굳이',
          explanation: "'꼭', '일부러'라는 뜻은 '굳이'입니다. '구지'는 틀린 표현입니다.",
          location: 'msg2',
        },
      },
      {
        id: 'v2',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '집안일', text: '오늘 대청소했어.' },
            { id: 'msg2', sender: 'right', text: '오 대단해!' },
            { id: 'msg3', sender: 'left', name: '집안일', text: '설겆이까지 하니까 3시간 걸렸어.' },
            { id: 'msg4', sender: 'right', text: '고생했다.' },
            { id: 'msg5', sender: 'left', name: '집안일', text: '이제 좀 쉬어야지.' },
          ],
        } as ChatContent,
        error: {
          id: 'e2',
          wrongText: '설겆이',
          correctText: '설거지',
          explanation: "'그릇을 씻는 일'은 '설거지'입니다. '설겆이'는 틀린 표현입니다.",
          location: 'msg3',
        },
      },
      {
        id: 'v3',
        content: {
          messages: [
            { id: 'msg1', sender: 'left', name: '인테리어', text: '(사진)', image: 'living_room.jpg' },
            { id: 'msg2', sender: 'left', name: '인테리어', text: '거실 넓직하다.' },
            { id: 'msg3', sender: 'right', text: '새 집이야?' },
            { id: 'msg4', sender: 'left', name: '인테리어', text: '응 이번에 이사했어.' },
            { id: 'msg5', sender: 'right', text: '집들이 해야지!' },
          ],
        } as ChatContent,
        error: {
          id: 'e3',
          wrongText: '넓직하다',
          correctText: '널찍하다',
          explanation: "'넓은'의 뜻을 강조할 때는 '널찍하다'가 맞습니다.",
          location: 'msg2',
        },
      },
    ],
  },
];
