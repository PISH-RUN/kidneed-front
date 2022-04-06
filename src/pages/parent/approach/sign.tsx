import { useApproach, useSign } from "core-team/api/approach";
import { useRouter } from "next/router";
import { Button, Typography } from "@mui/material";
import { Form, Radio } from "antd";
import _ from "lodash";

const SignStep = () => {
  const router = useRouter();
  const approachId = router.query.id as string;
  const { data: sign } = useSign(parseInt(approachId));

  const handleSubmit = (values: any) => {
    const signList: string[] = [];
    _.filter(values, (answer, id) => {
      if (answer === "yes") {
        signList.push(id);
      }
    });
    router.push({
      pathname: "/parent/approach",
      query: {
        id: approachId,
        sign: signList.length > 0 ? signList : ""
      }
    });
  };

  return (
    <>
      <Typography variant="h5">لطفا موارد زیر را برای فرزندتان مشخص نمایید</Typography>
      <div className="tw-mt-8">
        <Form layout="vertical" onFinish={handleSubmit}>
          {sign?.map((s: any) => (
            <Form.Item label={s.title} key={s.id} name={s.id} className="!tw-mt-10" initialValue="no">
              <Radio.Group>
                <Radio value="yes" className="tw-w-32">بله</Radio>
                <Radio value="no" className="tw-w-32">خیر</Radio>
              </Radio.Group>
            </Form.Item>
          ))}

          <Button variant="contained" type="submit" className="tw-w-52 !tw-mt-10 !tw-rounded-full">ادامه</Button>
        </Form>
      </div>
    </>
  );
};

export default SignStep;