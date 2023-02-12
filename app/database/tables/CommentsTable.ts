import {tableSchema} from '@nozbe/watermelondb'
import TableNames from '@app/database/names/TableNames'
import ColumnNames from '@app/database/names/ColumnNames'

const CommentsTable = tableSchema({
    name: TableNames.COMMENTS,
    columns: [
        {name: ColumnNames.comments.body, type: 'string'},
        {name: ColumnNames.comments.postId, type: 'string', isIndexed: true},
    ],
})

export default CommentsTable
