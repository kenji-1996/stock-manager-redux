/**
 * Created by kenji on 4/9/18.
 */
export default class StockItem {
    StockID: number;TradeName: string;ProductGroupID: number;ProductClassID: number;ClubID: number;PackSize: number;
    OuterSize: number;OrderSize: number;ExtraInfo: string;Expected: number;SOH: number;MinimumSOH: number;MTD: number;SOO: number;ValueMTD: number;
    Retail: number;AverageRetail: number;Cost: number;RealCost: number;AverageCost: number;Fillup: number;OrderVariance: number;MonthsAccurate: number;
    Date: string;DateCreated: string; POSLookUp: boolean;Beep: boolean;Reorder: boolean;ReorderAfterDate: string;Labels: boolean;Priced: boolean;
    AskPrice: boolean;Label: string;Message: string;ListCost: any;Markup: number;PLU: string;HotKey: number;NoDiscount: boolean;stockUpdateid: number;
    PreferredSupplierId: number;Brand: any;Manufacturer: number;Seasonal: boolean;Shelflabel: boolean;StockDescription: any;RecommendedRetail: number;
    GSTGroupID: number;GSTTypeID: number;SalesTax: number;RetailAfterGST: number;Update: boolean;StockDiscount: any;NoFurtherDiscount: boolean;
    OnlyOrdNegSOH: boolean;LastOrderDate: string;comments: string;Discontinued: boolean;HeadOfficeID: number;UPI: number;MinOrdQty: number;
    SmallLabelOption: number;ImageName: any;Robot: boolean;ExcludeCustomerDisplay: boolean;NettIntoStore: any;NegotiatedCost: any;
    MaximumSOH: number;OrderCategory: number;LastCountDate: string;RobotStoreInFridge: boolean;NoShelfLabels: number;SOLayby: number;

