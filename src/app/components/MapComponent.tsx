'use client';

import GoogleMap from "google-maps-react-markers";
import { InfoMarker } from "@/assets/infoMarker";
import { WarningMarker } from "@/assets/warningMarker";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IReport } from "@/types/util.types";

export const MapComponent = (props: {onMapPinClick: (report: any) => void, groupedReports: IReport[][],loading: boolean, userLocalization: {lat: number, lng: number} }) => {

	if(!props.loading && (props.userLocalization.lat !== 0 && props.userLocalization.lng !== 0)) {
		return (
			<>
				<ToastContainer
					position="bottom-left"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
				<div className='w-screen h-screen'>
					<GoogleMap
						apiKey = "AIzaSyBwgfFNNWpM4EfH_hA-Lfge3ltdyGteeQ4"
						defaultCenter={{lat: props.userLocalization.lat, lng: props.userLocalization.lng}}
						defaultZoom={17}
						loadingContent={null}
						options={{
							fullscreenControl: false,
							rotateControl: false,
							panControl: false,
							zoomControl: false,
							streetViewControl: false,
							mapTypeControl: false,
							clickableIcons: false
						}}
					>
						{
							props.groupedReports?.map((reports: IReport[]) => {
								const report = reports[0]
								if (report.latitude && report.longitude) {
									return (
										// @ts-ignore
										<div onClick={() => props.onMapPinClick(report)} key={report._id} lat={report.latitude}
											 lng={report.longitude} className='-translate-y-full'>
											{report.danger ? <WarningMarker/> : <InfoMarker/>}
										</div>
									)
								}
							})
						}
					</GoogleMap>
				</div>
			</>
		)
	} else {
		return (
			<div className='h-screen w-screen flex justify-center items-center bg-sky-950 absolute top-0 left-0 z-50'>
				<ClipLoader
					loading={true}
					color={'white'}
					size={110}
				/>
			</div>
		)
	}
}
