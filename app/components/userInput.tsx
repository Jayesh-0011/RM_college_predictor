"use client";
import { useState } from "react";
import type { UserInputs, Category, Gender } from "../../lib/variables";
import type { CollegePrediction } from "../../lib/types";
import predictor from "../api/predictor";
import ResultsTable from "./resultsTable";

const categories: Category[] = [
    "OPEN",
    "OPEN (PwD)",
    "EWS",
    "EWS (PwD)",
    "OBC-NCL",
    "OBC-NCL (PwD)",
    "SC",
    "SC (PwD)",
    "ST",
    "ST (PwD)",
];

const genders: Gender[] = [
    "Gender-Neutral",
    "Female-only (including Supernumerary)",
];

type ExamScope = "mains" | "mains-advanced";

const inputClass =
    "w-full rounded-xl border border-[#E4DFD3] bg-white px-4 py-2.5 text-[#14213D] placeholder:text-[#A39C8C] font-['Inter'] text-sm focus:outline-none focus:ring-2 focus:ring-[#C08A28]/35 focus:border-[#C08A28] transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

const labelClass =
    "mb-1.5 block font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.12em] text-[#786F5E]";

const selectClass =
    "w-full appearance-none rounded-xl border border-[#E4DFD3] bg-white px-4 py-2.5 text-[#14213D] font-['Inter'] text-sm focus:outline-none focus:ring-2 focus:ring-[#C08A28]/35 focus:border-[#C08A28] transition-colors";

