import { ButtonProps } from "@/types/ButtonProps";
import { PropsWithChildren } from "react";
import classNames from "classnames";
import { Color } from "@/types/util.types";

export const ButtonComponent = ({
	handleClick,
	color,
	children,
	className = "",
	disabled = false,
	submit = false,
}: PropsWithChildren<ButtonProps>) => {
	return (
		<button
			onClick={ !disabled ? handleClick : undefined }
			className={ classNames([ "w-[270px] h-[68px] bg-red-700 rounded-[69px] shadow gap-2.5 absolute -translate-x-1/2 left-1/2", className]) }
			style={ { backgroundColor: !disabled ? color : Color.GRAY } }
			type={ submit ? "submit" : "button" }
		>
			<div className="text-white text-xl font-['SF Pro']">
				{ children }
			</div>
		</button>
	)
}
