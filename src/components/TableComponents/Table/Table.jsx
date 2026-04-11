import './Table.scss'
import TableRow from "../TableRow/TableRow.jsx"

const Table = props => {

    const entries = props.entries || []
    const columns = entries.length > 0
        ? Object.keys(entries[0]).filter(key => key !== 'id')
        : []

    const _formatHeader = key => {
        return key
            .replaceAll('_', ' ')
            .replace(/\b\w/g, char => char.toUpperCase())
    }
    const _editEntry = entry => {
        props.onEditEntry(entry)
    }

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
                    { entries.map(
                        (entry, i) => { return( <TableRow key={i} index={i} entry={entry} columns={columns} onEditEntry={_editEntry} onDeleteEntry={_deleteEntry} /> ) }
                    )}
                </tbody>
            </table> 
        </div>
    )
    }
export default Table