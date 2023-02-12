import {Database} from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import Migrations from '@app/database/Migrations'
import Schema from '@app/database/Schema'
import CommentModel from '@app/database/models/CommentModel'
import PostModel from '@app/database/models/PostModel'
import {getApplicationName} from 'react-native-device-info'

const Adapter = new SQLiteAdapter({
    dbName: getApplicationName(),
    migrations: Migrations,
    schema: Schema,
    usesExclusiveLocking: false,
    jsi: true,
    onSetUpError: error => {
        console.log(`set up database failed: ${error.message}`)
    },
})

const LocalDatabase = new Database({
    adapter: Adapter,
    modelClasses: [PostModel, CommentModel],
})

export default LocalDatabase
