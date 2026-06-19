export default function EmptyState() {
    return (
        <div className="rounded-2xl border border-dashed border-[#E4DFD3] bg-white px-6 py-12 text-center">
            <p className="font-['Fraunces'] text-lg font-semibold text-[#14213D]">
                No results yet
            </p>
            <p className="mt-1 font-['Inter'] text-sm text-[#786F5E]">
                Enter your ranks and run a prediction to see matching colleges here.
            </p>
        </div>
    );
}