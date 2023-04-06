import React, {FC} from 'react';

import styles from "./Swatch.module.css"
import cn from "classnames";
import {Check} from "@components/icons";
import {isDark} from "@lib/color";

interface Props {
    color?: string,
    label: string
    onClick: () => void,
    active?: boolean,
    variant?: string,
    size?: "sm" | "md" | "lg"
}

const Swatch: FC<Props> = ({color, label, onClick, active, size }) => {

    label = label?.toLowerCase()

    const rootClassname = cn(
        styles.root,
        {
            [styles.active]: active,
            [styles.color]: color,
            [styles.size]: !color,
            [styles.dark]: color && isDark(color),
            [styles.sm]: size === "sm"
        }
    )

    return (
        <button
            className={rootClassname}
            style={color ? {backgroundColor: color} : {}}
            onClick={onClick}
        >
            {
                (active && color) && (
                    <Check/>
                )
            }
            {!color && label}
        </button>
    );
};

export default Swatch;