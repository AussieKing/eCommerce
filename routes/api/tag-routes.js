const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
//! ########################## GET REQUESTS ##############################
router.get("/", async (req, res) => {
  // find ALL tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:tag_id", async (req, res) => {
  // find a SINGLE tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.tag_id, {
      include: [{ model: Product, through: ProductTag }],
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag found with the id provided." });
      return;
    }
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

//! ########################## POST REQUESTS ##############################
router.post("/", async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);

    if (req.body.productIds && req.body.productIds.length > 0) {
      const productTagIdArr = await Product.findAll({
        where: {
          product_id: req.body.productIds,
        },
      });

      await tagData.addProducts(productTagIdArr);
    }

    res.status(200).json(tagData);
  } catch (error) {
    res.status(400).json(error);
  }
});

//! ########################## UPDATE REQUESTS ##############################
router.put("/:tag_id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        tag_id: req.params.tag_id,  //! potential issue HERE
      },
    });

    if (!tagData) {
      res.status(404).json({ message: "No tag found with the id provided." });
      return;
    }
    // update the name of the tag
    await tagData.update(req.body);

    // update the producs associated with the tag
    if (req.body.productIds && Array.isArray(req.body.productIds)) {
      await tagData.setProducts(req.body.productIds);
    }

    // link new tags with products
    const updatedTag = await Tag.findByPk(req.params.tag_id, {
      include: [{ model: Product, through: ProductTag }],
    });

    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(400).json(error);
  }
});

//! ########################## DELETE REQUESTS ##############################
router.delete("/:tag_id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    // delete the tag
    const tagData = await Tag.destroy({
      where: {
        tag_id: req.params.tag_id,
      },
    });

    // if no tag is found, return an error
    if (!tagData) {
      res.status(404).json({ message: "No tag found with the id provided." });
      return;
    }
    // otherwise, return the deleted tag
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// export the router
module.exports = router;
