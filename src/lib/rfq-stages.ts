export const LEAD_STAGES = [
  "new",
  "qualified",
  "engineering review",
  "proposal",
  "negotiation",
  "won",
  "deployed",
  "closed",
] as const;

export type LeadStage = (typeof LEAD_STAGES)[number];
