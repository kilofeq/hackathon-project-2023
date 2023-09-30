import { Color } from "@/types/util.types";

export interface ButtonProps {
  handleClick?: () => void,
  color: Color,
  position: string,
  className?: string
}
