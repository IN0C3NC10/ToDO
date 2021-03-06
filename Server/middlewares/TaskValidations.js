const { Op } = require('sequelize');
const models = require('../models/');
let task = models.Tasks;
const { isPast } = require('date-fns');

const TaskValidation = async (req, res, next) => {
    //========= UPDATE =========//
    if (req.params.id) {
        const { macaddress, when } = req.body;

        // se algum dos campos não estiverem preenchidos, ele entra no if, do contrario prossegue
        if (!macaddress)
            return res.status(400).json({ error: 'MAC Address é obrigatório!' });
        else if (!when)
            return res.status(400).json({ error: 'Data e Hora são obrigatórios!' });
        else {
            let exists;
            /*
                ..verifica se existe uma tarefa na mesma data e horário e com o mesmo macaddress
                    ignorando o id
            */
            exists = await task.findOne({
                where: {
                    id: { [Op.ne]: req.params.id },
                    when: { [Op.eq]: new Date(when) },
                    macaddress: macaddress
                }
            });
            // ..se existir, retorna um erro
            if (exists)
                return res.status(400).json({ error: 'Já existe uma tarefa neste dia e horário!' });

            // ..se deu tudo certo a execução segue
            next();
        }
    }
    //========= CREATE =========//
    else {
        const { macaddress, category, title, description, when } = req.body;

        // se algum dos campos não estiverem preenchidos, ele entra no if, do contrario prossegue
        if (!macaddress)
            return res.status(400).json({ error: 'MAC Address é obrigatório!' });
        else if (!category)
            return res.status(400).json({ error: 'Categoria é obrigatória!' });
        else if (!title)
            return res.status(400).json({ error: 'Título é obrigatório!' });
        else if (!description)
            return res.status(400).json({ error: 'Descrição é obrigatório!' });
        else if (!when)
            return res.status(400).json({ error: 'Data e Hora são obrigatórios!' });
        else if (isPast(new Date(when)))
            return res.status(400).json({ error: 'Defina uma Data e Hora futura!' });
        else {
            let exists;
            /*
                ..verifica se existe uma tarefa na mesma data e horário, com o mesmo macaddress
            */
            exists = await task.findOne({
                where: {
                    when: { [Op.eq]: new Date(when) },
                    macaddress: macaddress
                }
            });
            // ..se existir, retorna um erro
            if (exists)
                return res.status(400).json({ error: 'Já existe uma tarefa neste dia e horário!' });

            // ..se deu tudo certo a execução segue
            next();
        }
    }
}

module.exports = TaskValidation;