import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { FindAllParameters, TaskDto } from './task.dto';
import { TaskService } from './task.service';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    create(@Body() task: TaskDto) {
        this.taskService.create(task);
        console.log('Task created with success');
    }

    @Get('/:id')
    get(@Param('id') id: string): TaskDto {
        console.log(id);    
        return this.taskService.findById(id);
    }

    @Get()
    findAll(@Query() params: FindAllParameters): TaskDto[] {
        return this.taskService.findAll(params);
    }

    @Put('/')
    update(@Body() task: TaskDto) {
        this.taskService.update(task);
    }

    @Delete('/:id')
    remove(@Param('id') id: string){
        this.taskService.remove(id);
    }
    
}
