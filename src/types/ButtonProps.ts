import { Color } from "@/types/util.types";

export interface ButtonProps {
  handleClick?: () => void,
  color: Color,
  className?: string
  disabled?: boolean
  submit?: boolean
  isLoading?: boolean
}
