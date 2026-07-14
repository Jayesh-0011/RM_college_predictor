// Shape of a single row returned by the predictor API
// (one row = one institute/branch/seat-type combination that matched the user's rank).

export type CollegeType = "IIT" | "NIT" | "IIIT" | "GFTI" | string;

export interface CollegePrediction {
    id: number;
    institute: string;
    branch: string;
    college_type: CollegeType;
    opening_rank: number;
    closing_rank: number;
    raw_opening_rank: string;
    raw_closing_rank: string;
    quota: string;
    seat_type: string;
    gender: string;
    state: string;
    created_at: string;
}