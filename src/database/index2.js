
import { createInterface } from 'readline'
import fs, { createReadStream } from 'fs'
import JSONStream from "JSONStream";
import './index.js';
import LariLogs from '../models/Logs/lari_logs.js';

const proposals = {}
const clientsConsigs = {}
const proposalsToExclude = {}
const currentYear = new Date().getFullYear();
const oneYear = 1000 * 60 * 60 * 24 * 365.25
const deadlineStartDate = new Date().setFullYear(currentYear - 65);
const deadlineFinishDate = new Date().setFullYear(currentYear - 60);

class DatabaseReadService {
    contracts = (line) => {
        const [benefit_number,contract_identifier,active,paid_installments,total_installments,bank_code,tax,installment_value,delayed_installments,debit_balance,politic_status_blocked,created_at,updated_at,installments_initial_date,record_contract_date,cpf,released,contract_number,origin] = line.split(',')
        if(`${cpf}${installment_value}`.match(/\d+/gu)){
            const id = `${cpf}${installment_value}`.match(/\d+/gu).join('')
            if(proposals?.[id]){
                proposals[id] += `${bank_code};`
            }
        }
    }
    cards = (line) => {
        const [card_identifier,cpf,benefit_number,account_number,tax_monthly_rate,insurance,limit,limit_available,installment_value,margin,max_withdraw_value,min_withdraw_value,margin_aggregation_released,created_at,updated_at,blocked,card_type,card_contract_number,bank_code,record_card_date,origin] = line.split(',')
        const card = {card_identifier,cpf,benefit_number,account_number,tax_monthly_rate,insurance,limit,limit_available,installment_value,margin,max_withdraw_value,min_withdraw_value,margin_aggregation_released,created_at,updated_at,blocked,card_type}
        if(proposals[`${cpf}${benefit_number}`] && !proposals[`${cpf}${benefit_number}`]?.[card_identifier]){
            proposals[`${cpf}${benefit_number}`][card_identifier] = {...card}
        }
    }
    adds = (line) => {
        const [cpf,street,neighborhood,number,complement,cep,city,uf,created_at,updated_at] = line.split(',')
        if(proposals[cpf]){
            proposals[cpf]["ESTADO"] = uf
        }
    }
    clients = (line) => {
        const [cpf,main_whats,name,birth_date,death_status,mother_name,email,created_at,updated_at,converted] = line.split(',')
        if(proposals[cpf]) {
            proposals[cpf] = { ...proposals[cpf],
                "CPF": cpf,
                "PRIMEIRO NOME": `${name}`.split(' ')?.[0],
                "CLIENTE NOME": name,
                "IDADE": Math.floor((new Date() - new Date(birth_date))/(1000*60*60*24*364.5)),
            }
        }
    }
    consigs = (line) => {
        const [benefit_number,cpf,convenio,type_benefit,base_income,margin,card_margin,politic_status_blocked,created_at,updated_at,dib,card_benefit_margin,base_calc,orgao] = line.split(',')
        if(proposals[cpf]) clientsConsigs[`${cpf}${benefit_number}`] = { ...proposals[cpf], "Nº BENEFÍCIO": benefit_number, "ESPÉCIE": type_benefit }
    }
    phones = (line) => {
        const [id,cpf,phone,ddd,ddi,origin,is_whatsapp,do_not_disturb,owner,useful,created_at,updated_at,score] = line.split(',')
        if(proposals[cpf]) {
            if(proposals[cpf]["SCORE"] <= score && phone[0] === '9'){
                let update = false
                if(proposals[cpf]["SCORE"] < score) update = true
                else if(!proposals[cpf]["FONTE TELEFONE"].includes('Lemit_1') && !proposals[cpf]["FONTE TELEFONE"].includes('Lemit_2')) update = true
                if(update === true){
                    proposals[cpf]["SCORE"] = score
                    proposals[cpf]["FONTE TELEFONE"] = origin
                    proposals[cpf]["TELEFONE"] = `${ddd}${phone}`
                }
            }
        }
    }
}
class PhonesHandlers {
    phoneCreate = (phones, phoneArray) => {
        return phones && phoneArray.map(({phone, score}) => score = Object.values(phones)?.filter((ele) => ele === phone)?.length )
    }
    phoneFilter = (entries) => {
        const { phoneCreate } = new PhonesHandlers()
        
        entries.map(([cpf, data]) => {
            const e = data.phones
            let phoneArray = [{origin: 'Lemit_1', phone: e?.Lemit_1, score: 0}, {origin: 'Lemit_2', phone: e?.Lemit_2, score: 0}]
            let array = phoneCreate(e, phoneArray)
            if(array.every((e) => !e)) {
                phoneArray = Object.entries(e).filter(([key, value]) => value.length >= 11 && key.match(/Lemit_Fixo\w+/g))
                .sort((a, b) => a[0].at(-1) - b[0].at(-1))
                .map((e) => {return { origin: e[0], phone: e[1], score: 0 }})
                array = phoneCreate(e, phoneArray)
            }
            if(array.indexOf(Math.max(...array)) >= 0){
                proposals[cpf] = `${Object.values(data).join(';')};${phoneArray[array.indexOf(Math.max(...array))].phone};${phoneArray[array.indexOf(Math.max(...array))].origin}`
            } else {
                proposals[cpf] = `${Object.values(data).join(';')}`
            }
        })
    }
    phoneCSVlist = (line) => {
        const [cpf] = line.split(',')
        proposals[cpf] = {
            "CPF": cpf,
            "TELEFONE": "",
            "SCORE": 0,
            "FONTE TELEFONE": "",
            "PRIMEIRO NOME": "",
            "CLIENTE NOME": "",
            "Nº BENEFÍCIO": "",
            "ESPÉCIE": "",
            "ESTADO": "",
            "IDADE": "",
        }
    }
}
class FileHandlers {
    searchSpreadsheet = async ({file, func}) => {
        console.time(file)
        await new Promise((res) => {
            createInterface({input: createReadStream(file), crlfDelay: Infinity}).on('line', (line) => func(line)).on('close', () => res())
        })
        // countContractLenght(proposals)
        console.timeEnd(file)
    }
    searchJSON = async({file, func, name}) => {
        await new Promise((res) => {
    
        console.time(name)
        const fileStream =  fs.createReadStream(file, { encoding: 'utf8' } );
        const parser = fileStream.pipe(JSONStream.parse([{ emitKey: true }]));
        parser.on('data', async (jsonObject) => {
            func(jsonObject)
        });
        parser.on('end', () => res())
        })
    
        console.timeEnd(name)
    }
    writeFile = (values, fileName = 'comparative.csv') => {
        for (let index = 0; index < values.length; index++) {
            const element = values[index];
            fs.appendFileSync(fileName, `${element}\n`)
        }
    }
    spreadSheetList = (line) => {
        const cpf = line
        proposalsToExclude[cpf * 1] = true
    }
    spreadsheetReader = (line) => {
        if(!proposalsToExclude[line.value.cpf * 1] && line.value.installment_value > 0 && line.value.installment_value < 30 ) {
            proposals[line.value.cpf * 1] = {...line.value, phones: {}}
        }
    }
    cardCpfList = (line) => {
        const [card_identifier,cpf,benefit_number,account_number,tax_monthly_rate,insurance,limit,limit_available,installment_value,margin,max_withdraw_value,min_withdraw_value,margin_aggregation_released,created_at,updated_at,blocked,card_type,card_contract_number,bank_code,record_card_date,origin] = line.split(',')
        const card = {card_identifier,cpf,benefit_number,account_number,tax_monthly_rate,insurance,limit,limit_available,installment_value,margin,max_withdraw_value,min_withdraw_value,margin_aggregation_released,created_at,updated_at,blocked,card_type}
        if(account_number === benefit_number ){
            if(!proposals[`${cpf}${benefit_number}`]) proposals[`${cpf}${benefit_number}`] = {[card_identifier]: {...card}}
            if(!proposals[`${cpf}${benefit_number}`]?.[card_identifier]) proposals[`${cpf}${benefit_number}`][card_identifier] = {...card}
        }
    }
    cpfList = (line) => {
        const [cpf] = line.split(';')
        proposals[cpf] = {cpf}
    }
    findByValue = (line) => {
        const [cpf, installment_value] = line.split(';')
        if(`${cpf}${installment_value}`.match(/\d+/gu)){
            const id = `${cpf}${installment_value}`.match(/\d+/gu).join('') 
            proposals[id] = `${cpf};${installment_value};`
        }
    }
    logsFunction = (line) => {
        const data = line.split(',')
        data.map((e, i) => { try {
            if(JSON.parse(e) && JSON.parse(e) !== 'Invalid date'){
                data[i] = JSON.parse(e) 
            }
        } catch (error) { } })
        let [ id, cpf, telefone, nome, dt_nascimento, idade, uf, nr_beneficio_1, tipo_beneficio_1, bmg_valor_parcela_1, bmg_valor_maximo_saque_1, bmg_valor_parcela_2, bmg_valor_maximo_saque_2, nr_beneficio_2, tipo_beneficio_2, bmg_valor_parcela_3, bmg_valor_maximo_saque_3, bmg_valor_parcela_4, bmg_valor_maximo_saque_4, bmg_total_parcela, bmg_total_valor_maximo_saque, canal, canal_loja, canal_agente, canal_qualificacao, canal_obs, canal_data, whatsapp_dt_entrada, crm_dt_entrada, crm_dt_sem_etapa, crm_dt_simulacao, crm_dt_negociacao, crm_dt_digitar, crm_dt_digitado, crm_dt_ag_pagamento, crm_dt_pago, crm_motivo_perda_ganho, crm_dt_perda_ganho, live_qt_de_propostas_esteira, live_banco, valor_liberado_proposta, live_valor_comissao, live_tipo_produto, live_esteira, live_dt_esteira, created_at, updated_at ] = data
        const lari_log = { id, cpf, telefone: `55${telefone}`, nome, dt_nascimento, idade, uf, nr_beneficio_1, tipo_beneficio_1, bmg_valor_parcela_1, bmg_valor_maximo_saque_1, bmg_valor_parcela_2, bmg_valor_maximo_saque_2, nr_beneficio_2, tipo_beneficio_2, bmg_valor_parcela_3, bmg_valor_maximo_saque_3, bmg_valor_parcela_4, bmg_valor_maximo_saque_4, bmg_total_parcela, bmg_total_valor_maximo_saque, canal, canal_loja, canal_agente, canal_qualificacao, canal_obs, canal_data, whatsapp_dt_entrada, crm_dt_entrada, crm_dt_sem_etapa, crm_dt_simulacao, crm_dt_negociacao, crm_dt_digitar, crm_dt_digitado, crm_dt_ag_pagamento, crm_dt_pago, crm_motivo_perda_ganho, crm_dt_perda_ganho, live_qt_de_propostas_esteira, live_banco, valor_liberado_proposta, live_valor_comissao, live_tipo_produto, live_esteira, live_dt_esteira, created_at, updated_at }
        Object.entries(lari_log).map(([key, value], i) => {
            if( value === 'NULL' || !value || value === "Invalid date" ){ 
                delete lari_log[key] 
            }
        })

        proposals[lari_log.id] = lari_log
    }
}
export class DatabaseSearch {
    manualSearch = async() => {
        const { searchSpreadsheet, writeFile } = new FileHandlers()
        const { phoneCSVlist } = new PhonesHandlers()
        const {consigs, clients, adds, phones} = new DatabaseReadService()
        const filesFunctions = [
            {file: 'src/database/CPF para telefone[1].csv', func: phoneCSVlist, name: 'phonesCSVList'},
            {file: 'src/database/clients.csv', func: clients, name: 'clients'},
            {file: 'src/database/addresses.csv', func: adds, name: 'add'},
            {file: 'src/database/phones.txt', func: phones, name: 'phones'},
            {file: 'src/database/consigs.csv', func: consigs, name: 'consig'}, 
        ]
        for (let index = 0; index < filesFunctions.length; index++) await searchSpreadsheet({...filesFunctions[index]})
        writeFile(Object.values(clientsConsigs).map((e) => Object.values(e)))
    }
    phonesSearch = async() => {
        const { searchSpreadsheet, writeFile } = new FileHandlers()
        const { phones } = new DatabaseReadService()
        const { phoneCSVlist } = new PhonesHandlers()
        await searchSpreadsheet({file: 'src/database/CPF para telefone[1].csv', func: phoneCSVlist, name: 'phonesCSVList'})
        await searchSpreadsheet({file: 'src/database/phones.txt', func: phones, name: 'phones'})
        console.log(Object.entries(proposals).map((e) => Object.values(e)))
        writeFile(Object.values(proposals).map((e) => Object.values(e)))
    }
    clientsreturned = async() => {
        const { phones } = new DatabaseReadService()
        const { phoneFilter } = new PhonesHandlers()
        await searchSpreadsheet({file: 'cpflist.csv', func: spreadSheetList, name: ''})
        await searchJSON({file: 'acda08136a.json', func:spreadsheetReader, name: ''})
        await searchSpreadsheet({file: 'src/database/phones.txt', func: phones, name: 'phones'})
        phoneFilter(Object.entries(proposals))
        writeFile()
    }
    findingClientsByPhoneNmb = async() => {
        const { searchSpreadsheet, writeFile } = new FileHandlers()
        const { phones } = new DatabaseReadService()
        const { phoneCSVlist } = new PhonesHandlers()
        await searchSpreadsheet({file: 'cpflist.csv', func: phoneCSVlist, name: 'phonesCSVList'})
        await searchSpreadsheet({file: 'src/database/phones.txt', func: phones, name: 'phonesCSVList'})
        writeFile(Object.values(proposals))
    }
    findingNBByCPF = async() => {
        const { consigs } = new DatabaseReadService()
        const { cpfList, searchSpreadsheet, writeFile } = new FileHandlers()
        await searchSpreadsheet({file: 'src/database/CRM_21.10_NB.csv', func: cpfList})
        await searchSpreadsheet({file: 'src/database/consigs.csv', func: consigs})
        writeFile(Object.values(proposals).map((e) => Object.values(e).join(';')), 'CRM_21.10_NB')
    }
    deleteDuplicatedCards = async() => {
        const {searchSpreadsheet, cardCpfList} = new FileHandlers()
        const {cards} = new DatabaseReadService()
        const filesFunctions = [
            {file: 'src/database/cards.csv', func: cardCpfList, name: 'cpfList'}, 
            {file: 'src/database/cards.csv', func: cards, name: 'cards'}, 
        ]
        for (let index = 0; index < filesFunctions.length; index++) await searchSpreadsheet({...filesFunctions[index]})        
        const cardsToUpdate = Object.values(proposals).filter((e) => Object.values(e).length > 1)
        for (let index = 0; index < cardsToUpdate.length; index++) {
            const [database, origin] = Object.values(cardsToUpdate[index])
            const request = await (await fetch(`http://localhost:3002/api/v1/card/${database.benefit_number}${database.benefit_number}`,{
                "method": "DELETE",
                "headers": {authorization: 'Bearer 8Ebdew92OnBMkEqdmHpo3Xsr0JSQ878i'}
            })).json()
            console.log({ request, index, total: cardsToUpdate.length, lenght: Object.values(cardsToUpdate[index]).length })
        }
            // writeFile()
    }
    findingBankCodeByCPF = async() => {
        const { contracts } = new DatabaseReadService()
        const { findByValue, searchSpreadsheet, writeFile } = new FileHandlers()
        await searchSpreadsheet({file: 'teste 2.csv', func: findByValue})
        await searchSpreadsheet({file: 'src/database/contracts.csv', func: contracts})
        writeFile(Object.values(proposals).map((e) => e))
    }
}

// new DatabaseSearch().deleteDuplicatedCards()
// new DatabaseSearch().findingClientsByPhoneNmb()
// new DatabaseSearch().findingNBByCPF()
// new DatabaseSearch().phonesSearch()
// new DatabaseSearch().findingBankCodeByCPF()
// new DatabaseSearch().manualSearch()
