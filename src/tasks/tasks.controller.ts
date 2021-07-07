import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}
    
    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
        console.log(filterDto);
        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilters(filterDto);
        } else {
        return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
       return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() CreateTaskDto): Task {
       return this.tasksService.createTask(CreateTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id')id: string): void{
        this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id')id: string,
        @Body('status')status: TaskStatus,
    ){
        return this.tasksService.updateTaskStatus(id, status);
    }

    // Without dto
    // @Post()
    // createTask(
    //     @Body ('title') title: string,
    //     @Body ('description') description: string,
    // ): Task {
    //    return this.tasksService.createTask(title,description);
    // }
    // Another way for doing above
    // @Post()
    // createTask(@Body () body) {
    //     console.log('body',body);
    // }
}
