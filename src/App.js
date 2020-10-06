import React from "react";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from '@material-ui/core/TextField';
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import { IconButton } from '@material-ui/core';
// Icons
import AddCircle from "@material-ui/icons/AddCircle";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import EditIcon from "@material-ui/icons/EditOutlined";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  selectTableCell: {
    width: 60
  },
  tableCell: {
    width: 130,
    height: 40
  },
  input: {
    width: 130,
    height: 40
  }
}));

const createData = (firstName, lastName, birthday, phoneNumber) => ({
  id: uuidv4(),
  firstName,
  lastName,
  birthday,
  phoneNumber,
  isEditMode: false
});

const CustomTableCell = ({ row, name, onChange }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  const attributeToLabel = {firstName: 'First Name', lastName: 'Last Name', birthday: 'MM-DD-YYYY', phoneNumber: '+12035724630'}
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <TextField
          value={row[name]}
          name={name}
          onChange={e => onChange(e, row)}
          className={classes.input}
          label={attributeToLabel[name]}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

export const App = () => {
  const [rows, setRows] = React.useState([
    createData("", "", "", ""),
  ]);
  const [previous, setPrevious] = React.useState({});
  const classes = useStyles();

  const onToggleEditMode = id => {
    setRows(state => {
      return rows.map(row => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const addRow = () => {
    const lastRow = rows[rows.length - 1]
    if(!isRowEmpty(lastRow)){
      const newEmptyRow = createData("", "", "", "")
      const newRows = rows.concat(newEmptyRow)
      setRows(newRows)
    } 
  }

  const isRowEmpty = (row) => {
    return !(row.firstName && row.lastName && row.birthday && row.phoneNumber)
  }

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const onRevert = id => {
    const newRows = rows.map(row => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setRows(newRows);
    setPrevious(state => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };

  return (
    <div>
      <Paper className={classes.root} >
        <Table className={classes.table} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell align="left" />
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Birthday</TableCell>
              <TableCell align="left">Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell className={classes.selectTableCell}>
                  {row.isEditMode ? (
                    <>
                      <IconButton
                        aria-label="done"
                        onClick={() => onToggleEditMode(row.id)}
                      >
                        <DoneIcon />
                      </IconButton>
                      <IconButton
                        aria-label="revert"
                        onClick={() => onRevert(row.id)}
                      >
                        <RevertIcon />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton
                      aria-label="delete"
                      onClick={() => onToggleEditMode(row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
                <CustomTableCell {...{ row, name: "firstName", onChange }} />
                <CustomTableCell {...{ row, name: "lastName", onChange }} />
                <CustomTableCell {...{ row, name: "birthday", onChange }} />
                <CustomTableCell {...{ row, name: "phoneNumber", onChange }} />
              </TableRow>
            ))}
          </TableBody>
        </Table>     
      </Paper>
      <Grid container direction="row-reverse" justify="flex-start" alignItems="center">
        <IconButton>
          <CloudUploadIcon fontSize="large"/>
        </IconButton> 
        <IconButton onClick={() => addRow()}>
          <AddCircle fontSize="large"/>
        </IconButton>                
      </Grid>
    </div>
  );
}