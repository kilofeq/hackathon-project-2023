import { faCamera, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ChangeEvent, useCallback, useId, useState,
} from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import getDataUrl from '../helpers/getDataUrl';

interface Props {
  className?: string
  onDataUrls?: (urls: string[]) => void
}

function ImageInput(data?: Props) {
  const onDataUrls = data?.onDataUrls;
  const id = useId();
  const [dataUrls, setDataUrls] = useState<string[]>([]);
  const handleOnChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const urls: string[] = [];
    for (const file of event.target.files) {
      const url = await getDataUrl(file);
      urls.push(url);
    }
    setDataUrls(urls);
    if (onDataUrls) onDataUrls(urls);
  }, [onDataUrls]);
  const inputClasses = 'w-full h-32 bg-gray-100 dashed-border rounded-xl flex items-center justify-center font-semibold';
  return (
    <div
      className={data?.className}
    >
      <input
        id={id}
        type="file"
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleOnChange}
      />
      {dataUrls.length > 0 ? (
        <div
          className={classNames(
            inputClasses,
          )}
        >
          <div
            className="flex items-center space-x-4 p-4 w-full h-32 overflow-x-auto"
          >
            {dataUrls.map((url) => (
              <div
                key={`${url}image-url`}
                className="w-24 h-24 relative shrink-0"
              >
                <Image
                  alt="image"
                  src={url}
                  fill
                  className="rounded-2xl"
                />
                <button
                  className={classNames(
                    'absolute -top-2 -right-2 z-10 bg-white p-1 rounded-full w-8 h-8',
                    'flex items-center justify-center shadow-md hover:opacity-75 active:opacity-50 duration-150',
                  )}
                  type="button"
                  onClick={() => {
                    setDataUrls((urls) => urls.filter((u) => u !== url));
                    if (onDataUrls) onDataUrls(dataUrls.filter((u) => u !== url));
                  }}
                >
                  <FontAwesomeIcon
                    icon={faX}
                    size="sm"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <label
          htmlFor={id}
          className={`${inputClasses} cursor-pointer`}
        >
          <span>
            <span
              className="mr-2"
            >
              Dodaj zdjęcie
            </span>
            <FontAwesomeIcon
              icon={faCamera}
            />
          </span>
        </label>
      )}
    </div>
  );
}

export default ImageInput;
