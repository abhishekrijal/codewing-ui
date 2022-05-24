import React from 'react'
import styles from './styles.module.css'
import GenericOptionType from "./modules/GenericOptionType";

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

export default GenericOptionType;
