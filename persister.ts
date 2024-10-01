import { createPowerSyncPersister } from 'tinybase/persisters/persister-powersync';
import { createStore } from 'tinybase/store';
import { powersync } from './powersync';

export const persister = createPowerSyncPersister(
    createStore().setTablesSchema({
        lists: {
            id: { type: 'string' },
            created_at: { type: 'string' },
            name: { type: 'string' },
            owner_id: { type: 'string' },
        },
        todos: {
            id: { type: 'string' },
            created_at: { type: 'string' },
            completed_at: { type: 'string' },
            description: { type: 'string' },
            completed: { type: 'boolean' },
            created_by: { type: 'string' },
            completed_by: { type: 'string' },
            list_id: { type: 'string' },
        },
    }),
    powersync,
    {
        mode: 'tabular',
        tables: {
            load: {
                todos: {
                    tableId: 'todos',
                    rowIdColumnName: 'id',
                },
                lists: {
                    tableId: 'lists',
                    rowIdColumnName: 'id',
                },
            },
            save: {
                todos: {
                    tableName: 'todos',
                    rowIdColumnName: 'id',
                },
                lists: {
                    tableName: 'lists',
                    rowIdColumnName: 'id',
                },
            },
        },
    },
    console.info,
    console.warn
);
