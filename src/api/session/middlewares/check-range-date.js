

module.exports = (config, { strapi }) => {
    return (ctx, next) => {
        const { startDate, endDate } = ctx.params;
        try {
            const startDateObj = new Date(startDate);
            if (isNaN(startDateObj)) {
                throw new Error('startDate invalid');
            }
            const endDateObj = new Date(endDate);
            if (isNaN(endDateObj)) {
                throw new Error('endDate invalid');
            }
            if (startDateObj > endDateObj) {
                throw new Error('endDate must be great then startDate.')
            }
            next();
        } catch (err) {
            return ctx.badRequest(err.message, err);
        }
        
    };
};