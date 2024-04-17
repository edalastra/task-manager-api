import { Injectable, NotFoundException } from '@nestjs/common';
import { FindAllParameters, TaskDto, TaskStatusEnum } from './task.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
    private tasks: TaskDto[] = [];

    create(task: TaskDto): void {
        task.id = uuid();
        task.status = TaskStatusEnum.TODO;
        this.tasks.push(task);
    }

    findById(id: string): TaskDto {
        const idx = this.getIdx(id);

        return this.tasks[idx]
    }

    findAll(params: FindAllParameters): TaskDto[] {
        return this.tasks.filter(task => task.title.includes(params.title) || task.status.includes(params.status));
    }

    update(task: TaskDto): void {
        const idx = this.getIdx(task.id)
        
        this.tasks[idx] = task;
    }

    remove(id: string): void {
        const idx = this.getIdx(id);

        this.tasks.splice(idx, 1);
    }

    private getIdx(id: string): number {
        const idx = this.tasks
            .findIndex(task => task.id === id);
    
        if (idx < 0) {
            throw new NotFoundException(`Task with id ${id} not found.`);
        }

        return idx;
    }
}
