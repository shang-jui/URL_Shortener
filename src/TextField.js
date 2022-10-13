/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import { status } from "./App";

function TextFieldComponent({ state, setState, setShortUrl, setOpen }) {
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
    setState(status.LOADING);
    if (url.length === 0) {
      setIsEmpty(true);
    }
    const api = "https://short.sidesideeffect.io/api/short";
    const data = { url: url };

    fetch(api, {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        setOpen(true);
        setState(status.SUCCESS);
        const {
          data: { url },
        } = response;
        setShortUrl(url);
      })
      .catch((error) => {
        setOpen(true);
        setState(status.ERROR);
        console.error("Error:", error);
      });
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
