import { legalRagDocs, type LegalRagDoc } from "@sahaara/config";

export type SupportedLocale = "en" | "hi" | "mr";

const DISCLAIMER_BY_LOCALE: Record<SupportedLocale, string> = {
  en: "This is general information — not legal advice.",
  hi: "यह सामान्य जानकारी है — कानूनी सलाह नहीं।",
  mr: "ही सामान्य माहिती आहे — कायदेशीर सल्ला नाही."
};

export const NO_SOURCE_BY_LOCALE: Record<SupportedLocale, string> = {
  en: "I'm sorry — I don't have definitive text for this exact procedural step in our sources. Please contact a local legal aid or NGO for verified next steps.\n\nThis is general information — not legal advice.",
  hi: "क्षमा कीजिए — हमारे स्रोतों में इस प्रक्रिया के लिए सटीक पाठ उपलब्ध नहीं है। कृपया भरोसेमंद कानूनी सहायता या एनजीओ से पक्का मार्गदर्शन लें।\n\nयह सामान्य जानकारी है — कानूनी सलाह नहीं।",
  mr: "क्षमस्व — आमच्या स्रोतांमध्ये या प्रक्रियेबाबत ठोस मजकूर नाही. खात्रीशीर मार्गदर्शनासाठी स्थानिक कायदेशीर मदत केंद्र किंवा एनजीओशी संपर्क साधा.\n\nही सामान्य माहिती आहे — कायदेशीर सल्ला नाही."
};

const LANGUAGE_DIRECTIVE: Record<SupportedLocale, string> = {
  en: "Write the full answer in warm, plain English.",
  hi: "पूरे उत्तर को आत्मीय और सरल हिन्दी (देवनागरी) में लिखें।",
  mr: "पूर्ण उत्तर कोमल आणि सोप्या मराठीत (देवनागरी) लिहा."
};

