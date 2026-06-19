import type { CollegePrediction } from "../../lib/types";
import CollegeTypeBadge from "./collegetypebadge";
import { rowClass, tdClass, monoNumClass } from "./styles";

interface TableRowProps {
    rank: number;
    row: CollegePrediction;
    type: "high" | "moderate" | "low";
}

const probabilityRowClass = {
    high: "border-l-4 border-l-[#2F5233]",
    moderate: "border-l-4 border-l-[#C08A28]",
    low: "border-l-4 border-l-[#786F5E]",
} as const;

export default function TableRow({ rank, row, type }: TableRowProps) {
    return (
        <tr className={`${rowClass} ${probabilityRowClass[type]}`}>
            <td className={`${tdClass} align-top`}>{rank}</td>
            <td className={`${tdClass} align-top font-medium`}>{row.institute}</td>
            <td className={`${tdClass} align-top`}>{row.branch}</td>
            <td className={`${tdClass} text-right`}>
                <span className={monoNumClass}>
                    {row.opening_rank.toLocaleString("en-IN")}
                </span>
            </td>
            <td className={`${tdClass} text-right`}>
                <span className={monoNumClass}>
                    {row.closing_rank.toLocaleString("en-IN")}
                </span>
            </td>
            <td className={`${tdClass} align-top`}>
                <CollegeTypeBadge type={row.college_type} />
            </td>
        </tr>
    );
}
