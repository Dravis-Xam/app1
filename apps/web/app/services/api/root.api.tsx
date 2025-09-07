const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

type Body = {
    [key: string]: any | string[] | number | boolean | null;
}

type Params = {
    url: string, 
    body?: Body,
    options: RequestInit
}


class fetcher {
    url: string;
    options: RequestInit;
    constructor(params: Params) {
        this.url = params.url;
        this.options = params.options;
    }
    async fetchData() {
        if (!this.url || typeof this.url !== 'string' || this.url.trim() === '') return null;
        const response = await fetch(this.url, {
            headers: HEADERS,
            ...this.options,
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'An error occurred while fetching the data.');
        }
        return response.json();
    }
}

export default fetcher;