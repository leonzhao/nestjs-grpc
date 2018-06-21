import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import Eureka from 'eureka-js-client' 
// const Eureka = require('eureka-js-client').Eureka;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Users example')
    .setDescription('The users API description')
    .setVersion('1.0.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1', app, document);

  const eurekaClient = new Eureka({
    instance: {
      instanceId: 'nestjsService',
      app: 'nestjsService',
      hostName: 'localhost',
      ipAddr: '192.168.0.153',
      statusPageUrl: 'http://192.168.0.153:4000/info',
      healthCheckUrl: 'http://192.168.0.153:4000/health',
      port: {
        '$': 4000,
        '@enabled': true
      },
      vipAddress: 'nestjsService',
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

  eurekaClient.start((data) => console.log(data))
  await app.listen(4000);
}
bootstrap();
