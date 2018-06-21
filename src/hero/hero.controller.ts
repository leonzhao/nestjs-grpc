import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { IHeroById } from './interfaces/hero-by-id.interface';
import { IHero } from './interfaces/hero.interface';

@Controller()
export class HeroController {
  @GrpcMethod('HeroService')
  findOne(data: IHeroById): IHero {
    console.log('server: call method findone')
    const items: IHero[] = [{ id: 1, name: 'Damon' }, { id: 2, name: 'Ran' }];
    return items.find(({ id }) => id === data.id);
  }
}