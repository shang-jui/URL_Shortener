/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import { status } from "./App";

function TextFieldComponent({ state, setState, setShortUrl }) {
  const [url, setUrl] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const handleChange = (e) => {
    if (isEmpty) {
      setIsEmpty(false);
      setUrl(e.target.value);
    } else {
      setUrl(e.target.value);
    }
  };
  const handleSubmit = () => {
    console.log("wow");
    setState(status.LOADING);
    if (url.length === 0) {
      setIsEmpty(true);
    }
    // const request = require("request");
    // url = ""; //
    // request(url, handleProcessAPI);
    // function handleProcessAPI(error, response, body) {
    //   if (error) {
    //     setState(status.ERROR);
    //     console.log(`請求錯誤： ${error}`);
    //     return;
    //   }

    //   if (response.statusCode >= 300) {
    //     setState(status.ERROR);
    //     console.log(`請求錯誤，狀態碼：${response.statusCode}`);
    //     return;
    //   }

    //   try {
    //     setState(status.SUCCESS);
    //     setShortUrl(JSON.parse(body)); 
    //   } catch (error) {
    //     setState(status.ERROR);
    //     console.log("error!!! 資料解析錯誤");
    //     console.log("ERROR:", error);
    //     return;
    //   }
    // }
    setState(status.DEFAULT);
  };
  return (
    <div css={textFieldContainerStyle}>
      <TextField
        id="standard-basic"
        label="Input your url"
        variant="standard"
        css={textFieldStyle}
        value={url}
        helperText={isEmpty && "Empty!!!!"}
        onChange={handleChange}
        error={isEmpty ? true : false}
      />
      {state !== status.LOADING ? (
        <Button variant="contained" css={btnStyle} onClick={handleSubmit}>
          Shortner
        </Button>
      ) : (
        <LoadingButton loading variant="outlined">
          Submit
        </LoadingButton>
      )}
    </div>
  );
}

export default TextFieldComponent;

const textFieldContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const textFieldStyle = css`
  width: 600px;
`;

const btnStyle = css`
  margin-left: 16px;
`;
