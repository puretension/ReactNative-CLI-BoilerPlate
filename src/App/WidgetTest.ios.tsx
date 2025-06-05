import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  Text,
  StatusBar,
  useColorScheme,
} from 'react-native';
import SharedDefaults from './SharedDefaults';

type Todo = {
  id: number;
  text: string;
  isCompleted: boolean;
};

export default function WidgetTestIOS() {
  const isDarkMode = useColorScheme() === 'dark';

  const [todos, setTodos] = useState<Todo[]>([
    {id: 1, text: '픽플리 위젯 테스트', isCompleted: false},
    {id: 2, text: '투두 기능 확인', isCompleted: false},
  ]);

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? {...t, isCompleted: !t.isCompleted} : t)),
    );
  };
  const handlePress = (id: number) => {
    setTodos(prev =>
      prev.map(i => (i.id === id ? {...i, isCompleted: !i.isCompleted} : i)),
    );
  };

  useEffect(() => {
    console.log('shared defaults', SharedDefaults);
    SharedDefaults.set(todos);
  }, [todos]);

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: isDarkMode ? 'black' : 'white'}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView style={{padding: 24}}>
        <Text style={{fontSize: 22, fontWeight: '700', marginBottom: 16}}>
          🍎 iOS 테스트 화면
        </Text>
        {todos.map(todo => (
          <Text
            key={todo.id}
            onPress={() => toggleTodo(todo.id)}
            style={{
              fontSize: 18,
              color: isDarkMode ? 'white' : 'black',
              marginBottom: 8,
              textDecorationLine: todo.isCompleted ? 'line-through' : 'none',
            }}>
            {todo.text}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
