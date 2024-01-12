const CustomError = require('./CustomError');
const sequelize = require('../Config/Connection');



/*
* IDGenerator method provides single source of DB Pl/sql proc call to generate ID for a given idType
* PL/SQL function  "udfgetsystemid"
*/
// const IDGenerator = async (idType) => {
//     const [result] = await sequelize.query(`EXEC uspGetSystemID '${idType}'`);
//     if (result && result.length > 0) {
//         return result[0][''];
//     }
//     else {
//         throw new CustomError('Error while generating stored procedure');
//     }
// }
const IDGenerator = async (idType) => {
    const [result] = await sequelize.query(`SELECT public.udfgetsystemid('${idType}')`);
    if (result && result.length > 0) {
        const { udfgetsystemid } = result[0];
        return udfgetsystemid
    }
    else {
        throw new CustomError('Error while generating stored procedure');
    }
}

//  IDGenerator('BENRULE');

module.exports = {
    IDGenerator
}