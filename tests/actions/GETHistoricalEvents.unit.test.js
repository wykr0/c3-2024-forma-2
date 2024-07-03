import historicalEvents from '../../../src/use_case/getHistoricalEvents'


describe('Test Get Historical Events', () => {
    /**
     * Primer Test
     */

    test('Solicitud de Ocurrence ac', async () => {
        const env = historicalEvents.getHistoricalEventsByOcurrence('ac')
        expect(env.status).toBe(200)
        expect(env.date).toBeGreaterThan(0)

    })

    /**
     * Segundo Test
     */

    test('Solicitud de Ocurrence dc', async () => {
        const env = historicalEvents.getHistoricalEventsByOcurrence('dc')
        expect(env.status).toBe(200)

    })

    /**
     * Tercer Test
     */
    test('Solicitud con :ocurrence es un string de largo = 2, con caracteres alfanuméricos o solo númericos', async () => {
        const env = historicalEvents.getHistoricalEventsByOcurrence(22)
        expect(env.status).toBe(400)


    })

    /**
     * Cuarto Test
     */
    test('Solicitud con :ocurrence es un string de largo != 2', async () => {
        const env = historicalEvents.getHistoricalEventsByOcurrence('acdc')
        expect(env.status).toBe(400)

    })
})


