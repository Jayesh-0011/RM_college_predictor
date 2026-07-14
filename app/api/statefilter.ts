import { CollegePrediction } from "@/lib/types"

const statefilter = (data: CollegePrediction[], selectedStates: string[]) => {
    const filteredData = data.filter((clg)=> 
        selectedStates.includes(clg.state)
    )
    return filteredData
}

export default statefilter
