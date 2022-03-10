import aimIcon from 'earth/media/icons/aim.png'
import styles from 'earth/styles/earth.module.css'
import Image from 'next/image'
import imageCard from 'earth/media/images/2.png'
import clockIcon from 'earth/media/icons/clock.png'
const Card = (props) => {
    return (
        <div className={styles.card}>
            <div className={styles.imageInfo}>
                <div className={styles.image}>
                    <Image height={130} width={250} src={props.data.image?.url || imageCard} alt="card" />
                </div>
                <div className={styles.content}>
                    <div className={styles.textInfo}>
                        <div className={styles.title}>
                            <div className={styles.icon}>
                                <Image src={aimIcon} alt="card" />
                            </div>
                            <h2 className={styles.text}>
                                {props.data.title}
                            </h2>
                        </div>
                        <div className={styles.shortDesc}>
                            <h4 className={styles.text}>
                                {props.data.description}
                            </h4>
                        </div>
                    </div>
                    <div className={styles.duration}>
                        <div className={styles.icon}>
                            <Image src={clockIcon} alt='clock' />
                        </div>
                        <div className={styles.text}>
                            <span>{props.data.duration} ساعت برنامه </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.moreInfo}>
                <div>
                    <button onClick={() => props.gotoQuestion(props.data.id)} type="button">بیشتر بدانید</button>
                </div>
            </div>
        </div>
    )
}
export default Card;