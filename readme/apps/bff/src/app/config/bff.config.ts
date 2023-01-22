import { HttpModuleOptions } from '@nestjs/axios';
import { ConfigService, registerAs } from '@nestjs/config';

export const microserviceUsersOptions = registerAs('users', () => ({
  name: process.env.USER_SERVICE_NAME,
  host: process.env.USER_SERVICE_HOST,
  port: parseInt(process.env.USER_SERVICE_PORT, 10),
}));

export const microserviceBlogOptions = registerAs('blog', () => ({
  name: process.env.BLOG_SERVICE_NAME,
  host: process.env.BLOG_SERVICE_HOST,
  port: parseInt(process.env.BLOG_SERVICE_PORT, 10),
}));

export const HttpOptions = registerAs('axios', () => ({
  timeout: parseInt(process.env.HTTP_TIMEOUT, 10),
  maxRedirects: parseInt(process.env.HTTP_MAX_REDIRECTS, 10),
}));

export async function getHttpOptions(configService: ConfigService): Promise<HttpModuleOptions> {
  return {
    timeout: configService.get<number>('axios.timeout'),
    maxRedirects: configService.get<number>('axios.maxRedirects'),
  }
}
