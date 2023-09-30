import React from "react";

export const PhotoContainer = ({ images }: { images: string[] }) => {
  return (
    <div className="flex flex-row overflow-scroll gap-4 h-[128px] pl-4">
      {images.map((url) => (
        <img src={url} key={url} className="rounded-lg aspect-video" />
      ))}
    </div>
  );
};
