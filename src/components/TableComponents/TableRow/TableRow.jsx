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
            <td>{props.entry.id}</td>
            <td>{props.entry.value1}</td>
            <td>{props.entry.value2}</td>
            <td>{props.entry.value3 }</td>
            <td><button onClick={ _editRowEntry }>Edit</button></td>
            <td><button onClick={ _deleteRowEntry }>Delete</button></td>
        </tr>
    )
}

export default TableRow