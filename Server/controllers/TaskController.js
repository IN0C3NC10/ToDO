const { Op } = require('sequelize/dist');
const models = require('../models/');
let task = models.Tasks;
const {
    startOfDay,
    endOfDay,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear
} = require('date-fns');
const current = new Date();

class TaskController {
    //========== CREATE ==========//
    async create(req, res) {
        // persiste os dados, se der certo vai ao "then" e errado vai para o "catch"
        await task.create({
            macaddress: req.body.macaddress,
            category: req.body.category,
            title: req.body.title,
            description: req.body.description,
            when: req.body.when,
            done: req.body.done
        }).then(response => {
            return res.status(200).json(response);
        }).catch(error => {
            return res.status(500).json(error);
        });
    }

    //========== UPDATE ==========//
    async update(req, res) {
        /* busca o registro com base no "id"
            insere os dados se tiverem, do contrário mantem os antigos
            salva as modificações dos dados e  se der certo vai ao "then" e errado vai para o "catch"
        */
        let Task = await task.findOne({
            where: {
                id: req.params.id
            }
        });
        Task.macaddress = req.body.macaddress ? req.body.macaddress : Task._previousDataValues.macaddress;
        Task.category = req.body.category ? req.body.category : Task._previousDataValues.category;
        Task.title = req.body.title ? req.body.title : Task._previousDataValues.title;
        Task.description = req.body.description ? req.body.description : Task._previousDataValues.description;
        Task.when = req.body.when ? req.body.when : Task._previousDataValues.when;
        Task.done = req.body.done ? req.body.done : Task._previousDataValues.done;
        Task.updatedAt = new Date();
        Task.save().then(response => {
            return res.status(200).json(response);
        }).catch(error => {
            return res.status(500).json(error);
        });
    }

    //========== ALL ==========//
    async all(req, res) {
        // recupera todos os dados e dando certo vai ao "then" e errado vai para o "catch"
        await task.findAll({
            where: {
                macaddress: req.body.macaddress 
            },
            order: [['when','ASC']]
        }).then(response => {
            return res.status(200).json(response);
        }).catch(error => {
            return res.status(500).json(error);
        });
    }

    //========== SHOW ==========//
    async show(req, res) {
        // recupera algum dado especifico e dando certo vai ao "then" e errado vai para o "catch"
        await task.findOne({
            where: {
                id: req.params.id
            }
        }).then(response => {
            if(response)
                return res.status(200).json(response);
            else
                return res.status(404).json({error:'Tarefa não encontrada!'});
        }).catch(error => {
            return res.status(500).json(error);
        });
    }

    //========== DELETE ==========//
    async delete(req, res) {
        // deleta algum dado especifico e dando certo vai ao "then" e errado vai para o "catch"
        await task.destroy({
            where: {
                id: req.params.id
            }
        }).then(response => {
            return res.status(200).json({success:'Tarefa deletada com sucesso!'});
        }).catch(error => {
            return res.status(500).json(error);
        });
    }

    //========== UPDATE STATUS ==========//
    async done(req, res) {
        // altera o status de algum dado especifico, dando certo vai ao "then" e errado vai para o "catch"
        await task.update({
            done: req.params.done,
            updatedAt: new Date()
        },
        {
            where: {
                id: req.params.id
            }
        }).then(response => {
            return res.status(200).json({success: 'Item alterado com sucesso!'});
        }).catch(error => {
            return res.status(500).json(error);
        });
    }

    //========== LATE ==========//
    async late(req, res) {
        // recupera todas as tarefas atrasadas e dando certo vai ao "then" e errado vai para o "catch"
        await task.findAll({
            where: {
                macaddress: req.body.macaddress,
                when: { [Op.lt]:current }
            },
            order: [['when','ASC']]
        }).then(response => {
            return res.status(200).json(response);
        }).catch(error => {
            return res.status(500).json(error);
        });
    }

    //========== TODAY ==========//
    async today(req, res) {
        // recupera todas as tarefas do dia e dando certo vai ao "then" e errado vai para o "catch"
        await task.findAll({
            where: {
                macaddress: req.body.macaddress,
                when: { [Op.between]:[startOfDay(current),endOfDay(current)] }
            },
            order: [['when','ASC']]
        }).then(response => {
            return res.status(200).json(response);
        }).catch(error => {
            return res.status(500).json(error);
        });
    }

    //========== WEEK ==========//
    async week(req, res) {
        // recupera todas as tarefas da semana e dando certo vai ao "then" e errado vai para o "catch"
        await task.findAll({
            where: {
                macaddress: req.body.macaddress,
                when: { [Op.between]:[startOfWeek(current),endOfWeek(current)] }
            },
            order: [['when','ASC']]
        }).then(response => {
            return res.status(200).json(response);
        }).catch(error => {
            return res.status(500).json(error);
        });
    }

    //========== MONTH ==========//
    async month(req, res) {
        // recupera todas as tarefas do mês e dando certo vai ao "then" e errado vai para o "catch"
        await task.findAll({
            where: {
                macaddress: req.body.macaddress,
                when: { [Op.between]:[startOfMonth(current),endOfMonth(current)] }
            },
            order: [['when','ASC']]
        }).then(response => {
            return res.status(200).json(response);
        }).catch(error => {
            return res.status(500).json(error);
        });
    }

    //========== YEAR ==========//
    async year(req, res) {
        // recupera todas as tarefas do ano e dando certo vai ao "then" e errado vai para o "catch"
        await task.findAll({
            where: {
                macaddress: req.body.macaddress,
                when: { [Op.between]:[startOfYear(current),endOfYear(current)] }
            },
            order: [['when','ASC']]
        }).then(response => {
            return res.status(200).json(response);
        }).catch(error => {
            return res.status(500).json(error);
        });
    }
}

module.exports = new TaskController();