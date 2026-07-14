"use server";
import { CollegePrediction } from "@/lib/types";
import {  UserInputs } from "@/lib/variables";
import { createClient } from "@/utils/supabase/client";

const getModerateData = async (userdata: UserInputs, predicted_advanced_data_high: CollegePrediction[], predicted_mains_data_high: CollegePrediction[]) => {
    const supabase = createClient();
    let mains: CollegePrediction[] = [];
    let advanced: CollegePrediction[] = [];
    console.log(userdata.gender);
    if (userdata.advanced_rank) {
        const { data, error } = await supabase
            .from("cutoffs")
            .select("*")
            .eq("seat_type", userdata.category)
            .eq("gender", userdata.gender)
            .eq("college_type", "IIT")
            .gte("closing_rank", userdata.advanced_category_rank - 100)
            .lte("opening_rank", userdata.advanced_category_rank + 100);
        if (error) throw error;

        advanced = data.filter((row: CollegePrediction ) => {
            return !predicted_advanced_data_high.some(highRow =>
                highRow.id === row.id
            );
        });
    };


    const { data, error } = await supabase
        .from("cutoffs")
        .select('*')
        .eq("seat_type", userdata.category)
        .eq("gender", userdata.gender)
        .neq("college_type", "IIT")
        .gte("closing_rank", userdata.mains_category_rank-500)
        .lte("opening_rank", userdata.mains_category_rank+500);
    if (error) throw error;

    mains = data.filter((row: CollegePrediction) => {
        return !predicted_mains_data_high.some(highRow =>
            highRow.id === row.id   
        );
    });    

    return { data1 : { mains, advanced } };
};
export default getModerateData;