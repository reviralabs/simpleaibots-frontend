export type WeddingSpeechFormInput = {
  speakerName: string;
  isBestMan: string;
  isMaidOfHonor: string;
  targetPerson: string;
  targetRelation: string;
  targetPersonPronoun: string;
  targetPersonChars: string;
  targetPersonPartner: string;
  targetPersonPartnerPronoun: string;
  targetPersonPartnerChars: string;
  parentMemory: string;
  siblingMemory: string;
  firstMeetMemory: string;
  memory: string;
  emotion: string;
};

export type WeddingSpeechRequest = {
  speakerName: string;
  isBestMan: boolean;
  isMaidOfHonor: boolean;
  targetPerson: string;
  targetRelation: string;
  targetPersonPronoun: string;
  targetPersonChars: string[];
  targetPersonPartner: string;
  targetPersonPartnerPronoun: string;
  targetPersonPartnerChars: string[];
  parentMemory: string;
  siblingMemory: string;
  firstMeetMemory: string;
  memory: string;
  emotion: string;
};

export type WeddingSpeechResponse = {
  id: string;
  content: string;
  statusCode: string;
  statusText: string;
};
