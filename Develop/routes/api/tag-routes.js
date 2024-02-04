const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
//http://localhost:3001/api/tags
router.get('/', async (req, res) => {
  const tagData = await Tag.findAll({
    include: [{ model: Product, through: ProductTag, as: 'productTag_products'}]
  }).catch((err) => {
    res.json(err);
  });
  res.json(tagData);
});

//http://localhost:3001/api/tags/:id
router.get('/:id', async (req, res) => {
  try {
    const oneTagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'productTag_products'}]
    });
    if(!oneTagData) {
      res.status(404).json({ message: 'Not found'});
      return;
    }
    res.status(200).json(oneTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//http://localhost:3001/api/tags
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//http://localhost:3001/api/tags/:id
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//http://localhost:3001/api/tags/:id
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
