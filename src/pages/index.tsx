import { openGuard } from "@kidneed/utils";
import styles from 'landing/styles/index.module.css'
import Image from 'next/image'
import logo from 'landing/media/images/logo.png'
import Link from "next/link";
import p1 from 'landing/media/images/p1.png'
import p2 from 'landing/media/images/p2.png'
import baghketab from 'landing/media/images/baghketab.png'
import barkat from 'landing/media/images/barkat.png'
import digiton from 'landing/media/images/digiton.png'
import fidibo from 'landing/media/images/fidibo.png'
import filmgardi from 'landing/media/images/filmgardi.png'
import taghche from 'landing/media/images/taghche.png'
import lastActivities from 'landing/media/images/lastActivities.png'
import bookmarks from 'landing/media/icons/bookmarks.png'
import calendarClear from 'landing/media/icons/calendar-clear.png'
import pieChart from 'landing/media/icons/pie-chart.png'
import telescope from 'landing/media/icons/telescope.png'
import roadMap from 'landing/media/images/roadMap.png'
import quote from 'landing/media/icons/quote.png'
import experts1 from 'landing/media/images/experts1.png'
import experts2 from 'landing/media/images/experts2.png'
import experts3 from 'landing/media/images/experts3.png'
import robot from 'landing/media/images/robot.png'
import safine from 'landing/media/images/safine.png'
import rightConnection from 'landing/media/images/rightConnection.png'
import friendly from 'landing/media/images/friendly.png'
import sync from 'landing/media/images/sync.png'
import user from 'landing/media/icons/user.png'
import twitter from 'landing/media/images/twitter.png'
import message from 'landing/media/images/message.png'
import googleplay from 'landing/media/images/googleplay.png'
import telescopeBig from 'landing/media/images/telescope.png'
import facebook from 'landing/media/images/facebook.png'

