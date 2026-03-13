//importando o model BillingCycle
const BillingCycle = require('./billingCycle');

function parseMongooseErrors(error) {
  if (!error || !error.errors) {
    return [error && error.message ? error.message : 'Erro inesperado'];
  }

  return Object.values(error.errors).map(e => e.message);
}

function register(router, basePath) {
  router.route(basePath)
    .get(async (req, res) => {
      try {
        const docs = await BillingCycle.find();
        res.json(docs);
      } catch (error) {
        res.status(500).json({ errors: [error.message] });
      }
    })
    .post(async (req, res) => {
      try {
        const doc = await BillingCycle.create(req.body);
        res.status(201).json(doc);
      } catch (error) {
        res.status(500).json({ errors: parseMongooseErrors(error) });
      }
    });

  router.route(`${basePath}/count`)
    .get(async (req, res) => {
      try {
        const value = await BillingCycle.countDocuments();
        res.json({ value });
      } catch (error) {
        res.status(500).json({ errors: [error.message] });
      }
    });

  router.route(`${basePath}/:id`)
    .get(async (req, res) => {
      try {
        const doc = await BillingCycle.findById(req.params.id);
        if (!doc) {
          res.status(404).json({ errors: ['Registro nao encontrado'] });
          return;
        }
        res.json(doc);
      } catch (error) {
        res.status(500).json({ errors: [error.message] });
      }
    })
    .put(async (req, res) => {
      try {
        const doc = await BillingCycle.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
        );
        if (!doc) {
          res.status(404).json({ errors: ['Registro nao encontrado'] });
          return;
        }
        res.json(doc);
      } catch (error) {
        res.status(500).json({ errors: parseMongooseErrors(error) });
      }
    })
    .delete(async (req, res) => {
      try {
        const doc = await BillingCycle.findByIdAndDelete(req.params.id);
        if (!doc) {
          res.status(404).json({ errors: ['Registro nao encontrado'] });
          return;
        }
        res.json(doc);
      } catch (error) {
        res.status(500).json({ errors: [error.message] });
      }
    });
}

module.exports = { register };
