const ThreadTableTestHelper = require("../../../../tests/ThreadTableTestHelper");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const container = require("../../container");
const pool = require("../../database/postgres/pool");
const createServer = require("../createServer");

describe('/threads endpoint', () => {
    afterAll(async () => {
        await pool.end();
    });

    afterEach(async () => {
        await ThreadTableTestHelper.cleanTable();
        await UsersTableTestHelper.cleanTable();
    });

    describe('when POST /threads', () => {
        it('should response 201 and persisted posted thread', async () => {
            await UsersTableTestHelper.addUser({ id: 'user-12345', username: 'dev' });

            const requestPayload = {
                title: 'new thread',
                body: 'this is a great game'
            };

            const server = await createServer(container);

            const response = await server.inject({
                method: 'POST',
                url: '/threads',
                payload: requestPayload,
                auth: {
                    strategy: 'authapi_jwt',
                    credentials: {
                        id: 'user-12345'
                    }
                }
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            
            expect(response.statusCode).toEqual(201);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data.addedThread).toBeDefined();

        });

        it('should response 400 when request payload not contain needed property', async () => {
            const requestPayload = {
                title: 'new thread',
            };

            const server = await createServer(container);

            const response = await server.inject({
                method: 'POST',
                url: '/threads',
                payload: requestPayload,
                auth: {
                    strategy: 'jwt',
                    credentials: {
                        id: 'user-12345'
                    }
                }
            });

            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(400);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('tidak dapat menambahkan thread baru karena properti yang dibutuhkan tidak ada');
        });

        it('should response 400 when request payload not meet data type specification', async () => {
            const requestPayload = {
                title: 'new thread',
                body: 123
            };

            const server = await createServer(container);

            const response = await server.inject({
                method: 'POST',
                url: '/threads',
                payload: requestPayload,
                auth: {
                    strategy: 'jwt',
                    credentials: {
                        id: 'user-12345'
                    }
                }
            });

            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(400);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('tidak dapat menambahkan thread baru karena tipe data tidak sesuai');
        });

        it('should response 401 when bearer token not provided', async () => {
            await UsersTableTestHelper.addUser({ id: 'user-12345', username: 'dev' });

            const requestPayload = {
                title: 'new thread',
                body: 'this is a great game'
            };

            const server = await createServer(container);

            const response = await server.inject({
                method: 'POST',
                url: '/threads',
                payload: requestPayload,
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            
            expect(response.statusCode).toEqual(401);
        });
    });
});