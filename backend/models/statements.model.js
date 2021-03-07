const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statementsSchema = new Schema({
    cardNo: {
        type: String,
        ref: 'Cards'
    },
    month: {
        type: String,
    },
    year: {
        type: String,
    },
    transactions: {
        type: mongoose.Schema.Types.Array
    }
});

/* 
Sample Credit Card Statement

Summary of Account Activity:
Account Number
Previous Balance        $535.07
Payments               -$450.00
Other Credits             $0.00
Purchases              +$517.12
Balance Transfers      +$785.00
Cash Advances          +$318.
Past Due Amount          +$0.00
Fees Charged            +$69.00
Interest Charged        +$11.35
----------------------------------
New Balance           $1,786.00
Credit limit          $2,000.00
Available credit        $214.00
Statement closing date 3/22/2012
Days in billing cycle        30


Payment Information:
New Balance           $1,786.00
Minimum Payment Due      $53.00
Payment Due Date        4/20/12

Revised Terms:
APR for Purchases        16.99%

Transactions:
Reference Number    Trans Date  Post Date   Description of Transaction or Credit  Amount
21312313SSDF213F    2/22        2/23        Store#1                               $133.21
33312313SSDF213F    2/22        2/23        Store#2                               $30.99
                        FEES
134K1M23D1223441    2/23        2/23        Late fee                              $10.00
                                            TOTAL FEES FOR THIS PERIOD            $10.00
                        INTEREST CHARGED
                                            Interest Change on Purchases           $6.57                      
*/

const Statements = mongoose.model('Statements', statementsSchema);