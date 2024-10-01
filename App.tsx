// Polyfills for AsyncIterator and getRandomValues
import 'react-native-get-random-values';
import '@azure/core-asynciterator-polyfill';

import { StatusBar } from 'expo-status-bar';
import {
    Alert,
    Button,
    StyleSheet,
    View,
    TextInput,
    FlatList,
} from 'react-native';
import { useEffect, useState } from 'react';
import { openConnection } from './lib/powersync';
import { persister } from './lib/persister';
import { v4 as uuid } from 'uuid';

type Todo = {
    id: string;
    created_at: string;
    completed: boolean;
    description: string;
    owner_id: string;
};

export default function App() {
    const [userId, setUserId] = useState('');
    const [todos, setTodos] = useState<Todo[]>([]);
    const [description, setDescription] = useState('');

    const store = persister.getStore();

    useEffect(() => {
        (async () => {
            // Get user ID
            const { id } = await openConnection();
            setUserId(id);

            // Save todos to state
            await persister.load();

            const newTodos = [];
            const rowIds = store.getRowIds('todos');
            for (const rowId of rowIds) {
                const data = store.getRow('todos', rowId);
                const list = {
                    id: rowId,
                    ...data,
                } as Todo;

                newTodos.push(list);
            }

            setTodos(newTodos);
        })();
    }, []);

    // Log todo IDs to the console
    useEffect(() => {
        console.log(' -- TODOS UPDATED --');
        todos.forEach((item) => console.log(item.id));
    }, [todos]);

    // Create a new todo using Tinybase
    async function addTodo() {
        const todoId = uuid();

        store.setRow('todos', todoId, {
            created_at: new Date().toUTCString(),
            completed: false,
            owner_id: userId,
            description,
        });

        await persister.save();

        Alert.alert('Saved new list w/ ID: ' + todoId);
    }

    return (
        <View style={styles.container}>
            <Button title='Add new todo' onPress={addTodo} />
            <FlatList
                style={styles.todoList}
                data={todos}
                renderItem={TodoItem}
            />
            <StatusBar style='auto' />
        </View>
    );
}

function TodoItem(props: any) {
    console.debug(props);
    return <View style={styles.todoItem}></View>;
}

const styles = StyleSheet.create({
    container: {},
    todoList: {},
    todoItem: {},
});
