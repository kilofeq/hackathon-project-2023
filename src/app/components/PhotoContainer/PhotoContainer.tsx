import React, { useState } from "react";
import "yet-another-react-lightbox/styles.css";
import { Lightbox } from "yet-another-react-lightbox";

export const PhotoContainer = ({ images }: { images: string[] | undefined  }) => {

  const [openIndex, setOpenIndex] = useState<number>(-1);

  return (
    <div className="flex flex-row overflow-scroll gap-4 pl-4">
      {images?.map((url, index) => (
        <img
          src={url}
          key={url}
          className="rounded-xl w-5/6 h-48 object-cover"
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
