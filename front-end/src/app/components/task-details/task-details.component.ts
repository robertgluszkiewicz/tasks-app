import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent {
  @Input() viewMode = false;

  @Input() currentTask: Task = {
    name: '',
    description: '',
    isUrgent: false
  };

  message = '';

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTask(this.route.snapshot.params['id']);
    }
  }

  getTask(id: string): void {
    this.taskService.get(id).subscribe({
      next: (data) => {
        this.currentTask = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  updateIsUrgent(urgent: boolean): void {
    const data = {
      name: this.currentTask.name,
      description: this.currentTask.description,
      isUrgent: urgent
    };

    this.message = '';

    this.taskService.update(this.currentTask.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.currentTask.isUrgent = urgent;
        this.message = res.message
          ? res.message
          : 'The importance was updated successfully!';
      },
      error: (e) => console.error(e)
    });
  }

  updateTask(): void {
    this.message = '';

    this.taskService
      .update(this.currentTask.id, this.currentTask)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This task was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteTask(): void {
    this.taskService.delete(this.currentTask.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/task']);
      },
      error: (e) => console.error(e)
    });
  }
}
