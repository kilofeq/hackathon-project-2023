import {ButtonProps} from "@/types/ButtonProps";

export const MapButton = ({handleClick, text}: ButtonProps) => {
  return (
    <button onClick={handleClick} className="w-[270px] h-[68px] px-[99px] py-[22px] bg-red-700 rounded-[69px] shadow gap-2.5 absolute -translate-x-1/2 left-1/2">
      <div className="text-white text-xl font-['SF Pro']">{text}</div>
    </button>
  )
}
