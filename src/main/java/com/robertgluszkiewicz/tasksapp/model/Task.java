package com.robertgluszkiewicz.tasksapp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "task")
public class Task {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  @Column(name = "name", length = 60)
  private String name;

  @Column(name = "description")
  private String description;

  @Column(name = "is_urgent")
  private boolean isUrgent;

  public Task() {

  }

  public Task(String name, String description, boolean isUrgent) {
    this.name = name;
    this.description = description;
    this.isUrgent = isUrgent;
  }

  public long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public void setName(String title) {
    this.name = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public boolean isIsUrgent() {
    return isUrgent;
  }

  public void setIsUrgent(boolean isPublished) {
    this.isUrgent = isPublished;
  }

  @Override
  public String toString() {
    return "Task [id=" + id + ", name=" + name + ", desc=" + description + ", isUrgent=" + isUrgent + "]";
  }
}
