import CTAButton from '../CTAButton/CTAButton';
import styles from './Device.module.scss';
import MainScreen from '../../assets/main_screen.png'
import SplashAndroid from '../../assets/splash_android.png'

const Device = ({type}) => {
    const dataByTypes = {
        android: {
            img: SplashAndroid,
        },
        ios: {
            img: MainScreen,
        }
    }

    return (
        <div className={styles.container}>
        <div className={styles.containerButton}>
            <CTAButton type={type} isFromDevice={true} />
            </div>
            <div className={styles.containerImage}>
                <img src={dataByTypes[type].img} alt="main screen" />
            </div>
        </div>
    );
};

export default Device;