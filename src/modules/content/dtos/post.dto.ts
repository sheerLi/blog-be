import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    IsOptional,
    Min,
    MaxLength,
    IsNotEmpty,
    IsNumber,
    IsBoolean,
    IsEnum,
    IsDefined,
    IsUUID,
    ValidateIf,
} from 'class-validator';

import { toNumber, isNil } from 'lodash';

import { DtoValidation } from '@/modules/core/decorators';
import { toBoolean } from '@/modules/core/helpers';
import { PaginateOptions } from '@/modules/database/types';

import { PostOrderType } from '../constants';

/**
 * 文章分页查询验证
 */
@DtoValidation({ type: 'query' })
export class QueryPostDto implements PaginateOptions {
    @Transform(({ value }) => toBoolean(value))
    @IsBoolean()
    @IsOptional()
    isPublished?: boolean;

    @IsEnum(PostOrderType, {
        message: `排序规则必须是${Object.values(PostOrderType).join(',')}其中一项`,
    })
    @IsOptional()
    orderBy?: PostOrderType;

    @Transform(({ value }) => toNumber(value))
    @Min(1, { message: '当前页必须大于1' })
    @IsNumber()
    @IsOptional()
    page = 1;

    @Transform(({ value }) => toNumber(value))
    @Min(1, { message: '每页显示数据必须大于1' })
    @IsNumber()
    @IsOptional()
    limit = 10;
}

/**
 * 文章创建验证
 */
@DtoValidation({ groups: ['create'] })
export class CreatePostDto {
    @MaxLength(255, {
        always: true,
        message: '帖子标题长度最大为$constraint1',
    })
    @IsNotEmpty({ groups: ['create'], message: '帖子标题必须填写' })
    @IsOptional({ groups: ['update'] })
    title: string;

    @IsNotEmpty({ groups: ['create'], message: '帖子内容必须填写' })
    @IsOptional({ groups: ['update'] })
    body: string;

    @MaxLength(500, {
        always: true,
        message: '帖子描述长度最大为$constraint1',
    })
    @IsOptional({ always: true })
    summary?: string;

    @Transform(({ value }) => toBoolean(value))
    @IsBoolean({ always: true })
    @ValidateIf((value) => !isNil(value.publish))
    @IsOptional({ always: true })
    publish?: boolean;

    @MaxLength(20, {
        each: true,
        always: true,
        message: '每个关键字长度最大为$constraint1',
    })
    @IsOptional({ always: true })
    keywords?: string[];

    @Transform(({ value }) => toNumber(value))
    @Min(1, { always: true, message: '排序值必须大于0' })
    @IsNumber(undefined, { always: true })
    @IsOptional({ always: true })
    customOrder?: number = 0;
}

/**
 * 文章更新验证
 */
@DtoValidation({ groups: ['update'] })
export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsUUID(undefined, { groups: ['update'], message: '文章ID格式错误' })
    @IsDefined({ groups: ['update'], message: '文章ID必须指定' })
    id: string;
}
