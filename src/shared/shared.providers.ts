import { SHARED_VALUE_PROVIDER } from '../constants'
import { IpcNetConnectOpts } from 'net';

interface ICommon {
  getEnv()
}
export class SharedClass implements ICommon {
  getEnv() {
    return 'shared class'
  }
}

class SharedClassDev implements ICommon {
  getEnv() {
    return `${SharedClassDev.name} ${process.env.NODE_ENV}` 
  }
}

class SharedClassProd implements ICommon {
  private env: string = 'prod'

  getEnv() {
    return `${SharedClassProd.name} ${process.env.NODE_ENV}` 
  }

}

export const sharedProviders = [
  {
    provide: SHARED_VALUE_PROVIDER,
    useValue: 'shared value provider using factory'
  },
  {
    provide: SharedClass, 
    useClass: process.env.NODE_ENV === 'dev' ? SharedClassDev : SharedClassProd 
  }
]