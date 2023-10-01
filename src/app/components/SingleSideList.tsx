import { IReport } from "@/types/util.types";
import { animalToAnimalEmojiDictionary } from "@/types/dictionaries";
import { PhotoContainer } from "./PhotoContainer";

type Props = {
	report: IReport
	onClick: (report: IReport) => void
}

function SingleSideList({ report, onClick }: Props) {

	const MAX_DESC = 100;

	const getDescription = () => {
		if (report.description.length > MAX_DESC) {
			return `${ report.description.substring(0, MAX_DESC) }...`;
		}
		return report.description
	}
	return (
		<div className="flex items-center gap-2 w-full px-3 py-2" onClick={ () => onClick(report) }>
			<div className="text-[50px]">
				{ animalToAnimalEmojiDictionary[ report.animal ] }
			</div>
			{ report.photos && <PhotoContainer images={ report.photos }/> }
			<div className="flex justify-between w-full items-center text-sm font-medium">
				{ getDescription() }
				{
					report.danger &&
					<div className="bg-red-300 text-red-700 border-red-700 text-[7px] px-2 py-1 animate-ping rounded-full w-[15px] h-[15px] flex items-center justify-center">
						⚠️
					</div>
				}
			</div>
		</div>
	);
}

export default SingleSideList;
