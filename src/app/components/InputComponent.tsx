import { InputType, Nullable } from "@/types/util.types";
import { ChangeEvent } from "react";

type Props = {
	name: string
	type: InputType
	value: string
	disabled?: boolean
	label?: string
	error?: Nullable<string>
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void
	placeholder?: string
	required?: boolean
}

const InputComponent = ({
	name,
	type,
	value,
	disabled,
	label,
	error,
	handleChange,
	placeholder,
	required,
}: Props) => {

	return (
		<div className="flex flex-col gap-1">
			{
				label &&
				<label
					htmlFor={ name }
					className="text-neutral-800 text-xs font-bold uppercase tracking-wide"
				>
					{ label }
				</label>
			}
			<input
				type={ type }
				value={ value }
				disabled={ disabled }
				name={ name }
				onChange={ handleChange }
				className="text-neutral-800 text-base font-normal h-12 p-4 rounded-xl items-center bg-zinc-100 outline-none"
				placeholder={ placeholder }
			/>
			{
				error &&
				<div className="text-red-400 text-sm font-normal">
					{ error }
				</div>
			}
		</div>
	)
}

export default InputComponent;