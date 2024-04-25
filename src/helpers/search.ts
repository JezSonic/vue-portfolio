import searchData from "@/helpers/data/search/data.ts";

export interface SearchData {
    title: string,
    description: string,
    url: string
}

export class SearchEngine {
    protected _searchData = searchData.value
    public performSearch(phrase: string) {
        const phraseArray: string[] = phrase.split(' ')
        if (phraseArray.length == 0) {
            return this.doSearchInData(phrase)
        }

        let _searchData: SearchData[] = []
        for (const phraseArrayKey in phraseArray) {
            _searchData = this.sumSearchArrays(_searchData, this.doSearchInData(phraseArray[phraseArrayKey]))
            // _searchData = this.doSearchInData(phraseArray[phraseArrayKey])
        }


        return _searchData
    }

    private doSearchInData(word: string): SearchData[] {
        let returnData: SearchData[] = []
        for (const searchDataKey in this._searchData) {
            //@TODO: Fix this piece of shit UwU <3
            const obj = this._searchData[searchDataKey]
            if (obj.title.toLowerCase().split(' ').includes(word.toLowerCase())) {
                returnData.push(this._searchData[searchDataKey])
            }

            if (obj.title.toLowerCase() == word.toLowerCase()) {
                returnData.push(this._searchData[searchDataKey])
            }

            if (obj.title.toLowerCase().includes(word.toLowerCase())) {
                returnData.push(this._searchData[searchDataKey])
            }

            if (obj.description.toLowerCase().split(' ').includes(word.toLowerCase())) {
                returnData.push(this._searchData[searchDataKey])
            }

            if (obj.description.toLowerCase() == word.toLowerCase()) {
                returnData.push(this._searchData[searchDataKey])
            }

            if (obj.description.toLowerCase().includes(word.toLowerCase())) {
                returnData.push(this._searchData[searchDataKey])
            }

            if (obj.url.toLowerCase().split(' ').includes(word.toLowerCase())) {
                returnData.push(this._searchData[searchDataKey])
            }

            if (obj.url.toLowerCase() == word.toLowerCase()) {
                returnData.push(this._searchData[searchDataKey])
            }

            if (obj.url.toLowerCase().includes(word.toLowerCase())) {
                returnData.push(this._searchData[searchDataKey])
            }
        }
        return returnData
    }

    private sumSearchArrays(initialArray: SearchData[], additionalArray: SearchData[]): SearchData[] {
        return initialArray.concat(additionalArray)
    }
}