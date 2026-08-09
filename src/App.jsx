import {useState} from 'react'

import styles from './App.module.scss'
import AppLogo from './assets/logo.svg'
import CTAButton from './components/CTAButton/CTAButton'
import MainScreen from './assets/main_screen.png'
import Plant from './assets/plant.png'
import Egg from './assets/egg.png'
import Cook from './assets/cook.png'
import Machine from './assets/machine.png'
import Smile from './assets/smile.png'
import Bucket from './assets/bucket.png'
import CatOne from './assets/cat_01.png'
import Arrow from './assets/arrow.png'

import Pro from './components/Pro/Pro'
import Block from './components/Block/Block'
import Device from './components/Device/Device'
import ReviewsTrack from './components/ReviewsTrack/ReviewsTrack'
import Question from './components/Question/Question'
import BubbleField from './components/BubbleField/BubbleField'
import SplitTitle from './components/SplitTitle/SplitTitle'
import frequentlyAskedQuestions from './data'

const App =() => {

  const proItems = ['incognito', 'money', 'monkey', 'sun']

  const [expandedQuestions, setExpandedQuestions] = useState([]);
  const toggleQuestion = (questionIndex) => {
    // Logique pour gérer l'expansion/réduction de la question
    setExpandedQuestions(prevState => {
      const newState = [...prevState];
      newState[questionIndex] = !newState[questionIndex];
      return newState;
    });
  };

  return (
    <div className={styles.container}>
    <div className={styles.containerHeader}>
      <img className={styles.containerHeaderPlant} src={Plant} alt="plant" />
      <img className={styles.containerHeaderSmile} src={Smile} alt="smile" />
      <img className={styles.containerHeaderBucket} src={Bucket} alt="bucket" />
      <img className={styles.containerHeaderCook} src={Cook} alt="cook" />
      <img className={styles.containerHeaderMachine} src={Machine} alt="machine" />
      <BubbleField className={styles.containerHeaderMachineBubbles} width={50} height={150} />
      <img className={styles.containerHeaderCatOne} src={CatOne} alt="cat one" />
    <div className={styles.containerHeaderLogo}>
      <img src={AppLogo} alt="logo" />
    </div>
    <div className={styles.containerHeaderTitle}>
      <SplitTitle text="Equilibrez les tâches quotidiennes de votre foyer" />
    </div>
      <div className={styles.containerHeaderButtons}>
        <CTAButton type="android" />
        <CTAButton type="ios" />
      </div>
      <div className={styles.containerHeaderMainScreen}>
        <div className={styles.containerHeaderMainScreenIphone}>
          <img src={MainScreen} alt="main screen" />
        </div>
        <div className={styles.containerHeaderMainScreenEgg}>
          <img src={Egg} alt="egg" />
        </div>
      </div>
    </div>
    <div className={styles.containerPros}>
      <div className={styles.containerProsTrack}>
        {[...proItems, ...proItems, ...proItems, ...proItems].map((type, index) => (
          <Pro key={index} type={type} />
        ))}
      </div>
    </div>
    <div className={styles.containerBlocks}>
      <Block type="add" />
      <Block type="select" />
      <Block type="end" />
    </div>
    <div className={styles.containerDevices}>
      <div className={styles.containerDevicesInner}>
      <div className={styles.containerDevicesInnerDevice}>
        <Device type="android" />
        </div>
        <div className={styles.containerDevicesInnerDevice}>
        <Device type="ios" />
      </div>
      </div>
    </div>
    <ReviewsTrack />
    <div className={styles.containerArrow}>
      <img src={Arrow} alt="arrow" />
    </div>
    <div className={styles.containerFAQ}>
    <div className={styles.containerFAQInner}>
      <div className={styles.containerFAQInnerTitle}>
        {"Frequently Asked Questions"}
      </div>
       <div className={styles.containerFAQInnerQuestions}>
        {frequentlyAskedQuestions.map((faq, index) => (
          <Question
            key={index}
            onClick={() => toggleQuestion(index)}
            isExpanded={expandedQuestions[index]}
            question={faq.title}
            answer={faq.answer}
          />
        ))}
       </div>
       </div>
    </div>
    <div className={styles.containerFooter}>
      {"Un projet réalisé et maintenu par "}
      <a
        href="https://www.linkedin.com/in/nbessol/" // Remplace par ton URL
        target="_blank"
        rel="noopener noreferrer"
      >
       Nicolas Bessol
      </a>
    
    </div>
    <div className={styles.containerPrivacy}>
        <a
        href="/privacy/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Politique de confidentialité
      </a>
      </div>
  </div>
  )
}



export default App
