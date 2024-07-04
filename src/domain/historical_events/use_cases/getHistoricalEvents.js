import historicalEventsRepository from '../repository/historicalEventsRepository'

exports.getHistoricalEventsByOcurrence = (ctx) => {
    const ocurrence = ctx.params.ocurrence

    if (!isNaN(parseFloat(ocurrence))) {
        ctx.status = 400
        ctx.body = { message: 'Solo se aceptan caracteres no numéricos' }
        return ctx

    } else if (ocurrence.length !== 2) {
        ctx.status = 400
        ctx.body = { message: 'El input debe ser ac o dc' }
        return ctx
    }

    ctx.body = historicalEventsRepository.getHistoricalEvents(ocurrence)
    ctx.status = 200
    return ctx;
}