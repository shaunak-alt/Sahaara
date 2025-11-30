export const translations = {
  en: {
    global: {
      brandTagline: "Your safe space, your support.",
      nav: {
        back: "Go back",
        chat: "Talk to Sahaara",
        legal: "Legal Information",
        locker: "Evidence Locker",
        help: "Help Directory"
      },
      language: {
        label: "Language",
        en: "English",
        hi: "हिन्दी",
        mr: "मराठी"
      },
      quickExit: {
        buttonLabel: "Quick Exit",
        ariaLabel: "Quick exit to a safe site"
      }
    },
    home: {
      eyebrow: "You are safe here!",
      headline: "We’re here to support you, one calm step at a time.",
      tagline: "Your story matters. We hold space for you with compassion and care.",
      heroPrimaryCta: "Talk to Sahaara",
      heroSecondaryCta: "See legal information",
      cards: {
        chat: {
          title: "Talk To Sahaara",
          copy: "Share what is on your mind. Dr. Rebecca listens with warmth, keeps things confidential, and offers gentle next steps.",
          cta: "Enter the chat"
        },
        legal: {
          title: "Legal Information",
          copy: "Understand protection orders, DIR, FIR steps, and helplines with plain-language explainers you can revisit anytime.",
          cta: "Explore resources"
        },
        locker: {
          title: "Encrypted Evidence Locker",
          copy: "Privately record what happened in an encrypted locker that never leaves this device. Only you control the password.",
          cta: "Open the locker"
        }
      },
      support: {
        title: "Trusted help when you need it",
        intro: "Verified contacts ready to ground you and plan next steps with care.",
        sosCta: "Emergency SOS",
        sosAria: "Open emergency SOS actions",
        viewAll: "See full help directory"
      },
      sos: {
        title: "Emergency SOS",
        close: "Close emergency options",
        warning: "You are about to initiate an emergency sequence.",
        noticeLabel: "Safety warning:",
        noticeBody: "This may share your location. False reports to authorities may have legal consequences. Proceed only if you truly need help.",
        callCta: "Call Police (112)",
        whatsAppCta: "WhatsApp location to trusted contact",
        cancel: "Cancel",
        whatsappTemplate: "I need help. I am sending this from Sahaara. My location is: [Location Link]",
        locationUnavailable: "Location unavailable — please share it manually."
      }
    },
    help: {
      title: "Help Directory",
      intro: "Verified partners who offer direct support. Reach out in the way that feels safest.",
      sections: {
        ngos: "Support Organisations",
        volunteers: "Community Volunteers",
        lawyers: "Pro Bono Legal Allies"
      }
    },
    chat: {
      intro: "Welcome. You deserve gentleness. Share only what feels safe, and we can take slow breaths together."
    },
    supportChatPage: {
      eyebrow: "Emotional support only",
      title: "Supportive Chat Space",
      description:
        "This chat validates your feelings and offers grounding suggestions. It never provides legal advice, diagnoses, or risk predictions."
    },
    supportChat: {
      eyebrow: "Therapist companion",
      title: "Talk To Sahaara",
      hideTranscript: "Hide transcript",
      showTranscript: "Show messages",
      composerLabel: "Share what you feel (names and details are gently removed)",
      composerPlaceholder: "Type or use the microphone to share what feels safe.",
      send: "Send with care",
      sendPending: "Guide is replying",
      clear: "Clear conversation",
      redactionsSummary: "Hidden personal details",
      redactionsCount: "Hidden personal details ({count})",
      softPlaceholder: "[soft breath]",
      followUp: "Would you like to keep sharing?",
      noLegalAdvice:
        "I can’t provide legal advice, diagnoses, or risk predictions, but I can stay with your feelings.",
      errorGeneric: "Something went wrong. Please pause and retry when you’re ready.",
      errorUnavailable: "The guide is unavailable right now. Please try again in a moment.",
      footerLegalPrefix: "The guide offers emotional support only. For legal steps, visit the",
      footerLegalLink: "Legal Information",
      footerLegalSuffix: "section curated with advocates.",
      footerQuickExit: "Need to leave quickly? Use the Quick Exit button or press Escape twice.",
      aria: {
        chatCard: "Talk to Sahaara chat",
        composer: "Message composer",
        textarea: "Type a message to the support guide",
        guideSays: "Support guide says",
        userSays: "You said"
      },
      voice: {
        start: "Speak instead of typing",
        stop: "Stop listening",
        play: "Listen to this response",
        stopPlay: "Stop audio",
        unsupported: "Voice features are unavailable in this browser."
      },
      handoff: {
        legal: {
          prefix: "It sounds like you may need legal steps.",
          link: "Open the Legal Information helper",
          linkKeyword: "Legal Information",
          suffix: "for advocates’ guidance and document-ready answers."
        }
      }
    },
    supportTips: {
      title: "Stay steady while you share",
      subtitle: "These gentle prompts are optional helpers while you reflect.",
      cards: {
        breath: {
          title: "4-2-6 Breathing",
          detail: "Inhale for 4, hold for 2, exhale for 6. Repeat three times to steady your heartbeat."
        },
        senses: {
          title: "Soft Check-In",
          detail: "Notice 3 things you can see, 2 you can touch, and 1 you can hear right now."
        },
        contact: {
          title: "Trusted Contact Reminder",
          detail: "Add a code word with someone you trust so you can ask for help safely."
        }
      },
      footerPrefix: "Looking for factual steps? Visit the",
      footerLink: "Legal Information",
      footerSuffix: "section reviewed by advocates."
    },
    legalBot: {
      intro: "Ask gentle questions about your rights or legal processes in plain language.",
      disclaimer: "This is general information — not legal advice.",
      fallback:
        "I'm sorry — I don't have definitive text for this exact procedural step in our sources. Please contact a local legal aid or NGO for verified next steps.\n\nThis is general information — not legal advice.",
      trigger: "Know Your Rights",
      ariaOpen: "Open know your rights helper",
      ariaClose: "Close legal helper",
      headerTitle: "Know Your Rights",
      headerSubtitle: "General information only · Not legal advice",
      placeholder: "E.g. How do I get a protection order?",
      ask: "Ask",
      waiting: "Please wait",
      footerLink: "Explore detailed legal information",
      voice: {
        start: "Speak your question",
        stop: "Stop listening",
        play: "Listen to this answer",
        stopPlay: "Stop audio",
        unsupported: "Voice features are unavailable in this browser."
      },
      handoff: {
        emotional: {
          prefix: "If you’re looking for emotional support,",
          link: "Open the Talk to Sahaara chat",
          suffix: "to share feelings with the therapist companion."
        }
      }
    },
    lockerPage: {
      eyebrow: "Private to this device",
      title: "Encrypted Evidence Locker",
      description:
        "Store notes or reflections related to your experience. Everything is encrypted with a password only you know and never leaves this device. Remember your password—we cannot reset it.",
      bullets: {
        first: "Use a device you trust and log out when finished.",
        second: "Avoid entering names, addresses, or details that could identify you if someone sees your screen.",
        third: "Download or delete items anytime if you are worried about someone finding them."
      }
    },
    locker: {
      noteTitlePrefix: "Note",
      supportHint: "Images, video, audio, PDFs, and office docs stay encrypted on this device.",
      locked: {
        title: "Encrypted Evidence Locker",
        copy: "Your notes stay on this device and are encrypted with a password only you know. We cannot recover items if the password is lost.",
        passwordExisting: "Enter your vault password",
        passwordNew: "Create a vault password",
        decrypting: "Decrypting…",
        unlockButton: "Unlock vault",
        createUnlockButton: "Create & unlock"
      },
      feedback: {
        unlockFailed: "Could not unlock vault. Double-check your password.",
        setupFailed: "We could not set up the vault. Please try again.",
        unlockRequiredNote: "Unlock the vault before saving notes.",
        unlockRequiredFile: "Unlock the vault before uploading files.",
        noteSaved: "Saved securely on this device.",
        noteError: "Could not save that note. Please try again.",
        fileSaved: "Encrypted copy stored on this device.",
        fileError: "Could not encrypt that file. Please try again.",
        deleteSuccess: "Item removed from this device.",
        deleteError: "Could not delete that item. Please try again.",
        exportReady: "ZIP downloaded. Keep it somewhere safe.",
        exportError: "Could not bundle items for download. Please try again."
      },
      unlocked: {
        heading: "My Evidence",
        lockAction: "Lock vault",
        notePlaceholder: "Write a secure note (date, time, what happened, anything you want to remember)…",
        saveButton: "Save encrypted",
        uploadTitle: "Upload evidence files (stored only on this device).",
        chooseFiles: "Choose file(s)",
        emptyState: "Vault is empty. Add your first encrypted note above.",
        downloadNote: "Download note",
        downloadFile: "Download file",
        downloadAll: "Download everything (.zip)",
        downloadAllBusy: "Preparing…",
        deleteNote: "Delete note",
        deleteFile: "Delete file"
      }
    }
  },
  hi: {
    global: {
      brandTagline: "आपकी सुरक्षित जगह, आपका सहारा।",
      nav: {
        back: "पिछले पृष्ठ पर जाएँ",
        chat: "सहारा से बात करें",
        legal: "कानूनी जानकारी",
        locker: "एन्क्रिप्टेड लॉकर",
        help: "सहायता निर्देशिका"
      },
      language: {
        label: "भाषा",
        en: "English",
        hi: "हिन्दी",
        mr: "मराठी"
      },
      quickExit: {
        buttonLabel: "त्वरित निकास",
        ariaLabel: "सुरक्षित साइट पर तुरंत जाएँ"
      }
    },
    home: {
      eyebrow: "आप यहाँ सुरक्षित हैं",
      headline: "हम सुनने, सहारा देने और आपके कदम से कदम मिलाने के लिए साथ हैं।",
      tagline: "हम आपकी कहानी को सम्मान देते हैं और देखभाल से जुड़े सुझावों के साथ चलते हैं।",
      heroPrimaryCta: "सहारा से बात करें",
      heroSecondaryCta: "कानूनी जानकारी देखें",
      cards: {
        chat: {
          title: "सहारा से बात करें",
          copy: "जो महसूस हो रहा है उसे साझा करें। डॉ. रेबेका गर्मजोशी से सुनती हैं, गोपनीयता रखती हैं और कोमल अगले कदम सुझाती हैं।",
          cta: "चैट शुरू करें"
        },
        legal: {
          title: "कानूनी जानकारी",
          copy: "संरक्षण आदेश, डीआईआर, एफआईआर प्रक्रिया और हेल्पलाइन को सरल भाषा में समझें जिन्हें आप कभी भी पढ़ सकते हैं।",
          cta: "संसाधन देखें"
        },
        locker: {
          title: "एन्क्रिप्टेड साक्ष्य लॉकर",
          copy: "जो हुआ उसे निजी रूप से दर्ज करें। यह एन्क्रिप्टेड लॉकर आपके उपकरण से बाहर नहीं जाता और पासवर्ड सिर्फ आपके पास रहता है।",
          cta: "लॉकर खोलें"
        }
      },
      support: {
        title: "जब भी ज़रूरत हो, भरोसेमंद मदद",
        intro: "पुष्ट संपर्क जो आपको स्थिर करते हुए अगले सुरक्षित कदमों की योजना बनाने में साथ देंगे।",
        sosCta: "आपातकालीन SOS",
        sosAria: "आपातकालीन SOS विकल्प खोलें",
        viewAll: "पूरी सहायता निर्देशिका देखें"
      },
      sos: {
        title: "आपातकालीन SOS",
        close: "आपातकालीन विकल्प बंद करें",
        warning: "आप एक आपातकालीन प्रक्रिया शुरू करने जा रहे हैं।",
        noticeLabel: "सुरक्षा चेतावनी:",
        noticeBody: "इससे आपका स्थान साझा हो सकता है। अधिकारियों को गलत सूचना देने से कानूनी दिक्कतें हो सकती हैं। केवल तभी आगे बढ़ें जब सच में मदद चाहिए।",
        callCta: "पुलिस को कॉल करें (112)",
        whatsAppCta: "भरोसेमंद को व्हाट्सएप पर स्थान भेजें",
        cancel: "रद्द करें",
        whatsappTemplate: "मुझे मदद चाहिए। मैं यह संदेश सहारा से भेज रही/रहा हूँ। मेरा स्थान यह है: [Location Link]",
        locationUnavailable: "स्थान उपलब्ध नहीं — कृपया इसे मैन्युअल रूप से साझा करें।"
      }
    },
    help: {
      title: "सहायता निर्देशिका",
      intro: "विश्वसनीय साथी जो सीधे समर्थन देते हैं। जिस तरीके से सुरक्षित लगे, उसी तरह संपर्क करें।",
      sections: {
        ngos: "सहायता संस्थान",
        volunteers: "सामुदायिक स्वयंसेवी",
        lawyers: "नि:शुल्क कानूनी सहयोगी"
      }
    },
    chat: {
      intro: "आप सुरक्षित हैं। जितना सहज लगे उतना ही साझा करें, और हम साथ में धीरे-धीरे सांस पर लौट सकते हैं।"
    },
    supportChatPage: {
      eyebrow: "केवल भावनात्मक समर्थन",
      title: "सहायक चैट स्पेस",
      description:
        "यह चैट आपकी भावनाओं को मान्यता देती है और स्थिर रहने के सुझाव देती है। यह कानूनी सलाह, निदान या जोखिम अनुमान नहीं देती।"
    },
    supportChat: {
      eyebrow: "थेरेपी साथी",
      title: "सहारा से बात करें",
      hideTranscript: "वार्तालाप छुपाएँ",
      showTranscript: "संदेश दिखाएँ",
      composerLabel: "जो महसूस हो रहा है साझा करें (नाम और संवेदनशील जानकारी सुरक्षित रूप से हटाई जाती है)",
      composerPlaceholder: "जो सुरक्षित लगे उसे टाइप करें या माइक्रोफ़ोन से बोलें।",
      send: "देखभाल के साथ भेजें",
      sendPending: "सहारा जवाब दे रहा/रही है",
      clear: "वार्तालाप साफ़ करें",
      redactionsSummary: "छिपाई गई व्यक्तिगत जानकारी",
      redactionsCount: "छिपाई गई व्यक्तिगत जानकारी ({count})",
      softPlaceholder: "[धीमी साँस]",
      followUp: "क्या आप कुछ और साझा करना चाहेंगे?",
      noLegalAdvice: "मैं कानूनी सलाह, निदान या जोखिम अनुमान नहीं दे सकती/सकता, लेकिन आपकी भावनाओं के साथ रह सकती/सकता हूँ।",
      errorGeneric: "कुछ गड़बड़ हो गई। जब आप तैयार हों तभी दोबारा प्रयास करें।",
      errorUnavailable: "सहायक अभी उपलब्ध नहीं है। कृपया थोड़ी देर बाद फिर प्रयास करें।",
      footerLegalPrefix: "सहारा केवल भावनात्मक समर्थन देता है। कानूनी कदमों के लिए",
      footerLegalLink: "कानूनी जानकारी",
      footerLegalSuffix: "सेक्शन देखें जिसे वकीलों ने तैयार किया है।",
      footerQuickExit: "जल्दी जाना हो तो क्विक एग्ज़िट बटन का उपयोग करें या दो बार Escape दबाएँ।",
      aria: {
        chatCard: "सहारा चैट",
        composer: "संदेश लिखने का भाग",
        textarea: "सहायक को संदेश टाइप करें",
        guideSays: "सहायक कहता है",
        userSays: "आपने कहा"
      },
      voice: {
        start: "टाइप करने के बजाय बोलें",
        stop: "सुनना बंद करें",
        play: "इस जवाब को सुनें",
        stopPlay: "आवाज़ रोकें",
        unsupported: "इस ब्राउज़र में वॉइस सुविधा उपलब्ध नहीं है।"
      },
      handoff: {
        legal: {
          prefix: "लगता है आपको कानूनी कदमों की ज़रूरत है।",
          link: "कानूनी जानकारी सहायक खोलें",
          linkKeyword: "कानूनी जानकारी",
          suffix: "ताकि वकीलों की तैयार मार्गदर्शिका देख सकें।"
        }
      }
    },
    supportTips: {
      title: "साझा करते हुए स्थिर रहें",
      subtitle: "ये हल्के संकेत केवल आपकी सुविधा के लिए हैं।",
      cards: {
        breath: {
          title: "4-2-6 श्वास",
          detail: "4 तक साँस अंदर, 2 तक रोकें, 6 तक बाहर छोड़ें। दिल की धड़कन शांत करने के लिए तीन बार दोहराएँ।"
        },
        senses: {
          title: "मृदु चेक-इन",
          detail: "अभी 3 चीज़ें देखें, 2 को छुएँ और 1 आवाज सुनें।"
        },
        contact: {
          title: "विश्वसनीय संपर्क याद रखें",
          detail: "किसी भरोसेमंद व्यक्ति के साथ कोड शब्द तय करें ताकि सुरक्षित तरीके से मदद मांग सकें।"
        }
      },
      footerPrefix: "तथ्यात्मक कदम चाहिए?",
      footerLink: "कानूनी जानकारी",
      footerSuffix: "सेक्शन देखें जिसे वकीलों ने परखा है।"
    },
    legalBot: {
      intro: "अपने अधिकारों या कानूनी प्रक्रिया से जुड़े प्रश्न सहज शब्दों में पूछें।",
      disclaimer: "यह सामान्य जानकारी है — कानूनी सलाह नहीं।",
      fallback:
        "क्षमा कीजिए — हमारे स्रोतों में इस प्रक्रिया के लिए सटीक पाठ उपलब्ध नहीं है। कृपया भरोसेमंद कानूनी सहायता या एनजीओ से पक्की जानकारी लें।\n\nयह सामान्य जानकारी है — कानूनी सलाह नहीं।",
      trigger: "अपने अधिकार जानें",
      ariaOpen: "अपने अधिकार सहायक खोलें",
      ariaClose: "कानूनी सहायक बंद करें",
      headerTitle: "अपने अधिकार जानें",
      headerSubtitle: "केवल सामान्य जानकारी · कानूनी सलाह नहीं",
      placeholder: "उदाहरण: संरक्षण आदेश कैसे लें?",
      ask: "पूछें",
      waiting: "कृपया प्रतीक्षा करें",
      footerLink: "विस्तृत कानूनी जानकारी देखें",
      voice: {
        start: "अपना प्रश्न बोलें",
        stop: "सुनना बंद करें",
        play: "इस उत्तर को सुनें",
        stopPlay: "आवाज़ रोकें",
        unsupported: "इस ब्राउज़र में वॉइस सुविधा उपलब्ध नहीं है।"
      },
      handoff: {
        emotional: {
          prefix: "यदि आप भावनात्मक सहारे की तलाश में हैं,",
          link: "सहारा चैट खोलें",
          suffix: "और थेरेपी साथी के साथ भावनाएँ साझा करें।"
        }
      }
    },
    lockerPage: {
      eyebrow: "यह डिवाइस के लिए निजी है",
      title: "एन्क्रिप्टेड साक्ष्य लॉकर",
      description:
        "अपने अनुभव से जुड़ी नोट्स या भावनाएँ सुरक्षित रखें। सबकुछ केवल आपके पासवर्ड से एन्क्रिप्टेड रहता है और यह डिवाइस कभी नहीं छोड़ता। अपना पासवर्ड याद रखें — हम इसे रीसेट नहीं कर सकते।",
      bullets: {
        first: "विश्वसनीय डिवाइस का उपयोग करें और काम पूरा होने पर लॉगआउट करें।",
        second: "यदि कोई स्क्रीन देख सकता है तो पहचान बताने वाले नाम, पते या विवरण दर्ज करने से बचें।",
        third: "किसी को खोजने का डर हो तो आइटम डाउनलोड या मिटा दें।"
      }
    },
    locker: {
      noteTitlePrefix: "नोट",
      supportHint: "छवियाँ, वीडियो, ऑडियो, पीडीएफ और ऑफिस दस्तावेज़ सिर्फ इसी डिवाइस पर एन्क्रिप्टेड रहते हैं।",
      locked: {
        title: "एन्क्रिप्टेड साक्ष्य लॉकर",
        copy: "आपकी नोट्स इसी डिवाइस में रहती हैं और केवल आपके पासवर्ड से एन्क्रिप्टेड होती हैं। पासवर्ड खोने पर हम सामग्री पुनर्प्राप्त नहीं कर सकते।",
        passwordExisting: "अपना लॉकर पासवर्ड दर्ज करें",
        passwordNew: "लॉकर पासवर्ड बनाएँ",
        decrypting: "डिक्रिप्ट किया जा रहा है…",
        unlockButton: "लॉकर अनलॉक करें",
        createUnlockButton: "बनाएँ और अनलॉक करें"
      },
      feedback: {
        unlockFailed: "लॉकर नहीं खुला। पासवर्ड दोबारा जाँचें।",
        setupFailed: "हम लॉकर तैयार नहीं कर पाए। कृपया फिर कोशिश करें।",
        unlockRequiredNote: "नोट सहेजने से पहले लॉकर को अनलॉक करें।",
        unlockRequiredFile: "फ़ाइल अपलोड करने से पहले लॉकर को अनलॉक करें।",
        noteSaved: "नोट सुरक्षित रूप से इस डिवाइस पर सहेजा गया।",
        noteError: "नोट सहेजा नहीं जा सका। कृपया फिर प्रयास करें।",
        fileSaved: "एन्क्रिप्टेड प्रति इस डिवाइस पर रखी गई है।",
        fileError: "फ़ाइल एन्क्रिप्ट नहीं हो सकी। कृपया फिर प्रयास करें।",
        deleteSuccess: "आइटम इस डिवाइस से हटा दिया गया।",
        deleteError: "आइटम हटाया नहीं जा सका। कृपया फिर प्रयास करें।",
        exportReady: "ZIP डाउनलोड तैयार है। इसे सुरक्षित स्थान पर रखें।",
        exportError: "डाउनलोड पैक तैयार नहीं हो सका। कृपया पुनः प्रयास करें।"
      },
      unlocked: {
        heading: "मेरा साक्ष्य",
        lockAction: "लॉकर बंद करें",
        notePlaceholder: "सुरक्षित नोट लिखें (तारीख, समय, क्या हुआ, जो भी याद रखना चाहें)…",
        saveButton: "एन्क्रिप्ट कर सहेजें",
        uploadTitle: "साक्ष्य फ़ाइलें अपलोड करें (केवल इसी डिवाइस पर सहेजी जाएँगी)।",
        chooseFiles: "फ़ाइलें चुनें",
        emptyState: "लॉकर खाली है। ऊपर अपना पहला एन्क्रिप्टेड नोट जोड़ें।",
        downloadNote: "नोट डाउनलोड करें",
        downloadFile: "फ़ाइल डाउनलोड करें",
        downloadAll: "सभी आइटम ZIP में डाउनलोड करें",
        downloadAllBusy: "तैयारी चल रही है…",
        deleteNote: "नोट हटाएँ",
        deleteFile: "फ़ाइल हटाएँ"
      }
    }
  },
  mr: {
    global: {
      brandTagline: "तुमची सुरक्षित जागा, तुमचा सहारा.",
      nav: {
        back: "मागे जा",
        chat: "सहारा सोबत बोला",
        legal: "कायदेशीर माहिती",
        locker: "एन्क्रिप्टेड लॉकर",
        help: "मदत निर्देशिका"
      },
      language: {
        label: "भाषा",
        en: "English",
        hi: "हिन्दी",
        mr: "मराठी"
      },
      quickExit: {
        buttonLabel: "त्वरित निर्गमन",
        ariaLabel: "सुरक्षित साइटवर लगेच जा"
      }
    },
    home: {
      eyebrow: "इथे तुम्ही सुरक्षित आहात",
      headline: "ऐकण्यासाठी, आधार देण्यासाठी आणि तुमच्या गतीने सोबत चालण्यासाठी आम्ही आहोत.",
      tagline: "आम्ही तुमची कहाणी जपतो आणि काळजीपूर्वक सुचवलेल्या मार्गदर्शनासह तुमच्या बरोबर राहतो.",
      heroPrimaryCta: "सहारा सोबत बोला",
      heroSecondaryCta: "कायदेशीर माहिती पहा",
      cards: {
        chat: {
          title: "सहारा सोबत बोला",
          copy: "मनातलं व्यक्त करा. डॉ. रेबेका आदराने ऐकतात, गोपनीयता राखतात आणि मृदू पुढील पावलं सुचवतात.",
          cta: "चॅट सुरू करा"
        },
        legal: {
          title: "कायदेशीर माहिती",
          copy: "संरक्षण आदेश, डीआयआर, एफआयसारख्या प्रक्रियांची सोप्या भाषेत माहिती आणि गरजेच्या हेल्पलाईनची यादी इथे मिळेल.",
          cta: "स्रोत पाहा"
        },
        locker: {
          title: "एन्क्रिप्टेड पुरावा लॉकर",
          copy: "जे घडलं ते खाजगीपणे नोंदवा. हा एन्क्रिप्टेड लॉकर तुमच्या उपकरणाबाहेर जात नाही आणि पासवर्ड फक्त तुमच्याकडे राहतो.",
          cta: "लॉकर उघडा"
        }
      },
      support: {
        title: "तुम्हाला हवी असेल तेव्हा खात्रीची मदत",
        intro: "विश्वासू संपर्क जे शांतपणे ऐकून सुरक्षित पुढची पावलं आखण्यात सोबत राहतील.",
        sosCta: "आपत्कालीन SOS",
        sosAria: "आपत्कालीन SOS पर्याय उघडा",
        viewAll: "संपूर्ण मदत निर्देशिका पहा"
      },
      sos: {
        title: "आपत्कालीन SOS",
        close: "आपत्कालीन पर्याय बंद करा",
        warning: "आपण आपत्कालीन प्रक्रिया सुरू करणार आहात.",
        noticeLabel: "सुरक्षा सूचना:",
        noticeBody: "यामुळे तुमचे स्थान शेअर होऊ शकते. अधिकाऱ्यांना खोटी माहिती दिल्यास कायदेशीर अडचणी येऊ शकतात. फक्त खऱ्या गरजेतच पुढे जा.",
        callCta: "पोलीसांना कॉल करा (112)",
        whatsAppCta: "विश्वासू व्यक्तीला WhatsApp लोकेशन पाठवा",
        cancel: "रद्द करा",
        whatsappTemplate: "मला मदत हवी आहे. हा संदेश मी सहारा मधून पाठवत आहे. माझे ठिकाण: [Location Link]",
        locationUnavailable: "स्थान मिळू शकले नाही — कृपया ते स्वतः शेअर करा."
      }
    },
    help: {
      title: "मदत निर्देशिका",
      intro: "विश्वासू भागीदार जे थेट मदत करतात. ज्या पद्धतीने सुरक्षित वाटेल तसा संपर्क साधा.",
      sections: {
        ngos: "मदत संस्था",
        volunteers: "समुदाय स्वयंसेवक",
        lawyers: "प्रो बोनो कायदेशीर सहकारी"
      }
    },
    chat: {
      intro: "तुम्ही सुरक्षित आहात. जेवढं सोयीचं वाटेल तेवढंच शेअर करा, आपण मिळून शांतपणे श्वासावर लक्ष ठेवू."
    },
    supportChatPage: {
      eyebrow: "फक्त भावनिक आधार",
      title: "सहायक चॅट स्पेस",
      description:
        "ही चॅट तुमच्या भावना मान्य करते आणि स्थिर राहण्यासाठी सूचना देते. ही कायदेशीर सल्ला, निदान किंवा जोखमीचे अंदाज देत नाही."
    },
    supportChat: {
      eyebrow: "थेरपी सहचर",
      title: "सहारासोबत बोला",
      hideTranscript: "संवाद लपवा",
      showTranscript: "संदेश दाखवा",
      composerLabel: "जे वाटतंय ते शेअर करा (नावे आणि संवेदनशील तपशील हळुवारपणे काढले जातात)",
      composerPlaceholder: "जसं सुरक्षित वाटेल तसं लिहा किंवा मायक्रोफोन वापरा.",
      send: "काळजीपूर्वक पाठवा",
      sendPending: "सहरा उत्तर देत आहे",
      clear: "संवाद साफ करा",
      redactionsSummary: "लपवलेले वैयक्तिक तपशील",
      redactionsCount: "लपवलेले वैयक्तिक तपशील ({count})",
      softPlaceholder: "[मंद श्वास]",
      followUp: "तुम्हाला आणखी काही शेअर करायचं आहे का?",
      noLegalAdvice: "मी कायदेशीर सल्ला, निदान किंवा जोखमीचा अंदाज देऊ शकत नाही, पण तुमच्या भावनांसोबत राहू शकते/शकतो.",
      errorGeneric: "काहीतरी चुकलं. आपण तयार झाल्यावर पुन्हा प्रयत्न करा.",
      errorUnavailable: "सहायक सध्या उपलब्ध नाही. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा.",
      footerLegalPrefix: "सहरा फक्त भावनिक आधार देतो. कायदेशीर पावलं उचलण्यासाठी",
      footerLegalLink: "कायदेशीर माहिती",
      footerLegalSuffix: "विभाग पहा जो वकिलांनी तयार केला आहे.",
      footerQuickExit: "लवकर निघायचं असल्यास क्विक एग्झिट बटण वापरा किंवा Escape दोनदा दाबा.",
      aria: {
        chatCard: "सहारा चॅट",
        composer: "संदेश लिहिण्याचा भाग",
        textarea: "सहायकाला संदेश लिहा",
        guideSays: "सहायक म्हणतो",
        userSays: "तुम्ही म्हणालात"
      },
      voice: {
        start: "टाइप करण्याऐवजी बोला",
        stop: "ऐकणे थांबवा",
        play: "हा प्रतिसाद ऐका",
        stopPlay: "आवाज थांबवा",
        unsupported: "या ब्राउझरमध्ये आवाज सुविधा उपलब्ध नाही."
      },
      handoff: {
        legal: {
          prefix: "असं वाटतंय तुम्हाला कायदेशीर पाऊलांची गरज आहे.",
          link: "कायदेशीर माहिती सहायक उघडा",
          linkKeyword: "कायदेशीर माहिती",
          suffix: "ज्यामुळे वकिलांच्या मार्गदर्शिका पाहू शकता."
        }
      }
    },
    supportTips: {
      title: "शेअर करताना स्थिर राहा",
      subtitle: "हे हलके संकेत तुमच्या सोयीसाठी ऐच्छिक आहेत.",
      cards: {
        breath: {
          title: "4-2-6 श्वास",
          detail: "4 मोजून श्वास आत, 2 मोजून थांबा, 6 मोजून बाहेर सोडा. हृदयाचे ठोके शांत करण्यासाठी तीनदा करा."
        },
        senses: {
          title: "मृदू चेक-इन",
          detail: "आत्ता 3 गोष्टी पाहा, 2 स्पर्श करा आणि 1 आवाज ऐका."
        },
        contact: {
          title: "विश्वासू संपर्क आठवण",
          detail: "कोणासोबत तरी कोड शब्द ठेवा जेणेकरून मदत सुरक्षितपणे मागता येईल."
        }
      },
      footerPrefix: "तथ्यात्मक पावलं हवीत?",
      footerLink: "कायदेशीर माहिती",
      footerSuffix: "विभाग पाहा जो वकिलांनी पुनरावलोकन केला आहे."
    },
    legalBot: {
      intro: "तुमच्या हक्कांविषयी किंवा कायदेशीर प्रक्रियांबद्दल साध्या भाषेत प्रश्न विचारा.",
      disclaimer: "ही सामान्य माहिती आहे — कायदेशीर सल्ला नाही.",
      fallback:
        "क्षमस्व — आमच्या स्रोतांमध्ये या प्रक्रियेबाबत ठोस मजकूर नाही. कृपया स्थानिक कायदेशीर मदत केंद्र किंवा एनजीओशी खात्रीशीर मार्गदर्शनासाठी संपर्क साधा.\n\nही सामान्य माहिती आहे — कायदेशीर सल्ला नाही.",
      trigger: "तुमचे हक्क जाणून घ्या",
      ariaOpen: "हक्क सहायक उघडा",
      ariaClose: "कायदेशीर सहायक बंद करा",
      headerTitle: "तुमचे हक्क जाणून घ्या",
      headerSubtitle: "फक्त सामान्य माहिती · कायदेशीर सल्ला नाही",
      placeholder: "उदा. संरक्षण आदेश कसा मिळवू?",
      ask: "विचारा",
      waiting: "कृपया थांबा",
      footerLink: "सविस्तर कायदेशीर माहिती पाहा",
      voice: {
        start: "तुमचा प्रश्न बोला",
        stop: "ऐकणे थांबवा",
        play: "हे उत्तर ऐका",
        stopPlay: "आवाज थांबवा",
        unsupported: "या ब्राउझरमध्ये आवाज सुविधा उपलब्ध नाही."
      },
      handoff: {
        emotional: {
          prefix: "जर तुम्हाला भावनिक आधार हवा असेल तर",
          link: "सहारा चॅट उघडा",
          suffix: "आणि थेरपी सहचरसह भावना सांगा."
        }
      }
    },
    lockerPage: {
      eyebrow: "फक्त या उपकरणासाठी",
      title: "एन्क्रिप्टेड पुरावा लॉकर",
      description:
        "तुमच्या अनुभवाशी संबंधित नोंदी किंवा मनातील विचार सुरक्षित ठेवा. सर्व काही फक्त तुमच्या पासवर्डने एन्क्रिप्टेड राहते आणि या उपकरणाबाहेर जात नाही. पासवर्ड लक्षात ठेवा — आम्ही तो रीसेट करू शकत नाही.",
      bullets: {
        first: "विश्वासू उपकरण वापरा आणि पूर्ण झाल्यावर लॉगआउट करा.",
        second: "कोणी स्क्रीन बघू शकत असल्यास ओळख सांगणारी नावे, पत्ते किंवा तपशील टाळा.",
        third: "कोणी शोधेल अशी चिंता असल्यास कधीही आयटम डाउनलोड करा किंवा हटवा."
      }
    },
    locker: {
      noteTitlePrefix: "नोट",
      supportHint: "प्रतिमा, व्हिडिओ, ऑडिओ, पीडीएफ आणि ऑफिस दस्तऐवज हे सर्व या उपकरणावरच एन्क्रिप्टेड राहतात.",
      locked: {
        title: "एन्क्रिप्टेड पुरावा लॉकर",
        copy: "तुमच्या नोट्स या उपकरणातच राहतात आणि फक्त तुमच्या पासवर्डने एन्क्रिप्टेड असतात. पासवर्ड हरवल्यास आम्ही सामग्री परत मिळवू शकत नाही.",
        passwordExisting: "तुमचा लॉकर पासवर्ड टाइप करा",
        passwordNew: "लॉकर पासवर्ड तयार करा",
        decrypting: "डिक्रिप्ट करत आहोत…",
        unlockButton: "लॉकर उघडा",
        createUnlockButton: "तयार करा आणि उघडा"
      },
      feedback: {
        unlockFailed: "लॉकर उघडता आला नाही. पासवर्ड पुन्हा तपासा.",
        setupFailed: "आम्ही लॉकर तयार करू शकलो नाही. कृपया पुन्हा प्रयत्न करा.",
        unlockRequiredNote: "नोट जतन करण्यापूर्वी लॉकर उघडा.",
        unlockRequiredFile: "फाइल अपलोड करण्यापूर्वी लॉकर उघडा.",
        noteSaved: "नोट सुरक्षितपणे या उपकरणावर जतन झाली.",
        noteError: "नोट जतन करता आली नाही. कृपया पुन्हा प्रयत्न करा.",
        fileSaved: "एन्क्रिप्टेड प्रत या उपकरणावर ठेवली गेली आहे.",
        fileError: "फाइल एन्क्रिप्ट करता आली नाही. कृपया पुन्हा प्रयत्न करा.",
        deleteSuccess: "आयटम या उपकरणावरून हटवला.",
        deleteError: "आयटम हटवता आला नाही. कृपया पुन्हा प्रयत्न करा.",
        exportReady: "ZIP डाउनलोड तयार आहे. कृपया सुरक्षित ठिकाणी ठेवा.",
        exportError: "डाउनलोड पॅक तयार करता आला नाही. कृपया पुन्हा प्रयत्न करा."
      },
      unlocked: {
        heading: "माझा पुरावा",
        lockAction: "लॉकर बंद करा",
        notePlaceholder: "सुरक्षित नोंद लिहा (तारीख, वेळ, काय घडलं, जे काही आठवायला हवं)…",
        saveButton: "एन्क्रिप्ट करून जतन करा",
        uploadTitle: "पुराव्याच्या फाइल्स अपलोड करा (फक्त या उपकरणावर साठवल्या जातील).",
        chooseFiles: "फाईल निवडा",
        emptyState: "लॉकर रिकामं आहे. वर तुमची पहिली एन्क्रिप्टेड नोंद जोडा.",
        downloadNote: "नोट डाउनलोड करा",
        downloadFile: "फाइल डाउनलोड करा",
        downloadAll: "सर्व काही ZIP मध्ये डाउनलोड करा",
        downloadAllBusy: "तयारी सुरू आहे…",
        deleteNote: "नोट हटवा",
        deleteFile: "फाइल हटवा"
      }
    }
  }
} as const;

export type SupportedLanguage = keyof typeof translations;

export const DEFAULT_LANGUAGE: SupportedLanguage = "en";

export function translate(locale: SupportedLanguage, key: string): string {
  const segments = key.split(".");
  const fallback = getValue(translations.en, segments);
  const localized = getValue(translations[locale], segments);
  return (localized ?? fallback ?? key) as string;
}

function getValue(source: unknown, segments: string[]): unknown {
  return segments.reduce<unknown>((acc, segment) => {
    if (!acc || typeof acc !== "object") {
      return undefined;
    }
    return (acc as Record<string, unknown>)[segment];
  }, source);
}
