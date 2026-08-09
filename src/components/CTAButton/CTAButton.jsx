import styles from './CTAButton.module.scss'

import AndroidLogo from '../../assets/logo_android.png'
import AppleLogo from '../../assets/logo_apple.png'

const CTAButton = ({ type }) => {

const dataByTypes = {
    android: {
        url: 'https://play.google.com/store/apps/details?id=com.kimok.app',
        logo: AndroidLogo,
    },
    ios: {
        url: 'https://apps.apple.com/fr/app/kimok/id6441871680',
        logo: AppleLogo,

    }
}

    return (
        <button className={styles.container} onClick={() => window.open(dataByTypes[type].url, '_blank')}>
            <div><img src={dataByTypes[type].logo} alt={`${type} logo`} /></div>
            <span className={styles.containerText}>
                Télécharger
            </span>
        </button>
    );
};

export default CTAButton;