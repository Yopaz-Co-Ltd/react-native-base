import {associations, Model} from '@nozbe/watermelondb'
import TableNames from '@app/database/names/TableNames'
import {relation, text} from '@nozbe/watermelondb/decorators'
import ColumnNames from '@app/database/names/ColumnNames'
import PostModel from '@app/database/models/PostModel'

class CommentModel extends Model {
    static table = TableNames.COMMENTS
    static associations = associations([TableNames.POSTS, {type: 'belongs_to', key: ColumnNames.comments.postId}])

    @text(ColumnNames.comments.body) body?: string
    @text(ColumnNames.comments.postId) postId?: string
    @relation(TableNames.POSTS, ColumnNames.comments.postId) postModel?: Promise<PostModel>
}

export default CommentModel
