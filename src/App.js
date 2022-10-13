/** @jsxImportSource @emotion/react */
import "./App.css";
import TextFieldComponent from "./TextField";
import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { css } from "@emotion/react";
import TextField from "@mui/material/TextField";
import { Routes, Route, Link } from "react-router-dom";

export const status = {
  DEFAULT: "default",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

function Layout() {
  const [state, setState] = useState(status.DEFAULT);
  const [open, setOpen] = useState(false);
  const [shortUrl, setShortUrl] = useState("");

  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Shortner your Url</h1>
        <TextFieldComponent
          setState={setState}
          state={state}
          setShortUrl={setShortUrl}
          setOpen={setOpen}
        />
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {state === status.ERROR && (
            <Alert severity="error">
              This is an error alert — check it out!
            </Alert>
          )}
          {state === status.SUCCESS && (
            <>
              <Alert severity="success">
                This is a success alert — check it out!
              </Alert>
              <div css={responseStyle}>
                <h3>Url:</h3>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  value={`https://short.sidesideeffect.io/api/${shortUrl}`}
                  css={textFieldStyle}
                  disabled
                />
                <Button
                  variant="contained"
                  onClick={() =>
                    copyToClipBoard(
                      `https://short.sidesideeffect.io/api/${shortUrl}`
                    )
                  }
                >
                  複製
                </Button>
              </div>
            </>
          )}
          <Button
            onClick={() => {
              setOpen(false);
              setShortUrl("");
            }}
            autoFocus
          >
            關閉
          </Button>
        </Dialog>
      </header>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;

const textFieldStyle = css`
  margin: 0 16px;
  width: 500px;
`;

const responseStyle = css`
  display: flex;
  align-items: center;
  padding: 8px;
`;
