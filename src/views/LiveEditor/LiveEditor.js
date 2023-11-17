import React, { useState, useEffect} from "react";
import SplitPane from "react-split-pane";
import { Box } from "@material-ui/core";
import { PageBody, PageHeader } from "../../components";

import {
  CssEditor,
  HtmlEditor,
  JavascriptEditor,
} from "../../components/Editor/Editors";

import { useDebounce } from "../../components/utils/useDebounce";
import styles from "../../components/Editor/preview.module.css";
const LiveEditor = () => {
  const [heightValue, setHeightValue] = useState("485px");

  const [htmlValue, setHtmlValue] = useState("");
  const [jsValue, setJsValue] = useState("");
  const [cssValue, setCssValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  const debouncedHtml = useDebounce(htmlValue, 1000);
  const debouncedJs = useDebounce(jsValue, 1000);
  const debouncedCss = useDebounce(cssValue, 1000);

  useEffect(() => {
    const output = `<html>
               <head>
				        <title>Bootstrap Demo</title>
				        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/2.3.2/css/bootstrap.min.css">
                <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js"></script>
				        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/2.3.2/js/bootstrap.min.js"></script>
               </head>
               <style>                       
                ${debouncedCss}
               </style>
               <body>
                <div class="span12" id="nysoh-landing"> <!-- Main Container -->
                 <br>
                 <span class="badge rounded-pill bg-dark">Editor Preview :</span> <br> <br>
                  ${debouncedHtml}
                </div> 
                <script type="text/javascript">
                  ${debouncedJs}
               </script>
              </body>
             </html>`;
    setOutputValue(output);
  }, [debouncedHtml, debouncedCss, debouncedJs]);

  return (
    <React.Fragment>
      <PageHeader title='Live Editor' toolText='It functions as an online code editor,
       where developers can create and test their code snippets (Html,css, javascript).'/>
       <PageBody style={{ display: "flex" }}>
        <Box
          flexGrow='0'
          width='100%'
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'>
    
      <SplitPane
        marginLeft="100px"
        split="horizontal"
        minSize={"50%"}
        className="splitContiner"
        onDragFinished={(height) => {
          setHeightValue(`${height - 40}px`);
        }}
      >
        <SplitPane split="vertical" minSize={"43%"}>
          <HtmlEditor
            height={heightValue}
            value={htmlValue}
            onChange={setHtmlValue}
          />
          <SplitPane split="vertical" minSize={"40%"}>
            <CssEditor
              height={heightValue}
              value={cssValue}
              onChange={setCssValue}
            />
            <JavascriptEditor
              height={heightValue}
              value={jsValue}
              onChange={setJsValue}
            />
          </SplitPane>
        </SplitPane>
        <iframe title="Preview" srcDoc={outputValue} className={styles.previewIframe} />
      </SplitPane>

     </Box>
   
    </PageBody>
  </React.Fragment> 
  );
};

export default LiveEditor;
