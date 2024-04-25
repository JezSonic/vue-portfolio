import searchData from "@/helpers/data/search/data.ts";

export interface SearchData {
    title: string,
    description: string,
    url: string
}

export class SearchEngine {
    protected _searchData = searchData.value
    private _phrase: string | null = null;
    public performSearch(phrase: string) {
        const phraseArray: string[] = phrase.split(' ')
        if (phraseArray.length == 0) {
            return this.doSearchInData(phrase)
        }

        let _searchData: SearchData[] = []
        for (const phraseArrayKey in phraseArray) {
            _searchData = this.sumSearchArrays(_searchData, this.doSearchInData(phraseArray[phraseArrayKey]))
        }

        return _searchData
    }

    private doSearchInData(word: string): SearchData[] {
        let returnData: SearchData[] = []
        for (const searchDataKey in this._searchData) {
            const obj = this._searchData[searchDataKey]
            console.log('Searching in: ', obj, ' for: ', word)
            if (obj.title.toLowerCase().split(' ').includes(word.toLowerCase())) {
                returnData.push(this._searchData[searchDataKey])
                console.log('Found: ', obj)
            } else if (obj.title.toLowerCase() == word.toLowerCase()) {
                returnData.push(this._searchData[searchDataKey])
                console.log('Found: ', obj)
            }
        }
        return returnData
    }

    private sumSearchArrays(initialArray: SearchData[], additionalArray: SearchData[]): SearchData[] {
        console.log('Concatenating: ', initialArray, ' with: ', additionalArray)
        return initialArray.concat(additionalArray)
    }
}