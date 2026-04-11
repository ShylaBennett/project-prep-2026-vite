import './TableRow.scss'

const TableRow = props => {
    const _editRowEntry = () => {
        props.onEditEntry(props.entry)
    }

    const _deleteRowEntry = () => {
        props.onDeleteEntry(props.entry)
    }

    return(
        <tr>
            <td>{props.entry.id}</td>
            {props.columns.map(column => (
                <td key={column}>{props.entry[column]}</td>
            ))}
            <td><button onClick={ _editRowEntry }>Edit</button></td>
            <td><button onClick={ _deleteRowEntry }>Delete</button></td>
        </tr>
    )
}

export default TableRow