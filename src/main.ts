import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Eureka from 'eureka-js-client' 
import { grpcClientOptions } from './grpc-hero.options';
// const Eureka = require('eureka-js-client').Eureka;

const serverPort  = 5001 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(grpcClientOptions);
  await app.startAllMicroservicesAsync();

  const eurekaClient = new Eureka({
    instance: {
      // instanceId: 'nestjsService',
      app: 'nestjs-demo-grpc',
      hostName: 'leonzhao',
      ipAddr: '192.168.0.153',
      statusPageUrl: `http://192.168.0.153:${serverPort}/info`,
      healthCheckUrl: `http://192.168.0.153:${serverPort}/health`,
      port: {
        '$': serverPort,
        '@enabled': true
      },
      vipAddress: 'test.nestjs.org',
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn'
      }
    },
    eureka: {
      // eureka server host / port
      fetchRegistry: false,
      host: '192.168.0.47',
      port: 8000,
      servicePath: '/eureka/apps/'
      // serviceUrl: 'http://192.168.0.47:8000/eureka/apps/'
    },
  }) 
  // eurekaClient.start()
}
bootstrap();
