import {MapComponent} from "@/app/components/MapComponent/MapComponent";
import {MapButton} from "@/app/components/MapButton/MapButton";

const MapPage = () => {
  return (
    <div className='relative h-screen w-screen'>
      <MapComponent/>
      <MapButton text={'Zgłoś...'}/>
    </div>
  )
}

export default MapPage
