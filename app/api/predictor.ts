"use server";
import { UserInputs } from "@/lib/variables";
import getHighData from "./getHighData";
import getModerateData from "./getModerateData";
import getLowData from "./getLowData";
import { CollegePrediction } from "@/lib/types";
import statefilter from "./statefilter";

const predictor = async (userdata: UserInputs, selectedStates: string[]) => {

    let predicted_advanced_data_high: CollegePrediction[] = []
    let predicted_advanced_data_moderate: CollegePrediction[] = []
    let predicted_advanced_data_low: CollegePrediction[] = []

    let predicted_mains_data_high: CollegePrediction[] = []
    let predicted_mains_data_moderate: CollegePrediction[] = []
    let predicted_mains_data_low: CollegePrediction[] = []

    const { data } = await getHighData(userdata);
    predicted_advanced_data_high = data?.advanced || [];
    predicted_mains_data_high = data?.mains || [];

    const { data1 } = await getModerateData(userdata, predicted_advanced_data_high, predicted_mains_data_high);
    predicted_advanced_data_moderate = data1?.advanced || [];
    predicted_mains_data_moderate = data1?.mains || [];

    const { data2 } = await getLowData(userdata, predicted_advanced_data_high, predicted_advanced_data_moderate, predicted_mains_data_high, predicted_mains_data_moderate);
    predicted_advanced_data_low = data2?.advanced || [];
    predicted_mains_data_low = data2?.mains || [];

    predicted_advanced_data_high = statefilter(predicted_advanced_data_high,selectedStates);
    predicted_advanced_data_moderate = statefilter(predicted_advanced_data_moderate, selectedStates);
    predicted_advanced_data_low = statefilter(predicted_advanced_data_low, selectedStates);
    predicted_mains_data_high = statefilter(predicted_mains_data_high, selectedStates);
    predicted_mains_data_moderate = statefilter(predicted_mains_data_moderate, selectedStates);
    predicted_mains_data_low = statefilter(predicted_mains_data_low, selectedStates);

    console.log('data:', data)

    return {
        data: {
            predicted_mains_data: {
                high: predicted_mains_data_high,
                moderate: predicted_mains_data_moderate,
                low: predicted_mains_data_low
            },
            predicted_advanced_data: {
                high: predicted_advanced_data_high,
                moderate: predicted_advanced_data_moderate,
                low: predicted_advanced_data_low
            }
        }
    }
}
export default predictor;