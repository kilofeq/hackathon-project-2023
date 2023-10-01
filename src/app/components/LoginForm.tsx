"use client";

import { Color, InputType, Nullable } from "@/types/util.types";
import InputComponent from "@/app/components/InputComponent";
import classNames from "classnames";
import { ButtonComponent } from "@/app/components/ButtonComponent";
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
	
	const handleLoginWithoutRegistration = async () => {
		try {
			await signInWithEmailAndPassword(auth, 'test@test.pl', '123123');
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
				className="flex flex-col space-y-6 pt-4"
			>
				<InputComponent
					className="max-w-md w-full"
					name="email"
					type={InputType.TEXT}
					placeholder={"test@test.pl"}
					value={email}
					label="E-mail"
					handleChange={e => setEmail(e.target.value)}
				/>
				<InputComponent
					className="max-w-md w-full"
					name="password"
					placeholder={"********"}
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
						Zarejestruj się
					</ButtonComponent>
				</div>
				<div
					className={'w-full h-px bg-neutral-200 my-12'}
				/>
				<div className="px-4 pb-4 pt-2 self-center">
					<a
						className="text-blue-600 font-bold underline cursor-pointer hover:opacity-70 duration-100"
						onClick={handleLoginWithoutRegistration}
					>
						Zaloguj się bez rejestracji (Na potrzeby demo)
					</a>
				</div>
			</form>
		</div>
	)
};

export default LoginForm;
