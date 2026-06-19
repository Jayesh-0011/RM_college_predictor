export  interface RawCutoff {
  institute: string;
  branch: string;
  quota: string;
  seat_type: string;
  gender: string;
  opening_rank: string | number;
  closing_rank: string | number;
}

export interface CutoffInsert {
  institute: string;
  branch: string;
  quota: string;
  seat_type: string;
  gender: string;
  raw_opening_rank: string;
  raw_closing_rank: string;
  opening_rank: number | null;
  closing_rank: number | null;
}

export interface UserInputs {
  advanced_rank: number ;
  advanced_category_rank: number ;
  mains_rank: number;
  mains_category_rank: number ;
  category: Category;
  gender: Gender;
}

export type Category =
  | "OPEN"
  | "OPEN (PwD)"
  | "EWS"
  | "EWS (PwD)"
  | "OBC-NCL"
  | "OBC-NCL (PwD)"
  | "SC"
  | "SC (PwD)"
  | "ST"
  | "ST (PwD)";

  export type Gender =
  | "Gender-Neutral"
  | "Female-only (including Supernumerary)";