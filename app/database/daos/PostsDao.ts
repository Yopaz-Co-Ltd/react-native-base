import TableNames from '@app/database/names/TableNames'
import LocalDatabase from '@app/database/LocalDatabase'
import PostModel from '@app/database/models/PostModel'
import {Q} from '@nozbe/watermelondb'
import ColumnNames from '@app/database/names/ColumnNames'

const collection = () => LocalDatabase.get<PostModel>(TableNames.POSTS)

const PostsDao = {
    get: (id: string): Promise<PostModel> => collection().find(id),
    getAll: (): Promise<PostModel[]> => collection().query().fetch(),
    insert: (title: string, body: string, isPinned: boolean, subtitle?: string) =>
        LocalDatabase.write(async () => {
            await collection().create(newPostModel => {
                newPostModel.title = title
                newPostModel.body = body
                newPostModel.isPinned = isPinned
                newPostModel.subtitle = subtitle
            })
        }),
    update: (postModel: PostModel, title: string, body: string, isPinned: boolean, subtitle?: string) =>
        LocalDatabase.write(async () => {
            await postModel.update(newPostModel => {
                newPostModel.title = title
                newPostModel.body = body
                newPostModel.isPinned = isPinned
                newPostModel.subtitle = subtitle
            })
        }),
    syncDelete: (postModel: PostModel): Promise<void> =>
        LocalDatabase.write(async () => {
            await postModel.markAsDeleted()
        }),
    delete: (postModel: PostModel): Promise<void> =>
        LocalDatabase.write(async () => {
            await postModel.destroyPermanently()
        }),
    filterPinned: (): Promise<PostModel[]> => collection().query(Q.where(ColumnNames.posts.isPinned, true)).fetch(),
}

export default PostsDao
