import product_models from "../../Models/product/product_models.js";


export const approvalProduct = async (req, res) => {
    try {
        const { productid } = req.body;
        const response = await product_models.findByIdAndUpdate({ _id: productid }, { productStatus: true }, { new: true });
        return res.status(200).json({ message: "Apparovaed product" })

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const rejectProduct = async (req, res) => {
    try {
        const { productid } = req.body;
        const response = await product_models.findByIdAndUpdate({ _id: productid }, { productStatus: false }, { new: true });
        return res.status(200).json({ message: "Reject product" })

    } catch (error) {
        res.status(500).json({ message: error })
    }
}
export const getAllProduct = async (req, res) => {
    try {
        const response = await product_models.find().populate("user");
        return res.status(200).json({ message: "Apparovaed product", data: response })

    } catch (error) {
        res.status(500).json({ message: error })

    }
}

export const getSingleProduct = async (req, res) => {
    const id = req.params.id;

    try {


        const response = await product_models.findById({ _id: id }).populate("user");
        return res.status(200).json({ message: "Apparovaed product", data: response })

    } catch (error) {
        res.status(500).json({ message: error })

    }
}

export const ProductchatAdmin = async (req, res) => {
    try {
        const { productId, message, senderStatus } = req.body;
        const data = {
            message: message,
            senderStatus: senderStatus,
            status: false
        }
        const response = await product_models.findByIdAndUpdate({ _id: productId }, {
            $push: { adminproductChat: data }
        }, { new: true });
        return res.status(200).json({ message: "Apparovaed product", data: response })

    } catch (error) {
        res.status(500).json({ message: error })

    }
}
