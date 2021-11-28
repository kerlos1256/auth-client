import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getProfile } from "../utils/apiCalls";

export interface User {
  bio: string;
  name: string;
  email: string;
  phone: number;
  photo: string;
}

const PersonalInfo: FC<{
  setEdit: Dispatch<SetStateAction<boolean>>;
  user: User | undefined;
}> = ({ setEdit, user }) => {
  const Entries = useCallback(() => {
    if (!user) return [];
    const arr: Array<string[]> = [];
    Object.entries(user).map((entry) => {
      if (entry[0] === "photo") {
        arr.unshift(entry);
      } else {
        arr.push(entry);
      }
    });
    return arr;
  }, [user]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-200 flex flex-col items-center">
        <div className="flex flex-col gap-4 text-center my-8">
          <div className="font-bold text-2xl">Personal Info</div>
          <div>Basic info, like your name and photo</div>
        </div>
        <div className="w-full border border-gray-500 border-opacity-40 rounded-2xl ">
          <div className="flex justify-between items-center px-12 py-4">
            <div className="">
              <div className="font-bold text-xl ">Profile</div>
              <div>Some info may be visible to other people</div>
            </div>
            <div
              onClick={() => setEdit(true)}
              className="cursor-pointer px-6 h-fit border border-gray-400 rounded-lg"
            >
              Edit
            </div>
          </div>
          <table className="w-full">
            <tbody>
              {user &&
                Entries().map((entry, index) => (
                  <tr className="border-t flex" key={index}>
                    <td className="py-4 px-12 w-2/6 align-baseline">
                      {entry[0]}
                    </td>
                    {entry[0] === "photo" ? (
                      <td className="py-2">
                        <img
                          className="h-16 w-auto rounded-xl"
                          src={entry[1]}
                        />
                      </td>
                    ) : (
                      <td className=" w-120 flex items-center">
                        <div className="w-full break-words">{entry[1]}</div>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
