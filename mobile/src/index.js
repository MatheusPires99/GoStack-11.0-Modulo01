import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from "./services/api"

// import { Container } from './styles';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects").then(response => {
      setProjects(response.data)
    })
  }, [])

  async function handleAddProject() {
    const response = await api.post("projects", {
      title: "React Native",
      owner: "Matheus"
    });

    setProjects([...projects, response.data])
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container} >
        <FlatList 
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.text}>{project.title}</Text>
          )} 
        />

        <TouchableOpacity 
          activeOpacity={0.6} 
          style={styles.button} 
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 32
  },
  button: {
    margin: 20,
    borderRadius: 4,
    backgroundColor: "#fff",
    color: "#7159c1",
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "#7159c1",
    fontWeight: "bold",
    fontSize: 20
  }
})
