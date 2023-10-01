'use client';

import { MapComponent } from "@/app/components/MapComponent";
import { useEffect, useState } from "react";
import Modal from "@/app/components/Modal/Modal";
import { ButtonComponent } from "@/app/components/ButtonComponent";
import { Color } from "@/types/util.types";
import { IconButton } from "@/app/components/IconButton";
import { MenuIcon } from "@/assets/menuIcon";
import { FilterIcon } from "@/assets/filterIcon";
import { PhotoContainer } from "@/app/components/PhotoContainer";
import AddReportForm from "@/app/components/AddReport.form";
import {IReport} from "@/types/util.types";
import { auth } from "../helpers/firebase";
import { User } from "@firebase/auth";
import LoginForm from "../components/LoginForm";
import axios from "axios";

const MapPage = () => {
    const [user, setUser] = useState<User | null>(null)
    const [ isAddReportDialogOpen, setAddReportDialogOpen ] = useState(false);
    const [ isReportOpen, setReportOpen ] = useState(false);
    const [currentReport, setCurrentReport] = useState<IReport | null>(null);
    const [userLocalization, setUserLocalization] = useState({ lat: 0, lng: 0 });
    const [reports, setReports] = useState<IReport[]>([])
    const [loading, setLoading] = useState(true)


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((loc) => {
      setUserLocalization({ lat: loc.coords.latitude, lng: loc.coords.longitude });
    });
  }, []);

  useEffect(() => {
    axios.get("/api/fetch-reports").then(r => {
      setReports(r.data)
    }).finally(() => {
      setLoading(false)
    })
  }, []);

    const handleClick = (report: any) => {
      setCurrentReport(report)
      setReportOpen(true)
    }
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
                <MapComponent loading={loading} reports={reports} userLocalization={userLocalization} onMapPinClick={handleClick}/>
                <ButtonComponent
                    handleClick={ () => setAddReportDialogOpen(true) }
                    color={ Color.RED }
                    className="bottom-5 px-[99px] py-[22px]"
                >
                    Zgłoś
                </ButtonComponent>
            </div>
          <Modal isOpen={isReportOpen} setIsOpen={() => setReportOpen(prevState => !prevState)} title={currentReport?.name}>
            <PhotoContainer images={currentReport?.photos}/>
          </Modal>
            <Modal
                isOpen={ isAddReportDialogOpen }
                setIsOpen={ () => setAddReportDialogOpen(isOpen => !isOpen) }
                title={user ? "Dodaj zgłoszenie" : "Zaloguj się by dodać zgłoszenie"}
            >
                {user ? (
                    <AddReportForm className="px-4" reports={reports} onSuccess={ () => setAddReportDialogOpen(false) }/>
                ) : (
                    <LoginForm className="px-4" />
                )}
            </Modal>
        </>
    )
}

export default MapPage;
