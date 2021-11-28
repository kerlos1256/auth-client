import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { MdArrowBack } from "react-icons/md";
import { getProfile, UpdateInfo } from "../utils/apiCalls";
import { User } from "./PersonalInfo";

const EditInfo: FC<{
  setEdit: Dispatch<SetStateAction<boolean>>;
  user: User | undefined;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  update: boolean;
}> = ({ setEdit, user, setUpdate, update }) => {
  const [PhotoInput, setPhotoInput] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>();
  const [values, setValues] = useState({
    photo: "",
    name: "",
    bio: "",
    phone: "",
    email: "",
  });

  const Entries = useCallback(() => {
    if (!values) return [];
    const arr: Array<string[]> = [];
    Object.entries(values).map((entry) => {
      if (entry[0] === "photo") {
        arr.unshift(entry);
      } else {
        arr.push(entry);
      }
    });
    return arr;
  }, [values]);

  const updateInfo = async () => {
    const res = await UpdateInfo({
      ...values,
      phone: parseInt(values.phone),
    });
    if (res) {
      setUpdate(!update);
      setEdit(false);
      return;
    }
    setErrors(res);
    console.log(res);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div>
        <div
          onClick={() => setEdit(false)}
          className="cursor-pointer flex gap-2 items-center py-4 text-back"
        >
          <MdArrowBack />
          Back
        </div>
        <div className="border border-gray-400 border-opacity-50 rounded-xl w-200 px-10 py-4">
          <div className="my-4">
            <div className="font-semibold text-xl">Change Info</div>
            <div>Changes will be reflected to all services</div>
          </div>
          <div>
            {Entries().map((value: string[], index) => {
              const Lebal = value[0].replace(
                value[0].charAt(0),
                value[0].charAt(0).toUpperCase()
              );
              return value[0] === "photo" ? (
                <div key={index} className="py-1">
                  <div>{Lebal}</div>
                  <div className="flex">
                    <img
                      onClick={() => setPhotoInput(!PhotoInput)}
                      className="h-16 w-auto rounded-lg mr-8"
                      src={user?.photo}
                    />
                    {PhotoInput ? (
                      <label
                        className={`block border border-opacity-70 w-120 h-fit border-gray-400 rounded-xl py-2 px-4`}
                      >
                        <input
                          className={`w-full outline-none`}
                          type="text"
                          name={value[0]}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              [e.target.name]: e.target.value,
                            })
                          }
                          placeholder={`Enter your ${value[0]}...`}
                        />
                      </label>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div key={index} className="py-1">
                  <div>{Lebal}</div>
                  <label
                    className={`block border border-opacity-70 w-120 ${
                      Lebal === "Bio" ? "h-20" : ""
                    } border-gray-400 rounded-xl py-2 px-4`}
                  >
                    {Lebal === "Bio" ? (
                      <textarea
                        className="outline-none w-full"
                        name={value[0]}
                        placeholder={`Enter your ${Lebal}...`}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            [e.target.name]: e.target.value,
                          })
                        }
                      ></textarea>
                    ) : (
                      <input
                        className={`w-full outline-none`}
                        type="text"
                        name={value[0]}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            [e.target.name]: e.target.value,
                          })
                        }
                        placeholder={`Enter your ${value[0]}...`}
                      />
                    )}
                  </label>
                </div>
              );
            })}
            <div
              onClick={updateInfo}
              className="px-8 py-1.5 cursor-pointer bg-blue-700 inline-block my-4 rounded-lg text-white"
            >
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInfo;
