import styles from './Footer.module.scss';
import logoRimacFooter from '@assets/icons/logoRimacFooter.svg';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footer__content}>
                    <div className={styles.footer__logo}>
                        <img src={logoRimacFooter} alt="Logo_Footer" />
                    </div>
                    <div className={styles.footer__text}>
                        <div>© 2025 RIMAC Seguros y Reaseguros.</div>
                    </div>
                </div>
            </div>
        </footer>
    )
}