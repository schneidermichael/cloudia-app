import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from './../src/app.module';
import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto';

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
    pactum.request.setBaseUrl('http://localhost:3001');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      eMail: 'test@test.com',
      pwd: '123456',
    };
    describe('Register', () => {
      it('Test Register Success', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody(dto)
          .expectStatus(201);
      });
      it('Test Register with no eMail provided', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({ pwd: dto.pwd })
          .expectStatus(400);
      });
      it('Test Register with no correct eMail provided', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({ eMail: 'wrong.mail', pwd: '123456' })
          .expectStatus(400);
      });
      it('Test Register with no pwd provided', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({ eMail: dto.eMail })
          .expectStatus(400);
      });
      it('Test Register with no pwd and eMail provided', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({})
          .expectStatus(400);
      });
      it('Test Register with credentials taken', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody(dto)
          .expectStatus(403);
      });
    });
    describe('Signin', () => {
      it('Test Signin Success', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('access_token', 'access_token');
      });
      it('Test Signin with no eMail provided', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ pwd: dto.pwd })
          .expectStatus(400);
      });
      it('Test Signin with no correct eMail provided', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ eMail: 'wrong.mail', pwd: '123456' })
          .expectStatus(400);
      });
      it('Test Signin with no pwd provided', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ eMail: dto.eMail })
          .expectStatus(400);
      });
      it('Test Signin with no pwd and eMail provided', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({})
          .expectStatus(400);
      });
    });
  });

  describe('Users', () => {
    describe('GetProfil', () => {
      it('Get Users Profil Success (correct token)', () => {
        return pactum
          .spec()
          .get('/users/profil')
          .withHeaders({ Authorization: 'Bearer $S{access_token}' })
          .expectStatus(200);
      });
      it('Get Users Profil Unauthorized (wrong token)', () => {
        return pactum
          .spec()
          .get('/users/profil')
          .withHeaders({ Authorization: 'Bearer wrong_token' })
          .expectStatus(401);
      });
      it('Get Users Profil Unauthorized (no token)', () => {
        return pactum.spec().get('/users/profil').expectStatus(401);
      });
    });

    describe('EditProfil', () => {});

    describe('DeleteProfil', () => {});
  });
});
