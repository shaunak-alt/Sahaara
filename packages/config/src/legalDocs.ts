export type LegalRagDoc = {
  id: string;
  title: string;
  text: string;
  url: string;
};

export const legalRagDocs: LegalRagDoc[] = [
  {
    id: "doc1",
    title: "Protection of Women from Domestic Violence Act, 2005 — Section 18",
    url: "https://legislative.gov.in/sites/default/files/A2005-43.pdf",
    text:
      "PWDVA §18 (Protection orders): A Magistrate may, after hearing the aggrieved person and the respondent and on being prima facie satisfied that domestic violence has taken place or is likely to take place, pass a protection order prohibiting the respondent from committing domestic violence, aiding or abetting domestic violence, entering the aggrieved person’s residence or place of employment, attempting to communicate in any form, alienating assets, causing violence to dependants or relatives, or any other direction necessary for safety. Applications may be presented by the aggrieved person, a Protection Officer, or any other person on her behalf.\nPWDVA §19 (Residence orders): The Magistrate may restrain the respondent from dispossessing the aggrieved person from the shared household, direct removal of the respondent, restrain entry, or secure alternate accommodation.\nPWDVA §§20–22 (Monetary, custody, compensation): The Magistrate may order monetary relief, grant child custody arrangements, and award compensation and damages for injuries.\nPWDVA §31 (Penalty for breach): Failure to comply with a protection order or interim protection order is an offence punishable with imprisonment up to one year, or fine up to twenty thousand rupees, or both."
  },
  {
    id: "doc2",
    title: "Protection of Women from Domestic Violence Rules, 2006 — Rule 8 (Duties of Protection Officers)",
    url: "https://wcd.nic.in/sites/default/files/226349.pdf",
    text:
      "Rule 8 (Protection Officer duties): The Protection Officer must assist the aggrieved person in making an application under PWDVA §12, prepare the Domestic Incident Report (Form I) if she requests, ensure access to legal aid under the Legal Services Authorities Act, 1987, maintain a list of service providers and shelter homes, develop a safety plan including arranging protection orders and other reliefs, and forward copies of the application and any protection order to the jurisdictional police station."
  },
  {
    id: "doc3",
    title: "PWDVA Handbook for Protection Officers (MWCD 2014) — Filing an Application",
    url: "https://wcd.nic.in/sites/default/files/handbook%20for%20protection%20officers.pdf",
    text:
      "The aggrieved person can approach the Protection Officer, service provider, or directly file an application before the Magistrate under Section 12 seeking reliefs including a protection order under Section 18. The Protection Officer must help her draft the application, collect supporting documents when safe, and submit the Domestic Incident Report along with the application. The Magistrate shall fix the first hearing within three days and may grant an interim or ex parte protection order if immediate protection is required. The Protection Officer is responsible for serving notice on the respondent and ensuring copies of the order reach the aggrieved person and the local police station."
  },
  {
    id: "doc4",
    title: "National Commission for Women — Helpline and Support Services",
    url: "https://ncw.nic.in/helplines",
    text:
      "The National Commission for Women coordinates the Women Helpline 181 for immediate assistance and links survivors with Protection Officers, legal aid, and counselling services. Survivors may also contact local NGOs recognised under the Protection of Women from Domestic Violence Act for accompaniment to court and follow-up with enforcement of protection orders."
  },
  {
    id: "doc5",
    title: "Indian Penal Code Section 498A — Cruelty by Husband or Relatives",
    url: "https://indiacode.nic.in/show-data?actid=AC_CEN_5_23_00023_186045_1517807327078&orderno=498A",
    text:
      "IPC §498A (Cruelty by husband or relatives): Whoever being the husband or the relative of the husband of a woman subjects her to cruelty shall be punished with imprisonment for a term which may extend to three years and shall also be liable to fine. ‘Cruelty’ includes any willful conduct likely to drive the woman to commit suicide or cause grave injury, and harassment for unlawful demand for any property or valuable security. The offence is cognizable and non-bailable."
  },
  {
    id: "doc6",
    title: "Indian Penal Code Sections 323 & 325 — Hurt and Grievous Hurt",
    url: "https://indiacode.nic.in",
    text:
      "IPC §323 (Punishment for voluntarily causing hurt): Whoever, except in the cases provided for by section 334, voluntarily causes hurt, shall be punished with imprisonment of either description for a term which may extend to one year, or with fine which may extend to one thousand rupees, or with both. IPC §325 (Punishment for voluntarily causing grievous hurt): Whoever voluntarily causes grievous hurt shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine."
  },
  {
    id: "doc7",
    title: "Indian Penal Code Section 354 — Outraging Modesty",
    url: "https://indiacode.nic.in",
    text:
      "IPC §354 (Assault or criminal force to woman with intent to outrage her modesty): Whoever assaults or uses criminal force to any woman, intending to outrage or knowing it to be likely that he will thereby outrage her modesty, shall be punished with imprisonment of either description for a term which may extend to five years, and shall also be liable to fine."
  },

  // ----------- NEW/ADDITIONAL DOCUMENTS ADDED BELOW --------------

  {
    id: "doc8",
    title: "Constitution of India — Article 14, 15(3), 19, 21 (Rights relevant to DV)",
    url: "https://legislative.gov.in/constitution-of-india",
    text:
      "Article 14 — Right to Equality: Every woman is entitled to equality before the law and equal protection of the laws. \nArticle 15(3) — Special provisions for women: State may make special provisions for women. \nArticle 19 — Freedom of speech/expression and movement: Unreasonable restrictions on movement or communication by others can be actionable. \nArticle 21 — Right to life and personal liberty: Courts have interpreted Article 21 to include right to life with dignity, bodily integrity, privacy, and protection from violence and sexual abuse. These constitutional rights form the basis for protective and remedial measures in domestic violence cases."
  },
  {
    id: "doc9",
    title: "Criminal Procedure Rights & Police Procedure — Zero FIR, Female Officer, Statement Recording",
    url: "https://mha.gov.in",
    text:
      "Zero FIR: Any police station must register an FIR irrespective of jurisdiction if a cognizable offence is reported; the FIR is then transferred to the correct jurisdiction. \nRight to female police officer: Survivors may request to be recorded by a female officer; many state police have specific SOPs for gender-sensitive handling. \nRecording at home: Police or magistrate can, in certain circumstances, take statements at the survivor’s place if she cannot safely visit the station. \nPrivacy & Dignity: Statements involving sexual or domestic incidents should be taken in private and with due sensitivity."
  },
  {
    id: "doc10",
    title: "Dowry Prohibition Act, 1961 & Relevant Sections",
    url: "https://indiacode.nic.in",
    text:
      "Dowry Prohibition Act (1961): Prohibits the giving or taking of dowry and criminalizes demanding dowry. Dowry-related harassment is relevant to domestic violence cases and can be prosecuted alongside other offences (e.g., IPC 498A, cruelty)."
  },
  {
    id: "doc11",
    title: "Sexual Harassment of Women at Workplace (POSH) Act, 2013 — Overview",
    url: "https://wcd.nic.in",
    text:
      "POSH Act (2013): Protects women from sexual harassment in workplaces. Employers must establish Internal Complaints Committees (ICCs), provide a safe mechanism to report complaints, and take preventive steps. Harassment at workplace, including by family members in workplaces or threats, can be pursued under POSH alongside other remedies."
  },
  {
    id: "doc12",
    title: "Legal Services Authorities Act, 1987 — Right to Free Legal Aid",
    url: "https://legalaid.gov.in",
    text:
      "Legal Services Authorities Act: Provides for free legal services to eligible persons including survivors of domestic violence. State Legal Services Authorities and District Legal Services Authorities can provide counsel, help prepare applications, and represent survivors in court under schemes for free legal aid."
  },
  {
    id: "doc13",
    title: "Hindu Marriage Act / Special Marriage Act — Cruelty as Ground for Divorce",
    url: "https://indiacode.nic.in",
    text:
      "Under personal laws (e.g., Hindu Marriage Act), 'cruelty' is a recognized ground for judicial separation and divorce. Where cruelty is established (physical, mental), survivors may seek civil remedies such as dissolution of marriage, maintenance, and custody claims in family courts."
  },
  {
    id: "doc14",
    title: "Childline & Helplines — 1098, 181, 112, 1091",
    url: "https://ndrf.nic.in",
    text:
      "Important helplines: 112 (Emergency), 181 (Women Helpline), 1098 (Childline), 1091 (Women Police Helpline in some states). These numbers connect survivors to emergency response, Protection Officers, police assistance, and child-protection services."
  },
  {
    id: "doc15",
    title: "What Evidence Helps in Domestic Violence Cases (Practical Guidance)",
    url: "https://wcd.nic.in",
    text:
      "Evidence to preserve: medical records and hospital receipts; photos of injuries/property damage; screenshots of threatening messages and calls (with metadata if possible); voice notes; financial records showing control/denial of funds; witness statements; copies of prior police complaints. Store copies safely (preferably encrypted client-side) and share with your lawyer or NGO when safe to do so."
  },
  {
    id: "doc16",
    title: "How to Get a Protection Order — Step-by-Step (Practical, PWDVA-based)",
    url: "https://wcd.nic.in/sites/default/files/handbook%20for%20protection%20officers.pdf",
    text:
      "Step 1: Contact a Protection Officer, local NGO, or legal aid clinic. Protection Officers assist survivors to draft the application (Domestic Incident Report) under PWDVA §12. \nStep 2: Prepare supporting documents safely (medical records, photos, messages). \nStep 3: File the application before the Magistrate under PWDVA §12. The Protection Officer or lawyer can submit the application for you. \nStep 4: The Magistrate will fix a first hearing (often within 3 days) and may grant interim/ex parte protection if delay risks harm. \nStep 5: Attend hearings (with NGO support if desired) and seek protection order under §18, residence orders under §19, monetary relief under §20, custody or compensation under §§21–22. \nStep 6: If protection order is breached, file for enforcement and inform the police; breaches attract penalties under §31."
  },
  {
    id: "doc17",
    title: "Community Support & NGO Interaction — Best Practices",
    url: "https://ncw.nic.in",
    text:
      "NGOs and Protection Officers: NGOs may provide counseling, court accompaniment, shelter, and assistance in collecting evidence. Best practice: verify NGO credentials (ask for registration, references), use the anonymous inbox or official NGO handles, and only share identifying details when you consent and are in a safe context. Admin-verified NGO badges help survivors identify trusted responders."
  },
  {
    id: "doc18",
    title: "Enforcement & Breach Procedure — What To Do If An Order Is Violated",
    url: "https://legislative.gov.in/sites/default/files/A2005-43.pdf",
    text:
      "If a protection order is breached: immediately inform the local police and the Protection Officer. The PWDVA provides penalty provisions for breach (see §31). The aggrieved can apply for contempt or enforcement petitions and may seek execution proceedings through the Magistrate. NGOs and Legal Services Authorities can assist in enforcement actions."
  },
  {
    id: "doc19",
    title: "Privacy, Digital Safety & Evidence Handling Guidance",
    url: "https://digitalindia.gov.in",
    text:
      "Digital safety tips: use a safe device or an encrypted evidence locker (client-side). Avoid uploading sensitive evidence to public cloud accounts without strong encryption. Maintain copies in offline safe storage if possible. Learn how to safely clear browser history or use a trusted device for sensitive actions. If device access is monitored, use offline methods to record or store evidence temporarily and seek NGO assistance."
  },
  {
    id: "doc20",
    title: "Police SOPs & Gender Sensitivity — Handling Domestic Violence Complaints",
    url: "https://mha.gov.in",
    text:
      "Police SOPs: Many state police have gender-sensitive SOPs to ensure survivors are handled with dignity, statements are recorded sensitively, female officers record statements when possible, and Protection Officers are liaised with. Survivors should ask for a female officer or Protection Officer if available."
  }
];