    //Populated variables:
    ProductGroupName: string;
    constructor(stock) {
        this.StockID = this.numberFormat(stock.StockID);
        this.TradeName = stock.TradeName;
        this.ProductGroupID = this.numberFormat(stock.ProductGroupID);
        this.ProductClassID = this.numberFormat(stock.ProductClassID);
        this.ClubID = this.numberFormat(stock.ClubID);
        this.PackSize = this.numberFormat(stock.PackSize);
        this.OuterSize = this.numberFormat(stock.OuterSize);
        this.OrderSize = this.numberFormat(stock.OrderSize);
        this.ExtraInfo = stock.ExtraInfo;
        this.Expected = this.numberFormat(stock.Expected);
        this.SOH = this.numberFormat(stock.SOH);
        this.MinimumSOH = this.numberFormat(stock.MinimumSOH);
        this.MTD = this.numberFormat(stock.MTD);
        this.SOO = this.numberFormat(stock.SOO);
        this.ValueMTD = this.numberFormat(stock.ValueMTD);
        this.Retail = this.numberFormat(stock.Retail);
        this.AverageRetail = this.numberFormat(stock.AverageRetail);
        this.Cost = this.numberFormat(stock.Cost)
        this.RealCost = this.numberFormat(stock.RealCost);
        this.AverageCost = this.numberFormat(stock.AverageCost);
        this.Fillup = this.numberFormat(stock.Fillup);
        this.OrderVariance = this.numberFormat(stock.OrderVariance);
        this.MonthsAccurate = this.numberFormat(stock.MonthsAccurate);
        this.Date = stock.Date;
        this.DateCreated = stock.DateCreated;
        this.POSLookup = this.booleanFormat(stock.POSLookup);
        this.Beep = this.booleanFormat(stock.Beep);
        this.Reorder = this.booleanFormat(stock.Reorder);
        this.ReorderAfterDate = stock.ReorderAfterDate;
        this.Labels = this.booleanFormat(stock.Labels);
        this.Priced = this.booleanFormat(stock.Priced);
        this.AskPrice = this.booleanFormat(stock.AskPrice);
        this.Label = stock.Label;
        this.Message = stock.Message;
        this.ListCost = this.numberFormat(stock.ListCost);
        this.Markup = this.numberFormat(stock.Markup);
        this.PLU = stock.PLU;
        this.HotKey = this.numberFormat(stock.HotKey);
        this.NoDiscount = this.booleanFormat(stock.NoDiscount);
        this.stockUpdateid = this.numberFormat(stock.stockUpdateid);
        this.PreferredSupplierId = this.numberFormat(stock.PreferredSupplierId);
        this.Brand = stock.Brand;
        this.Manufacturer = this.numberFormat(stock.Manufacturer);
        this.Seasonal = this.booleanFormat(stock.Seasonal);
        this.Shelflabel = this.booleanFormat(stock.Shelflabel);
        this.StockDescription = stock.StockDescription;
        this.RecommendedRetail = this.numberFormat(stock.RecommendedRetail);
        this.GSTGroupID = this.numberFormat(stock.GSTGroupID);
        this.GSTTypeID = this.numberFormat(stock.GSTTypeID);
        this.SalesTax = this.numberFormat(stock.SalesTax);
        this.RetailAfterGST = this.numberFormat(stock.RetailAfterGST);
        this.Update = this.booleanFormat(stock.Update);
        this.StockDiscount = stock.StockDiscount;
        this.NoFurtherDiscount = this.booleanFormat(stock.NoFurtherDiscount);
        this.OnlyOrdNegSOH = this.booleanFormat(stock.OnlyOrdNegSOH);
        this.LastOrderDate = stock.LastOrderDate;
        this.comments = stock.comments;
        this.Discontinued = this.booleanFormat(stock.Discontinued);
        this.HeadOfficeID = this.numberFormat(stock.HeadOfficeID);
        this.UPI = this.numberFormat(stock.UPI);
        this.MinOrdQty = this.numberFormat(stock.MinOrdQty);
        this.SmallLabelOption = stock.SmallLabelOption;
        this.ImageName = stock.ImageName;
        this.Robot = this.booleanFormat(stock.Robot);
        this.ExcludeCustomerDisplay = this.booleanFormat(stock.ExcludeCustomerDisplay);
        this.NettIntoStore = stock.NettIntoStore;
        this.NegotiatedCost = stock.NegotiatedCost;
        this.MaximumSOH = this.numberFormat(stock.MaximumSOH);
        this.OrderCategory = this.numberFormat(stock.OrderCategory);
        this.LastCountDate = stock.LastCountDate;
        this.RobotStoreInFridge = this.booleanFormat(stock.RobotStoreInFridge);
        this.NoShelfLabels = this.numberFormat(stock.NoShelfLabels);
        this.SOLayby = this.numberFormat(stock.SOLayby);
        //Populated variables
        this.GST = this.numberFormat(stock.GST);
        this.RegularDiscount = this.numberFormat(stock.RegularDiscount);
        this.ExtraDiscount = this.numberFormat(stock.ExtraDiscount);
        this.DepartmentID = this.numberFormat(stock.DepartmentID);
        this.SubDeptNumber = this.numberFormat(stock.SubDeptNumber);
        this.ProductGroupName = stock.ProductGroupName;
    }

    formattedSOH = function() {
        return SOH / PackSize;
    }

    priceFormat = function(input) {
        const output = (input / 100).toFixed(2);
        output.replace(/\d(?=(\d{3})+\.)/g, '$&,');
        return '$' + output;
    };

    booleanFormat = function(input) {
        if(typeof(input) === typeof(true)){
            return input;
        }else{
            if(typeof(input) === "number") {
                if(input === -1) {
                    return false;
                }else{
                    return true;
                }
            }
        }
    };

    numberFormat = function(input) {
        if(input === null || input === undefined) {
            return 0;
        }else{
            return input;
        }
    }
};