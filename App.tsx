import 'react-native-get-random-values';
import '@azure/core-asynciterator-polyfill';

import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, View, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { openConnection } from './lib/powersync';
import { persister } from './lib/persister';
import { v4 as uuid } from 'uuid';

type List = {
    id: string;
    created_at: string;
    owner_id: string;
    name: string;
};

export default function App() {
    const [userId, setUserId] = useState('');
    const [lists, setLists] = useState<List[]>([]);
    const [listName, setListName] = useState('');

    const store = persister.getStore();

    useEffect(() => {
        (async () => {
            const { id } = await openConnection();

            setUserId(id);

            await persister.load();

            console.log(store.getTable('lists'));

            const newLists = [];
            const rowIds = store.getRowIds('lists');
            for (const rowId of rowIds) {
                const data = store.getRow('lists', rowId);
                const list = {
                    id: rowId,
                    ...data,
                } as List;

                newLists.push(list);
            }

            setLists(newLists);
        })();
    }, []);

    useEffect(() => {
        console.log('----- START NEW LISTS -----');
        lists.forEach((item) => console.log(item.id));
        console.log('----- END NEW LISTS -----');
    }, [lists]);

    async function addList() {
        const listId = uuid();

        store.setRow('lists', listId, {
            created_at: new Date().toUTCString(),
            owner_id: userId,
            name: listName,
        });

        await persister.save();

        Alert.alert('Saved new list w/ ID: ' + listId);
    }

    return (
        <View style={styles.container}>
            <TextInput onChangeText={setListName} />
            <Button title='Add new list' onPress={addList} />
            <StatusBar style='auto' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 32,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