const DETERMINISTIC_COPY = {
  en: {
    summaryLabel: "Summary:",
    stepsLabel: "Steps:",
    nextActionsLabel: "Next actions:",
    disclaimerLabel: "Disclaimer:",
    protection: {
      summary: "You can apply to a Magistrate under the PWDVA for a protection order, often with help from a Protection Officer or NGO.",
      steps: {
        reachPo: "- Reach a Protection Officer or trusted NGO so they can prepare the Domestic Incident Report and help with your application under the PWDVA Rules.",
        draftApplication: "- Work with them to draft the Section 12 application for a protection order and gather any safe supporting notes or documents.",
        fileApplication: "- File the application with the Magistrate and request an interim or ex parte order if delaying could expose you to further harm.",
        attendHearing: "- Attend the hearing once notice is served; the Magistrate typically lists these matters within a few days.",
        keepOrder: "- Keep a copy of the protection order and report any breach to the Magistrate because violating the order is a punishable offence."
      },
      nextActions: {
        helpline: "- Call Women Helpline 181 to connect with a Protection Officer, shelter support, or counselling.",
        askPo: "- Ask the Protection Officer to connect you with legal aid or a trusted NGO who can accompany you to court.",
        storeDocs: "- Store copies of your application and Domestic Incident Report somewhere safe for upcoming hearings."
      }
    },
    charges: {
      summary: "Certain IPC sections cover cruelty, hurt, or modesty offences alongside PWDVA protections.",
      steps: {
        cruelty: "- Cruelty linked to dowry harassment or severe emotional or physical harm can be charged under IPC Section 498A, which carries imprisonment up to three years plus a possible fine.",
        hurt: "- Physical injuries can lead to hurt or grievous hurt charges under IPC Sections 323 or 325 with penalties that can extend to seven years depending on severity.",
        modesty: "- Unwanted touching or assault that outrages modesty can result in charges under IPC Section 354 with imprisonment up to five years.",
        pwdva: "- You can seek parallel relief through protection or residence orders under the PWDVA to stay safe while any criminal process moves forward."
      },
      nextActions: {
        helpline: "- Call Women Helpline 181 to connect with legal aid or a Protection Officer who can guide filings.",
        askPo: "- Ask the Protection Officer to help file the Domestic Incident Report and liaise with police on the applicable IPC sections.",
        notes: "- Keep notes and medical records safely to support any reports or hearings."
      }
    }
  },
  hi: {
    summaryLabel: "संक्षेप:",
    stepsLabel: "कदम:",
    nextActionsLabel: "आगे के सुझाव:",
    disclaimerLabel: "अस्वीकरण:",
    protection: {
      summary: "आप पीडब्ल्यूडीवीए के तहत मजिस्ट्रेट से संरक्षण आदेश के लिए आवेदन कर सकती/सकते हैं, अक्सर संरक्षण अधिकारी या विश्वसनीय एनजीओ की मदद से।",
      steps: {
        reachPo: "- किसी संरक्षण अधिकारी या भरोसेमंद एनजीओ से जुड़े ताकि वे घरेलू घटना रिपोर्ट तैयार करें और पीडब्ल्यूडीवीए नियमों के तहत आवेदन भरने में साथ दें।",
        draftApplication: "- उनके साथ मिलकर धारा 12 के तहत संरक्षण आदेश का आवेदन तैयार करें और सुरक्षित सहायक नोट्स या दस्तावेज़ इकट्ठा करें।",
        fileApplication: "- आवेदन मजिस्ट्रेट के पास जमा करें और यदि देरी से जोखिम हो सकता है तो अंतरिम या एक्स-पार्टी आदेश का अनुरोध करें।",
        attendHearing: "- नोटिस मिलने के बाद सुनवाई में शामिल हों; मजिस्ट्रेट आमतौर पर ऐसे मामलों को कुछ दिनों में सूचीबद्ध करते हैं।",
        keepOrder: "- संरक्षण आदेश की प्रति सुरक्षित रखें और उल्लंघन होने पर तुरंत मजिस्ट्रेट को सूचित करें क्योंकि आदेश तोड़ना दंडनीय है।"
      },
      nextActions: {
        helpline: "- महिला हेल्पलाइन 181 पर कॉल करके संरक्षण अधिकारी, आश्रय या परामर्श से जुड़ें।",
        askPo: "- संरक्षण अधिकारी से कानूनी सहायता या भरोसेमंद एनजीओ से अदालत में साथ चलने का समन्वय कराने को कहें।",
        storeDocs: "- अपने आवेदन और घरेलू घटना रिपोर्ट की प्रतियाँ आगामी सुनवाई के लिए सुरक्षित जगह रखें।"
      }
    },
    charges: {
      summary: "कुछ आईपीसी धाराएँ क्रूरता, चोट या शीलभंग के अपराधों को पीडब्ल्यूडीवीए संरक्षण के साथ कवर करती हैं।",
      steps: {
        cruelty: "- दहेज से जुड़ी उत्पीड़न या गंभीर मानसिक/शारीरिक हानि आईपीसी धारा 498ए के तहत आती है, जिसमें तीन साल तक की सज़ा और जुर्माना हो सकता है।",
        hurt: "- शारीरिक चोटें आईपीसी धारा 323 या 325 के तहत दर्ज हो सकती हैं, जिनमें गंभीरता के आधार पर सात साल तक की सज़ा संभव है।",
        modesty: "- छेड़छाड़ या शीलभंग जैसा आचरण आईपीसी धारा 354 के तहत पाँच साल तक की सज़ा का कारण बन सकता है।",
        pwdva: "- आप समानांतर रूप से पीडब्ल्यूडीवीए के तहत संरक्षण या निवास आदेश माँगकर सुरक्षित रह सकते/सकती हैं जब तक आपराधिक कार्यवाही आगे बढ़ती है।"
      },
      nextActions: {
        helpline: "- महिला हेल्पलाइन 181 पर कॉल करके कानूनी सहायता या संरक्षण अधिकारी से संपर्क करें जो प्रक्रिया समझाएँ।",
        askPo: "- संरक्षण अधिकारी से घरेलू घटना रिपोर्ट दाखिल करवाने और पुलिस के साथ उपयुक्त आईपीसी धाराओं पर समन्वय कराने में सहयोग माँगें।",
        notes: "- रिपोर्ट या सुनवाई में काम आने वाले नोट्स और चिकित्सीय रिकॉर्ड सुरक्षित रखें।"
      }
    }
  },
  mr: {
    summaryLabel: "संक्षेप:",
    stepsLabel: "पावलं:",
    nextActionsLabel: "पुढील कृती:",
    disclaimerLabel: "अस्वीकरण:",
    protection: {
      summary: "तुम्ही पीडब्ल्यूडीव्हीए अंतर्गत दंडाधिकार्‍यांकडे संरक्षण आदेशासाठी अर्ज करू शकता, यामध्ये संरक्षण अधिकारी किंवा विश्वासू एनजीओ मदत करू शकतात.",
      steps: {
        reachPo: "- संरक्षण अधिकारी किंवा विश्वसनीय एनजीओशी संपर्क साधा जेणेकरून ते डोमेस्टिक इन्सिडेंट रिपोर्ट तयार करून नियमांनुसार अर्जात मदत करतील.",
        draftApplication: "- त्यांच्यासोबत धारा 12 अंतर्गत संरक्षण आदेशाचा अर्ज तयार करा आणि सुरक्षित पुरावे किंवा नोंदी गोळा करा.",
        fileApplication: "- अर्ज दंडाधिकार्‍यांकडे दाखल करा आणि विलंब केल्यास धोका असेल तर अंतरिम किंवा एक्स-पार्टी आदेश मागा.",
        attendHearing: "- नोटीस बजावल्यानंतर सुनावणीस उपस्थित रहा; अशा प्रकरणांची यादी दंडाधिकारी काही दिवसांत लावतात.",
        keepOrder: "- संरक्षण आदेशाची प्रत सुरक्षित ठेवा आणि उल्लंघन झाल्यास तात्काळ दंडाधिकार्‍यांना कळवा कारण ते गुन्हा मानला जातो."
      },
      nextActions: {
        helpline: "- महिला हेल्पलाइन 181 वर कॉल करून संरक्षण अधिकारी, निवारा किंवा समुपदेशनाशी संपर्क साधा.",
        askPo: "- संरक्षण अधिकाऱ्याला न्यायालयात सोबत येण्यासाठी कायदेशीर मदत किंवा विश्वासू एनजीओशी संपर्क करून देण्याची विनंती करा.",
        storeDocs: "- तुमचा अर्ज आणि डोमेस्टिक इन्सिडेंट रिपोर्टच्या प्रती पुढील सुनावणीसाठी सुरक्षित ठेवा."
      }
    },
    charges: {
      summary: "काही आयपीसी कलमे क्रूरता, दुखापत किंवा शीलभंगाचे गुन्हे पीडब्ल्यूडीव्हीए संरक्षणासोबत हाताळतात.",
      steps: {
        cruelty: "- हुंडा छळ किंवा गंभीर मानसिक/शारीरिक त्रास असल्यास आयपीसी कलम 498ए अंतर्गत तक्रार नोंदू शकते, ज्यात तीन वर्षांपर्यंत तुरुंगवास आणि दंड असू शकतो.",
        hurt: "- शारीरिक दुखापतींसाठी आयपीसी कलम 323 किंवा 325 लागू होऊ शकते, गंभीरतेनुसार सात वर्षांपर्यंत शिक्षा होऊ शकते.",
        modesty: "- अश्लील वर्तन किंवा शीलभंग करणारे कृत्य आयपीसी कलम 354 अंतर्गत येते ज्यात पाच वर्षांपर्यंत शिक्षा असू शकते.",
        pwdva: "- आपराधिक कारवाई सुरू असताना सुरक्षित राहण्यासाठी पीडब्ल्यूडीव्हीए अंतर्गत संरक्षण किंवा निवास आदेशाची मागणी करू शकता."
      },
      nextActions: {
        helpline: "- महिला हेल्पलाइन 181 वर कॉल करून कायदेशीर मदत किंवा संरक्षण अधिकारी मार्गदर्शन मिळवा.",
        askPo: "- संरक्षण अधिकाऱ्याला डोमेस्टिक इन्सिडेंट रिपोर्ट दाखल करण्यात आणि पोलिसांशी संबंधित आयपीसी कलमांवर समन्वय करण्यात मदत मागा.",
        notes: "- तक्रारी किंवा सुनावणीसाठी लागणारे नोंदी व वैद्यकीय अहवाल सुरक्षित ठेवा."
      }
    }
  }
} as const;

