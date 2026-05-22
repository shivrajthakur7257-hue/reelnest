'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteTitle: 'ReelNest',
    apiUrl: 'https://your-backend-url.com',
    maintenance: false,
    adsCode: '',
  });

  const saveSettings = () => {
    localStorage.setItem('reelnest_settings', JSON.stringify(settings));
    alert('Settings saved successfully');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-gray-400 mt-1">Manage your website configuration.</p>

      <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 max-w-3xl">
        <div className="space-y-5">
          <div>
            <label className="text-sm text-gray-300">Site Title</label>
            <input
              value={settings.siteTitle}
              onChange={(e) =>
                setSettings({ ...settings, siteTitle: e.target.value })
              }
              className="w-full mt-2 bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Backend API URL</label>
            <input
              value={settings.apiUrl}
              onChange={(e) =>
                setSettings({ ...settings, apiUrl: e.target.value })
              }
              className="w-full mt-2 bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Ads Code</label>
            <textarea
              value={settings.adsCode}
              onChange={(e) =>
                setSettings({ ...settings, adsCode: e.target.value })
              }
              rows={5}
              className="w-full mt-2 bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.maintenance}
              onChange={(e) =>
                setSettings({ ...settings, maintenance: e.target.checked })
              }
            />
            Maintenance Mode
          </label>

          <button
            onClick={saveSettings}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}