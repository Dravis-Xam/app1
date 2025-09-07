type SEvent = {
    id: string;
    title: string;
    mode: 'live' | 'upcoming' | 'past';
    startTime: string;
    endTime?: string;
    thumbnailUrl: string;
    description: string;
}

export default SEvent;