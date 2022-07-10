import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from './../src/app.module';
import * as pactum from 'pactum';
import { AuthenticationDto } from '../src/authentication/dto/authentication.dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3001);

    prisma = app.get(PrismaService);
    await prisma.cleanDb;
    pactum.request.setBaseUrl('http://localhost:3000');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthenticationDto = {
      email: 'test@test.com',
      password: '123456',
    };
    describe('Register', () => {
      it('Test Register Success', () => {
        return pactum
          .spec()
          .post('/authentication/register')
          .withBody(dto)
          .expectStatus(201);
      });
      it('Test Register with no email provided', () => {
        return pactum
          .spec()
          .post('/authentication/register')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('Test Register with no correct email provided', () => {
        return pactum
          .spec()
          .post('/authentication/register')
          .withBody({ email: 'wrong.mail', password: '123456' })
          .expectStatus(400);
      });
      it('Test Register with no pwd provided', () => {
        return pactum
          .spec()
          .post('/authentication/register')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('Test Register with no pwd and eMail provided', () => {
        return pactum
          .spec()
          .post('/authentication/register')
          .withBody({})
          .expectStatus(400);
      });
      it('Test Register with credentials taken', () => {
        return pactum
          .spec()
          .post('/authentication/register')
          .withBody(dto)
          .expectStatus(403);
      });
    });
    describe('Login', () => {
      it('Test Login Success', () => {
        return pactum
          .spec()
          .post('/authentication/login')
          .withBody(dto)
          .expectStatus(200)
          .stores('access_token', 'access_token');
      });
      it('Test Login with no email provided', () => {
        return pactum
          .spec()
          .post('/authentication/login')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('Test Login with no correct email provided', () => {
        return pactum
          .spec()
          .post('/authentication/login')
          .withBody({ email: 'wrong.mail', password: '123456' })
          .expectStatus(400);
      });
      it('Test Login with no password provided', () => {
        return pactum
          .spec()
          .post('/authentication/login')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('Test Login with no pwd and email provided', () => {
        return pactum
          .spec()
          .post('/authentication/login')
          .withBody({})
          .expectStatus(400);
      });
    });
  });

  describe('User', () => {
    describe('GetProfile', () => {
      it('Get User Profile Success (correct token)', () => {
        return pactum
          .spec()
          .get('/user/profile')
          .withHeaders({ Authorization: 'Bearer $S{access_token}' })
          .expectStatus(200);
      });
      it('Get User Profile Unauthorized (wrong token)', () => {
        return pactum
          .spec()
          .get('/user/profile')
          .withHeaders({ Authorization: 'Bearer wrong_token' })
          .expectStatus(401);
      });
      it('Get User Profile Unauthorized (no token)', () => {
        return pactum.spec().get('/user/profile').expectStatus(401);
      });
    });
  });
});
