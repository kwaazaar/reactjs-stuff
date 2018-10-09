class DataApi {

    constructor(rawData) {
        this.rawData = rawData;
    }

    mapIntoObjectArr(arr) {
        return arr.reduce((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        }, {})
    }

    getArticles() {
        return this.mapIntoObjectArr(this.rawData.articles);
    }

    getAuthors() {
        return this.mapIntoObjectArr(this.rawData.authors);
    }
}

export default DataApi;