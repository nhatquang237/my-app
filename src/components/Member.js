// All the data to create spends should came from database
class Member {
  constructor(params) {

    // Name of member: Must be unique
    this.name = params.name;

    // Sum of this member's spends
    this.spending = 0;

    // Money that member had already paid
    this.amountSpent = 0;

    // Remaining amount = amountSpent - spending;
    this.remaining = 0;

  }
  // Function to update spending value of this member
  updateSpending = (increment) => {
    if (increment > 0){
      this.spending += increment;
      this.updateRemaining()
    }
  }

  // Function to update amount of money that member had already spent
  // including paying for another member stuff
  updateAmountSpent = (increment) => {
    if (increment > 0){
      this.amountSpent += increment;
      this.updateRemaining()
    }
  }

  // Function to update remaining
  updateRemaining = () => {
    this.remaining = this.amountSpent - this.spending;
  }

};

export default Member;