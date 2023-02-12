import {tableSchema} from '@nozbe/watermelondb'
import TableNames from '@app/database/names/TableNames'
import ColumnNames from '@app/database/names/ColumnNames'

const PostsTable = tableSchema({
    name: TableNames.POSTS,
    columns: [
        {name: ColumnNames.posts.title, type: 'string'},
        {name: ColumnNames.posts.subtitle, type: 'string', isOptional: true},
        {name: ColumnNames.posts.body, type: 'string'},
        {name: ColumnNames.posts.isPinned, type: 'boolean'},
    ],
})

export default PostsTable
