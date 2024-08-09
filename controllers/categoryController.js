import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      console.log("not name");
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      console.log("category existed..");
      return res.status(200).send({
        success: true,
        message: "Category Already exist.",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "Category Created Successfully..",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating category.",
      error,
    });
  }
};
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    console.log(req.user._id);
    res.status(200).send({
      success: true,
      message: "Category Updated  Successfully..",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating category.",
      error,
    });
  }
};
export const CategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});

    res.status(200).send({
      success: true,
      message: "All Categories Founded Successfully..",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all categories.",
      error,
    });
  }
};
export const getSingleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    console.log(req.params.slug);
    res.status(200).send({
      success: true,
      message: "given category Founded Successfully..",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting category.",
      error,
    });
  }
};
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    console.log(req.user);
    res.status(200).send({
      success: true,
      message: "given category Deleted Successfully..",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deliting category.",
      error,
    });
  }
};
