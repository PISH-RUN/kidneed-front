import styles from "landing/styles/index.module.css";
import Image from "next/image";
import logo from "landing/media/images/logo.png";
import Link from "next/link";
import p1 from "landing/media/images/p1.png";
import p2 from "landing/media/images/p2.png";
import barkat from "landing/media/images/barkat.png";
import digiton from "landing/media/images/digiton.png";
import filmgardi from "landing/media/images/filmgardi.png";
import lastActivities from "landing/media/images/lastActivities.png";
import bookmarks from "landing/media/icons/bookmarks.png";
import pieChart from "landing/media/icons/pie-chart.png";
import roadMap from "landing/media/images/roadMap.png";
import quote from "landing/media/icons/quote.png";
import robot from "landing/media/images/robot.png";
import safine from "landing/media/images/safine.png";
import rightConnection from "landing/media/images/rightConnection.png";
import friendly from "landing/media/images/friendly.png";
import sync from "landing/media/images/sync.png";
import user from "landing/media/icons/user.png";
import twitter from "landing/media/images/twitter.png";
import message from "landing/media/images/message.png";
import googleplay from "landing/media/images/googleplay.png";
import telescopeBig from "landing/media/images/telescope.png";
import facebook from "landing/media/images/facebook.png";
import rahcheIcon from "landing/media/images/rahcheIcon.png";
import maktabkhane from "landing/media/images/maktabkhane.png";
import haery from "landing/media/images/haery.jpg";
import jan from "landing/media/images/jan.jpg";
import erik from "landing/media/images/erik.png";
import chamrani from "landing/media/images/chamrani.png";
import pishrun from "landing/media/images/pishrun.png";
import khallagh from "landing/media/images/khallagh.png";
import { BLOG_URL } from "../core-team/constants";
import BaseLayout from "../layouts/baseLayout";
import { ReactElement } from "react";
import { Button, Typography } from "@mui/material";
import { IoCheckmarkCircle } from "react-icons/io5";

