import { Dialog, Transition } from "@headlessui/react";
import { Fragment, PropsWithChildren, ReactNode } from "react";
import { XIcon } from "@/assets/xIcon";

type Props = {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	title: ReactNode,
	created_at?: string
}

export default function Modal({
	isOpen,
	setIsOpen,
	title,
	children,
	created_at
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
							<Dialog.Panel className="w-full z-50 max-w-md transform overflow-hidden rounded-3xl bg-white p-6 text-left align-middle shadow-xl transition-all px-0">
									<Dialog.Title
										as="h3"
										className="text-gray-900 text-base uppercase font-semibold pb-4 flex items-center justify-between pl-4 pr-5"
									>
										{ title }
										<XIcon onClick={ closeModal } className="cursor-pointer"/>
									</Dialog.Title>
									<p className='text-xs -mt-3 ml-4'>{created_at}</p>
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
