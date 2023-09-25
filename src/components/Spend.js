

// All the data to create spends should came from database
class Spend {
    constructor(params) {
        // Information of spend
        this.name = params.name;

        // Value: Money
        this.value = params.value;

        // Name of payer
        this.payer = params.payer;

        // List of members that will share that spend
        this.shareholder = params.shareholder || [params.payer];

        // Divisor: For calculation
        this.divisor = this.shareholder.length;

        // Per share
        this.per_share = this.value / this.divisor;

    }
}

export default Spend;