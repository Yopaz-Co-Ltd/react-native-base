import TableNames from '@app/database/names/TableNames'
import LocalDatabase from '@app/database/LocalDatabase'
import CommentModel from '@app/database/models/CommentModel'

const collection = () => LocalDatabase.get<CommentModel>(TableNames.COMMENTS)

const CommentsDao = {
    get: (id: string): Promise<CommentModel> => collection().find(id),
    getAll: (): Promise<CommentModel[]> => collection().query().fetch(),
    insert: (body: string, postId: string) =>
        LocalDatabase.write(async () => {
            await collection().create(newCommentModel => {
                newCommentModel.body = body
                newCommentModel.postId = postId
            })
        }),
    update: (commentModel: CommentModel, body: string, postId: string) =>
        LocalDatabase.write(async () => {
            await commentModel.update(newCommentModel => {
                newCommentModel.body = body
                newCommentModel.postId = postId
            })
        }),
    syncDelete: (commentModel: CommentModel): Promise<void> =>
        LocalDatabase.write(async () => {
            await commentModel.markAsDeleted()
        }),
    delete: (commentModel: CommentModel): Promise<void> =>
        LocalDatabase.write(async () => {
            await commentModel.destroyPermanently()
        }),
}

export default CommentsDao
