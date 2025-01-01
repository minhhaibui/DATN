
const WarrantyModel = require('../models/warranty.model');

exports.createWarranty = async (req, res) => {
  try {
    const { user_id, order_id, productList, warranty_date, note } = req.body;

    if (!user_id || !order_id || !productList) {
      return res.status(400).json({ error: 'user_id, order_id, and product_data are required' });
    }
    console.log("req.body;",req.body)
    const warranty = new WarrantyModel({
      user_id,
      order_id,
      product_data:productList,
      warranty_date,
      note,
    });

    const savedWarranty = await warranty.save();
    res.status(201).json({ message: 'Warranty created successfully', data: savedWarranty });
  } catch (error) {
    console.error('Error creating warranty:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.updateWarranty = async (req, res) => {
  try {
    const { warrantyId } = req.params;
    const updateData = req.body;

    const updatedWarranty = await WarrantyModel.findByIdAndUpdate(
      warrantyId,
      updateData,
      { new: true }
    );

    if (!updatedWarranty) {
      return res.status(404).json({ error: 'Warranty not found' });
    }

    res.status(200).json({ message: 'Warranty updated successfully', data: updatedWarranty });
  } catch (error) {
    console.error('Error updating warranty:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.deleteWarranty = async (req, res) => {
  try {
    const { warrantyId } = req.params;

    const deletedWarranty = await WarrantyModel.findByIdAndDelete(warrantyId);

    if (!deletedWarranty) {
      return res.status(404).json({ error: 'Warranty not found' });
    }

    res.status(200).json({ message: 'Warranty deleted successfully', data: deletedWarranty });
  } catch (error) {
    console.error('Error deleting warranty:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.getAllWarranties = async (req, res) => {
  try {
    const warranties = await WarrantyModel.find().sort({ warranty_date: -1 });
    res.status(200).json({
      message: 'Fetched all warranties successfully',
      data: warranties
    });
  } catch (error) {
    console.error('Error fetching warranties:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
