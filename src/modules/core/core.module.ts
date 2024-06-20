import { DynamicModule, Module } from '@nestjs/common';

import { ConfigService } from './services/config.service';

@Module({})
export class CoreModule {
    static forRoot(options: { config: RecordAny }): DynamicModule {
        return {
            module: CoreModule,
            global: true,
            providers: [
                {
                    provide: ConfigService,
                    useFactory: () => new ConfigService(options.config),
                },
            ],
            exports: [ConfigService],
        };
    }
}
