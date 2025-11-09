import styles from "./Navbar.module.scss"

export const Navbar = () => {
    return (
        <header className={styles.navbar}>
            <div className="container">
                <div className={styles.navbar__content}>
                    <div className={styles.navbar__logo}>
                        <img src="/" alt="Logo" />
                    </div>

                    <nav className={styles.navbar__actions}>
                        <button className={styles.navbar__button}>¡Compra por este medio!</button>
                        <a href="/help" className={styles.navbar__link}>
                            (01)4116001
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    )
}