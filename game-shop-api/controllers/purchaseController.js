export default class PurchaseController {
  constructor({ purchaseService }) {
    this.purchaseService = purchaseService;
  }

  createPurchase = async (req, res, next) => {
    const { products, amount } = req.body;
    const userId = req.user._id;

    try {
      const result = await this.purchaseService.createPurchase({
        products,
        amount,
        userId,
      });

      res.status(201).json({
        message: "Purchase created successfully!",
        user: result,
      });
    } catch (err) {
      next(err);
    }
  };

  getPurchase = async (req, res, next) => {
    const purchaseId = req.params.purchaseId;

    try {
      const purchase = await this.purchaseService.getPurchase(purchaseId);

      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found!" });
      }

      res.status(200).json({
        message: "Fetched purchase successfully!",
        purchase: purchase,
      });
    } catch (err) {
      next(err);
    }
  };

  getPurchases = async (req, res, next) => {
    const pageNum = +req.query.pageNum || 1;
    const perPage = +req.query.perPage || 5;
    const dateFrom = req.query.dateFrom;
    const dateTo = req.query.dateTo;

    try {
      const purchases = await this.purchaseService.getPurchases({
        pageNum,
        perPage,
        dateFrom,
        dateTo,
      });

      if (!purchases) {
        return res.status(404).json({ message: "Purchases not found!" });
      }

      res.status(200).json({
        message: "Fetched purchases successfully!",
        purchases: purchases,
      });
    } catch (err) {
      throw err;
    }
  };
}
