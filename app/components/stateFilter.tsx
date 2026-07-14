"use client";
import states from "@/lib/indianStates.json";
import { useStateStore } from "../store/stateFilter";

const StateFilter = () => {
    const { selectedStates, toggleState  } = useStateStore();

    return (
        <div className="sticky top-8 w-xl rounded-2xl border border-[#E4DFD3] bg-white p-5 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-[#14213D]">
                Select States
            </h2>
            <div className="grid grid-cols-3 gap-2 max-h-175 overflow-y-auto pr-2">
                {states.map((state) => (
                    <label
                        key={state.value}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-[#F4EFE4]"                    >
                        <input
                            type="checkbox"
                            className="h-4 w-4 shrink-0 accent-[#14213D]"
                            checked={selectedStates.includes(state.value)}
                            onChange={() => toggleState(state.value)}
                        />
                        <span className="text-sm text-[#14213D]">{state.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default StateFilter;