import { fileConfig } from './fileConfig';
import { folderConfig } from './folderConfig';
import { userConfig } from './userConfig';
import { customerConfig } from './customerConfig';
import { lotConfig } from './lotConfig';
import { expenseConfig } from './expenseConfig';
import { paymentConfig } from './paymentsConfig';
import { saleConfig } from './saleConfig';

const configMapping = {
    file: fileConfig,
    image: fileConfig,
    video: fileConfig,
    audio: fileConfig,
    user: userConfig,
    folder: folderConfig,
    customer: customerConfig,
    lot:lotConfig,
    expense:expenseConfig,
    payment:paymentConfig,
    sale:saleConfig,
    wizardSale:saleConfig,
};

export default configMapping