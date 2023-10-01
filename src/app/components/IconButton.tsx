import {ReactNode} from "react";
import classNames from "classnames";

export const IconButton = ({children, style, onClick}: {children: ReactNode, style: string, onClick?: () => void}) => {
  return (
    <button
      className={classNames([
        "w-16 h-16 p-[19px] rounded-[57px] shadow flex-col justify-center",
        "items-center gap-2.5 inline-flex",
        style
      ])}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
