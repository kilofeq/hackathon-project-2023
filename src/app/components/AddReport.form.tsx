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
import useLocation from "@/app/hooks/useLocation";
import axios from "axios";
import { useState } from "react";
import { auth } from "../helpers/firebase";

export type AddReportFormType = {
	name: string
	animalType: Nullable<Animal>
	imagesUrls: string[]
}

type Props = {
	className?: string
	onSuccess?: () => void
}

const AddReportForm = ({
	className = "",
	onSuccess,
}: Props) => {

	const { lat, lng } = useLocation();

	const [ isAddingMarker, setIsAddingMarker ] = useState(false);

	const formik = useFormik<AddReportFormType>({
		initialValues: {
			name: "",
			animalType: null,
			imagesUrls: [],
		},
		onSubmit: async values => {
			const token = await auth.currentUser?.getIdToken()
			setIsAddingMarker(true);
			axios.post("/api/create-report", {
				name: values.name,
				photos: values.imagesUrls,
				latitude: lat,
				longitude: lng,
				animal: values.animalType,
				danger: false,
			}, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			}).then(() => {
				setIsAddingMarker(false);
				if (onSuccess) onSuccess();
			})
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
						isLoading={ isAddingMarker }
					>
						Dodaj zgłoszenie
					</ButtonComponent>
				</div>
			</form>
		</div>
	)
};

export default AddReportForm;
