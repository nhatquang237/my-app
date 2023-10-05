
// Function use for updating state of components that have state value equal to a list.
export const update_list = (targetList, newValue, index) => {
// Create a new list that is a copy of the old list using the spread operator
// another way to do is use: Array.from()
const updatedList = [...targetList];
updatedList[index] = newValue;

return updatedList
}