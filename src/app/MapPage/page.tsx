'use client';

import { MapComponent } from "@/app/components/MapComponent";
import { useState } from "react";
import Modal from "@/app/components/Modal/Modal";
import { ButtonComponent } from "@/app/components/ButtonComponent";
import { Color } from "@/types/util.types";
import { IconButton } from "@/app/components/IconButton";
import { MenuIcon } from "@/assets/menuIcon";
import { FilterIcon } from "@/assets/filterIcon";
import {PhotoContainer} from "@/app/components/PhotoContainer";

const MapPage = () => {

    const [ isAddReportDialogOpen, setAddReportDialogOpen ] = useState(false);
    const [ isReportOpen, setReportOpen ] = useState(false);
    const [currentReport, setCurrentReport] = useState({})

    const handleClick = (report: any) => {
      setCurrentReport(report)
      setReportOpen(true)
    }
    return (
        <>
            <div className='relative h-screen w-screen'>
              <IconButton style={"left-5 top-5 bg-white"}>
                <MenuIcon/>
              </IconButton>
              <IconButton style={"right-5 top-5 bg-sky-950"}>
                <FilterIcon/>
              </IconButton>
                <MapComponent onMapPinClick={handleClick}/>
                <ButtonComponent
                    handleClick={ () => setAddReportDialogOpen(true) }
                    color={ Color.RED }
                    className="bottom-5 px-[99px] py-[22px]"
                >
                    Zgłoś
                </ButtonComponent>
            </div>
          <Modal isOpen={isReportOpen} setIsOpen={() => setReportOpen(prevState => !prevState)} title={currentReport.name}>
            <PhotoContainer images={currentReport.photos}/>
          </Modal>
            <Modal
                isOpen={ isAddReportDialogOpen }
                setIsOpen={ () => setAddReportDialogOpen(isOpen => !isOpen) }
                title="Dodaj zgłoszenie"
                button={ {
                    color: Color.RED,
                    text: "Dodaj zgłoszenie",
                } }
            >
                <p>Content</p>
            </Modal>
        </>
    )
}

export default MapPage;
