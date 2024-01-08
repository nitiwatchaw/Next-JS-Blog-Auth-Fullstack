
import styles from './home.module.css'
import Image from 'next/image';


const Home = () => {

  return (
    <div className={styles.container}>
 
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Blog Fullstack with Auth Next JS.</h1>
        <p className={styles.desc}>
        This is the Blog project create by Next JS and Auth JS for authentiacated user and connect the data from database MongoDB
        </p>

        <div className={styles.buttons}>
          <button className={styles.button}>Learn More</button>
          <button className={styles.button}>Contact</button>
        </div>

        <div className={styles.brands}>
          <Image src='/brands.png' alt='' fill className={styles.brandImg} />
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image src='/home.png' alt='' fill className={styles.heroImg} />
      </div>
    </div>
  )
};

export default Home;