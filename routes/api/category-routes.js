const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
//http://localhost:3001/api/categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
  });
  res.status(200).json(categoryData);
} catch {
  res.status(404).json(err);
}
});

//http://localhost:3001/api/categories/4
router.get('/:id', async (req, res) => {
  try {
    const oneCategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if(!oneCategoryData) {
      res.status(404).json({ message: 'Not found'});
      return;
    }
    res.status(200).json(oneCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//http://localhost:3001/api/categories
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//http://localhost:3001/api/categories/2
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//http://localhost:3001/api/categories/2
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
