import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import productModel from "../models/productModel.js";

import fs from "fs";
export const createProductController = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      category,
      quantity,

      shipping,
    } = req.fields;
    const { photo } = req.files;
    //validaton
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });

      case !description:
        return res.status(500).send({ error: "dessctiption is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is Required and should be less than 1mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    console.log(photo);
    res.status(201).send({
      success: true,
      message: "Product Created Successfully..",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating product.",
      error,
    });
  }
};

export const getAllProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      total: products.length,
      message: "Alll Products.",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while finding product.",
      error,
    });
  }
};
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .populate("category")
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "Product founded Successfuly",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while finding single product.",
      error,
    });
  }
};
export const deleteProductController = async (req, res) => {
  try {
    const products = await productModel
      .findByIdAndDelete(req.params.id)
      .select("-photo");
    res.status(201).send({
      success: true,
      message: "Product deleted Successfully..",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while finding product.",
      error,
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo.",
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      category,
      quantity,

      shipping,
    } = req.fields;
    const { photo } = req.files;
    //validaton
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });

      case !description:
        return res.status(500).send({ error: "dessctiption is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is Required and should be less than 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    console.log(products);
    // if (photo) {
    //   products.photo.data = fs.readFileSync(photo.path);
    //   products.photo.contentType = photo.type;
    // }
    await products.save();
    // console.log(photo);
    res.status(201).send({
      success: true,
      message: "Product updated Successfully..",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating product.",
      error,
    });
  }
};

//! filter controler
export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while filtering products",
      error,
    });
  }
};

//! Product Count Controller
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in Product count",
      error,
      success: false,
    });
  }
};

//! Product List base on page Controller
export const productListController = async (req, res) => {
  try {
    const perPage = 2;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in per page ctrl",
      error,
      success: false,
    });
  }
};

//! search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
    console.log(results.length);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in search product api",
      error,
    });
  }
};

//! Similar Products
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel.find({
      category: cid,
      _id: { $ne: pid },
    }).select("-photo").limit(3).populate("category");
    res.status(200).send({
      success:true,
      products,
    })
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting similar products.. ",
      error,
    });
  }
};


//! get product by category
export const productCategoryController= async (req, res)=>{
  try {
    const category= await categoryModel.findOne({slug:req.params.slug})
    const products = await productModel.find({category}).populate('category')
    res.status(200).send({
      success:true,
      category,
      products
    })
    
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success:false,
      error,
      message: 'Error while getting products'
    })
  }
}