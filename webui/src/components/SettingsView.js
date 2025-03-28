import React from 'react';

function SettingsView() {
  return (
    <div className="settings-view">
      <h2>Settings</h2>
      <form>
        <label>
          API Key:
          <input type="text" name="apiKey" placeholder="Enter your API key" />
        </label>
        <label>
          Theme:
          <select name="theme">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
        <label>
          Enable Notifications:
          <input type="checkbox" name="enableNotifications" />
        </label>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
}

export default SettingsView;
