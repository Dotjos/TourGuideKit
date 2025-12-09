import { Activity, BarChart3 } from "lucide-react";

const mockAnalytics = {
    totalSessions: 342,
    completedSessions: 289,
    completionRate: 84.5,
    skippedCount: 23,
    stepBreakdown: {
        welcome: { started: 342, completed: 335, skipped: 7 },
        features: { started: 335, completed: 320, skipped: 15 },
        dashboard: { started: 320, completed: 310, skipped: 10 },
        settings: { started: 310, completed: 295, skipped: 15 },
        complete: { started: 295, completed: 289, skipped: 6 },
    }
};


export const AnalyticsView = () => (
    <div className="space-y-6">
        <div>
            <h2 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h2>
            <p className="text-gray-600 mt-1">Track tour performance and user engagement</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Total Sessions</h3>
                    <Activity className="text-blue-600" size={20} />
                </div>
                <p className="text-3xl font-bold text-gray-900">{mockAnalytics.totalSessions}</p>
                <p className="text-sm text-green-600 mt-2">+12% from last week</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Completed</h3>
                    <BarChart3 className="text-green-600" size={20} />
                </div>
                <p className="text-3xl font-bold text-gray-900">{mockAnalytics.completedSessions}</p>
                <p className="text-sm text-green-600 mt-2">+8% from last week</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Completion Rate</h3>
                    <Activity className="text-purple-600" size={20} />
                </div>
                <p className="text-3xl font-bold text-gray-900">{mockAnalytics.completionRate}%</p>
                <p className="text-sm text-green-600 mt-2">+3% from last week</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Skipped Steps</h3>
                    <Activity className="text-orange-600" size={20} />
                </div>
                <p className="text-3xl font-bold text-gray-900">{mockAnalytics.skippedCount}</p>
                <p className="text-sm text-red-600 mt-2">-2% from last week</p>
            </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Step Performance</h3>
            <div className="space-y-4">
                {Object.entries(mockAnalytics.stepBreakdown).map(([stepId, data]) => (
                    <div key={stepId}>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700 capitalize">{stepId}</span>
                            <span className="text-sm text-gray-500">
                                {Math.round((data.completed / data.started) * 100)}% completed
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${(data.completed / data.started) * 100}%` }}
                            />
                        </div>
                        <div className="flex gap-4 mt-1 text-xs text-gray-500">
                            <span>Started: {data.started}</span>
                            <span>Completed: {data.completed}</span>
                            <span>Skipped: {data.skipped}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);