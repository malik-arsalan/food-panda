const order = require("../models/orderSchema");
const product = require("../models/productSchema");

class orderService {
  async placeOrder(data) {
    const { userId, restaurantId, items, receiveMethod } = data;
    for (let i = 0; i < items.length; i++) {
      const findproduct = await product.findOne({ _id: items[i].productId });
      if (findproduct) {
        const productPrice = findproduct.price;
        items[i].price = productPrice;
      }
    }
    const newOrder = new order({
      userId: userId,
      restaurantId: restaurantId,
      items: items,
      receiveMethod: receiveMethod,
    });
    const result = await newOrder.save();
    return newOrder;
  }
  async cancelOrder(data) {
    try {
      const deleteOrder = await order.deleteOne({ _id: data });
      return deleteOrder;
    } catch (err) {
      res.status(400).json(err);
    }
  }
}

module.exports = { orderService };
