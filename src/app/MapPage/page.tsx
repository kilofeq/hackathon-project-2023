'use client'

import { MapComponent } from "@/app/components/MapComponent/MapComponent";
import { MapButton } from "@/app/components/MapButton/MapButton";
import AddReportDialog from "@/app/components/AddReportDialog/AddReportDialog";
import { useState } from "react";
import Modal from "@/app/components/Modal/Modal";
import { ButtonComponent } from "@/app/components/Button/Button";
import { Color } from "@/types/util.types";

const MapPage = () => {

    const [ isAddReportDialogOpen, toggleAddReportDialogOpen ] = useState(false);

    return (
        <>
            <div className='relative h-screen w-screen'>
                <MapComponent/>
                <ButtonComponent
                    handleClick={ () => toggleAddReportDialogOpen(true) }
                    color={ Color.RED }
                >
                    Zgloś...
                </ButtonComponent>
            </div>
            <Modal
                isOpen={ isAddReportDialogOpen }
                setIsOpen={ () => toggleAddReportDialogOpen(isOpen => !isOpen) }
                title="Title"
                button{{
                    color: "red",
                    text: ""
                }}
            >
                <p>Content</p>
            </Modal>
        </>
    )
}

export default MapPage
