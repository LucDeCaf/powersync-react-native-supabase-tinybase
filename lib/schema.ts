import { column, Schema, Table } from '@powersync/react-native';

const todos = new Table(
    {
        // id column (text) is automatically included
        created_at: column.text,
        completed: column.integer,
        description: column.text,
        owner_id: column.text,
    },
    { indexes: {} }
);

export const AppSchema = new Schema({
    todos,
});

export type Database = (typeof AppSchema)['types'];
