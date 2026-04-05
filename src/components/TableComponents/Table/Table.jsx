import './Table.scss'
import TableRow from "../TableRow/TableRow.jsx"

const Table = props => {

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
                        <th>Value 1</th>
                        <th>Value 2</th>
                        <th>Value 3</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Build one row component per entry object in the array. */}
                    { props.entries.map(
                        (entry, i) => { return( <TableRow key={i} index={i} entry={entry} onEditEntry={_editEntry} onDeleteEntry={_deleteEntry} /> ) }
                    )}
                </tbody>
            </table> 
        </div>
    )
    }
export default Table