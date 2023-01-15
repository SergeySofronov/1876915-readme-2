import { ConfigService, registerAs } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { NotifyQueue } from '@readme/shared-types';

export const rabbitMqOptions = registerAs('rmq', () => ({
  user: process.env.RABBIT_USER,
  password: process.env.RABBIT_PASSWORD,
  host: process.env.RABBIT_HOST,
  port: process.env.RABBIT_PORT,
}));

export function getRabbitMqConfig(configService: ConfigService, queue: NotifyQueue): RmqOptions {
  const user = configService.get<string>('rmq.user');
  const password = configService.get<string>('rmq.password');
  const host = configService.get<string>('rmq.host');
  const port = configService.get<string>('rmq.port');
  const url = `amqp://${user}:${password}@${host}:${port}`;

  return {
    transport: Transport.RMQ,
    options: {
      urls: [url],
      queue,
      persistent: true,
      noAck: true,
      queueOptions: {
        durable: true,
      }
    }
  }
}
