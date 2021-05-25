import app from "./app";

app.listen(3333, (err) => {
    if (err) console.log("Houve um erro ao iniciar o servidor");
    else console.log("Servidor iniciado com sucesso na porta 3333");
});
