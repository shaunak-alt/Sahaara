export type LegalLocale = "en" | "hi" | "mr";

export type LegalSupportCard = {
  title: string;
  summary: string;
  bullets: string[];
};

export type LegalSupportFaq = {
  question: string;
  answer: string;
};

export type LegalSupportContent = {
  disclaimerHeading: string;
  disclaimer: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryCards: LegalSupportCard[];
  helplineTitle: string;
  helplineSummary: string;
  helplines: Array<{ label: string; number: string }>;
  faqTitle: string;
  faqs: LegalSupportFaq[];
};

const SHARED_HELPLINES = [
  { number: "1091" },
  { number: "181" },
  { number: "112" }
] as const;

const legalContentByLocale: Record<LegalLocale, LegalSupportContent> = {
  en: {
    disclaimerHeading: "Disclaimer",
    disclaimer:
      "This section shares general legal information reviewed by partner advocates. It is not legal advice.",
    heroTitle: "Know Your Rights (India)",
    heroSubtitle: "Quick overviews of key protections, processes, and helplines so you can choose what feels safe.",
    primaryCards: [
      {
        title: "Protection of Women from Domestic Violence Act, 2005 (PWDVA)",
        summary: "Recognizes physical, emotional, verbal, sexual, and economic abuse within household relationships.",
        bullets: [
          "You may approach a Protection Officer, Service Provider, or file directly in court without a fee.",
          "Reliefs can include residence orders, monetary relief, protection orders, and custody directions."
        ]
      },
      {
        title: "Domestic Incident Report (DIR)",
        summary: "Document prepared by a Protection Officer or Service Provider that captures your account in your own words.",
        bullets: [
          "Evidence is not required at the time of writing—focus on narrating events accurately.",
          "Request a safe copy if possible, or note where it is filed for future reference."
        ]
      },
      {
        title: "FIR Basics",
        summary: "An FIR initiates criminal proceedings with the police; you are entitled to a free copy with the number and station details.",
        bullets: [
          "You can file at any police station; the case will be transferred if needed.",
          "Carry trusted contacts and essential documents only when it feels safe to do so."
        ]
      },
      {
        title: "Dowry Prohibition Act, 1961",
        summary: "Makes giving or taking dowry illegal before, during, or after marriage.",
        bullets: [
          "Dowry demands can be reported with evidence like messages, call records, or witness statements.",
          "Courts can order the return of dowry to the woman in addition to imposing penalties."
        ]
      },
      {
        title: "Sexual Harassment of Women at Workplace Act, 2013",
        summary: "Applies to all workplaces, including informal settings and remote teams.",
        bullets: [
          "Organizations with 10+ employees must form an Internal Committee to receive complaints.",
          "Complaints can be filed within three months; trusted persons or NGOs may assist you."
        ]
      },
      {
        title: "Indian Penal Code Section 354",
        summary: "Protects against assault, criminal force, or acts intended to insult the modesty of a woman.",
        bullets: [
          "Includes stalking, lewd remarks, or unwanted physical advances; an FIR can be filed at any station.",
          "Survivors are entitled to privacy while recording statements and during medical exams."
        ]
      }
    ],
    helplineTitle: "National Helplines",
    helplineSummary: "Save numbers you can reach quickly or share with someone you trust.",
    helplines: [
      { label: "Women's Helpline", number: SHARED_HELPLINES[0].number },
      { label: "Domestic Abuse National", number: SHARED_HELPLINES[1].number },
      { label: "Police Emergency", number: SHARED_HELPLINES[2].number }
    ],
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        question: "What if I cannot leave home to file a DIR?",
        answer:
          "Protection Officers or Service Providers can sometimes record statements remotely depending on state rules. Some states accept email submissions—confirm with local authorities or partner NGOs."
      },
      {
        question: "Do I need evidence to request a protection order?",
        answer:
          "Detailed statements and the Domestic Incident Report can support interim relief. Judges may later request additional materials, so gather evidence only when it feels safe for you."
      },
      {
        question: "Can I withdraw a complaint if I feel unsafe continuing?",
        answer:
          "Courts may permit withdrawal, but implications vary. Speak with a legal advocate or NGO before deciding. Your safety and comfort remain the priority."
      }
    ]
  },
  hi: {
    disclaimerHeading: "अस्वीकरण",
    disclaimer:
      "यह अनुभाग साझेदार अधिवक्ताओं द्वारा समीक्षा की गई सामान्य कानूनी जानकारी देता है। यह कानूनी सलाह नहीं है।",
    heroTitle: "अपने अधिकार जानें (भारत)",
    heroSubtitle: "मुख्य संरक्षण, प्रक्रियाएँ और हेल्पलाइन का संक्षिप्त सार ताकि आप सुरक्षित महसूस होने वाले विकल्प चुन सकें।",
    primaryCards: [
      {
        title: "घरेलू हिंसा से महिलाओं का संरक्षण अधिनियम, 2005 (PWDVA)",
        summary:
          "घरेलू संबंधों में शारीरिक, भावनात्मक, मौखिक, यौन और आर्थिक दुर्व्यवहार को मान्यता देता है।",
        bullets: [
          "आप संरक्षण अधिकारी, सेवा प्रदाता या सीधे अदालत में बिना शुल्क शिकायत दर्ज कर सकती/सकते हैं।",
          "राहत में निवास आदेश, वित्तीय सहायता, संरक्षण आदेश और अभिरक्षा से जुड़े निर्देश शामिल हो सकते हैं।"
        ]
      },
      {
        title: "घरेलू घटना रिपोर्ट (DIR)",
        summary:
          "संरक्षण अधिकारी या सेवा प्रदाता द्वारा तैयार दस्तावेज़ जो आपकी बातों को आपके शब्दों में दर्ज करता है।",
        bullets: [
          "रिपोर्ट लिखते समय साक्ष्य देना आवश्यक नहीं है—घटनाओं को सटीक तरीके से बताने पर ध्यान दें।",
          "संभव हो तो एक सुरक्षित प्रति लें या इसे कहाँ जमा किया गया है उसका रिकॉर्ड रखें।"
        ]
      },
      {
        title: "एफआईआर की मूल बातें",
        summary:
          "एफआईआर पुलिस के साथ आपराधिक प्रक्रिया शुरू करती है; आपको नंबर और थाने के विवरण सहित निःशुल्क प्रति मिलने का अधिकार है।",
        bullets: [
          "आप किसी भी पुलिस स्टेशन में दर्ज करा सकते/सकती हैं; आवश्यकता होने पर मामला स्थानांतरित हो जाएगा।",
          "केवल तब ही ज़रूरी दस्तावेज़ या भरोसेमंद संपर्क साथ रखें जब आपको सुरक्षित लगे।"
        ]
      },
      {
        title: "दहेज निषेध अधिनियम, 1961",
        summary: "विवाह से पहले, दौरान या बाद में दहेज लेना या देना अवैध बनाता है।",
        bullets: [
          "दहेज की मांग को संदेश, कॉल रिकॉर्ड या गवाह के बयान जैसे साक्ष्यों के साथ पुलिस में रिपोर्ट किया जा सकता है।",
          "दंड के साथ न्यायालय महिला को दहेज वापस करने का आदेश भी दे सकते हैं।"
        ]
      },
      {
        title: "कार्यस्थल पर महिलाओं के यौन उत्पीड़न से संरक्षण अधिनियम, 2013",
        summary: "सभी कार्यस्थलों पर लागू, जिनमें अनौपचारिक सेटिंग और रिमोट टीम भी शामिल हैं।",
        bullets: [
          "10 या अधिक कर्मचारियों वाले संस्थान में शिकायत प्राप्त करने हेतु आंतरिक समिति बनाना अनिवार्य है।",
          "शिकायत घटना के तीन माह के भीतर दर्ज की जा सकती है; भरोसेमंद व्यक्ति या एनजीओ सहायता कर सकते हैं।"
        ]
      },
      {
        title: "भारतीय दंड संहिता धारा 354",
        summary:
          "महिला की गरिमा का अपमान करने हेतु किए गए हमले, बल या अनुचित हरकतों से सुरक्षा प्रदान करती है।",
        bullets: [
          "इसमें पीछा करना, अश्लील टिप्पणी या अवांछित शारीरिक स्पर्श शामिल हैं; किसी भी थाने में एफआईआर दर्ज की जा सकती है।",
          "वक्तव्य और चिकित्सकीय जाँच के दौरान गोपनीयता का अधिकार सुरक्षित रहता है।"
        ]
      }
    ],
    helplineTitle: "राष्ट्रीय हेल्पलाइन",
    helplineSummary: "ऐसे नंबर सुरक्षित रखें जिनसे आप जल्द संपर्क कर सकें या भरोसेमंद व्यक्ति से साझा कर सकें।",
    helplines: [
      { label: "महिला हेल्पलाइन", number: SHARED_HELPLINES[0].number },
      { label: "राष्ट्रीय घरेलू हिंसा सहायता", number: SHARED_HELPLINES[1].number },
      { label: "पुलिस आपातकालीन सेवा", number: SHARED_HELPLINES[2].number }
    ],
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    faqs: [
      {
        question: "अगर मैं घर से निकलकर DIR दर्ज नहीं कर पाती/पाता तो?",
        answer:
          "राज्य के नियमों के अनुसार संरक्षण अधिकारी या सेवा प्रदाता कभी-कभी दूरस्थ रूप से बयान दर्ज कर सकते हैं। कुछ राज्यों में ईमेल से भेजी गई रिपोर्ट स्वीकार होती है—स्थानीय अधिकारियों या सहयोगी एनजीओ से पुष्टि करें।"
      },
      {
        question: "क्या संरक्षण आदेश के लिए साक्ष्य अनिवार्य है?",
        answer:
          "विस्तृत बयान और घरेलू घटना रिपोर्ट अंतरिम राहत में सहायक होते हैं। न्यायाधीश बाद में अतिरिक्त सामग्री माँग सकते हैं, इसलिए केवल सुरक्षित महसूस होने पर ही साक्ष्य जुटाएँ।"
      },
      {
        question: "अगर आगे बढ़ना असुरक्षित लगे तो क्या मैं शिकायत वापस ले सकती/सकता हूँ?",
        answer:
          "न्यायालय परिस्थितियों के आधार पर शिकायत वापस लेने की अनुमति दे सकते हैं। निर्णय से पहले कानूनी सलाहकार या एनजीओ से चर्चा करें—आपकी सुरक्षा और सहजता सर्वोपरि है।"
      }
    ]
  },
  mr: {
    disclaimerHeading: "अस्वीकरण",
    disclaimer:
      "ही विभाग भागीदार वकिलांनी तपासलेली सर्वसाधारण कायदेशीर माहिती देतो. हे कायदेशीर सल्ला नाही.",
    heroTitle: "तुमचे हक्क जाणून घ्या (भारत)",
    heroSubtitle:
      "महत्वाच्या कायदेशीर संरक्षणांचे, प्रक्रियांचे आणि हेल्पलाइनचे संक्षिप्त परिचय जेणेकरून तुम्ही सुरक्षित वाटणारी पावलं निवडू शकता.",
    primaryCards: [
      {
        title: "महिलांवरील घरगुती हिंसेपासून संरक्षण अधिनियम, 2005 (PWDVA)",
        summary:
          "घरगुती नात्यांमधील शारीरिक, भावनिक, मौखिक, लैंगिक आणि आर्थिक अत्याचारांना मान्यता देतो.",
        bullets: [
          "संरक्षण अधिकारी, सेवा प्रदाता किंवा थेट न्यायालयात कोणत्याही शुल्काशिवाय अर्ज करू शकता.",
          "राहत म्हणून निवास आदेश, आर्थिक मदत, संरक्षण आदेश आणि पालकत्वाविषयीचे निर्देश मिळू शकतात."
        ]
      },
      {
        title: "घरगुती घटना अहवाल (DIR)",
        summary:
          "संरक्षण अधिकारी किंवा सेवा प्रदाता तुमची कहाणी तुमच्या शब्दांत नोंदवतात असा दस्तऐवज.",
        bullets: [
          "अहवाल लिहिताना पुराव्याची आवश्यकता नसते—घटनांची अचूक मांडणी महत्त्वाची आहे.",
          "शक्य असल्यास सुरक्षित प्रत ठेवून द्या किंवा दस्तऐवज कुठे सादर झाला याची नोंद ठेवा."
        ]
      },
      {
        title: "एफआयआरची मूलतत्त्वे",
        summary:
          "एफआयआरमुळे पोलीसांकडे फौजदारी प्रक्रिया सुरू होते; क्रमांक आणि स्टेशन तपशीलांसह मोफत प्रत घेण्याचा हक्क तुम्हाला आहे.",
        bullets: [
          "कोणत्याही पोलीस स्टेशनमध्ये नोंदवता येते; गरज पडल्यास प्रकरण हस्तांतरित केले जाते.",
          "सुरक्षित वाटल्यासच आवश्यक कागदपत्रे किंवा विश्वासू संपर्क सोबत ठेवा."
        ]
      },
      {
        title: "दहेज प्रतिबंध अधिनियम, 1961",
        summary: "विवाहापूर्वी, विवाहादरम्यान किंवा नंतर दहेज देणे-घेणे बेकायदेशीर ठरवतो.",
        bullets: [
          "दहेजाची मागणी संदेश, कॉल रेकॉर्ड किंवा साक्षीदारांच्या जबाबांसारख्या पुराव्यांसह पोलीसांकडे नोंदवू शकता.",
          "दंडासोबत न्यायालयाकडून दहेज स्त्रीला परत देण्याचे आदेश दिले जाऊ शकतात."
        ]
      },
      {
        title: "कार्यस्थळी महिलांच्या लैंगिक छळापासून संरक्षण अधिनियम, 2013",
        summary:
          "सर्व कार्यस्थळांवर लागू, त्यात अनौपचारिक आणि दूरस्थ कामकाजाचे सेटअपही समाविष्ट आहेत.",
        bullets: [
          "10 हून अधिक कर्मचारी असलेल्या संस्थेत तक्रारीसाठी अंतर्गत समिती स्थापन करणे बंधनकारक आहे.",
          "तक्रार घटनेपासून तीन महिन्यांत करता येते; विश्वासू व्यक्ती किंवा एनजीओ मदत देऊ शकतात."
        ]
      },
      {
        title: "भारतीय दंड संहिता कलम 354",
        summary:
          "महिलेच्या लज्जेचा अपमान करण्याच्या उद्देशाने केलेल्या हल्ला किंवा बलप्रयोगाविरुद्ध संरक्षण देते.",
        bullets: [
          "पाठलाग, अश्लील टिप्पणी किंवा अवांछित शारीरिक स्पर्श यात समाविष्ट; कोणत्याही थान्यात एफआयआर नोंदवता येतो.",
          "जबाब नोंदवताना आणि वैद्यकीय तपासणीदरम्यान गोपनीयतेचा अधिकार मिळतो."
        ]
      }
    ],
    helplineTitle: "राष्ट्रीय हेल्पलाइन",
    helplineSummary: "लवकर संपर्क साधता येतील किंवा विश्वासू व्यक्तींसोबत शेअर करता येतील असे क्रमांक सुरक्षित ठेवा.",
    helplines: [
      { label: "महिला हेल्पलाइन", number: SHARED_HELPLINES[0].number },
      { label: "राष्ट्रीय घरगुती हिंसा सहाय्य", number: SHARED_HELPLINES[1].number },
      { label: "पोलीस आपत्कालीन सेवा", number: SHARED_HELPLINES[2].number }
    ],
    faqTitle: "वारंवार विचारले जाणारे प्रश्न",
    faqs: [
      {
        question: "मी घराबाहेर पडू शकत नसलो/नसले तर DIR कसा नोंदवू?",
        answer:
          "राज्याच्या नियमांनुसार संरक्षण अधिकारी किंवा सेवा प्रदाता काही वेळा दूरस्थपणे निवेदने नोंदवतात. काही राज्ये ईमेलद्वारे पाठवलेल्या अहवालांनाही मान्यता देतात—स्थानिक अधिकारी किंवा भागीदार एनजीओकडून खात्री करून घ्या."
      },
      {
        question: "संरक्षण आदेशासाठी पुरावा आवश्यक असतो का?",
        answer:
          "तपशीलवार निवेदने आणि घरगुती घटना अहवाल अंतरिम दिलासा मिळवण्यात मदत करतात. न्यायाधीश नंतर अतिरिक्त सामग्री मागू शकतात, त्यामुळे सुरक्षित वाटल्यावरच पुरावे गोळा करा."
      },
      {
        question: "पुढे जाणे असुरक्षित वाटल्यास मी तक्रार मागे घेऊ शकते/शकतो का?",
        answer:
          "परिस्थितीनुसार न्यायालय तक्रार मागे घेण्याची परवानगी देऊ शकते. निर्णय घेण्याआधी कायदेशीर सल्लागार किंवा एनजीओशी बोलणे महत्त्वाचे आहे—तुमची सुरक्षितता आणि आराम सर्वात महत्त्वाचे आहेत."
      }
    ]
  }
};

export const legalContent = legalContentByLocale.en;

export const getLegalContent = (locale: LegalLocale): LegalSupportContent =>
  legalContentByLocale[locale] ?? legalContentByLocale.en;

export const legalContentLocales = legalContentByLocale;
