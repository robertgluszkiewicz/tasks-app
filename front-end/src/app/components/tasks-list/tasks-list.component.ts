import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent {
  tasks?: Task[];
  currentTask: Task = {};
  currentIndex = -1;
  name = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.retrieveTasks();
  }

  retrieveTasks(): void {
    this.taskService.getAll().subscribe({
      next: (data) => {
        this.tasks = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.retrieveTasks();
    this.currentTask = {};
    this.currentIndex = -1;
  }

  setActiveTask(task: Task, index: number): void {
    this.currentTask = task;
    this.currentIndex = index;
  }

  removeAllTasks(): void {
    this.taskService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  searchName(): void {
    this.currentTask = {};
    this.currentIndex = -1;

    this.taskService.findByName(this.name).subscribe({
      next: (data) => {
        this.tasks = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
}
