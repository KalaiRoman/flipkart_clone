import product_models from "../../Models/product/product_models";


export const approvalProduct = async (req, res) => {
    try {
        const { productid } = req.body;
        const response = await product_models.findByIdAndUpdate({ _id: productid }, { productStatus: true }, { new: true });

        return res.status(200).json({ message: "Apparovaed product" })

    } catch (error) {

    }
}