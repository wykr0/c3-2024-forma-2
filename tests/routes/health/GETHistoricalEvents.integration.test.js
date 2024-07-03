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
        response.body.forEach(item => {
            expect(Number(item.date)).toBeLessThan(0)
        })
        
    })

    /**
     * Segundo Test
     */
    test('Solicitud de Ocurrence dc', async () => {
        const response = await request(app.callback()).get('/api/history/dc')
        expect(response.status).toBe(200)
        response.body.forEach(item => {
            expect(Number(item.date)).toBeGreaterThan(0)
        })
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
        const response = await request(app.callback()).get('/api/history/acdc')
        expect(response.status).toBe(400)
        expect(response.body).toEqual({ message: 'El input debe ser ac o dc' })
    })
})


