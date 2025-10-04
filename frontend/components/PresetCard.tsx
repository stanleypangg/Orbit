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
    <div className="w-[413px] h-[188px] flex px-[52px] py-[50px] items-start bg-[#2a3038] border-[0.5px] border-solid border-[#67b68b]">
      <div className="w-[308px] ml-px flex items-center justify-center">
        <div className="h-[87px] ml-0.5 w-[310px] relative">
          <p className="absolute top-[calc(50.00%_+_4px)] left-[calc(50.00%_-_155px)] h-10 flex items-center justify-center [font-family:'Menlo-Regular',Helvetica] font-normal text-neutral-100 text-[17px] text-center tracking-[0] leading-5">
            {title}
            <br />
            {description}
          </p>

          <div className="flex w-[35px] h-[33px] items-center justify-center gap-[5.83px] pt-[4.38px] pb-[2.92px] px-[5.83px] absolute top-0 left-[calc(50.00%_-_19px)] rounded-[2.92px] border border-solid border-[#67b68b]">
            <Image
              className="relative w-[16.4px] h-[10.99px]"
              alt="Vector"
              src={image}
              width={16}
              height={11}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
