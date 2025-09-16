import { createContext, useContext, useState, useMemo } from "react";

import Stream from "../constants/types/stream.type";

type StreamContextType = {
    streams: Stream[];
    setStreams: React.Dispatch<React.SetStateAction<Stream[]>>;
    addStream: (stream: Stream) => void;
    updateStream: (updatedStream: Stream) => void;
    removeStream: (streamId: number) => void;
};

const StreamContext = createContext<StreamContextType | undefined>(undefined);

type StreamProviderProps = {
    children: React.ReactNode;
    initialStreams?: Stream[];
};

export default function StreamProvider({ children, initialStreams = [] }: StreamProviderProps) {
    const [streams, setStreams] = useState<Stream[]>(initialStreams);
    const addStream = (stream: Stream) => setStreams((prev) => [...prev, stream]);
    const updateStream = (updatedStream: Stream) =>
        setStreams((prev) => prev.map((s) => (s.id === updatedStream.id ? updatedStream : s)));
    const removeStream = (streamId: number) => setStreams((prev) => prev.filter((s) => parseInt(s.id) !== streamId));
    const value = useMemo(
        () => ({ streams, setStreams, addStream, updateStream, removeStream }),
        [streams]
    );
    return <StreamContext.Provider value={value}>{children}</StreamContext.Provider>;
}

export function useStream() {
    const context = useContext(StreamContext);
    if (context === undefined) {
        throw new Error("useStream must be used within a StreamProvider");
    }
    return context;
}