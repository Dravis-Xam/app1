import fetcher from "./root.api";

type StreamBody = {
    userId: string;
    title: string;
    description: string;
    tags: string[];
    thumbnailUrl: string;
    streamUrl: string;
    isLive: boolean;
}

class StreamAPI extends fetcher {
    constructor(params: { url: string; body?: StreamBody | Partial<StreamBody>; options: RequestInit }) {
        super(params);
    }
    // Fetch all streams
    static async fetchAllStreams() {
        const api = new StreamAPI({ url: '/api/streams', options: { method: 'GET' } });
        return api.fetchData();
    }
    // Fetch stream by ID
    static async fetchStreamById(id: number) {
        const api = new StreamAPI({ url: `/api/streams/${id}`, options: { method: 'GET' } });
        return api.fetchData();
    }
    // Create new stream
    static async createStream(body: StreamBody) {
        const api = new StreamAPI({ url: '/api/streams', body, options: { method: 'POST', body: JSON.stringify(body) } });
        return api.fetchData();
    }
    // Update stream
    static async updateStream(id: number, body: Partial<StreamBody>) {
        const api = new StreamAPI({ url: `/api/streams/${id}`, body, options: { method: 'PUT', body: JSON.stringify(body) } });
        return api.fetchData();
    }
    // Delete stream
    static async deleteStream(id: number) {
        const api = new StreamAPI({ url: `/api/streams/${id}`, options: { method: 'DELETE' } });
        return api.fetchData();
    }
    // Search streams
    static async searchStreams(query: string) {
        const api = new StreamAPI({ url: `/api/streams/search?query=${encodeURIComponent(query)}`, options: { method: 'GET' } });
        return api.fetchData();
    }
}

export default StreamAPI;