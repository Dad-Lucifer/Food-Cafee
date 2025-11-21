import React from 'react';
import { Loader2 } from 'lucide-react';

interface SectionLoaderProps {
    height?: string;
}

const SectionLoader: React.FC<SectionLoaderProps> = ({ height = 'h-96' }) => {
    return (
        <div className={`w-full ${height} flex flex-col items-center justify-center bg-amber-50/50 backdrop-blur-sm rounded-lg`}>
            <Loader2 className="h-8 w-8 text-amber-500 animate-spin" />
            <p className="mt-2 text-amber-700/70 text-sm font-medium animate-pulse">Loading...</p>
        </div>
    );
};

export default SectionLoader;
