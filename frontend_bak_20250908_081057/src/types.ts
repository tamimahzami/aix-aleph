export type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "LOST" | "WON";

export interface Lead {
  id: string;
  name: string;
  email?: string;
  org?: string;
  title?: string;
  country?: string;
  tags?: string[];
  status: LeadStatus;
  createdAt: string; // ISO
  notes?: string;
}
