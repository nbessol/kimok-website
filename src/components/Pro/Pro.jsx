import Incognito from '../../assets/pro_icons/incognito.png'
import Money from '../../assets/pro_icons/money.png'
import Monkey from '../../assets/pro_icons/monkey.png'
import Sun from '../../assets/pro_icons/sun.png'

import styles from './Pro.module.scss'

const Pro = ({type}) => {

    const data = {
        incognito: {
            icon: Incognito,
            title: "Sans compte",
        },
        money: {
            icon: Money,
            title: "Gratuit",
        },
        monkey: {
            icon: Monkey,
            title: "Simplissime",
        },
        sun: {
            icon: Sun,
            title: "Sans publicité",
        }
    }

  return (
    <div className={styles.container}>
      <div className={styles.containerIcon}>
        <img src={data[type].icon} alt={data[type].title.toLowerCase()} />
      </div>
      <div className={styles.containerTitle}>
        {data[type].title}
      </div>
    </div>
  )
}

export default Pro