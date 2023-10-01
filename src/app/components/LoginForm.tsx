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
import { auth } from "../helpers/firebase";
import { useState } from "react";
import { signInWithEmailAndPassword } from "@firebase/auth";

type Props = {
	className?: string
}

const LoginForm = ({
	className = "",
}: Props) => {
	const [isLoading, setIsLoading] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className={
			classNames(
				"flex flex-col gap-[13px]",
				className
			)
		}>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-center space-y-6 pt-4"
			>
				<InputComponent
					className="max-w-sm w-full"
					name="email"
					type={InputType.TEXT}
					value={email}
					label="E-mail"
					handleChange={e => setEmail(e.target.value)}
				/>
				<InputComponent
					className="max-w-sm w-full"
					name="password"
					type={InputType.PASSWORD}
					value={password}
					label="Password"
					handleChange={e => setPassword(e.target.value)}
				/>
				<div className="px-4 pt-2 self-center">
					<ButtonComponent
						className="px-12"
						color={ Color.RED }
						submit
						isLoading={ isLoading }
					>
						Zaloguj się
					</ButtonComponent>
				</div>
			</form>
		</div>
	)
};

export default LoginForm;