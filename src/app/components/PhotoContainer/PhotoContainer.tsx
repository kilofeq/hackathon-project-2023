import React, { useState } from "react";
import "yet-another-react-lightbox/styles.css";
import { Lightbox } from "yet-another-react-lightbox";

export const PhotoContainer = ({ images }: { images: string[] }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openIndex, setOpenIndex] = useState<number>(-1);

  const handleLightboxOpen = (url: string) => {
    setIsOpen(true);
  };

  const updateIndex = ({ index: current }: { index: number }) => {
    setOpenIndex(current);
  };

  return (
    <div className="flex flex-row overflow-scroll gap-4 h-[128px] pl-4">
      {images.map((url, index) => (
        <img
          src={url}
          key={url}
          className="rounded-lg aspect-video"
          alt=""
          onClick={() => setOpenIndex(index)}
        />
      ))}
      <Lightbox
        index={openIndex}
        slides={images.map((url) => ({ src: url }))}
        open={openIndex >= 0}
        close={() => setOpenIndex(-1)}
      />
    </div>
  );
};
