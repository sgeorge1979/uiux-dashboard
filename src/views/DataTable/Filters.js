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
const Filters = () => {
  const [heightValue, setHeightValue] = useState("485px");

  const [htmlValue, setHtmlValue] = useState("");
  const [jsValue, setJsValue] = useState("");
  const [cssValue, setCssValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  const debouncedHtml = useDebounce(htmlValue, 1000);
  const debouncedJs = useDebounce(jsValue, 1000);
  const debouncedCss = useDebounce(cssValue, 1000);
  const [htmlFilter] = React.useState(`
  <!-- Start of Datatable Data -->
	<!-- Dropdown Filters Details -->
	<div class="row">
    <div class="span12">
      <div class="filter-bay">
       <div class="row" id="filters">

      </div>
     </div> <!--filter-bay-->
    </div>
   </div>
   <!-- End of the Filter Div -->
	<!-- End of Dropdown Filters Details -->
	<!-- Table Details -->
	 <table id="list" class="table table-condensed table-striped table-bordered display" style="width: 100%;overflow-wrap: anywhere;" cellspacing="0">
	   <thead>
	      <tr>
	        <th>Name</th>
	        <th>Position</th>
	        <th>Office</th>
	        <th>Age</th>
	        <th>Start date</th>
	      </tr>
	    </thead>
	      <tbody>
	         <tr>
	            <td>Tiger Nixon</td>
	            <td>System Architect</td>
	            <td>Edinburgh</td>
	            <td>61</td>
	            <td>2011/04/25</td>
	         </tr>
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
	         </tr>
	         <tr>
	           <td>Cedric Kelly</td>
	           <td>Senior Javascript Developer</td>
	           <td>Edinburgh</td>
	           <td>22</td>
	           <td>2012/03/29</td>
	         </tr>
	      </tbody>
	    </table>
	 <!-- End of Datatable Data -->
 `);

const [jsFilter] = React.useState(`
 $(document).ready(function() {

 // Creating Dropdown Filters
  function cbDropdown(column) {
    return $('<ul>', {
      'class': 'cb-dropdown'
    }).appendTo($('<div>', {
      'class': 'span2 cb-dropdown-wrap',
    }).appendTo(filters));
  }

 <!-- DataTable Configuration Details -->
  $('#example').DataTable({
	 "bPaginate": false,
     "bFilter": true,
     "bInfo": false,
     initComplete: function() {
      this.api().columns().every(function() {
        var column = this;
        var ddmenu = cbDropdown($(column.header()))
          .on('change', ':checkbox', function() {
            var active;
            var vals = $(':checked', ddmenu).map(function(index, element) {
              active = true;
              return $.fn.dataTable.util.escapeRegex($(element).val());
            }).toArray().join('|');

            column
              .search(vals.length > 0 ? '^(' + vals + ')$' : '', true, false)
              .draw();

            // Highlight the current item if selected.
            if (this.checked) {
              $(this).closest('li').addClass('active');
            } else {
              $(this).closest('li').removeClass('active');
            }
         });

        column.data().unique().sort().each(function(d, j) {

          var // wrapped
          $label = $('<label>'),
          $text = $('<span>', {
          text: d
          }),
          $cb = $('<input>', {
           type: 'checkbox',
           value: d
          });

          $text.appendTo($label);
          $cb.appendTo($label);

          ddmenu.append($('<li>').append($label));
        });
      });
    }
  });
 });
 `);

const [cssFilter] = React.useState(`
/* Hide the search button */
.dataTables_filter {
   display: none;
 }

/* Styles for the drop-down. Feel free to change the styles to suit your website. :-) */

.cb-dropdown-wrap {
  max-height: 80px; /* At most, around 3/4 visible items. */
  position: relative;
  height: 19px;
  margin-bottom: 25px;
 }

.cb-dropdown,
.cb-dropdown li {
  margin: 0;
  padding: 0;
  list-style: none;
 }

.cb-dropdown {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  border: 1px solid #888;
 }

.cb-dropdown-wrap:hover .cb-dropdown {
  height: 80px;
  overflow: auto;
  transition: 0.2s height ease-in-out;
 }

/* For selected items. */
.cb-dropdown li.active {
  background: #ff0;
 }

.cb-dropdown li label {
  display: block;
  position: relative;
  cursor: pointer;
  line-height: 19px; /* Match height of .cb-dropdown-wrap */
 }

.cb-dropdown li label > input {
  position: absolute;
  right: 0;
  top: 0;
  width: 16px;
 }

.cb-dropdown li label > span {
  display: block;
  margin-left: 3px;
  margin-right: 20px; /* At least, width of the checkbox. */
  font-family: sans-serif;
  font-size: 0.8em;
  font-weight: normal;
  text-align: left;
 }
  /* Filters background layout */
 .filter-bay {
	border:1px solid #DDDDDD;
	border-radius:3px;
	background-color:#F5F5F5;
    padding:20px;
    margin-bottom: 20px;
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
                    ${debouncedCss}
                    </style>
                    <body>
                    <html>
				        <head>
				        <title>Bootstrap Demo</title>
				        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/2.3.2/css/bootstrap.min.css">
                <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js"></script>
				        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/2.3.2/js/bootstrap.min.js"></script>
                <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
                <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/datatables.net/1.10.20/jquery.dataTables.min.js"></script>

              <style>
              /* Hide the search button */
              .dataTables_filter {
                display: none;
              }

              /* Styles for the drop-down. Feel free to change the styles to suit your website. :-) */

              .cb-dropdown-wrap {
                max-height: 80px; /* At most, around 3/4 visible items. */
                position: relative;
                height: 19px;
                margin-bottom: 25px;

              }

              .cb-dropdown,
              .cb-dropdown li {
                margin: 0;
                padding: 0;
                list-style: none;
              }

              .cb-dropdown {
                position: absolute;
                z-index: 1;
                width: 100%;
                height: 100%;
                overflow: hidden;
                background: #fff;
                border: 1px solid #888;
              }

              .cb-dropdown-wrap:hover .cb-dropdown {
                height: 80px;
                overflow: auto;
                transition: 0.2s height ease-in-out;
              }

              /* For selected items. */
              .cb-dropdown li.active {
                background: #ff0;
              }

              .cb-dropdown li label {
                display: block;
                position: relative;
                cursor: pointer;
                line-height: 19px; /* Match height of .cb-dropdown-wrap */
              }

              .cb-dropdown li label > input {
                position: absolute;
                right: 0;
                top: 0;
                width: 16px;
              }

              .cb-dropdown li label > span {
                display: block;
                margin-left: 3px;
                margin-right: 20px; /* At least, width of the checkbox. */
                font-family: sans-serif;
                font-size: 0.8em;
                font-weight: normal;
                text-align: left;
              }

              .filter-bay {
                border:1px solid #282525;
                border-radius:3px;
                background-color:#ececec;
                padding:20px;
                margin-bottom: 20px;
              }
             thead {
                background: hsl(211, 39%, 23%);
                color:#FFF;
              }



</style>
  </head>
   <body>
    <br>
     <div class="span12" > <!-- Main Container -->
	    <span class="badge rounded-pill bg-dark">DataTable Filters with Checkbox Preview :</span>
		  <span class="offset3" style="color:Blue"><strong>Note:</strong> Make Sure to use Jquery version <strong>1.12.4</strong> and
       DataTable version <strong>1.10.20</strong> </span>
		 <br><br>

    <div class="row">
      <div class="span12">
      <div class="filter-bay">
        <div class="row" id="filters">
        </div>
      </div>
      </div>
    </div>

 <!-- DataTable Data -->
  <table id="example" class="table table-condensed table-striped table-bordered display"  cellspacing="0" width="100%">
     <thead class="header">
        <tr>
           <th id="name">Name</th>
           <th id="position">Position</th>
           <th>Office</th>
           <th>Age</th>
           <th>Start date</th>
        </tr>
      </thead>
        <tbody>
          <tr>
             <td>Tiger Nixon</td>
              <td>System Architect</td>
              <td>Edinburgh</td>
              <td>61</td>
              <td>2011/04/25</td>
            </tr>
            <tr>
              <td>Garrett Winters</td>
              <td>Accountant</td>
              <td>Tokyo</td>
              <td>63</td>
              <td>2011/07/25</td>
            </tr>
            <tr>
             <td>Ashton Cox</td>
             <td>Junior Technical Author</td>
             <td>San Francisco</td>
             <td>66</td>
             <td>2009/01/12</td>
            </tr>
            <tr>
              <td>Cedric Kelly</td>
              <td>Senior Javascript Developer</td>
              <td>Edinburgh</td>
              <td>22</td>
              <td>2012/03/29</td>
             </tr>
         </tbody>
    </table>
	   <!-- End of Accordion Data -->
    </div>  <!-- End of Main Container Span 12 -->
    </body>
	 </html>

 <script type="text/javascript">
   $(document).ready(function() {
  function cbDropdown(column) {
    return $('<ul>', {
      'class': 'cb-dropdown'
    }).appendTo($('<div>', {
      'class': 'span2 cb-dropdown-wrap'
    }).appendTo(filters));
  }

  $('#example').DataTable({
	 "bPaginate": false,
     "bFilter": true,
     "bInfo": false,
    initComplete: function() {
      this.api().columns().every(function() {
        var column = this;
        var ddmenu = cbDropdown($(column.header()))
          .on('change', ':checkbox', function() {
            var active;
            var vals = $(':checked', ddmenu).map(function(index, element) {
              active = true;
              return $.fn.dataTable.util.escapeRegex($(element).val());
            }).toArray().join('|');

            column
              .search(vals.length > 0 ? '^(' + vals + ')$' : '', true, false)
              .draw();

            // Highlight the current item if selected.
            if (this.checked) {
              $(this).closest('li').addClass('active');
            } else {
              $(this).closest('li').removeClass('active');
            }


          });

        column.data().unique().sort().each(function(d, j) {

          var // wrapped
            $label = $('<label>'),
            $text = $('<span>', {
              text: d
            }),
            $cb = $('<input>', {
              type: 'checkbox',
              value: d
            });

          $text.appendTo($label);
          $cb.appendTo($label);

          ddmenu.append($('<li>').append($label));
        });
      });
    }
  });
});



 		function resetFilters(){
				$("#filters").find("select").prop("selectedIndex",0);
				var table = $('#list').DataTable();
				table
	  		 		.search('')
	  		 		.columns().search('')
	  		 		.draw();
		}

     </script>
     </body>
   </html>`;
    setOutputValue(output);
  }, [htmlValue, cssValue, jsValue]);

  return (
    <React.Fragment>
      <PageHeader title="Datatable with Multi Level Fitlers" toolText=""  download="dataTable_filters"/>
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

export default Filters;
