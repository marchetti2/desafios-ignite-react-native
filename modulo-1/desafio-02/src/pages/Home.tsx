import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const findTask = tasks.find((task) => task.title === newTaskTitle);

    if (!findTask) {
      setTasks((previousState) => [
        ...previousState,
        {
          id: new Date().getTime(),
          title: newTaskTitle,
          done: false,
        },
      ]);
      return;
    }

    Alert.alert(
      "Task já cadastrada",
      "Você não pode cadastrar uma task com o mesmo nome"
    );
    return;
  }

  function handleToggleTaskDone(id: number) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task = {
          ...task,
          done: !task.done,
        };
      }
      return task;
    });
    setTasks(newTasks);
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        task = {
          ...task,
          title: taskNewTitle,
        };
      }
      return task;
    });
    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () => {
            const newTasks = tasks.filter((task) => task.id !== id);

            setTasks(newTasks);
            return;
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
