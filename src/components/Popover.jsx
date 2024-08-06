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
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

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

function createData(name, calories, fat, othervalue) {
  return { name, calories, fat, othervalue };
}

const initialRows = [
  createData("Cupcake", 305, 3.7, 10),
  createData("Donut", 452, 25.0, 10),
  createData("Eclair", 262, 16.0, 10),
  createData("Frozen yoghurt", 159, 6.0, 10),
  createData("Gingerbread", 356, 16.0, 10),
  createData("Honeycomb", 408, 3.2, 10),
  createData("Ice cream sandwich", 237, 9.0, 10),
  createData("Jelly Bean", 375, 0.0, 10),
  createData("KitKat", 518, 26.0, 10),
  createData("Lollipop", 392, 0.2, 10),
  createData("Marshmallow", 318, 0, 10),
  createData("Nougat", 360, 19.0, 10),
  createData("Oreo", 437, 18.0, 10),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

export default function CustomPaginationActionsTable() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [columns, setColumns] = React.useState({
    name: true,
    calories: true,
    fat: true,
    othervalue: true,
  });
  const [popoverAnchorEl, setPopoverAnchorEl] = React.useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleColumnToggle = (event) => {
    setColumns({
      ...columns,
      [event.target.name]: event.target.checked,
    });
  };

  const handlePopoverOpen = (event) => {
    setPopoverAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const popoverOpen = Boolean(popoverAnchorEl);
  const popoverId = popoverOpen ? "simple-popover" : undefined;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - initialRows.length) : 0;

  // details page function
  const detailsPage = (row) => {
    navigate("/detailsPage", { state: { rowData: row } });
  };

  return (
    <div>
      <div className="text-end pb-5 ">
        <Link
          component="button"
          variant="body2"
          onClick={handlePopoverOpen}
          className="text-blue-600"
        >
          Show/Hide Columns
        </Link>
      </div>
      <Popover
        id={popoverId}
        open={popoverOpen}
        anchorEl={popoverAnchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 2 }}>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={columns.name}
                  onChange={handleColumnToggle}
                  name="name"
                />
              }
              label="Name"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={columns.calories}
                  onChange={handleColumnToggle}
                  name="calories"
                />
              }
              label="Calories"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={columns.fat}
                  onChange={handleColumnToggle}
                  name="fat"
                />
              }
              label="Fat"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={columns.othervalue}
                  onChange={handleColumnToggle}
                  name="othervalue"
                />
              }
              label="Other Value"
            />
          </div>
        </Box>
      </Popover>
      <Box sx={{ width: "100%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                {columns.name && <TableCell>Name</TableCell>}
                {columns.calories && (
                  <TableCell align="right">Calories</TableCell>
                )}
                {columns.fat && <TableCell align="right">Fat (g)</TableCell>}
                {columns.othervalue && (
                  <TableCell align="right">Other Value (g)</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? initialRows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : initialRows
              ).map((row) => (
                <TableRow key={row.name} onClick={() => detailsPage(row)}>
                  {columns.name && (
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                  )}
                  {columns.calories && (
                    <TableCell style={{ width: 160 }} align="right">
                      {row.calories}
                    </TableCell>
                  )}
                  {columns.fat && (
                    <TableCell style={{ width: 160 }} align="right">
                      {row.fat}
                    </TableCell>
                  )}
                  {columns.othervalue && (
                    <TableCell style={{ width: 160 }} align="right">
                      {row.othervalue}
                    </TableCell>
                  )}
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell
                    colSpan={
                      Object.keys(columns).filter((col) => columns[col]).length
                    }
                  />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={
                    Object.keys(columns).filter((col) => columns[col]).length
                  }
                  count={initialRows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
