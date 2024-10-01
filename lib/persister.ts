import { createPowerSyncPersister } from 'tinybase/persisters/persister-powersync';
import { createStore } from 'tinybase/store';
import { powersync } from './powersync';

export const persister = createPowerSyncPersister(
    createStore().setTablesSchema({
        todos: {
            id: { type: 'string' },
            created_at: { type: 'string' },
            completed: { type: 'boolean' },
            description: { type: 'string' },
            owner_id: { type: 'string' },
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
            },
            save: {
                todos: {
                    tableName: 'todos',
                    rowIdColumnName: 'id',
                },
            },
        },
    },
    console.info,
    console.warn
);
