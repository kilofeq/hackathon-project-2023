import { Dialog, Transition } from "@headlessui/react";
import { Fragment, PropsWithChildren, ReactNode } from "react";
import { XIcon } from "@/assets/xIcon";

type Props = {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	title: ReactNode
}

export default function Modal({
	isOpen,
	setIsOpen,
	title,
	children,
}: PropsWithChildren<Props>) {

	function closeModal() {
		setIsOpen(false)
	}

	return (
		<Transition appear show={ isOpen } as={ Fragment }>
			<Dialog as="div" className="relative z-50" onClose={ closeModal }>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-70" />
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
							<Dialog.Panel className="w-full z-50 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all px-0 pb-[90px]">
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
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}
