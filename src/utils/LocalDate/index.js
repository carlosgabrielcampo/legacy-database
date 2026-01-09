export default function () {
    return new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split(".")[0].replace(",", "")
};