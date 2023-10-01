import { IReport } from "@/types/util.types";
import { PhotoContainer } from "@/app/components/PhotoContainer";

type Props = {
	report: IReport
}

function ReportProfile({
	report: {
		name,
		photos,
	}
}: Props) {
	return (
		<div className="flex flex-col gap-6 px-4">
			{ photos && <PhotoContainer images={ photos }/> }
			<p className="text-gray-500 text-sm font-medium">
				{ name }
			</p>
		</div>
	);
}

export default ReportProfile;