import React from 'react'
import Image from 'next/image'
import styles from './about.module.css'

export const metadata = {
  title: 'About Page',
  description: 'About description',
}

const AboutPage = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h2 className={styles.subtitle}>About Agency</h2>
          <h1 className={styles.title}>We create digital ideas that are bigger, bolder, braver and better</h1>
          <p className={styles.desc}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Vel facilis nam nobis sunt aliquid consequuntur odio temporibus,
            quod minus nemo consectetur repellendus commodi
            voluptates reiciendis doloremque quibusdam incidunt impedit assumenda.
          </p>

          <div className={styles.boxes}>
            <div className={styles.box}>
              <h1>10 K+</h1>
              <p>Year of experience</p>
            </div>
            <div className={styles.box}>
              <h1>10 K+</h1>
              <p>Year of experience</p>
            </div>
            <div className={styles.box}>
              <h1>10 K+</h1>
              <p>Year of experience</p>
            </div>
          </div>
        </div>
        <div className={styles.imgContainer}>
          <Image src='/about.png' alt='About Image' fill />
        </div>
      </div>
    </div>
  )
}

export default AboutPage