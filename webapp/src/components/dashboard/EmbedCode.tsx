import { Copy } from "lucide-react";
import React from "react";

const mockTours = [
    {
        _id: "tour1",
        name: "Product Onboarding",
        description: "Guide users through main features",
        isActive: true,
        createdAt: Date.now() - 86400000 * 7,
        updatedAt: Date.now() - 86400000 * 2,
    },
    {
        _id: "tour2",
        name: "Dashboard Walkthrough",
        description: "Introduction to dashboard features",
        isActive: true,
        createdAt: Date.now() - 86400000 * 3,
        updatedAt: Date.now() - 86400000,
    }
];

export const EmbedView = () => {
    const [tours, setTours] = React.useState(mockTours);
    const getEmbedCode = (tourId) => {
        return `<script src="https://cdn.yourdomain.com/tour-widget.js"></script>
<script>
  TourWidget.init({
    tourId: "${tourId}",
    apiKey: "YOUR_API_KEY"
  });
</script>`;
    };
    const copyEmbedCode = (tourId) => {
        navigator.clipboard.writeText(getEmbedCode(tourId));
        alert('Embed code copied to clipboard!');
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Embed Code</h2>
                <p className="text-gray-600 mt-1">Copy and paste this code into your website</p>
            </div>

            {tours.map(tour => (
                <div key={tour._id} className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">{tour.name}</h3>
                        <button
                            onClick={() => copyEmbedCode(tour._id)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            <Copy size={18} />
                            Copy Code
                        </button>
                    </div>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{getEmbedCode(tour._id)}</code>
                    </pre>
                </div>
            ))}
        </div>
    )
};