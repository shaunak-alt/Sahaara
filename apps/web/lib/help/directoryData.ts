import type { SupportedLanguage } from "../i18n/translations";

export type LocalizedText = Record<SupportedLanguage, string>;

export type DirectoryEntry = {
  name: string;
  pointOfContact: string;
  phone: string;
  email?: string;
  address: string;
  notes?: LocalizedText;
};

export const ngoEntries: DirectoryEntry[] = [
  {
    name: "Majlis Manch",
    pointOfContact: "Priya Bhandari",
    phone: "+91-22-2666-5558",
    email: "support@majlisbombay.org",
    address: "A-3/302, Veena Nagar Phase II, Mumbai, Maharashtra",
    notes: {
      en: "Legal advocacy, counselling, shelter referrals",
      hi: "कानूनी प्रतिनिधित्व, परामर्श और आश्रय संदर्भ",
      mr: "कायदेशीर वकिली, समुपदेशन आणि आश्रय संदर्भ"
    }
  },
  {
    name: "Sneha Foundation",
    pointOfContact: "Dr. Ritu Gupta",
    phone: "+91-98330-12345",
    email: "helpline@snehaindia.org",
    address: "T.H. Kataria Marg, Mahim West, Mumbai, Maharashtra",
    notes: {
      en: "24x7 crisis intervention and trauma counselling",
      hi: "24x7 संकट हस्तक्षेप और आघात परामर्श",
      mr: "२४x७ संकट हस्तक्षेप आणि आघात समुपदेशन"
    }
  },
  {
    name: "International Foundation for Crime Prevention & Victim Care (PCVC)",
    pointOfContact: "Nalini Kumar",
    phone: "+91-90940-40000",
    email: "info@pcvconline.org",
    address: "40, NGEF Lane, II Floor, Indiranagar, Bengaluru, Karnataka",
    notes: {
      en: "Emergency support, legal navigation, survivor peer groups",
      hi: "आपातकालीन सहायता, कानूनी मार्गदर्शन, सर्वाइवर सहयोग समूह",
      mr: "आपत्कालीन मदत, कायदेशीर दिशा आणि सर्व्हायव्हर सहगट"
    }
  }
];

export const volunteerEntries: DirectoryEntry[] = [
  {
    name: "Ananya Safe Circles",
    pointOfContact: "Ananya Sharma",
    phone: "+91-99876-55432",
    email: "ananya@safecircles.in",
    address: "Virtual network, Mumbai & Pune",
    notes: {
      en: "Peer listening volunteers for late-night check-ins",
      hi: "देर रात चेक-इन के लिए सहकर्मी श्रोता स्वयंसेवक",
      mr: "उशीरा रात्री तपासणीसाठी समवयस्क ऐकणारे स्वयंसेवक"
    }
  },
  {
    name: "Purple Pathway Collective",
    pointOfContact: "Mira Kulkarni",
    phone: "+91-88790-22110",
    email: "hello@purplepathway.org",
    address: "Hybrid support – online and Navi Mumbai meetups",
    notes: {
      en: "Weekly support groups and accompaniment to police stations",
      hi: "साप्ताहिक समर्थन समूह और पुलिस स्टेशन में साथ जाना",
      mr: "साप्ताहिक आधार गट आणि पोलिस ठाण्यात साथ"
    }
  }
];

export const lawyerEntries: DirectoryEntry[] = [
  {
    name: "Adv. Kavita Deshpande",
    pointOfContact: "Adv. Kavita Deshpande",
    phone: "+91-98200-44321",
    email: "kavita.deshpande@probono.in",
    address: "204, Sunrise Chambers, Fort, Mumbai",
    notes: {
      en: "Protection orders, custody guidance, virtual consults",
      hi: "संरक्षण आदेश, अभिभावकता मार्गदर्शन, वर्चुअल परामर्श",
      mr: "संरक्षण आदेश, संरक्षक मार्गदर्शन, ऑनलाइन सल्लामसलत"
    }
  },
  {
    name: "Justice for Her Alliance",
    pointOfContact: "Rahul Mehra",
    phone: "+91-93111-77889",
    email: "connect@justiceforher.org",
    address: "D-12, Defence Colony, New Delhi",
    notes: {
      en: "All-women FIR support teams and legal drafting",
      hi: "महिला FIR सहयोग टीम और कानूनी ड्राफ्टिंग",
      mr: "सर्व महिलांची FIR सहाय्यक टीम आणि कायदेशीर मसुदा"
    }
  }
];
