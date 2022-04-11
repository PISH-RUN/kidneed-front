import { useRoot, useSubmitRoot } from "core-team/api/approach";
import { useRouter } from "next/router";
import { Button, Typography } from "@mui/material";
import { Form, Radio } from "antd";
import _ from "lodash";

const RootStep = () => {
  const router = useRouter();
  const rahche = router.query.id as string;
  const { data: roots } = useRoot(parseInt(rahche));
  const { mutateAsync: submitRoot } = useSubmitRoot();

  const handleSubmit = (values: any) => {
    const rootList: number[] = [];
    _.filter(values, (answer, id) => {
      if (answer === "yes") {
        rootList.push(parseInt(id));
      }
    });
    submitRoot({ selected: rootList, rahche }).then(() => {
      router.push({
        pathname: "/parent/rahche",
        query: {
          id: rahche,
          step: "result"
        }
      });
    });
  };

  return (
    <>
      <Typography variant="h5">لطفا موارد زیر را برای فرزندتان مشخص نمایید</Typography>
      <div className="tw-mt-8">
        <Form layout="vertical" onFinish={handleSubmit}>
          {roots?.data?.map((s: any) => (
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

export default RootStep;