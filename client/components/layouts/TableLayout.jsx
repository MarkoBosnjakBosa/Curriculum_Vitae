import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper } from "@mui/material";

const TableLayout = (props) => {
  const { labels, usePaging, customization, children } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const displayedRows = children.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const changeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper} className={customization}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right"><strong>#</strong></TableCell>
              {labels.map((label) => (
                <TableCell key={label} align="right"><strong>{label}</strong></TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{usePaging ? displayedRows : children}</TableBody>
        </Table>
      </TableContainer>
      {usePaging && (
        <TablePagination component="div" rowsPerPageOptions={[10, 20, 50, 100]} count={children.length} page={page} rowsPerPage={rowsPerPage} className={customization} onPageChange={(event, newPage) => setPage(newPage)} onRowsPerPageChange={changeRowsPerPage} />
      )}
    </>
  );
};

export default TableLayout;
