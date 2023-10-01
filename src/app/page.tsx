'use client';

import AddReportForm from "@/app/components/AddReport.form";
import { ButtonComponent } from "@/app/components/ButtonComponent";
import { IconButton } from "@/app/components/IconButton";
import { MapComponent } from "@/app/components/MapComponent";
import Modal from "@/app/components/Modal/Modal";
import { useEffect, useState } from "react";
import { Color, IReport } from "@/types/util.types";
import { MenuIcon } from "@/assets/menuIcon";
import { FilterIcon } from "@/assets/filterIcon";
import { auth } from "./helpers/firebase";
import { User } from "@firebase/auth";
import LoginForm from "./components/LoginForm";
import axios from "axios";
import ReportProfile from "@/app/components/ReportProfile/ReportProfile";
import { animalToAnimalEmojiDictionary, animalToAnimalNameDictionary } from "@/types/dictionaries";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { OutputFormat, setDefaults } from "react-geocode";
import Switch from "react-switch";
import { Animal, animalValues } from "./api/enums/animalEnum";
import { toast } from "react-toastify";

const MapPage = () => {
	const [user, setUser] = useState<User | null>(null)
	const [ isAddReportDialogOpen, setAddReportDialogOpen ] = useState(false);
	const [userLocalization, setUserLocalization] = useState({ lat: 0, lng: 0 });
	const [groupedReports, setGroupedReports] = useState<IReport[][]>([])
	const [loading, setLoading] = useState(true)
	const [reportLoading, setReportLoading] = useState(false)
	const [filtersVisibility, setFiltersVisibility] = useState(false)
	const [animalFilters, setAnimalFilters] = useState<Animal[]>([])
	const [isDangerous, setIsDangerous] = useState(false)
	const [isSafe, setIsSafe] = useState(false)

  setDefaults({
    key: "AIzaSyBwgfFNNWpM4EfH_hA-Lfge3ltdyGteeQ4",
    language: "pl",
    region: "pl",
    outputFormat: OutputFormat.JSON
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((loc) => {
      setUserLocalization({ lat: loc.coords.latitude, lng: loc.coords.longitude });
    });
  }, []);

	const fetchReports = () => {
		axios.get("/api/fetch-reports", {
			headers: {
				'Cache-Control': 'no-cache'
			}
		}).then(r => {
      setGroupedReports(r.data)
    }).finally(() => {
      setLoading(false)
    })
	}

  useEffect(() => {
    fetchReports()
  }, []);

	const [currentReport, setCurrentReport] = useState<IReport | null>(null)

	useEffect(() => {
		return auth.onAuthStateChanged((user) => {
			setUser(user ?? null)
		})
	}, [])
	const handleOpenReport = async (report: IReport) => {
		try {
			setReportLoading(true)
			const {data} = await axios.post("/api/fetch-report", {
				id: report._id
			}, {
				headers: {
					'Cache-Control': 'no-cache'
				}
			})
			setCurrentReport(data)
		} catch (e) {
			console.error(e)
		} finally {
			setReportLoading(false)
		}
	}
	const filteredReports = groupedReports.map(group => group.filter(report => {
		if (animalFilters.length > 0 && !animalFilters.includes(report.animal)) {
			return false
		}
		if (isDangerous && !report.danger) {
			return false
		}
		if (isSafe && report.danger) {
			return false
		}
		return true
	})).filter(group => group.length > 0)
	useEffect(() => {
		setTimeout(() => toast.error('UWAGA DZIK 🚨 ODDAL SIĘ, NIE WYKONUJ GWAŁTOWNYCH RUCHÓW', {
			toastId: 'wild-boar',
		}), 10000)
	}, [])

	return (
		<>
			<div
				className='relative flex'
				style={{
					height: '100dvh',
					width: '100dvw'
				}}
			>
				{reportLoading && (
					<div
						className="fixed w-full h-full z-30 bg-black bg-opacity-50 flex items-center justify-center"
					>
						<FontAwesomeIcon
							className="animate-spin"
							icon={faSpinner}
							size="5x"
							color="white"
						/>
					</div>
				)}
				<SideList reports={ filteredReports }/>
				<div
					className="flex items-center justify-between absolute top-0 w-full p-5 z-10"
				>
					<IconButton style={"bg-white opacity-0"}>
						<MenuIcon/>
					</IconButton>
					<Image
						alt={"WHISTLE"}
						className="w-16 sm:w-20 z-50"
						src="./logo3.svg"
						width={300}
						height={100}
					/>
					<IconButton
						style={"bg-sky-950"}
						onClick={() => setFiltersVisibility(true)}
					>
						<FilterIcon/>
					</IconButton>
				</div>
				<MapComponent
					groupedReports={filteredReports}
					loading={loading}
					userLocalization={userLocalization}
					onMapPinClick={handleOpenReport}
				/>
				<IconButton
					style={"bg-red-700 bottom-5 right-5 absolute"}
					onClick={() => setAddReportDialogOpen(true)}
				>
					<PlusIcon/>
				</IconButton>
			</div>

			{
				currentReport &&
                <Modal
					isOpen
					setIsOpen={ () => setCurrentReport(null) }
					title={ `Zgłoszenie: ${ animalToAnimalEmojiDictionary[ currentReport.animal ] } ${ animalToAnimalNameDictionary[ currentReport.animal ] }` }
				>
                    <ReportProfile report={currentReport}/>
                </Modal>
			}
			<Modal
				isOpen={ isAddReportDialogOpen }
				setIsOpen={ () => setAddReportDialogOpen(isOpen => !isOpen) }
                title={user ? "Dodaj zgłoszenie" : "Zaloguj się by dodać zgłoszenie"}
			>
				{user ? (
					<AddReportForm className="px-4" onSuccess={ () => {
						setAddReportDialogOpen(false)
						fetchReports()
					} }/>
				) : (
					<LoginForm className="px-4" />
				)}
			</Modal>
			<Modal
				title="Filtry"
				isOpen={filtersVisibility}
				setIsOpen={setFiltersVisibility}
			>
				<div
					className="px-4 py-2 flex flex-col space-y-2.5"
				>
					{animalValues.map(animal => (
						<div
							key={`filter-${animal}`}
							className="flex items-center"
						>
							<Switch
								checked={animalFilters.includes(animal)}
								onChange={checked => setAnimalFilters(
									animalFilters => checked ? [...animalFilters, animal] : animalFilters.filter(a => a !== animal)
								)}
								height={29}
								width={48}
							/>
							<span
								className="text-2xl ml-4"
							>
									{animalToAnimalEmojiDictionary[animal]}
								</span>
								<span
									className="text-sm font-semibold ml-2 uppercase"
								>
									{animalToAnimalNameDictionary[animal]}
								</span>
							</div>
						))}
						<div
							className="flex items-center"
						>
							<Switch
								checked={isDangerous}
								onChange={setIsDangerous}
								height={29}
								width={48}
							/>
							<span
								className="text-2xl ml-4"
							>
								⛔️
							</span>
							<span
								className="text-sm font-semibold ml-2 uppercase"
							>
								Tylko niebezpieczne
							</span>
						</div>
						<div
							className="flex items-center"
						>
							<Switch
								checked={isSafe}
								onChange={setIsSafe}
								height={29}
								width={48}
							/>
							<span
								className="text-2xl ml-4"
							>
								✅
							</span>
							<span
								className="text-sm font-semibold ml-2 uppercase"
							>
								Niestwarzające zagrożenia
							</span>
					</div>
				</div>
			</Modal>
		</>
	)
}

export default MapPage;
