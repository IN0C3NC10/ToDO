const models = require('../models/');
let task = models.Tasks;

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
}

module.exports = new TaskController();