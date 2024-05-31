import React from "react";

function AccountSettings() {
  return (
    <div className="flex flex-col gap-4 w-full mt-4">
      <div className="bg-white p-4 rounded-lg">
        <p className="text-2xl font-bold">Set New Password</p>
        <p className="mb-4">
          If your account was created using social account authentication, you
          may prefer to add an email log in. If you signed up with a social
          media account, please reset the password for your primary email
          address (nikhilramesh590@gmail.com) in order to enable this. Please
          note that email login is in addition to social login rather than a
          replacement for it, so your authenticated social account will continue
          to be linked to your account.
        </p>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="current-password"
              className="block text-lg font-medium text-gray-700"
            >
              Current Password
            </label>
            <input
              type="password"
              id="current-password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              placeholder="Enter your current password"
            />
          </div>
          <div>
            <label
              htmlFor="new-password"
              className="block text-lg font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              placeholder="Enter your new password"
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-lg font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              placeholder="Confirm your new password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="hover:bg-black px-4 py-2 inline-block bg-gray-800 text-white rounded-lg mt-4"
            >
              Set New Password
            </button>
          </div>
        </form>
      </div>
      <div className="bg-white p-4 rounded-lg flex flex-col">
        <p className="text-2xl font-bold text-red-500 mb-4 ">Danger Zone</p>
        <strong className="text-xl">Remove OAuth Associations</strong>
        <p>
          You are unable to remove one of your authentication methods as you
          need a remaining method to authenticate you.
        </p>
        <strong className="text-xl">Delete Account</strong>
        <p>
          Deleting your account will: Delete your profile, along with your
          authentication associations. This does not include applications
          permissions. You will have to remove them yourself: GitHub profile
          settings. Delete any and all content you have, such as articles,
          comments, or your reading list. Allow your username to become
          available to anyone.
        </p>
        <div>
          <button className="hover:bg-red-600 px-4 py-2 inline-block bg-red-500 text-white rounded-lg mt-4">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