const SYNONYM_MAP: Record<string, string> = {
  restraining: "protection",
  restrain: "protection",
  stay: "protection",
  order: "order",
  magistrate: "magistrate",
  domestic: "domestic",
  violence: "violence",
  charges: "charges",
  charge: "charges",
  abusive: "abuse",
  abused: "abuse",
  abuse: "abuse",
  hurt: "hurt",
  injury: "hurt",
  injuries: "hurt",
  beating: "hurt",
  assault: "assault",
  physically: "physical",
  physical: "physical"
};

function normalizeToken(token: string): string {
  return SYNONYM_MAP[token] ?? token;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map(normalizeToken);
}

function scoreDoc(questionTokens: Set<string>, doc: LegalRagDoc): number {
  const titleTokens = new Set(tokenize(doc.title));
  const textTokens = tokenize(doc.text);
  let score = 0;

  questionTokens.forEach(token => {
    if (titleTokens.has(token)) {
      score += 4;
    } else if (textTokens.includes(token)) {
      score += 1;
    }
  });

  return score;
}

export function retrieveLegalDocs(question: string, limit = 4): LegalRagDoc[] {
  const tokens = tokenize(question).filter(token => token.length > 2);
  if (!tokens.length) {
    return legalRagDocs.slice(0, limit);
  }

  const questionTokens = new Set(tokens);

  const scored = legalRagDocs
    .map(doc => ({ doc, score: scoreDoc(questionTokens, doc) }))
    .filter(entry => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(entry => entry.doc);

  if (!scored.length) {
    return legalRagDocs.slice(0, limit);
  }

  const needsSupportDoc = questionTokens.has("protection") || questionTokens.has("order");
  const needsChargesDocs = questionTokens.has("charges") || questionTokens.has("abuse") || questionTokens.has("hurt") || questionTokens.has("physical");

  const resultMap = new Map(scored.map(doc => [doc.id, doc] as [string, LegalRagDoc]));

  if (needsSupportDoc && !resultMap.has("doc4")) {
    const supportDoc = legalRagDocs.find(doc => doc.id === "doc4");
    if (supportDoc) {
      resultMap.set(supportDoc.id, supportDoc);
    }
  }

  if (needsChargesDocs) {
    ["doc5", "doc6", "doc7"].forEach(id => {
      if (!resultMap.has(id)) {
        const found = legalRagDocs.find(doc => doc.id === id);
        if (found) {
          resultMap.set(found.id, found);
        }
      }
    });
  }

  return Array.from(resultMap.values()).slice(0, Math.max(limit, resultMap.size));
}

export function buildPrompt(question: string, docs: LegalRagDoc[], locale: SupportedLocale): string {
  const serializedDocs = JSON.stringify(
    docs.map(doc => ({ id: doc.id, title: doc.title, text: doc.text, url: doc.url })),
    null,
    2
  );

  const directive = LANGUAGE_DIRECTIVE[locale] ?? LANGUAGE_DIRECTIVE.en;
  const disclaimer = DISCLAIMER_BY_LOCALE[locale] ?? DISCLAIMER_BY_LOCALE.en;
  const noSourceLine = (NO_SOURCE_BY_LOCALE[locale] ?? NO_SOURCE_BY_LOCALE.en).split("\n\n")[0];

  return `SYSTEM / CONTEXT (fixed): You are a safety-first legal summarizer. You will only summarize and paraphrase the exact retrieved authoritative passages provided below. You must not invent or add legal facts that are not in the retrieved text. Use calm, simple, trauma-informed language.

Language requirement: ${directive}
Mandatory disclaimer wording: "${disclaimer}"

INPUT (dynamically provided by the retrieval step):
user_question: ${question}
retrieved_docs: ${serializedDocs}

INSTRUCTIONS (must follow every time): Read the retrieved_docs only. Do not use external knowledge. Produce a short (4–8 bullets max) step-by-step plain-language answer that directly responds to user_question. Start with a 1-line summary. Describe the steps in natural language by referencing the laws or supports mentioned in the retrieved_docs, but do not include bracketed citations or internal document IDs. At the end, add a short "Next actions" list with 2–3 practical options (eg. contact Protection Officer, approach NGO, collect evidence) and include NGO/helpline numbers if available in retrieved_docs. If you lack relevant passages to answer the question precisely, say: "${noSourceLine}" Do NOT instruct the user to call police or file any complaint automatically; instead provide how they can contact services and recommend confirmation steps (two-step confirmation, NGO mediation). Keep tone calm, validating, and use short sentences. Always append the disclaimer: "${disclaimer}"

OUTPUT FORMAT:
1-line summary
4–8 actionable steps
2–3 next actions
Short disclaimer.`;
}

export function buildDeterministicAnswer(question: string, docs: LegalRagDoc[], locale: SupportedLocale): string | null {
  const lowerQuestion = question.toLowerCase();
  const docById = Object.fromEntries(docs.map(doc => [doc.id, doc]) as [string, LegalRagDoc][]);

  const hasDoc1 = Boolean(docById.doc1);
  const hasDoc2 = Boolean(docById.doc2);
  const hasDoc3 = Boolean(docById.doc3);
  const hasDoc4 = Boolean(docById.doc4);
  const hasDoc5 = Boolean(docById.doc5);
  const hasDoc6 = Boolean(docById.doc6);
  const hasDoc7 = Boolean(docById.doc7);

  const copy = DETERMINISTIC_COPY[locale] ?? DETERMINISTIC_COPY.en;
  const disclaimer = DISCLAIMER_BY_LOCALE[locale] ?? DISCLAIMER_BY_LOCALE.en;

  const mentionsProtectionOrder = lowerQuestion.includes("protection order") || lowerQuestion.includes("restraining order");

  if (mentionsProtectionOrder && (hasDoc1 || hasDoc2 || hasDoc3)) {
    const steps: string[] = [];
    if (hasDoc2) {
      steps.push(copy.protection.steps.reachPo);
    }
    if (hasDoc3) {
      steps.push(copy.protection.steps.draftApplication);
    }
    if (hasDoc1) {
      steps.push(copy.protection.steps.fileApplication);
    }
    if (hasDoc3) {
      steps.push(copy.protection.steps.attendHearing);
    }
    if (hasDoc1) {
      steps.push(copy.protection.steps.keepOrder);
    }

    const nextActions: string[] = [];
    if (hasDoc4) {
      nextActions.push(copy.protection.nextActions.helpline);
    }
    if (hasDoc2) {
      nextActions.push(copy.protection.nextActions.askPo);
    }
    if (hasDoc3) {
      nextActions.push(copy.protection.nextActions.storeDocs);
    }

    const parts: string[] = [`${copy.summaryLabel} ${copy.protection.summary}`];
    if (steps.length) {
      parts.push(copy.stepsLabel, ...steps);
    }
    if (nextActions.length) {
      parts.push(copy.nextActionsLabel, ...nextActions);
    }
    parts.push(`${copy.disclaimerLabel} ${disclaimer}`);

    return parts.join("\n");
  }

  const asksCharges =
    lowerQuestion.includes("what charges") ||
    lowerQuestion.includes("what charge") ||
    lowerQuestion.includes("face");

  if (asksCharges && (hasDoc5 || hasDoc6 || hasDoc7)) {
    const steps: string[] = [];

    if (hasDoc5) {
      steps.push(copy.charges.steps.cruelty);
    }
    if (hasDoc6) {
      steps.push(copy.charges.steps.hurt);
    }
    if (hasDoc7) {
      steps.push(copy.charges.steps.modesty);
    }
    if (hasDoc1) {
      steps.push(copy.charges.steps.pwdva);
    }

    const nextActions: string[] = [];
    if (hasDoc4) {
      nextActions.push(copy.charges.nextActions.helpline);
    }
    if (hasDoc2) {
      nextActions.push(copy.charges.nextActions.askPo);
    }
    if (hasDoc3) {
      nextActions.push(copy.charges.nextActions.notes);
    }

    const parts: string[] = [`${copy.summaryLabel} ${copy.charges.summary}`];
    if (steps.length) {
      parts.push(copy.stepsLabel, ...steps);
    }
    if (nextActions.length) {
      parts.push(copy.nextActionsLabel, ...nextActions);
    }
    parts.push(`${copy.disclaimerLabel} ${disclaimer}`);

    return parts.join("\n");
  }

  return null;
}
