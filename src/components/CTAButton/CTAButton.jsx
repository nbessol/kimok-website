import styles from './CTAButton.module.scss'

import AndroidLogo from '../../assets/logo_android.png'
import AppleLogo from '../../assets/logo_apple.png'

const CTAButton = ({ type, isFromDevice = false }) => {

const dataByTypes = {
    android: {
        url: 'https://play.google.com/store/apps/details?id=com.kimok.app',
        logo: AndroidLogo,
        title: 'Android',
    },
    ios: {
        url: 'https://apps.apple.com/fr/app/kimok/id6441871680',
        logo: AppleLogo,
        title: 'iOS',
    }
}

    return (
        <button className={styles.container} onClick={() => window.open(dataByTypes[type].url, '_blank')}>
            <div><img src={dataByTypes[type].logo} alt={`${type} logo`} /></div>
            <span className={styles.containerText}>
                {isFromDevice ? `Télécharger sur ${dataByTypes[type].title}` : 'Télécharger'}
            </span>
        </button>
    );
};

export default CTAButton;