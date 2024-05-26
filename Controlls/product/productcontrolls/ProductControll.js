


// create

import Product_Shema from "../../../Models/product/product_models.js";



export const CreateProduct = async (req, res, next) => {



    const {
        productname,
        oldprice,
        saleprice,
        discount,
        quantity,
        description,
        thumbimage,
        imagestore,
        color,
        size,
    } = req.body;

    try {

        const response = new Product_Shema({
            productname,
            oldprice,
            saleprice,
            discount,
            quantity,
            description,
            thumbimage,
            imagestore,
            color,
            size,
            user: req.userid,
            userquantity: 1,
            productStatus: false,
            adminproductChat: []
        })

        await response.save();
        return res.status(201).json({ message: "Create Product" })

    } catch (error) {
        return res.status(404).json({ message: "create error" })

    }
}

// get single product

export const getProduct = async (req, res, next) => {

    const id = req.params.id;
    try {

        const response = await Product_Shema.findById(id).populate("user");
        res.status(200).json({ message: "success", data: response });


    } catch (error) {
        res.status(404).json({ message: "get error" })

    }
}

// all products

export const getAllProduct = async (req, res, next) => {

    const { page, size } = req.query;

    // if (!page) {
    //     page = 1
    // }

    // if (!size) {
    //     size = 10
    // }

    // const limit = parseInt(size);

    // const skip = (page || 1 - 1) * size;

    try {
        const response = await Product_Shema.find({ user: req.userid }).populate("user").sort({ createdAt: -1 })
        // .limit(limit).skip(skip);
        res.status(200).json({ message: "success", data: response });

    } catch (error) {
        res.status(404).json({ message: "get all error" })

    }
}

// current user products

export const getCurrentuserProducts = async (req, res, next) => {

    const { page, size } = req.query;

    // if (!page) {
    //     page = 1
    // }

    // if (!size) {
    //     size = 10
    // }

    // const limit = parseInt(size);

    // const skip = (page || 1 - 1) * size;
    try {
        const response = await Product_Shema.find({ userid: req.userid }).populate("user")
        // .limit(limit).skip(skip);
        res.status(200).json({ message: "success", data: response });

    } catch (error) {
        res.status(404).json({ message: "get all error" })

    }
}

// edit

export const editProduct = async (req, res, next) => {

    const id = req.params.id
    try {

        const update = await Product_Shema.findByIdAndUpdate(id, req.body, { new: true })

        res.status(200).json({ message: "Product Updated" })

    } catch (error) {
        res.status(404).json({ message: "edit error" })

    }
}

// delete

export const deleteProduct = async (req, res, next) => {
    const id = req.params.id
    try {
        const update = await Product_Shema.findByIdAndDelete(id)
        res.status(200).json({ message: "Product Deleted" })

    } catch (error) {
        res.status(404).json({ message: "delete error" })

    }
}

// update chat admin


export const updateChatUser = async (req, res) => {
    try {

        const { productId, message, senderStatus } = req.body;

        const data = {
            message: message,
            status: false,
            senderStatus: senderStatus,

        }

        const findUser = await Product_Shema.findByIdAndUpdate({ _id: productId }, {
            $push: { adminproductChat: data }
        }, { new: true });

        res.status(200).json({ message: "Updated Chat Message" })


    } catch (error) {
        res.status(404).json({ message: "delete error" })

    }
}