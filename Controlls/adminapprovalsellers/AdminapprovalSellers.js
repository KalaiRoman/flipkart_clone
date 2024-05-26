import Seller_models from "../../Models/auth/Seller_models.js"



export const updateSellerApproval = async (req, res) => {
    try {

        const { sellerid } = req.body;
        const response = await Seller_models.findByIdAndUpdate({ _id: sellerid }, { sellerStatus: true }, { new: true });
        res.status(200).json({ message: "User Profile Approval" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}


export const updateSellerRejected = async (req, res) => {
    try {
        const { sellerid } = req.body;
        const response = await Seller_models.findByIdAndUpdate({ _id: sellerid }, { sellerStatus: false }, { new: true });
        res.status(200).json({ message: "User Profile Rejected" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}