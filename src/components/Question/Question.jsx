import styles from './Question.module.scss';
import IconExpand from '../../assets/icon_expand.svg';
import IconCollapse from '../../assets/icon_collapse.svg';

const Question = ({ question, answer, isExpanded, onClick }) => {
    return (
        <div className={styles.container} onClick={onClick}>
        <div className={styles.containerLeft}>
            <div className={styles.containerLeftQuestion}>
                {question}
            </div>
            <div className={`${styles.containerLeftAnswerWrapper} ${isExpanded ? styles.expanded : ''}`}>
                <div className={styles.containerLeftAnswer}>
                    {answer}
                </div>
            </div>
        </div>
         <div className={styles.containerRight}>
            <img
                className={`${styles.icon} ${isExpanded ? styles.iconExpanded : ''}`}
                src={isExpanded ? IconCollapse : IconExpand}
                alt={isExpanded ? 'collapse' : 'expand'}
            />
         </div>
        </div>
    );
}

export default Question;