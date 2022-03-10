import Image from 'next/image'
import chevrondown from 'earth/media/icons/chevrondown.png'
import styles from 'earth/styles/earth.module.css'
import proImage from 'earth/media/images/girl 1.png'

const UserProfile =()=>{
    return(
        <div className={styles.userProfile}>
        <div className={styles.information}>
          <div className={styles.imgProfile} >
              <Image src={proImage} alt="profile" />
          </div>
          <div className={styles.info}>
             <div className={styles.name}>حسنا خانوم</div>
             <div className={styles.coins}>2500 سکه</div>
          </div>
          </div>
          <div className={styles.icon}>
                <Image src={chevrondown} alt="icon" />
          </div>
      </div>
    )
}
export default UserProfile;