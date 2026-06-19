"use server";
import { createClient } from "../supabase/client";
import { RawCutoff } from "@/lib/variables";
import { CutoffInsert } from "@/lib/variables";

const updateTable = async (datas: RawCutoff[]) => {
    try {
        const supabase = createClient()
        console.log(supabase)

        const getRank = (value: string | number): number | null => {
            const match = String(value).match(/\d+/);
            return match ? Number(match[0]) : null;
        };
        
        function getCollegeType(institute: string) {
            if (institute.startsWith("Indian Institute of Technology")) return "IIT";
            if (institute.startsWith("National Institute of Technology")) return "NIT";
            if (institute.startsWith("Indian Institute of Information Technology")) return "IIIT";
            return "GFTI";
        }


        const transformedData: CutoffInsert[] = datas.map((row: RawCutoff) => ({
            ...row,
            raw_opening_rank: String(row.opening_rank),
            raw_closing_rank: String(row.closing_rank),
            opening_rank: getRank(row.opening_rank),
            closing_rank: getRank(row.closing_rank),
            college_type: getCollegeType(row.institute)
        }));

        const { error } = await supabase
            .from('cutoffs')
            .insert(transformedData)

        console.error('error: ', error)
    }
    catch (err) {
        console.error(err)
    }
}
export default updateTable;
