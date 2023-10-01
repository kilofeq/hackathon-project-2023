"use client";

import { useFormik } from "formik";
import { Animal } from "@/app/api/enums/animalEnum";
import {Color, InputType} from "@/types/util.types";
import InputComponent from "@/app/components/InputComponent";
import classNames from "classnames";
import { ButtonComponent } from "@/app/components/ButtonComponent";
import { animalToAnimalEmojiDictionary, animalToAnimalNameDictionary } from "@/types/dictionaries";
import SelectComponent from "@/app/components/SelectComponent";
import ImageInput from "@/app/components/ImageInput";
import useLocation from "@/app/hooks/useLocation";
import axios from "axios";
import { useState } from "react";
import { auth } from "../helpers/firebase";
import { toast } from "react-toastify";

export type AddReportFormType = {
	animalType: Animal,
	imagesUrls: string[],
  danger: boolean
}

type Props = {
	className?: string
	onSuccess?: () => void
}

const AddReportForm = ({
	className = "",
	onSuccess,
}: Props) => {
	const options: { label: string, value: string }[] = Object.values(Animal).map((animal) => ({
		value: animal,
		label: `${animalToAnimalEmojiDictionary[animal]} ${animalToAnimalNameDictionary[animal]}`
	}))
	const { lat, lng } = useLocation();

	const [ isAddingMarker, setIsAddingMarker ] = useState(false);
  const formik = useFormik<AddReportFormType>({
		initialValues: {
			animalType: options[0].value as Animal,
			imagesUrls: [],
      danger: false
		},
		onSubmit: async values => {
			const token = await auth.currentUser?.getIdToken()
			setIsAddingMarker(true);
			axios.post("/api/create-report", {
				photos: values.imagesUrls,
				latitude: lat,
				longitude: lng,
				animal: values.animalType,
				danger: values.danger,
				firebaseUid: auth.currentUser?.uid
			}, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			}).then(() => {
				if (!onSuccess) return;
        onSuccess();
				toast(`${ animalToAnimalEmojiDictionary[ formik.values.animalType ] } Pomyślnie dodano zgłoszenie`)
			}).finally(() => {
				setIsAddingMarker(false);
			})
		},
		validateOnChange: true,
	});

	return (
		<div className={
			classNames(
				"flex flex-col gap-[13px] pt-4",
				className
			)
		}>
			<form
				onSubmit={ formik.handleSubmit }
				className="flex flex-col gap-[13px]"
			>
				<SelectComponent
					label="Jakie to zwierzę?"
					options={ options }
					name="animalType"
					value={ formik.values.animalType }
					handleChange={ formik.handleChange }
				/>
        <div className='flex gap-2 py-2'>
          <label htmlFor='danger' className='text-neutral-800 text-xs font-bold uppercase tracking-wide'>Czy sprawia zagrożenie?</label>
          <input className='w-4 h-4' name='danger' id='danger' type='checkbox' onChange={(e) => formik.setFieldValue('danger', e.target.checked)} checked={ formik.values.danger }/>
        </div>
				<ImageInput onDataUrls={ urls => formik.setFieldValue("imagesUrls", urls) }/>
				<hr/>
				<div className="px-4 pt-6 flex justify-center">
					<ButtonComponent
						className="px-12"
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
