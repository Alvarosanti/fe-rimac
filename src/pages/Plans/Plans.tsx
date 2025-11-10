import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Plans.module.scss";
import { Navbar } from "@/components/Navbar/Navbar";
import { Card } from "@/components/Card/Card";
import { CardLarge } from "@/components/Card_Large/CardLarge";
import { getPlans } from "@/services/api/plans";

export const Plans = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<string | null>(null);
    const [plans, setPlans] = useState<any[]>([]);
    const [filteredPlans, setFilteredPlans] = useState<any[]>([]);
    const [userAge, setUserAge] = useState<number>(0);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        if (userData.birthDay) {
            const age = calculateAge(userData.birthDay);
            setUserAge(age);
        }
    }, []);
    const calculateAge = (birthDay: string): number => {
        const [day, month, year] = birthDay.split("-").map(Number);
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };


    useEffect(() => {
        const fetchPlans = async () => {
            const response = await getPlans();
            setPlans(response);
        };
        fetchPlans();
    }, []);

    useEffect(() => {
        if (userAge && plans.length > 0) {
            const validPlans = plans.filter((plan) => userAge <= plan.age);
            setFilteredPlans(validPlans);
        }
    }, [userAge, plans]);

    const handleSelectPlan = (plan: any) => {
        localStorage.setItem(
            "summaryData",
            JSON.stringify({
                name: "Rocío Miranda Díaz",
                dni: "12345678",
                celular: "987654321",
                planElegido: plan.name,
                costoPlan: `S/${plan.price}`,
            })
        );
        navigate("/summary");
    };

    return (
        <>
            <Navbar />

            <div className={styles.container}>
                {/* Steps */}
                <div className={styles.steps}>
                    <div className={`${styles.step} ${styles.active}`}>1</div>
                    <span className={styles.label}>Planes y coberturas</span>
                    <span className={styles.separator}>...</span>
                    <div className={styles.step}>2</div>
                    <span className={styles.label}>Resumen</span>
                </div>

                {/* Volver */}
                <button className={styles.backButton} onClick={() => navigate("/")}>
                    ← Volver
                </button>

                {/*  principal */}
                <h1 className={styles.title}>
                    Rocío <span>¿Para quién deseas cotizar?</span>
                </h1>
                <p className={styles.subtitle}>
                    Selecciona la opción que se ajuste más a tus necesidades
                </p>

                {/* Cards */}
                <div className={styles.cardsContainer}>
                    <Card
                        title="Para mí"
                        description="Cotiza tu seguro de salud y agrega familiares si así lo deseas."
                        selected={selected === "me"}
                        onClick={() => setSelected("me")}
                    />
                    <Card
                        title="Para alguien más"
                        description="Realiza una cotización para uno de tus familiares o cualquier persona."
                        selected={selected === "other"}
                        onClick={() => setSelected("other")}
                    />
                </div>

                {/* Mostrar planes disponibles según edad */}
                {selected && filteredPlans.length > 0 && (
                    <div className={styles.plansContainer}>
                        {filteredPlans.map((plan) => (
                            <CardLarge
                                key={plan.name}
                                title={plan.name}
                                price={`S/${plan.price}`}
                                description={plan.description}
                                onSelect={() => handleSelectPlan(plan)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};
