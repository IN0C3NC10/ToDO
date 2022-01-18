const models = require('../models/');
let task = models.Tasks;

class TaskController {
    async create(req, res) {
        // persiste os dados e  se der certo vai ao "then", e errado vai para o "catch"
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
}

module.exports = new TaskController();