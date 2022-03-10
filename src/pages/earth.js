import { useEffect, useState } from 'react'
import { Modal, Steps } from "antd";
import styles from 'earth/styles/earth.module.css'
import Image from 'next/image'
import SearchBox from 'earth/components/searchBox'
import Card from '../earth/components/card';
import ParentDashboardLayout from 'layouts/parent-dashboard-layout'
import {
  Typography,
  Box,
  Stack,
  Grid,
  Rating,
  Avatar,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import ArrowDown from "layouts/icons/arrow-down";
import Question from 'earth/components/question';
import { strapi } from "@kidneed/services";

const SideDashboard = (props) => {
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ py: 2, pr: 3, cursor: "pointer" }}
      >
        <Avatar
          sx={{ width: 90, height: 90, p: 2, background: "#E2F1FD" }}
          src="/images/avatar-woman.png"
        />
        <Box flexGrow={1}>
          <Typography variant="h5">حسنا خانوم</Typography>
          <Typography variant="h6" sx={{ color: "#8CA3A5" }}>
            2500 سکه
          </Typography>
        </Box>
        <Box>
          <ArrowDown sx={{ color: "#8CA3A5" }} />
        </Box>
      </Stack>
      <Box>
        <Box component="img" src="/images/pd-test.png" sx={{ px: 2 }} />
      </Box>
    </>
  );
};
const Earth = () => {
  const { Step } = Steps;
  const [step, setStep] = useState(0);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(true);
  const [modal2, setModal2] = useState(false);
  const [value, setValue] = useState(false);
  const [dataApproach, setDataApproach] = useState([]);
  const [questionData, setQuestionData] = useState([]);
  const [dataRoot, setDataRoot] = useState([]);



  const submitAnswer = (e, id) => {
    const data = [...questionData]
    const questionChanged = questionData.find((question) => question.id === id)
    questionChanged.answer = e.target.value
    const index = data.findIndex((hel) => hel.id === questionChanged.id)
    data[index] = questionChanged
    setQuestionData(data)
  };
  useEffect(() => {
    getApproach()
  }, [])
  const getApproach = async (e) => {
    try {
      const data = await strapi.request("get", "/earth/approach?" + (e?.target?.value ? "title=" + e.target.value : ""))
      setDataApproach(data)
    } catch (err) {
      console.log(err)
    }

  }
  const gotoQuestion = async (id) => {
    try {
      const data = await strapi.request("get", "/earth/sign?approachId[]=" + id)
      const dataModified = data.map((question) => ({
        createdAt: question.createdAt,
        id: question.id,
        publishedAt: question.publishedAt,
        title: question.title,
        updatedAt: question.updatedAt,
        answer: false
      }))
      setQuestionData(dataModified)
      setStep(1)
    } catch (err) {
      console.log(err)
    }
  }
  const getRoot = async (e) => {
    const yes = questionData.filter((que) => que.answer === true)
    console.log(yes)
    const string = ""
    const hi = yes.map((hi, index) => {
      string += (index === 0 ? "" : "&") + "signId[]=" + hi.id
    })
    try {
      const data = await strapi.request("get", "/earth/root?" + string)
      setDataRoot(data)
    } catch (err) {
      console.log(err)
    }

  }
  return (
    <div className={styles.earth}>
      <div>
        <div className={styles.steps}>
          <Steps current={step}>
            <Step title="موضوع" />
            <Step title="نشانه ها" />
            <Step title="ریشه ها" />
            <Step title="راهکار" />
          </Steps>
        </div>
      </div>
      {step === 0 && <div>
        <SearchBox search={(e) => getApproach(e)} />
        <div className={styles.cards}>
          {dataApproach.length > 0 && dataApproach.map((item) =>
            <div className={styles.cardBox}>
              <Card gotoQuestion={(id) => gotoQuestion(id)} data={item} />
            </div>
          )}
        </div>
        <Modal
          footer={false}
          closable={false}
          centered
          visible={modal}
          onOk={() => setModal(false)}
          onCancel={() => setModal(false)}
          className={styles.preShowModal + " tw-rounded-3xl tw-overflow-hidden"}
        >
          <div className={styles.allContent}>
            <div className={styles.header}>
              راه چه
            </div>
            <div className={styles.content}>
              <div className={styles.plan}>
                <div className={styles.text}>
                  پلنت، تعیین برنامه هوشمند اوقات فراغت و درسی کودک شما پلنت، تعیین برنامه هوشمند اوقات فراغت و درسی کودک شما پلنت، تعیین برنامه هوشمند اوقات فراغت و درسی کودک شما پلنت، تعیین برنامه هوشمند اوقات فراغت و درسی کودک شما پلنت، تعیین برنامه هوشمند اوقات فراغت و درسی کودک شما پلنت، تعیین برنامه هوشمند اوقات فراغت و درسی کودک شما
                </div>
                <div className={styles.buttons}>
                  <div>
                    <button className={styles.continueBtn} onClick={() => setModal(false)} type='button'>ادامه</button>
                  </div>
                  <div>
                    <button className={styles.backBtn} onClick={() => setModal(false)} type='button'>بازگشت</button>
                  </div>
                </div>
              </div>
              <div className={styles.movie}>
                <div className={styles.iframeDiv}><span style={{ display: "block", paddingTop: "57%" }}></span><iframe src="https://www.aparat.com/video/video/embed/videohash/7ZXqM/vt/frame" allowFullScreen={true} ></iframe></div>
              </div>
            </div>
          </div>
        </Modal>
      </div>}
      {step === 1 && <div className={styles.questions}>
        <div className={styles.notif}>لطفا موارد زیر را در مورد فرزندتان مشخص نمایید</div>
        {questionData.length > 0 && questionData.map((ques) =>
          <Question data={ques} value={ques.answer} onChange={(e, id) => submitAnswer(e, id)} />
        )}
        <div className={styles.continueBox}>
          <button type="button" onClick={getRoot} className={styles.continueBtn}>ادامه</button>
        </div>
      </div>}
      {step === 2 && <div className={styles.questions}>
        <div className={styles.notif}>لطفا موارد زیر را در مورد فرزندتان مشخص نمایید</div>
        {dataRoot.length > 0 && dataRoot.map((ques) =>
          <Question data={ques} value={ques.answer} onChange={(e, id) => submitAnswer(e, id)} />
        )}
        <div className={styles.continueBox}>
          <button type="button" className={styles.continueBtn}>ادامه</button>
        </div>
      </div>}
      {step === 3 && <div className={styles.final}>
        <div className={styles.notif}>عنوان صفحه نهایی</div>
        <div className={styles.desc}>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
        </div>
        <div className={styles.continueBox}>
          <button type="button" onClick={() => setModal2(true)} className={styles.continueBtn}>مشاهده راهکار</button>
        </div>
        <Modal
          footer={false}
          closable={true}
          centered
          visible={modal2}
          onOk={() => setModal2(false)}
          onCancel={() => setModal2(false)}
          className={styles.resultModal + " tw-rounded-3xl tw-overflow-hidden"}
        >
          <div className={styles.allContent}>
            <div className={styles.header}>
              عنوان راهکار
            </div>
            <div className={styles.content}>
              <div className={styles.plan}>
                <div className={styles.text}>
                  پروین اعتصامی که نام اصلی او «رخشنده» است در 25 اسفند 1285 هجری شمسی در شهر تبریز به دنیا آمد. از پروین به عنوان یکی از مشهورترین شاعران زن ایران یاد می‌شود. پروین زمانی که کودک بود همراه خانواده‌اش به تهران آمدند. یوسف اعتصامی پدر پروین معروف به اعتصام‌الملک از نویسندگان و دانشمندان نامدار ایرانی بود که اولین چاپخانه را در تبریز بنا کرد و مدتی هم نماینده‌ی مجلس بود. مادرش اختر اعتصامی زنی خانه‌دار بود. پدر و مادر پروین در زندگی او نقش موثری داشتند چرا که آن‌ها با پرورش احساسات لطیف و شاعرانه‌ی دخترشان و تشویق و علاقه در استعداد شعرسرایی او کمک زیادی در این زمینه به پروین کردند.
                </div>
              </div>
              <div className={styles.movie}>
                <div className={styles.iframeDiv}><span style={{ display: "block", paddingTop: "57%" }}></span><iframe src="https://www.aparat.com/video/video/embed/videohash/7ZXqM/vt/frame" allowFullScreen={true} ></iframe></div>
              </div>
            </div>
          </div>
        </Modal>
      </div>}

    </div>
  );
};

Earth.getLayout = (children) => (
  <ParentDashboardLayout >{children}</ParentDashboardLayout>
);
export default Earth;
Earth.guard = () => true