export default function UserInputForm() {
    const [examScope, setExamScope] = useState<ExamScope>("mains");
    const [results_high, setResults_high] = useState<CollegePrediction[]>([]);
    const [results_moderate, setResults_moderate] = useState<CollegePrediction[]>([]);
    const [results_low, setResults_low] = useState<CollegePrediction[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState<UserInputs>({
        advanced_rank: 0,
        advanced_category_rank: 0,
        mains_rank: 0,
        mains_category_rank: 0,
        category: "OPEN",
        gender: "Gender-Neutral",
    });

    const handleCategoryChange = (category: Category) => {


        setFormData((prev) => ({
            ...prev,
            category,
            advanced_category_rank: category === "OPEN" ? prev.advanced_rank : 0,
            mains_category_rank: category === "OPEN" ? prev.mains_rank : 0,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.category === "OPEN") {
            handleCategoryChange("OPEN");
        }


        const payload: UserInputs =
            examScope === "mains"
                ? { ...formData, advanced_rank: 0, advanced_category_rank: 0 }
                : formData;

        setIsSubmitting(true);
        try {
            const { data } = await predictor(payload);
            setResults_high([
                ...(data.predicted_mains_data?.high ?? []),
                ...(data.predicted_advanced_data?.high ?? []),
            ]);
            setResults_moderate([
                ...(data.predicted_mains_data?.moderate ?? []),
                ...(data.predicted_advanced_data?.moderate ?? []),
            ]);
            setResults_low([
                ...(data.predicted_mains_data?.low ?? []),
                ...(data.predicted_advanced_data?.low ?? []),
            ]);
        } catch (error) {
            console.error("Error predicting colleges:", error);
            alert("An error occurred while predicting colleges. Please try again.");
        } finally {
            setIsSubmitting(false);
            console.log("Form submitted with data:", { results_high, results_moderate, results_low });
        }
    };

    const handleNumberChange = (
        key: "advanced_rank" | "advanced_category_rank" | "mains_category_rank",
        value: string
    ) => {
        setFormData((prev) => {
            if (value === "") return { ...prev, [key]: null };
            const num = Number(value);
            // Reject negatives (and anything non-numeric) — keep the last valid value instead.
            if (Number.isNaN(num) || num < 0) return { ...prev };
            return { ...prev, [key]: num };
        });
    };

    return (
        <div className="min-h-screen w-full bg-[#FAF7F2] px-4 py-6 sm:px-6 sm:py-12 lg:px-8">
            {/* For production, prefer next/font/google over this @import to avoid layout flash */}
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');`}</style>

            <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
                {/* ---- Form ---- */}
                <form
                    onSubmit={handleSubmit}
                    className="w-full rounded-2xl border border-[#E4DFD3] bg-white p-5 shadow-sm sm:p-8 lg:p-9"
                >
                    <p className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C08A28]">
                        JEE 2026 · India
                    </p>
                    <h2 className="mt-2 font-['Fraunces'] text-3xl font-semibold tracking-tight text-[#14213D] sm:text-4xl">
                        College Predictor
                    </h2>
                    <p className="mt-2 max-w-2xl font-['Inter'] text-sm leading-6 text-[#786F5E]">
                        Enter your ranks once — we&apos;ll match them against the latest closing ranks.
                    </p>

                    {/* Exam scope toggle */}
                    <div className="mt-7">
                        <span className={labelClass}>Which exams did you appear for?</span>
                        <div className="grid w-full grid-cols-1 gap-1 rounded-2xl border border-[#E4DFD3] bg-[#F4EFE4] p-1 sm:inline-grid sm:w-auto sm:grid-cols-2 sm:rounded-full">
                            <button
                                type="button"
                                onClick={() => setExamScope("mains")}
                                className={`rounded-full px-4 py-2 font-['Inter'] text-sm font-medium transition-colors ${examScope === "mains"
                                    ? "bg-[#14213D] text-white"
                                    : "text-[#786F5E] hover:text-[#14213D]"
                                    }`}
                            >
                                JEE Main only
                            </button>
                            <button
                                type="button"
                                onClick={() => setExamScope("mains-advanced")}
                                className={`rounded-full px-4 py-2 font-['Inter'] text-sm font-medium transition-colors ${examScope === "mains-advanced"
                                    ? "bg-[#14213D] text-white"
                                    : "text-[#786F5E] hover:text-[#14213D]"
                                    }`}
                            >
                                Main + Advanced
                            </button>
                        </div>
                    </div>

                    {/* Main exam section */}
                    <div className="mt-7 border-t border-[#E4DFD3] pt-7">
                        <p className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#14213D]">
                            Main exam
                        </p>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className={labelClass}>
                                    JEE Main rank <span className="text-[#C08A28]">*</span>
                                </label>
                                <input
                                    type="number"
                                    required
                                    min={1}
                                    placeholder="e.g. 12450"
                                    value={formData.mains_rank || ""}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData((prev) => {
                                            if (value === "") return { ...prev, mains_rank: 0 };
                                            const num = Number(value);
                                            if (Number.isNaN(num) || num < 0) return { ...prev };
                                            return { ...prev, mains_rank: num };
                                        });
                                        handleCategoryChange(formData.category);
                                    }}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Main category rank</label>
                                <input
                                    type="number"
                                    min={0}
                                    placeholder="4500"
                                    value={formData.mains_category_rank ?? ""}
                                    onChange={(e) =>
                                        handleNumberChange("mains_category_rank", e.target.value)
                                    }
                                    className={inputClass + " disabled:cursor-not-allowed disabled:bg-[#E4DFD3]/50"}
                                    disabled={formData.category === "OPEN"}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Advanced exam section */}
                    {examScope === "mains-advanced" && (
                        <div className="mt-7 border-t border-[#E4DFD3] pt-7">
                            <p className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#14213D]">
                                Advanced exam
                            </p>
                            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>JEE Advanced rank</label>
                                    <input
                                        type="number"
                                        min={0}
                                        placeholder="Optional"
                                        value={formData.advanced_rank ?? ""}
                                        onChange={(e) => {
                                            handleNumberChange("advanced_rank", e.target.value)
                                            handleCategoryChange(formData.category)
                                        }}
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>Advanced category rank</label>
                                    <input
                                        type="number"
                                        min={0}
                                        placeholder="5500"
                                        value={formData.advanced_category_rank ?? ""}
                                        onChange={(e) =>
                                            handleNumberChange("advanced_category_rank", e.target.value)
                                        }
                                        disabled={formData.category === "OPEN"}
                                        className={inputClass + " disabled:cursor-not-allowed disabled:bg-[#E4DFD3]/50"}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Profile section */}
                    <div className="mt-7 border-t border-[#E4DFD3] pt-7">
                        <p className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#14213D]">
                            Your profile
                        </p>
                        <div className="mt-4 grid gap-4">
                            <div>
                                <label className={labelClass}>Category</label>
                                <div className="relative">
                                    <select
                                        value={formData.category}
                                        onChange={(e) => {
                                            setFormData((prev) => ({
                                                ...prev,
                                                category: e.target.value as Category,
                                            }))
                                            handleCategoryChange(e.target.value as Category);
                                            // e.target.value === "OPEN" ? setCatDisabled(true) : setCatDisabled(false);
                                        }
                                        }
                                        className={selectClass}
                                    >
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                    <svg
                                        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#786F5E]"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                    >
                                        <path
                                            d="M5 7.5L10 12.5L15 7.5"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div>
                                <span className={labelClass}>Gender</span>
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    {genders.map((gender) => (
                                        <button
                                            key={gender}
                                            type="button"
                                            onClick={() =>
                                                setFormData((prev) => ({ ...prev, gender }))
                                            }
                                            className={`rounded-xl border px-4 py-2.5 text-left font-['Inter'] text-sm transition-colors ${formData.gender === gender
                                                ? "border-[#14213D] bg-[#14213D] text-white"
                                                : "border-[#E4DFD3] bg-white text-[#14213D] hover:border-[#C08A28]"
                                                }`}
                                        >
                                            {gender}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-8 w-full rounded-xl bg-[#14213D] py-3 font-['Inter'] text-sm font-semibold text-white transition-colors hover:bg-[#1c2d52] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? "Predicting…" : "Predict colleges"}
                    </button>
                </form>

                {/* ---- Results ---- */}
                <section className="w-full" aria-label="Prediction results">
                    <p className="mb-3 font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#14213D]">
                        {results_high.length + results_moderate.length + results_low.length > 0 ? `${results_high.length + results_moderate.length + results_low.length} matches` : "Results"}
                    </p>
                    <ResultsTable data={{ results_high, results_moderate, results_low }} />

                </section>
            </div>
        </div>
    );
}
