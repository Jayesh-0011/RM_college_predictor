"use server";
import { CollegePrediction } from "@/lib/types";
import {  UserInputs } from "@/lib/variables";
import { createClient } from "@/utils/supabase/client";

const getHighData = async (userdata: UserInputs) => {
    const supabase = createClient();
    let mains : CollegePrediction[] = [];
    let advanced : CollegePrediction[] = [];

    if (userdata.advanced_rank) {
        const { data, error } = await supabase
            .from("cutoffs")
            .select("*")
            .eq("seat_type", userdata.category)
            .eq("college_type", "IIT")
            .eq("gender", userdata.gender)
            .gte("closing_rank", userdata.advanced_category_rank)
            .lte("opening_rank", userdata.advanced_category_rank);
        if (error) throw error;
        advanced = data;
    }

    const { data, error } = await supabase
        .from("cutoffs")
        .select('*')
        .eq("seat_type", userdata.category)
        .eq("gender ", userdata.gender)
        .neq("college_type", "IIT")
        .gte("closing_rank", userdata.mains_category_rank)
        .lte("opening_rank", userdata.mains_category_rank);
    if (error) throw error;
    mains = data;

    return {data: {mains, advanced}};
};
export default getHighData;