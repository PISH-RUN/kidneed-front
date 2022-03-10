
import Image from 'next/image'
import searchIcon from 'earth/media/icons/Search.png'
import styles from 'earth/styles/earth.module.css'

const SearchBox = (props) => {
  return (
    <div className={styles.searchBox}>
      <input onChange={(e) => props.search(e)} type="input" placeholder="جستجو راه چه" />
      <Image src={searchIcon} alt="search" className={styles.icon} />
    </div>
  )
}
export default SearchBox