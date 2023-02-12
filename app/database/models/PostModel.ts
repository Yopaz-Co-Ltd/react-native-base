import {associations, Model} from '@nozbe/watermelondb'
import TableNames from '@app/database/names/TableNames'
import {children, field, text, writer} from '@nozbe/watermelondb/decorators'
import ColumnNames from '@app/database/names/ColumnNames'
import CommentModel from '@app/database/models/CommentModel'

class PostModel extends Model {
    static table = TableNames.POSTS
    static associations = associations([
        TableNames.COMMENTS,
        {type: 'has_many', foreignKey: ColumnNames.comments.postId},
    ])
    @text(ColumnNames.posts.title) title?: string
    @text(ColumnNames.posts.subtitle) subtitle?: string
    @text(ColumnNames.posts.body) body?: string
    @field(ColumnNames.posts.isPinned) isPinned?: boolean
    @children(TableNames.COMMENTS) comments?: Promise<CommentModel[]>

    @writer
    async pin(): Promise<void> {
        await this.update(post => (post.isPinned = true))
    }
}

export default PostModel
