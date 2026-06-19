import type { CollegeType } from "../../lib/types";

// Maps each college type to a badge style. Falls back to a neutral
// tone for any value that isn't one of the known four.
const typeStyles: Record<string, string> = {
    IIT: "bg-[#14213D] text-white",
    NIT: "bg-[#C08A28]/15 text-[#9C6B1B] border border-[#C08A28]/30",
    IIIT: "bg-[#2F5233]/10 text-[#2F5233] border border-[#2F5233]/25",
    GFTI: "bg-[#786F5E]/10 text-[#786F5E] border border-[#786F5E]/25",
};

const fallbackStyle = "bg-[#E4DFD3] text-[#786F5E]";

interface CollegeTypeBadgeProps {
    type: CollegeType;
}

export default function CollegeTypeBadge({ type }: CollegeTypeBadgeProps) {
    const style = typeStyles[type] ?? fallbackStyle;

    return (
        <span
            className={`inline-flex max-w-full items-center rounded-full px-1.5 py-0.5 font-['Inter'] text-[9px] font-semibold uppercase tracking-normal sm:px-2.5 sm:text-[11px] sm:tracking-wide ${style}`}
        >
            {type}
        </span>
    );
}
