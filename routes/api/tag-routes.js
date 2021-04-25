const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll()
    if (!tagData) {
      res.status(404).json({ message: 'Unable to retrieve tags' });
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, { include: Product });
    if (!tagData) {
      res.status(404).json({ message: 'Tag not found' })
    }
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body, {
      where: {
        id: req.body.id,
        tag_name: req.body.tag_name
      }
    })
    if (!tagData) {
      res.status(404).json({ message: 'unable to create new tag' })
    }
    res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json(err)
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!tagData) {
      res.status(404).json({ message: 'unable to update, tag not found' });
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!tagData) {
      res.status(404).json({message: 'Unable to delete, Tag not found!'});

    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

  
  // delete on tag by its `id` value
});

module.exports = router;