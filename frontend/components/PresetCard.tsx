import Image from "next/image";

interface PresetCardProps {
  title: string;
  description: string;
  image: string;
}

export default function PresetCard({
  title,
  description,
  image,
}: PresetCardProps) {
  return (
    <div className="w-[413px] h-[188px] flex flex-col items-center justify-center bg-[#2a3038] border-[0.5px] border-solid border-[#67b68b] relative cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(103,182,139,0.4)] hover:border-[#4ade80]">
      <div className="flex w-[35px] h-[33px] items-center justify-center absolute top-[50px] rounded-[2.92px] border border-solid border-[#67b68b] transition-all duration-300 group-hover:border-[#4ade80]">
        <Image
          className="relative max-w-[18px] max-h-[18px] w-auto h-auto transition-transform duration-300 hover:scale-110"
          alt="Vector"
          src={image}
          width={18}
          height={18}
        />
      </div>
      <p className="font-menlo font-normal text-neutral-100 text-[17px] text-center tracking-widest leading-[20px] mt-8 px-8 transition-colors duration-300 hover:text-[#4ade80]">
        {title}
        <br />
        {description}
      </p>
    </div>
  );
}
