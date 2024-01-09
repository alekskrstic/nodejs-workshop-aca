export default class PurchaseService {
  constructor({ purchaseRepository }) {
    this.purchaseRepository = purchaseRepository;
  }

  createPurchase = async (purchaseData) => {
    try {
      return await this.purchaseRepository.createPurchase(purchaseData);
    } catch (err) {
      throw err;
    }
  };

  getPurchase = async (purchaseId) => {
    try {
      return await this.purchaseRepository.getPurchase(purchaseId);
    } catch (err) {
      throw err;
    }
  };

  getPurchases = async (purchaseReq) => {
    try {
      return await this.purchaseRepository.getPurchases(purchaseReq);
    } catch (err) {
      throw err;
    }
  };
}
