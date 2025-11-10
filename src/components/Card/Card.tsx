import React, { useState } from "react";
import styles from "./Card.module.scss";
import CheckIcon from "@/assets/icons/checkIcon.svg"; // tu ícono ya existente

interface CardProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    selected?: boolean;
    onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ title,
    description,
    icon,
    selected = false,
    onClick, }) => {
    // const [selected, setSelected] = useState(false);

    // const handleClick = () => setSelected(!selected);

    return (
        <div
            className={`${styles.card} ${selected ? styles.selected : styles.unselected}`}
            onClick={onClick}
        >
            <div className={styles.checkCircle}>
                {selected && <img src={CheckIcon} alt="check icon" className={styles.checkIcon} />}
            </div>

            <div className={styles.icon}>{icon}</div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
        </div>
    );
};
