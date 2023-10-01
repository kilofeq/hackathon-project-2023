'use client';

import { MapComponent } from "@/app/components/MapComponent";
import { useEffect, useState } from "react";
import Modal from "@/app/components/Modal/Modal";
import { ButtonComponent } from "@/app/components/ButtonComponent";
import { Color, IReport, StateConfig } from "@/types/util.types";
import { IconButton } from "@/app/components/IconButton";
import { MenuIcon } from "@/assets/menuIcon";
import { FilterIcon } from "@/assets/filterIcon";
import AddReportForm from "@/app/components/AddReport.form";
import { auth } from "../helpers/firebase";
import { User } from "@firebase/auth";
import LoginForm from "../components/LoginForm";
import axios from "axios";
import ReportProfile from "@/app/components/ReportProfile/ReportProfile";
import { animalToAnimalEmojiDictionary, animalToAnimalNameDictionary } from "@/types/dictionaries";

const MapPage = () => {
    const [user, setUser] = useState<User | null>(null)
    const [ isAddReportDialogOpen, setAddReportDialogOpen ] = useState(false);
    const [userLocalization, setUserLocalization] = useState({ lat: 0, lng: 0 });
    const [groupedReports, setGroupedReports] = useState<IReport[][]>([])
    const [loading, setLoading] = useState(true)


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((loc) => {
      setUserLocalization({ lat: loc.coords.latitude, lng: loc.coords.longitude });
    });
  }, []);

	const fetchReports = () => {
		axios.get("/api/fetch-reports").then(r => {
      setGroupedReports(r.data)
    }).finally(() => {
      setLoading(false)
    })
	}

  useEffect(() => {
    fetchReports()
  }, []);

	const [ addReportModal, setAddReportModal ] = useState<StateConfig<IReport>>({
		isOpen: false,
		value: null,
	})

	useEffect(() => {
		return auth.onAuthStateChanged((user) => {
			setUser(user ?? null)
		})
	}, [])

	return (
		<>
			<div className='relative h-screen w-screen'>
				<IconButton style={"left-5 top-5 bg-white"}>
					<MenuIcon/>
				</IconButton>
				<IconButton style={"right-5 top-5 bg-sky-950"}>
					<FilterIcon/>
				</IconButton>
				<MapComponent
						groupedReports={groupedReports}
						loading={loading}
						userLocalization={userLocalization}
						onMapPinClick={ report => setAddReportModal({ isOpen: true, value: report }) }
				/>
				<ButtonComponent
					handleClick={ () => setAddReportDialogOpen(true) }
					color={ Color.RED }
					className="bottom-5 px-[99px] py-[22px] absolute -translate-x-1/2 left-1/2"
				>
					Zgłoś
				</ButtonComponent>
			</div>
			{
				addReportModal.value &&
                <Modal
					isOpen={ addReportModal.isOpen }
					setIsOpen={ () => setAddReportModal(prevState => ({ ...prevState, isOpen: !prevState.isOpen })) }
					title={ `Zgłoszenie: ${ animalToAnimalEmojiDictionary[ addReportModal.value.animal ] } ${ animalToAnimalNameDictionary[ addReportModal.value.animal ] }` }
				>
                    <ReportProfile report={ addReportModal.value }/>
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
		</>
	)
}

export default MapPage;
