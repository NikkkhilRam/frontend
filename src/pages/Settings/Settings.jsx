import React, { useEffect, useState } from "react";
import AccountSettings from "./AccountSettings";
import ProfileSettings from "./ProfileSettings";
import NotificationSettings from "./NotificationSettings";
import useHttp from "../../hooks/useHttp";

function Settings() {
  const [settingOption, setSettingOption] = useState("profile");
  const [user, setUser] = useState(null);
  const { isLoading, error, sendRequest: callApi } = useHttp();

  useEffect(() => {
    callApi({ url: `http://localhost:3000/api/v1/users` }, (response) => {
      setUser(response);
    });
  }, [callApi]);
  return (
    <div className="w-full flex gap-4  min-h-screen bg-[#F5F5F5]">
      <div>
        <ul className="flex flex-col gap-2 p-4 items-start">
          <button
            onClick={() => setSettingOption("profile")}
            className={`${
              settingOption === "profile" ? "bg-white" : ""
            } text-xl inline-block w-56 text-start py-2 rounded-md px-4 text-gray-600 hover:bg-[#E2E5F3]`}
          >
            🙂 Profile
          </button>
          <button
            onClick={() => setSettingOption("customization")}
            className={`${
              settingOption === "customization" ? "bg-white" : ""
            } text-xl hidden inline-block w-56 text-start py-2 px-4 text-gray-600 hover:bg-[#E2E5F3]`}
          >
            ⚙️ Customization
          </button>
          <button
            onClick={() => setSettingOption("notification")}
            className={`${
              settingOption === "notification" ? "bg-white" : ""
            } text-xl inline-block w-56 text-start rounded-md py-2 px-4 text-gray-600 hover:bg-[#E2E5F3]`}
          >
            🔔 Notification
          </button>
          <button
            onClick={() => setSettingOption("account")}
            className={`${
              settingOption === "account" ? "bg-white" : ""
            } text-xl inline-block w-56 text-start rounded-md py-2 px-4 text-gray-600 hover:bg-[#E2E5F3]`}
          >
            🍀 Account
          </button>
        </ul>
      </div>

      {settingOption === "profile" && <ProfileSettings />}
      {settingOption === "customization" && <AccountSettings />}
      {settingOption === "notification" && <NotificationSettings />}
      {settingOption === "account" && <AccountSettings />}
    </div>
  );
}

export default Settings;
