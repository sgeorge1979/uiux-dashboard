import React, { useState, useEffect } from "react";
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
const TableWithRightInfo = () => {
  const [heightValue, setHeightValue] = useState("485px");

  const [htmlValue, setHtmlValue] = useState("");
  const [jsValue, setJsValue] = useState("");
  const [cssValue, setCssValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  const debouncedHtml = useDebounce(htmlValue, 1000);
  const debouncedJs = useDebounce(jsValue, 1000);
  const debouncedCss = useDebounce(cssValue, 1000);
  const [htmlFilter] = React.useState(`
  <div class="span12"> <!-- Main Container -->
  <span class="badge rounded-pill bg-dark">Layout Preview :</span> <br><br>
   <div class="member-continer">
     <div class="box-header">
      <h3 style="margin-left:20px;">Member Details</h3>
     </div>
     <div class="row-fluid">
       <div class="span10">
         <br>
         <div id="member-details">
           <!-- End of Layout with Box Header and Right Side Section-->
           <table id="example" class="table table-condensed table-striped table-bordered display" cellspacing="0"
             width="">
             <thead class="header">
               <tr>
                 <th id="name">Name</th>
                 <th id="position">Position</th>
                 <th>Office</th>
                 <th>Age</th>
                 <th>Start date</th>
                 <th>Salary</th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td>Garrett Winters</td>
                 <td>Accountant</td>
                 <td>Tokyo</td>
                 <td>63</td>
                 <td>2011/07/25</td>
                 <td>$170,750</td>
               </tr>
               <tr>
                 <td>Ashton Cox</td>
                 <td>Junior Technical Author</td>
                 <td>San Francisco</td>
                 <td>66</td>
                 <td>2009/01/12</td>
                 <td>$86,000</td>
               </tr>
               <tr>
                 <td>Cedric Kelly</td>
                 <td>Senior Javascript Developer</td>
                 <td>Edinburgh</td>
                 <td>22</td>
                 <td>2012/03/29</td>
                 <td>$433,060</td>
               </tr>
             </tbody>
           </table>
         </div> <!-- Span10 -->
       </div> <!-- row-fluid -->
       <!-- Right Side Section -->
       <div id="membersAffected" class="span2 mem-offset" style="margin-top: 14px;">
         <!-- Members Details -->
         <h4>Members Affected</h4>
         <div class="row-fluid">
           <div>Ashton Cox (66)</div>
         </div>
         <div class="row-fluid">
           <div class="span4">$86,000</div>
         </div>
         <div class="row-fluid">
           <div>Cedric Kelly (22)</div>
         </div>
         <div class="row-fluid">
           <div class="span4">$433,060</div>
         </div>
       </div>
     </div> <!-- member-details -->
   </div> <!-- member-continer -->
   <!-- End of Layout with Box Header -->
 </div> <!-- End of Main Container Span 12 -->
 `);

  const [jsFilter] = React.useState(`
 `);

  const [cssFilter] = React.useState(`
  .member-continer {
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 6px;
  }
  thead {
    background: hsl(211, 39%, 23%);
    color: #FFF;
  }
  .box-header {
    padding: .5rem 1rem;
    margin-bottom: 0;
    background-color: rgba(0,0,0,.03);
    border-bottom: 1px solid rgba(0,0,0,.125);
  }

 `);
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
                <div class="span12" > <!-- Main Container -->
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

  useEffect(() => {
    const output = `<html>
    <style>
      .member-continer {
        background-color: #fff;
        border: 1px solid #ddd;
        padding: 6px;
      }
      thead {
        background: hsl(211, 39%, 23%);
        color: #FFF;
      }
      .box-header {
        padding: .5rem 1rem;
        margin-bottom: 0;
        background-color: rgba(0,0,0,.03);
        border-bottom: 1px solid rgba(0,0,0,.125);
      }
    </style>
    <body>
      <html>
      <head>
        <title>Bootstrap Table with Right Coloum Details</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/2.3.2/css/bootstrap.min.css">
        <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/2.3.2/js/bootstrap.min.js"></script>
      </head>
      <body>
        <br>
        <div class="span12"> <!-- Main Container -->
         <span class="badge rounded-pill bg-dark">Layout Preview :</span> <br><br>
          <div class="member-continer">
          <!-- Box Header -->
          <div class="box-header">
           <h3 style="margin-left:20px;">Member Details</h3>
          </div>
            <div class="row-fluid">
              <div class="span10">
               <br>
                <div id="member-details">
                  <!-- End of Layout with Box Header and Right Side Section-->
                  <table id="example" class="table table-condensed table-striped table-bordered display" cellspacing="0"
                    width="">
                    <thead class="header">
                      <tr>
                        <th id="name">Name</th>
                        <th id="position">Position</th>
                        <th>Office</th>
                        <th>Age</th>
                        <th>Start date</th>
                        <th>Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Garrett Winters</td>
                        <td>Accountant</td>
                        <td>Tokyo</td>
                        <td>63</td>
                        <td>2011/07/25</td>
                        <td>$170,750</td>
                      </tr>
                      <tr>
                        <td>Ashton Cox</td>
                        <td>Junior Technical Author</td>
                        <td>San Francisco</td>
                        <td>66</td>
                        <td>2009/01/12</td>
                        <td>$86,000</td>
                      </tr>
                      <tr>
                        <td>Cedric Kelly</td>
                        <td>Senior Javascript Developer</td>
                        <td>Edinburgh</td>
                        <td>22</td>
                        <td>2012/03/29</td>
                        <td>$433,060</td>
                      </tr>
                    </tbody>
                  </table>
                </div> <!-- Span10 -->
              </div> <!-- row-fluid -->
              <!-- Right Side Section -->
              <div id="membersAffected" class="span2 mem-offset" style="margin-top: 14px;">
                <!-- Members Details -->
                <h4>Members Affected</h4>
                <div class="row-fluid">
                  <div>Ashton Cox (66)</div>
                </div>
                <div class="row-fluid">
                  <div class="span4">$86,000</div>
                </div>
                <div class="row-fluid">
                  <div>Cedric Kelly (22)</div>
                </div>
                <div class="row-fluid">
                  <div class="span4">$433,060</div>
                </div>
              </div>
            </div> <!-- member-details -->
          </div> <!-- member-continer -->
          <!-- End of Layout with Box Header -->
        </div> <!-- End of Main Container Span 12 -->
       </body>
      </html>
    </body>
    </html>`;
    setOutputValue(output);
  }, [htmlValue, cssValue, jsValue]);

  return (
    <React.Fragment>
      <PageHeader
        title="Table with Right Coloumn Details"
        toolText=""
        download="tableWithRightInfo"
      />
      <PageBody style={{ display: "flex" }}>
        <Box
          flexGrow="0"
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
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
                value={htmlFilter}
                onChange={setHtmlValue}
              />
              <SplitPane split="vertical" minSize={"40%"}>
                <CssEditor
                  height={heightValue}
                  value={cssFilter}
                  onChange={setCssValue}
                />
                <JavascriptEditor
                  height={heightValue}
                  value={jsFilter}
                  onChange={setJsValue}
                />
              </SplitPane>
            </SplitPane>
            <iframe
              title="Preview"
              srcDoc={outputValue}
              className={styles.previewIframe}
            />
          </SplitPane>
        </Box>
      </PageBody>
    </React.Fragment>
  );
};

export default TableWithRightInfo;
