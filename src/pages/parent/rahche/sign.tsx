import { useSign, useSubmitSign } from "core-team/api/approach";
import { useRouter } from "next/router";
import { Button, Typography } from "@mui/material";
import { Form, Modal, Radio } from "antd";
import _ from "lodash";

const SignStep = () => {
  const router = useRouter();
  const rahche = router.query.id as string;
  const { data: sign } = useSign(parseInt(rahche));
  const { mutateAsync: submitSign } = useSubmitSign();

  const handleSubmit = (values: any) => {
    const signList: string[] = [];
    _.filter(values, (answer, id) => {
      if (answer === "yes") {
        signList.push(id);
      }
    });

    if(signList.length === 0) {
      return Modal.info({
        direction: "rtl",
        width: 550,
        okButtonProps: {
          className: "tw-bg-blue-500"
        },
        content: <span className="!tw-text-lg">برای ادامه باید حداقل به یکی از سوالات جواب بله بدهید.</span>
      });
    }

    submitSign({selected: signList, rahche}).then(() => {
      router.push({
        pathname: "/parent/rahche",
        query: {
          step: "root",
          id: rahche,
        }
      });
    })
  };

  return (
    <>
      <Typography variant="h5">لطفا موارد زیر را در مورد فرزندتان مشخص نمایید</Typography>
      <div className="tw-mt-8">
        <Form layout="vertical" onFinish={handleSubmit}>
          {sign?.data && sign?.data?.map((s: any) => (
            <Form.Item label={s.body} key={s.id} name={s.id} className="!tw-mt-10" initialValue="no">
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