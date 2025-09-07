type Stream = {
    id: string;
    title: string;
    description: string;
    url: string;
    thumbnailUrl: string;
    viewers: number;
    isLive: boolean;
    startedAt: string;
    endedAt?: string;
    streamer: {
        id: string;
        username: string;
        avatarUrl: string;
    };
    roomKey: string;
}

export default Stream;