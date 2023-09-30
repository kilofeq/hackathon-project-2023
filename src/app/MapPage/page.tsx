"use client";

import { MapComponent } from "@/app/components/MapComponent/MapComponent";
import { useState } from "react";
import Modal from "@/app/components/Modal/Modal";
import { ButtonComponent } from "@/app/components/ButtonComponent/ButtonComponent";
import { Color } from "@/types/util.types";
import { IconButton } from "@/app/components/IconButton/IconButton";
import { MenuIcon } from "@/assets/menuIcon";
import { FilterIcon } from "@/assets/filterIcon";

const MapPage = () => {

    const [ isAddReportDialogOpen, toggleAddReportDialogOpen ] = useState(false);

    return (
        <>
            <div className='relative h-screen w-screen'>
              <IconButton style={"left-5 top-5 bg-white"}>
                <MenuIcon/>
              </IconButton>
              <IconButton style={"right-5 top-5 bg-sky-950"}>
                <FilterIcon/>
              </IconButton>
                <MapComponent/>
                <ButtonComponent
                    handleClick={ () => toggleAddReportDialogOpen(true) }
                    color={ Color.RED }
                    className="bottom-5 px-[99px] py-[22px]"
                >
                    Zgłoś
                </ButtonComponent>
            </div>
            <Modal
                isOpen={ isAddReportDialogOpen }
                setIsOpen={ () => toggleAddReportDialogOpen(isOpen => !isOpen) }
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

export default MapPage
