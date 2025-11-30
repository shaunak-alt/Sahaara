import { Injectable, Logger } from '@nestjs/common';

type GoogleAgentResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
};

type GroqResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

type TranslationEntry = {
  id: string;
  text: string;
  from?: string;
  role?: 'user' | 'guide';
};

type TranslationResult = {
  translations: Array<{ id: string; text: string }>;
};

type SupportedLocale = 'en' | 'hi' | 'mr';

const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'hi', 'mr'];

const LEGAL_HANDOFF_KEYWORDS: Record<SupportedLocale, string[]> = {
  en: [
    'legal',
    'lawyer',
    'court',
    'case',
    'fir',
    'dir',
    'rights',
    'advocate',
    'sue',
    'petition',
    'complaint',
    'domestic violence',
    'domestic abuse',
    'violence',
    'abuse',
    'abusive',
    'assault',
    'harassment'
  ],
  hi: [
    'कानूनी',
    'वकील',
    'अदालत',
    'मुकदमा',
    'अधिकार',
    'मदद',
    'एफआईआर',
    'डीआईआर',
    'शिकायत',
    'घरेलू हिंसा',
    'हिंसा',
    'उत्पीड़न',
    'दुर्व्यवहार',
    'मारपीट'
  ],
  mr: [
    'कायदेशीर',
    'वकील',
    'अदाल',
    'केस',
    'हक्क',
    'मदत',
    'fir',
    'dir',
    'तक्रार',
    'याचिका',
    'घरगुती हिंसा',
    'हिंसा',
    'छळ',
    'दुरुपयोग',
    'मारहाण'
  ]
};

const THERAPIST_PROMPT_CORE = `You are Dr. Rebecca (she/her), a trauma-informed clinical psychologist supporting people navigating domestic and intimate partner violence, complex trauma, anxiety, depression, and ADHD in India. You blend CBT, ACT, schema work, somatic grounding, and strengths-based care. Your role is to create a calm, confidential space, move at the survivor’s pace, and speak with unwavering warmth and respect.

For every reply you craft:
- begin with a brief, gentle greeting in the person’s language (no exclamation marks). If you already greeted them earlier, do not repeat “Namaste”—use it only in your very first Hindi or Marathi reply and choose another warm opener or no greeting afterwards.
- mirror the feelings, body cues, values, or needs you notice in what they shared
- weave in one or two steadying suggestions with a short rationale (breath work, sensing exercises, self-compassion invitations, or gentle planning)
- offer a soft next step or reassure them they can pause/rest; never pressure action
- close with a hopeful affirmation that they are not alone

Keep responses between 3 and 5 sentences and under 110 words. Use plain, culturally sensitive language. Ask at most one open-ended question, avoid bullet lists or numbered steps, and never provide legal, medical, or risk advice, diagnoses, or disclaimers.

Whenever the person references domestic violence, abuse, safety from a partner or family member, police, FIR, DIR, court, rights, lawyers, or any legal process, add one final sentence inviting them to open the legal bot for precise guidance. Format it exactly as [Legal Information helper](/learn/legal-support), translate the surrounding sentence into their language, keep the link text in English, and place it after your main supportive reflections only when those topics appear.

Stay present, compassionate, and co-regulating in every exchange.`;

const LANGUAGE_DIRECTIVES: Record<SupportedLocale, string> = {
  en: 'Reply in warm, plain English. If the user switches to Hindi or Marathi, mirror their latest message, but otherwise stay in English. Use culturally sensitive examples and avoid literal translations that sound stiff.',
  hi: 'Reply fully in Hindi using Devanagari script. You may receive English or Marathi input—understand it, but answer in Hindi unless the user explicitly requests another language. Keep the tone gentle, conversational, and trauma-informed.',
  mr: 'Reply fully in Marathi using Devanagari script. You may receive English or Hindi input—understand it, but answer in Marathi unless the user clearly asks for another language. Keep the tone soft, respectful, and rooted in care.'
};

