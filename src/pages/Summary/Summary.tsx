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

                {/* Datos */}
                <div className={styles.summaryContent}>
                    <h2>Resumen de tu Plan</h2>
                    <p><strong>Nombre:</strong> {summaryData.name}</p>
                    <p><strong>DNI:</strong> {summaryData.dni}</p>
                    <p><strong>Celular:</strong> {summaryData.celular}</p>
                    <p><strong>Plan:</strong> {summaryData.planElegido}</p>
                    <p><strong>Costo:</strong> S/{summaryData.costoPlan}</p>
                </div>
            </div>
        </>
    );
};
