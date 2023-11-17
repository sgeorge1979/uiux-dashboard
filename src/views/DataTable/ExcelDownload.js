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
const ExcelDownload = () => {
  const [heightValue, setHeightValue] = useState("485px");

  const [htmlValue, setHtmlValue] = useState("");
  const [jsValue, setJsValue] = useState("");
  const [cssValue, setCssValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  const debouncedHtml = useDebounce(htmlValue, 1000);
  const debouncedJs = useDebounce(jsValue, 1000);
  const debouncedCss = useDebounce(cssValue, 1000);
  const [htmlFilter] = React.useState(`
    <div class="container" style="margin-top: 40px">
      <table id="example" class="display" cellspacing="0" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Office</th>
            <th>Salary</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
      </table>
    </div>
 `);

  const [jsFilter] = React.useState(`
$(document).ready(function () {
  var today = new Date();
  var date =
    today.getDate() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getFullYear();
  var ampm = today.getHours() >= 12 ? "PM" : "AM";
  var hours =
    today.getHours() >= 12 ? today.getHours() - 12 : today.getHours();
  var ts = date + "_" + hours + " _ " + today.getMinutes() + "_" + ampm;
  function format(d) {
    var html =
      '<table id="childTable" class="table table-condensed" width="100%" aria-describedby="example_info" style="width: 100%;"><thead style="background:#eee"><th colspan="4">';
    html += d.eventData.childHeader;
    html += "</th></thead><tr><tbody>";
    if (d.eventData.childHeader == "Team Members") {
      $.each(d.childData, function (key, value) {
        if (key % 4 == 0) {
          html += "<tr>" + "<td>" + value.childDataDetails + "</td>";
        } else {
          html += "<td>" + value.childDataDetails + "</td>";
        }
      });
    } else if (d.eventData.childHeader == "Details") {
      $.each(d.childData, function (key, value) {
        html +=  "<td>" +
          "Start Date: " +
          value.childDataDetails +
          "</td>" +
          "<td>" +
          "Ext: " +
          value.description +
          "</td>";
      });
    } else {
      $.each(d.childData, function (key, value) {
        html += "<td>" + value.childDataDetails + "</td>";
      });
    }

    return html;
  }

  var data = [
    {
      eventData: {
        name: "Tiger Nixon",
        position: "System Architect",
        salary: "$120,800",
        office: "Edinburgh",
        childHeader: "Details",
      },
      childData: [
        {
          childDataDetails: "2009/01/12",
          description: "1562",
        },
      ],
    },
    {
      eventData: {
        name: "Ashton Cox",
        position: "Project Manager",
        salary: "$586,000",
        office: "San Francisco",
        childHeader: "Team Members",
      },
      childData: [
        {
          childDataDetails: "David Albro",
        },
        {
          childDataDetails: "Bill Stevenson",
        },
        {
          childDataDetails: "Millo Aukeman",
        },
        {
          childDataDetails: "Beckey Aukeman",
        },
        {
          childDataDetails: "New Karl Alverz",
        },
        {
          childDataDetails: "New Bill Stevenson",
        },
        {
          childDataDetails: "New Millo Aukeman",
        },
        {
          childDataDetails: "New Beckey Aukeman",
        },
      ],
    },
    {
      eventData: {
        name: "Cedric Kelly",
        position: "Senior Javascript Developer",
        salary: "$233,060",
        office: "Edinburgh",
        childHeader: "Location",
      },
      childData: [
        {
          childDataDetails: "Remote Location",
        },
      ],
    },
  ];

  var table = $("#example").DataTable({
    data: data,
    columns: [
      { data: "eventData.name", defaultContent: "", orderable: false },
      { data: "eventData.position", defaultContent: "", orderable: true },
      { data: "eventData.office", defaultContent: "", orderable: true },
      { data: "eventData.salary", defaultContent: "", orderable: false },
      {
        className: "dt-control",
        data: "",
        defaultContent: "",
        orderable: false,
      },
      {
        data: null,
        visible: false,
        render: function (data, type, row, meta) {
          return meta.row;
        },
      },
    ],
    // Hide the dt-control if the childrow is false
    createdRow: function (row, data, index) {
      if (data.eventData.childRow == false) {
        var td = $(row).find("td:last");
        td.removeClass("dt-control");
      }
    },

    dom: "Bfrtip",
    buttons: [
      {
        extend: "excelHtml5",
        title: "Event_Report_" + ts,
        titleAttr: "Excel",
        customize: function (xlsx) {
          var table = $("#example").DataTable();

          // Get number of columns to remove last hidden index column.
          var numColumns = table.columns().header().count();

          // Get sheet.
          var sheet = xlsx.xl.worksheets["sheet1.xml"];

          var col = $("col", sheet);
          // Set the column width.
          $(col[1]).attr("width", 20);

          // Get a clone of the sheet data.
          var sheetData = $("sheetData", sheet).clone();

          // Clear the current sheet data for appending rows.
          $("sheetData", sheet).empty();

          // Row index from last column.
          var DT_row; // Row count in Excel sheet.

          var rowCount = 1;

          // Itereate each row in the sheet data.
          $(sheetData)
            .children()
            .each(function (index) {
              // Used for DT row() API to get child data.
              var rowIndex = index - 1;

              // Don't process row if its the header row.
              if (index > 0) {
                // Get row
                var row = $(this.outerHTML);

                // Set the Excel row attr to the current Excel row count.
                row.attr("r", rowCount);

                var colCount = 1;

                // Iterate each cell in the row to change the rwo number.
                row.children().each(function (index) {
                  var cell = $(this);

                  // Set each cell's row value.
                  var rc = cell.attr("r");
                  rc = rc.replace(/\d+$/, "") + rowCount;
                  cell.attr("r", rc);

                  if (colCount === numColumns) {
                    DT_row = cell.text();
                    cell.html("");
                  }

                  colCount++;
                });

                // Get the row HTML and append to sheetData.
                row = row[0].outerHTML;
                $("sheetData", sheet).append(row);
                rowCount++;

                // Get the child data - could be any data attached to the row.
                var childData = table
                  .row(
                    DT_row,
                    { search: "none", order: "index" },
                    { filter: "applied" }
                  )
                  .data().results;

                if (childData.length > 0) {
                  // Prepare Excel formated row
                  headerRow =
                    '<row r="' +
                    rowCount +
                    '" s="2"><c t="inlineStr" r="A' +
                    rowCount +
                    '"><is><t>' +
                    '</t></is></c><c t="inlineStr" r="B' +
                    rowCount +
                    '" s="2"><is><t>Result' +
                    '</t></is></c><c t="inlineStr" r="C' +
                    rowCount +
                    '" s="2"><is><t>Notes' +
                    "</t></is></c></row>";

                  // Append header row to sheetData.
                  $("sheetData", sheet).append(headerRow);
                  rowCount++; // Inc excelt row counter.
                }

                // The child data is an array of rows
                for (c = 0; c < childData.length; c++) {
                  // Get row data.
                  child = childData[c];

                  // Prepare Excel formated row
                  childRow =
                    '<row r="' +
                    rowCount +
                    '"><c t="inlineStr" r="A' +
                    rowCount +
                    '"><is><t>' +
                    '</t></is></c><c t="inlineStr" r="B' +
                    rowCount +
                    '"><is><t>' +
                    child.result +
                    '</t></is></c><c t="inlineStr" r="C' +
                    rowCount +
                    '"><is><t>' +
                    child.note +
                    "</t></is></c></row>";

                  // Append row to sheetData.
                  $("sheetData", sheet).append(childRow);
                  rowCount++; // Inc excelt row counter.
                }
                // Just append the header row and increment the excel row counter.
              } else {
                var row = $(this.outerHTML);

                var colCount = 1;

                // Remove the last header cell.
                row.children().each(function (index) {
                  var cell = $(this);

                  if (colCount === numColumns) {
                    cell.html("");
                  }

                  colCount++;
                });
                row = row[0].outerHTML;
                $("sheetData", sheet).append(row);
                rowCount++;
              }
            });
        },
      },
    ],
  });

  // Add event listener for opening and closing details
  $("#example tbody").on("click", "td.dt-control", function () {
    var tr = $(this).closest("tr");
    var row = table.row(tr);

    //if ($("#childTable tr").hasClass('showdt')) {
    // console.log('table has class')
    //}

    if (row.child.isShown()) {
      // This row is already open - close it
      row.child.hide();
      tr.removeClass("shown");

      //td.addClass('dt-close');
    } else {
      // Open this row
      row.child(format(row.data())).show();
      tr.addClass("shown");
      //td.removeClass('dt-close');
      //td.addClass('dt-control');
    }
  });
});
 `);

  const [cssFilter] = React.useState(`
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
                </div> Å=
                <script type="text/javascript">
                  ${debouncedJs}
               </script>
              </body>
             </html>`;
    setOutputValue(output);
  }, [debouncedHtml, debouncedCss, debouncedJs]);

  useEffect(() => {
    const output = `<html>
    <head>
      <meta name="description" content="Export with customisable file name" />
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
      />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

      <link
        href="https://cdn.datatables.net/1.13.7/css/jquery.dataTables.min.css"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
        type="text/css"
      />
      <script src="https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js"></script>

      <link
        href="https://cdn.datatables.net/rowgroup/1.0.2/css/rowGroup.dataTables.min.css"
        rel="stylesheet"
        type="text/css"
      />
      <script src="https://cdn.datatables.net/rowgroup/1.0.2/js/dataTables.rowGroup.min.js"></script>

      <!-- Added for export button functionality -->
      <script src="https://cdn.datatables.net/buttons/1.2.2/js/buttons.html5.js"></script>
      <link
        href="https://cdn.datatables.net/buttons/2.4.2/css/buttons.dataTables.min.css"
        rel="stylesheet"
        type="text/css"
      />
      <script src="https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js"></script>
      <script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.colVis.min.js"></script>
      <script
        type="text/javascript"
        language="javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"
      ></script>

      <meta charset="utf-8" />
      <title>Datatable Export Excel with Child Details</title>
      <style>
       .header {
        background: hsl(211, 39%, 23%);
        color:#FFF;
       }
      </style>
      <script>
        $(document).ready(function () {
          var today = new Date();
          var date =
            today.getDate() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getFullYear();
          var ampm = today.getHours() >= 12 ? "PM" : "AM";
          var hours =
            today.getHours() >= 12 ? today.getHours() - 12 : today.getHours();
          var ts = date + "_" + hours + " _ " + today.getMinutes() + "_" + ampm;
          function format(d) {
            var html =
              '<table id="childTable" class="table table-condensed" width="100%" aria-describedby="example_info" style="width: 100%;"><thead style="background:#eee"><th colspan="4">';
            html += d.eventData.childHeader;
            html += "</th></thead><tr><tbody>";
            if (d.eventData.childHeader == "Team Members") {
              $.each(d.childData, function (key, value) {
                if (key % 4 == 0) {
                  html += "<tr>" + "<td>" + value.childDataDetails + "</td>";
                } else {
                  html += "<td>" + value.childDataDetails + "</td>";
                }
              });
            } else if (d.eventData.childHeader == "Details") {
              $.each(d.childData, function (key, value) {
                html +=  "<td>" +
                  "Start Date: " +
                  value.childDataDetails +
                  "</td>" +
                  "<td>" +
                  "Ext: " +
                  value.description +
                  "</td>";
              });
            } else {
              $.each(d.childData, function (key, value) {
                html += "<td>" + value.childDataDetails + "</td>";
              });
            }

            return html;
          }

          var data = [
            {
              eventData: {
                name: "Tiger Nixon",
                position: "System Architect",
                salary: "$120,800",
                office: "Edinburgh",
                childHeader: "Details",
              },
              childData: [
                {
                  childDataDetails: "2009/01/12",
                  description: "1562",
                },
              ],
            },
            {
              eventData: {
                name: "Ashton Cox",
                position: "Project Manager",
                salary: "$586,000",
                office: "San Francisco",
                childHeader: "Team Members",
              },
              childData: [
                {
                  childDataDetails: "David Albro",
                },
                {
                  childDataDetails: "Bill Stevenson",
                },
                {
                  childDataDetails: "Millo Aukeman",
                },
                {
                  childDataDetails: "Beckey Aukeman",
                },
                {
                  childDataDetails: "New Karl Alverz",
                },
                {
                  childDataDetails: "New Bill Stevenson",
                },
                {
                  childDataDetails: "New Millo Aukeman",
                },
                {
                  childDataDetails: "New Beckey Aukeman",
                },
              ],
            },
            {
              eventData: {
                name: "Cedric Kelly",
                position: "Senior Javascript Developer",
                salary: "$233,060",
                office: "Edinburgh",
                childHeader: "Location",
              },
              childData: [
                {
                  childDataDetails: "Remote Location",
                },
              ],
            },
          ];

          var table = $("#example").DataTable({
            data: data,
            columns: [
              { data: "eventData.name", defaultContent: "", orderable: false },
              { data: "eventData.position", defaultContent: "", orderable: true },
              { data: "eventData.office", defaultContent: "", orderable: true },
              { data: "eventData.salary", defaultContent: "", orderable: false },
              {
                className: "dt-control",
                data: "",
                defaultContent: "",
                orderable: false,
              },
              {
                data: null,
                visible: false,
                render: function (data, type, row, meta) {
                  return meta.row;
                },
              },
            ],
            // Hide the dt-control if the childrow is false
            createdRow: function (row, data, index) {
              if (data.eventData.childRow == false) {
                var td = $(row).find("td:last");
                td.removeClass("dt-control");
              }
            },

            dom: "Bfrtip",
            buttons: [
              {
                extend: "excelHtml5",
                title: "Event_Report_" + ts,
                titleAttr: "Excel",
                customize: function (xlsx) {
                  var table = $("#example").DataTable();

                  // Get number of columns to remove last hidden index column.
                  var numColumns = table.columns().header().count();

                  // Get sheet.
                  var sheet = xlsx.xl.worksheets["sheet1.xml"];

                  var col = $("col", sheet);
                  // Set the column width.
                  $(col[1]).attr("width", 20);

                  // Get a clone of the sheet data.
                  var sheetData = $("sheetData", sheet).clone();

                  // Clear the current sheet data for appending rows.
                  $("sheetData", sheet).empty();

                  // Row index from last column.
                  var DT_row; // Row count in Excel sheet.

                  var rowCount = 1;

                  // Itereate each row in the sheet data.
                  $(sheetData)
                    .children()
                    .each(function (index) {
                      // Used for DT row() API to get child data.
                      var rowIndex = index - 1;

                      // Don't process row if its the header row.
                      if (index > 0) {
                        // Get row
                        var row = $(this.outerHTML);

                        // Set the Excel row attr to the current Excel row count.
                        row.attr("r", rowCount);

                        var colCount = 1;

                        // Iterate each cell in the row to change the rwo number.
                        row.children().each(function (index) {
                          var cell = $(this);

                          // Set each cell's row value.
                          var rc = cell.attr("r");
                          rc = rc.replace(/\d+$/, "") + rowCount;
                          cell.attr("r", rc);

                          if (colCount === numColumns) {
                            DT_row = cell.text();
                            cell.html("");
                          }

                          colCount++;
                        });

                        // Get the row HTML and append to sheetData.
                        row = row[0].outerHTML;
                        $("sheetData", sheet).append(row);
                        rowCount++;

                        // Get the child data - could be any data attached to the row.
                        var childData = table
                          .row(
                            DT_row,
                            { search: "none", order: "index" },
                            { filter: "applied" }
                          )
                          .data().results;

                        if (childData.length > 0) {
                          // Prepare Excel formated row
                          headerRow =
                            '<row r="' +
                            rowCount +
                            '" s="2"><c t="inlineStr" r="A' +
                            rowCount +
                            '"><is><t>' +
                            '</t></is></c><c t="inlineStr" r="B' +
                            rowCount +
                            '" s="2"><is><t>Result' +
                            '</t></is></c><c t="inlineStr" r="C' +
                            rowCount +
                            '" s="2"><is><t>Notes' +
                            "</t></is></c></row>";

                          // Append header row to sheetData.
                          $("sheetData", sheet).append(headerRow);
                          rowCount++; // Inc excelt row counter.
                        }

                        // The child data is an array of rows
                        for (c = 0; c < childData.length; c++) {
                          // Get row data.
                          child = childData[c];

                          // Prepare Excel formated row
                          childRow =
                            '<row r="' +
                            rowCount +
                            '"><c t="inlineStr" r="A' +
                            rowCount +
                            '"><is><t>' +
                            '</t></is></c><c t="inlineStr" r="B' +
                            rowCount +
                            '"><is><t>' +
                            child.result +
                            '</t></is></c><c t="inlineStr" r="C' +
                            rowCount +
                            '"><is><t>' +
                            child.note +
                            "</t></is></c></row>";

                          // Append row to sheetData.
                          $("sheetData", sheet).append(childRow);
                          rowCount++; // Inc excelt row counter.
                        }
                        // Just append the header row and increment the excel row counter.
                      } else {
                        var row = $(this.outerHTML);

                        var colCount = 1;

                        // Remove the last header cell.
                        row.children().each(function (index) {
                          var cell = $(this);

                          if (colCount === numColumns) {
                            cell.html("");
                          }

                          colCount++;
                        });
                        row = row[0].outerHTML;
                        $("sheetData", sheet).append(row);
                        rowCount++;
                      }
                    });
                },
              },
            ],
          });

          // Add event listener for opening and closing details
          $("#example tbody").on("click", "td.dt-control", function () {
            var tr = $(this).closest("tr");
            var row = table.row(tr);

            //if ($("#childTable tr").hasClass('showdt')) {
            // console.log('table has class')
            //}

            if (row.child.isShown()) {
              // This row is already open - close it
              row.child.hide();
              tr.removeClass("shown");

              //td.addClass('dt-close');
            } else {
              // Open this row
              row.child(format(row.data())).show();
              tr.addClass("shown");
              //td.removeClass('dt-close');
              //td.addClass('dt-control');
            }
          });
        });
      </script>
    </head>

    <body>
    <br>

      <div class="container" style="margin-top: 10px">
      <span class="badge rounded-pill bg-dark">DataTable Excel Export with Chid Data Preview :</span>
       <br><br>
        <table id="example" class="display" cellspacing="0" width="100%">
          <thead class="header">
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Office</th>
              <th>Salary</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
        </table>
      </div>
    </body>
  </html>`;
    setOutputValue(output);
  }, [htmlValue, cssValue, jsValue]);

  return (
    <React.Fragment>
      <PageHeader
        title="Datatable Excel Export with Child Rows"
        toolText=""
        download="download_excel"
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

export default ExcelDownload;
