import type { VFC } from "react";
import styles from "./Button.module.css"

type Props = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children: React.ReactNode
} & JSX.IntrinsicElements['button']

export const Button: VFC<Props> = (props) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  )
}
