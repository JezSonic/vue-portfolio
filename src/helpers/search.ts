import searchData from "@/helpers/data/search/data.ts";

export interface SearchData {
    title: string,
    description: string,
    url: string
}

class SearchEngine {
    protected _searchData = searchData.value
    private _phrase: string | null = null;
    public performSearch(phrase: string) {
        const phraseArray: string[] = phrase.split(' ')
        if (phraseArray.length == 0) {
            return this.doSearchInData(phrase)
        }

        let _searchData: SearchData[] = []
        for (const phraseArrayKey in phraseArray) {
            _searchData = this.sumSearchArrays(_searchData, this.doSearchInData(phraseArrayKey))
        }

        return _searchData
    }

    private doSearchInData(word: string): SearchData[] {
        let returnData: SearchData[] = []
        for (const searchDataKey in this._searchData) {
            console.log(searchDataKey)
        }
        return returnData
    }

    private sumSearchArrays(initialArray: SearchData[], additionalArray: SearchData[]): SearchData[] {
        return []
    }
}