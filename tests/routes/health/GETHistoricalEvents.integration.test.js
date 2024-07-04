import request from 'supertest'
import { server, app } from '../../../src/index'


describe('GET /api/history/:ocurrence', () => {
    afterAll(() => {
        server.close()
    })

    /**
     * Primer Test
     */
    test('Solicitud de Ocurrence ac', async () => {
        const response = await request(app.callback()).get('/api/history/ac')
        expect(response.status).toBe(200)
        const dates = response.body.map(item => Number(item.date))
        for (let i = 1; i < dates.length; i++) {
            expect(dates[i]).toBeLessThanOrEqual(0) //Menor a 0
            expect(dates[i]).toBeGreaterThanOrEqual(dates[i - 1]) //Del más antiguo al más nuevo
        }
    })

    /**
     * Segundo Test
     */
    test('Solicitud de Ocurrence dc', async () => {
        const response = await request(app.callback()).get('/api/history/dc')
        expect(response.status).toBe(200)
        const dates = response.body.map(item => Number(item.date))
        for (let i = 1; i < dates.length; i++) {
            expect(dates[i]).toBeGreaterThanOrEqual(0) //Mayor a 0
            expect(dates[i]).toBeGreaterThanOrEqual(dates[i - 1]) //Del más antiguo al más nuevo
        }
    })

    /**
     * Tercer Test
     */
    test('Solicitud con :ocurrence es un string de largo = 2, con caracteres alfanuméricos o solo númericos', async () => {
        const response = await request(app.callback()).get('/api/history/22')
        expect(response.status).toBe(400)
        expect(response.body).toEqual({ message: 'Solo se aceptan caracteres no numéricos' })
    })

    /**
     * Cuarto Test
     */
    test('Solicitud con :ocurrence es un string de largo != 2', async () => {
        const response = await request(app.callback()).get('/api/history/acd')
        expect(response.status).toBe(400)
        expect(response.body).toEqual({ message: 'El input debe ser ac o dc' })
    })
})


