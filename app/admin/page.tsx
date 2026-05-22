import { Activity, Download, AlertTriangle, Users } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Downloads', value: '12,450', icon: Download },
    { title: 'Today Downloads', value: '320', icon: Activity },
    { title: 'Failed Requests', value: '18', icon: AlertTriangle },
    { title: 'Visitors', value: '4,820', icon: Users },
  ];

  const recent = [
    { platform: 'Instagram', url: 'instagram.com/reel/example', status: 'success' },
    { platform: 'YouTube', url: 'youtube.com/watch?v=demo', status: 'failed' },
    { platform: 'MP3', url: 'youtube.com/shorts/demo', status: 'success' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-gray-400 mt-1">Welcome back, admin.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{item.title}</p>
                  <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
                </div>

                <div className="w-12 h-12 bg-red-500/15 rounded-xl flex items-center justify-center">
                  <Icon className="text-red-500" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-5">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

        <div className="space-y-3">
          {recent.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-black/30 rounded-xl p-4"
            >
              <div>
                <p className="font-medium">{item.platform}</p>
                <p className="text-gray-400 text-sm truncate max-w-sm">{item.url}</p>
              </div>

              <span
                className={
                  item.status === 'success'
                    ? 'text-green-400 text-sm'
                    : 'text-red-400 text-sm'
                }
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}