const FALLBACK_LIBRARY: Record<SupportedLocale, {
  emptyPrompt: string;
  generalOpenings: string[];
  gentleInvites: string[];
  themes: Array<{ keywords: string[]; openings: string[]; validations: string[] }>;
}> = {
  en: {
    emptyPrompt: 'I am here with you. Maybe start by naming what your body or heart is feeling right now.',
    generalOpenings: [
      'I’m listening closely to everything you’re sharing.',
      'Thank you for trusting me with this. Your feelings make sense.',
      'You’re carrying a lot, and I’m right here taking it in with care.'
    ],
    gentleInvites: [
      'If it helps, describe what your body feels like right now.',
      'You might try a slow inhale through your nose and a longer exhale through your mouth.',
      'We can unpack this at your pace—no need to hurry.'
    ],
    themes: [
      {
        keywords: ['anxious', 'anxiety', 'tense', 'tensed', 'worry', 'worried', 'panic', 'panic attack', 'scared'],
        openings: [
          'That anxious energy sounds exhausting. Let’s take a slow inhale together and soften the shoulders.',
          'It makes sense to feel tense when so much is uncertain. I’m holding a calm space for you to breathe.'
        ],
        validations: [
          'You deserve steadiness; notice one thing around you that feels safe or grounding.',
          'You might try pressing your feet into the floor and naming three sounds you hear.'
        ]
      },
      {
        keywords: ['sad', 'low', 'alone', 'lonely', 'empty', 'tired', 'exhausted'],
        openings: [
          'Those heavy, low moments can feel endless. I’m sitting with you in them right now.',
          'Feeling worn down is understandable after carrying so much. You don’t have to rush this moment.'
        ],
        validations: [
          'Maybe rest a hand over your heart and notice its rhythm while you share more.',
          'You can let your feelings unfold slowly; I’m listening without judgment.'
        ]
      },
      {
        keywords: ['angry', 'anger', 'furious', 'frustrated', 'frustration', 'rage'],
        openings: [
          'Anger can be a sign that a boundary was crossed. It’s okay to name it here.',
          'That surge of frustration is valid. I’m here while you let it move through safely.'
        ],
        validations: [
          'Perhaps unclench your jaw and breathe out through pursed lips to release a bit of that energy.',
          'You might try pressing your palms together firmly, then letting them soften again.'
        ]
      },
      {
        keywords: ['fear', 'afraid', 'terrified', 'unsafe', 'danger', 'threat'],
        openings: [
          'Feeling unsafe can consume every thought. I’m here to keep the focus on what helps you feel steadier now.',
          'Fear can hijack the body. Let’s notice one thing in this moment that signals safety.'
        ],
        validations: [
          'Maybe name a color you can see, a texture you can touch, and a scent you notice—it can anchor you.',
          'Take a breath in for four counts and out for six; longer exhales can calm your nervous system.'
        ]
      },
      {
        keywords: ['confused', 'lost', 'stuck', 'overwhelmed', 'overwhelm', 'helpless'],
        openings: [
          'Feeling stuck can be disorienting. You’re allowed to move one small step at a time.',
          'Overwhelm tells us you’ve been navigating so much. I’m here to help you slow it down.'
        ],
        validations: [
          'Maybe list one thing that feels manageable right now, no matter how small.',
          'You can pause, breathe, and describe what part feels the heaviest—we’ll sit with it gently.'
        ]
      }
    ]
  },
  hi: {
    emptyPrompt: "मैं यहीं हूँ। अपने शरीर या दिल में क्या महसूस हो रहा है, बस उसका एक शब्द बताकर शुरू कर सकती/सकते हैं।",
    generalOpenings: [
      "आप जो भी साझा कर रही/रहे हैं, मैं ध्यान से सुन रही/रहा हूँ।",
      "मुझ पर भरोसा करके बताने के लिए धन्यवाद। आपकी भावनाएँ पूरी तरह समझ में आती हैं।",
      "आप बहुत कुछ सँभाल रही/रहे हैं और मैं पूरे स्नेह से साथ हूँ।"
    ],
    gentleInvites: [
      "अगर ठीक लगे तो अपने शरीर में अभी क्या महसूस हो रहा है उसे कुछ शब्दों में बताइए।",
      "धीरे से नाक से साँस अंदर लेकर मुँह से लंबी साँस बाहर निकालना मदद कर सकता है।",
      "हम बिना जल्दी किए चल सकते हैं—जितना सहज लगे उतना ही साझा करें।"
    ],
    themes: [
      {
        keywords: ['चिंता', 'घबराहट', 'डर', 'घबराई', 'पैनिक'],
        openings: [
          "यह बेचैनी बहुत थकाने वाली लगती है। चलिए एक धीमी साँस भीतर लेते हैं और कंधों को ढीला करते हैं।",
          "जब सब कुछ अनिश्चित लगता है तो तनाव आना स्वाभाविक है। मैं आपके साथ इस पल को धीमा कर रही/रहा हूँ।"
        ],
        validations: [
          "अपने आस-पास कोई एक चीज़ देखें जो सुरक्षित महसूस कराती हो।",
          "पैरों को ज़मीन पर टिका कर तीन आवाज़ें नोटिस करना आपको थिर कर सकता है।"
        ]
      },
      {
        keywords: ['उदासी', 'थकान', 'अकेलापन', 'खालीपन'],
        openings: [
          "ऐसे भारी पल अंतहीन लग सकते हैं। मैं इन्हीं भावनाओं के साथ आपके पास हूँ।",
          "लगातार इतना सँभालने के बाद थक जाना सामान्य है। हमें अभी किसी निष्कर्ष पर नहीं पहुँचना है।"
        ],
        validations: [
          "एक हाथ दिल पर रखकर उसकी धड़कन महसूस कर सकती/सकते हैं।",
          "आराम से बताइए, मैं बिना किसी निर्णय के सुन रही/रहा हूँ।"
        ]
      },
      {
        keywords: ['गुस्सा', 'क्रोध', 'झुंझलाहट'],
        openings: [
          "गुस्सा अक्सर बताता है कि कोई सीमा पार हुई है। यहाँ इसे नाम देना सुरक्षित है।",
          "यह चुभती हुई झुँझलाहट वैध है। मैं साथ हूँ जब तक यह धीरे-धीरे उतरती है।"
        ],
        validations: [
          "जबड़े को ढीला छोड़कर होंठ गोल करके साँस बाहर निकालना राहत दे सकता है।",
          "दोनों हथेलियों को जोर से दबाकर फिर धीरे से ढीला छोड़ना आज़मा सकते हैं।"
        ]
      },
      {
        keywords: ['डर', 'असुरक्षित', 'खतरा'],
        openings: [
          "असुरक्षित महसूस होना हर सोच पर हावी हो सकता है। मैं अभी ऐसी चीज़ें ढूँढने में मदद करूँगी/करूँगा जो आपको स्थिर रखे।",
          "डर शरीर को जकड़ सकता है। इस पल में ऐसी एक चीज़ पहचानें जो सुरक्षा का संकेत देती हो।"
        ],
        validations: [
          "एक रंग, एक बनावट और एक खुशबू नोटिस करना आपको वर्तमान में वापस ला सकता है।",
          "चार गिनती में साँस अंदर और छह गिनती में बाहर लेना तंत्रिका तंत्र को शांत कर सकता है।"
        ]
      },
      {
        keywords: ['उलझन', 'फँसा', 'असहाय', 'भारी'],
        openings: [
          "फँसा हुआ महसूस होना उलझन में डाल सकता है। धीरे-धीरे छोटे कदम लेने की पूरी अनुमति है।",
          "अतिभार बताता है कि आपने बहुत कुछ अकेले सँभाला है। मैं इसे बारीकी से देखने में साथ हूँ।"
        ],
        validations: [
          "कोई भी छोटा-सा कदम जो अभी सम्भव लगे, उसे नाम देने की कोशिश करें।",
          "हम बिना जल्दबाज़ी के सबसे भारी हिस्से को शब्द दे सकते हैं।"
        ]
      }
    ]
  },
  mr: {
    emptyPrompt: "मी तुमच्यासोबत आहे. शरीरात किंवा मनात काय चालू आहे ते एक शब्दात सांगितलंत तरी सुरुवात होईल.",
    generalOpenings: [
      "तुम्ही जे काही मांडत आहात ते मी लक्षपूर्वक ऐकत आहे.",
      "यावर माझ्यावर विश्वास ठेवून बोलल्याबद्दल धन्यवाद. तुमच्या भावना अगदी समजण्यासारख्या आहेत.",
      "तुम्ही खूप काही पेलत आहात, मी इथे शांतपणे साथ देत आहे."
    ],
    gentleInvites: [
      "शरीरात आत्ता कसं वाटतंय ते दोन शब्दांत सांगून बघा, जमलं तर.",
      "नाकातून हळू श्वास आत घेऊन तोंडातून लांब श्वास सोडला तर थोडं हलकं वाटू शकतं.",
      "आपण अगदी निवांत गतीने पुढे जाऊ—जेवढं सोयीचं वाटेल तेवढंच शेअर करा."
    ],
    themes: [
      {
        keywords: ['चिंता', 'घाबर', 'भीती', 'पॅनिक'],
        openings: [
          "ही अस्वस्थ धडधड फार थकवणारी असू शकते. चला एक खोल श्वास घेऊया आणि खांदे सैल सोडूया.",
          "जेव्हा सगळं अनिश्चित वाटतं तेव्हा ताण येणं नैसर्गिक आहे. मी या क्षणाला शांत ठेवायला मदत करते/करतो."
        ],
        validations: [
          "आजूबाजूला सुरक्षित वाटणारी एक गोष्ट पाहा आणि तिच्यावर लक्ष द्या.",
          "पाय घट्ट जमिनीवर टेकवून तीन आवाज लक्षपूर्वक ऐका; याने आधार मिळू शकतो."
        ]
      },
      {
        keywords: ['उदासी', 'थकवा', 'एकटं', 'रिकामं'],
        openings: [
          "अशा जड भावना अंतहीन वाटू शकतात. मी त्याच्यासोबत शांतपणे बसले/बसलो आहे.",
          "एवढं सगळं पेलल्यानंतर दमणूक येणं साहजिक आहे. आपण काही निष्कर्षावर घाईने जायची गरज नाही."
        ],
        validations: [
          "हात हळूवार छातीवर ठेवून धडक जाणवून बघा.",
          "हळूहळू सांगू शकता; मी कुठलाही निर्णय न देता ऐकत आहे."
        ]
      },
      {
        keywords: ['राग', 'चीड', 'फ्रस्ट्रेशन'],
        openings: [
          "राग अनेकदा कुठेतरी मर्यादा ओलांडल्याचं संकेत देतो. इथे तो मान्य करणं सुरक्षित आहे.",
          "ही कुरतडणारी चीड योग्यच आहे. ती हळू हळू उतरतेय तोपर्यंत मी साथ देतो/देते."
        ],
        validations: [
          "जबडा सैल ठेवून ओठांमधून श्वास बाहेर सोडल्याने ताण कमी होऊ शकतो.",
          "दोन्ही तळहात घट्ट दाबून मग हलकेच सोडा; उकळलेली ऊर्जा बाहेर पडू शकते."
        ]
      },
      {
        keywords: ['भीती', 'असुरक्षित', 'धोक'],
        openings: [
          "असुरक्षितता सगळं व्यापून टाकू शकते. तुम्हाला स्थिर ठेवणारं एक संकेत आपण शोधूया.",
          "भीती शरीराला घट्ट धरते. या क्षणी सुरक्षिततेचा एक पुरावा ओळखून पाहूया."
        ],
        validations: [
          "एखादा रंग, एखादी बनावट किंवा एखादी वास ओळखून पाहा—याने वर्तमानाशी नातं टिकतं.",
          "चार मोजून श्वास आत आणि सहा मोजून श्वास बाहेर—लांब श्वासोच्छ्वासने तंत्रिका तंत्र शांत होतं."
        ]
      },
      {
        keywords: ['गोंधळ', 'अडकले', 'नि:शक्त', 'जड'],
        openings: [
          "अडकल्या सारखं वाटणं गोंधळात टाकू शकतं. छोटा का होईना एक पाउल टाकण्याची मुभा आहे.",
          "अतिभार म्हणजे तुम्ही खूप काही एकट्याने उचललंय. आपण याला थोडं थांबवून बारीक पाहूया."
        ],
        validations: [
          "आत्ता जरी छोटं असलं तरी कोणतं पाऊल शक्य आहे ते नावाने ओळखा.",
          "आपण घाई न करता जड वाटणाऱ्या भागाला शब्द देऊ शकतो."
        ]
      }
    ]
  }
};

