import { Repository } from 'typeorm';

import { CustomRepository } from '../../database/decorators';

import { PostEntity } from '../entities/post.entity';

@CustomRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
    buildBaseQB() {
        return this.createQueryBuilder('post');
    }
}
