import React, { ChangeEvent } from "react";

type Option = {
	value: string
	label: string
}

type Props = {
	options: Option[]
	name: string
	label?: string
	error?: string
	value: any
	handleChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

function SelectComponent({
	options,
	name,
	label,
	value,
	handleChange,
}: Props) {

	return (
		<div className="flex flex-col gap-1">
			{label && (
				<label
					className="text-xs uppercase font-semibold mb-0.5"
					htmlFor={ name }
				>
					{label}
				</label>
			)}
			<select
				value={ value }
				name={ name }
				onChange={ handleChange }
				className="text-neutral-800 text-sm uppercase font-semibold h-14 px-4 py-3 rounded-xl items-center bg-zinc-100 outline-none appearance-none"
			>
				{ options.map(({ value, label }, index) => (<option key={ index } value={ value }>{ label }</option>)) }
			</select>
		</div>
	);
}

export default SelectComponent;