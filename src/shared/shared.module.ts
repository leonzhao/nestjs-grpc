import { Module } from '@nestjs/common'
import { sharedProviders } from './shared.providers'
@Module({
  providers: [...sharedProviders],
  exports: [...sharedProviders]
})
export class SharedModule {}