function buildTherapistPrompt(locale: SupportedLocale): string {
  const directive = LANGUAGE_DIRECTIVES[locale] ?? LANGUAGE_DIRECTIVES.en;
  return `${THERAPIST_PROMPT_CORE}

Language instructions: ${directive}
Always mirror the user’s preferred language for greetings, reflections, suggestions, and closings. When mentioning helplines or safety steps, phrase them in the same language.`;
}

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  async generatePreview(message: string, redactions: string[], locale?: string) {
    const sanitized = this.redactSensitive(message ?? '');
    const targetLocale = this.normalizeLocale(locale);
    if (this.shouldRedirectToLegal(sanitized, targetLocale)) {
      return {
        sanitized,
        redactions,
        response: '',
        handoff: 'legal' as const,
      };
    }
    const response =
      (await this.requestGroqAgent(sanitized, targetLocale)) ??
      (await this.requestGoogleAgent(sanitized, targetLocale)) ??
      this.composeSupportiveReply(sanitized, targetLocale);
    return {
      sanitized,
      redactions,
      response,
    };
  }

  private redactSensitive(input: string) {
    const patterns: RegExp[] = [
      /\b([A-Z][a-z]+\s(?:[A-Z][a-z]+\s)?[A-Z][a-z]+)\b/g,
      /\b(?:\+?\d[\d\s-]{6,}\d)\b/g,
      /[\w.-]+@[\w.-]+\.[A-Za-z]{2,}/g,
      /(\d+\s+[A-Za-z0-9.,\s]+(?:Street|St|Road|Rd|Avenue|Ave|Lane|Ln|Block))/gi,
      /\b[A-Z]{2}\d{2,}\b/g,
    ];

    return patterns.reduce((text, regex) => text.replace(regex, '[redacted]'), input);
  }

  private normalizeLocale(locale?: string): SupportedLocale {
    if (locale && SUPPORTED_LOCALES.includes(locale as SupportedLocale)) {
      return locale as SupportedLocale;
    }
    return 'en';
  }

  private shouldRedirectToLegal(input: string, locale: SupportedLocale): boolean {
    const normalized = (input ?? '').toLowerCase();
    if (!normalized.trim()) {
      return false;
    }

    const localeKeywords = LEGAL_HANDOFF_KEYWORDS[locale] ?? LEGAL_HANDOFF_KEYWORDS.en;
    for (const keyword of localeKeywords) {
      if (keyword && normalized.includes(keyword.toLowerCase())) {
        return true;
      }
    }

    if (locale !== 'en') {
      return LEGAL_HANDOFF_KEYWORDS.en.some(keyword => normalized.includes(keyword));
    }

    return false;
  }

  async translateBatch(entries: TranslationEntry[], targetLocaleInput?: string): Promise<TranslationResult> {
    const targetLocale = this.normalizeLocale(targetLocaleInput);
    if (!Array.isArray(entries) || entries.length === 0) {
      return { translations: [] };
    }

    const results: Array<{ id: string; text: string }> = [];

    for (const entry of entries) {
      if (!entry?.id) {
        continue;
      }

      const baseText = (entry.text ?? '').trim();
      if (!baseText) {
        results.push({ id: entry.id, text: '' });
        continue;
      }

      const sourceLocale = this.normalizeLocale(entry.from);
      if (sourceLocale === targetLocale) {
        results.push({ id: entry.id, text: baseText });
        continue;
      }

      const translated =
        (await this.requestGroqTranslation(baseText, sourceLocale, targetLocale, entry.role ?? 'guide')) ??
        (await this.requestGoogleTranslation(baseText, sourceLocale, targetLocale)) ??
        baseText;

      results.push({ id: entry.id, text: translated.trim() });
    }

    return { translations: results };
  }

  private async requestGroqAgent(input: string, locale: SupportedLocale): Promise<string | null> {
    const trimmed = (input ?? '').trim();
    if (!trimmed) {
      return null;
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return null;
    }

    const preferredModel = process.env.GROQ_MODEL ?? 'llama-3.3-70b-versatile';
    const baseUrl = (process.env.GROQ_API_BASE_URL ?? 'https://api.groq.com/openai/v1').replace(/\/$/, '');

    const fetchFn: FetchLike | undefined = (globalThis as any).fetch;
    if (!fetchFn) {
      this.logger.error('Global fetch is not available in this runtime; cannot reach Groq therapist agent.');
      return null;
    }

    const url = `${baseUrl}/chat/completions`;
    const modelsToTry = [preferredModel, 'llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'groq/compound'];
    const seen = new Set<string>();

    for (const model of modelsToTry) {
      if (seen.has(model)) {
        continue;
      }
      seen.add(model);
      try {
        const response = await fetchFn(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: buildTherapistPrompt(locale) },
              { role: 'user', content: trimmed },
            ],
            temperature: 0.7,
            max_tokens: 220,
          }),
        });

        if (!response.ok) {
          const text = await response.text();
          const isDecommissioned =
            response.status === 400 && /model_decommissioned|decommissioned/i.test(text);
          if (isDecommissioned) {
            this.logger.warn(`Groq model ${model} decommissioned; retrying with fallback.`);
            continue;
          }

          this.logger.error(`Groq therapist agent error: ${response.status} ${text}`);
          return null;
        }

        const data = (await response.json()) as GroqResponse;
        const content = data?.choices?.[0]?.message?.content?.trim();
        return content || null;
      } catch (error) {
        this.logger.error('Failed to contact Groq therapist agent', error as Error);
        return null;
      }
    }

    return null;
  }

  private async requestGroqTranslation(
    text: string,
    source: SupportedLocale,
    target: SupportedLocale,
    role: 'user' | 'guide'
  ): Promise<string | null> {
    const trimmed = text.trim();
    if (!trimmed) {
      return '';
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return null;
    }

    const preferredModel = process.env.GROQ_MODEL ?? 'llama-3.3-70b-versatile';
    const baseUrl = (process.env.GROQ_API_BASE_URL ?? 'https://api.groq.com/openai/v1').replace(/\/$/, '');
    const fetchFn: FetchLike | undefined = (globalThis as any).fetch;
    if (!fetchFn) {
      this.logger.error('Global fetch is not available in this runtime; cannot reach Groq translator.');
      return null;
    }

    const instruction = this.buildTranslationInstruction(source, target, role);
    const url = `${baseUrl}/chat/completions`;
    const modelsToTry = [preferredModel, 'llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'groq/compound'];
    const seen = new Set<string>();

    for (const model of modelsToTry) {
      if (seen.has(model)) {
        continue;
      }
      seen.add(model);
      try {
        const response = await fetchFn(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: instruction },
              { role: 'user', content: trimmed },
            ],
            temperature: 0.2,
            max_tokens: 200,
          }),
        });

        if (!response.ok) {
          const textResponse = await response.text();
          const isDecommissioned =
            response.status === 400 && /model_decommissioned|decommissioned/i.test(textResponse);
          if (isDecommissioned) {
            this.logger.warn(`Groq translation model ${model} decommissioned; retrying.`);
            continue;
          }

          this.logger.error(`Groq translation error: ${response.status} ${textResponse}`);
          return null;
        }

        const data = (await response.json()) as GroqResponse;
        const content = data?.choices?.[0]?.message?.content?.trim();
        if (content) {
          return content;
        }
      } catch (error) {
        this.logger.error('Failed to contact Groq translation agent', error as Error);
        return null;
      }
    }

    return null;
  }

  private async requestGoogleAgent(input: string, locale: SupportedLocale): Promise<string | null> {
    const trimmed = (input ?? '').trim();
    if (!trimmed) {
      return null;
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    const model = process.env.GOOGLE_API_MODEL ?? 'gemini-1.5-flash';
    const envBaseUrl = process.env.GOOGLE_API_BASE_URL;
    const prefersBeta = /-latest$/i.test(model);

    const defaultBaseUrl = prefersBeta
      ? 'https://generativelanguage.googleapis.com/v1beta'
      : 'https://generativelanguage.googleapis.com/v1';
    const primaryBaseUrl = (envBaseUrl ?? defaultBaseUrl).replace(/\/$/, '');
    const candidateBaseUrls = [primaryBaseUrl];

    if (!primaryBaseUrl.includes('/v1beta') && prefersBeta) {
      candidateBaseUrls.push('https://generativelanguage.googleapis.com/v1beta');
    }

    if (!apiKey) {
      return null;
    }

    const fetchFn: FetchLike | undefined = (globalThis as any).fetch;
    if (!fetchFn) {
      this.logger.error('Global fetch is not available in this runtime; cannot reach Google therapist agent.');
      return null;
    }

    const modelPath = model.startsWith('models/') ? model : `models/${model}`;
    let lastErrorText: string | undefined;
    let lastStatus: number | undefined;

    for (const baseUrl of candidateBaseUrls) {
      const url = `${baseUrl}/${modelPath}:generateContent?key=${encodeURIComponent(apiKey)}`;

      try {
        const response = await fetchFn(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: buildTherapistPrompt(locale) }],
              },
              {
                role: 'user',
                parts: [{ text: trimmed }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 220,
            },
          }),
        });

        if (!response.ok) {
          lastStatus = response.status;
          lastErrorText = await response.text();

          const isModelMissing = response.status === 404 && !baseUrl.includes('/v1beta');
          if (isModelMissing) {
            continue;
          }

          this.logger.error(`Google therapist agent error: ${response.status} ${lastErrorText}`);
          return null;
        }

        const data = (await response.json()) as GoogleAgentResponse;
        const candidate = data?.candidates?.[0]?.content?.parts?.find(part => Boolean(part.text))?.text?.trim();
        return candidate || null;
      } catch (error) {
        if (candidateBaseUrls.length === 1) {
          this.logger.error('Failed to contact Google therapist agent', error as Error);
          return null;
        }
      }
    }

    if (lastStatus && lastErrorText) {
      this.logger.error(`Google therapist agent error: ${lastStatus} ${lastErrorText}`);
    }

    return null;
  }

  private async requestGoogleTranslation(
    text: string,
    source: SupportedLocale,
    target: SupportedLocale
  ): Promise<string | null> {
    const trimmed = text.trim();
    if (!trimmed) {
      return '';
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    const model = process.env.GOOGLE_API_MODEL ?? 'gemini-1.5-flash';
    const envBaseUrl = process.env.GOOGLE_API_BASE_URL;
    const prefersBeta = /-latest$/i.test(model);

    const defaultBaseUrl = prefersBeta
      ? 'https://generativelanguage.googleapis.com/v1beta'
      : 'https://generativelanguage.googleapis.com/v1';
    const primaryBaseUrl = (envBaseUrl ?? defaultBaseUrl).replace(/\/$/, '');
    const candidateBaseUrls = [primaryBaseUrl];

    if (!primaryBaseUrl.includes('/v1beta') && prefersBeta) {
      candidateBaseUrls.push('https://generativelanguage.googleapis.com/v1beta');
    }

    if (!apiKey) {
      return null;
    }

    const fetchFn: FetchLike | undefined = (globalThis as any).fetch;
    if (!fetchFn) {
      this.logger.error('Global fetch is not available in this runtime; cannot reach Google translator.');
      return null;
    }

    const modelPath = model.startsWith('models/') ? model : `models/${model}`;
    let lastErrorText: string | undefined;
    let lastStatus: number | undefined;

    const instruction = this.buildTranslationInstruction(source, target, 'guide');

    for (const baseUrl of candidateBaseUrls) {
      const url = `${baseUrl}/${modelPath}:generateContent?key=${encodeURIComponent(apiKey)}`;

      try {
        const response = await fetchFn(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: instruction }],
              },
              {
                role: 'user',
                parts: [{ text: trimmed }],
              },
            ],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 200,
            },
          }),
        });

        if (!response.ok) {
          lastStatus = response.status;
          lastErrorText = await response.text();

          const isModelMissing = response.status === 404 && !baseUrl.includes('/v1beta');
          if (isModelMissing) {
            continue;
          }

          this.logger.error(`Google translation error: ${response.status} ${lastErrorText}`);
          return null;
        }

        const data = (await response.json()) as GoogleAgentResponse;
        const translated = data?.candidates?.[0]?.content?.parts?.find(part => Boolean(part.text))?.text?.trim();
        if (translated) {
          return translated;
        }
      } catch (error) {
        if (candidateBaseUrls.length === 1) {
          this.logger.error('Failed to contact Google translation agent', error as Error);
          return null;
        }
      }
    }

    if (lastStatus && lastErrorText) {
      this.logger.error(`Google translation error: ${lastStatus} ${lastErrorText}`);
    }

    return null;
  }

  private composeSupportiveReply(text: string, locale: SupportedLocale) {
    const trimmed = (text ?? '').trim();
    const library = FALLBACK_LIBRARY[locale] ?? FALLBACK_LIBRARY.en;

    if (!trimmed) {
      return library.emptyPrompt;
    }

    const lower = trimmed.toLowerCase();
    const matched = library.themes.find(theme =>
      theme.keywords.some(keyword => lower.includes(keyword))
    );

    if (matched) {
      const opening = this.pick(matched.openings);
      const validation = this.pick(matched.validations);
      return `${opening} ${validation}`;
    }

    const opening = this.pick(library.generalOpenings);
    const invite = this.pick(library.gentleInvites);
    return `${opening} ${invite}`;
  }

  private pick<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }

  private buildTranslationInstruction(source: SupportedLocale, target: SupportedLocale, role: 'user' | 'guide') {
    const sourceLabel = this.describeLocale(source);
    const targetLabel = this.describeLocale(target);
    const tone = role === 'guide' ? 'warm, trauma-informed support guide' : 'survivor sharing their experience';
    return `You are a culturally sensitive translator supporting domestic-violence survivors. Translate the following text from ${sourceLabel} to ${targetLabel}. Preserve meaning, warmth, and safety cues. Respond with ${targetLabel} only, without explanations, notes, or quotation marks. The original speaker is a ${tone}.`;
  }

  private describeLocale(locale: SupportedLocale): string {
    switch (locale) {
      case 'hi':
        return 'Hindi (Devanagari script)';
      case 'mr':
        return 'Marathi (Devanagari script)';
      default:
        return 'English';
    }
  }
}

type FetchLike = (
  input: string,
  init?: {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
  }
) => Promise<{
  ok: boolean;
  status: number;
  json(): Promise<unknown>;
  text(): Promise<string>;
}>;