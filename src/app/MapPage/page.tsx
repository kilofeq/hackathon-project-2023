"use client";

import { MapComponent } from "@/app/components/MapComponent/MapComponent";
import { useState } from "react";
import Modal from "@/app/components/Modal/Modal";
import { ButtonComponent } from "@/app/components/ButtonComponent/ButtonComponent";
import { Color } from "@/types/util.types";
import {IconButton} from "@/app/components/IconButton/IconButton";
import {MenuIcon} from "@/assets/menuIcon";
import {FilterIcon} from "@/assets/filterIcon";

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
                    position={'bottom-5'}
                >
                    Zgłoś
                </ButtonComponent>
            </div>
            <Modal
                isOpen={ isAddReportDialogOpen }
                setIsOpen={ () => toggleAddReportDialogOpen(isOpen => !isOpen) }
                title="Title"
                button={ {
                    color: Color.RED,
                    text: "Test",
                } }
            >
                <p>Content</p>
            </Modal>
        </>
    )
}

export default MapPage
