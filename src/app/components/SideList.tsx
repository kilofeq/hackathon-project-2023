import { Dispatch, SetStateAction, useState } from "react";
import { IReport, StateConfig } from "@/types/util.types";
import classNames from "classnames";
import SingleSideList from "@/app/components/SingleSideList";
import { ArrowIcon } from "@/assets/ArrowIcon";
import Modal from "@/app/components/Modal/Modal";
import { animalToAnimalEmojiDictionary, animalToAnimalNameDictionary } from "@/types/dictionaries";
import ReportProfile from "@/app/components/ReportProfile/ReportProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

enum Tab {
	ALL_REPORTS = "Wszystkie raporty",
	DANGER_REPORTS = "Niebezpieczne",
}

type Props = {
	reports: IReport[][]
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

function SideList({ reports, isOpen, setIsOpen }: Props) {

	const [ currentTab, setCurrentTab ] = useState(Tab.ALL_REPORTS);
	const [ currentReport, setCurrentReport ] = useState<StateConfig<IReport>>({
		value: null,
		isOpen: false,
	})

	const getReports = () => {
		if (currentTab === Tab.ALL_REPORTS) return reports;
		return reports.map(reports => reports.filter(report => report.danger))
	}

	return (
		<>
			<div className={ classNames(
				"w-full sm:w-1/2 sm:max-w-md absolute left-0 z-20 bg-white transition-all duration-300 h-full shadow-lg",
				{ "left-[-100%]": !isOpen }
			) }>
				<button
					className="sm:hidden absolute top-2 right-2 w-10 h-10 bg-red-800 rounded-lg"
					onClick={ () => setIsOpen(false) }
				>
					<FontAwesomeIcon
						icon={faX}
						color="white"
					/>
				</button>
				<button
					className="hidden sm:block absolute top-0 right-0 w-12 h-12 bg-red-800 -mr-12 rounded-ee-lg"
					onClick={ () => setIsOpen(false) }
				>
					<FontAwesomeIcon
						icon={faX}
						color="white"
					/>
				</button>
				<div className="flex space-x-1 bg-red-900/20 p-2 sm:p-1 gap-1">
					<div
						onClick={ () => setCurrentTab(Tab.ALL_REPORTS) }
						className={
							classNames(
								'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-red-700 p-2 cursor-pointer',
								'ring-white ring-opacity-60 ring-offset-2 ring-offset-red-400 focus:outline-none focus:ring-2',
								"flex items-center justify-center",
								currentTab === Tab.ALL_REPORTS
									? 'bg-white shadow'
									: 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
							)
						}
					>
						{ Tab.ALL_REPORTS }
					</div>
					<div
						onClick={ () => setCurrentTab(Tab.DANGER_REPORTS) }
						className={
							classNames(
								'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-red-700 p-2 cursor-pointer',
								'ring-white ring-opacity-60 ring-offset-2 ring-offset-red-400 focus:outline-none focus:ring-2',
								"flex items-center justify-center",
								currentTab === Tab.DANGER_REPORTS
									? 'bg-white shadow'
									: 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
							)
						}
					>
						{ Tab.DANGER_REPORTS }
					</div>
				</div>
				<div className="flex flex-col overflow-y-auto max-h-[93vh]">
					{
						getReports().map(reports => reports.map(report =>
							<>
								<SingleSideList report={ report } onClick={ report => setCurrentReport({ isOpen: true, value: report }) }/>
								<hr/>
							</>
						))
					}
				</div>
			</div>
			{
				currentReport.value &&
                <Modal
                    isOpen={ currentReport.isOpen }
                    setIsOpen={ () => setCurrentReport(prevState => ({ ...prevState, isOpen: false })) }
                    title={
						<div className="flex gap-4 items-center">
							<span>
								{ `Zgłoszenie: ${ animalToAnimalEmojiDictionary[ currentReport.value.animal ] } ${ animalToAnimalNameDictionary[ currentReport.value.animal ] }` }
							</span>
							{
								currentReport.value.danger &&
                                <div className="bg-red-300 text-red-700 border-red-700 text-[7px] px-2 py-1 animate-ping rounded-full w-[15px] h-[15px] flex items-center justify-center">
                                    ⚠️
                                </div>
							}
						</div>
					}
                >
                    <ReportProfile report={ currentReport.value }/>
                </Modal>
			}
		</>
	)
}

export default SideList;
