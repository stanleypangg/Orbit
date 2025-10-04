import Image from "next/image";

interface ESGImpactProps {
  co2EmissionsAvoided: number;
  waterSaved: number;
  sustainabilityScore: number;
}

export default function ESGImpact({
  co2EmissionsAvoided,
  waterSaved,
  sustainabilityScore,
}: ESGImpactProps) {
  return (
    <div className="bg-[#232937] border border-[#3a4560] p-6 h-full flex flex-col">
      <h3 className="text-[#4ade80] text-lg font-semibold mb-6 uppercase tracking-wide">
        Environmental Impact
      </h3>

      <div className="space-y-6 flex-1">
        {/* CO2 Emissions Avoided */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-[#2A3142] border border-[#4ade80] flex items-center justify-center shrink-0">
            <span className="text-[#4ade80] text-xl">&gt;</span>
          </div>
          <div className="flex-1">
            <div className="text-white text-2xl font-bold mb-1">
              {co2EmissionsAvoided}{" "}
              <span className="text-base font-normal text-gray-400">KG</span>
            </div>
            <div className="text-gray-400 text-sm">CO2 Emissions Avoided</div>
          </div>
        </div>

        {/* Water Saved */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-[#2A3142] border border-[#4ade80] flex items-center justify-center shrink-0">
            <span className="text-[#4ade80] text-xl">◇</span>
          </div>
          <div className="flex-1">
            <div className="text-white text-2xl font-bold mb-1">
              {waterSaved}{" "}
              <span className="text-base font-normal text-gray-400">L</span>
            </div>
            <div className="text-gray-400 text-sm">Water Saved</div>
          </div>
        </div>
      </div>

      {/* Sustainability Score */}
      <div className="mt-6 pt-6 border-t border-[#3a4560]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm">Sustainability Score</span>
          <span className="text-white font-semibold">
            {sustainabilityScore}/100
          </span>
        </div>
        <div className="w-full bg-[#2A3142] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#4ade80] h-full transition-all duration-500"
            style={{ width: `${sustainabilityScore}%` }}
          />
        </div>
      </div>
    </div>
  );
}
