/* eslint-disable arrow-body-style */
module.exports = (apiResult) => {
    const formated = {
        cep: apiResult.cep.split("-").join(""),
        publicplace: apiResult.logradouro,
        complement: apiResult.complemento,
        neighborhood: apiResult.bairro,
        location: apiResult.localidade,
        uf: apiResult.uf,
        ibge: apiResult.ibge,
        gia: apiResult.gia,
        ddd: apiResult.ddd,
        siafi: apiResult.siafi,
    };

    return formated;
};