export default function Home() {
  return <div className={styles.landing}>
    <div className={styles.gradTopColor}>
      <div className={styles.p1} >
        <Image src={p1} />
      </div>
      <div className={styles.p2} >
        <Image src={p2} />
      </div>
    </div>
    <div className={styles.menubar}>
      <div className={styles.menu}>
        <div className={styles.logo}>
          <Image src={logo} alt="logo" />
        </div>
        <div className={styles.menuItems}>
          <div>
            <Link href="/">صفحه اصلی</Link>
          </div>
          <div>
            <Link href="/">درباره ما</Link>
          </div>
          <div>
            <Link href="/">تماس با ما</Link>
          </div>
          <div>
            <Link href="/">بلاگ</Link>
          </div>
        </div>
      </div>
      <div className={styles.login}>
        <Link href="/login">
          <button type="button" className={styles.loginBtn}>ورود</button>
        </Link>
      </div>
    </div>
    <div className={styles.header}>
      <div className={styles.title}>
        <h1>با برنامه دقیق، راه پیشرفت کودکانمان را خود بسازیم </h1>
      </div>
      <div className={styles.desc}>
        <h3>
          پلنت، تعیین برنامه هوشمند اوقات فراغت و درسی کودک شما
        </h3>
      </div>
      <div className={styles.buttons}>
        <Link href="" >
          <button type="button" className={styles.btnStartTrip}>سفر را شروع کنید</button>
        </Link>
        <Link href="">
          <button type="button" className={styles.knowMoreBtn}>بیشتر بدانید</button>
        </Link>
      </div>
    </div>
    <div className={styles.movieSectoin}>
      <div className={styles.movie}>
        <div className={styles.iframeDiv}><span style={{ display: "block", paddingTop: "57%" }}></span><iframe src="https://www.aparat.com/video/video/embed/videohash/7ZXqM/vt/frame" allowFullScreen={true} ></iframe></div>
      </div>
      <div className={styles.descMovie}>
        <div className={styles.title}>عنوانی برای توضیح بهتر</div>
        <div className={styles.desc}>
          پلنت، تعیین برنامه هوشمند اوقات فراغت و درسی کودک شما پلنت، تعیین برنامه هوشمند اوقات فراغت و درسی کودک شما پلنت، تعیین برنامه هوشمند اوقات فراغت و درسی کودک شما پلنت، تعیین برنامه هوشمند اوقات فراغت و درسی کودک شما پلنت، تعیین برنامه هوشمند اوقات فراغت و درسی کودک شما پلنت، تعیین برنامه هوشمند اوقات فراغت و درسی کودک شما
        </div>
      </div>
    </div>
    <div className={styles.otherCompanies}>
      <div className={styles.inner}>
        <div className={styles.item}>
          <Image src={filmgardi} />
        </div>
        <div className={styles.item}>
          <Image src={digiton} />
        </div>
        <div className={styles.item}>
          <Image src={fidibo} />
        </div>
        <div className={styles.item}>
          <Image src={taghche} />
        </div>
        <div className={styles.item}>
          <Image src={baghketab} />
        </div>
        <div className={styles.item}>
          <Image src={barkat} />
        </div>
      </div>
    </div>
    <div className={styles.someTotalInformation}>
      <div className={styles.inner}>
        <div className={styles.choicePossible}>
          <div className={styles.title}>امکان انتخاب محتوای اختصاص یافته</div>
          <div className={styles.desc}>برای تنظیم برنامه روزانه کودک خودتان می توانید از پایگاه جامه محتوای کودک پلنت استفاده نمایید و به محتواهای مورد استفاده و تعدد استفاده آن را مشاهده نمایید.</div>
          <div className={styles.countingInfo}>
            <div className={styles.item}>
              <div className={styles.count}>۲۵۰۰+</div>
              <div className={styles.text}>انیمیشن</div>
            </div>
            <div className={styles.item}>
              <div className={styles.count}>۸۰۰+</div>
              <div className={styles.text}>داستان</div>
            </div>
            <div className={styles.item}>
              <div className={styles.count}>۳۴۱+</div>
              <div className={styles.text}>فعالیت</div>
            </div>
            <div className={styles.item}>
              <div className={styles.count}>۱۵+</div>
              <div className={styles.text}>چالش</div>
            </div>
          </div>
        </div>
        <div className={styles.lastActivity}>
          <div>
            <Image src={lastActivities} alt="lastActivity" />
          </div>
        </div>
      </div>
    </div>
    <div className={styles.progressPath}>
      <div className={styles.inner}>
        <div className={styles.titleSection}> رصد مسیر پیشرفت و تعیین مراحل آن</div>
        <div className={styles.tabs}>
          <div className={styles.tab}>
            <div className={styles.icon}>
              <Image src={pieChart} />
            </div>
            <div className={styles.detail}>
              <div className={styles.title}>مشاهده آمار</div>
              <div className={styles.desc}>از تمامی فعالیت ها</div>
            </div>
          </div>
          <div className={styles.tab}>
            <div className={styles.icon}>
              <Image src={calendarClear} />
            </div>
            <div className={styles.detail}>
              <div className={styles.title}>تعیین برنامه روزانه</div>
              <div className={styles.desc}>به کمک متخصصین</div>
            </div>
          </div>
          <div className={styles.tab}>
            <div className={styles.icon}>
              <Image src={telescope} />
            </div>
            <div className={styles.detail}>
              <div className={styles.title}>تعیین اهداف</div>
              <div className={styles.desc}>کوتاه یا بلند مدت</div>
            </div>
          </div>
          <div className={styles.tab}>
            <div className={styles.icon}>
              <Image src={bookmarks} />
            </div>
            <div className={styles.detail}>
              <div className={styles.title}>پاس گل تربیتی</div>
              <div className={styles.desc}>به ازای هر فعالیت</div>
            </div>
          </div>
        </div>
        <div className={styles.map}>
          <div>
            <Image src={roadMap} alt="roadMap" />
          </div>
        </div>
      </div>
    </div>
    <div className={styles.exportTell}>
      <div className={styles.inner}>
        <div className={styles.headerSection}>
          <div className={styles.titleSection}>
            متخصصان در مورد ما چه می گویند؟
          </div>
          <div className={styles.desc}>
            جملاتی از والدین و متخصصان حوزه کودک در مورد پلنت
          </div>
        </div>
        <div className={styles.comments}>
          <div className={styles.comment}>
            <div className={styles.content}>
              <div className={styles.iconQuote}>
                <Image src={quote} />
              </div>
              <div className={styles.avatar}>
                <Image src={experts1} alt="avatar" />
              </div>
              <div className={styles.name}>
                دکتر مشکانی
              </div>
              <div className={styles.posistion}>روانشناس کودک</div>
              <div className={styles.desc}>
                پلنت یک راهکار مناسب در فضای متشنج دنیای مدیا بنظر می رسه.
              </div>
            </div>
          </div>
          <div className={styles.comment}>
            <div className={styles.content}>
              <div className={styles.iconQuote}>
                <Image src={quote} />
              </div>
              <div className={styles.avatar}>
                <Image src={experts2} alt="avatar" />
              </div>
              <div className={styles.name}>
                دکتر محامدی
              </div>
              <div className={styles.posistion}>روانشناس کودک</div>
              <div className={styles.desc}>
                میزان استقبال از این سیستم مشخص کننده میزان اهمیت این موضوع باری خانوادهاست.
              </div>
            </div>
          </div>
          <div className={styles.comment}>
            <div className={styles.content}>
              <div className={styles.iconQuote}>
                <Image src={quote} />
              </div>
              <div className={styles.avatar}>
                <Image src={experts3} alt="avatar" />
              </div>
              <div className={styles.name}>
                دکتر موسی زاده
              </div>
              <div className={styles.posistion}>عضویت هیات علمی</div>
              <div className={styles.desc}>
                علاوه بر جسم کودک روح آن نیز از اهمیت بالایی برخوردار است.
              </div>
            </div>
          </div>
        </div>
        <div className={styles.safine}>
          <Image src={safine} />
        </div>
        <div className={styles.robot}>
          <Image src={robot} />
        </div>
      </div>
    </div>
    <div className={styles.knowMoreAboutContentChoice}>
      <div className={styles.inner}>
        <div className={styles.titleSection}>در مورد انتخاب محتوی بیشتر بدانیم</div>
        <div className={styles.descSection}>مقالاتی تخصصی مخصوص والدین برای انتخاب صحیح تر محتواهای گوناگون</div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <Image src={sync} />
          </div>
          <div className={styles.card}>
            <Image src={friendly} />
          </div>
          <div className={styles.card}>
            <Image src={rightConnection} />
          </div>
        </div>
      </div>
    </div>
    <footer className={styles.footerLanding}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.aboutUs}>
            <div className={styles.title}>درباره ما</div>
            <div className={styles.desc}>متن درباره سامانه پلنت و مشخصاتی و قابلیتهای آن متن درباره سامانه پلنت و مشخصاتی و قابلیتهای آن متن درباره سامانه پلنت و مشخصاتی و قابلیتهای آن متن درباره سامانه پلنت و مشخصاتی و قابلیتهای آن. متن درباره سامانه پلنت و مشخصاتی و قابلیتهای آن متن درباره سامانه پلنت و مشخصاتی و قابلیتهای آن متن درباره سامانه پلنت و مشخصاتی و قابلیتهای آن متن درباره سامانه پلنت و مشخصاتی و قابلیتهای آن متن درباره سامانه پلنت و مشخصاتی و قابلیتهای. </div>
          </div>
          <div className={styles.contactUs}>
            <div className={styles.title}>تماس با ما</div>
            <div className={styles.emailMobile}>
              <input type="text" placeholder="ایمیل یا شماره تماس شما" />
              <div className={styles.icon}>
                <Image src={user} alt="user" />
              </div>
            </div>
            <div className={styles.yourText}>
              <textarea className={styles.textarea} placeholder="متن پیام شما">
              </textarea>
              <div className={styles.icon}>
                <Image src={user} alt="user" />
              </div>
            </div>
            <div className={styles.submitText}>
              <button type="button" className={styles.submitBtn}>ثبت پیام </button>
            </div>
          </div>
          <div className={styles.knowMoreUs}>
            <div className={styles.title}>درباره ما بیشتر بدانید</div>
            <ul className={styles.links}>
              <li>
                <a href="">توضیح ساختار سامانه</a>
              </li>
              <li>
                <a href="">دانلود برنامه موبایل</a>
              </li>
              <li>
                <a href="">چرا ما به پلنت نیاز داریم</a>
              </li>
            </ul>
            <div className={styles.connectImageInfo}> برای ارتباط با ما از طریق ایمیل info@plannet.com اقدام نمایید و یا از طریق فرم زیر با در تماس باشید.</div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.inner}>
            <div className={styles.text}>تمامی حقوق این سایت محفوظ است.</div>
            <div className={styles.socialMedias}>
              <div className={styles.socialMedia}>
                <Image src={facebook} />
              </div>
              <div className={styles.socialMedia}>
                <Image src={googleplay} />
              </div>
              <div className={styles.socialMedia}>
                <Image src={message} />
              </div>
              <div className={styles.socialMedia}>
                <Image src={twitter} />
              </div>
            </div>
            <div className={styles.telescope}>
              <Image src={telescopeBig} />
            </div>
            <div className={styles.logo}>
              <Image src={logo} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>;
}

Home.guard = () => true;
