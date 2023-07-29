import { Form, Button, Select } from "antd";
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx/xlsx.mjs";
import "./style.css";
import { ReloadOutlined } from "@ant-design/icons";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export const ColorScheme = () => {
  const [datas, setDatas] = useState([]);
  const [rootLips, setRootLips] = useState([]);
  const [afterLips, setAfterLips] = useState([]);
  const [result, setResult] = useState();
  const [rootLip, setRootLip] = useState("");
  const [afterLip, setAfterLip] = useState("");
  const [form] = Form.useForm();
  const formRef = React.useRef(null);
  const fileUrl = "./mau.xlsx";
  let hasFetch = false;
  const onRootSelect = (value, key) => {
    setRootLip(key.value);
    const afterLips2 = datas.find((obj) => obj.root.value === key.value);
    const afterLips3 = [];
    afterLips2.mix.forEach((lip) => {
      afterLips3.push(lip.after);
    });
    form.setFieldValue("after", null);
    setAfterLip();
    setResult();
    setAfterLips(afterLips3);
  };
  const onAfterSelect = (value, key) => {
    setAfterLip(value);
    const result2 = datas.find((obj) => obj.root.value === rootLip);
    console.log(result2);
    const result3 = result2.mix.find((obj) => obj.after.value === key.value);
    console.log(result3);
    setResult(result3.result);
    console.log(`selected ${value} `);
    console.log(key);
  };
  const onSearch = (value, key) => {
    console.log("search:", value, key);
  };
  useEffect(() => {
    if (!hasFetch) {
      hasFetch = true;
      fetch(fileUrl)
        .then((response) => response.arrayBuffer())
        .then((data) => {
          const workbook = XLSX.read(data, { type: "array" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          jsonData.shift();
          const dataTemp = [];
          jsonData.forEach((row) => {
            if (row[8]) {
              const dataExist = dataTemp.find(
                (obj) => obj.root.value === row[2]
              );
              if (!dataExist) {
                dataTemp.push({
                  key: row[0],
                  root: {
                    value: row[2],
                    label: row[1],
                  },
                  mix: [
                    {
                      after: {
                        value: row[5],
                        label: row[4],
                      },
                      result: {
                        value: row[8],
                        label: row[7],
                      },
                    },
                  ],
                });
              } else {
                dataExist.mix.push({
                  after: {
                    value: row[5],
                    label: row[4],
                  },
                  result: {
                    value: row[8],
                    label: row[7],
                  },
                });
              }
            }

            // console.log(dataTemp);
          });
          setDatas(dataTemp);
          const lips = [];
          dataTemp.forEach((data) => {
            lips.push(data.root);
          });
          setRootLips(lips);
          // setDatas(jsonData);
          console.log(jsonData[0]);
          // Do something with the im ported data
        })
        .catch((error) => {
          console.error("Error importing Excel file:", error);
        });
    }
  }, []);
  function handleReset() {
    setRootLip();
    setAfterLip();
    setResult();
    form.resetFields();
  }
  // useEffect(() => {
  // console.log(datas[0]);
  // datas.forEach((row, index) => console.log(index));
  // }, []);
  const onFinish = () => {
    const resultTemp = datas.find(
      (data) => data.after === afterLip && data.root === rootLip
    );
    if (resultTemp) {
      console.log(resultTemp.value);
      setResult({ key: resultTemp.value, value: resultTemp.label });
    }
  };
  console.log(afterLip);
  return (
    <div className="layout">
      <div className="container">
        <div className="containerHeader"></div>
        <div className="header">Change Academy</div>
        <Form
          className="form"
          form={form}
          {...layout}
          ref={formRef}
          onReset={handleReset}
          style={{
            maxWidth: 1000,
          }}
        >
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="reset">
              <ReloadOutlined />
            </Button>
          </Form.Item>
          <Form.Item name="root" label="Màu môi gốc">
            <Select
              showSearch
              placeholder="Chọn màu môi gốc"
              optionFilterProp="children"
              onChange={onRootSelect}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              style={{ marginBottom: 10 }}
              disabled={result}
              options={rootLips}
            />
            <div
              className="sample"
              style={{
                backgroundColor: rootLip,
                display: rootLip ? "flex" : "none",
              }}
            ></div>
          </Form.Item>
          <Form.Item name="after" label="Màu môi sau bong">
            <Select
              showSearch
              disabled={result}
              placeholder="Chọn màu môi sau bong"
              optionFilterProp="children"
              onChange={onAfterSelect}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              style={{ marginBottom: 10 }}
              options={afterLips}
            />
            <div
              className="sample"
              style={{
                backgroundColor: afterLip,
                display: afterLips ? "flex" : "none",
              }}
            ></div>
          </Form.Item>
        </Form>
        <div>
          <Form style={{ width: "400px" }} {...layout}>
            <Form.Item label="Màu đi vào" style={{ marginBottom: 5 }}>
              {result ? (
                <div
                  className="sampleresult"
                  style={{ backgroundColor: result.value }}
                >
                  {result.label}
                </div>
              ) : (
                <div className="result">Hiện không có màu này</div>
              )}
            </Form.Item>
            <Form.Item {...tailLayout}></Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};