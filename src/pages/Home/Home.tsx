import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import heroImage from "@assets/images/heroImage.webp";
import { useNavigate } from "react-router-dom";
import { getUsers } from "@/services";

type FormData = {
    documentType: string
    documentNumber: string
    phone: string
    privacy: boolean
    comms: boolean
}

type FormErrors = Partial<Record<keyof FormData, string>>

export const Home = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState(() => {
        const saved = localStorage.getItem("formData");
        return saved
            ? JSON.parse(saved)
            : {
                documentType: "dni",
                documentNumber: "",
                phone: "",
                privacy: false,
                comms: false,
            };
    });

    const [errors, setErrors] = useState<FormErrors>({})
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return () => {
            localStorage.removeItem("formData");
        };
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;

        let newValue = value;
        if (name === "documentNumber" || name === "phone") {
            let digits = (value || "").replace(/\D/g, "");

            const maxLen = name === "documentNumber" ? 8 : name === "phone" ? 9 : undefined;
            if (typeof maxLen !== "undefined") {
                digits = digits.slice(0, maxLen);
            }
            newValue = digits;
        }

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : newValue,
        });

        setErrors({ ...errors, [name]: "" });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: Record<string, string> = {};
        if (!form.documentNumber.trim()) newErrors.documentNumber = "Ingrese su número de documento";
        else if (!/^\d{8}$/.test(form.documentNumber)) newErrors.documentNumber = "Debe tener 8 dígitos";

        if (!form.phone.trim()) newErrors.phone = "Ingrese su número de celular";
        else if (!/^\d{9}$/.test(form.phone)) newErrors.phone = "Debe tener 9 dígitos";

        if (!form.privacy) newErrors.privacy = "Debe aceptar la política de privacidad";
        if (!form.comms) newErrors.comms = "Debe aceptar las comunicaciones comerciales";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        setLoading(true);
        try {
            const user = await getUsers(form.documentNumber);
            setLoading(false);

            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/plans");
            } else {
                setErrors({ documentNumber: "Usuario no encontrado" });
            }
        } catch (err) {
            console.error(err);
            setLoading(false);
            setErrors({ documentNumber: "Error al conectar con el servidor" });
        }
    };

    return (
        <section className={styles.hero}>
            <div className="container">
                {/* Desktop */}
                <div className={styles.hero__content}>
                    <div className={styles.hero__image}>
                        <img src={heroImage} alt="hero image" />
                    </div>

                    <div className={styles.hero__form}>
                        <span className={styles.hero__tag}>Seguro Salud Flexible</span>
                        <h1 className={styles.hero__title}>Creado para ti y tu familia</h1>
                        <p className={styles.hero__description}>
                            Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.
                        </p>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.form__group}>
                                <select name="documentType" value={form.documentType} onChange={handleChange}>
                                    <option value="dni">DNI</option>
                                    <option value="ruc">RUC</option>
                                </select>
                                <input
                                    type="text"
                                    name="documentNumber"
                                    placeholder="Nro. de documento"
                                    value={form.documentNumber}
                                    onChange={handleChange}
                                    className={errors.documentNumber ? styles["form__input--error"] : ""}
                                />
                            </div>
                            {errors.documentNumber && (
                                <p className={styles["form__errorMsg"]}>{errors.documentNumber}</p>
                            )}

                            <input
                                type="text"
                                name="phone"
                                placeholder="Celular"
                                value={form.phone}
                                onChange={handleChange}
                                className={errors.phone ? styles["form__input--error"] : ""}
                            />
                            {errors.phone && <p className={styles["form__errorMsg"]}>{errors.phone}</p>}

                            <div className={styles.form__checkboxGroup}>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="privacy"
                                        checked={form.privacy}
                                        onChange={handleChange}
                                    />{" "}
                                    Acepto la Política de Privacidad
                                </label>
                                {errors.privacy && <p className={styles["form__errorMsg"]}>{errors.privacy}</p>}

                                <label>
                                    <input
                                        type="checkbox"
                                        name="comms"
                                        checked={form.comms}
                                        onChange={handleChange}
                                    />{" "}
                                    Acepto la Política Comunicaciones Comerciales
                                </label>
                                {errors.comms && <p className={styles["form__errorMsg"]}>{errors.comms}</p>}
                            </div>

                            <a href="#" className={styles.form__terms}>
                                Aplican Términos y Condiciones.
                            </a>

                            <button type="submit" className={styles.form__button} disabled={loading}>
                                {loading ? "Validando..." : "Cotiza aquí"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Mobile */}
                <div className={styles.hero__heroMobile}>
                    <div className={styles.hero__heroMobileTop}>
                        <div className={styles.hero__heroMobileLeft}>
                            <span className={styles.hero__tag}>Seguro Salud Flexible</span>
                            <h1 className={styles.hero__title}>Creado para ti y tu familia</h1>
                        </div>

                        <div className={styles.hero__heroMobileImage}>
                            <img src={heroImage} alt="hero mobile image" />
                        </div>
                    </div>

                    <div className={styles.hero__heroMobileDivider}></div>
                    <p className={styles.hero__description}>
                        Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.
                    </p>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.form__group}>
                            <select name="documentType" value={form.documentType} onChange={handleChange}>
                                <option value="dni">DNI</option>
                                <option value="ruc">RUC</option>
                            </select>
                            <input
                                type="text"
                                name="documentNumber"
                                placeholder="Nro. de documento"
                                value={form.documentNumber}
                                onChange={handleChange}
                                className={errors.documentNumber ? styles["form__input--error"] : ""}
                            />
                        </div>
                        {errors.documentNumber && (
                            <p className={styles["form__errorMsg"]}>{errors.documentNumber}</p>
                        )}

                        <input
                            type="text"
                            name="phone"
                            placeholder="Celular"
                            value={form.phone}
                            onChange={handleChange}
                            className={errors.phone ? styles["form__input--error"] : ""}
                        />
                        {errors.phone && <p className={styles["form__errorMsg"]}>{errors.phone}</p>}

                        <div className={styles.form__checkboxGroup}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="privacy"
                                    checked={form.privacy}
                                    onChange={handleChange}
                                />{" "}
                                Acepto la Política de Privacidad
                            </label>
                            {errors.privacy && <p className={styles["form__errorMsg"]}>{errors.privacy}</p>}

                            <label>
                                <input
                                    type="checkbox"
                                    name="comms"
                                    checked={form.comms}
                                    onChange={handleChange}
                                />{" "}
                                Acepto la Política Comunicaciones Comerciales
                            </label>
                            {errors.comms && <p className={styles["form__errorMsg"]}>{errors.comms}</p>}
                        </div>

                        <a href="#" className={styles.form__terms}>
                            Aplican Términos y Condiciones.
                        </a>

                        <button type="submit" className={styles.form__button} disabled={loading}>
                            {loading ? "Validando..." : "Cotiza aquí"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};
