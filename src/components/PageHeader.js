import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Toolbar,
  Typography,
  Divider,
  Grid,
  makeStyles,
  Button,
  Tooltip,
} from "@material-ui/core";
import {
  Info as InfoIcon,
  CloudDownload as CloudDownloadIcon,

} from "@material-ui/icons";

import DataTableFilters from '../DownloadFiles/dataTable-Filters.txt';
import DownloadExcel from '../DownloadFiles/download_excel.txt';
import DownloadCsv from '../DownloadFiles/download_csv.txt';
import TableWithRightInfo from '../DownloadFiles/tableWithRightInfo.txt';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    display: "flex",
  },
  headerTitle: {
    fontWeight: 400,
    marginRight: theme.spacing(2),
  },
}));

const PageHeader = ({ title, children, style, toolText, download}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Box position="fixed" width="100%" zIndex={2}>
        <Toolbar
          variant="dense"
          className={classes.toolbar}
          style={{ ...style }}
        >
          <Grid container spacing={3}>
          <Grid item xs="auto">
          {title && (
            <Typography variant="h6" noWrap className={classes.headerTitle}>
              {title}
            </Typography>
          )}
          {children}
          </Grid>
          <Grid item xs={5}>
          {toolText && (
            <Tooltip
              title= {toolText}
              arrow
              placement="right-start"
            >
              <InfoIcon />
            </Tooltip>

          )}
         </Grid>
         <Grid item xs={4}>
         {download == 'dataTable_filters' && (
          <Button variant="contained" startIcon={<CloudDownloadIcon />}>
           <a href={DataTableFilters}
           download={download+'.html'}
           target="_blank"
           rel="noreferrer"
           style={{color:"black", paddingRight:"10px"}}
           >Download Source Code</a>
          </Button>
        )}
        {download == 'download_excel' && (
          <Button variant="contained" startIcon={<CloudDownloadIcon />}>
           <a href={DownloadExcel}
           download={download+'.html'}
           target="_blank"
           rel="noreferrer"
           style={{color:"black", paddingRight:"10px"}}
           >Download Source Code</a>
          </Button>
        )}
        {download == 'download_csv' && (
          <Button variant="contained" startIcon={<CloudDownloadIcon />}>
           <a href={DownloadCsv}
           download={download+'.html'}
           target="_blank"
           rel="noreferrer"
           style={{color:"black", paddingRight:"10px"}}
           >Download Source Code</a>
          </Button>
        )}
       {download == 'tableWithRightInfo' && (
          <Button variant="contained" startIcon={<CloudDownloadIcon />}>
           <a href={TableWithRightInfo}
           download={download+'.html'}
           target="_blank"
           rel="noreferrer"
           style={{color:"black", paddingRight:"10px"}}
           >Download Source Code</a>
          </Button>
        )}
        </Grid>
        </Grid>
        </Toolbar>

        <Divider />
      </Box>
      <Toolbar variant="dense" />
    </React.Fragment>
  );
};

export default PageHeader;

PageHeader.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
};
