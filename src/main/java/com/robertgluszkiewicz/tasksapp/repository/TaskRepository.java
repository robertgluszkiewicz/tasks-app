package com.robertgluszkiewicz.tasksapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.robertgluszkiewicz.tasksapp.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
  List<Task> findByNameContaining(String name);
}
