import { Fragment } from 'react'

import styles from './Block.module.scss'
import useInView from '../../hooks/useInView'

import Nicolas from '../../assets/blocks/add/nicolas.png'
import Tiphaine from '../../assets/blocks/add/tiphaine.png'
import Caroline from '../../assets/blocks/add/caroline.png'
import Romain from '../../assets/blocks/add/romain.png'
import Crown from '../../assets/crown.png'

import Sel01 from '../../assets/blocks/select/01.png'
import Sel02 from '../../assets/blocks/select/02.png'
import Sel03 from '../../assets/blocks/select/03.png'
import Sel04 from '../../assets/blocks/select/04.png'
import Sel05 from '../../assets/blocks/select/05.png'
import Sel06 from '../../assets/blocks/select/06.png'
import Sel07 from '../../assets/blocks/select/07.png'
import Sel08 from '../../assets/blocks/select/08.png'
import Sel09 from '../../assets/blocks/select/09.png'
import Sel10 from '../../assets/blocks/select/10.png'
import Sel11 from '../../assets/blocks/select/11.png'
import Sel12 from '../../assets/blocks/select/12.png'
import Sel13 from '../../assets/blocks/select/13.png'
import Sel14 from '../../assets/blocks/select/14.png'
import Sel15 from '../../assets/blocks/select/15.png'
import Sel16 from '../../assets/blocks/select/16.png'
import Sel17 from '../../assets/blocks/select/17.png'
import Sel18 from '../../assets/blocks/select/18.png'
import Sel19 from '../../assets/blocks/select/19.png'
import Sel20 from '../../assets/blocks/select/20.png'
import Sel21 from '../../assets/blocks/select/21.png'
import Sel22 from '../../assets/blocks/select/22.png'
import Sel23 from '../../assets/blocks/select/23.png'
import Sel24 from '../../assets/blocks/select/24.png'

const renderWithBreaks = (text) => {
    return text.split('<br/>').map((line, index, lines) => (
        <Fragment key={index}>
            {line}
            {index < lines.length - 1 && <br />}
        </Fragment>
    ))
}

const Block = ({ type }) => {

    const [addBlockRef, isAddBlockInView] = useInView()
    const [endBlockRef, isEndBlockInView] = useInView()
    const [leftRef, isLeftInView] = useInView()

    const renderAddBlock = () => {
        return (
            <div
                ref={addBlockRef}
                className={`${styles.containerRightAdd} ${isAddBlockInView ? styles.containerRightAddVisible : ''}`}
            >
                <img src={Nicolas} alt="nicolas" />
                <img src={Tiphaine} alt="tiphaine" />
                <img src={Caroline} alt="caroline" />
                <img src={Romain} alt="romain" />
            </div>
        )
    }

        const selectRows = [
        [Sel01, Sel02, Sel03, Sel04, Sel05],
        [Sel06, Sel07, Sel08, Sel09, Sel10],
        [Sel11, Sel12, Sel13, Sel14, Sel15],
        [Sel16, Sel17, Sel18, Sel19, Sel20],
        [Sel21, Sel22, Sel23, Sel24],
    ]

    const renderSelectBlock = () => {
        return (
            <div className={styles.containerRightSelect}>
                {selectRows.map((row, rowIndex) => {
                    const tileWidth = 370 // 350px image (60px height at 700/120 ratio) + 20px gap
                    const scrollDistance = row.length * tileWidth // exact width of one full copy of the row
                    const baseDuration = 18
                    const duration = (row.length / selectRows.length) * baseDuration
                    // phase-shift each row so they don't line up, without inserting a gap in the looping content
                    const delay = -(rowIndex * baseDuration) / (selectRows.length * selectRows.length)
                    return (
                        <div key={rowIndex} className={styles.containerRightSelectRow}>
                            <div
                                className={`${styles.containerRightSelectRowInner} ${rowIndex % 2 === 0 ? styles.selectScrollLeft : styles.selectScrollRight}`}
                                style={{
                                    animationDuration: `${duration}s`,
                                    animationDelay: `${delay}s`,
                                    '--scroll-distance': `${scrollDistance}px`,
                                }}
                            >
                                {[...row, ...row].map((img, i) => (
                                    <img key={i} src={img} alt={`select-${rowIndex}-${i}`} />
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    const endUsers = [
        { name: 'Nicolas', score: 42, color: '#0EAD69', width: 85 },
        { name: 'Tiphaine', score: 35, color: '#FE64A3', width: 60 },
        { name: 'Caroline', score: 21, color: '#FCA53F', width: 40 },
    ]

    const renderEndBlock = () => {
        return (
            <ul
                ref={endBlockRef}
                className={`${styles.containerRightEnd} ${isEndBlockInView ? styles.containerRightEndVisible : ''}`}
            >
                {endUsers.map((user, i) => (
                    <li
                        key={user.name}
                        className={styles.containerRightEndUser}
                        style={{ backgroundColor: `color-mix(in srgb, ${user.color} 15%, white)` }}
                    >
                        {i === 0 && (
                            <img src={Crown} alt="" className={styles.containerRightEndUserCrown} />
                        )}
                        <div
                            className={styles.containerRightEndUserBar}
                            style={{ backgroundColor: user.color, width: `${user.width}%` }}
                        >
                            <span className={styles.containerRightEndUserName}>{user.name}</span>
                        </div>
                        <h3 className={styles.containerRightEndUserScore} style={{ color: user.color }}>
                            {user.score}
                        </h3>
                    </li>
                ))}
            </ul>
        )
    }

    
    const blockData = {
        add: {
            number: '1',
            title: 'Ajoutez les membres de votre Kimok.',
            description: 'Que vous soyez en couple, en colocation, en famille ou dans tout autre foyer, ajoutez autant de membres que vous le souhaitez.',
            node: renderAddBlock()
        },
        select: {
            number: '2',
            title: 'Créez votre liste de tâches',
            description: 'Nous vous proposons une centaine de tâches parmi les plus courantes.<br/> Vous pouvez aussi créer vos propres tâches et leur attribuer le nombre de points de votre choix.',
            node: renderSelectBlock()
        },
        end: {
            number: '3',
            title: 'Passez à l’action et gagnez des points',
            description: 'Ajoutez les tâches que vous ou les membres de votre foyer avez réalisées, gagnez des points pour chaque effort accompli.<br/>Suivez votre progression et faites évoluer votre Kimok au fil des jours.',
            node: renderEndBlock()
        }
    }
    const left = (
        <div
            ref={leftRef}
            className={`${styles.containerLeft} ${isLeftInView ? styles.containerLeftVisible : ''}`}
        >
        <div className={styles.containerLeftNumber}>
            {blockData[type].number}
        </div>
        <div className={styles.containerLeftTitle}>
            {blockData[type].title}
        </div>
        <div className={styles.containerLeftDescription}>
            {renderWithBreaks(blockData[type].description)}
        </div>
        </div>
    )
    const right = (
        <div className={styles.containerRight}>
            {blockData[type].node}
        </div>
    )
    return (
        <div className={styles.container}>
        {type === 'select' ? (
            <>
            {left}
            {right}
            </>
        ) : (
            <>
            {right}
            {left}
            </>
        )}
        </div>
    );
}

export default Block;