"use client";
import type { CollegePrediction } from "../../lib/types";
import EmptyState from "./emptystate";
import TableRow from "./Tablerow";
import { wrapperClass, scrollAreaClass, theadRowClass, thClass } from "./styles";

interface ResultsTableProps {
    data: {
        results_high: CollegePrediction[];
        results_moderate: CollegePrediction[];
        results_low: CollegePrediction[];
    };
}

const columns = [
    { label: "Sr No.", align: "text-left" },
    { label: "Institute", align: "text-left" },
    { label: "Branch", align: "text-left" },
    { label: "Opening Rank", align: "text-right" },
    { label: "Closing Rank", align: "text-right" },
    { label: "College Type", align: "text-left" },
] as const;

const probabilityGroups = [
    {
        key: "results_high",
        type: "high",
        label: "High probability",
        tone: "border-[#2F5233]/25 bg-[#2F5233]/5 text-[#2F5233]",
    },
    {
        key: "results_moderate",
        type: "moderate",
        label: "Moderate probability",
        tone: "border-[#C08A28]/30 bg-[#C08A28]/10 text-[#9C6B1B]",
    },
    {
        key: "results_low",
        type: "low",
        label: "Low probability",
        tone: "border-[#786F5E]/25 bg-[#786F5E]/10 text-[#786F5E]",
    },
] as const;

export default function ResultsTable({ data }: ResultsTableProps) {
    if (!data || (data.results_high.length === 0 && data.results_moderate.length === 0 && data.results_low.length === 0)) {
        return <EmptyState />;
    }

    return (
        <div className="space-y-4">
            <div className="grid gap-2 sm:grid-cols-3">
                {probabilityGroups.map((group) => (
                    <div
                        key={group.key}
                        className={`rounded-xl border px-4 py-3 font-['Inter'] ${group.tone}`}
                    >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em]">
                            {group.label}
                        </p>
                        <p className="mt-1 text-2xl font-semibold leading-none">
                            {data[group.key].length}
                        </p>
                    </div>
                ))}
            </div>

            {probabilityGroups.map((group) => {
                const rows = data[group.key];

                if (rows.length === 0) return null;

                return (
                    <section key={group.key} className={wrapperClass}>
                        <div className={`border-b px-4 py-3 font-['Inter'] ${group.tone}`}>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em]">
                                {group.label}
                            </p>
                        </div>

                        <div className={scrollAreaClass}>
                            <table className="w-full table-fixed border-collapse">
                                <colgroup>
                                    <col className="w-[8%]" />
                                    <col className="w-[27%]" />
                                    <col className="w-[29%]" />
                                    <col className="w-[13%]" />
                                    <col className="w-[13%]" />
                                    <col className="w-[10%]" />
                                </colgroup>
                                <thead className={theadRowClass}>
                                    <tr>
                                        {columns.map((col) => (
                                            <th key={col.label} className={`${thClass} ${col.align}`}>
                                                {col.label}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row, index) => (
                                        <TableRow
                                            key={`${group.key}-${row.id}`}
                                            rank={index + 1}
                                            row={row}
                                            type={group.type}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
