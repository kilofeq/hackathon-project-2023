import { ButtonProps } from "@/types/ButtonProps";
import { PropsWithChildren } from "react";

export const ButtonComponent = ({
	handleClick,
	color,
	children,
}: PropsWithChildren<ButtonProps>) => {
	return (
		<button
			onClick={handleClick}
			className="w-[270px] h-[68px] px-[99px] py-[22px] bg-red-700 rounded-[69px] shadow gap-2.5 absolute -translate-x-1/2 left-1/2"
			style={ { backgroundColor: color } }
		>
			<div className="text-white text-xl font-['SF Pro']">
				{ children }
			</div>
		</button>
	)
}
