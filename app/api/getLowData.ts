"use server";
import { CollegePrediction } from "@/lib/types";
import { UserInputs } from "@/lib/variables";
import { createClient } from "@/utils/supabase/client";

const getLowData = async (userdata: UserInputs, predicted_advanced_data_high: CollegePrediction[], predicted_mains_data_high: CollegePrediction[], predicted_advanced_data_moderate: CollegePrediction[], predicted_mains_data_moderate: CollegePrediction[]) => {
    const supabase = createClient();
    let mains: CollegePrediction[] = [];
    let advanced: CollegePrediction[] = [];

    if (userdata.advanced_rank) {
        const { data, error } = await supabase
            .from("cutoffs")
            .select("*")
            .eq("seat_type", userdata.category)
            .eq("college_type", "IIT")
            .eq("gender", userdata.gender)
            .gte("closing_rank", userdata.advanced_category_rank - 200)
            .lte("opening_rank", userdata.advanced_category_rank + 200);
        if (error) throw error;

        advanced = data.filter((row: CollegePrediction ) =>
            !predicted_advanced_data_high.some(highRow =>
                highRow.id === row.id 
            ) &&
            !predicted_advanced_data_moderate.some(modRow =>
                modRow.id === row.id 
            )
        );
    };


    const { data, error } = await supabase
        .from("cutoffs")
        .select('*')
        .eq("seat_type", userdata.category)
        .eq("gender", userdata.gender)
        .neq("college_type", "IIT")
        .gt("closing_rank", userdata.mains_category_rank-200)
        .lt("opening_rank", userdata.mains_category_rank-200);
    if (error) throw error;

    mains = data.filter((row: CollegePrediction) => {
        return !predicted_mains_data_high.some(highRow =>
            highRow.id === row.id 
        ) ||
        !predicted_mains_data_moderate.some(modRow =>
            modRow.id === row.id 
        );
    });

    return { data2 : { mains, advanced } };
};
export default getLowData;