import { useNavigate } from "react-router-dom";
import styles from "./Summary.module.scss";
import { Navbar } from "@/components/Navbar/Navbar";

export const Summary = () => {
    const navigate = useNavigate();
    const summaryData = JSON.parse(localStorage.getItem("summaryData") || "{}");

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                {/* Steps */}
                <div className={styles.steps}>
                    <div className={`${styles.step}`}>1</div>
                    <span className={styles.label}>Planes y coberturas</span>
                    <span className={styles.separator}>...</span>
                    <div className={`${styles.step} ${styles.active}`}>2</div>
                    <span className={styles.label}>Resumen</span>
                </div>

                {/* Volver */}
                <button className={styles.backButton} onClick={() => navigate(-1)}>
                    ← Volver
                </button>

                {/* Resumen */}
                <div className={styles.summaryContent}>
                    <h2>Resumen del seguro</h2>

                    <div className={styles.card}>
                        <p className={styles.label}>Precios calculados para:</p>
                        <h3 className={styles.userName}>
                            {summaryData.name}
                        </h3>

                        <hr className={styles.divider} />

                        <div className={styles.section}>
                            <p className={styles.sectionTitle}>Responsable de pago</p>
                            <p>DNI: {summaryData.dni}</p>
                            <p>Celular: {summaryData.phone}</p>
                        </div>

                        <div className={styles.section}>
                            <p className={styles.sectionTitle}>Plan elegido</p>
                            <p>{summaryData.plan}</p>
                            <p>
                                Costo del Plan:{" "}
                                <strong>{summaryData.price} al mes</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