export default function Home() {
  return <div className={styles.landing}>
    <div className={styles.gradTopColor}>
      <div className={styles.p1}>
        <Image src={p1} />
      </div>
      <div className={styles.p2}>
        <Image src={p2} />
      </div>
    </div>
    <div className={styles.menubar}>
      <div className={styles.menu}>
        <div className={styles.logo}>
          <Image src={logo} alt="logo" />
        </div>
        <div className={styles.menuItems}>
          <div className="!tw-text-gray-700">
            <Link href="/">صفحه اصلی</Link>
          </div>
          <div className="!tw-text-gray-700">
            <Link href="#about-us">درباره ما</Link>
          </div>
          <div className="!tw-text-gray-700">
            <Link href="#contact-us">تماس با ما</Link>
          </div>
          <div>
            <Link href={BLOG_URL}>بلاگ</Link>
          </div>
        </div>
      </div>
      <div className={styles.login}>
        <Link href="/subscription">
          <Button
            variant="contained"
            className="tw-border-0 !tw-rounded-full tw-px-10 !tw-bg-green-500 !tw-ml-4"
            color="success"
          >خرید اشتراک یکودو</Button>
        </Link>
        <Link href="/login">
          <Button variant="contained" color="primary" className="!tw-rounded-full">ورود</Button>
        </Link>
      </div>
    </div>
    <div className={styles.header}>
      <div className={styles.title}>
        <h1>حال نو، یکودو</h1>
      </div>
      <div className={styles.desc}>
        <h3>
          دستیاری کار بلد برای مدیریت هوشمند سرگرمی کودکانمان
        </h3>
      </div>
      <div className={styles.buttons}>
        <Link href="/login">
          <button type="button" className={styles.btnStartTrip}>سفر را شروع کنید</button>
        </Link>
        <Link href="">
          <button type="button" className={styles.knowMoreBtn}>یکودو چیه؟</button>
        </Link>
      </div>
    </div>
    <div className={styles.movieSectoin}>
      <div className={styles.movie}>
        <div className={styles.iframeDiv}><span style={{ display: "block", paddingTop: "57%" }}></span>
          <iframe
            src="https://www.aparat.com/video/video/embed/videohash/7ZXqM/vt/frame"
            allowFullScreen={true}
          ></iframe>
        </div>
      </div>
      <div className={styles.descMovie} id="about-us">
        <div className={styles.title}>زمین بازی اختصاصی کودک شما</div>
        <div className={styles.desc}>
          کودکان از لابه‌لای سرگرمی‌ها و بازی‌هایشان بیشتر از آن چیزی که ما فکر می‌کنیم می‌آموزند و از آن تأثیر
          می‌گیرند. این سرگرمی‌ها می‌تواند محتوایِ مخرّب یا سازنده داشته باشد و این یکی از دغدغه‌های مهم اولیاست.
          یکودو دستیاری پای‌ِ‌کار است که با عینک روان‌شناختی و تربیتی سرگرمی‌هایی را به کودک شما پیشنهاد می‌دهد که
          متناسب با نیازهای رشدی و مهارتی او باشد. همچنین این امکان برای والدین وجود دارد که سبد سرگرمی‌های کودک را رصد
          کنند و در صورت نیاز آن را تغییر دهند.
          یکودو یارکمکیِ خانواده‌ی شماست.
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
          <Image src={barkat} />
        </div>
        <div className={styles.item}>
          <Image src={khallagh} />
        </div>
        <div className={styles.item}>
          <Image src={pishrun} />
        </div>
        <div className={styles.item}>
          <Image src={chamrani} />
        </div>
      </div>
    </div>
    <div className={styles.someTotalInformation}>
      <div className={styles.inner}>
        <div className={styles.choicePossible}>
          <div className={styles.title}>امکان انتخاب انواع سرگرمی های مخصوص به کودک خودتان</div>
          <div className={styles.desc}>برای تنظیم برنامه روزانه فرزندتان، می‌توانید به صفحه‌ی اختصاصی والدین مراجعه کنید
            و پس از تماشای ویدئوهای معرّفی حیطه‌هایِ رشدی و تکمیل پرسشنامه‌ی نیازهای مهارتی کودک، بسته‌ی پیشنهادی
            سرگرمی‌های روزانه فرزندتان را دریافت نمایید.
          </div>
          <div className={styles.countingInfo}>
            <div className={styles.item}>
              <div className={styles.count}>۲۵۰۰+</div>
              <div className={styles.text}>ویدئو</div>
            </div>
            <div className={styles.item}>
              <div className={styles.count}>۸۰۰+</div>
              <div className={styles.text}>صوت</div>
            </div>
            <div className={styles.item}>
              <div className={styles.count}>۳۴۱+</div>
              <div className={styles.text}>کتاب</div>
            </div>
            <div className={styles.item}>
              <div className={styles.count}>۱۵+</div>
              <div className={styles.text}>فعالیت عملی</div>
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
        <div className={styles.titleSection}>آنچه در زمین بازی «یکودو» خواهید دید...</div>
        <div className={styles.tabs}>
          <div className={styles.tab}>
            <div className={styles.icon}>
              <Image src={pieChart} />
            </div>
            <div className={styles.detail}>
              <div className={styles.title}>رصدخونه</div>
              <div className={styles.desc}>(گزارش اختصاصی از وضعیت کودک))</div>
            </div>
          </div>
          <div className={styles.tab}>
            <div className={styles.icon}>
              <Image src={bookmarks} />
            </div>
            <div className={styles.detail}>
              <div className={styles.title}>پاس گل</div>
              <div className={styles.desc}>بهانه های تعامل با کودک</div>
            </div>
          </div>
          <div className={styles.tab}>
            <div className={styles.icon}>
              <Image
                width={27}
                height={27} src={rahcheIcon}
              />
            </div>
            <div className={styles.detail}>
              <div className={styles.title}>راهچه</div>
              <div className={styles.desc}>راهکارهای مسئله های رایج</div>
            </div>
          </div>
          <div className={styles.tab}>
            <div className={styles.icon}>
              <Image
                width={27}
                height={27} src={maktabkhane}
              />
            </div>
            <div className={styles.detail}>
              <div className={styles.title}>مکتب خونه</div>
              <div className={styles.desc}>محتوا برای دانش افزایی والدین</div>
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
            متخصصان درباره اهمیت سرگرمی در کودکی چه می گویند
          </div>
          <div className={styles.desc}>
            جملاتی از والدین و متخصصان حوزه کودک در مورد یکودو
          </div>
        </div>
        <div className={styles.comments}>
          <div className={styles.comment}>
            <div className={styles.content}>
              <div className={styles.iconQuote}>
                <Image src={quote} />
              </div>
              <div className={styles.avatar}>
                <Image src={erik} alt="avatar" />
              </div>
              <div className={styles.name}>
                اریک اریکسن
              </div>
              <div className={styles.posistion}>روانشناس کودک</div>
              <div className={styles.desc}>
                در هر کودکی در هر مرحله از رشد اعجاز جدیدی برای آشکار شدن وجود دارد.
              </div>
            </div>
          </div>
          <div className={styles.comment}>
            <div className={styles.content}>
              <div className={styles.iconQuote}>
                <Image src={quote} />
              </div>
              <div className={styles.avatar}>
                <Image src={jan} alt="avatar" />
              </div>
              <div className={styles.name}>
                ژان پیازه
              </div>
              <div className={styles.posistion}>روانشناس کودک</div>
              <div className={styles.desc}>
                اگر می خواید خلاق باشید، باید تا حدی کودک باشید با همان میزان خلاقیت و نبوغی که در یک کودک قبل از آنکه
                توسط جامعه بزرگسالان تغییر شکل داده شود، وجود دارد.
              </div>
            </div>
          </div>
          <div className={styles.comment}>
            <div className={styles.content}>
              <div className={styles.iconQuote}>
                <Image src={quote} />
              </div>
              <div className={styles.avatar}>
                <Image src={haery} alt="avatar" />
              </div>
              <div className={styles.name}>
                آیت الله حائری شیرازی:
              </div>
              <div className={styles.posistion}>عضویت هیات علمی</div>
              <div className={styles.desc}>
                پدر باید با بچه اش رفیق باشد، با بچه اش هم بازی بشود. پدر باید رفیق اول فرزندش باشد. وای به حال پدری که
                رفیق دوم فرزندش باشد.
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
        <div className={styles.titleSection}>مکتب خونه، ویژه پدر مادرها</div>
        <div className={styles.descSection}>محتواهای به درد بخور و کاربردی مخصوص والدین، درباره شیوه های صحیح والدگری و
          تعامل با کودک
        </div>
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
    <div className="tw-bg-sky-100">
      <div className="tw-py-24">
        <Typography variant="h3" className="tw-text-center">اشتراک یکودو</Typography>
        <div className="tw-flex tw-justify-center tw-mt-10 tw-mb-14">
          <div className="tw-flex tw-ml-4">
            <IoCheckmarkCircle className="tw-text-green-500 tw-text-xl tw-ml-2" />
            <span>دسترسی کامل به فیلم</span>
          </div>
          <div className="tw-flex tw-ml-4">
            <IoCheckmarkCircle className="tw-text-green-500 tw-text-xl tw-ml-2" />
            <span>دسترسی کامل به کتاب</span>
          </div>
          <div className="tw-flex tw-ml-4">
            <IoCheckmarkCircle className="tw-text-green-500 tw-text-xl tw-ml-2" />
            <span>دسترسی کامل به پادکست</span>
          </div>
          <div className="tw-flex tw-ml-4">
            <IoCheckmarkCircle className="tw-text-green-500 tw-text-xl tw-ml-2" />
            <span>دسترسی کامل به بازی</span>
          </div>
          <div className="tw-flex tw-ml-4">
            <IoCheckmarkCircle className="tw-text-green-500 tw-text-xl tw-ml-2" />
            <span>و ...</span>
          </div>
        </div>
        <div className="tw-flex tw-justify-center tw-mb-20">
          <div className="tw-text-center tw-bg-white tw-p-6 tw-w-80 tw-rounded-xl tw-ml-5 tw-border tw-border-gray-100">
            <Typography variant="h5" className="!tw-mb-4 tw-text-center">اشتراک 1 ماهه</Typography>
            <div className="tw-text-gray-400 tw-font-bold tw-text-md tw-relative tw-inline-block tw-h-5">
              <span className="tw-absolute tw-w-full tw-h-[2px] tw-bg-gray-500 tw-top-1/2 tw--rotate-6" />
              <span>69,999 تومان</span>
            </div>
            <div className="tw-text-center tw-text-green-500 tw-font-bold tw-text-lg">59,999 تومان</div>
          </div>
          <div className="tw-bg-white tw-p-6 tw-w-80 tw-rounded-xl tw-ml-5 tw-border tw-border-gray-100">
            <Typography variant="h5" className="!tw-mb-4 tw-text-center">اشتراک 3 ماهه</Typography>
            <div className="tw-h-5" />
            <div className="tw-text-center tw-text-green-500 tw-font-bold tw-text-lg">59,999 تومان</div>
          </div>
          <div className="tw-bg-white tw-p-6 tw-w-80 tw-rounded-xl tw-border tw-border-gray-100">
            <Typography variant="h5" className="!tw-mb-4 tw-text-center">اشتراک 6 ماهه</Typography>
            <div className="tw-h-5" />
            <div className="tw-text-center tw-text-green-500 tw-font-bold tw-text-lg">59,999 تومان</div>
          </div>
        </div>
        <div className="tw-flex tw-justify-center">
          <Link href="/login?redirect=/subscription">
            <Button
              variant="contained"
              className="tw-border-0 !tw-rounded-full tw-px-10 !tw-bg-green-500"
              color="success"
              size="large"
            >خرید اشتراک یکودو</Button>
          </Link>
        </div>
      </div>
    </div>
    <footer className={styles.footerLanding}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.aboutUs}>
            <div className={styles.title}>درباره ما</div>
            <div className={styles.desc}>متن درباره سامانه یکودو و مشخصاتی و قابلیتهای آن متن درباره سامانه یکودو و
              مشخصاتی و قابلیتهای آن متن درباره سامانه یکودو و مشخصاتی و قابلیتهای آن متن درباره سامانه یکودو و مشخصاتی
              و قابلیتهای آن. متن درباره سامانه یکودو و مشخصاتی و قابلیتهای آن متن درباره سامانه یکودو و مشخصاتی و
              قابلیتهای آن متن درباره سامانه یکودو و مشخصاتی و قابلیتهای آن متن درباره سامانه یکودو و مشخصاتی و
              قابلیتهای آن متن درباره سامانه یکودو و مشخصاتی و قابلیتهای.
            </div>
          </div>
          <div className={styles.contactUs} id="contact-us">
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
              <button type="button" className={styles.submitBtn}>ثبت پیام</button>
            </div>
          </div>
          <div className={styles.knowMoreUs}>
            <div className={styles.title}>درباره ما بیشتر بدانید</div>
            <ul className={styles.links}>
              <li>
                <Link href="/login">شروع کنیم</Link>
              </li>
              <li>
                <a href={BLOG_URL}>بلاگ</a>
              </li>
              <li>
                <a href="https://api.yekodo.ir/uploads/yekodo_8286579552.apk?updated_at=2022-04-21T05:59:21.697Z">دانلود
                  برنامه موبایل</a>
              </li>
            </ul>
            <div className={styles.connectImageInfo}> برای ارتباط با ما از طریق ایمیل info@yekodo.ir اقدام نمایید و یا
              از طریق فرم زیر با در تماس باشید.
            </div>
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

Home.getLayout = (page: ReactElement) => (
  <BaseLayout>{page}</BaseLayout>
);

Home.guard = () => true;
