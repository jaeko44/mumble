export class LimitToValueConverter {
    toView(array, count) {
        return array.slice(0, count);
    }
}