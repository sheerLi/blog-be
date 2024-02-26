import {
    Controller,
    Body,
    Get,
    Post,
    Patch,
    Param,
    Delete,
    ValidationPipe,
    ParseIntPipe,
} from '@nestjs/common';

import { CreatePostDto } from '@/modules/content/dtos/create-post.dto';

import { UpdatePostDto } from '@/modules/content/dtos/update-post.dto';

import { PostService } from '@/modules/content/services/post.service';

@Controller('posts')
export class PostController {
    constructor(private postService: PostService) {}

    @Get()
    index() {
        return this.postService.findAll();
    }

    @Get(':id')
    show(@Param('id', new ParseIntPipe()) id: number) {
        return this.postService.findOne(id);
    }

    @Post()
    store(
        @Body(
            new ValidationPipe({
                transform: true,
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                validationError: { target: false },
                groups: ['create'],
            }),
        )
        data: CreatePostDto,
    ) {
        return this.postService.create(data);
    }

    @Patch()
    update(
        @Body(
            new ValidationPipe({
                transform: true,
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                validationError: { target: false },
                groups: ['update'],
            }),
        )
        data: UpdatePostDto,
    ) {
        return this.postService.update(data);
    }

    @Delete(':id')
    delete(@Param('id', new ParseIntPipe()) id: number) {
        return this.postService.delete(id);
    }
}
