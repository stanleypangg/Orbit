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
    <div className="w-[413px] h-[188px] flex flex-col items-center justify-center bg-[#2a3038] border-[0.5px] border-solid border-[#67b68b] relative">
      <div className="flex w-[35px] h-[33px] items-center justify-center absolute top-[50px] rounded-[2.92px] border border-solid border-[#67b68b]">
        <Image
          className="relative"
          alt="Vector"
          src={image}
          width={16}
          height={11}
        />
      </div>
      <p className="font-menlo font-normal text-neutral-100 text-[17px] text-center tracking-[0] leading-5 mt-8 px-8">
        {title}
        <br />
        {description}
      </p>
    </div>
  );
}
