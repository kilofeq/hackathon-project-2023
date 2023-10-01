import { IReport } from "@/types/util.types";
import { PhotoContainer } from "@/app/components/PhotoContainer";
import {fromLatLng} from "react-geocode";
import {useEffect, useState} from "react";

type Props = {
	report: IReport
}

function ReportProfile({
	report: {
		photos,
    latitude,
    longitude
	}
}: Props) {
  const [animalGeocoding, setAnimalGeocoding] = useState('')

  useEffect(() => {
    fromLatLng(latitude, longitude)
      .then(results => {
        setAnimalGeocoding(results.results[0].formatted_address)
      })
  }, []);



	return (
		<div className="flex flex-col gap-6 px-4">
			{ photos && <PhotoContainer images={ photos }/> }
      <div>
        <p
          className="text-sm font-semibold text-gray-800"
        >
          LOKALIZACJA
        </p>
        <p className='text-xs font-light text-gray-600'>{animalGeocoding}</p>
      </div>
		</div>
	);
}

export default ReportProfile;
