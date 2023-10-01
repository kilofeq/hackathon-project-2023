import { PhotoContainer } from "@/app/components/PhotoContainer";
import { IReport } from "@/types/util.types";
import { useEffect, useState } from "react";
import { fromLatLng } from "react-geocode";

type Props = {
	report: IReport
}

function ReportProfile({
	report: {
		photos,
    latitude,
    longitude,
    description,
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
		<div className="flex flex-col gap-6 px-4 pb-3">
			{ photos && <PhotoContainer images={ photos }/> }
      {description && (
        <div>
          <p
            className="text-sm font-semibold text-gray-800"
          >
            ZNAKI SZCZEGÓLNE
          </p>
          <p className='text-xs font-light text-gray-600'>{description}</p>
        </div>
      )}
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
