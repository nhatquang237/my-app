// All the data to create spends should came from database
import {numberWithCommas} from '../utils/StringUtils';

class Member {
  constructor(name) {

    // Name of member: Must be unique
    this.name = name;

    // Sum of this member's spends
    this.spending = 0;

    // Money that member had already paid
    this.amountSpent = 0;

    // Remaining amount = amountSpent - spending;
    this.remaining = 0;

    // Pay list: List of spend that member paid
    this.paidList = [];

    // Spending list: List of spend that member take part in
    this.spendingList = [];

  }
  // For presentation purpose
  getSpending () {
    return numberWithCommas(this.spending)
  }
  getAmountSpent () {
    return numberWithCommas(this.amountSpent)
  }
  getRemaining () {
    return numberWithCommas(this.remaining)
  }

  // Function to remove spending from paidList of this member
  removeFromPaidList = (spendName) => {
    let index = this.paidList.indexOf(spendName)

    if (index !== -1){
      this.paidList.splice(index, 1);
    }
  }

  // Function to remove spending from spendingList of this member
  removeFromSpendingList = (spendName) => {
    let index = this.spendingList.indexOf(spendName)

    if (index !== -1){
      this.spendingList.splice(index, 1);
    }
  }

  // Function to update spending value of this member
  addToPaidList = (spendName) => {
    if (!this.paidList.includes(spendName)){
      this.paidList.push(spendName);
    }
  }

  // Function to update spending value of this member
  addToSpendingList = (spendName) => {
    if (!this.spendingList.includes(spendName)){
      this.spendingList.push(spendName);
    }
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

  // Function to create hash string to check if object is updated
  createHashString = () => {
    // Data to hash
    const hash = this.name + this.spending + this.amountSpent;
    return hash
  }

  // Function to check if object is change
  isChanged = () => {
    const currentHash = this.createHashString()
    if (currentHash === this.hash){
      return false
    }
    this.hash = currentHash;
    return true
  }
};

export default Member;