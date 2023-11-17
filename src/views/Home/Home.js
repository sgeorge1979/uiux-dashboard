import React from "react";
import { Box } from "@material-ui/core";
import { PageBody, PageHeader } from "../../components";
import {
DesktopWindowsSharp,
Info,
LineWeight
} from "@material-ui/icons";
import Chip from '@mui/material/Chip';
const Dashboard = () => {
  return (
    <React.Fragment>
      <PageHeader title='Home' />
      <PageBody style={{ display: "flex" }}>
        <Box
          flexGrow='1'
          width='100%'
          paddingLeft='5px'
          marginTop="10px"
          flexDirection='column'
          alignItems='center'
          justifyContent='center'>
          <div class="row">   
              <span><strong style={{marginLeft:"550px"}}> UI/UX Reference Dashboard Guidelines</strong></span>

              
              <table class="table" >
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col" style={{ width: "250px" }}></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td style={{padding:"2px 3px 5px 50px" }}><DesktopWindowsSharp/>&nbsp;Browser</td>
                    <td colspan="2">Please use browser zoom size to 80% for better accessibility.</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td style={{padding:"2px 3px 5px 46px" }}><button type="button" className="btn btn-primary"  >Copy HTML </button></td>
                    <td colspan="2">When you click this button it will copy the HTML content of that selected screen. If the information is copied succesfully to the clipboard you can see this message <span style={{ color: "darkred" }}> "Copied".</span> You can paste that content in any text editor.</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td style={{padding:"2px 3px 5px 46px" }}><button type="button" className="btn btn-primary"  >Copy JS </button></td>
                    <td colspan="2">When you click this button it will copy the JS (JavaScript) content of that selected screen. If the information is copied succesfully to the clipboard you can see this message <span style={{ color: "darkred" }}> "Copied".</span> You can paste that content in any text editor.</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td style={{padding:"2px 3px 5px 46px" }}><button type="button" className="btn btn-primary"  >Copy CSS </button></td>
                    <td colspan="2">When you click this button it will copy the CSS (Stylesheet) content of that selected screen. If the information is copied succesfully to the clipboard you can see this message <span style={{ color: "darkred" }}> "Copied".</span> You can paste that content in any text editor.</td>
                  </tr>

                  <tr>
                    <th scope="row">5</th>
                    <td style={{padding:"2px 3px 5px 50px" }}><Chip label="Chip Filled">Table Style 1 Preview :</Chip></td>
                    <td colspan="2">This section will provide the output of the selected screen. It also provide the screen header information(Eg: 'Table' is the component name 'Style 1' is the subMenu of that component). </td>
                  </tr>
                  <tr>
                    <th scope="row">6</th>
                    <td style={{padding:"2px 3px 5px 50px" }}><span class="d-inline-block badge bg-info text-dark" data-bs-placement="left" tabindex="0" data-bs-toggle="tooltip" >
                      <button type="button" class="rounded-pill" ><Info/></button>
                    </span></td>
                    <td colspan="2"> It will provide additional information about the selected component.</td>
                  </tr>
                  <tr>
                    <th scope="row">7</th>
                    <td style={{padding:"2px 3px 5px 50px" }}>
                      <span><LineWeight/>&nbsp;Online Editor</span>
                    </td>
                    <td colspan="2"> You can write your own code (HTML, CSS,JS) and test it in real time. It supports Bootstrap framework and NYSOH Styles. </td>
                  </tr>
                </tbody>
              </table>
            </div>
          
        </Box>
      </PageBody>
    </React.Fragment>
  );
};

export default Dashboard;
