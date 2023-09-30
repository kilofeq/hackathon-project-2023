"use client";

import { useFormik } from "formik";
import { Animal } from "@/app/api/enums/animalEnum";
import { Color, InputType, Nullable } from "@/types/util.types";
import InputComponent from "@/app/components/InputComponent";
import classNames from "classnames";
import { ButtonComponent } from "@/app/components/ButtonComponent";
import { animalToAnimalNameDictionary } from "@/types/dictionaries";
import SelectComponent from "@/app/components/SelectComponent";
import ImageInput from "@/app/components/ImageInput";

export type AddReportFormType = {
	name: string
	animalType: Nullable<Animal>
	imagesUrls: string[]
}

type Props = {
	className?: string
}

const AddReportForm = ({
	className = "",
}: Props) => {

	const formik = useFormik<AddReportFormType>({
		initialValues: {
			name: "",
			animalType: null,
			imagesUrls: [],
		},
		onSubmit: values => {
			alert(JSON.stringify(values, null, 2));
		},
		validate: (values) => {
			console.log(values);
		}
	});

	const options: { label: string, value: string }[] = Object.values(Animal).map((animal) => ({
		value: animal,
		label: animalToAnimalNameDictionary[ animal ]
	}))

	return (
		<div className={
			classNames(
				"flex flex-col gap-[13px]",
				{ [ className ]: className }
			)
		}>
			<form
				onSubmit={ formik.handleSubmit }
				className="flex flex-col gap-[13px]"
			>
				<InputComponent
					name="name"
					type={ InputType.TEXT }
					value={ formik.values.name }
					label="Nazwa zgłoszenia"
					error={ formik.errors.name }
					handleChange={ formik.handleChange }
				/>
				<SelectComponent
					options={ options }
					name="animalType"
					value={ formik.values.animalType }
					handleChange={ formik.handleChange }
				/>
				<ImageInput onDataUrls={ urls => formik.setFieldValue("imagesUrls", urls) }/>
				<hr/>
				<div className="px-4 pt-6">
					<ButtonComponent
						color={ Color.RED }
						submit
					>
						Dodaj zgłoszenie
					</ButtonComponent>
				</div>
			</form>
		</div>
	)
};

export default AddReportForm;