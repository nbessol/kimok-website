import styles from './Review.module.scss';
import StarFull from '../../assets/stars/star_full.svg';
import StarNull from '../../assets/stars/star_null.svg';
import StarHalf from '../../assets/stars/star_half.svg';

import AndroidLogo from '../../assets/logo_android.png';
import IosLogoBlack from '../../assets/logo_apple_black.png';

const Review = ({ userName, score, text, platform, rotate = 0, x = 0 }) => {

    const platformLogo = {
        android: <img src={AndroidLogo} alt="android logo" />,
        ios: <img src={IosLogoBlack} alt="ios logo" />,
    };

    const y = Math.pow(Math.abs(rotate) / 20, 2) * 150

    return (
        <div className={styles.container} style={{ translate: `${x}px ${y}px`, rotate: `${rotate}deg` }}>
            <div className={styles.containerUserName}>
                {userName}
            </div>
            <div className={styles.containerScore}>

                {Array.from({ length: 5 }, (_, index) => {
                    if (index < Math.floor(score)) {
                        return <img key={index} src={StarFull} alt="star full" />;
                    } else if (index < score) {
                        return <img key={index} src={StarHalf} alt="star half" />;
                    } else {
                        return <img key={index} src={StarNull} alt="star null" />;
                    }
                })}
            </div>
            <div className={styles.containerText}>
                {text}
            </div>
            <div className={styles.containerPlatform}>
                {platformLogo[platform]}
            </div>
        </div>
    );
}

export default Review;