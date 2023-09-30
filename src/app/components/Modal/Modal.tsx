import { Dialog, Transition } from "@headlessui/react";
import { Fragment, MouseEvent, PropsWithChildren, ReactNode } from "react";
import { ButtonComponent } from "@/app/components/ButtonComponent";
import { Color } from "@/types/util.types";
import { XIcon } from "@/assets/xIcon";
import classNames from "classnames";

type ButtonConfig = {
	color: Color
	text: string
	onClick?: (e?: MouseEvent<HTMLElement>) => void
}

type Props = {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	title: ReactNode
	button?: ButtonConfig
}

export default function Modal({
	isOpen,
	setIsOpen,
	title,
	children,
	button,
}: PropsWithChildren<Props>) {

	function closeModal() {
		setIsOpen(false)
	}

	return (
		<Transition appear show={ isOpen } as={ Fragment }>
			<Dialog as="div" className="relative z-10" onClose={ closeModal }>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className={
								classNames(
									"w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all px-0 pb-[90px]",
										{ "pb-0": !button }
									)
							}>
								<Dialog.Title
									as="h3"
									className="text-gray-900 text-lg font-medium pb-[27px] flex items-center justify-between px-4"
								>
									{ title }
									<XIcon onClick={ closeModal } className="cursor-pointer"/>
								</Dialog.Title>
								<hr/>
								<div className="py-2">
									{ children }
								</div>
								{
									button &&
									<>
                                        <hr/>
										<div className="px-4 pt-6">
                                            <ButtonComponent
                                                color={ Color.RED }
                                                handleClick={ button?.onClick }
                                            >
												{ button.text }
                                            </ButtonComponent>
										</div>
									</>
								}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}
