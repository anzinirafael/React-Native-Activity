import { BooleanLiteralTypeAnnotation } from '@babel/types';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(oldState => [... oldState, data])
  }

  function handleToggleTaskDone(id: number) {
    const stateDone = tasks.map(task => {
      if (task.id === id) { 
        return {
          ...task,
          done: !task.done
        }
      }
      return task;
    });
    setTasks(stateDone)
  }

  function handleRemoveTask(id: number) {
    setTasks(oldstate => oldstate.filter(
      newTaskTitle => newTaskTitle.id !== id
    ));
    
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})