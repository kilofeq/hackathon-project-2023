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
			{
				label &&
                <label htmlFor={ name }></label>
			}
			<select
				value={ value }
				name={ name }
				onChange={ handleChange }
				className="text-neutral-800 text-base font-normal h-14 p-4 rounded-xl items-center bg-zinc-100 outline-none appearance-none"
			>
				{ options.map(({ value, label }, index) => (<option key={ index } value={ value }>{ label }</option>)) }
			</select>
		</div>
	);
}

export default SelectComponent;