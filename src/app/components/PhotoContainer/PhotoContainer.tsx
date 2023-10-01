import React, { useState } from "react";
import "yet-another-react-lightbox/styles.css";
import { Lightbox } from "yet-another-react-lightbox";
import classNames from 'classnames'

export const PhotoContainer = ({ images }: { images?: string[]  }) => {

	const [openIndex, setOpenIndex] = useState<number>(-1);

	return (
		<div className="flex flex-row overflow-scroll gap-4 mt-4">
			{images?.map((url, index) => (
				<img
					src={url}
					key={url}
					className={classNames(
						"rounded-xl h-52 object-cover",
						images.length > 1 ? "w-5/6":"w-full"
					)}
					alt=""
					onClick={() => setOpenIndex(index)}
				/>
			))}
			<Lightbox
				index={openIndex}
				slides={images?.map((url) => ({ src: url }))}
				open={openIndex >= 0}
				close={() => setOpenIndex(-1)}
			/>
		</div>
	);
};
