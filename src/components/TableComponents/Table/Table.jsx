import './Table.scss'
import TableRow from "../TableRow/TableRow.jsx"

const Table = props => {

    const entries = props.entries || []

    // Derive table columns from data so the same table works for categories and items.
    const columns = entries.length > 0
        ? Object.keys(entries[0]).filter(key => key !== 'id')
        : []

    const _formatHeader = key => {
        return key
            .replaceAll('_', ' ')
            .replace(/\b\w/g, char => char.toUpperCase())
    }

    // Forward edit event from row back up to App.
    const _editEntry = entry => {
        props.onEditEntry(entry)
    }

    // Forward delete event from row back up to App.
    const _deleteEntry = entry => {
        props.onDeleteEntry(entry)
    }

    return(
        <div className="Table-Component">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        {columns.map(column => (
                            <th key={column}>{_formatHeader(column)}</th>
                        ))}
                        <th colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Build one row component per entry object in the array. */}
                    { entries.map(
                        (entry, i) => { return( <TableRow key={i} index={i} entry={entry} columns={columns} onEditEntry={_editEntry} onDeleteEntry={_deleteEntry} /> ) }
                    )}
                </tbody>
            </table> 
        </div>
    )
    }
export default Table