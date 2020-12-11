export const CustomTableCell = ({ row, name, onChange }) => {
  const classes = useStyles()
  const { isEditMode } = row
  const attributeToLabel = {
    firstName: 'First Name',
    lastName: 'Last Name',
    birthday: 'MM-DD-YYYY',
    phoneNumber: '+12035724630',
  }
  return (
    <TableCell align="left" className={classes.tableCell} aria-label={`${name}-cell`}>
      {isEditMode ? (
        <TextField
          value={row[name]}
          name={name}
          onChange={(e) => onChange(e, row)}
          className={classes.input}
          label={attributeToLabel[name]}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  )
}
