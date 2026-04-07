import './TableRow.scss'

const TableRow = props => {

    // Send this row's entry object to parent when Edit is clicked.
    const _editRowEntry = () => {
        props.onEditEntry(props.entry)
    }

    // Send this row's entry object to parent when Delete is clicked.
    const _deleteRowEntry = () => {
        props.onDeleteEntry(props.entry)
    }

    return(
        <tr>
            {/* Always show the primary id first. */}
            <td>{props.entry.id}</td>
            {/* Build one cell per column name passed from the Table component. */}
            {props.columns.map(column => (
                <td key={column}>{props.entry[column]}</td>
            ))}
            {/*action buttons call parent with this row's data*/}
            <td><button onClick={ _editRowEntry }>Edit</button></td>
            <td><button onClick={ _deleteRowEntry }>Delete</button></td>
        </tr>
    )
}

export default TableRow