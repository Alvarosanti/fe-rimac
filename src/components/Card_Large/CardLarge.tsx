import styles from "./CardLarge.module.scss";

interface CardLargeProps {
    title: string;
    price: string;
    description: string[];
    onSelect: () => void;
}

export const CardLarge: React.FC<CardLargeProps> = ({
    title,
    price,
    description,
    onSelect,
}) => {
    return (

        <div className={styles["extended-card"]}>
            {/* Encabezado */}
            <div className={styles["extended-card__content"]}>
                <div className={styles["extended-card__header"]}>
                    <div>
                        <h3 className={styles["extended-card__title"]}>{title}</h3>
                        <p className={styles["extended-card__subtitle"]}>COSTO DEL PLAN</p>
                        <p className={styles["extended-card__price"]}>{price} al mes</p>
                    </div>
                </div>
            </div>

            <hr className={styles["extended-card__divider"]} />

            {/* Lista de beneficios */}
            <div className={styles["extended-card__content2"]}>
                <ul className={styles["extended-card__list"]}>
                    {description.map((desc, index) => (
                        <li key={index}>{desc}</li>
                    ))}
                </ul>
            </div>

            {/* Btn */}
            <button
                className={styles["extended-card__button"]}
                onClick={onSelect}
            >
                Seleccionar Plan
            </button>
        </div>
    );
};
