const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

//! ########################## GET REQUESTS ##############################
// find ALL categories - GET request
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product, attributes: ["product_name", "product_id"] }],
    });
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

//! find ONE category by its `id` value - GET request
router.get("/:category_id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.category_id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res
        .status(404)
        .json({ message: "No category found with the id provided." });
      return;
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

//! ########################## POST REQUESTS ##############################
// create a NEW category - POST request
router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);

    // finding the product by ID
    if (req.body.productIds && req.body.productIds.length > 0) {
      const products = await Product.findAll({
        where: {
          product_id: req.body.productIds,
        },
      });
      await categoryData.addProducts(products);
    }

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// update a category by its `id` value - UPDATE request
router.put("/:category_id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.category_id);
    if (!categoryData) {
      res
        .status(404)
        .json({ message: "No category found with the id provided." });
      return;
    }
    // update the category name
    await Category.update(req.body); //! potential issue HERE
    // update the products
    if (req.body.productIds && Array.isArray(req.body.productIds)) {
      await categoryData.setProducts(req.body.productIds);
    }
    // get the updated category and link it to the products
    const updatedCategory = await Category.findByPk(req.params.category_id, {
      include: [{ model: Product }],
    });

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json(error);
  }
});

//! ########################## DELETE REQUESTS ##############################
// delete a category by its `id` value but KEEP the product - DELETE request
router.delete("/:category_id", async (req, res) => {
  try {
    const updatedProduct = await Product.update(
      { category_id: null },
      { where: { category_id: req.params.category_id } }
    );

    if (!updatedProduct) {
      res
        .status(404)
        .json({ message: "No product found with the id provided." });
      return;
    }
    // deleting the category
    const deletedCategory = await Category.destroy({
      where: {
        category_id: req.params.category_id,
      },
    });

    if (!deletedCategory) {
      res
        .status(404)
        .json({ message: "No category found with the id provided." });
      return;
    }

    res.status(200).json({ message: "Category has been deleted." });
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete a category by its `id` value AND its associated product - DELETE request
router.delete("/:category_id", async (req, res) => {
  try {
    // delete the products associated with the category
    await Category.destroy({
      where: {
        category_id: req.params.category_id,
      },
    });

    // delete the category
    const deletedCategory = await Category.destroy({
      where: {
        category_id: req.params.category_id,
      },
    });

    if (!deletedCategory) {
      res
        .status(404)
        .json({ message: "No category found with the id provided." });
      return;
    }

    res
      .status(200)
      .json({ message: "Category and products successfully deleted." });
  } catch (error) {
    res.status(500).json(error);
  }
});

// export the router
module.exports = router;
