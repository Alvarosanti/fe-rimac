import styles from "./Navbar.module.scss"
import celphIcon from "@assets/icons/celphIcon.svg"

export const Navbar = () => {
    return (
        <header className={styles.navbar}>
            <div className="container">
                <div className={styles.navbar__content}>
                    <div className={styles.navbar__logo}>
                        <img src="/logoRimac.svg" alt="Logo_Navbar" />
                    </div>

                    <nav className={styles.navbar__actions}>
                        <button className={styles.navbar__button}>¡Compra por este medio!</button>
                        <div>
                            <img src={celphIcon} alt="Celphone_logo" />
                            <a href="tel:(01)4116001" className={styles.navbar__link}>
                                (01)4116001
                            </a>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}