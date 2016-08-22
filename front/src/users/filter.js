export class FilterValueConverter {
  toView(array, searchTerm) {
    if (array === undefined || array === null || searchTerm === undefined || searchTerm === '') {
        return array;
    }
    var newArray = [];
    array.forEach(function(element) {
        if (element.details.firstName.includes(searchTerm)) {
            newArray.push(element);
        }
        else if (element.details.lastName.includes(searchTerm)) {
            newArray.push(element);
        }
        else if (element.details.title.includes(searchTerm)) {
            newArray.push(element);
        }
        else if (element.details.email.includes(searchTerm)) {
            newArray.push(element);
        }
    }, this);
    return newArray;
  }
}