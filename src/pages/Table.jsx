import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Link, useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Checkbox, FormControlLabel } from "@mui/material";
import Popover from "@mui/material/Popover";
import { columnNameMapping } from "../data/columnMapping";

// Default columns to be included in the table
const columnsToInclude = [
  "record_id",
  "created_dt",
  "data_source_modified_dt",
  "entity_type",
  "operating_status",
  "legal_name",
  "dba_name",
  "physical_address",
  "phone",
  "usdot_number",
  "mc_mx_ff_number",
  "power_units",
  "out_of_service_date",
];

// Component for table pagination actions (e.g., next/previous page)
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  // Go to the first page
  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  // Go to the previous page
  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  // Go to the next page
  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  // Go to the last page
  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// Main table component with custom pagination
export default function CustomPaginationActionsTable() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [data, setData] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [selectedColumns, setSelectedColumns] =
    React.useState(columnsToInclude);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [popoverAnchorEl, setPopoverAnchorEl] = React.useState(null);

  // Fetch data and columns on component mount and whenever dependencies change
  React.useEffect(() => {
    // Fetch table data based on current page, rows per page, and selected columns
    const fetchTableData = async () => {
      try {
        const response = await fetch(
          `https://fmsca-3doa.onrender.com/api/data?page=${
            page + 1
          }&pageSize=${rowsPerPage}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ columns: selectedColumns }),
          }
        );
        const result = await response.json();
        setData(result.data);
        setTotalRecords(result.totalRecords);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };

    // Fetch available columns
    const fetchColumns = async () => {
      try {
        const response = await fetch(`https://fmsca-3doa.onrender.com/api/columns`);
        const result = await response.json();
        setColumns(result.columns);
      } catch (error) {
        console.error("Error fetching columns:", error);
      }
    };

    fetchColumns(); // Always fetch columns
    fetchTableData(); // Fetch data based on the current state
  }, [page, rowsPerPage, selectedColumns]);

  // Update page number
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Update rows per page and reset page number to 0
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Toggle column visibility in the table
  const handleColumnToggle = (event) => {
    const columnName = event.target.name;
    if (event.target.checked) {
      setSelectedColumns((prev) => [...prev, columnName]);
    } else {
      setSelectedColumns((prev) => prev.filter((col) => col !== columnName));
    }
  };

  // Open the column selection popover
  const handlePopoverOpen = (event) => {
    setPopoverAnchorEl(event.currentTarget);
  };

  // Close the column selection popover
  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  // Check if popover is open
  const popoverOpen = Boolean(popoverAnchorEl);
  const popoverId = popoverOpen ? "simple-popover" : undefined;

  // Navigate to details page with row data
  const detailsPage = (row, id) => {
    console.log(id);

    navigate("/detailsPage", { state: { rowData: row, record_id: id } });
  };

  return (
    <div className="">
      <div className="text-end pb-5">
        <Link component="button" variant="body2" onClick={handlePopoverOpen}>
          Show/Hide Columns
        </Link>
      </div>

      {/* Popover for selecting which columns to display */}
      <Popover
        id={popoverId}
        open={popoverOpen}
        anchorEl={popoverAnchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            maxHeight: 300, // Adjust as needed for height
            width: 250, // Adjust as needed for width
            overflowY: "auto",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          {columns.map((col) => (
            <FormControlLabel
              key={col}
              control={
                <Checkbox
                  checked={selectedColumns.includes(col)}
                  onChange={handleColumnToggle}
                  name={col}
                />
              }
              label={col}
            />
          ))}
        </Box>
        <Button onClick={handlePopoverClose}>Cancel</Button>
        <Button onClick={handlePopoverClose}>OK</Button>
      </Popover>

      {/* Main table displaying data */}
      <Box sx={{ width: "100%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                {selectedColumns.map((col) => (
                  <TableCell
                    key={col}
                    sx={{
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      backgroundColor: "#f5f5f5",
                      textAlign: "left",
                      padding: "16px",
                      borderBottom: "2px solid #ccc",
                      whiteSpace: "nowrap", // Prevent text wrapping
                      overflow: "hidden", // Hide overflow text
                      textOverflow: "ellipsis", // Show ellipsis for overflow text
                      minWidth: 150, // Set a minimum width for the column
                    }}
                  >
                    {columnNameMapping[col] || col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.record_id}
                  onClick={() => detailsPage(row, row.record_id)}
                >
                  {selectedColumns.map((col) => (
                    <TableCell
                      key={col}
                      sx={{
                        whiteSpace: "nowrap", // Prevent text wrapping
                        overflow: "hidden", // Hide overflow text
                        textOverflow: "ellipsis", // Show ellipsis for overflow text
                      }}
                    >
                      {row[col]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TableFooter>
            <TableRow
              style={{
                float: "left",
                justifyContent: "space-evenly",
              }}
              className="py-2"
            >
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={selectedColumns.length}
                count={totalRecords}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </TableContainer>
      </Box>
    </div>
  );
}
