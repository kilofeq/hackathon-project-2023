import { ButtonProps } from "@/types/ButtonProps";
import { PropsWithChildren } from "react";
import classNames from "classnames";
import { Color } from "@/types/util.types";
import { PropagateLoader } from "react-spinners";

export const ButtonComponent = ({
	handleClick,
	color,
	children,
	className = "",
	disabled = false,
	submit = false,
	isLoading = false,
}: PropsWithChildren<ButtonProps>) => {
	return (
		<button
			onClick={ !disabled ? handleClick : undefined }
			className={ classNames([ "h-[55px] bg-red-700 rounded-[70px] shadow gap-2.5 flex items-center justify-center", className]) }
			style={ { backgroundColor: !disabled ? color : Color.GRAY } }
			type={ submit ? "submit" : "button" }
			disabled={disabled || isLoading}
		>
			{
				isLoading
					?
					<PropagateLoader size={ 8 } color="#fff" className=" transform translate-y-[-3px]"/>
					:
					<div className="text-white text-xl">
						{ children }
					</div>
			}
		</button>
	)
}
