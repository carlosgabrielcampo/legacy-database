import Sequelize, { Model, UUIDV4 } from "sequelize";

export default class LariLogs extends Model {
  static init(sequelize) {
    super.init({
        "id": {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        'cpf': {
            type: Sequelize.BIGINT,
        },
        'telefone': {
            type: Sequelize.BIGINT,
        },
        'nome': {
            type: Sequelize.STRING,
        },
        'dt_nascimento': {
            type: Sequelize.DATEONLY,
        },
        'idade': {
            type: Sequelize.INTEGER,
        },
        'uf': {
            type: Sequelize.STRING,
        },
        'nr_beneficio_1': {
            type: Sequelize.BIGINT,
        },
        'tipo_beneficio_1': {
            type: Sequelize.INTEGER,
        },
        'bmg_valor_parcela_1': {
            type: Sequelize.DOUBLE,
            defaultValue: 0,
        },
        'bmg_valor_maximo_saque_1': {
            type: Sequelize.DOUBLE,
            defaultValue: 0,
        },
        'bmg_valor_parcela_2': {
            type: Sequelize.DOUBLE,
            defaultValue: 0,
        },        
        'bmg_valor_maximo_saque_2': {
            type: Sequelize.DOUBLE,
            defaultValue: 0,
        },
        'nr_beneficio_2': {
            type: Sequelize.BIGINT,
        },
        'tipo_beneficio_2': {
            type: Sequelize.INTEGER,
        },
        'bmg_valor_parcela_3': {
            type: Sequelize.DOUBLE,
            defaultValue: 0,
        },
        'bmg_valor_maximo_saque_3': {
            type: Sequelize.DOUBLE,
            defaultValue: 0,
        },
        'bmg_valor_parcela_4': {
            type: Sequelize.DOUBLE,
            defaultValue: 0,
        },        
        'bmg_valor_maximo_saque_4': {
            type: Sequelize.DOUBLE,
            defaultValue: 0,
        },
        "bmg_total_parcela": {
            type: Sequelize.DOUBLE,
            defaultValue: 0,
        },        
        "bmg_total_valor_maximo_saque": {
            type: Sequelize.DOUBLE,
            defaultValue: 0,
        },
        'canal': {
            type: Sequelize.STRING,
        },
        'canal_loja': {
            type: Sequelize.STRING,
        },
        'canal_agente': {
            type: Sequelize.STRING,
        },
        'canal_qualificacao': {
            type: Sequelize.STRING,
        },
        'canal_obs': {
            type: Sequelize.STRING,
        },
        'canal_data': {
            type: Sequelize.DATE,
        },
        "whatsapp_dt_entrada": {
            type: Sequelize.DATE,
        },
        "crm_dt_entrada": {
            type: Sequelize.DATE,
        },
        "crm_dt_sem_etapa": {
            type: Sequelize.DATE,
        },
        "crm_dt_simulacao": {
            type: Sequelize.DATE,
        },
        "crm_dt_negociacao": {
            type: Sequelize.DATE,
        },
        "crm_dt_digitar": {
            type: Sequelize.DATE,
        },
        "crm_dt_digitado": {
            type: Sequelize.DATE,
        },
        "crm_dt_ag_pagamento": {
            type: Sequelize.DATE,
        },
        "crm_dt_pago": {
            type: Sequelize.DATE,
        },
        "crm_motivo_perda_ganho": {
            type: Sequelize.STRING,
        },
        "crm_dt_perda_ganho": {
            type: Sequelize.DATE,
        },
        "live_qt_de_propostas_esteira": {
            type: Sequelize.INTEGER,
        },
        "live_banco": {
            type: Sequelize.STRING,
        },
        "valor_liberado_proposta": {
            type: Sequelize.DOUBLE,
            defaultValue: 0,
        },
        "live_valor_comissao": {
            type: Sequelize.DOUBLE,
            defaultValue: 0,
        },
        "live_tipo_produto": {
            type: Sequelize.STRING,
        },
        "live_esteira": {
            type: Sequelize.STRING,
        },
        "live_dt_esteira": {
            type: Sequelize.DATE,
        },
    },{
      sequelize,
      tableName: 'lari_log',
    });
    return this;
  }
}