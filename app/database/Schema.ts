import {appSchema} from '@nozbe/watermelondb'
import PostsTable from '@app/database/tables/PostsTable'
import CommentsTable from '@app/database/tables/CommentsTable'

const Schema = appSchema({
    version: 1,
    tables: [PostsTable, CommentsTable],
})

export default Schema
