export class FilterValueConverter {
  toView(array, searchTerm) {
    if (array === undefined || array === null || searchTerm === undefined || searchTerm === '') {
        return array;
    }
    var newArray = [];
    array.forEach(function(element) {
        if (element.firstName.includes(searchTerm)) {
            newArray.push(element);
        }
        else if (element.lastName.includes(searchTerm)) {
            newArray.push(element);
        }
        else if (element.title.includes(searchTerm)) {
            newArray.push(element);
        }
        else if (element.email.includes(searchTerm)) {
            newArray.push(element);
        }
    }, this);
    return newArray;
  }
}